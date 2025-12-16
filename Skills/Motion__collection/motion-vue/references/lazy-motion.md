# LazyMotion (Vue)

Reduce bundle size from 34kb to 6kb + features.

## Usage

Replace `motion` with `m` and wrap with `LazyMotion`:

```vue
<script setup>
import { LazyMotion, domAnimation, m } from "motion-v"
</script>

<template>
  <LazyMotion :features="domAnimation">
    <m.div :animate="{ opacity: 1 }" />
  </LazyMotion>
</template>
```

## Feature Packages

| Package | Size | Features |
|---------|------|----------|
| `domAnimation` | +18kb | Animations, variants, exit, press/hover/focus |
| `domMax` | +28kb | Above + pan/drag + layout animations |

## Sync Loading

```vue
<script setup>
import { LazyMotion, domAnimation, m } from "motion-v"
</script>

<template>
  <LazyMotion :features="domAnimation">
    <m.div :animate="{ opacity: 1 }" />
  </LazyMotion>
</template>
```

## Async Loading

```javascript
// features.js
import { domAnimation } from "motion-v"
export default domAnimation
```

```vue
<script setup>
const loadFeatures = () => import("./features.js").then(res => res.default)
</script>

<template>
  <LazyMotion :features="loadFeatures">
    <m.div :animate="{ scale: 1.5 }" />
  </LazyMotion>
</template>
```

## Strict Mode

Catch accidental `motion` imports:

```vue
<LazyMotion :features="domAnimation" strict>
  <motion.div />  <!-- Throws error! Use m.div -->
</LazyMotion>
```

---

Full docs: https://motion.dev/docs/vue-lazymotion
