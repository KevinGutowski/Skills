# Easing Functions

Change animation speed throughout duration. Built-in to `animate()` and `motion` components.

## Usage

```javascript
import { easeIn, easeOut, cubicBezier } from "motion"

// In animations (by name)
animate(el, { x: 100 }, { ease: "easeOut" })

// Direct use (0-1 progress)
const eased = easeIn(0.75)

// Cubic bezier
const custom = cubicBezier(.35,.17,.3,.86)
const progress = custom(0.5)
```

## Built-in Functions

| Function | Description |
|----------|-------------|
| `linear` | No easing |
| `easeIn` / `easeOut` / `easeInOut` | Standard easing |
| `circIn` / `circOut` / `circInOut` | Circular easing |
| `backIn` / `backOut` / `backInOut` | Anticipatory movement |
| `anticipate` | Anticipation effect |

> **Tip:** "Use `easeOut` for enter/exit. Duration ≤ 0.3-0.4s for responsiveness." — Emil Kowalski

## cubicBezier

Precise control over easing curve:

```javascript
import { cubicBezier } from "motion"

const easing = cubicBezier(.35, .17, .3, .86)
const easedProgress = easing(0.5)
```

Generate curves: [cubic-bezier.com](https://cubic-bezier.com)

## steps

Discrete, evenly-spaced steps (CSS-compliant):

```javascript
import { steps } from "motion"

const easing = steps(4)
easing(0.2)   // 0
easing(0.25)  // 0.25

// Change at start of step
const startEasing = steps(4, "start")
startEasing(0.2)  // 0.25

// Non-linear distribution
easing(circInOut(0.2))
```

## Modifiers

### reverseEasing

Reverse an easing (ease-in → ease-out):

```javascript
import { reverseEasing } from "motion"

const powerIn = (p) => p * p
const powerOut = reverseEasing(powerIn)
```

### mirrorEasing

Mirror an easing (ease-in → ease-in-out):

```javascript
import { mirrorEasing } from "motion"

const powerIn = (p) => p * p
const powerInOut = mirrorEasing(powerIn)
```

---

Full docs: https://motion.dev/docs/easing-functions
