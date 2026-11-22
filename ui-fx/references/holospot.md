# holospot: physically based holographic foil for three.js

## Contents

- What it is and when to reach for it
- The three calls
- Materials
- Things that decide the look
- Rules and traps
- What to carry into your own shaders
- Staleness and look it up

*Source: the `dmitrykurash/holospot` repository (MIT): its README, agent manual, how-it-works page, frameworks page and file tree, read 2026-11-18, and the X post announcing it (2122691075890704598, 2026-11-17). By Dmitry Kurash; the materials are those of holo.spot. The post's video was not viewed, and nothing was run. Provenance: [sources.md](sources.md).*

## What it is and when to reach for it

A kit that puts real-looking holographic foil on objects in a three.js scene: trading-card rainbow foil, cracked-ice shards, glitter, sparkle film, kinetic spirals, hologram stickers with a 3D image inside, and foil-stamped paper cards. It computes diffraction per pixel instead of sliding a gradient, which is why it reads as foil and not as a filter.

Reach for it when:

- The moment is **premium material at showpiece level** and a moving-gradient "holo" would look fake: a collectible card that tilts under the pointer, a product model on a launch page, a badge or sticker that should look physical, a membership or ticket card.
- The project **already uses three.js**, or the page can afford it. This is the heaviest route in this skill.
- You want a **still or a video** of a holographic object, rendered frame by frame.

