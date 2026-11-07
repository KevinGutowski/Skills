---
name: superconductor
description: "Read and create Superconductor work through the official API instead of browser automation: verify the token user, list projects (by workspace), tickets, and chats, read implementation status, messages, and diffs, read chats, and create a text ticket with optional default-agent launch. macOS Keychain per-device token. Triggers: Superconductor project, ticket, chat, implementation, superconductor.com URL."
---

# Superconductor API

Use the official Superconductor REST API through `scripts/sc_api.py` (Python standard library only). Do not drive the Superconductor web app with a browser for anything this API covers.

## Live docs are the source of truth

- Docs: https://www.superconductor.com/docs/api · OpenAPI: https://www.superconductor.com/docs/api/openapi.yaml
- Everything endpoint-specific in this skill and its helper was **last verified on 2026-11-06** and may be stale. Never vendor the full schema here.
- Re-read the live docs/OpenAPI before using an endpoint the helper does not wrap, before any mutation you have not done this session, and whenever a response does not match expectations.
- The helper fails closed (exit 4) on schema drift, non-JSON bodies, redirects, or undocumented statuses. Do not work around that by inventing fields or guessing; re-read the live docs, then fix the helper or tell the user.
- The API cannot launch agents on existing tickets, send messages, or open PRs (as of 2026-11-06). Say so instead of improvising; those happen in the app.

## Credentials: one revocable token per device

The helper reads the token from the device's secure store via `scripts/sc_credentials.py`, keeps it in memory, and sends it only as the bearer header to `https://www.superconductor.com/api/v1`.

- macOS: login Keychain generic password, service `com.superconductor.api`, account `$USER`. The helper runs the equivalent of `security find-generic-password -a "$USER" -s "com.superconductor.api" -w` without echoing the result.
- Never print, log, cache, commit, or place the token in tickets, prompts, command arguments, fixtures, or artifacts. Never ask the user to paste it into chat. Do not `curl` with the token yourself; use the helper.
- If the item is missing (exit 3), relay the helper's setup message and stop. The user runs it in their own terminal; the trailing `-w` gives a hidden prompt:

  ```bash
  security add-generic-password -U -a "$USER" -s "com.superconductor.api" -w
  ```

  The token comes from Superconductor → Account Settings → Developer → Personal access tokens. Name it for the device so it can be revoked alone.
- Never delete or rotate credentials during normal use. Other platforms have no adapter yet: add one to `ADAPTERS` in `sc_credentials.py` backed by that platform's secure store, not by env files.

## Workflow

Set `S` to this skill's `scripts/` directory (for example `S=~/.codex/skills/superconductor/scripts`). Output is JSON on stdout; errors are JSON on stderr.

| Task | Command |
|---|---|
| Verify the token user | `python3 $S/sc_api.py whoami` |
| List projects (one page) | `python3 $S/sc_api.py projects [--workspace-id W] [--limit N] [--cursor C]` |
| Resolve a project by name | `python3 $S/sc_api.py resolve-project "Exact Name" [--workspace-id W]` |
| List tickets | `python3 $S/sc_api.py tickets PROJECT [--sort created\|last_activity] [--since ISO] [--include-implementations]` |
| List chats | `python3 $S/sc_api.py chats PROJECT [--sort ...] [--since ISO]` |
| Implementation status / messages / diff | `implementation ID` · `implementation-messages ID` · `implementation-diff ID` |
| Chat details / messages | `chat ID` · `chat-messages ID` |
| Create a ticket | see Mutation safety |

- IDs are the last path segment of Superconductor URLs (`/tickets/<ticket>/implementations/<implementation>`); the helper also accepts a full `superconductor.com` URL and uses its last segment.
- Lists are paginated: when `next_cursor` is not null, pass it back as `--cursor`.
- There is no single-ticket GET: to read one ticket, list the project's tickets (with `--include-implementations`) and pick it by `id`/`friendly_id`, paging as needed.

### Resolving projects: never guess

Project IDs come only from live API results. Use `resolve-project`, which matches the exact name (case-insensitive) across all pages. On two or more matches or no exact match it exits 1 and lists candidates with their workspaces: show those to the user and ask. Never pick the "closest" name or reuse an ID from memory.

## Mutation safety (create ticket)

Reads may run whenever the task needs them. Creating a ticket is an external write:

1. Create only when the user explicitly authorized this ticket in this conversation. Confirm the resolved project (name, workspace, ID), title, description, and whether to launch the default implementation.
2. Write the description to a file with a quoted heredoc, so no shell interpolation touches ticket text, then send **one** request:

   ```bash
   cat > /tmp/sc-ticket.md <<'EOF'
   Ticket description in Markdown.
   EOF
   python3 $S/sc_api.py create-ticket PROJECT --title "Title" \
     --description-file /tmp/sc-ticket.md [--launch-default] --confirm-external-write
   ```

   `--title` is optional (Superconductor writes one if omitted). `--launch-default` starts one implementation with the user's default agent profile.
3. Report the ticket `url`, `id`/`friendly_id`, and each `implementation_launches` entry. `launched: false` with a `launch_error` means the ticket exists but no agent started; tell the user to check agent credentials and launch from the ticket. Never report headers or credentials.
4. Exit 5 means the outcome is **ambiguous** (timeout, network error, truncated response, 5xx, undocumented status, unreadable or mistyped 201). Do not retry. Kind `ambiguous_launch` means the ticket exists (its URL is in the error) but the launch result doesn't match the request: report the URL and have the user check the ticket; never recreate it. Run `check-create PROJECT --title "Title" --description-file /tmp/sc-ticket.md` (read-only; compares the newest tickets) and report what you find. Only consider another POST after confirming no match and getting the user's go-ahead.

## Errors

| Status | Meaning (live docs, 2026-11-06) | What to do |
|---|---|---|
| 401 | Token missing, mistyped, expired, or revoked | User creates a new device token and replaces the Keychain item |
| 403 | Workspace role can't create tickets there (Viewers are read-only) | Ask a workspace Owner/Admin; do not retry |
| 404 | Wrong ID, or no access (the API won't say which) | Re-resolve the ID from list results |
| 422 | Ticket couldn't be saved; nothing created | Fix what `api_error.message` says |
| 400 | Invalid parameter; `details` has JSON pointers | Fix the parameter |

Exit codes: 0 ok · 1 API/usage error · 3 credential · 4 schema drift or unexpected status · 5 ambiguous create.

## References

- [references/maintenance.md](references/maintenance.md) — what is verified locally vs. linked out, how to re-verify against the live OpenAPI, out-of-scope items (attachments, MCP server), and running the offline tests.
