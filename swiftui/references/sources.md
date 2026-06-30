# Sources

This is a top-level provenance map for the SwiftUI skill. It points to the source-backed references and flags where a topic currently relies on local distilled guidance.

## Source-backed references

- `swiftui-animation.md` has `swiftui-animation/sources.md` covering Apple WWDC sessions for animation, transitions, effects, shaders, and recent clarifications.
- `swiftui-layout.md` has `swiftui-layout/sources.md` for layout containers and related SwiftUI architecture.
- `sf-symbols.md` has `sf-symbols/sources.md` for SF Symbols selection/customization/animation guidance.
- `sound-design.md` has `sound-design/sources.md` for app sound and haptic pairing guidance.
- `touch-interaction-design.md` has `touch-interaction-design/sources.md` for gesture and input-feel design.

## References needing source refresh before rule promotion

- `swiftui-identity.md`
- `swiftui-lazy-stacks.md`
- `swift-concurrency.md`
- `widget-design.md`

These may still be useful working references, but do not promote new durable rules from them without checking the original Apple docs, WWDC sessions, Swift Evolution material, or the target project's deployed SDK.

## Promotion rule

Promote new SwiftUI guidance only when it is tied to a current Apple source, a verified local project failure, or a repeated accepted review outcome. For deployment-sensitive APIs, verify the target OS/SDK before final advice.
