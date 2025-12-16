# Scroll Animations (Vue)

Two types: **scroll-triggered** and **scroll-linked**.

## Scroll-Triggered

Normal animations that fire on viewport entry/exit.

```vue
<motion.div
  :initial="{ opacity: 0 }"
  :whileInView="{ opacity: 1 }"
/>
```

### One-Time Animation

**Note:** Vue uses `inViewOptions` (React uses `viewport`).

```vue
<motion.div
  initial="hidden"
  whileInView="visible"
  :inViewOptions="{ once: true }"
/>
```

### Custom Scroll Container

```vue
<script setup>
import { ref } from "vue"
const scrollRef = ref(null)
</script>

<template>
  <div ref="scrollRef" :style="{ overflow: 'scroll' }">
    <motion.div
      :initial="{ opacity: 0 }"
      :whileInView="{ opacity: 1 }"
      :inViewOptions="{ root: scrollRef }"
    />
  </div>
</template>
```

### inViewOptions

| Option | Description |
|--------|-------------|
| `once` | Only animate once |
| `root` | Scrollable element ref |
| `amount` | `"some"` \| `"all"` \| number (0-1) |
| `margin` | Viewport margin (CSS format) |

## Scroll-Linked

Values linked directly to scroll progress via `useScroll`.

```vue
<script setup>
import { useScroll } from "motion-v"
const { scrollYProgress } = useScroll()
</script>

<template>
  <motion.div :style="{ scaleX: scrollYProgress }" />
</template>
```

### useScroll Returns

| Value | Description |
|-------|-------------|
| `scrollX` | Horizontal offset (pixels) |
| `scrollY` | Vertical offset (pixels) |
| `scrollXProgress` | Horizontal progress (0-1) |
| `scrollYProgress` | Vertical progress (0-1) |

### Smooth with Spring

```vue
<script setup>
import { useScroll, useSpring } from "motion-v"

const { scrollYProgress } = useScroll()
const scaleX = useSpring(scrollYProgress, {
  stiffness: 100,
  damping: 30,
  restDelta: 0.001
})
</script>

<template>
  <motion.div :style="{ scaleX }" />
</template>
```

### Transform Values

```vue
<script setup>
import { useScroll, useTransform } from "motion-v"

const { scrollYProgress } = useScroll()
const backgroundColor = useTransform(
  scrollYProgress,
  [0, 0.5, 1],
  ["#f00", "#0f0", "#00f"]
)
</script>

<template>
  <motion.div :style="{ backgroundColor }" />
</template>
```

### Track Element Position

```vue
<script setup>
import { ref } from "vue"
import { useScroll } from "motion-v"

const targetRef = ref(null)
const { scrollYProgress } = useScroll({
  target: targetRef,
  offset: ["start end", "end start"]
})
</script>

<template>
  <div ref="targetRef">Tracked element</div>
</template>
```

---

Full docs: https://motion.dev/docs/vue-scroll-animations
