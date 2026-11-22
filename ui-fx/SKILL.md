---
name: ui-fx
description: "Add visual effects to UI, from subtle to showpiece, for exploratory work or an extra layer on a strong baseline: border beams, wave transitions, liquid metal, gooey merges, shader backgrounds, thinking/voice indicators. Says yes, rebuilds effects seen elsewhere, installs or hand-rolls. Everyday motion values → web-design; whole-page aesthetic → frontend-design; generative sketches → creative-coding. Triggers: make it pop, dazzle, wow, UI FX."
---

# UI FX

**Mode: say yes, go further, then build.** Use this when someone wants an interface to do something *extra*: "make it pop", "add some dazzle", "use border-beam", "something like that wave transition". The person has already decided they want an effect. The job is to find the best one, push it past the obvious, and make it work in their stack. Do not talk them out of it, and do not answer with a quieter version than they asked for. Quiet is a setting of the same effects, chosen on purpose (see the intensity dial), never a way of declining.

**Two ways it gets used:**

- **Explore.** Prototypes, concept work, a playground, "show me what's possible". Go wide and big: several effects, showpieces first, stacked if the idea wants it, rough edges allowed, built as variants to compare. The floor (below) can wait until an effect is chosen to ship, except the flash limit, which always applies; say which parts are still unfinished.
- **Finish.** An already strong product that wants an extra layer. The effect is additive: layout and flows stay as they are, and the floor ships with it.

Unclear which: Explore for a new or throwaway surface, Finish for a shipped one.

**Boundary:** this skill owns high-craft effects (light, material, distortion, liquid, particles, living indicators), at any intensity, and where they land. Durations, easings, springs, gestures and stagger → `web-design` (web-animation-design). The page's overall aesthetic and layout → `frontend-design`. Fixing a baseline that is not yet good → `design-craft`; if the baseline is weak and the user asked for an effect, still build the effect, name the one or two fundamentals that would make it land better, and offer a `design-craft` pass. The effect does not wait on it. Rule-driven generative artwork → `creative-coding`. SwiftUI shader and animation APIs → `swiftui` (swiftui-animation). Motion library code → `motion`. What an AI feature's wait should communicate → `ai-experience-design`. Auditing an existing screen → `interface-review`.

