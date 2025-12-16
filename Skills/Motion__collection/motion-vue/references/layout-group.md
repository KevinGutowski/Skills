# LayoutGroup (Vue)

Synchronize layout animations across components that don't re-render together.

## Usage

```vue
<!-- Item.vue -->
<script setup>
const isOpen = ref(false)
</script>

<template>
  <motion.div layout @click="isOpen = !isOpen">
    <motion.h2 layout>{{ header }}</motion.h2>
    {{ isOpen ? content : null }}
  </motion.div>
</template>

<!-- Accordion.vue -->
<script setup>
import { LayoutGroup } from "motion-v"
</script>

<template>
  <LayoutGroup>
    <Item />
    <Item />  <!-- Now animates when sibling changes -->
  </LayoutGroup>
</template>
```

## Namespace layoutId

```vue
<!-- Tab.vue -->
<template>
  <li>
    {{ label }}
    <motion.div v-if="isSelected" layoutId="underline" />
  </li>
</template>

<!-- TabRow.vue -->
<script setup>
import { LayoutGroup } from "motion-v"
</script>

<template>
  <LayoutGroup :id="id">  <!-- Namespace layoutId -->
    <Tab v-for="item in items" :key="item.id" v-bind="item" />
  </LayoutGroup>
</template>

<!-- Now you can have multiple tab rows -->
<TabRow id="primary-nav" :items="primaryItems" />
<TabRow id="secondary-nav" :items="secondaryItems" />
```

---

Full docs: https://motion.dev/docs/vue-layout-group
