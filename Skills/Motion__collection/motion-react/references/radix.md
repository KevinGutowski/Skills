# Radix Integration

Use Motion with [Radix](https://www.radix-ui.com/primitives) primitives.

## Basic Setup

Use `asChild` to make Radix use `motion` component as its DOM node:

```jsx
<Toast.Root asChild>
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    layout
  >
    Toast content
  </motion.div>
</Toast.Root>
```

## Exit Animations

Hoist state from Radix and use `AnimatePresence`:

```jsx
const [isOpen, setOpen] = useState(false)

<Tooltip.Provider>
  <Tooltip.Root open={isOpen} onOpenChange={setOpen}>
    <Tooltip.Trigger>Hover me</Tooltip.Trigger>
    <AnimatePresence>
      {isOpen && (
        <Tooltip.Portal forceMount>
          <Tooltip.Content asChild>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              Tooltip text
            </motion.div>
          </Tooltip.Content>
        </Tooltip.Portal>
      )}
    </AnimatePresence>
  </Tooltip.Root>
</Tooltip.Provider>
```

**Key:** Use `forceMount` on Portal when conditionally rendering.

## Layout Animations

Also requires hoisting state:

```jsx
const [tab, setTab] = useState("account")

<Tabs.Root value={tab} onValueChange={setTab} asChild>
  <motion.div layout layoutDependency={tab}>
    {/* Tab content */}
  </motion.div>
</Tabs.Root>
```

`layoutDependency` improves performance by only checking layout when that value changes.

## Pattern Summary

1. Use `asChild` on Radix component
2. Pass `motion` component as child
3. Hoist open/value state with `open`/`onOpenChange` or `value`/`onValueChange`
4. Use `forceMount` on Portals for exit animations
5. Wrap conditional renders in `AnimatePresence`

---

Full docs: https://motion.dev/docs/radix
