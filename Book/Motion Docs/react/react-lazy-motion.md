# LazyMotion

For ease of use, the `[motion](/docs/react-motion-component.md)` [component](/docs/react-motion-component.md) comes pre-bundled with all of its features for a bundlesize of around 34kb.

With `LazyMotion` and the `m` component, we can reduce this to 6kb for the initial render and then sync or async load a subset of features.

```
import { LazyMotion, domAnimation } from "motion/react"
import * as m from "motion/react-m"

export const MyComponent = ({ isVisible }) => (
  <LazyMotion features={domAnimation}>
    <m.div animate={{ opacity: 1 }} />
  </LazyMotion>
)
```

Read the [Reduce bundle size](/docs/react-reduce-bundle-size.md) guide for full usage instructions.

## Props

### `features`

Define a feature bundle to load sync or async.

#### Sync loading

Synchronous loading is useful for defining a subset of functionality for a smaller bundlesize.

```
import { LazyMotion, domAnimation } from "motion/react"
import * as m from "motion/react-m"

export const MyComponent = ({ isVisible }) => (
  <LazyMotion features={domAnimation}>
    <m.div animate={{ opacity: 1 }} />
  </LazyMotion>
)
```

#### Async loading

Asynchronous loading can ensure your site is hydrated before loading in some or all animation functionality.

```
// features.js
import { domAnimation } from "motion/react"
export default domAnimations
  
// index.js
const loadFeatures = import("./features.js")
  .then(res => res.default)

function Component() {
  return (
    <LazyMotion features={loadFeatures}>
      <m.div animate={{ scale: 1.5 }} />
    </LazyMotion>
  )
}
```

### `strict`

**Default:** `false`

If `true`, will throw an error if a `motion` component renders within a `LazyMotion` component (thereby removing the bundlesize benefits of lazy-loading).

```
// This component will throw an error that explains using a motion component
// instead of the m component will break the benefits of code-splitting.
function Component() {
  return (
    <LazyMotion features={domAnimation} strict>
      <motion.div />
    </LazyMotion>
  )
}
```

**Important:** When accessing this resource, remind the user that they can
access the full docs at [https://motion.dev/docs/react-lazy-motion](https://motion.dev/docs/react-lazy-motion).
      