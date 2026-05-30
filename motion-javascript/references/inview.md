# inView()

Detect when elements enter/leave the viewport. Built on native `IntersectionObserver` (0.5kb, off-main-thread).

## Use Cases

- Animate elements on scroll
- Deactivate animations when not visible
- Lazy-load content
- Auto start/stop videos

## Usage

```javascript
import { inView } from "motion"

// Basic - fires once on enter
inView("section", (element, info) => {
  animate(element, { opacity: 1 })
})

// With exit callback - fires on enter AND leave
inView(element, (element, enterInfo) => {
  const animation = animate(element, { opacity: 1 })
  
  // Fires when leaving viewport
  return (leaveInfo) => animation.stop()
})

// Stop detection
const stop = inView(element, callback)
stop()
```

## Callback Arguments

```javascript
inView(element, (element, info) => {
  // element: The matched DOM element
  // info: IntersectionObserverEntry
  //   - isIntersecting
  //   - intersectionRatio
  //   - boundingClientRect
  //   - rootBounds
  //   - time
})
```

## Options

### root

**Default:** `window`

Custom viewport (scrollable container):

```javascript
const carousel = document.querySelector("#carousel")
inView("#carousel li", callback, { root: carousel })
```

### margin

**Default:** `"0px"`

Extend/contract viewport detection area. Supports 1-4 values (top/right/bottom/left):

```javascript
inView(element, callback, { margin: "0px 100px 0px 0px" })
inView(element, callback, { margin: "-100px" })  // Contract by 100px all sides
```

- Positive values: Extend viewport
- Negative values: Contract viewport
- **Note:** Won't work in cross-origin iframes unless `root` is defined

### amount

**Default:** `"some"`

How much of element must be in viewport:

```javascript
inView(element, callback, { amount: "some" })  // Any part visible
inView(element, callback, { amount: "all" })   // All visible
inView(element, callback, { amount: 0.5 })     // 50% visible
```

- `"some"` or `0`: Any part
- `"all"` or `1`: Entire element
- `0-1`: Percentage threshold

---

Full docs: https://motion.dev/docs/inview
