# OKLCH Colors

*Scope: OKLCH color space for web projects. Convert hex/rgb/hsl to oklch, generate palettes, check contrast, handle gamut boundaries, and theme with Tailwind v4. Triggers on oklch, color conversion, palette generation, contrast ratio, gamut, display p3, design tokens, hue drift, chroma, dark mode colors.*

OKLCH is a perceptually uniform color space where the numbers actually mean what you think they mean. Most color problems in CSS — broken palettes, failing contrast, hue drift — come from using color spaces that don't match how we see. OKLCH fixes the model so the tools work. To explore interactively, visit [oklch.fyi](https://oklch.fyi).

## Quick Reference

| Category | When to use | Reference |
| --- | --- | --- |
| Conversion | Hex/rgb/hsl to oklch | [color-conversion.md](oklch-skill/color-conversion.md) |
| Palettes | Generate scales, multi-hue, dark mode | [palette-generation.md](oklch-skill/palette-generation.md) |
| Contrast | APCA/WCAG checks, fixing failing contrast | [accessibility-contrast.md](oklch-skill/accessibility-contrast.md) |
| Gamut & Tailwind | P3 fallbacks, `@theme` scales, gamut clamping | [gamut-and-tailwind.md](oklch-skill/gamut-and-tailwind.md) |
| Theory | Why OKLCH/gamut/gamma behave this way | [color-theory.md](oklch-skill/color-theory.md) |

## Why OKLCH

- **Perceptual uniformity.** Equal L steps = equal brightness. `oklch(0.5 ...)` is visually mid. HSL's `lightness: 50%` varies wildly by hue.
- **Stable hue.** HSL blue shifts toward purple as lightness changes. OKLCH hue stays constant across the full lightness range.
- **Independent chroma.** Chroma is an absolute measure of colorfulness that doesn't depend on lightness. HSL saturation does.
- **Finite gamut.** Not every oklch value maps to a displayable sRGB color. High-chroma values at certain hues will clip — gamut awareness is required.

## Why it works (theory backstop)

