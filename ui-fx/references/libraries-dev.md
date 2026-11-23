# Libraries.dev: Jakub Antalik's effect set

## Contents

- What it is and when to reach for it
- Placement rules (the author's)
- The set
- Distortion waves: a transition that carries a state change
- Rules that hold for every package
- Per-package traps
- Staleness and look it up

*Source: libraries.dev, its `llms.txt` and per-library agent references, the `Jakubantalik/Libraries.dev` repository (MIT) and its bundled agent skill, npm registry metadata, and the two X posts that prompted this skill. Read 2026-11-18. Provenance and what was skipped: [sources.md](sources.md).*

## What it is and when to reach for it

A set of small React packages, mostly one component each, for effects that normally need a shader specialist, tuned by props. Beam, voice glow, metal, image and waves wrap the element you already have and leave its semantics alone; orbs, avatars and voice ring render their own canvas. Several have SwiftUI and React Native ports that live in the repository, not on npm. The set is aimed at AI-product surfaces (waiting, streaming, voice, agents, generated images), which is where its placement rules are strongest.

Reach for it when a moment you picked matches a row below and the project is React 18+. It is also the fastest way to get a convincing effect on screen while exploring. Not React, or the moment is not in the table: hand-roll ([platform-techniques.md](platform-techniques.md)) or pick from [effect-libraries.md](effect-libraries.md).

## Placement rules (the author's)

These come from the library author and are the most reusable part of the source. They apply to any waiting effect, whoever made it.

**By wait length** (estimate it from the code: streamed replies, agent runs, image generation and uploads are long; small fetches, toggles and route changes are short):

| Wait | Add |
| --- | --- |
| Under 2 s | Nothing. A flash of an indicator reads as a glitch. |
| 2 s or more | A thinking indicator, usually beside a text label. |
| More than 3 s | Also a border beam on the element doing the work, `active` bound to the real loading flag. For waits that run well past five seconds in shipped UI, see the pause rule under "Rules that hold for every package". |

**Subtle use.** The quiet end of these packages is often the right one for product UI: `colorVariant="mono"` with `strength` around 0.3–0.5 gives a composer a faint moving edge that can stay on through every reply, where the full-colour beam would tire. `pulse-inner` in mono reads as a breath. Metal, orbs and glow have matching quiet settings in their references. When the user asked for subtle, or the element is on screen all day, start at mono and low strength and turn it up until it is just noticeable, then one step more. Otherwise use the level chosen on the SKILL.md dial.

**By element:**

| Spot | Effect |
| --- | --- |
| Prompt input or CTA to highlight while idle | Border beam, pulse type: `pulse-inner` on a button, `pulse-outside` on an input |
| Input that loads after submit (search, ask, command bar) | Border beam `line`, from submit until results arrive |
| Chat composer while the model streams | Border beam `md`, `active={isStreaming}` |
| Hero `h1` or key headline | Liquid metal text |
| "New" / "Pro" badge; a CTA that sells ("Upgrade", "Get Pro") | Liquid metal badge / button |
| Anything voice or recording | Voice glow (input edge) or voice ring (standalone) |
| A bot or agent's avatar | Bot avatars, state from the agent's real status |
| An image being generated, uploaded or regenerated | Image FX |
| Pieces that should merge, stretch or melt (speed-dial menu, tab indicator, dragged card) | Gooey |
| A confirm, send or success that swaps one view for another | Distortion waves |

**Density (the author's guidance for product UI):** one effect per UI area (a sidebar, a thread, a composer, a card), and not two on the same element or on neighbours; effects in different areas coexist. Treat this as the default for shipped screens, and ignore it freely in a playground or concept. An indicator plus a beam for one wait is one idea and is fine, and a user's explicit request for two effects overrides the default. When two fit one spot and look equally good, take the cheaper one. Cost order: thinking orbs and border beam are light (2D canvas, CSS layers); voice, avatars and gooey are moderate; metal, image and waves run WebGL.

**No clear match:** hand-roll it or look in [effect-libraries.md](effect-libraries.md).

## The set

Versions and dates are the npm `latest` on 2026-11-18. All MIT, peer dependency React 18+, no runtime dependencies unless noted.

| Library | Package · component | Renders with | Ports in repo |
| --- | --- | --- | --- |
| Border beam | `border-beam` 1.4.1 · `BorderBeam` | CSS layers, `@property`, shared rAF for pulse | React Native (Skia + Reanimated), SwiftUI (`BorderBeamKit`) |
| Thinking orbs | `thinking-orbs` 0.3.2 · `ThinkingOrb` | 2D canvas arcs; sizes 64 and 20 are tuned (the type also accepts an untuned 32) | React Native, SwiftUI (`ThinkingOrbsKit`) |
| Gooey | `liquid-gooey` 0.2.2 · `Liquid`, `Liquid.Item` | SVG filter (blur + threshold) | none |
| Voice glow | `voice-glow` 0.3.0 · `VoiceBeam`, `useMicrophone` | blurred layers + canvas, SVG warp | SwiftUI (`VoiceGlowKit`) |
| Voice ring | `voice-ring` 0.2.0 · `VoiceRing`, `useMicrophone` | 2D canvas + small WebGL lens pass | SwiftUI (`VoiceRingKit`) |
| Bot avatars | `bot-avatars` 0.2.2 · `BotAvatar` | 2D canvas, baked per body type | React Native, SwiftUI (`BotAvatarsKit`) |
| Liquid metal | `metal-fx` 2.0.11 · `MetalFx`, `MetalText`, `MetalBadge` | one shared WebGL2 context, ~15 fps | React Native, SwiftUI (`MetalFxKit`, iOS 17+) |
| Image FX | `img-fx` 0.5.1 · `ImageGeneration` | shared three.js renderer, 10 fps; peer `three` | none |
| Distortion waves | `distortion-waves` 0.1.0 · `DistortionWave` | one WebGL2 canvas over your DOM | SwiftUI (`DistortionWavesKit`, iOS 17+, Metal) |

Thinking-orb states name the activity: working, searching, solving, listening, connecting, weaving (planning), composing, breathing (thinking), shaping. Pick the one that matches what the agent is doing; do not rotate them for variety.

## Distortion waves: a transition that carries a state change

Announced for desktop React on 2026-11-17 (it shipped first for SwiftUI) and published to npm as `distortion-waves` 0.1.0 on 2026-11-18 (MIT, React 18+ peer, no dependencies): `npm install distortion-waves`. It is a first release; pin the version and check the registry for a newer one.

What it does, as seen in the demo video: on Confirm the card's content pulls slightly toward the button with a trace of colour fringing, a blurred rainbow lens rises from the button across the card, the content swaps underneath it ("Sending to" becomes "Sent to", the avatar becomes a check), and colour lingers on the card's rim for a beat before clearing. The swap is never seen directly. That is the transferable idea; it is unpacked as a five-beat anatomy in [effect-ideation.md](effect-ideation.md).

Use rules:

- Three types: `vertical` (up from a button at the bottom, the default), `horizontal` (across from an edge or side tab), `center` (a ring out from an avatar or icon inside a dialog; the source stays sharp so it can change in place).
- `source` is the element the wave opens from. A click leans the wave toward the pointer. Set `revealed` back to false and the wave collapses into the source.
- The wave bends a **picture** of your views. By default the picture is re-taken when the DOM changes mid-wave but not for running animations, so those stand still while it passes (`live="animations"` follows them at a cost). Put the triggering button, spinners and video in `overlay`, which stays live and unbent.
- Both views need an opaque background. Cross-origin images and fonts need CORS to appear in the picture; iframes are left out.
- Give the element its corner radius and `overflow: hidden`; the rim colour follows the corners.
- Without WebGL2, and under reduced motion, it becomes a crossfade. That fallback is built in; do not disable it (`reducedMotion="never"`) in product UI.
- SwiftUI: keep UIKit-backed views and materials out of both sides, since SwiftUI cannot pass them through a shader, and build through Xcode (SwiftPM alone does not compile the Metal shaders).
- Palette reinforces meaning in the demo (multicolour for a transfer, green for credits added). Tie it to the outcome, or use `mono`. Colour never carries the outcome alone: the text and icon say it too (WCAG 1.4.1).

For route changes, or content that must stay live while it moves, see [glimm.md](glimm.md).

It is at its best on a consequential commit: payment sent, credits added, document published. For things done many times a session, turn it down (shorter travel, mono palette, less blur) or keep it for exploration.

## Rules that hold for every package

- **Read the package's reference before writing a prop.** The per-library agent references are at `https://libraries.dev/llms/<package>.md` for the seven packages listed in `https://libraries.dev/llms.txt`. Voice ring and distortion waves had no agent reference on 2026-11-18 (those URLs returned 404): read `libraries.dev/voice-ring`, `libraries.dev/waves` and each package's README instead. The agent references list the options the playgrounds expose, which can be a subset of the published API: border-beam 1.4.1's types also accept four more `colorVariant` values (`forest`, `candy`, `ice`, `gold`) and the props `duration`, `borderRadius`, `brightness`, `saturation`, `glowSize`, `hueRange`, `staticColors`, `css`, `onActivate` and `onDeactivate`. The installed package's type definitions are the authority. Props, values and defaults differ per library and the playground's "Copy prompt" text has at least one known error (it lists a `dark` prop on thinking orbs; the prop is `theme`).
- **Drive work indicators from real state.** `active`, `state`, `revealed`, `paused` come from the loading flag, stream status, mic stream or job status, never from a timer that pretends work is happening, and never left on after the work ends: unmount or deactivate. A timer that stops or stills an idle or automatic effect inside five seconds is fine.
- **Client only.** The packages use hooks and ship no `"use client"` directive. In the Next.js App Router, render them from a client file. Metal needs a client-only mount to avoid a hydration mismatch; image needs one on light-theme pages (it assumes dark on the server); voice glow may need one if hydration warnings appear.
- **Pin the theme** from your own theme state on SSR pages. `theme="auto"` renders dark on the server.
- **The effect is decorative; state lives in a visible, still cue.** Beam, glow, gooey, metal and image layers are `aria-hidden` or unlabelled. Thinking orbs and bot avatars are `role="img"` canvases with a default per-state `aria-label`: pass your own label, or set `aria-hidden` when adjacent text already states the status, so it is not read twice. None of them is a live region. Show a visible "Thinking…" label or equivalent beside the control and write it into a `role="status"` container that exists before the state changes (`role="alert"` for failures), never on or inside a button. `aria-busy` is not a substitute and never goes on the status element or an ancestor of it: when the beam is off for reduced motion, something on screen must still say the work is running.
- **Automatic motion needs a stop or a control when shipped.** A beam, pulse or glow the user did not start (an idle pulse on a prompt input, a beam on a featured card, anything from page load or hover) that sits beside other content must stop within five seconds or have a visible, keyboard-operable pause, stop or hide control (WCAG 2.2.2). Options: keep the idle pulse to a few cycles inside five seconds, or expose a "reduce effects" setting that turns `active` off. A beam or orb on a request the user just sent is user-started and may run while it runs, with the text status beside it; on very long waits, switching a rotating beam to a static ring is a calmer choice, not a requirement.
- **Reduced motion is uneven across the set**, despite the site's blanket claim. Verified per reference, README or published build on 2026-11-18:

  | Handles it | You must handle it |
  | --- | --- |
  | Thinking orbs (one still frame), bot avatars (still pose, checked at render only), voice glow (stops ambient motion, keeps the meter), border beam pulse types (glow never shows, so pair a non-motion cue), distortion waves (crossfade), gooey morph (snaps), voice ring (holds its clocks; exact still behaviour is not documented, so test it) | Border beam rotate types `md`/`sm`/`line` (gate `active`), liquid metal (pass `paused`), image FX (`paused` only while waiting, or the image never reveals), gooey move/bend/melt (gate your own drag or animation) |

- **Keep live instances to a handful per screen.** Every reference warns against rows, tables and dense grids. Most pause offscreen through `IntersectionObserver`; gooey does not.
- **Install only for a build the user asked for**, never for an ideas-only answer. In a shipped codebase, a package the user has not asked for waits: build the strongest dependency-free version now, show the install command, and add it on a go-ahead. Asking for the package to be added, or for a build that names it as the means, is the go-ahead; mentioning it or asking whether it would suit is not. In a prototype they asked you to build, install and list it. Install only the package the reference names. Do not run the vendor's skill installer (`npx libraries-dev skill`, `npx skills add …`) on the user's behalf; mention it and let them run it.

## Per-package traps

Only what goes wrong even with the reference open.

| Package | Trap | Fix |
| --- | --- | --- |
| Border beam | Wrapper is a block `<div>`, so the beam draws full width around a narrow button | Flex/grid parent, or `display: inline-block` / `width: fit-content` on the wrapper |
| Border beam | Most types clip (`overflow: hidden`): child shadows, dropdowns, outside focus rings are cut | Shadow on the wrapper; portal popovers; check the focus ring is still visible |
| Border beam | Radius read from the first child; falls back to 16 px (`sm`: 32 px) | Put the rounded element directly inside |
| Border beam | Snippet copied from the paused playground contains `active={false}` | Drive `active` from state |
| Border beam | Default theme is dark; washed out on white | `theme="light"` |
| Thinking orbs | Scaled with CSS, so the canvas blurs | Use `size`; only 64 and 20 are tuned |
| Thinking orbs | Dark dots on a dark card inside a light app | Pin `theme` |
| Liquid metal | Two presets or themes on one page: one shared material, last one wins | One metal colour per page; keep metal elements apart |
| Liquid metal | Child's own background, border and shadow are stripped | Put a custom fill on the wrapper |
| Liquid metal | No WebGL2: plain child, no ring; reflections only in dark theme | Make sure the plain child is a complete button |
| Liquid metal | React StrictMode froze the shared renderer in the vendor's own playground | Test in dev with StrictMode before committing |
| Image FX | Child has no size, so the card is 1 px | Size the child |
| Image FX | Revealed image is a canvas with no alt text | Add `role="img"` and `aria-label` on the wrapper, or keep a visually hidden (clipped, not `display: none` or `hidden`) `<img alt="…">` beside it |
| Gooey | Opaque item backgrounds hide the liquid; group box too small for the travel | Transparent items; size the group to the open footprint |
| Gooey | WebKit rasterises SVG filters on the CPU (the vendor's statement) | Small, few groups; test on Safari |
| Voice glow / ring | Mic started outside a click; mic left open | Start in the gesture; call `stop()` when the voice UI closes |
| Voice glow | Passing `level` as React state 60 times a second | Pass a getter |
| Voice glow | The glow is the only sign the mic is live | Keep a visible mic state and a text status |
| Bot avatars | Tight parent with `overflow: hidden` crops the hop | Leave room above; size with `size`, not CSS |
| Bot avatars | Used for human users, or as a loader with no agent behind it | Photo or initials; a plain indicator |

## Staleness and look it up

Captured 2026-11-18. The set is young and moves weekly: single author, several packages below 1.0, a paid Pro tier (extra palettes, a tuning Studio, a Pro agent skill, a team MCP server) whose exports are licensed per plan rather than MIT, and on-device models (Magnetic UI, Voice position) under a separate model license that restricts commercial shipping. The site's own counts disagree with each other (seven libraries in `llms.txt`, nine on the site). Trust the registry and the per-package reference over this file.

- Index for agents: <https://libraries.dev/llms.txt> · one file: <https://libraries.dev/llms-full.txt>
- Per-library reference: `https://libraries.dev/llms/<package>.md`
- Playgrounds: <https://libraries.dev/beam>, `/orbs`, `/gooey`, `/voice`, `/voice-ring`, `/waves`, `/bots`, `/metal`, `/image`
- Source and ports: <https://github.com/Jakubantalik/Libraries.dev> (`packages/<name>/ports/`)
- Registry check: `npm view <package> version time.modified`
