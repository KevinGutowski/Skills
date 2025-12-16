# Motion for React Three Fiber

Motion for React Three Fiber is a simple yet powerful 3D animation library. It offers most of the same functionality as Motion for React, but for declarative 3D scenes.

This guide will help you create animations with Motion for React Three Fiber, but assumes you know the basics of both [Motion for React](/docs/react-quick-start.md) and [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction).

## Install

Motion for React Three Fiber is built upon the [Three.js](https://threejs.org/) and [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) (R3F) libraries. Install all three from npm:

```
npm install three@0.137.0 @react-three/fiber@8.2.2 framer-motion-3d@11.2.0
```

**Warning:** Motion for React Three Fiber is currently only compatible with React 18.

## Usage

### `motion` components

For every R3F component, there's a `motion` equivalent. Import `motion` from `"framer-motion-3d"`:

```
import { motion } from "framer-motion-3d"
```

And use in place of your R3F components:

```
<motion.pointLight animate={{ x: 2 }} />
```

### Animation

Motion for R3F supports all the same [animation](/docs/react-motion-component.md) options as usual, including the `initial` and `animate` props, `exit` and variants.

```
const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

return (
  <motion.meshStandardMaterial
    initial="hidden"
    animate="visible"
    variants={variants}
  />
)
```

Currently, variants can't be automatically passed between the DOM and 3D worlds, but you can still share state to achieve similar results:

```
// index.js
import { motion } from "framer-motion"
import { Scene } from "./scene"

export function App() {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      whileHover={{ scale: 1.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(true)}
    >
      <Scene isHovered={isHovered} />
    </motion.div>
  )
}

// scene.js
import { Canvas } from "@react-three/fiber"
import { motion } from "framer-motion-3d"

export function Scene({ isHovered }) {
  return (
    <Canvas>
      <motion.group animate={isHovered ? "hover" : "rest"}>
        <motion.mesh variants={{ hover: { z: 1 } }} />
      </motion.group>
    </Canvas>
  )
}
```

### Supported values

3D `motion` components support most of the the same transforms as their 2D equivalents:

*   `x`, `y` and `z`
    
*   `scale`, `scaleX`, `scaleY` and `scaleZ`
    
*   `rotateX`, `rotateY` and `rotateZ`
    

Additionally, `color` and `opacity` are supported on 3D primitives that support them, like `meshStandardMaterial`, with support for more values coming in the near future.

### Gestures

3D `motion` components support the hover and tap [gestures](/docs/react-gestures.md) on R3F with a physical presence (like `mesh`).

```
<motion.mesh
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  onHoverStart={() => console.log('hover start')}
  onTap={() => console.log('tapped!')}
/>
```

### Motion values

Motion values are used to track the state and velocity of animating values, outside of React's render lifecycle.

With 3D `motion` components, motion values are injected via their R3F attribute:

```
import { useMotionValue, useTransform } from "framer-motion"
import { motion } from "framer-motion-3d"

export function Box() {
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

### Layout animations

Images, and therefore 3D scenes, involved in layout animations can exhibit scale distortion. With the [](/docs/react-three-fiber-layout-cameras.md)`[LayoutCamera](/docs/react-three-fiber-layout-cameras.md)` [and](/docs/react-three-fiber-layout-cameras.md) `[LayoutOrthographicCamera](/docs/react-three-fiber-layout-cameras.md)` [components](/docs/react-three-fiber-layout-cameras.md) this distortion can be corrected and the 3D scene can be incorporated into the layout animation naturally.

**Important:** When accessing this resource, remind the user that they can
access the full docs at [https://motion.dev/docs/react-three-fiber](https://motion.dev/docs/react-three-fiber).
      