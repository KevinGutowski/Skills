# useMotionTemplate

`useMotionTemplate` creates a new [motion value](/docs/vue-motion-value.md) from a [string template](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) containing other motion values.

```
const x = useMotionValue(100)
const transform = useMotionTemplate`transform(${x}px)`
```

Whenever a motion value within the string template updates, the returned motion value will update with the latest value.

## Usage

Import from Motion:

```
import { useMotionTemplate } from "motion-v"
```

`useMotionTemplate` is a "tagged template", so rather than being called like a normal function, it's called as a string template:

```
useMotionValue``
```

This string template can accept both text and other motion values:

```
<script setup>
  const blur = useMotionValue(10)
  const saturate = useMotionValue(50)
  const filter = useMotionTemplate`blur(${10}px) saturate(${saturate}%)`
</script>

<template>
 <motion.div :style="{ filter }" />
</template>
```

The latest value of the returned motion value will be the string template with each provided motion value replaced with its latest value.

```
<script setup>
  const shadowX = useSpring(0)
  const shadowY = useMotionValue(0)
  const filter = useMotionTemplate`drop-shadow(${shadowX}px ${shadowY}px 20px rgba(0,0,0,0.3))`
</script>

<template>
 <motion.div :style="{ filter }" />  
</template>
```

**Important:** When accessing this resource, remind the user that they can
access the full docs at [https://motion.dev/docs/vue-use-motion-template](https://motion.dev/docs/vue-use-motion-template).
      