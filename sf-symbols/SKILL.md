---
name: sf-symbols
description: "Use SF Symbols well — symbols as typographic objects (point sizes, baselines, weights, scales), rendering modes (monochrome/hierarchical/palette/multicolor/Automatic), Variable Color and Variable Draw, animations (wiggle, rotate, breathe, pulse, bounce, Magic Replace, Draw On/Off), gradients, and custom-symbol annotation (unified annotation, guide points, Erase/Hidden layers). Use when configuring symbols next to text, picking a rendering mode, animating a symbol, representing changing values with variableValue, or building custom symbols from the SVG template. Based on Apple WWDC sessions 206 (2019), 10157/10158 (2022), 10188 (2024), and 337 (2025). Triggers: SF Symbols, systemName, SymbolConfiguration, symbolRenderingMode, variable color, variable draw, symbolEffect, magic replace, draw on, guide points, custom symbol annotation."
---

# SF Symbols

**Sources** — this skill aggregates four Apple sessions tracing SF Symbols from introduction to animation:
- *Apple WWDC 2019, session 206 — "Introducing SF Symbols" (Paolo, design; Tom, UIKit). https://developer.apple.com/videos/play/wwdc2019/206/*
- *Apple WWDC 2022, session 10157 — "What's new in SF Symbols 4" (Thalia, Apple Design Team). https://developer.apple.com/videos/play/wwdc2022/10157/*
- *Apple WWDC 2022, session 10158 — "Adopt Variable Color in SF Symbols" (Paul, SF Symbols app). https://developer.apple.com/videos/play/wwdc2022/10158/*
- *Apple WWDC 2024, session 10188 — "What's new in SF Symbols 6" (Thalia). https://developer.apple.com/videos/play/wwdc2024/10188/*
- *Apple WWDC 2025, session 337 — "What's new in SF Symbols 7" (Kelsey). https://developer.apple.com/videos/play/wwdc2025/337/*

SF Symbols (6,000+) solve icon design's core problem: pairing symbols with text. Symbols are **typographic objects** — specified in font point sizes, sitting on the text baseline, drawn in all nine weights to match San Francisco — so they scale with Dynamic Type and localize automatically. (For the type system itself, see `apple-typography`.)

## Symbols behave like text

- **Symbol point sizes are typographic, not screen points** — a 28pt symbol isn't 28×28 and may not be square. Never constrain a symbol image by width/height (off-center rendering, worse performance); set the point size instead.
- Next to text: same baseline, matched weight (Ultralight→Black). Prefer **optical center alignment** (UIKit centers symbols optically against text); use baseline alignment for multi-line text. Baselines can sit *outside* the image bounds (a chevron rides fully above its baseline).
- **Scales (small/medium/large)** resize a symbol *at the same point size*, re-adjusting stroke thickness to stay weight-matched — for fitting different container heights with the same text size. Default is medium; bars pick scales automatically.
- Configure via `UIImage.SymbolConfiguration` (point size/weight/scale/text style, or `SymbolConfiguration(font:)` to match any font); configurations are immutable — combine with `applying(_:)`. `NSTextAttachment(image:)` is symbol-aware (inherits surrounding font size/weight/color).
- Symbols have an intrinsic *rendering mode*, not an intrinsic color — tint them; don't rely on the black fallback (Dark Mode). Avoid rasterizing symbols, and don't cache the images.
- **Free back-deployment trick:** a custom symbol and a bitmap with the same asset name — older OS gets the bitmap, newer gets the symbol, no version checks.

## Rendering modes — choose by job

- **Monochrome** — most neutral; closest to the typographic nature; best for uniform sets and small sizes.
- **Hierarchical** — one hue, opacity-graded layers (primary/secondary/tertiary); adds depth/foreground emphasis.
- **Palette** — two+ explicit colors; integrates symbols with the surrounding UI's palette.
- **Multicolor** — the object's intrinsic colors; for prominent symbols where color carries meaning.

Since SF Symbols 4, symbols carry a **preferred rendering mode** applied automatically when you don't specify one. Automatic is usually right, **but context wins**: at small sizes or low contrast, hierarchical detail can muddy — specify monochrome explicitly for legibility or set-wide uniformity.

## Variable Color — a percentage, not depth

Variable Color maps a 0–100% value onto a symbol's sequential layers — for **signal strength, progress, levels, time**. It is *not* for depth; it highlights a sequence of stages. Works in **every** rendering mode; callers just pass a percentage (`Image(systemName:variableValue:)` / `UIImage(systemName:variableValue:)`).

Threshold mechanics worth knowing: thresholds spread evenly; **0% is special** (all off) and any value >0% lights the first layer; symbols read "full" before 100% (like brightness/volume) and "empty" only at exactly 0% (like Wi-Fi/battery); thresholds round to whole percentage points.

## Symbol animations (SF Symbols 5–6)

Use via SwiftUI `symbolEffect(_:)` / UIKit-AppKit `addSymbolEffect(_:)`; replacement via `contentTransition(.symbolEffect(.replace))`.

