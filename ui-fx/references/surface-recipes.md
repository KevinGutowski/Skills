# Surface recipes: light, glass, grain, dissolves and small shaders

## Contents

- What this is
- What makes these look expensive
- Goo merge
- Edge light that faces the pointer
- Border beam in three layers
- Tilt card that dents
- Shimmer on images and text
- Progressive blur
- Frosted panel
- The dark gradient card
- Dials, bars and numerals
- Glow rules
- Gradients and grain
- Resolve from blobs
- Dissolve to grains
- Pour into a slot
- Page peel
- Wipe the fog
- Split-flap tiles
- Shader ideas worth knowing
- Performance and fallbacks

## What this is

Visual recipes drawn from the same reading as [control-patterns.md](control-patterns.md) (component kits studied on 2026-11-18). Each says what the layers are, which values matter, and where it goes wrong. Code is original to this library and deliberately small. Anything that loops shows its trigger, stop condition and reduced-motion path. The CSS in this file is taken from the gallery page in [../examples/gallery/](../examples/gallery/), which was rendered in headless Chromium and compared against the source kits on 2026-11-18; the canvas and shader sketches further down have not been run. Browser support and the base CSS, SVG-filter and WebGL mechanics are in [platform-techniques.md](platform-techniques.md); this file is the cookbook on top.

## What makes these look expensive

Rendered side by side with the kits they were learned from, the first versions of these recipes looked flat. The difference was never the effect itself. It was the surface underneath and the softness of the light. Six things closed the gap, and they apply to every recipe below:

1. **A surface is three things, not a border.** A hairline ring (white at 8%), a top highlight (white at 6–20% along the upper edge), and a two-distance shadow (a tight dark one and a wide soft one). One flat `border` reads as a wireframe.
2. **Light has an eased falloff.** A glow or beam whose mask goes from transparent to opaque in one step looks like a sticker. Use a long ramp with five to nine stops (6%, 25%, 60%, 100%, 60%, 25%, 6%).
3. **Light comes in layers.** A sharp stroke exactly on the edge, the same light blurred a little way *into* the surface, and a wide faint bloom outside. Any one alone looks cheap.
4. **Colour is parked; only the window moves.** Fix two to four hues around the box and reveal them through a moving mask. A gradient that itself spins reads as a loading spinner.
5. **Legibility is measured, not assumed.** Glass, gradients and glow change what is behind the text. Sample the rendered pixels behind each label and hold 4.5:1; a heading laid over imagery gets its own dark chip.
6. **Grain and tabular type finish it.** A faint noise overlay removes banding from dark gradients; tight tracking, tabular figures and a mono or distinctive face for big numbers make the content look designed.

```css
@property --beam-angle { syntax: "<angle>"; inherits: true; initial-value: 0deg; }
@property --h { syntax: "<number>"; inherits: true; initial-value: 150; }
:root {
  color-scheme: dark;
  --bg: #0c0c0d; --surface: #161617; --raised: #1c1c1e; --ink: #f4f4f5; --muted: #8b8b93; --faint: #5d5d66;
  --hair: rgb(255 255 255 / 0.08); --hair-strong: rgb(255 255 255 / 0.14);
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  /* surface: hairline ring + top highlight + two-distance shadow. Never a single flat border. */
  --ring: inset 0 0 0 1px var(--hair), inset 0 1px 0 rgb(255 255 255 / 0.06);
  --lift: 0 1px 1px rgb(0 0 0 / 0.5), 0 12px 32px -12px rgb(0 0 0 / 0.7);
}
```

A complete page with the recipes below rendered together, at whisper and signature levels, is in [../examples/gallery/](../examples/gallery/) (`index.html`). Open it in a browser and copy from it: it is the tested form of this file.

## Goo merge

Shapes that neck and fuse: liquid tooltips, droplets merging on pull-to-refresh, code cells fusing into a capsule.

