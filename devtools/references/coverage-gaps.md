# Developer Tools Coverage Gaps

Use this file to park developer-tool standards that need stronger evidence before becoming reusable rules.

## Candidate Gaps

- **Agent-facing developer-tool surfaces.** `devtool-interface-design` includes agent experience, but needs more accepted examples for task handoff, context files, background-agent status, and safe interrupt/stop affordances. The CLI interrupt and remote-evidence rules in `devtool-interface-design/cli-for-humans-and-agents.md` (first Ctrl+C stops local work; never claim remote work was canceled) cover the terminal case from one vendor only.
- **Vendor agent plugins.** The AX file carries one worked example (Interfere, 2026-11): a search/execute MCP server with a read-only endpoint, setup and investigation skills, and a CLI whose skills are generated from the API spec. It is a single vendor's design read from its repo, with no usage evidence. Promote the bullets to named rules after a second vendor plugin shows the same decisions or a local plugin is built this way. A second vendor, Textures (2026-11-22), documents the same small, constant, search-first MCP tool list (`search_textures`, `get_texture`, plus `check_textures` for checking the result) and the same per-client setup. That corroborates the search-then-act shape in design, but not the exact two-tool count; neither server was called, and the shape is still unproven in use against a tool-per-endpoint server. Textures' markdown twins, paid-content stop message, estimated-token metadata and consent-gated `AGENTS.md` block are single-vendor and stay worked-example bullets.
- **CLI output linting.** The interface reference gives CLI progress/output rules; a deterministic check could catch noisy logs, missing next steps, or unstable progress labels, but no script or fixture exists yet. The Vercel CLI standard names candidate mechanisms (a lint banning direct TTY/CI checks outside shared code, one result writer, a test helper asserting one stdout document and a clean stderr under `--json`, a seven-mode test matrix); they are that vendor's plan, not something run here.
- **Commercial vs OSS pricing boundary.** The GTM/OSS split is documented, but examples are needed for hybrid projects that are open source, have cloud hosting, and sell enterprise contracts.
- **Dev-data visualization examples.** The data-to-chart mapping exists in `devtool-interface-design/data-viz-and-agents.md`; it needs before/after examples for logs, traces, dependency graphs, queues, and CI history.
- **Developer onboarding a-ha moments.** The references describe onboarding, but need examples of first-command, first-success, and first-error states across CLI, docs, dashboard, and SDK surfaces. The CLI error anatomy now gives a shape for first-error; it still lacks before/after transcripts from a second tool.
- **Single-vendor CLI contract (parked as unverified).** `devtool-interface-design/cli-for-humans-and-agents.md` rests on one source, Vercel CLI's `cli-ux` contributor skill, which describes a target its own code has not reached (it says its JSON error documents still go to stdout today). Needs a second independent CLI standard or shipped-behavior check before any of these become named standards: the four-setting mode model; "agents are non-interactive, not a format"; JSON errors on stderr; the exit-code mapping (`2` for usage and missing input, `130` for a declined confirmation); the `--yes` / `--force` split; type-the-name for severe operations; the effects-digest rerun; `next` entries with an argv array; amount-as-consent for purchases. Its numbers (100 ms feedback, 200 ms help, 100-character headline, 8-line error, 5-item list cap, 7-day relative ages, one-major-version deprecation) are house values, not measured thresholds.
- **Agent compliance with the `--yes` rule.** "An agent must not add `--yes` without human approval" is an instruction to the agent, not an enforcement mechanism. No evidence here on how often agents honor it; the source mentions agent evals but they were not in the checkout.
- **Agent-readable API docs (parked as unverified).** The three gates and seven patterns come from one vendor course skill (Vercel Academy). The course itself calls the seven patterns design recommendations, not measured formats. The skill's reference files cite a Vercel and Ora trace study (73 of 119 code-bearing answers copied a line verbatim from a fetched page; 86% of attributed llms.txt fetches followed a link; 36% of runs that reached llms.txt then fetched a listed page). The study was not read, so those figures stay out of the reference. llms.txt remains a proposal, not a standard.
- **API-side rules the fold did not find.** Neither source gives agent-facing API guidance on auth flows, idempotency-key design, pagination contracts, versioning, or rate-limit responses beyond what the CLI standard implies for its own client (keyed retries, `Retry-After` as delay only, opaque cursors). The API error-body shape is also open: the course uses a bare message string, the CLI standard a reason code plus message.

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
