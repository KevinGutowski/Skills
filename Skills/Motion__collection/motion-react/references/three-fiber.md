# React Three Fiber Integration

## Contents
- [Install](#install)
- [Usage](#usage)
- [Supported Values](#supported-values)
- [Gestures](#gestures)
- [Motion Values](#motion-values)
- [Layout Animations](#layout-animations)

---

## Install

```bash
npm install three@0.137.0 @react-three/fiber@8.2.2 framer-motion-3d@11.2.0
```

**Note:** Requires React 18+.

## Usage

```jsx
import { motion } from "framer-motion-3d"

<motion.pointLight animate={{ x: 2 }} />
<motion.mesh whileHover={{ scale: 1.1 }} />
```

### With Variants

```jsx
const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

<motion.meshStandardMaterial
  initial="hidden"
  animate="visible"
  variants={variants}
/>
```

### Sharing State with DOM

Variants don't auto-pass between DOM and 3D. Share state instead:

```jsx
// App.jsx
import { motion } from "framer-motion"

function App() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      whileHover={{ scale: 1.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Scene isHovered={isHovered} />
    </motion.div>
  )
}

// Scene.jsx
import { Canvas } from "@react-three/fiber"
import { motion } from "framer-motion-3d"

function Scene({ isHovered }) {
  return (
    <Canvas>
      <motion.group animate={isHovered ? "hover" : "rest"}>
        <motion.mesh variants={{ hover: { z: 1 } }} />
      </motion.group>
    </Canvas>
  )
}
```

## Supported Values

### Transforms
- `x`, `y`, `z`
- `scale`, `scaleX`, `scaleY`, `scaleZ`
- `rotateX`, `rotateY`, `rotateZ`

### Materials
- `color`
- `opacity`

## Gestures

Works on components with physical presence (like `mesh`):

```jsx
<motion.mesh
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  onHoverStart={() => console.log('hover')}
  onTap={() => console.log('tap')}
/>
```

## Motion Values

Inject via R3F attributes:

```jsx
import { useMotionValue, useTransform } from "framer-motion"
import { motion } from "framer-motion-3d"

function Box() {
  const x = useMotionValue(0)
  const scaleZ = useTransform(x, v => v / 100)

  return (
    <motion.mesh
      position-x={x}
      scale={[1, 1, scaleZ]}
      animate={{ x: 100 }}
    />
  )
}
```

## Layout Animations

Use `LayoutCamera` or `LayoutOrthographicCamera` to correct scale distortion during layout animations.

---

Full docs: https://motion.dev/docs/react-three-fiber
