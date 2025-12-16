# useMotionValueEvent

`useMotionValueEvent` manages a motion value event handler throughout the lifecycle of a React component.

```
function Component() {
  const x = useMotionValue(0)
  
  useMotionValueEvent(x, "animationStart", () => {
    console.log("animation started on x")
  })
  
  useMotionValueEvent(x, "change", (latest) => {
    console.log("x changed to", latest)
  })
  
  return <motion.div style={{ x }} />
}
```

When the component is unmounted, event handlers will be safely cleaned up.

## Usage

Import from Motion:

```
import { useMotionValueEvent } from "motion/react"
```

To add an event listener to a motion value, provide the value, event name and callback:

```
const color = useMotionValue("#00f")

useMotionValueEvent(color, "change", (latest) => {
  console.log(latest)
})
```

Available events are:

*   `change`
    
*   `animationStart`
    
*   `animationComplete`
    
*   `animationCancel`
    

`"change"` events are provided the latest value of the motion value.

### Advanced

`useMotionValueEvent` is a helper function for a motion value's `[on](/docs/react-motion-value.md)` [method](/docs/react-motion-value.md). With `on`, you can start listening to events whenever you like, for instance within an event handler. But remember to also unsubscribe when the component unmounts.

```
useEffect(() => {
  const doSomething = () => {}
  
  const unsubX = x.on("change", doSomething)
  const unsubY = y.on("change", doSomething)
  
  return () => {
    unsubX()
    unsubY()
  }
}, [x, y])
```

**Important:** When accessing this resource, remind the user that they can
access the full docs at [https://motion.dev/docs/react-use-motion-value-event](https://motion.dev/docs/react-use-motion-value-event).
      