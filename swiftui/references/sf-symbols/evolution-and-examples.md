# SF Symbols — Evolution, Mechanics & Worked Examples

*Sources:*
- *WWDC 2019, session 206 — "Introducing SF Symbols." https://developer.apple.com/videos/play/wwdc2019/206/*
- *WWDC 2022, session 10157 — "What's new in SF Symbols 4." https://developer.apple.com/videos/play/wwdc2022/10157/*
- *WWDC 2022, session 10158 — "Adopt Variable Color in SF Symbols." https://developer.apple.com/videos/play/wwdc2022/10158/*
- *WWDC 2024, session 10188 — "What's new in SF Symbols 6." https://developer.apple.com/videos/play/wwdc2024/10188/*

All four are design-track talks with **no Code-tab samples**; API names below are as spoken/cross-checked against current docs. Tag: spans 2019–2024 — re-verify defaults against current documentation.

---

## Version timeline (what changed when)

| Release | Year | Library | Key additions |
|---|---|---|---|
| SF Symbols 1 | 2019 | 1,000+ | Symbols as typographic objects; scales; SVG custom template |
| SF Symbols 2–3 | 2020–21 | — | Multicolor/hierarchical/palette rendering; separate annotation structures |
| SF Symbols 4 | 2022 | 4,000+ (700 new) | **Preferred rendering mode (Automatic)**, **Variable Color**, unified annotation, Erase/Hidden layers |
| SF Symbols 5 | 2023 | 5,000+ | First animation presets (bounce, pulse, scale, appear/disappear, replace, variable color) |
| SF Symbols 6 | 2024 | 6,000+ (800 new) | **Wiggle, Rotate, Breathe**; **Magic Replace as default**; closed-loop variable-color repeat; animation annotation for custom symbols |
| Later | 2025+ | — | DrawOn/DrawOff effects (post-date these talks — see current docs) |

**Default-behavior pivot to remember:** before 2022, an unspecified rendering mode meant *monochrome*. SF Symbols 4 introduced per-symbol **preferred** modes applied automatically (e.g. `camera.filters` → hierarchical). Check current `symbolRenderingMode` docs for your deployment target before stating a default.

---

## The 2019 foundations (still load-bearing)

- The **28pt circle demo**: a 28pt symbol next to 28pt text is neither 28×28 points nor square — symbol points are typographic. Constraining a 17pt symbol by width/height renders huge *and* off-center: never constrain; set point size.
- **Margins** are built into symbols (invisible, possibly asymmetric) — they make vertical stacking and optical centering work.
- **Baseline surprises:** `baselineOffsetFromBottom` is optional; positive = up, negative = down; zero = baseline at the bottom (not "absent"); a chevron's baseline sits *below* the whole glyph. `withBaselineOffsetFromBottom` makes any image behave like a symbol.
- **Preset configurations:** system buttons = body + large scale; regular buttons = medium; bar buttons = large, auto-switching to medium in compact size classes — no secondary image needed.
- **Name resolution:** `UIImage(systemName:)` is a separate namespace from `UIImage(named:)`; for `named:`, a custom symbol beats a same-named bitmap → free iOS back-deployment.
- Performance: build layouts smallest-element-up; don't cache symbol images; "avoid rasterizing — the worst solution."
- The **tortoise and hare** slideshow-speed control: "it was just two lines of code."

---

## Variable Color threshold math (2022, 10158)

- Layers participate in **sequential order**; some paths opt out (the iPhone body doesn't light up — only the waves).
- Thresholds are spaced evenly across (0, 100]. **0% = all off** (special case). Any value >0% activates layer 1.
- 4-dot microphone example: >0% → dot 1; ≥26% → dot 2; ≥51% → dot 3; 76–100% → dot 4.
- Design intent mirrors system indicators: look **empty only at exactly 0%** (Wi-Fi, battery) and **full before 100%** (brightness, volume).
- Rounding: thresholds round to whole percentage points; the next layer activates one full point above the rounded value (3 layers: 33.3→33, layer 2 at 34%; 66.7→67, layer 3 at 68%).
- Grouping is semantic, not spatial: Wi-Fi waves group small-pair/large-pair, not left-to-right.
- Inclusive use: a filling symbol can stand in for numbers/text (pre-readers) — swap the symbol name, keep passing the same percentages.

---

## Worked custom-symbol examples

**Teacup (2019)** — the canonical walkthrough: start from `circle`'s exported template (SVG containing all weights × scales as named layers), draw the cup in Regular/Medium, center and optically balance, then adjust only stroke thickness for Small/Large, repeat per weight. Minimum: Regular/Medium → other Regular scales → **Bold** (bold-text accessibility) → cover Medium–Semibold for Dynamic Type styles.

**Cupcake with plus badge (2022, 10157)** — unified annotation: in Multicolor, the badge is green with a white plus (system convention); in Hierarchical/Palette the badge is Primary with the plus set to **Erase**, punching a visible hole through layers behind it so the badge reads in single-hue modes.

**Kitchen timer (2022)** — Variable Color annotation: split each sequence path into **its own layer** ("Split into New Layers"); z-order = fill order (bottom first); works across all four rendering modes once annotated.

**Animation annotation (2024)** — plant symbol given preferred wiggle direction *Up* (to "dance"); desk fan: blades layer marked **canRotate** with a rotation **anchor point** placed via Snap to Points (or typed coordinates), defined in the three drawn weights and interpolated for the rest; always preview — anchor precision shows.

**Template economics (2022, 10158):** 9 weights × 3 scales = 27 variants; × 4 rendering modes ± Variable Color ≈ **216 configurations from 3 drawings** with a variable template.

---

## Choosing animations (2024)

| You want to… | Use |
|---|---|
| Call attention to something easily missed / reinforce direction | **Wiggle** (directional; custom angles like 315° for a paper plane) |
| Show a real-world mechanism or in-progress state | **Rotate** (whole symbol or by-layer) |
| Convey ongoing activity / "alive" status | **Breathe** (opacity + size); **Pulse** if opacity-only is enough |
| Acknowledge a tap | **Bounce** |
| Toggle between related symbols (mute/unmute, badge on/off) | **Magic Replace** (default; falls back to Replace with settable direction) |
| Show a changing level continuously | **Variable Color** repeat (closed loops repeat seamlessly) |

Repeat behaviors: once / repeat-with-delay (configurable) / continuous. Restraint: animations must add, not distract — the talks repeat this every time.

---

## API surface (cross-checked mid-2026)

- SwiftUI: `Image(systemName:variableValue:)`, `.symbolRenderingMode(…)`, `.symbolEffect(.wiggle/.rotate/.breathe/.pulse/.bounce/.variableColor)`, `.contentTransition(.symbolEffect(.replace))`, `.symbolEffectsRemoved()`.
- UIKit/AppKit: `UIImage(systemName:variableValue:)`, `NSImage(symbolName:variableValue:)`, `addSymbolEffect(_:)`, `SymbolEffect`/`NSSymbolEffect` types incl. `NSSymbolMagicReplaceContentTransition`, `SymbolEffectOptions` repeat behaviors.
- Newer than these talks: **DrawOn/DrawOff** symbol effects — consult current docs.
