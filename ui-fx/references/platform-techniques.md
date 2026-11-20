# Platform techniques: building effects by hand

## Contents

- How to use this file
- Idea → technique
- CSS recipes
- SVG filter recipes
- Canvas and WebGL
- Distorting real DOM
- Pointer-driven effects
- Text effects
- Performance floor
- Accessibility constraints, with sources
- SwiftUI equivalents
- Practitioner rules worth keeping
- Look it up

## How to use this file

It maps an effect idea to the platform features that can deliver it, lightest first, with support status and the traps an agent hits even with the docs open. Support figures were read from MDN's browser-compat data and the Baseline dataset on 2026-11-18 (stable then: Chrome 157, Safari 27.2, Firefox 160). Signatures and syntax are not reproduced: fetch the linked page. Anything marked *Chromium only* is fair game for prototypes and demos; to ship it, add an `@supports` or feature-detect gate plus a fallback that looks finished. The accessibility and performance sections are the shipping floor, not a reason to hold back while exploring, with one exception that applies in every mode, prototypes included: the flash limit (WCAG 2.3.1).

Timing values for everyday motion belong to `web-design` (web-animation-design). Effect-level recipes built on the mechanics below, with code and measured values, are in [control-patterns.md](control-patterns.md) and [surface-recipes.md](surface-recipes.md).

## Idea → technique

| Idea | Technique | Support (2026-11) |
| --- | --- | --- |
| Light travelling round a border; rotating or breathing glow | Conic gradient on a masked pseudo-element, angle animated through `@property` | All engines (`@property`: Chrome 85, Safari 16.4, Firefox 128) |
| Gradient whose colours shift smoothly | `@property`-registered colour or percentage stops | All engines |
| Spotlight or sheen following the pointer | Radial gradient positioned by custom properties written in `requestAnimationFrame` | All engines |
| One state morphs into another; shared element flies | Same-document View Transitions | Baseline since 2025-10 (Chrome 111, Safari 18, Firefox 144) |
| A custom wipe, wave or iris between two states | View Transition with an animated `mask-image` or `clip-path` on the new snapshot | Same as above |
| Page-to-page morph in a multi-page site | Cross-document `@view-transition` | Chrome 126, Safari 18.2; **not Firefox** |
| Reveal, progress or parallax tied to scroll | `animation-timeline: scroll()` / `view()` | Baseline since 2026-10 (Chrome 115, Safari 26, Firefox 159) |
| Animation that *fires* at a scroll position | `animation-trigger` | *Chromium only* (146); use `IntersectionObserver` elsewhere |
| Spring or bounce without JS | `linear()` easing | Widely available |
| Enter and exit from `display: none`; popover and dialog entrances | `@starting-style` + `transition-behavior: allow-discrete` | Enter works everywhere; **Firefox cannot yet transition `display`**, so exits snap there. `overlay` is Chromium only (117), so popover and dialog exits leave the top layer at once in Safari and Firefox |
| Stagger without JS or inline styles | `sibling-index()` in a delay calc | Baseline since 2026-08 (Chrome 138, Safari 26.2, Firefox 154) |
| Per-element variation (jitter, scatter) in CSS | `random()` | Chrome 156, Safari 26.2, Firefox 161 beta: enhancement only |
| Frosted glass | `backdrop-filter: blur()` | Baseline since 2024-09 |
| Glass that *refracts* what is behind it | `backdrop-filter: url(#displacement)` | *Chromium only* in practice: the filter grammar allows `url()`, but other engines do not apply it to backdrops |
| Gooey merge | SVG blur + alpha-threshold colour matrix on a container | All engines; costly in Safari |
| Film grain, paper, noise | `feTurbulence`, or a pre-rendered noise PNG | All engines; prefer the PNG |
| Squircle and scooped corners | `corner-shape` | Chrome 139, Safari 27.3 beta: enhancement only |
| Particle burst, confetti, dust | 2D canvas | All engines |
| Audio-reactive glow or ring | Web Audio `AnalyserNode` driving canvas or custom properties | All engines; mic needs a user gesture. Smoothing is visual tuning and does not limit the flash rate: a 4 Hz level still gives four swings a second after smoothing. For a large glow, cap the rendered rate of brightness reversals (see "Fast attack, slow release" in [control-patterns.md](control-patterns.md) for a limiter), and put the fast response in a small bar or ring. This applies in Explore too |
| Per-pixel material, lens, fluid field | WebGL2 fragment shader on a canvas | Widely available |
| The same, with compute or heavier scenes | WebGPU | Chrome 113 on Windows, macOS and ChromeOS (Android 121; Linux from 144 on some GPUs), Safari 26, Firefox 141+ on desktop and partial: needs a WebGL2 fallback |
| Shader distortion of live DOM | HTML-in-Canvas, or a captured picture as a texture | HTML-in-Canvas is *Chromium only* (157) |

