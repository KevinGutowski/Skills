# Control patterns: making ordinary components feel special

## Contents

- What this is and where it came from
- Motion vocabulary
- One number is the state
- A trigger that morphs into its panel
- Gliding indicator
- Press acknowledgement
- Height that opens without measuring
- Rubber band, flick and snap
- Stacked fan
- Lift, tilt, drop
- Numbers and labels that change
- Clip-path fill
- Stagger from one keyframe
- Blur as the entrance material
- Hover with intent
- Proximity field
- Decaying energy
- Fast attack, slow release
- Small physics
- Page-level reveals
- Habits the good kits share
- Where to read real source

## What this is and where it came from

Patterns pulled from reading the example components of several component kits on 2026-11-18 (Arc UI's free MIT components in full, Bencho's free MIT blocks in full and its public notes on the rest, and the public pages of two others). They are the recurring moves that make a select, a slider, a toast or a tab bar feel made, not assembled. Values are starting points measured from that reading; tune them.

All code here is written for this library. It is original, short, and meant to be adapted. Snippets show the mechanism: anything that loops or starts on its own shows its stop condition and reduced-motion path, and for the rest add a `prefers-reduced-motion` rule that removes travel, as the shipping floor in SKILL.md requires. The JavaScript helpers and the CSS here are exercised by the checks in [../examples/](../examples/) (see its README): the hold-to-confirm recipe by a browser regression check, and the spring, rubber-band, landing and limiter helpers and the CSS snippets by a script that extracts them from this file. The longer sketches (proximity field, decaying energy) are not covered. For complete, working implementations to study, see "Where to read real source" at the end. Visual recipes (light, glass, grain, dissolves, shaders) are in [surface-recipes.md](surface-recipes.md). Everyday timing values belong to `web-design` (web-animation-design); what follows is the effect-level layer on top.

## Motion vocabulary

Values that recur across the kits read.

| Use | Value |
| --- | --- |
| Default ease-out | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Entrance, text reveal | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Exit | `cubic-bezier(0.7, 0, 0.84, 0)`, short |
| "Pop" with overshoot | `cubic-bezier(0.24, 1.34, 0.38, 1)`; raise the second number for more bounce |
| Panel widths | `cubic-bezier(0.32, 0.72, 0, 1)` |
| Micro and colour | 100–160 ms |
| Fades, label swaps | 150–220 ms |
| Layout moves, morphs | 300–480 ms |
| Large moves, charts | 600 ms |
| Settled spring (stiffness/damping) | 380/34; no-bounce "0.3 s" ≈ 305/35; "0.2 s" ≈ 685/52 |
| Lively spring | 500/18; dot pops 520/20 |
| Morph spring | 380/28 open; grow slower than shrink (about 0.3 s against 0.2 s) |
| Stagger | 30–70 ms per item, 40–60 ms per word, 80–100 ms per line; cap the total at 250–400 ms |

Bounce is reserved for elastic release and playful moments; structural moves use no-bounce springs. Opening is slower than closing almost everywhere.

A spring you can run yourself in a frame loop, when a library is not worth adding:

```js
// k: stiffness about 0.02–0.08, d: damping about 0.8–0.95, per fixed 1/120 s step, so 60 Hz and 120 Hz screens match
const STEP = 1000 / 120;
function springStep(s, target, dtMs, k = 0.035, d = 0.9) {
  s.acc = Math.min((s.acc ?? 0) + dtMs, 100);          // clamp: a background tab must not replay seconds of steps
  while (s.acc >= STEP) { s.v = (s.v + (target - s.x) * k) * d; s.x += s.v; s.acc -= STEP; }
  return Math.abs(s.v) < 0.001 && Math.abs(target - s.x) < 0.001;   // true when at rest: stop the loop
}
// s = { x: start, v: 0 }; call once per animation frame with the frame's real dt in milliseconds
```

## One number is the state

For any multi-part morph (pill to list, card to detail, chart mode), animate a single progress `p` from 0 to 1 and derive every size, position, radius and opacity from it. Parts that should start late use a window of `p`. Separate animations on x, y and rotation drift apart and read as sliding.

