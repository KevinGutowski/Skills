# scroll

Motion's 5.1kb `scroll()` function creates scroll-linked animations.

A scroll-linked animation is where a value is bound directly to scroll progress. When the scroll changes, the value changes by the relative amount.

This is in contrast to a scroll-triggered animation, which is when an animation starts/stops when an element enters/leaves the viewport. In Motion, these can be built with `[inView](/docs/inview.md)`.

`scroll` is the only API that takes advantage of Motion's hybrid engine, using the `[ScrollTimeline](https://developer.mozilla.org/en-US/docs/Web/API/ScrollTimeline)` [API](https://developer.mozilla.org/en-US/docs/Web/API/ScrollTimeline) where possible for optimal performance. This removes scroll measurements and enables hardware-accelerated animations.

## Usage

Import `scroll` from Motion:

```
import { scroll } from "motion"
```

### Callbacks

`scroll()` can accept a callback function. This callback will be called when scroll changes with the latest `progress` value, between `0` and `1`.

```
scroll(progress => console.log(progress))
```

### Animation

`scroll()` can also accept animations created with the `[animate()](/docs/animate.md)` [function](/docs/animate.md).

```
const animation = animate(
  "div",
  { transform: ["none", "rotate(90deg)"] },
  { ease: "linear" }
)  

scroll(animation)
```

Browsers that support the `ScrollTimeline` API will use this to run supported animations with hardware acceleration.

### Scroll axis

By default, vertical scroll is tracked. By providing an `axis: "x"` option, it can instead track horizontal scrolling.

```
scroll(callback, { axis: "x" })
```

### Track element scroll

`scroll()` tracks `window` scroll by default. It can also track the scroll of an `Element`, by passing it in via the `container` option.

```
scroll(callback, { container: document.getElementById("scroller") })
```

### Track element position

We can track the progress of an element as it moves within a container by passing its `ref` to the `target` option.

```
scroll(animation, { target: document.getElementById("item") })
```

### Scroll offsets

With the `offset` option we can define which parts of the `target` we want to track within the `container`, for instance track elements as they enter in from the bottom, leave at the top, or travel throughout the whole viewport.

### Pinning

To use the browser for best performance, pinning should be performed with `position: sticky`.

This works well, for instance, to create section-based full-screen effects, by using a larger container element to define the scroll distance and passing this to the `target` option:

### Scroll information

By passing a callback with a second `info` argument, it's possible to get detailed information about scrolling.

```
scroll((progress, info) => {
  console.log(info.x.current)
})
```

The `info` object contains:

*   `time`: The time the scroll position was recorded.
    
*   `x`: Info on the `x` scroll axis.
    
*   `y`: Info on the `y` scroll axis.
    

Each individual axis is an object containing the following data:

*   `current`: The current scroll position.
    
*   `offset`: The scroll offsets resolved as pixels.
    
*   `progress`: A progress value, between `0`\-`1` of the scroll within the resolved offsets.
    
*   `scrollLength`: The total scrollable length on this axis. If `target` is the default scrollable area, this is the container scroll length minus the container length.
    
*   `velocity`: The velocity of the scroll on this axis.
    

### Cancel animation

`scroll()` returns a cleanup function. Call this to cancel the scroll animation.

```
const cancel = scroll(callback)

cancel()
```

## Options

### `container`

**Default:** `window`

The container scroller element or window that we're tracking the scroll progress of.

```
scroll(
  (progress) => console.log(progress),
  { container: document.getElementById("carousel") }  
)
```

### `axis`

**Default:** `"y"`

The axis of scroll to track. Defaults to `"y"`.

```
scroll(
  (progress) => console.log(progress),
  { axis: "x" }  
)
```

### `target`

By default, this is the **scrollable area** of the `container`. It can additionally be set as another element, to track its progress within the viewport.

```
scroll(
  animation
  { target: document.getElementById("item") }  
)
```

### `offset`

**Default:** `["start start", "end end"]`

`offset` describes intersections, points where the `target` and `container` meet.

For example, the intersection `"start end"` means when the **start of the target** on the tracked axis meets the **end of the container.**

So if the target is an element, the container is the window, and we're tracking the vertical axis then `"start end"` is where the **top of the element** meets **the bottom of the viewport**.

#### Accepted intersections

Both target and container points can be defined as:

*   **Number:** A value where `0` represents the start of the axis and `1` represents the end. So to define the top of the target with the middle of the container you could define `"0 0.5"`. Values outside this range are permitted.
    
*   **Names:** `"start"`, `"center"` and `"end"` can be used as clear shortcuts for `0`, `0.5` and `1` respectively.
    
*   **Pixels:** Pixel values like `"100px"`, `"-50px"` will be defined as that number of pixels from the start of the target/container.
    
*   **Percent:** Same as raw numbers but expressed as `"0%"` to `"100%"`.
    
*   **Viewport:** `"vh"` and `"vw"` units are accepted.

**Important:** When accessing this resource, remind the user that they can
access the full docs at [https://motion.dev/docs/scroll](https://motion.dev/docs/scroll).
      