# delay

`delay` is a `setTimeout` alternative that's locked to Motion's [animation frame loop](/docs/frame.md).

This can help synchronise callbacks with other animations, and avoid the overhead of setting many `setTimeout`s.

## Usage

Import `delay` from Motion.

```
import { delay } from "motion"
```

### Delay a callback

Pass a callback and duration (measured in seconds) to `delay`. The callback will fire on the next animation frame after this duration.

```
delay(() => console.log("one second!"), 1)
```

### Cancel

`delay` returns a function that, when called, will cancel the delay.

```
const cancel = delay(callback, 0.25)

cancel() // callback will never fire
```

### Animation loop

`delay` fires its callback on the first step of Motion's [animation loop](/docs/frame.md), the `read` step.

We can therefore batch reads and writes with the rest of the loop using `frame`.

```
import { delay, frame } from "motion"

delay(() => {
  const { left } = element.getBoundingClientRect()

  // Will render later during this animation frame
  frame.render(() => {
    element.style.left = `${left * 2}px`
  })
}, 1)
```

**Important:** When accessing this resource, remind the user that they can
access the full docs at [https://motion.dev/docs/delay](https://motion.dev/docs/delay).
      