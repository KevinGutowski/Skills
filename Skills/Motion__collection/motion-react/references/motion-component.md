# motion Component Reference

The `motion` component is the core of Motion for React. Every HTML/SVG element has a motion variant.

## Contents
- [Import](#import)
- [Animation Props](#animation-props)
- [Gesture Props](#gesture-props)
- [Viewport Props](#viewport-props)
- [Layout Props](#layout-props)
- [Drag Props](#drag-props)
- [Custom Components](#custom-components)

---

## Import

```jsx
import { motion } from "motion/react"

// React Server Components
import * as motion from "motion/react-client"
```

## Animation Props

| Prop | Description |
|------|-------------|
| `initial` | Starting state (object, variant name, or `false` to disable) |
| `animate` | Target state to animate to |
| `exit` | Exit state (requires AnimatePresence) |
| `transition` | Default transition for all animations |
| `variants` | Named animation states |
| `style` | Supports motion values and independent transforms |

```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.5 }}
/>

// Disable enter animation
<motion.div initial={false} animate={{ x: 100 }} />

// With variants
<motion.div
  variants={{ visible: { opacity: 1 }, hidden: { opacity: 0 } }}
  initial="hidden"
  animate="visible"
/>
```

### Callbacks
| Callback | When |
|----------|------|
| `onUpdate` | Every frame with latest values |
| `onAnimationStart` | Animation starts |
| `onAnimationComplete` | Animation completes |

## Gesture Props

### Hover
```jsx
<motion.button
  whileHover={{ scale: 1.1 }}
  onHoverStart={(e) => {}}
  onHoverEnd={(e) => {}}
/>
```

### Tap
```jsx
<motion.button
  whileTap={{ scale: 0.95 }}
  onTapStart={(e) => {}}
  onTap={(e) => {}}        // Released inside
  onTapCancel={(e) => {}}  // Released outside
/>
```

### Focus
```jsx
<motion.input whileFocus={{ borderColor: "#3b82f6" }} />
```

### Pan
```jsx
<motion.div
  onPan={(e, info) => console.log(info.offset.x)}
  onPanStart={(e, info) => {}}
  onPanEnd={(e, info) => {}}
/>
// info: { point, delta, offset, velocity }
```

## Viewport Props

```jsx
<motion.div
  whileInView={{ opacity: 1 }}
  viewport={{
    once: true,           // Only animate once
    root: scrollRef,      // Custom scroll container
    margin: "-100px",     // Adjust detection area
    amount: "all"         // "some" | "all" | 0-1
  }}
  onViewportEnter={(entry) => {}}
  onViewportLeave={(entry) => {}}
/>
```

## Layout Props

```jsx
<motion.div layout />                    // Animate all layout changes
<motion.div layout="position" />         // Position only
<motion.div layout="size" />             // Size only
<motion.div layoutId="shared-element" /> // Shared element transitions

// For scrollable containers
<motion.div layoutScroll style={{ overflow: "scroll" }} />

// For fixed containers
<motion.div layoutRoot style={{ position: "fixed" }} />

// Performance optimization
<motion.div layout layoutDependency={someValue} />
```

### Layout Callbacks
| Callback | When |
|----------|------|
| `onLayoutAnimationStart` | Layout animation starts |
| `onLayoutAnimationComplete` | Layout animation completes |

## Drag Props

```jsx
<motion.div
  drag              // true | "x" | "y"
  whileDrag={{ scale: 1.1 }}
  dragConstraints={{ left: 0, right: 300, top: 0, bottom: 200 }}
  // Or use ref:
  dragConstraints={constraintRef}
  dragElastic={0.2}           // 0-1 elasticity outside constraints
  dragSnapToOrigin            // Return to start on release
  dragMomentum={true}         // Apply momentum
  dragDirectionLock           // Lock to first detected axis
  dragControls={dragControls} // For external control
  dragListener={true}         // Enable/disable drag listener
  onDrag={(e, info) => {}}
  onDragStart={(e, info) => {}}
  onDragEnd={(e, info) => {}}
/>
// info: { point, delta, offset, velocity }
```

## Custom Components

```jsx
// Wrap your component
const MotionComponent = motion.create(Component)

// React 18: Component must use forwardRef
const Component = React.forwardRef((props, ref) => (
  <div ref={ref} {...props} />
))

// React 19: ref via props
const Component = (props) => <div ref={props.ref} {...props} />

// Forward motion props to component
motion.create(Component, { forwardMotionProps: true })
```

**Important:** Don't call `motion.create()` inside a render function.

## Advanced Props

| Prop | Description |
|------|-------------|
| `inherit` | `false` to prevent inheriting parent variants |
| `custom` | Data passed to dynamic variants |
| `transformTemplate` | Custom transform string function |

```jsx
// Dynamic variants with custom
const variants = {
  visible: (i) => ({ opacity: 1, transition: { delay: i * 0.1 } })
}
<motion.li custom={index} variants={variants} animate="visible" />
```
