# Critique scoring: specificity, heuristics, load, personas

## Contents

- When to load this
- Two isolated passes
- Design specificity verdict
- Nielsen heuristics, scored 0–4
- Cognitive load checklist
- Persona walk-throughs
- Technical audit dimensions
- Severity mapping and delivery

Adapted from Impeccable's `critique` and `audit` (Paul Bakaus, Apache-2.0; see [sources.md](sources.md)). The rubric texts are paraphrased. Nielsen's heuristics are Jakob Nielsen's (NN/g, 1994). Working-memory limits (Cowan, 2001) apply to what users must *remember*, not to options they can see. Nielsen makes the same distinction for visible menus (https://www.nngroup.com/articles/short-term-memory-and-web-usability/).

## When to load this

Load it when the user asks for a **scored** critique ("rate this", "how good is this", a before/after score), a persona or cognitive-load walk-through, or a repeatable baseline to re-run after fixes. The SKILL.md flow (scope → recon → domain owners → evidence → verdict) still governs. This file adds scoring lenses on top. It does not replace the HIGH/MEDIUM/LOW scale or the single verdict.

## Two isolated passes

1. **Pass A, design judgment.** Read source and inspect the render. Form the specificity verdict, heuristic scores, cognitive-load count, and persona red flags **before** seeing any deterministic output.
2. **Pass B, deterministic evidence.** Run detectors and automated checks: axe or Lighthouse, `npx impeccable detect --json`, the project's lints. Record counts, rule names, and locations.
3. **Synthesize. Don't concatenate.** Say where A and B agree, what B caught that A missed, and which B findings are false positives in this world.

Deterministic output anchors judgment even though it is mechanical, so keep it out of pass A. When subagents are available, run A and B as two isolated agents with no shared transcript. Otherwise run A to completion first. Either way, the report's first line states how the passes ran (for example `Method: isolated passes` or `Method: single context, A before B`). A skipped detector is a gap to name, not a silent omission. On native iOS/Android code, HTML/CSS detectors do not apply: write `Pass B: not applicable (native)` and never read an empty scan as clean.

## Design specificity verdict

**Start the report here.** Does the interface feel authored for this product, or could an unrelated product use it unchanged? Cover coherence, structural sameness (identical card grids, template heroes), category-interchangeable choices, and missed chances for product character. Name the specific tells using `frontend-design` (anti-slop-catalog). Judge against the product's own brief and mode: a familiar, well-executed Operate surface can be specific through precision, not ornament.

## Nielsen heuristics, scored 0–4

Score each heuristic. A 4 means genuinely excellent, not "fine"; most real interfaces land at 20–32 of 40.

| # | Heuristic | 0 | 2 | 4 |
| --- | --- | --- | --- | --- |
| 1 | Visibility of system status | Users guess what happened | Some states shown, major gaps | Every action confirms; progress always visible |
| 2 | Match with the real world | Tech jargon throughout | Mixed plain language and leaks | Speaks the user's language fluently |
| 3 | User control and freedom | Trapped without a refresh | Main flows escapable, edges not | Undo, cancel, back, escape everywhere |
| 4 | Consistency and standards | Feels like stitched products | Main flows match, details diverge | Same words, actions, and visuals mean the same thing |
| 5 | Error prevention | Easy to make costly mistakes | Some guards, gaps remain | Constraints, defaults, and confirmation where it counts |
| 6 | Recognition over recall | Users must remember across screens | Partial context | Options and context visible when needed |
| 7 | Flexibility and efficiency | No accelerators | Some shortcuts | Experts fly; novices are not punished |
| 8 | Aesthetic and minimalist design | Noise everywhere | Some clutter | Every element earns its place |
| 9 | Error recovery | Cryptic or no messages | Some guidance | What failed, why, and how to recover |
| 10 | Help and documentation | None where needed | Exists, hard to find | Contextual, findable, task-focused |

- **n/a is allowed** when a heuristic cannot apply. Heuristics 7 and 10 often fall away on Persuade or Experience surfaces such as landing pages and portfolios. Write `n/a` with a one-line reason and renormalize: the maximum is 4 × the number scored. Never print `/40` over a partial set.
- **Bands by percentage:** 90%+ Excellent · 70%+ Good · 50%+ Acceptable · 30%+ Poor · below 30% Critical.
- **Trends compare like with like.** When re-running after fixes, show each score with its own denominator if the scored set changed.

## Cognitive load checklist

Count failures: 0–1 is low, 2–3 moderate, 4+ high (a priority fix).

