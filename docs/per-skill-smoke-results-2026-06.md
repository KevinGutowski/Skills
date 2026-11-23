# Per-Skill Smoke Test Results

Probe source: `docs/per-skill-smoke-tests-2026-06.md`
Packet builder: `python3 scripts/build_skill_smoke_packet.py`

## 2026-06-29 Deterministic Fixture Check

Command: `python3 -B scripts/check_skill_smoke_tests.py`

Result: pass. The fixture had 38 contiguous probes at the time, exactly one expected first-skill prompt per local skill, no duplicate expected first skills, prompts under 240 characters, and every probe present in the generated packet.

## 2026-06-29 Fresh Descriptions-Only Judge

Judge: Wegener (`019f15da-c92e-79f1-8f52-6f3e1db99bdc`)
Setup: `fork_context=false`; the judge was instructed to run `python3 scripts/build_skill_smoke_packet.py` and use only that generated packet, not skill bodies, references, docs, git diffs, or external sources.

Result: pass, 38/38 first-skill choices matched the expected smoke-test skill.

| Probe | Expected first skill | Judge first skill | Second skill if needed | Result | Rationale |
| --- | --- | --- | --- | --- | --- |
| S01 | `ai-experience-design` | `ai-experience-design` |  | Pass | Direct match for AI feature UX, calibrated confidence, corrections, and next-action suggestions. |
| S02 | `apple-design` | `apple-design` |  | Pass | Apple platform audit across navigation, search, accessibility, Liquid Glass, and App Intents. |
| S03 | `building-in-public` | `building-in-public` |  | Pass | Indie side project audience growth and prototype-stage posting strategy. |
| S04 | `client-work` | `client-work` |  | Pass | Client revisions, pricing, feedback rules, and walk-away decisions. |
| S05 | `creating-skills` | `creating-skills` |  | Pass | Creating a reusable Claude skill from sources, examples, and tests. |
| S06 | `creative-coding` | `creative-coding` |  | Pass | p5.js, flocking particles, noise, sliders, and generative art. |
| S07 | `data-viz` | `data-viz` |  | Pass | Chart choice and critique with axes, chartjunk, annotations, and cohorts. |
| S08 | `design-craft` | `design-craft` |  | Pass | UI polish plus repeatable quality ritual. |
| S09 | `design-org-influence` | `design-org-influence` |  | Pass | PM pushback, business framing, opportunity cost, and stakeholder pitch. |
| S10 | `design-principles` | `design-principles` |  | Pass | Explicitly maps to Apple design principles: agency, responsibility, simplicity, craft, delight. |
| S11 | `design-prototyping` | `design-prototyping` |  | Pass | Fake-it prototype and feedback session before engineering. |
| S12 | `design-systems` | `design-systems` |  | Pass | Semantic tokens, theming governance, adoption metrics, and AI codegen context. |
| S13 | `devtools` | `devtools` |  | Pass | Developer-tool onboarding, command palette, docs entry points, OSS positioning. |
| S14 | `dhh` | `dhh` | `rails` | Pass | DHH-style Rails review is primary; Rails may be needed for framework-specific misuse. |
| S15 | `feature-discoverability` | `feature-discoverability` |  | Pass | Hidden gesture, TipKit, visible affordances, first-launch hints, and IA. |
| S16 | `frontend-design` | `frontend-design` |  | Pass | Build a distinctive production-grade web app screen. |
| S17 | `graphics-fundamentals` | `graphics-fundamentals` |  | Pass | Color spaces, rasterization, compression, and display rendering behavior. |
| S18 | `hardware-product-design` | `hardware-product-design` |  | Pass | Wearable enclosure, input method, prototyping, manufacturing tolerances. |
| S19 | `learning-experience-design` | `learning-experience-design` |  | Pass | Workshop, job aid, practice, feedback, and transfer checks. |
| S20 | `logo-design` | `logo-design` |  | Pass | Logo concept, brand nouns, sketches, black-and-white presentation. |
| S21 | `malleable-software` | `malleable-software` | `ai-experience-design` | Pass | Reshapable product surface and plugins are primary; AI-assisted changes may require AI UX patterns. |
| S22 | `motion` | `motion` |  | Pass | Motion spring animation, easing options, and MotionScore. |
| S23 | `notification-design` | `notification-design` |  | Pass | Push strategy, permissions, fatigue, grouping, and Apple Watch. |
| S24 | `people-management` | `people-management` |  | Pass | New manager, underperforming direct report, 1:1, feedback, career follow-up. |
| S25 | `photographic-lighting` | `photographic-lighting` |  | Pass | Product photo lighting, glossy object glare, reflections, family-of-angles tests. |
| S26 | `product-decision-making` | `product-decision-making` |  | Pass | Build-or-not decision using defaults, onboarding, settings, metrics, and judgment. |
| S27 | `rails` | `rails` |  | Pass | Rails app performance, Turbo, N+1, migrations, Sidekiq production failures. |
| S28 | `research-cataloging` | `research-cataloging` |  | Pass | Exhaustive source sweep, Wayback, OCR, captions, ledger, transcript readiness. |
| S29 | `route-planning` | `route-planning` |  | Pass | Multi-stop delivery route optimization and backtracking diagnosis. |
| S30 | `shape-up` | `shape-up` |  | Pass | Six-week pitch, appetite, fat-marker scope, risks, betting-table framing. |
| S31 | `swiftui` | `swiftui` |  | Pass | @State resets, LazyVStack performance, gestures, spring transition. |
| S32 | `user-onboarding` | `user-onboarding` | `ux-writing` | Pass | Empty dashboard and first-run setup are primary; welcome copy may need UX writing. |
| S33 | `user-research` | `user-research` |  | Pass | Research plan, screener, field guide, method choice. |
| S34 | `ux-writing` | `ux-writing` |  | Pass | Validation errors, labels, button text, plan-name microcopy. |
| S35 | `web-design` | `web-design` |  | Pass | CSS typography, forms, accessibility states, OKLCH colors, animation values. |
| S36 | `working-with-ai` | `working-with-ai` |  | Pass | AGENTS.md rules, multi-agent review loop, secret safety, coding agents. |
| S37 | `write-clear-prose` | `write-clear-prose` |  | Pass | Essay line edit for clarity, rhythm, structure, plain language, voice preservation. |
| S38 | `x-post-reader` | `x-post-reader` |  | Pass | Public x.com URL plus recent related posts. |

