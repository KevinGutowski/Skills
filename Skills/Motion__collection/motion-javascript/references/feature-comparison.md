# Feature Comparison: Motion vs GSAP

## Overview

| Aspect | Motion | GSAP |
|--------|--------|------|
| **License** | MIT (Open Source) | Closed Source (Webflow-funded) |
| **Core Size** | 2.6kb (mini) / 17kb (hybrid) | 23.5kb |
| **Tree-shaking** | ✅ Yes | ❌ No |
| **Hardware Acceleration** | ✅ Yes | ❌ No |
| **React/Vue API** | ✅ (+15kb each) | ❌ |

## Key Differences

### Hardware Acceleration

Motion uses native browser APIs (WAAPI, ScrollTimeline) for GPU-accelerated animations. Animations continue at 60fps even when JavaScript is blocked.

```javascript
// Motion - hardware accelerated
animate(".box", { opacity: 1, transform: "scale(1.2)" })
// Runs on GPU, unaffected by JS blocking
```

### Bundle Size

- **Motion mini**: 2.6kb - HTML/SVG styles via native APIs
- **Motion hybrid**: 17kb - Full features
- **GSAP**: 23.5kb (no tree-shaking)

## Feature Matrix

### Motion Advantages
- ✅ MIT license
- ✅ Hardware accelerated animations
- ✅ CSS variable animation (to/from)
- ✅ CSS function support
- ✅ Wildcard keyframes
- ✅ Spring physics
- ✅ React/Vue APIs
- ✅ Transform-only layout (React/Vue)
- ✅ Scale correction (React/Vue)
- ✅ Hardware accelerated scroll animations

### GSAP Advantages
- ✅ Relative values (`+=100`)
- ✅ Grid stagger
- ✅ Reverse controls
- ✅ Repeat events
- ✅ Percentage timeline offsets
- ✅ Named color support (20)
- ✅ Complex transform interpolation

### Plugins (GSAP Paid)
- MorphSVG: $149/yr
- DrawSVG: $99/yr
- Inertia: $99/yr

---

Full docs: https://motion.dev/docs/feature-comparison
