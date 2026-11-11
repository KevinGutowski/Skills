# Animation Performance — Diagnosing Dropped Frames

*Scope: why a specific web animation stutters and what to change. Covers property cost tiers, which thread drives the animation, the traps that use `transform` and still jank, and when `will-change` earns its place. App-level budgets, load metrics, and process live in `web-design` (web-performance); a ranked scan of a whole codebase's animation techniques is the `motion` skill's performance-audit capability. Choosing easing or duration is not a performance question — see [web-animation-design](../web-animation-design.md).*

Source: Emil Kowalski's `animation-performance` skill and performance cheatsheet (emilkowalski/skills, MIT, rev `715c180`, 2026-11), adapted. Library version claims are upstream's — see the staleness note at the end.

## Contents

- Rules before touching code
- Symptom → first move
- Frame budget
- What you animate: cost tiers and swaps
- Where it runs: driver and thread
- React: never animate through state
- Two traps that look correct
- `will-change`
- Is JS animation the problem?
- Diagnosis order
- Reporting a finding
- Scoped conflicts
- Staleness

## Rules before touching code

1. **Name the cause before changing anything.** Every proposed fix states which cause below it addresses. "Added `will-change`, seems smoother" is not a diagnosis.
2. **A fast laptop proves nothing.** The developer's machine is the least representative device the animation will run on. The bar is a mid-range phone. In a report, separate what was verified from code from what still needs a device recording.
3. **`transform` and `opacity` by default; anything else needs a reason.** When a cheaper property gives the same picture, use it even if the expensive one "seems fine" today.
4. **Never `transition: all`.** It animates whatever changes next, including layout properties nobody meant to animate. List properties.
5. **Spend effort on what you control.** Hardware acceleration is something the browser *may* grant; which properties you animate is yours to decide. Do not trade correctness for a best-effort optimization.
6. **`will-change` is the last step, not the first.** Most jank is the wrong property or a busy main thread, and it fixes neither.

## Symptom → first move

| Symptom | First move |
| --- | --- |
| General stutter | Animate `transform`/`opacity` instead of `width`/`height`/`top`/`margin` |
| Choppy animated shadow | `filter: drop-shadow()`, or fade a pre-rendered shadow layer (see Scoped conflicts) |
| Jank only during navigation, loading, hydration | Move that animation to CSS or WAAPI so it leaves the main thread |
| Motion `x`/`y` drops frames | Upgrade Motion (upstream: 14.2+), or animate the full `transform` string |
| Hand-rolled animation drops frames in React | Write to `ref.current.style` or a motion value, not state |
| Drag gets laggier as the list grows | An inherited CSS variable is being written per frame; set `transform` on the element |
| Blur transition lags, worst in Safari | Keep animated `blur()` under 20px |
| Unexpected properties animate | Replace `transition: all` |
| Element shifts 1px as motion starts or ends | `will-change: transform` — once you have seen the shift |
| Long list scrolls slowly | Virtualize; render only what is visible |

## Frame budget

60fps gives the browser 16.7ms per frame. On a 120Hz display — most current phones, many laptops — it is about 8ms. Design against the smaller number. For scale: one layout recalculation on a complex page can exceed 100ms, which is not one missed frame but a dozen.

Two things decide whether a frame fits: **what** is animated (how much work per frame) and **where** it runs (whether that work can be blocked by everything else the page is doing).

## What you animate: cost tiers and swaps

| Tier | Properties | Per-frame cost |
| --- | --- | --- |
| Composite only | `transform`, `opacity`; in current Chrome/Firefox also `filter`, `clip-path`, `background-color` | Cheapest — promoted to own layer |
| Paint + composite | `box-shadow`, `border-radius`, `color` | No re-measure, but a redraw every frame |
| Layout + paint + composite | `width`, `height`, `padding`, `margin`, `top`, `left`, `border-width` | Most expensive — one growing element can move everything around it |

Only `transform` and `opacity` are reliable across engines; the other composite-tier entries need cross-browser and device testing.

