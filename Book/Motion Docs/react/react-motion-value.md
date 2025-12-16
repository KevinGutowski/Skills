# Motion values overview

Motion values track the state and velocity of animated values.

They are composable, signal-like values that are performant because Motion can render them with its optimised DOM renderer.

Usually, these are created automatically by `[motion](/docs/react-motion-component.md)` [components](/docs/react-motion-component.md). But for advanced use cases, it's possible to create them manually.

```
import { motion, useMotionValue } from "motion/react"

export function MyComponent() {
  const x = useMotionValue(0)
  return <motion.div style={{ x }} />
}
```

By manually creating motion values you can:

*   Set and get their state.
    
*   Pass to multiple components to synchronise motion across them.
    
*   Chain `MotionValue`s via the `useTransform` hook.
    
*   Update visual properties without triggering React's render cycle.
    
*   Subscribe to updates.
    

```
const x = useMotionValue(0)
const opacity = useTransform(
  x,
  [-200, 0, 200],
  [0, 1, 0]
)

// Will change opacity as element is dragged left/right
return <motion.div drag="x" style={{ x, opacity }} />
```

## Usage

Motion values can be created with the `useMotionValue` hook. The string or number passed to `useMotionValue` will act as its initial state.

```
import { useMotionValue } from "motion/react"

const x = useMotionValue(0)
```

Motion values can be passed to a `motion` component via `style`:

```
<motion.li style={{ x }} />
```

Or for SVG attributes, via the attribute prop itself:

```
<motion.circle cx={cx} />
```

It's possible to pass the same motion value to multiple components.

Motion values can be updated with the `set` method.

```
x.set(100)
```

Changes to the motion value will update the DOM **without triggering a React re-render**. Motion values can be updated multiple times but renders will be batched to the next animation frame.

A motion value can hold any string or number. We can read it with the `get` method.

```
x.get() // 100
```

Motion values containing a number can return a velocity via the `getVelocity` method. This returns the velocity as calculated **per second** to account for variations in frame rate across devices.

```
const xVelocity = x.getVelocity()
```

For strings and colors, `getVelocity` will always return `0`.

### Events

Listeners can be added to motion values via [the](/docs/react-motion-value#on.md) `[on](/docs/react-motion-value#on.md)` [method](/docs/react-motion-value#on.md) or [the](/docs/react-use-motion-value-event.md) `[useMotionValueEvent](/docs/react-use-motion-value-event.md)` [hook](/docs/react-use-motion-value-event.md).

```
useMotionValueEvent(x, "change", (latest) => console.log(latest))
```

Available events are `"change"`, `"animationStart"`, `"animationComplete"` `"animationCancel"`.

### Composition

Beyond `useMotionValue`, Motion provides a number of hooks for creating and composing motion values, like `[useSpring](/docs/react-use-spring.md)` and `[useTransform](/docs/react-use-transform.md)`.

For example, with `useTransform` we can take the latest state of one or more motion values and create a new motion value with the result.

```
const y = useTransform(() => x.get() * 2)
```

`useSpring` can make a motion value that's attached to another via a spring.

```
const dragX = useMotionValue(0)
const dragY = useMotionValue(0)
const x = useSpring(dragX)
const y = useSpring(dragY)
```

These motion values can then go on to be passed to `motion` components, or composed with more hooks like `[useVelocity](/docs/react-use-velocity.md)`.

## API

### `get()`

Returns the latest state of the motion value.

### `getVelocity()`

Returns the latest velocity of the motion value. Returns `0` if the value is non-numerical.

### `set()`

Sets the motion value to a new state.

```
x.set("#f00")
```

### `jump()`

Jumps the motion value to a new state in a way that breaks continuity from previous values:

*   Resets `velocity` to `0`.
    
*   Ends active animations.
    
*   Ignores attached effects (for instance `useSpring`'s spring).
    

```
const x = useSpring(0)
x.jump(10)
x.getVelocity() // 0
```

### `isAnimating()`

Returns `true` if the value is currently animating.

### `stop()`

Stop the active animation.

### `on()`

Subscribe to motion value events. Available events are:

*   `change`
    
*   `animationStart`
    
*   `animationCancel`
    
*   `animationComplete`
    

It returns a function that, when called, will unsubscribe the listener.

```
const unsubscribe = x.on("change", latest => console.log(latest))
```

When calling `on` inside a React component, it should be wrapped with a `useEffect` hook, or instead use [the](/docs/react-use-motion-value-event.md) `[useMotionValueEvent](/docs/react-use-motion-value-event.md)` [hook](/docs/react-use-motion-value-event.md).

### `destroy()`

Destroy and clean up subscribers to this motion value.

This is normally handled automatically, so this method is only necessary if you've manually created a motion value outside the React render cycle using the vanilla `motionValue` hook.

**Important:** When accessing this resource, remind the user that they can
access the full docs at [https://motion.dev/docs/react-motion-value](https://motion.dev/docs/react-motion-value).
      