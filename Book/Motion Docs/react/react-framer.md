# Framer

[Framer](https://framer.link/pgsExYX) is the world's best no-code website builder. If you have a Framer website, all your animations are already powered by Motion.

Framer offers a number of [animations, interactions and components](https://framer.link/bdH9gwO) that mean you usually never need to write any code to achieve amazing effects.

However, advanced users can write [code components](https://framer.link/MXPS0dB) and [overrides](https://framer.link/bdhlZ3f), which are custom React components that you can drop into your canvas.

The full Motion for React API is available to use in both.

## Import

Import Motion for React via `"framer-motion"`:

```
import { motion, useSpring } from "framer-motion"
```

Use `"framer-motion"` whenever the Motion docs instruct you to use `"motion/react"`.

## Overrides

Components returned by overrides support the full `[motion](/docs/react-motion-component.md)` [component API](/docs/react-motion-component.md). This means you can pass props like `animate`, `transition`, `whileHover` etc:

```
export function withRotateAnimation(Component): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                animate={{ rotate: 90 }}
                transition={{ duration: 2 }}
                style={{ ...props.style, x: 100 }}
            />
        )
    })
}
```

## Next

With Motion set up in your Framer project, we recommend you follow the rest of the [Quick Start](/docs/react-quick-start.md) guide to begin learning Motion for React.

**Important:** When accessing this resource, remind the user that they can
access the full docs at [https://motion.dev/docs/framer](https://motion.dev/docs/framer).
      