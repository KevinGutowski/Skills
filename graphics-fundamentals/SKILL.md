---
name: graphics-fundamentals
description: "Explain the technical fundamentals beneath design software — how screens, color spaces, touch sensing, fonts, vector graphics, rasterization, blurs, and image compression work. A reference backstop when a design task needs the underlying mechanism (out-of-gamut colors, touch events). Triggers: how does X work, color space, gamma, rasterization, anti-aliasing, bezier, subpixel, image compression, JPEG artifacts, PNG/WebP."
---

# Graphics Fundamentals

**Sources/gaps:** [references/sources.md](references/sources.md) maps the technical source corpus; [references/coverage-gaps.md](references/coverage-gaps.md) tracks areas where specs, tools, or legal/a11y standards should be verified.

Distilled from Dan Hollick, *Making Software* (makingsoftware.com) — 13 chapters of purchased content, adapted and extended for this library. Quote sparingly and always attribute: Dan Hollick, *Making Software*, makingsoftware.com/chapters/\<slug\>. Send readers to the source for the full treatment.

This is a **hub/reference skill**: explainer knowledge, not task workflows. It fires as a backstop when a design or engineering task needs the why-mechanism underneath the tool.

## Chapter map

**How a screen works** → [references/pixels-and-color.md](references/pixels-and-color.md). Why pixels at all? The raster grid was inherited from CRT television scanning; the **framebuffer** (a RAM matrix of per-pixel RGB read out by the display controller at the refresh rate) is still today's architecture. The modern war is **transmissive (LCD)** — backlight conditioned through polarizers, voltage-twisted liquid crystals, and color filters or quantum dots — vs **self-emissive (OLED)** — electron–hole recombination in organic compounds, perfect blacks and burn-in alike. Includes the TN/IPS/VA tradeoff table, local dimming/Mini LED, and Tandem OLED/MicroLED.

**Color spaces, models, and gamuts** → [references/pixels-and-color.md](references/pixels-and-color.md). A color space = primaries' chromaticities + white point + transfer function, defined against CIE XYZ; a color *model* (RGB cube, HSL/HSV cylinder) is just a geometric rearrangement. Covers gamma's double origin (CRT physics + dark-tone sensitivity), bit depth math (8-bit = 16.7M colors; 10-bit = 1.07B, the HDR floor), oklab/oklch and the hue-dependent chroma-peak trap, gamut clipping vs compression, D-series white points, banding/dithering, additive vs subtractive, and how OS color management actually composites.

**Color contrast** → [references/pixels-and-color.md](references/pixels-and-color.md). What WCAG 2's ratio actually computes — linearize sRGB, weight by ≈0.2126/0.7152/0.0722, then (L1+0.05)/(L2+0.05) — and its corner-cutting: it's polarity-blind (the "orange problem": the formula picks black text where eyes pick white), size/weight-blind, and overstates dark-mode contrast. **APCA** fixes all three: polarity-aware Lc values with a font size/weight lookup (Lc 90 body → Lc 15 invisibility), dark-mode caps, range-based scoring. WCAG 2 stays the legal standard; Bridge PCA is the transition path.

**Blending modes** → [references/pixels-and-color.md](references/pixels-and-color.md). The actual math of all the Photoshop 3.0 (1994, Thomas Knoll) modes everyone reverse-engineered: Multiply = `a×b`, Screen = `1−(1−a)(1−b)`, Overlay = Multiply-or-Screen pivoting on the base at 0.5 (Hard Light pivots on the blend). Non-separable HSL modes (Hue/Saturation/Color/Luminosity), premultiplied alpha, and the side-channel timing attack that's why `mix-blend-mode` is blocked over iframes.

**Digital images** → [references/pixels-and-color.md](references/pixels-and-color.md). Sensor pixels are monochrome; the **Bayer filter** (50% green) means roughly half of every photo's color is invented by **demosaicing** (nearest-neighbor → bilinear → VNG → AHD → AMaZE). Then chroma subsampling throws away more. Scaling/rotating is signal resampling: nearest, bilinear, bicubic (16-sample splines), Lanczos (windowed sinc) — each a convolution kernel.

**Touch screens** → [references/input.md](references/input.md). Resistive = two ITO layers pressed together, position read from voltage gradients. Capacitive = driving columns sequenced one at a time under sensing rows; a finger disturbs the mutual-capacitance field, the OS centroids tens of intersections, links touches across frames with the **Hungarian algorithm**, and debounces hover flicker with a **hysteresis loop** (touch-up threshold ≪ touch-down).

**Drawing curves** → [references/fonts-and-vectors.md](references/fonts-and-vectors.md). Corner rounding is tangent-point geometry (`d = r/tan(θ/2)`; nested radii = outer − gap); superellipses/squircles via exponent n. Béziers are nested lerps — de Casteljau's algorithm, popularized by Bézier at Renault; the pen tool is a cubic with P1/P2 as handles; long paths are splines of cubics with broken/aligned/mirrored tangent handles.

