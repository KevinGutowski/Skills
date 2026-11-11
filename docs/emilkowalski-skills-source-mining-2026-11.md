# Emil Kowalski open skills (aiforui.dev) source mining — 2026-11

Source: https://aiforui.dev/skills · https://github.com/emilkowalski/skills (MIT)
Revision: `715c1807e08c497cfd1dc4feb450a2a3300ef2a9` (2026-11-09), read 2026-11-10

Ticket-driven: "take the best parts of the skills here and incorporate them into our skills library." The library already carried Kowalski's animations.dev course (`web-design` (web-animation-design)) and an earlier `emil-design-eng` fold (`design-craft` (emil-kowalski)), so this pass is deltas only. No new top-level skill; no description routing changed except `web-design`, which gained "gestures" and "mobile-browser native feel".

## Manifest and coverage

The site's `/skills` index and all 17 per-skill pages were fetched. They are summaries (what it does, when to use, pairs with, example prompts); the skill bodies live in the repository, which was cloned and read.

| Source area | Read | Density | Decision |
| --- | --- | --- | --- |
| Site index + 17 per-skill pages | Yes | Low | Summaries of the repo skills; used only to confirm scope and pairings. |
| Repo README, LICENSE | Yes | Low | Install instructions, not portable. MIT; integration is attributed paraphrase. |
| `choreograph` + RECIPES | Full | High, almost all new | New `web-design` (web-animation-design) member `choreography`. |
| `animation-performance` + root `performance-cheatsheet.md` | Full | High, about half new | New member `animation-performance`; parent Performance section corrected; two lines in `web-design` (web-performance). |
| `animation-vocabulary` | Full | High (glossary), all new | New member `animation-vocabulary` (reverse lookup; definitions rewritten). |
| `review-animations` + STANDARDS | Full | Medium | Values already local; the method (flag-on-sight list, fix order, Block/Approve) became a Review Method section in the parent reference. |
| `animate` + RECIPES | Full | Low–medium | Build order, tool ladder, purpose gate, four-tier frequency list, per-component defaults merged into the parent reference and PRACTICAL-TIPS. |
| `emil-design-eng` | Full | Low | Already the basis of `design-craft` (emil-kowalski). Only the Motion 14.2 correction and small scoping rules were new. |
| `find-animation-opportunities` | Full | Medium | New member `motion-audit` (find mode). |
| `remove-animations` | Full | High | `motion-audit` (remove mode): verdicts, reduce table, removal hazards, cleanup. |
| `improve-animations` + AUDIT + PLAN-TEMPLATE | Full | Medium–high | `motion-audit` (audit-and-plan mode); the template was folded as plan essentials, not copied. |
| `gestures` | Full | High, ~40% already local | New member `gestures`. |
| `apple-design` (WWDC fluid interfaces ported to the web) | Full | Medium | Web implementation → `gestures`; two bullets → `swiftui` (touch-interaction-design) fluid-interfaces; materials → `design-craft` (surfaces); preference queries → `web-design` (web-accessibility). Typography, sound, principles, and process sections duplicate existing owners and were skipped. |
| `mobile-native` | Full | High | New `web-design` reference `mobile-web-native-feel`. |
| `break-ui` + CATALOG | Full | High | New `design-craft` reference `worst-case-data`; pointer from the harden move. |
| `prototype` + PICKER | Full | Medium | About half duplicates the Pocock/Ness loop. Delta merged into `design-prototyping` methods as a picker-harness section. |
| `pick-ui-library` | Full | Medium | New `frontend-design` reference `ui-library-picks`, labeled one practitioner's dated list. |
| `ask-sonner` + API | Full | Medium / low | Troubleshooting traps only, in `ui-library-picks`; API tables link out. |
| `animate-expo` + RECIPES | Full | High for React Native, low here | Parked: no React Native cluster. |
| `write-swift` | Screened (outline and selected sections) | Medium–high | Parked: in the repo but not on the site; Xcode first-party skills outrank it. |
| Root `ui-cheatsheet.md` | Yes | Low | Every row already local (tabular numbers, eased gradients, press scale, origin, 65ch) or now in `worst-case-data` (avatar `flex-shrink`, `Intl.PluralRules`). |

