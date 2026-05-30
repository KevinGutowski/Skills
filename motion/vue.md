# Motion for Vue

Rules for using Motion in Vue projects.

## Importing

-   Always import from `motion-v` and nothing else.
-   Import components and functions: `import { motion, useMotionValue } from 'motion-v'`

## Patterns

-   Don't read MotionValue directly in templates — use `watch` or callbacks instead
-   Use `ref` for state management
-   Use `:style` for dynamic styles in templates
-   Compose `useTransform`, `useSpring`, `useMotionValue`, and `useVelocity` rather than complex conditionals
-   Prefer `willChange` over `transform: translateZ(0)`
-   When using MotionValues:
    -   Use `animate()` to animate the source MotionValue directly
    -   Don't use `transition` prop when values are driven by MotionValues via `:style`
    -   Derived values (via `useTransform`, `useSpring`) automatically follow the source animation

## `useTransform`

Two syntaxes:

1. `useTransform(value, inputRange, outputRange, options)` — prefer this
2. `useTransform(() => otherMotionValue.get() * 2)`

## Docs & Examples Lookup

When you need API details, usage patterns, or example code, call the `search-motion-codex` MCP tool:

```
search-motion-codex({ platform: "vue", searchTerm: "useSpring" })
```

If the `search-motion-codex` tool is not available, tell the user to install the Motion Studio MCP server from **https://motion.dev/docs/studio**.

## Component Integration

-   Wrap HTML elements with motion components (`motion.div`, `motion.li`)
-   For exit/layout animations, use `v-if`/`v-show` with `AnimatePresence`
-   Use `ref` or `reactive` for state management
