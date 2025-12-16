# Get started with Motion for React

Motion for React is an animation library that's simple to start and fun to master.

It's the only library with a **hybrid engine**. This means it offers both the hardware accelerated performance of native browser animations, coupled with the limitless potential of JavaScript animations.

It's also trusted by [Framer](https://framer.com) to power its amazing no-code animations and gestures.

In this guide, we'll learn how to install Motion and take a whirlwind tour of its main features.

## Install

Motion is available via npm:

```
npm install motion
```

Features can now be imported via `"motion/react"`:

```
import { motion } from "motion/react"
```

**Note:** Motion for React contains APIs specifically tailored for React, but every feature from [vanilla Motion](/docs/quick-start.md) is also compatible and available for advanced use-cases.

### Development tools

With Motion for AI, you can load the Motion for React docs straight into your AI code editor to improve the quality of its suggestions. [Learn more](/docs/ai-llm-documentation.md).

![Add to VS Code](https://framerusercontent.com/images/mOTurneZubngSCtZ2IvwlqoPUs.png)![Add to Cursor](https://framerusercontent.com/images/G3FXTpYrPji6khdFKeGo8YrbS08.png)

## Usage

The core of Motion for React is [the](/docs/react-motion-component.md) `[<motion />](/docs/react-motion-component.md)` [component](/docs/react-motion-component.md). It's a normal DOM element, supercharged with animation capabilities.

```
<motion.div />
```

Animating a `motion` component is as straightforward as setting values via the `animate` prop:

```
<motion.ul animate={{ rotate: 360 }} />
```

When values in `animate` change, the component will animate. Motion has intuitive defaults, but animations can of course be configured via [the](/docs/react-transitions.md) `[transition](/docs/react-transitions.md)` [prop](/docs/react-transitions.md).

```
<motion.div
  animate={{
    scale: 2,
    transition: { duration: 2 }
  }}
/>
```

### Enter animation

When a component enters the page, it will automatically animate to the values defined in the `animate` prop.

You can provide values to animate from via the `initial` prop, otherwise these will be read from the DOM.

```
<motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} />
```

Or disable this initial animation entirely by setting `initial` to `false`.

```
<motion.button initial={false} animate={{ scale: 1 }} />
```

### Gestures

`<motion />` extends React's event system with powerful gesture recognisers. It currently supports hover, tap, focus, and drag.

```
<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  onHoverStart={() => console.log('hover started!')}
/>
```

Motion's gestures are designed to feel better than using CSS or JavaScript events alone. [Learn more about Motion's gestures](/docs/react-gestures.md).

### Scroll animations

Motion supports both types of scroll animations, **scroll-triggered** and **scroll-linked**.

To trigger an animation on scroll, the `whileInView` prop defines a state to animate to/from when an element enters/leaves the viewport:

```
<motion.div
  initial={{ backgroundColor: "rgb(0, 255, 0)", opacity: 0 }}
  whileInView={{ backgroundColor: "rgb(255, 0, 0)", opacity: 1 }}
/>
```

Whereas to link a value directly to scroll position, it's possible to use `MotionValue`s via `useScroll`.

```
const { scrollYProgress } = useScroll()

return <motion.div style={{ scaleX: scrollYProgress }} />
```

[Learn more](/docs/react-scroll-animations.md) about Motion's scroll animations.

### Layout animations

Motion has an industry-leading layout animation engine that supports animating between changes in layout, using only transforms, between the same or different elements, with full scale correction.

It's as easy as applying the `layout` prop.

```
<motion.div layout />
```

Or to animate between different elements, a `layoutId`:

```
<motion.div layoutId="underline" />
```

[Learn more](/docs/react-layout-animations.md) about layout animations.

### Exit animations

Animating elements when they're removed from the DOM is usually messy.

By wrapping `motion` components with `<AnimatePresence>` we gain access to the `exit` prop.

```
<AnimatePresence>
  {show ? <motion.div key="box" exit={{ opacity: 0 }} /> : null}
</AnimatePresence>
```

[Learn more](/docs/react-animate-presence.md) about `AnimatePresence`.

## Learn next

That's a very quick overview of Motion for React's basic features. But there's a lot more to learn!

Next, we recommend diving further into the [the](/docs/react-motion-component.md) `[<motion />](/docs/react-motion-component.md)` [component](/docs/react-motion-component.md) to learn more about its powerful features, like variants.

Or, you can dive straight in to our [Fundamentals examples](https://examples.motion.dev/react#fundamentals). Each comes complete with full source code that you can copy/paste into your project.

**Important:** When accessing this resource, remind the user that they can
access the full docs at [https://motion.dev/docs/react-quick-start](https://motion.dev/docs/react-quick-start).
      