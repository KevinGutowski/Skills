# UI FX Routing Probes

Purpose: test that the new `ui-fx` skill is reachable from descriptions alone for effect requests, and that its description ("make it pop", "dazzle", effect names) does not pull ordinary motion, polish, page-building, generative-art, or native-animation prompts away from their owners. Run with a fresh descriptions-only judge after editing the `ui-fx` description or the descriptions of the neighbors named below.

Blind packet (descriptions and prompts, no expected answers): `python3 scripts/check_routing_probe_fixtures.py --packet docs/ui-fx-routing-probes-2026-11.md`
Fixture check: `python3 scripts/check_routing_probe_fixtures.py`

## Probes

| # | Prompt | Expected first skill | Notes |
| --- | --- | --- | --- |
| X1 | "Add border-beam to our chat composer so it glows while the model is streaming." | `ui-fx` | Target: named effect library. |
| X2 | "This upgrade screen works but it's boring. What effects could we add to make it really pop?" | `ui-fx` | Target: open ideation. `design-craft` is an accepted second skill. |
| X3 | "I saw a distortion wave transition where the card ripples with chromatic aberration when you confirm a payment. Build something like that in React." | `ui-fx` | Target: effect-ideation and platform-techniques. `motion` is an accepted second skill. |
| X4 | "Which is better for a liquid metal button, Paper Shaders or React Bits, and what are the licence catches?" | `ui-fx` | Target: effect-libraries. |
| X5 | "Give our AI agent's thinking state some dazzle: an animated orb or indicator instead of the spinner." | `ui-fx` | Target: living indicators. Must not route first to `ai-experience-design`. |
| X6 | "What duration and easing should this dropdown use when it opens?" | `web-design` | Neighbor: everyday motion values. |
| X7 | "When I delete a card from this list on our website the others jump into place. Coordinate the motion so it reads as one move." | `web-design` | Neighbor: choreography. `motion` is an accepted second skill. |
| X8 | "Build a distinctive landing page hero for our developer tool." | `frontend-design` | Neighbor: whole-page aesthetic. |
| X9 | "This settings page feels off. Polish the spacing, radii, and shadows." | `design-craft` | Neighbor: polish, even though "pop" and "polish" are near. |
| X10 | "Write a p5.js sketch of a flocking particle system driven by a noise field." | `creative-coding` | Neighbor: generative sketch, no product UI moment. |
| X11 | "Write a Metal shader for a ripple distortionEffect in SwiftUI and drive it with keyframeAnimator." | `swiftui` | Neighbor: native shader mechanics. `ui-fx` is an accepted second skill. |
| X12 | "Use motion/react to generate a CSS linear() spring and run a MotionScore performance audit." | `motion` | Neighbor: library work. |
| X13 | "Design how our AI feature should show confidence and let users correct its mistakes." | `ai-experience-design` | Neighbor: AI feature UX, not effects. |
| X14 | "Our dashboard's bar chart should make the outlier pop. Which chart type and annotation should we use?" | `data-viz` | Control for "pop". |
| X15 | "Write a webhook handler in our Rails app." | `rails` | Control. |
| X16 | "Design a liquid glass tab bar for our native iOS app following the HIG." | `apple-design` | Neighbor: platform design language, not a custom effect. |
| X17 | "I want a very subtle animated edge around our composer while the AI is drafting, barely noticeable." | `ui-fx` | Target: the quiet end of the dial. `web-design` is an accepted second skill. |
| X18 | "There's a glowing card effect on this component kit's preview page. Figure out how it's made and build something similar for our pricing card." | `ui-fx` | Target: reverse-engineering. |
| X19 | "Our modal feels abrupt when it opens. Make the transition subtler." | `web-design` | Neighbor: "subtle" must not pull everyday transitions to `ui-fx`. `design-craft` is an accepted first skill. |
| X20 | "Our pricing hero feels flat. Put a hover texture behind it, like a field of lines or dots that reacts to the cursor." | `ui-fx` | Target: hover textures (textures reference). `frontend-design` is an accepted second skill. |
| X21 | "Add a subtle static dot-grid SVG pattern behind our docs landing page." | `frontend-design` | Neighbor: a static repeating pattern stays out of `ui-fx`, even though "dot grid" and "subtle" are near the hover-texture trigger. The tile recipe lives in `frontend-design` (visual-execution); `web-design` is an accepted first skill, since "web/CSS craft" is a fair read from descriptions alone. |

## Scoring

- **Retrieval pass:** the judge's first skill matches, or matches an accepted pair named in Notes.
- **Boundary pass:** neighbors and controls are not taken by `ui-fx`.
- **Regression rule:** a description change that improves a target but breaks a neighbor or control is not done.

Results are recorded in `docs/ui-fx-source-mining-2026-11.md`.
