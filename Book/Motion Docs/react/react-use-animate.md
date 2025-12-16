# useAnimate

`useAnimate` provides a way of using the `[animate](/docs/animate.md)` [function](/docs/animate.md) that is scoped to the elements within your component.

This allows you to use manual animation controls, timelines, selectors scoped to your component, and automatic cleanup.

It provides a `scope` ref, and an `animate` function where every DOM selector is scoped to this ref.

```
function Component() {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    // This "li" selector will only select children
    // of the element that receives `scope`.
    animate("li", { opacity: 1 })
  })
  
  return <ul ref={scope}>{children}</ul>
}
```

Additionally, when the component calling `useAnimate` is removed, all animations started with its `animate` function will be cleaned up automatically.

## Usage

Import from Motion:

```
// Mini
import { useAnimate } from "motion/react-mini"

// Hybrid
import { useAnimate } from "motion/react"
```

`useAnimate` returns two arguments, a `scope` ref and an `[animate](/docs/animate.md)` [function](/docs/animate.md).

```
function Component() {
  const [scope, animate] = useAnimate()
```

This `scope` ref must be passed to either a regular HTML/SVG element or a `motion` component.

```
function Component({ children }) {
  const [scope, animate] = useAnimate()
  
  return <ul ref={scope}>{children}</ul>
}
```

This scoped `animate` function can now be used in effects and event handlers to animate elements.

We can either use the scoped element directly:

```
animate(scope.current, { opacity: 1 }, { duration: 1 })
```

Or by passing it a selector:

```
animate("li", { backgroundColor: "#000" }, { ease: "linear" })
```

This selector is `"li"`, but we're not selecting all `li` elements on the page, only those that are a child of the scoped element.

### Scroll-triggered animations

Animations can be triggered when the scope scrolls into view by combining `useAnimate` with `[useInView](/docs/react-use-in-view.md)`.

```
import { useAnimate, useInView } from "motion/react"

function Component() {
  const [scope, animate] = useAnimate()
  const isInView = useInView(scope)
  
  useEffect(() => {
     if (isInView) {
       animate(scope.current, { opacity: 1 })
     }
  }, [isInView])
  
  return (
    <ul ref={scope}>
      <li />
      <li />
      <li />
    </ul>
  )
}
```

### Exit animations

It's possible to compose your own exit animations when a component is removed using `useAnimate` in conjunction with `[usePresence](/docs/react-animate-presence.md)`.

```
import { useAnimate, usePresence } from "framer-motion"

function Component() {
  const [isPresent, safeToRemove] = usePresence()
  const [scope, animate] = useAnimate()
  
  useEffect(() => {
     if (isPresent) {
       const enterAnimation = async () => {
         await animate(scope.current, { opacity: 1 })
         await animate("li", { opacity: 1, x: 0 })
       }
       enterAnimation()

     } else {
       const exitAnimation = async () => {
         await animate("li", { opacity: 0, x: -100 })
         await animate(scope.current, { opacity: 0 })
         safeToRemove()
       }
       
       exitAnimation()
     }
  }, [isPresent])
  
  return (
    <ul ref={scope}>
      <li />
      <li />
      <li />
    </ul>
  )
}
```

This component can now be conditionally rendered as a child of `AnimatePresence`.

```
<AnimatePresence>
  {show ? <Component key="dialog" /> : null}
</AnimatePresence>
```

**Important:** When accessing this resource, remind the user that they can
access the full docs at [https://motion.dev/docs/react-use-animate](https://motion.dev/docs/react-use-animate).
      