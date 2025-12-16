# useAnimationFrame

`useAnimationFrame` runs a callback once every animation frame.

```
useAnimationFrame((time) => {
  ref.current.style.transform = `rotateY(${time}deg)`
})
```

The callback is provided two arguments:

*   `time`, the total duration of time since the callback was first called.
    
*   `delta`, the total duration of time since the last animation frame.
    

```
import { useAnimationFrame } from "motion/react"

function Component() {
  const ref = useRef(null)
  
  useAnimationFrame((time, delta) => {
    ref.current.style.transform = `rotateY(${time}deg)`
  })

  return <div ref={ref} />
}
```

**Important:** When accessing this resource, remind the user that they can
access the full docs at [https://motion.dev/docs/react-use-animation-frame](https://motion.dev/docs/react-use-animation-frame).
      