---
name: motion-javascript
description: Create animations with Motion for vanilla JavaScript. Use for animating HTML/SVG elements, scroll-linked animations, spring physics, staggered effects, gestures (hover, press, inView), and easing functions without React or Vue.
---

# Motion for JavaScript

## Installation

```bash
npm install motion
```

```javascript
import { animate, scroll, inView, stagger } from "motion"
```

**Mini version (2.3kb):** `import { animate } from "motion/mini"` — HTML/SVG only, no independent transforms.

## Core API

### animate()

```javascript
animate(".box", { opacity: 1, x: 100 })
animate(".box", { x: [0, 100, 50] }, { duration: 0.5 })  // Keyframes

const animation = animate(".box", { scale: 1.2 }, { type: "spring", bounce: 0.3 })
await animation  // Promise-based
animation.pause() / animation.play() / animation.cancel()
```

Full API: [references/animate.md](references/animate.md)

### scroll()

```javascript
scroll(animate(".box", { rotate: 360 }))  // Link animation to scroll
scroll(progress => console.log(progress)) // 0-1 callback

scroll(animation, {
  target: document.querySelector(".item"),
  offset: ["start end", "end start"]  // Enter from bottom, leave at top
})
```

Full API: [references/scroll.md](references/scroll.md)

### Gestures

```javascript
import { hover, press, inView } from "motion"

hover(".btn", el => {
  animate(el, { scale: 1.1 })
  return () => animate(el, { scale: 1 })  // Cleanup on hover end
})

inView(".card", ({ target }) => {
  animate(target, { opacity: 1, y: 0 })
})
```

Full API: [references/gestures.md](references/gestures.md)

### stagger()

```javascript
animate("li", { opacity: 1 }, { delay: stagger(0.1) })
animate("li", { opacity: 1 }, { delay: stagger(0.1, { from: "center" }) })
```

## Timeline Sequences

```javascript
const sequence = [
  ["ul", { opacity: 1 }],
  ["li", { x: 100 }, { at: "<" }],  // Start with previous
  ["a", { scale: 1.1 }, { at: "+0.2" }]  // 0.2s after previous ends
]
animate(sequence)
```

## Spring vs Tween

```javascript
// Spring (natural motion)
animate(".box", { x: 100 }, { type: "spring", stiffness: 300, damping: 20 })

// Tween (duration-based)
animate(".box", { x: 100 }, { duration: 0.5, ease: "easeOut" })
```

**Easings:** `linear`, `easeIn`, `easeOut`, `easeInOut`, `circIn`, `circOut`, `backIn`, `backOut`, `anticipate`

## CSS Spring Generation (MCP Tools)

Use `generate-css-spring` for pure CSS spring animations:
- `bounce`: 0-1 (0 = no bounce, 1 = max)
- `duration`: seconds (0.2 = snappy, 0.4 = normal, 1 = slow)

## References

### Getting Started
- [references/quick-start.md](references/quick-start.md) — Installation and first animation

### Animations
- [references/animate.md](references/animate.md) — Full animate() options, controls, sequences
- [references/scroll.md](references/scroll.md) — Scroll-linked animations, offset syntax
- [references/stagger.md](references/stagger.md) — Stagger animations across elements

### Gestures
- [references/hover.md](references/hover.md) — Hover detection (filters touch events)
- [references/press.md](references/press.md) — Press gestures with keyboard accessibility
- [references/inview.md](references/inview.md) — Viewport detection with IntersectionObserver

### Motion Values
- [references/motion-value.md](references/motion-value.md) — Signal-like reactive values

### Springs & Easing
- [references/spring.md](references/spring.md) — Spring physics and generators
- [references/easing-functions.md](references/easing-functions.md) — All easing functions
- [references/css.md](references/css.md) — Generate CSS spring transitions

### Utilities
- [references/transform.md](references/transform.md) — Map values between ranges
- [references/mix.md](references/mix.md) — Interpolate between values
- [references/wrap.md](references/wrap.md) — Wrap values in range
- [references/delay.md](references/delay.md) — Frame-synced delays
- [references/frame.md](references/frame.md) — Animation frame loop

### Integrations
- [references/webflow.md](references/webflow.md) — Webflow integration guide

### Guides
- [references/performance.md](references/performance.md) — Performance best practices
- [references/feature-comparison.md](references/feature-comparison.md) — Motion vs GSAP comparison
- [references/migrate-from-gsap.md](references/migrate-from-gsap.md) — GSAP migration guide
- [references/waapi-improvements.md](references/waapi-improvements.md) — WAAPI DX improvements
- [references/upgrade-guide.md](references/upgrade-guide.md) — Version upgrade guide
- [references/faqs.md](references/faqs.md) — Frequently asked questions
