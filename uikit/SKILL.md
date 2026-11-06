---
name: uikit
description: "UIKit implementation for iOS 18+ in Swift or Objective-C: collection/table views, diffable data, cells, live lists that hold scroll position (chat, feeds, prepend, jump), layout/traits, navigation, text/menus, Observation/concurrency, deprecated APIs, iOS 27 SDK migration. SwiftUI → swiftui; Apple design → apple-design. Triggers: UIKit, UICollectionView, UIViewController, scroll jump, UITextView selection."
---

# UIKit Implementation

Rules for UIKit code that is correct, fast and current on iOS 18 and later (notes where iOS 26/27 add a better way). This skill owns **UIKit implementation**; design decisions stay with `apple-design`, SwiftUI with `swiftui`.

**Sources/gaps:** [references/sources.md](references/sources.md) maps provenance (one external, benchmark-backed source plus its Apple citations); [references/coverage-gaps.md](references/coverage-gaps.md) holds single-source and SDK-freshness risks.

**Verify before naming an API:** append `.md` to the developer.apple.com page URL and read the `availability` block (playbook: `apple-design` (hig)). For Objective-C, take the selector from the SDK header or the docs' Objective-C toggle; never translate a Swift name from memory.

**Use Apple's Xcode skills when available (check first).** Xcode 27+ bundles first-party agent skills that `xcrun` can export. At the start of Apple-platform work, if `command -v xcrun` succeeds, run `xcrun agent skills export` (see `xcrun agent skills --help` for the output location), read the exported skills that match the task, and apply them alongside this skill — Apple's skill wins where they disagree; note the Xcode version. No `xcrun` (Linux, CI, no Xcode): read the unofficial export mirror https://github.com/mariusfanu/xcode-skills (Xcode 27.2, 27B52) instead. UIKit-relevant: `app-resizability` (Xcode 27.1+, replaced `uikit-app-modernization`: task-by-task `UIScreen.main`/orientation/idiom/scene-lifecycle/safe-area migration — its lessons are summarized in `uikit-ios27-sdk`), `device-interaction` (verify on device/simulator via screenshots, UI hierarchy, touch), `xctrace` (Instruments traces, hang triage), `modernize-tests` (XCTest → Swift Testing).

## How to work

1. Read the project first: deployment target, Swift version and default actor isolation (or ARC/nullability/prefix style in Objective-C), architecture, naming. Match them; guard newer APIs with `if #available` / `@available`, including `super` calls into OS-new overrides.
2. Change the least code that fixes the problem. Do not migrate working code to a new pattern unless asked or the old pattern is the bug.
3. UIKit only: do not bring SwiftUI (or `UIHostingConfiguration`) into a UIKit codebase to fix a UIKit problem unless the project already mixes them on purpose.
4. Review order: crashes and data races / retain cycles, main-thread stalls, layout and accessibility bugs, deprecated APIs, then style. Quote the line.
5. After touching scrolling, layout or images, say how it was checked (device/simulator, Instruments or hitch test, which scenarios).
6. Rules here say how to build; they are not a list of tests to write. Check each behaviour once, rerun only failing tests by name (`-only-testing:`), set per-test time limits, close simulators you started.

## Core rules (the ones agents most often miss)

- **Lists:** `UICollectionView` + compositional layout + diffable data source; keep working `UITableView` screens (with diffable). Identifiers are stable IDs, never models, indexes or content; changed content goes through `reconfigureItems`, not `reloadItems` or delete/insert. One apply path; never mix `performBatchUpdates` with a diffable source; registrations created once.
- **Scroll position:** never add a content-size delta to the offset. Anchor on a visible item's id plus its distance from the top, restore without animation; keep "pinned to the end" as state read *before* the update. Long streaming lists that must hold position within a point use the measured recipe in `uikit-live-lists`.
- **Selectable text** needs a non-editable `UITextView` (a `UILabel` cannot be selected). Edit menus return `[custom] + suggestedActions` from `textView(_:editMenuForTextIn:suggestedActions:)`; no long-press recognizer or whole-cell context menu fighting the text. Read-only list text: TextKit 1 (`UITextView(usingTextLayoutManager: false)`).
- **Traits:** read them inside UIKit's update methods (`layoutSubviews`, `updateConfiguration(using:)`, `viewWillLayoutSubviews`, section providers) so changes are tracked; register with `registerForTraitChanges`; never cache. `CGColor` does not follow dark mode — resolve it in a trait-tracked method.
- **Geometry:** layout from the view's bounds, traits and guides — never `UIScreen.main`, the idiom or the orientation (iPhone apps are resizable from the iOS 27 SDK). Keyboard via `keyboardLayoutGuide`; first scroll/bounds work in `viewIsAppearing(_:)`, not `viewDidLoad`.
- **Main actor:** `async` is not background — a `Task {}` in a view controller runs on main. Nothing slow (decode, disk, formatter creation, regex compile, layout loops) in configuration, layout or scroll callbacks. Store and cancel tasks; capture identifiers, never index paths, in closures that run later.
- **Standard bars, controls, system colors and SF Symbols** so Liquid Glass (iOS 26) and accessibility settings apply.

