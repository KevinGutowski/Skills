# Installed Apple Web Apps

*Scope: Build or debug websites added to the iOS/iPadOS Home Screen or to the
macOS Dock. This is web-platform work, not native Apple-interface design.
Offline caching, service workers, and push need separate current sources.*

**Source stance:** Joe Bell's `apple-web-app` skill is a high-density field
guide grounded in one production app, WebKit/Apple material, framework fixes,
and community tests. Treat its private device observations and Safari 26
workarounds as leads to re-test, not permanent browser contracts.

## Contents

- Route by installed shell
- Ship the standard and Apple layers
- Make edge-to-edge layout zero-safe
- Choose status-bar and page color deliberately
- Own the scroll root and touch behavior
- Own navigation and installation hints
- Generate and serve install assets deliberately
- Repair overlays and keyboard occlusion from current behavior
- Know what does not carry to macOS
- Treat storage handoff as a boundary
- Escalate volatile Safari failures carefully
- Verify the installed artifact
- Sources and staleness

## Route by installed shell

Do not treat "Apple web app" as one runtime:

| Concern | iOS/iPadOS Home Screen | macOS Add to Dock |
| --- | --- | --- |
| Eligibility | Safari 26 lets the user open any Home Screen site as a web app | Safari 17+ lets the user add any site; a manifest is optional |
| Customization | Manifest plus legacy `apple-*` metadata | Primarily the manifest and per-app settings |
| Safe areas | Required for edge-to-edge content and device cutouts | `safe-area-inset-*` normally resolves to `0px` |
| Startup image | Apple startup-image links, when used | No corresponding launch-image system |
| Standalone detection | CSS display mode; JS match plus legacy fallback | CSS/JS display mode; `navigator.standalone` is not the signal |

Prefer CSS `@media (display-mode: standalone)` for presentation. When behavior
must branch, use `matchMedia("(display-mode: standalone)").matches`; add
`navigator.standalone === true` only as the iOS legacy fallback.

Safari 26 can open any Home Screen site as a web app even when the site did not
previously opt into standalone display. Treat installed-mode resilience as a
website concern, not something only self-described PWAs need to test.

On iPadOS 26, a Home Screen app can run in a resizable window whose controls
occupy the top-left. The upstream reports that `safe-area-inset-*` does not
describe those controls. Keep primary chrome away from that corner, test both
windowed and full-screen modes, and do not promote the community's fixed
`~64px` workaround without reproducing it on the supported release.

Before calling the shell complete, check all of these together: rendered head,
manifest, icons, optional startup images, explicit page/bar backgrounds,
safe-area use, scroll ownership, standalone navigation, unauthenticated asset
responses, cold launch, keyboard focus, and installed-mode link scope. These
features fail as a system; a correct manifest does not compensate for a broken
head tag, protected icon, or unsafe fixed bar.

## Ship the standard and Apple layers

The robust iOS baseline is deliberately redundant:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Your App">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="theme-color" content="#f5f5f4">
<link rel="apple-touch-icon" href="/apple-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
```

Also provide manifest `name`, `short_name`, `display`, `start_url`, `scope`,
colors, and icons. Inspect the **rendered head**, because framework metadata
helpers may omit the prefixed capable tag. Keep `<body>` and fixed/sticky bars
on explicit background colors; do not depend on browser chrome deriving the
right color from a transparent root.

Keep manifest `background_color`, manifest `theme_color`, `<meta
name="theme-color">`, and the actual first-paint body background intentionally
aligned unless a tested platform behavior requires otherwise. The upstream
reports that current iOS takes the Home Screen label from manifest `short_name`
and then `name`, with `apple-mobile-web-app-title` retained as a compatibility
fallback. Set all three deliberately instead of letting a framework infer
unrelated product names.

Do not preserve the upstream's blanket "iOS accepts PNG only" statement as a
current rule. WebKit says Safari 26 added SVG icon support throughout its
interface, including web-app icons. An opaque PNG remains a useful fallback;
test the deployed manifest's candidate ordering on supported versions.

## Make edge-to-edge layout zero-safe

`viewport-fit=cover` exposes edge-to-edge space. Use the inset as an addition
to a usable base, never as the component's whole size:

```css
:root {
  --safe-top: env(safe-area-inset-top);
  --safe-bottom: env(safe-area-inset-bottom);
  --header-height: calc(3.5rem + var(--safe-top));
}

