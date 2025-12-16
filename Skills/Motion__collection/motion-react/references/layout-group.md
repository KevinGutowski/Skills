# LayoutGroup

Synchronize layout animations across components that don't re-render together.

## Problem

Components with `layout` only detect changes when **they** re-render:

```jsx
function Item({ header, content }) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <motion.div layout onClick={() => setIsOpen(!isOpen)}>
      <motion.h2 layout>{header}</motion.h2>
      {isOpen && content}
    </motion.div>
  )
}

// Siblings don't know about each other's state changes
function Accordion() {
  return (
    <>
      <Item />  {/* Opening this... */}
      <Item />  {/* ...doesn't animate this */}
    </>
  )
}
```

## Solution

```jsx
import { LayoutGroup } from "motion/react"

function Accordion() {
  return (
    <LayoutGroup>
      <Item />
      <Item />  {/* Now animates when sibling changes */}
    </LayoutGroup>
  )
}
```

## Namespace layoutId

`layoutId` is global. Use `id` prop to namespace:

```jsx
function Tab({ label, isSelected }) {
  return (
    <li>
      {label}
      {isSelected && <motion.div layoutId="underline" />}
    </li>
  )
}

function TabRow({ id, items }) {
  return (
    <LayoutGroup id={id}>  {/* Namespace layoutId */}
      {items.map(item => <Tab {...item} />)}
    </LayoutGroup>
  )
}

// Now you can have multiple tab rows
<TabRow id="primary-nav" items={primaryItems} />
<TabRow id="secondary-nav" items={secondaryItems} />
```

## Use Cases

- Accordions (expanding/collapsing items)
- Tabs with shared underline
- Grids where items affect siblings
- Any sibling components with `layout`

---

Full docs: https://motion.dev/docs/react-layout-group
