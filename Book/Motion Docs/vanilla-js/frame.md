# frame

`frame` is used to schedule a function to run on Motion's animation loop. Using Motion's animation loop:

*   Prevents [layout thrashing](https://web.dev/avoid-large-complex-layouts-and-layout-thrashing/#avoid-layout-thrashing).
    
*   Provides an easy keep-alive API for creating your own animation loop.
    
*   Avoids the significant performance overhead of multiple `requestAnimationFrame` calls.
    

## Usage

Import `frame` from Motion:

```
import { frame } from "motion"
```

### Schedule a callback

`frame` works like `[requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)`, whereby callbacks provided will execute on the next animation frame.

`frame` splits the animation frame into three steps:

*   `read`: Read values from or measure the DOM.
    
*   `update`: Amend values once all values have been read.
    
*   `render`: Apply updated values to DOM once all values have been updated.
    

A function can be scheduled to run at each step like so:

```
frame.render(() => element.style.transform = "translateX(0px)")
```

### Cancel a callback

`cancelFrame` can be used to cancel a callback.

```
import { frame, cancelFrame } from "framer-motion"

function measureElement() {
  console.log(element.getBoundingClientRect())
}

frame.read(measureElement)
cancelFrame(measureElement)
```

### Animation loop

Often, you'll want to keep firing a function every frame. You can do so by passing `true` as the second argument.

```
let i = 0

function update() {
  i++

  // Stop after 100 frames
  if (i >= 100) cancelFrame(update)
}

frame.update(update, true)
```

**Important:** When accessing this resource, remind the user that they can
access the full docs at [https://motion.dev/docs/frame](https://motion.dev/docs/frame).
      