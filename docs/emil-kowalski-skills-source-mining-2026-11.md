# Emil Kowalski skills source mining — 2026-11

Source: https://aiforui.dev/skills (Emil Kowalski). Repository: https://github.com/emilkowalski/skills. License: MIT, © 2026 Emil Kowalski.
Revision: `715c1807e08c497cfd1dc4feb450a2a3300ef2a9` (2026-11-09). 31 Markdown files, 5,691 lines.

Ticket: "https://aiforui.dev/skills Let's take the best parts of the skills here and incorporate them into our skills library."

The repository is 18 user-invocable skills on web motion, gestures, mobile browser behavior, content stress-testing, prototyping, React Native animation, Apple-style design, and Swift, plus two one-page cheat sheets. This library already held Emil's course material and an earlier copy of his `emil-design-eng` skill (`design-craft` (emil-kowalski), `web-design` (web-animation-design)), so the intake is delta-only. All text below is paraphrased. No skill text, greeting blocks, prompt wording, picker markup, or scripts were imported.

## Manifest and coverage

| Source area | Read | Density | Decision |
| --- | --- | --- | --- |
| `README.md`, `LICENSE` | Yes | n/a | Inventory, license, and install notes only. |
| `skills/choreograph/SKILL.md`, `RECIPES.md` (463 lines) | Yes | **High** | Casting, pair relationships, stagger budgets, sequence exceptions, secondary motion, interruption tests, timeline handoff → NEW `web-design` (web-animation-design → choreography). |
| `skills/gestures/SKILL.md` (106) | Yes | **High** | Tracking vs release, release decisions, one progress value, sheet timings, hold gestures → NEW `web-design` (web-animation-design → gestures). |
| `skills/animation-performance/SKILL.md` (222), `performance-cheatsheet.md` (15) | Yes | **High** | Symptom table, tiers, thread table, diagnosis order, report shape → NEW `web-design` (web-animation-design → performance-diagnosis). The Motion acceleration change was verified and applied to three older statements. |
| `skills/review-animations/SKILL.md`, `STANDARDS.md` (307) | Yes | High | Ten standards, fix preference, Block/Approve → NEW `web-design` (web-animation-design → motion-audits). |
| `skills/improve-animations/SKILL.md`, `AUDIT.md`, `PLAN-TEMPLATE.md` (297) | Yes | High | Map-judge-reread sweep, severity table, executor-ready plan shape → motion-audits. |
| `skills/find-animation-opportunities/SKILL.md` (140) | Yes | High | Four-question gate, where gaps live, required rejected-candidates section → motion-audits. |
| `skills/remove-animations/SKILL.md` (166) | Yes | **High** | Decision gate, reduce table, removal hazards, orphan cleanup, required kept section → motion-audits. |
| `skills/mobile-native/SKILL.md` (311) | Yes | **High** | Sticky hover, tap feedback, viewport units, focus zoom, keyboard, scroll chaining, selection, `touch-action`, `theme-color`, never-ship list → NEW `web-design` (mobile-browser-behavior), with platform mechanics re-grounded in MDN and W3C. |
| `skills/break-ui/SKILL.md` (175), `CATALOG.md` (135) | Yes | High | Method → `design-craft` (refinement-moves, Harden). CSS failure signatures → `web-design` (web-layout-design). The catalog's category lists were not imported. |
| `ui-cheatsheet.md` (16) | Yes | Medium | `flex-shrink: 0` on fixed media and `Intl.PluralRules` → web-layout-design. Two lines not folded (see Parked). |
| `skills/animation-vocabulary/SKILL.md` (181) | Yes | Medium | Eight pairs of terms that get confused → `web-design` (web-animation-design). The full glossary was not imported. |
| `skills/prototype/SKILL.md` (98), `PICKER.md` (197) | Yes | Medium | Named axis, craft bar per variant, one variant at a time, picker behavior, favourite-free hand-off → `design-prototyping` (agents-field-notes). Picker markup, CSS, and script not imported. |
| `skills/emil-design-eng/SKILL.md` (676) | Yes (diffed against the library copy) | Low (delta) | Nearly identical to `design-craft` (emil-kowalski). One substantive change, the Motion 14.2 acceleration boundary, applied. |
| `skills/animate/SKILL.md`, `RECIPES.md` (531) | Yes (recipes checked by topic against the library) | Low (delta) | Restates values the library already holds from the same author. No fold. |
| `skills/apple-design/SKILL.md` (290) | Yes | Low–medium | Deceleration constants, velocity-sign rule, rubber-band formula → `swiftui` (touch-interaction-design → fluid-interfaces) and the web gestures file. The rest conflicts with Apple-sourced references or is unattributed; see Conflicts and Parked. |
| `skills/write-swift/SKILL.md` (396) | Yes | Mixed | Actor reentrancy and `@concurrent`, both confirmed against Swift Evolution → `swiftui` (swift-concurrency). The rest is parked; errors listed below. |
| `skills/animate-expo/SKILL.md`, `RECIPES.md` (648) | Yes | High for its platform | Parked. No React Native owner exists in this library. |
| `skills/ask-sonner/SKILL.md`, `API.md` (152) | Yes | Low | Skipped. Product documentation for one library. |
| `skills/pick-ui-library/SKILL.md` (85) | Yes | Low | Parked. One author's picks, and they date quickly. |

