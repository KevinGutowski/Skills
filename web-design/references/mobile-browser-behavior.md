# Mobile Browser Behavior

*Scope: The platform layer that makes a web page feel wrong on a phone even when the layout is right: sticky hover, tap flash and tap delay, focus zoom, viewport height, scroll chaining, safe areas, long-press selection, gesture axes, the on-screen keyboard, and browser chrome color. Layout reflow and safe-area padding patterns → web-layout-design; installed Home Screen / Dock apps → apple-installed-web-apps; drag physics → web-animation-design (gestures); field design → form-design; native apps → `apple-design` / `swiftui`.*

**Sources:** Symptom list and fixes paraphrased from Emil Kowalski's `mobile-native` skill at `715c180` (MIT). Property and meta-tag behavior is grounded in MDN and W3C/WAI, listed at the end. Rows marked *device-observed* describe browser behavior that no specification guarantees.

## Contents

- Rules
- Symptom table
- Input capability: hover and press
- Viewport height
- Focus zoom and the keyboard
- Scroll chaining and overscroll
- Safe areas
- Selection, callouts, and gesture axes
- Browser chrome color
- Starting baseline
- Never ship
- Verify on hardware
- Report shape
- Conflicts with other references
- Sources and staleness

## Rules

1. **Apply a fix where its reason applies.** `user-select: none` is right on a button and a defect on body text. None of these are global resets to paste in.
2. **Ask the platform, do not guess the device.** `(hover: hover)`, `(pointer: coarse)`, `env()`, and `dvh` report capability. User-agent strings and screen width do not. Touch and mouse coexist on iPads with trackpads and touchscreen laptops, so gate by capability.
3. **Never disable zoom.** `user-scalable=no` and `maximum-scale=1` remove a low-vision accommodation (WCAG 1.4.4). Fix what caused the unwanted zoom.
4. **CSS or a meta tag before JavaScript.** Almost every item below is one declaration. A touch-detection hook to hide hover states is the wrong tool.
5. **A phone is the only proof.** Desktop device emulation does not reproduce most of this file.

## Symptom table

| Symptom | Fix | Section |
| --- | --- | --- |
| Hover style stays after a tap | Gate hover behind `@media (hover: hover) and (pointer: fine)` | Input capability |
| Gray or blue flash on tap | `-webkit-tap-highlight-color: transparent`, plus your own `:active` state | Input capability |
| Tap feels late | Press feedback on `:active` / `pointerdown`; `touch-action: manipulation` | Input capability |
| Full-height layout is too tall or jumps | `dvh` for app shells, `svh` for heroes | Viewport height |
| Page zooms when a field takes focus (iOS) | Field font-size of at least 16px | Focus zoom |
| Wrong keyboard, unlabeled return key | `type`, `inputmode`, `enterkeyhint`, `autocapitalize` | Focus zoom |
| Page scrolls behind a sheet, or pull-to-refresh fires in an app | `overscroll-behavior` | Scroll chaining |
| Content sits under the notch or home indicator | `viewport-fit=cover` with `env(safe-area-inset-*)` | Safe areas |
| Long-press selects a button label | `user-select: none` on controls only | Selection |
| Carousel drags the page vertically | `touch-action: pan-y` on the gesture surface | Selection |
| Browser chrome color clashes with the page | `theme-color` per color scheme | Chrome color |

## Input capability: hover and press

**Sticky hover** *(device-observed)*. Touch browsers emulate hover: the first tap applies `:hover` and leaves it until the next tap elsewhere.

```css
@media (hover: hover) and (pointer: fine) {
  .button:hover { background: var(--surface-hover); }
}
```

`(hover: hover)` says the primary input can hover; `(pointer: fine)` says it is precise. Use both for hover effects that move or scale; `(hover: hover)` alone is enough for a color change. Tailwind v4's `hover:` variant already compiles to the hover query (v3 needs `future.hoverOnlyWhenSupported`); confirm against the installed version.

**Tap highlight.** Mobile Safari and Chrome paint a translucent overlay on tapped elements that have a click handler. Removing it removes the only built-in press feedback, so the two changes ship together:

```css
html { -webkit-tap-highlight-color: transparent; }
.button:active { transform: scale(0.97); }
```

**Late feedback.** Two causes stack:

