---
name: web-performance
description: "Makes web apps load fast and feel instant — Core Web Vitals, perceived performance, defer/anticipate/offload triage, performance budgets. Use when a web app feels slow or janky, setting budgets, or debugging dropped frames. Distinct from motion's perf audit (animation pipeline) and optimizing-rails (server). Based on frame.io/Adobe + Config 2025. Triggers: web performance, Core Web Vitals, LCP, INP, dropped frames, performance budget."
---

# Web Performance

**Sources:**
- *"Betting on the web: ensuring fine-tuned performance for dynamic web apps" — Charlton Roberts, frame.io/Adobe (Vercel conference; surfaced via Emil Kowalski's animations.dev Vault). The fluid-UI process discipline.*
- *"Crossing the chasm between quality and performance" — Ricardo Vazquez (Dropbox, ex-Shopify POS), Figma Config 2025. The metrics-and-principles layer.*
- *Supporting field sources: Josh Wootonn's sidebar-performance study; Henry Heffernan and Dennis Brotzky (animations.dev interviews); Henry Modisett (Perplexity, Config 2024).*

The frame: **"Performance is a feature. If it doesn't feel good, it's not working."** And the maxim that kills decoration-first thinking: **"Aesthetics without performance isn't design. It's simply decoration"** (Vazquez). The classic *make it work → make it right → make it fast* loop fails for dynamic apps — fast-at-the-end produces "death by a thousand cuts" jank even when every team did its job. Instead: **"how it feels is as important as how it works the entire way through"** — frame.io budgets **about half of feature-build time** for fluid-UI work, and stopped being surprised by it.

## The two numbers

**60 fps and 16 ms.** 60fps is the frame rate of the web; one frame is ~16.7ms. Fluid-app teams "see in frames": thresholds are counted in frames, not vibes. (Their customers ship Oscar movies where one dropped frame is an incident — meet users where their quality bar already is.)

## Fluid UI — the three principles (frame.io)

1. **Instant** — respond to input within **100 ms = 6 frames** (the perceptual "same moment"; INP is the corresponding field metric). The response needn't be the final state — an optimistic, intermediate, or loading state counts; it just must prove you heard them. Tactics: update **local state first** (`useState`/`useOptimistic`) before telling the rest of the app; act on **mousedown, not click**; router caches give "single-frame navigations"; most misses are the browser "recomputing something that it doesn't need to recompute" — memoize.
2. **Smooth** — animations run at 60fps with zero dropped frames. Tactics: `useTransition` to tell React "do the important thing first and the expensive thing later"; **"prefer CSS solutions everywhere"** (the #1 takeaway from migrating a 400k-line codebase) — CSS/WAAPI animations are compositor-driven and survive main-thread load, `requestAnimationFrame` animations don't (Wootonn's stress test); never unmount/remount what isn't changing (the tell is a flicker visible only in slowed recordings).
3. **Coordinated** — the user's click "puts energy into the system," and the UI must answer with **one motion**: everything consequence-of-the-interaction changes **in the same frame** (or staggered as one deliberate orchestration); follow-on content arrives "later, but together." Routing-as-source-of-truth keeps consequences synchronized. Out-of-sync updates read as jank even at 60fps.

## Load lifecycle & metrics (Vazquez)

The car analogy: **TTFB** = key in the ignition → **First Contentful Paint** = dashboard lights → **First Meaningful Paint** = engine running, still in park → **Time to Interactive** = shifts into drive — **"the most critical performance metric for both UX and engineering."** A page that looks ready but can't respond is the worst breach of trust.

- Map to **Core Web Vitals**: LCP (loading), **INP** (responsiveness — superseded FID in 2024; the field version of *Instant*), CLS (layout stability — doctrine in `make-interfaces-feel-better` §17: preload over skeletons, content lands exactly where its placeholder was).
- **Thresholds as a scale**: ~100 ms = lightning; **7 s = the failure point**. Shopify POS dashboard scoring: 1.0 is rarely achievable ("we're competing with our customers' Wi-Fi"); **0.8–0.97 = OK; ~0.5 = go deep**. Treat performance "at the same level as weekly active users." Outcome: checkout time cut by more than half.
- **Bind every principle to a metric** or it's a poster: "Don't make me wait" → app-ready-on-load ("even a 500 ms delay feels like an eternity" mid-transaction); "Smooth like butter" → FPS; "Make it snappy" → responsiveness (catches looks-interactive-but-isn't).
- **Problem-framing cards**: a one-sheet pairing the performance scorecard + product-quality scorecard + satisfaction metrics, reviewed in critiques and quarterly retros — "minimum viable structure" for a shared language; "true craft begins with understanding the problem."
- The usage law (Modisett): "the most important user experience is speed… **the more they use your product, the faster they'll want to go**" — speed includes decision count and click count, not just latency.

## Planning rules

- **Instant-infinity**: "everything on the page that's a list, a customer someday is going to try to make it infinite." You don't have to *build* for millions — you must have a *plan*: anywhere from a hard limit (make overflow an impossible state) to dedicating your best engineers to a virtualized surface. No plan = the future jank is already scheduled.
- **Optimize the right work** — jank is usually two things competing for one thread; triage every expensive task:
  - **Defer** — can it wait? (`requestIdleCallback`; don't load the right-click menu's data on page load)
  - **Anticipate** — can it move earlier? (prefetch routes/data so the click is instant)
  - **Offload** — does it belong on the main thread at all? (uploads → web worker; some logic → an API)
- **Perceived performance is real performance**: a faster spinner makes identical load times feel faster; optimistic states, specific progress copy, and choreographed latency (confirm steps that absorb API time) all buy real felt speed. (Animation-side specifics live in `web-animation-design`.)
- **Page-load entrances must be CSS** (Heffernan): JS-library entrance animations wait on JavaScript — they visibly delay first paint. Save Motion/React Spring for post-hydration interactions.
- Animating `box-shadow` is expensive; animate the opacity of a pre-rendered shadow layer. Avoid animating inherited CSS variables on ancestors (recalc storms across all children — the Vaul drag bug).

## Process & culture

- **Fluid-UI regressions block the PR.** "You cannot merge your PR if you're introducing something that makes anything less instant, less smooth, less coordinated." In-progress features hide behind flags until compliant; audit the whole app periodically anyway.
- **Debug frame-by-frame**: record the screen, scrub frame by frame — "invaluable… you can catch a bug you never see in real time" (an avatar blank for three frames). Same method as the craft-side recording habit in `emil-design-eng`; here it's the *acceptance test*. Count frames against the 6-frame budget.
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
- [ ] Performance regressions block merges; flags gate non-compliant work; periodic audits scheduled?
- [ ] Debugged by frame-stepping a screen recording, not by feel?

## Relationship to other skills

- **`motion`** (performance-audit capability) — ranks *animation* techniques by render-pipeline cost (S–F); this skill owns the app-level loading/interaction discipline around them. Audit an animation there; budget the interaction here.
- **`web-animation-design`** — perceived-speed and animation-performance rules (transform/opacity only, under-20px blurs) live there; this skill supplies the frame budgets and process that enforce them.
- **`make-interfaces-feel-better`** — §17 layout stability (anti-skeleton, no-shift loads) is the CLS doctrine; §18's modern CSS primitives are the prefer-CSS toolbox.
- **`optimizing-rails`** — the server side of TTFB and API latency; this skill takes over once bytes reach the browser. Same measure-first creed.
- **`devtool-interface-design`** — the speed usage-law and frequency rules for tools people live in.
- **`swiftui-lazy-stacks`** / **`swift-concurrency`** — the native-platform analogs (scroll perf; coalesce-before-isolation).

> **Staleness note (Kevin's rule):** framework specifics (Next.js app router, React `useTransition`/`useOptimistic`/compiler, router-cache behavior) are 2024–25-era — verify against current docs. INP replaced FID as a Core Web Vital in March 2024. The frame budgets, fluid-UI principles, triage model, and process rules are the durable layer.
