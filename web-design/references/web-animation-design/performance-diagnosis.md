# Animation performance diagnosis

Deep dive for [web-animation-design.md](../web-animation-design.md) (Performance). The parent file gives the rules; this file is the order to work in when an animation already drops frames. Paraphrased from Emil Kowalski's `animation-performance` skill and performance cheat sheet at `715c180` (MIT; [sources.md](sources.md)). The Motion version boundary was checked against Motion's changelog on 2026-11-10.

Boundaries: a scored, tiered audit of a whole codebase and runtime profiling with `npx motionscore` → `motion` (performance-audit capability). Page-level metrics (INP, long tasks, budgets) → [web-performance.md](../web-performance.md). `will-change` and `transition: all` rules → `design-craft` (performance).

## Contents

- The bar
- Start from the symptom
- What animates: three tiers
- Where it runs
- Motion: which values are accelerated
- Diagnosis order
- Report shape
- Conflicts with other references

## The bar

A frame has 16.7ms at 60Hz and about 8ms at 120Hz, which is now most phones. The developer's laptop is the least representative device the animation will run on; judge on a mid-range phone. One layout recalculation on a complex page can exceed 100ms, which is a dozen missed frames, not one.

## Start from the symptom

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Stutter throughout | A layout property is animating | `transform` / `opacity` instead of `width`, `height`, `top`, `margin` |
| Choppy shadow | `box-shadow` repaints every frame | Fade the opacity of a pre-rendered shadow layer, or animate `filter: drop-shadow()` |
| Jank only during navigation or loading | Main thread is busy | Move the animation to CSS or the Web Animations API |
| Motion `x` / `y` drops frames | Shorthand runs on the main thread before `motion` 14.2 | Upgrade, or animate the full `transform` string |
| Hand-rolled React animation drops frames | A state update per frame | Write to `ref.current.style`, or a motion value |
| Drag gets laggier as the list grows | Position travels through an inherited CSS variable | Set `transform` on the element directly |
| Blur transition lags, worst in Safari | Large animated `blur()` | Keep it under 20px; 2–5px is enough to soften a crossfade |
| A property nobody intended animates | `transition: all` | List the properties |
| Element shifts 1px as motion starts or ends | Mid-flight layer promotion | `will-change: transform` on that element, only once seen |

## What animates: three tiers

| Tier | Properties | Per-frame work |
| --- | --- | --- |
| Composite | `transform`, `opacity`; in current Chrome and Firefox also `filter`, `clip-path`, `background-color` (uneven; test) | Cheapest |
| Paint | `box-shadow`, `border-radius`, `color` | Redraw, no re-measure |
| Layout | `width`, `height`, `padding`, `margin`, `top`, `left`, `border-width` | Re-measure, redraw, composite |

Swap down a tier where the result looks the same: `scale()` for size, `translate()` for position (percentages resolve against the element's own size), `opacity` for show and hide.

Two consequences:

- A layout animation on an absolutely positioned element with few children may look fine today. The `transform` version looks identical and cannot regress on a slower device, so prefer it.
- Layout properties move the neighbours. A sidebar animating `margin-left` re-lays-out the page beside it every frame; `translateX` does not.

## Where it runs

| Driver | Thread |
| --- | --- |
| `requestAnimationFrame` loops, GSAP, Motion layout animations | Main thread, always |
| Web Animations API (`element.animate()`), Motion's WAAPI path | Can run off the main thread |
| CSS transitions and keyframes | Can run off the main thread |

"JavaScript" and "main thread" are not the same thing: a library that hands off to WAAPI can be accelerated, and a `requestAnimationFrame` loop cannot. The pattern to watch for is motion that plays while the page is doing heavy work, such as a tab indicator animating during a route change.

Acceleration is something the browser may grant, and the conditions change between versions. Do not give up a correct technique to chase it: `translateY(100%)` is still the right way to position an element of unknown size.

## Motion: which values are accelerated

- `opacity`, `transform`, `clip-path`, and `filter` go to WAAPI and can be accelerated.
- The independent transform shorthands (`x`, `y`, `scale`, `rotate`) are accelerated on HTML elements from **`motion` 14.2.0 (2026-10-13)**. Before that they run on the main thread, and the workaround is the full string: `animate={{ transform: "translateX(100px)" }}`.
- Main thread in every version: layout animations (`layout`, `layoutId`), anything with `onUpdate` or `transformTemplate`, inertia, and values driven each frame by a motion value (drag, `useTransform`).

Check the installed `motion` version before applying either form of the advice.

## Diagnosis order

Ordered by how often each is the cause. Name the cause before changing code.

1. **Inventory.** List each animation with its driver, the properties it really animates (expand `transition: all` and Motion shorthands), and what the page is doing while it plays.
2. **Properties.** Anything outside `transform` / `opacity`: layout first, then `box-shadow` and `border-radius`, which are easy to miss.
3. **Busy page.** Does the jank coincide with navigation, fetching, hydration, or a long task? Move it to CSS or WAAPI.
4. **Per-frame renders.** State updates inside `requestAnimationFrame`, pointer, or scroll handlers.
5. **Grows with content.** An inherited CSS variable, or too many nodes animating at once.
6. **Motion shorthands on an old version**, or any animated CSS variable.
7. **Blur over 20px.**
8. **Still shifting or stuttering.** Now try `will-change: transform` on the animating element, never on a large container.

Confirm with a recording: the DevTools Performance panel for dropped frames and long tasks, on a real mid-range phone over remote debugging. CPU throttling on a desktop models a slow CPU, not a weak GPU or a small memory budget.

## Report shape

One block per finding, ordered by cost (layout before paint, busy-page before idle):

```
[Element] — file:line
Cause: which step above
Before: transition: all 200ms (animates padding, triggers layout)
After: transition: transform 200ms, with scale()
Verified: from code | needs a device recording
```

Say plainly which findings were confirmed from code and which need a device. "Smooth on my machine" is not a result.

## Conflicts with other references

- **Motion shorthands.** Older text in this library said the shorthands are never accelerated. That was true before 14.2.0 and is now version-scoped here, in the parent file, and in `design-craft` (emil-kowalski). The vendor-imported `motion` skill's tier data still describes the older behaviour; see the web-design coverage gaps.
- **Shadows.** [web-performance.md](../web-performance.md) recommends fading a pre-rendered shadow layer; the source recommends `filter: drop-shadow()`. The opacity fade is composite-only everywhere. `drop-shadow()` is simpler but depends on accelerated `filter`, so test it on the target browsers.
