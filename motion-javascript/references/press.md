# press()

Detect press gestures with automatic filtering and keyboard accessibility.

## Features

- Filters secondary pointer events (right-click, second touch)
- Automatic keyboard accessibility (focus + enter key)
- Clean API with automatic listener management
- Accepts elements or CSS selectors

## Usage

```javascript
import { press } from "motion"

// Basic press
press("button", (element, startEvent) => {
  console.log("Pressed", element)
  console.log("At", startEvent.clientX, startEvent.clientY)
  
  // Return cleanup for press end
  return (endEvent, info) => {
    console.log(info.success ? "press end" : "press cancel")
  }
})

// With animation
press("button", (element) => {
  animate(element, { scale: 0.9 })
  return () => animate(element, { scale: 1 })
})

// Cancel
const cancel = press(element, callback)
cancel()
```

## Press End Info

```javascript
press(element, () => {
  return (endEvent, info) => {
    if (info.success) {
      // Pressed and released inside element (like click)
    } else {
      // Released outside element (cancel)
    }
  }
})
```

**Keyboard:** `success` is `false` if element is blurred while enter is held.

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `passive` | `true` | Set `false` to allow `event.preventDefault()` |
| `once` | `false` | Fire only once per element |

---

Full docs: https://motion.dev/docs/press
