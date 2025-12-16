# Motion Values (React)

Signal-like values that track state and velocity. Update DOM **without React re-renders**.

## Contents
- [Creating motion values](#creating-motion-values)
- [Why use motion values](#why-use-motion-values)
- [Basic usage](#basic-usage)
- [API methods](#api-methods)
- [Events](#events)
- [Composition](#composition)

## Creating Motion Values

```jsx
import { useMotionValue, motion } from "motion/react"

const x = useMotionValue(0)

<motion.div style={{ x }} />        // HTML
<motion.circle cx={cx} />           // SVG attribute
```

## Why Use Motion Values?

- Set/get state imperatively
- Pass to multiple components (synchronized motion)
- Chain via `useTransform`
- Update visually without React render cycle
- Subscribe to updates

## Basic Usage

```jsx
const x = useMotionValue(0)
const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0])

// Opacity changes as element is dragged
<motion.div drag="x" style={{ x, opacity }} />
```

## API Methods

| Method | Description |
|--------|-------------|
| `get()` | Get current value |
| `set(value)` | Set new value (batched render) |
| `jump(value)` | Set value, reset velocity, stop animations |
| `getVelocity()` | Get velocity (per second) |
| `isAnimating()` | Check if animating |
| `stop()` | Stop active animation |
| `destroy()` | Clean up subscribers |

```jsx
x.set(100)
x.get()           // 100
x.getVelocity()   // velocity in units/second
```

## Events

```jsx
// Hook (recommended in components)
useMotionValueEvent(x, "change", (latest) => console.log(latest))

// Method (use in useEffect)
const unsubscribe = x.on("change", (latest) => console.log(latest))
```

Events: `"change"`, `"animationStart"`, `"animationComplete"`, `"animationCancel"`

## Composition

### useTransform

```jsx
// Function syntax
const y = useTransform(() => x.get() * 2)

// Mapping syntax
const opacity = useTransform(x, [0, 100], [1, 0])
const color = useTransform(x, [0, 100], ["#f00", "#00f"])
```

### useSpring

Attach motion value via spring:

```jsx
const dragX = useMotionValue(0)
const x = useSpring(dragX, { stiffness: 300, damping: 30 })
```

### useVelocity

Create motion value from another's velocity:

```jsx
const x = useMotionValue(0)
const xVelocity = useVelocity(x)
```

## Pattern: Synchronized Components

```jsx
const x = useMotionValue(0)

<motion.div style={{ x }} />           // Both move together
<motion.div style={{ x: x }} drag />   // Dragging updates both
```

---

Full docs: https://motion.dev/docs/react-motion-value
