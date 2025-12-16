# Migrate from GSAP to Motion

## Contents
- [Why migrate](#why-migrate)
- [Basic animations](#basic-animations)
- [Animation controls](#animation-controls)
- [Timelines](#timelines)
- [Scroll-triggered](#scroll-triggered)
- [Scroll-linked](#scroll-linked)
- [Pinning](#pinning)
- [React](#react)
- [Limitations](#limitations)

## Why Migrate?

- **Hardware acceleration** via WAAPI and ScrollTimeline
- **Smaller bundles** (2.3kb mini vs 23.5kb GSAP)
- **Tree-shakable** - only import what you use
- **MIT license** - no yearly commercial license needed
- **Better scroll performance** via IntersectionObserver

## Basic Animations

```javascript
// GSAP
gsap.to("#box", {
  duration: 10,
  ease: "none",
  repeat: -1,
  rotation: 360,
})

// Motion
animate("#box", { rotate: 360 }, {
  ease: "linear",
  duration: 10,
  repeat: Infinity
})
```

### Key Differences

- `rotate` not `rotation`
- `repeat: Infinity` not `-1`
- `ease: "linear"` not `ease: "none"`
- Values and options are separate objects

### fromTo → Keyframes

```javascript
// GSAP
gsap.fromTo(".box", { opacity: 0 }, { opacity: 0.5 })

// Motion
animate(".box", { opacity: [0, 0.5] })
```

## Animation Controls

| GSAP | Motion |
|------|--------|
| `.timeScale()` | `.speed` |
| `.time()` | `.time` |
| `.kill()` | `.stop()` |
| `.revert()` | `.cancel()` |
| `.progress(1)` | `.complete()` |
| `.resume()` | `.play()` |

## Timelines

```javascript
// GSAP (imperative)
const tl = gsap.timeline()
tl.to("#id", { x: 100 })
tl.addLabel("My label")
tl.to("#id", { y: 50 })

// Motion (declarative)
const sequence = [
  ["#id", { x: 100 }],
  "My label",
  ["#id", { y: 50 }]
]
animate(sequence)
```

## Scroll-Triggered

```javascript
// GSAP
gsap.to('.box', { scrollTrigger: '.box', x: 500 })

// Motion (uses IntersectionObserver)
inView(".box", ({ target }) => {
  animate(target, { x: 500 })
})
```

## Scroll-Linked

```javascript
// GSAP
gsap.to('.box', {
  scrollTrigger: { trigger: '.box', scrub: true },
  x: 500
})

// Motion (hardware accelerated via ScrollTimeline)
const element = document.querySelector(".box")
const animation = animate(element, { x: 500 })
scroll(animation, { target: element })

// Multi-keyframe scroll
const fade = animate(element, { opacity: [0, 1, 1, 0] })
scroll(fade, {
  target: element,
  offset: ["start end", "end end", "start start", "end start"]
})
```

## Pinning

```css
/* Use CSS position: sticky instead of GSAP pin */
.sticky-element {
  position: sticky;
  top: 0;
}
```

## React

```jsx
// GSAP
useGSAP(() => {
  gsap.to(boxRef.current, { rotation: 360, repeat: -1 })
})

// Motion (90% smaller, hardware accelerated)
import { useAnimate } from "motion/react-mini"

const [scope, animate] = useAnimate()

useEffect(() => {
  const controls = animate(
    scope.current,
    { transform: "rotate(360deg)" },
    { duration: 10, repeat: Infinity }
  )
  return () => controls.stop()
}, [])
```

## Limitations

- No equivalent to `gsap.from()` (discouraged - causes flash)
- No dynamic option changes after animation starts
- `onUpdate` currently only for single values
- No grid stagger
- Layout animations only in React/Vue

---

Full docs: https://motion.dev/docs/migrate-from-gsap-to-motion
