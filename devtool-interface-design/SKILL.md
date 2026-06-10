---
name: devtool-interface-design
description: "Design interfaces for developer tools — software people live in for hours daily, with no happy path: a tiny edge case may be someone's main case. Covers the three contexts (immediate/intermediate/broad), the layout control-flow rule (top controls bottom, left controls right), the five UI zones (tabs, toolbars, nav sidebars, properties panels, tables), CLI progress patterns (spinner / X-of-Y / progress bar) and clean-log rules, devtool onboarding to the a-ha moment (everything skippable, test data, never a blank workspace), dev-data viz mappings, and agent experience (AX): designing your tool for AI agents as discoverers and users. Use when designing or reviewing a developer tool's UI, panel layout, CLI output, devtool onboarding, dashboard, or agent-facing surface. Based on seven Evil Martians Chronicles posts. Triggers: dev tool UI, devtool design, IDE layout, properties panel, command palette, CLI UX, spinner, progress bar, terminal output, devtool onboarding, agent experience, AX, MCP discovery."
---

# Developer-Tool Interface Design

**Sources** — this skill aggregates seven Evil Martians Chronicles posts (their signature beat; all serve clean Markdown at URL + ".md"):
- *"Devs in mind: how to design interfaces for developer tools" (Lovchikov & Turner, 2025 refresh) — the anchor. https://evilmartians.com/chronicles/devs-in-mind-how-to-design-interfaces-for-developer-tools*
- *"Keep it together: 5 essential design patterns for dev tool UIs" (Stroganov & Turner, 2024). https://evilmartians.com/chronicles/keep-it-together-5-essential-design-patterns-for-dev-tool-uis*
- *"Want to make a great developer tool UI? Follow this fundamental rule!" (Shamin & Turner, 2024). https://evilmartians.com/chronicles/devtool-layout-rule*
- *"CLI UX best practices: 3 patterns for improving progress displays" (Shamin & Turner, 2024). https://evilmartians.com/chronicles/cli-ux-best-practices-3-patterns-for-improving-progress-displays*
- *"Ease and epiphany: 4 ways to stop misguided dev tools user onboarding" (Stroganov, Turner, Shamin, 2024). https://evilmartians.com/chronicles/easy-and-epiphany-4-ways-to-stop-misguided-dev-tools-users-onboarding*
- *"Beyond bars and lines: 7 cool ways to visualize data in your dev tool" (Lozhkin & Turner, 2024). https://evilmartians.com/chronicles/beyond-bars-and-lines-7-cool-ways-to-visualize-data-in-your-dev-tool*
- *"3 rules for getting AI agents to find, use — and not exploit — your devtool" (Nazarova & Turner, 2026). https://evilmartians.com/chronicles/3-rules-for-getting-ai-agents-to-find-use-and-not-exploit-your-devtool*

The worldview: dev tools are **workbenches, not funnels**. "There is no 'happy path' for a dev tool… what seems to be a tiny edge case might actually be the main case for a particular user." Users live in the tool for hours daily and paths jump between panels with no final conversion action — so optimize for density, control-flow legibility, friction-per-repetition, and time-to-a-ha, not guided journeys.

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

Never the silent treatment — "I strongly advise against leaving users staring at a blinking cursor." Choose by shape of work: **spinner** (liveness only; tick it per completed unit so a stall is visible) → **X of Y** ("make it your standard" for measurable step-wise work) → **progress bar** ("in the CLI world, they might be overkill. Think twice" — best for parallel long tasks, or one aggregate bar). Clean-log rules: clear transient UI when done; green + checkmarks; honor `NO_COLOR`; test piped output (`> file.txt`, `| grep`); and switch "-ing" to "-ed" in final logs — "once it's done, they're misleading."

For long-running async work beyond the CLI (builds, deploys, queues, agent runs), two rules from designing around blockchain latency (Paul Stamatiou, 2021 — https://paulstamatiou.com/crypto-design-challenges/): a bare "pending" state is not enough — "can you imagine not having a progress bar when you were downloading an mp3 on dialup?" Show queue position, ETA, and what's blocking; the user should never need an external dashboard to learn the status of their own operation. And **make in-flight state global**: visible from anywhere in the product, glanceable like a menubar sync icon — "I don't have to go anywhere or do anything to see its state."

## Onboarding to the a-ha moment

"Developer tool users don't need the typical onboarding process, period" — no feature walkthroughs. The goal is the **a-ha moment**: grasping the tool's data model and how to be productive. Four steps: (1) ruthlessly cut setup — "if it's optional, it's postponable"; (2) show what to do next — "never leave users stranded in a blank workspace"; (3) **offer domain-specific test data** that teaches best practices; (4) wizards/tutorials that end in a *real working project* — "for developer tools, everything should be skippable. But that doesn't mean that everything should be skipped." (Consumer-grade onboarding → `user-onboarding`; this is its explicit inverse.)

## Visualizing dev data & designing for agents

The dev-tool data→chart mapping (heatmaps for activity density, force-directed graphs for dependencies, treemaps/sunbursts for hierarchy+size, Sankey for pipelines/flows, bullet charts for metric-vs-target, box plots for latency distributions) plus the **agent experience (AX)** rules — agents as discoverers (baked-in training data vs live retrieval; "specificity wins": "'P95 latency of 62ms' gets recommended. 'Fast and reliable' gets listed but not chosen"), as users (invert the funnel to **use → create → claim**; the test: "can an external agent ship a feature with your tool using only your docs and a prompt?"), and as threats (four progressive-trust tiers, tiered structured errors, rate-limit by identity) — live in `references/data-viz-and-agents.md`.

## Checklist

- [ ] No-happy-path honored — edge cases treated as someone's main case; settings breadth matched to daily-use friction?
- [ ] Control flow reads top→bottom, left→right; bottom/right reserved for transforms; hierarchy mirrored?
- [ ] Five zones pass their do/don't lists; property controls consistent; nothing truncated?
- [ ] CLI: right progress pattern, clean final logs, pipe/`NO_COLOR` safe, past-tense done states?
- [ ] Onboarding: skippable everything, test data, a real project at the end, never a blank workspace?
- [ ] Agents: discoverable with specifics, usable from docs + a prompt, defended with progressive trust?

> **Staleness note:** tool examples (Figma, VS Code, Linear, Xcode) and the AX post's retrieval statistics/vendor landscape date fast — the frameworks (contexts, control-flow rule, zones, progress patterns, a-ha steps, trust tiers) are the durable layer.

## Relationship to other skills

- **`make-interfaces-feel-better`** / **`emil-design-eng`** — generic web-UI *polish* (shadows, micro-interactions, feel); this skill owns dev-tool *structure* (control flow, density, zones). Structure here, then polish there.
- **`frontend-design`** — builds the UI; this skill shapes what a dev tool's UI should be.
- **`user-onboarding`** — consumer onboarding (sell the better user); devtool onboarding here is its explicit counter-model. **`feature-discoverability`** agrees on "never a blank workspace."
- **`chart-selection`** / **`tufte-viz`** — general chart choice and integrity; only the dev-data mapping lives here.
- **`linear-settings-copy`** — wording of settings rows; this skill argues for their existence and density.
- **`agentic-coding`** — agents working *on your codebase*; this skill's AX section is the inverse: agents as *customers of your tool*.
- **`developer-tool-gtm`** — getting the tool adopted; this skill makes the tool worth adopting.
