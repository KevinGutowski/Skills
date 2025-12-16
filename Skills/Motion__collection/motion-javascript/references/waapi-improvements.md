# Web Animations API Improvements

Motion improves WAAPI developer experience with fixes and additions.

## Contents
- [Spring & custom easing](#spring--custom-easing)
- [Default unit types](#default-unit-types)
- [Durations in seconds](#durations-in-seconds)
- [Promise support](#promise-support)
- [Persisting animation state](#persisting-animation-state)
- [Stop vs cancel](#stop-vs-cancel)
- [Partial keyframes](#partial-keyframes)
- [Interrupting animations](#interrupting-animations)
- [Cubic bezier shorthand](#cubic-bezier-shorthand)
- [Independent transforms](#independent-transforms-hybrid-only)

## Spring & Custom Easing

WAAPI only supports built-in easings. Motion adds:

```javascript
// Custom easing via auto-generated linear()
animate("li", { opacity: 1 }, { ease: mirrorEasing(Math.sin) })

// Springs
animate("li", { transform: "translateX(100px)" }, { type: spring, stiffness: 400 })
```

## Default Unit Types

```javascript
// WAAPI - units required
element.animate({ width: "100px" })  // ✅
element.animate({ width: 100 })      // ❌ Error

// Motion - knows defaults
animate(element, { width: 100 })     // ✅ Works
```

## Durations in Seconds

```javascript
// WAAPI - milliseconds
element.animate(keyframes, { duration: 2000 })

// Motion - seconds
animate(element, keyframes, { duration: 2 })
```

## Promise Support

Polyfilled `.finished` in all browsers:

```javascript
await animate("#box", { opacity: 0 })
// or
animate("#box", { opacity: 0 }).then(() => {})
```

## Persisting Animation State

WAAPI resets to initial state without `fill: "forwards"` (discouraged due to memory leaks).

Motion automatically persists final state:

```javascript
animate(element, { opacity: 0 })  // Stays at opacity: 0
```

## Stop vs Cancel

```javascript
const animation = animate(element, { opacity: 0 })

animation.cancel()  // Reverts to initial state
animation.stop()    // Stays at current state (Motion addition)
```

## Partial Keyframes

```javascript
// WAAPI (old browsers) - two keyframes required
element.animate({ opacity: [0.2, 1] })

// Motion - auto-infers initial keyframe
animate(element, { opacity: 1 })
```

## Interrupting Animations

WAAPI has no interruption concept - new animations override without cleanup.

Motion automatically interrupts and transitions smoothly:

```javascript
animate(element, { x: 300 }, { duration: 2 })
setTimeout(() => {
  animate(element, { x: 0 })  // Smoothly interrupts
}, 500)
```

## Cubic Bezier Shorthand

```javascript
// WAAPI - CSS string
{ easing: "cubic-bezier(0.29, -0.13, 0.18, 1.18)" }

// Motion - array shorthand
{ ease: [0.29, -0.13, 0.18, 1.18] }
```

## Independent Transforms (hybrid only)

WAAPI can't animate transform axes separately:

```javascript
// WAAPI - full transform string
element.animate({ transform: "translateX(50px) scaleX(2)" })

// Motion - independent with separate options
animate(element, { x: 50, scaleX: 2 }, { 
  x: { duration: 2 }, 
  scaleX: { repeat: 1 } 
})
```

---

Full docs: https://motion.dev/docs/improvements-to-the-web-animations-api-dx
