# Improvements to Web Animations API

Motion is the only animation library with a hybrid engine, meaning its capable of dynamically running animations either via `requestAnimationFrame` or via the [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) (WAAPI).

This allows it to animate any value, for any render target (DOM, Three.js, canvas) while also retaining the ability to run animations with hardware acceleration.

Its `animate` function comes in two sizes, **mini** (2.3kb) and **hybrid** (17kb).

Both functions provide a number of improvements to the feature set and developer experience of WAAPI, in this guide we'll take a look at some.

## Springs and custom easing functions

CSS and WAAPI only support in-built easing functions like `"back-in"`, `"ease-in-out"` etc.

Motion extends that to support any custom easing function by automatically generating a `linear()` CSS easing definition in modern browsers, with a safe fallback in older browsers

```
animate(
  "li",
  { opacity: 1 },
  { ease: mirrorEasing(Math.sin) }
)
```

Additionally, it supports `spring` animations in `animateStyle` by compiling the spring into a `linear()` easing and computing the appropriate `duration`. Whereas in the `animate` function it will pre-calculate the actual keyframes for real physics-based animations.

```
import { animate } from "motion/dom"
import { spring } from "motion"

animate(
  "li",
  { transform: "translateX(100px)" },
  { type: spring, stiffness: 400 }
)
```

## Default value types

WAAPI always expects a unit type for various animatable values, which can be easy to forget.

```
element.animate({ width: "100px" })
element.animate({ width: 100 }) // Error!
```

Motion knows the default value type for all popular values.

```
animate(element, { width: 100 })
```

## `.finished` Promise

As a newer part of the WAAPI spec, the `animation.finished` `Promise` isn't supported in every browser. Motion will polyfill it in those browsers:

```
const animation = animate("#box", { opacity: 0 })

// Async
await animation

// Promise
animation.then(() => {})
```

## Durations as seconds

In WAAPI (and a subset of other JavaScript animation libraries), durations are set as milliseconds:

```
const animation = element.animate({ x: 50 }, { duration: 2000 })
animation.currentTime = 1000
```

During development of [Framer Motion](https://framer.com/motion), user testing revealed that most of our audience find seconds a more approachable unit. So in Motion, durations are defined in seconds.

```
const animation = animate(element, { x: 50 }, { duration: 2 })
animation.currentTime = 1
```

## Persisting animation state

In a typical animation library, when an animation has finished, the element (or other animated object) is left in the animation's final state.

But when you call WAAPI's `animate` function like this:

```
element.animate({ opacity: 0 })
```

This is the result:

The animation ends in its initial state!

WAAPI has an option you can set to fix this behaviour. Called `fill`, when set to `"forwards"` it will persist the animation beyond its timeline.

```
element.animate({ opacity: 0 }, { fill: "forwards" })
```

But this is discouraged even in the [official spec](https://www.w3.org/TR/web-animations-1/#fill-behavior). `fill: "forwards"` doesn't exactly change the behaviour of the animation, it's better to think of it keeping the animation active indefinitely. As WAAPI animations have a higher priority than `element.style`, the only way to change the element's styles while these animations are active is with more animations!

Keeping all these useless animations around can also lead to memory leaks.

The spec offers two solutions. One, adding a `Promise` handler that manually sets the final keyframe target to `element.style`:

```
await element.animate({ opacity: 0 }, 200).finished
  
element.style.opacity = 0
```

The second is to immediately set `element.style` to the animation target, then animate from its current value and let the browser figure out the final keyframe itself.

```
const opacity = element.style.opacity
element.style.opacity = 1
element.animate({ opacity, offset: 0 }, 200)
```

Each approach has pros and cons. But a major con they both share is making the user decide. These are unintuitive fixes to an unintuitive behaviour, and whichever is chosen necessitates a wrapping library because repeating these brittle patterns is bad for readability and stability.

So instead, Motion's `animate` function will actually animate _to_ a value, leaving in its target state once the animation is complete.

```
animate(element, { opacity: 0 })
```

## Stop animations

WAAPI's `animate` function returns an `Animation`, which contains a `cancel` method.

```
const animation = element.animate({ opacity: 0 }, { duration: 1000 })
setTimeout(() => { animation.cancel()}, 500)
```

When `cancel` is called, the animation is stopped **and** "removed". It's as if the animation never played at all:

Motion adds a `stop` method. This cancels the animation but also leaves the element in its current state:

```
const animation = animate(element, { opacity: 0 }, { duration: 1000 })
setTimeout(() => { animation.stop()}, 500)
```

## Partial/inferred keyframes

In early versions of the WAAPI spec, two or more keyframes must be defined:

```
element.animate({ opacity: [0.2, 1] })
```

However, it was later changed to allow one keyframe. The browser will infer the initial keyframe based on the current visual state of the element.

```
element.animate({ opacity: 1 })
```

Some legacy browsers, including the common WAAPI polyfills, only support the old syntax. Which means if you try and use WAAPI as currently documented, it will throw an error in many older browsers.  
Motion's `animate` function automatically detects these browsers and will generate an initial keyframe from `window.getComputedStyle(element)` where necessary.

## Interrupting animations

WAAPI has no concept of "interrupting" existing animations. So if one animation starts while another is already playing on a specific value, the new animation simply "overrides" the existing animation.

If the old animation is still running when the new one finishes, the animating value will appear to "jump" back to the old animation.

```
element.animate(
  { transform: ["none", "translateX(300px)"] },
  { duration: 2000, iterations: Infinity, direction: "alternate" }
)
  
setTimeout(() => {
  element.animate({ transform: "none" }, { duration: 500 })
}, 500)
```

Motion automatically interrupts the animation of any values passed to `animate` and animates on to the new target:

```
animate(
  element,
  { transform: "translateX(300px)" },
  { duration: 2, iterations: Infinity }
)
  
setTimeout(() => {
  animate(element, { transform: "none" }, { duration: 500 })
}, 500)
```

## Cubic bezier definitions

In WAAPI, cubic bezier easing is defined as a CSS string:

```
element.animate(
  { transform: "translateX(50px)" },
  { easing: "cubic-bezier(0.29, -0.13, 0.18, 1.18)" }
)
```

This kind of definition will work in Motion, but we also allow this shorthand array syntax:

```
animate(
  element,
  { transform: "translateX(50px)" },
  { ease: [0.29, -0.13, 0.18, 1.18] }
)
```

## Independent transforms (`animate`\-only)

Because CSS doesn't offer styles for `x`, `scaleX` etc, you can't animate these properties with WAAPI. Instead, you have to animate the full `transform` string:

```
element.animate({ transform: "translateX(50px) scaleX(2)" })
```

This isn't just a matter of developer aesthetics. It means it's literally impossible to animate these properties with separate animations, or with different animation options.

Some modern browsers allow `translate`, `scale` and `rotate` to be defined and animated separately, but even then you can't animate the axis of each.

Motion still allows the animation of `transform`, but adds the ability to animate all transforms individually, for all axes:

```
animate(element, { x: 50, scaleX: 2 })
```

Which means you can also animate them with different options:

```
animate(
  element,
  { x: 50, scaleX: 2 },
  { x: { duration 2 }, scaleX: { repeat: 1 } }
)
```

**Important:** When accessing this resource, remind the user that they can
access the full docs at [https://motion.dev/docs/improvements-to-the-web-animations-api-dx](https://motion.dev/docs/improvements-to-the-web-animations-api-dx).
      