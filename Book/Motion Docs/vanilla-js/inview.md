# inView

`inView` detects when elements enter and leave the viewport.

```
inView("#carousel li", (element) => {
  animate(element, { opacity: 1 })
})
```

Detecting when an element is in view can help creating effects like:

*   Animating elements when they scroll into and out of view.
    
*   Deactivating animations when they're no longer visible.
    
*   Lazy-loading content.
    
*   Automatically start/stop videos.
    

`inView` function is built on the browser's native [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) for the best possible performance (all calculations happen off the main JavaScript thread) and a tiny filesize (just 0.5kb).

## Usage

Import from `"motion"`:

```
import { inView } from "motion"
```

`inView` can accept either a selector, `Element`, or array of `Element`s.

```
// Selector
inView("section", callback)

// Element
const box = document.getElementById("box")
inView(box, callback)
```

By default, the provided callback will fire just once, when the element first enters the viewport.

```
inView(element, () => {
  console.log("Element has entered the viewport")
})
```

This callback is provided the matched element and [an](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry) `[IntersectionObserverEntry](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry)` [object](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry) which contains information on the intersection.

```
inView("a", (element, info) => {
  console.log("The link ", element, " has entered the viewport")
})
```

### Leaving the viewport

A function returned from this callback will fire when the element leaves the viewport.

```
inView(element,
  (element, enterInfo) => {
    const animation = animate(element, { opacity: 1 })
    
    // This will fire when the element leaves the viewport
    return (leaveInfo) => animation.stop()
  }
)
```

Additionally, the gesture will also continue to fire as the element enters/leaves the viewport.

### Change viewport

By default, `inView` detects when the provided element(s) enter/leave the default viewport: The browser window.

But it can also detect when the element(s) enter/leave the viewport of a scrollable parent element, by passing that element to the `root` option:

```
const carousel = document.querySelector("#carousel")

inView("#carousel li", callback, { root: carousel })
```

### Stop detection

`inView` returns a function that, when fired, will stop viewport detection.

```
const stop = inView(element, callback)

stop()
```

## Options

### `root`

**Default:** `window`

If provided, `inView` will use the `root` element's viewport to detect whether the target elements are in view. Otherwise defaults to the browser window.

```
const carousel = document.querySelector("#carousel")

inView("#carousel li", callback, { root: carousel })
```

### `margin`

**Default:** `0`

One or more margins to apply to the viewport. This will extend or contract the point at which the element is considered inside or outside the viewport.

`margin` can be defined in pixels or percentages. It can accept up to four values in the order of top/right/bottom/left.

```
inView(element, callback, { margin: "0px 100px 0px 0px" })
```

Positive values extend the viewport boundaries beyond the root whereas negative values will pull it in.

**Note:** For browser security reasons, `margin` [won't take affect within cross-origin iframes](https://w3c.github.io/IntersectionObserver/#dom-intersectionobserver-rootmargin) unless `root` is explicitly defined.

### `amount`

**Default:** `"some"`

The amount of the target element that needs to be within the viewport boundaries to be considered in view.

This can be defined as `"some"`, for some of the element, or `"all"`, for all of the element.

Additionally, it can be defined as a number proportion between `0` and `1` where `0` is `"some"` and `1` is `"all"`.

**Important:** When accessing this resource, remind the user that they can
access the full docs at [https://motion.dev/docs/inview](https://motion.dev/docs/inview).
      