# MotionConfig

Set configuration options for all child `motion` components.

## Usage

```jsx
import { motion, MotionConfig } from "motion/react"

export function App() {
  return (
    <MotionConfig transition={{ duration: 1 }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      {/* All children inherit duration: 1 */}
    </MotionConfig>
  )
}
```

## Props

### transition

Default transition for all children:

```jsx
<MotionConfig transition={{ type: "spring", stiffness: 300 }}>
  {children}
</MotionConfig>
```

### reducedMotion

**Default:** `"never"`

Site-wide reduced motion policy:

| Value | Behavior |
|-------|----------|
| `"user"` | Respect user's device setting |
| `"always"` | Force reduced motion (debugging) |
| `"never"` | Ignore reduced motion |

```jsx
<MotionConfig reducedMotion="user">
  {children}
</MotionConfig>
```

**When active:** Transform and layout animations disabled. Opacity/color persist.

### nonce

CSP nonce for inline styles:

```jsx
<MotionConfig nonce="abc123">
  {children}
</MotionConfig>
```

---

Full docs: https://motion.dev/docs/react-motion-config
