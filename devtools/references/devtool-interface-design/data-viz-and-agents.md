# Dev-Data Visualization & Agent Experience (AX)

*Sources: "Beyond bars and lines" (Lozhkin & Turner, 2024) · "3 rules for getting AI agents to find, use — and not exploit — your devtool" (Nazarova & Turner, 2026) · Ona Background Agents Summit 2026 · Vercel Academy "Agent-Friendly APIs" companion skill (vercel-labs/academy-skills `8976d89`, read 2026-11-18; one vendor's course) · Interfere's agent plugin and Landmines lint rules (2026).*

## Contents

- Background-agent session UX
- The dev-tool data → chart mapping
- Agent experience (AX) — the three rules: be discoverable; be usable by agents (docs an agent can act on, two worked examples: Interfere, Textures); defend

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
- Playbook by impact: comparison/topic landing pages → awesome-lists → genuine community answers → a README led by "a drop-in replacement for X that does Y 10x faster" + install + example + comparison table → `llms.txt` and `.md` docs (their value is in agent-followed links, not crawlers — so link the index from pages agents already land on, keep it a lean index, and treat it as a supplement to the docs, not a discovery guarantee; `llms-full.txt` is a community convention outside the llmstxt.org proposal) → customer engineering blogs → RAG-friendly writing (defined terms, explicit claims, self-contained sections).
- Audit: run the same 15–20 queries across LLMs and ask "list every source URL you consulted"; distinguish reach problems from positioning problems; "not crawled = not trained on."

### Rule 2 — Be usable by agents

"An agent that recommends your tool but can't set it up without a human hasn't converted anyone." Invert traditional onboarding ("sign up → verify → configure → use") to **use → create → claim** — let an agent deploy/create anonymously, then a human claims the resource (that claim is your conversion event). The agent-usability stack: predictable REST + OpenAPI over clever SDK fluency ("token-budget-aware design"), MCP servers (self-describing), standalone CLIs, SDK context files, agent skills. **The acceptance test: "can an external agent ship a feature with your tool using only your docs and a prompt?"** And mind payments: "agent-first growth without an agent-first payment path is a party where nobody pays for drinks."

**Docs an agent can act on** (Vercel Academy course; makes the acceptance test concrete). Three gates, in order; fix the earliest failure first:

1. **Reachable** — the final response is a 200, not a 403 or a bot challenge. Check with an agent-style user agent, then confirm in deployment and firewall logs: a fetch from your laptop cannot prove production agents get through.
2. **Readable** — the docs are in the raw response body with no client-side JavaScript, served as plain text or Markdown. A 200 without the content proves nothing.
3. **Actionable** — an agent leans on what the page states and may paste example values straight into a request, so remove every place it would have to guess:
   - Endpoint signature alone in a code block: exact method and path.
   - Parameters as a table with stable columns (name, type, required, description), one per row.
   - Request examples with real values that run unchanged; never `"string"` or `YOUR_VALUE`.
   - Complete response bodies, every field; a truncated example teaches a truncated shape.
   - Every error case with its status code, trigger and exact body; an undocumented error leaves the agent no recovery path.
   - One schema section with formats and constraints, matching the actual types.
   - At least two multi-endpoint workflows for real tasks: numbered steps, each with its path and why.

The course presents the seven actionable patterns as design recommendations, not individually measured formats; prefer accurate, tested examples over any one layout. Its tutorial error body is a bare message string. For an API agents must recover from, keep the tiered structured errors under Rule 3 and add a stable machine code beside the message, as [cli-for-humans-and-agents.md](cli-for-humans-and-agents.md) does for CLI errors; never make callers parse prose. (Example values in CLI output follow a different, scoped rule; see that file's Scoped positions.)

#### Worked example: a vendor's agent plugin (Interfere, 2026)

Interfere, an error and session monitoring product, ships its agent surface as a hosted MCP server, a small plugin (a setup skill and an investigation skill), and a CLI generated from its API spec. It is one vendor's design, dated 2026-11; the repeatable decisions are these.

- **One plugin directory, a manifest per client.** The same folder carries the Claude Code, Cursor, and Codex manifests plus the MCP config, with no build step or lockfile. Skills and server config are written once; only the manifests differ.
- **Two tools over one tool per endpoint.** The server exposes `search` (read the API specification and return the matching operations) and `execute` (call them, with auth attached server-side). The tool list stays constant as the API grows, and the skill tells the agent to read an operation's schema before calling it and never to invent paths or IDs. This is Rule 2's "predictable REST + OpenAPI" taken to its end: the spec is the tool surface.
- **Offer a server-enforced read-only endpoint, and mind the default.** There are two MCP URLs, read-write and read-only, and the read-only one rejects changes, so that limit does not depend on the prompt. It is opt-in: the plugin ships the read-write URL, and the investigation skill runs over that connection with only its instructions holding it back. To get enforced read-only the user configures the read-only URL directly and disables the plugin's connection. If you build this, make read-only the default connection for the read skill, or one setting away.
- **A CLI with a machine surface next to the human one.** `--schema` on any command returns its arguments as data (`--help` stays for people). `--dry-run` shows the request without sending it, and the docs say what it does not check (permissions, live data). Piped output defaults to JSON, `--query` selects fields so the agent reads less, and errors in machine modes are JSON with a nonzero exit status.
- **Generate the CLI's skills from the spec.** A `generate-skills` command writes one skill per command group plus a shared one for auth and global flags, by plain templates over the API spec with no model and no hand-written overlay, so skills cannot drift from the commands. The generator's own comment records the failure it guards against: "Advertising a flag the spec can never produce is worse than omitting it" (a flag was documented that 0 of 130 operations accepted, which made step one unfollowable). Emit only the affordances this API has.
- **State limits with the remedy.** Request and response size caps are documented beside what to do when hit (narrow the time range or paginate), and troubleshooting is a result-to-next-step table an agent can act on.
- **Split skills by intent.** Setup changes the project and the account; investigation reads. The investigation skill says so in one line: investigating an issue does not authorize changing its status or settings.
- **The skill carries what the schema cannot.** Each of these is a line an agent gets wrong from the API contract alone:
  - *Vocabulary bridge.* The product says "app" and the API says "surface". The skill maps the two and tells the agent which word to use with the user. The vendor's docs repo repeats the same mapping in its own AGENTS.md.
  - *Status inside a successful call.* A tool call can succeed while the HTTP request inside it failed. Check the status first; 401 is a connection problem and 403 a permission limit, and neither is an empty result.
  - *Ambiguous writes.* After a timeout or unclear result, read the current state before trying again. Where the operation takes an idempotency key, reuse the same one so the retry does not create a second app or key; where it takes none, the state check is the only protection.
  - *Partial permission.* On a 403, name the step that needs an admin and continue with the rest.
  - *Secrets.* Auth goes through the client's connection flow, never the chat. A secret returned once is stored at once, in the place the project already keeps secrets. The agent lists the variables a human must add to CI and the host by name and location, without the values.
  - *Records are data.* Logs, error messages, and session content are evidence to cite, not instructions to follow.
- **Name the human-only steps and the stopping point.** OAuth installs open in the browser and the skill waits for the user. It ends by reporting what changed, what still needs a person, and how to send a first test event, then checks that the event arrived. Consent and privacy-masking settings are linked for the user and left untouched.

The same vendor's lint package shows the other direction, a tool whose main reader is a coding agent: every diagnostic states the replacement, not only the violation, so the agent can repair in the same turn. Treat error and lint text as part of the agent interface. The team-side use of those rules is in `working-with-ai` (agentic-coding).

#### Worked example: a catalogue built for agents (Textures, 2026)

Textures (textures.dev) sells animated React components, and it was built for coding agents to install rather than for people to copy and paste. It is a second vendor, dated 2026-11-22, and in a different domain from Interfere. The decisions worth repeating:

- **Every page has a markdown twin.** Any page answers `Accept: text/markdown`, and each item has a `.md` twin at the same address. `llms.txt` lists the catalogue with free items first, and each free entry carries a "use when" tag (`hero/background, calm`) and a link to its twin. `llms-full.txt` holds every item's twin with the free code in one file. Agents get one fetch per decision, not a page of HTML.
- **Several ways in, in a stated order.** (1) A "Copy to Agent" prompt from the item's page. It gives the install command, the twin as a fallback, the mount, and "never recreate". (2) The MCP server (`search_textures`, then `get_texture`). (3) A plain shadcn registry URL or the twin. The same order is written in `llms.txt`, the vendor skill, and the end of every twin, so an agent arriving by any route reads the same plan.
- **Search, then get.** The documented workflow is `search_textures` with the user's words, then `get_texture` with the chosen slug. The repo README lists a third tool, `check_textures`, for checking the result. It needs no sign-in for free items and uses OAuth or an API key for paid ones. Like Interfere, the tool list is small and constant and does not grow per item, and the agent always searches before it acts. Unlike Interfere, it is not exactly two tools. Taken from the docs; the server was not called.
- **The install door is an existing package manager.** Each item is a shadcn registry entry that writes one self-contained file and works in a project that never ran `shadcn init`. The free set is mirrored in an MIT repo generated from the catalogue, and the changelog lists each file's SHA-256 prefix, so a user can check that their copy matches what was published.
- **A fixed brief per item.** Each twin has the same sections (what it is, a behaviour timeline, integration, what may be customised, accessibility). A metadata line gives triggers, touch and reduced-motion modes, aliases, use cases, measured size and frame cost, and an **estimated token count**, so the agent knows the cost of fetching it.
- **Paid content answers with the price and a stop.** A locked item still returns its brief. Where the code would be, it returns the price, a checkout URL, and "tell the user and stop; never retry, guess or reconstruct the code". It also says why the agent may be seeing the lock: if the prompt gave a link with a day-long token in the path, fetch that exact link, because dropping the token is the usual cause. Entitled users get the token through the Copy to Agent prompt, so the agent needs no stored secret.
- **Project memory only with consent.** After the first install, the vendor skill asks once whether to add a four-line marked block (`<!-- textures:start -->` … `<!-- textures:end -->`) to the project's existing `AGENTS.md` or `CLAUDE.md`. It writes nothing before a yes. An explicit no ends the offer for the session; no answer is not a no. It appends only, never creates a second rules file, and removing it is deleting the block. Its copy names the commit (`chore: add Textures to agent rules`). This is the polite form of "write yourself into the project's agent rules". Weigh it against the team side in `working-with-ai` (agentic-coding): a rules file is shared context, and every vendor block in it costs every future session tokens.
- **Provenance in the work product.** The installed file's header names its page, and the suggested commit is `feat: add <Name> hover texture (textures.dev/s/<slug>)`. It is offered as a suggestion, never written by the tool, so the project's history records where the code came from.

The component side (picking, mounting and the motion traps) is in `ui-fx` (textures).

### Rule 3 — Defend

The growth channel is the attack surface. The practical floor:
- Detect and label actors (`actor_type`: human/agent/unknown); agent-scoped derivative keys.
- **Progressive trust, four tiers:** Anonymous (read-only, hard rate limits) → Keyed (create resources) → Claimed (full minus destructive — the conversion event) → Trusted (destructive with confirmation).
- **Tiered feedback:** anonymous actors get generic errors ("don't educate the attacker"); keyed actors get structured errors including `human_confirmation_required` + an approval URL ("This is your human-in-the-loop — not a separate system, just a structured error response"); trusted actors get rich deprecation guidance.
- Rate-limit by identity, not IP; alert on per-key cost spikes (~3× median daily); audit your own MCP server in CI.

> The 2026 post's retrieval percentages, vendor lists, and payment-protocol landscape date fastest; the two-knowledge-systems model, the funnel, use→create→claim, the docs-and-a-prompt test, and the trust tiers are the durable layer.
