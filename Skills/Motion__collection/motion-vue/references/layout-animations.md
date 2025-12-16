# Layout Animations (Vue)

## Contents
- [Basic Usage](#basic-usage)
- [Shared Layout](#shared-layout)
- [Configuration](#configuration)
- [LayoutGroup](#layoutgroup)
- [Troubleshooting](#troubleshooting)

---

## Basic Usage

```vue
<!-- Animate any layout change -->
<motion.div layout />

<!-- Position only (no size animation) -->
<motion.div layout="position" />

<!-- Size only -->
<motion.div layout="size" />
```

Animate previously unanimatable CSS:

```vue
<motion.div
  layout
  :style="{ justifyContent: isOn ? 'flex-start' : 'flex-end' }"
/>
```

**Note:** Set CSS via `style`, not `animate` — `layout` handles the animation.

## Shared Layout

Match elements with `layoutId` to animate between them:

```vue
<motion.div v-if="isSelected" layoutId="underline" />
```

### With Exit Animations

```vue
<AnimatePresence>
  <motion.div v-if="isOpen" layoutId="modal" />
</AnimatePresence>
```

### Modal Pattern

```vue
<motion.button
  layoutId="modal"
  @click="isOpen = true"
  :transition="{ type: 'spring' }"
>
  Open
</motion.button>

<AnimatePresence>
  <motion.dialog
    v-if="isOpen"
    layoutId="modal"
    :transition="{ duration: 0.3 }"
  />
</AnimatePresence>
```

## Configuration

### Transition

```vue
<motion.div layout :transition="{ duration: 0.3 }" />

<!-- Layout-specific transition -->
<motion.div
  layout
  :animate="{ opacity: 0.5 }"
  :transition="{
    default: { ease: 'linear' },
    layout: { duration: 0.3 }
  }"
/>
```

### Scrollable Containers

```vue
<motion.div layoutScroll :style="{ overflow: 'scroll' }" />
```

### Fixed Containers

```vue
<motion.div layoutRoot :style="{ position: 'fixed' }" />
```

## LayoutGroup

Sync layout animations across sibling components:

```vue
<script setup>
import { LayoutGroup } from "motion-v"
</script>

<template>
  <LayoutGroup>
    <Accordion />
    <Accordion />
  </LayoutGroup>
</template>
```

## Scale Correction

Layout animations use `transform` for performance but can distort children.

### Fix Distorted Children

```vue
<motion.section layout>
  <motion.img layout />
</motion.section>
```

### Fix Border Radius / Box Shadow

Set via `style`:

```vue
<motion.div layout :style="{ borderRadius: 20 }" />
```

### Fix Stretched Borders

Replace `border` with padding:

```vue
<motion.div layout :style="{ borderRadius: '10px', padding: '5px' }">
  <motion.div layout :style="{ borderRadius: '5px' }" />
</motion.div>
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Not animating | Don't use `display: inline` |
| SVG broken | Animate `cx`, `cy` directly instead |
| Content stretches | Add `layout` to children or use `layout="position"` |
| Border radius weird | Set via `style`, not CSS |

---

Full docs: https://motion.dev/docs/vue-layout-animations
