# Pixels and Color

Distilled from Dan Hollick, *Making Software* — chapters: how-a-screen-works, color-spaces-models-and-gamuts, the-problem-of-color-contrast, blending-modes, digital-images (makingsoftware.com/chapters/<slug>). Purchased content, adapted; quote sparingly. Short quotes below are cited.

## Contents

- [How a screen works](#how-a-screen-works) — CRTs, framebuffers, LCD vs OLED, next-gen displays
- [Color spaces, models, and gamuts](#color-spaces-models-and-gamuts) — CIE XYZ, sRGB/P3, gamma, bit depth, oklab/oklch, gamut mapping, color management
- [The problem of color contrast](#the-problem-of-color-contrast) — what WCAG 2 actually computes, where it fails, APCA
- [Blending modes](#blending-modes) — the math of every mode, separable vs non-separable, premultiplied alpha
- [Digital images](#digital-images) — sensors, Bayer filters, demosaicing, chroma subsampling, scaling/interpolation

---

## How a screen works

### CRT era and why pixels exist
The CRT (practical from the 1930s) is a glass vacuum tube with an electron gun firing a beam at a phosphor-coated screen; magnetic deflection coils steer the beam in a **raster scan** (left-to-right, top-to-bottom, ~60×/sec). Phosphor dots emit red/green/blue light when struck; beam intensity controls sub-pixel brightness. Curved front glass reduces geometric distortion at acute beam angles. Drawbacks: heavy (thick vacuum glass), size-limited in both directions, power-hungry.

Pixels weren't inevitable — the raster grid was inherited from analog TV's sequential signal. It only worked because phosphors keep glowing briefly after the beam passes — long enough to fool the eye into seeing a stable frame, on minimal bandwidth and hardware. Early computers sent pixel values in sequence (CPU-heavy); when memory got cheap, the **framebuffer** arrived: a dedicated block of RAM holding a 2D matrix of RGB values per pixel. The system writes changed regions to the framebuffer; the **display controller** reads it out at the display's refresh rate. We still use this architecture today.

The historical alternative: **vector (calligraphic) displays**, where the beam is steered between coordinates like drawing an SVG. Pros: tiny memory needs (some long-glow phosphors needed none), no aliasing. Cons: lines only — no filled shapes, limited text, slow refresh for complex scenes. Used in fighter HUDs, radar, oscilloscopes, and the *Asteroids* arcade game.

### Modern displays: transmissive vs self-emissive
The LCD-vs-OLED war is "a proxy war being waged by two completely different approaches to displaying an image, transmissive vs self-emissive" (Hollick, *Making Software*, makingsoftware.com/chapters/how-a-screen-works). The shared holy grail: pure blacks + extreme brightness + fast refresh + color accuracy + cheap + low power. Unlike CRTs, modern panels refresh all pixels simultaneously — each pixel is independently controlled.

**LCD (transmissive)** — a backlight shines through a stack that conditions the light per sub-pixel:
1. **Backlight** — formerly edge LEDs + diffuser (hence thick bezels), now usually a full LED array.
2. **First polarizer** — passes only one orientation of light waves.
3. **Liquid crystal cells** (one per sub-pixel, switched by **TFTs** — thin-film transistors manufactured onto the glass, tens of millions per panel). In the default state the crystals form a helix that rotates polarization ~90°, letting light through the second polarizer. Apply voltage → helix untwists, aligns vertically → light blocked. Modulating voltage modulates intensity.
4. **Color filters** (R/G/B per sub-pixel). Newer Samsung-style panels replace filters with **quantum dots**: nanocrystals that absorb (usually blue, high-energy) backlight and re-emit at a size-determined wavelength.
5. **Second polarizer**, rotated 90° from the first.

LCD sub-types (crystal orientation tradeoffs):

| | TN | IPS | VA |
|---|---|---|---|
| Structure | twist 90° | rotate parallel to screen | vertical, tilt |
| Viewing angles | narrowest (~170°/160°) | widest (~178°/178°) | middle |
| Contrast | ~600–1200:1 | ~700–1500:1 | ~2500–6000:1+ |
| Response | ~1 ms (fastest) | ~1–5 ms | ~4 ms+ (slowest) |
| Color accuracy | poorest | best | good |
| Cost | lowest | highest | mid |

LCD weaknesses: backlight bleed → no true black, poor off-axis. Mitigations: **local dimming** zones; **Mini LED** backlights (50–200 µm LEDs) for smaller zones. Strengths: bright, cheap, long-lived.

**OLED (self-emissive)** — each sub-pixel is an organic compound between an anode and cathode. Current drives **electron–hole recombination** in the emissive layer (hole injection/transport layers below, electron injection/transport above); the emitted wavelength is set by the material's energy gap. Organic = carbon-based; the compounds are sprayed as millions of precise dots.

OLED strengths: per-pixel off = perfect black + power savings; sub-millisecond switching (great for high refresh); no polarizer-induced directionality → great viewing angles; thin/flexible (foldables). Weaknesses: organic compounds degrade — **burn-in** from static content, blue sub-pixels degrade fastest; brightness limited and inefficient at high voltage. Brightness work centers on **Light Extraction Efficiency (LEE)** — much generated light reflects internally; micro-lens arrays and scattering layers extract more. Some panels pair a single-color (blue) OLED emissive layer with quantum-dot color conversion.

**Next generation:** **Tandem OLED** — two stacked emissive layers; brighter, each runs at lower voltage (efficiency + lifespan), but worsens internal reflection (micro-lenses help); used in recent iPads, expensive. **MicroLED** — microscopic inorganic LEDs per sub-pixel: no burn-in, very bright, but each LED is individually placed, so density/cost currently limit it to stadium-scale displays.

Why it matters for design: display tech explains digital color's constraints — and later, why rasterization, GPUs, and shaders work as they do.

## Color spaces, models, and gamuts

### Color is perception, not physics
Color "doesn't really exist… it's a phenomenon of our perception" (Hollick, *Making Software*, makingsoftware.com/chapters/color-spaces-models-and-gamuts). Visible light is electromagnetic radiation, 400–700 nm. The retina has rods (low light) and three cone types: **S-cones** peak ~420 nm (blue), **M-cones** ~530 nm (green), **L-cones** ~560 nm (red). Key perceptual quirks:
- Sensitivity is uneven: green appears brightest at equal energy, blue dimmest (a 555 nm light looks brighter than a 450 nm light of equal power).
- Brightness perception is non-linear — we discriminate dark tones far better than bright ones.
- Perceived brightness shifts with surrounding colors (simultaneous contrast illusions).

### History
Early machines used **indexed color**: a small per-pixel index (1–8 bits) into a Color Look-Up Table (CLUT) of RGB definitions. True color came as memory got cheap. The **ICC** (formed 1993) standardized **ICC profiles** describing each device's color capabilities so the OS can convert between them. In **1996 Microsoft + HP created sRGB**, modeled on typical CRT phosphors so monitors wouldn't need calibration — still the web/default fallback color space and what JPEG/PNG assume.

### Defining a color space
A color space is "a specific organisation of colors so that they are reproducible" (same chapter) — think Pantone: swatch book on one side, exact ink recipes on the other. The reference for nearly everything is **CIE XYZ** (1931), a device-independent space covering all human-visible color. Screens can't show all of it, so practical spaces are subsets, defined by three things:
1. **Chromaticities of the primaries** — x,y coordinates in CIE XYZ for pure R, G, B. These give RGB numbers their meaning and set the gamut limits.
2. **White point** — coordinates of reference white; sets color temperature. CIE standard illuminants: A (incandescent, 2856 K); D50 (5000 K, print/graphics standard), D55 (5500 K, photography), **D65 (6500 K, average noon daylight — sRGB, Rec.709/2020, most displays)**, D75 (7500 K); F-series (fluorescents); E (theoretical equal-energy).
3. **Gamma / tone response curve** — an "easing curve" over brightness (see below).

Different needs → different spaces: DCI-P3 (cinema, warmer white point, gamma 2.6) vs **Display P3** (same gamut, D65 white, display gamma). Editors use huge spaces like ProPhoto RGB internally for precision headroom, converting down on export.

### Gamut
The **gamut** is the set of reproducible colors — the volume bounded by the primaries and white point when plotted in CIE XYZ. Farther-apart primaries = larger gamut. Display P3 is ~25% larger than sRGB, mostly from pushed-out red and green primaries. 2D chromaticity diagrams are projections; in 3D you see green's brightness dominance and the curved edges from gamma. Device-independent spaces (oklab/oklch) span all of CIE XYZ — usable everywhere, but values must be clamped to the display's gamut.

Color count is a function of **bit depth**, not gamut: 8 bits/channel → 256³ = 16.7M colors; 10 bits → 1024³ = 1.07B (and the minimum for HDR). Hex `#RRGGBB` and `rgb(0-255)` are locked to 8 bits. Cameras capture RAW at 12 bits; Photoshop works at 16 bits internally. Low bit depth + gradients → **banding**; **dithering** (added noise) hides it. PNG is lossless up to 16 bits/channel.

### Color models
A color **model** is a geometric arrangement of the same gamut — same primaries, same white point, same colors. RGB arranges colors in a Cartesian cube; **HSL** and **HSV** are polar cylinders (hue as an angle). HSL's cylinder top is white (lightness relative to reference white); HSV's top is each hue's maximum brightness. Conversions are simple geometry. People conflate model with space; they're orthogonal.

### Gradients and interpolation
A gradient interpolates between two colors' coordinates — and the path depends on the model. RGB-cube lerps between opposing colors pass through desaturated gray middle; HSL lets you interpolate hue separately and travel around the wheel. You can convert → interpolate → convert back, or build custom paths (e.g. Cube Helix for high-contrast dataviz palettes).

### Perceptual uniformity
Equal numeric steps ≠ equal perceived steps: we see more contrast among dim colors than bright ones; hue sensitivity drops in very bright colors while saturation sensitivity rises. **CIE LAB** (1970s) was the first serious perceptually-uniform attempt: L (lightness) + a (red↔green) + b (yellow↔blue) — opponent axes, because there's no greenish-red or yellowish-blue. **oklab/oklch** (Björn Ottosson, 2020) improves accuracy and is cheap enough for real-time use. Its warped shape is the point: distances are bent to match perception. Rows of constant oklch L genuinely look equally light across hues; hue-only gradients don't pump brightness like sRGB/HSL ones do; lightness ramps hold saturation where HSL washes out.

oklch gotchas: it can express colors your display can't (clipping), and **chroma peaks depend on hue and lightness** — green reaches far higher chroma than other hues, so a high-chroma green often has *no* equal-chroma counterpart at other hues within P3. Pick out-of-gamut values unknowingly and the result "looks bad" through no fault of the space.

### Gamut mapping
When source gamut > device gamut you must map. Cheap and common: **clip** to the nearest gamut boundary — fast, but distinct colors collapse onto the boundary. Expensive: **compress** all colors to preserve relationships — used in pro photo workflows, not real-time.

### Gamma correction
Two reasons gamma exists: (1) historically, CRT brightness was a power function of input voltage, so signals were pre-corrected with the inverse; (2) perceptually, we're far more sensitive to dark-tone differences, so a compressive curve allocates more bits to shadows. That's what lets 8-bit channels avoid banding; linear encoding would need 12–16 bits. (Game "adjust until barely visible" screens are gamma calibration.) Technically the curve is a **Tone Response Curve / transfer function**; "gamma" is its average slope on log axes. Standard values: **2.2** (typical monitors), 1.8 (pre-10.6 Mac OS), 2.4 (BT.1886 HDTV, dim rooms), 2.6 (DCI-P3 cinema, dark theaters), 1.0 (linear — RAW capture and internal image math). Pipelines typically *process* in linear, then encode with the transfer function for storage/transmission, decoded by the display.

### Additive vs subtractive
Screens are **additive** (emit light; R+G+B sum toward white). Print is **subtractive** (inks absorb wavelengths from reflected white light) — **CMYK**, whose primaries are the complements of RGB. RGB→CMYK is nominally complement-finding plus white-point handling, but really at the mercy of inks and paper. Color e-ink is a rare subtractive display.

### Color management
OS, apps, content, and each monitor may all use different spaces; the OS-level **Color Management Module** converts between them via an intermediate device-independent space (CIE XYZ), using embedded/device ICC profiles. The display's gamut is the final limit — edit in ProPhoto on a P3 monitor and you can't see (or know about) the colors you're losing.

### Terms that get confused
- **Luminance** — physical light quantity, cd/m² (nits). Objective.
- **Brightness** — perceived; influenced by hue, surroundings, lighting.
- **Lightness** — perceived light/dark *relative to reference white* (HSL's L, LAB's L*).
- **Value** — brightness relative to that color's own maximum (HSV).
- **Chromaticity** — 2D hue+saturation coordinates, brightness-independent.
- **Chroma** — colorfulness relative to reference white (lightness-independent).
- **Saturation** — colorfulness relative to the color's own maximum purity. (HSL/HSV use "saturation" loosely — they're RGB transforms without true chroma.)

## The problem of color contrast

### What WCAG 2 requires
WCAG 2 success criterion **1.4.3**: text contrast ratio of **4.5:1** for normal text (AA), **3:1** for large text (≥18pt, or 14pt bold), **7:1** for AAA. Every standard contrast checker computes this ratio.

### What the formula actually computes
1. A naive RGB average would fail because perceived brightness is weighted toward green. WCAG uses the sRGB luminance coefficients — **≈0.2126 R, 0.7152 G, 0.0722 B**.
2. But first the gamma-encoded sRGB values must be **linearized** (undo the transfer function), *then* weighted and summed → relative luminance L in [0,1].
3. Ratio: **(L1 + 0.05) / (L2 + 0.05)**, lighter over darker; the 0.05 offset avoids division by zero. Range 1:1 (identical) to 21:1 (black on white).

### Where WCAG 2 cuts corners
- **It's symmetric — perception isn't.** The formula ignores which color is text and which is background, but human contrast perception is **polarity-dependent**: light-on-dark generally reads as higher contrast than dark-on-light at the same mathematical distance.
- **The orange problem.** On orange (and medium blue), WCAG 2 says black text wins; most people find white text clearly more readable. Twitter, Facebook, etc. all use white-on-blue against the formula's advice — they followed their eyes.
- **No font size/weight model** beyond the crude two thresholds, though required contrast varies continuously with size and weight.
- **Dark pairs can pass while unreadable.** Dark gray on black can scrape 4.5:1 because the math treats the low-luminance end like the high end, where perception actually breaks down. WCAG 2 notoriously overstates contrast in dark mode.
- Result: designers distrust the numbers. The WebAIM Million project finds ~**86% of the top million sites fail** WCAG 2 contrast — a mix of genuine failures and formula false-positives/negatives.

### Spatial frequency
Contrast perception depends on **spatial frequency** — how small/thin the target is — following the vision-science **contrast sensitivity function (CSF)**. Medium-sized elements need the least contrast (peak sensitivity); small thin text needs much more. Readability is a joint function of color pair, size, weight, letter spacing, line height, and ambient light — no single ratio captures it.

### APCA
The **Accessible Perceptual Contrast Algorithm** (Andrew Somers, Myndex Research; part of draft WCAG 3) outputs a lightness-contrast value **Lc**, 0 to ~105+:
- **Polarity-aware** — text-on-background returns different values than the reverse, matching perception.
- Uses perceptual lightness curves modeling self-illuminated displays — handles dark mode correctly (we need relatively *more* contrast on dark backgrounds), where WCAG 2's math falls apart.
- **Ties contrast to typography** via a lookup table instead of pass/fail:
  - **Lc 90** — preferred body text; minimum 14px normal weight.
  - **Lc 75** — body-text floor at ≥18px.
  - **Lc 60** — minimum for non-column content text; ≥24px normal or 16px bold.
  - **Lc 45** — large headlines (36px normal / 24px bold), detailed pictograms.
  - **Lc 30** — absolute minimum: placeholders, disabled elements, large non-text.
  - **Lc 15** — point of invisibility for many users; below this, treat as invisible.
- Reframes the question from "does this pair pass?" to "at what minimum size/weight is this pair readable?"
- **Solves the orange problem**: white text wins on orange and blue, by a wide margin.
- **Dark-mode cap**: very bright white on pure black is uncomfortable for sustained reading (notably with astigmatism); APCA suggests keeping large dark-mode text below Lc 90.
- **Range-based conformance**, not binary — flexibility for decorative/large elements, strictness where it matters (body text, navigation, critical info).

### Where things stand
WCAG 2 remains the legal standard in most jurisdictions; laws, procurement, and audit tooling are built on it, so the switch is policy as much as math. WCAG 3 is a working draft. **Bridge PCA** is a transitional method: APCA's perceptual math inside WCAG 2's conformance structure, as a drop-in replacement.

> **Staleness note:** the WCAG-2-is-legal / WCAG-3-is-draft / APCA-status claims above reflect mid-2026. Standards status moves — verify against w3.org/WAI and the current APCA documentation before citing compliance guidance, and route compliance decisions to the owning task skill (see [coverage-gaps.md](coverage-gaps.md)).

## Blending modes

### Origins
A blending mode mixes a new color from a **blend** (source) color and a **base** (backdrop) color. Foundations: Porter & Duff's 1984 Lucasfilm paper *Compositing Digital Images* — 12 compositing operations over the four possible per-pixel overlap states. Then **September 1994: Photoshop 3.0 ships layers**, with 12 blending modes by Thomas Knoll — Normal, Dissolve, Multiply, Screen, Overlay, Difference, Darken, Lighten, Hue, Saturation, Color, Luminosity — which every later app reverse-engineered. The names come from darkroom practice (dodging/burning with light). All channel values below are normalized 0–1.

### Separable modes (per-channel RGB math)
- **Darken**: per channel, take min(blend, base).
- **Lighten**: per channel, take max(blend, base).
- **Multiply**: `blend × base` — always darker (normalized values).
- **Screen**: `1 − (1−blend)(1−base)` — invert both, multiply, invert; always lighter.
- **Color Burn**: `1 − (1−base)/blend` — harsh ramp, darkens.
- **Color Dodge**: `base / (1−blend)` — harsh ramp, lightens.
- **Linear Burn**: `blend + base − 1` (floored at 0).
- **Linear Dodge (Add)**: `blend + base`, clipped to 1.
- **Overlay** (contrast mode; pivots on the *base* at 0.5): if base < 0.5 → Multiply at double strength `2·blend·base`; if base ≥ 0.5 → Screen variant `1 − 2(1−blend)(1−base)`. Lights get lighter, darks darker — strongest on images, dull on flat fills.
- **Hard Light**: identical formula to Overlay but pivots on the **blend** layer instead — noticeably different results.
- **Soft Light**: the most complex standard mode and historically implementation-divergent; a softer Overlay. One common form: `(1 − 2·blend)·base² + 2·blend·base` — i.e. blend the square of the base toward the straight product depending on the blend value.
- **Difference**: `|blend − base|`.
- **Exclusion**: `blend + base − 2·blend·base` — similar to Difference, lower contrast in midtones.

### Non-separable modes (HSL component swaps)
Hue, Saturation, Color, Luminosity convert to HSL-like components and recombine:
- **Hue** = blend's hue + base's saturation and lightness.
- **Saturation** = blend's saturation + base's hue and lightness.
- **Color** = blend's hue and saturation + base's lightness.
- **Luminosity** = blend's lightness + base's hue and saturation.

They're "non-separable" because channels can't be computed independently; the W3C spec includes set-saturation/set-luminance helper functions to avoid out-of-gamut (>1.0) results from naive RGB↔HSL round-trips.

**Security nugget:** those helpers have conditional clipping branches that take extra cycles. Rendering a blended 1×1 element over a cross-origin iframe and timing it lets an attacker reconstruct iframe content (even text/credit cards) — a **side-channel timing attack**. Browsers therefore block or specially composite `mix-blend-mode` over iframes with normalized timing.

### Opacity and Dissolve
**Pre-multiplied alpha**: multiply each channel by alpha *before* blending — rgba(1.0, 0.5, 0.0, 0.5) becomes rgb(0.5, 0.25, 0.0). A 1980s performance trick still in standard use; it makes transparency a non-issue for the blend math. **Dissolve** is probably the oldest mode: when bit depth was too scarce for an alpha channel, it faked 50% opacity by randomly discarding half the blend layer's pixels — dithered transparency.

## Digital images

### Sensors: film → silicon
Film: silver halide crystals release electrons when exposed; electrons + silver ions → metallic silver where light hit (the negative). Halides are mostly blue-sensitive, so color film stacks dyed layers (blue-sensitive on top, then a blue-blocking filter, then green, then red).

Digital sensors use silicon photodiodes: a photon striking the top layer moves electrons (photoelectric effect); circuitry measures and amplifies the charge. Well capacity sets sensitivity/dynamic range. **CMOS** sensors give every pixel its own readout circuitry (whole image at once); older **CCD** read pixels serially.

### Bayer filter and demosaicing
Photodiodes are monochrome — they count photons, not wavelengths. The **Bayer filter** mosaic above the sensor assigns each pixel one color: **50% green, 25% red, 25% blue** (rows alternate G-R-G-R / B-G-B-G); green is doubled because human vision is most luminance-sensitive there. So every pixel knows only one channel — the other two must be reconstructed by **demosaicing**: roughly half the color data in any digital photo is interpolated. Algorithms, in escalating quality:
- **Nearest neighbor** — copy the closest pixel of the needed channel. Fast; halves effective color resolution, aliases.
- **Bilinear interpolation** — average the four nearest same-channel pixels. Acts as a low-pass filter: blurs edges.
- **Variable Number of Gradients (VNG)** — computes gradients in 8 directions around the pixel, interpolates only along the lowest-gradient direction(s). Edge-preserving; struggles when gradients are high everywhere.
- **Adaptive Homogeneity-Directed (AHD)** — builds full horizontal- and vertical-interpolated images, converts both to a perceptual space (CIE LAB), builds a homogeneity map, picks per-pixel whichever direction is locally more coherent.
- **AMaZE** (Aliasing Minimization and Zipper Elimination) — slow, iterative, favored by professionals for high-frequency detail; details are scarce even to Hollick.

### Formats and chroma subsampling
A decoded image is a **bitmap** — a matrix of pixel values. RAW is huge (pixels × bit depth), so formats compress. JPEG's first step converts RGB to **Y'CbCr** (luma + blue-difference + red-difference chroma), then applies **chroma subsampling**: in 4×2 pixel blocks, color samples are shared across horizontal pairs (8 colors → 4), or more aggressively across both rows (8 → 2) — luma is kept at full resolution. Between demosaicing and subsampling, the odds that any given JPEG pixel is the "true" captured color are low; Hollick's running joke is that digital image color is mostly *approximated* into existence. (Full JPEG pipeline → effects-and-compression.md.)

### Scaling and rotating = resampling a signal
Showing an image at any size other than 1:1 (or rotated off-grid) is a sampling-rate mismatch. Treat pixels as samples of a continuous signal and **interpolate** at the display's sample positions (per channel). OS/browser previews don't alter the file — the buffer is resampled for display.

- **Nearest neighbor** — preserves data exactly, looks pixelated/aliased; sometimes right for pixel art and glyphs.
- **Bilinear** — straight-line interpolation between neighbors (1D), applied in one axis then the other (2D, 4 points). Softens high frequencies; zippering on sharp edges (e.g. text screenshots). Downscaling is the same operation with a lower output sample rate.
- **Bicubic** — 16 samples; matches the *slope* at each sample (slopes averaged from flanking points), producing piecewise splines (cousin of Béziers). A tunable kernel parameter trades smoothness vs edge preservation.
- **Lanczos** — kernel is a windowed **sinc function** (sin(x)/x); excellent signal reconstruction, sharper than bicubic, used when high-frequency content matters (document upscaling). Costlier (bigger kernel + trig) and can introduce halo artifacts.

The interpolation **kernel** is a weight function slid over the data — this sliding-and-weighted-summing is **convolution**, the same machinery behind blurs (see effects-and-compression.md). Linear interpolation's kernel is a triangle (1 at center, 0 at the edges).
