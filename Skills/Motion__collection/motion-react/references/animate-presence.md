# AnimatePresence Reference

Enables exit animations when components are removed from the React tree.

## Contents
- [Basic Usage](#basic-usage)
- [Modes](#modes)
- [Props](#props)
- [Presence Hooks](#presence-hooks)
- [Troubleshooting](#troubleshooting)

---

## Basic Usage

```jsx
import { motion, AnimatePresence } from "motion/react"

<AnimatePresence>
  {show && (
    <motion.div
      key="modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  )}
</AnimatePresence>
```

**Requirements:**
- Direct children must have unique `key` props
- `AnimatePresence` must be outside the conditional

```jsx
// ❌ Wrong - AnimatePresence unmounts too
{show && <AnimatePresence><Modal /></AnimatePresence>}

// ✅ Correct - AnimatePresence wraps the conditional
<AnimatePresence>{show && <Modal />}</AnimatePresence>
```

## Modes

| Mode | Behavior |
|------|----------|
| `"sync"` (default) | Enter/exit animate simultaneously |
| `"wait"` | Exit completes before enter starts |
| `"popLayout"` | Exiting elements pop out of layout flow |

```jsx
<AnimatePresence mode="wait">
  <motion.div key={activeTab} exit={{ opacity: 0 }} />
</AnimatePresence>
```

**popLayout note:** Requires parent to have `position: relative` and child component to use `forwardRef`.

## Props

| Prop | Default | Description |
|------|---------|-------------|
| `mode` | `"sync"` | `"sync"`, `"wait"`, `"popLayout"` |
| `initial` | `true` | Set `false` to disable enter animation on first render |
| `custom` | — | Data passed to exiting components' variants |
| `onExitComplete` | — | Callback when all exits complete |
| `propagate` | `false` | Fire nested exit animations when parent exits |

### Custom Data for Exits

```jsx
// Pass direction to exiting components
<AnimatePresence custom={direction}>
  <motion.img
    key={image.src}
    variants={{
      enter: (dir) => ({ x: dir > 0 ? 300 : -300 }),
      exit: (dir) => ({ x: dir > 0 ? -300 : 300 })
    }}
    initial="enter"
    animate={{ x: 0 }}
    exit="exit"
  />
</AnimatePresence>
```

### Nested AnimatePresence

```jsx
// By default, nested exit animations don't fire when parent exits
<AnimatePresence>
  {show && (
    <motion.section exit={{ opacity: 0 }}>
      <AnimatePresence propagate>
        {/* These exits WILL fire when parent exits */}
        {children}
      </AnimatePresence>
    </motion.section>
  )}
</AnimatePresence>
```

## Presence Hooks

### useIsPresent
```jsx
import { useIsPresent } from "motion/react"

function Component() {
  const isPresent = useIsPresent()
  return <div>{isPresent ? "Visible" : "Exiting..."}</div>
}
```

### usePresenceData
```jsx
import { usePresenceData } from "motion/react"

function Slide() {
  const direction = usePresenceData()  // Gets AnimatePresence's custom prop
}
```

### usePresence (Manual Control)
```jsx
import { usePresence } from "motion/react"

function Component() {
  const [isPresent, safeToRemove] = usePresence()
  
  useEffect(() => {
    if (!isPresent) {
      // Do manual animation, then call safeToRemove
      setTimeout(safeToRemove, 1000)
    }
  }, [isPresent])
}
```

## Troubleshooting

### Exit animations not working
1. Ensure each child has a unique, stable `key` (not array index)
2. `AnimatePresence` must be **outside** the conditional
3. Check that `exit` prop is defined

### Layout issues with popLayout
- Parent needs `position: relative`
- Child component needs `forwardRef`

### Layout animations with sync mode
Wrap with `LayoutGroup`:
```jsx
<LayoutGroup>
  <motion.ul layout>
    <AnimatePresence>
      {items.map(item => <motion.li key={item.id} layout exit={{ opacity: 0 }} />)}
    </AnimatePresence>
  </motion.ul>
</LayoutGroup>
```
