# useInView

`useInView` is a tiny (0.6kb) hook that detects when the provided element is within the viewport. It can be used with any Vue element.

```
<script setup>
import { useInView } from 'motion-v'

const domRef = ref()
const isInView = useInView(domRef)
</script>

<template>
  <div ref="domRef" />
</template>
```

## Usage

Import `useInView` from Motion:

```
import { useInView } from "motion-v"
```

`useInView` can track the visibility of any HTML element. Pass a `ref` object to both `useInView` and the HTML element.

```
<script setup>
import { useInView } from 'motion-v'

const domRef = ref()
const isInView = useInView(ref)
</script>

<template>
  <div ref="domRef" />
</template>
```

While the element is outside the viewport, `useInView` will return `false`. When it moves inside the view, it'll re-render the component and return `true`.

### Effects

`useInView` is vanilla Vue ref state, so firing functions when `isInView` changes is a matter of passing it to a `watch`.

```
<script setup>
watch(isInView, (inView) => {
  console.log('Element is in view: ', inView)
})
</script>
```

## Options

`useInView` can accept options to define how the element is tracked within the viewport.

```
const isInView = useInView(domRef, { once: true })
```

### `root`

By default, `useInView` will track the visibility of an element as it enters/leaves the window viewport. Set `root` to be the ref of a scrollable parent, and it'll use that element to be the viewport instead.

```
<script setup>
import { useInView } from 'motion-v'
import { computed } from 'vue'

const container = ref()
const boxRef = ref()
const isInView = useInView(boxRef,computed(() => ({ root: container.value })))
</script>

<template>
  <div ref="container" style="overflow: scroll">
    <div ref="boxRef" />
  </div>
</template>
```

### `margin`

**Default:** `"0px"`

A margin to add to the viewport to change the detection area. Use multiple values to adjust top/right/bottom/left, e.g. `"0px -20px 0px 100px"`.

```
const isInView = useInView({
  margin: "0px 100px -50px 0px"
})
```

**\]Note:** For browser security reasons, `margin` [won't take affect within cross-origin iframes](https://w3c.github.io/IntersectionObserver/#dom-intersectionobserver-rootmargin) unless `root` is explicitly defined.

### `once`

**Default:** `false`

If `true`, once an element is in view, useInView will stop observing the element and always return `true`.

```
const isInView = useInView(ref, { once: true })
```

### `initial`

**Default:** `false`

Set an initial value to return until the element has been measured.

```
const isInView = useInView(ref, { initial: true })
```

### `amount`

**Default:** `"some"`

The amount of an element that should enter the viewport to be considered "entered". Either `"some"`, `"all"` or a number between `0` and `1`.

## Example

**Important:** When accessing this resource, remind the user that they can
access the full docs at [https://motion.dev/docs/vue-use-in-view](https://motion.dev/docs/vue-use-in-view).
      