```html
<svg width="0" height="0" aria-hidden="true"><filter id="goo">
  <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="b"/>
  <feColorMatrix in="b" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"/>
</filter></svg>
<div class="goo-layer" style="filter:url(#goo)"><!-- flat, same-colour shapes only --></div>
<div class="sharp-layer"><!-- icons and text, positioned over the shapes --></div>
```

- Blur 3–5; alpha multiplier 20–24 with an offset of −8 to −10. More blur fuses from further away.
- Text and icons never go inside the filtered layer: keep them on a sibling above.
- Drive it with one spring from 0 to 1 (the drop leaving its source). Sideways speed can "sag" the drop.
- Rotate the group, not the children. Keep the layer small; Safari pays for SVG filters.

## Edge light that faces the pointer

A card whose rim lights on the side nearest the cursor.

```css
.edge { position: relative; width: 300px; padding: 22px; border-radius: 22px; background: var(--raised); box-shadow: var(--ring), var(--lift); }
.edge::before, .edge::after { content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none; opacity: var(--lit, 0); transition: opacity 300ms ease; }
.edge::before { padding: 1px; background: radial-gradient(260px circle at var(--mx, 50%) var(--my, 0%), rgb(255 255 255 / 0.85), rgb(255 255 255 / 0.25) 35%, transparent 65%);
  mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0); }
.edge::after { background: radial-gradient(320px circle at var(--mx, 50%) var(--my, 0%), rgb(255 255 255 / 0.07), transparent 60%); }   /* faint wash on the face */
.edge h3 { margin: 0 0 4px; font-size: 15px; font-weight: 600; letter-spacing: -0.01em; } .edge p { margin: 0; color: var(--muted); font-size: 13.5px; }
```

Set `--mx` and `--my` from `pointermove` once per frame, and `--lit` to 1 on enter. The second layer is a very faint wash on the card's face under the pointer; without it the rim looks detached from the surface. For a grid of cards, set the variables on the container so neighbouring rims light together.

## Border beam in three layers

A stroke on the edge, an inner glow that bleeds into the surface, and a bloom outside, all revealed through one rotating conic window. The colours are parked radial gradients, so the hues stay where they are and only the window travels. Markup: a wrapper `.beam` holding two empty elements, `.beam-bloom` and `.beam-inner`, and the content in `.beam-body`; set `data-active` from the state it signals and remove it when the state ends.

