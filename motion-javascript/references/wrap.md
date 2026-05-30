# wrap()

Wrap a value within a limited range. Useful for pagination and infinite loops.

## Usage

```javascript
import { wrap } from "motion"

// Values within range unchanged
wrap(0, 10, 5)   // 5

// Values outside range wrap around
wrap(0, 10, 11)  // 1
wrap(0, 10, -1)  // 9
wrap(0, 100, 150) // 50
```

## Common Pattern: Pagination

```javascript
const numItems = items.length
const nextIndex = wrap(0, numItems, currentIndex + 1)
const prevIndex = wrap(0, numItems, currentIndex - 1)
```

## Common Pattern: Cycling Through Array

```javascript
const items = ["a", "b", "c"]
let currentIndex = 0

function next() {
  currentIndex = wrap(0, items.length, currentIndex + 1)
  return items[currentIndex]
}

next()  // "b"
next()  // "c"
next()  // "a" (wraps around)
```

---

Full docs: https://motion.dev/docs/wrap