```js
const mix = (a, b, p) => a + (b - a) * p;
const clamp01 = (x) => Math.min(1, Math.max(0, x));
const windowed = (p, start, end = 1) => clamp01((p - start) / (end - start)); // late parts
const staggered = (p, i, n, spread = 0.4) => clamp01((p - (i / n) * spread) / (1 - spread));

function render(p) {
  panel.style.width = mix(240, 340, p) + 'px';
  panel.style.height = mix(48, 116, p) + 'px';
  content.style.opacity = windowed(p, 0.55);          // content arrives in the last 45%
  items.forEach((el, i) => (el.style.opacity = staggered(p, i, items.length)));
}
```

## A trigger that morphs into its panel

Selects, pickers, search fields, consent bars: the trigger grows into the panel instead of a panel appearing beside it.

- One absolutely positioned surface with `overflow: clip`. Animate its **measured** width, height and border-radius; get the target size from a hidden copy of the content or a `ResizeObserver`.
- Content sits at its final size inside and fades in late (150–200 ms after a 30–100 ms delay) and out early (100 ms).
- Grow in about 0.3 s, shrink in about 0.2 s, no bounce. If you want overshoot, keep the radius constant: an overshooting spring drags the radius below its target and the corners wobble.
- Draw the border as an overlay so it does not scale. Do not scale-press the element that anchors the panel; change its colour instead.
- Scale-based layout animation distorts text and corners. Animate real width and height here; it is one element, and it is worth the layout cost.

## Gliding indicator

Tabs, segmented controls, toolbars, radio cards: one highlight travels between items.

- A single pill positioned from the active item's measured rect (or a shared-layout element in Motion), on a 0.3 s no-bounce spring, under the labels (`isolation: isolate` on the group, the pill at `z-index: -1`).
- Pointer changes glide. Keyboard changes and window resizes jump: gliding after an arrow key feels laggy.
- First appearance fades in place; it does not fly in from the corner.
- The pill is a background, and forced-colours mode removes backgrounds and shadows, so all options look the same there. Give selection and focus **separate** cues: an underline for the selected item and an outline for focus (`@media (forced-colors: active) { [aria-pressed="true"] { text-decoration: underline 2px; } button:focus-visible { outline: 2px solid Highlight; } }`). If both use an outline, focusing the selected item shows nothing new.
- Use real tab roles only with panels and arrow-key navigation; for a plain choice, buttons with `aria-pressed` in a labelled group are correct.
- "Jelly" variant: two springs on scaleX and scaleY toward about 1.2, X stiffer and bouncier, Y softer and about 50 ms late, while neighbours dip to 0.95.

## Press acknowledgement

- `:active` scale 0.97 (down to 0.88 for small round buttons) in 100–120 ms; release on a spring or 260–340 ms ease-out.
- When the press opens something, start the expansion about 95 ms in, overlapping the shrink. Waiting for the shrink to finish leaves a dead gap.
- A switch thumb that widens while held (18 → 23 px with the far edge anchored) reads as squashing against the track.

## Height that opens without measuring

```css
.reveal { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 420ms cubic-bezier(0.22, 1, 0.36, 1); }
.reveal[data-open="true"] { grid-template-rows: 1fr; }
.reveal > .inner { min-height: 0; overflow: hidden; }
.reveal > .inner > * { opacity: 0; transition: opacity 160ms; }
.reveal[data-open="true"] > .inner > * { opacity: 1; transition-delay: 160ms; }  /* in late, out at once */
@media (prefers-reduced-motion: reduce) { .reveal, .reveal > .inner > *, .reveal[data-open="true"] > .inner > * { transition: none; } }   /* opens and closes at once */
```

Works for accordions, inline errors and expanding labels (use `grid-template-columns` for width). Keep the collapsed content out of the tab order (`inert` or `hidden` once closed).

## Rubber band, flick and snap

Sliders past their ends, sheets, carousels, swipe-to-dismiss.

```js
// Resistance past a limit: approaches ±`limit` px however far the finger goes. Accepts signed overshoot.
const rubber = (overshoot, limit = 120) => Math.sign(overshoot) * (limit * Math.abs(overshoot)) / (limit + Math.abs(overshoot));

// Where a flick would land: project the release velocity, then snap
function landing(pos, velocityPxPerS, stops, lookahead = 0.2) {
  const projected = pos + velocityPxPerS * lookahead;
  return stops.reduce((a, b) => (Math.abs(b - projected) < Math.abs(a - projected) ? b : a));
}
```

