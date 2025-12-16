---
name: motion-vue
description: Create animations with Motion for Vue 3. Use for declarative animations, AnimatePresence exit animations, layout animations, gestures (hover, press, drag), scroll effects, variants, and motion values.
---

# Motion for Vue

## Installation

```bash
npm install motion-v
```

```vue
<script setup>
import { motion, AnimatePresence } from "motion-v"
</script>
```

## Core Patterns

### Basic Animation

```vue
<motion.div
  :initial="{ opacity: 0, y: 20 }"
  :animate="{ opacity: 1, y: 0 }"
  :transition="{ duration: 0.5 }"
/>
```

### Gestures

```vue
<motion.button
  :whileHover="{ scale: 1.05 }"
  :whilePress="{ scale: 0.95 }"
  :whileFocus="{ borderColor: '#3b82f6' }"
/>
```

**Note:** Vue uses `whilePress` instead of React's `whileTap`.

### Exit Animations

```vue
<AnimatePresence>
  <motion.div v-if="show" key="modal" :exit="{ opacity: 0 }" />
</AnimatePresence>
```

### Layout Animations

```vue
<motion.div layout />
<motion.div layoutId="shared-element" />
```

### Scroll-Triggered

```vue
<motion.div
  :initial="{ opacity: 0 }"
  :whileInView="{ opacity: 1 }"
  :inViewOptions="{ once: true }"
/>
```

**Note:** Vue uses `inViewOptions` instead of React's `viewport`.

### Scroll-Linked

```vue
<script setup>
import { useScroll, useTransform } from "motion-v"

const { scrollYProgress } = useScroll()
const y = useTransform(scrollYProgress, [0, 1], [0, -100])
</script>

<template>
  <motion.div :style="{ y }" />
</template>
```

### Drag

```vue
<script setup>
import { useDomRef } from "motion-v"
const constraintsRef = useDomRef()
</script>

<template>
  <motion.div ref="constraintsRef">
    <motion.div drag :dragConstraints="constraintsRef" />
  </motion.div>
</template>
```

### Variants

```vue
<script setup>
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
}
const item = { hidden: { y: 20 }, show: { y: 0 } }
</script>

<template>
  <motion.ul :variants="container" initial="hidden" animate="show">
    <motion.li :variants="item" />
  </motion.ul>
</template>
```

## Motion Primitive

Alternative syntax using `as` prop:

```vue
<script setup>
import { Motion } from "motion-v"
</script>

<template>
  <Motion as="button" :whileHover="{ scale: 1.1 }">Click</Motion>
</template>
```

## Key Composables

| Composable | Purpose |
|------------|---------|
| `useAnimate` | Imperative animation control |
| `useScroll` | Track scroll progress |
| `useTransform` | Map values to ranges |
| `useSpring` | Spring-animated motion value |
| `useMotionValue` | Animatable value (no re-render) |
| `useInView` | Viewport detection |
| `useDomRef` | DOM ref for dragConstraints |

## Key Components

| Component | Purpose |
|-----------|---------|
| `motion.*` | Animated element |
| `Motion` | Primitive with `as` prop |
| `AnimatePresence` | Exit animations |
| `LayoutGroup` | Sync layout animations |
| `MotionConfig` | Default transition |
| `Reorder.Group/Item` | Drag-to-reorder |

## Vue-Specific Differences from React

| Feature | React | Vue |
|---------|-------|-----|
| Package | `motion/react` | `motion-v` |
| Tap gesture | `whileTap` | `whilePress` |
| Viewport options | `viewport` | `inViewOptions` |
| Callbacks | `onHoverStart` | `@hoverStart` |
| Ref for constraints | `useRef` | `useDomRef` |

## References

### Getting Started
- [references/quick-start.md](references/quick-start.md) — Installation, Nuxt, first animation
- [references/animation.md](references/animation.md) — Animation concepts, keyframes, variants

### Core Components
- [references/motion-component.md](references/motion-component.md) — Full motion.* props (gestures, layout, drag)
- [references/animate-presence.md](references/animate-presence.md) — Exit animations, modes, v-if/v-show
- [references/layout-animations.md](references/layout-animations.md) — Layout, layoutId, shared elements

### Utility Components
- [references/layout-group.md](references/layout-group.md) — Sync layout animations across siblings
- [references/motion-config.md](references/motion-config.md) — Default transitions, reduced motion
- [references/reorder.md](references/reorder.md) — Drag-to-reorder lists

### Animations & Gestures
- [references/transitions.md](references/transitions.md) — Tween, spring, inertia, orchestration
- [references/gestures.md](references/gestures.md) — Hover, press, pan, drag, focus
- [references/scroll-animations.md](references/scroll-animations.md) — Scroll-triggered and scroll-linked

### Motion Values & Composables
- [references/motion-value.md](references/motion-value.md) — MotionValue API and composition
- [references/composables.md](references/composables.md) — All composables (useAnimate, useScroll, useTransform, etc.)

### Integrations
- [references/radix.md](references/radix.md) — Radix-Vue (Reka UI) integration

### Performance
- [references/lazy-motion.md](references/lazy-motion.md) — LazyMotion, code splitting, m component
