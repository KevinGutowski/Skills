# motionValue()

Signal-like values that track state and velocity. Usually created automatically by `animate()` or `motion` components.

## When to Use

Create manually for advanced cases:
- Subscribe to value changes
- Get/set state programmatically
- Track velocity
- Automatically cancel animations when starting new ones

## Usage

```javascript
import { motionValue, animate } from "motion"

const x = motionValue(0)

// Subscribe to changes
x.on("change", latest => console.log(latest))

// Animate
animate(x, 100)
animate(x, 200)  // Automatically cancels previous animation

// Get/set
x.set(50)
const current = x.get()  // 50
const velocity = x.getVelocity()
```

## With Effects

```javascript
import { motionValue, styleEffect, animate } from "motion"

const x = motionValue(0)
const opacity = motionValue(1)

// Apply to all <li> elements
styleEffect("li", { x, opacity })

x.set(100)  // Updates on next frame
animate(opacity, 0)
```

## API Methods

| Method | Description |
|--------|-------------|
| `get()` | Get current value |
| `getVelocity()` | Get velocity (0 for non-numbers) |
| `set(value)` | Update value |
| `jump(value)` | Jump to value (resets velocity, ends animations) |
| `isAnimating()` | Returns `true` if animating |
| `stop()` | Stop active animation |
| `on(event, callback)` | Subscribe to events |
| `destroy()` | Clean up subscribers |

## Events

```javascript
x.on("change", v => console.log(v))
x.on("animationStart", () => {})
x.on("animationComplete", () => {})
x.on("animationCancel", () => {})

// Unsubscribe
const unsubscribe = x.on("change", callback)
unsubscribe()
```

## Jump vs Set

```javascript
// set: Maintains continuity
x.set(100)  // Velocity preserved

// jump: Breaks continuity
animate(x, 100)
x.jump(10)  // Animation ends, velocity = 0
x.getVelocity()  // 0
```

---

Full docs: https://motion.dev/docs/motion-value
