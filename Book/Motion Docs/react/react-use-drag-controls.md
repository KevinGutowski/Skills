# useDragControls

Usually, dragging is initiated by pressing down on [a](/docs/react-gestures#drag.md) `[motion](/docs/react-gestures#drag.md)` [component with a](/docs/react-gestures#drag.md) `[drag](/docs/react-gestures#drag.md)` [prop](/docs/react-gestures#drag.md) and then moving the pointer.

For some use-cases, for example clicking at an arbitrary point on a video scrubber, we might want to initiate that dragging from a different element.

With `useDragControls`, we can create a set of controls to manually start dragging from any pointer event.

## Usage

Import `useDragControls` from Motion:

```
import { useDragControls } from "motion/react"
```

`useDragControls` returns drag controls that can be passed to a draggable `motion` component:

```
const controls = useDragControls()

return <motion.div drag dragControls={controls} />
```

Now we can start a drag session from another any element's `onPointerDown` event via the `start` method.

```
<div onPointerDown={event => controls.start(event)} />
```

### Touch support

To support touch screens, the triggering element should have the `touch-action: none` style applied.

```
<div onPointerDown={startDrag} style={{ touchAction: "none" }} />
```

### Snap to cursor

By default, the drag gesture will only apply **changes** to the pointer position.

We can also make the `motion` component immediately snap to the cursor by passing `snapToCursor: true` to the `start` method.

```
controls.start(event, { snapToCursor: true })
```

### Disable automatic drag

With this configuration, the `motion` component will still automatically start a drag gesture when it receives a `pointerdown` event itself.

We can stop this behaviour by passing it a `dragListener={false}` prop.

```
<motion.div
  drag
  dragListener={false}
  dragControls={controls}
/>
```

### Configure drag threshold

By default, a drag gesture will take `3` pixels of cursor travel before initialising and, if using `directionLock`, determining which axis to lock on to.

This distance can be configured with the `distanceThreshold` option.

```
controls.start(event, { distanceThreshold: 10 })
```

**Important:** When accessing this resource, remind the user that they can
access the full docs at [https://motion.dev/docs/react-use-drag-controls](https://motion.dev/docs/react-use-drag-controls).
      