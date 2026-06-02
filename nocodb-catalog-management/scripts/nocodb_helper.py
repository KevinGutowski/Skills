#!/usr/bin/env python3
"""Small NocoDB API helper for research-catalog maintenance."""

from __future__ import annotations

import argparse
import json
import mimetypes
import os
import subprocess
from pathlib import Path
from typing import Any

import requests


class NocoDBClient:
    def __init__(self, base_url: str, token: str):
        self.base_url = base_url.rstrip("/")
        self.session = requests.Session()
        self.session.headers.update({"xc-token": token})

    @classmethod
    def from_env(cls) -> "NocoDBClient":
        base_url = os.environ.get("NOCODB_BASE_URL", "http://127.0.0.1:3010")
        token = os.environ.get("NOCODB_API_TOKEN") or _token_from_zshrc()
        if not token:
            raise RuntimeError("Missing NOCODB_API_TOKEN")
        return cls(base_url, token)

    def request(self, method: str, path: str, **kwargs: Any) -> Any:
        response = self.session.request(method, f"{self.base_url}{path}", timeout=90, **kwargs)
        if not response.ok:
            raise RuntimeError(f"{method} {path} failed: {response.status_code} {response.text[:1000]}")
        return response.json() if response.text else None

    def bases(self) -> list[dict[str, Any]]:
        return self.request("GET", "/api/v2/meta/bases").get("list", [])

    def tables(self, base_id: str) -> list[dict[str, Any]]:
        return self.request("GET", f"/api/v2/meta/bases/{base_id}/tables").get("list", [])

    def table_ids(self, base_id: str) -> dict[str, str]:
        return {table["title"]: table["id"] for table in self.tables(base_id)}

    def table_meta(self, table_id: str) -> dict[str, Any]:
        return self.request("GET", f"/api/v2/meta/tables/{table_id}")

    def records(self, table_id: str, limit: int = 1000, nested: bool = True) -> list[dict[str, Any]]:
        params = {"limit": limit, "nested": "true" if nested else "false"}
        return self.request("GET", f"/api/v2/tables/{table_id}/records", params=params).get("list", [])

    def create_record(self, table_id: str, fields: dict[str, Any]) -> dict[str, Any]:
        return self.request("POST", f"/api/v2/tables/{table_id}/records", json=fields)

    def patch_record(self, table_id: str, row_id: int, fields: dict[str, Any]) -> dict[str, Any]:
        return self.request("PATCH", f"/api/v2/tables/{table_id}/records", json={"Id": row_id, **fields})

    def upsert_record(self, table_id: str, key_field: str, fields: dict[str, Any]) -> dict[str, Any]:
        key_value = str(fields[key_field])
        existing = {str(row.get(key_field)): row for row in self.records(table_id) if row.get(key_field) is not None}
        record = existing.get(key_value)
        if not record:
            self.create_record(table_id, fields)
            return {str(row.get(key_field)): row for row in self.records(table_id) if row.get(key_field) is not None}[key_value]

        changed = {k: v for k, v in fields.items() if str(record.get(k, "")) != str(v)}
        if changed:
            self.patch_record(table_id, int(record["Id"]), changed)
            return {str(row.get(key_field)): row for row in self.records(table_id) if row.get(key_field) is not None}[key_value]
        return record

    def find_relation_column(self, from_table_id: str, to_table_id: str, title: str) -> dict[str, Any] | None:
        for column in self.table_meta(from_table_id).get("columns", []):
            options = column.get("colOptions") or {}
            if (
                column.get("title") == title
                and column.get("uidt") == "LinkToAnotherRecord"
                and options.get("fk_related_model_id") == to_table_id
            ):
                return column
        return None

    def ensure_mm_relation(self, from_table_id: str, to_table_id: str, title: str) -> dict[str, Any]:
        existing = self.find_relation_column(from_table_id, to_table_id, title)
        if existing:
            return existing
        body = {
            "title": title,
            "column_name": _column_name(title),
            "childId": from_table_id,
            "parentId": to_table_id,
            "type": "mm",
            "uidt": "LinkToAnotherRecord",
        }
        self.request("POST", f"/api/v2/meta/tables/{from_table_id}/columns", json=body)
        created = self.find_relation_column(from_table_id, to_table_id, title)
        if not created:
            raise RuntimeError(f"Could not create relation {from_table_id}.{title} -> {to_table_id}")
        return created

    def link_records(self, from_table_id: str, relation_column_id: str, from_record_id: int, target_ids: list[int]) -> int:
        linked = 0
        for target_id in dict.fromkeys(target_ids):
            response = self.session.post(
                f"{self.base_url}/api/v2/tables/{from_table_id}/links/{relation_column_id}/records/{from_record_id}",
                json=[{"Id": target_id}],
                timeout=60,
            )
            if response.status_code in {200, 201}:
                linked += 1
                continue
            text = response.text.lower()
            if "already" in text or "duplicate" in text:
                continue
            raise RuntimeError(
                f"Link failed {from_table_id}.{relation_column_id} {from_record_id}->{target_id}: "
                f"{response.status_code} {response.text[:1000]}"
            )
        return linked

    def ensure_attachment_field(self, table_id: str, title: str = "File") -> dict[str, Any]:
        for column in self.table_meta(table_id).get("columns", []):
            if column.get("title") == title and column.get("uidt") == "Attachment":
                return column
        self.request("POST", f"/api/v2/meta/tables/{table_id}/columns", json={"title": title, "uidt": "Attachment"})
        for column in self.table_meta(table_id).get("columns", []):
            if column.get("title") == title and column.get("uidt") == "Attachment":
                return column
        raise RuntimeError(f"Could not create attachment field {title}")

    def upload_attachment(self, table_id: str, row_id: int, field_title: str, path: Path) -> Any:
        path = path.expanduser().resolve()
        mimetype = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
        with path.open("rb") as handle:
            response = self.session.post(
                f"{self.base_url}/api/v2/storage/upload",
                files={"file": (path.name, handle, mimetype)},
                timeout=120,
            )
        if not response.ok:
            raise RuntimeError(f"Attachment upload failed for {path}: {response.status_code} {response.text[:1000]}")
        uploaded = response.json()
        return self.patch_record(table_id, row_id, {field_title: uploaded})


def _token_from_zshrc() -> str:
    result = subprocess.run(
        ["zsh", "-lc", "source ~/.zshrc >/dev/null 2>&1 || true; print -r -- $NOCODB_API_TOKEN"],
        text=True,
        capture_output=True,
        check=False,
    )
    return result.stdout.strip()


def _column_name(title: str) -> str:
    return "".join(ch if ch.isalnum() else "_" for ch in title).strip("_") or "linked_records"


def main() -> None:
    parser = argparse.ArgumentParser(description="Inspect NocoDB bases/tables with the configured API token.")
    parser.add_argument("--base-id", help="When set, list tables for this base instead of listing all bases.")
    args = parser.parse_args()
    client = NocoDBClient.from_env()
    if args.base_id:
        print(json.dumps(client.tables(args.base_id), ensure_ascii=False, indent=2))
        return
    print(json.dumps(client.bases(), ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