- Feedback bound to `click` fires when the finger lifts. Style `:active`, or listen for `pointerdown`, so the control responds on contact. Keep the press transition around 100–160ms with ease-out (values from web-animation-design).
- Double-tap-to-zoom can delay the click. `touch-action: manipulation` on buttons and links tells the browser the element never double-tap zooms. Pinch zoom still works.

## Viewport height

On a phone, `100vh` is the height with the browser chrome collapsed, so on load a `100vh` element overflows by the height of the URL bar and a bottom-pinned control sits underneath it.

| Unit | Tracks | Use for |
| --- | --- | --- |
| `dvh` | The visible area as chrome shows and hides | App shells, sheets, anything pinned to the bottom |
| `svh` | The smallest the viewport gets | Heroes and first screens; never cut off, never shifts mid-scroll |
| `lvh` | The largest (old `vh` behavior) | Rarely what you want |

`dvh` on long-form marketing content causes layout shift while scrolling; that is what `svh` is for.

## Focus zoom and the keyboard

**Focus zoom** *(device-observed, iOS Safari)*. Focusing a field whose computed font size is under 16px zooms the page, and it does not zoom back on blur. This is the usual reason teams reach for `maximum-scale=1`; fix the font size instead.

```css
@media (pointer: coarse) {
  input, textarea, select { font-size: max(16px, 1em); }
}
```

Scope it to coarse pointers when the desktop design uses smaller field text.

**Keyboard hints.** `type="email"` / `type="tel"`, `inputmode="numeric"` for codes and `inputmode="decimal"` for amounts, `enterkeyhint` (`search`, `send`, `done`, `next`) so the return key says what it does, and `autocapitalize="none"` with `autocorrect="off"` on usernames and codes. Field labeling and validation → form-design.

**Keyboard and layout.** Android Chrome by default resizes only the visual viewport when the keyboard opens, so `dvh` and bottom-pinned inputs do not react. `interactive-widget=resizes-content` in the viewport meta makes the layout viewport shrink instead. WebKit does not implement it; see apple-installed-web-apps for the bug reference. Either way, check that the focused field and its submit control stay visible with the keyboard open (WCAG 2.4.11).

## Scroll chaining and overscroll

When an inner scroller reaches its end, the scroll continues into whatever is behind it.

```css
.sheet-content { overflow-y: auto; overscroll-behavior: contain; }
```

`contain` keeps the container's own edge bounce and stops the page behind from moving. On the root, `overscroll-behavior: none` also disables pull-to-refresh, which is right for an app-like surface with its own scroll regions or a drag-to-dismiss sheet, and wrong for a document where pull-to-refresh is expected.

Do not block scroll with a `touchmove` listener calling `preventDefault()`. It makes the listener non-passive, costs frames, and blocks scrolling the user needs.

## Safe areas

`env(safe-area-inset-*)` returns `0px` unless the viewport meta includes `viewport-fit=cover`. With it, the page paints edge to edge and fixed headers, bottom bars, toasts, and sheets pad themselves back out. The padding pattern (`max()` with a design minimum, logical properties) is in web-layout-design (Safe areas and stable controls).

## Selection, callouts, and gesture axes

**Controls are not selectable text; content is.**

```css
button, [role="button"], .tab, .drag-handle {
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none; /* no long-press menu on links or images used as controls */
}
```

Never on `body`: people copy addresses, error messages, and order numbers.

**`touch-action` names what the browser may still do.**

| Value | On | Meaning |
| --- | --- | --- |
| `pan-y` | A horizontal carousel or swipeable row | The element handles horizontal; the browser keeps vertical scrolling |
| `pan-x` | A vertical drag handle | The element handles vertical |
| `none` | A surface that owns every axis (slider thumb, canvas) | The user cannot scroll past it by touching it; use sparingly |

For a carousel that is plain native scrolling, prefer `scroll-snap-type` on the track and `scroll-snap-align` on the slides; the browser's physics beat a hand-rolled gesture, and `touch-action` is unnecessary. Discoverability rules for carousels stay with web-layout-design.

## Browser chrome color

```html
<meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff">
<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0a0a0a">
```

Match the color at the very top of the page (the header background), not the brand color. If the theme switches by class rather than OS setting, update the tag from script on toggle. Browser support for `theme-color` varies and Safari's behavior has changed across releases; treat it as an enhancement and see apple-installed-web-apps for standalone status-bar handling.