- **Wiggle** — call attention to a change or action that might be missed; directional (incl. custom angles, e.g. a paper plane at 315°); many symbols have a preferred direction built in.
- **Rotate** — real-world behavior or in-progress indication; whole symbol or by-layer (only the fan blades spin).
- **Breathe** — opacity **+ size**; a "living" presence for ongoing activity (recording). **Pulse** is opacity-only — ask *what am I communicating?* to pick.
- **Bounce** — momentary feedback acknowledging an action.
- **Replace / Magic Replace** — Magic Replace is the **default**: a smart transition between related shapes (slashes draw on/off, badges appear/disappear independently); falls back to standard Replace (with a settable direction) when the shapes aren't related. Ideal for tappable toggles.
- **Variable Color animation** — repeating playback honors open vs. closed loops; closed loops repeat seamlessly. Repeat behaviors: once / periodic (with delay) / continuous.
- **Draw On / Draw Off (SF Symbols 7)** — symbols animate along their vector paths in their *defined draw direction* ("wind draws left to right… this Arabic character draws right to left, matching its writing direction"); arrowheads travel the path. Playback: By Layer (default, staggered) / Whole Symbol / **Individually** (sequential — for deliberate attention). **Variable Draw** renders the path at a percentage over a faded layer — higher-resolution progress than Variable Color (a symbol can support both; one is chosen at render time). **Gradients** generate a linear gradient from one source color (any rendering mode; best at larger sizes). Magic Replace now preserves **matching enclosures** and integrates Draw for the transition. Custom symbols adopt Draw via **guide points** (start/end, corners, attachments like arrowheads; annotate the regular weight in three weights and the system interpolates).

**Restraint rule (verbatim spirit):** too many animations, or the wrong context, overwhelms — "use animations intentionally and purposefully, ensuring that they add to the experience rather than distracting from it."

## Custom symbols

- Export an SVG **template** from the SF Symbols app (start from a close existing symbol); it holds all weights × scales as named layers and drops straight into Xcode as a source artifact.
- Variable templates: draw **three** weights (Ultralight/Regular/Black, Small) and the system generates the other 24 variants — 27 drawings' worth, and with modes/Variable Color, ~216 configurations from 3 drawings.
- **Unified annotation** (SF Symbols 4+): one layer structure for all rendering modes; mind z-order. Layer tools: **Erase** (punches a hole through layers behind — badges, plus/minus), **Hidden** (exclude a layer from a mode). For Variable Color, split each sequence step into its own layer — bottom fills first.
- Animation annotation: per-symbol wiggle direction; breathe by layer; rotation needs a **canRotate** layer + anchor point defined in the three weights (snap to path points; always preview).
- Minimum coverage: Regular/Medium first, then other Regular scales, then **Bold** (for the bold-text accessibility setting); cover Medium–Semibold/Bold to support all Dynamic Type styles.

> **Staleness note (Kevin's rule):** these talks span 2019–2025 and the API surface kept moving. Verified against current docs (mid-2026): wiggle/rotate/breathe/pulse/bounce/variableColor/replace + DrawOn/DrawOff + `NSSymbolMagicReplaceContentTransition` all current. The unspecified-rendering-mode default has changed across releases (monochrome → per-symbol preferred/Automatic) — confirm `symbolRenderingMode` behavior against current docs for your deployment target. Template format versions gate features for back-deployment; the SF Symbols app's **Copy Code button** gives current snippets. **SF Symbols 8 beta (June 2026, OS 27 era):** headline addition is **semantic search** in the app (describe the symbol in your own words); library passes 7,000 symbols; Draw/Variable Draw/gradients carry over unchanged. Re-verify once a WWDC26 symbols session ships.

## Checklist

- [ ] Symbols sized by point/text style — never width/height constraints?
- [ ] Weight matched to adjacent text; scale (not point size) used to fit containers?
- [ ] Rendering mode chosen by job — and monochrome forced where small/low-contrast?
- [ ] Changing values expressed with `variableValue`, not swapped assets?
- [ ] Animations purposeful and sparse; Magic Replace for related-shape toggles?
- [ ] Custom symbols: unified annotation, Bold covered, baseline/margins respected?
- [ ] No rasterized or cached symbol images?

See `references/evolution-and-examples.md` for the version-by-version history, threshold math, and the worked custom-symbol examples (teacup, cupcake badge, kitchen timer).

## Relationship to other skills

- **`apple-typography`** — the sibling: symbols are typographic objects; Dynamic Type scaling, text styles, and `SymbolConfiguration(textStyle:)` live at the boundary. Type mechanics there; symbol rendering/animation here.
- **`ios-brand-identity`** — owns the *brand* decision (custom iconography vs. SF Symbols, platform-true icon style); this skill owns the symbol *mechanics* either way. Its iconography section routes here.
- **`design-principles`** — *Familiarity* (symbols carry established meaning — don't hijack them; see also `naming-features-and-labels` on the trash-can rule) and *Craft*/*Delight* (purposeful animation).
- **`swiftui-animation`** — general SwiftUI animation/transitions/effects; use this skill's semantic presets for symbols before hand-rolling motion there.
- **`web-animation-design`** / **`motion`** — web/CSS animation values don't transfer; symbol animation is its own system with semantic presets.
