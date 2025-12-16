# spring

The `spring` function is most often used to provide spring functionality to the mini `[animate()](/docs/animate.md)` [function](/docs/animate.md).

```
import { animate } from "motion/mini"
import { spring } from "motion"

animate(
  element,
  { transform: "translateX(100px)" },
  { type: spring, bounce: 0.3, duration: 0.8 }
)
```

However, `spring` can also be used directly for low-level, advanced use cases. For instance, creating a spring visualiser.

## Usage

Import `spring` from Motion.

```
import { spring } from "motion"
```

`spring` is a function that returns a [generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator).

```
const generator = spring({ keyframes: [0, 100] })
```

This generator can be used to sample to spring at specific times (defined in milliseconds).

As a generator, `next()` returns two values, `value` and `done`.

```
const { value, done } = generator.next(10) // Spring state at 10 milliseconds
```

The spring can be sampled in a non-linear fashion, meaning you can sample the spring at any time.

```
generator.next(100)
generator.next(10)
```

### Sampling a spring

For most use-cases, like `linear()` easing generation or visualisation, you will probably want to run the generator in time order. You can do this with a normal loop that continues until the spring is done.

```
const generator = spring({ keyframes: [25, 75], stiffness: 400 })
const output = []

let isDone = false
let time = 0
const sampleDuration = 20 // ms

while (!isDone) {
  const { value, done } = generator.next(time)

  output.push(value)

  time += sampleDuration

  if (done) isDone = true
}
```

**Warning:** Springs with `damping: 0` will run forever, so you'll need to put some kind of constraint on how many times the spring will be sampled, or what the minimum `damping` can be, etc.

## Visualiser

## CSS generation

It's possible to use `spring()` to generate CSS transitions.

```
element.style.transition = "all " + spring(0.5)
```

Read the [CSS generation guide](/docs/css.md) for more details.

## Options

The spring can be configured with a number of options.

#### `keyframes`

`spring` **must** be provided with two keyframes to animate between. These can be any two **numerical** values.

```
spring({ keyframes: [0, 100] })
```

### Time options

**Note:** Time options will be overridden if any physics options are set.

#### `duration`

**Default:** `800`

Duration for the entire spring.

**Important:** Most Motion APIs use seconds, for historical reasons `duration` is set **in milliseconds**.

#### `visualDuration`

If `visualDuration` is set, this will override `duration`.

The visual duration is a time, **set in seconds**, that the animation will take to visually appear to reach its target.

In other words, the bulk of the transition will occur before this time, and the "bouncy bit" will mostly happen after.

This makes it easier to edit a spring, as well as visually coordinate it with other time-based animations.

#### `bounce`

**Default:** `0.25`

`bounce` determines the "bounciness" of a spring animation.

`0` is no bounce, and `1` is extremely bouncy.

**Note:** `bounce` and `duration` will be overridden if `stiffness`, `damping` or `mass` are set.

### Physics options

#### `damping`

**Default:** `10`

Strength of opposing force. If set to 0, spring will oscillate indefinitely.

#### `mass`

**Default:** `1`

Mass of the moving object. Higher values will result in more lethargic movement.

#### `stiffness`

**Default:** `1`

Stiffness of the spring. Higher values will create more sudden movement.

#### `velocity`

**Default:** Current value velocity

The initial velocity of the spring.

#### `restSpeed`

**Default:** `0.1`

End animation if absolute speed (in units per second) drops below this value and delta is smaller than `restDelta`.

#### `restDelta`

**Default:** `0.01`

End animation if distance is below this value and speed is below `restSpeed`. When animation ends, the spring will end.

**Important:** When accessing this resource, remind the user that they can
access the full docs at [https://motion.dev/docs/spring](https://motion.dev/docs/spring).
      