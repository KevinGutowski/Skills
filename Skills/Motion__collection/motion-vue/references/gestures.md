# Gestures (Vue)

## Contents
- [Animation Props](#animation-props)
- [Hover](#hover)
- [Press](#press)
- [Pan](#pan)
- [Drag](#drag)
- [Focus](#focus)
- [Event Propagation](#event-propagation)

---

Motion extends Vue with **hover**, **press**, **pan**, **drag**, **focus**, and **inView** gestures.

## Animation Props

```vue
<motion.button
  :whileHover="{ scale: 1.2 }"
  :whilePress="{ scale: 0.9 }"
  :whileFocus="{ borderColor: 'blue' }"
  :whileDrag="{ scale: 1.2 }"
  :whileInView="{ opacity: 1 }"
/>
```

With variants:

```vue
<motion.button
  whilePress="press"
  whileHover="hover"
  :variants="buttonVariants"
>
  <motion.path :variants="iconVariants" />
</motion.button>
```

## Hover

Filters touch-emulated events (unlike mouseEnter/Leave):

```vue
<motion.a
  :whileHover="{ scale: 1.2 }"
  @hoverStart="(event) => {}"
  @hoverEnd="(event) => {}"
/>
```

## Press

**Note:** Vue uses `whilePress` (React uses `whileTap`).

```vue
<motion.button
  :whilePress="{ scale: 0.9, rotate: 3 }"
  @press="(event) => {}"
  @pressStart="(event) => {}"
  @pressCancel="(event) => {}"
/>
```

### Keyboard Accessibility

Press elements are keyboard-accessible:
- `Enter` down → `@pressStart`, `whilePress`
- `Enter` up → `@press`
- Focus lost → `@pressCancel`

## Pan

Fires when pointer moves > 3px while pressed:

```vue
<motion.div
  @pan="(event, pointInfo) => {}"
  @panStart="(event, pointInfo) => {}"
  @panEnd="(event, pointInfo) => {}"
/>
```

**Note:** Requires `touch-action: none` CSS for touch input.

## Drag

```vue
<motion.div
  drag           <!-- Both axes -->
  drag="x"       <!-- X-axis only -->
  drag="y"       <!-- Y-axis only -->
  :whileDrag="{ scale: 1.2 }"
  @drag="(event, info) => {}"
/>
```

### Constraints

```vue
<!-- Pixel constraints -->
<motion.div drag="x" :dragConstraints="{ left: 0, right: 300 }" />

<!-- Element constraint (Vue-specific) -->
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

### Options

| Prop | Description |
|------|-------------|
| `dragElastic` | Elasticity outside constraints (0-1) |
| `dragMomentum` | Enable inertia (default: true) |
| `dragDirectionLock` | Lock to first axis dragged |
| `dragTransition` | Inertia animation options |

```vue
<motion.div
  drag
  dragDirectionLock
  :dragElastic="0.2"
  :dragMomentum="false"
  @directionLock="(axis) => {}"
/>
```

## Focus

Follows `:focus-visible` rules:

```vue
<motion.input :whileFocus="{ scale: 1.02, borderColor: 'blue' }" />
```

## Event Propagation

Stop gestures from bubbling:

```vue
<motion.div :whilePress="{ scale: 2 }">
  <button @pointerDownCapture="(e) => e.stopPropagation()" />
</motion.div>
```

## SVG Filters

Filters don't receive events. Use parent + variants:

```vue
<motion.svg whileHover="hover">
  <filter id="blur">
    <motion.feGaussianBlur
      :stdDeviation="0"
      :variants="{ hover: { stdDeviation: 2 } }"
    />
  </filter>
</motion.svg>
```

---

Full docs: https://motion.dev/docs/vue-gestures
