# useDragControls

Usually, dragging is initiated by pressing down on [a](/docs/vue-gestures#drag.md) `[motion](/docs/vue-gestures#drag.md)` [component with a](/docs/vue-gestures#drag.md) `[drag](/docs/vue-gestures#drag.md)` [prop](/docs/vue-gestures#drag.md) and then moving the pointer.

For some use-cases, for example clicking at an arbitrary point on a video scrubber, we might want to initiate that dragging from a different element.

With `useDragControls`, we can create a set of controls to manually start dragging from any pointer event.

## Usage

Import `useDragControls` from Motion:

```
import { useDragControls } from "motion-v"
```

`useDragControls` returns drag controls that can be passed to a draggable `motion` component:

```
<script setup>
import { useDragControls, motion } from 'motion-v'

const controls = useDragControls()
</script>

<template>
  <motion.div drag :drag-controls="controls" />
</template>
```

Now we can start a drag session from another any element's `onPointerDown` event via the `start` method.

```
<template>
  <div @pointerdown="(event) => controls.start(event)" />
</template>
```

### Touch support

To support touch screens, the triggering element should have the `touch-action: none` style applied.

```
<template>
  <div 
    @pointerdown="startDrag" 
    style="touch-action: none"
  />
</template>
```

### Snap to cursor

By default, the drag gesture will only apply **changes** to the pointer position.

We can also make the `motion` component immediately snap to the cursor by passing `snapToCursor: true` to the `start` method.

```
controls.start(event, { snapToCursor: true })
```

### Disable automatic drag

With this configuration, the `motion` component will still automatically start a drag gesture when it receives a `pointerdown` event itself.

We can stop this behaviour by passing it a `:dragListener="false"` prop.

```
<template>
  <motion.div
    drag
    :drag-listener="false"
    :drag-controls="controls"
  />
</template>
```

**Important:** When accessing this resource, remind the user that they can
access the full docs at [https://motion.dev/docs/vue-use-drag-controls](https://motion.dev/docs/vue-use-drag-controls).
      