```css
.beam { position: relative; border-radius: 20px; isolation: isolate; }
.beam > .beam-body { position: relative; z-index: 1; border-radius: inherit; background: var(--raised); box-shadow: var(--ring), var(--lift); }
.beam::before, .beam > .beam-inner, .beam > .beam-bloom::before {
  content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none; opacity: 0; transition: opacity 600ms ease;
  /* colour is parked: fixed hues around the box. Only the window moves, so it never looks like a spinning rainbow. */
  background:
    radial-gradient(60% 90% at 0% 0%, var(--b1, #ff6b8b), transparent 70%),
    radial-gradient(60% 90% at 100% 0%, var(--b2, #ffb86b), transparent 70%),
    radial-gradient(60% 90% at 100% 100%, var(--b3, #6bd6ff), transparent 70%),
    radial-gradient(60% 90% at 0% 100%, var(--b4, #9d7bff), transparent 70%);
  /* the window: a long eased ramp, never a hard edge */
  --window: conic-gradient(from var(--beam-angle), transparent 0 52%, rgb(0 0 0 / 0.06) 57%, rgb(0 0 0 / 0.25) 62%, rgb(0 0 0 / 0.6) 66%,
    #000 70%, rgb(0 0 0 / 0.6) 74%, rgb(0 0 0 / 0.25) 78%, rgb(0 0 0 / 0.06) 83%, transparent 88% 100%);
}
/* a. stroke: a 1px line exactly on the border */
.beam::before { z-index: 2; padding: 1px; mask: var(--window), linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask-composite: intersect, exclude; filter: saturate(1.3) brightness(1.5); }
/* b. inner glow: the same light bleeding a little way into the surface */
.beam > .beam-inner { z-index: 2; mask: var(--window), linear-gradient(#000, #000); mask-composite: intersect; filter: blur(14px) saturate(1.2);
  opacity: 0; clip-path: inset(0 round 20px); mix-blend-mode: plus-lighter; }
/* c. bloom: wide, faint light outside the box. The blur is on a wrapper and the mask on its child: a mask is applied after
   a filter on the same element, so blurring the masked layer itself can never spill past the mask's edge. */
.beam > .beam-bloom { position: absolute; z-index: 0; inset: -2px; border-radius: inherit; pointer-events: none; filter: blur(16px) saturate(1.3); }
.beam > .beam-bloom::before { padding: 10px; mask: var(--window), linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); mask-composite: intersect, exclude; }   /* a 10px ring of the same light */
.beam[data-active]::before { opacity: var(--stroke, 1); }
.beam[data-active] > .beam-inner { opacity: var(--inner, 0.42); }
.beam[data-active] > .beam-bloom::before { opacity: var(--bloom, 0.8); }
.beam[data-active] { animation: beam-turn var(--beam-seconds, 3.2s) linear infinite; }
@keyframes beam-turn { to { --beam-angle: 360deg; } }
.beam[data-level="whisper"] { --b1: #fff; --b2: #cfd3da; --b3: #fff; --b4: #cfd3da; --stroke: 0.6; --inner: 0.1; --bloom: 0.22; --beam-seconds: 5.5s; }
@media (prefers-reduced-motion: reduce) {
  .beam[data-active] { animation: none; }
  .beam::before, .beam > .beam-inner, .beam > .beam-bloom::before { --window: linear-gradient(#000 0 0); }   /* a still, even ring */
  .beam[data-active]::before { opacity: 0.5; } .beam[data-active] > .beam-inner { opacity: 0.05; } .beam[data-active] > .beam-bloom::before { opacity: 0.2; }
}
```

- **Whisper** is the same recipe in white and grey at low opacity and a slower turn (`data-level="whisper"`): the version to leave on a composer all day.
- **Blur the wrapper, mask the child.** On one element a mask is applied after the filter, so a blurred, masked layer is clipped at the mask's edge and no light leaves the box. The bloom is therefore a blurred wrapper around a masked ring. The first version of this recipe got that wrong and its "bloom" stopped 2 px outside the border.
- The three opacities (`--stroke`, `--inner`, `--bloom`) are the intensity dial. They fade in over 600 ms; do not pop them.
- Under reduced motion the window becomes a still, even ring at lower strength.
- As an idle decoration with no state, run a fixed number of turns and stop, or give it the pause control the floor asks for.

## Tilt card that dents

- Two springs on the normalised pointer position; rotate up to about 10° with `perspective: 800px` on the parent.
- Invert the sign so the card sinks away from the pointer: it reads as pressing a surface, where tilting toward the pointer reads as a hologram.
- A dark radial gradient at the pointer and a light one opposite give the dent; tighten the shadow as it sinks (for example 20px/44px blur down to 9px/24px).
- Holographic variant: tilt toward the pointer and slide a rainbow gradient across with `mix-blend-mode: color-dodge`. Keep any label on the card on a stable dark plate above the foil layers: the moving highlight otherwise passes behind the text and took a card's edition number to about 2:1. This is the cheap, DOM-level fake, right for a whisper or signature. For foil that has to look physical, see [holospot.md](holospot.md): it computes the colour from the angle of light and view, and its last section lists the ideas to borrow for a shader of your own.

## Shimmer on images and text

- **Image placeholder:** two overlapping linear gradients at slightly different angles (about 104° and 122°) and sizes, sliding over 2.4 s. One band looks mechanical; two look like light.
- **Text** ("Thinking…"):

