# stagger

When animating elements with the [animate](/docs/animate.md) function, it's possible to stagger animations across them using `stagger()`.

```
import { animate, stagger } from "motion"

animate(
  "li",
  { opacity: 1 },
  { delay: stagger(0.1) }
)
```

## Usage

Import `stagger` from Motion.

```
import { animate, stagger } from "motion"
```

By passing a duration, in seconds, to `stagger`, the `delay` of each element will be increased by that amount for each animation.

```
animate(
  "li",
  { opacity: 1 },
  { delay: stagger(0.1) }
)
```

## Options

`stagger` accepts options via its second argument.

### `startDelay`

**Default:** `0`

The initial delay from which to calculate subsequent delays.

```
stagger(0.1, { startDelay: 0.2 }) // 0.2, 0.3, 0.4...
```

### `from`

**Default:** `"first"`

Specifies which element in the array from which to stagger. Can be set as `"first"`, `"center"`, `"last"`, or a number to specify an index.

### `ease`

**Default:** `"linear"`

By passing an easing function, staggers can be redistributed through the total stagger time.

Any easing function or [Motion easing](/docs/easing-functions.md) is accepted, like a cubic bezier definition:

```
stagger(0.1, { ease: [.32, .23, .4, .9] })
```

Name of an easing function:

```
stagger(0.1, { ease: "easeOut" })
```

Or a custom easing function:

```
stagger(0.1, { ease: p => Math.sin(p) })
```

## Motion+ examples

[Motion+](/docs/react-use-velocity.md) is a one-time payment, lifetime membership that gains you access to the source code of an ever-growing library of [premium examples](https://examples.motion.dev), as well as premium components like `[Cursor](/docs/cursor.md)` and `[AnimateNumber](/docs/react-animate-number.md)` and functions like [splitText](/docs/split-text.md).

Examples featuring `stagger` include:

**Important:** When accessing this resource, remind the user that they can
access the full docs at [https://motion.dev/docs/stagger](https://motion.dev/docs/stagger).
      