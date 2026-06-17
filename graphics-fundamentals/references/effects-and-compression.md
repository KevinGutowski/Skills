# Effects and Compression

Distilled from Dan Hollick, *Making Software* — chapters: blurs-noise-and-other-effects, image-compression (makingsoftware.com/chapters/<slug>). Purchased content, adapted; quote sparingly. Short quotes below are cited.

## Contents

- [Kernel convolution](#kernel-convolution) — the machinery behind every blur/sharpen/edge effect
- [Blurs](#blurs) — box vs Gaussian, separability, why blurs are slow
- [Sharpening and edge detection](#sharpening-and-edge-detection) — unsharp masking, Sobel, Laplacian, emboss, Gabor
- [Noise](#noise) — white, value, Perlin, simplex, Worley, fractal octaves
- [Dithering](#dithering) — ordered/Bayer, Floyd–Steinberg error diffusion, Atkinson
- [Halftoning](#halftoning) — AM vs FM, CMYK screen angles, ASCII shaders
- [Image compression](#image-compression) — JPEG (DCT pipeline), GIF (median cut + LZW), PNG (filters + DEFLATE), WebP

---

## Kernel convolution

A **kernel** is a small matrix of weights; **convolution** slides it across data, at each stop multiplying the values under the window by the weights and summing them into a new output value. 1D: smoothing a row of pixel intensities with a 3-value kernel = rolling average (if the weights sum to 1). 2D: the kernel samples in all directions; its size is its **radius**, which determines how many neighbors participate.

Practical details:
- **Edges**: there's no data outside the image — either use 0, extend the edge values, or reflect the block; pick per-effect.
- **Even-length kernels** have no center; designate a consistent anchor point.
- Convolution underlies blurs, sharpening, edge detection, and the computer-vision feature extraction pipeline. It's the same operation as the interpolation kernels in image scaling (see pixels-and-color.md).

## Blurs

- **Box blur** — all weights equal, summing to 1 (a 5×5 kernel is 1/25 everywhere: each output pixel is the average of itself and its 24 neighbors). Fast, harsh: every neighbor counts equally regardless of distance.
- **Gaussian blur** — weights follow a Gaussian bell curve (closer pixels matter more); still sums to 1; smooth, natural. Strength is controlled by kernel size and sigma (standard deviation).
- **Why blurs are slow**: cost scales with kernel area — 3×3 = 9 multiplications per pixel, 20×20 = 400, for *every* pixel.
- **The separability trick**: the Gaussian function is separable, so a 2D blur = a horizontal 1D pass then a vertical 1D pass. 20×20 → 1×20 + 20×1 = **40 ops per pixel instead of 400**, with identical results. This is how CSS `filter: blur()` and Photoshop actually work; any symmetric kernel can usually be separated. (It's also why SVG's feGaussianBlur can take independent x/y deviations — two independent 1D kernels → motion-blur effects.)

Design implication: blur cost grows with radius and with the area being blurred, and animated blurs re-run the whole convolution every frame — that's why a large animated backdrop blur janks.

## Sharpening and edge detection

Blurring averages neighbors; sharpening amplifies differences from neighbors.
- **Unsharp masking** — subtract a blurred copy from the original; what survives is the high-frequency content (edges); add it back to sharpen. (The confusing name is from darkroom practice.)
- **Sharpening kernel** — large positive center, negative surround: emphasize the pixel, subtract the neighborhood.
- **Sobel operator** — two directional kernels (horizontal + vertical edges), results combined.
- **Laplacian** — omnidirectional second-derivative edge detector; 4-neighbor variant catches horizontal/vertical edges, 8-neighbor adds diagonals.
- **Emboss** — edge detection with a directional offset: pressed-into-metal illusion.
- **Gabor kernel** — Gaussian × sine wave; tunable angle/size/aspect to isolate specific frequencies/textures. Used in banks of differently-tuned kernels for feature extraction — e.g. **fingerprint matching**.

Edge detection is the gateway to computer vision: finding object boundaries and decomposing images into parts.

## Noise

Computer graphics look too perfect; noise adds organic variation.
- **White noise** — every pixel independently random. TV static; no spatial structure, rarely useful alone.
- **Value noise** — random values at grid points, interpolated between. Organic hills/valleys; linear interpolation shows grid artifacts, smoother curves help.
- **Perlin noise** — Ken Perlin, 1980s, created for *Tron*. Random **gradients** (direction vectors) at grid points instead of values; the noise value depends on alignment with surrounding gradients. Smoother, fewer grid artifacts; the foundation of nearly all procedural content — terrain, clouds, rock and bark textures.
- **Simplex noise** — also Perlin's; triangular grid (2D) instead of square: cheaper, kills directional artifacts, scales much better to 3D (volumetrics) and 4D (animated noise).
- **Worley noise** (cellular/Voronoi) — scatter random feature points; value = distance to the nearest point. Cells, scales, cracked mud.
- **Fractal noise / octaves** — layer the same noise at progressively higher frequencies and lower amplitudes and sum; each octave adds finer detail over the coarse base.

## Dithering

Dithering uses noise to fake a larger palette, exploiting **spatial averaging** — the eye averages small areas, so diffused two-color noise reads as an intermediate tone, smoothing the hard **banding** steps that **quantization** (reducing color count/bit depth) creates.

- **Ordered dithering** — build a **Bayer matrix** (e.g. 2×2) whose values define a processing order; scale to 0–255 to get a threshold map; compare each pixel in each 2×2 block against its map cell — above → white, below → black. A 2×2 map yields only 5 per-block outcomes (3 grays between black and white); bigger maps = more effective shades. Drawback: visible cross-hatch patterns.
- **Error diffusion (Floyd–Steinberg)** — single threshold (e.g. 128); quantize each pixel, then push the signed **error** (original − new) onto unprocessed neighbors via a weight matrix, so an over-bright pixel makes its neighbors darker. Much less patterned.
- **Atkinson dithering** — Bill Atkinson, for the original Macintosh: diffuses only **6/8 of the error** (discards the rest), giving a contrastier result that suited the Mac's 1-bit display.
- **Stucki / Burkes** — larger diffusion kernels, smoother, costlier.
- Today dithering is mostly a retro aesthetic — except **temporal dithering**, which modern displays use constantly: flickering a pixel between two colors fast enough to simulate intermediate colors and fake higher bit depth.

## Halftoning

Often confused with dithering; halftoning is primarily a **print** technique representing tone with dots, again via spatial averaging (the eye can't resolve the dots, so it averages: big-dot clusters read dark). Lineage: stippling, hatching, pointillism → screen printing.
- **Amplitude modulation (AM)** — uniform dot spacing, dot **size** varies with image intensity. The common approach; tune cell size, grid angle, dot scale.
- **Frequency modulation (FM)** — uniform dot size, **spacing** varies.
- Dots can be any shape, including characters — **ASCII-art shaders** are halftoning: characters mapped to intensities by how much of the cell they fill.
- **CMYK print** layers a halftone screen per ink at different angles — typically **cyan 15°, magenta 75°, yellow 0°, black 45°** — to avoid **moiré** interference patterns.

## Image compression

Text demands **lossless** compression; images can use **lossy** compression because human vision is imperfect — specifically, we resolve far more detail in **luminance than chrominance**, and our brains smooth high-frequency noise (spatial averaging).

### JPEG (1992, Joint Photographic Experts Group)
Lossy, ~**10:1 compression** without obvious degradation, with an adjustable quality dial. The pipeline:
1. **RGB → Y'CbCr** — Luma (Y'), blue-difference (Cb), red-difference (Cr). Green isn't stored; it's recoverable from the rest. Isolating color from luminance is what enables everything after.
2. **Chroma subsampling** — in 4×2 pixel blocks, share each chroma sample across horizontal pairs (halving color data), or across both rows too (8 pixels → 2 chroma samples). Done on Cb and Cr separately; safe because near-neighbors rarely differ much — and blocks are kept small so edges don't smear.
3. **DCT** — split each channel into **8×8 blocks**, remap values from 0–255 to **−128…127** (centering on 0, since cosine waves oscillate around 0). The **Discrete Cosine Transform** re-expresses each block as a weighted sum of **64 2D cosine patterns** (the DCT II basis table); the 64 weights are the **coefficients**. Natural images concentrate energy in low frequencies, so low-frequency patterns get big coefficients and high-frequency ones get small coefficients.
4. **Quantization** — divide the coefficients by a 64-entry **quantization table** (larger divisors for high-frequency patterns) and round; small coefficients collapse to 0. **This is the lossy step** — the rounding is irreversible. The JPEG quality slider just scales this table: bigger values = more zeros = smaller file = worse quality.
5. **Entropy coding** — serialize coefficients in a **zig-zag order** (top-left → bottom-right) so the trailing zeros run together, then **Huffman-encode**. Channels are interleaved block-by-block (64 luma, 64 Cb, 64 Cr, repeat); chroma channels typically get harsher quantization tables than luma.

Decoding reverses everything: Huffman-decode → multiply by the *same* quantization table → inverse DCT (DCT III) → un-shift to 0–255. Compare input and output blocks and almost no value matches — but every value is close, and we don't notice.

### GIF (CompuServe, 1987)
Two mechanisms: **indexed color** and **LZW**.
1. **Quantize to ≤256 colors** stored in a lookup table; pixels become 8-bit indexes (already 3:1 vs 24-bit). The interesting palette-selection algorithm is **median cut**: plot all colors in the RGB cube; box them; find the box's longest axis; sort by that component and split at the median; recurse until 256 boxes; each box's palette color = the average of its members. It allocates palette entries proportionally to where the image's colors actually live. Aggressive quantization creates banding → apply dithering (which then hurts compression).
2. **LZW (Lempel-Ziv-Welch)** — dynamic dictionary coding over the index stream. Start with the 0–255 literal dictionary (+2 reserved codes); scan pixels asking "is current-string + next-pixel in the dictionary?" — if yes extend, if no emit the current string's code, add the new string at the next code (258 onward, 9-bit and growing), reset. Long runs of one color collapse to single codes (100 red pixels → one 12-bit code), which quantization makes common — hence GIF's strength for flat-color logos/illustrations. Codes wider than 8 bits are **bit-packed** least-significant-bits-first across byte boundaries, in 255-byte blocks with length prefixes. The dictionary is **not stored**: the decoder rebuilds it by running the same logic in reverse. Animation = the whole pipeline per frame, optionally with per-frame local color tables.

### PNG
Born **out of spite**: Unisys's LZW patent enforcement on GIF in the early '90s spurred a lossless, true-color replacement. Two stages: **prediction (filtering)** then **DEFLATE**.
1. **Prediction filters** — adjacent pixels correlate, so transmit the *difference* from a prediction instead of the raw value; the residual distribution clusters tightly around 0 (Laplacian), lowering entropy. Five filters, switchable **per scanline**:
   - **None**; **Sub** (difference from left); **Up** (difference from above); **Average** (difference from floor of mean of left+above); **Paeth** (difference from a local-gradient predictor over left, above, top-left).
   - Filters actually operate **per byte** (R G B A R G B A…), offsetting by bytes-per-pixel to find "left."
   - Cost: good encoders try all five per scanline (sometimes encoding the image five times) to pick the best — slow for large images.
2. **DEFLATE = LZ77 + Huffman** — LZ77 replaces repeats with (distance, length) pointers into a 32KB sliding window; then two Huffman trees (one for literals+lengths, one for distances) assign short codes to frequent symbols. Each tree optimizes independently.
Everything is reversible — exact reconstruction. Weakness: photographic sensor noise is high-frequency and patternless, so LZ77 finds nothing to match — PNGs of photos are huge. (This is the core of "why is this PNG 30MB": photographic/noisy content in a lossless format.)

### WebP (Google, 2010)
A hybrid stealing from everyone, based on the **VP8/WebM** video codec's intra-frame compression. **Lossy WebP**:
1. RGB → YCbCr (unclipped Y); split into **16×16 macroblocks**, chroma downsampled to 8×8 (≈75% of color data discarded — JPEG-style subsampling).
2. **Block prediction** (PNG's idea, per block instead of per pixel): predict each block from the pixel row above and column left, using modes **Horizontal, Vertical, DC (average), True Motion (gradient)**; try each, keep the lowest error. Luma blocks can subdivide into 4×4 with 10 modes each; the encoder compares **cost = distortion + bits** to decide whether the finer prediction is worth it (small blocks for detailed areas, big for flat).
3. **DCT on the residuals** (prediction errors, not pixels — the values are smaller), using an integer-only **4×4 DCT** that confines artifacts to smaller areas; quantize; zig-zag.
4. **Boolean arithmetic coding** — context-adaptive: probabilities update based on neighboring blocks (a detailed left-neighbor raises the odds this block is detailed).

**Lossless WebP** is more like an upgraded PNG: block prediction transforms, then a **color decorrelation transform** — channels correlate, so keep Green and store **R−G** and **B−G** (small numbers compress well, trivially reversible) — then LZ77 + Huffman. Twist: instead of one giant Huffman tree, the image is split into 16×16 blocks grouped by similarity (sky blocks share a tree, grass blocks another — typically **10–30 trees per image**), with an **entropy map** (a low-res image where each pixel names a block's tree) telling the decoder which to use. Middle ground between one bloated tree and per-block overhead.

Hollick's verdict: with universal support, "there's really no downside to using it" — more flexible than JPEG or PNG and better compression than both (Hollick, *Making Software*, makingsoftware.com/chapters/image-compression).
