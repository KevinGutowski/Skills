# Reorder

Drag-to-reorder lists (tabs, todo items, etc). Lightweight but simple - use [DnD Kit](https://docs.dndkit.com/) for advanced cases.

## Contents
- [Usage](#usage)
- [Features](#features)
- [Styling & interaction](#styling--interaction)
- [Tips](#tips)

## Usage

```jsx
import { Reorder } from "motion/react"

function List() {
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
}
```

## Features

### Layout Animations

Built-in - items animate to new positions automatically when list changes.

### Exit Animations

```jsx
<Reorder.Group values={items} onReorder={setItems}>
  <AnimatePresence>
    {items.map(item => (
      <Reorder.Item
        key={item}
        value={item}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />  
    ))}
  </AnimatePresence>
</Reorder.Group>
```

### Drag Handles

```jsx
import { Reorder, useDragControls } from "motion/react"

function Item({ value }) {
  const controls = useDragControls()
  
  return (
    <Reorder.Item
      value={value}
      dragListener={false}
      dragControls={controls}
    >
      <div onPointerDown={(e) => controls.start(e)}>⋮⋮</div>
      {/* content */}
    </Reorder.Item>
  )
}
```

### Scrollable Lists

```jsx
<Reorder.Group
  axis="y"
  values={items}
  onReorder={setItems}
  layoutScroll
  style={{ overflowY: "scroll" }}
>
  {items.map((item) => <Item key={item} item={item} />)}
</Reorder.Group>
```

## Reorder.Group Props

| Prop | Default | Description |
|------|---------|-------------|
| `as` | `"ul"` | Element type |
| `axis` | `"y"` | Reorder direction (`"x"` or `"y"`) |
| `values` | — | **Required** array of items |
| `onReorder` | — | **Required** callback with new order |

## Reorder.Item Props

| Prop | Default | Description |
|------|---------|-------------|
| `as` | `"li"` | Element type |
| `value` | — | **Required** item value |
| All `motion.*` props | — | Gestures, animations, etc. |

## z-index

Dragged items auto-elevate with `z-index`. Ensure items have `position: relative` or `absolute`.

```css
.reorder-item {
  position: relative;  /* Required for z-index */
}
```

---

Full docs: https://motion.dev/docs/react-reorder
