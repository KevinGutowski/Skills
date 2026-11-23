# Textures: hover textures, and how to build your own

## Contents

- What it is and when to reach for it
- The free set, by what the pointer does
- Choosing one
- Installing and mounting
- Rules and traps
- Anatomy of a good hover texture
- Building an original one
- What its agent surface teaches
- Staleness and look it up

*Source: textures.dev (home page, `llms.txt`, `llms-full.txt`, <https://textures.dev/agents.md>, <https://textures.dev/skill.md>, the `beam` markdown twin, <https://textures.dev/r/registry.json>, <https://textures.dev/r/beam.json>, `/api/textures`) and the MIT repository `Textures-dev/textures` (README, CONTRIBUTING, CHANGELOG, file tree), read 2026-11-22. The MCP server was not called. Provenance: [sources.md](sources.md). Fold map: `docs/textures-source-mining-2026-11.md`.*

## What it is and when to reach for it

A **hover texture** is a field of simple marks (hairlines, bars, dashes, dots, small squares, circles) that rests as a quiet pattern and answers the pointer: the marks near it swell, part, gather, turn, rise or fill, and settle back when it leaves. Textures sells a catalogue of them, about 40 at the time of reading, three new each week. Each one is a single self-contained React file, `components/textures/<slug>.tsx`, that uses no Tailwind and depends on nothing but React. The 12 free ones are MIT (`Textures-dev/textures`); the rest are Pro (from $9 a month, `LicenseRef-Textures-Pro`).

It is the **Atmosphere** and **Touch** moments in one element ([effect-ideation.md](effect-ideation.md)): a hero, header, panel, pricing or feature card, empty state or section background that should feel designed and alive and not flat, and that reacts to a real driver (the pointer) instead of looping. At the dial ([SKILL.md](../SKILL.md)) most of them sit at **whisper** or **signature**: mono ink on the page background, with motion only where the pointer is.

Reach for something else for:

- **A loud, coloured or per-pixel field** (mesh gradient, grain, god rays, liquid): [ittybitty.md](ittybitty.md) or Paper Shaders in [effect-libraries.md](effect-libraries.md).
- **A static pattern tile** with no motion: `frontend-design` (visual-execution, Repeating SVG patterns).
- **Controls that lean toward the pointer** (a nav row, avatars, letters): the proximity field in [control-patterns.md](control-patterns.md).
- **Tooltips, menus, button colour states, route transitions, scroll reveals, loaders**: not hover textures. The vendor's own skill excludes them too.

## The free set, by what the pointer does

Each free Texture shows a different response a field of marks can have. The descriptions are ours; the slugs, families (lines, grids, circles), moods and use cases are the vendor's.

| Slug | Marks at rest | What the pointer does | Mood · fits |
| --- | --- | --- | --- |
| `beam` | 51 full-height hairlines | Lines under it widen into bars (up to 16 px) on a Gaussian, and their neighbours slide aside to make room. The field moves like a lens | calm · background, hero, card |
| `settle` | 20 columns of short bars, denser toward the floor on one side and the ceiling on the other | Bars gather toward the pointer along their own column, then relax | calm · hero, background |
| `swell` | 18 columns of hairline dashes | Dashes thicken up to 4× in a diamond-shaped bump that squeezes the neighbours; the stack keeps equal gaps | playful · hero, background, card |
| `blinds` | 27 thin lines | Each line turns like a ribbon about its centre, face-on under the cursor; the gaps open as tapered spindles | bold · hero, background, card |
| `cells` | A grid of cells, each with a small square | Squares swell to fill their cells in a soft dome that trails the pointer | calm · hero, background, image tile |
| `pinch` | The same grid, each cell full | The inverse: squares shrink to the smallest unit in a dome | calm · hero, background, image tile |
| `warp` | Small rectangular tiles | Columns widen and rows deepen by horizontal and vertical distance, so tiles stretch into squares, bars and dashes | bold · hero, background, image tile |
| `magnet` | A field of small dots | The 25 nearest dots leave their cells and snap into one solid block under the pointer; the field leans toward it out to about 11 cells | playful · hero, background, card |
| `twist` | Cells, each with a thin upright bar | Every bar turns to point at the pointer and is thickest when it lies on the cursor's row or column: a cross with a twist in each quadrant | bold · hero, background, card |
| `watch` | Dim round cells, each with a small dot | Dots fill their cells near the pointer and turn toward it: a field of eyes, rippling outward | playful · hero, background, card |
| `lift` | Small containers, each with a circle resting in a corner | Circles slide toward the pointer inside their containers, with a wide reach | playful · background, hero, card |
| `pillars` | Rows of white-capped cylinders, back to front | Cylinders rise in a smoothed pyramid under the pointer, bodies showing between the caps | playful · hero, background, card |

Pro names worth knowing as vocabulary, from the public one-liners only: `glow` (the bar under the pointer lights up and the cells around step down whole cells at a time, not on a smooth curve), `tiles`, `gaze` (dashes turn to look at the pointer, ink falling away 10% per cell), `bloom` (a diamond lattice grows into four-point stars), `quatrefoil`, `ripple`, `dither`, `sphere`, `gears`, `orbit`. Their code is behind the paywall; see the rules below.

**The design space, as a grid.** Every Texture here is one choice from each column, so this is how to invent a new one (see "Building an original one"):

| Mark | Property the pointer changes | Shape of the falloff | Coupling |
| --- | --- | --- | --- |
| Hairline, bar, dash, dot, square, circle, cylinder, cross | Thickness, length, scale, fill, rotation (turn to face), position (gather, part, snap), height (pseudo-3D), ink | Gaussian lens, smoothstep dome, diamond (by row and column distance), whole-cell steps, nearest-N | Independent marks; neighbours make room (beam, swell); marks constrained to a column or a container (settle, lift); inverse pairs (cells/pinch, blinds/curtain) |

## Choosing one

- **Match the mood to the surface.** Calm (beam, settle, cells, pinch) for a product's own hero, docs or pricing; playful (magnet, swell, watch, lift, pillars) for a landing page, empty state or portfolio; bold (warp, twist, blinds) where the texture is the subject.
- **Match the marks to the brand's world**, as with a static pattern: hairlines and bars read as measurement, data, a barcode or a scan; dots and cells read as a pixel board, an LED field or halftone; cylinders read as an architectural model. A field that has nothing to do with the product is stock.
- **One family per page.** The vendor pairs Textures by family because they share tokens and rhythm (Beam with Settle and Swell; Glow with Pinch and Twist). Two different families side by side compete.
- **Size.** Every one keeps a 732 × 516 design panel, covers its host by default (`contain` is available), and stays static below 160 × 112 px. They are not for icons or buttons smaller than that.
- **Search the catalogue by words.** `/textures?q=<words>&category=&tag=&light=1&sort=…` on the site, the same query at `/api/textures` as JSON, or `search_textures` on the MCP server. Each entry carries aliases (beam: lens, focus, barcode, scan), use cases, a mood, a numeric intensity (2 or 3 across the free set; the scale is not documented) and a one-line "what moves".

## Installing and mounting

The free set needs no account and no key. Install one, any of three ways; all write the same file:

```sh
npx shadcn@latest add https://textures.dev/r/beam.json      # no components.json needed
npx shadcn@latest add Textures-dev/textures/beam            # from the MIT repo
npx shadcn@latest add @textures/beam                        # after mapping "@textures": "https://textures.dev/r/{name}.json" in components.json
```

This skill's dependency rule still applies: a Texture is a new file in the project, so in a shipped codebase install it on a go-ahead and otherwise show the command (workflow step 6 in [SKILL.md](../SKILL.md)). When the command cannot run, fetch `https://textures.dev/s/<slug>.md` (or the page with `Accept: text/markdown`) and write the file under its Code heading exactly as given.

Every Texture takes three props: `tokens` (`--texture-ink` for the marks, `--texture-field` for the panel; they default to the shadcn `--foreground` and `--background`, so light and dark themes work with no setup), `className`, and `static` (draws the resting frame and never animates).

Two mounts:

- **Contained** (a card, tile, panel): the host has `position: relative`, a size (for example `aspect-ratio: 732 / 516; width: 100%`), `overflow: hidden`, and holds the Texture plus an `sr-only` label if the tile has no other name.
- **Behind content** (a hero or section): the Texture fills a `position: absolute; inset: 0` layer under the content. Decide whether it should react. The vendor's markdown recipe puts `pointer-events: none` on the texture layer, which makes it ignore the pointer. Its README hero does the opposite: the texture takes the pointer and the content layer above it is `pointer-events: none`. If you use the README version, set `pointer-events: auto` again on every link, button and input in the content. This is the floor's exception for pointer-reactive backdrops ([SKILL.md](../SKILL.md), "The UI underneath still works"). The texture may take the pointer only while every control above it still receives clicks and focus.

Suggested commit, the vendor's convention: `feat: add Beam hover texture (textures.dev/s/beam)`. The file's header comment also names its source. Keep both, so the project's history says where the texture came from.

## Rules and traps

- **Never set width or height on the Texture; size the host.** The Texture fills whatever box it gets and never sizes it. A host with no height collapses: the file sets a 240 px minimum height on itself as a safety net, and that is not a layout.
- **Install, do not imitate.** A hand-written copy of a named Texture is worse than the file and drifts. If a user names a Texture, install it.
- **A Pro Texture without access stops there.** The markdown twin, registry and MCP answer with the price and `https://textures.dev/checkout?texture=<slug>`. Tell the user and stop: do not retry, guess the code or rebuild it from the preview. This is the same rule as [reverse-engineering.md](reverse-engineering.md) ("do not go behind a login or a paywall"). A token-bearing link (`/s/<slug>/<token>.md`) from the user's own Copy to Agent prompt is access; dropping the token from the path is why an agent sees the paywall text.
- **Ambient on touch breaks the five-second rule as shipped.** On screens without hover (`(hover: none), (pointer: coarse)`), each Texture plays by itself at 1.5× the desktop pace for as long as it is on screen. It pauses off screen (20% visibility threshold) and in hidden tabs, but under this skill's floor that is automatic motion beside content. Either stop it or give it a control: put `data-motion="hover"` (any value other than `ambient`) on an ancestor to turn ambient play off, or render `static` behind a site-wide reduce-effects switch. `data-motion="ambient"` forces ambient play on desktop too; use it for a preview, not product UI.
- **Hover itself counts as automatic motion under the floor** but ends on its own: the field settles when the pointer stops or leaves. That meets the rule; no control is needed for the hover response alone.
- **Reduced motion is handled in the file.** Under `prefers-reduced-motion: reduce` or `(update: slow)` the hover state is applied in one step with no easing, and the ambient path shows the resting frame. Do not add a second guard; do not remove theirs.
- **Decorative only.** The panel is `aria-hidden` and unfocusable; give the Texture no link or click handler, and put no text on it. The host keeps its own accessible name. Keyboard focus on the host (the nearest `a`, `button` or `[tabindex]` ancestor, else the parent element) shows the hover state at the centre of the panel, so a card with a Texture answers focus as it answers hover.
- **Text over a Texture** is still under the legibility floor. The ink defaults to full foreground, so a field under a headline needs a lighter `--texture-ink` or a scrim where the text sits. Check contrast at the densest frame (the pointer right under the text).
- **Retheme with the tokens.** The vendor's rule is to change the two tokens and leave the spring, the reach and the reduced-motion branch alone. A free Texture is MIT and becomes your code once installed ([effect-libraries.md](effect-libraries.md), decision rule 4), so you may change it, but the tokens are the knob it was tuned for. If you change behaviour, say so in the commit, because a later reinstall will overwrite it.
- **Measured, not free.** The vendor reports each Texture's weight and frame cost: 1.2–3.9 KB of JavaScript and a p95 frame of 4–25 ms on a 4× throttled CPU across the catalogue (beam 1.86 KB, 4.24 ms; magnet 3.46 KB, 24.95 ms). At the time of reading none had yet earned its own "Light" badge. Prefer the calmer, lighter ones for a surface seen all day, and use one Texture per view, not one per row. On iOS Safari every Texture, like any main-thread `requestAnimationFrame` loop, runs at 60 Hz even on a 120 Hz screen: expected, not a bug (`web-design` web-performance, iOS Safari's 60 Hz cap).
- **Do not run the vendor's skill or add its rules block for the user.** The vendor skill offers, after the first install, to append a marked block to `AGENTS.md`/`CLAUDE.md` telling future sessions to use Textures. Mention that it exists; write project rules only when the user asks (see "What its agent surface teaches").