Ambiguous-but-acceptable probes:

- S14: `dhh` is clearly first because the prompt asks for a DHH-style review; `rails` is a plausible helper because the diff is Rails-specific.
- S21: `malleable-software` is first for reshapable product surfaces; `ai-experience-design` is a plausible helper for AI-assisted change behavior.
- S32: `user-onboarding` is first for the empty dashboard and first-run path; `ux-writing` is a plausible helper for welcome copy.

## 2026-07-18 Personal-growth addition

Added S25 for `personal-growth` and renumbered the remaining rows, bringing the deterministic fixture to 39 prompts for 39 local skills. `python3 -B scripts/check_skill_smoke_tests.py` passes. A fresh descriptions-only judge has not yet evaluated the new row; the positive, nearest-neighbor, and safety controls are recorded in `docs/personal-growth-source-mining-2026-07.md` for that follow-up.

## 2026-07-24 Interface-review addition

Added S40 for `interface-review`, bringing the deterministic fixture to 40 prompts for 40 local skills. A fresh descriptions-only judge has not yet evaluated the new row; `interface-review/references/coverage-gaps.md` records that follow-up.

## 2026-11-07 Superconductor addition

Added S42 for `superconductor`, bringing the deterministic fixture to 42 prompts for 42 local skills. `python3 -B scripts/check_skill_smoke_tests.py` passes.

