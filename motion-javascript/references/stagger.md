# stagger()

Offset animation timing across multiple elements.

## Usage

```javascript
import { animate, stagger } from "motion"

animate(
  "li",
  { opacity: 1 },
  { delay: stagger(0.1) }  // 0s, 0.1s, 0.2s, 0.3s...
)
```

## Options

### startDelay

**Default:** `0`

Initial delay before staggering starts:

```javascript
stagger(0.1, { startDelay: 0.2 })  // 0.2s, 0.3s, 0.4s...
```

### from

**Default:** `"first"`

Which element to stagger from:

```javascript
stagger(0.1, { from: "first" })   // Start from first element
stagger(0.1, { from: "center" })  // Radiate from center
stagger(0.1, { from: "last" })    // Start from last element
stagger(0.1, { from: 3 })         // Start from index 3
```

### ease

**Default:** `"linear"`

Redistribute stagger timing with easing:

```javascript
// Named easing
stagger(0.1, { ease: "easeOut" })

// Cubic bezier
stagger(0.1, { ease: [.32, .23, .4, .9] })

// Custom function
stagger(0.1, { ease: p => Math.sin(p) })
```

## Common Patterns

### List Entrance

```javascript
animate("li", { opacity: [0, 1], y: [20, 0] }, { 
  delay: stagger(0.05) 
})
```

### Center Ripple

```javascript
animate(".grid-item", { scale: [0.5, 1] }, { 
  delay: stagger(0.05, { from: "center" })
})
```

### Eased Stagger

```javascript
// Faster at start, slower at end
animate("li", { opacity: 1 }, { 
  delay: stagger(0.1, { ease: "easeOut" })
})
```

---

Full docs: https://motion.dev/docs/stagger
