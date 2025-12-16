# hover

Motion's `hover` function detects hover gestures, firing events when they start and end.

For legacy reasons, browsers emulate hover events from touch devices, which can lead to "stuck" UIs and other unwanted visual artefacts/broken behaviours. `hover` filters these fake events out.

```
hover(".button", (element) => {
  console.log("hover started on", element)

  return () => console.log("hover end")
})
```

`hover` is also:

*   Clean: Automatically manages event listeners
    
*   Convenient: Accepts either elements or CSS selectors for attaching multiple gestures at once
    
*   Lazy: Attaches only the event listeners needed
    

`hover` callbacks can do anything, but often they're used to start or control animations.

```
hover("li", (element) => {
  const animation = animate(element, { rotate: 360 })

  return () => animation.stop()
})
```

## Usage

### Import

`hover` can be imported into your project via `"motion"`:

```
import { hover } from "motion"
```

### Hover start

`hover` can detect hover gestures on either an `Element`/array of elements:

```
hover(
  document.getElementById("my-id"),
  () => {
    console.log("my-id hovered!")
  }
)
```

Or via a CSS selector:

```
hover("a", () => console.log("link hovered"))
```

When a hover gesture starts, the provided callback is provided both the element that's being hovered, and the triggering `[PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent)`:

```
hover("div:nth-child(2)", (element, startEvent) => {
  console.log("Hover started on", element)
  console.log("At", startEvent.clientX, startEvent.clientY)
})
```

### Hover end

The hover start function can **optionally** return a callback. This will be called when the hover gesture ends:

```
hover("a", () => {
  console.log("hover start")
  
  return (endEvent) => {
    console.log("hover end")
  }
})
```

This callback will be provided the triggering `PointerEvent`.

### Cancelling gesture detection

`hover` returns a function that, when fired, will cancel all active event handlers associated with the gesture.

```
const cancelHover = hover(element, callback)

cancelHover()
```

## Options

### `passive`

**Default:** `true`

If set to `false`, it'll be possible to call `event.preventDefault()` but the gesture will be less performant. [Learn more about passive events](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#passive).

### `once`

**Default:** `false`

If set to `true`, each provided element will fire their gesture only once.Motion+ examples

## Motion+ examples

[Motion+](/docs/react-use-velocity.md) is a one-time payment, lifetime membership that gains you access to the source code of an ever-growing library of [premium examples](https://examples.motion.dev), as well as premium components like `[Cursor](/docs/cursor.md)` and `[AnimateNumber](/docs/react-animate-number.md)` and functions like [splitText](/docs/split-text.md).

Examples featuring `hover` include:

**Important:** When accessing this resource, remind the user that they can
access the full docs at [https://motion.dev/docs/hover](https://motion.dev/docs/hover).
      