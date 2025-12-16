# Upgrade Guide (React)

## Contents
- [Framer Motion → Motion](#framer-motion--motion)
- [Version 12.0](#version-120)
- [Version 11.0](#version-110)
- [Version 10.0](#version-100)
- [Version 9.0](#version-90)
- [Version 5.0](#version-50)
- [Version 4.0](#version-40)
- [Version 2.0](#version-20)

## Framer Motion → Motion

```bash
npm uninstall framer-motion
npm install motion
```

```jsx
// Before
import { motion } from "framer-motion"

// After
import { motion } from "motion/react"
```

---

## Version 12.0

No breaking React changes. See vanilla JS upgrade guide.

---

## Version 11.0

### Velocity Calculation

Synchronous updates no longer affect velocity:

```jsx
// Before: velocity = 100→200
// After: velocity = 0→200
x.set(100)
x.set(200)
x.getVelocity()
```

### Jest Tests

Renders now scheduled via microtask. Update tests:

```jsx
import { frame } from "motion/react"

await new Promise(resolve => frame.postRender(resolve))
expect(element).toHaveStyle("opacity: 1")
```

---

## Version 10.0

- Removed `IntersectionObserver` fallback (add polyfill if needed)
- `exitBeforeEnter` removed → use `mode="wait"`

---

## Version 9.0

### Keyboard Accessibility

- Tap elements receive `tabindex="0"` (use `tabIndex={-1}` to disable)
- `whileFocus` now follows `:focus-visible` rules

---

## Version 5.0

### AnimateSharedLayout Removed

```jsx
// Before
<AnimateSharedLayout>
  <motion.div layoutId="modal" />
</AnimateSharedLayout>

// After - no wrapper needed
<motion.div layoutId="modal" />
```

### LayoutGroup for Measurement

```jsx
<LayoutGroup>
  <Submenu />
  <Submenu />
</LayoutGroup>
```

### Namespace layoutId

```jsx
<LayoutGroup id="a">
  <motion.div layoutId="modal" />
</LayoutGroup>
<LayoutGroup id="b">
  <motion.div layoutId="modal" />  {/* Won't animate to above */}
</LayoutGroup>
```

---

## Version 4.0

### LazyMotion

```jsx
// Before (MotionConfig features)
<MotionConfig features={domAnimation}>

// After
import { LazyMotion, domAnimation, m } from "motion/react"
<LazyMotion features={domAnimation}>
  <m.div />
</LazyMotion>
```

### motion.custom() Removed

```jsx
// Before
const MotionComp = motion.custom(Component)

// After
const MotionComp = motion(Component, { forwardMotionProps: true })
```

---

## Version 2.0

### Layout Animations

```jsx
// Before
<motion.div layoutTransition={{ duration: 2 }} />

// After
<motion.div layout transition={{ duration: 2 }} />
```

---

Full docs: https://motion.dev/docs/react-upgrade-guide
