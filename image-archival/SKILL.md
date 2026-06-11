---
name: image-archival
description: "Shrink oversized images (PNG/TIFF/PSD exports) to visually identical smaller files — diagnose why they're huge, re-encode (WebP/JPEG/AVIF) or re-optimize PNG, verify lossless, never overwrite originals. Use when an image or folder is 'huge' or needs compressing for archive. Triggers: huge image, compress image, shrink PNG, PNG to WebP, visually lossless."
---

## When to use

The user has large source images (key visuals, renders, scans, exported artboards — often 50–300 MB PNG/TIFF) and wants to keep them around at much smaller size without an obvious quality hit. The instinct "just save the original" is right until the originals are absurdly big; then a *light, verified* compression pass is the win.

**Don't use for:** routine web-export sizing (a normal export pipeline handles that), images already small (<~2 MB — not worth it), or hard-archival/legal masters that must be bit-exact forever (keep those untouched). For research-bundle/provenance archiving of *web* sources, use `archival-research` instead.

## The one idea: diagnose before you compress

A file is rarely huge because it's "uncompressed." It's huge for one of three reasons, and each has a different, mostly-lossless fix. **Find the cause first.**

| Cause | How to spot it | Fix (impact) |
|---|---|---|
| **16-bit/channel depth** | `bitsPerSample: 16` | → 8-bit, **lossless, often 5×** |
| **Unused / dead alpha** | alpha all-opaque, or only a thin transparent border | drop alpha / crop border (free) |
| **Print resolution** | tens of megapixels (e.g. 7234×10169 ≈ 73 MP) | downscale *only if* screen-only |
| (whatever's left) | true photographic/illustration data | lossy WebP/AVIF q≈92 |

Real example this skill came from: a 289 MB PNG was 16-bit + 73 MP with a 68px dead transparent frame. 16→8-bit alone took it to 58 MB (invisible); WebP q93 took it to 2.5 MB — 99% smaller, PSNR 46 dB.

## Step 1 — Inspect

```bash
sips -g pixelWidth -g pixelHeight -g hasAlpha -g bitsPerSample -g samplesPerPixel FILE
```
Note megapixels (W×H), and especially **`bitsPerSample` — 16 is the classic bloat.**

**Alpha-usage check (the non-obvious one).** `hasAlpha: yes` does not mean transparency is used:
```bash
magick FILE -alpha extract -format "alpha min=%[min] max=%[max] mean=%[mean]\n" info:
```
- `min == max == <full>` → alpha is fully opaque = **wasted**. Drop it.
- `min=0` but mean near full → mostly opaque with a transparent region somewhere. Locate it:
```bash
magick FILE -alpha extract -format "opaque bbox = %@\n" info:   # e.g. 7098x10033+68+68
```
If the opaque bbox is the whole image inset by a few px on every side, the "transparency" is just a **dead border** — crop it and drop alpha. To eyeball *where* alpha lives, extract it small and Read it: `magick FILE -alpha extract -resize 600x /tmp/alpha.png` (white=opaque, black=transparent).

## Step 2 — Decide (two questions for the user)

These fork the recipe; ask if not obvious:
1. **Quality target** — *lossless preservation* / *visually identical* (default) / *smallest that still looks great*.
2. **Resolution** — *keep full* (might be printed) / *downscale for screen*. When in doubt, keep full; it's the safe archival call.

## Step 3 — Encode

Pick by quality target × content type. WebP q≈92 `-sharp_yuv` is the default workhorse (keeps alpha, great ratio).

```bash
# Visually-identical, keeps alpha — THE DEFAULT. -metadata icc preserves color profile.
cwebp -q 92 -sharp_yuv -m 6 -mt -metadata icc IN.png -o OUT.webp

# Crop a dead transparent border AND drop alpha, in one shot (x y w h from the bbox above):
cwebp -q 92 -sharp_yuv -m 6 -mt -metadata icc -crop 68 68 7098 10033 -noalpha IN.png -o OUT.webp

# 16-bit -> 8-bit, staying lossless PNG (also: cwebp needs 8-bit input, so do this first for 16-bit sources):
magick IN.png -depth 8 -define png:compression-level=9 OUT8.png

# Flat-color logos / UI sprites / screenshots / line art -> lossless (no ringing on sharp edges/text):
cwebp -lossless -z 9 -mt -metadata icc IN.png -o OUT.webp        # exact
cwebp -near_lossless 60 -q 100 -mt -metadata icc IN.png -o OUT.webp  # visually exact, smaller

# JPEG (only when alpha is gone). FORCE 4:4:4 — default 4:2:0 smears saturated/neon edges:
magick IN.png -quality 92 -sampling-factor 1x1x1 OUT.jpg

# Downscale (only if user chose screen-only). High-quality filter:
magick IN.png -filter Lanczos -resize 3600x OUT.png   # or feed result to cwebp

# AVIF — best ratio, keeps alpha, but encode is slow & support less universal. Needs: brew install libavif
avifenc --min 20 --max 24 -s 4 IN.png OUT.avif
```

**Content-type rule of thumb:** photographic / painted / gradient-heavy art → **lossy** (WebP/AVIF). Flat color, hard edges, text, tiny sprites → **lossless / near-lossless** (lossy ringing is visible on sharp edges and cheap to avoid).

## Step 4 — Verify (don't just assert "visually identical")

Re-decode and compare a **high-detail crop** (pick an area with edges/text/fine gradient, not flat sky), then look with your own eyes:
```bash
R="1400x950+2500+1500"
magick ORIG -crop $R +repage /tmp/o.png
magick OUT.webp -crop $R +repage /tmp/w.png
magick compare -metric PSNR /tmp/o.png /tmp/w.png null:   # >40 dB = visually lossless
magick compare -metric SSIM /tmp/o.png /tmp/w.png null:   # >0.98 = excellent
# Amplify any difference 12x and READ it — should be near-blank:
magick /tmp/o.png /tmp/w.png -compose difference -composite -evaluate Multiply 12 /tmp/diff.png
```
If PSNR < ~38 dB or the amplified diff shows structure (banding, blocky edges, color bleed), bump quality, switch lossy→near-lossless, or add `-sharp_yuv`.

## Step 5 — Preserve originals

**Never overwrite the source.** Write outputs to a sibling folder (e.g. `Archived/`) and leave originals in place; let the user delete them once they've eyeballed the results. Report a before/after table with % saved. Confirm dimensions + alpha state of each output (`magick identify -format "%wx%h alpha=%A %b\n"`).

## Batch a folder

Inspect all candidates first (`for f in *.png; do sips -g ... "$f"; done`), then route each file by what it is — don't apply one recipe blindly:
- big photographic/illustration PNG → lossy WebP q92 `-sharp_yuv`
- flat logo / sprite / screenshot / few-color → lossless or near-lossless WebP
- 16-bit anything → 8-bit first
- any file with a dead transparent border → crop + `-noalpha`

Log per-file before/after and a total. Skip files already small (<~2 MB) unless asked.

## Gotchas

- **Bit depth is usually the real bloat**, not "lack of compression." Check `bitsPerSample` before anything else.
- **JPEG silently destroys alpha** — it has no alpha channel, so it flattens transparency onto black/white. Use WebP/AVIF when alpha matters, or crop/flatten deliberately first.
- **Lossy WebP is always 4:2:0 chroma** internally — use `-sharp_yuv` to protect saturated/neon edges. JPEG can do true 4:4:4 via `-sampling-factor 1x1x1`.
- **`magick -strip` removes the ICC profile too** and can shift colors. To keep color: use `cwebp -metadata icc`, or with ImageMagick simply omit `-strip` (the profile carries through; metadata overhead is negligible). Only strip when you've confirmed there's no meaningful profile.
- **cwebp wants 8-bit input** — convert 16-bit → 8-bit first.
- **WebP max dimension is 16383px.** For larger, downscale or tile (or use AVIF/JPEG).
- **macOS** ships `sips` (inspect/convert) for free; `magick`, `cwebp`, `avifenc` come from Homebrew (`imagemagick`, `webp`, `libavif`).
