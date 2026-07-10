# Per-Skill Smoke Test Results

Probe source: `docs/per-skill-smoke-tests-2026-06.md`
Packet builder: `python3 scripts/build_skill_smoke_packet.py`

## 2026-06-29 Deterministic Fixture Check

Command: `python3 -B scripts/check_skill_smoke_tests.py`

Result: pass. The fixture has 38 contiguous probes, exactly one expected first-skill prompt per local skill, no duplicate expected first skills, prompts are under 240 characters, and the generated smoke packet includes every probe.

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