## Fold map

- **`web-design` (web-animation-design)** — parent reference: Review Method, Build Order and Tool Ladder, purpose gate, four-tier frequency list, rewritten Performance section, links to five new members. Members: `choreography`, `animation-performance`, `animation-vocabulary`, `gestures`, `motion-audit`. PRACTICAL-TIPS: `will-change` caveat, immediate exits, no stagger on menus, scroll reveals fire once.
- **`web-design` (mobile-web-native-feel)** — new reference: symptom → cause → fix table, baseline, never-ship list, hardware verification.
- **`web-design` (web-performance, web-accessibility)** — 120Hz budget and the "janks only while busy is a thread problem" rule; the three preference queries.
- **`design-craft`** — `worst-case-data` (new), harden pointer in refinement-moves, emil-kowalski corrections, translucent-materials section in surfaces.
- **`design-prototyping` (methods)** — variant picker harness mechanics.
- **`frontend-design` (ui-library-picks)** — new.
- **`swiftui` (touch-interaction-design)** — one spring per axis; commit or reverse on velocity direction; pointers to the web members.
- **`interface-review`** — hand-off line for motion-only passes and worst-case data.
- Routers, source maps, coverage gaps, and README updated to match.

## Corrections and conflicts

- **Stale local claim fixed.** Three local files said Motion's `x`/`y`/`scale` shorthands are never hardware accelerated. Upstream now scopes this to versions before 14.2; confirmed against Motion's changelog (14.2.0, 2026-10-13). The vendored `motion` best-practices file still carries the older advice and was not edited; logged in `web-design` coverage gaps.
- **`will-change`.** Upstream: add only after observing a 1px shift or measuring drops. The `motion` kit: set it for transitions. Kept as two schools in `animation-performance`.
- **Source claims narrowed in `mobile-web-native-feel`.** `interactive-widget=resizes-content` (checked against MDN: `resizes-visual` is the default; the flag is not an iOS-parity switch), `100dvh` everywhere (scoped to browser tabs; `apple-installed-web-apps` keeps its standalone rule), and `user-select: none` on links (narrowed to controls).
- **Gesture release.** One upstream skill bans CSS transitions on gesture elements, another allows them. Scoped by whether the throw must carry velocity.
- **Dismissal thresholds.** Sonner's 0.11 px/ms, Motion's 500 px/s, and Apple's projection are alternatives, one per component, not a blend.
- **Stagger step.** 30–80ms here vs Krehel's ~100ms in `design-craft` (animations): product UI vs marketing/first-run.
- **Top frequency tier.** Local parent says "none or drastically reduced" at 100+/day; upstream says none. `motion-audit` applies the strict reading for audit work and makes keyboard-triggered a disqualifier.
- **Severity scales.** `motion-audit` and `worst-case-data` have their own labels; both defer to `interface-review`'s scale when run inside a full review.
- **Prototype host and disposal.** Pocock (existing route, archive branch) vs Kowalski (isolated route, delete after integrating) are scoped by case in methods.
- **Primitives pick.** Ryo Lu's notes name shadcn/Radix; Kowalski names Base UI. Same rule, different pick; the project's existing choice wins.

## Parked or skipped

