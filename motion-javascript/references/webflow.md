# Webflow Integration

Add Motion to Webflow for:
- Animating gradients, masks
- Hardware accelerated scroll animations
- Complex timelines
- Three.js integration
- Better Lighthouse scores (vs GSAP)

## Install

1. Open **Pages dialog** → "Edit page settings"
2. Scroll to **Before `</body>` tag**
3. Add script:

```html
<script type="module">
  import { animate, scroll } from "https://cdn.jsdelivr.net/npm/motion@11.13.5/+esm"
  
  animate("header", { opacity: 1 })
</script>
```

### Mini Version (2.3kb)

For smaller bundle (no independent transforms):

```html
<script type="module">
  import { animate } from "https://cdn.jsdelivr.net/npm/motion@11.13.5/mini/+esm"
</script>
```

## Custom Bundled Scripts

For best performance, bundle with Vite/Rollup (tree-shaking):

```javascript
// your-script.js
import { animate } from "motion"
animate("header", { opacity: 1 })
```

Build, upload to CDN, then include with async:

```html
<script async src="https://yourdomain.com/my-script.js"></script>
```

Benefits:
- Only includes code you use
- Better Lighthouse scores
- Single bundled file

---

Full docs: https://motion.dev/docs/webflow