## References (read the one the task needs)

- [references/uikit-lists.md](references/uikit-lists.md) — compositional layout, list configurations, sizing and estimates, orthogonal sections, diffable identity/snapshots/reconfigure vs reload, cell registrations, content/background configurations, accessories, reuse, empty and loading states.
- [references/uikit-live-lists.md](references/uikit-live-lists.md) — content that changes while the user scrolls: choosing an update, coalescing streams, prepending without a jump, pinning to the bottom, jump-to-item, restoring position; the benchmark-measured recipe for chat/log/feed lists; image decoding, prefetching, hitches and how to verify.
- [references/uikit-layout-and-navigation.md](references/uikit-layout-and-navigation.md) — Auto Layout hygiene, guides and layout regions, keyboard, size classes and resizing, view controller lifecycle; navigation items and bar appearance, search, `UITab` tab bars and sidebars, split views, sheets, zoom transition, scenes; traits, custom traits, colors, materials, display scale.
- [references/uikit-text-and-interaction.md](references/uikit-text-and-interaction.md) — Dynamic Type, labels, selectable text views, edit menus, links, text input, TextKit 1 vs 2; context/button/bar menus, swipe actions, drag and drop, pointer, keyboard shortcuts, gestures, haptics; accessibility; springs, property animators, transitions, Reduce Motion.
- [references/uikit-dataflow-and-concurrency.md](references/uikit-dataflow-and-concurrency.md) — where state lives, Observation tracking and `updateProperties()`, explicit update paths; main actor, tasks and cancellation, streams, hang causes; Objective-C GCD/blocks/KVO and Swift interop annotations.
- [references/uikit-deprecated-apis.md](references/uikit-deprecated-apis.md) — "don't write → write (since iOS N)" replacements by area; safe modernization.
- [references/uikit-ios27-sdk.md](references/uikit-ios27-sdk.md) — moving to the iOS 27 SDK: required scene life cycle and launch screen, resizable iPhone apps, tabs/sidebars, bars, menus and drag, scene accessories, TextKit, iOS 27.1 iPhone Duo (foldable) arrangements, reserved regions, hinge and vertical bars, Swift-only APIs and their Objective-C routes.

## Review checklist

1. Main thread: slow work in configuration, `viewDidLoad`, layout or scroll callbacks; UIKit touched off main.
2. Data source: identifiers stable, unique, immutable (`isEqual:`/`hash` agree in Objective-C); one apply path; reconfigure over reload.
3. Cells: reuse-safe, sizing complete, no per-row work that could be cached.
4. Scroll position: prepend, pin, jump, rotation and text-size changes keep the reader's row.
5. Layout: no ambiguity, no screen/idiom math; works at compact width and the largest text size.
6. Lifetime: no retain cycles in stored closures/blocks, timers, display links, observers; tasks cancelled.
7. Accessibility: labels, traits, custom actions, order.
8. Deprecated APIs and SDK-update items (`uikit-deprecated-apis`, `uikit-ios27-sdk`).

**Boundary splits:** SwiftUI code → `swiftui` (language-level Swift concurrency → `swiftui` (swift-concurrency); gesture feel → `swiftui` (touch-interaction-design); SF Symbols → `swiftui` (sf-symbols)) · Apple design doctrine, HIG specs, Liquid Glass design language, typography and accessibility design → `apple-design` · web → `web-design`.
