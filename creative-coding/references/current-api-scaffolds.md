# Current-API Scaffolds

Minimal correct starting points for the runtimes this skill is most often executed in. They exist because the source books predate these APIs and the usual agent failure is fluent, outdated syntax: p5.js 1.x `preload()` in a 2.x sketch, a blurry canvas on a high-density display, simulation speed tied to refresh rate, an unseeded sketch nobody can reproduce.

These are library-written worked scaffolds, not quotations from Shiffman, *Generative Design*, or any vendor doc. The rules for *what* to build stay in [../SKILL.md](../SKILL.md); this file only covers *how to start it* on a current runtime.

## Contents

- Verification status
- Pick the runtime
- Seeded randomness (do this first)
- p5.js 2.x — global mode
- p5.js 2.x — instance mode
- p5.js 1.x to 2.x traps
- Canvas 2D — density-correct sizing
- Canvas 2D — fixed-timestep loop
- three.js — minimal scene
- Before prescribing syntax

## Verification status

Checked 2026-11-12 against live documentation and, where a row says so, the published npm package source. Versions move; re-check the package version in the project before copying anything version-specific.

| Claim | Checked against | Status |
| --- | --- | --- |
| npm `p5` latest is 2.4.0; 2.x is the default on p5js.org and in the web editor; 1.x docs live at v1.p5js.org and are no longer the default | npm registry; `processing/p5.js-compatibility` README | Verified |
| `preload()` is replaced: `load...()` functions return promises, used with `async function setup()` and `await` (or callbacks); a `preload.js` compatibility add-on restores 1.x behaviour | `processing/p5.js-compatibility` README; p5js.org `loadImage()` reference | Verified |
| Instance mode is `new p5(sketch, node)`; `sketch` takes one parameter `p`; `node` is an element or an element id | p5js.org `p5()` reference | Verified |
| `randomSeed(n)` fixes `random()` and `randomGaussian()` across runs | p5js.org `randomSeed()` reference | Verified |
| Assigning an `async` function to `p.setup` in instance mode | `p5@2.4.0` package source: the setup step runs `await context.setup()`, where `context` is the instance in instance mode | Verified in source |
| `noiseSeed(n)` fixes `noise()` across runs | `p5@2.4.0` package source: the noise table is refilled from a generator seeded with `n` | Verified in source |
| `window.devicePixelRatio` canvas correction (CSS size vs backing-store size, then scale the context); the ratio can change at runtime and `matchMedia()` can watch it | MDN `Window.devicePixelRatio` | Verified |
| `ResizeObserverEntry.devicePixelContentBoxSize` gives the size in device pixels but is "Limited availability" (not Baseline) | MDN | Verified; keep the fallback |
| npm `three` latest is 0.187.0; `WebGLRenderer` uses WebGL 2, and WebGL 1 is not supported since r163 | npm registry; threejs.org `WebGLRenderer` docs | Verified |
| `renderer.setAnimationLoop(callback)` is the advised way to define the loop rather than a manual `requestAnimationFrame()`; `renderer.setPixelRatio(value)` exists | threejs.org `WebGLRenderer` docs | Verified |
| `import * as THREE from 'three'` | three.js repository README | Verified |
| `three/addons/...` import path for controls and loaders; `renderer.setSize(w, h, false)` leaving CSS size untouched | `three@0.187.0` package: `exports` maps `./addons/*` to `./examples/jsm/*`; `setSize(width, height, updateStyle = true)` writes the canvas style only when `updateStyle` is true | Verified in source |
| Raw WebGL2 (no library) scaffold | Not covered here | Use three.js or verify against MDN |

No request in this pass was blocked by network policy.

## Pick the runtime

| Situation | Start from |
| --- | --- |
| Sketch, study, teaching example, quick generative family | p5.js 2.x global mode |
| Sketch embedded in an existing page, more than one sketch per page, or inside a component framework | p5.js 2.x instance mode |
| No dependency allowed, tight control of the loop, or export at exact pixel sizes | Canvas 2D with the density and loop scaffolds |
| 3D, shaders, or particle counts that outgrow 2D canvas | three.js minimal scene |
| The project already pins a version | That version's docs. Check `package.json` or the script tag first; a `p5@1.x` project keeps `preload()`. |

## Seeded randomness (do this first)

`Math.random()` cannot be seeded. Any sketch whose output must be reproduced, compared, or exported needs its own generator, and every random draw in the sketch must come from it. This is what makes "expose the seed" in the body possible outside p5.

