# frame

Schedule functions on Motion's animation loop. Prevents layout thrashing and reduces `requestAnimationFrame` overhead.

## Frame Steps

Motion's animation loop has three steps:

1. **`read`** — Read/measure DOM
2. **`update`** — Amend values after all reads
3. **`render`** — Apply values to DOM after all updates

## Usage

```javascript
import { frame, cancelFrame } from "motion"

// Schedule for specific step
frame.read(() => {
  const rect = element.getBoundingClientRect()
})

frame.update(() => {
  // Amend values
})

frame.render(() => {
  element.style.transform = "translateX(0px)"
})

// Cancel
function measureElement() {
  console.log(element.getBoundingClientRect())
}
frame.read(measureElement)
cancelFrame(measureElement)
```

## Animation Loop

Pass `true` as second argument to keep firing every frame:

```javascript
let i = 0

function update() {
  i++
  if (i >= 100) cancelFrame(update)
}

frame.update(update, true)  // Runs every frame
```

## Benefits

- **Prevents layout thrashing** — Batches DOM reads before writes
- **Keep-alive API** — Easy persistent loops
- **Performance** — Single `requestAnimationFrame` for all Motion operations

---

Full docs: https://motion.dev/docs/frame