## Starting baseline

For a surface that should feel app-like on a phone. Drop the root `overscroll-behavior` for a scrolling document.

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content">
```

```css
html {
  -webkit-tap-highlight-color: transparent;
  -webkit-text-size-adjust: 100%; /* no font inflation in landscape */
  overscroll-behavior: none;
}
button, a, [role="button"] { touch-action: manipulation; }
button, [role="button"] { user-select: none; -webkit-user-select: none; }
@media (pointer: coarse) {
  input, textarea, select { font-size: max(16px, 1em); }
}
```

## Never ship

| Never | Instead |
| --- | --- |
| `user-scalable=no` or `maximum-scale=1` | 16px fields |
| Ungated `:hover` that moves or scales | A capability query |
| `100vh` for an app shell or bottom-pinned UI | `100dvh` |
| `100dvh` on a marketing hero | `100svh` |
| Press feedback on `click` only | `:active` / `pointerdown` |
| `touchmove` + `preventDefault()` to stop overscroll | `overscroll-behavior` |
| `user-select: none` on `body` | Controls only |
| `touch-action: none` on something the user scrolls past | `pan-x` / `pan-y` |
| `env(safe-area-inset-*)` without `viewport-fit=cover` | Add the meta value |
| User-agent sniffing for touch | `hover` / `pointer` queries |
| "Fixed" on the strength of device emulation | A real phone |

## Verify on hardware

- Serve the dev build on the local network and open it on the phone by IP. Inspect with Safari's Develop menu (iOS) or `chrome://inspect` (Android).
- Use a phone a few years old. Test with the keyboard open, and once in landscape.
- Test iOS Safari first; most of the device-observed rows are its behavior.
- If the product is also installed to the Home Screen, test that mode separately; viewport, safe areas, and status bar differ.
- A simulator is better than desktop emulation and still misses touch feel.

## Report shape

After applying fixes, three short parts and no more:

- **What was wrong:** the symptom and its one-line cause.
- **What changed:** file and declaration, one line each.
- **What needs a phone:** which fixes were verified from code and which need confirming on hardware.

## Conflicts with other references

- **`dvh` in installed apps.** apple-installed-web-apps records `100vh` as more stable than `100dvh` during iOS standalone cold launch. That file wins for installed apps; this file's `dvh` / `svh` guidance is for browser tabs.
- **Tap delay.** Modern browsers already skip the 300ms delay when the viewport is `width=device-width`. `touch-action: manipulation` is kept for the residual double-tap-zoom cases the source reports, not as a universal fix.
- **Hover query.** web-animation-design gates hover motion with both `hover` and `pointer: fine`; apple-installed-web-apps uses `hover: hover` alone. Both are valid: add `pointer: fine` when the hover effect moves or scales.
- **Target size.** The source uses 44×44px; web-accessibility owns the WCAG floor and the larger recommended size.

## Sources and staleness

- Emil Kowalski, `mobile-native`, revision `715c1807e08c497cfd1dc4feb450a2a3300ef2a9`, MIT: symptom list, fixes, baseline, hardware checklist. https://github.com/emilkowalski/skills
- MDN, `hover` and `pointer` media features: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/hover · https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/pointer
- MDN, `touch-action`: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/touch-action
- MDN, `overscroll-behavior`: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overscroll-behavior
- MDN, `<length>` (viewport units `svh`, `lvh`, `dvh`): https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/length
- MDN, viewport meta (`viewport-fit`, `interactive-widget`, the `user-scalable` warning): https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/viewport
- MDN, `theme-color`: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/theme-color
- MDN, `inputmode` and `enterkeyhint`: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/inputmode · https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/enterkeyhint
- MDN, `text-size-adjust`: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-size-adjust
- W3C WAI, Understanding SC 1.4.4 Resize Text: https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html

The MDN and W3C URLs resolved on 2026-11-10, and the viewport meta page was read to confirm `viewport-fit`, `interactive-widget` (default `resizes-visual`), and the `user-scalable` warning; the other pages were not re-read line by line. The device-observed rows (sticky hover, the 16px focus-zoom threshold, tap-highlight painting, residual tap delay) come from the source and were not re-tested on hardware for this intake; verify on a current iOS Safari and Android Chrome before treating an exact threshold as current.
