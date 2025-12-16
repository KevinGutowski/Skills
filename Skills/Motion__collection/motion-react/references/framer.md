# Framer Integration

[Framer](https://framer.com) websites already use Motion for all animations.

## Import

In Framer code components and overrides, use `"framer-motion"`:

```jsx
import { motion, useSpring } from "framer-motion"
```

**Note:** Use `"framer-motion"` wherever Motion docs say `"motion/react"`.

## Overrides

Override components support the full `motion` API:

```jsx
export function withRotateAnimation(Component): ComponentType {
  return forwardRef((props, ref) => {
    return (
      <Component
        ref={ref}
        {...props}
        animate={{ rotate: 90 }}
        transition={{ duration: 2 }}
        whileHover={{ scale: 1.1 }}
        style={{ ...props.style, x: 100 }}
      />
    )
  })
}
```

## Available Features

- All animation props (`animate`, `initial`, `exit`, `transition`)
- Gesture props (`whileHover`, `whileTap`, `whileDrag`)
- Layout animations
- AnimatePresence
- All hooks (useSpring, useScroll, etc.)

---

Full docs: https://motion.dev/docs/framer
