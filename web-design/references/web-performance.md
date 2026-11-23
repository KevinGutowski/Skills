# Web Performance

*Scope: Makes web apps load fast and feel instant — Core Web Vitals, perceived performance, defer/anticipate/offload triage. Use when a web app feels slow, setting budgets, or debugging dropped frames. Distinct from motion's perf audit (animation pipeline) and optimizing-rails (server). Triggers: web performance, Core Web Vitals, LCP, INP, dropped frames, performance budget.*

**Sources:** [references/sources.md](web-performance/sources.md) — frame.io/Adobe (Roberts) + Config 2025 (Vazquez) + supporting field sources.

The frame: **"Performance is a feature. If it doesn't feel good, it's not working."** And the maxim that kills decoration-first thinking: **"Aesthetics without performance isn't design. It's simply decoration"** (Vazquez). The classic *make it work → make it right → make it fast* loop fails for dynamic apps — fast-at-the-end produces "death by a thousand cuts" jank even when every team did its job. Instead: **"how it feels is as important as how it works the entire way through"** — frame.io budgets **about half of feature-build time** for fluid-UI work, and stopped being surprised by it.

## Contents

- [The two numbers](#the-two-numbers)
- [Fluid UI — the three principles (frame.io)](#fluid-ui--the-three-principles-frameio)
- [Load lifecycle & metrics (Vazquez)](#load-lifecycle--metrics-vazquez)
- [Planning rules](#planning-rules)
- [Custom properties written per frame](#custom-properties-written-per-frame)
- [Process & culture](#process--culture)
- [Checklist](#checklist)
- [Relationship to other skills](#relationship-to-other-skills)

## The two numbers

**60 fps and 16 ms.** 60fps is the frame rate of the web; one frame is ~16.7ms — and on the 120Hz displays most current phones and many laptops ship, ~8ms; budget against the smaller number where animation is concerned. Fluid-app teams "see in frames": thresholds are counted in frames, not vibes. (Their customers ship Oscar movies where one dropped frame is an incident — meet users where their quality bar already is.)

## Fluid UI — the three principles (frame.io)

1. **Instant** — respond to input within **100 ms = 6 frames** (the perceptual "same moment"; INP is the corresponding field metric). The response needn't be the final state — an optimistic, intermediate, or loading state counts; it just must prove you heard them. Tactics: update **local state first** (`useState`/`useOptimistic`) before telling the rest of the app; act on **mousedown, not click**; router caches give "single-frame navigations"; most misses are the browser "recomputing something that it doesn't need to recompute" — memoize.
2. **Smooth** — animations run at 60fps with zero dropped frames. Tactics: `useTransition` to tell React "do the important thing first and the expensive thing later"; **"prefer CSS solutions everywhere"** (the #1 takeaway from migrating a 400k-line codebase) — CSS/WAAPI animations are compositor-driven and survive main-thread load, `requestAnimationFrame` animations don't (Wootonn's stress test); never unmount/remount what isn't changing (the tell is a flicker visible only in slowed recordings).
3. **Coordinated** — the user's click "puts energy into the system," and the UI must answer with **one motion**: everything consequence-of-the-interaction changes **in the same frame** (or staggered as one deliberate orchestration); follow-on content arrives "later, but together." Routing-as-source-of-truth keeps consequences synchronized. Out-of-sync updates read as jank even at 60fps.

## Load lifecycle & metrics (Vazquez)

The car analogy: **TTFB** = key in the ignition → **First Contentful Paint** = dashboard lights → **First Meaningful Paint** = engine running, still in park → **Time to Interactive** = shifts into drive — **"the most critical performance metric for both UX and engineering."** A page that looks ready but can't respond is the worst breach of trust.

- Map to **Core Web Vitals**: LCP (loading), **INP** (responsiveness — superseded FID in 2024; the field version of *Instant*), CLS (layout stability — doctrine in `design-craft` (polish-principles) §17: preload over skeletons, content lands exactly where its placeholder was).
- **Thresholds as a scale**: ~100 ms = lightning; **7 s = the failure point**. Shopify POS dashboard scoring: 1.0 is rarely achievable ("we're competing with our customers' Wi-Fi"); **0.8–0.97 = OK; ~0.5 = go deep**. Treat performance "at the same level as weekly active users." Outcome: checkout time cut by more than half.
- **Bind every principle to a metric** or it's a poster: "Don't make me wait" → app-ready-on-load ("even a 500 ms delay feels like an eternity" mid-transaction); "Smooth like butter" → FPS; "Make it snappy" → responsiveness (catches looks-interactive-but-isn't).
- **Problem-framing cards**: a one-sheet pairing the performance scorecard + product-quality scorecard + satisfaction metrics, reviewed in critiques and quarterly retros — "minimum viable structure" for a shared language; "true craft begins with understanding the problem."
- The usage law (Modisett): "the most important user experience is speed… **the more they use your product, the faster they'll want to go**" — speed includes decision count and click count, not just latency.

## Planning rules

- **Instant-infinity**: "everything on the page that's a list, a customer someday is going to try to make it infinite." You don't have to *build* for millions — you must have a *plan*: anywhere from a hard limit (make overflow an impossible state) to dedicating your best engineers to a virtualized surface. No plan = the future jank is already scheduled.
- **Architecture follows the constraint, then stops moving** (Brotzky, performance.dev 2026): "Apps like Linear get away with CSR because their users log in once and live inside the app all day"; an anonymous first visit on an unknown device (ChatGPT) demands a streamed server-rendered shell with nothing between the visitor and the first input; a network-dependent product ships no service worker because "a stale service worker is one of the few bugs that can outlive the fix you deploy for it." Decide from who arrives and what they wait for, not from framework fashion. Rails-side equivalents: `rails` (optimizing-rails, perceived-speed).
- **Optimize the right work** — jank is usually two things competing for one thread; triage every expensive task:
  - **Defer** — can it wait? (`requestIdleCallback`; don't load the right-click menu's data on page load)
  - **Anticipate** — can it move earlier? (prefetch routes/data so the click is instant)
  - **Offload** — does it belong on the main thread at all? (uploads → web worker; some logic → an API)
- **Perceived performance is real performance**: a faster spinner makes identical load times feel faster; optimistic states, specific progress copy, and choreographed latency (confirm steps that absorb API time) all buy real felt speed. (Animation-side specifics live in [`web-animation-design`](web-animation-design.md).)
- **The too-fast exception** (Yablonski, *Laws of UX*, ch. 10): the Doherty threshold — respond under 400 ms — is the default, but instant responses to work the user believes is *hard* can erode comprehension and trust. "Purposefully adding a delay to a process can actually increase its perceived value and instill a sense of trust, even when the process actually takes much less time." Facebook's Security Checkup animates a scan that finishes far sooner — the pacing makes the thoroughness legible. Reserve for trust-critical operations; never slow routine interactions.
- **Page-load entrances must be CSS** (Heffernan): JS-library entrance animations wait on JavaScript — they visibly delay first paint. Save Motion/React Spring for post-hydration interactions.
- Animating `box-shadow` is expensive; animate the opacity of a pre-rendered shadow layer. Avoid animating inherited CSS variables on ancestors (recalc storms across all children — the Vaul drag bug). When a library does the writing and you cannot move it, register the property instead: [Custom properties written per frame](#custom-properties-written-per-frame).
- **An animation that janks only while the page is busy is a thread problem, not a property problem** (Kowalski): `requestAnimationFrame`-driven motion — including shared-layout animation — shares the main thread with navigation, fetching, and hydration; CSS transitions/keyframes and WAAPI can leave it. Move the indicator, page transition, or loading-adjacent motion to CSS. Per-animation diagnosis (cost tiers, driver/thread table, `will-change`, ordered checklist): [web-animation-design/animation-performance.md](web-animation-design/animation-performance.md).

## Custom properties written per frame

A custom property inherits by default. Changing one on an element makes the browser recompute style for every descendant, whether or not any of them reads it. If the write happens on every scroll or pointer event and the element wraps a long list, style recalculation becomes the whole frame.

**Rule:** a property written per frame on a container must not inherit. Either write it on the one element that uses it, or register it with `inherits: false` (`@property` in CSS, or `CSS.registerProperty`), so the change stays on that element. The cost of registering: descendants no longer see the value, and a `var()` fallback never fires when the registration gives an `initial-value`, because the property is then never unset. (A registration with universal syntax `"*"` and no initial value keeps its fallback.)

### Base UI Scroll Area in Safari (temporary workaround)

> **Remove when fixed.** Checked 2026-11-18 against Base UI `master` (npm latest 1.9.0). The workaround is needed while the project's installed `@base-ui/react` skips registration under `platform.engine.webkit` in `ScrollAreaViewport`. Look for that check before adding the rules, and delete them once the installed version registers the properties in WebKit. A fix to the upstream cause, [WebKit bug 325900](https://bugs.webkit.org/show_bug.cgi?id=325900) (open on that date), is not enough by itself: Base UI versions that carry the check keep skipping registration.

**Symptom:** a Base UI `ScrollArea` with a long list scrolls smoothly in Chrome and Firefox and badly in Safari and every iOS browser. Dmytro (Mintlify) measured 106 ms per frame on 3,000 rows (about 39,000 elements), and 3 ms after the fix. The numbers are his, from one test page.

**Cause:** on every scroll event the viewport writes four properties: `--scroll-area-overflow-x-start`, `-x-end`, `-y-start`, `-y-end`. They exist so you can draw an edge fade, and they are written even when you draw none. Base UI registers them with `inherits: false`, except in WebKit. There a child that opts back in with the `inherit` keyword resolves to the wrong value, so Base UI leaves the properties inheriting and accepts the slow scroll over a broken fade.

**Fix:** register the four properties yourself in the global stylesheet, at the top level and outside any `@layer`. Do not patch `node_modules`. Other engines ignore the duplicate registration.

```css
@property --scroll-area-overflow-y-start {
  syntax: "<length>";
  inherits: false;
  initial-value: 0px;
}
/* repeat for -y-end, -x-start, -x-end */
```

**Check before adding it.** Search CSS, Tailwind classes, inline styles and JS for the four names, and sort each use:

| Where the property is read | After the fix |
| --- | --- |
| On the viewport element itself (a `mask-image` fade on `ScrollArea.Viewport`) | Keeps working |
| On a child, on the viewport's `::before`/`::after`, or through `--scroll-area-overflow-*: inherit` | Breaks in Safari. Move the fade onto the viewport first, usually as a `mask-image` gradient, and confirm that change with the user |
| With a fallback, `var(--scroll-area-overflow-y-end, 40px)` | The fallback stops firing in every browser; the value is `0px` until Base UI's script runs. This matters only where the mask is already valid before hydration, which needs the start variable to have a value or fallback too. In Base UI's published example it does not, so that mask computes to `none` before hydration with or without the fix. Where a project did make the pre-hydration fade work, expect it to appear at hydration instead, and say so |

**Verify in Safari** (a real one, not Chrome's device mode). Scroll the area a little, select the viewport element in the Elements panel, and compare `getComputedStyle($0).getPropertyValue("--scroll-area-overflow-y-start")` with the same call on `$0.firstElementChild`. The viewport should report the scrolled distance and the child `0px`. If the two match, the rules did not load: check that the stylesheet is included and clear the build cache.

The same WebKit bug applies to any property you register with `inherits: false` and then pass down with `inherit`. Read such a property only on the element that owns it. For an edge fade that needs no script at all (registered properties driven by a scroll timeline), see `design-craft` (surfaces, Scroll Fades).

Source: Dmytro (@pqoqubbw), "4 css rules that make safari 35x faster" (X article, 2026-11-17) and its [agent prompt gist](https://gist.github.com/pqoqubbw/a5d168f571d0283269f2987a7de3728f). The general rule and the third table row are this library's reading, not his; the row's behavior was reproduced in Playwright WebKit against Base UI 1.9.0 during review (2026-11-18), frame timing in Safari was not.

## Process & culture

- **Fluid-UI regressions block the PR.** "You cannot merge your PR if you're introducing something that makes anything less instant, less smooth, less coordinated." In-progress features hide behind flags until compliant; audit the whole app periodically anyway.
- **Debug frame-by-frame**: record the screen, scrub frame by frame — "invaluable… you can catch a bug you never see in real time" (an avatar blank for three frames). Same method as the craft-side recording habit in `design-craft` (emil-kowalski); here it's the *acceptance test*. Count frames against the 6-frame budget.
- **Isolate to verify**: "something can't be fast in the app if it's not fast in isolation" (Storybook etc.) — then test in situ for interference.
- **Someone must own app-wide performance** — frame.io's *interface architecture* team: accountable for performance-as-a-feature, embeds with teams at deadlines (so corner-cutting isn't the rational move), and hunts **step-function improvements** that speed everything without taxing feature teams (their app-router migration bought one-frame cached navigations).
- Teach the team to "see in milliseconds" — most people can't at first; recordings and frame budgets are the training wheels.

## Checklist

- [ ] Every interaction responds within 6 frames (~100 ms) with *something* — optimistic, intermediate, or loading?
- [ ] Zero dropped frames in animations; CSS-driven where possible; nothing unmounts/remounts mid-interaction?
- [ ] All consequences of an interaction land in the same frame (or one orchestrated motion); follow-on content arrives together?
- [ ] TTI/INP/LCP/CLS measured, thresholded, and reviewed on a cadence — with each principle bound to a metric?
- [ ] Every list has an infinity plan (limit or engineering)?
- [ ] Expensive work triaged: defer / anticipate / offload?
- [ ] No inheriting custom property written per frame on a container with a large subtree (Base UI Scroll Area in Safari included)?
- [ ] Nothing animates off screen: CSS animations (pseudo-elements included) paused and `requestAnimationFrame` loops canceled outside the viewport ([animation-performance](web-animation-design/animation-performance.md), Work that runs off screen)?
- [ ] Performance regressions block merges; flags gate non-compliant work; periodic audits scheduled?
- [ ] Debugged by frame-stepping a screen recording, not by feel?

## Relationship to other skills

- **`motion`** (performance-audit capability) — ranks *animation* techniques by render-pipeline cost (S–F); this skill owns the app-level loading/interaction discipline around them. Audit an animation there; budget the interaction here.
- **[`web-animation-design`](web-animation-design.md)** — perceived-speed and animation-performance rules (transform/opacity only, under-20px blurs) live there, with dropped-frame diagnosis in its [animation-performance](web-animation-design/animation-performance.md) sub-reference; this skill supplies the frame budgets and process that enforce them.
- **`design-craft`** (polish-principles) — §17 layout stability (anti-skeleton, no-shift loads) is the CLS doctrine; §18's modern CSS primitives are the prefer-CSS toolbox.
- **[`web-typography`](web-typography.md)** — font-loading strategy (WOFF2, subsetting, `font-display`, FOUT-over-FOIT, fallback matching) lives there; this skill owns the budgets it must fit.
- **`rails` (optimizing-rails)** — the server side of TTFB and API latency; this skill takes over once bytes reach the browser. Same measure-first creed.
- **`devtools` (devtool-interface-design)** — the speed usage-law and frequency rules for tools people live in.
- **`swiftui` (swiftui-lazy-stacks)** / **`swiftui` (swift-concurrency)** — the native-platform analogs (scroll perf; coalesce-before-isolation).

> **Staleness note:** framework specifics (Next.js app router, React `useTransition`/`useOptimistic`/compiler, router-cache behavior) are 2024–25-era — verify against current docs. INP replaced FID as a Core Web Vital in March 2024. The frame budgets, fluid-UI principles, triage model, and process rules are the durable layer.
