# useAnimate

Scoped `animate()` with automatic cleanup and CSS selectors limited to component.

## Usage

```jsx
import { useAnimate } from "motion/react"

function Component({ children }) {
  const [scope, animate] = useAnimate()
  
  useEffect(() => {
    // Selector only matches children of scope
    animate("li", { opacity: 1 })
  }, [])
  
  return <ul ref={scope}>{children}</ul>
}
```

## Scoping

```jsx
const [scope, animate] = useAnimate()

// Animate scope element directly
animate(scope.current, { opacity: 1 }, { duration: 1 })

// Selector scoped to children only
animate("li", { backgroundColor: "#000" })  // Only <li> inside scope
```

## Scroll-Triggered

```jsx
import { useAnimate, useInView } from "motion/react"

function Component() {
  const [scope, animate] = useAnimate()
  const isInView = useInView(scope)
  
  useEffect(() => {
    if (isInView) {
      animate(scope.current, { opacity: 1 })
    }
  }, [isInView])
  
  return <ul ref={scope}>...</ul>
}
```

## Exit Animations

```jsx
import { useAnimate, usePresence } from "motion/react"

function Component() {
  const [isPresent, safeToRemove] = usePresence()
  const [scope, animate] = useAnimate()
  
  useEffect(() => {
    if (isPresent) {
      // Enter
      const enter = async () => {
        await animate(scope.current, { opacity: 1 })
        await animate("li", { opacity: 1, x: 0 })
      }
      enter()
    } else {
      // Exit
      const exit = async () => {
        await animate("li", { opacity: 0, x: -100 })
        await animate(scope.current, { opacity: 0 })
        safeToRemove()
      }
      exit()
    }
  }, [isPresent])
  
  return <ul ref={scope}>...</ul>
}

// Wrap with AnimatePresence
<AnimatePresence>
  {show && <Component key="dialog" />}
</AnimatePresence>
```

## Benefits

- **Scoped selectors**: CSS selectors limited to component
- **Automatic cleanup**: Animations canceled on unmount
- **Timeline control**: `await` for sequences
- **Imperative**: Call from effects/handlers

---

Full docs: https://motion.dev/docs/react-use-animate
