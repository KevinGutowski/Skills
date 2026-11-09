---
name: shape-up
description: "Scope and bet on product work — four schools: Basecamp Shape Up (appetite, fat-marker shaping, betting table, 6-week cycles, scope hammering), Linear craft (no handoff/PMs, taste over data), Evil Martians sprints, metrics-led strategy (Perri/Klein/Lean UX). Use when shaping/pitching work, betting, cutting scope, or picking a school. Triggers: Shape Up, appetite, betting table, pitch, Linear method, design sprint, build trap, outcome roadmap."
---

# Shape Up

Product development methodology from Basecamp built around fixed-time, variable-scope cycles.

**Sources/gaps:** [references/sources.md](references/sources.md) maps Basecamp, Linear, Evil Martians, and metrics-led source schools; [references/coverage-gaps.md](references/coverage-gaps.md) keeps school conflicts and weak process claims visible.

## Core Principle

**Fixed time, variable scope.** Don't ask "How long will this take?" Ask "How much time is this worth?" The appetite constrains the solution, not the other way around.

## Phase Selection

| Phase | When to Use | Reference |
|-------|-------------|-----------|
| **Shaping** | Before betting, when defining what to build | [shaping.md](references/shaping.md) |
| **Betting** | During cool-down, when deciding what to commit to next | [betting.md](references/betting.md) |
| **Building** | During the cycle, when executing on bet projects | [building.md](references/building.md) |

Read the appropriate phase reference based on user context.

## The Cycle Rhythm

```
6 weeks building → 2 weeks cool-down → 6 weeks building → ...
```

- **Shaping** happens continuously, producing pitches ready for the betting table
- **Betting** happens during cool-down, selecting what to build next
- **Building** happens during the 6-week cycle, with teams owning complete projects
- **Budget refinement deliberately** (MailChimp, *The UX Reader*): bugs and confusing workflows erode trust and support capacity, so some cycles must be cleanup by design, not leftovers. Their practice: at least once a year, "an entire release focused solely on cleanup and maintenance," fed by support, social feedback, analytics, interviews, surveys, and account-closing reasons.

## Design sprints & design-build overlap (Evil Martians extension)

*Sources: "MVPs, prototypes, results: how to win with a Martian Design Sprint" (Shamin & Turner, 2024) and "'Design first, then build': let's bury this myth forevermore" (Shamin & Turner, 2023). https://evilmartians.com/chronicles/mvps-prototypes-results-how-to-win-with-a-martian-design-sprint · https://evilmartians.com/chronicles/design-first-then-build-lets-bury-this-myth-forevermore*

A two-week, fixed-appetite design cycle that pairs with the betting model:
- **Stage-matched goals:** pre-seed → an interactive prototype on a web link ("much more persuasive than relying solely on a pitch deck" — and a founder mirror that can force rethinking the idea); seed → "determining the product's essence: the core features that matter to users so much that they're willing to pay or switch" (the prioritization IS the MVP roadmap); post-PMF → hypothesis/ship/measure cycles.
- **The cadence:** kickoff narrows scope to what's valuable AND completable in two weeks; ~2 days exploration before designing; syncs every two days; designer-engineer alignment before handoff.
- **The four anti-waterfall mantras:** (1) "Design only what you need at the moment" — most startups pivot, so "designing just what you need gives you the power of the pivot"; (2) implement the design immediately — "hidden hiccups" only surface on implementation; keep design "a couple of weeks ahead of development," no more; (3) break big features into small chunks at the design stage (a release every ~2 weeks = healthy rhythm); (4) continuous two-way design↔dev communication, designer-owned.

**Tension with Shape Up to route, not blend:** Shape Up shapes with fat-marker sketches and resists high-fidelity handoff; the Martian sprint produces state-complete screens + handoff specs. Pick per project: fat-marker when the building team owns design decisions, sprint-fidelity when design is a deliverable to a separate build team or investor audience.

## The Linear school (craft-first extension)