- While held, write the transform directly with transitions off. Spring only the journey home, starting from the hand's velocity.
- Sample velocity over the last 80–100 ms and treat it as zero if the last sample is older than about 60 ms.
- Dismiss thresholds: about 40% of the width, or 80–140 px, or a flick faster than 500–600 px/s. Rotate a thrown card by about 0.05° per pixel.
- At a keyboard limit, give the spring a small kick (150–260 px/s) so the key press still visibly lands.
- Use pointer events with `setPointerCapture`, start the drag after a 3–8 px slop, lock the axis, and set `touch-action: pan-y` on horizontally draggable things.

## Stacked fan

Toasts, card decks, notification piles.

- Collapsed: item at depth `d` sits at `translateY(calc(-14px * d)) scale(calc(1 - 0.05 * d))`, with `transform-origin` on the edge that peeks. Show three.
- Expanded (hover or focus within): each item moves to the sum of the real heights above it plus a 12 px gap. Spring about 320/30.
- Pause dismiss timers while expanded, and bridge the gaps with padding so the pointer crossing a gap does not collapse the stack.
- Hover alone is not a way in. Give the stack a real button with `aria-expanded` that pins it open, for keyboard, touch and assistive tech, and treat mouse hover as a shortcut on top (`pointerType === 'mouse'` only, or a tap opens and closes it at once). Hover never closes a pinned stack.
- Arc variant for cards and folders: rotate each card about a pivot far below it (`transform-origin: 50% calc(50% + 200px)`), a few degrees per card.

## Lift, tilt, drop

Reorderable rows, kanban cards, draggable tiles.

- On pointer-down: scale 1.02 and a deeper shadow (animate the opacity of a shadow pseudo-element, not `box-shadow`).
- While moving: tilt a few degrees from horizontal velocity.
- On release: spring (about 520/40) to the slot, which is where the gap currently is, not where the drag started.
- Reorder needs a keyboard path (a handle that takes arrow keys) and an announcement of the new position.

## Numbers and labels that change

- **Rolling digits:** one value per place-value column; each glyph's y, opacity and blur come from its wrapped offset to that value. `font-variant-numeric: tabular-nums`, a feathered mask top and bottom, direction from the sign of the change. Only changed digits move.
- **Text morph:** one span per glyph, keyed by character plus occurrence, so shared letters slide and new ones enter (scale 0.8, blur 4 px, 240 ms, 30 ms stagger). Keep the real string in a visually hidden sibling.
- **Label swap at stable width:** stack every candidate label in one grid cell (`grid-area: 1 / 1`) so the widest sets the width, or spring a measured width. New label in from +0.3–0.45 em with 2–4 px blur over 200 ms; old one out upward in 100–150 ms.
- **Hidden figures** (a balance toggle): keep the digits in place at opacity 0, blur 4 px, scale 0.6, and scale dots in over them with a 30 ms per-digit delay. Nothing reflows.
- **Ghost completion:** suggested words arrive 45 ms apart out of a 4 px blur; accepting changes only their colour, so the line never reflows.

## Clip-path fill

Hold-to-confirm, slider fills, before/after sliders. Duplicate the content in inverted colours and reveal the duplicate with `clip-path: inset()`, so text changes colour exactly at the moving edge.

```css
.hold { position: relative; touch-action: none; user-select: none; -webkit-user-select: none; overflow: hidden;
  padding: 12px 20px; border-radius: 12px; border: 1px solid var(--ink); background: var(--paper); color: var(--ink); font: inherit; }
.hold .fill { position: absolute; inset: 0; display: grid; place-items: center; background: var(--ink); color: var(--paper); pointer-events: none;
  clip-path: inset(0 100% 0 0); transition: clip-path 300ms cubic-bezier(0.22, 1, 0.36, 1); }   /* rewind */
.hold[data-holding] .fill { clip-path: inset(0 0 0 0); transition: clip-path 1200ms linear; }  /* fill */
.hold[data-armed] .fill { clip-path: inset(0 0 0 0); transition: none; }
@media (prefers-reduced-motion: reduce) {
  .hold .fill, .hold[data-holding] .fill { transition: none; clip-path: inset(0 100% 0 0); }   /* no wipe */
  .hold[data-armed] .fill { clip-path: inset(0 0 0 0); }                                         /* fill appears once armed */
}
```

