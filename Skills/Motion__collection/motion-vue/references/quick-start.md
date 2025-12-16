# Quick Start (Vue)

## Installation

```bash
npm install motion-v
```

### Nuxt

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['motion-v/nuxt'],
})
```

### unplugin-vue-components

```ts
import Components from 'unplugin-vue-components/vite'
import MotionResolver from 'motion-v/resolver'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [MotionResolver()]
    }),
  ],
})
```

**Note:** Auto-import doesn't support `<motion />` — import manually.

## Basic Animation

```vue
<template>
  <motion.div :animate="{ rotate: 360 }" />

  <motion.div
    :animate="{ scale: 2 }"
    :transition="{ duration: 2 }"
  />
</template>
```

## Enter Animation

```vue
<motion.button :initial="{ scale: 0 }" :animate="{ scale: 1 }" />

<!-- Disable initial animation -->
<motion.button :initial="false" :animate="{ scale: 1 }" />
```

## Gestures

```vue
<motion.button
  :whileHover="{ scale: 1.1 }"
  :whilePress="{ scale: 0.95 }"
  @hoverStart="() => console.log('hover!')"
/>
```

**Note:** Vue uses `whilePress` (React uses `whileTap`).

## Scroll Animations

### Scroll-Triggered

```vue
<motion.div
  :initial="{ opacity: 0 }"
  :whileInView="{ opacity: 1 }"
/>
```

### Scroll-Linked

```vue
<script setup>
import { useScroll } from "motion-v"
const { scrollYProgress } = useScroll()
</script>

<template>
  <motion.div :style="{ scaleX: scrollYProgress }" />
</template>
```

## Layout Animations

```vue
<motion.div layout />
<motion.div layoutId="shared-element" />
```

## Exit Animations

```vue
<AnimatePresence>
  <motion.div v-if="show" key="box" :exit="{ opacity: 0 }" />
</AnimatePresence>
```

---

Full docs: https://motion.dev/docs/vue
