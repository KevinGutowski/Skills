# Effect libraries: what exists beyond hand-rolling

## Contents

- Decision rules
- Moment → first place to look
- Tier 1: shader and material components
- Tier 2: copy-paste effect galleries
- Tier 3: authored animation (Rive, Lottie, hosted scenes)
- Tier 4: celebration and particles
- Tier 5: engines for building your own
- Motion plumbing that effects lean on
- Licence traps
- Stale or risky picks
- Look it up

*A dated survey, checked against npm, GitHub and vendor pages on 2026-11-18. It is a map of where to look, never a standard: the project's installed dependencies win, and every version, price and licence below should be re-checked before installing. Jakub Antalik's set has its own file, [libraries-dev.md](libraries-dev.md), and so do glimm, [glimm.md](glimm.md), ittybitty, [ittybitty.md](ittybitty.md), holospot, [holospot.md](holospot.md), and Textures, [textures.md](textures.md). Provenance and unverified items: [sources.md](sources.md).*

## Decision rules

1. **Browse freely, then make it specific.** These galleries are good raw material and the quickest way to try a direction. What turns a find into the product's own is the pass through [effect-ideation.md](effect-ideation.md): a moment, a driver, the product's palette.
2. **Read the project's dependency manifest.** If the project already has Motion, GSAP, three.js or a gallery's components, build on that. Do not add a second animation engine for one effect.
3. **Pick the rung that delivers the idea at full strength.** CSS → a small hand-rolled canvas or SVG filter → a single-purpose npm component → a copy-paste gallery component → a WebGL engine. Higher rungs add weight and a failure mode, which matters when shipping and hardly at all in a prototype.
4. **Copy-paste components are your code from then on.** A registry component lands in the repo: read it before keeping it, add the reduced-motion and offscreen-pause handling it probably lacks, delete what you do not use. Nobody will ship you a fix.
5. **Check four things before shipping with anything:** licence (see traps below), last release, peer dependencies (React 19? Tailwind version? three.js range?), and whether it handles reduced motion and missing WebGL.
6. **Retheme before shipping.** Default props are recognisable. Palette, source point and state names come from the product ([effect-ideation.md](effect-ideation.md), "Signature or stock").
7. **Dependencies:** only for a build the user asked for. In a shipped codebase, a package the user has not asked for waits: build the strongest dependency-free version now, show the install command, and add it on a go-ahead. Asking for the package to be added, or for a build that names it as the means, is the go-ahead; mentioning it or asking whether it would suit is not. In a prototype they asked you to build, install and list them.

## Moment → first place to look