## CSS recipes

**Border beam (rung 1 of the ladder).** A wrapper with `position: relative`; a pseudo-element inset by the border width carrying a `conic-gradient(from var(--angle), transparent 70%, <colour> 85%, transparent)`; a mask that keeps only the ring (two mask layers, one clipped to `content-box`, combined with `mask-composite: exclude`); `--angle` registered with `@property` as `<angle>` and animated from 0 to 1turn. A second, blurred copy underneath gives the bloom.

- `@property` needs `syntax`, `inherits` and, for anything but `*`, an `initial-value`, or the registration is ignored and the gradient steps instead of rotating.
- The beam belongs on the wrapper, the radius on both. Clipping with `overflow: hidden` cuts focus rings and popovers; prefer the mask.
- Stop it: toggle `animation-play-state` or remove the pseudo-element when the state ends. Under reduced motion, show a static ring or nothing plus a text status.

**View Transitions.** Give the changing element a `view-transition-name`, call `document.startViewTransition(() => updateDOM())`, and style `::view-transition-old()` / `::view-transition-new()`.

- Only one document-level transition runs at a time; starting another skips the first to its end. Design for that, and do not wrap every state change.
- The old state is a snapshot image and the new one is live. Text in the old snapshot can stretch during a size morph: crossfade text, morph containers.
- Names must be unique per page at transition time. For lists use `view-transition-name: match-element` (Chrome 137, Safari 18.4, Firefox 144) or `view-transition-class` for shared styling.
- Element-scoped transitions (`element.startViewTransition`, several at once) and nested groups are *Chromium only* (147, 140).
- Feature-detect `document.startViewTransition` and fall through to the plain update. Skip the transition under reduced motion or reduce it to a crossfade.
- In React, check the installed version's own view-transition support before wiring the DOM API by hand.

**Scroll-driven animation.** `animation-timeline: view()` plus `animation-range` on a keyframe animation.

- Declare `animation-timeline` *after* the `animation` shorthand; the shorthand resets it.
- A named timeline resolves only through scroll ancestors; hoist it with `timeline-scope` when the subject is elsewhere.
- Content must be visible by default. Put the hidden start state inside `@supports (animation-timeline: view())` so a browser without it shows the content.
- Scroll-linked parallax and zoom are vestibular triggers: remove them under reduced motion.

**Enter and exit.** `@starting-style` gives the first-frame values; `transition-behavior: allow-discrete` lets `display` (not yet in Firefox) and `overlay` (Chromium only) take part. Animating to `height: auto` with `interpolate-size` is *Chromium only* (129): treat as enhancement.

**Frosted glass.** `backdrop-filter` samples only the pixels directly behind the element, so glass near an edge looks flat. Extending the filtered layer beyond the visible box and trimming it with `mask-image` (with `pointer-events: none`) lets nearby colour bleed in, which is what makes it read as glass. Provide an opaque fallback colour; `prefers-reduced-transparency` exists only in Chromium (118), so build opaque first and add transparency on top.

