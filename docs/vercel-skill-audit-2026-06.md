# Vercel-Pattern Skill Audit

Pass started: 2026-06-26
Source pattern: `docs/vercel-product-design-overhaul-2026-06.md`

Legend:

- **P0:** already touched in pilot or blocks the overhaul loop.
- **P1:** high-judgment skill where exemplars, coverage gaps, or source refresh will materially improve agent behavior.
- **P2:** source-derived or router skill that needs a normal trigger/reference/source freshness pass.
- **P3:** utility/narrow skill; validate and leave lean unless a real failure appears.

## Audit Matrix

| Skill | Priority | Current shape | Vercel-pattern action | Test/gate |
| --- | --- | --- | --- | --- |
| `creating-skills` | P0 | Authoring skill; references exist; no exemplars. | Pilot updated; source map and coverage gaps added for official-doc drift, fresh-agent evals, exemplar standards, and source-to-rule promotion. | `validate_all`, routing probes for "convert source to skill". |
| `working-with-ai` | P0 | Three routed references. | Pilot updated; source map and coverage gaps added for tool drift, security/privacy, fresh-agent validation, repo instructions, and AI UI repair fixtures. | Routing probes for agent standards, AI-generated UI repair, AI feature UX control. |
| `design-systems` | P0 | Dense source-derived body plus references/sources. | Pilot updated; DS-as-AI-context boundary and coverage gaps added for context packs, lint checks, and product-judgment split. | Validator plus prompt that asks for DS context pack for agents. |
| `design-craft` | P0 | Long quality-method body, many references, examples present. | Pilot updated; description trimmed; coverage gaps added for before/after exemplars, mechanical checks, theme conflicts, quality rituals, and AI-generated UI boundary. | Validator; design-craft vs frontend-design routing probes. |
| `frontend-design` | P1 | Distinctive generation skill; extra frontmatter license; sources exist. | Coverage gaps added for generated UI fixtures, asset sourcing, anti-slop checks, theme selection, and tactical-skill boundaries. | Existing validator plus generated-UI prompt and product-standard control. |
| `ai-experience-design` | P1 | AI product UX skill with sources and patterns. | Boundary note and coverage gaps added. Next: re-check agent-era sources for examples. | Routing probes for AI feature UX vs agents working in repo. |
| `ux-writing` | P1 | Router body with multiple references. | Source map and coverage gaps added. Next: inspect references for destructive-action, error, settings rule candidates. | Copy rewrite prompt; control prompt for prose essay -> `write-clear-prose`. |
| `user-onboarding` | P1 | Source-derived body and references. | Source map and coverage gaps added. Next: inspect first-run and empty-state references for exemplar candidates. | First-run/empty-state probes. |
| `product-decision-making` | P1 | Long source-derived body; sources exist. | Candidate-guidance note and coverage gaps added. Next: re-reference decision/proposal review sources. | Proposal-review prompt; shape-up boundary probe. |
| `design-prototyping` | P1 | Source-derived body; sources exist. | Eval-fixture note and coverage gaps added. Next: inspect agent prototype references for fixture candidates. | Prototype request vs production implementation control. |
| `devtools` | P1 | Short router to references. | Source map and coverage gaps added. Next: inspect agent-facing devtool examples and boundaries with `working-with-ai`. | Devtool UI prompt; generic Rails/backend control. |
| `design-principles` | P2 | Source-derived strategic skill with sources. | Coverage gaps added for HIG wording, project facets, conflict decisions, and AI-era critique examples. | Critique prompt vs polish prompt control. |
| `design-org-influence` | P2 | Long source-derived body; sources exist. | Coverage gaps added for promotion exemplars, stakeholder scripts, AI-era org claims, and metric/value evidence. | Influence/career prompt probes. |
| `shape-up` | P2 | Source-derived shaping skill; no top-level sources file. | Source map and coverage gaps added; process schools stay explicit rather than blended. | Shaping/betting probe vs design-craft quality program probe. |
| `web-design` | P2 | Router to many web references. | Source map and coverage gaps added for browser/API drift, a11y fixtures, motion checks, forms, and social safe zones. | Web form/a11y/type probes. |
| `apple-design` | P2 | Router to many Apple references. | Source map and coverage gaps added; current HIG remains the tie-breaker before promoting new Apple rules. | HIG lookup probe; SwiftUI engineering control. |
| `swiftui` | P2 | Short router to many references. | Description trimmed; source map and coverage gaps added for API freshness and unsourced references. | SwiftUI layout/animation/concurrency probes. |
| `rails` | P2 | Short router to many references. | Source map and coverage gaps added; school routing remains explicit and project conventions gate new rules. | Rails school selection probes. |
| `research-cataloging` | P2 | Short router, many references. | Description trimmed; source map and coverage gaps added for archive/source-sweep standards. | Source-sweep prompt; translation/OCR controls. |
| `data-viz` | P2 | Short router. | Source map and coverage gaps added for chart integrity, editorial interaction, dashboards, and deterministic checks. | Chart-selection and critique probes. |
| `write-clear-prose` | P2 | Source-derived body, references, agents metadata. | Source map and coverage gaps added for voice packets, fact-checking, genre templates, and `ux-writing` boundary. | Essay edit vs product-copy probes. |
| `user-research` | P2 | Source-derived body and references. | Coverage gaps added for modern tools/channels, AI-mediated research, quant thresholds, and research-to-skill promotion. | Research-plan probes. |
| `feature-discoverability` | P2 | Source-derived body and references. | Coverage gaps added for current TipKit APIs, non-Apple surfaces, re-entry flows, and onboarding boundary. | Feature discovery vs onboarding control. |
| `malleable-software` | P2 | Source-derived body and references. | Coverage gaps added for product exemplars, interop constraints, AI-modifies-product surfaces, and on-ramp examples. | Malleable UI prompt. |
| `creative-coding` | P2 | Source-derived body and sources. | Coverage gaps added for current APIs, performance fixtures, generated-family exemplars, and UI-skill boundary. | Generative sketch prompt. |
| `graphics-fundamentals` | P2 | Source-derived short body; no sources file. | Source map and coverage gaps added; remains mechanism backstop, not task authority. | Rendering/color/blur mechanism probes. |
| `hardware-product-design` | P2 | Source-derived body and sources. | Coverage gaps added for supplier artifacts, regulatory/safety checks, unit economics, AI hardware, and test protocols. | Hardware mockup/input prompt. |
| `logo-design` | P2 | Source-derived body; no sources file. | Source map and coverage gaps added for AI originality checks, client decks, industry constraints, and trademark/a11y boundaries. | Logo prompt vs app-icon control. |
| `notification-design` | P2 | Source-derived body and sources. | Coverage gaps added for current Apple APIs, rule IDs, frequency metrics, non-Apple channels, and copy boundary. | Notification prompt. |
| `people-management` | P2 | Source-derived body and sources. | Coverage gaps added for HR/legal boundaries, remote norms, training artifacts, AI tools, and influence split. | Management prompt. |
| `photographic-lighting` | P2 | Source-derived body and sources. | Coverage gaps added for repeatable setup examples, modern gear, color workflow, product-shot fixtures, and safety. | Lighting prompt. |
| `building-in-public` | P2 | Source-derived body and sources. | Coverage gaps added for platform mechanics, launch exemplars, audience metrics, ethics/privacy, and devtools boundary. | Launch/content prompt. |
| `client-work` | P2 | Router to references; no top-level sources file. | Source map and coverage gaps added for legal review, pricing exemplars, scripts, qualification, and product-pricing split. | Client pricing/kickoff probes. |
| `learning-experience-design` | P2 | Source-derived body; no references. | Source map and coverage gaps added for artifacts, measurement, AI learning, org adoption, and accessibility. | Course/workshop prompt. |
| `route-planning` | P3 | Narrow utility; no references. | Leave lean; deterministic behavior belongs in scripts/tools if added. | Route-order task. |
| `x-post-reader` | P3 | Narrow utility; no references. | Leave lean; test against current public X access when used. | Tweet URL prompt. |
| `motion` | P3 | External/tool umbrella; no references. | Leave unless Motion plugin/tooling changes; verify current docs when used. | Motion task prompt. |
| `dhh` | P3 | Persona/review skill; no references. | Leave unless source corpus is refreshed. | Diff-review prompt. |

## Immediate Next Batch

1. Rerun the P0/P1 routing probes in `docs/vercel-routing-probes-2026-06.md` after future description or probe changes.
2. Rerun the per-skill smoke pass in `docs/per-skill-smoke-tests-2026-06.md` after future skill additions or description changes.
3. Continue description/routing hygiene checks across all skills.
4. Add exemplars only where repeated accepted decisions already exist; otherwise keep candidates in coverage gaps.
5. Re-run `python3 -B scripts/validate_all.py`, `python3 -B scripts/check_xrefs.py`, `python3 -B scripts/check_vercel_overhaul.py`, `python3 -B scripts/check_vercel_routing_probes.py`, `python3 -B scripts/check_skill_smoke_tests.py`, and `git diff --check`.