- **Single focus:** the primary task can be completed without competing elements pulling attention.
- **Chunking:** information comes in labeled, scannable groups rather than an undifferentiated run.
- **Grouping:** related items sit together by proximity or shared surface.
- **Hierarchy:** what matters most is obvious at a glance.
- **One decision at a time:** each choice is finished before the next appears.
- **Scannable choices:** visible options are grouped, ordered, and labeled so the right one is easy to find. Visible menus are recognition, not recall, so the number of options alone is not a finding. Flag a decision point when options are unlabeled, unordered, or of equal weight with no recommended path, or when users must compare options that aren't shown together. Don't hide navigation just to reduce a count.
- **No memory bridge:** nothing must be remembered from a previous screen to act on this one. This is where working-memory limits really bite: a code, a value, or an earlier choice the user has to carry across steps.
- **Progressive disclosure:** complexity appears only when needed.

Named violations to look for: the wall of options, the memory bridge, hidden location (no breadcrumb or active state), the jargon barrier, the visual noise floor (everything equal weight), inconsistent patterns, multi-task demands, and context switches to gather one decision's inputs. Distinguish **intrinsic** load (the task's own complexity: structure it), **extraneous** load (design-caused: eliminate it), and **germane** load (learning that builds mastery: support it).

## Persona walk-throughs

Pick 2–3 personas for the surface and walk the primary action as each. Report **what broke for them**, naming exact elements. Generic persona descriptions do not count.

| Persona | Tests | Red flags |
| --- | --- | --- |
| Impatient power user | Core task under a minute, shortcuts, bulk actions, skippable onboarding, Esc to dismiss | Forced tours, many clicks, no keyboard path |
| Confused first-timer | Comprehension with no product knowledge | Icon-only nav, jargon errors, no visible help, unclear next step |
| Accessibility-dependent user | Keyboard-only, screen reader, zoom, reduced motion | Focus traps, unlabeled controls, motion with no alternative |
| Deliberate stress tester | Long and empty input, rapid clicks, back/forward, bad data | Double submits, lost input, broken states |
| Distracted mobile user | One thumb, interruptions, poor network | Small targets, lost progress on interrupt, heavy pages |

| Surface | Personas |
| --- | --- |
| Landing / marketing | first-timer, stress tester, mobile |
| Dashboard / admin, data-heavy | power user, accessibility |
| Checkout / e-commerce | mobile, stress tester, first-timer |
| Onboarding | first-timer, mobile |
| Forms / wizards | first-timer, accessibility, mobile |

Derive one or two project-specific personas only from real audience context the project has written down. Never invent audience facts.

## Technical audit dimensions

For an implementation-focused audit, score five dimensions 0–4 (out of 20: 18+ Excellent, 14+ Good, 10+ Acceptable, 6+ Poor):

1. **Accessibility:** contrast, keyboard and focus, semantics and landmarks, labels, alt text, a reduced-motion path that keeps meaningful feedback (flag a global `0.01ms` kill that erases state changes), and target size (WCAG 2.2 AA 24×24 CSS px or the spacing exception; 44px is the comfort target).
2. **Performance:** layout thrash, unbounded blur, filter, or shadow animation, `will-change` left on at rest, unoptimized images, bundle weight, needless re-renders.
3. **Theming:** hard-coded values that bypass tokens, broken dark mode, values that do not update on theme switch.
4. **Responsive:** fixed widths, overflow, text scaling, and **touch gestures that actually work**. A custom slider or drag surface that swallows scroll, lacks `touch-action`, or sticks after an interrupted gesture fails. Say what produced the evidence: an emulated viewport proves layout, not the gesture.
5. **Implementation integrity:** design-system drift, repeated shortcuts, decorative or misleading content, and structure that is interchangeable with an unrelated product.

Name systemic patterns ("hard-coded colors in 15+ components") separately from one-offs, and keep the low-severity tail short so it does not bury what matters.

## Severity mapping and delivery

| Impeccable | This skill | Test |
| --- | --- | --- |
| P0 Blocking | HIGH | Prevents task completion |
| P1 Major | HIGH or MEDIUM | Significant difficulty, or a WCAG AA failure. *Would a user contact support about it?* If so, it is at least P1. |
| P2 Minor | MEDIUM | Annoyance with a workaround |
| P3 Polish | LOW (`full` mode only) | No real user impact |

- **Write the whole report first, then ask.** End with 2–4 targeted questions, each with 2–3 concrete options tied to actual findings: which issue category to tackle first, whether a tonal mismatch was intended, scope (top 3 / all / critical only), and anything off-limits. Nothing follows the questions. Skip them only when there are fewer than three priority issues, and say so.
- Recommend fixes by owning skill (`design-craft` refinement moves, `ux-writing`, `web-design` references), ending with a polish pass if any fixes were recommended.