```css
/* Still by default. It animates only while the element, or a parent, carries data-live: set that from the working state and remove it when the work ends. */
.shimmer { color: var(--muted); }
@supports (background-clip: text) or (-webkit-background-clip: text) {
  .shimmer[data-live], [data-live] > .shimmer { background: linear-gradient(100deg, var(--muted) 30%, color-mix(in oklab, var(--ink) 70%, var(--muted)) 44%, var(--ink) 50%, color-mix(in oklab, var(--ink) 70%, var(--muted)) 56%, var(--muted) 70%) 100% 0 / 300% 100%;
    -webkit-background-clip: text; background-clip: text; color: transparent; animation: shimmer-sweep 2.2s linear infinite; }
}
@keyframes shimmer-sweep { from { background-position: 100% 0; } to { background-position: -100% 0; } }
@media (prefers-reduced-motion: reduce) { .shimmer[data-live], [data-live] > .shimmer { animation: none; background: none; color: var(--muted); } }
```

The text stays real text. The sweep is gated on `data-live`: put that attribute on the element or its parent while the work runs and remove it when the work ends, and the text returns to a plain muted colour. Copied without the attribute it does not animate at all, which is the safe default.

## Progressive blur

Blur that deepens toward an edge (under a sticky header, at the bottom of a sheet): stack four to six `backdrop-filter: blur()` layers, each double the previous radius (1, 2, 4, 8, 16 px), each masked to its own feathered band with `mask-image: linear-gradient(...)`. Move the whole stack with a transform when it enters; clipping or fading the stack breaks the backdrop sampling.

For a text label over textured art, one slight layer under an eased fade is enough: `design-craft` (surfaces → Fading Over Texture: Add Blur).

## Frosted panel

```css
.glass { position: relative; width: min(330px, 100%); padding: 20px; border-radius: 24px; color: #fff;
  background: linear-gradient(180deg, rgb(22 22 34 / 0.58), rgb(14 14 24 / 0.66)); backdrop-filter: blur(18px) saturate(170%) brightness(0.85); -webkit-backdrop-filter: blur(18px) saturate(170%) brightness(0.85);   /* dark tint: white text keeps 4.5:1 over the brightest blob */
  box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.16), inset 0 1px 0 rgb(255 255 255 / 0.32), inset 0 -1px 0 rgb(0 0 0 / 0.2), 0 18px 40px -16px rgb(0 0 0 / 0.55); }
```

- A graded tint, a bright top edge, a faint dark bottom edge and a soft drop shadow are the four cues that make it read as a slab.
- **The tint decides legibility, so measure it.** A light tint (white at 10–16%) with white text looked right and measured as low as 1.8:1 over a bright backdrop. This recipe uses a dark tint and dims the backdrop slightly, which holds white text above 4.5:1 over the brightest blob in the gallery. For dark text on glass, do the reverse: a light tint at 60% or more. Check contrast from rendered pixels, because `backdrop-filter` is not in any computed colour.
- `saturate(170%)` in the backdrop filter is what stops glass looking grey.
- Never put `filter` or `opacity` on the panel itself, or its children lose the backdrop. Animate a wrapper's transform instead.
- Choose the tint by contrast arithmetic against the darkest and the lightest thing that can sit behind it, not by eye on one background.
- Behind it, a blob mesh (five blurred circles) with a grain overlay gives the glass something to refract; see "Gradients and grain".

## The dark gradient card

The look of premium dark widget kits, as a recipe.

- A near-black base. Two or three large radial gradients in a **single hue**, with the colour living at the edges and corners and the centre behind the main control left dark. Put the brightest colour where no small text sits (behind a control that has its own dark track, or an empty corner): white labels over the bright corner measured under 3:1.
- A 1 px inner border in white at 8–12% alpha, a faint top highlight, radius 28–36 px.
- Changing mode (cool, auto, heat) changes one hue variable and nothing else; transition it.
- White carries the data, darkness carries the hierarchy, and one small accent (a lime or amber) marks deltas and live dots.
- It goes wrong with a saturated centre (text contrast dies) or two hues in one card.