## SVG filter recipes

- **Gooey.** Container gets `filter: url(#goo)`: `feGaussianBlur` then `feColorMatrix` with a steep alpha row (the classic `0 0 0 18 -7`), optionally `feComposite` to restore the crisp source on top. Children must be the same flat colour and the container needs room for the blur. Text inside the filtered group gets eaten: keep labels in a sibling layer above.
- **Grain.** `feTurbulence` (`fractalNoise`) through a colour matrix, laid over the surface with a blend mode. A full-viewport live turbulence filter has been reported to slow Safari scrolling badly. Render the noise once to a small tiling PNG, or keep the filtered area small and static.
- **Displacement.** `feTurbulence` or an `feImage` map into `feDisplacementMap` warps the element it is applied to. Animating `baseFrequency` or `scale` re-rasterises every frame: fine for a 300 ms hover on a small element, not for a page.
- **Refractive glass** by `backdrop-filter: url(#filter)` works only in Chromium. Displacement is `scale × (channel − 0.5)`, so the range is ±scale/2 and an 8-bit map gives only 256 steps across it: large scales band visibly. The map must be rebuilt when the element's size or shape changes. Ship plain blur everywhere else.
- **Safari.** Expect SVG filters to cost far more there than in Chrome (one vendor in [libraries-dev.md](libraries-dev.md) states WebKit rasterises them on the CPU and disables its warp on large hosts). Test on Safari and iOS before committing to a filter-based effect, and keep groups small and few.

## Canvas and WebGL

- **2D canvas** covers particles, orbs, meters and mosaics, and avoids the WebGL context limit. Size the backing store by `devicePixelRatio` capped at 2, and draw in CSS pixels.
- **One context, many instances.** Browsers cap the number of live WebGL contexts per page (often cited as about 16; the figure was not re-verified). For several instances, render in one shared context and copy frames into per-instance 2D canvases, or use one full-screen canvas and draw regions. The libraries.dev metal and image packages both do this.
- **Shaders are stateless.** Pass time, pointer and progress as uniforms; drive progress from the app's state so the effect can be scrubbed, reversed and tested at a fixed frame.
- **Frame rate is a design choice.** Slow materials look right at 10–30 fps. Cap the loop rather than running at the display rate.
- **Context loss happens** (tab backgrounding on mobile, GPU resets). Listen for `webglcontextlost` / `restored`, and make the non-canvas element complete on its own.
- **WebGPU** is not yet universal. three.js's WebGPU renderer falls back to WebGL2 on its own; anything hand-written needs both paths or should stay on WebGL2.
- **SSR.** A canvas renders empty on the server. Mount client-only or render the plain fallback first, and avoid hydration mismatches from theme detection.

Scaffolds for the render loop, sizing and a minimal three.js scene are in `creative-coding`'s current-api-scaffolds reference. For readable, MIT-licensed examples of single-file UI shaders with a small shared runtime (offscreen pause, reduced-motion still frame, adaptive quality), see the source linked from [ittybitty.md](ittybitty.md).

## Distorting real DOM

A shader cannot read the DOM directly. Options, cheapest first:

1. **Do not distort; mask.** A View Transition with an animated mask or a blurred gradient band sweeping across gives most of the "wave carries the change" feeling with no canvas. glimm works this way where same-document View Transitions exist: the outgoing snapshot is clipped ahead of the band and a separate canvas draws the colour. Elsewhere it falls back to an opaque curtain.
2. **SVG displacement on the element** for a brief, small-area warp.
3. **Picture then bend.** Rasterise the element once (an SVG `foreignObject` snapshot or a capture library), upload it as a texture, run the shader on a canvas laid over the element, then remove the canvas. This is how the distortion-waves package works, and it sets the rules: running animations inside the pictured content stand still while the effect runs (the package re-takes the picture when the DOM changes), so live controls sit in a layer above; cross-origin images and fonts need CORS or they vanish from the picture; iframes are excluded; both states need opaque backgrounds.
4. **HTML-in-Canvas** (`<canvas content="drawable">`, `drawElementImage`, element-to-texture calls) draws live DOM into canvas and WebGL, so the content keeps scrolling, taking clicks and reading correctly to assistive tech while a shader moves it. glimm's `GlimmScope` ([glimm.md](glimm.md)) is a packaged use of it with an automatic fallback. *Chromium only* as of 157, and the names changed from the earlier proposal (`layoutsubtree`, `drawElement`), so check the current docs and feature-detect.