A color space = chromaticities of the primaries + white point + transfer curve; "These values give meaning to our RGB values" (so the same RGB triplet is a different color in sRGB vs P3). OKLCH vs oklab is only a color model change — "just a different geometric arrangement of the colors," same gamut. The trap to know cold: "The chroma peaks are also relative to the hue and lightness so you can't actually be sure that there will be an equivalent chroma in a different hue… you can end up picking colors that are out of gamut without realising it and blaming oklch for looking bad. In reality, you're still at the mercy of your display's gamut." Most software *clips* out-of-gamut colors, so "previously distinct colors collapse into the same boundary color" — check chroma per hue/lightness, never copy chroma across hues. Full backstop (gamma's dual origin + standard gamma table, D50 print vs D65 display, bit depth vs gamut, DCI-P3 vs Display P3, banding/dithering, sRGB and oklab origin stories): [color-theory.md](oklch-skill/color-theory.md).

*Source: Dan Hollick, Making Software, makingsoftware.com/chapters/color-spaces-models-and-gamuts.*

## OKLCH Syntax

```
oklch(L C H)
oklch(L C H / alpha)
```

| Channel | Range | Description |
| --- | --- | --- |
| L (Lightness) | 0–1 | 0 = black, 1 = white. Perceptually uniform. |
| C (Chroma) | 0–~0.4 | Colorfulness. 0 = gray. Max depends on L and H. |
| H (Hue) | 0–360 | Hue angle in degrees. |
| alpha | 0–1 | Optional transparency. Slash syntax. |

```css
oklch(0.637 0.237 25.331)
oklch(0.8 0.05 200 / 0.5)
```

**Formatting:** L and C use 3 decimal places, H uses up to 3. Drop trailing zeros. Format `-0` as `0`. Browser support: Baseline 2023, 96%+ global coverage.

## Key Thresholds

| Rule | Value |
| --- | --- |
| Light/dark boundary | L > 0.6 = light background → use dark text |
| Lightness gap (light bg) | Foreground L < 0.45 when background L > 0.85 |
| Lightness gap (dark bg) | Foreground L > 0.75 when background L < 0.25 |
| Hue drift threshold | > 10° spread across palette steps = visible drift |
| APCA normal text | \|Lc\| >= 60 to pass, >= 75 for pass+ |
| WCAG 2 normal text | 4.5:1 AA, 7:1 AAA |
| Contrast fix | Adjust L only — chroma has negligible effect |

## Working Methods (MDS)

Field techniques from Matt D. Smith (Shift Nudge) — stated in HSB, but they map directly onto OKLCH's L/C/H:

- **Single-hue cohesion:** "choosing a single Hue and only adjusting the saturation and brightness is the easiest way to keep your color scheme cohesive."
- **Status-tag recipe:** text at 4.5:1, background the same hue at ~10% opacity — then **flatten before testing**. Contrast tools can't read opacity ("it's not going to test against this yellow versus this pale yellow"); sample the rendered hex and test that.
- **Hue-only walks:** lock S/B and rotate hue alone to build a status family (in progress / done / error) that stays in the same contrast ballpark. Exception: white text on yellow "is basically impossible" — yellow needs its own treatment.
- **Score-constrained brand tuning:** tune the brand color *inside* a contrast window — "trying to see what looks good and also what will hit in the 3.0 range" — so the aesthetic search never leaves passing territory.

*Source: MDS YouTube — Uno5dpotRgo · ZRBq8UYLa-0 · jSLfQ0sJDCw.*

## Palette Roles & State Layers

The architecture layer above the scales: what each color is *for*. From Adham Dannaway, *Practical UI* (2nd ed., 2024) and Wathan & Schoger, *Refactoring UI*. Both books state mechanics in HSB/HSL — translated to OKLCH here.

### The six-role palette (Practical UI)

"Create a small set of predefined colours called a colour palette. Define simple rules that govern how each colour is used." Six roles, all variations of the brand hue — in OKLCH: hold H constant, walk L up while easing C down (PUI saturates the darkest step heavily; in OKLCH just keep C% of max):

| Role | Use | Contrast floor (vs Fill) |
| --- | --- | --- |
| Brand | "used to indicate interactive elements like text links and buttons" | 4.5:1 |
| Text strong | primary text — headings, body, form labels | 4.5:1 |
| Text weak | supporting text, less prominent | 4.5:1 |
| Stroke strong | "non-decorative borders on interface elements like form input fields. Also used for icons" | 3:1 |
| Stroke weak | "decorative borders, like dividing lines" — removable without hurting usability | none (decorative) |
| Fill | "secondary background to help differentiate elements, like tags or badges" | content on it must pass AA |

Test text/strokes against **Fill**, not the page background — Fill is the worst-case surface they'll sit on.

**Brand-colour rules:** apply brand to interactive elements and "avoid using the brand colour on non-interactive elements" — color teaches what's clickable. And "If the brand colour has meaning, it's safest to avoid using it for interactive elements" (red = error/destructive, green = success, amber = warning). *Theme scope:* that's a restrained-UI value — `frontend-design`'s bold aesthetics may deliberately break it; pick one theme, don't average.

### Transparent foreground palette + state layers (Practical UI)

"Using varying levels of transparency on foreground elements… allows some of the background colour to mix with the foreground colour" — one foreground set stays consistently prominent on every background/elevation, and themes for free. In OKLCH: `oklch(1 0 0 / a)` over dark, `oklch(0 0 0 / a)` over light.

| Role | Dark mode (white @) | Light mode (black @) |
| --- | --- | --- |
| Text strong | 100% | 90% |
| Text weak | 78% | 60% |
| Stroke strong | 60% | 45% |
| Stroke weak | 12% | 10% |
| Fill | 6% | 4% |

Light mode starts at 90% because "It's safest to avoid pure black against white for text, as it can cause eye strain and fatigue." (Scope: that rule is about *text on white* — OLED true-black backgrounds and pure-black image outlines in `design-polish` are different contexts; don't blend into "never #000".) Test contrast against the *brightest* background (Overlay); flatten alpha to the rendered color before measuring (see Working Methods). Same trick works per-color: brand/semantic hues at 100/80/20/5% for Text/Stroke strong/Stroke weak/Fill.

**State layers:** "layer a transparent overlay on top of interactive elements on hover and press" — **hover = the Fill variation, press = Stroke weak**. One overlay pair handles states for every component on every background.

### Anchoring shades (Refactoring UI)

When building a scale, anchor by use, not math: base = "a shade that would work well as a button background"; then the edges — "The darkest shade of a color is usually reserved for text, while the lightest shade might be used to tint the background of an element. A simple alert component is a good example that combines both of these use cases." Call them 900/500/100, pick 700 and 300 as "the perfect compromise between the shades on either side," then halve again for 800/600/400/200. Generate with [palette-generation.md](oklch-skill/palette-generation.md), then anchor-correct by eye — "you can't rely purely on math to craft the perfect color palette."

### RUI rules superseded by OKLCH (keep the intent)

RUI's "Ditch hex for HSL" chapter is superseded: OKLCH is the modern endpoint of the same argument. Two famous RUI rules are HSL workarounds for perceptual non-uniformity that OKLCH solves natively:

- **Hue-rotation-toward-bright** ("rotate the hue towards the nearest bright hue — 60°, 180°, or 300°", max 20–30°): needed because HSL lightness lies about perceived brightness. In OKLCH, L is honest — just raise L. The surviving *intent*: lighten yellows toward orange, not toward grey — "the darker shades will feel warm and rich instead of dull and brown." A small deliberate hue walk across a ramp is now an aesthetic choice, not a brightness fix.
- **Saturation-compensation-at-extremes** ("increase the saturation as the lightness gets further away from 50%"): in OKLCH chroma is independent of L, but *max* chroma still shrinks toward the extremes — hold C% of max constant per step instead of hand-boosting S.

## Review Output Format

Always present color changes as a markdown table with **Before** and **After** columns. Include **every color that was changed** — not just a subset. Never list findings as separate "Before:" / "After:" lines outside of a table.

| Before | After |
| --- | --- |
| `color: #3b82f6` | `color: oklch(0.623 0.188 259.815)` |
| Same absolute C across hues | Same C% of each hue's max chroma |
| No sRGB fallback for P3 color | `@media (color-gamut: p3)` wrapper |

This keeps feedback scannable and diff-friendly. Each row is a self-contained change the developer can act on independently.

## Common Mistakes

| Issue | Fix |
| --- | --- |
| Hex/rgb/hsl color in new code | Convert to `oklch()` |
| HSL palette ramp with hue drift | Rebuild with constant oklch hue |
| Failing contrast (check foreground vs its background using APCA) | Adjust oklch L channel, keep C and H |
| High chroma without gamut check | Clamp to max chroma for the L/H in sRGB |
| Same absolute C across different hues | Use same C% (percentage of max) for consistent vividness |
| P3 color without sRGB fallback | Add `@media (color-gamut: p3)` pattern |
| Dark mode with hand-picked colors | Derive from light palette by reversing L mapping |
| Hex in Tailwind v4 `@theme` | Convert to oklch values |
| Alpha with comma syntax | Use slash: `oklch(L C H / alpha)` |

## Reference Files

- [color-conversion.md](oklch-skill/color-conversion.md) — Supported formats, conversion examples, bulk conversion rules, what to leave alone
- [palette-generation.md](oklch-skill/palette-generation.md) — Scale convention, generation algorithm, multi-hue palettes, dark mode, why not HSL
- [accessibility-contrast.md](oklch-skill/accessibility-contrast.md) — APCA and WCAG 2 thresholds, fixing contrast with L, lightness gap guide, hue drift detection
- [gamut-and-tailwind.md](oklch-skill/gamut-and-tailwind.md) — sRGB vs P3, gamut clamping, CSS fallback patterns, Tailwind v4 @theme and migration
- [color-theory.md](oklch-skill/color-theory.md) — Color space vs model, gamma, gamut mapping, white points, bit depth, banding (Dan Hollick, *Making Software*)