## Fold map

Extend only; no new top-level skill and no description changes. The source is organized by command; per `docs/skill-library-ops.md` ("fold by use, not by source") it was split across existing owners:

- **`web-design` (web-animation-design).** Four NEW deep dives under `references/web-animation-design/`: `choreography.md`, `gestures.md`, `performance-diagnosis.md`, `motion-audits.md`. The parent gained a close-terms table, a version-scoped Motion acceleration note, a narrower "CSS vs JS" statement (the cost is `requestAnimationFrame`, not JavaScript), a `will-change` rule tied to an observed symptom, and links to all six deep dives. `web-animation-design/sources.md` records the repo and the Motion changelog.
- **`web-design` (mobile-browser-behavior).** NEW first-level reference, routed from a new SKILL.md bullet and the README row. The safe-area paragraph in web-layout-design, the input mechanics in form-design, and the gestures touch checklist point to it.
- **`web-design` (web-layout-design).** NEW "Content-stress failure signatures" section: twelve symptom-to-CSS rows and the truncate / wrap / clamp decision.
- **`design-craft`.** refinement-moves (Harden) gained a six-step content stress pass with a fixed report table. emil-kowalski and its interaction-and-performance deep dive had three Motion statements version-scoped.
- **`design-prototyping` (agents-field-notes).** A third variants workflow, with its two differences from the existing ones kept as scoped choices.
- **`swiftui`.** swift-concurrency gained "Actors: an `await` ends the atomic section" (reentrancy, `@concurrent`, the escalation ladder). fluid-interfaces gained the deceleration constants, the velocity-sign rule, and the rubber-band formula.
- **`working-with-ai` (ai-ui-direction).** The "spring-everything" remedy now points to the close-terms table.

## Verified against primary sources

- **Motion acceleration.** Motion's changelog lists "Hardware accelerated independent transforms" under 14.2.0, dated 2026-10-13. The library said the shorthands (`x`, `y`, `scale`, `rotate`) are never accelerated; that is now scoped to versions before 14.2.0 in `web-design` and `design-craft`.
- **Actor reentrancy and `@concurrent`.** SE-0306 (actor reentrancy) and SE-0461 (`@concurrent`, upcoming feature `NonisolatedNonsendingByDefault`, Swift 6.2) were read on 2026-11-10.
- **Mobile browser mechanics.** The MDN and W3C URLs cited in mobile-browser-behavior resolved on 2026-11-10. The viewport meta page was read in full (`interactive-widget`, `viewport-fit`, the `user-scalable` warning). The other pages were not re-read line by line.

Not verified: every device-observed behavior in mobile-browser-behavior (no hardware in this environment), Emil's working numbers for stagger, thresholds, and durations (one author's practice), and which Xcode build setting groups the SE-0461 feature flag.

## Conflicts and how they were resolved