Whatever the route: when the effect and the change start together, swap the content at the moment the effect covers it. When the result already exists (a confirmed payment, a completed save), show it at once and never put an opaque cover, or a held copy of the old content, over it afterwards: keep the outcome outside the swept area, or let the effect pass over it only as translucent light. Library sweeps differ here, so check what the one you chose actually keeps on screen. Keep the whole thing to about a second or less by default (a rare showpiece can run longer), and fall back to a crossfade.

## Pointer-driven effects

- Read the pointer in the handler, write styles once per frame in `requestAnimationFrame`. Never set styles straight from `pointermove`.
- Write custom properties on the nearest element, not on `:root`, so style recalculation stays local. Drive `transform` and `opacity`.
- Apply `will-change` only while the element is hovered or active.
- Magnetic buttons and tilt cards: small ranges (a few pixels, a few degrees), spring back on leave, off for coarse pointers (`@media (hover: hover) and (pointer: fine)`), off under reduced motion. Tilt is plane-shifting motion, a vestibular trigger.
- Keyboard users get the same emphasis through `:focus-visible`.
- Avoid hiding or replacing the system cursor; add to it (a trail, a glow) instead. An enlarged accessibility pointer swaps back to stock size, and a sprite that does not match the platform reads as a bug.

## Text effects

- **Avoid splitting text into letters; it breaks the accessibility tree.** Testing published in February 2026 found the usual `aria-label` + `aria-hidden` pattern announced correctly in only two of the screen reader and browser pairs tried, and `aria-label` is not allowed on generic `div` or `span`. Split by line or word at most, or animate a mask, `clip-path` or gradient over intact text.
- **Variable fonts:** animating `font-variation-settings` (weight, width, slant) costs layout and paint each frame. Use it on a few words, and reserve space so neighbours do not reflow.
- **Gradient or metal text:** `background-clip: text` with an animated `@property` gradient. Keep a solid `color` fallback and check 4.5:1 (3:1 for large text) at the stop and animation frame closest in luminance to the background: the lightest on a light background, the darkest on a dark one (WCAG 1.4.3).
- **Scramble and typewriter** effects change the accessible text on every frame. Put the final string in the DOM and render the animation in an `aria-hidden` twin.

## Performance floor

- Animate `transform`, `opacity` and, sparingly, `filter`. Blur radius, mask position and gradient stops repaint every frame: keep the painted area small.
- Pause when offscreen (`IntersectionObserver`) and when the tab is hidden (`visibilitychange`). Stop the loop entirely when nothing is active.
- Share one `requestAnimationFrame` loop across instances.
- Cap device pixel ratio at 2 (lower for full-screen shaders). Treat samples per pixel as the quality knob.
- Lazy-load three.js, Rive, Lottie and similar runtimes at the moment the effect is first needed, never in the initial bundle.
- Promote layers deliberately; each one costs memory. Remove `will-change` afterwards.
- Budget: the effect must not push interaction latency. If frames drop on a mid-range phone, simplify or drop to the fallback. Frame budgets and measurement → `web-design` (web-performance).

## Accessibility constraints, with sources

