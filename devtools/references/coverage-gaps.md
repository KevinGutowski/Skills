# Developer Tools Coverage Gaps

Use this file to park developer-tool standards that need stronger evidence before becoming reusable rules.

## Candidate Gaps

- **Agent-facing developer-tool surfaces.** `devtool-interface-design` includes agent experience, but needs more accepted examples for task handoff, context files, background-agent status, and safe interrupt/stop affordances.
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
