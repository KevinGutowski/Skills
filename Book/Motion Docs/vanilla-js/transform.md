# transform

`transform` can map an input value from one range of values to another.

```
const numberToColor = transform(
  [0, 100], // Input
  ["#000", "#fff"] // Output
)

numberToColor(50) // rgba(128, 128, 128, 1)
```

## Usage

Import `transform` from Motion.

```
import { transform } from "motion"
```

**Note:** React users can also use the [useTransform](/docs/react-use-transform.md) hook for use with [motion values](/docs/react-motion-value.md).

A transformation function can be created by passing two ranges, an **input** range and an **output** range:

```
const transformer = transform([0, 100], [0, 360])
```

The transformer can now be called with an input value:

```
transformer(50) // 180
```

Note:

*   Both ranges **must always be the same length**.
    
*   The **input range** must always be a linear series of numbers, either counting up or counting down.
    
*   The **output range** can be a non-linear series of numbers, colors, or complex strings.
    

The input and output ranges can accept any number of values:

```
const x = [-100, 0, 100, 200]
const opacity = [0, 1, 1, 0]
const transformer = transform(x, opacity)

transformer(-50) // 0.5
transformer(50) // 1
transformer(150) // 0.5
```

If `clamp: false` is provided, the returned function will map infinitely:

```
const transformer = transform([0, 100], [0, 360], { clamp: false })

const rotation = transformer(200) // 720
```

## Motion+ examples

[Motion+](/docs/react-use-velocity.md) is a one-time payment, lifetime membership that gains you access to the source code of an ever-growing library of [premium examples](https://examples.motion.dev), as well as premium components like `[Cursor](/docs/cursor.md)` and `[AnimateNumber](/docs/react-animate-number.md)` and functions like [splitText](/docs/split-text.md).

Examples featuring `transform` include:

**Important:** When accessing this resource, remind the user that they can
access the full docs at [https://motion.dev/docs/transform](https://motion.dev/docs/transform).
      