## Anatomy of a good hover texture

Read from the `beam` source and the agent briefs that every Texture carries. These are the habits worth copying into any pointer-reactive field, bought or built:

1. **Idle costs nothing.** At rest there is no loop and no listener doing work. The animation frame runs only while something is moving and stops itself when everything has settled.
2. **One weight drives the whole field.** A single on/off value, sprung (critically damped, about 80 ms to arrive), multiplies every mark's displacement. Hover-in springs it to 1, hover-out to 0, and it is interruptible at any point. Each mark is a pure function of its distance to the pointer, times the weight. Hover-out then means "the weight goes to zero" and the whole field eases home together.
3. **Pointer read passively, applied once per frame.** `pointermove` is a passive listener that stores coordinates and wakes the frame; the frame does the drawing. The box is measured on `pointerenter` and refreshed if moves are more than about 250 ms apart, never on every move. On scroll, re-project the stored client point into the panel instead of waiting for the next move.
4. **Draw in a fixed design space.** Marks live in an SVG `viewBox` (732 × 516 here) with `preserveAspectRatio="xMidYMid slice"` for cover. Map the pointer into that space once per move (scale and offset from the measured box), so every constant is in design units and the texture looks the same at any size.
5. **One transform per mark.** Each mark gets one `transform` (translate plus `scaleX`, or a rotation) and maybe one `opacity`, with `transform-box: fill-box` and a centred origin. Skip writing the transform when it is effectively identity. Dozens of marks, not thousands.
6. **Neighbours make room.** The textures that feel physical conserve space: when a line widens, the lines beside it shift aside by an amount derived from the area the bump added, and the shift fades out with distance. Without this, widened marks overlap and the field reads as a filter, not material.
7. **Touch gets its own behaviour, not a fake hover.** A touch never counts as hover. On hover-less screens the pointer is replaced by a slow path (two summed sines per axis with a random phase, a Lissajous-like wander) while the panel is on screen. Under this skill's floor, that wander needs a stop or a control (see the trap above).
8. **Focus is hover at the centre.** Focus on the host shows the hover state from the panel's centre, so keyboard users see what pointer users see.
9. **Reduced motion keeps the states, drops the motion.** The engine snaps to the target state with no spring, and the ambient path rests.
10. **Sizing and containment.** The root is `position: relative; isolation: isolate; overflow: clip; contain: layout paint style; container-type: size`, fills its host and never sizes it. A minimum size (160 × 112) below which it stays static, because the pattern stops reading.
11. **Two tokens, theme-native defaults.** Ink and field as CSS custom properties defaulting to the design system's foreground and background. Nothing else is themable, which keeps every Texture on brand in both themes with no work.
12. **Synthetic events are a demo hook.** An untrusted `pointermove` (a scripted demo cursor) holds the ambient path off for a second, so a preview can drive the field without fighting the wander.

