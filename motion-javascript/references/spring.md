# spring()

Create spring animations or generate spring generators for advanced use cases.

## Contents
- [Usage](#usage)
- [Options](#options)
- [Generator return](#generator-return)

## Usage

### With animate (most common)

```javascript
import { animate } from "motion/mini"
import { spring } from "motion"

animate(
  element,
  { transform: "translateX(100px)" },
  { type: spring, bounce: 0.3, duration: 0.8 }
)
```

### CSS Generation

```javascript
element.style.transition = "all " + spring(0.5)
```

See [css.md](css.md) for CSS generation guide.

### Advanced: Spring Generator

```javascript
import { spring } from "motion"

const generator = spring({ keyframes: [0, 100] })

// Sample at specific times (milliseconds)
const { value, done } = generator.next(10)  // State at 10ms

// Non-linear sampling allowed
generator.next(100)
generator.next(10)
```

### Sampling Pattern

```javascript
const generator = spring({ keyframes: [25, 75], stiffness: 400 })
const output = []

let isDone = false
let time = 0
const sampleDuration = 20  // ms

while (!isDone) {
  const { value, done } = generator.next(time)
  output.push(value)
  time += sampleDuration
  if (done) isDone = true
}
```

⚠️ **Warning:** Springs with `damping: 0` run forever. Add constraints.

## Options

### Required

| Option | Description |
|--------|-------------|
| `keyframes` | Two **numerical** values: `[0, 100]` |

### Time Options

**Note:** Overridden if any physics options are set.

| Option | Default | Description |
|--------|---------|-------------|
| `duration` | `800` | Duration in **milliseconds** (not seconds) |
| `visualDuration` | — | Duration in **seconds** (overrides duration) - time to visually reach target |
| `bounce` | `0.25` | Bounciness 0-1 (overridden by physics options) |

### Physics Options

| Option | Default | Description |
|--------|---------|-------------|
| `stiffness` | `1` | Higher = more sudden movement |
| `damping` | `10` | Opposing force (0 = infinite oscillation) |
| `mass` | `1` | Higher = more lethargic |
| `velocity` | current | Initial velocity |
| `restSpeed` | `0.1` | End threshold (units/sec) |
| `restDelta` | `0.01` | End threshold (distance) |

## Generator Return

```javascript
{ value, done }
```

- `value`: Current spring state
- `done`: Boolean, true when spring has settled

---

Full docs: https://motion.dev/docs/spring
