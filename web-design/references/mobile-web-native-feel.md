# Mobile Web: Native Feel

*Scope: a web app that works on a phone but feels like a website — stuck hovers, tap flashes, wrong heights, input zoom, laggy taps, scroll chaining, selection on controls. This is the platform layer (viewport, touch, scroll, browser chrome) for a site running **in a mobile browser tab**. Installed Home Screen / Dock apps → [apple-installed-web-apps.md](apple-installed-web-apps.md). Drag/swipe/sheet mechanics → web-animation-design's gestures member. Layout reflow and safe-area composition → [web-layout-design.md](web-layout-design.md). React Native and native apps are out of scope.*

**Sources:** Emil Kowalski's public `mobile-native` skill (MIT, rev `715c180`, https://github.com/emilkowalski/skills), checked against MDN where it states browser behaviour; two claims were narrowed (see the keyboard row and "Corrections to the source"). Browser behaviour here is dated 2026-11.

## Contents

- Operating rules
- Symptom → cause → fix
- Notes on the non-obvious fixes
- Baseline for a new mobile-facing app
- Never ship
- Verifying on hardware
- Corrections to the source
- Look it up

## Operating rules

1. **Most "janky on mobile" reports are not animation problems.** Check tap delay, tap highlight, and stuck hover before touching any motion code.
2. **Prefer one declaration to a hook.** Nearly every fix below is a CSS declaration or a meta tag. A `useIsTouchDevice()` hook, a user-agent branch, or a width check is the wrong tool; capability queries (`hover`, `pointer`), `env()`, and dynamic viewport units already report what the device can do.
3. **Gate by capability, not device class.** iPads have trackpads, laptops have touchscreens, phones take mice. Write for touch and pointer at once.
4. **Apply each fix where its reason applies.** `user-select: none` is right on a button and a defect on body text. Do not paste the baseline blindly onto a document-style site.
5. **Never disable zoom** (`user-scalable=no`, `maximum-scale=1`). It is an accessibility failure and it only masks the input font-size cause.
6. **Emulation does not reproduce these.** Say which fixes were verified from code and which need the user's phone; do not report "fixed" from desktop device mode.

## Symptom → cause → fix

