# Description Boundary Routing Probes

Purpose: test the 13 description edits made after [the November audit](skill-effectiveness-audit-2026-11.md): boundary clauses added to `swiftui`, `design-principles`, `design-prototyping`, `product-decision-making`, `user-onboarding`, `write-clear-prose`, `motion`, `interface-review`, `route-planning` and `frontend-design`; a "Use when" clause on `superconductor`; the Apple route in `data-viz` narrowed to Swift Charts; and the `rails` read instruction. Run with a fresh descriptions-only judge after editing any of these descriptions or their named neighbors.

Blind packet (descriptions and prompts, no expected answers): `python3 scripts/check_routing_probe_fixtures.py --packet`
Fixture check: `python3 scripts/check_routing_probe_fixtures.py`

## Probes

| # | Prompt | Expected first skill | Notes |
| --- | --- | --- | --- |
| B1 | "Add a fade and slide-in to this card when it mounts. It's a plain React component with CSS modules, no animation library." | `web-design` | Contested pair: generic animation without the Motion library goes to `web-design`. |
| B2 | "Our AnimatePresence exit animation doesn't run when the route changes. We're on motion/react." | `motion` | Target: library work stays with `motion`. |
| B3 | "How long should a dropdown's open animation be, and what easing should it use?" | `web-design` | Contested pair: timing and easing values. `motion` must not take it. |
| B4 | "Migrate our framer-motion imports to the new package and fix the layout animation that broke." | `motion` | Target. |
| B5 | "Rate this dashboard screen's usability with heuristic scores so we can re-run it after the fixes." | `interface-review` | Target: scored mode. |
| B6 | "Do a UX audit of our native iOS settings screens and tell me what to fix first." | `interface-review` | Target: native scope. `apple-design` is an accepted second skill. |
| B7 | "Critique this screen." | `interface-review` | Target: trigger words. `design-principles` is an accepted answer only as a second skill. |
| B8 | "Should this app ask people to confirm before it archives a conversation, or just do it and offer undo? Which is the better design?" | `design-principles` | Target: should-it-work-this-way judgment. Must not go to `interface-review`. |
| B9 | "Is it good design to hide advanced settings behind a long-press?" | `design-principles` | Target. `feature-discoverability` is an accepted second skill. |
| B10 | "The padding and corner radii on these cards look slightly off. Tighten them up." | `design-craft` | Neighbor: polish must not move to `design-principles`. |
| B11 | "My SwiftUI list loses its scroll position and the row's @State resets whenever the data refreshes." | `swiftui` | Target. |
| B12 | "My UICollectionView compositional layout jumps when I prepend items." | `uikit` | Neighbor: UIKit code must not go to `swiftui`. |
| B13 | "Should our iPad app use a sidebar or a tab bar according to the HIG?" | `apple-design` | Neighbor: HIG decisions must not go to `swiftui`. |
| B14 | "I want to test whether this gesture idea is worth building before we commit engineering time. What's the cheapest way to fake it?" | `design-prototyping` | Target. |
| B15 | "Write a discussion guide for usability sessions on our new checkout prototype." | `user-research` | Neighbor: research method must not go to `design-prototyping`. |
| B16 | "Leadership keeps saying no to funding the redesign. How do I make the case?" | `design-org-influence` | Neighbor: buy-in must not go to `design-prototyping` or `product-decision-making`. |
| B17 | "Signups are up 12% but retention is flat. Should we still build the referral feature?" | `product-decision-making` | Target. |
| B18 | "Cut this project down so it fits in a six-week cycle and write the pitch." | `shape-up` | Neighbor: scoping must not go to `product-decision-making`. |
| B19 | "Design the empty state and first-run flow for our new notes app." | `user-onboarding` | Target. |
| B20 | "Users never discover the swipe-to-reply gesture in our iOS app. Add a tip for it." | `feature-discoverability` | Neighbor: must not go to `user-onboarding`. |
| B21 | "Write the error message shown when a payment card is declined." | `ux-writing` | Neighbor: UI words must not go to `write-clear-prose` or `user-onboarding`. |
| B22 | "Tighten this 900-word essay and cut the clutter." | `write-clear-prose` | Target. |
| B23 | "Rename the buttons in this settings dialog so they are clearer." | `ux-writing` | Neighbor: must not go to `write-clear-prose`. |
| B24 | "I have 14 delivery addresses and a depot. What's the best order to drive them?" | `route-planning` | Target. |
| B25 | "Here's a superconductor.com ticket URL. What's the status of its implementations?" | `superconductor` | Target: "Use when" clause. |
| B26 | "Which chart should I use to show monthly revenue by region on our web analytics dashboard?" | `data-viz` | Target: a web dashboard must not go to `apple-design`. |
| B27 | "Make the Swift Charts line chart in our iOS app accessible with VoiceOver and audio graphs." | `apple-design` | Neighbor: in-app Apple chart experience. `swiftui` is an accepted second skill. |
| B28 | "Build a bold landing page for our coffee subscription." | `frontend-design` | Regression: building stays with `frontend-design`. |
| B29 | "Review our existing landing page across accessibility, copy, and layout, and list the issues by severity." | `interface-review` | Neighbor: reviewing must not go to `frontend-design`. |
| B30 | "Add a rate limit to the login endpoint in our Rails app." | `rails` | Regression. |
| B31 | "Explain how JPEG chroma subsampling works." | `graphics-fundamentals` | Control. |
| B32 | "Help me prepare for a difficult 1:1 with a report who keeps missing deadlines." | `people-management` | Control. |
| B33 | "Give me turn-by-turn directions from the airport to my hotel." | `route-planning` | Control: single A→B is excluded by the description. The judge should answer `none`; the expected-skill cell names the skill that must *not* be chosen. |

## Scoring

- **Retrieval pass:** the judge's first skill matches, or matches an accepted pair named in Notes.
- **Boundary pass:** neighbors and controls are not taken by the edited skill named in Notes. For B33 a pass is `none`.
- **Regression rule:** a description change that improves a target but breaks a neighbor or control is not done.

## Results

Recorded in [skill-effectiveness-audit-2026-11.md](skill-effectiveness-audit-2026-11.md) under "Routing probe results".
