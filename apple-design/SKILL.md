---
name: apple-design
description: "Router for Apple platform design — tab bars, push vs modal, sheets, menus, iPad windowing; search placement, scope bars, search tokens; Dynamic Type, SF Pro, text styles; contrast, colorblind, Reduce Motion, a11y settings; Liquid Glass, lensing, glassEffect, iOS 26; brand identity, custom vs standard components, tint; app icon, Icon Composer, layered/tinted/dark icons; App Intents, App Shortcuts, Siri invocation phrases; HIG, Human Interface Guidelines, what does Apple say about, component spec; in-app charts, Swift Charts, Audio Graphs. Read this skill's body, then read the named reference file. Implementation/platform craft → swiftui; web counterparts → web-design."
---

# Apple Platform Design

Read exactly one reference file below; each carries the full distillation for its area (deeper worked examples, sources, and code live in a same-named subdirectory next to it).

- **Navigation & layout** — structuring tabs vs sidebar, push vs modal, sheet/menu rules, destructive confirmations, iPad-native layout and iPadOS 26 windowing, the pointer: [references/apple-navigation-design.md](references/apple-navigation-design.md)
- **Search** — where search lives and how placement signals scope, suggestions, recents, scope bars, tokens, no-results states: [references/apple-search-design.md](references/apple-search-design.md)
- **Typography** — the San Francisco family, optical sizes, text styles, full Dynamic Type support incl. custom font scaling, fixing truncated/clipped text: [references/apple-typography.md](references/apple-typography.md)
- **Visual accessibility** — auditing/adding a11y: Bold Text, Increase Contrast, Differentiate Without Color, Reduce Motion, 4.5:1 contrast, colorblindness, Smart Invert: [references/apple-visual-accessibility.md](references/apple-visual-accessibility.md)
- **Liquid Glass & the 2025+ design system** — the material (lensing, Regular vs Clear, tinting, never glass-on-glass), shapes/concentricity, toolbars, scroll edge effects, migration playbook: [references/liquid-glass-design-system.md](references/liquid-glass-design-system.md)
- **Brand identity on iOS** — how much to customize without breaking the native feel: UI layer vs content layer, custom vs standard components, brand color/tint, fonts, logos, Dark Mode: [references/ios-brand-identity.md](references/ios-brand-identity.md)
- **App icons** — designing/reviewing an icon: metaphor, simplicity, small-size testing, the layered Liquid Glass icon system and Icon Composer, dark/tinted/clear variants: [references/app-icon-design.md](references/app-icon-design.md)
- **App Intents & Shortcuts** — which features to expose as intents, invocation phrases, parameters, snippets vs Live Activities, Siri/Spotlight/widgets/controls/Action button: [references/app-intents-design.md](references/app-intents-design.md)
- **HIG lookup** — canonical/current HIG lookup — exact specs, component conventions; the live-fetch playbook: [references/hig.md](references/hig.md)
- **Chart experience** — in-app chart experience: platters, progressive disclosure, Swift Charts, Audio Graphs, chart a11y labels — general chart-type choice and Tufte critique → data-viz: [references/chart-experience-design.md](references/chart-experience-design.md)

**Boundary splits to respect:**
- **Implementation and platform craft → `swiftui`** — this skill decides the design; SwiftUI/UIKit code, gestures, widgets, SF Symbols, animation engineering live there.
- **Canonical current specs → [references/hig.md](references/hig.md)** — talk-derived references here carry reasoning and craft; when you need Apple's exact letter-of-the-law spec (or a staleness tiebreaker), fetch the live HIG via that playbook.
- **Typography split:** Apple platforms → this skill's apple-typography reference; web/CSS → `web-design` (web-typography). Never cross-apply platform conventions.
- **Accessibility split:** Apple platforms → this skill's apple-visual-accessibility reference; web → `web-design` (web-accessibility) (same split as typography).