| Moment | Look at | Or hand-roll with |
| --- | --- | --- |
| Waiting on an agent or model | `ui-fx` (libraries-dev): thinking orbs, border beam | `@property` conic border ([platform-techniques.md](platform-techniques.md)) |
| Voice, mic, call | `ui-fx` (libraries-dev): voice glow, voice ring; Rive for a character | Canvas + `AnalyserNode` |
| Commit or success that swaps a view | `ui-fx` (libraries-dev): distortion waves; `ui-fx` (glimm): `GlimmScope` | View Transitions with a custom mask or filter |
| Route or page transition | `ui-fx` (glimm) | Cross-document or same-document View Transitions |
| Achievement, completion | canvas-confetti; tsParticles presets; a Lottie or Rive tick | A 30-particle canvas burst |
| Image treatment (dither, halftone, glass, holo card) or pointer toys, any stack | `ui-fx` (ittybitty) | A fragment shader over a texture |
| Image or media arriving | `ui-fx` (libraries-dev): image FX; `ui-fx` (ittybitty): decode, dissolve; Paper Shaders dithering or halftone as a placeholder | Canvas mosaic that resolves |
| Holographic foil, glitter or a hologram on a 3D card or object | `ui-fx` (holospot), three.js only | The grating idea in a small shader ([holospot.md](holospot.md)); a CSS holographic tilt for DOM cards |
| Premium material (plan, badge, hero word) | `ui-fx` (libraries-dev): liquid metal; Paper Shaders liquid metal; React Bits MetallicPaint | Masked animated conic gradient |
| Hero or page atmosphere | `ui-fx` (ittybitty): swoosh, mesh, silk, scenes; Paper Shaders (mesh gradient, grain gradient, god rays); shadergradient; a Unicorn Studio scene | Static image with grain; CSS gradient animated through `@property` |
| Hero, card or section background that answers the pointer (bars, dots, cells) | `ui-fx` (textures): 12 free MIT hover textures, one React file each | An SVG field of marks scaled by distance to the pointer ([textures.md](textures.md), Building an original one) |
| Pieces merging, liquid controls | `ui-fx` (libraries-dev): gooey; Fancy Components gooey-svg-filter | SVG blur + colour-matrix threshold |
| Text that changes or counts | NumberFlow, torph (already picked in `frontend-design`'s ui-library-picks reference) | CSS only for simple cases |
| Stateful character, mascot, icon with states | Rive | — |
| Designer hands you an After Effects file | dotLottie | — |
| Globe, 3D object, custom material | cobe; react-three-fiber + drei | three.js directly |

## Tier 1: shader and material components

Installed from npm, one component per effect, tuned by props. The closest relatives of the libraries.dev set. For the same kinds of shader without React or npm, see [ittybitty.md](ittybitty.md).

| Library | What | Install and needs | Licence | Notes |
| --- | --- | --- | --- | --- |
| **Paper Shaders** | Zero-dependency canvas shaders: mesh gradient, grain gradient, god rays, liquid metal, fluted glass, halftone, pulsing border, metaballs, dithering, warp, dot orbit | `@paper-design/shaders-react` (React 18/19) or `@paper-design/shaders` (vanilla) | Apache-2.0 | v0.0.82 (2026-10). **Pin the version**: 0.0.x ships breaking changes. No documented reduced-motion or WebGL fallback; `speed={0}` gives a still frame, so gate it yourself |
| **shadergradient** | One animated 3D gradient, with Figma and Framer plugins | `@shadergradient/react` plus three, react-three-fiber, three-stdlib, camera-controls | MIT per npm (repo has no licence file) | Pulls the whole three/R3F stack for a background. Has `lazyLoad` and `pixelDensity` props. Heavy for a shipped background unless three is already in the project; fine in a prototype |
| **shaders** (shaders.com) | Composable shader components for React, Vue, Svelte, Solid; built on TypeGPU | npm `shaders` 4.x | MIT package; site gates export and MCP behind Pro | WebGPU-based: verify the fallback on browsers without it before relying on it. Pricing unverified |
| **cobe** | A 5 KB WebGL globe | `cobe` | MIT | v2 adds arcs and DOM-bound markers. Already the globe pick in `frontend-design` |

## Tier 2: copy-paste effect galleries

Distributed through the shadcn registry: a CLI copies the component source into the repo. All assume React and Tailwind, most assume `motion`. They are the widest source of ideas here. Their defaults are widely recognised (aurora, meteors, sparkles, beams, spotlight cards), so retheme whatever you keep.

| Gallery | Size and character | Install | Licence | Reach for |
| --- | --- | --- | --- | --- |
| **React Bits** | 200+ components, 60+ backgrounds, many WebGL; JS/TS × CSS/Tailwind variants | `npx shadcn@latest add @react-bits/<Name>-TS-TW` | MIT + Commons Clause | SplitText, ElectricBorder, StarBorder, MetallicPaint, LiquidChrome, Iridescence, Silk, SplashCursor, Ballpit, Hyperspeed. Per-component deps (gsap, ogl, three, motion) differ: read the Code tab |
| **Magic UI** | Landing-page effects | `pnpm dlx shadcn@latest add @magicui/<name>` | MIT; paid Pro templates | Animated Beam (connecting nodes), Border Beam, Shine Border, Magic Card (pointer spotlight), Flickering Grid, Morphing Text, Globe. Meteors and Globe had no reduced-motion check in source |
| **Aceternity UI** | Effect-first heroes and backgrounds | shadcn CLI or copy | **Custom, not open source** | Lamp Effect, Tracing Beam, Canvas Reveal Effect, Background Beams With Collision, Google Gemini Effect, Vortex, Spotlight |
| **Motion Primitives** | Small, composable motion pieces; self-described beta | Copy or registry | MIT | text-scramble, text-morph, text-shimmer-wave, border-trail, glow-effect, progressive-blur, morphing-dialog, magnetic, tilt, spotlight |
| **Fancy Components** | Playful, physics and type experiments | Registry | MIT | gravity, elastic-line, pixel-trail, gooey-svg-filter, text-along-path, variable-font-cursor-proximity, vertical-cut-reveal |
| **Cult UI** | Product-flavoured components | `@cult-ui/<name>` | MIT | Dynamic Island, Shift Card |
| **Animate UI** | v2 is animated drop-in primitives for Radix, Base UI, React Aria, not an effects gallery | `@animate-ui/react` + `motion` (React 19) | MIT + Commons Clause | Micro-interaction polish on standard controls. That is `web-design` (web-animation-design) territory more than effects |

Others seen but thinly verified: Eldora UI (MIT), Skiper UI (free tier reportedly requires attribution), Hover.dev (paid, no redistribution), uilabs.dev (a showcase of product micro-interactions; treat as inspiration).

**On the familiar ones.** Aurora backgrounds, meteors, sparkles, glowing bento cards and beam backgrounds ship in every gallery, and `frontend-design`'s anti-slop catalog lists their ingredients (glow halos, gradient text, neon on near-black) as tells when an aesthetic is left open. Under this skill effects are wanted, so use them: change the palette, give them a subject or a driver, and push one parameter well past the default so the result is not the one everybody has seen.

## Tier 3: authored animation

| Tool | Fits | Runtime | Watch for |
| --- | --- | --- | --- |
| **Rive** | Interactive, state-machine-driven pieces: characters that react, stateful icons, data-bound illustrations | `@rive-app/react-canvas`, `@rive-app/webgl2` (full renderer), `@rive-app/canvas-lite` (no text, layout, audio). Runtimes MIT | The runtime is megabytes unpacked, so lazy-load it. Call `cleanup()`. Free-plan exports carry a splash screen. Needs someone to author in the Rive editor |
| **dotLottie** | Linear playback of a designer's After Effects export: illustrations, success ticks, empty states | `@lottiefiles/dotlottie-react`, MIT; WASM engine (~500 KB compressed) fetched from a CDN by default | Self-host the WASM (`setWasmUrl`) for CSP and offline. `DotLottieWorker` moves it off the main thread. Legacy `lottie-web` is slow-moving |
| **Unicorn Studio** | A no-code WebGL scene, hosted and embedded with a script tag | Loader ~50–57 KB gzipped; community React wrapper `unicornstudio-react` | Free tier is non-commercial with a badge; commercial use needs the paid plan. Scenes load from the vendor: a third-party runtime dependency. Has fps, dpi, lazy-load and alt-text attributes; no documented reduced-motion handling |

Rule of thumb: Rive when it must *respond*, Lottie when it only *plays*, neither when CSS can do it.

## Tier 4: celebration and particles

| Library | Notes |
| --- | --- |
| **canvas-confetti** | ISC, zero dependencies, tiny. **Set `disableForReducedMotion: true`**: it defaults to false. `useWorker: true` hands the canvas to a worker |
| **tsParticles** | MIT; `@tsparticles/react` with `slim`, `confetti`, `fireworks` bundles. Respects reduced motion by default through its `motion` option. Load a preset bundle, not the full engine |

Scale a celebration with consequence and frequency and never delay the result (the same proportion rule as `design-craft`'s Delight move; under this skill a routine action can still have an effect, sized small). Fire from the element that caused it, once.

## Tier 5: engines for building your own

| Engine | Use when | Notes |
| --- | --- | --- |
| **three.js** | A real 3D scene or a custom material | MIT. WebGPU renderer and TSL exist; check current status before choosing them over WebGL2 |
| **react-three-fiber + drei** | three.js inside React | R3F 9 requires React 19. drei brings `MeshTransmissionMaterial`, `MeshDistortMaterial`, `Sparkles`, `Float`, `Caustics`, and `PerformanceMonitor` / `AdaptiveDpr` for degrading under load |
| **postprocessing** / `@react-three/postprocessing` | Bloom, depth of field, noise, vignette, chromatic aberration over a three scene | Pins a three.js version range; check before upgrading |
| **OGL** | A single full-screen shader without three's weight | Unlicense, ~29 KB, zero dependencies; quiet since early 2025 but small enough to own |
| **GSAP** | Timelines, SplitText, MorphSVG, ScrollTrigger, Flip | Free for commercial use since Webflow's acquisition, including the former paid plugins. **Not open source** (see traps) |

Procedural systems themselves (particles, flow fields, noise) are `creative-coding`. Starting scaffolds for canvas and three.js are in its current-api-scaffolds reference.

## Motion plumbing that effects lean on

- **Motion** (`motion`): springs, layout and shared-element animation, exit animation, scroll- and pointer-linked values. Implementation and docs search → `motion`.
- **Lenis**: smooth scroll for scroll-driven Experience pages. MIT; respects reduced motion by default. Caps at 60 fps on Safari and breaks over iframes. Keep it off app UI where people scroll to work.
- **NumberFlow**, **torph**: animated numbers and text morphs; both MIT.

## Licence traps

| Licence | Who | What it means |
| --- | --- | --- |
| MIT + **Commons Clause** | React Bits, Animate UI | Use in products is fine. Selling or redistributing the components themselves (a template, a kit, a competing library) is not. Not OSI open source |
| **Custom** | Aceternity UI, Hover.dev | End products allowed; no redistributing source, no templates or derivatives on marketplaces. Read it before using in an open-source repo or a template you sell |
| **Vendor no-charge licence** | GSAP | Free commercially; barred in no-code animation builders that compete with Webflow; terms can change |
| **Per-plan** | Unicorn Studio, libraries.dev Pro exports and models, Rive editor | Commercial use or badge removal needs a paid plan |
| Apache-2.0 | Paper Shaders | Keep LICENSE/NOTICE when redistributing inside another library |

If the user's project is itself a template, a component kit, or open source, raise the licence before copying anything in.

## Stale or risky picks

- **Vanta.js**: last npm release 2022, tied to an old three.js. Do not start new work on it.
- **liquid-glass-react**: no pushes since mid-2025; the displacement does not render in Safari or Firefox.
- **`react-bits`, `magicui-cli`, `motion-primitives` on npm**: not the real distributions. The galleries ship through the shadcn registry; an `npm install` of the similar name gets an unrelated or dead package.
- **Anything at 0.0.x or with one maintainer**: pin the version and keep the fallback path working.

## Look it up

- Paper Shaders <https://shaders.paper.design> · React Bits <https://reactbits.dev> · Magic UI <https://magicui.design> · Aceternity UI <https://ui.aceternity.com> (licence: `/licence`) · Motion Primitives <https://motion-primitives.com> · Fancy Components <https://fancycomponents.dev>
- Rive web runtime <https://rive.app/docs/runtimes/web/web-js> · dotLottie <https://github.com/LottieFiles/dotlottie-web> · Unicorn Studio embed <https://unicorn.studio/docs/embed>
- canvas-confetti <https://github.com/catdad/canvas-confetti> · tsParticles <https://github.com/tsparticles/tsparticles>
- three.js <https://threejs.org/docs> · drei <https://drei.docs.pmnd.rs> · GSAP licence <https://gsap.com/community/standard-license/>
- Maintenance check for any pick: `npm view <package> version time.modified license peerDependencies`
