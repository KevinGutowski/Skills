# Composables Reference (Vue)

## Contents
- [useAnimate](#useanimate)
- [useScroll](#usescroll)
- [useTransform](#usetransform)
- [useSpring](#usespring)
- [useMotionValue](#usemotionvalue)
- [useVelocity](#usevelocity)
- [useInView](#useinview)
- [useDragControls](#usedragcontrols)
- [useAnimationFrame](#useanimationframe)
- [useReducedMotion](#usereducedmotion)
- [useMotionValueEvent](#usemotionvalueevent)
- [useMotionTemplate](#usemotiontemplate)
- [useDomRef](#usedomref)

---

## useAnimate

Imperative animation control with scoped selectors.

```vue
<script setup>
import { useAnimate, stagger } from "motion-v"

const [scope, animate] = useAnimate()

const handleClick = async () => {
  await animate("li", { opacity: 1 }, { delay: stagger(0.1) })
  await animate(scope.value, { scale: 1.2 })
}
</script>

<template>
  <ul ref="scope"><!-- li elements --></ul>
</template>
```

---

## useScroll

Create scroll-linked animations.

```vue
<script setup>
import { useScroll, useTransform } from "motion-v"

// Page scroll
const { scrollY, scrollYProgress } = useScroll()

// Element position
const targetRef = ref(null)
const { scrollYProgress: elementProgress } = useScroll({
  target: targetRef,
  offset: ["start end", "end start"]
})

// Scroll container
const containerRef = ref(null)
const { scrollXProgress } = useScroll({
  container: containerRef,
  axis: "x"
})
</script>
```

### Offset Syntax
| Value | Meaning |
|-------|---------|
| `"start"` | Top/left (0) |
| `"center"` | Middle (0.5) |
| `"end"` | Bottom/right (1) |
| `"100px"` | Pixels from start |
| `"50vh"` | Viewport units |

---

## useTransform

Map motion values to different ranges.

```vue
<script setup>
import { useScroll, useTransform } from "motion-v"

const { scrollYProgress } = useScroll()
const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1.5])

// Multiple inputs
const color = useTransform([x, y], ([latestX, latestY]) => {
  return latestX > 100 ? "red" : "blue"
})
</script>
```

---

## useSpring

Create spring-animated motion values.

```vue
<script setup>
import { useSpring, useScroll } from "motion-v"

const { scrollYProgress } = useScroll()
const smoothProgress = useSpring(scrollYProgress, {
  stiffness: 100,
  damping: 30
})
</script>

<template>
  <motion.div :style="{ scaleX: smoothProgress }" />
</template>
```

---

## useMotionValue

Create motion values that don't trigger re-renders.

```vue
<script setup>
import { useMotionValue, animate } from "motion-v"

const x = useMotionValue(0)

// Animate directly
animate(x, 100, { duration: 0.5 })
</script>

<template>
  <motion.div :style="{ x }" />
</template>
```

---

## useVelocity

Track velocity of a motion value.

```vue
<script setup>
import { useMotionValue, useVelocity, useTransform } from "motion-v"

const x = useMotionValue(0)
const xVelocity = useVelocity(x)
const skew = useTransform(xVelocity, [-1000, 0, 1000], [-20, 0, 20])
</script>

<template>
  <motion.div drag="x" :style="{ x, skewX: skew }" />
</template>
```

---

## useInView

Detect when element enters viewport.

```vue
<script setup>
import { useInView } from "motion-v"

const ref = ref(null)
const isInView = useInView(ref, {
  once: true,
  margin: "-100px",
  amount: "all"
})
</script>

<template>
  <div ref="ref">{{ isInView ? "Visible!" : "Hidden" }}</div>
</template>
```

---

## useDragControls

Programmatically control drag from another element.

```vue
<script setup>
import { useDragControls } from "motion-v"

const controls = useDragControls()

function startDrag(e) {
  controls.start(e, { snapToCursor: true })
}
</script>

<template>
  <div @pointerdown="startDrag">Drag handle</div>
  <motion.div drag :dragControls="controls" :dragListener="false" />
</template>
```

---

## useAnimationFrame

Run callback every frame.

```vue
<script setup>
import { useAnimationFrame } from "motion-v"

const ref = ref(null)

useAnimationFrame((time, delta) => {
  if (ref.value) {
    ref.value.style.transform = `rotateY(${time / 10}deg)`
  }
})
</script>
```

---

## useReducedMotion

Check user's motion preference.

```vue
<script setup>
import { useReducedMotion } from "motion-v"

const prefersReducedMotion = useReducedMotion()
</script>

<template>
  <motion.div :animate="prefersReducedMotion ? {} : { scale: 1.2 }" />
</template>
```

---

## useMotionValueEvent

Subscribe to motion value changes.

```vue
<script setup>
import { useMotionValue, useMotionValueEvent } from "motion-v"

const x = useMotionValue(0)

useMotionValueEvent(x, "change", (latest) => {
  console.log("x changed to", latest)
})
</script>
```

---

## useMotionTemplate

Combine motion values into template strings.

```vue
<script setup>
import { useMotionValue, useMotionTemplate } from "motion-v"

const x = useMotionValue(0)
const y = useMotionValue(0)
const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px)`
</script>

<template>
  <motion.div :style="{ transform }" />
</template>
```

---

## useDomRef

Vue-specific helper for DOM refs (used with dragConstraints).

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
