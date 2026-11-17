---
name: swiftui
description: "SwiftUI implementation and Apple-platform craft — view identity/state resets, layout containers, lazy stacks/scroll perf, springs/shaders, Swift 6 concurrency, gestures/hit targets, widgets, SF Symbols, sounds, iPhone Duo. UIKit code → uikit; HIG/design decisions → apple-design. Read the body, then one named reference. Triggers: SwiftUI, @State resets, LazyVStack, scroll stutter, spring animation, Metal shader, Sendable, WidgetKit, haptics."
---

# SwiftUI & Apple-Platform Craft

**Sources/gaps:** [references/sources.md](references/sources.md) maps the local WWDC/source coverage; [references/coverage-gaps.md](references/coverage-gaps.md) keeps API-freshness and missing-reference risks out of the router body.

**Verify before naming an API:** Apple serves its developer docs as Markdown — append `.md` to the page URL (`https://developer.apple.com/documentation/SwiftUI/View.md`, `.../documentation/swiftui/view/frame(width:height:alignment:).md`, `https://developer.apple.com/documentation/technologyoverviews/adopting-liquid-glass.md`). The leading comment block carries an `availability` list — check it against the project's deployment target before putting an API name in final guidance. Full playbook, including the HIG's different `/tutorials/data/` path: `apple-design` (hig).

**Apple's Xcode skills first:** if `xcrun` exists, run `xcrun agent skills export` and apply the matching skills (Apple's wins on conflict) — procedure, pinned mirror for machines without Xcode, and skill list in `apple-design` (xcode-agent-skills). This skill was reconciled with the Xcode 27.2 (27B52) copies on 2026-11-12: where Apple covers a topic this skill defers to it and keeps only a fallback rule; record in [references/coverage-gaps.md](references/coverage-gaps.md).

| Topic | Read |
|---|---|
| `@State`, `@Observable` models, `@Bindable`/key-path bindings, `onChange` side effects, narrow view inputs | Apple `swiftui-specialist` — dataflow.md |
| ForEach/List ids, row structure, sort/filter placement | Apple `swiftui-specialist` — foreach.md |
| Splitting screens into `View` types, cheap `init`, single-child `Group` | Apple `swiftui-specialist` — structure.md |
| Conditional modifiers, `AnyShapeStyle` | Apple `swiftui-specialist` — modifiers.md |
| Custom environment keys, `@Entry`, environment cost | Apple `swiftui-specialist` — environment.md |
| `@Animatable` macro, hand-written `animatableData` | Apple `swiftui-specialist` — animations.md |
| User-facing strings, formatting, packages | Apple `swiftui-specialist` — localization.md |
| Retired API spellings and when to migrate | Apple `swiftui-specialist` — soft-deprecated-apis.md, soft-deprecation.md |
| 27 SDK: `@State` macro errors, reorderable, swipe actions outside `List`, toolbar additions, item-bound alerts, `AsyncImage` caching, `@ContentBuilder` | Apple `swiftui-whats-new-27` — state-macro.md, reorderable.md, swipe-actions.md, toolbar.md, item-binding.md, async-image.md, content-builder.md |
| Document apps | Apple `building-document-based-swiftui-applications` |
| Tooling | Apple `xctrace`, `device-interaction`, `modernize-tests` |
| **Only here:** identity/lifetime/dependencies model and lab findings; container choice, `Layout` protocol, data-driven navigation; lazy-stack estimation, prefetch and scroll performance; springs, gesture velocity hand-off, transitions, keyframes, shaders; Swift concurrency; touch, widgets, SF Symbols, sound, iPhone Duo | the references below |

No Xcode and no network: the core rules below are the fallback and agree with Apple's skills as of that audit.

## Core rules

The mistakes agents make most in SwiftUI code. Each is distilled from the reference named after it — open that file for the mechanism and the exceptions.

