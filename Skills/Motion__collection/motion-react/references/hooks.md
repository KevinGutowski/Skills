# Hooks Reference

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

---

## useAnimate

Imperative animation control with scoped selectors and automatic cleanup.

```jsx
import { useAnimate, stagger } from "motion/react"

function Component() {
  const [scope, animate] = useAnimate()
  
  const handleClick = async () => {
    // Animate within scope
    await animate("li", { opacity: 1 }, { delay: stagger(0.1) })
    await animate(scope.current, { scale: 1.2 })
  }
  
  return <ul ref={scope}>{/* li elements */}</ul>
}
```

---

## useScroll

Create scroll-linked animations.

```jsx
import { useScroll, useTransform } from "motion/react"

function Component() {
  const { scrollY, scrollYProgress } = useScroll()
  // Also: scrollX, scrollXProgress
  
  // Track element position
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]  // Enter bottom, leave top
  })
  
  // Track scroll container
  const { scrollXProgress } = useScroll({
    container: carouselRef,
    axis: "x"
  })
}
```

### Offset Syntax
Format: `["<target> <container>", "<target> <container>"]`

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

```jsx
import { useScroll, useTransform } from "motion/react"

const { scrollYProgress } = useScroll()
const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1.5])

// With easing
const y = useTransform(scrollYProgress, [0, 1], [0, -100], { ease: "easeOut" })

// Multiple inputs
const color = useTransform([x, y], ([latestX, latestY]) => {
  return latestX > 100 ? "red" : "blue"
})
```

---

## useSpring

Create spring-animated motion values.

```jsx
import { useSpring, useScroll } from "motion/react"

const { scrollYProgress } = useScroll()
const smoothProgress = useSpring(scrollYProgress, {
  stiffness: 100,
  damping: 30,
  restDelta: 0.001
})

return <motion.div style={{ scaleX: smoothProgress }} />
```

---

## useMotionValue

Create motion values that don't trigger re-renders.

```jsx
import { useMotionValue, animate } from "motion/react"

const x = useMotionValue(0)

// Animate directly
animate(x, 100, { duration: 0.5 })

// Use in style
<motion.div style={{ x }} />
```

---

## useVelocity

Track velocity of a motion value.

```jsx
import { useMotionValue, useVelocity, useTransform } from "motion/react"

const x = useMotionValue(0)
const xVelocity = useVelocity(x)
const skew = useTransform(xVelocity, [-1000, 0, 1000], [-20, 0, 20])

return <motion.div drag="x" style={{ x, skewX: skew }} />
```

---

## useInView

Detect when element enters viewport.

```jsx
import { useInView } from "motion/react"

const ref = useRef(null)
const isInView = useInView(ref, {
  once: true,           // Only trigger once
  margin: "-100px",     // Offset
  amount: "all"         // "some" | "all" | 0-1
})

return <div ref={ref}>{isInView && "Visible!"}</div>
```

---

## useDragControls

Programmatically control drag from another element.

```jsx
import { useDragControls } from "motion/react"

const controls = useDragControls()

<div onPointerDown={(e) => controls.start(e, { snapToCursor: true })}>
  Drag handle
</div>
<motion.div drag dragControls={controls} dragListener={false} />
```

---

## useAnimationFrame

Run callback every frame.

```jsx
import { useAnimationFrame } from "motion/react"

useAnimationFrame((time, delta) => {
  // time: ms since mount
  // delta: ms since last frame
  ref.current.style.transform = `rotateY(${time / 10}deg)`
})
```

---

## useReducedMotion

Check user's motion preference.

```jsx
import { useReducedMotion } from "motion/react"

const prefersReducedMotion = useReducedMotion()

return (
  <motion.div
    animate={prefersReducedMotion ? {} : { scale: 1.2 }}
  />
)
```

---

## useMotionValueEvent

Subscribe to motion value changes without re-renders.

```jsx
import { useMotionValue, useMotionValueEvent } from "motion/react"

const x = useMotionValue(0)

useMotionValueEvent(x, "change", (latest) => {
  console.log("x changed to", latest)
})

useMotionValueEvent(x, "animationStart", () => console.log("started"))
useMotionValueEvent(x, "animationComplete", () => console.log("done"))
```

---

## useMotionTemplate

Combine motion values into template strings.

```jsx
import { useMotionValue, useMotionTemplate } from "motion/react"

const x = useMotionValue(0)
const y = useMotionValue(0)
const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px)`

return <motion.div style={{ transform }} />
```
