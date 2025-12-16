# Reorder (Vue)

Drag-to-reorder lists (tabs, todo items, etc).

**Note:** Lightweight but simple. Use dedicated drag libraries for multirow, column transfers, or scrollable containers.

## Basic Usage

```vue
<script setup>
import { Reorder } from "motion-v"
import { ref } from "vue"

const items = ref([0, 1, 2, 3])
</script>

<template>
  <Reorder.Group axis="y" v-model:values="items">
    <Reorder.Item v-for="item in items" :key="item" :value="item">
      {{ item }}
    </Reorder.Item>
  </Reorder.Group>
</template>
```

## Features

### Layout Animations

Built-in — items animate when list changes.

### Exit Animations

```vue
<AnimatePresence>
  <Reorder.Item
    v-for="item in items"
    :key="item"
    :value="item"
    :initial="{ opacity: 0 }"
    :animate="{ opacity: 1 }"
    :exit="{ opacity: 0 }"
  />
</AnimatePresence>
```

### Custom Drag Handle

```vue
<script setup>
import { Reorder, useDragControls } from "motion-v"
const controls = useDragControls()
</script>

<template>
  <Reorder.Item
    :value="value"
    :dragListener="false"
    :dragControls="controls"
  >
    <div class="handle" @pointerDown="(e) => controls.start(e)" />
    Content
  </Reorder.Item>
</template>
```

### Scrollable Lists

```vue
<Reorder.Group
  axis="y"
  v-model:values="items"
  layoutScroll
  :style="{ overflowY: 'scroll' }"
>
  <Reorder.Item v-for="item in items" :key="item" :value="item" />
</Reorder.Group>
```

### z-index

Dragged items auto-elevate. Requires `position: relative`:

```vue
<Reorder.Item :style="{ position: 'relative' }" />
```

## API

### Reorder.Group

| Prop | Default | Description |
|------|---------|-------------|
| `as` | `"ul"` | Underlying element |
| `axis` | `"y"` | `"x"` or `"y"` reorder direction |
| `values` | - | Array to reorder |
| `v-model:values` | - | Two-way binding |

### Reorder.Item

| Prop | Default | Description |
|------|---------|-------------|
| `as` | `"li"` | Underlying element |
| `value` | - | Value from array (required) |

Plus all `motion` component props.

---

Full docs: https://motion.dev/docs/vue-reorder
