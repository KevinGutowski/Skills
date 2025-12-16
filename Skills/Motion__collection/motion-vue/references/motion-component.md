# motion Component Reference (Vue)

The `motion` component is the core of Motion for Vue. Import from `"motion-v"`.

## Contents
- [Import](#import)
- [Animation Props](#animation-props)
- [Gesture Props](#gesture-props)
- [Viewport Props](#viewport-props)
- [Layout Props](#layout-props)
- [Drag Props](#drag-props)
- [Motion Primitive](#motion-primitive)

---

## Import

```vue
<script setup>
import { motion } from "motion-v"
// Or Motion primitive:
import { Motion } from "motion-v"
</script>
```

## Animation Props

| Prop | Description |
|------|-------------|
| `initial` | Starting state (object, variant name, or `false`) |
| `animate` | Target state to animate to |
| `exit` | Exit state (requires AnimatePresence) |
| `transition` | Default transition |
| `variants` | Named animation states |
| `style` | Supports motion values and independent transforms |

```vue
<motion.div
  :initial="{ opacity: 0, y: 20 }"
  :animate="{ opacity: 1, y: 0 }"
  :exit="{ opacity: 0 }"
  :transition="{ duration: 0.5 }"
/>

<!-- Disable enter animation -->
<motion.div :initial="false" :animate="{ x: 100 }" />

<!-- With variants -->
<motion.div
  :variants="{ visible: { opacity: 1 }, hidden: { opacity: 0 } }"
  initial="hidden"
  animate="visible"
/>
```

### Event Callbacks
```vue
<motion.div
  :animate="{ opacity: 1 }"
  @update="(latest) => console.log(latest)"
  @animationStart="(def) => console.log(def)"
  @animationComplete="(def) => console.log(def)"
/>
```

## Gesture Props

### Hover
```vue
<motion.button
  :whileHover="{ scale: 1.1 }"
  @hoverStart="(e) => {}"
  @hoverEnd="(e) => {}"
/>
```

### Press (whilePress, not whileTap)
```vue
<motion.button
  :whilePress="{ scale: 0.95 }"
  @pressStart="(e) => {}"
  @press="(e) => {}"
  @pressCancel="(e) => {}"
/>
```

### Focus
```vue
<motion.input :whileFocus="{ borderColor: '#3b82f6' }" />
```

### Pan
```vue
<motion.div
  @pan="(e, info) => console.log(info.offset.x)"
  @panStart="(e, info) => {}"
  @panEnd="(e, info) => {}"
/>
<!-- info: { point, delta, offset, velocity } -->
```

## Viewport Props

```vue
<motion.div
  :whileInView="{ opacity: 1 }"
  :inViewOptions="{
    once: true,
    root: scrollRef,
    margin: '-100px',
    amount: 'all'
  }"
  @viewportEnter="(entry) => {}"
  @viewportLeave="(entry) => {}"
/>
```

**Note:** Vue uses `inViewOptions` instead of React's `viewport`.

## Layout Props

```vue
<motion.div layout />
<motion.div layout="position" />
<motion.div layout="size" />
<motion.div layoutId="shared-element" />

<!-- Scrollable containers -->
<motion.div layoutScroll :style="{ overflow: 'scroll' }">
  <motion.div layout />
</motion.div>

<!-- Fixed containers -->
<motion.div layoutRoot :style="{ position: 'fixed' }">
  <motion.div layout />
</motion.div>

<!-- Performance -->
<motion.div layout :layoutDependency="someValue" />
```

## Drag Props

```vue
<script setup>
import { useDomRef, useDragControls } from "motion-v"

const constraintsRef = useDomRef()
const dragControls = useDragControls()
</script>

<template>
  <motion.div ref="constraintsRef">
    <motion.div
      drag
      :dragConstraints="constraintsRef"
      :dragElastic="0.2"
      dragSnapToOrigin
      :dragMomentum="true"
      dragDirectionLock
      :whileDrag="{ scale: 1.1 }"
      @drag="(e, info) => {}"
      @dragStart="(e, info) => {}"
      @dragEnd="(e, info) => {}"
    />
  </motion.div>
  
  <!-- External drag control -->
  <div @pointerdown="(e) => dragControls.start(e)">Handle</div>
  <motion.div drag :dragControls="dragControls" :dragListener="false" />
</template>
```

## Motion Primitive

Alternative syntax using `as` prop:

```vue
<script setup>
import { Motion } from "motion-v"
</script>

<template>
  <!-- Change rendered element -->
  <Motion as="button" :whileHover="{ scale: 1.1 }">
    Click me
  </Motion>
  
  <!-- Use child as rendered element -->
  <Motion as-child :whileHover="{ scale: 1.1 }">
    <button>Click me</button>
  </Motion>
</template>
```

## Custom Components

```vue
<script setup>
import { motion } from "motion-v"

// Create motion version of component
const MotionComponent = motion.create(MyComponent)

// Forward motion props to component
const MotionWithProps = motion.create(MyComponent, { forwardMotionProps: true })
</script>
```

**Important:** Don't call `motion.create()` inside templates.

## Advanced Props

| Prop | Description |
|------|-------------|
| `inherit` | `false` to prevent inheriting parent variants |
| `custom` | Data passed to dynamic variants |
| `transformTemplate` | Custom transform string function |

```vue
<!-- Dynamic variants with custom -->
<script setup>
const variants = {
  visible: (i) => ({ opacity: 1, transition: { delay: i * 0.1 } })
}
</script>

<template>
  <motion.li :custom="index" :variants="variants" animate="visible" />
</template>
```