```js
// Filling arms the button; the action commits only on release of the primary button, never while it is down.
const HOLD_MS = 1200;
const IDLE = 'Hold to delete', ARMED = 'Release to confirm';
const btn = document.getElementById('delete');
const labels = btn.querySelectorAll('[data-label]');           // both text layers: base and inverted fill
const result = document.getElementById('result');
let timer = null, activePointer = null, cancelled = false;
window.confirmCount = 0;

const setLabel = (text) => labels.forEach((el) => (el.textContent = text));
function disarmVisual() {                                       // stop the fill and the timer; keep tracking the pointer
  clearTimeout(timer); timer = null;
  delete btn.dataset.holding; delete btn.dataset.armed;
  setLabel(IDLE);
}
function disarm() { disarmVisual(); activePointer = null; cancelled = false; }
function confirmAction() { window.confirmCount += 1; result.textContent = 'Deleted'; }

btn.addEventListener('pointerdown', (e) => {
  if (!e.isPrimary || e.button !== 0 || activePointer !== null) return;   // one primary pointer, main button only
  activePointer = e.pointerId; cancelled = false;
  btn.setPointerCapture(e.pointerId);
  btn.dataset.holding = '';
  timer = setTimeout(() => { btn.dataset.armed = ''; setLabel(ARMED); }, HOLD_MS);
});
const isInside = (e) => { const r = btn.getBoundingClientRect(); return e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom; };
// While captured, every move comes here. Cancel for good if the pointer leaves the button (coming back does not
// re-arm), or if the main button is no longer held: with two buttons down, letting go of one is a pointermove.
btn.addEventListener('pointermove', (e) => {
  if (e.pointerId !== activePointer) return;
  if (!isInside(e) || (e.buttons & 1) === 0) { cancelled = true; disarmVisual(); }
});
btn.addEventListener('pointerup', (e) => {
  if (e.pointerId !== activePointer) return;
  const armed = 'armed' in btn.dataset && !cancelled;                      // a hold that left the button never commits
  const mainButton = e.button === 0;                                       // the release must be the main button's
  const inside = isInside(e);
  disarm();
  if (armed && mainButton && inside) confirmAction();
});
const cancel = (e) => { if (e.pointerId === activePointer) disarm(); };
btn.addEventListener('pointercancel', cancel);
btn.addEventListener('lostpointercapture', cancel);                        // capture taken away mid-hold
btn.addEventListener('contextmenu', (e) => e.preventDefault());            // a long press must not open a menu mid-hold
// Keyboard and assistive tech: a click with no pointer hold asks in a plain confirm step instead.
btn.addEventListener('click', (e) => { if (e.detail === 0 && window.confirm('Delete this item?')) confirmAction(); });
```

Completing the hold only **arms** the control and says so in text. Leaving the button at any point during the hold cancels it for good: the fill stops, the label returns to idle, and coming back before release does not re-arm or commit. A cancelled pointer does the same. Mark the inverted duplicate `aria-hidden`. Under reduced motion there is no wipe: the fill stays hidden while holding and appears at once when armed, with the same 1.2 s timing. Only the primary pointer's main button starts a hold, and only that button's release commits. With two mouse buttons down, letting go of one arrives as `pointermove`, not `pointerup`, so the recipe cancels there when the main button is no longer held, and on lost capture.

This recipe has been run: a complete page and a browser check are in [../examples/hold-to-confirm/](../examples/hold-to-confirm/) (`index.html`, `check.mjs`). The check covers a full hold, a short hold, a right-button hold, two chorded-button sequences, release outside the button, leaving mid-hold and returning, leaving after arming and returning, and reduced motion, and passed 21 of 21 in headless Chromium on 2026-11-18. Re-run it after changing the recipe.

## Stagger from one keyframe

Every piece runs the same keyframe; only a custom property differs. Reverse the index for the exit.

```css
.item { animation: rise 420ms cubic-bezier(0.16, 1, 0.3, 1) both; animation-delay: calc(var(--i, 0) * 40ms); }
@supports (order: sibling-index()) { .item { --i: calc(min(sibling-index(), 6) - 1); } }   /* CSS supplies the index; inline --i still wins */
@keyframes rise { from { opacity: 0; transform: translateY(8px); filter: blur(4px); } }
@media (prefers-reduced-motion: reduce) { .item { animation: none; } }   /* in place at once: no travel, no stagger */
```

