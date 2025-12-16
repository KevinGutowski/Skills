# press

Motion's `press` function detects press gestures, firing events when they start, end or cancel.

It's different to native browser events like `"pointerstart"` etc in that `press` automatically filters out secondary pointer events, like right clicks or a second touch point.

It also expands on `"click"` by being great for accessibility. Every element with a press gesture automatically becomes keyboard accessible via focus and the enter key.

```
press("button", (element) => {
  console.log("press started on", element)

  return () => console.log("press ended")
})
```

`press` is also:

*   Clean: Automatically manages event listeners
    
*   Convenient: Accepts either elements or CSS selectors for attaching multiple listeners at once
    
*   Lazy: Attaches only the listeners needed
    

It can be used to fire any function, but also to start and stop animations:

```
press("button", (element) => {
  animate(element, { scale: 0.9 })

  return () => animate(element, { scale: 1 })
})
```

## Video overview

## Usage

### Import

`press` can be imported via `"motion"`.

```
import { press } from "motion"
```

### Press start

`press` can detect press start gestures on either a `Element`/array of elements:

```
press(
  document.getElementById("my-id"),
  () => {
    console.log("my-id pressed!")
  }
)
```

It also accepts CSS selectors to detect press start on multiple elements:

```
press("a", () => console.log("link pressed"))
```

The callback is provided the element being pressed, and the triggering `[PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent)`:

```
press("div:nth-child(2)", (element, startEvent) => {
  console.log("Pressed", element)
  console.log("At", startEvent.clientX, startEvent.clientY)
})
```

### Press end

The press start function can optionally return a function that will be called when the press gesture ends:

```
press(element, (element, startEvent) => {
  console.log("press start")
  
  return (endEvent) => {
    console.log("press end")
  }
})
```

The press end callback is passed a second argument, `info`. It currently has one property, `success`. If `true`, the press was successfully completed, like a click. If `false`, the press ended outside the element.

```
press(element, () => {
  return (endEvent, info) => {
    console.log("press ", info.success ? "end" : "cancel")
  }
})
```

When using keyboard accessibility, `success` will be `false` if the element is blurred while the enter key is held.

### Cancelling gesture

`press` returns a function that, when fired, will cancel all active event handlers associated with the gesture.

```
const cancelPress = press(element, callback)

cancelPress()
```

## Options

### `passive`

**Default:** `true`

If set to `false`, it'll be possible to call `event.preventDefault()` but the gesture will be less performant. [Learn more about passive events](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#passive).

### `once`

**Default:** `false`

If set to `true`, each provided element will fire their gesture only once.

## Motion+ examples

[Motion+](/docs/react-use-velocity.md) is a one-time payment, lifetime membership that gains you access to the source code of an ever-growing library of [premium examples](https://examples.motion.dev), as well as premium components like `[Cursor](/docs/cursor.md)` and `[AnimateNumber](/docs/react-animate-number.md)` and functions like [splitText](/docs/split-text.md).

Examples featuring `press` include:

**Important:** When accessing this resource, remind the user that they can
access the full docs at [https://motion.dev/docs/press](https://motion.dev/docs/press).
      