Fresh descriptions-only judge (new subagent, no forked context) ran `python3 -B scripts/build_skill_smoke_packet.py` and used only that packet. Result: pass, 8/8 (4 target, 4 controls).

| Probe | Expected first skill | Judge first skill | Second skill if needed | Result | Prompt summary |
| --- | --- | --- | --- | --- | --- |
| SC1 (S42) | `superconductor` | `superconductor` |  | Pass | Newest tickets/chats, implementation diff, file ticket with default launch. |
| SC2 | `superconductor` | `superconductor` |  | Pass | superconductor.com implementation URL: status and PR. |
| SC3 | `superconductor` | `superconductor` |  | Pass | Find a brainstorming chat and summarize the agreed plan. |
| SC4 | `superconductor` | `superconductor` |  | Pass | "Open in the browser and screenshot the diff"; judge routed to the API skill and noted screenshots are uncovered. |
| SC5 (control) | `working-with-ai` | `working-with-ai` |  | Pass | AGENTS.md rules and multi-agent review loop. |
| SC6 (control) | `devtools` | `devtools` | `ux-writing` | Pass | Devtool onboarding and token settings page design. |
| SC7 (control) | `x-post-reader` | `x-post-reader` |  | Pass | Public x.com status URL. |
| SC8 (control) | none | none |  | Pass | Create a Linear issue; no installed skill should claim it. |

## 2026-11-18 `ui-fx` Addition

Added a smoke row for `ui-fx` (S43 on its branch at the time; renumbered S44 when main, which had added `make-font` as S43, was merged on 2026-11-19, giving 44 prompts for 44 skills). `python3 -B scripts/check_skill_smoke_tests.py` passes.

Fresh descriptions-only judge (new subagent, no forked context) was given only the output of `python3 -B scripts/build_skill_smoke_packet.py`. Result: pass, 43/43 first-skill choices matched, including S43 → `ui-fx`. S16 (`frontend-design`), S22 (`motion`), S36 (`web-design`), S08 (`design-craft`) and S06 (`creative-coding`), the nearest neighbors, were unchanged. Re-run the same day with a second fresh judge after the `ui-fx` description was revised: 43/43 again. Targeted boundary probes X1–X16 are recorded in `docs/ui-fx-source-mining-2026-11.md`.

Third run the same day, after the `ui-fx` description changed again ("from subtle to showpiece … rebuilds effects seen elsewhere"), with a third fresh judge: 43/43.

After merging main on 2026-11-19 the judge runs above were not repeated: they were made against 43 descriptions that did not include `make-font`. `python3 -B scripts/check_skill_smoke_tests.py` passes on the merged fixture.
## 2026-11-18 React and browser-verification additions

Added S43 for `react` and S44 for `browser-verification`, bringing the deterministic fixture to 44 prompts for 44 local skills on this branch (renumbered S45 and S46 when main, which had added `make-font` as S43 and `ui-fx` as S44, was merged on 2026-11-22, giving 46 prompts for 46 skills). `python3 -B scripts/check_skill_smoke_tests.py` passes.

The two smoke rows were not judged on their own. A fresh descriptions-only judge ran the 18-probe fixture `docs/vercel-skills-routing-probes-2026-11.md`, whose R1 and R5 are near-identical to S44 and S43: 18/18, with all ten neighbor and control prompts staying with their existing owners. Table and the judge's reported ambiguities: `docs/vercel-skills-source-mining-2026-11.md` ("Routing probes").

## 2026-11-18 Follow-up: full smoke run after two description edits

After `write-clear-prose` and `design-systems` descriptions were edited, a fresh descriptions-only judge ran all 44 smoke prompts in one blind packet with the other probe sets. Result: pass, 44/44 first-skill matches, including S43 (`react`) and S44 (`browser-verification`), which had not been judged directly before. Other sets and the one pre-existing drift (V9): `docs/vercel-skills-source-mining-2026-11.md` ("Routing probes after the follow-up").
