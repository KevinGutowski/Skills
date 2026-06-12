---
name: swiftui-hub
description: "Router for SwiftUI implementation and Apple-platform craft details — view identity/state resets, layout containers, lazy stacks/scroll performance, springs/transitions/shaders, Swift 6 concurrency/sendability, touch gestures and hit targets, widgets, SF Symbols, app sound design. Read this skill's body, then invoke the named member skill. Triggers: SwiftUI, @State resets, Layout protocol, LazyVStack, scroll stutter, spring animation, transition, Metal shader, Swift concurrency, Sendable, actor, gesture, hit target, widget, WidgetKit, SF Symbol, symbol animation, haptics, app sounds."
---

# SwiftUI & Apple-Platform Craft (router)

Invoke exactly one member skill via the Skill tool; its full body loads on demand.

**SwiftUI core:** `swiftui-identity` (the identity/lifetime/dependencies mental model — debug @State resets, view lifetime, structural identity here) · `swiftui-layout` (containers, custom Layout protocol, navigation structure) · `swiftui-lazy-stacks` (LazyVStack/HStack, scroll performance, stutter with large lists) · `swiftui-animation` (springs, transitions, keyframes, Metal shaders).

**Language layer:** `swift-concurrency` (structured concurrency, sendability, actors, Swift 6 migration, measure-first performance).

**Platform craft:** `touch-interaction-design` (gestures, hit targets, press feel on Apple platforms — web press-feel → `make-interfaces-feel-better`) · `widget-design` (WidgetKit design: glanceable content, families, interactivity) · `sf-symbols` (choosing, customizing, animating SF Symbols) · `sound-design` (app sound: when to play sounds, designing them, haptic pairing).

**Boundary splits to respect:** animation on the web → `web-animation-design` (the default when platform is unstated) · Apple *design* guidance (navigation, typography, a11y, Liquid Glass, HIG specs) stays with the flat apple-* design skills and `hig` — this hub owns *implementation and platform craft*, not design doctrine.
