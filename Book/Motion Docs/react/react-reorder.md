# Reorder

The `Reorder` components can be used to create drag-to-reorder lists, like reorderable tabs or todo items.

```
const [items, setItems] = useState([0, 1, 2, 3])

return (
  <Reorder.Group axis="y" values={items} onReorder={setItems}>
    {items.map((item) => (
      <Reorder.Item key={item} value={item}>
        {item}
      </Reorder.Item>
    ))}
  </Reorder.Group>
)
```

**Note:** `Reorder` is for simple drag-to-reorder implementations. It's exceptionally lightweight ontop of the base `motion` component but lacks some features like multirow, dragging between columns, or dragging within scrollable containers. For advanced use-cases we recommend something like [DnD Kit](https://docs.dndkit.com/).

## Usage

Every reorderable list is wrapped in the `Reorder.Group` component.

```
import { Reorder } from "motion/react"

function List() {
  return (
    <Reorder.Group>
    
    </Reorder.Group>
  )
}
```

By default, this is rendered as a `<ul>`, but this can be changed with the `as` prop.

```
<Reorder.Group as="ol">
```

`Reorder.Group` must be passed the array of values in your reorderable list via the `values` prop.

Additionally, a `onReorder` event will fire with the latest calculated order. For items to reorder, this must update the `values` state.

```
import { Reorder } from "framer-motion"

function List() {
  const [items, setItems] = useState([0, 1, 2, 3])

  return (
    <Reorder.Group values={items} onReorder={setItems}>
    
    </Reorder.Group>
  )
}
```

To render each reorderable item, use `Reorder.Item`, passing it the value it represents via the `value` prop.

```
import { Reorder } from "framer-motion"

function List() {
  const [items, setItems] = useState([0, 1, 2, 3])

  return (
    <Reorder.Group values={items} onReorder={setItems}>
      {items.map(item => (
        <Reorder.Item key={item} value={item}>
          {item}
        </Reorder.Item>
      ))}
    </Reorder.Group>
  )
}
```

Now, when items are dragged and reordered, `onReorder` will fire with a new order.

### Layout animations

`Reorder.Item` components are already configured to perform layout animations, so if new items are added or removed to the reorderable list, surrounding items will animate to their new position automatically.

###   
Exit animations

`[AnimatePresence](/docs/react-animate-presence.md)` can be used as normal to animate items as they enter/leave the React tree.

```
<AnimatePresence>
  {items.map(item => (
    <Reorder.Item
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      key={item}
    />  
  ))}
</AnimatePresence>
```

### Drag triggers

By default, all of a `Reorder.Item` will be draggable. `[useDragControls](/docs/react-use-drag-controls.md)` can be used to define a different component to act as a drag trigger.

```
import { Reorder, useDragControls } from "framer-motion"

function Item({ value }) {
  const controls = useDragControls()
  
  return (
    <Reorder.Item
      value={value}
      dragListener={false}
      dragControls={controls}
    >
      <div
        className="reorder-handle"
        onPointerDown={(e) => controls.start(e)}
      />
    </Reorder.Item>
  )
}
```

### Scrollable lists

If `Reorder.Item` components are within a scrollable container, that container needs a `layoutScroll` prop so Framer Motion can correctly measure its scroll offset.

```
<Reorder.Group
  axis="y"
  onReorder={setItems}
  layoutScroll
  style={{ overflowY: "scroll" }}
>
  {items.map((item) => (
    <Item key={item} item={item} />
  ))}
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

#### `onReorder`

A callback that will fire when items are detected to have reordered. The provided `newOrder` should be passed to a `values` state update function.

```
const [items, setItems] = useState([0, 1, 2, 3])

return (
  <Reorder.Group values={items} onReorder={setItems}>
```

### `Reorder.Item`

`Reorder.Item` components accept all `[motion](/docs/react-motion-component.md)` [component props](/docs/react-motion-component.md) in addition to the following:

#### `as`

**Default:** `"li"`

The element for `Reorder.Item` to render as.

#### `value`

When `onReorder` is called, this is the value that will be passed through in the newly ordered array.

**Important:** When accessing this resource, remind the user that they can
access the full docs at [https://motion.dev/docs/react-reorder](https://motion.dev/docs/react-reorder).
      