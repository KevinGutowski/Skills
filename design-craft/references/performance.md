# Performance

Transition specificity, GPU compositing hints, and perceived performance.

## Contents

- Transition Only What Changes
- Use `will-change` Sparingly
- Perceived Performance: Spinner Choice Assigns Blame

## Transition Only What Changes

Never use `transition: all` or Tailwind's `transition` shorthand (which maps to `transition-property: all`). Always specify the exact properties that change.

### Why

- `transition: all` forces the browser to watch every property for changes
- Causes unexpected transitions on properties you didn't intend to animate (colors, padding, shadows)
- Prevents browser optimizations

### CSS Example

```css
/* Good — only transition what changes */
.button {
  transition-property: scale, background-color;
  transition-duration: 150ms;
  transition-timing-function: ease-out;
}

/* Bad — transition everything */
.button {
  transition: all 150ms ease-out;
}
```

### Tailwind

```tsx
// Good — explicit properties
<button className="transition-[scale,background-color] duration-150 ease-out">

// Bad — transition all
<button className="transition duration-150 ease-out">
```

### Tailwind `transition-transform` Note

`transition-transform` in Tailwind maps to `transition-property: transform, translate, scale, rotate` — it covers all transform-related properties, not just `transform`. Use this when you're only animating transforms. For multiple non-transform properties, use the bracket syntax: `transition-[scale,opacity,filter]`.

## Use `will-change` Sparingly

`will-change` hints the browser to pre-promote an element to its own GPU compositing layer. Without it, the browser promotes the element only when the animation starts — that one-time layer promotion can cause a micro-stutter on the first frame.

This particularly helps when an element is changing `scale`, `rotation`, or moving around with `transform`. For other properties, it doesn't help much — the browser can't composite them on the GPU anyway.

### Rules

```css
/* Good — specific property that benefits from GPU compositing */
.animated-card {
  will-change: transform;
}

/* Good — multiple compositor-friendly properties */
.animated-card {
  will-change: transform, opacity;
}

/* Bad — never use will-change: all */
.animated-card {
  will-change: all;
}

/* Bad — properties that can't be GPU-composited anyway */
.animated-card {
  will-change: background-color, padding;
}
```

### Useful Properties

| Property | GPU-compositable | Worth using `will-change` |
| --- | --- | --- |
| `transform` | Yes | Yes |
| `opacity` | Yes | Yes |
| `filter` (blur, brightness) | Yes | Yes |
| `clip-path` | Yes | Yes |
| `top`, `left`, `width`, `height` | No | No |
| `background`, `border`, `color` | No | No |

### When to Skip

Modern browsers are already good at optimizing on their own. Only add `will-change` when you notice first-frame stutter — Safari in particular benefits from it. Don't add it preemptively to every animated element; each extra compositing layer costs memory.

## Perceived Performance: Spinner Choice Assigns Blame

A branded/custom loading indicator makes users attribute the wait to *your product*; the platform's system spinner makes them attribute it to *the device or OS*. Field datum from Facebook (~2014, relayed by Paul Stamatiou, ex-Twitter design — https://x.com/Stammy/status/1940938534212260012):

> "when they used the custom loader, people blamed Facebook for the slowness. when they used the system spinner, people assumed their phone/iOS was the issue."

How to apply:

- For waits you can't control (network, OS-level work), prefer the platform's native activity indicator over a custom-branded one.
- A custom loader is a signature moment only when the wait is short and consistent; on slow paths it becomes a branded apology.
- This is a complement to, not a substitute for, actually making it fast — and skeleton screens/optimistic UI sidestep the blame question entirely by not presenting a spinner at all.
