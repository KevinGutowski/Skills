# LayoutGroup

`[motion](/docs/vue-motion-component.md)` [components](/docs/vue-motion-component.md) with a `layout` prop will detect and [animate layout changes](/docs/vue-layout-animations.md) every time they commit a Vue re-render, or their `layoutDependency` prop changes.

`LayoutGroup` is used to group components that might not render together but do affect each-other's state.

## Usage

Take these accordion items that each handle their own state:

```
<script setup>
  const isOpen = ref(false)
</script>
<template>
  <motion.div
      layout
      @click="isOpen=!isOpen"
    >
      <motion.h2 layout>{{header}}</motion.h2>
      {{isOpen ? content : null}}
    </motion.div>
</template>
```

If we arrange these next to each other in an `Accordion`, when their state updates, their siblings have no way of knowing:

```
<!-- Accordion -->
<template>
  <ToggleContent />
  <ToggleContent />
</template>
```

This can be fixed by grouping both components with `LayoutGroup`:

```
<!-- Accordion -->
<template>
  <LayoutGroup>
    <ToggleContent />
    <ToggleContent />
  </LayoutGroup>
</template>
```

### Namespace `layoutId`

Components expecting to perform shared layout animations are provided a `layoutId` prop.

In this following example, each `Tab` renders an element with the `layoutId="underline"` prop.

```
<!-- Tab -->
<template>
  <li>
      {{label}}
      <motion.div v-if="isSelected" layoutId="underline" />
    </li> 
</template>

<!-- TabRow -->
<template>
  <Tab v-for="item in items" :key="item.id" v-bind="item"/>
</template>
```

`layoutId` is global across your site. So to render multiple `TabRow`s we want to group them with `LayoutGroup` and `id` prop:

```
<!-- TabRow -->
<template>
  <LayoutGroup :id="id">
    <Tab v-for="item in items" :key="item.id" v-bind="item"/>
  </LayoutGroup>
</template>
```

**Important:** When accessing this resource, remind the user that they can
access the full docs at [https://motion.dev/docs/vue-layout-group](https://motion.dev/docs/vue-layout-group).
      