# Web Gestures — drag, swipe, sheets

*Scope: building or repairing anything dragged, swiped, flung, held, or dismissed by gesture on the **web** (Pointer Events, CSS, Motion). The principles (why 1:1 tracking, interruptibility, rubber-banding, and momentum projection matter) are Apple's and live in `swiftui` (touch-interaction-design); this file is only the web implementation. Values here do not cross back to native. Part of [../web-animation-design.md](../web-animation-design.md).*

**Sources:** Emil Kowalski's public `gestures` and `apple-design` skills (MIT, rev `715c180`, https://github.com/emilkowalski/skills) — the second is a web port of WWDC 2018 *Designing Fluid Interfaces*. Library facts (Vaul, Sonner, Motion props) are dated 2026-11; check current docs before quoting an API.

## Contents

- Decide first: build or adopt
- The two-phase rule
- Track phase
- Release phase
- Choosing the release animation: spring vs transition
- Interrupting and reversing
- Linked values
- Intent detection and `touch-action`
- Every gesture has a non-gesture path
- Sheets without a spring library
- Hold gestures
- Reduced motion
- Diagnosis table
- Checklist

## Decide first: build or adopt

A correct sheet is momentum dragging, progress-linked overlay, velocity-aware dismissal, scroll-vs-drag arbitration, focus trapping, and Escape — weeks of edge cases. For a bottom sheet or drawer, adopt a maintained primitive (Vaul is the reference implementation these rules were extracted from) and hand-roll only when the interaction is different in kind: swipe cards, bespoke drag surfaces, a signature gesture. If content merely pages horizontally, native scroll with `scroll-snap` beats any JS gesture — the browser's physics are already right.

## The two-phase rule

Every gesture has two phases, and most "feels wrong" reports come from applying one phase's tool to the other:

| Pointer | Phase | What drives position |
| --- | --- | --- |
| Down | **Track** | The pointer, 1:1. No easing, no duration, no spring. |
| Up | **Release** | An animation that starts from the live position and, when the element was thrown, the live velocity. |

A spring or transition during tracking makes the element trail the finger. A fixed keyframe on release makes every fling land identically.

## Track phase

- **Capture the pointer.** `pointerdown` → `el.setPointerCapture(e.pointerId)`, so tracking survives the pointer leaving the element. Ignore additional pointers once a drag has started.
- **Keep the grab offset.** Record where inside the element the pointer landed and preserve it; never recentre the element under the finger.
- **Keep a short history.** Store the last few `pointermove` positions with timestamps. Release velocity comes from that window, not from total distance ÷ total time (which under-reports a drag that paused and then flicked).
- **Write `transform` straight onto the dragged element** (or a Motion value bound to it). Two things to avoid, both measured failures in Vaul/Sonner: a React state update per move event (a render per frame), and a CSS variable set on an ancestor (inherited, so every descendant restyles — the drag went laggy past roughly 20 list rows).
- **Rubber-band past limits.** Either a library constant (Motion `dragElastic` ≈ 0.2) or progressive resistance, where each extra pixel of overshoot moves the element less:

```js
// c ≈ 0.55 is the commonly cited iOS scroll constant; dimension = the element/viewport extent
const rubberband = (overshoot, dimension, c = 0.55) =>
  (overshoot * dimension * c) / (dimension + c * Math.abs(overshoot));
```

## Release phase

- **Dismiss on distance *or* velocity.** A distance-only threshold ignores flicks. Three working forms, pick one per component rather than stacking them:
  - simple: past ~40–50% of travel, or speed above a flick threshold (Sonner uses ~0.11 px/ms; a Motion `onDragEnd` check of `info.velocity` around 500 px/s is the same idea at a stricter setting);
  - **projected** (best for snap points and corners): estimate where the throw would come to rest and choose the target nearest *that* point:

```js
// Exponential-decay projection from Apple's Fluid Interfaces sample; velocity in px/s.
// 0.998 ≈ normal scroll feel, 0.99 lands shorter.
const project = (velocity, rate = 0.998) => ((velocity / 1000) * rate) / (1 - rate);

const target = nearestSnapPoint(current + project(releaseVelocity));
```

  - decide commit-vs-reverse from the **sign** of the release velocity, not from which side of the midpoint the element sits: a sheet past halfway that is moving back up should stay open.