*Sources: Karri Saarinen, "Primer on how we design at Linear" + tech-debt follow-up (X, 2023) · "Karri Saarinen's 10 Rules for Crafting Products That Stand Out" (Figma blog) · the Linear Method, esp. "Manage design projects" · Tuomas Artman, "Rethinking the startup MVP" (2024) · "Inside Linear" (Lenny's Podcast, interview digest). https://x.com/karrisaarinen/status/1715085201653805116 · https://www.figma.com/blog/karri-saarinens-10-rules-for-crafting-products-that-stand-out/ · https://linear.app/method/manage-design-projects · https://linear.app/blog/rethinking-the-startup-mvp-building-a-competitive-product · https://www.lennysnewsletter.com/p/inside-linear-building-with-taste*

The third process school — it *removes* structure rather than adding it, betting on senior taste. Linear shares Shape Up's fixed-appetite instinct (cycles, scope-down) but rejects separating shapers from builders.

- **Design is a reference, never a deliverable:** "the design is only a reference… so the way it's constructed doesn't really matter." The mechanics: screenshot the app and design on top; a minimal design system ("mostly colors, type and some basic components"); one shared design file per quarter, a page per person/project; layer naming, auto layout, components all optional; "once the design is good enough and we start building… the real design is the app" — then loop. The tech-debt rebuttal: "No-one is going to create a new button component because it's 1px larger than what exists in the code" — the code design system stays the source of truth.
- **The project loop:** verify the root cause first ("users will ask you to build a specific feature X to fix their problem Y" — solve Y); open an "Explore designs" placeholder issue and "explore the solution freely and without judging whether something is feasible" (hours to days); seek feedback on direction, not polish — "don't just pay attention to what they say but ask them why they said it"; then "make a list of the design pieces… and get them done one by one," with engineers in the project from spec onward.
- **No handoff, no PMs:** "There's no 'handoff to dev.' You're never off the hook." Project leads (designer or engineer) replace PMs; Linear runs without metrics, PMs, or A/B testing. Small teams hired for product sense via paid work trials — "the more people you have, the more opinions and deliberation you introduce."
- **Remote system as product system:** Linear's 2025 remote-work note makes the same school operational: two-to-four-person project teams, rotating project leads, one product roadmap, short context/intent specs, feature flags for internal users and selected customers, weekly written updates that auto-post to Slack, triage/goalie rotations for unplanned work, and recurring Quality Wednesdays/feature roasts. Remote-first works because context, ownership, and feedback paths are designed, not because meetings are merely removed.
- **Quality stance:** the spec is the floor ("It's easy to meet the spec. It's harder to do the craft"); quality ≠ perfection — polish before customers see it, iterate after; the quality lever is scope ("the simplest way to increase quality is to reduce scope"); and the MVP rethought (Artman): "no longer about validating a novel idea as quickly as possible… its aim is to create a compelling product that draws in the early users" — narrow the audience, be substantially better for them.
- **Taste over data:** no A/B tests; "you must develop and trust your intuition"; "to provide the best experience, you must surprise users" — and no experiment produces a surprise. "We establish values and principles so that team members think about what they're building and why" instead of fixed process.
- **Anti-roadmap + release rings (Ryo Lu, Cursor — plan-mode interview, youtube.com/watch?v=bdh8k6DyKxE):** the same school at Cursor. Most companies do "planning theater… they pretend to have like a one-year road map or like a north star Figma" — a waste; with models and user mindsets shifting constantly, keep a directional bearing plus the present state and flexible aligned next steps, "talk to the users," iterate. QA runs as release rings: ambassadors and "nightly users" absorb bugs first (every build ships nightly — lots of bugs, but also the good surprises), and "The enterprise people get the slowest one."

## The metrics-led product strategy school (Perri / Klein / Lean UX)

*Sources: Melissa Perri, Escaping the Build Trap (2018); Laura Klein, Build Better Products (2016); Gothelf/Seiden, Lean UX, 1st ed. (2013). This school conflicts with Linear's taste-over-data stance; route by org maturity, traffic volume, and whether the team is discovering demand or refining a craft-led product.*

The fourth process school treats shaping as strategy deployment plus learning loops.

- **Strategy is a decision framework, not a plan**: "Good strategy isn't a detailed plan. It's a framework that helps you make decisions." Use intent levels: company vision → strategic intent → product initiative → option/experiment. One intent is enough for a small company; three is plenty for a large one. More becomes Perri's "peanut-buttering" failure: too many initiatives spread over too few people.
- **Quantified initiative shape**: We believe that doing X for audience Y will achieve outcome Z, with a potential value estimate and a measurement plan. The example form is revenue-bearing and explicit, not a feature list. Pair every initiative with current-state data: Perri's Product Kata starts "What is the goal?" and "Where are we now in relation to that goal?"
- **Done means outcome, not shipped**: "We are done developing or iterating on a feature only when it has reached its goals." Perri's warning that "Version 2 is the biggest lie in software development" is the same trap Gothelf calls Phase II: don't bet on later cleanup unless the outcome gate forces it.
- **Roadmaps explain strategy and stage**: use Experiment / Alpha / Beta / GA, not a date-by-feature Gantt. Sales can only sell what has crossed the agreed stage boundary: anything GA, or far enough into Beta by explicit agreement.
- **Fund product work like a VC**: allocate budget to product lines and stages, not a fixed project list. Keep options alive while evidence is cheap; double down when the learning justifies it.
- **Scope hammering from Klein**: Finding the Core asks, "What has to happen for this feature NOT TO BREAK"; What-Happens-Next keeps asking until user intent is met; input-output matching cuts screens that do not transform user input into needed output. In constrained environments, build only what is absolutely necessary.

**Routing among the four:** Shape Up's guardrails (betting table, fat-marker, cool-down) protect mixed or scaling teams from overreach; the Martian sprint serves design-as-deliverable situations; the Linear school assumes a small, senior, taste-dense team dogfooding its own product daily, with leadership that treats craft as a business priority; the metrics-led school serves orgs stuck in output thinking, teams with enough traffic/data to learn from behavior, or bets where demand/risk is unknown. Without data maturity it degrades into vanity metrics; without taste it degrades into local-maximum optimization. Cursor runs the Linear school taken to its endpoint — designers shaping the product directly in code with AI agents, roles deliberately "muddy" — covered in `design-prototyping`'s agents tier.

## Team shape — "ship the org chart you want" (Nan Yu, Linear — Config 2024)

Org design as product design — the layer above betting/appetite. Decision rules:

- **Conway's law as a design tool**: make an org chart you actually want to ship; be suspicious of perfect symmetry ("where's the main thing?").
- **Over-provision the main thing**: Linear puts >50% of staff on the core product — that surplus is the quality bar.
- **The scoping question**: give a team the *largest* scope in which it can still make reasonable tradeoffs; slice narrow teams off only on demonstrated need, with explicit disband conditions.
- **Zero-default rule**: the default headcount on unimportant work is zero; narrow scopes breed kingdom-building.
- **Interrogate borrowed numbers** (the 5–8-person-team meme is far from its 1983–2012 sources), and don't patch a broken structure with OKRs.
- **Big-bet acceptance bar** (Duolingo, Config 2025): portfolio per pillar — incremental A/B tests plus a few big bets a year that need only metric-*neutrality*, buying strategic repositioning.

## Decisiveness predicts quality (Linear "Conversations on Quality" series, 2024)

Stated independently by five guests: how fast a team decides — and *un-decides* — predicts its quality bar.

- **The two-week reframe** (Costolo): ask "**what would have to be true for it to be two weeks?**" — enumerates the assumptions to delete.
- **Rolling 80/20** (Modisett, Perplexity): 80/20 everything weekly and circle back; investing in velocity makes more things good more of the time. One named decider per surface.
- **Unshipping is a skill** (Feener, Browser Company): dogfood-loop fast, call "this feels wrong — unship it" fast; interrogate literal feature requests instead of building the bug report verbatim.
- **Set the bar, then stop** (Nadler, Browser Company): do everything required to meet the bar, try not to do more; features make people *switch*, stability makes them *stay*.
- **Bet-doc sculpting** (Eismann, Slack): short bet doc, engineer starts immediately, team molds it to GA.
- **Comms enables craft** (Tome, Fellow): clear comms is what enables the focus craft needs; knowing the priority lets you say no.

## Killing products — the sunset side of betting (Subham Agarwal, Config 2025)

The betting table decides what to build; this decides what to stop.

- Five legitimate death reasons: never took off · terrible unit economics · traction-but-strategy-mismatch · technology obsolete · less-is-more.
- **RADAR**: **R**ead the signals → **A**ssess (customer-value × business-value 2×2) → **D**ecide (pause / iterate / kill) → **A**ct → **R**eview.
- Decide by identifying the most critical assumption and acting with confidence, not by long pro/con lists; ask "are we holding on out of inertia or ambition? Could this be a 10x?"
- Four forces block the call — inertia, hope, fear, love; indulging them cost the source team two years.
- Sunset comms: internal first (what/why/celebrate/learned), then external (tell them, why, time, alternatives). Component deprecation mechanics → `design-systems`.

Quote banks and case texture for these three sections: [references/field-notes.md](references/field-notes.md).

## Relationship to other skills

- **`product-decision-making`** — pre-bet product judgment: problem clarity, evidence quality, optimization-vs-new-behavior classification, proposal review. Run it before shaping/betting; this skill owns the process once the bet is worth considering.
- **`user-research`** — discovery evidence that feeds shaping; pitch-shaped problem definitions consume its output.
- **`design-prototyping`** — the pitch/demo artifact itself (fidelity choices, presenting design work); this skill decides what to bet, that one builds the persuasive artifact.

> **Staleness note:** the Basecamp cycle mechanics and shaping/betting/building references are durable book material. The Linear, Cursor, Evil Martians, Duolingo, and "Conversations on Quality" layers come from 2023–25 X threads, blog posts, and podcasts — company practices and roles change fast; verify before citing them as those companies' current process.
