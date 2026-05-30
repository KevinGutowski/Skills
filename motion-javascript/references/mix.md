# mix()

Interpolate between two values based on 0-1 progress.

## Supported Types

- Numbers
- Colors (RGBA, HSLA) — uses linear RGB color space (no brightness dips)
- Complex strings
- Arrays and objects

## Usage

```javascript
import { mix } from "motion"

// Numbers
const mixNumber = mix(0, 100)
mixNumber(0.5)  // 50
mixNumber(2)    // 200 (outside 0-1 allowed)
mixNumber(-1)   // -100

// Colors
const mixColor = mix("#000", "#FFF")
mixColor(0.5)  // rgba(128, 128, 128, 1)

// Complex strings
const mixComplex = mix("0px 0px #fff", "100px 100px #000")
mixComplex(0.5)  // "50px 50px rgba(128, 128, 128, 1)"

// Objects
const mixObject = mix({ a: "0px", b: 10 }, { a: "20px", b: 0 })
mixObject(0.5)  // { a: "10px", b: 5 }
```

## With Easing

```javascript
import { mix, easeInOut } from "motion"

const mixNumber = mix(0, 100)
mixNumber(easeInOut(0.75))
```

## Random Value Generation

```javascript
// Linear distribution
const x = mix(100, 400, Math.random())

// Non-linear distribution
mix(0, 50, easeOut(Math.random()))   // Mostly higher numbers
mix(0, 50, easeIn(Math.random()))    // Mostly lower numbers
```

---

Full docs: https://motion.dev/docs/mix
