# ittybitty: small copy-in WebGL shaders

## Contents

- What it is and when to reach for it
- The catalogue by job
- Moment → shader
- How it is used
- Rules and traps
- Staleness and look it up

*Source: ittybitty.dev (home page, `llms.txt`, the JSON catalogue, the Drop Ripple detail page and its schema) and the `blakecyze/ittybitty-shaders` repository metadata, read 2026-11-18. By Blake Cyze. Provenance: [sources.md](sources.md).*

## What it is and when to reach for it

A library of 74 WebGL2 shaders, each a few kilobytes of plain JavaScript with no dependencies (the site quotes 3.6–12.9 KB per shader including its runtime). Shader source is MIT. There is no npm package (the npm name `ittybitty` is an unrelated placeholder; do not install it): the files are copied into the project, pasted as an embed, or fetched by an agent through the site's MCP server. A browser studio on each shader's page tunes it and exports the code.

Reach for it when:

- The project is **not React**, or should not take a dependency: plain HTML, Astro, Webflow, Framer, Squarespace, a static page.
- The idea is **atmosphere or material**: a hero background, a section texture, a scene, a surface behind cards.
- An **image should be treated**: dithered, halftoned, engraved, watercoloured, behind fluted or liquid glass, as a holographic card.
- You want **many candidates on screen fast** while exploring. Seventy-four tuned shaders with a common API is the quickest way to lay out a wall of options.
- Weight matters. These are far lighter than a three.js-based background.

It is not a component kit for product states: nothing here binds to `isStreaming` for you. Pair it with your own state (every shader exposes `set`, `pause`, `resume`; see the reduced-motion trap under Rules before calling `resume`), or use [libraries-dev.md](libraries-dev.md) and [glimm.md](glimm.md) for state-driven moments.

## The catalogue by job

Grouped as the site groups them. Slugs are the shader's page and file names. *Filter* shaders take an image or the shader layers stacked beneath them.

| Job | Shaders |
| --- | --- |
| **Abstract** (20) | swoosh, rainbow, north-star, spectrum, mesh, liquid-metal, cells, bokeh, pebbles, wagara, dither, silk, folds, slats, rays, metaballs, coral, iridescence, topography, dither-haze |
| **Scenes** (18) | ocean, lagoon, lake, water, surface, clouds, bubbly-clouds, aurora, sakura, fire, koi, sumi-e, tall-grass, meadow, black-hole, nebula, papercut, warp-tunnel |
| **Photo filters** (18) | rain, stained-glass, hologram, watercolour, toon, crosshatch, graphite, engraving, paper, crt, liquid-glass, dither-image, fluted-glass, halftone, heatmap, gradient-map, afterimage, dusk |
| **Accents and objects** (7) | edge-glow, holo-card, orb, diamond, electric-border, glow, grain |
| **Pointer play** (6) | ferrofluid, force-field, condensation, dot-field, ink, dither-light |
| **Transitions and reveals** (5) | drop-ripple, decode, dissolve, page-curl, torn-paper |

The site also tags each by look (dark, bright, soft, glossy, grainy, ink and paper, retro, dither, realistic, cartoon) and by whether it reacts to the pointer; most do.

## Moment → shader

| Moment or idea | Try |
| --- | --- |
| Hero or page atmosphere | swoosh, mesh, silk, folds, rays, spectrum, north-star; a scene (lake, clouds, nebula, sumi-e) when the brand has a place |
| Voice or assistant presence | orb; edge-glow ("like an assistant listening") |
| Card edge energy | electric-border, edge-glow; glow behind cards and pricing tables |
| Premium material | liquid-metal, iridescence, diamond, holo-card (tilts to the pointer) |
| An image arriving or resolving | decode (big squares into focus), dissolve (burning away behind an ember edge) |
| A click that should send a shockwave through an image | drop-ripple |
| Revealing what is underneath | page-curl, torn-paper, condensation (wipe the mist with the pointer) |
| Glass over content imagery | liquid-glass, fluted-glass, rain |
| A print, ink or retro treatment for imagery | halftone, dither-image, engraving, crosshatch, graphite, watercolour, toon, crt, hologram, heatmap |
| Pointer toys for a playful surface | ferrofluid, ink, force-field, dot-field, dither-light, koi |
| Texture and banding fix on flat fills | grain |
| Gooey shapes | metaballs |

## How it is used

