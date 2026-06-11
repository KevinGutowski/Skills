---
name: apple-visual-accessibility
description: "Make apps accessible and inclusive on Apple platforms — respect settings like Bold Text, Increase Contrast, Differentiate Without Color, and Reduce Motion; meet 4.5:1 contrast; never let color carry meaning alone. Use when adding or auditing accessibility, handling colorblindness or low vision, or adapting motion. Based on 3 Apple WWDC sessions. Triggers: accessibility, a11y, colorblind, contrast ratio, Reduce Motion, Smart Invert."
---

# Apple Visual Accessibility

**Sources** — this skill aggregates two Apple Accessibility sessions:
- *Apple WWDC 2020, session 10020 — "Make your app visually accessible" (Drew Haas, Accessibility engineer). https://developer.apple.com/videos/play/wwdc2020/10020/*
- *Apple WWDC 2019, session 244 — "Visual Design and Accessibility" (Sommer Panage, Accessibility engineering manager). https://developer.apple.com/videos/play/wwdc2019/244/*
- *Apple WWDC 2025, session 316 — "Principles of inclusive app design" (Chris & Lisa, Apple accessibility design). https://developer.apple.com/videos/play/wwdc2025/316/*
- *MDS (Matt D. Smith, Shift Nudge) — contrast videos. https://www.youtube.com/watch?v=ULUNaH-G2uY · https://www.youtube.com/watch?v=wXAa2HNNjM4 · https://www.youtube.com/watch?v=ZRBq8UYLa-0*
- *Apple WWDC 2017 session 819 — "Designing for a Global Audience" (Sarah Harling) (lost session, via WWDC Index archive) — the cultural-inclusion layer.*

Vision is a continuum — full sight, low vision, no sight, color blindness, light sensitivity, motion sensitivity ("one in three people has some form of motion sensitivity"). iOS exposes settings for each; your job is to **observe and respect every one**. Three pillars: color & shapes, text readability, display accommodations. The meta-rule: **turn these settings on yourself and audit your own app.**

## The inclusion gap (2025 framing)

Disability isn't a fixed bodily trait — it emerges from "a difference between what a person can actually do and what society expects." Five spectra, not binaries: **vision, hearing, motor, speech, cognitive** — say "*some* vision" and design decisions get more inclusive. Contexts are also temporary and situational (a loud concert, a quiet library, sticky hands while cooking), so inclusive design "makes things better for everyone" (the curb-cut effect). Four practical actions: **support multiple senses** (parallel input *and* output paths), **provide customization** ("an app adapts to people rather than expecting people to adapt to an app" — Carrot Weather scales data-rich → super simple), **adopt the Accessibility API** (one API powers VoiceOver, Switch Control, Voice Control; support Larger Text up to 3×), and **track inclusion debt** like tech debt. And: "nothing about us without us" — test with people with disabilities.

### Cultural inclusion (2017 global-audience layer)

Inclusion also spans culture and language — "language and symbols are grounded in cultural context," so audit visual choices the way you audit settings:

