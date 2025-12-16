# Radix-Vue Integration

Use Motion with [Radix-Vue (Reka UI)](https://reka-ui.com/) primitives.

## Basic Setup

Use `as-child` to make Radix use `motion` component as its DOM node:

```vue
<template>
  <ToastRoot :as-child="true">
    <Motion
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      layout
    >
      Toast content
    </Motion>
  </ToastRoot>
</template>
```

## Exit Animations

Wrap with `AnimatePresence`:

```vue
<template>
  <Tooltip.Provider>
    <Tooltip.Root>
      <Tooltip.Trigger>Hover me</Tooltip.Trigger>
      <Tooltip.Portal>
        <AnimatePresence>
          <Tooltip.Content as-child :side-offset="10">
            <motion.div
              :initial="{ opacity: 0, y: 20, scale: 0.8 }"
              :animate="{ opacity: 1, y: 0, scale: 1 }"
              :exit="{ opacity: 0, y: 20 }"
            >
              Tooltip text
              <Tooltip.Arrow />
            </motion.div>
          </Tooltip.Content>
        </AnimatePresence>
      </Tooltip.Portal>
    </Tooltip.Root>
  </Tooltip.Provider>
</template>
```

## Layout Animations

Hoist state for layout animation awareness:

```vue
<script setup>
import { ref } from "vue"
const tab = ref("account")
</script>

<template>
  <Tabs.Root v-model="tab" as-child>
    <motion.div layout :layoutDependency="tab">
      <!-- Tab content -->
    </motion.div>
  </Tabs.Root>
</template>
```

`layoutDependency` improves performance.

## Pattern Summary

1. Use `as-child` on Radix component
2. Pass `motion` (or `Motion`) component as child
3. Wrap conditional renders in `AnimatePresence`
4. Hoist v-model state for layout animations

---

Full docs: https://motion.dev/docs/vue-radix
