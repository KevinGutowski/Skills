---
name: swiftui
description: "SwiftUI implementation and Apple-platform craft — view identity/state resets, layout containers, lazy stacks/scroll performance, springs/transitions/shaders, Swift 6 concurrency, gestures/hit targets, widgets, SF Symbols, app sounds. Read the body, then one named reference. Triggers: SwiftUI, @State resets, LazyVStack, scroll stutter, spring animation, Metal shader, Sendable, actor, WidgetKit, haptics."
---

# SwiftUI & Apple-Platform Craft

**Sources/gaps:** [references/sources.md](references/sources.md) maps the local WWDC/source coverage; [references/coverage-gaps.md](references/coverage-gaps.md) keeps API-freshness and missing-reference risks out of the router body.

Read exactly one reference file below; each carries the full distillation for its area (deeper code/source files live in a same-named subdirectory next to it).

**SwiftUI core:** [references/swiftui-identity.md](references/swiftui-identity.md) (the identity/lifetime/dependencies mental model — debug @State resets, view lifetime, structural identity here) · [references/swiftui-layout.md](references/swiftui-layout.md) (containers, custom Layout protocol, navigation structure) · [references/swiftui-lazy-stacks.md](references/swiftui-lazy-stacks.md) (LazyVStack/HStack, scroll performance, stutter with large lists) · [references/swiftui-animation.md](references/swiftui-animation.md) (springs, transitions, keyframes, Metal shaders).

**Language layer:** [references/swift-concurrency.md](references/swift-concurrency.md) (structured concurrency, sendability, actors, Swift 6 migration, measure-first performance).

**Platform craft:** [references/touch-interaction-design.md](references/touch-interaction-design.md) (gestures, hit targets, press feel on Apple platforms — web press-feel → `design-craft`) · [references/widget-design.md](references/widget-design.md) (WidgetKit design: glanceable content, families, interactivity) · [references/sf-symbols.md](references/sf-symbols.md) (choosing, customizing, animating SF Symbols) · [references/sound-design.md](references/sound-design.md) (app sound: when to play sounds, designing them, haptic pairing).

**Boundary splits to respect:** animation on the web → `web-design` (web-animation-design) (the default when platform is unstated) · Apple *design* guidance (navigation, typography, a11y, Liquid Glass, HIG specs) stays with `apple-design` and `apple-design` (hig) — this skill owns *implementation and platform craft*, not design doctrine.
