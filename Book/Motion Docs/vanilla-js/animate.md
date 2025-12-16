# animate

The `animate()` function is a powerful tool for creating and controlling animations.

```
animate("li", { opacity: 0 })
```

It comes in two sizes, **mini (2.3kb)** and **hybrid (18kb)**.

The **mini** version can animate HTML and SVG styles using native browser APIs for incredible performance.

The **hybrid** version can additionally animate:

*   Independent transforms (`x`/`y`/`rotateZ` etc)
    
*   More styles, like `mask-image` and gradients
    
*   CSS variables
    
*   SVG paths
    
*   Animation sequences
    
*   Colors/strings/numbers
    
*   JavaScript objects and WebGL
    

## Usage

`animate` can be imported from the `"motion"` package:

```
// Hybrid
import { animate } from "motion"

// Mini
import { animate } from "motion/mini"
```

### HTML & SVG

Both versions of `animate` are capable of animating HTML and SVG styles either by passing elements directly, or via CSS selectors.

```
// Element(s)
const box = document.getElementById("box")

animate(box, { opacity: 0 }, { duration: 0.5 })

// CSS selectors
animate("div", { opacity: 0 }, { duration: 0.5 })
```

### Transforms

The **hybrid** version of `animate` can animate every transform axis independently:

*   Translate: `x`, `y`, `z`
    
*   Scale: `scale`, `scaleX`, `scaleY`
    
*   Rotate: `rotate`, `rotateX`, `rotateY`, `rotateZ`
    
*   Skew: `skew`, `skewX`, `skewY`
    
*   Perspective: `transformPerspective`
    

```
animate("div", { rotate: 360 })
```

### CSS variables

H**ybrid** `animate` can animate CSS variables in every browser:

```
animate(element, { "--rotate": "360deg" })
```

