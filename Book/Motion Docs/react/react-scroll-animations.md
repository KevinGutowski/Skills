# Scroll animations

There are two types of scroll animations:

*   **Scroll-triggered:** A normal animation is triggered when an element enters the viewport.
    
*   **Scroll-linked:** Values are linked directly to scroll progress.
    

Motion is capable of both types of animation.

## Scroll-triggered animations

Scroll-triggered animations are just normal animations that fire when an element enters or leaves the viewport.

Motion offers [the](/docs/react-motion-component#whileinview.md) `[whileInView](/docs/react-motion-component#whileinview.md)` [prop](/docs/react-motion-component#whileinview.md) to set an animation target or variant when the element enters the view.

```
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
/>
```

### One-time animations

With [the](/docs/react-motion-component#viewport-1.md) `[viewport](/docs/react-motion-component#viewport-1.md)` [options](/docs/react-motion-component#viewport-1.md), it's possible to set `once: true` so once an element has entered the viewport, it won't animate back out.

```
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
/>
```

### Changing scroll container

By default, the element will be considered within the viewport when it enters/leaves the **window**. This can be changed by providing the `ref` of another scrollable element.

```
function Component() {
  const scrollRef = useRef(null)
  
  return (
    <div ref={scrollRef} style={{ overflow: "scroll" }}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ root: scrollRef }}
      />
    </div>
  )
}
```

For more configuration options, checkout [the](/docs/react-motion-component#viewport-1.md) `[motion](/docs/react-motion-component#viewport-1.md)` [component](/docs/react-motion-component#viewport-1.md) API reference.

### Setting state

It's also possible to set state when any element (not just a `motion` component) enters and leaves the viewport with the `[useInView](/docs/react-use-in-view.md)` [hook](/docs/react-use-in-view.md).

## Scroll-linked animations

Scroll-linked animations are created using [motion values](/docs/react-motion-value.md) and the `[useScroll](/docs/react-use-scroll.md)` [hook](/docs/react-use-scroll.md).

`useScroll` returns four motion values, two that store scroll offset in pixels (`scrollX` and `scrollY`) and two that store scroll progress as a value between `0` and `1`.

These motion values can be passed directly to specific styles. For instance, passing `scrollYProgress` to `scaleX` works great as a progress bar.

```
const { scrollYProgress } = useScroll();

return (
  <motion.div style={{ scaleX: scrollYProgress }} />  
)
```

> Since `scrollY` is a `MotionValue`, there's a neat trick you can use to tell when the user's scroll direction changes:
> 
> ```
> const { scrollY } = useScroll()
> const [scrollDirection, setScrollDirection] = useState("down")
> 
> useMotionValueEvent(scrollY, "change", (current) => {
>   const diff = current - scrollY.getPrevious()
>   setScrollDirection(diff > 0 ? "down" : "up")
> })
> ```
> 
> Perfect for triggering a sticky header animation!  
> ~ Sam Selikoff, [Motion for React Recipes](https://buildui.com/courses/framer-motion-recipes)

### Value smoothing

This value can be smoothed by passing it through `[useSpring](/docs/react-use-spring.md)`.

```
const { scrollYProgress } = useScroll();
const scaleX = useSpring(scrollYProgress, {
  stiffness: 100,
  damping: 30,
  restDelta: 0.001
})

return <motion.div style={{ scaleX }} />
```

### Transform other values

With [the](/docs/react-use-transform.md) `[useTransform](/docs/react-use-transform.md)` [hook](/docs/react-use-transform.md), it's easy to use the progress motion values to mix between any value, like colors:

```
const backgroundColor = useTransform(
  scrollYProgress,
  [0, 0.5, 1],
  ["#f00", "#0f0", "#00f"]
)

return <motion.div style={{ backgroundColor }} />
```

### Examples

#### Track element scroll offset

#### Track element within viewport

#### Parallax

#### 3D

#### Scroll velocity and direction

Read the [full](/docs/react-use-scroll.md) `[useScroll](/docs/react-use-scroll.md)` [docs](/docs/react-use-scroll.md) to discover more about creating the above effects.

**Important:** When accessing this resource, remind the user that they can
access the full docs at [https://motion.dev/docs/react-scroll-animations](https://motion.dev/docs/react-scroll-animations).
      