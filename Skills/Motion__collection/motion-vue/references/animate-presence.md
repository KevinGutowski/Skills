# AnimatePresence (Vue)

## Contents
- [Basic Usage](#basic-usage)
- [Exit Triggers](#exit-triggers)
- [Props](#props)
- [Troubleshooting](#troubleshooting)

---

## Basic Usage

```vue
<script setup>
import { AnimatePresence, motion } from "motion-v"
</script>

<template>
  <AnimatePresence>
    <motion.div v-if="show" key="modal" :exit="{ opacity: 0 }" />
  </AnimatePresence>
</template>
```

## Exit Triggers

### v-if / v-show

```vue
<AnimatePresence>
  <Modal v-if="show" key="modal" />
</AnimatePresence>

<AnimatePresence>
  <Modal v-show="show" key="modal" />
</AnimatePresence>
```

### Key Changes (Slideshows)

```vue
<AnimatePresence>
  <motion.img
    :key="image.src"
    :src="image.src"
    :initial="{ x: 300, opacity: 0 }"
    :animate="{ x: 0, opacity: 1 }"
    :exit="{ x: -300, opacity: 0 }"
  />
</AnimatePresence>
```

### List Items

```vue
<AnimatePresence>
  <motion.li
    v-for="item in items"
    :key="item.id"
    :exit="{ opacity: 0 }"
    layout
  />
</AnimatePresence>
```

### Nested Exit Animations

```vue
<motion.div :exit="{ opacity: 0 }">
  <img :src="img.src" />
  <motion.p :exit="{ y: 10 }">{{ description }}</motion.p>
</motion.div>
```

## Props

### mode

**Default:** `"sync"`

| Mode | Behavior |
|------|----------|
| `"sync"` | Enter/exit simultaneously |
| `"wait"` | Wait for exit before enter |
| `"popLayout"` | Pop exiting out of layout |

### initial

Disable initial animations:

```vue
<AnimatePresence :initial="false">
  <Slide :key="activeItem.id" />
</AnimatePresence>
```

### custom

Pass dynamic data to exit variants:

```vue
<script setup>
const variants = {
  hidden: (direction) => ({
    x: direction === 1 ? -300 : 300,
    opacity: 0
  }),
  visible: { opacity: 1, x: 0 }
}
</script>

<template>
  <AnimatePresence :custom="direction">
    <motion.img
      :key="image.src"
      :variants="variants"
      initial="hidden"
      animate="visible"
      exit="hidden"
    />
  </AnimatePresence>
</template>
```

### onExitComplete

```vue
<AnimatePresence @exitComplete="handleComplete">
```

## Troubleshooting

### Exit not working

1. **Unique keys required:**

```vue
<!-- ❌ Bad: index changes when items reorder -->
<motion.li v-for="(item, i) in items" :key="i" />

<!-- ✅ Good: stable ID -->
<motion.li v-for="item in items" :key="item.id" />
```

2. **AnimatePresence must stay mounted:**

```vue
<!-- ❌ Bad -->
<AnimatePresence v-if="isVisible">
  <Component />
</AnimatePresence>

<!-- ✅ Good -->
<AnimatePresence>
  <Component v-if="isVisible" />
</AnimatePresence>
```

### Layout + exit issues

Wrap in `LayoutGroup`:

```vue
<LayoutGroup>
  <motion.ul layout>
    <AnimatePresence>
      <motion.li v-for="item in items" :key="item.id" layout />
    </AnimatePresence>
  </motion.ul>
</LayoutGroup>
```

### popLayout positioning

Parent needs non-static position:

```vue
<motion.ul layout :style="{ position: 'relative' }">
  <AnimatePresence mode="popLayout">
    <motion.li v-for="item in items" :key="item.id" layout />
  </AnimatePresence>
</motion.ul>
```

---

Full docs: https://motion.dev/docs/vue-animate-presence