```js
// mulberry32: small, fast, 32-bit state. Good for visuals; not for cryptography.
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296; // [0, 1)
  };
}

const seed = 20261112;            // show it, log it, or put it in the URL
const rand = mulberry32(seed);
const range = (lo, hi) => lo + (hi - lo) * rand();
const pick = (arr) => arr[Math.floor(rand() * arr.length)];
```

Rules that keep it reproducible:

- One generator per concern when order matters. Drawing an extra random number for colour shifts every later layout draw; give layout and colour separate generators seeded from the same base seed (`mulberry32(seed)`, `mulberry32(seed + 1)`).
- Never mix `Math.random()` (or an unseeded library call) into a seeded sketch. One stray call breaks replay.
- Draw random numbers in the update step, not per rendered frame, so the result does not depend on frame rate (see the fixed-timestep loop).
- In p5.js use `randomSeed(seed)` in `setup()`; `random()` and `randomGaussian()` then repeat across runs. Seed noise separately with `noiseSeed(seed)`.

## p5.js 2.x — global mode

```js
let img;
const seed = 20261112;

async function setup() {
  createCanvas(640, 480);
  randomSeed(seed);
  img = await loadImage('texture.png'); // 2.x: no preload(); await inside async setup()
}

function draw() {
  background(245);
  if (img) image(img, 0, 0);
  circle(width / 2, height / 2, 80);
}
```

- `setup()` is `async` only when it awaits something. A sketch with no assets keeps a plain `function setup()`.
- A loader returns a promise in 2.x. Assigning it without `await` stores the promise, not the image.
- p5 handles display density itself (`pixelDensity()` sets or returns it); do not also multiply sizes by `devicePixelRatio`.

## p5.js 2.x — instance mode

```js
const sketch = (p) => {
  let img;

  p.setup = async () => {
    p.createCanvas(640, 480);
    p.randomSeed(20261112);
    img = await p.loadImage('texture.png');
  };

  p.draw = () => {
    p.background(245);
    if (img) p.image(img, 0, 0);
    p.circle(p.width / 2, p.height / 2, 80);
  };
};

const instance = new p5(sketch, document.getElementById('sketch-one')); // or the id string
// Tear down when the host unmounts: instance.remove();
```

- Every p5 function and variable is reached through `p.`. A bare `width` or `random()` inside an instance sketch is the commonest bug: it is either undefined or silently the browser's own global.
- Keep one instance per mount and remove it on unmount, or each re-render adds another canvas and another running loop.

## p5.js 1.x to 2.x traps

From the p5.js compatibility README. Each is something a 1.x-shaped example gets wrong on 2.x.

| 1.x habit | 2.x form |
| --- | --- |
| `function preload() { img = loadImage(...) }` | `async function setup() { img = await loadImage(...) }`, or load the `preload.js` compatibility add-on |
| `createVector()` with no arguments | Pass the zeros: `createVector(0, 0)` |
| `mouseButton === RIGHT` | `mouseButton` is an object: `mouseButton.right` |
| `keyCode === UP_ARROW` | `keyIsDown(UP_ARROW)` or `code === UP_ARROW` |
| `bezierVertex(...)` / `curveVertex(...)` call shapes | `bezierOrder()` with `bezierVertex`, and `splineVertex` |
| `textToPoints(str, x, y, fontSize, options)` | Call `textSize()` first; `fontSize` is no longer a parameter |
| Data helpers such as `append()` and `arrayCopy()` | Removed; use plain JavaScript array methods or the data compatibility add-on |
| `preload()` with `loadSound()` | `await loadSound(...)` in `async setup()` with the new p5.sound |

The add-ons are a migration bridge for existing sketches. New sketches use the 2.x forms.

## Canvas 2D — density-correct sizing

A canvas has two sizes: its CSS size and its backing-store size (`canvas.width` / `canvas.height`). If they match on a 2x display, the browser upscales and the sketch is blurry.

```js
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

function resize() {
  const dpr = window.devicePixelRatio || 1;
  const { width, height } = canvas.getBoundingClientRect(); // CSS pixels
  canvas.width = Math.max(1, Math.round(width * dpr));       // device pixels
  canvas.height = Math.max(1, Math.round(height * dpr));
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // draw in CSS pixels from here on
  return { width, height, dpr };
}

let view = resize();
new ResizeObserver(() => { view = resize(); }).observe(canvas);
```

