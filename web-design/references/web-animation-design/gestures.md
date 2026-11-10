# Gestures — drag, swipe, sheets, and holds on the web

Deep dive for [web-animation-design.md](../web-animation-design.md). The parent file states the principles (springs keep velocity, interruptibility). This file is the build order for anything a finger or pointer drags. Paraphrased from Emil Kowalski's `gestures` skill at `715c180` (MIT; [sources.md](sources.md)), with two formulas from that repo's `apple-design` skill. The principles come from Apple's *Designing Fluid Interfaces*; the native version and its SwiftUI code live in `swiftui` (touch-interaction-design).

Already owned elsewhere, not repeated here: pointer capture, multi-touch protection, and the Sonner/Vaul velocity snippet → `design-craft` (emil-kowalski, interaction-and-performance); interrupted-gesture cleanup (`pointercancel`, `lostpointercapture`, window `blur`) → `design-craft` (refinement-moves, Harden).

## Contents

- Two phases, two rules
- Release decisions
- Edges and projection
- One progress value drives everything
- Sheets and drawers
- Hold gestures
- Touch checklist
- Reduced motion
- When it feels wrong
- Conflicts with other references

## Two phases, two rules

| Phase | Rule | Why |
| --- | --- | --- |
| Tracking (finger down) | The element follows the pointer 1:1. No easing, no spring, no transition. | Any smoothing reads as lag |
| Release (finger up) | A spring takes over, seeded with the release velocity. Never keyframes. | Keyframes ignore how fast the finger was moving and cannot be caught mid-flight |

While tracking:

- Write `transform` straight to the element's style. Do not put the position in React state; one render per pointer move drops frames.
- Do not drive the position through a CSS variable set on a parent. Every child recalculates style on each move, and the lag grows with the number of children (Vaul hit this past roughly 20 list items).
- Respect the grab offset: the point under the finger stays under the finger.
- Start from the element's current on-screen value, not its target, when the user catches it mid-animation.

## Release decisions

- **Dismiss on distance or velocity.** Passing roughly 40–50% of the travel dismisses; so does a quick flick over a short distance. Distance-only thresholds make flicks feel ignored.
- **At release, the sign of the velocity decides.** A sheet dragged 70% of the way down and then flicked up should stay open. Position is the fallback when the finger was nearly still.
- **Snap back fast.** A cancelled drag returns quicker than the dismiss animation.
- **Bounce only after a drag.** A sheet closed with a button gets no overshoot; there was no momentum to reward. Bounce scales inversely with size.
- **Stay catchable.** The user can grab the element again at any point of the release animation. An early Sonner bug came from keyframed exits that could not be interrupted.
- **Dismiss in the direction of entry.** A sheet that rose from the bottom leaves through the bottom.

Motion's drag API covers most of this:

```jsx
<motion.div
  drag="y"
  dragConstraints={{ top: 0 }}
  dragElastic={0.2}
  onDragEnd={(_, info) => {
    // Motion reports velocity in px/s.
    if (info.offset.y > height * 0.45 || info.velocity.y > 500) close();
  }}
/>
```

`dragMomentum` is on by default, so a released element keeps travelling; leave it on unless the element must stop under the finger.

## Edges and projection

Past a boundary, the element keeps moving at a fraction of the finger's distance instead of stopping dead. Motion's `dragElastic` near 0.2 does this. Hand-rolled:

```js
// Resistance grows with overshoot. 0.55 is the community-measured constant for
// iOS scroll views, not a figure Apple has published.
function rubberband(overshoot, dimension, constant = 0.55) {
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));
}

// Where a flick would come to rest. velocity in px/s; 0.998 matches a normal
// iOS scroll, 0.99 stops sooner.
function project(velocity, deceleration = 0.998) {
  return ((velocity / 1000) * deceleration) / (1 - deceleration);
}
```

Use the projected position, not the release position, to choose a snap point. Require about 10px of movement before a press becomes a drag, so taps are not misread.

## One progress value drives everything

Overlay opacity, background scale, and corner radius all derive from the same drag progress, so they cannot drift apart. In Motion: `useTransform(y, [0, height], [1, 0])`. Hand-rolled: compute progress once per pointer move and write each dependent style from it.

## Sheets and drawers

- **Edge-attached, full-width sheet:** `cubic-bezier(0.32, 0.72, 0, 1)` over 500ms (Vaul's CSS stand-in for the iOS sheet). The steep start is what lets 500ms still feel quick.
- **Small floating drawer:** about 200ms with `cubic-bezier(0.165, 0.84, 0.44, 1)`. The 500ms timing only reads right on a sheet attached to the screen edge.
- **One entity.** Height changes and content crossfades inside the sheet share its timing family. One slow sub-animation makes the whole component feel broken.
- **Controls inside do not start a drag.** Vaul uses `data-vaul-no-drag`; a hand-rolled sheet checks the event target before starting.

## Hold gestures

Hold-to-confirm fills with `linear` easing: the animation shows time passing, and any curve misreports how much is left. Releasing early cancels with a fast `ease-out`. The asymmetry is deliberate.

Anything reachable only by dragging or holding also needs a plain tap or keyboard path; route the accessibility mechanics to web-accessibility.

## Touch checklist

- Test on a real phone over the local network. A trackpad does not behave like a finger, and a 60Hz monitor hides roughness a 120Hz phone shows.
- Targets at least 44×44px; extend a small visual target with a `::before` hit area rather than growing the layout.
- Set `touch-action` for the axis the element handles (`pan-y` on a horizontal carousel), or the page scrolls underneath the drag. The platform details are in [mobile-browser-behavior.md](../mobile-browser-behavior.md).
- Gate hover effects behind `@media (hover: hover) and (pointer: fine)`.

## Reduced motion

Keep the 1:1 tracking; the user is moving the element themselves. Drop the fling, overshoot, and bounce, and settle with a short fade or a direct move.

## When it feels wrong

- A spring that feels "weird" usually needs more damping, not different stiffness.
- Record the gesture and scrub it frame by frame; a seam between tracking and release shows up as a one-frame stall or jump.

## Conflicts with other references

- **Velocity threshold units.** `design-craft` (interaction-and-performance) uses `0.11`, which is px/ms computed by hand from distance and elapsed time. Motion's `info.velocity` is px/s, hence `500` above. They are different units for the same idea, not competing values.
- **Manual velocity math.** `swiftui` tells native code to let the framework carry velocity. On the web there is no equivalent unless a library provides it, so hand-rolled gestures compute it. Platform rules do not cross.
