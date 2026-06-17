# Dev-Data Visualization & Agent Experience (AX)

*Sources: "Beyond bars and lines" (Lozhkin & Turner, 2024) · "3 rules for getting AI agents to find, use — and not exploit — your devtool" (Nazarova & Turner, 2026) · Ona Background Agents Summit 2026.*

## Background-agent session UX

Background agents turn devtool UX into operations UX: the user is no longer staring at one terminal; they are supervising durable cloud sessions, queues, review gates, rework, and handoffs.

- **Make the session a durable object.** Harvey Spectre (`2pod6GeckXc`) treats a cloud agent run like a shared workspace: repo, memory, logs, Slack thread, generated diff, and scheduled repeat work live together. Design the session so a teammate can join late without asking the original prompter to reconstruct context.
- **Progress messages need citations and relevance, not chatter.** incident.io's AI SRE (`uG0Jz6kLWV0`) shows the shape: summarize what the agent checked, link/cite the logs or traces, say whether the finding matters to the incident, and expose the handoff to local IDE/PR work. A "still working" pulse is not enough.
- **Human and agent summaries are different products.** Slack summaries that help a human decide may be too lossy for another agent. A/B test phrasing, remove slop, and keep structured fields for downstream agents while keeping the human view concise.
- **Expose the DAG/list/rework state.** Dark-factory and software-factory talks (`e7AvdrxsbaU`, `a4pEznCiWNo`) make the to-do list operational: requirement -> plan -> tasks -> dependencies -> running agent -> verification -> rework/escalation -> merge. Show blockers, max rework count, failed gate, owner, and next action.
- **Design the handoff as a first-class path.** The agent may start in Slack, continue in a cloud session, open a PR, and hand context to a local coding agent or IDE. Preserve the same issue/request/spec across surfaces; do not make the human paste context between tools.

## The dev-tool data → chart mapping

Target the "goldilocks zone: not too basic, not too complex" (implementable with d3.js/RAWGraphs-class tooling). Each type with its dev-tool recipes:

| Chart | Best for | Dev-tool uses | Watch out |
|---|---|---|---|
| **Highlight table / heat map** | Trends and outliers at a glance via color | ML metrics grids, resource/feature utilization, security severity, daily activity (GitHub commit graph) | Color-perception accessibility; too many hues = noise. Crop numbers + legend the scale ("X × 1000") |
| **Force-directed graph** | Relationships (Obsidian, Neo4j) | Dependency maps; vulnerability spotting via node size; collaboration with edge weight = contribution; API ecosystems | Breaks down at scale; oversimplifies |
| **Sunburst** | Hierarchy from center out (DaisyDisk) | Architecture layers as rings; repo analysis (size = file size/commit frequency, color = type/age); profiling | Bad for exact comparisons; degrades with depth |
| **Treemap** | Part-of-whole, dense | Codebase by LOC/size, color by update frequency; storage; feature usage; task status distribution | Exact values unclear; limited nesting depth |
| **Sankey** | Flows + volumes | Data pipelines; resource allocation (resources → services); traffic with thickness = volume | Messy at scale |
| **Bullet chart** | Progress vs goal vs benchmark, dashboard-compact | Perf benchmarks, coverage/quality vs targets, compliance | Needs stats literacy; crowded scales |
| **Box-and-whisker** | Distributions + outliers, group comparison | Execution time/memory across versions, bug-resolution times, response-time spread | Stats literacy; outliers can distract |

## Agent experience (AX) — the three rules

Frame: "agent-led growth." Agents are now discoverers, users, and threats simultaneously: "Make your product maximally accessible to agents. Assume every agent is hostile until proven otherwise. And do both, at the same time, forever."

### Rule 1 — Be discoverable

"If your tool isn't in the model's answer, you don't exist." Two knowledge systems needing different strategies: **baked-in training data** ("determines what agents *default to*" — Common Crawl, GitHub, Stack Overflow, Wikipedia) vs **live retrieval** ("determines what agents *discover today*" — and each LLM retrieves differently). The funnel: Discovery → Candidacy → Framing → Selection. Heuristics:
- Labels lock you out of categories: "If your comparison pages always pair your tool with one ecosystem, LLMs will never recommend you for another."
- **Own your "vs" pages** — or the competitor's evaluation dimensions decide.
- **Specificity wins:** "'P95 latency of 62ms' gets recommended. 'Fast and reliable' gets listed but not chosen."
- Playbook by impact: comparison/topic landing pages → awesome-lists → genuine community answers → a README led by "a drop-in replacement for X that does Y 10x faster" + install + example + comparison table → `llms.txt` and `.md` docs (their value is in agent-followed links, not crawlers) → customer engineering blogs → RAG-friendly writing (defined terms, explicit claims, self-contained sections).
- Audit: run the same 15–20 queries across LLMs and ask "list every source URL you consulted"; distinguish reach problems from positioning problems; "not crawled = not trained on."

### Rule 2 — Be usable by agents

"An agent that recommends your tool but can't set it up without a human hasn't converted anyone." Invert traditional onboarding ("sign up → verify → configure → use") to **use → create → claim** — let an agent deploy/create anonymously, then a human claims the resource (that claim is your conversion event). The agent-usability stack: predictable REST + OpenAPI over clever SDK fluency ("token-budget-aware design"), MCP servers (self-describing), standalone CLIs, SDK context files, agent skills. **The acceptance test: "can an external agent ship a feature with your tool using only your docs and a prompt?"** And mind payments: "agent-first growth without an agent-first payment path is a party where nobody pays for drinks."

### Rule 3 — Defend

The growth channel is the attack surface. The practical floor:
- Detect and label actors (`actor_type`: human/agent/unknown); agent-scoped derivative keys.
- **Progressive trust, four tiers:** Anonymous (read-only, hard rate limits) → Keyed (create resources) → Claimed (full minus destructive — the conversion event) → Trusted (destructive with confirmation).
- **Tiered feedback:** anonymous actors get generic errors ("don't educate the attacker"); keyed actors get structured errors including `human_confirmation_required` + an approval URL ("This is your human-in-the-loop — not a separate system, just a structured error response"); trusted actors get rich deprecation guidance.
- Rate-limit by identity, not IP; alert on per-key cost spikes (~3× median daily); audit your own MCP server in CI.

> The 2026 post's retrieval percentages, vendor lists, and payment-protocol landscape date fastest; the two-knowledge-systems model, the funnel, use→create→claim, the docs-and-a-prompt test, and the trust tiers are the durable layer.
