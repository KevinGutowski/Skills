# Developer Tools Coverage Gaps

Use this file to park developer-tool standards that need stronger evidence before becoming reusable rules.

## Candidate Gaps

- **Agent-facing developer-tool surfaces.** `devtool-interface-design` includes agent experience, but needs more accepted examples for task handoff, context files, background-agent status, and safe interrupt/stop affordances.
- **Vendor agent plugins.** The AX file carries one worked example (Interfere, 2026-11): a search/execute MCP server with a read-only endpoint, setup and investigation skills, and a CLI whose skills are generated from the API spec. It is a single vendor's design read from its repo, with no usage evidence. Promote the bullets to named rules after a second vendor plugin shows the same decisions or a local plugin is built this way. A second vendor, Textures (2026-11-22), documents the same small, constant, search-first MCP tool list (`search_textures`, `get_texture`, plus `check_textures` for checking the result) and the same per-client setup. That corroborates the search-then-act shape in design, but not the exact two-tool count; neither server was called, and the shape is still unproven in use against a tool-per-endpoint server. Textures' markdown twins, paid-content stop message, estimated-token metadata and consent-gated `AGENTS.md` block are single-vendor and stay worked-example bullets.
- **CLI output linting.** The interface reference gives CLI progress/output rules; a deterministic check could catch noisy logs, missing next steps, or unstable progress labels, but no script or fixture exists yet.
- **Commercial vs OSS pricing boundary.** The GTM/OSS split is documented, but examples are needed for hybrid projects that are open source, have cloud hosting, and sell enterprise contracts.
- **Dev-data visualization examples.** The data-to-chart mapping exists in `devtool-interface-design/data-viz-and-agents.md`; it needs before/after examples for logs, traces, dependency graphs, queues, and CI history.
- **Developer onboarding a-ha moments.** The references describe onboarding, but need examples of first-command, first-success, and first-error states across CLI, docs, dashboard, and SDK surfaces.

## Promotion Form

```markdown
standard/{stable-id}
Status: proposed | accepted | rejected
Devtool surface:
User/developer job:
Rule:
Why:
Mechanical check possible:
Exceptions:
Source:
Bad example:
Good example:
Approver:
```