| Symptom | Cause | Fix |
| --- | --- | --- |
| Hover style stays after a tap | Touch browsers synthesise `:hover` on tap and hold it until the next tap elsewhere | Put hover rules inside `@media (hover: hover) and (pointer: fine)`; give touch its feedback through `:active` |
| Grey/blue flash on tap | Default tap highlight on anything clickable | `-webkit-tap-highlight-color: transparent` once on `html`, **then** ensure every tappable has an `:active` state |
| Full-height layout overflows; bottom button hidden under browser bar | `100vh` is the *largest* viewport (browser chrome collapsed) | App shell and bottom-pinned UI: `100dvh`. Hero/first screen: `min-height: 100svh` |
| Page zooms when an input is focused and stays zoomed | iOS Safari zooms to any focused field under 16px | Field font size ≥ 16px (optionally only under `(pointer: coarse)`) |
| Tap feels late | (a) double-tap-zoom wait, (b) feedback bound to `click`, which fires on release | (a) `touch-action: manipulation` on controls; (b) style `:active` / listen to `pointerdown` |
| Pull-to-refresh or whole-page bounce fires inside an app UI | Scroll chains past the top to the root | `overscroll-behavior: none` on `html, body` for app-style shells; `overscroll-behavior: contain` on inner scrollers |
| Page behind a sheet scrolls when the sheet's list hits its end | Scroll chaining | `overscroll-behavior: contain` on the inner scroller |
| Content letterboxed around notch/home indicator, or bar sits under it | Page is not edge-to-edge, or is but does not pad | `viewport-fit=cover` plus `env(safe-area-inset-*)` padding on fixed chrome. Zero-safe composition rules: [apple-installed-web-apps.md](apple-installed-web-apps.md) and [web-layout-design.md](web-layout-design.md) |
| Long-press selects a button label or opens the link callout | Controls are selectable text by default | `user-select: none` (+ `-webkit-` prefix) on controls only; `-webkit-touch-callout: none` only where a custom long-press exists |
| Page jitters vertically while swiping a carousel | Browser cannot tell which axis the element owns | `touch-action: pan-y pinch-zoom` on the horizontal track; or use native `scroll-snap` and drop the JS gesture |
| Status bar / browser chrome colour wrong in one scheme | Single `theme-color` | One `theme-color` meta per `prefers-color-scheme`, matched to the page's top surface |
| Bottom input or bar covered by the keyboard | Keyboard overlays the layout viewport by default | Android/Chromium: `interactive-widget=resizes-content` in the viewport meta. Safari: `visualViewport` (see the installed-apps reference's keyboard section) |
| Text inflates in landscape | iOS text autosizing | `-webkit-text-size-adjust: 100%` on `html` |
| Wrong keyboard, autocorrect mangles a code | Field semantics missing | `type`/`inputmode`, `autocapitalize`, `autocorrect`, `enterkeyhint`; field-type choice → [form-design.md](form-design.md) |
| Looks right in Chrome device mode, wrong on the phone | Emulation simulates size, not browser behaviour | Test on hardware (below) |

## Notes on the non-obvious fixes

**Hover gating.** `(hover: hover)` says the primary input can hover; adding `(pointer: fine)` excludes styluses and devices that over-report hover. Tailwind v4's `hover:` variant already compiles to a `(hover: hover)` query; v3 needs `future.hoverOnlyWhenSupported`.

**Viewport units.** `dvh` follows the browser chrome as it shows and hides: correct for an app shell, but it shifts layout mid-scroll on marketing content. `svh` is the smallest viewport and never overflows: correct for heroes. `lvh` equals legacy `vh` and is almost never wanted. Add a `100vh` fallback line only if the support matrix requires it. Installed standalone apps behave differently at cold launch; follow the installed-apps reference there rather than this rule.

**Press feedback.** Removing the tap highlight removes the only feedback the browser provided, so the two changes ship together. Keep the press response short (about 100–150ms, the ease-out token, a small scale or background shift) and reuse the project's existing motion tokens; values come from [web-animation-design.md](web-animation-design.md).

```css
.button:active { transform: scale(0.97); }
```

**Overscroll.** `none` on the root removes pull-to-refresh and the page-level bounce; leave it off for scrolling documents where refresh is welcome. `contain` on an inner scroller keeps that container's own bounce and stops the chain. Do not solve this with a `touchmove` listener calling `preventDefault()`: it blocks scrolling and forces a non-passive listener.

**`touch-action` reads from the browser's side.** The value lists what the browser may still handle: `pan-y pinch-zoom` on a horizontal carousel leaves vertical scrolling and pinch zoom to the browser. Bare `pan-y` or `pan-x` also turns off pinch zoom for touches that start on that surface, which takes magnification away from people who rely on it, so add `pinch-zoom` by default and drop it only when the surface implements its own pinch; `none` means the element handles everything and the user cannot scroll past it, so reserve it for true two-axis surfaces. `manipulation` allows pan and pinch but drops double-tap zoom, which removes the tap wait.

**Safe areas.** `env(safe-area-inset-*)` resolves to `0px` without `viewport-fit=cover`, and `0px` is also a legitimate value on many devices. Pad fixed headers, bottom bars, toasts, and sheets; give `env()` a fallback inside `calc()`.

**Theme colour.** Match the colour at the very top of the page (header background), not the brand colour. If the theme is toggled by class rather than OS setting, update the meta from script on toggle. Recent Safari can derive bar tint from page surfaces instead of the meta; the installed-apps reference covers that behaviour.

**Selection.** Controls are not content. Addresses, error text, order numbers, and anything a person might copy must stay selectable, so never set `user-select: none` on `body`.

## Baseline for a new mobile-facing app

Ship before the first component when the product is app-like; trim for document sites.

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content">
<meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff">
<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0a0a0a">
```

```css
html {
  -webkit-tap-highlight-color: transparent;
  -webkit-text-size-adjust: 100%;
  overscroll-behavior: none; /* app shells only */
}

input, textarea, select { font-size: 16px; }

button, a, [role="button"] { touch-action: manipulation; }

button, [role="button"] {
  user-select: none;
  -webkit-user-select: none;
}

@media (hover: hover) and (pointer: fine) {
  /* every :hover rule */
}
```

Link text stays selectable in this baseline; add links to the selection rule only when they are styled and used as controls.

## Never ship

| Never | Instead |
| --- | --- |
| `user-scalable=no` / `maximum-scale=1` | 16px fields |
| Ungated `:hover` | Capability query + `:active` |
| Tap highlight removed with no `:active` state | Ship both together |
| `100vh` for an app shell or bottom-pinned UI | `100dvh` |
| `100dvh` on a marketing hero | `100svh` |
| Press feedback on `click` only | `:active` / `pointerdown` |
| `touchmove` + `preventDefault()` to stop overscroll | `overscroll-behavior` |
| `user-select: none` on `body` | Controls only |
| `touch-action: none` on something users must scroll past | `pan-x pinch-zoom` / `pan-y pinch-zoom` |
| Bare `pan-x` / `pan-y` on a swipe surface (silently disables pinch zoom there) | Add `pinch-zoom` |
| `env(safe-area-inset-*)` without `viewport-fit=cover` | Add the meta; keep layout correct at `0px` |
| One `theme-color` for both schemes | One per scheme |
| UA sniffing or width checks to detect touch | `hover` / `pointer` queries |
| "Fixed" reported from device emulation | Hardware check, or say it is unverified |

## Verifying on hardware

- Serve the dev server on the LAN (`0.0.0.0`) and open it by the machine's IP. iOS: Safari → Develop → device. Android: `chrome://inspect`.
- Use a phone a few years old. Test with the keyboard open, once in landscape, and as an installed app if that is a target (standalone changes viewport, insets, and status bar).
- The iOS Simulator beats emulation but still misses touch feel.
- Report in three lines: what was wrong (symptom + cause), what changed (file + declaration), and what still needs a phone.

## Corrections to the source

- **Keyboard and `interactive-widget`.** The source presents `interactive-widget=resizes-content` as aligning Android with iOS. More precisely: by default both Chromium (since 108) and iOS Safari resize only the *visual* viewport when the keyboard opens; `resizes-content` opts Chromium and Firefox on Android into resizing the layout viewport so bottom-pinned UI moves up. Safari does not implement it (the installed-apps reference tracks the WebKit bug), so Safari still needs `visualViewport`.
- **`100dvh` everywhere.** Scoped to browser tabs. The installed-apps reference records `100vh` as steadier during iOS standalone cold launch.
- **Blanket `user-select: none` on `a`.** Narrowed to controls; ordinary links remain selectable text.

## Look it up

- MDN: viewport meta (`interactive-widget`, `viewport-fit`), `touch-action`, `overscroll-behavior`, viewport-relative length units (`svh`/`lvh`/`dvh`), `hover` and `pointer` media features, `env()`, `theme-color`, `enterkeyhint`, `VisualViewport`.
- WebKit release notes for Safari viewport, keyboard, and status-bar tinting changes.
