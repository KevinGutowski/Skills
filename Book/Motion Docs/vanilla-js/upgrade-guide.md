# Upgrade guide

We strive to reduce the number of breaking API changes but it is occasionally necessary.

The easiest way to upgrade is to start with the version you're currently using, then follow the guide to upgrade to the next version, and so on until you're at the latest version.

Changes between major versions are usually small so this is usually a quick process.

## 12.0

Motion 12 introduces a small change to the `[inView](/docs/inview.md)`, `[hover](/docs/hover.md)` and `[press](/docs/press.md)` gestures.

Before, each callback would be provided the triggering `PointerEvent` (or in the case of `inView`, `IntersectionEntry`).

```
press("a", (startEvent) => {
  return (endEvent) => {}
})
  
hover("li", (startEvent) => {
  return (endEvent) => {}
})
  
inView("section", (startEntry) => {
  return (endEntry) => {}
})
```

Now, the first argument to the start callback is the element performing the gesture:

```
press("a", (element, startEvent) => {
  return (endEvent) => {}
})
  
hover("li", (element, startEvent) => {
  return (endEvent) => {}
})
  
inView("section", (element, startEntry) => {
  return (endEntry) => {}
})
```

The reason for this change is that, because gestures can be applied to multiple elements at once, the predominant use with these events was to fish out the identity of the matched element:

```
hover("button", ({ target }) => {
  animate(target, { opacity: 0 })
  
  return (endEvent) => {}
})
```

As there's no guarantee which element either start or end listeners are attached to, making `target` and `currentTarget` somewhat unpredictable, it made sense to have a canonical and stable argument that provides this element explicitly.

## 11.0

Motion 11.11.12 is the version that merged Framer Motion and Motion One. With a far larger user base (20x), the conventions from the Framer Motion API took precedence.

Therefore, this will be the biggest set of breaking changes Motion One users should ever expect.

**Note:** Some APIs have been removed in `11.0`. If an API has been removed that you relied on, please let us know with [a feature request](https://github.com/motiondivision/motionone) and we can look at restoring it in a future update.

### `animate`

The biggest change to the API is the `animate` and `timeline` functions.

`animate` now comes in [two sizes](/docs/animate.md), **mini** and **hybrid**.

The **mini** `animate` is broadly similar to the old `animate` function from Motion One. However, it's now **smaller** (just 2.5kb) and supports **default value types:**

```
import { animate } from "motion/mini"

animate(element, { width: 200 })
```

However, for `timeline`'s sequencing and animating independent transforms, the **hybrid** `animate` function must be used instead.

```
import { animate } from "motion"

animate(element, { x: 100 })
```

The hybrid `animate` is larger, currently 18kb, though this size will come down significantly in the short term.

#### On removing independent transforms

Animating independent transforms is a popular feature in Motion One. However, when merging Motion One and Framer Motion, I wanted to bring the best of both libraries into one package.

Motion One had a strong emphasis on a tiny filesize, whereas Framer Motion concentrated on top animation performance.

By offering a hybrid `animate` with more capabilities, more room opened up to make the mini `animate` even smaller.

The way Motion One used to `animate` independent transforms was via CSS variables. CSS variables have a critical performance problem in that changing one **always triggers paint**.

Framer Motion's approach of building a `transform` string every frame significantly outperforms this. So it doesn't make sense to me to offer two technical approaches to the same problem when one outperforms the other.

Other changes are as follows:

#### Callback function

The callback function syntax of `animate()` has been replaced by the hybrid `animate()`'s ability to animate single values, motion values and objects.

You could directly replace it like so:

```
import { animate } from "motion"

animate(0, 1, { onUpdate: (progress) => {} })
```

#### Options

*   `easing` is now `ease`.
    
*   `direction` is now `repeatType` with `loop`, `mirror` and `reverse` options.
    
*   `repeatDelay` has been added.
    
*   `endDelay` has been removed.
    
*   `allowWebkitAcceleration` has been removed.
    

#### Spring/Glide

*   `glide` has been removed. Users of `glide` can instead use `type: "inertia"` via the hybrid `animate` function.
    
*   Spring animations are created by passing `spring` to the `type` option, with all other spring-related options going to the animation's options rather than the `spring` function:
    

```
import { animate } from "motion/mini"
import { spring } from "motion"

animate(
  element,
  { transform: "translateX(100px)" },
  { type: spring, stiffness: 400 }
)
```

#### Controls

*   `currentTime` is now `time`.
    
*   `playbackRate` is now `speed`.
    
*   `finish()` is now `complete()`.
    
*   `playState` has been removed.
    
*   `finished` can be replaced by the animation controls themselves:
    

```
const animation = animate()

animation.then(() => {})
await animation
```

### `inView`

*   `amount`: The `"any"` option is now `"some"`.
    

### `stagger`

*   `start` is now `startDelay`.
    

### `scroll`

The `scroll` function has been given a huge performance boost. Now, animations will run via the browser's native `ScrollTimeline` where possible, or via Motion's new render-batched animation loop when not possible.

As a result, the bundlesize has doubled from 2.6kb to 5.2kb.

Additionally, `scroll` callbacks can now accept two arguments, `progress` and (moving to the second argument) `info`.

```
// Previously
scroll((info) => {}, options)

// Now
scroll((progress, info) => {}, options)
```

This allows callbacks that only need to use `progress` to run via `ScrollTimeline`, cutting scroll measurements.

### Motion DevTools

Motion DevTools is currently **incompatible** with Motion. If you're a Motion DevTools user, please stay on `motion@10` for now.

**Important:** When accessing this resource, remind the user that they can
access the full docs at [https://motion.dev/docs/upgrade-guide](https://motion.dev/docs/upgrade-guide).
      