- **Hand the velocity to the animation.** Motion takes absolute px/s (`velocity`). An API that expects relative velocity wants `gestureVelocity / (target − current)`.
- **Bounce only when force was applied.** A small overshoot suits a flung element; the same element closed by a button or Escape gets none. Smaller elements need proportionally more bounce to read the same.
- **Clamp overshoot on exits.** A dismiss spring that overshoots past the screen edge flashes a gap; use a critically damped or clamped spring for the way out.
- **Snap back quickly** when the threshold is not met. A slow return reads as the UI arguing.
- **Dismiss along the entry axis.** A toast that rose from the bottom swipes down; a panel that came from the right leaves right. A reversed entrance is discoverable without instruction.
- **Animate 2D throws as two independent axes.** One spring on the diagonal distance desynchronises when X and Y velocities differ.

## Choosing the release animation: spring vs transition

The two upstream skills disagree on wording (one bans CSS transitions for gesture-driven elements, the other allows "transitions and springs only"). They are scoped, not contradictory:

| Release behaviour needed | Use | Why |
| --- | --- | --- |
| Element was thrown and the throw should show (cards, PiP, snap points) | Spring seeded with release velocity | Only a spring continues at the finger's speed |
| Element settles to open/closed and may be re-grabbed (sheet, drawer, toast) | CSS **transition** on `transform` is acceptable | A transition retargets from the current computed position, but always restarts at zero velocity |
| Anything a pointer can touch | Never `@keyframes` | A keyframe animation restarts from its first frame and cannot be caught or retargeted |

Default spring for non-thrown UI stays critically damped (Motion `bounce: 0`); see the spring section of [../web-animation-design.md](../web-animation-design.md) for values.

## Interrupting and reversing

- **Never lock input during the release animation.** A closing sheet that is grabbed again follows the finger immediately.
- **Start from what is on screen.** On re-grab, read the live transform (`getComputedStyle(el).transform`, or the Motion value) and begin tracking from there. Starting from the logical open/closed value produces the jump people report as "it teleports when I catch it."
- **Retarget, don't replace.** On a reversal, change the running spring's target so it carries its velocity through. Cancelling it and starting a fresh animation creates a visible stall at the turn.

## Linked values

Overlay opacity, background scale, and corner radius belong to the drag, so derive them from drag progress instead of running parallel animations:

```jsx
const y = useMotionValue(0);
const overlayOpacity = useTransform(y, [0, sheetHeight], [1, 0]);
```

One source of truth stays correct mid-gesture and on reversal; two animations drift the first time one is interrupted.

## Intent detection and `touch-action`

- **Wait ~10px before committing to an axis**, then lock it and track 1:1. That slop is what lets a vertical page scroll and a horizontal swipe coexist.
- **Declare the axis the browser keeps.** `touch-action` names what the *browser* may still do: `pan-y pinch-zoom` on a horizontal swipe surface, `pan-x pinch-zoom` on a vertically dragged handle, `none` only on a surface that truly owns both axes (otherwise the page cannot scroll past it). Keep `pinch-zoom` in the value: bare `pan-y`/`pan-x` also blocks browser pinch zoom for touches starting on the surface, which removes magnification for people who need it. Drop it only when the surface handles pinch itself. Without it the browser claims the touch for scrolling and fires `pointercancel` mid-drag. Never substitute a non-passive `touchmove` + `preventDefault()`.
- **Do not use end-only swipe events.** A "swipeleft"-style callback discards the continuous position the track phase needs.
- **Protect interactive children.** A button inside a draggable surface must not start a drag (Vaul: `data-vaul-no-drag`; hand-rolled: check `e.target.closest('button, a, input, [data-no-drag]')` on `pointerdown`).
- **Respond on `pointerdown`, commit on release**, and let dragging off a control cancel it. Platform-level fixes for laggy taps and stuck hovers live in [../mobile-web-native-feel.md](../mobile-web-native-feel.md).

## Every gesture has a non-gesture path

A gesture is an accelerator, never the only way to do something.

