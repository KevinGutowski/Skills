---
name: shape-up
description: Shape Up product development methodology from Basecamp. Use for shaping work (setting boundaries, finding elements, identifying risks, writing pitches), betting on work (evaluating pitches, making cycle decisions, handling bugs), and building work (handing over projects, integrating slices, mapping scopes, showing progress, cutting scope). Covers the full 6-week cycle workflow, plus the competing Linear school (design as reference not deliverable, no handoff, no PMs, taste over data, quality via reduced scope) and how to route between them. Triggers include Shape Up, appetite, betting table, fat-marker sketch, design process, Linear method, how Linear designs, design handoff, minimum lovable product.
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

**Routing among the three:** Shape Up's guardrails (betting table, fat-marker, cool-down) protect mixed or scaling teams from overreach; the Martian sprint serves design-as-deliverable situations; the Linear school assumes a small, senior, taste-dense team dogfooding its own product daily, with leadership that treats craft as a business priority — without those preconditions it degrades into chaos rather than craft. Cursor runs the same school taken to its endpoint — designers shaping the product directly in code with AI agents, roles deliberately "muddy" — covered in `design-prototyping`'s agents tier.
