# Developer-Tool Interface Design

*Scope: Design interfaces for developer tools — software with no happy path: the five UI zones, CLI progress and clean-log rules, devtool onboarding, agent experience (AX). Use for a devtool's UI, panel layout, CLI output, onboarding, or agent-facing surface. Triggers: dev tool UI, properties panel, command palette, CLI UX, devtool onboarding, agent experience, AX.*

**Sources:** [devtool-interface-design/sources.md](devtool-interface-design/sources.md) — 7 Evil Martians Chronicles posts + Cursor/tldraw/Notion interviews + Vercel CLI's `cli-ux` contributor standard and the Vercel Academy agent-friendly-APIs course skill (both single-vendor, 2026-11).

The worldview: dev tools are **workbenches, not funnels**. "There is no 'happy path' for a dev tool… what seems to be a tiny edge case might actually be the main case for a particular user." Users live in the tool for hours daily and paths jump between panels with no final conversion action — so optimize for density, control-flow legibility, friction-per-repetition, and time-to-a-ha, not guided journeys.

## Contents

- The three contexts
- The control-flow rule
- The five zones (do/don't anatomy)
- CLI progress & output (incl. the contract for scripts and agents)
- Onboarding to the a-ha moment
- Pro-tool lessons from Config
- Visualizing dev data & designing for agents (AX)
- Tools as decision-making machines
- AI-era devtool design
- Checklist · Staleness note · Relationship to other skills

## The three contexts

- **Immediate** (current granular action): pack the whole small task into one panel; reduce per-action friction — "if there are more than 3 options, use a dropdown menu; for 3 or fewer, opt for a group of radio buttons or a toggle switch"; sliders bound to text inputs; avoid dialogs; panel footers for secondary actions/status.
- **Intermediate** (the task within the app): support several small contexts at once (adjacent files, bird's-eye canvas); property UI must never cover the thing it affects; popups persist scroll position and last tab. "Don't be afraid to offer a wide array of settings. Even the tiniest inconvenience, when encountered hundreds of times a day, can result in a great amount of frustration" — resizable, re-orderable panels.
- **Broad** (the job across apps): design for how the tool sits in a day — windowed beside a browser, docked under an IDE; responsive layout even on desktop; test limited-height windows.

Layout dominance: if most work happens in one surface (canvas/editor), make it dominant; if work splits evenly, let nothing dominate. Don't burn real estate on a logo.

## The control-flow rule

**"Elements on the top should control elements on the bottom, and elements on the left should control elements on the right."** Tabs control content below; nav selects what the main area shows; selection drives the right-hand properties panel; in query builders the leftmost choice determines the rest of the line. Nesting mirrors the app's internal hierarchy (files contain code, objects contain properties). **Opposite flows mean transformation**: bottom/right controls *modify* current content (a filter field under a tree) rather than replacing it. Grounded in the STEARC effect — reverse horizontal flow for RTL locales. Breakable with reason ("some IDEs have bottom file tabs, and that doesn't bother anyone!").

## The five zones (do/don't anatomy)

1. **Tabs** — active state distinct beyond color alone (dim rooms); close icon on the active tab only; overflow via menu/search or scrolling, never chaos.
2. **Toolbars** — derive from the common workflow first; group to avoid crowding; consistent sizing; context-adaptive; generous hit areas.
3. **Nav sidebars** — indented tree, consistent collapse behavior; don't bury key actions in dense trees; watch render performance on large structures.
4. **Properties panels** — label–value format; inline editing with *consistent* control choices ("don't use a dropdown for one X value and an input field for others"); never truncate labels or values.
5. **Tables** — header hierarchy (bold headers, lighter data); hover row states; sticky headers (mind performance); keyboard and screen-reader access.

## CLI progress & output

Never the silent treatment — "I strongly advise against leaving users staring at a blinking cursor." Choose by shape of work: **spinner** (liveness only; name the phase and tick it per completed unit so a stall is visible) → **X of Y** ("make it your standard" for measurable step-wise work) → **progress bar** ("in the CLI world, they might be overkill. Think twice" — best for parallel long tasks, or one aggregate bar). Clean-log rules: clear transient UI when done; green + checkmarks for *completed* work only (never for accepted, queued or partial work, and never color or glyph as the sole carrier of meaning); animate only on an interactive TTY and print each phase once as a plain line in CI, pipes and agent runs; honor `NO_COLOR`; test piped output (`> file.txt`, `| grep`); and switch "-ing" to "-ed" in final logs — "once it's done, they're misleading."

**The CLI contract for scripts and agents** (Vercel CLI's contributor standard, 2026 — one vendor's target; full rules in [devtool-interface-design/cli-for-humans-and-agents.md](devtool-interface-design/cli-for-humans-and-agents.md): modes, prompts, consent tiers, error anatomy, `--json`, exit codes, naming, help, secrets, deprecation, test matrix). The load-bearing part:

- **Interaction, format, presentation and consent are separate settings, resolved once** in shared code; no command checks TTY, CI, or agent variables itself. `--json` turns prompts off but grants no consent; `--yes` grants consent but supplies no data and picks no target; a pipe changes presentation only.
- **Never prompt non-interactively** (no-prompt flag, `--json`, CI, detected agent, stdin as payload, no TTY on stdin or stderr). Every prompt has a flag, argument, or stdin equivalent, and the error names it.
- **stdout is the answer, stderr is everything else.** With `--json`: one document on stdout on success; on failure an empty stdout and one JSON error document on stderr, carrying a stable reason code, runnable next commands, and whether a human must act.
- **Consent scales with consequence:** ordinary writes run; destructive ones preview and default to No; severe ones need the name typed, or `--yes` plus an explicitly named target and scope. An agent never adds `--yes` on its own.
- **Report reality:** accepted is not ready, partial is not success, an unknown outcome is recovered by inspecting, never by retrying; the exit code agrees with the text.

For long-running async work beyond the CLI (builds, deploys, queues, agent runs), two rules from designing around blockchain latency (Paul Stamatiou, 2021 — https://paulstamatiou.com/crypto-design-challenges/): a bare "pending" state is not enough — "can you imagine not having a progress bar when you were downloading an mp3 on dialup?" Show queue position, ETA, and what's blocking; the user should never need an external dashboard to learn the status of their own operation. And **make in-flight state global**: visible from anywhere in the product, glanceable like a menubar sync icon — "I don't have to go anywhere or do anything to see its state."

## Onboarding to the a-ha moment

Motion policy for docs (Lochie Axon, Family — animations.dev interview): "docs aren't marketing, they're functionality" — no page transitions, snappy navigation; tiny *non-blocking* decorative animations (icon loops) are fine because they never gate use.

"Developer tool users don't need the typical onboarding process, period" — no feature walkthroughs. The goal is the **a-ha moment**: grasping the tool's data model and how to be productive. Four steps: (1) ruthlessly cut setup — "if it's optional, it's postponable"; (2) show what to do next — "never leave users stranded in a blank workspace"; (3) **offer domain-specific test data** that teaches best practices; (4) wizards/tutorials that end in a *real working project* — "for developer tools, everything should be skippable. But that doesn't mean that everything should be skipped." (Consumer-grade onboarding → `user-onboarding`; this is its explicit inverse.)

**Copy-to-agent as onboarding** (Jaytel Taste repo/app, 2026): for agent-era devtools, a secondary CTA can copy a ready-made instruction blob for the user's coding agent. Taste's CTA does three jobs in three sentences: orient to the repo ("read the README"), give exact setup commands, then force the only human checkpoint ("which API keys do you have?"). This is better than sending users to GitHub to infer package scripts. Keep the blob short, concrete, and load-bearing; include accepted env var names and the first success command.

**The exploded view** (Andy Allen, Config 2024): for deep data disclosure, borrow the game-inventory pattern — "pause the action, then dive in and explore in minute detail." A dedicated full-attention inspection mode beats cramming detail into the live view.

## Pro-tool lessons from Config (Figma UI3 redesign 2024; Replit; Perplexity)

- **Stability by default beats contextual cleverness** — Figma prototyped properties appearing "contextually next to your cursor," built hundreds of prototypes, dogfooded for months, and *rejected it*: "it lacked stability… made it difficult to anticipate where your controls would appear next… for a tool you use every single day" you crave rock-solid predictability. (A documented negative result against floating/contextual panel trends.)
- **One place to look**: contextual actions consolidated into the properties panel "because it gives your eye one place to look to find all the things you can do to a given object"; tools moved to the bottom "because our eyes read from top to bottom," freeing the canvas to the top edge. Respect **muscle memory** — Figma kept panel layout stable for a decade; pixel-perfectionists still get hover pixel values even when set to fill/hug.
- **Labels-above-controls as an opt-in view setting** solves icon-dense panel learnability without taxing experts; ship the beta, watch, and **backtrack publicly** when users hate it (collapsed component properties → reverted).
- **"Mouse feel"** (Barron Webster, Replit): experts are keyboard-only; novices live on the mouse — drag previews, visible pop-in/out thresholds. **Complexity stacks**: "all those little pieces of complexity you take for granted really stack up, especially for new users." And **the right edge extends to infinity**: power-chasing for experts has no finish line and may never convert them (their run-Replit-on-Replit took half a year; engineers still didn't switch — tooling is *social pride*). Decision prompt: "If you build more power into your product, who is going to come and why?" ("worse is better" — Richard Gabriel — names the dynamic; route GTM implications to [developer-tool-gtm.md](developer-tool-gtm.md).)
- **Speed has a usage law** (Henry Modisett, Perplexity): "the most important user experience is speed… the more they use your product, the faster they'll want to go" — including decision count and click count, not just latency.

## Visualizing dev data & designing for agents

The load-bearing **agent experience (AX)** rules (full treatment plus the dev-tool data→chart mapping — heatmaps for activity density, force-directed graphs for dependencies, treemaps/sunbursts for hierarchy+size, Sankey for pipelines/flows, bullet charts for metric-vs-target, box plots for latency distributions — in [devtool-interface-design/data-viz-and-agents.md](devtool-interface-design/data-viz-and-agents.md)):

- **Agents as discoverers — specificity wins.** Agents recommend from baked-in training data or live retrieval; concrete claims get chosen: "'P95 latency of 62ms' gets recommended. 'Fast and reliable' gets listed but not chosen."
- **Agents as users — the external-agent test.** Invert the funnel to **use → create → claim**; the bar: "can an external agent ship a feature with your tool using only your docs and a prompt?" Docs pass three gates in order — reachable (no 403 or bot challenge), readable (in the raw body, no JavaScript), actionable (exact requests, complete responses, every error). When you ship the integration as a plugin, the skill carries what the schema cannot (vocabulary mismatches, ambiguous-write handling, human-only steps), and diagnostics state the fix. For a catalogue, give every page a markdown twin, name the routes in, in order, and make locked items answer with the price and "stop, do not reconstruct". The linked file has two worked examples (Interfere, Textures).
- **Agents as threats — progressive trust.** Four progressive-trust tiers, tiered structured errors, rate-limit by identity.
- **Agents as durable background sessions.** Slack thread, queue, DAG, citations, PR/IDE handoff — the session is a shared object teammates can join late.

A practitioner's market read on the integration surface (Kris Puckett, Dive Club podcast, nPyxVMd1LIA): "MCP is dead is like, that's hype" — but "we're going to see a lot more companies leaning more and towards better semantic APIs and CLIs than they will an MCP." Invest in the agent-legible API/CLI first; MCP is a wrapper, not the moat (cf. Lovin's company-level CLI below).

## Tools as decision-making machines (Steve Ruiz, tldraw — Dive Club 3SvL0r-Lhh8)

- **All tools are decision-making tools.** "I think of all tools as like kind of decision-making tools" — a hex input technically picks colors, but "you're not dialing anything in… you're not getting that really quick feedback on one decision or another and being able to compare things." A good tool gives fast comparison plus a safety net ("very safely make a change and go back… I'm not destroying anything"). Corollary: where the tool slows you down should map to where decisions deserve precision.
- **Convention triage for commodity surfaces.** Conventionalized features done wrong make the whole product read as fake: "if you pinch on the canvas… It should zoom in to where you're pinching… if it doesn't work like that, it feels broken. It feels like this is a tech demo." The toolmaker's real job is recognizing which of thousands of features "needs to be the same way every time" and which are legitimately different for your product.
- **Verticalize general-purpose canvases.** Miro serving research, off-sites, education, onboarding at once "is a strength… but it's also kind of a little bit of like a bad fit for all of them" — ask what the feature set would be if it served only one job; "probably a lot less, number one, but also it would probably have things in there that are unique."

## AI-era devtool design (Ryo Lu, Cursor)

- **Company-level AX** (Brian Lovin, Notion — dvEwb1Ajkwo): expose your whole product surface to agents, even if you're not a devtool — "Notion has a CLI so that everything you can do through the Notion API is now legible to an AI." CLIs/MCP are how a non-devtool "pokes at the edges" to stay positioned as models change shape.

- **Engineers "forget to build the doors."** "They build the most hard part of the whole problem, but they forget to build the doors — or they forget to make the paths flow into the same thing." Great cores ship with no entrances; the designer's job in a devtool is the paths in.
- **Design the container, not the screen.** "The ideal interface is different for every single person… you are actually designing a container" — invariant core primitives plus per-user configurations. But reject fully generative UI: "arbitrary generating UI that even the creators of the tool cannot control or cannot predict" "just creates more chaos."
- **The to-do list is the multi-agent management primitive.** Reviewing/merging swarm output collapses to a universal form — "anybody who have seen like a list view can start doing these things" — and the agent needs the same list as memory: "a thing to keep track of what is the high-level things it needs to do, where is it, which item is it thinking about right now."
- **Instruments, not appliances** (Ryo Lu): "you can play a simple melody right away, but mastery is always available if you want it." Sealing off deeper layers tells users "you're not smart enough to handle this" — "black boxes create learned helplessness. transparent systems create power users. and power users become creators." Make the layers discoverable, the complexity gradual, the tinkering fun.
- **The anti-slot-machine test:** "slot machines they don't let you open it up." A good AI tool opens up at every level; terminal-box agents — "you're in this little box and then you're kind of constrained in just that input" — fail it.
- **Packaging over SKUs.** Cursor was "intentionally making cursor pretty hard to get in for say the nontechnical people" (three expert-shaped buttons at open). The fix is "different preconfigurations and packaging of the same thing," never "creating new products or splitting" the product.

## Checklist

- [ ] No-happy-path honored — edge cases treated as someone's main case; settings breadth matched to daily-use friction?
- [ ] Control flow reads top→bottom, left→right; bottom/right reserved for transforms; hierarchy mirrored?
- [ ] Five zones pass their do/don't lists; property controls consistent; nothing truncated?
- [ ] CLI: right progress pattern, clean final logs, pipe/`NO_COLOR` safe, past-tense done states; no prompt without a TTY, `--json` clean on stdout with errors as JSON on stderr, exit code matches the outcome?
- [ ] Onboarding: skippable everything, test data, a real project at the end, never a blank workspace?
- [ ] Agent-facing install/use path: exact prompt or commands a coding agent can run, with the human-only decision named?
- [ ] Agent CLI/MCP: machine-readable schema per command, dry run, JSON errors with nonzero exit, a server-enforced read-only path that read-only skills use by default, generated docs/skills that list only what exists?
- [ ] Agent plugin/skill: read and write intents separated, ambiguous writes checked before retry, secrets kept out of chat, human-only steps named, errors that state the fix?
- [ ] Agent-readable catalogue/docs: markdown twin per page (or `Accept: text/markdown`), `llms.txt` with use-when tags, one ordered list of ways in repeated on every surface, locked content that states the price and tells the agent to stop, project-rules writes only after an explicit yes?
- [ ] Agents: discoverable with specifics, usable from docs + a prompt (reachable, readable, actionable), defended with progressive trust?

> **Staleness note:** tool examples (Figma, VS Code, Linear, Xcode) and the AX post's retrieval statistics/vendor landscape date fast — the frameworks (contexts, control-flow rule, zones, progress patterns, a-ha steps, trust tiers) are the durable layer. The CLI contract comes from one vendor's 2026 target standard: its separations (mode, stream, consent, outcome) are the durable part; its specific numbers, flag names and exit-code mapping are house choices.

## Relationship to other skills

- **`design-craft`** (incl. its `emil-kowalski` reference) — generic web-UI *polish* (shadows, micro-interactions, feel); this skill owns dev-tool *structure* (control flow, density, zones). Structure here, then polish there.
- **`frontend-design`** — builds the UI; this skill shapes what a dev tool's UI should be.
- **`user-onboarding`** — consumer onboarding (sell the better user); devtool onboarding here is its explicit counter-model. **`feature-discoverability`** agrees on "never a blank workspace."
- **`data-viz` (chart selection / Tufte critique)** — general chart choice and integrity; only the dev-data mapping lives here.
- **`ux-writing` (linear-settings-copy)** — wording of settings rows; this skill argues for their existence and density. Words in CLI errors and output → `ux-writing` (error-messages); this skill owns their structure, stream and exit code.
- **`working-with-ai` (agentic-coding)** — agents working *on your codebase*; this skill's AX section and CLI contract are the inverse: agents as *customers of your tool*.
- **[developer-tool-gtm.md](developer-tool-gtm.md)** — getting the tool adopted; this reference makes the tool worth adopting.
- **`malleable-software`** — end-user customization/extensibility of the tool (plugins, user scripts, exposing structure) routes there; this skill owns the tool's own UI conventions.