- Size the element with CSS (`width: 100%`, a fixed size, or an aspect ratio); the script sets only the backing store.
- Use `setTransform`, not `scale`: it sets the transform outright, so calling `resize()` twice cannot compound the scale.
- Setting `canvas.width` or `canvas.height` clears the canvas and resets context state (fill, stroke, transform). Reapply state after every resize and redraw.
- The ratio changes when the window moves between displays; a ResizeObserver does not fire for that. Watch it with `matchMedia('(resolution: ' + dpr + 'dppx)')` and call `resize()` on change when it matters.
- Fractional ratios round. `devicePixelContentBoxSize` on the ResizeObserver entry reports exact device pixels, but it is not available in every major browser; use it when present and keep the rounding path as the fallback.
- Cap the ratio for heavy sketches (`Math.min(devicePixelRatio, 2)`): a 3x display has nine times the pixels of a 1x one, for little visible gain over 2x. Say so when you do it.
- For export at a fixed size, skip the ratio: set the backing store to the target pixel size and draw in those units.

## Canvas 2D — fixed-timestep loop

`requestAnimationFrame` fires at the display's refresh rate, which is not always 60 Hz. Advancing the simulation once per callback makes it run twice as fast on a 120 Hz display and breaks seeded replay. Step the simulation in fixed slices and render once per callback.

```js
const STEP = 1 / 60;        // simulation seconds per update
const MAX_FRAME = 0.25;     // clamp after a background tab or a long pause
let last = performance.now();
let acc = 0;
let running = true;

function frame(now) {
  if (!running) return;
  acc += Math.min((now - last) / 1000, MAX_FRAME);
  last = now;

  while (acc >= STEP) {
    update(STEP);           // all state changes and all random draws happen here
    acc -= STEP;
  }
  render(acc / STEP);       // optional interpolation factor, 0..1
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

function update(dt) { /* forces -> acceleration -> velocity -> position; clear acceleration */ }
function render(alpha) { /* clear, then draw from current state */ }
```

- This is the body's "separate update from render" rule made concrete: with a fixed `STEP` and a seeded generator, frame N is the same on every machine.
- The clamp matters. Callbacks pause in background tabs; without it the first frame back runs hundreds of catch-up updates.
- For frame export, drop the clock entirely: call `update(STEP)` then `render(0)` once per exported frame.
- Variable-timestep (`update(dt)` with the real elapsed time) is acceptable for loose visuals with no replay requirement; it is not deterministic and stiff forces can blow up on a slow frame.
- Honour `prefers-reduced-motion` for anything user-facing: render one static frame or a much slower loop and offer a pause control. Interface-level motion policy belongs to `web-design`.

## three.js — minimal scene

```js
import * as THREE from 'three';

const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true }); // WebGL 2
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
camera.position.z = 3;

const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshNormalMaterial()   // needs no lights; swap once lighting exists
);
scene.add(mesh);

function resize() {
  const { clientWidth: w, clientHeight: h } = canvas;
  renderer.setSize(w, h, false);   // false: leave CSS size alone
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
resize();
new ResizeObserver(resize).observe(canvas);

renderer.setAnimationLoop((timeMs) => {
  mesh.rotation.y = timeMs / 1000;
  renderer.render(scene, camera);
});
```

- Let the renderer own density: `setPixelRatio` plus `setSize`. Do not also multiply the canvas size by `devicePixelRatio`.
- Use `setAnimationLoop`, as the docs advise, rather than a hand-rolled `requestAnimationFrame`. Pass `null` to stop it. For a simulation, run the fixed-timestep accumulator inside the callback.
- A black canvas is usually one of: camera inside or facing away from the object, a lit material with no lights, zero-size canvas at first `resize()`, or aspect never updated.
- The bare specifier `'three'` needs a bundler or an import map. Controls and loaders ship separately as addons, imported from `three/addons/...` (for example `three/addons/controls/OrbitControls.js`).
- Random draws inside three.js helpers are not seeded. Generate positions, colours, and parameters with the seeded generator and hand the numbers in.
- Dispose geometries, materials, and textures you replace; they are not garbage-collected from the GPU automatically.

## Before prescribing syntax

1. Read the project's pinned version (`package.json`, lockfile, script tag). The scaffold follows the pin, not the newest release.
2. If the pin is older than the row in Verification status, say which form you are using and why.
3. Anything marked "verify against current docs" is checked before it ships, not after it fails.
4. Run the scaffold once and look at it: sharp on a high-density display, same output twice with the same seed, same speed at a different refresh rate.
5. Record a new verified API fact with the promotion form in [coverage-gaps.md](coverage-gaps.md), including the date and version checked.
