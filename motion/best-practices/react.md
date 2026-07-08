# Motion for React

Rules for using Motion in React and TypeScript projects. Framer Motion is now called Motion for React — all Framer Motion knowledge applies.

## Importing

-   **Never** import from `framer-motion`.
-   Import from `motion/react` in client components.
-   In server components, import `motion` like: `import * as motion from "motion/react-client"`
-   Files marked `"use client"` must import from `"motion/react"`.
-   The `animate` function: import from `"motion/react"` in React files, from `"motion"` elsewhere.

## MotionValues

-   **Never** read from a `MotionValue` in a render. Only read in effects/callbacks.
    -   OK: `useTransform(() => value.get())`
    -   Bad: `propName={value.get()}`

## React Patterns

-   Compose chains of `useTransform`, `useSpring`, `useMotionValue`, and `useVelocity` rather than complex imperative logic
-   Prefer `willChange` over `transform: translateZ(0)`
-   When animating MotionValues:
    -   Use `animate()` to animate the source MotionValue directly
    -   Don't use the `transition` prop when values are driven by MotionValues via `style`
    -   Derived values (via `useTransform`, `useSpring`) automatically follow the source animation

## `useTransform`

Two current syntaxes:

1. `useTransform(value, inputRange, outputRange, options)` — prefer this
2. `useTransform(() => otherMotionValue.get() * 2)` — function syntax

**Deprecated** (never use): `useTransform(value, (latestValue) => newValue)`

## AnimatePresence

-   Conditional motion elements need an `AnimatePresence` wrapper and an `exit` prop, or exits won't animate. Dynamic lists inside it need stable unique keys (item IDs, never indexes).
-   `mode="wait"` runs exit then enter **serially**, nearly doubling perceived duration. Halve per-phase durations (~0.15s each) so the full swap stays ≤300ms.
-   For lists, use `mode="popLayout"`: exiting items pop out of layout flow instead of competing for space with entering ones (the default/`"sync"` modes let them fight).
-   Nested `AnimatePresence` needs the `propagate` prop on **both** levels — otherwise children vanish instantly when the parent exits. Keep parent and child exit durations coordinated.
-   With `usePresence`, always call `safeToRemove` after async work completes (`cleanup().then(safeToRemove)`); a missed call leaks the element in the tree forever.
-   Gate interactivity on `useIsPresent` — exiting elements must not remain clickable (`disabled={!isPresent}`). Call the hook from a *child* of `AnimatePresence`, not the component that renders it.

(Pitfalls distilled from Raphael Salaja's mastering-animate-presence audit skill: https://github.com/raphaelsalaja/skill)

## Radix Integration

When integrating with Radix:

-   Add animations via `asChild` + a `motion` component child (`motion.div`, `motion.li`)
-   For exit/layout animations, hoist Radix state into `useState` (`open`/`onOpenChange`, `value`/`onValueChange`)
-   Conditionally render the Radix component as child of `AnimatePresence`
-   The component accepting `forceMount` is what goes inside `AnimatePresence`, and `forceMount` must be set
-   Only apply `forceMount` on Radix components, never on DOM elements

## API guidance

The latest docs are available via the Motion MCP. Check the [Codex](../codex/index.md) documentation.
