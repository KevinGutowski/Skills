# Quick Start

## Contents
- [Install](#install)
- [First animation](#first-animation)
- [What can be animated](#what-can-be-animated)
- [Customizing](#customizing)
- [Stagger](#stagger)
- [Next steps](#next-steps)

## Install

### npm/yarn

```bash
npm install motion
```

```javascript
import { animate, scroll } from "motion"
```

### Script Tag

```html
<!-- Modern import -->
<script type="module">
  import { animate, scroll } from "https://cdn.jsdelivr.net/npm/motion@11.11.13/+esm"
</script>

<!-- Legacy global -->
<script src="https://cdn.jsdelivr.net/npm/motion@11.11.13/dist/motion.js"></script>
<script>
  const { animate, scroll } = Motion
</script>
```

Replace `@latest` with specific version (find at [JSDelivr](https://www.jsdelivr.com/package/npm/motion)).

## First Animation

```javascript
import { animate } from "motion"

// CSS selector
animate(".box", { rotate: 360 })

// Elements
const boxes = document.querySelectorAll(".box")
animate(boxes, { rotate: 360 })
```

## What Can Be Animated?

- CSS properties (`opacity`, `transform`, `filter`)
- SVG attributes and paths
- Independent transforms (`x`, `rotateY`, etc.)
- JavaScript objects (strings/colors/numbers)
- Three.js objects

```javascript
// Three.js example
const rad = (deg) => (deg * Math.PI) / 180

animate(
  cube.rotation,
  { y: rad(360), z: rad(360) },
  { duration: 10, repeat: Infinity, ease: "linear" }
)
```

## Customizing

```javascript
// Duration, delay, easing, repeat
animate(
  element,
  { scale: [0.4, 1] },
  { ease: "circInOut", duration: 1.2 }
)

// Spring animations
animate(
  element,
  { rotate: 90 },
  { type: "spring", stiffness: 300 }
)
```

## Stagger

```javascript
import { animate, stagger } from "motion"

animate(
  "li",
  { y: 0, opacity: 1 },
  { delay: stagger(0.1) }
)
```

## Next Steps

- **Keyframes/sequences**: [animate.md](animate.md)
- **Controls**: [animate.md](animate.md)
- **Scroll-linked**: [scroll.md](scroll.md)
- **Scroll-triggered**: [inview.md](inview.md)

---

Full docs: https://motion.dev/docs/quick-start