1. **An `if`/`else` is two views, not one.** Each branch has its own identity, so flipping it resets `@State` and fades instead of animating. For two states of the *same* view, put a ternary in the modifier argument (`.opacity(isExpired ? 0.3 : 1)`) — never an `.if(…)` helper modifier; branch only for genuinely different views. (swiftui-identity)
2. **State lives exactly as long as identity.** If state resets unexpectedly, find the identity that changed (a branch, an `id(_:)`, a ForEach id); if it must survive, lift it to a model or a parent binding. (swiftui-identity)
3. **ForEach ids are stable, unique and cheap.** Never positions (`.indices`, `id: \.offset`), never an id minted while `body` runs, never an editable or non-unique field such as a name, never `id: \.self` on a large value. Use a database id or a stable stored property; sort and filter on the model, not in the `ForEach` argument. (swiftui-identity)
4. **Extract a `View` struct to scope invalidation.** A `@ViewBuilder` computed property or helper function is still part of the parent's `body`; only a separate `View` type gets its own dependencies — one per screen section, taking only the values it reads. Reach for `AnyView` last. (swiftui-identity)
5. **Plain stacks first, lazy after profiling.** `VStack`/`HStack` by default; lazy stacks for large scrolling sets; eager `Grid` for static 2D; `List` when you need selection or hierarchy. (swiftui-layout)
6. **Don't feed measured size back up with `GeometryReader`.** Use the `Layout` protocol for custom containers, `ViewThatFits` for fits-or-falls-back, `AnyLayout` to switch layouts with animation. (swiftui-layout)
7. **Navigation presents values, not views.** `NavigationLink(value:)` + `navigationDestination(for:)`, with `NavigationStack(path:)` when the stack must be restorable or deep-linkable. (swiftui-layout)
8. **In a lazy stack, off-screen is an estimate.** Never key logic on absolute content offset or size; give every `List`/`ForEach` row one root container (a top-level `switch`/`if`, `AnyView` or a `@ViewBuilder` helper is not one) and filter the data, not the row body; have the model prepare row content so the first `body` pass is final-sized; don't change a row's size after it appears; keep scroll-surviving state out of row `@State`. (swiftui-lazy-stacks)
9. **Springs by `duration` and `bounce`; let gestures hand off velocity.** Bounce 0 when unsure, caution above ~0.4. Prefer built-in animatable modifiers (they animate without re-running `body`) and scope with `.animation(_:value:)`. (swiftui-animation)
10. **No `Task {}` in the mainline flow.** Unstructured `Task {}`/`Task.detached {}` are for sending work elsewhere; keep the main flow linear inside task groups so cancellation propagates; don't reach for `@unchecked Sendable` to silence Swift 6; adopt `@MainActor` leaf-outward or module-wide, not by contagion. (swift-concurrency)
11. **Check availability before naming an API** (see above) — most references here were distilled from a specific WWDC year and say so in a staleness note.
12. **`@State` is `private`; a view's `init` only copies inputs.** `init` reruns whenever the parent's body does — no loading, decoding, formatting or model construction there. Owned models are `@State private var model = Model()` with the default at the declaration (without `private` the expression is rebuilt on every init); async work starts in `.task` or the model layer. Assigning in `init` to a `@State` that has a default does nothing. (swiftui-identity)
13. **`@Observable` models, key-path bindings.** New model classes are `@Observable` (and `@MainActor` unless the module defaults to it), not `ObservableObject`. Bind with `@Bindable var model = model` and `$model.property` (or a labelled subscript for per-key values) — not a hand-built `Binding(get:set:)`, which allocates each body pass and defeats comparison. Pass rows their element, not the model plus an index. (Apple dataflow.md; summary in swiftui-identity)
14. **No soft-deprecated API in new code:** `NavigationStack`/`NavigationSplitView` not `NavigationView`; `foregroundStyle` not `foregroundColor`; `clipShape(.rect(cornerRadius:))` not `cornerRadius`; `Tab` not `tabItem`; `.topBarLeading/Trailing` not `.navigationBarLeading/Trailing`; `dismiss` not `presentationMode`; `tint` not `accentColor`; `Section { } header: { }` not `Section(header:)`; two-parameter `onChange`. When fixing a bug or adding a feature in code that uses an old spelling, leave it and offer the migration separately. (swiftui-layout staleness note; full list in Apple soft-deprecated-apis.md)

## References

Read the one reference that matches the task. **Second hop:** a reference may have a same-named subdirectory (`references/<name>/…`) holding its session code samples and source maps (samples say in their staleness line where they were modernised). Those files are named below and linked from their parent; open one only after the parent says you need it — nothing nests deeper.

**SwiftUI core:** [references/swiftui-identity.md](references/swiftui-identity.md) (the identity/lifetime/dependencies mental model — debug @State resets, view lifetime, structural identity, row structure here) · [references/swiftui-layout.md](references/swiftui-layout.md) (containers, custom Layout protocol, navigation structure; second hop `swiftui-layout/layout-code.md`, `structure-code.md`, `sources.md`) · [references/swiftui-lazy-stacks.md](references/swiftui-lazy-stacks.md) (LazyVStack/HStack, scroll performance, stutter with large lists; second hop `swiftui-lazy-stacks/code-patterns.md`) · [references/swiftui-animation.md](references/swiftui-animation.md) (springs, transitions, keyframes, Metal shaders; second hop `swiftui-animation/code-patterns.md` — 600+ lines, has a Contents block, read by section — and `sources.md`).

**Language layer:** [references/swift-concurrency.md](references/swift-concurrency.md) (structured concurrency, sendability, actors, Swift 6 migration, measure-first performance).

**Platform craft:** [references/touch-interaction-design.md](references/touch-interaction-design.md) (gestures, hit targets, press feel on Apple platforms — web press-feel → `design-craft`; second hop `touch-interaction-design/fluid-interfaces.md`, `sources.md`) · [references/widget-design.md](references/widget-design.md) (widgets: what to surface, families per platform, intent-backed buttons/toggles, removable `containerBackground`, StandBy and rendering modes, controls; Live Activities → `notification-design`) · [references/sf-symbols.md](references/sf-symbols.md) (choosing, customizing, animating SF Symbols; second hop `sf-symbols/evolution-and-examples.md`, `sources.md`) · [references/sound-design.md](references/sound-design.md) (app sound: when to play sounds, designing them, haptic pairing; second hop `sound-design/apple-sound-stories.md`, `sources.md`) · [references/swiftui-iphone-duo.md](references/swiftui-iphone-duo.md) (iPhone Duo / foldable: iOS 27.1 SDK opt-in, vertical toolbars and overflow, ArrangementView, reserved regions, hinge, CameraCaptureAccessory, camera direction coordinator).

**Boundary splits to respect:** UIKit code (UICollectionView, diffable data, UIViewController, UIKit traits/menus) → `uikit` — don't bring SwiftUI into a UIKit codebase to fix a UIKit problem · animation on the web → `web-design` (web-animation-design) (the default when platform is unstated) · Apple *design* guidance (navigation, typography, a11y, Liquid Glass, HIG specs) stays with `apple-design` and `apple-design` (hig) — this skill owns *implementation and platform craft*, not design doctrine.