```css
.widget { --h: 150; width: min(268px, 100%); aspect-ratio: 1; border-radius: 32px; position: relative; overflow: hidden; color: #fff; isolation: isolate;
  background:
    /* colour lives where no small text sits: behind the segmented control (which has its own dark track) and in the lower right */
    radial-gradient(80% 62% at 96% -6%, oklch(0.62 0.17 var(--h) / 0.95), transparent 62%),
    radial-gradient(72% 62% at 104% 104%, oklch(0.5 0.15 calc(var(--h) + 18) / 0.9), transparent 60%),
    radial-gradient(60% 50% at 0% 0%, oklch(0.36 0.09 var(--h) / 0.7), transparent 70%),
    radial-gradient(50% 45% at 50% 50%, rgb(0 0 0 / 0.55), transparent 75%),      /* dark centre behind the control */
    oklch(0.2 0.03 var(--h));
  box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.1), inset 0 1px 0 rgb(255 255 255 / 0.22), inset 0 -24px 40px -24px rgb(0 0 0 / 0.5), var(--lift);
  transition: --h 500ms var(--ease-out); }
.widget::after { content: ""; position: absolute; inset: 0; z-index: -1; opacity: 0.22; mix-blend-mode: overlay; background-image: var(--grain); }   /* grain kills banding */
```

The tick dial is two layers of one repeating conic gradient: dim ticks all the way round, and brighter, longer ticks up to the value.

```css
.dial { position: absolute; inset: 8px 0 0; margin: auto; width: 160px; height: 160px; border-radius: 50%; display: grid; place-items: center; }
.dial::before { content: ""; position: absolute; inset: 0; border-radius: 50%;       /* ticks: one conic gradient, two brightnesses */
  background: repeating-conic-gradient(from -135deg, rgb(255 255 255 / var(--tick, 0.28)) 0 0.9deg, transparent 0.9deg 4.5deg);
  mask: radial-gradient(closest-side, transparent calc(100% - 13px), #000 calc(100% - 12px)), conic-gradient(from -135deg, #000 0 270deg, transparent 270deg);
  mask-composite: intersect; }
.dial::after { content: ""; position: absolute; inset: 0; border-radius: 50%; --tick: 1;    /* the lit arc, longer ticks */
  background: repeating-conic-gradient(from -135deg, #fff 0 0.9deg, transparent 0.9deg 4.5deg);
  mask: radial-gradient(closest-side, transparent calc(100% - 18px), #000 calc(100% - 17px)), conic-gradient(from -135deg, #000 0 calc(var(--value, 0.62) * 270deg), transparent 0);
  mask-composite: intersect; filter: drop-shadow(0 0 6px rgb(255 255 255 / 0.45)); }
.dial .core { width: 106px; height: 106px; border-radius: 50%; background: radial-gradient(circle at 50% 30%, rgb(255 255 255 / 0.08), transparent 60%), rgb(0 0 0 / 0.35);
  box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.1), inset 0 1px 0 rgb(255 255 255 / 0.18), 0 10px 24px -8px rgb(0 0 0 / 0.6); display: grid; place-items: center; text-align: center; }
.dial small { display: block; font-size: 10.5px; color: rgb(255 255 255 / 0.6); margin-bottom: -2px; }
.dial b { font: 500 40px/1 ui-monospace, "SF Mono", Menlo, monospace; letter-spacing: -0.04em; font-variant-numeric: tabular-nums; }
.dial b sup { font-size: 13px; vertical-align: top; position: relative; top: 4px; margin-left: 1px; color: rgb(255 255 255 / 0.7); letter-spacing: 0; }
```

## Dials, bars and numerals

