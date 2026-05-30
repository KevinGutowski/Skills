# CSS Spring Generation

Generate spring animations via CSS using Motion's `spring()` function. Works server-side and client-side.

## Contents
- [Overview](#overview)
- [Visual duration](#visual-duration)
- [Server-side](#server-side)
- [Client-side](#client-side)
- [Tips](#tips)

## Overview

```javascript
import { spring } from "motion"

// Returns CSS duration + easing
spring(0.5, 0.2)  // "800ms linear(...)"

// Use in transitions
transition: transform ${spring(0.5, 0.2)};
// Outputs: transition: transform 800ms linear(...)
```

## Visual Duration

`spring(visualDuration, bounce)` accepts `visualDuration` - time to **appear** to reach target (not including "bouncy bit").

```css
transition:
  opacity 0.5s ease-out,
  transform ${spring(0.5, 0.2)};  /* Appears to take similar time */
```

## Server-Side

### React Server Components

```jsx
<div style={{ transition: "all " + spring() }} />

<style>{`
  button:hover {
    transition: transform ${spring(0.8, 0)};
    transform: scale(1.2);
  }
`}</style>
```

### Astro

```astro
<style define:vars={{ spring: spring(0.2, 0) }}>
  span {
    transition: transform var(--spring);
  }
</style>
```

## Client-Side

### Vanilla JS (`style` attribute)

```javascript
element.style.transition = "transform " + spring(0.3)
element.style.transform = "scale(1.2)"
```

### Styled Components

```javascript
const Button = styled.button`
  transition: opacity ${spring(0.5)};
`
```

### Tamagui

```javascript
export const RoundedSquare = styled(View, {
  transition: "opacity " + spring(0.5)
})
```

### Vue

```vue
<script setup>
const springTransition = ref(spring(0.3, 1))
</script>

<template>
  <div :style="{ transition: 'filter ' + springTransition }" />
</template>
```

## Fallbacks

For browsers without `linear()` easing support:

```css
transition: filter 0.3s ease-out;        /* Fallback */
transition: filter ${spring(0.3)};       /* Progressive enhancement */
```

Benefit of `visualDuration`: Both animations feel like they take equivalent time.

---

Full docs: https://motion.dev/docs/css
