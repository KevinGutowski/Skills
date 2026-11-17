# Apple's Xcode-Shipped Agent Skills

*Scope: how to find, export and use the first-party agent skills Apple bundles with Xcode 27+, which of them matter for UIKit, SwiftUI and design work, and the pinned public mirror to read when `xcrun` is unavailable. The single home for this procedure: `uikit`, `swiftui` and this skill's router point here instead of repeating it. Use at the start of any Apple-platform implementation task. Triggers: xcrun agent skills export, Xcode skills, Apple agent skills, swiftui-specialist, app-resizability, app-intents-specialist, xcode-skills mirror.*

*Pin (volatile — re-check on each Xcode release): **Xcode 27.2 (27B52)**, the build this library read. Unofficial export mirror https://github.com/mariusfanu/xcode-skills at commit `047c090048c2ef6ba4ae4986e1bad10d02106829` (2026-10-31, "Update for Xcode 27.2 final"). Checked 2026-11-12: the mirror's default branch has moved on to commit `d7112743948d87fc99f814f78b381a3f39bea278` (2026-11-03), an export of Xcode 27.3 beta 1 (27C5020n) — a beta, not what this library was read against.*

## The procedure (check first)

1. **If `command -v xcrun` succeeds**, run `xcrun agent skills export` (see `xcrun agent skills --help` for the output location and options). Read the exported skills that match the task and apply them alongside this library's skill.
2. **No `xcrun`** (Linux, CI, no Xcode): read the mirror at the pinned commit above — `https://github.com/mariusfanu/xcode-skills/tree/047c090048c2ef6ba4ae4986e1bad10d02106829/plugins/xcode-skills/skills/<skill-name>/SKILL.md`. The mirror is an unofficial repackaging; its README states which Xcode build each revision exports. Prefer the pinned commit unless the project builds with a newer Xcode, and never treat a beta export as shipped behaviour.
3. **Apple's skill wins where it disagrees with this library** — it is first-party and tied to the SDK. Say so in the answer and note the Xcode version/build you read.
4. **Do not copy Apple's text** into project files or this library; apply it, and summarize in your own words.

## Which skill for which work (Xcode 27.2, 27B52)

| Work | Apple skills | This library's counterpart |
|---|---|---|
| UIKit | `app-resizability` (Xcode 27.1+; replaced `uikit-app-modernization`): task-by-task `UIScreen.main`, orientation, idiom, scene-lifecycle and safe-area migration | `uikit` (uikit-ios27-sdk) summarizes its lessons |
| SwiftUI | `swiftui-specialist` (data flow, environment, ForEach, structure, modifiers, localization, soft-deprecated APIs), `swiftui-whats-new-27` (`@State` macro, reorderable, swipe actions, toolbars, content builder), `building-document-based-swiftui-applications` | `swiftui` defers to these where they cover a topic (its router has the topic-to-file table) and keeps what they lack: identity model, layout/navigation, lazy-stack scrolling, animation craft. Reconciled 2026-11-12; record in its coverage-gaps file |
| App Intents / Siri (design-adjacent) | `app-intents-specialist`, `app-intents-whats-new-27` | this skill's app-intents-design reference decides the design; Apple's skills carry the implementation |
| Verification and tooling (any UI framework) | `device-interaction` (screenshots, UI hierarchy, touch on device/simulator), `xctrace` (Instruments traces, hang triage), `modernize-tests` (XCTest to Swift Testing) | — |
| Build security | `audit-xcode-security-settings`, `adopt-c-bounds-safety` | — |

Newer than the pin (present only in the 27.3 beta 1 export on 2026-11-12, so treat as unreleased): `macos-touch-gestures`, `siri-app-integration`, `siri-evaluations`, and a revised `modernize-tests`.

## Maintenance

- Skills are renamed, split and replaced between Xcode releases (27.1 replaced `uikit-app-modernization` with `app-resizability`). On each Xcode release: update the pin above (build and commit), re-read the skills in the table, and update the three pointers' skill lists only if a name changed.
- Library-side intake rules (first-party outranks third-party, record the build, fold in own words): `docs/skill-library-ops.md`, "External Skill Intake".
