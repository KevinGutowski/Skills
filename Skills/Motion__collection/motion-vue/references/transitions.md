# Transitions (Vue)

## Contents
- [Basic Usage](#basic-usage)
- [Animation Types](#animation-types)
- [Orchestration](#orchestration)

---

Defines animation type between values.

## Basic Usage

```vue
<motion.div :animate="{ x: 100 }" :transition="{ duration: 0.8, ease: 'easeOut' }" />
```

### Value-Specific Transitions

```vue
<motion.li
  :animate="{ x: 0, opacity: 1 }"
  :transition="{
    default: { type: 'spring' },
    opacity: { ease: 'linear' }
  }"
/>
```

### Global Default via MotionConfig

```vue
<MotionConfig :transition="{ duration: 0.4, ease: 'easeInOut' }">
  <App />
</MotionConfig>
```

## Animation Types

### Tween (duration-based)

```vue
<motion.div :transition="{ type: 'tween', duration: 0.5, ease: 'easeOut' }" />
```

| Option | Default | Description |
|--------|---------|-------------|
| `duration` | 0.3 | Animation length in seconds |
| `ease` | - | Easing function |
| `times` | - | Keyframe positions (0-1 array) |

**Easings:** `linear`, `easeIn`, `easeOut`, `easeInOut`, `circIn`, `circOut`, `backIn`, `backOut`, `anticipate`, or `[x1, y1, x2, y2]`.

### Spring (physics-based)

```vue
<!-- Duration-based -->
<motion.div :transition="{ type: 'spring', bounce: 0.25, duration: 0.6 }" />

<!-- Physics-based -->
<motion.div :transition="{ type: 'spring', stiffness: 300, damping: 20 }" />
```

| Option | Default | Description |
|--------|---------|-------------|
| `bounce` | 0.25 | Bounciness (0-1) |
| `visualDuration` | - | Perceptual duration in seconds |
| `stiffness` | 1 | Higher = more sudden |
| `damping` | 10 | Resistance (0 = infinite oscillation) |
| `mass` | 1 | Object mass |
| `velocity` | - | Initial velocity |

### Inertia (deceleration)

Used with drag:

```vue
<motion.div
  drag
  :dragTransition="{
    power: 0.8,
    timeConstant: 700,
    modifyTarget: (t) => Math.round(t / 50) * 50,
    min: 0,
    max: 100
  }"
/>
```

## Orchestration

### Basic Options

```vue
:transition="{
  delay: 0.3,              // Delay start (negative = start into animation)
  repeat: Infinity,        // Times to repeat
  repeatType: 'reverse',   // 'loop' | 'reverse' | 'mirror'
  repeatDelay: 1           // Wait between repeats
}"
```

### Variants Orchestration

```vue
<script setup>
const container = {
  show: {
    transition: {
      when: "beforeChildren",      // or "afterChildren"
      delayChildren: 0.5,          // Delay before children start
      staggerChildren: 0.1,        // Stagger between children
      staggerDirection: 1          // 1 = first to last, -1 = reverse
    }
  }
}

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 }
}
</script>

<template>
  <motion.ul :variants="container" initial="hidden" animate="show">
    <motion.li :variants="item" />
    <motion.li :variants="item" />
  </motion.ul>
</template>
```

### Keyframes

```vue
<motion.div
  :animate="{
    x: [0, 100, 0],
    transition: {
      times: [0, 0.3, 1],
      ease: ['easeIn', 'easeOut']
    }
  }"
/>
```

---

Full docs: https://motion.dev/docs/vue-transitions
