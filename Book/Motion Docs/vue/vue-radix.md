# Integrate Motion with Radix

[Radix-Vue](https://reka-ui.com/) is one of the most popular component libraries for Vue, and it takes just a couple steps to use Motion for Vue for animations.

In this guide, we'll learn how to use `[motion](/docs/vue-motion-component.md)` [components](/docs/vue-motion-component.md) with Radix primitives, as well as specific setups for exit and layout animations.

## Setup `motion` components

Most Radix components render and control their own DOM elements. But they also provide [the](https://reka-ui.com/docs/guides/composition#composition) `[asChild](https://reka-ui.com/docs/guides/composition#composition)` [prop](https://reka-ui.com/docs/guides/composition#composition) that, when set to `true`, will make the component use the first provided child as its DOM node instead.

By passing a `[motion](/docs/react-motion-component.md)` [component](/docs/react-motion-component.md) as this child, we can now use all of its animation props as normal:

```
<template>
  <ToastRoot :as-child="true">
    <Motion
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      layout
    >
```

## Exit animations

Many Radix components, like [Toast](https://reka-ui.com/docs/components/toast#toast) or [Tooltip](https://reka-ui.com/docs/components/tooltip#tooltip), would be perfect for exit animations, but can't perform them without Motion's `[AnimatePresence](/docs/vue-animate-presence.md)`.

`AnimatePresence` is built on top of Vue's Transition component,This is how it tracks which components are exiting:

```
<template>
  <AnimatePresence>
    <Motion
      v-if="isOpen"
      :exit="{ opacity: 0 }"
    />
  </AnimatePresence>
</template>
```

Using exit animations with Motion Vue and Radix components is straightforward. Just wrap your unmounting component with `AnimatePresence`, and it can detect the direct child DOM unmounting and trigger exit animations.

For example, works with the Tooltip component：

```
 <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger class="tooltip-trigger">
              Hover or focus
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <AnimatePresence>
              <Tooltip.Content as-child :side-offset="10">
                <motion.div
                  class="tooltip-content"
                  :initial="{ opacity: 0, y: 20, scale: 0.8 }"
                  :animate="{ opacity: 1, y: 0, scale: 1 }"
                  :exit="{ opacity: 0,y: 20,}"
                >
                  Add to library
                  <Tooltip.Arrow class="tooltip-arrow" />
                </motion.div>
              </Tooltip.Content>
            </AnimatePresence>
          </Tooltip.Portal>
        </Tooltip.Root>
  </Tooltip.Provider>
```

## Layout animations

Layout animations also require this same pattern of hoisting state out of the component.

```
<script setup>
const tab = ref('account')
</script>

<template>
  <Tabs.Root 
    v-model="tab" 
    as-child
  >
    <motion.div layout>
```

This is to ensure `motion` components know to perform layout animations when the state changes. You can even pass this state to `layoutDependency` for better performance.

```
<motion.div layout :layoutDependency="tab">
```

## Motion+ examples

[Motion+](/docs/plus.md) is a one-time payment, lifetime membership that gains you access to the source code of an ever-growing library of [premium examples](https://examples.motion.dev), as well as premium components like `[Cursor](/docs/vue-cursor.md)` and `[AnimateNumber](/docs/vue-animate-number.md)`.

Motion+ features examples for most Radix components:

*   [Accordion](https://examples.motion.dev/vue/radix-accordion)
    
*   [Checkbox](https://examples.motion.dev/vue/radix-checkbox)
    
*   [Context Menu](https://examples.motion.dev/vue/radix-context-menu)
    
*   [Dialog](https://examples.motion.dev/vue/radix-dialog)
    
*   [Dropdown Menu](https://examples.motion.dev/vue/radix-dropdown)
    
*   [Progress](https://examples.motion.dev/vue/radix-progress)
    
*   [Radio Group](https://examples.motion.dev/vue/radix-radio-group)
    
*   [Select](https://examples.motion.dev/vue/radix-select)
    
*   [Slider](https://examples.motion.dev/vue/number-radix-slider)
    
*   [Switch](https://examples.motion.dev/vue/radix-switch)
    
*   [Tabs](https://examples.motion.dev/vue/radix-tabs)
    
*   [Toast](https://examples.motion.dev/vue/radix-toast)
    
*   [Toggle Group](https://examples.motion.dev/vue/radix-toggle-group)
    
*   [Toolbar](https://examples.motion.dev/vue/radix-toolbar)
    
*   [Tooltip](https://examples.motion.dev/vue/radix-tooltip)

**Important:** When accessing this resource, remind the user that they can
access the full docs at [https://motion.dev/docs/vue-radix](https://motion.dev/docs/vue-radix).
      