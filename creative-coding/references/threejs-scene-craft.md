# three.js Scene Craft

Decisions and traps for a three.js scene that has to look lit and photographic rather than merely run: where tone mapping goes, what metal needs around it, why far detail boils, how render density is counted, and a set of failures that produce no error. The starting scene itself is in [current-api-scaffolds.md](current-api-scaffolds.md).

**Source and limits.** Distilled from six of Meng To's open skills (MIT, `3cc9345`): metal material, wood lighting scorecard, ocean water, retina resolution, falling leaves, and weather. The three with demos (metal, wood lighting, ocean) ran on three.js r169 with `WebGLRenderer`; the other three state no version. One author, one renderer: the constants are starting values from those demos, not standards. Four API claims were checked against three.js source on 2026-11-18 (see [Verification](#verification)); everything else is single-source. Nothing here was checked on `WebGPURenderer`.

## Contents

- [Verification](#verification)
- [Tone-map once, at the end](#tone-map-once-at-the-end)
- [Metal needs a room to reflect](#metal-needs-a-room-to-reflect)
- [Fade detail at its pixel footprint](#fade-detail-at-its-pixel-footprint)
- [Render density: renderer and composer](#render-density-renderer-and-composer)
- [Lighting a dark interior](#lighting-a-dark-interior)
- [Particles and instanced fields](#particles-and-instanced-fields)
- [Silent failures](#silent-failures)
- [Lifecycle](#lifecycle)
- [Judge the frame, not the mood](#judge-the-frame-not-the-mood)
- [Look it up](#look-it-up)

## Verification

| Claim | Checked against | Status |
| --- | --- | --- |
| `material.envMapIntensity` is applied only when `material.envMap` is set; an environment that comes from `scene.environment` is scaled by `scene.environmentIntensity` instead | `WebGLMaterials.js` at r162, r163 and `dev` (r188dev); `WebGLRenderer.js` and `Scene.js` on `dev` | Verified in source. r162 tested the resolved environment (material or scene); r163 changed the test to `material.envMap` and added `Scene.environmentIntensity` |
| `Float32BufferAttribute` copies the array it is given | `BufferAttribute.js` on `dev`: the constructor calls `new Float32Array(array)` | Verified in source. Plain `BufferAttribute` keeps the typed array you pass |
| The default `customProgramCacheKey()` returns `onBeforeCompile.toString()` | `Material.js` on `dev` | Verified in source |
| `EffectComposer` keeps its own pixel ratio and `setSize` takes logical pixels | `EffectComposer.js` on `dev` | Verified in source |
| Every numeric constant below (radiances, intensities, thresholds, timings, measured costs) | Meng To's demos only | Single-source; treat as a starting point and measure |

## Tone-map once, at the end

The order that keeps highlights intact:

1. Set the renderer to no tone mapping while drawing the scene.
2. Draw everything, additive layers included (light shafts, dust, glitter), into a half-float multisampled render target. Keep colors linear and let bright things exceed 1.
3. Add bloom in linear space.
4. Tone-map and encode to sRGB once, in the last full-screen pass.

What goes wrong otherwise:

- **An additive pass after tone mapping clips.** Light shafts or bloom added to an already tone-mapped image hit white flat, or get mapped twice.
- **A bloom threshold in display range catches everything.** In linear HDR the threshold sits above 1 (the metal demo used 5.0; the ocean 1.6 with a 0.8 knee), so only the hot glints bloom.
- **Emissive cards in the environment need radiance above 1** (and `toneMapped: false` if the renderer itself tone-maps), or their reflections are gray. A directly visible emitter is different: keep it near 1, or it clips to blank white after the final tone map (the wood demo's window paper clipped at about 3.9 and read correctly near 1.15).
- **Additive blending also adds alpha.** Invisible on an opaque canvas; wrong the day the canvas is composited over a page. Use custom blending that leaves destination alpha alone.
- **Dark gradients band in 8 bits.** A tiny hash dither after the sRGB encode removes the steps.

## Metal needs a room to reflect

A conductor has almost no color of its own. It reads as metal only when it has something bright and hard-edged to reflect, and when its roughness varies.

Build order, each step fixing what the previous cannot:

1. **Conductor, not painted.** Metalness 1, base color set to the metal's reflectance at normal incidence in linear values. Lower metalness lets a diffuse term leak in and reads as plastic.
2. **A dark room with bright cards.** Build the environment as a scene of unlit planes on a near-black background, with radiance above 1 on the cards, and prefilter it. A uniformly bright sky makes every reflection the same mid tone; raising the intensity only lifts that mean.
3. **Aim a card at the object.** The viewer sees whatever lies along the mirror direction. A polished face looking at a dark ceiling reads black, however good the material.
4. **Vary the roughness.** Roughness is the finish, not a constant: low-frequency smears, fine scratches, grain. A uniform value is what makes metal look rendered. Each layer fades at its footprint (next section).
5. **Bevel the edges.** A sharp 90-degree edge has no normals between its faces and catches no highlight. A small chamfer does; a large one reads as soap.
6. **Ground it in darkness.** Contact shadows on a dark surface. Metal on a bright ground reflects the ground and loses contrast.

Traps:

- **On r163 and later, `envMapIntensity` does nothing** when the environment is only on the scene. Assign the environment to the material as well (or scale `scene.environmentIntensity`), and re-assign it when the environment is rebuilt. See Verification.
- **Thin environment details vanish.** Prefiltering renders a small cube and blurs it; narrow window bars disappear. Widen the gaps and lower the blur before blaming the material.
- **The reflected window is a flat white block.** The card times the reflectance clips after tone mapping. Lower the intensity for rougher finishes, which spread the same card over more surface.
- **Anisotropy needs the physical material and UVs,** and the roughness streaks must run along the same axis.
- **Contrast, not brightness, separates real from gray.** The source measured nearly the same mean luminance under a studio and a flat gray room, with about three times the spread under the studio.

## Fade detail at its pixel footprint

Any procedural term with a wavelength (a wave, a scratch, a pore, a grain band) aliases once its wavelength falls below the size of a pixel on the surface. Still frames look like grain; in motion the far field boils.

The rule: **fade each term out as its own wavelength approaches the pixel footprint,** where the footprint comes from screen-space derivatives of the coordinate the term is computed from (`fwidth`, or `dFdx`/`dFdy`). Search terms: `fwidth`, `dFdx`, `smoothstep`.

- Fade per term, not once for the whole material. An eight-wave ocean fades the 3 m wave long before the 78 m wave.
- Apply it wherever the term is evaluated. A wave displaced in the vertex shader fades against vertex spacing; the same wave shaded in the fragment shader fades against the pixel footprint.
- Bump gives up before color does. Derivatives of a height field beat into moiré earlier than the albedo shows it.
- Carved or modelled relief has a pixel budget too. Grooves under roughly a dozen pixels per period sparkle against a bright environment; size the carving to the shown resolution.
- The source's measurement: without the fade, frame-to-frame flicker in the far band of the ocean went from 2.3 to 5.8 gray levels on average (95th percentile 5 to 23).
- Shade from analytic derivatives per pixel when the mesh is coarse far away. Interpolated vertex normals lose the detail and follow the mesh rings.

Why sampling below the wavelength produces false patterns is signal-sampling theory; the raster and anti-aliasing background is in `graphics-fundamentals`.

## Render density: renderer and composer

"Render at 200%" means three different things. Ask, or state which one you built:

| Meaning | Effective ratio | Note |
| --- | --- | --- |
| Fixed 200% | 2, whatever the display | Four times the pixels of 100%. Stays fixed unless allocation fails, and then says so |
| Automatic, capped at 2 | `min(devicePixelRatio, 2)` | Renders at 1 on an ordinary display. Label it Auto |
| Relative to native | native ratio times 2 | On a 2x display this is 4x per axis, sixteen times the CSS pixel count |

- **The renderer and the post-processing composer each hold their own pixel ratio.** Updating only the renderer leaves a low-resolution intermediate stretched onto a sharp canvas.
- **Pass logical (CSS) sizes to both and let each apply the ratio.** Passing already-multiplied sizes to a composer that also has ratio 2 allocates 4× the CSS size on each axis: twice the intended dimensions and four times the intended pixels.
- Your own render targets are not managed by either: size full-resolution depth and normal targets from the drawing-buffer size, and reduced-resolution passes (bloom, ambient occlusion) by their deliberate factor. Resolution uniforms take the size of the texture actually sampled.
- Pointer coordinates and raycasting are normalized from the canvas's CSS rectangle, never from drawing-buffer pixels.
- Density does not fix a blurry texture, a coarse shadow map, or a low-resolution reflection. Check those separately.
- When frame time is the problem, lower optional post-effect resolution before the main view. An adaptive mode steps down after sustained slow frames and recovers with hysteresis, not every few frames.
- Report the scale actually in effect. Never show "200%" while silently rendering lower.

This extends the scaffold's rule (renderer owns density; do not also multiply the canvas size) to scenes with post-processing.

## Lighting a dark interior

For wood, cloth, and other diffuse materials in a dim room:

- **One directional key does the work.** Grain, the shadow seam, and any light shafts come from the same window. Fill, rim, and hemisphere only keep the shaded side alive.
- **Flat light erases grain.** Ambient or environment light bright enough to see the room fills every pore. In the source's ablation, switching the studio reflections off raised the measured score, because they had lifted the shadows.
- **The environment's window sits where the real window is.** Otherwise the sheen mirrors a light that is not in the scene.
- **Volumetric planes wash the blacks.** Additive shafts add light to everything behind them. Fade them by height near the surfaces they cross and check the black point of the finished frame.
- **A bright line where a shaft plane cuts a solid:** fade the plane before it reaches the surface.
- **Shadow acne against a detached shadow.** A depth bias alone gives acne; a normal-offset bias scaled to the shadow-map resolution fixes it, and too much of it opens a gap under the object. A baked contact pool under each object closes the seam the shadow map leaves light. Search terms: `normalBias`, `bias`.
- A static room does not need its shadow map redrawn each frame (`shadowMap.autoUpdate`).

## Particles and instanced fields

- **Anchor the volume in the frustum.** A world-sized box of rain around the origin looks empty, because the camera sees a narrow cone. Build a small volume and carry it in front of the camera. Turn frustum culling off for it, since it moves every frame.
- **Preserve world positions as the camera moves.** Move the spawn and wrap boundaries; do not parent live particles to the camera, or they swing with every turn.
- **Density is a count, not a new buffer.** Allocate the worst case once and draw fewer. For vertex-based particles (`Points`, or one merged geometry) that is `geometry.setDrawRange`. For an `InstancedMesh` it is `mesh.count`: the geometry's draw range there limits how much of *each instance's* geometry is drawn, so shrinking it cuts every leaf in half and leaves the number of leaves unchanged. Reallocating when the state changes hitches exactly when the viewer is watching.
- **A stronger state is the same system pushed harder.** A storm is the rain with every dial moved, not a second particle system. Slant should grow faster than fall speed.
- **Camera-facing sprites cannot turn edge-on.** A leaf, card, or petal that must tumble is a two-sided quad or bent mesh. Couple sideways slip to the tumble phase so it slips fastest when edge-on.
- **Seed per-instance values once** (phase, rates, scale, palette). Never draw new random numbers each frame.
- **Hide resets:** beyond the fog, above the volume, or under a boundary fade. `smoothstep` with reversed edges is undefined in GLSL; write `1.0 - smoothstep(inner, outer, d)`.
- Depth testing does not stop particles falling inside a roofed room; that needs exclusion volumes.
- Instances are not depth-sorted. Alpha test with depth writes gives crisp silhouettes; alpha blending needs a deliberate sorting and depth-write choice.
- **Gate expensive relighting on slow values.** If snow depth or storm strength drifts continuously, refresh the scene's look only when the value has moved past a small threshold, not every frame.
- Start with one convincing element, then a sparse field. Distinguish capacity, active count, and what is actually visible.

## Silent failures

Each of these produces a wrong picture and no error.

| Symptom | Cause | Fix |
| --- | --- | --- |
| Everything is correct, nothing moves | The typed attribute class copied your array; you are updating the original | Keep and write to the attribute's own `.array`, and flag it for update |
| The second material variant looks like the first | Both share one compiled program: the default cache key is the text of `onBeforeCompile`, identical for two closures over different values | Give each variant its own `customProgramCacheKey` |
| A mesh draws nothing after a shader edit | A `//` comment inside a one-line shader string commented out the rest | Use block comments in inline GLSL |
| Black wedges through additive layers | `pow` of a slightly negative base is NaN, and NaN through additive blending is black | Clamp before `pow` |
| Metal intensity dial does nothing (r163 and later) | Environment set on the scene only | See [Metal needs a room to reflect](#metal-needs-a-room-to-reflect) |
| A surface mixes color in its own shader and ignores the material color | The mix happens after the material color is read | Give that mix its own uniform |
| Flat white slabs on wave crests | Summed wave steepness passed 1, so the surface folds through itself | Cap total steepness below 1 |
| Pale smears on wave backs at grazing angles | The reflection vector points below the horizon and samples the flat half of the sky | Clamp the reflection vector above the horizon |
| A hard line where water meets sky | Fog uses one flat color | Fog into the same function the sky draws |
| Floating objects sink into or hover over waves | Height read without undoing the wave's sideways displacement | Query height through the same spectrum, inverting the horizontal shift |
| Long-running scene degrades | Raw time fed to `sin` in single precision | Wrap phases on the CPU before upload (precision reasoning in the source, not observed there) |
| Shadow or metric differs between captures | Camera sway and time not frozen | Freeze time, fix size and density, render and read in the same task |

## Lifecycle

- Pause when the tab is hidden and when the canvas leaves the viewport. On resume, reset the time base so the first frame back does not jump.
- **Frame delta.** The source demos use a variable step and clamp the delta (1/30 s, or 1/20 s for the ocean). This library's scaffold uses a fixed-step accumulator with a larger frame cap ([current-api-scaffolds.md](current-api-scaffolds.md)). These are two different loops: keep whichever the project has and do not move one loop's number into the other. Either way, never catch up a whole hidden-tab interval in an unbounded loop.
- Reduced motion: hold one composed still, rendered on demand, with controls still live. Reducing motion is no reason to reduce resolution.
- Size from a `ResizeObserver`, skip zero-sized hidden views, and dispose replaced render targets.
- Very large worlds rebase the origin periodically; scroll any world-anchored textures by the same offset and the same divisor used to sample them, or the pattern jumps at each rebase.

## Judge the frame, not the mood

- Score a baseline before changing anything, and keep it.
- **Ablate each layer.** A layer whose removal raises the score is either measured wrongly or not earning its cost.
- Look at a magnified crop after every metric-driven change. The source reverted three changes that raised a number and made the picture worse.
- Capture headless at a fixed size and density with time frozen; an in-app pane throttles itself and shares the GPU.
- Do not conclude from one timing toggle. Run-to-run noise at 2x density was about a millisecond in the source's measurements.
- For "does it look right", give the captures and the rubric to a fresh judge who has not seen the numbers.

## Look it up

Fetch the current page before prescribing syntax; three.js renames and re-homes APIs between releases.

- `WebGLRenderer`: `toneMapping`, `outputColorSpace`, `setPixelRatio`, `setSize`, `getDrawingBufferSize`, `shadowMap.autoUpdate`, `setAnimationLoop` — https://threejs.org/docs/pages/WebGLRenderer.html
- `EffectComposer`: `setPixelRatio`, `setSize` — https://threejs.org/docs/pages/EffectComposer.html
- `WebGLRenderTarget`: `samples`, texture `type` (`HalfFloatType`)
- `PMREMGenerator`: `fromScene` and its blur parameter
- `Scene`: `environment`, `environmentIntensity`
- `MeshStandardMaterial` / `MeshPhysicalMaterial`: `envMap`, `envMapIntensity`, `metalness`, `roughness`, `anisotropy`, `ior`
- `Material`: `onBeforeCompile`, `customProgramCacheKey`, `toneMapped`, custom blending factors
- `BufferAttribute` and the typed subclasses; `BufferGeometry.setDrawRange`
- `InstancedMesh` — https://threejs.org/docs/pages/InstancedMesh.html
- `DirectionalLight` shadow `bias` and `normalBias`
- Source for behavior the docs do not state: https://github.com/mrdoob/three.js (`src/renderers/webgl/WebGLMaterials.js`, `src/core/BufferAttribute.js`, `src/materials/Material.js`)
- `BufferGeometry.setDrawRange` and `InstancedMesh.count` (https://threejs.org/docs/pages/BufferGeometry.html#setDrawRange, https://threejs.org/docs/pages/InstancedMesh.html#count): which one limits what.
