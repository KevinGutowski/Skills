# useSpring

`useSpring` creates [a motion value](/docs/vue-motion-value.md) that will animate to its latest target with a spring animation.

The target can either be set manually via `.set`, or automatically by passing in another motion value.

## Usage

Import `useSpring` from Motion:

```
import { useSpring } from "motion-v"
```

### Direct control

`useSpring` can be created with a number, or a unit-type (`px`, `%` etc) string:

```
const x = useSpring(0)
const y = useSpring("100vh")
```

Now, whenever this motion value is updated via `set()`, the value will animate to its new target with the defined spring.

```
x.set(100)
y.set("50vh")
```

It's also possible to update this value immediately, without a spring, with [the](/docs/react-motion-value#jump.md) `[jump()](/docs/react-motion-value#jump.md)` [method](/docs/react-motion-value#jump.md).

```
x.jump(50)
y.jump("0vh")
```

### Track another motion value

Its also possible to automatically spring towards the latest value of another motion value:

```
const x = useMotionValue(0)
const y = useSpring(x)
```

This source motion value must also be a number, or unit-type string.

### Transition

The type of `spring` can be defined with the usual [spring transition option](/docs/vue-transitions#spring.md).

```
useSpring(0, { stiffness: 300 })
```

**Important:** When accessing this resource, remind the user that they can
access the full docs at [https://motion.dev/docs/vue-use-spring](https://motion.dev/docs/vue-use-spring).
      