- **Tick dial:** 60–80 ticks drawn as one repeating conic gradient masked to a ring (code above), not as elements. The active arc is white, longer and thicker; inactive ticks sit at about 25% alpha. A round knob marks the value on a dark inner disc with a hairline ring. Put a real range input underneath for keys and assistive tech.
- **Highlighted bars:** translucent pill bars at about 15% white, the selected one solid white, a thin trend line over them and one accent dot at the selection.
- **Numerals:** a large value in a distinctive face (dot-matrix, mono or a tight grotesque) in white, with units and labels at 60–70% alpha in a plain face. Tabular figures.
- **Glowing keys or tiles:** the lit tile gets a bright 2–3 px rim, an inner radial bloom and an outer glow that spills into the gaps; neighbours get a falloff by distance; hold label contrast at 4.5:1 at rest.

## Glow rules

- Glow is separate light added around a control, never a brighter fill.
- Fade any halo to nothing before the edge of its box or canvas; a square cut-off is the tell.
- Scale a neighbour's reaction by its distance from the active item.
- Dither wherever a dark gradient spans a large area, or it bands.
- Under reduced motion, keep the light and drop the movement.

## Gradients and grain

Six gradient constructions that cover most of what gradient libraries sell:

1. **Blob mesh:** five or six saturated blobs and one near-black, blurred by 10–20% of the width. Animate by moving the blobs slowly.
2. **Displaced surface:** a subdivided plane pushed around by noise and lit, with the camera zoomed in until only soft folds show (this is how the animated-gradient tools work; Paper Shaders or shadergradient do it for you).
3. **Dark field with one light event:** 85–90% near-black, one soft beam or corner bloom shifting between two hues, visible grain.
4. **Radial void:** a black disc with a feathered edge and radial streaks (noise stretched along the radius) in one hue.
5. **Pinwheel:** a conic gradient alternating two close tones, with the seams blurred.
6. **Dithered band:** a hot ramp along a wavy contour, quantised with an ordered dither at 2–4 px cells.

**Grain** hides banding and gives flat fills tooth.

```html
<svg width="0" height="0" aria-hidden="true"><filter id="grain">
  <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch"/>
  <feColorMatrix type="saturate" values="0"/>
</filter></svg>
```

Render that once into a small tile (a 200–300 px canvas exported to a data URL, or a PNG), then lay it over the surface with `background-repeat`, `mix-blend-mode: overlay` or `soft-light` at 8–15% on dark surfaces, `multiply` at 4–8% on light ones.

- Good grain is per-pixel at device resolution, luminance only, strongest in the midtones, and either static or re-seeded no faster than about 12 times a second.
- Bad grain is upscaled (blotchy), coloured speckle, grain that lifts pure blacks to grey, visible tile seams, or grain animated every frame (it shimmers and costs paint).
- Add grain at runtime. Baked into an image it multiplies the file size many times over.

## Resolve from blobs

An image that comes into focus out of soft colour, for generated or loading media. One SVG filter chain animated as a whole:

turbulence (`baseFrequency` about 0.006, 2 octaves) → displacement map (scale 32 → 0) → Gaussian blur (20 → 1.6 px) → a contrast curve (slope 2.4 → 1) pivoting on the page's paper white, not on mid-grey, so highlights do not blow out.

Animate the three numbers together over about a second. Keep the element small; this is a costly filter.

## Dissolve to grains

Delete or dismiss by blowing an element away.

```js
// grains: built once from a snapshot of the element drawn to an offscreen canvas
// each {x, y, color, t0, dx, dy}; t0 = (x / width) * 0.5 + Math.random() * 0.15   // windward side leaves first
function draw(ctx, grains, t) {                          // t: 0..1 over about 900 ms
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  for (const g of grains) {
    const u = Math.min(1, Math.max(0, (t - g.t0) / (1 - g.t0)));
    const e = 1 - (1 - u) * (1 - u);                     // ease-out
    ctx.globalAlpha = 1 - u * u;
    ctx.fillStyle = g.color;
    ctx.fillRect(g.x + g.dx * e, g.y + g.dy * e, 3, 3);  // 3 px grains
  }
}
```

