---
name: motion-react
description: Create animations with Motion for React (formerly Framer Motion). Use for declarative animations, AnimatePresence exit animations, layout animations, gestures (hover, tap, drag), scroll effects, variants, and motion values.
---

# Motion for React

## Installation

```bash
npm install motion
```

```jsx
import { motion, AnimatePresence } from "motion/react"
```

## Core Patterns

### Basic Animation

```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
/>
```

### Gestures

```jsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  whileFocus={{ borderColor: "#3b82f6" }}
/>
```

### Exit Animations

```jsx
<AnimatePresence>
  {show && (
    <motion.div key="modal" exit={{ opacity: 0 }} />
  )}
</AnimatePresence>
```

**Modes:** `"sync"` (default), `"wait"` (sequential), `"popLayout"` (exits pop out)

### Layout Animations

```jsx
<motion.div layout />                     // Animate layout changes
<motion.div layoutId="shared-element" />  // Shared element transitions
```

### Scroll-Triggered

```jsx
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
/>
```

### Scroll-Linked

```jsx
const { scrollYProgress } = useScroll()
const y = useTransform(scrollYProgress, [0, 1], [0, -100])

<motion.div style={{ y }} />
```

### Drag

```jsx
<motion.div
  drag
  dragConstraints={{ left: 0, right: 300 }}
  whileDrag={{ scale: 1.1 }}
/>
```

### Variants (Orchestration)

```jsx
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
}
const item = { hidden: { y: 20 }, show: { y: 0 } }

<motion.ul variants={container} initial="hidden" animate="show">
  <motion.li variants={item} />
</motion.ul>
```

## Transitions

```jsx
// Spring (default for physical properties)
transition={{ type: "spring", stiffness: 300, damping: 20 }}
transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}

// Tween
transition={{ duration: 0.3, ease: "easeOut" }}
```

## Key Hooks

| Hook | Purpose |
|------|---------|
| `useAnimate` | Imperative animation control |
| `useScroll` | Track scroll progress |
| `useTransform` | Map values to ranges |
| `useSpring` | Spring-animated motion value |
| `useMotionValue` | Animatable value (no re-render) |
| `useInView` | Viewport detection |

## Key Components

| Component | Purpose |
|-----------|---------|
| `motion.*` | Animated element |
| `AnimatePresence` | Exit animations |
| `LayoutGroup` | Sync layout animations |
| `MotionConfig` | Default transition |
| `Reorder.Group/Item` | Drag-to-reorder |

## References

### Getting Started
- [references/quick-start.md](references/quick-start.md) — Installation and first animation
- [references/animation.md](references/animation.md) — Animation concepts, keyframes, variants

### Core Components
- [references/motion-component.md](references/motion-component.md) — Full motion.* props (gestures, layout, drag, viewport)
- [references/animate-presence.md](references/animate-presence.md) — Exit animations, modes, presence hooks
- [references/layout-animations.md](references/layout-animations.md) — Layout, shared elements

### Utility Components
- [references/layout-group.md](references/layout-group.md) — Sync layout animations across siblings
- [references/motion-config.md](references/motion-config.md) — Default transitions and reduced motion
- [references/reorder.md](references/reorder.md) — Drag-to-reorder lists

### Animations
- [references/transitions.md](references/transitions.md) — Tween, spring, inertia, orchestration
- [references/gestures.md](references/gestures.md) — Hover, tap, pan, drag, focus
- [references/scroll-animations.md](references/scroll-animations.md) — Scroll-triggered and scroll-linked
- [references/motion-value.md](references/motion-value.md) — MotionValue API and composition

### Hooks
- [references/use-animate.md](references/use-animate.md) — Imperative animations with scoped selectors
- [references/hooks.md](references/hooks.md) — useScroll, useTransform, useSpring, useInView, etc.

### Integrations
- [references/radix.md](references/radix.md) — Radix UI integration guide
- [references/framer.md](references/framer.md) — Framer website integration
- [references/three-fiber.md](references/three-fiber.md) — React Three Fiber 3D animations

### Guides
- [references/accessibility.md](references/accessibility.md) — Reduced motion, useReducedMotion
- [references/bundle-size.md](references/bundle-size.md) — LazyMotion, code splitting
- [references/upgrade-guide.md](references/upgrade-guide.md) — Version migration
