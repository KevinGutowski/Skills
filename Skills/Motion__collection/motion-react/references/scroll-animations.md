# Scroll Animations (React)

Two types: **scroll-triggered** and **scroll-linked**.

## Contents
- [Scroll-triggered](#scroll-triggered)
- [Scroll-linked](#scroll-linked)
- [useScroll returns](#usescroll-returns)
- [Smooth with spring](#smooth-with-spring)
- [Transform values](#transform-values)
- [Track element position](#track-element-position)
- [Detect scroll direction](#detect-scroll-direction)

## Scroll-Triggered

Normal animations that fire on viewport entry/exit.

```jsx
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
/>
```

### One-Time Animation

```jsx
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
/>
```

### Custom Scroll Container

```jsx
const scrollRef = useRef(null)

<div ref={scrollRef} style={{ overflow: "scroll" }}>
  <motion.div
    whileInView={{ opacity: 1 }}
    viewport={{ root: scrollRef }}
  />
</div>
```

### Viewport Options

| Option | Description |
|--------|-------------|
| `once` | Only animate once |
| `root` | Scrollable element ref |
| `amount` | `"some"` \| `"all"` \| number (0-1) |
| `margin` | Viewport margin (CSS format) |

## Scroll-Linked

Values linked directly to scroll progress via `useScroll`.

```jsx
const { scrollYProgress } = useScroll()

return <motion.div style={{ scaleX: scrollYProgress }} />
```

### useScroll Returns

| Value | Description |
|-------|-------------|
| `scrollX` | Horizontal offset (pixels) |
| `scrollY` | Vertical offset (pixels) |
| `scrollXProgress` | Horizontal progress (0-1) |
| `scrollYProgress` | Vertical progress (0-1) |

### Smooth with Spring

```jsx
const { scrollYProgress } = useScroll()
const scaleX = useSpring(scrollYProgress, {
  stiffness: 100,
  damping: 30,
  restDelta: 0.001
})

return <motion.div style={{ scaleX }} />
```

### Transform Values

```jsx
const backgroundColor = useTransform(
  scrollYProgress,
  [0, 0.5, 1],
  ["#f00", "#0f0", "#00f"]
)

return <motion.div style={{ backgroundColor }} />
```

### Track Element Position

```jsx
const ref = useRef(null)
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["start end", "end start"]  // Element enters → leaves viewport
})
```

### Detect Scroll Direction

```jsx
const { scrollY } = useScroll()
const [direction, setDirection] = useState("down")

useMotionValueEvent(scrollY, "change", (current) => {
  const diff = current - scrollY.getPrevious()
  setDirection(diff > 0 ? "down" : "up")
})
```

---

Full docs: https://motion.dev/docs/react-scroll-animations