- **Motion shorthands.** Old library text ("never accelerated") vs the source ("accelerated from 14.2"). The changelog settles it; all three statements are now version-scoped, and guidance tells the reader to check the installed version.
- **Vendor `motion` skill.** Its performance-audit tier data still describes the pre-14.2 behavior. That skill is vendor-imported and was not edited. Recorded in `web-design` coverage gaps with a re-sync trigger.
- **Stagger step.** The source's 30–80ms for product UI vs `design-craft` (animations) at about 100ms from Jakub Krehel's enter recipe. Both kept, scoped by context: product UI seen many times a day vs marketing and first-run moments.
- **Velocity thresholds.** `0.11` in `design-craft` is px/ms computed by hand; `500` in the new gestures file is Motion's px/s. Different units, labeled, not blended.
- **Shadow animation.** `web-performance` fades a pre-rendered shadow layer; the source animates `filter: drop-shadow()`. The opacity fade stays the default because it is composite-only everywhere.
- **Transform-origin variable.** The source replaced Radix's variable with Base UI's. The library keeps both, since projects use either.
- **Review verdicts.** The source's motion review has Block / Approve; `interface-review` has Block / Needs changes / Approve. `interface-review` wins inside a broader review.
- **Viewport height.** The source prefers `dvh` everywhere; `apple-installed-web-apps` uses `100vh` for an installed app's shell. Scoped: browser tabs follow the new file, installed apps keep theirs.
- **Prototype variants.** The source mounts variants on an isolated route or a single HTML file and deletes that surface after promoting the winner. Matt Pocock's workflow, already in the library, mounts them on the existing route and commits the full set to a throwaway branch. Both recorded with when each applies.
- **`apple-design` vs Apple-sourced references.** The source's spring table, hand-set tracking values, scroll-edge preference, and cross-fade setting differ from `apple-design` and `swiftui`, which cite Apple directly. Apple-sourced content wins; none of these were folded. Platform rules do not cross: the web gestures file and the SwiftUI file each carry their own version of the release math.
- **Manual velocity math.** `swiftui` tells native code to let the framework carry velocity; the web has no equivalent without a library. Each platform keeps its rule.

## Errors found in the source

Recorded so a later pass does not import them:

- `write-swift` describes `private` as file-scoped. It is scoped to the enclosing declaration and its same-file extensions; `fileprivate` is the file scope.
- `write-swift` states that `async` functions stay on the caller's actor without naming the condition. That is the behavior with SE-0461's upcoming feature enabled, not the Swift 6.0–6.1 default.
- `write-swift` attributes sibling cancellation on error to `withDiscardingTaskGroup`. That belongs to the throwing variant.
- `write-swift` dates raw identifiers to Swift 6.0 and pack iteration to 5.9. Both look one release early, and its Swift 6.4 items could not be checked against a released toolchain.
- `apple-design` recommends the Vibration API for web haptics without noting that iOS Safari does not support it, and presents the 0.55 rubber-band constant as Apple's. The constant is a community measurement and is labeled that way where it was folded.

## Parked or skipped

- **`animate-expo`** (Reanimated, Gesture Handler, Expo). No owner. Recheck if a React Native skill is created; it would be that skill's motion reference.
- **`write-swift` beyond concurrency** (value types and copy-on-write, typed throws, `some` vs `any`, API design, ARC, Swift Testing, macros, logging, interop). Single-source, with the errors above, and `swiftui` has no general Swift-language reference. Recheck when one is planned, against The Swift Programming Language and the Evolution proposals.
- **`apple-design`** motion-comfort thresholds (0.2 Hz, brightness), material weights, stacked-sheet rules. Unattributed, probably from visionOS sessions already covered in `apple-design`. Recheck only with the session named.
- **`pick-ui-library`.** Recheck if a component-library selection reference is wanted; verify each pick's maintenance status then.
- **`ask-sonner`.** Link to Sonner's own docs instead.
- **`animation-vocabulary`** full glossary and **`break-ui/CATALOG.md`** category lists. The method and the high-value rows were folded; the lists are reference lookups an agent can regenerate.
- **UI cheat sheet:** "switch to an absolute date after a week" and "virtualize long lists." One line each, no owning section; fold if a second source shows up.
- **Every "Initial Response" greeting block and each skill's tone section.** Prompt wording, not guidance.
- Recheck trigger: a new skill in the repo, or a Motion major release (the acceleration list changes between versions).