Draw the not-yet-released part as the intact image, so only the leading edge is particles. Flatten any tilt before the snapshot. The element is already removed from the accessibility tree and focus has moved before the animation starts; the canvas is decoration.

## Pour into a slot

The "genie" move, for minimising something into a dock or tray: draw the snapshot in thin horizontal strips with `drawImage`, and interpolate each strip's left and right edges from the source rectangle to the slot. Strips nearer the slot lead. Bend the sides over the first half of the time and slide the body over the second half (overlap them around 40–50%).

## Page peel

A corner that curls back following the pointer. The whole state is one pull vector from the corner to the pointer.

- The crease is the perpendicular bisector of that vector.
- The page keeps the side of the crease away from the corner (`clip-path: polygon(...)`).
- The flap is the cut-off polygon mirrored across the crease, drawn above with the back-of-page colour and a linear gradient along the pull direction for the curl.
- A short pull springs back; past a threshold it completes. Reveal real content underneath, lazily loaded on first lift.

## Wipe the fog

Text or an image behind misted glass that the pointer wipes clear, and that clouds back: real content underneath; a canvas on top painted with a blurred copy or a flat mist; wiping stamps soft radial gradients with `globalCompositeOperation = 'destination-out'`; clouding back redraws the mist each frame at a small alpha, `1 - Math.exp(-3 * dt / secondsToReturn)`.

## Split-flap tiles

Each tile is two halves. The old top half rotates to −90° on an ease-in for half the step (a step is about 70 ms); the new bottom half falls from 90° on an ease-out. Cycle through three to eight intermediate characters before landing, and delay each tile by its distance from the pressed one (about 45 ms per cell) so the change ripples.

## Shader ideas worth knowing

One fragment shader each, driven by a single progress or pointer uniform. Sketches of the idea, to write in the project's own shader setup (or reach for ittybitty, Paper Shaders or a library in [effect-libraries.md](effect-libraries.md)):

- **Ink-bloom transition:** a circle growing from the press point, its radius perturbed by fbm noise for a ragged edge, a smoothstep edge, and a narrow band at the edge that offsets the sampling of both images so the front looks wet.
- **Silk wipe:** a soft edge with per-row noise; a band term `m * (1 - m) * 4` (zero at both ends, one in the middle) drives smear and channel separation only while the wipe passes.
- **Glass bubble:** a circle SDF; inside, sample the image slightly magnified; near the rim, push the sample outward along the normal with a steep falloff; sample red and blue at small opposite offsets for the fringe; add a rim light from the normal.
- **Metaballs:** sum `r² / d²` over the blobs per pixel and threshold with a smoothstep around 1; colour from a gradient lifted where the field is dense.
- **Holographic foil:** derive the colour from the grating relation between light direction, view direction and groove direction, not from time, so the rainbow moves correctly with tilt; count glints instead of averaging them; render bright and tone-map after ([holospot.md](holospot.md)).
- **Orb with presence:** a glass sphere (Fresnel reflection of a simple studio light) around an additive glowing volume with noise filaments, plus bloom faded before the canvas edge. Map agent states to two numbers (energy, swirl) and smooth them with fast attack and slow release. Thicken lines when it renders small.
- **Backlit keys or tiles:** a light position that follows the pointer over real inputs; press-and-hold duration scales a wave released on pointer-up.

## Performance and fallbacks

- Cap device pixel ratio at 2 and the render buffer at about 1100 px on the long side; drop resolution when frames exceed about 25 ms.
- Pause every loop offscreen and in hidden tabs, and stop it at rest.
- Every WebGL or canvas piece has a CSS or plain-image fallback that looks finished.
- Synthesised sound, haptics and clipboard writes fire only from trusted user events, and never without the user having opted into sound.
- The shipping floor in SKILL.md applies to all of these.
