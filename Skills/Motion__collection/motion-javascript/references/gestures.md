# Gestures Overview

Motion provides three gesture detection functions:

| Function | Purpose | Key Feature |
|----------|---------|-------------|
| [hover](hover.md) | Detect hover | Filters fake touch events |
| [press](press.md) | Detect press/tap | Keyboard accessible |
| [inView](inview.md) | Detect viewport entry | IntersectionObserver-based |

## Pattern

All gestures follow the same pattern:

```javascript
const cancel = gestureFunction(selector, (element, event) => {
  // Gesture started
  return (endEvent) => {
    // Gesture ended (optional cleanup)
  }
})

cancel()  // Stop detection
```

## Common Options

| Option | Default | Description |
|--------|---------|-------------|
| `passive` | `true` | Set `false` for `preventDefault()` |
| `once` | `false` | Fire only once per element |

## See Also

- [hover.md](hover.md) — Full hover API
- [press.md](press.md) — Full press API  
- [inview.md](inview.md) — Full inView API
