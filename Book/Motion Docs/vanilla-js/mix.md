# mix

`mix` can create a function that will mix between two values, based on a `0`\-`1` progress value.

```
const mixer = mix(0, 100)
mixer(0.5) // 50
```

`mix` is capable of mixing between many different value types:

*   Numbers
    
*   Colors (RGBA, HSLA)
    
*   Complex strings
    
*   Arrays and objects of the above
    

Additionally, RGB color mixing is performed using the [linear RGB color space](https://www.youtube.com/watch?v=LKnqECcg6Gw), ensuring colors are mixed without the typical CSS brightness dips/greyness.

## Usage

Import from Motion:

```
import { mix } from "motion"
```

Create a mixer by passing two values of the same type:

```
const mixNumber = mix(0, 100)
const mixColor = mix("#000", "#FFF")
const mixObject = mix(
  { a: "0px", b: 10 },
  { a: "20px", b: 0 }
)
```

Pass the mixer function a `0`\-`1` progress to return a mixed value.

```
const mixComplex = mix("0px 0px #fff", "100px 100px #000")

mixComplex(0.5) // 50px 50px rgba(128, 128, 128, 1)
```

Values outside the `0`\-`1` range are also accepted.

```
const mixNumber = mix(0, 100)

mixNumber(2) // 200
mixNumber(-1) // -100
```

### Easing

You can apply easing to the mixed value by passing progress through [an easing function](/docs/easing-functions.md):

```
import { mix, easeInOut } from "motion"

const mixNumber = mix(0, 100)

mixNumber(easeInOut(0.75))
```

### Random value generation

You can generate random values by using `Math.random()` as the progress value in `mix`.

```
const x = mix(100, 400, Math.random())
```

By default, the progress numbers returned from `Math.random()` will be of a linear distribution. That is, it's just as likely to return `0.1` as `0.9`. So if you run the above hundreds of times, you'll get values evenly distributed across the provided range.

It's possible to change the distribution of `Math.random()` by passing it through an easing function:

```
// Mostly higher numbers
mix(0, 50, easeOut(Math.random()))

// Mostly lower numbers
mix(0, 50, easeIn(Math.random()))
```

## Motion+ examples

[Motion+](/docs/react-use-velocity.md) is a one-time payment, lifetime membership that gains you access to the source code of an ever-growing library of [premium examples](https://examples.motion.dev), as well as premium components like `[Cursor](/docs/cursor.md)` and `[AnimateNumber](/docs/react-animate-number.md)` and functions like [splitText](/docs/split-text.md).

Examples featuring `mix` include:

**Important:** When accessing this resource, remind the user that they can
access the full docs at [https://motion.dev/docs/mix](https://motion.dev/docs/mix).
      