- **Gestures vary**: even counting to three on your fingers differs by culture — verify any depicted gesture "means what you intend and plan ahead to localize when appropriate."
- **Place each icon on the local↔global spectrum** (Apple Maps' post office: Japan Post logo in Japan → postal horn in 31 countries → plain letter outline everywhere else). There's no right answer, but decide deliberately "exactly how specific do you want to be with your symbols."
- **Depicting people**: "more detailed icons may exclude some of your users" — a simple silhouette is more general (UIKit ships one).
- **Check associations**: an owl reads as wisdom in English-speaking contexts but bad luck or death in much of the Arabic-speaking world — "make sure that your associations are what you expect."

Writing-side counterpart (term choice, partial-localization priorities, idiom safety nets) → `ui-voice-and-tone`. Glyph-concept universality (the heart-for-delicious rule) → `sf-symbols`.

## Color & shapes

- **Never rely on color alone.** Pair color with shape/symbol — and the 2019 insight: the symbol version usually *just looks better*, so bake it into the default design (green/yellow/red dots → check / question mark / X). Honor **Differentiate Without Color** (`shouldDifferentiateWithoutColor`) anywhere color is the only carrier: status icons, color-coded text, game state (the *Causality* colorblind mode "is what makes the game playable").
- **Button Shapes** — if your design lacks visible button affordances, provide an alternate look when `buttonShapesEnabled`.
- **Increase Contrast** — system colors adapt free. Rule of thumb: **darker in Light Mode, lighter in Dark Mode**. Custom colors/symbols: add High Contrast variants in the asset catalog (Attributes Inspector → High Contrast checkbox); iOS switches automatically.
- **Contrast ratios:** check with the Accessibility Inspector's Color Contrast Calculator. **4.5:1 is the floor for most cases**; the talk's high-contrast fix hit 7.5:1 by darkening the background.
- **Smart Invert** is asserted *over* your app (unlike Dark Mode, which you design). Flag photos, videos, and app icons with `accessibilityIgnoresInvertColors` so they don't invert.
- Prefer **SF Symbols** for status/meaning glyphs — weight-matched, scale with text, extensible (see `sf-symbols`).

## The 5-band contrast system (MDS)

Matt D. Smith's working bands go materially beyond the 4.5:1 floor — offered as "suggestions it's not a law":

- **12–21 — light-mode body text.** Below ~12, dark-on-light body copy "starts to get washed out."
- **7–12 — dark-mode body text.** Above 12, white-on-black will "vibrate in your eyeballs": in a dark room "your pupils are going to dilate," letting more light in — so be "much more careful than you do designing the exact same thing in light mode."
- **4.5 — supporting/secondary text** (helpers, captions — the familiar floor).
- **3.0 — placeholders, large text, icons, button borders.** The large-text score only counts "at least 18 pixels bold roughly or 21 pixels regular."
- **1.2–1.5 — deliberate decorative failures**: borders, secondary-CTA backgrounds, disabled states — "disabled buttons have no contrast requirements."

Placeholder nuance: 3.0 is the standard — "I like to go 3.0 for this placeholder text assuming we have a nice strong contrast label above it"; a 4.5 placeholder reads like input someone has already typed. With an external label he sometimes treats placeholders as decorative at 1.5 (contested — he expects the disagreeing comments).

Two caveats on the score itself. The WCAG formula has a luminance blind spot: white on orange scores 3.5 vs. black's 5.9, yet "if you ask almost anyone" the white jumps out more — the formula "doesn't really account for all of the luminance"; APCA is the experimental successor lens. And passing ≠ good: a "passing contrast score does not automatically mean that your designs will look good" — the bands are legibility floors, not a design grade.

## Text readability

The four Dynamic Type principles (2019): make as much text dynamic as possible ("if it can grow, it should grow"); use the full screen width; **never truncate** — show the same content as the default size; **scale glyphs next to text**. Plus **Bold Text**: free with system text styles; otherwise check `isBoldTextEnabled` and raise weights.

The mechanics — text styles, `UIFontMetrics`/`Font.custom(relativeTo:)`, `@ScaledMetric`, layout-axis flips at accessibility sizes, the Large Content Viewer — live in **`apple-typography`**; this skill is the *why and the audit*, that one is the *how*. (The classic flip: `preferredContentSizeCategory < .accessibilityMedium` → horizontal stack, else vertical + leading.)

## Display accommodations

- **Reduce Motion** (`isReduceMotionEnabled`): suppress idle/decorative animations, parallax (`UIMotionEffect`), auto-playing video and GIFs, large slide transitions. The system already tones down its own effects — match it.
- **Prefer Cross-Fade Transitions**: lateral slides become dissolves — free with `UINavigationController`; custom transitions must check `prefersCrossFadeTransitions` (API: iOS 14).
- **Auto-Play Video Previews** (iOS 13): when off, require interaction to play and provide play/pause affordances (`isVideoAutoplayEnabled`). If you have an in-app autoplay setting, default it to the global value but keep it user-adjustable.
- **Reduce Transparency** (`isReduceTransparencyEnabled`): blur/vibrancy backgrounds have unpredictable contrast and can cause dizziness — make custom blurs fully opaque when set. System materials adapt free.

## Lab rulings: testing & triage (WWDC26 Group Lab, 1juOcrja4bo)

Apple accessibility engineers (incl. VoiceOver and low-vision users), on prioritizing when you can't test everything:

- **Triage order: Dynamic Type first, then VoiceOver.** "Suggest starting at dynamic text" — most users benefit; then VoiceOver, where "you get a lot of bang for your buck with voiceover testing": switch control and voice control share the same backend (elements, labels), so a great VoiceOver experience carries them largely for free. Testing only VoiceOver is an acceptable floor.
- **Regression safety net is XCUITest itself:** it "relies on the accessibility hierarchy" on every platform — "if your app is not accessible your XC tests are going to fail." Add label assertions; "automated testing gets you 90% of the way there." New XCTest API can drive VoiceOver element-to-element as a smoke test.
- **Don't strip the image trait to silence system image descriptions.** It works (VoiceOver stops appending its description after your label) but would "deny the user to be able to access the new image description" features (follow-up questions, exploration). A "teeny tiny little sound" already separates your alt text from the AI description — users know whose is whose.
- **Mac ≠ iOS:** VoiceOver navigation is "very hierarchical whereas on iOS is very linear" — grouping elements is "make or break" on the Mac (think Final Cut's hundreds of controls); on iOS "hit testing is far far more important." Mac users expect keyboard accelerators. Custom actions on Mac: "users tend to skip them" — fine for pro shortcuts, but expose important hover/hidden actions as real elements (SwiftUI `accessibilityRepresentation`, AppKit `accessibilityChildren`); hover-revealed UI is hard for cognitive accessibility, so "use them sparingly."
- **Announcing async completion:** layout-changed notification for small in-place updates (optionally passing an element to focus — don't yank focus often), screen-changed for whole-screen swaps, announcement for a plain string.
- **Process:** keep accessibility in every iteration, but "make room at the end" for a dedicated refinement pass once views stop churning; when weighing features, judge "criticality to users," not just utilization counts. Dev tip: put VoiceOver on the accessibility shortcut ("triple click to turn it on and off"); macOS toggles with Command-F5, and triple-press Touch ID opens the shortcut panel with zero configuration.

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