| Instead of | Animate |
| --- | --- |
| `width`/`height`/`padding` to grow or shrink | `scale()`, when the caveats below are acceptable |
| `top`/`left`/`margin` to move | `translate()` (percentages resolve against the element's own size) |
| `display`/`visibility` swaps | `opacity` for the visual fade, plus real hiding at the end (see below) |
| `box-shadow` | `filter: drop-shadow(...)` |

- **The paint tier is the one people miss.** `box-shadow` and `border-radius` do not look like layout, so they slip through review, and each repaints the element every frame.
- **Layout animation does not always drop frames** — an absolutely positioned element with few children may animate `padding` invisibly. But on a simple surface with no text, `padding` and `scale()` can look the same, and only `scale()` cannot regress on a slower device.
- **`scale()` is not a drop-in for size.** It scales text, borders, radii, and children along with the box, and it does not change the space the element occupies, so neighbors do not reflow. Use it for press feedback, pop-ins, and surfaces whose contents may stretch briefly (or counter-scale the child). When surrounding content must move with the change, or the text must stay crisp at an intermediate size, keep a measured layout animation or a FLIP/layout animation and keep it short.
- **`opacity: 0` hides nothing but pixels.** The element stays focusable, clickable, and exposed to assistive technology. Let `opacity` carry the transition and something else carry the hidden state: unmount after the exit, or apply `visibility: hidden`, `hidden`, or `inert` once it ends (`transition-behavior: allow-discrete` with `@starting-style` lets `display` and `visibility` flip at the right end of a CSS transition where supported). Focus handling: `web-design` (web-accessibility).
- **Layout properties also move the wrong things.** A sidebar animating `margin-left` re-lays-out the content beside it every frame; `translateX` does not.
- **Tolerated exception:** accordion `height`, where no transform equivalent exists. Keep it short (it costs layout every frame, so long is expensive as well as sluggish) and animate to a measured height, not `auto`.

## Where it runs: driver and thread

| Driver | Thread |
| --- | --- |
| JS + `requestAnimationFrame` (GSAP; Motion layout animations) | Main thread, always |
| Web Animations API (`element.animate()`; Motion's `animate()` and `motion` components for supported values) | Can be hardware-accelerated |
| CSS transitions and keyframes | Can be hardware-accelerated |

"JS" and "main thread" are not synonyms: a JS library that hands off to WAAPI can be accelerated; a rAF loop cannot.

- **The pattern to hunt:** motion that plays *while the page is doing heavy work* — page transitions, tab indicators during navigation, anything that fires alongside fetching or hydration. Upstream's case: Vercel's dashboard tab indicator used a shared-layout animation, dropped frames because the next page was loading at that instant, and was fixed by moving it to CSS.
- **Motion specifics (upstream's account):** `opacity`, `transform`, `clip-path`, `filter` go through WAAPI. From Motion 14.2 the `x`/`y`/`scale`/`rotate` shorthands on HTML elements are merged into one accelerated `transform` animation — keep them. On older versions, switch to the `transform` string when the animation must survive a busy main thread. Main-thread in every version: layout animations (`layout`, `layoutId`), anything with `onUpdate` or `transformTemplate`, inertia, and values driven per frame by a motion value (drag, `useTransform`).
- **Acceleration is progressive enhancement.** Browsers quietly decline it under conditions that change between releases (Chrome historically did not accelerate percentage transforms). That is not a reason to abandon `translateY(100%)` — percentages are the correct tool for elements of unknown size.

## React: never animate through state

Animation libraries write outside React's render cycle and are fine. The trap is a hand-rolled animation calling `setState` per frame: one re-render every 16.7ms, and the render alone exceeds the budget. Grep for state updates inside `requestAnimationFrame`, `pointermove`, `scroll`, and drag handlers; replace with a direct style write on a ref or a motion value's `.set()`.

## Two traps that look correct

Both animate `transform` and still drop frames.

- **Inherited CSS variables.** Vaul's drag degraded once a drawer held more than about 20 items, with zero re-renders: drag distance was written to a custom property that a `translateY()` read. Custom properties inherit, so each write recalculated style for every descendant — the more content, the slower each frame. Suspect this whenever a transform animation gets worse as content grows.
- **Blur.** `filter: blur()` cost climbs fast, worst in Safari. Keep animated blur under 20px; 2–5px is enough to soften a crossfade.

## `will-change`

A browser can move an animation from CPU to GPU mid-flight, and that handoff can shift the element by a pixel at the start or end. `will-change: transform` promotes the element up front so no handoff happens.

- Add it **only after seeing the shift or measuring dropped frames.** Elements animating `transform`/`opacity` are already promoted, so on the common path it does nothing, and every promoted layer costs GPU memory.
- Put it on the animating element — never `*`, never a large container.
- Where it earns its keep: an expensive paint such as a large blurred or filtered element. Promote it and keep the layer small; a small layer composites cheaper than a full-screen one.

## Is JS animation the problem?

No. Main-thread animation suffers only when the page is busy during it, which is uncommon and now recognizable. JS libraries provide what CSS cannot: real springs, shared-layout animation, exit animation for unmounting components, momentum gestures. Working split: CSS for simple motion and anything that plays while the page is busy; a JS library for complex, interruptible, gesture-driven motion.

## Diagnosis order

Inventory first: one row per animation in scope — element, driver, properties, and *what else is happening while it plays*. Expand `transition: all` and library shorthands into what they really animate. Then work down, most frequent cause first:

1. Which properties animate? Anything beyond `transform`/`opacity` is the first suspect — layout properties, then `box-shadow` and `border-radius`.
2. Does the jank coincide with the page being busy (navigation, fetch, hydration, long task)? Move the animation to CSS/WAAPI.
3. Is React re-rendering per frame?
4. Does it worsen as content grows? Inherited variable, or too many nodes animating at once.
5. Is a CSS variable animated at all, or an old-Motion shorthand in use?
6. Any animated `blur()` above 20px?
7. Still shifting or stuttering? Now try `will-change: transform` on the animating element.

Confirm with a recording, not by feel: DevTools Performance panel for dropped frames and long tasks, Animations panel to slow playback. Profile a real mid-range phone over remote debugging — desktop CPU throttling models a slow CPU, not a weak GPU or a small memory budget.

## Reporting a finding

Per finding: element and `file:line`; the named cause; before → after; and **verified from code** or **needs a device recording**. Order by cost — layout before paint, busy-main-thread before idle. Report, then stop; apply fixes when asked.

## Scoped conflicts

- **Animated shadows — two valid swaps.** Upstream: replace animated `box-shadow` with `filter: drop-shadow()`. Already in this cluster (PRACTICAL-TIPS; `web-design` (web-performance)): cross-fade the `opacity` of a pre-rendered shadow layer. The opacity layer is the safer default because `opacity` is reliably composited everywhere; `drop-shadow` is the lighter-markup option where `filter` is accelerated and the shadow must follow a non-rectangular shape. Pick one per component.
- **`will-change` posture — two schools.** The Motion AI Kit (`motion` best-practices, written before Motion 14.2 and carrying a dated library note since 2026-11) says to set `will-change` on the properties being animated when using CSS transitions or independent transforms. Kowalski says add it only after observing a 1px shift or measured drops, because common-path elements are already promoted and layers cost memory. Follow the Motion guidance when working inside Motion's conventions and its audit; follow the observe-first rule for hand-written CSS. Both agree: never blanket it across many elements.

## Staleness

Engine and library specifics here are 2026-era. The Motion 14.2 shorthand change was confirmed against Motion's changelog (14.2.0, 2026-10-13: "Hardware accelerated independent transforms"); the list of always-main-thread Motion features and which extra properties are compositor-eligible remain single-source. Verify against the Motion changelog and current browser docs before citing a version number in a review. The tiers, the thread model, the inherited-variable trap, and the diagnosis order are the durable layer.
