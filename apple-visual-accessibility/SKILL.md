---
name: apple-visual-accessibility
description: "Make apps accessible and inclusive on Apple platforms — respect settings like Bold Text, Increase Contrast, Differentiate Without Color, and Reduce Motion; meet 4.5:1 contrast; never let color carry meaning alone. Use when adding or auditing accessibility, handling colorblindness or low vision, or adapting motion. Based on 3 Apple WWDC sessions. Triggers: accessibility, a11y, colorblind, contrast ratio, Reduce Motion, Smart Invert."
---

# Apple Visual Accessibility

**Sources** — this skill aggregates two Apple Accessibility sessions:
- *Apple WWDC 2020, session 10020 — "Make your app visually accessible" (Drew Haas, Accessibility engineer). https://developer.apple.com/videos/play/wwdc2020/10020/*
- *Apple WWDC 2019, session 244 — "Visual Design and Accessibility" (Sommer Panage, Accessibility engineering manager). https://developer.apple.com/videos/play/wwdc2019/244/*
- *Apple WWDC 2025, session 316 — "Principles of inclusive app design" (Chris & Lisa, Apple accessibility design). https://developer.apple.com/videos/play/wwdc2025/316/*

Vision is a continuum — full sight, low vision, no sight, color blindness, light sensitivity, motion sensitivity ("one in three people has some form of motion sensitivity"). iOS exposes settings for each; your job is to **observe and respect every one**. Three pillars: color & shapes, text readability, display accommodations. The meta-rule: **turn these settings on yourself and audit your own app.**

## The inclusion gap (2025 framing)

Disability isn't a fixed bodily trait — it emerges from "a difference between what a person can actually do and what society expects." Five spectra, not binaries: **vision, hearing, motor, speech, cognitive** — say "*some* vision" and design decisions get more inclusive. Contexts are also temporary and situational (a loud concert, a quiet library, sticky hands while cooking), so inclusive design "makes things better for everyone" (the curb-cut effect). Four practical actions: **support multiple senses** (parallel input *and* output paths), **provide customization** ("an app adapts to people rather than expecting people to adapt to an app" — Carrot Weather scales data-rich → super simple), **adopt the Accessibility API** (one API powers VoiceOver, Switch Control, Voice Control; support Larger Text up to 3×), and **track inclusion debt** like tech debt. And: "nothing about us without us" — test with people with disabilities.

## Color & shapes

- **Never rely on color alone.** Pair color with shape/symbol — and the 2019 insight: the symbol version usually *just looks better*, so bake it into the default design (green/yellow/red dots → check / question mark / X). Honor **Differentiate Without Color** (`shouldDifferentiateWithoutColor`) anywhere color is the only carrier: status icons, color-coded text, game state (the *Causality* colorblind mode "is what makes the game playable").
- **Button Shapes** — if your design lacks visible button affordances, provide an alternate look when `buttonShapesEnabled`.
- **Increase Contrast** — system colors adapt free. Rule of thumb: **darker in Light Mode, lighter in Dark Mode**. Custom colors/symbols: add High Contrast variants in the asset catalog (Attributes Inspector → High Contrast checkbox); iOS switches automatically.
- **Contrast ratios:** check with the Accessibility Inspector's Color Contrast Calculator. **4.5:1 is the floor for most cases**; the talk's high-contrast fix hit 7.5:1 by darkening the background.
- **Smart Invert** is asserted *over* your app (unlike Dark Mode, which you design). Flag photos, videos, and app icons with `accessibilityIgnoresInvertColors` so they don't invert.
- Prefer **SF Symbols** for status/meaning glyphs — weight-matched, scale with text, extensible (see `sf-symbols`).

## Text readability

The four Dynamic Type principles (2019): make as much text dynamic as possible ("if it can grow, it should grow"); use the full screen width; **never truncate** — show the same content as the default size; **scale glyphs next to text**. Plus **Bold Text**: free with system text styles; otherwise check `isBoldTextEnabled` and raise weights.

The mechanics — text styles, `UIFontMetrics`/`Font.custom(relativeTo:)`, `@ScaledMetric`, layout-axis flips at accessibility sizes, the Large Content Viewer — live in **`apple-typography`**; this skill is the *why and the audit*, that one is the *how*. (The classic flip: `preferredContentSizeCategory < .accessibilityMedium` → horizontal stack, else vertical + leading.)

## Display accommodations

- **Reduce Motion** (`isReduceMotionEnabled`): suppress idle/decorative animations, parallax (`UIMotionEffect`), auto-playing video and GIFs, large slide transitions. The system already tones down its own effects — match it.
- **Prefer Cross-Fade Transitions**: lateral slides become dissolves — free with `UINavigationController`; custom transitions must check `prefersCrossFadeTransitions` (API: iOS 14).
- **Auto-Play Video Previews** (iOS 13): when off, require interaction to play and provide play/pause affordances (`isVideoAutoplayEnabled`). If you have an in-app autoplay setting, default it to the global value but keep it user-adjustable.
- **Reduce Transparency** (`isReduceTransparencyEnabled`): blur/vibrancy backgrounds have unpredictable contrast and can cause dizziness — make custom blurs fully opaque when set. System materials adapt free.

> **Staleness note (Kevin's rule):** the code is 2019–2020 **UIKit** (`UIAccessibility.*` checks + NotificationCenter observation). All still valid, but SwiftUI now exposes most of these as environment values (`\.accessibilityReduceMotion`, `\.accessibilityDifferentiateWithoutColor`, `\.accessibilityReduceTransparency`, `\.legibilityWeight`, etc.) — prefer those in SwiftUI code, and verify names against current docs. "1,500+ SF Symbols" is the 2020 count (6,000+ now). Web counterpart: `prefers-reduced-motion` / `prefers-contrast` (see `web-animation-design`).

## Audit checklist

- [ ] Nothing conveys meaning by color alone (test with Differentiate Without Color + a colorblind filter)?
- [ ] Custom colors meet **4.5:1**; High Contrast variants supplied in the asset catalog?
- [ ] Buttons identifiable with Button Shapes on?
- [ ] Photos/videos/logos flagged `accessibilityIgnoresInvertColors`?
- [ ] Largest accessibility text size: nothing truncated or clipped; glyphs scale; layouts reflow? (→ `apple-typography`)
- [ ] Bold Text raises custom font weights?
- [ ] Reduce Motion: idle animations, parallax, autoplay suppressed; slides become cross-fades?
- [ ] Reduce Transparency: custom blurs go opaque?
- [ ] You actually turned the settings on and used the app?

See `references/settings-and-code.md` for the per-setting API table with all eight verbatim 2020 code samples and the worked examples.

## Relationship to other skills

- **`apple-typography`** — owns the Dynamic Type *mechanics* this skill audits for (text styles, scaling, Large Content Viewer). Audit here, fix there.
- **`design-principles`** — *Flexibility* (range of abilities) and *Responsibility*; accessibility is those principles made concrete.
- **`sf-symbols`** — the recommended replacement for color-only meaning; covers Bold Text coverage for custom symbols.
- **`swiftui-animation`** / **`web-animation-design`** — where the motion lives that Reduce Motion (or `prefers-reduced-motion` on the web) must tame; route implementation there.
- **`ios-brand-identity`** — Dark Mode and brand color choices must survive Increase Contrast and Smart Invert; brand never overrides accommodation settings.
- **`chart-experience-design`** — charts have their own accessibility layer (VoiceOver over data, Audio Graphs, redundant encodings).