## Building an original one

When nothing in the catalogue fits, or the project is not React, build one from the grid above: pick a mark, the property the pointer changes, a falloff and a coupling. Give it the product's own marks (a ledger's ruling, a sound app's waveform bars, a map's contour dashes) and it stops being stock. The skeleton, original to this library:

```js
// marks: [{el, x, y}] in design units; W, H = viewBox size; REACH in design units
const K = 30;                                                   // spring rate: settles in about 0.25 s; raise for snappier
// Critically damped spring, solved exactly for any dt, so a slow or dropped frame cannot make it overshoot or blow up.
function stepWeight(s, target, dt) {                            // s = { w, v }; returns true when at rest
  const off = s.w - target, lead = s.v + K * off, decay = Math.exp(-K * dt);
  s.w = target + (off + lead * dt) * decay;
  s.v = (s.v - K * lead * dt) * decay;
  if (Math.abs(s.v) < 0.01 && Math.abs(s.w - target) < 0.01) { s.w = target; s.v = 0; return true; }
  return false;
}
const spring = { w: 0, v: 0 };
let target = 0, px = W / 2, py = H / 2, box, frame = 0, last = 0;
function tick(now) {
  const dt = Math.min(last ? (now - last) / 1000 : 1 / 60, 1 / 30); last = now;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rest = reduced ? (spring.w = target, spring.v = 0, true) : stepWeight(spring, target, dt);
  for (const m of marks) {
    const d = Math.hypot(px - m.x, py - m.y);
    const k = Math.exp(-(d * d) / (REACH * REACH)) * spring.w;  // Gaussian lens; swap for a dome or whole-cell steps
    m.el.style.transform = k > 0.001 ? `scale(${1 + 3 * k})` : '';
  }
  frame = rest ? (last = 0, 0) : requestAnimationFrame(tick);
}
const wake = () => { if (!frame) frame = requestAnimationFrame(tick); };
root.addEventListener('pointerenter', () => { box = svg.getBoundingClientRect(); });
root.addEventListener('pointermove', (e) => {
  if (e.pointerType === 'touch') return;                        // touch is not hover
  const s = Math.max(box.width / W, box.height / H);             // cover, like preserveAspectRatio slice
  px = (e.clientX - box.left - (box.width - W * s) / 2) / s;
  py = (e.clientY - box.top - (box.height - H * s) / 2) / s;
  target = 1; wake();
}, { passive: true });
root.addEventListener('pointerleave', () => { target = 0; wake(); });
```

