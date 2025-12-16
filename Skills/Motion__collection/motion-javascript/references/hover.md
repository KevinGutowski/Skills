# hover()

Detect hover gestures with **touch-emulated event filtering**. Fixes "stuck" UIs on mobile.

## Why Not CSS :hover?

Browsers emulate hover from touch, causing:
- "Stuck" hover states on mobile
- Broken UI behaviors
- Unwanted visual artifacts

`hover()` filters out these fake events.

## Usage

```javascript
import { hover, animate } from "motion"

// Basic
hover(".button", (element, startEvent) => {
  console.log("Hover at", startEvent.clientX, startEvent.clientY)
  
  // Optional: return cleanup for hover end
  return (endEvent) => console.log("Hover ended")
})

// With animation
hover("li", (element) => {
  const animation = animate(element, { rotate: 360 })
  return () => animation.stop()
})

// Cancel detection
const cancel = hover(element, callback)
cancel()
```

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `passive` | `true` | Set `false` to allow `event.preventDefault()` |
| `once` | `false` | Fire only once per element |

## Callback Arguments

### Hover Start
```javascript
hover(element, (element, startEvent) => {
  // element: The hovered DOM element
  // startEvent: PointerEvent
})
```

### Hover End
```javascript
hover(element, () => {
  return (endEvent) => {
    // endEvent: PointerEvent
  }
})
```

## Common Pattern

```javascript
hover(".card", (el) => {
  animate(el, { scale: 1.05 }, { duration: 0.2 })
  return () => animate(el, { scale: 1 }, { duration: 0.2 })
})
```

---

Full docs: https://motion.dev/docs/hover
