# uikit-skill source mining — 2026-11

Source: https://github.com/notolivaresf/uikit-skill (Fernando Olivares, MIT)

Revision: `d18511f304fe75f94e3cacd9dc0f237064b5c89f`

Ticket question: does the library already encode this repo's UIKit information and lessons? Answer before the fold: no. The library had design doctrine for Apple platforms (`apple-design`) and SwiftUI implementation (`swiftui`), but UIKit implementation appeared only as incidental snippets (UIKit Dynamic Type code in `apple-design` (apple-typography), one zoom-transition line in `swiftui` (swiftui-animation)).

## Source manifest

Cloned at the revision above into an isolated directory; text read only, nothing executed. No scripts, tests or assets exist in the repo.

| Artifact | Read | Density | Decision |
| --- | --- | --- | --- |
| `README.md`, plugin manifests, license | Yes | Low | Install mechanics are upstream-specific. The measured headline (skill arm passed all checks, ~37% less wall time, ~27% fewer output tokens) folded as evidence. |
| `skills/uikit-specialist/` SKILL.md + 15 references (Swift) | Yes | High | New `uikit` skill: router core rules + six topical references. |
| `skills/uikit-specialist-objc/` SKILL.md + 15 references | Yes (diffs) | Medium | Same topics; folded as "Objective-C notes" per reference (selectors, `isEqual:`/`hash`, `NSNotFound`, blocks/weakSelf, nullability, Swift-only APIs). Examples not duplicated. |
| `skills/uikit-whats-new-27/` + `-objc` (10 references each) | Yes | High (volatile) | `uikit` (uikit-ios27-sdk), with staleness note and Swift-only/Objective-C route table. |
| `skills/uikit-specialist-slim/SKILL.md` | Yes | High | Gotcha table and correctness rules spread into the router core rules and owning references. |
| `skills/uikit-list/SKILL.md`, `skills/uikit-chat-list/SKILL.md` | Yes | High | All 11 measured rules in `uikit` (uikit-live-lists), general wording, with evidence numbers. |
| `docs/uikit-chat-list-sources.md` | Yes | High | Evidence per rule and Apple citations → `uikit` sources.md and the evidence notes in uikit-live-lists. |
| `docs/v0.9-adversarial-review.md` | Yes | High | Corrections folded as caveats in uikit-live-lists (timer latency, prefetching scope, `targetContentOffset` only inside updates, keyboard/inset re-anchor, all text-metric traits, TextKit 1 only for read-only text). |
| `docs/thinning-plan.md`, `docs/experiment-plan.md`, `docs/general-list-skill.md` | Yes | High (meta) | Skill-authoring/eval lessons → `creating-skills` (measuring-skill-effect) + House Style rule 17. |

## Fold map

- **New top-level platform skill `uikit`** (taxonomy: top-level = platform; UIKit rules must not cross-apply with SwiftUI). Router with core rules, how-to-work, review checklist; references: uikit-lists, uikit-live-lists, uikit-layout-and-navigation, uikit-text-and-interaction, uikit-dataflow-and-concurrency, uikit-deprecated-apis, uikit-ios27-sdk, sources, coverage-gaps.
- **`creating-skills`**: new reference measuring-skill-effect (no-skill control arms, scoring order, transcript reading, thinning by evidence, wording that causes detours, benchmark hygiene, isolation gotchas for Claude Code/Codex); House Style rule 17; sources and coverage-gap entries.
- **Boundaries**: `apple-design` now routes UIKit code to `uikit` (previously "SwiftUI/UIKit code → swiftui"); `swiftui` boundary line routes UIKit code to `uikit`; README platform list, UIKit section, motion routing rule; agent quickstart bundle row; taxonomy platform list; audit matrix row; smoke-test probe S41.

## Follow-up: Apple's Xcode-bundled skills (same day)

Kevin noted Xcode ships first-party agent skills. `xcrun` is unavailable in this Linux sandbox, so the export mirror https://github.com/mariusfanu/xcode-skills (Xcode 27.2 27B52, revision `047c090048c2ef6ba4ae4986e1bad10d02106829`) was read instead. Inventory: `swiftui-specialist`, `swiftui-whats-new-27`, `building-document-based-swiftui-applications`, `app-intents-specialist`, `app-intents-whats-new-27`, `app-resizability` (UIKit; replaced `uikit-app-modernization` in Xcode 27.1), `audit-xcode-security-settings`, `adopt-c-bounds-safety`, `modernize-tests`, `device-interaction`, `xctrace`.

- **Read in full and folded:** `app-resizability` SKILL.md plus its five task references, summarized in our own words into `uikit` (uikit-ios27-sdk, new "Resizing migration" section): closest-to-consumer, atomic trait swap + invalidation, `nativeScale`/keyboard-frame screen sources, orientation is not aspect ratio, guarded `didUpdateEffectiveGeometry`, asymmetric/physical safe areas, never store insets, `verticalBarEdge`, preflight checks. **Correction:** the third-party source said `UIRequiresFullScreen` turns on discrete resizing; Apple's skill says iOS 27 ignores the key (TN3192) — Apple's statement now leads, the discrete-resizing detail is flagged to verify. Added `ITMS-90870`/TN3208 to the launch-screen rule.
- **Noted, not audited:** SwiftUI, App Intents, testing, Instruments, security and C bounds-safety skills. Companion notes added to `uikit`, `swiftui` and `apple-design` (app-intents-design); a swiftui coverage gap records the pending audit; `docs/skill-library-ops.md` External Skill Intake now covers Apple's Xcode skills (export command, mirror, first-party precedence, no wholesale copying, re-check per Xcode release).

## Read-skip decisions

- Benchmark history tables (per-round turn counts, transcript phase timings) kept only as the general method; the per-run numbers stay upstream.
- The source's table-view live-list alternative (cut upstream; no build used it) — noted as a coverage gap.
- Full code samples that encode standard patterns (scene delegate boilerplate, thumbnail loader, custom content view) — rules kept, code dropped.
- Upstream install/plugin instructions — not portable.

## Single-source and freshness posture

Every UIKit rule comes from one external author whose API facts cite Apple docs, WWDC sessions and SDK headers. Corroborated in-library where possible (swiftui-animation, apple-typography, apple-visual-accessibility, swift-concurrency). iOS 27/27.1 material is SDK-currency content dated Oct 2026; re-verify symbols via the docs `.md` availability block before shipping. See `uikit` coverage-gaps.

## Not done

- Fresh descriptions-only routing judge for S41 was not run in this pass; the smoke results table still records the earlier 38/38 run.
