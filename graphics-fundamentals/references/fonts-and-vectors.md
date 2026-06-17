# Fonts and Vectors

Distilled from Dan Hollick, *Making Software* — chapters: drawing-curves, how-to-make-a-font, rasterisation-and-anti-aliasing, scalable-vector-graphics, boolean-operations (makingsoftware.com/chapters/<slug>). Purchased content, adapted; quote sparingly. Short quotes below are cited.

## Contents

- [Drawing curves](#drawing-curves) — corner rounding math, superellipses/squircles, Bézier curves, splines
- [How to make a font](#how-to-make-a-font) — formats, letter anatomy, classification, optical compensation, spacing/kerning, hinting
- [Rasterisation and anti-aliasing](#rasterisation-and-anti-aliasing) — Bresenham, midpoint circle, fill tests, AA methods, subpixel rendering
- [Scalable Vector Graphics](#scalable-vector-graphics) — viewport/viewBox, path commands, fill-rule, the filter pipeline
- [Boolean operations](#boolean-operations) — Boolean algebra → shape ops, point-in-polygon, winding rules, clipping algorithms

---

## Drawing curves

### Rounding corners
A circle is just a function — `(x−h)² + (y−k)² = r²` — so the computer stores the description, not the coordinates. To round a corner at point P with radius r:
1. Find the **tangent points** where a circle of radius r touches the two edges meeting at P. Distance from P along each edge: **d = r / tan(θ/2)** where θ is the internal angle. For a 90° rectangle corner, d = r.
2. The circle's center lies on the angle bisector of P, radius-distance from the tangent points.
3. Render the arc between the tangent points.

**Nested rounded rectangles** look right when the curves run parallel: inner radius = outer radius − gap (e.g. outer 40, gap 13 → inner 28).

**Ellipse rounding**: two radii (rx, ry), compute d per axis. **Superellipse (Lamé curve)**: `|(x−h)/a|ⁿ + |(y−k)/b|ⁿ = 1` — the exponent n interpolates the corner from a straight chamfer (n→0… well, n=1 is straight) to a square corner (n→∞): n=2 is an ellipse, **n≈4 is the "squircle."** Values <1 scoop inward; n≥10 effectively approximates a square, so you never need actual infinity. Now available in CSS.

### Bézier curves
History: **de Casteljau** (Citroën) invented the algorithm; **Pierre Bézier** (Renault, 1960s) popularized it and the notation — car-body curves. A Bézier is a **parametric curve defined by control points**, built entirely from nested linear interpolation:
- **Lerp**: `P = (1−t)·P0 + t·P1`, t ∈ [0,1]. A two-point "linear Bézier" is just a line.
- **Quadratic** (3 points): lerp P0→P1 and P1→P2 with the same t, then lerp between those two moving points; the third point traces the curve.
- **Cubic** (4 points): one more nesting level. **This is the pen tool**: P0/P3 are anchors, P1/P2 are the draggable handles. Any control-point arrangement still yields a valid curve — they never "break."

Alternative view: the curve is a weighted sum of the control points, with weights (the Bernstein basis) summing to 1 at every t — the same weight graph for every cubic Bézier.

### Paths and splines
Don't add more control points for longer curves — higher-order Béziers are expensive and unpredictable. Instead chain cubics into a **spline/path** sharing endpoints. A path-wide parameter u (0 to segment-count) assigns each segment an interval (segment 1 lerps over u∈[0,1], etc.) so the path animates as one curve. Join-handle behaviors at shared anchors:
- **Broken** — handles independent (corner).
- **Aligned** — handles share a tangent line.
- **Mirrored** — share the tangent line *and* the distance: guarantees a smooth join.

(Hollick credits Freya Holmér's Bézier/spline videos for this chapter.)

## How to make a font

### Font vs typeface, and what's in the file
Typeface = the family (Garamond); font = a specific instance (Garamond Bold Italic 12pt) — "like the difference between a song and a specific recording of it" (Hollick, *Making Software*, makingsoftware.com/chapters/how-to-make-a-font). A font file is a structured container: **glyph vector outlines, spacing metrics, kerning tables, hinting instructions, and metadata** (name, license, language coverage).

Format history:
- **PostScript Type 1** (Adobe, 1984) — cubic Béziers; print standard; limited to 256 glyphs and needed two files.
- **TrueType** (Apple, late '80s; adopted by Microsoft) — **quadratic** Béziers (simpler, but more points for the same shape); big win was built-in **hinting** for pixel-grid control at small sizes.
- **OpenType** (Microsoft + Adobe, late '90s) — unified container for either outline flavor; up to **65,536 glyphs** (full multi-script Unicode); layout tables for ligatures, small caps, stylistic alternates, contextual substitution.
- **Variable fonts** — one file holds a design space with axes (weight, width, slant, optical size) interpolated between master designs at runtime; any point on an axis, not just named stops. One network request instead of five.

### Anatomy and reference lines
Strokes: **stem** (main vertical), **crossbar** (horizontal connector, H), **bowl** (curved stroke enclosing space), **counter** (the enclosed space), **terminals** (non-serif stroke ends: ball, tapered, sheared, flat), **apex** (top junction, A) and **vertex** (bottom junction, V).
Lines: **baseline** (letters sit), **x-height** (top of lowercase x), **cap height**; **ascenders** typically rise above cap height, **descenders** drop below baseline.
Personality variables: **stress** (drawing axis — oblique in pen-derived faces, vertical in constructed ones), **contrast** (thick:thin ratio — Univers ≈ none, Bodoni extreme), **weight** (Light→Extra Black), x-height typically **50–66% of cap height** (taller = better small-size readability, hence screen faces), and serif style (bracketed, unbracketed, wedge, slab, hairline, cupped, rounded).

### Classification (Vox system)
- **Venetian** (pre-1500) — severely oblique stress, low contrast, broad-pen modeling; warm (Centaur, Jenson).
- **Garalde** (1500s) — flowing, medium contrast, variable widths (Garamond, Bembo).
- **Transitional** (1700s) — rationalist: near-vertical stress, systematic, high contrast (Baskerville).
- **Didone** (1700–1800s) — vertical stress, extreme contrast, uniform widths; dramatic (Bodoni, Didot — hence the name).
- **Slab Serif** (1800s) — Industrial-Revolution display type; thick low-contrast serifs. "Egyptians" unbracketed (Serifa, Memphis); "Clarendons" bracketed.
- **Sans Serif** (1800s→) — Grotesques (named for their shocking plainness), Neo-Grotesques (Univers, Helvetica), Geometric (Futura), Humanist (Gill Sans, Frutiger).

Limits: many modern faces defy categories, and the system ignores function, technology, and cultural context.

### Optical illusions and compensation
The eye is an unreliable instrument; type compensates everywhere:
- **Overshoot** — round (O, C, G, Q, S) and pointed (A, V) forms must extend ~**1–2% beyond** cap height and baseline or they look small (circles touch the boundary at one point; squares along a whole edge).
- **Visual centre** — crossbars/waists (H, E, S) sit slightly **above** mathematical center or they look low.
- **Stroke weight** — horizontals must be drawn **thinner** than verticals to look equal (measure Helvetica: they are).
- **Bone effect** — where a straight side meets a curve (Bodoni O), the straight appears to flex inward; designers subtly round "straight" edges to compensate.
- Round forms look smaller than rectangular forms at equal dimensions, so round letters are drawn slightly wider.

### Designing letterforms
Designers don't start at A. They start with key characters that set the DNA — typically lowercase **a, e, g, n, o**; classic test word: **"hamburgefontsiv."** Capitals are designed in structural groups: round (O Q C G S), square (E F H I L T), diagonal (V A W X), round-square (D B P R), diagonal-square (M N K Z Y).

**The O is the most important serif letter** — it sets stress, contrast, and proportion for every round form (C = O minus a slice; G = + crossbar; Q = + tail; D closes with a stem). **The E is second** — it sets stem width, serif/bracket style, and visual centre; its three arms are deliberately unequal (bottom longest for stability, middle shortest to avoid serif collisions).

Proportional systems: the **classic** system (Roman inscriptional) builds capitals on divisions of a square — O/M/W full-width, B/E/F/S half — graceful but uneven in text color. The **modern** system (Transitional/Didone era) targets **even color**: each letter holds roughly equal negative space (H slightly narrower than O), giving uniform text blocks.

Sans serifs inherit the same optics; the distinguishing features move to stroke endings (horizontal/angled/rounded cuts), **aperture** (openness of C, G, S, e, a), and terminal shape.

### Spacing, kerning, hinting
Every glyph has **sidebearings** — built-in space either side; adjacent sidebearings sum to the inter-letter gap. The goal is **even color**: body text should read as uniform gray at arm's length. Spacing is tested with strings alternating the test letter between reference shapes: **"HaHoHaH," "nanona."**

Some pairs can't be fixed by sidebearings (AV's diagonal gap) → **kerning**: per-pair adjustments. Professional fonts carry thousands of pairs, managed by **class-based kerning** (letters with similar profiles — D, O, Q — share class-vs-class values, with per-pair exceptions).

**Hinting** is the final production step: instructions telling the rasterizer how to snap outlines to the pixel grid at small sizes — without it, small text gets uneven stems, misaligned baselines, jagged curves. (Rendering side → rasterisation section below.)

## Rasterisation and anti-aliasing

### From bitmap fonts to outlines
Early text used **bitmap fonts** — each glyph a tiny image; scaling them is a resampling problem with ugly artifacts, and per-size image sets ate scarce memory. **Outline fonts** store vector instructions instead — but now the continuous outline must be mapped onto discrete pixels: **rasterisation**.

### Line and circle algorithms
**Bresenham's Line Algorithm** — avoids floating-point slope division (expensive and rounding-prone on early hardware). Compute Δx, Δy; for a shallow slope set decision parameter **p = 2Δy − Δx**; step along x, choosing whether to also step y from p's sign, updating p with `+= 2Δy` or `+= 2Δy − 2Δx`. Eight directional variants (octants).

**Midpoint Circle Algorithm** — start at (0, −r) relative to center; at each step test whether the midpoint between the two candidate pixels falls inside the radius to choose the pixel; compute only one octant and mirror it 8 ways (circles are symmetric).

### Filling shapes
Glyphs are filled shapes: rasterise the outline, bound it in a pixel-aligned box, then for each pixel sample its center with a **point-inclusion test** (point-in-polygon: ray-casting or winding number — see Boolean operations). At small sizes there just aren't enough pixels, hence:
- Manual size-specific redesign: **Verdana famously shipped hand-tuned bitmaps for all 890 characters at every point size 9–60.**
- **Hinting** by the type system (PostScript/TrueType rasterisers): nudging stems to align with the grid, slightly raising x-height at small sizes.
- Platform difference: **Windows grid-fits aggressively** (crisper, less faithful); **macOS preserves the outline's intent** (more faithful, softer).

### Anti-aliasing
Bi-level rasterisation (pixel on/off) produces jagged steps: **aliasing** — the signal "taking on a fake identity" because it's sampled too sparsely. The display's resolution is the sample rate; the fix is computing *partial* coverage per pixel:
- **Analytical Area Coverage** — most accurate: split curves into segments, scanline the bounding box, build trapezoids/triangles between curve and pixel boundaries, compute exact covered area, blend (with gamma correction for smooth falloff). CPU-heavy; reserved for text. GPU adaptations use **signed distance fields** to get per-subpixel distance from the glyph edge.
- **Subpixel rendering** (early 2000s; ClearType-style) — exploits the R/G/B subpixel layout to effectively **triple horizontal resolution**: rasterise the glyph scaled 300% horizontally and map thirds-of-a-pixel onto individual subpixels (a ⅓-pixel-wide sliver = just the red subpixel lit). Causes color fringing, mitigated by low-pass filtering. Faded after Apple dropped it for Retina-density displays — this is a root cause of "text renders differently on different platforms."
- **SSAA (Super Sample AA)** — render at a multiple of the resolution (4x = quadruple samples) and downsample; high memory cost. In practice implemented as multiple sub-pixel sample points rather than literal upscaling.
- **MSAA (Multi Sample AA)** — supersample **only at geometry edges**; cheaper, but interior transparency gets only one sample per pixel.
- Sample patterns matter: regular grids still alias (smaller); random/jittered avoids that but wastes samples; **rotated grid** is the usual best tradeoff.
- **TAA (Temporal AA)** — average pixel colors across frames, dithering aliasing away over time.

## Scalable Vector Graphics

### History
Pre-SVG web graphics meant raster files or Flash plug-ins (Flash only truly died because iOS never supported it). Competing late-'90s W3C proposals: **VML** (Microsoft/Macromedia/HP/Autodesk — Office-to-HTML interchange, CSS positioning) and **PGML** (Adobe/IBM/Netscape/Sun — PostScript-derived, precision-first). W3C rejected both and cherry-picked a new spec on **XML** — prioritizing interoperability over file size. Consequences of being XML/DOM nodes: scriptable like HTML, stylable with CSS (once HTML5 allowed inlining instead of `<object>`/`<embed>`/`<iframe>`), and semantically accessible to screen readers — not a black box like raster formats. `xmlns="http://www.w3.org/2000/svg"` is the XML namespace/validation hook.

### Viewport and viewBox
- **Viewport**: the area allocated to the SVG on the page (CSS or width/height attributes); a "window onto the SVG canvas"; sets the default coordinate system from its top-left.
- **viewBox="x y w h"**: overrides with a *user-space* coordinate system. x/y pan the window's origin (negative allowed — panning the infinite canvas, cropping at the viewport). w/h set the **scale**: viewport 40px wide + viewBox width 20 → each user unit = 2 screen pixels (2× scale). This decoupling is what makes SVG responsive.
- Aspect-ratio mismatches don't squash content by default — **preserveAspectRatio** governs it: alignment (`xMin|xMid|xMax` × `YMin|YMid|YMax`, a 3×3 anchor grid; default `xMidYMid`) plus scaling behavior **meet** (fit entirely, like `contain`) or **slice** (fill and crop, like `cover`); `none` disables and stretches.

### Shapes and paths
Seven primitives: `<rect>`, `<circle>`, `<ellipse>`, `<line>`, `<polygon>` (closed), `<polyline>` (open), `<path>` — the last can recreate all the others. `<path>` takes `d`, a string of draw commands: a letter (the function) followed by numbers (parameters), like pen-on-paper instructions where each command leaves the pen positioned for the next:

| Command | Symbol | Meaning |
|---|---|---|
| Move | M/m | reposition without drawing |
| Line | L/l | straight line to point |
| Quad curve | Q/q | quadratic Bézier (1 control point) |
| Smooth quad | T/t | control point auto-reflected from previous curve |
| Cubic curve | C/c | cubic Bézier (2 control points) |
| Smooth cubic | S/s | first control point reflected |
| Arc | A/a | elliptical/circular arc segment |
| Close | Z/z | straight line back to start |

Uppercase = absolute coordinates; **lowercase = relative to the previous position** — chosen deliberately because small relative numbers compress better. Arc parameters: rx, ry (equal for circular), x-axis rotation (ellipses only), then two flags choosing among the four possible arcs: **sweep** (0 clockwise / 1 counterclockwise → which of the two candidate circles) and **large-arc** (1 large / 0 small). `fill-rule` selects the point-in-polygon algorithm: **`even-odd`** = ray-crossing parity, **`non-zero`** = winding number (details in Boolean operations below).

### The filter pipeline
SVG has had a raster **filter effects pipeline since SVG 1.0 (2001)**, inspired by RenderMan's node-based shading. Primitives take inputs and produce outputs that feed other primitives — a **Directed Acyclic Graph** allowing branch-and-composite effects. The source element is rasterised into a buffer first; filters operate on pixels.

Blur & shadow:
- **`<feGaussianBlur>`** — Gaussian kernel convolution; `stdDeviation` sizes the kernel, and because the 2D kernel is separated into two 1D passes you can set x/y blur independently → motion-blur-like effects.
- **`<feDropShadow>`** (SVG 2) — replaces the old chain feGaussianBlur→feOffset→feFlood→feComposite.

Color:
- **`<feColorMatrix>`** — multiplies each pixel's [R G B A] by a matrix; presets `saturate`, `hueRotate`, `luminanceToAlpha`.
- **`<feComponentTransfer>`** — per-channel curves/levels: types `identity`, `linear` (slope=contrast, intercept=brightness), `table` (interpolated points), `discrete` (step function → posterization), `gamma` (amplitude/exponent/offset).
- **`<feFlood>`** — solid color fill, for combining.

Compositing:
- **`<feBlend>`** — blending modes across two inputs.
- **`<feComposite>`** — **Porter-Duff operations**: `over`, `in` (mask), `out` (inverse mask), `atop`, `xor`, plus `lighter` (additive, clamped) and `arithmetic` (`k1·i1·i2 + k2·i1 + k3·i2 + k4` — roll-your-own blend; pairs with lighting filters).
- **`<feMerge>`** — stack filter results as layers (parallel rather than sequential).

Lighting & texture:
- **`<feDiffuseLighting>` / `<feSpecularLighting>`** — alpha channel as height map (`surfaceScale` exaggerates), light children `<feDistantLight>`, `<fePointLight>`, `<feSpotLight>`; specular adds shininess via `specularExponent`.
- **`<feTurbulence>`** — generates Perlin turbulent noise from nothing; feed it onward for texture.

Geometry:
- **`<feOffset>`**, **`<feTile>`** (background-repeat-like), **`<feMorphology>`** (`dilate`/`erode` by neighborhood max/min, per-axis radii), **`<feDisplacementMap>`** (move pixels by the intensity of a chosen channel in a second input; >127 positive, <127 negative per axis), **`<feConvolveMatrix>`** (custom kernels: sharpen, edge detect), **`<feImage>`** (import an image into the graph).

**Performance**: filters are mostly hardware-accelerated but per-pixel; animating one forces rasterise→filter→composite every frame. The most expensive are the neighborhood-sampling ones: `feConvolveMatrix`, `feGaussianBlur`, and the lighting primitives.

## Boolean operations

### Boolean algebra in one parking lot
Boolean algebra deals with **set membership**, not quantities. With car sets (Electric/Petrol/Hybrid, Yellow/Blue…): `+` is **union** (E + H = anything electrified), `×` is **intersection** (P × Y = yellow petrol cars), **1** is the universe, **0** the empty set, `−` subtracts (1 − B = all non-blue). Quirks: 1 + Y = 1 (union can't exceed the universe), Y × Y = Y. Programming names: **OR** = union, **AND** = intersection, **NOT** = negation/subtraction; parentheses order operations (`((E OR H) AND F) NOT Y`). Truth-table forms: OR true if either input is 1; AND only if both; NOT inverts; **NAND/NOR** are inverted AND/OR; **XOR** true only when inputs differ; **XNOR** the inverse.

### Shape operations are truth tables on the plane
Treat each shape as a set; every point's membership feeds the table:
- **Union** = OR (in either shape).
- **Intersect** = AND (in both).
- **Exclude** = XOR (in exactly one) — the inverse of intersect.
- **Subtract** = AND + NOT ("the red circle AND anything that isn't the blue circle"). Which shape gets NOT-ed is set by **layer order** in vector tools — invert the hierarchy, invert the result. Each operation produces a new shape/group usable in further operations: groups act as the parentheses.

### Point-in-polygon
Evaluating membership pixel-by-pixel would be absurdly slow; tools instead find intersection points between outlines — which requires deciding whether vertices fall inside the other polygon. Two algorithms:
- **Ray-casting** — cast a ray from the point in any direction (practically: very long); count edge crossings. **Odd = inside, even = outside** (the Jordan Curve theorem). Edge cases: a ray grazing an edge exactly, or complex self-overlapping polygons, can miscount — mitigate with multiple rays or crossing rules.
- **Winding number** — how many times the outline travels counterclockwise around the point (pin + string + pencil mental model). **0 = outside; any other integer = inside**; negative = clockwise; magnitude reveals how nested an overlap region is. **Sunday's algorithm** computes it cheaply: cast a horizontal ray; **+1 for each edge crossing upward, −1 downward**; if the ray lies exactly along a horizontal edge, score the adjoining edges ±0.5 each (preceding edge up → +0.5, following edge down → −0.5).

These are exactly SVG's fill rules: **`non-zero`** fills where winding ≠ 0 (self-intersecting regions stay filled); **`even-odd`** fills odd-crossing regions, leaving even ones as holes.

### Polygon clipping algorithms
- **Sutherland-Hodgman** — the standard for simple clipping. For each edge of the clip polygon, extend an infinite reference plane; traverse the subject polygon's vertex pairs, keeping inside vertices and inserting computed intersection points where pairs cross the plane; each plane's output list feeds the next plane. **Limit: the clip polygon must be convex** and non-self-intersecting.
- **Weiler-Atherton** — handles **concave** polygons. List both polygons' vertices counterclockwise; find all edge intersections, inserting each into both lists, labeling subject-list intersections **entering/exiting**. Build the result by walking the subject list and, at an EXIT intersection, jumping to the clip list (and back at the next intersection) — zig-zagging until closed. Great for intersection/clipping, less suited to other ops.
- **Greiner-Hormann** — similar traversal, but by choosing whether kept points lie inside or outside each polygon, it can produce **union, intersection, exclusion, and subtraction**; the heart of it is ordering the points correctly per operation.
- **Vatti** — the most widely used; "more robust… a technical way of saying that it has fewer edge cases" (Hollick, *Making Software*, makingsoftware.com/chapters/boolean-operations). Scanline-based rather than vertex-traversal: break polygons into edges grouped by lowest y; emit horizontal **scan beams** at every top/bottom/intersection; within each slice sort edges by x (left vs right), fill spans using the winding rule for the requested operation, and stitch the resulting trapezoids together.

Curved shapes use **Bézier clipping**, which Hollick declines to cover ("really quite complicated"). Which algorithm you hit depends on the software and scenario.
