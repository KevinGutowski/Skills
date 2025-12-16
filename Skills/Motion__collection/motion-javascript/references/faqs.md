# FAQs

## Browser Support

Motion supports all modern browsers. **Does not support Internet Explorer 11 or below.**

## Why is my animation finishing instantly?

### 1. CSS.registerProperty not supported

If animating CSS variables and browser doesn't support [CSS Properties and Values API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Properties_and_Values_API), animations finish instantly.

### 2. `scale: 0` in Safari

Bug in older Safari versions where animating to `scale(0)` completes instantly.

---

Full docs: https://motion.dev/docs/faqs
