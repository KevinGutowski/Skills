# useAnimate

`useAnimate` provides a way of using the `[animate](/docs/animate.md)` [function](/docs/animate.md) that is scoped to the elements within your component.

This allows you to use manual animation controls, timelines, selectors scoped to your component, and automatic cleanup.

It provides a `scope` ref, and an `animate` function where every DOM selector is scoped to this ref.

```
<script setup>
import { useAnimate } from 'motion-v'

const [scope, animate] = useAnimate()

onMounted(() => {
  // This "li" selector will only select children
  // of the element that receives `scope`
  animate('li', { opacity: 1 })
})
</script>

<template>
  <ul ref="scope">
    <slot />
  </ul>
</template>
```

Additionally, when the component calling `useAnimate` is removed, all animations started with its `animate` function will be cleaned up automatically.

## Usage

Import from Motion:

```
import { useAnimate } from "motion-v"
```

`useAnimate` returns two arguments, a `scope` ref and an `[animate](/docs/animate.md)` [function](/docs/animate.md).

```
<script setup>
import { useAnimate } from 'motion-v'

const [scope, animate] = useAnimate()
</script>
```

This `scope` ref must be passed to either a regular HTML/SVG element or a `motion` component.

```
<script setup>
import { useAnimate } from 'motion-v'

const [scope, animate] = useAnimate()
</script>

<template>
  <ul ref="scope">
    <slot />
  </ul>
</template>
```

This scoped `animate` function can now be used in effects and event handlers to animate elements.

We can either use the scoped element directly:

```
animate(scope.current, { opacity: 1 }, { duration: 1 })
```

Or by passing it a selector:

```
animate("li", { backgroundColor: "#000" }, { ease: "linear" })
```

This selector is `"li"`, but we're not selecting all `li` elements on the page, only those that are a child of the scoped element.

### Scroll-triggered animations

Animations can be triggered when the scope scrolls into view by combining `useAnimate` with `[useInView](/docs/vue-use-in-view.md)`.

```
<script setup>
import { useAnimate, useInView } from 'motion-v'

const [scope, animate] = useAnimate()
const isInView = useInView(scope)

watch(isInView, (inView) => {
  if (inView) {
    animate(scope.value, { opacity: 1 })
  }
})
</script>

<template>
  <ul ref="scope">
    <li />
    <li />
    <li />
  </ul>
</template>
```

**Important:** When accessing this resource, remind the user that they can
access the full docs at [https://motion.dev/docs/vue-use-animate](https://motion.dev/docs/vue-use-animate).
      