Do not reach for it for a hover sheen on an ordinary DOM card (use the holographic tilt in [surface-recipes.md](surface-recipes.md), or ittybitty's holo-card or iridescence), for anything on a WebGPU renderer, or as a first-load hero on a phone.

## The three calls

```js
import { Holo } from "holospot";

const holo = new Holo(renderer);                         // once, with the scene's THREE.WebGLRenderer
holo.apply(mesh, { material: "nebula", sizeMm: 120 });   // any mesh or group already in the scene
renderer.setAnimationLoop(() => holo.render(scene, camera));   // instead of renderer.render(scene, camera)
```

- **Loading:** it is not on npm (404 on 2026-11-18). Either copy `dist/holo.js` and the `assets/` folder side by side into the project, or load it from the pinned tag through a CDN import map (`https://cdn.jsdelivr.net/gh/dmitrykurash/holospot@v0.1.0/dist/holo.js`), with `three` mapped to the same copy the scene uses. Keep the version pin.
- **Requirements:** three.js r170 or newer, `THREE.WebGLRenderer` (WebGL 2). The WebGPU renderer is not supported.
- **React Three Fiber:** create `Holo` from `useThree().gl` in an effect, call `holo.render(scene, camera)` from a `useFrame` with priority 1 (which stops R3F rendering by itself), and `dispose()` on cleanup. The repository's frameworks page has this and other setups; it says those snippets are not covered by its own checks.
- **Cards:** `holo.card({ material, widthMm, heightMm, size })` returns a mesh with back and edge. `material: "emboss"` is the paper card with foil logos and hologram stickers, described by a small JSON document.
- **Looks from the site:** holo.spot is the design tool. A look tuned there is copied with its "Copy settings" button and passed unchanged as `settings`. When someone describes a look in words, asking them for that blob beats guessing values.

## Materials

| `material` | Looks like | Seen on |
| --- | --- | --- |
| `prism` | Smooth silver foil with clean rainbow bands (straight, concentric or sunburst) | Classic holographic cards, gift wrap |
| `shatter` | Angular shards, each flashing its own colour, under a gold tint | "Cracked ice" cards and packaging |
| `nebula` | Thousands of tiny glitter flakes in a clear coat | Galaxy foils, glitter polish |
| `sparkle` | A dense field of small twinkling dots on a tinted film | Sparkle vinyl |
| `vortex` | Gold foil with spirals that seem to turn as it tilts | Swirl and "hyper" card parallels |
| `volume` | A 3D image floating inside the film, with real parallax | Security holograms |
| `emboss` | Cotton paper with a foil-stamped logo and hologram stickers (cards only) | Invitations, certificates |

Tints, grain, shine and wear are settings; each material has its own page under `docs/materials/` in the repository. Read that page before tuning. The volume hologram ships seven subjects and can bake a new one from a model or an SVG logo with a script in the repository.

## Things that decide the look

- **`sizeMm`: the object's real-world size.** The foil has a physical grain, so the same material looks coarse on a 40 mm object and fine on a 400 mm one. Ask how big the thing is in real life.
- **It needs motion.** The colour play comes from the angle between light, surface and eye. Give the object or the camera a slow rotation, a pointer tilt or an orbit; a static holographic object looks dead. This is user-driven or decorative motion, so the five-second rule and reduced motion apply (below).
- **Its own lights.** Each object is lit by the kit's studio rig, which has a spectrum; the scene's three.js lights do not light it and it does not reflect the scene. Change the rig with `studio.*` settings or presets (`studio`, `spot`, `softbox`, `strip`, `dark`, `desk`, `office`, `raking`). Small lights give saturated colour, large soft lights give pastels.
- **Page background.** Tell it whether the page is dark or light (`background`), because that changes the lighting as well as the backdrop.
- **Two compositing modes.** If the scene holds only holographic objects, the kit draws the whole frame. If there are other objects or the canvas is transparent, your renderer draws them first and the kit composites on top; depth of field is off in that mode.

## Rules and traps

- **Replace the render call, do not add to it.** `holo.render(scene, camera)` every frame, and no `renderer.render` for the same frame. One `Holo` per renderer, created once.
- **No extra post-processing or tone mapping on the result.** The kit already finishes the frame (glare, tone curve, grain). Running it through an effect composer flattens it.
- **Do not fake it alongside.** The author's own rule: do not try to reproduce the look with iridescence on a standard material, CSS gradients or a texture when this kit is in use.
- **Real geometry, uniform scale.** Skinned and morph-animated meshes are drawn in the pose they had when `apply` ran; only rigid motion is followed.
- **It is heavy.** `quality: "low" | "medium" | "high"`; phones should use low. Each holographic object is drawn in its own pass, so keep the count small. The single-file build is over a megabyte before compression, plus bump maps and hologram volumes fetched beside it: lazy-load it when the object is about to be seen.
- **Depth of field is on by default** in the object look. Turn it off (`"dof.on": false`) when everything should be sharp.
- **Wait before capturing.** `apply` returns at once and the object appears when its shader has compiled: `await obj.ready` before a screenshot or a video frame.
- **The floor is yours to add.** Nothing in the documentation read describes reduced-motion handling, offscreen pausing or a no-WebGL fallback. For shipped work: under reduced motion stop the auto-rotation and render one still frame (pointer tilt on an explicit drag can stay); pause the loop offscreen and in hidden tabs; provide a poster image where WebGL 2 is missing; if it rotates by itself beside other content, stop within five seconds or give it a pause control; mark the canvas `aria-hidden` when it is decoration, or `role="img"` with a label when it is the content.
- **Dependencies.** It needs three.js. In a shipped codebase without three, that is a new and large dependency: show what it adds and get a go-ahead, as SKILL.md workflow step 6 says.
- **Check its own work.** The repository includes a screenshot tool and a frame-by-frame video renderer for agents; both need a Chrome binary, and without a GPU a frame takes minutes.

## What to carry into your own shaders

The ideas are worth more than the kit when the kit is too heavy.

- **Colour from geometry, not from time.** A grating sends each wavelength in its own direction: `d · (sin θ_in + sin θ_out) = m · λ`, with `d` the groove spacing and `m` the order. In a small shader, take the light and view directions against the surface normal, across a chosen groove direction, solve for `λ`, and map it to a colour. The rainbow then moves correctly with tilt instead of sliding on a clock. Groove direction decides where colour appears; a mosaic of groove directions gives shards, a spiral gives a vortex.
- **Glints are counted, not averaged.** A flake flashes only when its tilt lines up light and eye. When many flakes fall in one pixel, estimate how many are lit and add that much light; do not blur them to grey or let them crawl as noise.
- **Keep the highlights bright, then finish like a photograph.** Render into a floating-point target so a glint can be far brighter than white; spread a small share of the light into a soft glare with no threshold; apply exposure and a tone curve; composite the page background after the curve so white stays white; add grain last.
- **A hologram is a window.** The image inside has parallax and is cut off by the film's edge; fake it by ray-marching a simple shape behind the surface from the view direction.
- **Light quality is a control.** A small source gives saturated spectral colour and a broad one gives pastel satin: expose that as one "light size" parameter.

## Staleness and look it up

Captured 2026-11-18 at tag `v0.1.0`, one day after release. Single author, first version, API likely to move.

- Repository and agent manual: <https://github.com/dmitrykurash/holospot> (agent manual, docs and recipes folders)
- Design tool: <https://www.holo.spot>
- Check for a newer tag before pinning: `https://api.github.com/repos/dmitrykurash/holospot/tags`
