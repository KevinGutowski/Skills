# React Animation Guide

## Contents
- [Basic animations](#basic-animations)
- [Animatable values](#animatable-values)
- [Independent transforms](#independent-transforms)
- [CSS variables](#css-variables)
- [SVG line drawing](#svg-line-drawing)
- [Keyframes](#keyframes)
- [Variants](#variants)
- [Animate content](#animate-content)

## Basic Animations

```jsx
import { motion } from "motion/react"

<motion.div animate={{ opacity: 1 }} />
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

```jsx
<motion.div initial={{ x: "100%" }} animate={{ x: "calc(100vw - 50%)" }} />
<motion.div initial={{ height: 0 }} animate={{ height: "auto" }} />
```

## Independent Transforms

```jsx
// Independent axes (flexible, great for gestures)
<motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} />

// Hardware accelerated (set transform directly)
<motion.li
  initial={{ transform: "translateX(-100px)" }}
  animate={{ transform: "translateX(0px)" }}
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

## CSS Variables

```jsx
// Animate CSS variable (triggers paint)
<motion.ul
  initial={{ '--rotate': '0deg' }}
  animate={{ '--rotate': '360deg' }}
>
  <li style={{ transform: 'rotate(var(--rotate))' }} />
</motion.ul>

// Use CSS variable as target
<motion.li animate={{ backgroundColor: "var(--action-bg)" }} />
```

## SVG Line Drawing

```jsx
<motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
```

Works with: `circle`, `ellipse`, `line`, `path`, `polygon`, `polyline`, `rect`

## Keyframes

```jsx
<motion.div animate={{ x: [0, 100, 0] }} />

// Use current value as first keyframe
<motion.div animate={{ x: [null, 100, 0] }} />

// Custom timing
<motion.circle
  animate={{
    cx: [null, 100, 200],
    transition: { duration: 3, times: [0, 0.2, 1] }
  }}
/>
```

## Variants

Named animation targets for orchestration:

```jsx
const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
}

<motion.div variants={variants} initial="hidden" whileInView="visible" />
```

### Propagation

Variants flow down through children:

```jsx
const list = { visible: { opacity: 1 }, hidden: { opacity: 0 } }
const item = { visible: { opacity: 1, x: 0 }, hidden: { opacity: 0, x: -100 } }

<motion.ul initial="hidden" whileInView="visible" variants={list}>
  <motion.li variants={item} />
  <motion.li variants={item} />
</motion.ul>
```

### Orchestration

```jsx
const list = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      delayChildren: stagger(0.3)
    }
  }
}
```

### Dynamic Variants

```jsx
const variants = {
  visible: (index) => ({
    opacity: 1,
    transition: { delay: index * 0.3 }
  })
}

items.map((item, i) => <motion.div custom={i} variants={variants} />)
```

## Animate Content

```jsx
const count = useMotionValue(0)

useEffect(() => {
  animate(count, 100, { duration: 5 })
}, [])

return <motion.pre>{count}</motion.pre>  // Renders animated number
```

---

Full docs: https://motion.dev/docs/react-animation