Add the rest of the anatomy before it ships: refresh the box on resize and scroll, focus as hover at the centre, a static path below a minimum size, the IntersectionObserver and `visibilitychange` pause, and the two tokens. For touch, either leave it still (the simplest choice that meets the floor) or add a wander with a stop after five seconds. Proximity fields over real controls, and the "pick the hovered index from the pointer's fraction" trick, are in [control-patterns.md](control-patterns.md).

## What its agent surface teaches

Textures is designed for coding agents first, and the way it does it is a worked example for `devtools` (agent experience, data-viz-and-agents). For this skill, three habits carry over to any effect library we add:

- **One file, one command, exact.** Each Texture is installable as a shadcn registry item, and its markdown twin carries the same code with "write the file exactly; do not recreate". The repository is generated from the catalogue, and the changelog records the first eight characters of each file's SHA-256 (`shasum -a 256 components/textures/<slug>.tsx`), so the copy a project has can be checked against the published one.
- **A fixed brief per item.** Every Texture's markdown has the same five sections: what it is, a behaviour timeline (idle, hover-in, move, hover-out, reduced motion, touch), integration, what may be customised, and accessibility. Its metadata line adds triggers, touch mode, a reduced-motion mode (`simplified` or `static`), aliases, use cases, measured weight and an estimated token count. That brief is a good template for describing any effect built through this skill.
- **Consent before writing project rules.** The vendor skill asks exactly once whether to add a four-line marked block (`<!-- textures:start -->`…`<!-- textures:end -->`) to the project's existing `AGENTS.md` or `CLAUDE.md`. It writes nothing before a yes. An explicit no means never asking again in the session; no answer is not a no. It appends at the end, never creates a second rules file, and removing it is deleting the marked block. This skill does not make that offer, but if a user asks for project rules about effects, follow the same shape.

## Staleness and look it up

Captured 2026-11-22, about a week after the free set was published (2026-11-17 and 18). The catalogue grows weekly, Pro prices and the free/Pro split can change, measured weights are per version, and the vocabulary page the `llms.txt` points to (<https://textures.dev/agents.md>: Displace, Clear, Glow, pattern families, fit, Light) did not contain those definitions when read. Trust the live markdown twin over this file.

- Catalogue for agents: <https://textures.dev/llms.txt> · every twin with the free code: <https://textures.dev/llms-full.txt>
- One Texture: `https://textures.dev/s/<slug>.md` · registry: <https://textures.dev/r/registry.json>
- Agent setup (MCP for Claude Code, Cursor, Codex; shadcn): <https://textures.dev/agents>
- The free set and its licence: <https://github.com/Textures-dev/textures>
