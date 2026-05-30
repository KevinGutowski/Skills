# animate() API Reference

## Contents
- [Versions](#versions)
- [Basic Usage](#basic-usage)
- [What Can Be Animated](#what-can-be-animated)
- [Timeline Sequences](#timeline-sequences)
- [Options](#options)
- [Animation Controls](#animation-controls)

---

## Versions

| Version | Size | Capabilities |
|---------|------|--------------|
| **Hybrid** | 18kb | Full features: independent transforms, CSS variables, SVG paths, sequences, objects |
| **Mini** | 2.3kb | HTML/SVG styles only via native browser APIs |

```javascript
import { animate } from "motion"       // Hybrid
import { animate } from "motion/mini"  // Mini
```

## Basic Usage

```javascript
// CSS selector
animate(".box", { opacity: 1, x: 100 })

// Element(s)
animate(document.getElementById("box"), { opacity: 0 }, { duration: 0.5 })

// Keyframes
animate(".box", { x: [0, 100, 50] })

// Per-value options
animate(element, { x: 100, rotate: 0 }, {
  duration: 1,
  rotate: { duration: 0.5, ease: "easeOut" }
})
```

## What Can Be Animated

### Independent Transforms (Hybrid only)
- **Translate:** `x`, `y`, `z`
- **Scale:** `scale`, `scaleX`, `scaleY`
- **Rotate:** `rotate`, `rotateX`, `rotateY`, `rotateZ`
- **Skew:** `skew`, `skewX`, `skewY`
- **Perspective:** `transformPerspective`

### CSS Variables (Hybrid only)
```javascript
animate(element, { "--rotate": "360deg" })
```

### SVG Path Drawing (Hybrid only)
```javascript
animate("circle", { pathLength: [0, 1] })  // 0-1 progress
// Also: pathSpacing, pathOffset
// Works with: circle, ellipse, line, path, polygon, polyline, rect
```

### Single Values
```javascript
animate(0, 100, { onUpdate: v => console.log(v) })
animate("#fff", "#000", { duration: 2, onUpdate: v => console.log(v) })
```

### Objects (Three.js, etc.)
```javascript
animate(camera.rotation, { y: 360 }, { duration: 10 })
```

## Timeline Sequences

```javascript
const sequence = [
  ["ul", { opacity: 1 }, { duration: 0.5 }],
  ["li", { x: 100 }],
  ["a", { scale: 1.2 }, { at: "<" }]  // Start with previous
]

animate(sequence, { defaultTransition: { duration: 0.2 } })
```

### `at` Option (sequence timing)
| Value | Meaning |
|-------|---------|
| `1` | Start at 1 second |
| `"my-label"` | Start at label |
| `"<"` | Start with previous |
| `"+0.5"` | 0.5s after previous ends |
| `"-0.2"` | 0.2s before previous ends |
| `"<0.5"` | 0.5s after previous starts |

## Options

### Tween Options
| Option | Default | Description |
|--------|---------|-------------|
| `duration` | `0.3` (or `0.8` for keyframes) | Animation duration in seconds |
| `ease` | — | Easing: `"linear"`, `"easeIn"`, `"easeOut"`, `"easeInOut"`, `"circIn"`, `"circOut"`, `"backIn"`, `"backOut"`, `"anticipate"`, or `[.17,.67,.83,.67]` |
| `times` | evenly spread | Keyframe positions `[0, 0.3, 1]` |

### Spring Options
| Option | Default | Description |
|--------|---------|-------------|
| `type` | — | Set to `"spring"` |
| `bounce` | `0.25` | Bounciness 0-1 (overridden by stiffness/damping/mass) |
| `visualDuration` | — | Perceptual duration in seconds |
| `stiffness` | `1` | Higher = more sudden |
| `damping` | `10` | Higher = less oscillation (0 = infinite) |
| `mass` | `1` | Higher = more lethargic |
| `velocity` | current | Initial velocity |
| `restSpeed` | `0.1` | End threshold (units/sec) |
| `restDelta` | `0.01` | End threshold (distance) |

### Orchestration Options
| Option | Default | Description |
|--------|---------|-------------|
| `delay` | `0` | Delay in seconds (negative starts mid-animation) |
| `repeat` | `0` | Repeat count (`Infinity` for loop) |
| `repeatType` | `"loop"` | `"loop"`, `"reverse"`, `"mirror"` |
| `repeatDelay` | `0` | Delay between repeats (Hybrid only) |

## Animation Controls

```javascript
const animation = animate(element, { opacity: 1 })

// Properties
animation.duration   // Read-only duration
animation.time       // Get/set current time
animation.speed      // Get/set speed (1 = normal, -1 = reverse)

// Methods
animation.pause()    // Pause
animation.play()     // Resume or restart
animation.complete() // Jump to end
animation.cancel()   // Revert to initial state
animation.stop()     // Stop and commit to style

// Promise
await animation
animation.then(() => console.log("done"))
```
