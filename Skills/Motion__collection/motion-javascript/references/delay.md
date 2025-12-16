# delay()

Frame-synced alternative to `setTimeout`. Locks to Motion's animation frame loop for better synchronization.

## Usage

```javascript
import { delay } from "motion"

// Delay callback by seconds
delay(() => console.log("one second!"), 1)

// Cancel
const cancel = delay(callback, 0.25)
cancel()  // callback won't fire
```

## Benefits

- Synchronizes with other animations
- Reduces overhead vs multiple `setTimeout`s
- Fires on Motion's animation loop `read` step

## Pattern: Batch Reads/Writes

```javascript
import { delay, frame } from "motion"

delay(() => {
  // Read DOM
  const { left } = element.getBoundingClientRect()
  
  // Write in same frame
  frame.render(() => {
    element.style.left = `${left * 2}px`
  })
}, 1)
```

---

Full docs: https://motion.dev/docs/delay
