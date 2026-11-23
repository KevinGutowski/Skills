# glimm: shader sweep transitions

## Contents

- What it is and when to reach for it
- Three ways to use it
- The work/change model
- When your callback runs
- Sizing and feel
- Rules and traps
- Staleness and look it up

*Source: glimm.dev (page, `llms.txt`, `llms-full.txt`), npm registry metadata and the 0.4.1 package build, and the author's agent skill `nomanjack/glimm-skill` (MIT), read 2026-11-18. By Noman Ijaz. Provenance: [sources.md](sources.md).*

## What it is and when to reach for it

A band of iridescent WebGL colour sweeps across the viewport or a box; the outgoing view stays ahead of the band and the new view is revealed behind it. npm `glimm` 0.4.1 (2026-11-06), MIT, about 11 KB by the author's figure, no runtime dependencies, React 18+ and Next 14+ as optional peers, with a framework-agnostic core. The provider's WebGL context is created on the first sweep, so it costs nothing until used. A `GlimmScope` in a browser with HTML-in-Canvas also opens a WebGL2 context when it mounts.

Reach for it for:

- **Page and route transitions** in Next.js or React with almost no wiring.
- **An in-app moment** (plan upgrade, mode switched, a generated result) where the change should arrive behind a sweep, on the whole view or inside one card. When the user is waiting to read the result (a payment), keep the outcome text outside the swept box: see "When your callback runs".
- **The page itself moving with the effect.** Where HTML-in-Canvas is available (Chrome 157+), `GlimmScope` makes the live content gather toward the pressed control and ripple as the band passes, while staying scrollable, clickable and readable by screen readers. Everywhere else the same code gives a plain sweep.

