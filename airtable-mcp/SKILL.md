---
name: airtable-mcp
description: Set up, authenticate, verify, and troubleshoot Airtable's remote MCP server in Codex. Use when the user asks about Airtable MCP auth, connecting Airtable to Codex, `Auth required`, `codex mcp login airtable`, `mcp.airtable.com/mcp`, missing Airtable connector UI, resetting/reloading Airtable MCP, or using Airtable MCP tools to list bases, inspect schemas, or update records.
---

# Airtable MCP

## Core Facts

- Airtable MCP endpoint: `https://mcp.airtable.com/mcp`
- Airtable support docs: `https://support.airtable.com/docs/using-the-airtable-mcp-server`
- Codex MCP config lives in `~/.codex/config.toml`, under `[mcp_servers.<name>]`.
- Codex Desktop may use its bundled CLI, not the first `codex` on `PATH`. Prefer the bundled binary when debugging Desktop auth:

```sh
"/Applications/Codex.app/Contents/Resources/codex" --version
```

## Setup

Check whether Airtable is already configured:

```sh
"/Applications/Codex.app/Contents/Resources/codex" mcp get airtable --json
```

If missing, add it:

```sh
"/Applications/Codex.app/Contents/Resources/codex" mcp add airtable --url https://mcp.airtable.com/mcp
```

Authenticate it:

```sh
"/Applications/Codex.app/Contents/Resources/codex" mcp login airtable
```

If running from a sandboxed shell fails with `Operation not permitted`, rerun the login command with escalated permissions. OAuth needs to open or print a browser authorization URL, bind a local callback listener, and store credentials.

## Verification

First verify the MCP server is reachable:

```text
mcp__airtable__.ping -> pong
```

Then verify auth with a real authenticated call:

```text
mcp__airtable__.list_bases
```

Do not treat `ping` alone as proof that Airtable is authed. `ping` can succeed while authenticated calls still return `Auth required`.

## Stale Thread Behavior

If `codex mcp login airtable` succeeds but MCP tool calls in the current Codex thread still return `Auth required`, assume the live MCP client cached an unauthenticated connection.

Fix:

1. Fully reload Codex Desktop or start a fresh Codex session/thread.
2. Trigger the Airtable tools again with `tool_search` if needed.
3. Test with `list_bases`, not only `ping`.

This stale-client behavior was observed after successful OAuth login. The current thread did not hot-reload the new credentials.

## Debug Checklist

When Airtable MCP fails:

1. Run `codex mcp list` and `codex mcp get airtable --json`.
2. Compare the CLI path:

```sh
which codex
codex --version
"/Applications/Codex.app/Contents/Resources/codex" --version
```

3. Prefer the bundled Desktop binary for `mcp login` if working inside Codex Desktop.
4. If there is no Airtable connector UI in Codex, do not wait for one. Use the MCP CLI login flow.
5. If a new session worked before but the current one does not, suspect cached auth state and reload Codex Desktop.

## Airtable Tool Use

When tools are available, follow the normal Airtable workflow:

1. `search_bases` or `list_bases`
2. `list_tables_for_base`
3. `get_table_schema` before select/multi-select filtering or schema-sensitive writes
4. `list_records_for_table` or `search_records`
5. `create_records_for_table` / `update_records_for_table`

Always use Airtable internal IDs for base, table, field, choice, and record references. Do not invent IDs.

## Security

Never log or save:

- OAuth callback URLs containing `code=`
- authorization codes
- access tokens
- refresh tokens
- PATs
- `Authorization: Bearer ...` header values
- client secrets

It is fine to save non-secret endpoint URLs, command shapes, base IDs, table IDs, field IDs, and record IDs when useful.