`--i` is a plain number and the delay rule owns the unit. The `@supports` line supplies the number from `sibling-index()`, which counts from 1, so it subtracts 1; `min()` holds long lists at the sixth step. Without support, set `--i` inline, or the items enter together. For what `sibling-index()` counts and why `--i` must stay unitless, see `web-design` (web-animation-design → choreography, CSS stagger with sibling-index()). For grids, delay by row plus column, or by distance from the pressed cell, so the change ripples outward (a split-flap board uses about 45 ms per cell of distance).

## Blur as the entrance material

Text swaps, digits, skeleton to content: pair opacity with a small blur and a small move, and they read as focusing instead of fading. Blur 2–8 px (3–4 for words, 6 for cards), translate 6–10 px or 0.2–0.7 em, scale 0.92–0.97. Let the transform run longest, blur about 75% of it, opacity about 55%.

## Hover with intent

Hover cards and tooltips: open after about 500 ms, close after about 140 ms, and if another one opened within the last 300 ms, open in about 80 ms. Only one open at a time. Scale 0.96 → 1 with 4 px of travel from the trigger's side. Everything hover does, focus does too.

## Proximity field

Magnetic letters, dot grids that swell, sidebars and avatar rows that lean toward the pointer.

```js
const smooth = (u) => u * u * (3 - 2 * u);
function tick(now) {
  const dt = now - (last ?? now); last = now;          // let last; declared outside
  let moving = false;
  for (const it of items) {                       // it: {el, hx, hy (home centre), x:{x,v}, y:{x,v}}
    const dx = pointer.x - it.hx, dy = pointer.y - it.hy;
    const pull = smooth(Math.max(0, 1 - Math.hypot(dx, dy) / REACH)) * 0.25;   // REACH ≈ 160 px
    const restX = springStep(it.x, dx * pull, dt), restY = springStep(it.y, dy * pull, dt);
    it.el.style.transform = `translate(${it.x.x}px, ${it.y.x}px)`;
    moving ||= !(restX && restY);
  }
  if (moving) requestAnimationFrame(tick); else last = undefined;   // stop when everything is at rest
}
```

A decorative field of marks behind content (a hover texture) is the same idea with one sprung on/off weight multiplying every mark; its full anatomy, touch and focus behaviour are in [textures.md](textures.md).

Measure the home positions once and on resize, not per frame. Pick a "hovered" index from the pointer's fraction along the row, not from the element under the pointer, or it flickers as elements move. Off for coarse pointers and reduced motion.

## Decaying energy

Wakes behind a fast drag, trails, glyphs that warm along a path, fog that returns: keep one number per bar or cell, raise it where the pointer passes, and multiply everything by a decay each frame.

```js
// on pointer move: energy rises with speed
cells[i] = Math.max(cells[i], 1 - Math.exp(-speedPxPerS / 900));
// every frame (dt in seconds): decay, then draw
for (let i = 0; i < cells.length; i++) cells[i] *= Math.exp(-6.5 * dt);   // 3 / trailSeconds for long trails
bar.style.transform = `scaleY(${1 + 1.6 * cells[i]})`;
```

## Fast attack, slow release

Anything that follows hover, charge or audio feels better when it rises quickly and falls slowly.

```js
level += (target - level) * (1 - Math.exp(-(target > level ? 14 : 4) * dt));   // per second: 14 up, 4 down
```

Related: let the length of a press-and-hold scale what happens on release.

**Smoothing is not a flash limit.** A level that swings four times a second still swings four times a second after this filter, only less far. When the level drives the brightness of a large area (a voice glow behind a composer, a full-width meter), limit how often the rendered brightness may change direction:

```js
// Allows at most one brightness reversal every 250 ms: four reversals, so two flashes, per second.
const MIN_REVERSAL_MS = 250;
function limitReversals(st, wanted, nowMs) {          // st = { out: 0, dir: 0, lastFlip: -Infinity }
  const dir = Math.sign(wanted - st.out);
  if (dir !== 0 && st.dir !== 0 && dir !== st.dir) {
    if (nowMs - st.lastFlip < MIN_REVERSAL_MS) return st.out;   // too soon to turn round: hold
    st.lastFlip = nowMs;
  }
  if (dir !== 0) st.dir = dir;
  return (st.out = wanted);
}
// each frame: glow.style.opacity = 0.35 + 0.25 * limitReversals(st, level, performance.now());
```

A narrower swing on the large area looks calmer (the mapping above moves opacity within a quarter of its range), but it is a look, not a safeguard: a small change in opacity is not a small change in luminance. The rate cap is what keeps it inside the limit. Send the fast, full-range response to a small bar or ring. Then check it: log reversals per second while speaking quickly, in Explore as well as before shipping, because the flash limit applies in every mode.

