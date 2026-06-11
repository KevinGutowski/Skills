---
name: shape-up
description: "Scope and bet on product work with Basecamp's Shape Up — appetite, fat-marker shaping, betting table, 6-week cycles, scope hammering — plus the competing Linear school (design as reference, no handoff/PMs, taste over data) and Nan Yu's org-shape rules. Use when shaping or pitching work, running a betting table, cutting scope, or choosing a process school. Triggers: Shape Up, appetite, betting table, fat-marker, pitch, cycle, Linear method."
---

# Shape Up

Product development methodology from Basecamp built around fixed-time, variable-scope cycles.

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
- **Quality stance:** the spec is the floor ("It's easy to meet the spec. It's harder to do the craft"); quality ≠ perfection — polish before customers see it, iterate after; the quality lever is scope ("the simplest way to increase quality is to reduce scope"); and the MVP rethought (Artman): "no longer about validating a novel idea as quickly as possible… its aim is to create a compelling product that draws in the early users" — narrow the audience, be substantially better for them.
- **Taste over data:** no A/B tests; "you must develop and trust your intuition"; "to provide the best experience, you must surprise users" — and no experiment produces a surprise. "We establish values and principles so that team members think about what they're building and why" instead of fixed process.
- **Anti-roadmap + release rings (Ryo Lu, Cursor — plan-mode interview, youtube.com/watch?v=bdh8k6DyKxE):** the same school at Cursor. Most companies do "planning theater… they pretend to have like a one-year road map or like a north star Figma" — a waste; with models and user mindsets shifting constantly, keep a directional bearing plus the present state and flexible aligned next steps, "talk to the users," iterate. QA runs as release rings: ambassadors and "nightly users" absorb bugs first (every build ships nightly — lots of bugs, but also the good surprises), and "The enterprise people get the slowest one."

**Routing among the three:** Shape Up's guardrails (betting table, fat-marker, cool-down) protect mixed or scaling teams from overreach; the Martian sprint serves design-as-deliverable situations; the Linear school assumes a small, senior, taste-dense team dogfooding its own product daily, with leadership that treats craft as a business priority — without those preconditions it degrades into chaos rather than craft. Cursor runs the same school taken to its endpoint — designers shaping the product directly in code with AI agents, roles deliberately "muddy" — covered in `design-prototyping`'s agents tier.

## Team shape — "ship the org chart you want" (Nan Yu, Linear — Config 2024)

*Source: "The heirloom tomato org chart," Config 2024. Org design as product design — the layer above betting/appetite.*

- **Conway's law as a design tool**: "You will ship your org chart… so make an org chart that you actually want to ship." Five-to-eight symmetric squads ship "five to eight vaguely related products." A perfectly symmetric chart should make you suspicious — "where's the main thing?" ("Having pretty-looking charts is not your KPI" — the heirloom vs sphere tomato: "one is designed to taste good, the other to be a sphere.")
- **Over-provision the main thing**: Linear's core product = >50% of staff — that surplus is their stated answer to "how do you maintain such a high quality bar" (teams can go "almost all the way to full debt-payback mode" while a few people carry the changelog).
- **The scoping question**: "What is the *largest* scope you can give to a team and have them make reasonable tradeoffs?" Start near whole-product; slice narrow teams off one at a time only on demonstrated need (legit slice lines: skill-set boundaries like iOS/Android); set explicit **disband conditions** — "team, you've fulfilled your purpose, you don't need to exist anymore."
- **Zero-default rule**: "the default number of people that works on stuff that's not important should be zero" — table-stakes work should cost other teams a conscious tradeoff, never become a junior-dev dumping ground. Narrow scopes breed kingdom-building ("put ambitious people in a little box — we're going to overbuild it… and secretly make the box bigger").
- **Interrogate borrowed numbers**: the 5–8-person team meme traces to the 2012 Spotify paper, two-pizza teams, and Andy Grove's *High Output Management* (1983 — a no-Slack world); Jensen Huang runs 40–60 directs. "You can't take a nugget of wisdom a million miles removed from its source and assume it works for you." And don't patch a broken structure with OKRs — that's "layering on even more complexity."
- **The big-bet acceptance bar** (Duolingo, Config 2025): run a portfolio per pillar — many incremental A/B tests on known levers plus a few big bets a year, where "new bets don't actually have to improve metrics. They should just at least be neutral" — neutrality buys strategic repositioning without demanding immediate wins.

## Decisiveness predicts quality (Linear "Conversations on Quality" series, 2024)

Stated independently by five guests: how fast a team decides — and *un-decides* — predicts its quality bar.
- **The two-week reframe** (Dick Costolo): when 1%-experiment launches bloated to 14 weeks, ask not "how do we get to 12" but "**what would have to be true for it to be two weeks?**" — forces enumerating the currently-true assumptions to delete.
- **Rolling 80/20** (Henry Modisett, Perplexity): "we 80/20 everything, but we do that every week, and the thing we 80/20'd last week we circle back on… **if you invest in velocity you can actually make more things good more of the time**." Mutable-software amnesty: "users won't remember the thing that was worse — the new users only know the new good thing." Pair with **clarity of ownership**: one named decider per surface.
- **Unshipping is a skill** (Tara Feener, Browser Company): the three-channel loop — product-ideas → product-updates (prototype already on for the whole company) → dogfooding — then "we very rapidly make a call: hey, this feels wrong — unship it." Maxim: "it's what you leave out." When a member asks for a literal feature, "assume you don't know" — interrogate the need, don't build the bug report verbatim.
- **Set the bar, then stop** (Adena Nadler, Browser Company): "we set a bar for what we're able to get away with… do everything required to meet that bar and try not to do more." Their fastest-deciding pods are their most successful. Commodity-product law: features make people *switch*, stability makes them *stay* — you can't pick one.
- **Bet-doc sculpting** (Ethan Eismann, Slack): a short "here's the bet" doc, engineer starts immediately, designer "almost playing catch-up," team molds it to GA — "it's not a step-by-step process, it's molding and sculpting."
- **Comms enables craft** (Basheer Tome, Fellow): "communication issues are, full stop, the number one thing" when projects go wrong — "clear comms is what enables the focus that you need to do craft"; knowing your priority is what lets you say no to the pings.


## Killing products — the sunset side of betting (Subham Agarwal, Config 2025)

The betting table decides what to build; this decides what to stop. Five legitimate death reasons: never took off · terrible unit economics · traction-but-strategy-mismatch (Netflix DVD) · technology obsolete (Zune) · **less is more** ("fewer, better maintained products often create a superior experience than a sprawling ecosystem").
- **RADAR**: **R**ead the signals (usage, support, sales feedback — "products rarely fall silently, there's almost always a pulse") → **A**ssess on a customer-value × business-value 2×2 → **D**ecide (pause / iterate / kill) → **A**ct → **R**eview.
- Decision maxim: "The moment you start optimizing important decisions on a long list of pros and cons, you're doomed. The best decisions come from identifying the most critical assumption and acting with confidence." Their question: "Are we holding on out of inertia or ambition? Could this be a 10x?"
- The four forces that block the call: **inertia** (nothing exists in isolation — map the dependency chain), **hope** ("one more feature will save us"), **fear** (public backlash), **love** ("this product is my baby" — and a customer's love isn't viability either). Their failure timeline: 18 months → iterate, +6 → maintenance mode, +6 → finally killed. Two years lost.
- Sunset comms — internal first: what's going away / why / celebrate what was right / share what was learned. External: tell them, tell them why, give them time, give them alternatives. "Someone will always be mad." (Mechanics for deprecating *components* live in `design-systems`.)
