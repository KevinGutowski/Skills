# useReducedMotion

A hook that returns `true` if the current device has Reduced Motion setting enabled.

```
const shouldReduceMotion = useReducedMotion()
```

This can be used to implement changes to your UI based on Reduced Motion. For instance, replacing potentially motion-sickness inducing `x`/`y` animations with `opacity`, disabling the autoplay of background videos, or turning off parallax motion.

It will actively respond to changes and re-render your components with the latest setting.

```
<script setup>
import { useReducedMotion } from 'motion-v'

const props = defineProps({
  isOpen: Boolean
})

const shouldReduceMotion = useReducedMotion()
const closedX = computed(()=>shouldReduceMotion.value ? 0 : '-100%')
</script>

<template>
  <Motion
    :animate="{
      opacity: isOpen ? 1 : 0,
      x: isOpen ? 0 : closedX
    }"
  />
</template>
```

## Usage

Import `useReducedMotion` from Motion:

```
import { useReducedMotion } from "motion-v"
```

In any component, call `useReducedMotion` to check whether the device's Reduced Motion setting is enabled.

```
const prefersReducedMotion = useReducedMotion()
```

You can then use this `true`/`false` value to change your application logic.

**Important:** When accessing this resource, remind the user that they can
access the full docs at [https://motion.dev/docs/vue-use-reduced-motion](https://motion.dev/docs/vue-use-reduced-motion).
      