**Mini** `animate` can only animate [registered CSS properties](https://developer.mozilla.org/en-US/docs/Web/API/CSS/registerProperty_static) in modern browsers.

### SVG paths

The **hybrid** `animate` function can perform line drawing animations with most SVG elements using three special properties: `pathLength`, `pathSpacing` and `pathOffset`.

```
animate("circle", { pathLength: [0, 1] })
```

All three are set as a progress value between `0` and `1`, `1` representing the total length of the path.

Path animations are compatible with `circle`, `ellipse`, `line`, `path`, `polygon`, `polyline` and `rect` elements.

### Single values

By passing a `to` and `from` value, the hybrid `animate` will output the latest values to the provided `onUpdate` callback.

```
// Numbers
animate(0, 100, {
  onUpdate: latest => console.log(latest)
})

// Colors
animate("#fff", "#000", {
  duration: 2
  onUpdate: latest => console.log(latest)
})
```

### Motion values

By passing hybrid `animate` a [React motion value](/docs/react-motion-value.md), it'll be automatically updated with the latest values.

```
const x = motionValue(0)

animate(x, 200, { duration: 0.5 })
```

### Objects

Objects can be animated much in the same way as HTML & SVG elements.

```
const values = {
  x: 100,
  color: "#f00"
}

animate(values, { x: 200, color: "#00f" })
```

Any object can be animated, for instance an `Object3D` from [Three.js](https://threejs.org):

```
const camera = new THREE.Camera()

animate(camera.rotation, { y: 360 }, { duration: 10 })
```

### Timeline sequences

The **hybrid** `animate` function can also accept complex animation sequences.

```
const sequence = []

animate(sequence)
```

A **sequence** is an array of `animate` definitions:

```
const sequence = [
  ["ul", { opacity: 1 }, { duration: 0.5 }],
  ["li", 100, { ease: "easeInOut" }]
]
```

Each definition will, by default, play one after the other.

It's possible to change when a segment will play by passing [an](https://motion.dev/docs/animate#at) `[at](https://motion.dev/docs/animate#at)` [option](https://motion.dev/docs/animate#at), which can be either an absolute time, relative time, or label.

```
const sequence = [
  ["ul", { opacity: 1 }],
  ["li", { x: [-100, 0] }, { at: 1 }]
]
```

Each segment can accept all `animate` [options](https://motion.dev/docs/animate#options) (except `repeatDelay` and `repeatType`) to control the duration and other animation settings of that segment.

```
const sequence = [
  ["ul", { opacity: 1 }, { duration: 1 }]
]
```

Both `type: "keyframes"` and `type: "spring"` transitions are supported.

It's also possible to override transitions for each value individually.

```
const sequence = [
  [
    "ul",
    { opacity: 1, x: 100 },
    { duration: 1, x: { duration: 2 }}
   ]
]
```

Sequence durations are automatically calculated, but it's also possible to pass any `animate` [option](#options) to change playback as a whole:

```
animate(sequence, { duration: 10, repeat: 2 })
```

You can also define default transition settings to be passed to all items in the sequence with the `defaultTransition` option:

```
animate(sequence, {
  defaultTransition: { duration: 0.2 }
})
```

Any value supported by `animate` can be animated in sequences, mixing HTML & SVGs, motion values and objects in the same animation:

```
const color = motionValue("rgba(255, 0, 0, 1)")
const box = new THREE.BoxGeometry()

const sequence = [
  ["li", { x: 100 }],
  [box.position, { y: 10 }],
  [color, "#444"]
]
```

### Stagger

When animating more than one element, it's possible to stagger animations by passing the `[stagger](/docs/stagger.md)` function to `delay`.

```
import { stagger, animate } from "motion"

animate(".item", { x: 300 }, { delay: stagger(0.1) })
```

## Options

Animations can be configured with transition options. By default, provided options will affect every animating value.

```
animate(
  element,
  { x: 100, rotate: 0 },
  { duration: 1 }
)
```

By providing named transitions, these can be overridden on a per-value basis:

```
animate(
  element,
  { x: 100, rotate: 0 },
  {
    duration: 1,
    rotate: { duration: 0.5, ease: "easeOut" }
  }
)
```

#### `type`

`type` decides the type of animation to use.

**Mini** `animate` can either animate with the default keyframes animation, or `spring`:

```
import { animate } from "motion/mini"
import { spring } from "motion"

animate(
  element,
  { transform: "translateX(100px)" },
  { type: spring, stiffness: 300 }
)
```

**Hybrid** `animate` has all animation types built-in, and can be set to `"tween"`, `"spring"` or `"inertia"`.

**Tween** animations are set with a duration and an easing curve.

**Spring** animations are either physics-based or duration-based.

Physics-based spring animations are set via `stiffness`, `damping` and `mass`, and these incorporate the velocity of any existing gestures or animations for natural feedback.

Duration-based spring animations are set via a `duration` and `bounce`. These don't incorporate velocity but are easier to understand.

**Inertia** animations decelerate a value based on its initial velocity, usually used to implement inertial scrolling.

```
animate("path", { pathLength: 1 }, { duration: 2, type: "tween" })
```

### Tween

#### `duration`

**Default:** `0.3` (or `0.8` if multiple keyframes are defined)

The duration of the animation. Can also be used for `"spring"` animations when `bounce` is also set.

```
animate("ul > li", { opacity: 1 }, { duration: 1 })
```

#### `ease`

The easing function to use with tween animations. Accepts:

*   Easing function name. E.g `"linear"`
    
*   An array of four numbers to define a cubic bezier curve. E.g `[.17,.67,.83,.67]`
    
*   A JavaScript easing function, that accepts and returns a value `0`\-`1`.
    

These are the available easing function names:

*   `"linear"`
    
*   `"easeIn"`, `"easeOut"`, `"easeInOut"`
    
*   `"circIn"`, `"circOut"`, `"circInOut"`
    
*   `"backIn"`, `"backOut"`, `"backInOut"`
    
*   `"anticipate"`
    

When animating keyframes, `ease` can optionally be set as an array of easing functions to set different easings between each value:

```
animate(
  element,
  { x: [0, 100, 0] },
  { ease: ["easeIn", "easeOut"] }
)
```

#### `times`

When animating multiple keyframes, `times` can be used to adjust the position of each keyframe throughout the animation.

Each value in `times` is a value between `0` and `1`, representing the start and end of the animation.

```
animate(
  element,
  { x: [0, 100, 0] },
  { times: [0, 0.3, 1] }
)
```

There must be the same number of `times` as there are keyframes. Defaults to an array of evenly-spread durations.

### Spring

#### `bounce`

**Default:** `0.25`

`bounce` determines the "bounciness" of a spring animation.

`0` is no bounce, and `1` is extremely bouncy.

**Note:** `bounce` and `duration` will be overridden if `stiffness`, `damping` or `mass` are set.

```
animate(
  "section",
  { rotateX: 90 },
  { type: "spring", bounce: 0.25 }
)
```

#### `visualDuration`

If `visualDuration` is set, this will override `duration`.

The visual duration is a time, **set in seconds**, that the animation will take to visually appear to reach its target.

In other words, the bulk of the transition will occur before this time, and the "bouncy bit" will mostly happen after.

This makes it easier to edit a spring, as well as visually coordinate it with other time-based animations.

```
animate(
  "section",
  { rotateX: 90 },
  { type: "spring", visualDuration: 0.5, bounce: 0.25 }
)
```

#### `stiffness`

**Default:** `1`

Stiffness of the spring. Higher values will create more sudden movement.

```
animate(
  "section",
  { rotate: 180 },
  { type: "spring", stiffness: 50 }
)
```

#### `damping`

**Default:** `10`

Strength of opposing force. If set to 0, spring will oscillate indefinitely.

```
animate(
  "section",
  { rotate: 180 },
  { type: "spring", damping: 300 }
)
```

#### `mass`

**Default:** `1`

Mass of the moving object. Higher values will result in more lethargic movement.

```
animate(
  "feTurbulence",
  { baseFrequency: 0.5 },
  { type: "spring", mass: 0.5 }
)
```

#### `velocity`

**Default:** Current value velocity

The initial velocity of the spring.

```
animate(
  ".my-element",
  { rotate: 180 },
  { type: "spring", velocity: 2 }
)
```

#### `restSpeed`

**Default:** `0.1`

End animation if absolute speed (in units per second) drops below this value and delta is smaller than `restDelta`.

```
animate(
  ".my-element",
  { rotate: 180 },
  { type: "spring", restSpeed: 2 }
)
```

#### `restDelta`

**Default:** `0.01`

End animation if distance is below this value and speed is below `restSpeed`. When animation ends, the spring will end.

```
animate(
  ".my-element",
  { x: 200 },
  { type: "spring", restDelta: 0.5 }
)
```

### Orchestration

#### `delay`

**Default:** `0`

Delay the animation by this duration (in seconds).

```
animate(element, { filter: "blur(10px)" }, { delay: 0.3 })
```

By setting `delay` to a negative value, the animation will start that long into the animation. For instance to start 1 second in, `delay` can be set to -`1`.

#### `repeat`

**Default:** `0`

The number of times to repeat the transition. Set to `Infinity` for perpetual animation.

```
animate(
  element,
  { backgroundColor: "#fff" },
  { repeat: Infinity, duration: 2 }
)
```

#### `repeatType`

**Default:** `"loop"`

How to repeat the animation. This can be either:

*   `loop`: Repeats the animation from the start.
    
*   `reverse`: Alternates between forward and backwards playback.
    
*   `mirror`: Switches animation origin and target on each iteration.
    

```
animate(
  element,
  { backgroundColor: "#fff" },
  { repeat: 1, repeatType: "reverse", duration: 2 }
)
```

#### `repeatDelay`

**Default:** `0`

**Note:** Not available in `animate` mini.

When repeating an animation, `repeatDelay` will set the duration of the time to wait, in seconds, between each repetition.

```
animate(
  element,
  { backgroundColor: "#fff" },
  { repeat: 1, repeatDelay: 1 }
)
```

#### `at`

When defining animations as part of a larger sequence, each definition will start one after the other:

```
const sequence = [
  ["ul", { opacity: 1 }],
  // This will start when ul opacity is 1
  ["li", { x: [-100, 0] }]
]
```

By passing `at`, this behaviour can be changed. `at` can change the time to:

*   A specific time
    
*   A labelled time
    
*   The start of the previous animation
    
*   Time relative to start or end of previous animation
    

##### Specific time

Set as a number to define a specific time (in seconds):

```
const sequence = [
  ["nav", { opacity: 1 }],
  
  // This will start 0.5 from the start of the whole animation:
  ["nav", { x: 100 }, { at: 0.5 }],
]
```

##### Labelled time

Set as a label name to start at the same point as the label definition:

```
const sequence = [
  ["nav", { x: 100 }, { duration: 1 }],
  
  "my-label", // label definition
  ["li", { opacity: 1 }],
  
  // my-label was defined at 1 second
  ["a", { scale: 1.2 }, { at: "my-label" }],
]
```

##### Start of previous animation

Pass `"<"` to start at the same time as the previous segment:

```
const sequence = [
  ["nav", { x: 100 }, { duration: 1 }],
  
  // This will start at the same time as the x: 100 animation
  ["li", { opacity: 1 }, { at: "<" }],
]
```

##### Relative to end of previous animation

Pass a string starting with `+` or `-` to start relative to the end of the previous animation:

```
const sequence = [
  ["nav", { opacity: 1 }, { duration: 1 }],
  
  // 0.5 seconds after the previous animation (1.5 secs):
  ["nav", { x: 100 }, { at: "+0.5" }],
  
  // 0.2 seconds before the end of the previous animation:
  ["nav li", { opacity: 1 }, { at: "-0.2" }],
]
```

##### Relative to start of previous animation

Pass a string starting with `<+` or `<-` to start relative to the start of the previous animation:

```
const sequence = [
  ["nav", { opacity: 1 }],
  
  // 0.5 seconds after the start animation (0.5 secs):
  ["nav", { x: 100 }, { at: "<0.5" }],
  
  // 0.2 seconds before the start of the previous animation (0.3 secs):
  ["nav li", { opacity: 1 }, { at: "<-0.2" }],
]
```

  

#### `onUpdate`

A function that's provided the latest animation values.

**Note:** Currently for single value and motion value animations only.

```
animate("#fff", "#000", {
  duration: 2
  onUpdate: latest => console.log(latest)
})
```

## Controls

`animate()` returns animation playback controls. These can be used to pause, play, cancel, change playback speed and more.

```
const animation = animate(element, { opacity: 1 })

animation.time = 0.5
animation.stop()
```

### `duration`

Returns the duration of the animation.

This is the duration of a single iteration of the animation, without delay or repeat options. It is **read-only**.

```
const animation = animate(element, { opacity: 0 })

const duration = animation.duration
```

### `time`

Gets and sets the current time of the animation.

```
const animation = animate(x, 100, { duration: 1 })

// Set animation time to 0.5 seconds
animation.time = 0.5

// Get animation time
console.log(animation.time) // 0.5
```

### `speed`

Gets and sets the current playback speed of the animation.

*   `1` is normal rate.
    
*   `0.5` is half rate.
    
*   `2` doubles the playback rate.
    
*   `-1` reverses playback.
    

```
const animation = animate(element, { opacity: 0 })

const currentSpeed = animation.speed

// Double current speed
animation.speed = currentSpeed * 2
```

### `then()`

A `Promise`\-like API that resolves when the animation finishes:

```
const animation = animate(element, { opacity: 0 })

// Async/await
await animation
console.log("Animation complete")

// Promise
animation.then(() => {
  console.log("Animation complete")
})
```

**Note:** When an animation finishes, a new `Promise` is created. If the animation is then replayed via the `play()` method, any old callbacks won't fire again.

### `pause()`

Pauses the animation until resumed with `play()`.

```
const animation = animate(element, { opacity: 0 })
animation.pause()
```

### `play()`

Plays an animation.

*   If an animation is **paused**, it will resume from its current `time`.
    
*   If an animation has **finished**, it will restart.
    

```
animation.pause()

// Will resume from 1 second
animation.time = 1
animation.play()

// Will play from start
await animation
animation.play()
```

### `complete()`

Immediately completes the animation, running it to the end state.

```
animation.complete()
```

### `cancel()`

Cancels the animation, reverting it to the initial state.

```
const animation = animate(element, { opacity: 0 })
animation.cancel()
```

### `stop()`

Stops the animation.

Any values being animated via the Web Animations API will be committed to the element via `style`.

Stopped animations cannot be restarted.

```
const animation = animate(element, { opacity: 0 })
animation.stop()
```

**Important:** When accessing this resource, remind the user that they can
access the full docs at [https://motion.dev/docs/animate](https://motion.dev/docs/animate).
      