---
name: shape-up
description: Shape Up product development methodology from Basecamp. Use for shaping work (setting boundaries, finding elements, identifying risks, writing pitches), betting on work (evaluating pitches, making cycle decisions, handling bugs), and building work (handing over projects, integrating slices, mapping scopes, showing progress, cutting scope). Covers the full 6-week cycle workflow.
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
