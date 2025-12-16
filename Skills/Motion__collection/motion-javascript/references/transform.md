# transform()

Map an input value from one range to another.

## Usage

```javascript
import { transform } from "motion"

// Number to number
const transformer = transform([0, 100], [0, 360])
transformer(50)  // 180

// Number to color
const numberToColor = transform([0, 100], ["#000", "#fff"])
numberToColor(50)  // "rgba(128, 128, 128, 1)"

// Multiple stops
const x = [-100, 0, 100, 200]
const opacity = [0, 1, 1, 0]
const transformer = transform(x, opacity)
transformer(-50)   // 0.5
transformer(50)    // 1
transformer(150)   // 0.5
```

## Rules

- Both ranges **must be same length**
- **Input range** must be linear series (ascending or descending)
- **Output range** can be non-linear numbers, colors, or complex strings

## Options

### clamp

**Default:** `true`

By default, values are clamped to output range. Set `false` to map infinitely:

```javascript
const transformer = transform([0, 100], [0, 360], { clamp: false })
transformer(200)  // 720 (not clamped to 360)
```

---

**Note:** React users should use `useTransform` hook for motion values.

Full docs: https://motion.dev/docs/transform