- **`animate-expo`.** Lessons to fold if a React Native cluster ever exists: keep per-frame work on the UI runtime (no `setState` per frame); tool ladder from Reanimated CSS transitions to layout animations to shared values, with native stack/form sheet/native tabs before JS rebuilds; no `entering` on virtualized rows; never animate header height, blur intensity, or Android elevation; keyboard-synced UI from `react-native-keyboard-controller`; haptics on the same frame as the visual, one per action; judge feel on a release build on the slowest device; tabs never slide.
- **`write-swift`.** Candidates if corroborated against swift.org or the Xcode skills: the defaults ladder (struct → concrete → `some` → main-actor synchronous), actor reentrancy rules, `@concurrent` vs `nonisolated` as explicit choices, Swift Testing by default, ARC lifetime ends at last use, algorithmic-complexity traps.
- **Prompt scaffolding.** "Initial Response" boilerplate, personas, invocation syntax, subagent counts per effort level, output templates: not imported.
- **Long code.** The picker CSS/JS, the duplicate-view crossfade, and `useAnimate` orchestration are described as behavior contracts only.
- **Sonner API and call-picker tables.** Left to the live docs.
- **Translation-length percentage** from the break-ui catalog: not carried; `web-design` (web-layout-design) prefers pseudo-localization.

## Verification

- Quotes: 7 of 7 short quotes verified with `scripts/verify_quotes.py` (choreography 2, motion-audit 2, worst-case-data 2, methods 1).
- External checks: Motion changelog (14.2.0), MDN viewport meta (`interactive-widget`).
- Validators: `validate_all`, `check_xrefs`, `check_reference_hygiene`, `check_vercel_overhaul`, `check_vercel_routing_probes`, `check_skill_smoke_tests`, `check_application_fixtures`, `git diff --check`.
- Not done: real-device checks of the mobile and gesture guidance.

## Routing probes — 2026-11-11 fresh descriptions-only judge

Setup: a fresh subagent with no conversation or repository context read one packet: the 42 skill descriptions from `scripts/build_skill_smoke_packet.py` plus the 15 prompts below, with expected answers withheld. It was told to open no other file. Result: 15/15 first-skill matches.

| ID | Prompt | Kind | Expected | Judge first / second | Result |
| --- | --- | --- | --- | --- | --- |
| E1 | Make this bottom sheet in our React web app draggable, with swipe to dismiss. | Target (gestures) | `web-design` | `web-design` / `motion` | Pass |
| E2 | On my iPhone, buttons in our web app flash gray when I tap them and stay highlighted, and the page zooms in when I focus the email input. | Target (mobile feel) | `web-design` | `web-design` | Pass |
| E3 | The drawer on our Next.js site jumps when I let go halfway through a drag. | Target (gestures) | `web-design` | `web-design` / `motion` | Pass |
| E4 | When I delete a card from this list on our website the others jump into place. Coordinate the motion so it reads as one move. | Target (choreography) | `web-design` | `web-design` / `motion` | Pass |
| E5 | We animate way too much across our web app. Survey it and tell me which animations to remove. | Target (motion-audit) vs `interface-review` | `web-design` | `web-design` | Pass |
| E6 | Our web app's bottom bar sits under the home indicator in mobile Safari and the full-height layout overflows. | Target (mobile feel) | `web-design` | `web-design` | Pass |
| E7 | Add a swipe-to-dismiss gesture to this SwiftUI sheet and make it feel fluid. | Neighbor | `swiftui` | `swiftui` | Pass |
| E8 | Use motion/react to generate a CSS linear() spring and run a MotionScore performance audit. | Neighbor | `motion` | `motion` | Pass |
| E9 | Build a distinctive landing page hero for the marketing site of our mobile app. | Neighbor | `frontend-design` | `frontend-design` | Pass |
| E10 | Stress test this member row with the worst realistic data you can think of. | Target (worst-case-data) | `design-craft` | `design-craft` | Pass |
| E11 | Design the tab bar and navigation structure for our native iOS app following the HIG. | Neighbor | `apple-design` | `apple-design` | Pass |
| E12 | Review this whole checkout flow for accessibility, copy, layout, and polish, and give me a verdict. | Neighbor | `interface-review` | `interface-review` | Pass |
| E13 | A UIKit pan gesture recognizer conflicts with scrolling in my collection view. | Neighbor | `uikit` | `uikit` | Pass |
| E14 | Write a webhook handler in our Rails app. | Control | `rails` | `rails` | Pass |
| E15 | Plan user interviews for a pricing study. | Control | `user-research` | `user-research` | Pass |

