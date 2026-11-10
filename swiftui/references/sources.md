# Sources

This is a top-level provenance map for the SwiftUI skill. It points to the source-backed references and flags where a topic currently relies on local distilled guidance.

## Source-backed references

- `swiftui-animation.md` has `swiftui-animation/sources.md` covering Apple WWDC sessions for animation, transitions, effects, shaders, and recent clarifications.
- `swiftui-layout.md` has `swiftui-layout/sources.md` for layout containers and related SwiftUI architecture.
- `sf-symbols.md` has `sf-symbols/sources.md` for SF Symbols selection/customization/animation guidance.
- `sound-design.md` has `sound-design/sources.md` for app sound and haptic pairing guidance.
- `touch-interaction-design.md` has `touch-interaction-design/sources.md` for gesture and input-feel design.
- `swiftui-lazy-stacks.md` cites its source inline: Apple WWDC 2026, session 321 ("Dive into lazy stacks and scrolling with SwiftUI"), plus named WWDC26 Group Lab / Power & Performance lab additions.
- `swift-concurrency.md` cites its sources inline: Apple WWDC 2026, Swift Group Lab (session 8001), plus Swift Evolution SE-0306 and SE-0461 for the actor-reentrancy and `@concurrent` section (prompted by Emil Kowalski's `write-swift` skill, https://github.com/emilkowalski/skills at `715c180`; the proposals are the authority). Its own staleness note flags the in-flight evolution proposals to re-verify.

- `swiftui-iphone-duo.md` cites its sources inline: Apple's iPhone Duo overview, the HIG page and tech talks 111461–111466 (full list in `apple-design` (iphone-duo-design) sources), with symbol names checked against developer.apple.com on 2026-11-05.

## References needing source refresh before rule promotion

- `swiftui-identity.md` — single inline source (WWDC 2021, session 10022) plus 2026 lab additions; predates the Observation framework in places.
- `widget-design.md` — single inline source (WWDC 2020, session 10103); current WidgetKit surface (interactive widgets, Lock Screen/StandBy, rendering modes) is covered only by staleness-note corrections.

These may still be useful working references, but do not promote new durable rules from them without checking the original Apple docs, WWDC sessions, Swift Evolution material, or the target project's deployed SDK.

## Promotion rule

Promote new SwiftUI guidance only when it is tied to a current Apple source, a verified local project failure, or a repeated accepted review outcome. For deployment-sensitive APIs, verify the target OS/SDK before final advice.
