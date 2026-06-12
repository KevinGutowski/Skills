# Why it works (theory backstop)

Background theory for when OKLCH results need explaining or debugging at the color-science level. Source: Dan Hollick, *Making Software*, makingsoftware.com/chapters/color-spaces-models-and-gamuts (quotes verbatim).

## What a color space actually is

A color space is defined by exactly three things: the **chromaticities** (CIE XYZ coordinates) of the primaries, the **white point**, and the **gamma / transfer curve**. "These values give meaning to our RGB values. Pure green (0, 255, 0) in our color space now refers to that specific green color defined by the chromaticity values we set. If we had different chromaticities, the RGB values would refer to different colors." This is why `rgb(0 255 0)` in sRGB and in Display P3 are *different physical colors*.

## Color model ≠ color space

RGB-cube vs HSL-cylinder vs LCH is a **color model** choice, not a color space change: "The primaries and the white point haven't changed, and therefore neither has the gamut. Instead it's just a different geometric arrangement of the colors." OKLCH is the polar (cylindrical) arrangement of oklab — same space, friendlier handles.

## Gamma's dual origin

Gamma correction exists for two stacked reasons:

1. **CRT legacy** — CRTs had a non-linear response ("the brightness emitted was a power function of the input voltage"), so the inverse curve was baked into signals.
2. **Perceptual bit allocation** — we're more sensitive to dark-tone differences, so a compressive curve "allocates more data (in this case, bits) to the darker tonal range, where our eyes are more discerning, and fewer bits to the brighter range." That's what lets 8-bit/channel avoid visible banding; linear encoding would need 12–16 bits.

Standard gamma targets:

| Gamma | Where |
| --- | --- |
| 2.2 | Standard display gamma for most computer monitors |
| 1.8 | Older Mac OS (pre-OSX 10.6) |
| 2.4 | BT.1886 (HDTV), for dimmer viewing environments |
| 2.6 | DCI-P3 digital cinema — darker, more saturated, for dark theaters |
| 1.0 (linear) | Raw files / image processing math; "perceptually inefficient for storage and display at lower bit depths" |

## Gamut mapping: clip vs compress

When a color exceeds the display gamut, software must map it in. Most software just clips to the nearest gamut boundary — fast, but "results in a loss of detail - you end up with a lot of previously distinct colors that collapse into the same boundary color." Compression algorithms that adjust *all* colors to preserve relationships exist but are expensive, "mainly used in high-end applications like professional photo editing software." This is why a carefully spaced OKLCH ramp can flatten at the vivid end on an sRGB screen.

## The chroma-peak trap (verbatim)

"The chroma peaks are also relative to the hue and lightness so you can't actually be sure that there will be an equivalent chroma in a different hue. You can see this problem with green, which has the highest chroma." … "If you aren't aware of this, you can end up picking colors that are out of gamut without realising it and blaming oklch for looking bad. In reality, you're still at the mercy of your display's gamut." (E.g. chroma 0.16 has equivalents across hues; 0.26 has "almost no other hues that can match that chroma and lightness combination in the P3 gamut.")

## White points: D50 vs D65

- **D50 (5000 K)** — "warmer horizon daylight … Used as the standard white point for graphics and print."
- **D65 (6500 K)** — "average noon daylight and is the most commonly used white point, especially for digital displays. It's the white point used in sRGB, Rec. 709 and 2020."

So print-proofing and screen work disagree about what "white" is by design.

## Bit depth drives color count, not gamut

Number of distinct colors "is actually a function of the bit depth," not the gamut: 8-bit sRGB = 256³ ≈ 16.7M colors; 10-bit = ~1.07B *in the same gamut*. "Both the rgb(0-255) and hex #RRGGBB formats are constrained to 8 bits per channel" — `oklch()`/`color()` are not. 10-bit is the minimum for HDR.

## DCI-P3 vs Display P3

Not the same space: "the film industry uses the DCI-P3 color space, but for digital application we use Display P3 … They have the same gamut but different white points and gammas, with DCI-P3 using a warmer white point to match the characteristics of digital cinema projectors." CSS `display-p3` is the D65/sRGB-curve variant.

## Banding and dithering

Quantizing to lower bit depth "can result in some banding … To compensate, we add some dithering to the image which is basically just adding small amounts of noise to make the banding seem less obvious." Relevant to subtle OKLCH gradients on 8-bit displays — noise/grain is the legitimate fix.

## History credits

- **sRGB (1996)**: "Microsoft and Hewlett-Packard banded together" to make a web/device standard; "They modelled the color space around the phosphor colors of typical CRT monitors at the time, so that they wouldn't need calibration."
- **oklab (2020)**: "Björn Ottosson introduced oklab, and it's related color space oklch" — a perceptually uniform space simple enough to compute in real time. OKLCH is its polar form.
