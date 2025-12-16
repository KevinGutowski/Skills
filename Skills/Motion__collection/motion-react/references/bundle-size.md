# Reduce Bundle Size (React)

Motion is tree-shakable. Import only what you need.

## Contents
- [Size reference](#size-reference)
- [useAnimate versions](#useanimate-versions)
- [LazyMotion + m component](#lazymotion--m-component)
- [Feature packages](#feature-packages)
- [Async loading](#async-loading)
- [Strict mode](#strict-mode)
- [Best practices](#best-practices)

## Size Reference

| Import | Size |
|--------|------|
| `useReducedMotion` | ~1kb |
| `useAnimate` (mini) | 2.3kb |
| `useAnimate` (hybrid) | 17kb |
| `motion` component | 34kb |
| `m` + `LazyMotion` | 6kb + features |

## useAnimate Versions

```jsx
// Mini (2.3kb) - WAAPI only, hardware accelerated
import { useAnimate } from "motion/react-mini"

// Hybrid (17kb) - Full features: sequences, motion values, independent transforms
import { useAnimate } from "motion/react"
```

## LazyMotion + m Component

Replace `motion` with `m` and wrap with `LazyMotion`:

```jsx
import { LazyMotion, domAnimation } from "motion/react"
import * as m from "motion/react-m"

function App() {
  return (
    <LazyMotion features={domAnimation}>
      <m.div animate={{ opacity: 1 }} />
    </LazyMotion>
  )
}
```

### Feature Packages

| Package | Size | Features |
|---------|------|----------|
| `domAnimation` | +15kb | Animations, variants, exit, tap/hover/focus |
| `domMax` | +25kb | Above + pan/drag + layout animations |

### Async Loading

Defer loading until after initial render:

```jsx
// features.js
import { domMax } from "motion/react"
export default domMax

// App.jsx
const loadFeatures = () => import("./features.js").then(res => res.default)

<LazyMotion features={loadFeatures}>
  <m.div animate={{ opacity: 1 }} />
</LazyMotion>
```

### Strict Mode

Catch accidental `motion` imports:

```jsx
<LazyMotion features={domAnimation} strict>
  <motion.div />  {/* Throws error! Use m.div instead */}
</LazyMotion>
```

## Best Practices

1. Use `useAnimate` mini for simple animations
2. Use `m` + `LazyMotion` instead of `motion`
3. Choose `domAnimation` unless you need drag/layout
4. Lazy-load features for faster initial render
5. Enable `strict` mode to prevent accidental imports

---

Full docs: https://motion.dev/docs/react-reduce-bundle-size