header {
  min-height: var(--header-height);
  padding-block-start: var(--safe-top);
}

.bottom-bar {
  padding-block-end: calc(0.5rem + var(--safe-bottom));
}
```

An inset of `0px` is valid on unnotched devices, in some orientations, on
macOS, and during browser regressions. Never use `> 0` as "modern iPhone" or
readiness detection. Mirroring `env()` into a custom property is useful only
when JS truly must observe its resolved value. Keep the layout correct at
zero; any reveal gate needs a short fail-open timeout.

Do not disable zoom with `user-scalable=no` or `maximum-scale=1`. Put
`touch-action: manipulation` on tappable controls when double-tap delay or
zoom behavior is the actual problem.

### If safe-area values arrive late

Prefer a CSS layout that is correct at both the initial `0px` and the eventual
inset. If a real-device cold launch still produces an unacceptable jump, gate
only the standalone shell, test the mirrored property's **non-emptiness**
rather than its numeric value, and always fail open:

```js
const root = document.documentElement;
const ready = () => root.setAttribute("data-ready", "");
const standalone =
  matchMedia("(display-mode: standalone)").matches ||
  navigator.standalone === true;

if (!standalone) {
  ready();
} else {
  const fallback = setTimeout(ready, 500);
  const check = () => {
    const value = getComputedStyle(root).getPropertyValue("--safe-top").trim();
    if (value !== "") {
      clearTimeout(fallback);
      ready();
    } else {
      requestAnimationFrame(check);
    }
  };
  check();
}
```

The timeout and `value !== ""` test are load-bearing: `0px` is a valid resolved
value. Use this only after reproducing the jump; hiding first paint is not the
default solution.

## Choose status-bar and page color deliberately

For an iOS standalone app with the Apple capable tag, the upstream records
this operating model:

| Status-bar style | Page beneath bar | Typical top inset |
| --- | --- | --- |
| `default` | No; opaque system surface | `0px` |
| `black` | No; opaque black surface | `0px` |
| `black-translucent` | Yes; clock overlays page | Device inset |

Use `black-translucent` only when the layout really handles the top safe area.
Point-release regressions have changed the reported inset, so the zero-safe
rule still wins over this table.

Keep `theme-color` for browsers that honor it, but also give `<html>`, `<body>`,
and edge-touching fixed/sticky bars intentional backgrounds. The upstream's
Safari 26 tests report that system tinting can sample page surfaces instead of
the meta value. Exact sampling thresholds are community-derived and must not
be used as layout constants. An overlay hidden only with `opacity: 0` may
still affect sampling; remove inactive edge surfaces with `display: none` when
diagnosing an unexpected tint.

## Own the scroll root and touch behavior

One explicit scroll container makes scroll position, sticky chrome, and
overscroll behavior predictable. This is a starting shell, not a mandate to
replace a project's proven scroll architecture:

```css
html,
body {
  height: 100%;
}

body {
  background: #f5f5f4;
}

#root {
  height: 100%;
  min-height: 100vh;
  overflow-y: auto;
  overscroll-behavior-y: contain;
  isolation: isolate;
}

@media not all and (display-mode: standalone) {
  #root {
    min-height: -webkit-fill-available;
  }
}

header {
  box-sizing: border-box;
  position: sticky;
  inset-block-start: 0;
  min-height: var(--header-height);
  padding-block-start: var(--safe-top);
}
```

The upstream found `100vh` more stable than `100dvh` during iOS standalone
cold launch; treat that as a tested fallback and re-check current WebKit before
standardizing it. Put `overscroll-behavior` in CSS parsed before interaction,
not in a gesture-time JS mutation.

For native-feeling touch without removing accessibility:

```css
:where(*) {
  -webkit-tap-highlight-color: transparent;
}

