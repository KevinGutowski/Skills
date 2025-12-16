# Accessibility (React)

Respect users' **Reduced Motion** preferences to avoid motion sickness.

## Automatic: MotionConfig

```jsx
import { MotionConfig } from "motion/react"

<MotionConfig reducedMotion="user">
  <App />
</MotionConfig>
```

### reducedMotion Options

| Value | Effect |
|-------|--------|
| `"user"` | Auto-disable transforms, keep opacity/color |
| `"always"` | Force reduced motion |
| `"never"` | Force normal motion |

```jsx
// User preference override
<MotionConfig reducedMotion={userSetting}>
```

## Manual: useReducedMotion

```jsx
import { useReducedMotion } from "motion/react"

const shouldReduceMotion = useReducedMotion()  // true/false
```

### Replace Transform with Opacity

```jsx
function Sidebar({ isOpen }) {
  const shouldReduceMotion = useReducedMotion()

  const animate = isOpen
    ? (shouldReduceMotion ? { opacity: 1 } : { x: 0 })
    : (shouldReduceMotion ? { opacity: 0 } : { x: "-100%" })

  return <motion.div animate={animate} />
}
```

### Disable Auto-Playing Video

```jsx
function BackgroundVideo() {
  const shouldReduceMotion = useReducedMotion()
  return <video autoPlay={!shouldReduceMotion} />
}
```

### Disable Parallax

```jsx
function Parallax() {
  const shouldReduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1], [0, -0.2], { clamp: false })

  return <motion.div style={{ y: shouldReduceMotion ? 0 : y }} />
}
```

## Best Practices

- Keep **educational** transitions (state changes)
- Replace **transform** animations with **opacity** on large elements
- Disable **parallax** animations
- Disable **auto-playing** videos
- Test with Reduced Motion enabled on your OS

---

Full docs: https://motion.dev/docs/react-accessibility
