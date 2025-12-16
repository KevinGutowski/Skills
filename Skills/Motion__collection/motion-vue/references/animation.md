# Vue Animation Guide

## Contents
- [Basic Animations](#basic-animations)
- [Animatable Values](#animatable-values)
- [Transforms](#transforms)
- [Keyframes](#keyframes)
- [Variants](#variants)
- [Animation Controls](#animation-controls)

---

## Basic Animations

```vue
<script setup>
import { motion } from "motion-v"
</script>

<template>
  <motion.div :animate="{ opacity: 1 }" />
</template>
```

When `animate` values change, component animates to new target.

## Animatable Values

- **Numbers:** `0`, `100`
- **Strings with numbers:** `"0vh"`, `"10px"`
- **Colors:** Hex, RGBA, HSLA (freely intermixable)
- **Complex strings:** `box-shadow`, gradients
- **Display/Visibility:** `"none"/"block"`, `"hidden"/"visible"`

### Value Type Conversion

`x`, `y`, `width`, `height`, `top`, `left`, `right`, `bottom` can animate between types:

```vue
<motion.div :initial="{ x: '100%' }" :animate="{ x: 'calc(100vw - 50%)' }" />
<motion.div :initial="{ height: '0px' }" :animate="{ height: 'auto' }" />
```

## Transforms

Independent axes (flexible, great for gestures):

```vue
<motion.button :whileHover="{ scale: 1.1 }" :whilePress="{ scale: 0.9 }" />
```

Hardware accelerated (set transform directly):

```vue
<motion.li
  :initial="{ transform: 'translateX(-100px)' }"
  :animate="{ transform: 'translateX(0px)' }"
/>
```

| Property | Values |
|----------|--------|
| Translate | `x`, `y`, `z` |
| Scale | `scale`, `scaleX`, `scaleY` |
| Rotate | `rotate`, `rotateX`, `rotateY`, `rotateZ` |
| Skew | `skew`, `skewX`, `skewY` |
| Origin | `originX`, `originY`, `originZ` |

**SVG:** Use `attrX`, `attrY` for attribute animation.

### CSS Variables

```vue
<motion.ul
  :initial="{ '--rotate': '0deg' }"
  :animate="{ '--rotate': '360deg' }"
  :transition="{ duration: 2, repeat: Infinity }"
>
  <li :style="{ transform: 'rotate(var(--rotate))' }" />
</motion.ul>
```

### SVG Line Drawing

```vue
<motion.path :initial="{ pathLength: 0 }" :animate="{ pathLength: 1 }" />
```

Works with: `circle`, `ellipse`, `line`, `path`, `polygon`, `polyline`, `rect`

## Keyframes

```vue
<motion.div :animate="{ x: [0, 100, 0] }" />

<!-- Use current value as first keyframe -->
<motion.div :animate="{ x: [null, 100, 0] }" />

<!-- Custom timing -->
<motion.circle
  :animate="{
    cx: [null, 100, 200],
    transition: { duration: 3, times: [0, 0.2, 1] }
  }"
/>
```

## Variants

Named animation targets for orchestration:

```vue
<script setup>
const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
}
</script>

<template>
  <motion.div :variants="variants" initial="hidden" animate="visible" />
</template>
```

### Propagation

Variants flow down through children:

```vue
<script setup>
const list = { visible: { opacity: 1 }, hidden: { opacity: 0 } }
const item = { visible: { opacity: 1, x: 0 }, hidden: { opacity: 0, x: -100 } }
</script>

<template>
  <motion.ul initial="hidden" whileInView="visible" :variants="list">
    <motion.li :variants="item" />
    <motion.li :variants="item" />
  </motion.ul>
</template>
```

### Orchestration

```vue
<script setup>
const list = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.3
    }
  }
}
</script>
```

### Dynamic Variants

```vue
<script setup>
const variants = {
  visible: (index) => ({
    opacity: 1,
    transition: { delay: index * 0.3 }
  })
}
</script>

<template>
  <motion.div
    v-for="(item, index) in items"
    :custom="index"
    :variants="variants"
  />
</template>
```

## Animation Controls

```vue
<script setup>
import { useAnimate } from "motion-v"

const [scope, animate] = useAnimate()

const handleClick = async () => {
  const controls = await animate([
    [scope.value, { x: "100%" }],
    ["li", { opacity: 1 }]
  ])
  controls.speed = 0.8
}
</script>

<template>
  <ul ref="scope">
    <li />
  </ul>
</template>
```

## Animate Content

```vue
<script setup>
import { useMotionValue, animate, RowValue } from "motion-v"
import { onMounted, onUnmounted } from "vue"

const count = useMotionValue(0)
let controls

onMounted(() => {
  controls = animate(count, 100, { duration: 5 })
})

onUnmounted(() => controls?.stop())
</script>

<template>
  <motion.pre><RowValue :value="count" /></motion.pre>
</template>
```

---

Full docs: https://motion.dev/docs/vue-animation
