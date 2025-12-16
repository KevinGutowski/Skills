# Layout Animations Reference

Animate layout changes using performant transforms.

## Contents
- [Basic Usage](#basic-usage)
- [Shared Layout](#shared-layout)
- [Configuration](#configuration)
- [LayoutGroup](#layoutgroup)
- [Troubleshooting](#troubleshooting)

---

## Basic Usage

```jsx
// Animate any layout change
<motion.div layout />

// Position only (no size animation)
<motion.div layout="position" />

// Size only
<motion.div layout="size" />
```

**Key point:** CSS changes should happen via `style`, not `animate`. The `layout` prop handles animation.

```jsx
<motion.div
  layout
  style={{ justifyContent: isOn ? "flex-end" : "flex-start" }}
/>
```

## Shared Layout

Match elements by `layoutId` to animate between them:

```jsx
{items.map(item => (
  <motion.li key={item.id} layout>
    {item.label}
    {item.isSelected && <motion.div layoutId="underline" />}
  </motion.li>
))}
```

### With AnimatePresence

```jsx
<AnimatePresence>
  {isOpen && <motion.div layoutId="modal" exit={{ opacity: 0 }} />}
</AnimatePresence>
```

## Configuration

### Transition

```jsx
// Layout-specific transition
<motion.div
  layout
  transition={{
    layout: { duration: 0.3, type: "spring" }
  }}
/>
```

### Scroll Containers

```jsx
<motion.div layoutScroll style={{ overflow: "scroll" }}>
  <motion.div layout />
</motion.div>
```

### Fixed Containers

```jsx
<motion.div layoutRoot style={{ position: "fixed" }}>
  <motion.div layout />
</motion.div>
```

### Performance

```jsx
// Only measure when dependency changes
<motion.nav layout layoutDependency={isOpen} />
```

## LayoutGroup

Synchronize layout animations across sibling components:

```jsx
import { LayoutGroup } from "motion/react"

<LayoutGroup>
  <Accordion />
  <Accordion />  {/* Will animate when sibling changes */}
</LayoutGroup>
```

## Scale Correction

Layout animations use `transform: scale()` which can distort children.

### Fix: Add layout to children
```jsx
<motion.div layout>
  <motion.div layout />  {/* Scale-corrected */}
</motion.div>
```

### Fix: borderRadius and boxShadow
Set via `style` for automatic correction:
```jsx
<motion.div layout style={{ borderRadius: 20, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }} />
```

### Fix: Images/text with aspect ratio changes
```jsx
<motion.img layout="position" />  {/* Only animate position */}
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Not animating | Check element isn't `display: inline` |
| Stretching | Add `layout` to children or use `layout="position"` |
| Border distortion | Use padding wrapper instead of border |
| No animation on resize | Layout animations are disabled during window resize |
| SVG not working | SVGs not supported; animate attributes directly |
| Scroll container issues | Add `layoutScroll` to scrollable parent |
| Fixed positioning issues | Add `layoutRoot` to fixed parent |

## vs View Transitions API

| Feature | Layout Animations | View Transitions |
|---------|-------------------|------------------|
| Interruptible | ✅ Yes | ❌ Snaps to end |
| Pointer events | ✅ Normal | ❌ Blocked |
| Multiple layoutIds | ✅ Yes | ❌ Must be unique |
| Performance | ✅ transform-based | ❌ width/height |
| Scroll handling | ✅ Automatic | ❌ Can be incorrect |
| Bundle size | ~12kb | Built-in |