## Small physics

Thrown, falling, sloshing and cloth-like things are usually a few dozen lines, not an engine.

- **Throw and bounce:** explicit Euler with gravity (1800–2200 px/s²), restitution about 0.4 at walls, a little per-frame damping.
- **Slosh:** the handle is rigid and a second, under-damped spring chases it for the fill; lean the fill's leading edge with a `clip-path` polygon.
- **Cloth and bands:** Verlet points with distance constraints, about 12 relaxation passes per frame; pin the held point.
- **Stacking tags:** a tiny rigid-body solver; the pointer is a repulsion field plus a share of its velocity.
- DOM elements receive only `translate` and `rotate` from their body, relative to where layout put them. Clamp `dt` to about 0.05 s so a background tab does not explode the simulation.

When collisions, joints or many bodies are the point, use a physics library (`creative-coding` has the threshold).

## Page-level reveals

- **Masked line reveal:** each line in an `overflow: hidden` wrapper, the text translated up from about 100%, 0.8–1.2 s on an expo-out curve, 80–100 ms per line. Split by line or word, never by letter, and keep the real text for assistive tech.
- **Edge clip wipe** for panels, banners and menus: `clip-path: inset(0 0 100% 0)` → `inset(0)`, about 0.8 s on a spring-like curve in, 0.3 s ease-in out. Add `round` to keep a radius.
- **Pinned scrubbed scene:** a tall wrapper with a `position: sticky` 100vh stage; every property is a pure function of scroll progress, so it reverses cleanly. Budget 100–150vh of scroll per beat. CSS scroll-driven animation does this without script where supported ([platform-techniques.md](platform-techniques.md)); under reduced motion, show the end state unpinned.
- **Panel lifts over a held hero:** sticky hero, the next section at a higher `z-index`, hero content moving at 10–20% of scroll.
- **Marquee:** duplicate the track, translate to −50% on a linear loop (30–120 s a pass), fade the edges with a gradient mask. It is automatic motion: pause it offscreen and give it a pause control when it ships.
- **Scripted demo:** a fake cursor operating a mock UI is one paused, repeating timeline that plays only while visible (moves 0.8 s, a click is scale 0.85 for 0.1 s).

## Habits the good kits share

- A reduced-motion branch in nearly every component: values jump, and only 100–160 ms fades remain.
- Native inputs under custom visuals (a real range input under a dial, real radios under glowing keys, one real text input under drawn code cells), so keyboard and assistive tech work without extra code.
- Frame loops that stop at rest, write styles directly instead of re-rendering, and clamp `dt`.
- Hover styling gated to fine pointers; pointer capture for drags; `touch-action` set deliberately.
- Dim unfocused items by mixing their colour toward the surface (`color-mix()`), not by lowering opacity, so overlapping items do not show through each other.

Where they are weaker, so check when borrowing: offscreen and hidden-tab pausing is rare, some hover effects are not gated for touch, and a few drag interactions have no keyboard equivalent.

## Where to read real source

Reading working code is the fastest way to learn these. Two of the kits publish theirs under MIT.

| Source | What is open | How to read it |
| --- | --- | --- |
| Arc UI, <https://uiarc.dev> | About 120 free components and 20 free blocks, MIT (React, CSS modules, `motion`, Radix) | Registry JSON at `https://uiarc.dev/r/<name>.json`, with a registry index beside it, docs at `/components/<name>/markdown`. Good ones to start with: morph-select, elastic-slider, toast-stack, text-morph, animated-counter, card-stack, bottom-sheet |
| Bencho, <https://bencho.dev> | About 40–50 free blocks, MIT (one TSX and one CSS file each, React 19, usually framer-motion); every block has a page at `/blocks/<id>` with a "how it works" note | Copy-paste from the block page or the GitHub repository. Good ones: toast stack, wake slider, slingshot, tilt card, dynamic island, folding bill, glass bubble |

MIT code may be copied into a project with its notice kept; adapt it to the project's palette and state. The paid tiers of both, and the other kits looked at (HorizonX, uberdesigner, Grainient), are licensed for use in products by subscribers and forbid republishing in kits or collections: learn from their public previews and descriptions, and do not copy their source or assets into this library or a project that has no licence. Details and dates are in [reverse-engineering.md](reverse-engineering.md).
