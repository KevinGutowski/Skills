# Performance Guide

Two factors affect web animation performance: **rendering** and **hardware acceleration**.

## Rendering Pipeline

When styles update, browser does:
1. **Layout** — Calculate size/position of elements
2. **Paint** — Draw into graphical layers
3. **Composite** — Draw layers to viewport

**Less work = faster animation.**

## Performance Tiers

### ✅ Best: Compositor Only

Only triggers compositing (GPU):

```javascript
animate(element, { 
  transform: "scale(1.2)",  // ✅ Best
  opacity: 0.5,             // ✅ Best
  filter: "blur(5px)"       // ✅ Good (modern browsers)
})
```

### ⚠️ Moderate: Paint Required

Triggers repaint but not layout:

- `box-shadow`, `border-radius`, `background-color`
- Use `will-change: transform` to create new layer

### ❌ Avoid: Layout Triggering

Causes full re-layout:

- `width`, `height`, `padding`, `margin`
- `border-width`, `top`, `left`, `right`, `bottom`
- Can exceed 100ms per frame!

## Better Alternatives

```javascript
// ❌ Bad: box-shadow triggers paint
animate(element, { boxShadow: "10px 10px black" })

// ✅ Better: filter on compositor
animate(element, { filter: "drop-shadow(10px 10px black)" })

// ❌ Bad: borderRadius triggers paint
animate(element, { borderRadius: "50px" })

// ✅ Better: clipPath on compositor
animate(element, { clipPath: "inset(0 round 50px)" })
```

## Hardware Acceleration

Animations run off main JS thread (GPU). Stays smooth even during heavy JS processing.

### Accelerated Values

- `transform`, `opacity` — widely supported
- `filter`, `clip-path`, `background-color` — gaining support

### Caveats

**Individual transforms NOT accelerated:**

```javascript
// ❌ Not hardware accelerated (CSS variables)
animate(".box", { x: 100, scale: 2 })

// ✅ Hardware accelerated
animate(".box", { transform: "translateX(100px) scale(2)" })
```

**Percentage transforms:** Until recently, `translateX(100%)` wasn't accelerated in Chrome.

## Summary

1. **Prioritize:** `transform` and `opacity`
2. **Test:** `filter`, `clip-path` in target browsers
3. **Avoid:** Layout-triggering properties
4. **Accept:** Hardware acceleration as progressive enhancement
5. **Profile:** Always test on low-powered devices

---

Full docs: https://motion.dev/docs/performance
