# Sources

This is a top-level provenance map for the SwiftUI skill. It points to the source-backed references and flags where a topic currently relies on local distilled guidance.

## Source-backed references

- `swiftui-animation.md` has `swiftui-animation/sources.md` covering Apple WWDC sessions for animation, transitions, effects, shaders, and recent clarifications.
- `swiftui-layout.md` has `swiftui-layout/sources.md` for layout containers and related SwiftUI architecture.
- `sf-symbols.md` has `sf-symbols/sources.md` for SF Symbols selection/customization/animation guidance.
- `sound-design.md` has `sound-design/sources.md` for app sound and haptic pairing guidance.
- `touch-interaction-design.md` has `touch-interaction-design/sources.md` for gesture and input-feel design.
- `swiftui-lazy-stacks.md` cites its source inline: Apple WWDC 2026, session 321 ("Dive into lazy stacks and scrolling with SwiftUI"), plus named WWDC26 Group Lab / Power & Performance lab additions.
- `swift-concurrency.md` cites its source inline: Apple WWDC 2026, Swift Group Lab (session 8001). Its own staleness note flags the in-flight evolution proposals to re-verify.

- Apple's Xcode-shipped agent skills (`swiftui-specialist`, `swiftui-whats-new-27`, `building-document-based-swiftui-applications`) are a first-party source that outranks the WWDC distillations here. Read at Xcode 27.2 (27B52) on 2026-11-12; the pin and export procedure live only in `apple-design` (xcode-agent-skills). `swiftui-identity.md`, `swiftui-layout.md`, `swiftui-lazy-stacks.md` and `swiftui-animation.md` each open with what they defer to Apple; their second-hop code files are session transcriptions that say in a staleness line which samples were modernised. Their text is applied, not copied.
- `swiftui-iphone-duo.md` cites its sources inline: Apple's iPhone Duo overview, the HIG page and tech talks 111461–111466 (full list in `apple-design` (iphone-duo-design) sources), with symbol names checked against developer.apple.com on 2026-11-05.

## References needing source refresh before rule promotion

- `swiftui-identity.md` — single inline source (WWDC 2021, session 10022) plus 2026 lab additions for the mental model; its rule-level content (ids, row structure, `@State`, `@Observable`) now defers to Apple's `swiftui-specialist` skill.
- `widget-design.md` — ideation from WWDC 2020, session 10103; families, interactivity, container backgrounds, StandBy/CarPlay, rendering modes and controls re-checked on 2026-11-12 against the HIG Widgets page (change log October 13, 2026), the HIG Controls page and WidgetKit docs (URLs in its "Look it up" list). visionOS, Apple HomeView and watchOS specifics are linked out, not distilled.

These may still be useful working references, but do not promote new durable rules from them without checking the original Apple docs, WWDC sessions, Swift Evolution material, or the target project's deployed SDK.

## Promotion rule

Promote new SwiftUI guidance only when it is tied to a current Apple source, a verified local project failure, or a repeated accepted review outcome. For deployment-sensitive APIs, verify the target OS/SDK before final advice.