Next to distortion waves in [libraries-dev.md](libraries-dev.md): both cover a swap with a travelling front. Distortion waves bends a *picture* of the DOM in any WebGL2 browser and leaves colour on the rim; glimm keeps the DOM live, handles routing, and distorts content only in Chromium. Both have a non-React entry (glimm's core; distortion waves exports a `WaveController`). In a prototype, try both.

## Three ways to use it

| Use | API | Notes |
| --- | --- | --- |
| Route changes | `GlimmProvider` in the root layout, plus `<InterceptLinks />` (every internal link), `TransitionLink` (one link), or `useTransitionRouter()` (from code). All from `glimm/next` | Opt a link out of `InterceptLinks` with `data-glimm-skip`; on a `TransitionLink` use its `noTransition` prop. The interceptor already ignores modifier-clicks, new-tab, downloads, external and hash links |
| A state change, whole viewport | `useGlimm().sweep(() => setState(…), options)` from `glimm/react` or `glimm/next` | The new state is revealed behind the band. *When* the callback runs depends on the path, and on one path it is held back: do not use this for a confirmed result that must show at once (see "When your callback runs") |
| A state change in one box, with page movement | `GlimmScope` with a ref and `play({ at, work, change, onBurst, onFail })` | Needs no provider. Added in 0.4 |
| No framework | `createShader`, `playSweep` from `glimm`; also `createMeshShader`, `createNamedropShader` (radial bulge reveal) | You own the canvas, swap content in `onMidpoint`, and write both fallbacks yourself (see Rules) |

## The work/change model

`GlimmScope.play()` takes the real request and the resulting state change separately, and that split is worth copying for any hand-built effect:

- `work` starts on the click (the up-event, in your `onClick`; never wire it to pointer-down). The content leans in toward `at` while it runs, however long that takes.
- `change` runs the moment the work resolves, behind the band. It receives the work's result.
- If `work` rejects there is no sweep and nothing changes (`onFail`). Make it reject on a bad status; `fetch` does not throw on a 500.
- `onBurst` fires when the band breaks away (and, on the no-animation fallback, right after `change`). It never fires when `work` rejects. Clear the pressed control's busy state in **both** `onBurst` and `onFail`, and do not wait for `onLeave`.
- A later `play()` interrupts the current *animation*. It does not cancel or dedupe the work: two quick presses start two `work` calls, and only the latest result reaches the UI. So there is no need to queue plays or lock controls for the animation's sake, but keep the app's own guard on anything that must not run twice (a payment, an upgrade, a save): ignore the press or disable the control while the request is in flight, or make the request idempotent.
- `anticipate: true` is for events nobody pressed (a payment arriving), so the page has time to lean in first. On a press it would add a wait.

The effect follows the work, so the *commit* is never delayed and success never shows for something that failed. What the user can *see* is another matter: the band still has to pass before the updated content is uncovered (next section), so the Honest item of the shipping floor is only half met by this model, and the other floor items are still yours.

## When your callback runs

Read from the 0.4.1 build. The callback passed to `sweep()`, and the navigation behind `TransitionLink`, `useTransitionRouter` and `InterceptLinks`, does not run at one fixed point:

| Path | When the state or route update runs | What the user sees |
| --- | --- | --- |
| Browser has same-document View Transitions | **At the start**, while the browser prepares its snapshot. The provider waits up to about 200 ms for React to commit | The old view is a snapshot ahead of the band; the already-updated view is uncovered behind it |
| No View Transitions | After an opaque curtain has covered the view, at about the `midpoint` fraction of the sweep | Curtain covers, update happens underneath, curtain reveals |
| Reduced motion, or no WebGL controller | **Immediately**, with no sweep | A plain update |
| `GlimmScope`, normal | `change` runs when `work` resolves | The band breaks away as it does, but the scope shows a copy of the outgoing content ahead of the band, so the updated content inside the box is uncovered only as the band passes. A browser test found a receipt still covered more than 500 ms after the commit |
| `GlimmScope` under reduced motion, a hidden tab, or no WebGL | `work` still runs, then `change`, with no animation | A plain update |
| Vanilla `playSweep` | `onMidpoint`, at the `midpoint` fraction, on every path, because the core has no fallbacks | Whatever you built |

**A result the user is waiting on must be readable at once.** Every glimm path that reveals content behind the band hides some of it for a while after it exists:

- the provider on the no-View-Transitions path covers the view with its curtain before running the update (a browser test measured about 730 ms);
- `GlimmScope` commits promptly but keeps the outgoing content in front until the band has passed (more than 500 ms in the same kind of test).

That is fine for navigation and for changes nobody is waiting to read. For a confirmed payment, a completed save or any result that must be visible the moment it exists, do one of these:

- **Keep the result outside the swept area.** Put the outcome (the "Paid" line, the amount, the receipt summary) outside the scope's box or above it, update it immediately, and let the sweep run over the rest: the form collapsing, the card's decoration, the background.
- **Use a decorative overlay that leaves it readable.** Update the state immediately yourself and add the core `playSweep` on your own canvas with no `onMidpoint` work, kept translucent (a low `peakAlpha`) or confined to the result's frame, the pressed button or the page edge, with your own reduced-motion and WebGL checks.

Do not use a provider `sweep()` with an empty callback for this: where View Transitions are unavailable the provider still paints its opaque curtain, which would cover a receipt that has already rendered.

Provider `sweep()` and the route triggers remain right for navigation and for changes the user is not waiting to read.

So do not put logic in the callback that assumes it fires mid-animation or that an animation is on screen, and do not time other work against "the midpoint" when using the provider. The handle's `midpoint` promise settles after the callback has finished on every path that runs to completion, and `done` after the outro; use those for sequencing. A cancelled, interrupted or timed-out sweep (the provider gives up waiting on a commit after 8 s) settles both early, so they are not proof the update landed. Any per-call `onMidpoint` passed to `sweep()` runs right after the update on the same path.

## Sizing and feel

Starting points from the author:

| What changed | `GlimmScope` props |
| --- | --- |
| The whole page or view | `curve={0.12}` |
| Something notable in one place | `curve={0.22} span={0.64} fade={[0.16, 0.64]}` |
| One element, scope around just it | `curve={0.06} bandTight={34}` |

- **Timing (provider and `sweep()`):** `sweepMs` defaults to 1100 for navigation. For in-app `sweep()` moments use roughly 650–900. For navigation used often, 650 with `outroMs` 150 and an `easeOutExpo` curve keeps it brisk; for a rare showpiece, 1400 with `easeInOutQuint` and more `swellAmount`.
- **Timing and props (`GlimmScope`):** its own `sweepMs` defaults to 1600, and the author suggests about 2700 for a whole page. It takes `sweepMs`, `gatherMs`, `bandTight`, `peakAlpha`, `brightness`, `swellAmount`, `curve`, `span`, `fade`, `intensity`, `direction` and `pageEffect`. It has no `outroMs`, `easing`, `midpoint`, `waveAmount` or `rippleAmount`.
- **Direction carries meaning:** `ltr`, `rtl`, `ttb`, `btt`. Send the band away from the control that caused it, or reverse it for "back".
- **Palette:** seven presets (`spectrum`, `prism`, `berry`, `lagoon`, `citrus`, `azure`, `ember`) or a custom cosine palette `{a, b, c, d}`. `accentPair(hexA, hexB)` and `accentChain(hexes)` build one from brand hexes; `shuffleAccentPalette()` takes no input and returns a random palette from glimm's built-in accents. In 0.4.1 these helpers are exported from the core entry `glimm` only (the vendor docs show them under `glimm/next`, which does not export them), so import them from `glimm`. Very dark or very light brand hexes flatten the band, so start from the brand's mid-tones. Lower `brightness` to about 0.85–0.9 on dark themes.
- **Shape:** `bandTight` (lower is wider and softer) and `swellAmount` everywhere; `waveAmount` (edge displacement, off by default) and `rippleAmount` on the provider and `sweep()` only.

## Rules and traps

- **Mount `GlimmProvider` in the root layout.** In a nested layout it remounts across layout boundaries and drops the transition mid-flight. The root layout can stay a server component.
- **One entry point per app for the provider and hooks.** Everything from `glimm/next`, or everything from `glimm/react`. This is the author's rule, given so that provider and hooks share one React context; in the 0.4.1 build both entries share one chunk, so treat it as a convention to follow. Core-only helpers (palettes, `createShader`) come from `glimm` and do not break it.
- **With the React and Next adapters, do not write a reduced-motion or WebGL guard, or a browser-support branch.** `GlimmProvider`, `useGlimm().sweep` and `GlimmScope` handle them: reduced motion and missing WebGL both update instantly with no sweep; where same-document View Transitions are missing or fail, an opaque curtain covers the swap; and the scope picks the page effect or the plain sweep itself. `GlimmProvider` also has a `reducedMotion` prop (`'instant'` by default); `'sweep'` plays the sweep for people who asked for reduced motion, so do not set it in product UI.
- **The vanilla core has no automatic fallbacks.** In 0.4.1, `createShader` returns `null` when it cannot get a WebGL context, and `playSweep` does not check `prefers-reduced-motion`. Before calling them, check both yourself and take the plain path: if the visitor prefers reduced motion or the controller is `null`, run the content swap immediately and skip the sweep.
- **Give a `GlimmScope` a size.** It clips to its box and fills it, and where the page effect runs the content does not give the box its height: a card or section without a set height collapses. `position: absolute; inset: 0` suits a positioned shell; in a flex shell use `flex: 1; min-height: 0`. Scrolling content must scroll inside the scope.
- **A handful of scopes per page.** Each uses its own WebGL contexts and the author cites a limit of 16 live contexts per page. Never one per row.
- **Slow routes are not held.** The provider waits about 200 ms for the new route to commit; past that the old page stays live and the band sweeps when the new view arrives. Prefetch routes that should transition cleanly.
- **Length.** A sweep on its own is short and user-started. A `GlimmScope` with `work` holds its lean-in and a shimmering band for as long as the request runs, so always keep a visible text status beside it, and for work that can run long consider `pageEffect={false}`. Do not loop sweeps on a timer in shipped UI: that is automatic motion and falls under the five-second rule in SKILL.md.
- **Offer the off switch for page movement.** `usePageEffect()` returns `[on, setOn]`, remembered on the device; `pageEffect={false}` turns it off for a scope.
- **Check the installed version.** `GlimmScope` and the page effect need 0.4+. Confirm exports against the installed type definitions before using them.
- **Frequency is a tuning input.** The author's own advice is to keep sweeps for milestones, confirmed actions, focused modes and section-level navigation, and off hover, menus, list edits and loading states. Under this skill that is a default for shipped product UI, not a veto: when a sweep is wanted on frequent navigation, shorten it, and use `data-glimm-skip` on the highest-traffic links.
- **Install only for a build the user asked for.** In a shipped codebase, a package the user has not asked for waits: build the strongest dependency-free version now, show the install command, and add it on a go-ahead. Asking for the package to be added, or for a build that names it as the means, is the go-ahead; mentioning it or asking whether it would suit is not. Do not run the vendor's skill installer (`npx skills add nomanjack/glimm-skill`) for the user; mention it.

## Staleness and look it up

Captured 2026-11-18. Single author, below 1.0, and the page-movement feature is labelled experimental and depends on a browser API that only just shipped. The author's pixel tests cannot verify Firefox (its screenshot path omits active View Transitions), so Firefox's boundary is checked by eye only. Trust the installed types and the live docs over this file.

- Docs: <https://glimm.dev> · for agents: <https://glimm.dev/llms.txt>, <https://glimm.dev/llms-full.txt> · changelog: <https://glimm.dev/changelog>
- Author's agent skill, with tuning and vanilla references: <https://github.com/nomanjack/glimm-skill>
- HTML-in-Canvas: <https://developer.chrome.com/blog/html-in-canvas>
- Registry check: `npm view glimm version time.modified`