- **One element:** load `ittybitty-shader.js` as a module and place `<ittybitty-shader effect="drop-ripple">`, sized with CSS. It fills its box.
- **JavaScript:** import the shader's function from its file and call it with a canvas and options: `dropRipple(canvas, { … })`. The returned handle has `set(…)`, `pause()`, `resume()` and `destroy()`. Drive `set` from app state to make a shader respond to a moment.
- **Files:** each shader needs its own file plus shared modules: `runtime.js`; `pointer.js`, `texture.js` or `glyphs.js` where used; `layers.js` and `container.js` for layers or shapes. The catalogue's `files` array and the detail page's export list exactly which.
- **Export modes:** "Use as" section, page background, or button hover. "Copy embed" for site builders, "Copy code" for a build, "Copy for agent" for a prompt.
- **Layers:** up to five effects fuse into one shader on one canvas, with blend modes (one draw call, plus one extra pass for each filter layer). Filters such as dither and halftone process the layers beneath them, so a scene plus a print filter plus grain is still one canvas.
- **Shape:** the whole stack can be clipped to the element's box (following its rounded corners), to text, or to an SVG path, with optional edge light, rim, gloss and inner shadow. This is how a shader becomes a headline fill or a badge.
- **For agents:** `https://ittybitty.dev/catalogue.json` indexes every shader and file with hashes; `https://ittybitty.dev/schema/<slug>.json` gives a shader's parameters, ranges, defaults and usage note. Read the schema before setting an option. A read-only MCP server at `https://ittybitty.dev/mcp` can search, read options and build the files; adding an MCP server changes the user's agent configuration, so suggest the command and let them run it.

## Rules and traps

- **Images must be same-origin or served with CORS**, or WebGL cannot read them. This applies to every shader with an image option (the ones whose `files` include `texture`), which covers all filters and transitions.
- **Check the reach rating before choosing a scene for production.** The catalogue gives each shader an estimated share of devices that run it smoothly and a GPU weight. Most are 90–99%; several scenes are much lower (ocean 45%, bubbly-clouds 65%, tall-grass 70%, aurora, sakura, fire and sumi-e 75%). Fine for a prototype or a desktop showpiece; for a shipped mobile page pick a lighter one or lower the quality preset.
- **Quality is a setting.** Presets from fastest to ultra, a resolution scale, a frame-rate cap, and an adaptive mode. Each shader sets its own device-pixel-ratio cap (2 for about half of them, 1.5 or lower for heavier ones; the runtime default is 1.5). The schema gives the value and the `dpr` option overrides it.
- **The floor is mostly built in:** rendering stops offscreen and in hidden tabs, reduced motion shows a single still frame, and the detail pages show a still image where WebGL2 is missing. What interaction does under reduced motion is not settled: the Drop Ripple page says clicks still ripple, but a browser test of that shader's published JavaScript API found a click under reduced motion left the frame unchanged. Only that one shader and that one integration path were tested, so check the shader and path you use, and do not rely on click or pointer response as feedback for reduced-motion users. Confirm the fallback in your own embed: without WebGL2 the canvas is empty unless you provide a poster or background.
- **`resume()` overrides reduced motion.** The runtime starts as a still frame when the visitor prefers reduced motion, but its `resume` is documented as "animate again, even when reduced motion is preferred". Code that pauses and resumes a shader from app state (resume while loading, pause when done) therefore undoes the still frame. In shipped work, check `matchMedia('(prefers-reduced-motion: reduce)')` before calling `resume()` and skip it when it matches (drive `set(…)` for a static state change instead), or keep `resume` for an explicit "play" control the visitor presses. The `reducedMotion` option replaces the media query: `false` animates even for people who asked for reduced motion, `true` always shows a still. Leave it unset unless you are wiring your own preference switch.
- **Shipped backgrounds need a pause control.** These shaders start on their own and run indefinitely beside the page's content, which WCAG 2.2.2 does not allow past five seconds without a way to pause, stop or hide them. Wire a visible, keyboard-operable control to `pause()` / `resume()` (a user pressing play is a fine reason to call `resume`), or call `pause()` yourself within five seconds so the background settles to a still frame. Pointer-hover response still counts as automatic motion (hover is an indirect interaction), so each response should die out within five seconds of the pointer stopping, and the pause control should stop it too. Not required while exploring.
- **Mark decorative canvases yourself.** The JavaScript API (`orb(canvas, …)`, `dropRipple(canvas, …)`) draws into the canvas you pass and does not set `aria-hidden` or any role on it, and the `<ittybitty-shader>` element does not either. The site's generated "Copy code" snippet includes `aria-hidden="true"` in its `<canvas>` markup, which is where that attribute comes from if you see it. So: put `aria-hidden="true"` on your own canvas or on the custom element when the shader is decoration, and give it `role="img"` with a label when it is content. A shader clipped to text is not text: keep the real heading in the DOM.
- **Filters treat pictures and shader layers, not live DOM.** "The layers beneath" means the shader stack. To run one of these looks over real page content, see "Distorting real DOM" in [platform-techniques.md](platform-techniques.md).
- **One canvas per effect area.** Stack with layers instead of overlapping canvases, and mind the browser's limit on live WebGL contexts when placing many on one page.
- **You own the files.** There is no package to update: record the catalogue build hash you copied from, and re-export when you want a newer version.
- **Retheme.** Every shader takes colours; set them from the product palette before judging it.

## Staleness and look it up

Captured 2026-11-18 (catalogue build `f4e6e12`). Single author, new, growing. Counts, sizes and reach figures are the site's own measurements and will change.

- Library and studio: <https://ittybitty.dev> · per shader: `https://ittybitty.dev/shaders/<slug>`
- For agents: <https://ittybitty.dev/llms.txt>, <https://ittybitty.dev/catalogue.json>, `https://ittybitty.dev/schema/<slug>.json`
- Source: <https://github.com/blakecyze/ittybitty-shaders> (MIT)
