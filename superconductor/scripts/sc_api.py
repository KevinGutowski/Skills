#!/usr/bin/env python3
"""Dependency-free helper for the Superconductor API (standard library only).

Endpoint paths and required fields below were last verified against the live
docs on 2026-11-06. The live docs/OpenAPI win over this file:
  https://www.superconductor.com/docs/api
  https://www.superconductor.com/docs/api/openapi.yaml

Behavior contract:
- The token comes from sc_credentials (per-device secure store) and lives only
  in memory. It is never printed, logged, or put in argv or error messages.
- Responses are checked against the fields this helper relies on. Missing
  fields, non-JSON bodies, redirects, or undocumented statuses fail closed.
- create-ticket sends at most one POST and never retries. A timeout, network
  error, 5xx, or undocumented status after sending is reported as ambiguous.

Run `python3 sc_api.py --help` for commands. Output is JSON on stdout; errors
are JSON on stderr with a non-zero exit code.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Any, Callable

sys.path.insert(0, str(Path(__file__).resolve().parent))
from sc_credentials import CredentialError, get_token, validate_token  # noqa: E402

API_BASE = "https://www.superconductor.com/api/v1"
DOCS_URL = "https://www.superconductor.com/docs/api"
OPENAPI_URL = "https://www.superconductor.com/docs/api/openapi.yaml"
LAST_VERIFIED = "2026-11-06"
USER_AGENT = "KevinGutowski-Skills-superconductor/1"

EXIT_API = 1
EXIT_CREDENTIAL = 3
EXIT_DRIFT = 4
EXIT_AMBIGUOUS = 5

# Fields this helper reads, with the JSON types it accepts. Verified against the
# OpenAPI `required` lists and property types on 2026-11-06. Nullable fields are
# nullable in the OpenAPI too; do not loosen a type without checking the live doc.
STR, STR_OR_NULL, LIST, OBJ, OBJ_OR_NULL = "string", "string|null", "array", "object", "object|null"
FIELDS: dict[str, dict[str, str]] = {
    "User": {"id": STR, "name": STR_OR_NULL, "email": STR},
    "Project": {"id": STR, "name": STR_OR_NULL, "url": STR, "created_at": STR, "workspace": OBJ},
    "Workspace": {"id": STR, "name": STR},
    "Ticket": {"id": STR, "friendly_id": STR, "url": STR, "title": STR_OR_NULL, "status": STR,
               "description": STR_OR_NULL, "created_at": STR, "last_activity_at": STR,
               "creator": OBJ_OR_NULL},
    "Chat": {"id": STR, "url": STR, "title": STR_OR_NULL, "status": STR, "profile_name": STR_OR_NULL,
             "model": STR_OR_NULL, "created_at": STR, "last_activity_at": STR, "creator": OBJ_OR_NULL},
    "Message": {"id": STR, "created_at": STR, "author": OBJ, "text": STR_OR_NULL},
    "TicketImplementation": {"id": STR, "friendly_id": STR, "url": STR, "status": STR,
                             "created_at": STR, "creator": OBJ_OR_NULL, "pull_requests": LIST,
                             "profile_name": STR_OR_NULL, "model": STR_OR_NULL, "ticket": OBJ},
    "Diff": {"repositories": LIST},
    "RepositoryDiff": {"name": STR, "merge_base": STR_OR_NULL, "diff": STR_OR_NULL, "error": STR_OR_NULL},
    "CreatedTicket": {"id": STR, "friendly_id": STR, "url": STR, "title": STR_OR_NULL, "status": STR,
                      "implementation_launches": LIST},
    "ImplementationLaunch": {"profile": STR},
}
# Optional fields: type-checked only when present.
OPTIONAL_FIELDS: dict[str, dict[str, str]] = {
    "Ticket": {"implementations": LIST},
    "ImplementationLaunch": {"launch_error": STR},
}
_TYPE_CHECKS: dict[str, Callable[[Any], bool]] = {
    STR: lambda v: isinstance(v, str),
    STR_OR_NULL: lambda v: v is None or isinstance(v, str),
    LIST: lambda v: isinstance(v, list),
    OBJ: lambda v: isinstance(v, dict),
    OBJ_OR_NULL: lambda v: v is None or isinstance(v, dict),
}

HINTS = {
    400: "A parameter is missing or invalid; `details` points at each bad value.",
    401: ("Token missing, mistyped, expired, or revoked. Create a new device token and "
          "replace the Keychain item (see the skill's setup section). Never paste it into chat."),
    403: ("Your workspace role can't create tickets in this project (Viewers are read-only). "
          "Ask a workspace Owner or Admin to change your role."),
    404: ("Wrong ID, or you can't access it; the API does not reveal which. Re-resolve the ID "
          "from live list results instead of guessing."),
    422: "The ticket couldn't be saved and nothing was created. Fix what `message` says.",
}

ID_RE = re.compile(r"^[A-Za-z0-9_-]{1,64}$")
MAX_PAGES = 50

Transport = Callable[[str, str, dict, "bytes | None", float], "tuple[int, bytes]"]


class HelperError(Exception):
    exit_code = EXIT_API

    def __init__(self, kind: str, message: str, **extra: Any):
        super().__init__(message)
        self.payload = {"kind": kind, "message": message, **extra}


class ApiError(HelperError):
    exit_code = EXIT_API


class SchemaDrift(HelperError):
    exit_code = EXIT_DRIFT


class AmbiguousOutcome(HelperError):
    exit_code = EXIT_AMBIGUOUS


class TransportError(Exception):
    """Network-level failure: no HTTP status was received."""


def _describe(exc: BaseException) -> str:
    # Only network-level errors carry a safe, useful message. Anything else
    # (e.g. ValueError from header validation) may quote request data, so it
    # is reported by type name only.
    if isinstance(exc, urllib.error.URLError):
        reason = exc.reason
        detail = str(reason) if isinstance(reason, (str, OSError)) else type(reason).__name__
        return f"URLError: {detail}"
    if isinstance(exc, OSError):
        return f"{type(exc).__name__}: {exc}"
    return type(exc).__name__


class _NoRedirect(urllib.request.HTTPRedirectHandler):
    # Never follow redirects: they could forward the Authorization header to
    # another host or turn a POST into a GET. Surface them as statuses instead.
    def redirect_request(self, *args: Any, **kwargs: Any) -> None:
        return None


def urllib_transport(method: str, url: str, headers: dict, body: bytes | None,
                     timeout: float) -> tuple[int, bytes]:
    """Return (status, body). Raise TransportError when no complete response was received."""
    request = urllib.request.Request(url, data=body, method=method, headers=headers)
    opener = urllib.request.build_opener(_NoRedirect())
    try:
        response = opener.open(request, timeout=timeout)
    except urllib.error.HTTPError as exc:
        # The status is known; an unreadable error body only loses the details.
        try:
            raw = exc.read() or b""
        except Exception:  # noqa: BLE001 - any read failure, e.g. http.client.IncompleteRead
            raw = b""
        finally:
            exc.close()
        return exc.code, raw
    except Exception as exc:  # noqa: BLE001 - never let raw library errors escape
        raise TransportError(_describe(exc)) from None
    status = response.status
    try:
        with response:
            return status, response.read()
    except Exception as exc:  # noqa: BLE001 - a truncated body is not a usable response
        raise TransportError(f"status {status} received but the body was unreadable "
                             f"({_describe(exc)})") from None


def clean_id(value: str, label: str) -> str:
    """Accept a bare ID or a superconductor.com URL ending in the ID."""
    value = value.strip()
    if value.startswith(("http://", "https://")):
        parsed = urllib.parse.urlparse(value)
        host = parsed.hostname or ""
        if host != "superconductor.com" and not host.endswith(".superconductor.com"):
            raise ApiError("invalid_id", f"{label} URL is not a superconductor.com URL.")
        segments = [s for s in parsed.path.split("/") if s]
        value = segments[-1] if segments else ""
    if not ID_RE.match(value):
        raise ApiError("invalid_id", f"{label} must be a Superconductor ID (letters, digits, - or _).")
    return value


def check_shape(obj: Any, kind: str, where: str) -> None:
    if not isinstance(obj, dict):
        raise SchemaDrift("schema_drift", f"{where}: expected a {kind} object.",
                          docs=OPENAPI_URL, last_verified=LAST_VERIFIED)
    missing = [key for key in FIELDS[kind] if key not in obj]
    wrong = [f"{key} (expected {expected}, got {type(obj[key]).__name__})"
             for fields in (FIELDS[kind], OPTIONAL_FIELDS.get(kind, {}))
             for key, expected in fields.items()
             if key in obj and not _TYPE_CHECKS[expected](obj[key])]
    if missing or wrong:
        problems = "; ".join(filter(None, [f"missing {missing}" if missing else "",
                                           f"wrong type {wrong}" if wrong else ""]))
        raise SchemaDrift(
            "schema_drift",
            f"{where}: {kind} has {problems}. The API may have changed; re-read the "
            "live OpenAPI before relying on this helper.",
            docs=OPENAPI_URL, last_verified=LAST_VERIFIED,
        )


def check_page(obj: Any, item_kind: str, where: str) -> None:
    if not isinstance(obj, dict) or not isinstance(obj.get("data"), list) or "next_cursor" not in obj:
        raise SchemaDrift("schema_drift", f"{where}: expected a page with `data` and `next_cursor`.",
                          docs=OPENAPI_URL, last_verified=LAST_VERIFIED)
    if obj["next_cursor"] is not None and not isinstance(obj["next_cursor"], str):
        raise SchemaDrift("schema_drift", f"{where}: `next_cursor` is not a string or null.",
                          docs=OPENAPI_URL, last_verified=LAST_VERIFIED)
    for index, item in enumerate(obj["data"]):
        check_shape(item, item_kind, f"{where} data[{index}]")


def _error_fields(raw: bytes) -> dict:
    try:
        parsed = json.loads(raw.decode("utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError):
        return {}
    body = parsed.get("error") if isinstance(parsed, dict) else None
    if not isinstance(body, dict):
        return {}
    out = {k: body[k] for k in ("code", "message", "details") if k in body}
    return out


class Client:
    def __init__(self, token_provider: Callable[[], str] = get_token,
                 transport: Transport = urllib_transport, timeout: float = 30.0):
        self._token_provider = token_provider
        self._transport = transport
        self._timeout = timeout
        self._token: str | None = None

    def _headers(self, has_body: bool) -> dict:
        if self._token is None:
            # Guard every provider: a newline or control character would make the
            # HTTP library raise an error that quotes the Authorization header.
            self._token = validate_token(self._token_provider(), "The credential")
        headers = {
            "Authorization": f"Bearer {self._token}",
            "Accept": "application/json",
            "User-Agent": USER_AGENT,
        }
        if has_body:
            headers["Content-Type"] = "application/json"
        return headers

    def _url(self, path: str, query: dict | None) -> str:
        query = {k: v for k, v in (query or {}).items() if v not in (None, "", [])}
        suffix = f"?{urllib.parse.urlencode(query)}" if query else ""
        return f"{API_BASE}{path}{suffix}"

    def get(self, path: str, query: dict | None = None, errors: tuple[int, ...] = (400, 401, 404)) -> Any:
        where = f"GET {path}"
        try:
            status, raw = self._transport("GET", self._url(path, query), self._headers(False), None, self._timeout)
        except TransportError as exc:
            raise ApiError("network_error", f"{where}: {exc}. Safe to retry (read-only).") from None
        if status == 200:
            return self._parse_json(raw, where)
        if status in errors:
            raise ApiError("http_error", f"{where} returned {status}. {HINTS[status]}",
                           status=status, api_error=_error_fields(raw))
        raise SchemaDrift("unexpected_status",
                          f"{where} returned undocumented status {status}. Check the live docs.",
                          status=status, docs=DOCS_URL, last_verified=LAST_VERIFIED)

    def post_once(self, path: str, payload: dict) -> Any:
        """Exactly one POST. Anything that might have been created is AMBIGUOUS, never retried."""
        where = f"POST {path}"
        body = json.dumps(payload).encode("utf-8")
        headers = self._headers(True)  # resolve credentials before anything is sent
        try:
            status, raw = self._transport("POST", self._url(path, None), headers, body, self._timeout)
        except TransportError as exc:
            raise AmbiguousOutcome(
                "ambiguous_create",
                f"{where}: {exc}. The ticket may or may not exist. Do NOT retry; run "
                "`check-create` with the same project/title/description first.",
            ) from None
        if status == 201:
            try:
                return self._parse_json(raw, where)
            except SchemaDrift as exc:
                raise AmbiguousOutcome(
                    "ambiguous_create",
                    f"{where} returned 201 (created) but the body was unreadable: {exc}. "
                    "Do NOT retry; run `check-create` to find the ticket.",
                    docs=OPENAPI_URL,
                ) from None
        if status in (400, 401, 403, 404, 422):
            raise ApiError("http_error", f"{where} returned {status}. {HINTS[status]}",
                           status=status, api_error=_error_fields(raw), created=False)
        raise AmbiguousOutcome(
            "ambiguous_create",
            f"{where} returned undocumented status {status}; the ticket may exist. Do NOT "
            "retry; run `check-create`, then re-read the live docs.",
            status=status, docs=DOCS_URL,
        )

    @staticmethod
    def _parse_json(raw: bytes, where: str) -> Any:
        try:
            return json.loads(raw.decode("utf-8"))
        except (UnicodeDecodeError, json.JSONDecodeError):
            raise SchemaDrift("schema_drift", f"{where}: response is not JSON.",
                              docs=OPENAPI_URL, last_verified=LAST_VERIFIED) from None

    # ---- Reads -----------------------------------------------------------

    def whoami(self) -> dict:
        user = self.get("/user")
        check_shape(user, "User", "GET /user")
        return user

    def projects(self, workspace_id: str | None = None, limit: int | None = None,
                 cursor: str | None = None) -> dict:
        page = self.get("/projects", {"workspace_id": workspace_id, "limit": limit, "cursor": cursor},
                        errors=(400, 401))
        check_page(page, "Project", "GET /projects")
        for index, project in enumerate(page["data"]):
            check_shape(project["workspace"], "Workspace", f"GET /projects data[{index}].workspace")
        return page

    def all_projects(self, workspace_id: str | None = None) -> list[dict]:
        projects: list[dict] = []
        cursor = None
        for _ in range(MAX_PAGES):
            page = self.projects(workspace_id, limit=1000, cursor=cursor)
            projects.extend(page["data"])
            cursor = page["next_cursor"]
            if cursor is None:
                return projects
        raise ApiError("too_many_pages", f"Stopped after {MAX_PAGES} pages of projects.")

    def resolve_project(self, name: str, workspace_id: str | None = None) -> dict:
        wanted = name.strip().casefold()
        projects = self.all_projects(workspace_id)

        def brief(p: dict) -> dict:
            return {"id": p["id"], "name": p["name"], "workspace": p["workspace"]}

        exact = [p for p in projects if (p["name"] or "").strip().casefold() == wanted]
        if len(exact) == 1:
            return brief(exact[0])
        if len(exact) > 1:
            raise ApiError("ambiguous_project",
                           f"{len(exact)} projects are named '{name}'. Ask the user which one "
                           "(or pass --workspace-id); do not pick for them.",
                           candidates=[brief(p) for p in exact])
        near = [p for p in projects if wanted and wanted in (p["name"] or "").casefold()]
        raise ApiError("project_not_found",
                       f"No project is named exactly '{name}'. Confirm with the user; do not "
                       "substitute a similar name.",
                       similar=[brief(p) for p in near[:20]])

    def tickets(self, project_id: str, *, sort: str | None = None, since: str | None = None,
                include_implementations: bool = False, limit: int | None = None,
                cursor: str | None = None) -> dict:
        path = f"/projects/{project_id}/tickets"
        page = self.get(path, {"sort": sort, "since": since, "limit": limit, "cursor": cursor,
                               "include": "implementations" if include_implementations else None})
        check_page(page, "Ticket", f"GET {path}")
        return page

    def chats(self, project_id: str, *, sort: str | None = None, since: str | None = None,
              limit: int | None = None, cursor: str | None = None) -> dict:
        path = f"/projects/{project_id}/chats"
        page = self.get(path, {"sort": sort, "since": since, "limit": limit, "cursor": cursor})
        check_page(page, "Chat", f"GET {path}")
        return page

    def implementation(self, impl_id: str) -> dict:
        path = f"/ticket_implementations/{impl_id}"
        impl = self.get(path)
        check_shape(impl, "TicketImplementation", f"GET {path}")
        return impl

    def implementation_messages(self, impl_id: str, limit: int | None = None,
                                cursor: str | None = None) -> dict:
        path = f"/ticket_implementations/{impl_id}/messages"
        page = self.get(path, {"limit": limit, "cursor": cursor})
        check_page(page, "Message", f"GET {path}")
        return page

    def implementation_diff(self, impl_id: str) -> dict:
        path = f"/ticket_implementations/{impl_id}/diff"
        diff = self.get(path)
        check_shape(diff, "Diff", f"GET {path}")
        if not isinstance(diff["repositories"], list):
            raise SchemaDrift("schema_drift", f"GET {path}: `repositories` is not a list.",
                              docs=OPENAPI_URL, last_verified=LAST_VERIFIED)
        for index, repo in enumerate(diff["repositories"]):
            check_shape(repo, "RepositoryDiff", f"GET {path} repositories[{index}]")
        return diff

    def chat(self, chat_id: str) -> dict:
        path = f"/chats/{chat_id}"
        chat = self.get(path)
        check_shape(chat, "Chat", f"GET {path}")
        return chat

    def chat_messages(self, chat_id: str, limit: int | None = None, cursor: str | None = None) -> dict:
        path = f"/chats/{chat_id}/messages"
        page = self.get(path, {"limit": limit, "cursor": cursor})
        check_page(page, "Message", f"GET {path}")
        return page

    # ---- Mutation --------------------------------------------------------

    def create_ticket(self, project_id: str, description: str, title: str | None = None,
                      launch_default: bool = False) -> dict:
        if not description.strip():
            raise ApiError("invalid_input", "Description is empty; nothing was sent.")
        ticket: dict[str, Any] = {"description": description}
        if title is not None and title.strip():
            ticket["title"] = title
        payload: dict[str, Any] = {"ticket": ticket}
        if launch_default:
            payload["implementations"] = [{"profile": "default"}]
        path = f"/projects/{project_id}/tickets"
        created = self.post_once(path, payload)
        try:
            check_shape(created, "CreatedTicket", f"POST {path}")
            launches = created["implementation_launches"]
            for index, launch in enumerate(launches):
                check_shape(launch, "ImplementationLaunch", f"POST {path} implementation_launches[{index}]")
        except SchemaDrift as exc:
            raise AmbiguousOutcome(
                "ambiguous_create",
                f"Server answered 201 (created) but the body changed shape: {exc}. Do NOT retry; "
                "run `check-create` to find the ticket.",
                docs=OPENAPI_URL,
            ) from None
        ticket_info = {k: created[k] for k in ("id", "friendly_id", "url", "title", "status")}
        expected_launches = 1 if launch_default else 0
        if len(launches) != expected_launches:
            raise AmbiguousOutcome(
                "ambiguous_launch",
                f"The ticket was created, but the response lists {len(launches)} implementation "
                f"launch(es) where {expected_launches} was requested, so the launch outcome is "
                "unknown. Do NOT retry the create; check the ticket in Superconductor and re-read "
                "the live docs.",
                ticket=ticket_info, docs=DOCS_URL,
            )
        return {
            "created": True,
            "ticket": ticket_info,
            "implementation_requested": launch_default,
            "implementation_launches": [
                {"profile": launch["profile"],
                 "launched": "launch_error" not in launch,
                 **({"launch_error": launch["launch_error"]} if "launch_error" in launch else {})}
                for launch in launches
            ],
        }

    def check_create(self, project_id: str, description: str, title: str | None = None,
                     newest: int = 25) -> dict:
        """Read-only duplicate check after an ambiguous create."""
        page = self.tickets(project_id, sort="created", limit=newest)
        wanted_desc = description.strip()
        wanted_title = (title or "").strip()
        matches = [
            {k: t[k] for k in ("id", "friendly_id", "url", "title", "status", "created_at")}
            for t in page["data"]
            if (t["description"] or "").strip() == wanted_desc
            and (not wanted_title or (t["title"] or "").strip() == wanted_title)
        ]
        return {"project_id": project_id, "checked_newest": len(page["data"]), "matches": matches}


# ---- CLI ---------------------------------------------------------------------


def _read_text(path: str) -> str:
    if path == "-":
        return sys.stdin.read()
    return Path(path).read_text(encoding="utf-8")


def _limit(value: str) -> int:
    number = int(value)
    if not 1 <= number <= 1000:
        raise argparse.ArgumentTypeError("limit must be 1-1000")
    return number


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description=f"Superconductor API helper (endpoints last verified {LAST_VERIFIED}; "
                    f"live docs win: {DOCS_URL})")
    sub = parser.add_subparsers(dest="command", required=True)

    sub.add_parser("whoami", help="GET /user: verify the token's user")

    p = sub.add_parser("projects", help="GET /projects (one page)")
    p.add_argument("--workspace-id")
    p.add_argument("--limit", type=_limit)
    p.add_argument("--cursor")

    p = sub.add_parser("resolve-project", help="Exact-name project lookup across all pages; fails on 0 or 2+ matches")
    p.add_argument("name")
    p.add_argument("--workspace-id")

    for name, help_text in (("tickets", "GET /projects/{id}/tickets"), ("chats", "GET /projects/{id}/chats")):
        p = sub.add_parser(name, help=help_text)
        p.add_argument("project_id")
        p.add_argument("--sort", choices=["created", "last_activity"])
        p.add_argument("--since", help="ISO 8601 time, e.g. 2026-10-30T19:00:00Z")
        p.add_argument("--limit", type=_limit)
        p.add_argument("--cursor")
        if name == "tickets":
            p.add_argument("--include-implementations", action="store_true")

    for name in ("implementation", "implementation-diff", "chat"):
        p = sub.add_parser(name)
        p.add_argument("id")
    for name in ("implementation-messages", "chat-messages"):
        p = sub.add_parser(name)
        p.add_argument("id")
        p.add_argument("--limit", type=_limit)
        p.add_argument("--cursor")

    for name in ("create-ticket", "check-create"):
        p = sub.add_parser(name, help="POST one ticket (no retries)" if name == "create-ticket"
                           else "Read-only: find newest tickets matching an intended create")
        p.add_argument("project_id")
        p.add_argument("--title", help="Optional; omitted = Superconductor writes one")
        p.add_argument("--description-file", required=True,
                       help="Markdown file, or '-' for stdin (use a quoted heredoc)")
        if name == "create-ticket":
            p.add_argument("--launch-default", action="store_true",
                           help="Also start one implementation with the default agent profile")
            p.add_argument("--confirm-external-write", action="store_true",
                           help="Required: the user explicitly authorized creating this ticket")
    return parser


def run(argv: list[str] | None = None, client: Client | None = None) -> int:
    args = build_parser().parse_args(argv)
    client = client or Client()
    try:
        cmd = args.command
        if cmd == "whoami":
            result: Any = client.whoami()
        elif cmd == "projects":
            result = client.projects(args.workspace_id, args.limit, args.cursor)
        elif cmd == "resolve-project":
            result = client.resolve_project(args.name, args.workspace_id)
        elif cmd == "tickets":
            result = client.tickets(clean_id(args.project_id, "project_id"), sort=args.sort,
                                    since=args.since, include_implementations=args.include_implementations,
                                    limit=args.limit, cursor=args.cursor)
        elif cmd == "chats":
            result = client.chats(clean_id(args.project_id, "project_id"), sort=args.sort,
                                  since=args.since, limit=args.limit, cursor=args.cursor)
        elif cmd == "implementation":
            result = client.implementation(clean_id(args.id, "implementation id"))
        elif cmd == "implementation-messages":
            result = client.implementation_messages(clean_id(args.id, "implementation id"), args.limit, args.cursor)
        elif cmd == "implementation-diff":
            result = client.implementation_diff(clean_id(args.id, "implementation id"))
        elif cmd == "chat":
            result = client.chat(clean_id(args.id, "chat id"))
        elif cmd == "chat-messages":
            result = client.chat_messages(clean_id(args.id, "chat id"), args.limit, args.cursor)
        elif cmd == "check-create":
            result = client.check_create(clean_id(args.project_id, "project_id"),
                                         _read_text(args.description_file), args.title)
        elif cmd == "create-ticket":
            if not args.confirm_external_write:
                raise ApiError("not_authorized",
                               "Refusing to create a ticket without --confirm-external-write. Pass it "
                               "only after the user explicitly authorized this external write.")
            result = client.create_ticket(clean_id(args.project_id, "project_id"),
                                          _read_text(args.description_file), args.title,
                                          args.launch_default)
        else:  # pragma: no cover - argparse enforces choices
            raise ApiError("usage", f"Unknown command {cmd}")
    except CredentialError as exc:
        print(json.dumps({"error": {"kind": "credential", "message": str(exc)}}, indent=2), file=sys.stderr)
        return EXIT_CREDENTIAL
    except HelperError as exc:
        print(json.dumps({"error": exc.payload}, indent=2), file=sys.stderr)
        return exc.exit_code
    except OSError as exc:
        print(json.dumps({"error": {"kind": "local_io", "message": str(exc)}}, indent=2), file=sys.stderr)
        return EXIT_API
    print(json.dumps(result, indent=2, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    sys.exit(run())
