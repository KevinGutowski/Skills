# Reorder

The `Reorder` components can be used to create drag-to-reorder lists, like reorderable tabs or todo items.

```
<script setup>
  import { Reorder } from "motion-v"
  const items = ref([0,1,2,3])
</script>

<template>  
  <Reorder.Group axis="y" v-model:values="items">
      <Reorder.Item v-for="item in items" :key="item" :value="item">
        {{item}}
      </Reorder.Item>
  </Reorder.Group>
</template>
```

**Note:** `Reorder` is for simple drag-to-reorder implementations. It's exceptionally lightweight ontop of the base `motion` component but lacks some features like multirow, dragging between columns, or dragging within scrollable containers. For advanced use-cases we recommend using other community drag and drop components.

## Usage

Every reorderable list is wrapped in the `Reorder.Group` component.

```
<script setup>
import { Reorder } from "motion-v"
</script>

<template>
  <Reorder.Group>
    
  </Reorder.Group>
</template>
```

By default, this is rendered as a `<ul>`, but this can be changed with the `as` prop.

```
<Reorder.Group as="ol">
```

`Reorder.Group` must be passed the array of values in your reorderable list via the `values` prop.

Additionally, a `onUpdate:values` event will fire with the latest calculated order. For items to reorder, this must update the `values` state.

```
<script setup>
import { Reorder } from "motion-v"
const items = ref([0,1,2,3])
</script>

<template>
  <Reorder.Group v-model:values="values">
    
  </Reorder.Group>
</template>
```

To render each reorderable item, use `Reorder.Item`, passing it the value it represents via the `value` prop.

```
<script setup>
import { Reorder } from "motion-v"
const items = ref([0,1,2,3])
</script>

<template>
  <Reorder.Group v-model:values="items">
      <Reorder.Item v-for="item in items" :key="item" :value="item">
        {{ item }}
      </Reorder.Item>
  </Reorder.Group>
</template>
```

Now, when items are dragged and reordered, `onUpdate:values` will fire with a new order.

### Layout animations

`Reorder.Item` components are already configured to perform layout animations, so if new items are added or removed to the reorderable list, surrounding items will animate to their new position automatically.

###   
Exit animations

`[AnimatePresence](/docs/react-animate-presence.md)` can be used as normal to animate items as they enter/leave the Vue tree.

```
<AnimatePresence>
    <ReorderItem
      v-for="item in items"
      :key="item"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :exit="{ opacity: 0 }"
    />
</AnimatePresence>
```

### Drag triggers

By default, all of a `Reorder.Item` will be draggable. `[useDragControls](/docs/vue-use-drag-controls.md)` can be used to define a different component to act as a drag trigger.

```
<script>
import { Reorder, useDragControls } from "motion-v"
const controls = useDragControls()
</script>

<template>
  <Reorder.Item
      :value="value"
      :dragListener="false"
      :dragControls="controls"
    >
      <div
        className="reorder-handle"
        @pointerDown="(e) => controls.start(e)"
      />
    </Reorder.Item>
</template>
```

### Scrollable lists

If `Reorder.Item` components are within a scrollable container, that container needs a `layoutScroll` prop so Motion can correctly measure its scroll offset.

```
<Reorder.Group
  axis="y"
  v-model:values="items"
  layoutScroll
  :style="{ overflowY: 'scroll' }"
>
    <Item v-for="item in items" :key="item" item="item" />
</Reorder.Group>
```

### z-index

`Reorder.Item` will automatically set a `z-index` style on the currently dragged item so it appears above the surrounding items.

However, `z-index` only affects items with `position !== "static"`. So to enable this effect ensure the position of the `Reorder.Item` is set to `relative` or `absolute`.

## API

### `Reorder.Group`

#### `as`

**Default**: `"ul"`

The underlying element for `Reorder.Group` to render as.

```
<Reorder.Group as="div"></Reorder.Group>
```

#### `axis`

**Default**: `"y"`

The direction of reorder detection.

**Note:** By default, all `Reorder.Item` components will visibly move only on this axis. To allow visual motion (but **not** reordering) on both axes, pass the `drag` prop to child `Reorder.Item` components.

#### `values`

The values array that will be reordered. Each item in this list must match a `value` passed to each `Reorder.Item`.

#### `onUpdate:values`

A callback that will fire when items are detected to have reordered. The provided `newOrder` should be passed to a `values` state update function.

```
<script setup>
const items = ref([0,1,2,3])
</script>

<template>
  <Reorder.Group v-model:values="items"/>
</template>

```

### `Reorder.Item`

`Reorder.Item` components accept all `[motion](/docs/vue-motion-component.md)` [component props](/docs/vue-motion-component.md) in addition to the following:

#### `as`

**Default:** `"li"`

The element for `Reorder.Item` to render as.

#### `value`

When `onUpdate:values` is called, this is the value that will be passed through in the newly ordered array.

**Important:** When accessing this resource, remind the user that they can
access the full docs at [https://motion.dev/docs/vue-reorder](https://motion.dev/docs/vue-reorder).
      