button,
[role="tab"],
header,
nav {
  touch-action: manipulation;
  user-select: none;
}

img[data-custom-long-press] {
  -webkit-touch-callout: none;
}

:root {
  scroll-padding-block-start: var(--header-height);
}

@media (hover: hover) {
  /* Hover-only styles belong here so they do not stick on touch. */
}
```

Kill selection only on interface chrome, never on readable body text. Disable
the media callout only when it conflicts with a real custom gesture. Smooth
scrolling and other motion still need `prefers-reduced-motion` handling.

## Own navigation and installation hints

Standalone display can remove browser Back/Forward controls. Every screen
therefore needs a visible in-app way back, close, or home, and `scope` must be
tested with both internal and external links. On macOS, choose a display mode
with navigation controls when the product depends on browser history.

Scope is not the same as cross-application deep linking. On iOS, test where an
out-of-scope navigation goes from inside the installed app and where a matching
link from Mail or Messages opens. On macOS Safari 18+, WebKit documents that a
link opened from outside a browser can enter an installed app when it matches
manifest `scope`; a matching link clicked in Safari instead presents an Open
in Web App banner. These are separate entry paths and both belong in the test
matrix.

Safari does not provide Chromium's `beforeinstallprompt` flow. An iOS install
affordance is instructional copy for Share → Add to Home Screen, not an install
button. Show platform-correct instructions only after meaningful engagement,
hide them in standalone mode, provide dismissal, and persist that dismissal.
macOS copy must say Add to Dock and usually competes with Safari's own prompt.
Target the browser that matches the instructions: Safari's Share-sheet wording
is wrong for another iOS browser's menu, and an in-app browser may not expose
an Add to Home Screen path at all. Avoid a first-paint install banner based on
"iOS" alone.

## Generate and serve install assets deliberately

- Derive icon sizes and optional iOS startup images from one source artwork.
- Provide an opaque, unrounded 180×180 PNG as the conservative
  `apple-touch-icon`; let iOS apply its mask and shadow. Manifest fallbacks at
  192 and 512 are broadly useful, while current Safari 26 SVG support should
  be tested against older supported releases and candidate ordering.
- A macOS Dock app reads manifest icons rather than `apple-touch-icon`. The
  upstream recommends opaque 512 and 1024 PNG fallbacks; treat SVG/WebP choice
  and manifest ordering as current-browser test cases.
- Keep icon, startup-image, manifest, and body backgrounds intentionally
  consistent so launch does not flash between colors.
- iOS startup images use exact device-width, device-height, DPR, and
  orientation media matches. Generate links and images from one device table,
  deduplicated by the dimension/DPR tuple rather than model name.
- Treat the device table and Safari cache behavior as maintained data, not
  timeless prose. Version asset URLs and expect removal/re-addition during
  verification.
- Request the manifest, icons, and startup images without session cookies.
  Each must return the intended public asset with `200`, never an auth redirect.

An iOS startup-image entry is an exact match, not a responsive fallback; a
device with no matching entry can launch on a blank background:

```html
<link
  rel="apple-touch-startup-image"
  href="/splash/393/852/3?v2"
  media="(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
