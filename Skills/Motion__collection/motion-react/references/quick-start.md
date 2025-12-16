# Quick Start (React)

## Installation

```bash
npm install motion
```

```jsx
import { motion } from "motion/react"
```

**Note:** Vanilla Motion APIs are also available for advanced use cases.

## Basic Animation

```jsx
<motion.div animate={{ rotate: 360 }} />

<motion.div
  animate={{ scale: 2 }}
  transition={{ duration: 2 }}
/>
```

## Enter Animation

```jsx
// Animate from initial to animate on mount
<motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} />

// Disable initial animation
<motion.button initial={false} animate={{ scale: 1 }} />
```

## Gestures

```jsx
<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  onHoverStart={() => console.log('hover started!')}
/>
```

## Scroll Animations

### Scroll-Triggered

```jsx
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
/>
```

### Scroll-Linked

```jsx
const { scrollYProgress } = useScroll()
return <motion.div style={{ scaleX: scrollYProgress }} />
```

## Layout Animations

```jsx
// Auto-animate layout changes
<motion.div layout />

// Shared element transitions
<motion.div layoutId="underline" />
```

## Exit Animations

```jsx
<AnimatePresence>
  {show ? <motion.div key="box" exit={{ opacity: 0 }} /> : null}
</AnimatePresence>
```

---

Full docs: https://motion.dev/docs/react-quick-start
