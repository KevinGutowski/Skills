# scroll() API Reference

Creates scroll-linked animations bound directly to scroll progress (0-1).

Uses `ScrollTimeline` API for hardware acceleration when available.

## Contents
- [Basic Usage](#basic-usage)
- [Options](#options)
- [Scroll Info](#scroll-info)
- [Offset Syntax](#offset-syntax)

---

## Basic Usage

```javascript
import { scroll, animate } from "motion"

// Progress callback
scroll(progress => console.log(progress))  // 0-1

// Link to animation
scroll(animate(".box", { rotate: 360 }, { ease: "linear" }))

// Track specific element
scroll(animation, { target: document.getElementById("item") })

// Horizontal scroll
scroll(callback, { axis: "x" })

// Custom container
scroll(callback, { container: document.getElementById("scroller") })

// Cancel
const cancel = scroll(callback)
cancel()
```

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `container` | `window` | Scroll container element |
| `axis` | `"y"` | `"x"` or `"y"` |
| `target` | scrollable area | Element to track within container |
| `offset` | `["start start", "end end"]` | Intersection points (see below) |

## Scroll Info

```javascript
scroll((progress, info) => {
  console.log(info.time)           // Timestamp
  console.log(info.y.current)      // Current scroll position
  console.log(info.y.progress)     // 0-1 progress
  console.log(info.y.velocity)     // Scroll velocity
  console.log(info.y.scrollLength) // Total scrollable length
})
```

## Offset Syntax

`offset: ["start end", "end start"]` — Two intersection points: animation start and end.

Format: `"<target> <container>"` where each can be:

| Value | Meaning |
|-------|---------|
| `"start"` | Top/left (0) |
| `"center"` | Middle (0.5) |
| `"end"` | Bottom/right (1) |
| `0.5` | Numeric 0-1 |
| `"100px"` | Pixels from start |
| `"50%"` | Percentage |
| `"50vh"` | Viewport units |

**Common patterns:**
```javascript
// Element enters from bottom, leaves at top
offset: ["start end", "end start"]

// Element reaches center of viewport
offset: ["start center", "end center"]

// Full page scroll
offset: ["start start", "end end"]
```

## Pinning

Use CSS `position: sticky` for best performance:

```html
<div class="sticky-container" style="height: 300vh">
  <div style="position: sticky; top: 0; height: 100vh">
    <!-- Pinned content -->
  </div>
</div>
```

```javascript
scroll(animation, { target: document.querySelector(".sticky-container") })
```
