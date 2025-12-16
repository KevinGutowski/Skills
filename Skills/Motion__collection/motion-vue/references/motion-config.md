# MotionConfig (Vue)

Set configuration for all child `motion` components.

## Usage

```vue
<script setup>
import { motion, MotionConfig } from "motion-v"
</script>

<template>
  <MotionConfig :transition="{ duration: 1 }">
    <motion.div
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
    />
  </MotionConfig>
</template>
```

## Props

### transition

Default transition for all child `motion` components:

```vue
<MotionConfig :transition="{ type: 'spring', stiffness: 300 }">
  <App />
</MotionConfig>
```

### reducedMotion

**Default:** `"never"`

Site-wide reduced motion policy:

| Value | Effect |
|-------|--------|
| `"user"` | Respect device setting |
| `"always"` | Force reduced motion |
| `"never"` | Ignore reduced motion |

```vue
<MotionConfig reducedMotion="user">
  <App />
</MotionConfig>
```

When enabled: transforms and layout animations disabled, `opacity`/`backgroundColor` persist.

### nonce

For Content Security Policy compliance:

```vue
<MotionConfig :nonce="cspNonce">
  <App />
</MotionConfig>
```

---

Full docs: https://motion.dev/docs/vue-motion-config
