# Web Motion, Gesture, and Mobile-Feel Routing Probes

Purpose: test that the references folded from Emil Kowalski's open skills (`docs/emilkowalski-skills-source-mining-2026-11.md`) are reachable from descriptions alone, and that the `web-design` and `design-craft` description edits did not pull prompts away from their neighbors. Run with a fresh descriptions-only judge after editing either description or the descriptions of the neighbors named below.

Blind packet (descriptions and prompts, no expected answers): `python3 scripts/check_routing_probe_fixtures.py --packet`
Fixture check: `python3 scripts/check_routing_probe_fixtures.py`

## Probes

| # | Prompt | Expected first skill | Notes |
| --- | --- | --- | --- |
| W1 | "Make this bottom sheet in our React web app draggable, with swipe to dismiss." | `web-design` | Target: gestures member. `motion` is an accepted second skill. |
| W2 | "On my iPhone, buttons in our web app flash gray when I tap them and stay highlighted, and the page zooms in when I focus the email input." | `web-design` | Target: mobile-web-native-feel. |
| W3 | "The drawer on our Next.js site jumps when I let go halfway through a drag." | `web-design` | Target: gestures member. `motion` is an accepted second skill. |
| W4 | "When I delete a card from this list on our website the others jump into place. Coordinate the motion so it reads as one move." | `web-design` | Target: choreography member. `motion` is an accepted second skill. |
| W5 | "We animate way too much across our web app. Survey it and tell me which animations to remove." | `web-design` | Target: motion-audit member. Must not route first to `interface-review`. |
| W6 | "Our web app's bottom bar sits under the home indicator in mobile Safari and the full-height layout overflows." | `web-design` | Target: mobile-web-native-feel. |
| W7 | "Add a swipe-to-dismiss gesture to this SwiftUI sheet and make it feel fluid." | `swiftui` | Neighbor: native gestures stay native. |
| W8 | "Use motion/react to generate a CSS linear() spring and run a MotionScore performance audit." | `motion` | Neighbor: library work. |
| W9 | "Build a distinctive landing page hero for the marketing site of our mobile app." | `frontend-design` | Neighbor: "mobile" must not pull this to `web-design`. |
| W10 | "Stress test this member row with the worst realistic data you can think of." | `design-craft` | Target: worst-case-data reference. |
| W11 | "Design the tab bar and navigation structure for our native iOS app following the HIG." | `apple-design` | Neighbor. |
| W12 | "Review this whole checkout flow for accessibility, copy, layout, and polish, and give me a verdict." | `interface-review` | Neighbor: "stress-test" and "polish" in `design-craft` must not take whole-flow reviews. |
| W13 | "A UIKit pan gesture recognizer conflicts with scrolling in my collection view." | `uikit` | Neighbor: "gestures" in `web-design` must not take UIKit work. |
| W14 | "Write a webhook handler in our Rails app." | `rails` | Control. |
| W15 | "Plan user interviews for a pricing study." | `user-research` | Control. |
| W16 | "This settings page feels off. Polish the spacing, radii, and shadows." | `design-craft` | Regression: the shortened `design-craft` description still owns polish. |
| W17 | "Set up a weekly quality ritual so polish regressions stop shipping." | `design-craft` | Regression: quality rituals. |
| W18 | "Load test our API with worst-case traffic and find where it falls over." | `rails` | Control for "worst-case": server load is not UI stress-testing. No UI skill should take it; `rails` is the nearest owner in this library and the judge may also answer that no skill fits. |

## Scoring

- **Retrieval pass:** the judge's first skill matches, or matches an accepted pair named in Notes.
- **Boundary pass:** neighbors and controls are not taken by `web-design` or `design-craft`.
- **Regression rule:** a description change that improves a target but breaks a neighbor or control is not done.

Results are recorded in `docs/emilkowalski-skills-source-mining-2026-11.md`.