**How to make a font** → [references/fonts-and-vectors.md](references/fonts-and-vectors.md). What a font file contains (outlines, metrics, kerning tables, hinting, metadata); Type 1 → TrueType (quadratic, hinting) → OpenType (65,536 glyphs, layout tables) → variable fonts. Letter anatomy and the Vox classification; the optical-compensation catalog (overshoot ~1–2%, raised visual centre, thinner horizontals, bone effect); design order (start a-e-g-n-o, "hamburgefontsiv", the O and E as foundations); sidebearings, even color, class-based kerning, hinting.

**Rasterisation and anti-aliasing** → [references/fonts-and-vectors.md](references/fonts-and-vectors.md). Bresenham's line and midpoint-circle algorithms; fill via point-inclusion tests; Verdana's 890 hand-hinted glyphs per size 9–60; Windows grid-fits while macOS preserves outlines (why text renders differently per platform). Anti-aliasing = partial pixel coverage: analytical area coverage (text), **subpixel rendering** (3× horizontal resolution from RGB stripes, color fringing, killed by Retina), SSAA/MSAA sample patterns, temporal AA.

**Scalable Vector Graphics** → [references/fonts-and-vectors.md](references/fonts-and-vectors.md). viewport vs viewBox (the responsive decoupling) and preserveAspectRatio; the path mini-language (M/L/Q/T/C/S/A/Z; lowercase = relative, for compression); arc flags; fill-rule = choice of point-in-polygon algorithm; the full filter-primitive pipeline (a DAG inspired by RenderMan) from feGaussianBlur's separable kernels to feDisplacementMap, with the expensive ones flagged.

**Boolean operations** → [references/fonts-and-vectors.md](references/fonts-and-vectors.md). Union/intersect/exclude/subtract are OR/AND/XOR/AND-NOT truth tables on the plane; layer order decides which shape gets NOT-ed. Point-in-polygon: ray-casting (Jordan curve, even/odd) vs winding number (Sunday's algorithm, ±1 per up/down crossing, ±0.5 edge cases). Clipping: Sutherland-Hodgman (convex only) → Weiler-Atherton (concave) → Greiner-Hormann (all four ops) → Vatti (scanline, fewest edge cases, most used).

**Blurs, noise and other effects** → [references/effects-and-compression.md](references/effects-and-compression.md). Kernel convolution is the master mechanism. Box vs Gaussian blur; the separability trick (20×20 kernel → two 1D passes: 40 ops/pixel not 400 — how CSS blur actually works, and why big animated blurs are slow). Unsharp masking, Sobel/Laplacian/emboss/Gabor; the noise family (white → value → Perlin → simplex → Worley, fractal octaves); ordered vs Floyd–Steinberg vs Atkinson dithering; halftoning and CMYK screen angles.

**Image compression** → [references/effects-and-compression.md](references/effects-and-compression.md). JPEG end-to-end: Y'CbCr → chroma subsampling → 8×8 DCT (64 cosine-pattern coefficients) → **quantization** (the lossy step; the quality slider scales the table) → zig-zag + Huffman. GIF: median-cut palette + LZW (and the unstored dictionary). PNG: born of the LZW patent fight; per-scanline prediction filters (Sub/Up/Average/Paeth) + DEFLATE — and why it bloats on photos. WebP: VP8 block prediction, residual DCT, context-adaptive arithmetic coding; lossless WebP's R−G/B−G transform and entropy-mapped Huffman trees.

## When other skills route here

- **`web-design` (oklch-skill)** → color theory backbone: what a color space/gamut/model actually is, perceptual uniformity, why oklch chroma peaks differ per hue, gamut clipping vs compression, gamma. (pixels-and-color.md)
- **`design-craft`** → why blurs/backdrop-blurs cost what they cost (kernel separability, radius scaling), easing-curve cousins (Béziers), gradient banding + dithering. (effects-and-compression.md, fonts-and-vectors.md)
- **`apple-design` (apple-typography)** → font internals: formats, variable fonts, metrics/kerning, hinting, why text renders differently across platforms, subpixel rendering's rise and fall. (fonts-and-vectors.md)
- **`hardware-product-design`** → display tech tradeoffs (LCD/OLED/MicroLED, burn-in, brightness), capacitive vs resistive touch, input sensing constraints. (pixels-and-color.md, input.md)
- **`research-cataloging` (image-archival)** → compression mechanics behind format choices: why PNG bloats on photos, what JPEG quality really changes, WebP's hybrid design, lossless vs lossy. (effects-and-compression.md)
- **`frontend-design`** → SVG internals: viewBox math, path syntax, fill-rule, filter pipeline and its performance cliffs. (fonts-and-vectors.md)
- **`apple-design` (apple-visual-accessibility)** → contrast mechanics: what the WCAG 2 formula computes and where it lies, APCA's Lc levels and dark-mode guidance. (pixels-and-color.md)

When one of those skills owns the *task*, follow it; come here only for the underlying mechanism. Quote sparingly and always cite Dan Hollick, *Making Software*, with the chapter URL.