- **Dragging needs a single-pointer alternative.** WCAG 2.2 SC 2.5.7 (AA) requires that anything done by dragging can also be done without it, unless dragging is essential: a close button beside swipe-to-dismiss, move up/down controls beside drag-to-reorder, tappable snap points or a handle button on a sheet, steppers or an input beside a slider. SC 2.5.1 asks the same for path-based and multipoint gestures.
- **Keyboard reaches the same result.** Escape closes what a swipe closes; arrow keys or explicit buttons reorder; the handle is a focusable control with a name. Screen-reader users get the buttons, not the drag.
- **Hold gestures get an alternative too.** Press-and-hold excludes people who cannot sustain a press, and many assistive technologies activate with a single click. Offer a confirm step or a second explicit action alongside it, and make sure Enter/Space on the focused control can complete the action.
- **A gesture-revealed action must be discoverable without the gesture** (row actions behind a swipe also live in a menu).

Requirements and testing: `web-design` (web-accessibility).

## Sheets without a spring library

Vaul reproduces the iOS sheet with one CSS transition: `cubic-bezier(0.32, 0.72, 0, 1)` at 500ms. The curve is steep at the start, which is why half a second still feels immediate (the curve-buys-duration rule is in PRACTICAL-TIPS). Two scoping rules from it:

- The 500ms timing fits a **full-width, edge-attached** sheet. A small floating drawer wants roughly 200ms on the theme's `--ease-out` curve; the long timing reads as sluggish on a small surface.
- Height changes and content crossfades inside the sheet stay in the same timing family as the sheet itself, or the component stops reading as one object.

## Hold gestures

Press-and-hold confirmation is asymmetric by design. The fill runs `linear` while held, because it is showing elapsed time and any curve misreports how long is left. Releasing early snaps back fast with ease-out. Equal timing in both directions is a bug.

## Reduced motion

Tracking stays: the user is producing that motion. Under `prefers-reduced-motion: reduce`, remove the fling, the bounce, and decorative motion around the gesture, and settle with a short opacity or position change. General policy: [../web-animation-design.md](../web-animation-design.md); other preference queries (transparency, contrast) belong to `web-design` (web-accessibility).

## Diagnosis table

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Element trails the finger | Spring/transition active while tracking | Disable animation during track; write transform directly |
| Jumps when grabbed mid-animation | Tracking restarts from the logical value | Start from the live transform |
| Jumps on release | Release animation starts from a stale value, or a keyframe restarts | Animate from the current position; no `@keyframes` |
| Quick flick is ignored | Distance-only threshold | Add a velocity or projection test |
| Past-halfway sheet closes while being dragged back up | Position decides | Use velocity sign |
| Drag dies after a few pixels on touch | Browser claimed the touch (`pointercancel`) | `touch-action` for the axis |
| Page scrolls while swiping a carousel | No axis declared | `touch-action: pan-y pinch-zoom` on the track |
| Cannot pinch-zoom when starting on the swipe surface | Bare `pan-y`/`pan-x` | Add `pinch-zoom` |
| Drag lags only with long content | Ancestor CSS variable or per-move re-render | Transform on the element; no state per move |
| Dead stop at the edge | Hard clamp | Rubber-band |
| Stall when reversing direction | New animation replaced the old | Retarget the running spring |
| Tapping a button inside starts a drag | No drag exclusion | Exclude interactive children |
| Springy but "weird" | Under-damped | Raise damping before touching anything else |

## Checklist

- [ ] Adopted a primitive unless the gesture is custom in kind
- [ ] Pointer captured; grab offset kept; second pointer ignored
- [ ] No animation, React state, or ancestor CSS variable in the track path
- [ ] Limits rubber-band
- [ ] Dismissal accepts a flick (velocity or projection); reverse-vs-commit uses velocity sign
- [ ] Release starts from the live position; thrown elements inherit velocity
- [ ] Re-grab works at any point of the release animation
- [ ] Overlay and background derive from drag progress
- [ ] `touch-action` matches the axis and keeps `pinch-zoom`; interactive children excluded
- [ ] Every drag, swipe, and hold has a button and keyboard path to the same result
- [ ] Dismiss direction matches entry direction
- [ ] Reduced-motion path keeps tracking, drops fling and bounce
- [ ] Tried on a real phone: flick it, catch it mid-flight, reverse it. Trackpad emulation hides touch behaviour and a 60Hz monitor hides roughness a 120Hz phone shows
