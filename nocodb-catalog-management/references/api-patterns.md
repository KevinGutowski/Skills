# NocoDB API Patterns

## Setup

Use `xc-token: <token>` for API auth.

```python
import requests

s = requests.Session()
s.headers.update({"xc-token": token})
BASE_URL = "http://127.0.0.1:3010"
```

## Discover Bases And Tables

```python
s.get(f"{BASE_URL}/api/v2/meta/bases").json()
s.get(f"{BASE_URL}/api/v2/meta/bases/{base_id}/tables").json()
s.get(f"{BASE_URL}/api/v2/meta/tables/{table_id}").json()
```

Build a table map from metadata:

```python
data = s.get(f"{BASE_URL}/api/v2/meta/bases/{base_id}/tables").json()
table_ids = {table["title"]: table["id"] for table in data["list"]}
```

Some NocoDB tokens return 403 for `/api/v2/meta/bases` while still allowing access to a known base. If so, extract the base ID from the browser URL and call `/api/v2/meta/bases/{base_id}/tables` directly.

## Read Records

```python
rows = s.get(
    f"{BASE_URL}/api/v2/tables/{table_id}/records",
    params={"limit": 1000, "nested": "true"},
).json()["list"]
```

Use `nested=true` when you need linked-record and attachment display data.

## Upsert Records

NocoDB's API does not always expose a convenient upsert by arbitrary field. Use this pattern:

1. Read existing records.
2. Build `{stable_key_value: record}`.
3. `POST` if missing.
4. `PATCH` if present and changed.

```python
record = existing_by_key.get(row["Title"])
if record:
    payload = {"Id": record["Id"], **changed_fields}
    s.patch(f"{BASE_URL}/api/v2/tables/{table_id}/records", json=payload)
else:
    s.post(f"{BASE_URL}/api/v2/tables/{table_id}/records", json=row)
```

## Create A Many-To-Many Relation Column

First inspect metadata and look for an existing relation:

```python
meta = s.get(f"{BASE_URL}/api/v2/meta/tables/{from_table_id}").json()
for column in meta["columns"]:
    options = column.get("colOptions") or {}
    if (
        column["title"] == "Sources"
        and column["uidt"] == "LinkToAnotherRecord"
        and options.get("type") == "mm"
        and options.get("fk_related_model_id") == to_table_id
    ):
        relation_column = column
```

If absent, create it:

```python
body = {
    "title": "Sources",
    "column_name": "Sources",
    "childId": from_table_id,
    "parentId": to_table_id,
    "type": "mm",
    "uidt": "LinkToAnotherRecord",
}
s.post(f"{BASE_URL}/api/v2/meta/tables/{from_table_id}/columns", json=body)
```

Then re-read metadata to get the new column ID. Do not assume the ID.

## Link Records

Use the relation column ID from metadata:

```python
s.post(
    f"{BASE_URL}/api/v2/tables/{from_table_id}/links/{relation_column_id}/records/{from_record_id}",
    json=[{"Id": target_record_id}],
)
```

Notes:

- `from_record_id` and `target_record_id` are row `Id` values, not display keys.
- Send one or more target IDs in the JSON list.
- Duplicate-link responses vary; if idempotency matters, tolerate "already" or "duplicate" errors only after checking response text.

## Attachment Upload

Ensure an attachment column exists:

```python
s.post(
    f"{BASE_URL}/api/v2/meta/tables/{table_id}/columns",
    json={"title": "File", "uidt": "Attachment"},
)
```

Upload:

```python
with open(path, "rb") as handle:
    uploaded = s.post(
        f"{BASE_URL}/api/v2/storage/upload",
        files={"file": (path.name, handle, "image/jpeg")},
    ).json()
```

Patch record:

```python
s.patch(
    f"{BASE_URL}/api/v2/tables/{table_id}/records",
    json={"Id": record_id, "File": uploaded},
)
```

## Views And Gallery Covers

Prefer API-supported schema/data operations. If shaping views requires direct SQLite edits in a local NocoDB container:

- Snapshot or inspect the DB first.
- Keep changes limited to view metadata.
- Restart the NocoDB container after direct SQLite edits.
- Do not use direct SQLite for record data unless there is no API alternative.
