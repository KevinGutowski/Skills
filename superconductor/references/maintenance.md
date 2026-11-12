# Maintaining the Superconductor skill

Endpoint details here and in `scripts/sc_api.py` were **last verified on 2026-11-06** against https://www.superconductor.com/docs/api and its OpenAPI document (https://www.superconductor.com/docs/api/openapi.yaml, `info.version: "1"`). Treat them as a cache that can go stale.

## What lives locally vs. what is linked out

Kept locally (stable workflow and safety):

- Credential storage and lookup rules (`scripts/sc_credentials.py`).
- The one-POST, no-retry create rule and the ambiguous-outcome check.
- Exact-name project resolution that refuses to guess.
- The fields the helper reads and their JSON types, nullable where the OpenAPI says so (`FIELDS`/`OPTIONAL_FIELDS` in `sc_api.py`), so missing or retyped fields fail loudly.

Linked out (read live when needed): every other field, enum values, query parameters beyond the ones the helper exposes, limits, attachment upload, and any new endpoint.

## Re-verify against the live API

Do this when a call fails with exit 4, when the docs mention new functionality, or before extending the helper:

```bash
curl -sS https://www.superconductor.com/docs/api/openapi.yaml -o /tmp/sc-openapi.yaml
```

1. Compare the `paths` used in `sc_api.py` with the live `paths` (method, path, documented status codes).
2. Compare each `FIELDS` entry with the live schema's `required` list and property types (including `null`). Remove fields the helper no longer reads; never add fields the live schema does not define.
3. Re-check the docs' Troubleshooting section for 401/403/404/422 guidance and update `HINTS`.
4. Update the "last verified" date in `SKILL.md`, this file, and `sc_api.py` together.
5. Run the offline tests.

Do not commit the downloaded OpenAPI document.

## Out of scope (v1)

- **Attachments.** The live API supports presigned uploads (presign → multipart upload → upload IDs in `ticket.attachments`). The helper does not wrap this; read the live "Attach files" section if a user needs it, and keep the one-POST rule for the final create.
- **MCP server.** Not needed: the helper is a CLI any agent can call.
- **Sending messages.** The live API has `POST /ticket_implementations/{id}/messages` and `POST /chats/{id}/messages` (seen 2026-11-12); the helper does not wrap them yet.
- **Launching agents on existing tickets, opening PRs.** Not in the API as of 2026-11-12.
- **Non-macOS credential stores.** Add an adapter to `ADAPTERS` in `sc_credentials.py`, backed by the platform's secure store; keep the token out of argv, env dumps, and files.

## Offline tests

No live token or network is required; HTTP and Keychain access are stubbed:

```bash
python3 -B -m unittest discover -s superconductor/scripts -p 'test_*.py'
```

Coverage: missing or malformed credential (e.g. an embedded newline) fails before any request and without leaking data; reads return structured JSON; create sends the intended project/title/description and optional default launch exactly once; network ambiguity, 5xx, truncated bodies at the real urllib boundary (local test server), unreadable or mistyped 201, and a launch-count mismatch do not retry; missing or mistyped fields, non-JSON, and redirects fail closed; ambiguous project names are refused.