>
```

Image pixels equal CSS points multiplied by DPR: `393×852 @3` requires a
`1179×2556` portrait image. Swap width/height for landscape and generate two
entries per unique width/height/DPR tuple. The upstream reports that startup
images still depend on `apple-mobile-web-app-capable`; verify the rendered tag
before debugging the images themselves.

## Repair overlays and keyboard occlusion from current behavior

Start from the current browser and component-library implementation, because
iOS 26 point releases changed fixed positioning and viewport sizing. Useful
diagnostic details from the upstream and React Spectrum work:

- derive keyboard-visible height from `window.visualViewport`; listen for
  `resize` and `scroll`, and avoid chasing viewport changes while pinch-zoomed;
- focus with `element.focus({ preventScroll: true })`, then bring the field
  into view after the visual viewport reflects the keyboard;
- if preventing `touchmove`, preserve two-finger gestures, text selection,
  range controls, editable content, and scrolling inside the dialog;
- keep scroll containment in a stylesheet before the first touch;
- use dialog container queries when the dialog's own available width, rather
  than the layout viewport, determines its composition;
- if an iOS fixed backdrop is clipped, inspect current React Spectrum overlay
  code and WebKit bugs before copying the upstream's absolute-backdrop/sticky-
  dialog or opacity workarounds.

The upstream reports WebKit bug 259770 for `interactive-widget` as unresolved
at its 2026-09-04 revision. Check the live bug before assuming either support
or permanent absence.

## Know what does not carry to macOS

For a Mac-only Add to Dock target, do not spend implementation time on iOS
mechanics that have no observed effect there: `viewport-fit=cover`, nonzero
safe-area insets, `apple-mobile-web-app-capable`, Apple status-bar metadata,
`apple-touch-startup-image`, the iOS device table, the safe-area reveal gate,
or touch-only CSS. The manifest, `display-mode`, `start_url`, `scope`, `id`,
icons, explicit page backgrounds, and installed-mode navigation still matter.

`display: standalone` and `fullscreen` can remove macOS navigation controls;
other display modes or the user's per-app setting can retain them. Do not hide
the browser toolbar until every screen has a usable navigation path.

## Treat storage handoff as a boundary

Apple documents that macOS Safari copies cookies once when creating a Dock
app, but not other local storage; after creation the website and app data are
separate. That makes cookies the reliable authentication handoff, not
`localStorage` or IndexedDB. The upstream reports the same one-time cookie
copy on iOS 26.6 as a device observation; verify it for the supported release.

Persist resumable drafts and positions rather than trusting suspended runtime
memory. Keep irreplaceable state on the server because client storage remains
subject to browser policy and eviction.

## Escalate volatile Safari failures carefully

Safari 26 changed Home Screen eligibility and exposed several point-release
layout regressions. Feature-detect and make both outcomes valid; do not ship an
OS-version branch for a bug that Apple may fix or reintroduce. If fixed
backdrops or keyboard-driven dialogs fail, inspect current WebKit bugs and
React Spectrum's maintained overlay implementation before copying a historical
`opacity`, `100vh`, sticky-dialog, or `visualViewport` workaround.

Status-bar/theme-color sampling thresholds and iPad window-control offsets in
the upstream guide come from community reverse engineering. They are useful
diagnostic hypotheses, not constants. Re-test them on real hardware.

## Verify the installed artifact

1. Inspect deployed HTML for both capable tags, manifest, icon, and intended
   startup-image links.
2. Fetch every install asset without cookies and check status/content type.
3. Install on a real device, kill the app, and cold-launch it; test portrait,
   landscape, zoom, long content, dark mode, and an input-focused dialog.
4. Test notched and zero-inset layouts plus iPad windowed/full-screen modes.
5. Remove and re-add after icon/startup changes instead of trusting cache.
6. On macOS, check display/navigation controls, title treatment, authentication
   handoff, window resizing, and in-scope/out-of-scope links.

## Sources and staleness

- Joe Bell, `apple-web-app`, revision `3c875dd53150e763d82da3516a8a0dde21adc8c7`
  (2026-09-04): https://github.com/joe-bell/skills/tree/main/skills/apple-web-app
- WebKit, Safari 26 beta / every site can be a web app on iOS and iPadOS:
  https://webkit.org/blog/16993/
- WebKit, Safari 17 web apps on Mac, manifest customization, and cookie copy:
  https://webkit.org/blog/14445/webkit-features-in-safari-17-0/
- WebKit, Safari 18 macOS scope-based link opening:
  https://webkit.org/blog/15865/webkit-features-in-safari-18-0/
- Apple Support, current macOS web-app creation/settings behavior:
  https://support.apple.com/en-us/104996
- MDN, CSS environment variables:
  https://developer.mozilla.org/en-US/docs/Web/CSS/env

Re-check Safari/WebKit release notes, Web App Manifest support, device data,
and overlay bugs before giving exact implementation advice.