| Constraint | What it requires of an effect |
| --- | --- |
| WCAG 2.3.1 Three Flashes (A) | Nothing flashes more than three times in any second. Strobing glows, rapid colour inversion and hard flicker are out, and so is a large glow that follows an audio level more than three times a second: smoothing alone does not prevent that, so cap the rendered rate of brightness reversals; that cap is the default and the only route this skill relies on. The criterion's own exceptions are narrow and need measurement: a change counts as a flash when a pair of opposing changes in *relative luminance* is 10% or more of the maximum relative luminance and the darker state is below 0.80; any pair of opposing transitions involving a saturated red counts as a red flash with its own threshold; and both apply once the flashing area exceeds a small part of the view (about 341 × 256 px at 1024 × 768). A small swing in opacity or in a colour channel does not show that the rendered luminance change is under those thresholds, so do not treat it as an exemption. Applies in every mode, prototypes included |
| WCAG 2.2.2 Pause, Stop, Hide (A) | Motion that starts automatically, lasts more than five seconds and sits beside other content needs a visible, keyboard-operable pause, stop or hide control; the only alternative is to stop within five seconds. "Automatic" includes motion triggered by hover, focus, scroll into view or incoming data, and atmosphere that runs from page load. Binding a loop to state does not exempt it unless the user started that state by activating a control. A loader that is the only content is exempt |
| WCAG 2.3.3 Animation from Interactions (AAA) | Motion triggered by interaction can be turned off unless essential. Honour `prefers-reduced-motion` |
| `prefers-reduced-motion` | Remove travel, scaling, spinning, parallax and plane-shifting. Colour and opacity changes are acceptable replacements. JS-driven effects must read `matchMedia` and listen for changes. Do not blanket `animation: none` if code waits on `animationend`; use a near-zero duration |
| `prefers-reduced-transparency` | Chromium only: build the opaque version first |
| Vestibular triggers (WebKit's list) | Scaling and zooming, spinning and vortex, parallax and multi-speed motion, 2.5D plane shifts, large-area or peripheral motion. These are the effects to cut first |
| Names and state | Decorative layers are hidden from assistive tech. Any state they show is also given by visible text (or a static icon with a text alternative, a distinct shape and 3:1 contrast) that does not move. Status text that appears without moving focus goes into a `role="status"` container that existed before the change (`role="alert"` for failures), never on or inside a button (WCAG 4.1.3). `aria-busy` alone is not enough, and never goes on the status element or its ancestors. Content drawn to canvas (a revealed image, a number) needs a text alternative |
| Focus | Effect layers never take focus or pointer events, and never clip, cover or dim the focus indicator below 3:1 (WCAG 2.4.7, 2.4.11, 1.4.11). After a view swap, move focus to the new view or announce it; do not leave focus on a removed control |
| Activation | Actions fire on `click` (the up-event), not on pointer-down, so they can be cancelled and work from the keyboard (WCAG 2.5.2, 2.1.1). Only the visual anticipation may start on pointer-down |
| Contrast | Text on or filled with an effect keeps 4.5:1 (3:1 large) at its worst frame; control boundaries and state icons keep 3:1 (WCAG 1.4.3, 1.4.11) |
| Colour | Colour reinforces an outcome and never carries it alone (WCAG 1.4.1) |

Sources: W3C Understanding documents for each criterion, web.dev on `prefers-reduced-motion`, WebKit "Responsive Design for Motion", The A11Y Project on vestibular disorders. Links in [sources.md](sources.md). Deeper web accessibility practice → `web-design` (web-accessibility).

## SwiftUI equivalents

Names as search terms; mechanics and code live in `swiftui` (swiftui-animation). Never carry web timing values across.

| Idea | SwiftUI |
| --- | --- |
| Per-pixel colour, warp, or full-layer shader | `colorEffect`, `distortionEffect`, `layerEffect` with a Metal `Shader` (iOS 17) |
| Driving a shader over time | `TimelineView(.animation)` for continuous, `keyframeAnimator` for triggered; gate with `isEnabled` |
| Animated colour field | `MeshGradient` (iOS 18) |
| Multi-step choreography (the five beats) | `PhaseAnimator`, `KeyframeAnimator` (iOS 17) |
| Geometry-aware effects without layout cost | `visualEffect`, `scrollTransition` (iOS 17) |
| Per-glyph text effects | `TextRenderer` (confirm minimum OS in the docs) |
| Animated icons | `symbolEffect` (iOS 17) |
| Shared-element zoom | `navigationTransition(.zoom)` (iOS 18) |
| Glass material and morphing glass | `glassEffect`, `GlassEffectContainer`, `glassEffectID` (iOS 26) |
| Pairing a haptic with the peak | `sensoryFeedback` (iOS 17) |
| Respecting settings | `accessibilityReduceMotion`, `accessibilityReduceTransparency` environment values |

- A shader cannot sample UIKit-backed views or materials: keep them out of shaded content.
- Shaders shipped in a Swift package need Xcode's build system to compile the Metal source.
- The libraries.dev kits (border beam, thinking orbs, voice glow and ring, bot avatars, metal, distortion waves) are SwiftUI packages installed from the GitHub repo: see [libraries-dev.md](libraries-dev.md).
- On Apple platforms, place a custom effect so it sits alongside Liquid Glass and the system navigation transition and does not replace them (shaders cannot sample materials in any case). Design questions → `apple-design`.
- Start with WWDC24 "Create custom visual effects with SwiftUI" and WWDC23 "Wind your way through advanced animations in SwiftUI".

## Practitioner rules worth keeping

- **Frequency sizes the effect** (Emil Kowalski, "You Don't Need Animations"): the more often something is seen, the shorter and smaller it should be. His stricter rule, no animation at all on keyboard actions, governs everyday motion in `web-design`; it does not veto an effect the user asked for.
- **The thousandth repetition** (Rauno Freiberg, "Invisible Details of Interaction Design"): ask whether the motion still helps then. Respond during a gesture and stay interruptible.
- **Realism comes from context, not intensity** (Josh Comeau on `backdrop-filter`): glass looks real when it samples its surroundings, and more blur does not help.
- **Build shader looks in layers and count samples** (Maxime Heckel on refraction and dispersion): cost scales with passes and samples per pixel.
- **Do not break the accessibility tree for an effect** (Adrian Roselli on split text): find a route that keeps the real text intact.
- **One transition at a time** (Chrome team, "Misconceptions about view transitions").

## Look it up

- View Transitions: <https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API> · misconceptions: <https://developer.chrome.com/blog/view-transitions-misconceptions> · element-scoped: <https://developer.chrome.com/blog/element-scoped-view-transitions>
- Scroll-driven animations: <https://developer.chrome.com/docs/css-ui/scroll-driven-animations> · scroll-triggered: <https://developer.chrome.com/blog/scroll-triggered-animations>
- `@property`: <https://developer.mozilla.org/en-US/docs/Web/CSS/@property> · `linear()` springs: <https://www.joshwcomeau.com/animation/linear-timing-function/>
- `backdrop-filter` craft: <https://www.joshwcomeau.com/css/backdrop-filter/> · refractive glass with SVG: <https://kube.io/blog/liquid-glass-css-svg/>
- Gooey: <https://css-tricks.com/gooey-effect/> · grain: <https://css-tricks.com/grainy-gradients/>
- HTML-in-Canvas: <https://developer.chrome.com/blog/html-in-canvas> · WebGPU renderer: <https://threejs.org/docs/pages/WebGPURenderer.html>
- Animation performance: <https://web.dev/articles/animations-guide> · input handlers: <https://web.dev/articles/debounce-your-input-handlers>
- Shader light effects: <https://blog.maximeheckel.com/posts/refraction-dispersion-and-other-shader-light-effects/>
- SwiftUI: <https://developer.apple.com/videos/play/wwdc2024/10151/> · <https://developer.apple.com/videos/play/wwdc2023/10157/> · <https://developer.apple.com/videos/play/wwdc2025/219/>
- Current support for any feature: <https://developer.mozilla.org/> compat tables or <https://web.dev/baseline>
