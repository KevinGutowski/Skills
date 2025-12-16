# Transitions (React)

Defines animation type between values.

## Contents
- [Value-specific transitions](#value-specific-transitions)
- [Animation types](#animation-types)
- [Orchestration](#orchestration)
- [Keyframes](#keyframes)

```jsx
<motion.div animate={{ x: 100 }} transition={{ duration: 0.8, ease: "easeOut" }} />
```

## Value-Specific Transitions

```jsx
<motion.li
  animate={{ x: 0, opacity: 1 }}
  transition={{
    default: { type: "spring" },
    opacity: { ease: "linear" }
  }}
/>
```

## Animation Types

### Tween (duration-based)

```jsx
<motion.div transition={{ type: "tween", duration: 0.5, ease: "easeOut" }} />
```

| Option | Default | Description |
|--------|---------|-------------|
| `duration` | 0.3 | Animation length in seconds |
| `ease` | - | Easing function |
| `times` | - | Keyframe positions (0-1 array) |

**Easings:** `linear`, `easeIn`, `easeOut`, `easeInOut`, `circIn`, `circOut`, `backIn`, `backOut`, `anticipate`, or `[x1, y1, x2, y2]` cubic bezier.

### Spring (physics-based)

```jsx
// Duration-based spring
<motion.div transition={{ type: "spring", bounce: 0.25, duration: 0.6 }} />

// Physics-based spring
<motion.div transition={{ type: "spring", stiffness: 300, damping: 20 }} />
```

| Option | Default | Description |
|--------|---------|-------------|
| `bounce` | 0.25 | Bounciness (0-1) |
| `visualDuration` | - | Visual time to reach target |
| `stiffness` | 1 | Spring stiffness |
| `damping` | 10 | Resistance (0 = infinite oscillation) |
| `mass` | 1 | Object mass |
| `velocity` | - | Initial velocity |
| `restSpeed` | 0.1 | Min speed to end |
| `restDelta` | 0.01 | Min distance to end |

### Inertia (deceleration)

Used with drag. Decelerates based on initial velocity.

```jsx
<motion.div
  drag
  dragTransition={{
    power: 0.8,           // Affects distance
    timeConstant: 700,    // Deceleration duration feel
    modifyTarget: (t) => Math.round(t / 50) * 50,  // Snap to grid
    min: 0,
    max: 100,
    bounceStiffness: 500,
    bounceDamping: 10
  }}
/>
```

## Orchestration

```jsx
transition={{
  delay: 0.3,              // Delay start (negative = start into animation)
  repeat: Infinity,        // Times to repeat (Infinity = forever)
  repeatType: "reverse",   // "loop" | "reverse" | "mirror"
  repeatDelay: 1           // Wait between repeats
}}
```

### Variants Orchestration

```jsx
const container = {
  show: {
    transition: {
      when: "beforeChildren",     // "beforeChildren" | "afterChildren"
      delayChildren: 0.5,         // Delay before children start
      staggerChildren: 0.1        // Stagger between children
    }
  }
}

// Or use stagger function
import { stagger } from "motion"
transition: { delayChildren: stagger(0.1, { from: "center" }) }
```

## Keyframes

```jsx
<motion.div
  animate={{ x: [0, 100, 0] }}
  transition={{ 
    times: [0, 0.3, 1],  // Position each keyframe
    ease: ["easeIn", "easeOut"]  // Easing between keyframes
  }}
/>
```

---

Full docs: https://motion.dev/docs/react-transitions
