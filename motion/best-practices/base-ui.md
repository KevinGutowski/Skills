# Animating Base UI with Motion for React

## Contents
- Adding Animations
- Exit Animations


Rules for integrating Motion animations with Base UI components.

## Adding Animations

Pass a `motion` component via the Base UI `render` prop:

```jsx
<Menu.Popup
  render={
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
  }
>
```

**Don't** use the function/spread props approach — it causes type errors.

## Exit Animations

### Standard Approach

For most components, use `AnimatePresence` with the `exit` prop as usual:

```jsx
<AnimatePresence>
  {open && (
    <Menu.Trigger
      render={
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      }
    />
  )}
</AnimatePresence>
```

### Self-Managing Components

Some Base UI components (e.g. `ContextMenu`, `Popover`) control their own conditional rendering. For exit animations on these:

1. **Hoist their open state** with `useState`:
   ```jsx
   const [open, setOpen] = useState(false)

   return (
     <ContextMenu.Root open={open} onOpenChange={setOpen}>
   ```

2. **Add `keepMounted` to `Portal`** and wrap with `AnimatePresence`:
   ```jsx
   <AnimatePresence>
     {open && (
       <ContextMenu.Portal keepMounted>
   ```

3. **Add exit animation** via `render` prop on a `motion` component:
   ```jsx
   <ContextMenu.Popup
     render={
       <motion.div
         initial={{ opacity: 0, transform: "scale(0.9)" }}
         animate={{ opacity: 1, transform: "scale(1)" }}
         exit={{ opacity: 0, transform: "scale(0.9)" }}
       />
     }
   >
   ```

### Full Example

```jsx
function App() {
  const [open, setOpen] = useState(false)

  return (
    <ContextMenu.Root open={open} onOpenChange={setOpen}>
      <ContextMenu.Trigger>Open menu</ContextMenu.Trigger>
      <AnimatePresence>
        {open && (
          <ContextMenu.Portal keepMounted>
            <ContextMenu.Positioner>
              <ContextMenu.Popup
                render={
                  <motion.div
                    initial={{ opacity: 0, transform: "scale(0.9)" }}
                    animate={{ opacity: 1, transform: "scale(1)" }}
                    exit={{ opacity: 0, transform: "scale(0.9)" }}
                  />
                }
              >
                {/* Children */}
              </ContextMenu.Popup>
            </ContextMenu.Positioner>
          </ContextMenu.Portal>
        )}
      </AnimatePresence>
    </ContextMenu.Root>
  )
}
```

**Note:** `Portal` keeps the tree mounted as long as Base UI detects animations via `element.getAnimations()`. Motion runs `opacity`, `transform`, `filter`, and `clipPath` via hardware acceleration — ensure at least one of these is used for exit animations.

> **Library note (2026-11, not part of the upstream kit):** checked against Base UI's animation handbook at 1.9.0 (<https://base-ui.com/react/handbook/animation.md>). Three differences from the text above:
>
> - **Detection.** Base UI's docs say it detects CSS animations always and Motion animations "that include `opacity`". Include `opacity` in every exit; do not rely on `transform`, `filter`, or `clipPath` alone.
> - **When it cannot detect the exit** (no `opacity`, or the popup must wait on something else): call `eventDetails.preventUnmountOnClose()` in `onOpenChange`, then `unmount()` on the `actionsRef` passed to the root once the animation finishes.
> - **Popups kept in the DOM.** A part with `keepMounted` and no `AnimatePresence` animates from the `open` state instead (`animate={open ? … : …}`). `Select` is a mix: absent until first opened, kept afterwards. The handbook has a worked example for each.
>
> For plain open and close, Base UI recommends CSS transitions on `[data-starting-style]` and `[data-ending-style]` over keyframes, because a transition can be reversed midway. Reach for Motion when the popup needs springs or layout animation.
