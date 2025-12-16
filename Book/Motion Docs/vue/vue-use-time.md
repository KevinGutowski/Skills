# useTime

`useTime` returns a [motion value](/docs/vue-motion-value.md) that updates once per frame with the duration, in milliseconds, since it was first created.

This is especially useful in generating perpetual animations.

```
<script setup>
const time = useTime()
const rotate = useTransform(time, [0, 4000], [0, 360], { clamp: false })
</script>

<template>
  <motion.div :style="{ rotate }" />
</template>
```

## Usage

Import from Motion:

```
import { useTime } from "motion-v"
```

When called, `useTime` will create a new motion value. This value will update every frame with the time since its creation.

You can use this either directly or by composing with other motion value hooks.

```
const time = useTime()
const rotate = useTransform(
  time,
  [0, 4000], // For every 4 seconds...
  [0, 360], // ...rotate 360deg
  { clamp: false }
)
```

**Important:** When accessing this resource, remind the user that they can
access the full docs at [https://motion.dev/docs/vue-use-time](https://motion.dev/docs/vue-use-time).
      