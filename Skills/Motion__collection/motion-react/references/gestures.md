# Gestures (React)

Motion extends React events with **hover**, **tap**, **pan**, **drag**, **focus**, and **inView** gestures.

## Contents
- [Animation props](#animation-props)
- [Hover](#hover)
- [Tap](#tap)
- [Pan](#pan)
- [Drag](#drag)
- [Focus](#focus)
- [Event propagation](#event-propagation)
- [SVG filters](#svg-filters)

## Animation Props

```jsx
<motion.button
  whileHover={{ scale: 1.2 }}
  whileTap={{ scale: 0.9 }}
  whileFocus={{ borderColor: "blue" }}
  whileDrag={{ scale: 1.2 }}
  whileInView={{ opacity: 1 }}
/>
```

Can use variant names:

```jsx
<motion.button whileTap="tap" whileHover="hover" variants={buttonVariants}>
  <motion.path variants={iconVariants} />
</motion.button>
```

## Hover

Filters out touch-emulated hover events (unlike `onMouseEnter`/`onMouseLeave`).

```jsx
<motion.a
  whileHover={{ scale: 1.2 }}
  onHoverStart={(event) => {}}
  onHoverEnd={(event) => {}}
/>
```

## Tap

Detects press/release on same component.

```jsx
<motion.button
  whileTap={{ scale: 0.9, rotate: 3 }}
  onTap={(event, info) => {}}
  onTapStart={(event, info) => {}}
  onTapCancel={(event, info) => {}}
/>
```

### Keyboard Accessibility

Tap elements are keyboard-accessible:
- `Enter` down → `onTapStart`, `whileTap`
- `Enter` up → `onTap`
- Focus lost → `onTapCancel`

## Pan

Fires when pointer moves > 3px while pressed.

```jsx
<motion.div
  onPan={(event, pointInfo) => {}}
  onPanStart={(event, pointInfo) => {}}
  onPanEnd={(event, pointInfo) => {}}
/>
```

**Note:** Requires `touch-action: none` for touch input.

## Drag

```jsx
<motion.div
  drag           // Both axes
  drag="x"       // X-axis only
  drag="y"       // Y-axis only
  whileDrag={{ scale: 1.2 }}
  onDrag={(event, info) => {}}
  onDragStart={(event, info) => {}}
  onDragEnd={(event, info) => {}}
/>
```

### Constraints

```jsx
// Pixel values
<motion.div drag="x" dragConstraints={{ left: 0, right: 300 }} />

// Ref-based (drag within parent)
const constraintsRef = useRef(null)
<motion.div ref={constraintsRef}>
  <motion.div drag dragConstraints={constraintsRef} />
</motion.div>
```

### Options

| Prop | Description |
|------|-------------|
| `dragElastic` | Elasticity outside constraints (0-1) |
| `dragMomentum` | Enable inertia animation (default: true) |
| `dragDirectionLock` | Lock to first axis dragged |
| `dragTransition` | Inertia animation options |

```jsx
<motion.div
  drag
  dragDirectionLock
  dragElastic={0.2}
  dragMomentum={false}
  onDirectionLock={(axis) => {}}
/>
```

## Focus

Follows `:focus-visible` rules.

```jsx
<motion.input whileFocus={{ scale: 1.02, borderColor: "blue" }} />
```

## Event Propagation

Stop gestures from bubbling to parents:

```jsx
<motion.div whileTap={{ scale: 2 }}>
  <button onPointerDownCapture={(e) => e.stopPropagation()} />
</motion.div>
```

## SVG Filters

Filters don't receive events. Use parent + variants:

```jsx
<motion.svg whileHover="hover">
  <filter id="blur">
    <motion.feGaussianBlur
      stdDeviation={0}
      variants={{ hover: { stdDeviation: 2 } }}
    />
  </filter>
</motion.svg>
```

---

Full docs: https://motion.dev/docs/react-gestures
