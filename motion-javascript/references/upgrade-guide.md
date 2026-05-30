# Upgrade Guide

## Contents
- [Motion 12.0](#motion-120)
- [Motion 11.0](#motion-110-major---from-motion-one)

## Motion 12.0

### Gesture callback changes

First argument is now the **element**, event becomes second:

```javascript
// Before (v11)
press("a", (startEvent) => {
  return (endEvent) => {}
})

// After (v12)
press("a", (element, startEvent) => {
  return (endEvent) => {}
})

// Same for hover and inView
hover("li", (element, startEvent) => {})
inView("section", (element, startEntry) => {})
```

---

## Motion 11.0 (Major - from Motion One)

Motion 11.11.12 merged Framer Motion and Motion One. Framer Motion conventions took precedence.

### animate → Two Versions

**Mini (2.5kb):** HTML/SVG via WAAPI

```javascript
import { animate } from "motion/mini"
animate(element, { width: 200 })
```

**Hybrid (18kb):** Independent transforms, timelines

```javascript
import { animate } from "motion"
animate(element, { x: 100 })
```

### Options Renamed

| Before | After |
|--------|-------|
| `easing` | `ease` |
| `direction` | `repeatType` (`"loop"`, `"mirror"`, `"reverse"`) |
| `endDelay` | Removed |
| `allowWebkitAcceleration` | Removed |

Added: `repeatDelay`

### Controls Renamed

| Before | After |
|--------|-------|
| `currentTime` | `time` |
| `playbackRate` | `speed` |
| `finish()` | `complete()` |
| `playState` | Removed |
| `finished` | Animation itself is thenable |

```javascript
const animation = animate()
await animation  // Instead of await animation.finished
```

### Spring/Glide

```javascript
// Before
import { spring } from "motion"
animate(el, { x: 100 }, { easing: spring({ stiffness: 400 }) })

// After
import { animate } from "motion/mini"
import { spring } from "motion"
animate(el, { transform: "translateX(100px)" }, { type: spring, stiffness: 400 })
```

- `glide` removed → Use `type: "inertia"` in hybrid

### inView

- `amount: "any"` → `amount: "some"`

### stagger

- `start` → `startDelay`

### scroll

New: Runs via native `ScrollTimeline` when possible.

```javascript
// Before
scroll((info) => {}, options)

// After - progress as first arg
scroll((progress, info) => {}, options)
```

### Callback Syntax

```javascript
// Before
animate((progress) => {}, options)

// After - use onUpdate
animate(0, 1, { onUpdate: (progress) => {} })
```

---

Full docs: https://motion.dev/docs/upgrade-guide
