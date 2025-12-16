# Motion Values (Vue)

Signal-like values that track state and velocity. Update DOM **without Vue re-renders**.

## Creating Motion Values

```vue
<script setup>
import { motion, useMotionValue } from "motion-v"

const x = useMotionValue(0)
</script>

<template>
  <motion.div :style="{ x }" />       <!-- HTML -->
  <motion.circle :cx="cx" />          <!-- SVG attribute -->
</template>
```

## Why Use Motion Values?

- Set/get state imperatively
- Pass to multiple components (synchronized motion)
- Chain via `useTransform`
- Update visually without Vue render cycle
- Subscribe to updates

## Basic Usage

```vue
<script setup>
import { useMotionValue, useTransform } from "motion-v"

const x = useMotionValue(0)
const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0])
</script>

<template>
  <!-- Opacity changes as element is dragged -->
  <motion.div drag="x" :style="{ x, opacity }" />
</template>
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

```javascript
x.set(100)
x.get()           // 100
x.getVelocity()   // velocity in units/second
```

## Events

```vue
<script setup>
import { useMotionValue, useMotionValueEvent } from "motion-v"

const x = useMotionValue(0)

useMotionValueEvent(x, "change", (latest) => console.log(latest))
</script>
```

Events: `"change"`, `"animationStart"`, `"animationComplete"`, `"animationCancel"`

## Composition

### useTransform

```javascript
// Function syntax
const y = useTransform(() => x.get() * 2)

// Mapping syntax
const opacity = useTransform(x, [0, 100], [1, 0])
```

### useSpring

```javascript
const dragX = useMotionValue(0)
const x = useSpring(dragX, { stiffness: 300, damping: 30 })
```

---

Full docs: https://motion.dev/docs/vue-motion-value
