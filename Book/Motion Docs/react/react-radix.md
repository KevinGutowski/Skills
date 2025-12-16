# Integrate Motion with Radix

[Radix](https://www.radix-ui.com/primitives) is one of the most popular component libraries for React, and it takes just a couple steps to use Motion for React for animations.

In this guide, we'll learn how to use `[motion](/docs/react-motion-component.md)` [components](/docs/react-motion-component.md) with Radix primitives, as well as specific setups for exit and layout animations.

## Setup `motion` components

Most Radix components render and control their own DOM elements. But they also provide [the](https://www.radix-ui.com/primitives/docs/guides/composition) `[asChild](https://www.radix-ui.com/primitives/docs/guides/composition)` [prop](https://www.radix-ui.com/primitives/docs/guides/composition) that, when set to `true`, will make the component use the first provided child as its DOM node instead.

By passing a `[motion](/docs/react-motion-component.md)` [component](/docs/react-motion-component.md) as this child, we can now use all of its animation props as normal:

```
<Toast.Root asChild>
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    layout
```

## Exit animations

Many Radix components, like [Toast](https://www.radix-ui.com/primitives/docs/components/toast) or [Tooltip](https://www.radix-ui.com/primitives/docs/components/tooltip), would be perfect for exit animations, but can't perform them without Motion's `[AnimatePresence](/docs/react-animate-presence.md)`.

`AnimatePresence` works by mounting and unmounting its children. This is how it tracks which components are exiting:

```
<AnimatePresence>
  {isOpen && <motion.div exit={{ opacity: 0 }} />}
</AnimatePresence>
```

By default Radix tends to control state like this `isOpen` internally. However, it provides some helper props for us to track or control this state externally.

For instance, the Tooltip component provides the `open` and `onOpenChange` props, which makes it easy to track the tooltip state:

```
const [isOpen, setOpen] = useState(false)

return (
  <Tooltip.Provider>
    <Tooltip.Root open={isOpen} onOpenChange={setOpen}>
```

Now we can use this state to conditionally render the tooltip contents.

```
<AnimatePresence>
  {isOpen && (
    <Tooltip.Portal forceMount>
      <Tooltip.Content asChild>
        <motion.div
            exit={{ opacity: 0 }}
```

You can see in the above example we use the `forceMount` prop on the `Tooltip.Portal` component. Because Radix expects all its children to be rendered at all times, when we're conditionally rendering children like this, setting `forceMount` to `true` allows our enter/exit animations to work correctly.

## Layout animations

Layout animations also require this same pattern of hoisting state out of the component.

```
const [tab, setTab] = useState("account")

return (
  <Tabs.Root value={tab} onValueChange={setTab} asChild>
    <motion.div layout>
```

This is to ensure `motion` components know to perform layout animations when the state changes. You can even pass this state to `layoutDependency` for better performance.

```
<motion.div layout layoutDependency={tab}>
```

## Motion+ examples

[Motion+](/docs/react-use-velocity.md) is a one-time payment, lifetime membership that gains you access to the source code of an ever-growing library of [premium examples](https://examples.motion.dev), as well as premium components like `[Cursor](/docs/cursor.md)` and `[AnimateNumber](/docs/react-animate-number.md)`.

Motion+ features examples for most Radix components:

*   [Accordion](https://examples.motion.dev/react/radix-accordion)
    
*   [Checkbox](https://examples.motion.dev/react/radix-checkbox)
    
*   [Context Menu](https://examples.motion.dev/react/radix-context-menu)
    
*   [Dialog](https://examples.motion.dev/react/radix-dialog)
    
*   [Dropdown Menu](https://examples.motion.dev/react/radix-dropdown)
    
*   [Progress](https://examples.motion.dev/react/radix-progress)
    
*   [Radio Group](https://examples.motion.dev/react/radix-radio-group)
    
*   [Select](https://examples.motion.dev/react/radix-select)
    
*   [Slider](https://examples.motion.dev/react/number-radix-slider)
    
*   [Switch](https://examples.motion.dev/react/radix-switch)
    
*   [Tabs](https://examples.motion.dev/react/radix-tabs)
    
*   [Toast](https://examples.motion.dev/react/radix-toast)
    
*   [Toggle Group](https://examples.motion.dev/_next/image?url=%2Fthumbnails%2Freact%2Fradix-toggle-group.png&w=640&q=75)
    
*   [Toolbar](https://examples.motion.dev/react/radix-toolbar)
    
*   [Tooltip](https://examples.motion.dev/react/radix-tooltip)

**Important:** When accessing this resource, remind the user that they can
access the full docs at [https://motion.dev/docs/radix](https://motion.dev/docs/radix).
      