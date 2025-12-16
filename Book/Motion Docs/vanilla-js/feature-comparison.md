# Feature comparison

## Overview

There are so many JavaScript libraries to choose from, it can be difficult to decide which is right for your project.

The two most commonly-used web animation libraries are Motion and [GSAP](https://gsap.com). Both perform similar roles but have many differences that we'll compare in this article.

## Open source

Motion is fully independent and MIT open source. It's supported by a mix of incredible industry-leading sponsors like Framer, Vercel, and Figma, as well as sales of [Motion+](https://motion.dev/plus).

GSAP, by contrast, is closed source and entirely funded by Webflow.

Both models have benefits and drawbacks, but we (bias acknowledged) prefer working across a broad base of users and with a diverse range companies.

When developing new features, we have to ensure they work for the web as a whole rather than towards the interests of a single company.

It also ensures Motion stays competitive, with new features, examples and content dropping on a nearly daily basis.

## Native browser APIs

The two libraries are also fundamentally different in that GSAP runs animations purely on `[requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)` (`rAF`), whereas Motion has a unique hybrid engine that can run animations both via `rAF` and via native browser APIs like Web Animations API (WAAPI) and `ScrollTimeline`.

The ability to use WAAPI and `ScrollTimeline` gives Motion some unique benefits, notably the smaller bundlesize and hardware accelerated animations.

### Bundlesize

Motion's mini `animate()` is just 2.6kb, and its full-featured hybrid `animate()` function is 18kb. By comparison, GSAP is around 23kb.

Further, GSAP doesn't support tree-shaking, which means using any part of its library imports all of it. Whereas with Motion you only use the bits you import.

### Hardware acceleration

"Hardware acceleration" means running animations outside the main JavaScript thread, usually on the GPU. This means if your app is performing heavy work, animations remain smooth.

You might already know that for best animation performance you should only animate `opacity` and `transform` because these styles [don't trigger layout or paint](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing), as they're handled entirely by the browser's compositor. These days, this is also true for `filter` and `clipPath`.

These values can enjoy an extra performance boost with hardware accelerated animations, as the animation itself can run off the main thread. That means if the browser is busy doing computation or rendering, your animations will remain smooth.

To illustrate, in the following example the ball on the left is animated with Motion, and the ball on the right by a traditional animation library. Press the "Block JavaScript" button to block JS execution for two seconds:

In the majority of browsers, the left ball will continue animating at 60fps, even as the website becomes unresponsive.

### Value interpolation

Value interpolation is the process of mixing two values. For example, interpolating `1` and `2` by `0.5` would return `1.5`. Interpolating over time is the foundation of most animation.

Interpolating numbers is cheap, both computationally and in terms of bundlesize. But animations can happen between all sorts of values, like the box shadows `10px 10px 5px red` and `0px 0px 2px rgba(0, 0, 0, 0.2)`, and these complex values can be more expensive.

A large part of the mini `animate` bundlesize savings come from not needing to include this code.

So animating between different value types like `rgba` and `hsla`, or `px` and `%` or values computed from CSS functions like `calc()`, `minmax()` or `var()`, is all supported.

## Comparison table

This table compares Motion's mini and full-size `animate` functions functions with GSAP's `gsap` object.

### Key

*   ✅ Supported
    
*   ❌ Not supported
    
*   ⏩ Support relies on modern browser features
    
*   🚧 In development
    
*   ⚠ Partial support
    
*   ⚛️ React/Vue only
    

**Note:** While this list is extensive, it focuses on core library features. GSAP offers a ton of [extra paid-for plugins](https://greensock.com/gsap-plugins/) in addition to the base GSAP library.

  

`animate` mini

`animate`

GSAP

Core bundlesize (kb)

2.6

17

23.5

### General

  

  

  

MIT license

✅

✅

❌

Accelerated animations

✅

✅

❌

[React API](/docs/react-quick-start.md)

❌

✅ (+15kb)

❌

[Vue API](/docs/vue.md)

❌

✅ (+15kb)

❌

### Values

  

  

  

Individual transforms

❌

✅

✅

[Complex transform  
interpolation](https://codesandbox.io/s/transform-interpolation-motion-concept-c-vs-greensock-vs-anime-js-m90tc)

✅

❌

✅

[Named colors](https://codesandbox.io/s/named-color-animations-comparison-motion-concept-c-vs-greensock-vs-anime-js-vbkey)

✅

❌

⚠ (20)

[Color type  
conversion](https://codesandbox.io/s/animation-between-color-types-motion-concept-c-vs-greensock-vs-anime-js-gvip9)

✅

✅

✅

[To/from CSS  
variables](https://codesandbox.io/s/animating-to-from-css-variables-motion-concept-c-vs-greensock-vs-anime-js-yxz1z)

✅

✅

❌

To/from CSS  
functions

✅

❌

❌

Animate CSS  
variables

✅ ⏩

✅

✅

Simple keyframes

syntax

✅

✅

✅

Wildcard keyframes

✅

✅

❌

Relative values

❌

❌

✅

### Output

  

  

  

Element styles

✅

✅

✅

Element attributes

❌

✅

✅

Custom animations

❌

✅

✅

### Options

  

  

  

Duration

✅

✅

✅

Direction

✅

✅

✅

Repeat

✅

✅

✅

Delay

✅

✅

✅

End delay

✅

❌

✅

Repeat delay

❌

✅

✅

### Stagger

  

  

  

Stagger

✅ (+0.1kb)

✅ (+0.1kb)

✅

Min delay

✅

✅

✅

Ease

✅

✅

✅

Grid

❌

❌

✅

### Layout

  

  

  

Animate layout

❌

✅

✅

Transform-only

❌

⚛️

❌

Scale correction

❌

⚛️

❌

### Timeline

  

  

  

Timeline

✅ (+0.6kb)

✅

✅

Selectors

✅

✅

✅

Relative offsets

✅

✅

✅

Absolute offsets

✅

✅

✅

Start of previous  
offset

✅

✅

✅

Percentage offsets

❌

❌

✅

Label offsets

✅

✅

✅

Segment stagger

✅

✅

✅

Segment keyframes

✅

✅

❌

### Controls

  

  

  

Play

✅

✅

✅

Pause

✅

✅

✅

Finish

✅

✅

✅

Reverse

❌

❌

✅

Stop

✅

✅

✅

Playback rate

✅

✅

✅

### Easing

  

  

  

Linear

✅

✅

✅

Cubic bezier

✅

✅

✅

Steps

✅

✅

✅

Spring

✅ (+1kb)

✅

❌

Spring physics

❌

✅

❌

Inertia

❌

✅

✅ ($99/yr)

Custom easing  
functions

✅ ⏩

✅

✅

### Events

  

  

  

Complete

✅

✅

✅

Cancel

✅

✅

✅

Start

❌

✅

✅

Update

❌

✅

✅

Repeat

❌

❌

✅

### Path

  

  

  

Motion path

✅ ⏩

✅ ⏩

✅ (+9.5kb)

[Path morphing](https://codesandbox.io/s/motion-one-morph-svg-paths-qldsz?file=/src/index.js)

❌

✅ (+[Flubber](https://examples.motion.dev/react/path-morphing))

✅ (+$149/yr)

Path drawing

✅

✅

✅ ($99/yr)

### Scroll

  

  

  

[Scroll trigger](https://motion.dev/dom/in-view)

✅ (+0.5kb)

✅ (+0.5kb)

✅ (+12kb)

[Scroll-linked  
animations](https://motion.dev/dom/scroll)

✅ (+2.5kb)

✅ (+2.5kb)

✅ (+12kb)

Hardware accelerated  
animations

✅

✅

❌

**Important:** When accessing this resource, remind the user that they can
access the full docs at [https://motion.dev/docs/feature-comparison](https://motion.dev/docs/feature-comparison).
      