**Effects are wanted here.** `frontend-design`'s anti-slop catalog lists glows, gradient text and neon as tells to avoid when the aesthetic is open. An effect the user asked for, or one chosen through this skill in answer to an effects request ("add some dazzle" counts), is **pinned**: the tell list, the craft floor's one-authored-moment line, `frontend-design`'s "finite and purposeful" motion rule and its Operate-surface "never decoration" rule do not apply to that effect. `web-design`'s frequency, budget and keyboard rules size a pinned effect and do not remove it. Everything else on the surface stays under the catalog, and contrast and the other quality failures are never waived. Report which effects were added through this skill, so a later review can tell. What separates a good effect from a stock one is specificity (the product's palette, a real trigger, its own staging); spend the effort there.

## Aim: four questions that make an effect land

These sharpen an effect; they are not a test it has to pass.

1. **Which moment?** Effects hit hardest on events and states: a commit, a wait, a result, presence, a premium thing. Atmosphere with no event (a shader field, grain, a living background) is fine too, especially on landing, portfolio and exploratory surfaces; give it a subject and a palette of its own.
2. **How often will it be seen?** Rare, consequential moments can take the showpiece. Things seen all day still can: brief, small, good on the hundredth viewing.
3. **What drives it?** Real state (`isStreaming`, mic level, pointer, scroll, the response arriving) makes an effect feel alive; prefer a driver to a free-running loop.
4. **What is left without it?** Reduced motion, no WebGL, slow device: the plain version is complete. Required to ship; optional while exploring.

Scale to the surface, do not veto by it. App UI, dashboards and settings: still yes, placed on the moments that matter (save, send, complete, empty state, upgrade) or as atmosphere behind the content, with data and working controls left clear and undistorted.

## The intensity dial: the same effects, quiet to loud

Every effect here has a quiet end. A border beam can be a rainbow racing round a card, or a grey hairline drifting along a composer's edge while a small "Working" label does the talking; the second is the one people leave on all day. Choose the level on purpose.

| Level | Looks like | Reach for it when |
| --- | --- | --- |
| **Whisper** | Mono or one brand hue, low strength (20–40%), thin, slow; noticed on the second look | Always-visible or frequent things (a composer, a focused input, an idle CTA), or whenever the user asks for subtle |
| **Signature** | Product palette, clear but contained to one element | The default for a named moment in a shipped product |
| **Showpiece** | Full colour, distortion, particles, crosses the view | Rare, consequential moments; landing and portfolio surfaces; Explore |

- **Turn it down with the effect's own controls**, not by removing it: palette to mono, strength down, band narrower, speed slower, travel shorter, fewer particles. Worked levels per idea: [references/effect-ideation.md](references/effect-ideation.md).
- **Offer both ends** of the strongest idea in a spread. If the user asked for subtle, give subtle; if they asked for it to pop, do not hand back a whisper.
- **Quiet is not absent.** A whisper on a moment still follows real state. If nobody can tell it is there, raise it one step.

## Workflow

1. **Decide the deliverable first: ideas or a build.** This comes before everything else and applies even when the user names an effect or a package.
   - A question or a request for options ("what effects could we add?", "would border-beam or glimm work here?", "any ideas for this screen?", "just ideas for now") gets **ideas only**: a bold, specific spread with costs and a recommendation. No project files are created or edited and nothing is installed.
   - An explicit request to add, build, make, wire up, install or explore-and-show gets **the build**.
   - Unclear: give the spread and ask which to build; in a throwaway project, build the recommendation behind a switch instead.
   - Naming an effect or a package is not, by itself, a request to build it or permission to install it. "Add border-beam to the composer" is both. So is a build request that names the package as the means ("make the Pay button pop with glimm", "use border-beam for the loading state"). "Would border-beam suit the composer?" is neither.
2. **If the user points at an effect seen elsewhere** (a link, a video), study it first with [references/reverse-engineering.md](references/reverse-engineering.md) and rebuild the idea in this project's stack. Learn the technique; do not lift a paid kit's code or assets.
3. **Read the stack and the surface.** Framework, existing animation and 3D dependencies, theme handling, SSR, and what rules options out (no React, no WebGL, licence limits).
4. **Find the moments and the ideas.** Open request → run [references/effect-ideation.md](references/effect-ideation.md): moment inventory, meaning, physical metaphor, five-beat staging. Named effect → use the aim questions to sharpen it and skip step 5; step 6 applies on both paths.
5. **Offer a spread across the dial** (open requests). Three or more directions, from a whisper to the showpiece, each with what it costs. Recommend the level the user asked for. With none stated: showpiece in Explore, signature in Finish, and the boldest the surface can carry when they asked for it to pop. For ideas only, stop here. For a build, continue without waiting for a pick: in Explore, build several as switchable variants; in Finish, build the recommendation.
6. **Choose the route** with the ladder below, and clear approvals, on every path, named effect or not. Two things wait: a paid licence, and a new dependency in a shipped codebase (Explore work inside one included) that the user has not asked for. For those, build the strongest dependency-free version now, show the install command, and add the library on a go-ahead. Asking for the package to be added, or for a build naming it as the means, is the go-ahead.
7. **Build it.** Moment effects follow real state and start from the element the user touched; atmosphere follows pointer, scroll, audio or time.
8. **Add the floor** before it ships (listed below). In Explore, list what is still missing instead; the flash limit is never on that list.
9. **Verify** (below) and report: moment, effect, level, route, what it degrades to, and, for an open request, the directions you did not build, one line each with its cost (never skipped). When the user named the effect, alternatives are optional: mention one only if it would clearly serve them better.

## The ladder: routes, from light to heavy

| Rung | Route | Take it when |
| --- | --- | --- |
| 1 | CSS only: `@property` gradients, masks, blend modes, view transitions, scroll-driven animation | The idea is light, an edge, a reveal, or a morph between two DOM states |
| 2 | Hand-rolled SVG filter or 2D canvas | Gooey, grain, displacement, a small particle burst, an audio meter |
| 3 | A single-purpose npm component | One exists for exactly this moment and the project is on its framework |
| 4 | A copy-paste gallery component | You will read it, retheme it, and own it afterwards |
| 5 | WebGL/WebGPU shader or 3D scene | The idea needs per-pixel work on content (distortion, refraction, material) and the surface can afford it |

Pick the rung that delivers the idea at full strength; drop down only when the lower rung looks as good. In Explore, start at whichever rung gets a convincing version on screen fastest.

- Recipes and browser support for rungs 1, 2 and 5, plus SwiftUI equivalents: [references/platform-techniques.md](references/platform-techniques.md). Ready patterns with code: [references/control-patterns.md](references/control-patterns.md), [references/surface-recipes.md](references/surface-recipes.md).
- Rung 3: AI-product moments [references/libraries-dev.md](references/libraries-dev.md); page transitions and in-app sweeps [references/glimm.md](references/glimm.md); copy-in shaders with no framework [references/ittybitty.md](references/ittybitty.md); holographic foil on three.js objects [references/holospot.md](references/holospot.md).
- Rungs 3–5 elsewhere, with licences: [references/effect-libraries.md](references/effect-libraries.md).

Build on the project's existing animation and 3D dependencies where they can do the job. Dependencies are added only for a build, never for an ideas-only answer (workflow step 1), and in a shipped codebase only on a go-ahead (step 6). In a prototype or playground the user asked you to build, install what the idea needs and list it.

## Moment → effect: starting points

First ideas only.

| Moment | First reach | Rule |
| --- | --- | --- |
| Wait under 2 s | Skip the indicator; put the effect on the result arriving | A flashed indicator reads as a glitch |
| Wait of 2 s or more | A living indicator beside a text label | State names the activity ("Searching the web…") |
| Wait over 3 s | Add an edge beam on the element doing the work; a whisper-level mono beam suits a composer used all day | On from the real loading flag, off the moment it ends |
| Primary input or CTA, idle | A pulse or beam on its edge; a pointer-following sheen | It is always visible, so make it one you can live with |
| Commit or success that swaps a view | A wave or sweep from the pressed control that covers the swap, with a lingering rim; the content leaning in while the request runs | Request fires at once; success plays when the real response arrives |
| Route or section change | A shader band or masked wipe with the new page revealed behind it | Shorter for navigation used often; direction says forward or back |
| Voice or recording | A glow or ring driven by the audio level | Never the only sign the mic is live |
| Agent or bot presence | An avatar or orb whose state follows the agent's status | Not for human users |
| Image or media being made | The placeholder resolves into the result | The result needs alt text, even on canvas |
| Premium thing (plan, badge, card, hero headline) | A material: metal, glass, foil, real holographic foil on a 3D card or object | One material family per page reads richest |
| Achievement | A burst from the cause, a wave, a material flash | Scale it up with consequence; a still version under reduced motion |
| Hero or page atmosphere | A shader field, mesh gradient, grain, a scene, a reactive background | Give it a subject, the product's palette, and a response to pointer or scroll |
| Content imagery | A treatment: dither, halftone, fluted or liquid glass, a holographic tilt | One treatment across a set reads as a system |
| Touch (hover, press, drag) | Tilt, magnetic pull, spotlight, ripple from the point of contact, elastic overdrag | Small range, instant response |
| An everyday control (select, tabs, slider, toast, counter) | Trigger morphs into its panel, gliding indicator, stacked fan, rolling digits | Structural moves use no-bounce springs; opening is slower than closing |
| Headline or key number | Type that assembles, a metal or gradient fill, a count that rolls | Keep the real text in the DOM |

## What makes it good

Craft habits; break one on purpose when the idea needs it.

- **Contrast.** An effect reads against stillness. Combine effects freely where they serve one idea; when two unrelated ones compete side by side, give one the lead.
- **Driven, not looping.** Tie it to state, input or audio and let it end. A free-running ambient loop is fine as atmosphere; when it ships it falls under the five-second rule in the floor.
- **Starts where the user touched**, and keeps its physics: light has a direction, waves travel outward, mass settles.
- **Covers the change.** Swap content while the effect hides it; an outcome the user is waiting to read stays outside the covered area.
- **Yours, not stock.** Product palette, state names, origin.

## The floor: required before anything ships

Short on purpose. These are the only hard limits this skill adds, and they apply to shipped work. One applies in every mode, prototypes included: the flash limit. Criteria and sources for the accessibility items are in the accessibility table in [references/platform-techniques.md](references/platform-techniques.md); the frame-rate items are in its Performance floor.

- **No rapid flashing, in any mode.** Nothing flashes more than three times in any second. Cap a large audio-driven glow's rendered rate; smoothing alone does not.
- **Honest.** The action fires on `click` (the up-event, so the keyboard works too), never on pointer-down and never after the effect; only the visual anticipation may start on pointer-down. The effect never holds back a result, hides one the user is waiting to read, or plays success before it is known.
- **Reduced motion has a path.** Handle it yourself unless the library path you used is documented to: a crossfade or still frame replaces travel, distortion, parallax and zoom.
- **Automatic motion stops within five seconds or has a control.** Automatic means not started by the user activating a control: on load, hover, focus, scroll into view, incoming data, idle pulses, atmosphere, timed loops. Beside other content it stops within five seconds or has a visible, keyboard-operable pause, stop or hide control (a site-wide "reduce effects" switch counts). Stopping eventually is not enough. A beam or indicator on a request the user just sent is user-started and may run while that work runs.
- **State has a visible, still cue, and is announced.** Visible text or a changed label says what the effect says, and remains when the effect is off. Write status text into a `role="status"` container that existed before the change (`role="alert"` for failures), never on or inside a button. Colour never carries an outcome alone. `aria-busy` is not a substitute and never goes on the status element or an ancestor of it.
- **The UI underneath still works.** Effect layers are `aria-hidden`, `pointer-events: none` and unfocusable; focus rings and popovers are not clipped, covered or dimmed; text being read is not distorted; after a view swap, focus moves to the new view or the outcome is announced.
- **Legible.** Text on or filled with an effect keeps 4.5:1 (3:1 large) at its worst frame; control edges and state icons keep 3:1.
- **A fallback exists** for no WebGL and slow devices, and the plain version is complete.
- **It holds frame rate.** Pause offscreen and in hidden tabs, cap device pixel ratio, lazy-load heavy runtimes, no per-row instances in long lists.

## Verification

For shipped work (in Explore, a visual check of each variant is enough, and it includes confirming nothing flashes more than three times in a second):

- Trigger the real state (not a storybook toggle): the effect starts on it and ends, or has settled to its still state, when the state ends, including on error and on cancel.
- Emulate `prefers-reduced-motion: reduce`: nothing travels, warps or zooms, and any state the effect conveyed is still shown by a visible, still cue.
- Watch any motion the user did not start by activating a control (on load, hover, focus, scroll into view, incoming data) for six seconds: it has stopped by five, or a pause, stop or hide control is visible, keyboard-operable and works.
- In the accessibility tree: status text is announced on change, and focus lands sensibly after a view swap.
- Disable WebGL or test an unsupported browser: the plain element is complete and usable.
- Keyboard through the area: focus ring visible at 3:1 with the effect running, nothing clipped or covered, effect layers not focusable, and the action fires from the keyboard.
- Check both themes and Safari; profile with CPU throttling: frames hold, and the loop idles offscreen.
- Report what was built, the variants, and what on the floor is open.
- Not run in a browser? Say so.

## Routed depth

- **Coming up with the effect:** [references/effect-ideation.md](references/effect-ideation.md): moments, meanings, metaphors, seven families, intensity levels, five-beat staging.
- **Rebuilding an effect seen elsewhere:** [references/reverse-engineering.md](references/reverse-engineering.md).
- **libraries.dev:** [references/libraries-dev.md](references/libraries-dev.md): border beam, thinking orbs, gooey, voice glow and ring, bot avatars, liquid metal, image FX, distortion waves; placement rules, traps.
- **glimm:** [references/glimm.md](references/glimm.md): sweep transitions for routes and state changes; traps.
- **ittybitty:** [references/ittybitty.md](references/ittybitty.md): 74 small copy-in WebGL2 shaders by job and moment.
- **holospot:** [references/holospot.md](references/holospot.md): physically based holographic foil for three.js.
- **Other libraries:** [references/effect-libraries.md](references/effect-libraries.md): shaders, galleries, Rive, Lottie, 3D; licence traps.
- **Component-level patterns:** [references/control-patterns.md](references/control-patterns.md): motion vocabulary and coded patterns (trigger-to-panel morphs, gliding indicators, elastic drag, fans, number rolls, page reveals).
- **Visual recipes:** [references/surface-recipes.md](references/surface-recipes.md): what makes an effect look expensive, three-layer beam, edge light, glass, gradient card, grain, dissolves. Rendered to copy from: `examples/gallery/index.html`.
- **Platform mechanics:** [references/platform-techniques.md](references/platform-techniques.md): CSS, SVG, canvas, WebGL support; the accessibility table; SwiftUI.
- **Sources/gaps:** [references/sources.md](references/sources.md), [references/coverage-gaps.md](references/coverage-gaps.md).

References are dated 2026-11. Versions, licences and browser support move quickly: check before installing or promising support.