The prompts from this run are now fixture rows W1–W15 in `docs/web-motion-routing-probes-2026-11.md`.

Observations: the judge named `motion` as a second skill on E1, E3, and E4, which matches the existing boundary (library work → `motion`, design values and mechanics → `web-design`). On E10 it noted that no description names worst-case data outright and chose `design-craft` as the closest fit; at the time of this run the `design-craft` description had no explicit trigger (added in the follow-up pass below). One run, one judge.

## Follow-up pass — 2026-11-11

Requested after the two QA rounds.

- **Line-by-line review** of the six new references that had only been checked structurally (choreography, animation-performance, animation-vocabulary, motion-audit, worst-case-data, ui-library-picks). Corrections:
  - `gestures`: new section "Every gesture has a non-gesture path" — WCAG 2.2 SC 2.5.7 Dragging Movements and SC 2.5.1, keyboard equivalents, an alternative to press-and-hold, discoverable gesture-revealed actions; checklist item added. Upstream does not cover this.
  - `choreography`: attention loops are capped, off under reduced motion, and subject to WCAG 2.2.2 when they auto-run past five seconds.
  - `motion-audit`: hold-to-confirm is proposed only with a keyboard/assistive-technology equivalent; frame-rate diagnosis now points at the animation-performance member.
  - `worst-case-data`: truncated text needs a detail view plus a tooltip that works on focus and touch; `title` alone reaches neither.
  - `animation-vocabulary`: "layout thrashing" separated from layout-triggering animation; upstream uses the term loosely.
  - `ui-library-picks`: no changes. Its Sonner rows were read against the upstream skill, not re-verified against Sonner's live docs.
- **`design-craft` description** now names stress-testing and "worst-case data"; shortened elsewhere to stay under the 450-character cap (447).
- **`motion` best-practices** carries two dated library notes about Motion 14.2 accelerated shorthands and the `will-change` schools. The vendored text itself was not rewritten.
- **Scripted probe fixture:** `docs/web-motion-routing-probes-2026-11.md` (W1–W18) with `scripts/check_routing_probe_fixtures.py`, added to CI and the standard command lists. Its `--packet` flag builds a blind packet.
- **Re-probe after the `design-craft` description change:** fresh subagent, blind packet, one file read. 18/18. W1–W15 repeated the earlier answers; W10 was now cited as "a named design-craft trigger"; W16 and W17 (polish, quality ritual) stayed with `design-craft`; W18 (API load test, "worst-case" control) was answered `none`, which the fixture accepts.
- **Still not done:** real-device checks. This environment has no phone or touch hardware, so the gesture and mobile-browser guidance remains verified from documentation only.

## QA corrections — 2026-11-11

- `choreography` (second pass): the duplicate-view crossfade copy must stay `inert` and `aria-hidden` for its whole lifetime; focus and interaction belong to the live view.
- `gestures` and `mobile-web-native-feel` (second pass): single-axis surfaces default to `pan-y pinch-zoom` / `pan-x pinch-zoom`, since bare `pan-*` also disables browser pinch zoom. Upstream uses the bare values.
- `animation-performance`: `opacity` carries the fade only; hidden state needs unmounting, `visibility`/`hidden`, or `inert`. `scale()` is scoped to cases where scaled children and no reflow are acceptable; measured layout animation stays when neighbors must move.
- `choreography`: Motion's default `AnimatePresence` mode is `sync` (enter and exit start together, both in flow); `wait` sequences them; `popLayout` removes the exiting element from flow. The first version of this fold said the default plays them back to back, which was wrong.
