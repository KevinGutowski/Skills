# Tactile Design — phone

Deep file for [../tactile-design.md](../tactile-design.md). Source: `kosta4a/tactile-design` (MIT), its mobile reference, paraphrased. The source credits its motion principles and sheet-drag conventions to Emil Kowalski; where they overlap, [../emil-kowalski.md](../emil-kowalski.md) is the fuller treatment and these are the product's tuned values. Siblings: [layout-and-data.md](layout-and-data.md), [motion-values.md](motion-values.md).

## Contents
- Phone: native feel
- Phone: sizes, type, layout
- Phone: sheets and drag physics
- Phone: tables and bottom bars
- Snippets

## Phone: native feel

The platform layer (symptom → cause → fix, hardware verification, the never-disable-zoom rule) is covered in more depth by `web-design` (mobile-web-native-feel). These are the theme's defaults on top of it.

Apply these to every phone change without being asked:

- **Hover:** only under `(hover: hover) and (pointer: fine)`, so hover states don't stick after a tap. On coarse pointers, show the same look on `:active`, wrapped in `:where()` so a control's own active style still wins.
- **Taps:** `-webkit-tap-highlight-color: transparent`, and `touch-action: manipulation` on controls (no double-tap delay).
- **No accidental selection:** `user-select: none` and `-webkit-touch-callout: none` on controls, with content left selectable.
- **No rubber banding or scroll chaining:** `overscroll-behavior: none`.
- **Viewport and safe areas:** `100dvh`, not `100vh`; `env(safe-area-inset-*)` on bars, sheets and fixed actions.
- **Scrollbars and hover-only information:** hide scrollbars on phones; a fade or a cut-off item says "more". No hover-only information: tips open on tap, and disabled reasons show as text.
- **A 44×44 hit area** around a small control via a centred `::after` sized `max(100%, 44px)` under `(pointer: coarse)`, leaving its look unchanged. Hit areas of neighbouring small icons must not overlap.
- **Breakpoint and touch:** "phone" is under 48rem on `screen` only, so print keeps desktop sizes. "Touch" is `(pointer: coarse)`. 16px fields, 44pt targets and hidden key chips apply to tablets too.

## Phone: sizes, type, layout

- **Sizes:** buttons, fields and selects are 44px; rows are at least 44px; rows in a sheet or grouped card are 48pt; the gutter is 20px.
- **Type floor:** 15/24 for body, controls and meta. Descriptions directly under a 15px-or-larger lead may drop to 14/20. Fields are 16px, and titles 20–24px.
- **Layout changes:**
  - **Actions** move under the title at full width.
  - **Grids** go to one column.
  - **A toggle that doesn't fit** becomes a dropdown pill opening a sheet.
  - **Search** comes first, full width.
  - **Long labels shorten** ("org", whole amounts without ".00").
- **Shell:**
  - **Panel:** edge to edge, with no float, radius or shadow.
  - **Top bar:** 56px plus the safe area. A breadcrumb starts from the logo mark (a child page names itself instead of showing Back), and a 44px menu button sits at the right.
  - **Menu panel:** it stays mounted and `inert` while closed, so dialogs opened from it survive.

## Phone: sheets and drag physics

- **Shape:**
  - **Top:** 14px top corners and a hairline on the top edge only.
  - **Height:** the max height leaves room at the top for the grab handle.
  - **Underneath:** the sheet's colour runs well below its foot, so pulling up never shows a gap.
  - **At rest when closed:** below the screen by its full height plus the handle's offset.
- **Grab handle:**
  - **Look:** about 36×5, solid white in both themes, with the button's ring and drop. Its parent is the dimmed backdrop, so its edge is black.
  - **Hit area:** about 88×44, labelled "Close". Tap, Enter or Space closes the sheet.
  - **Press and focus:** it squeezes to about .94 when pressed, and keyboard focus rings it with a white gap.
- **Content:**
  - **Title:** no title band. The title is a 20/28 section title on the sheet.
  - **Information:** grouped in one raised card of 48pt rows.
  - **Buttons:** full-width secondaries *below* that card, never inside it, with the confirm on top in footers.
- **Drag:**
  - **Where:** from anywhere on the sheet, rows and buttons included. On the handle a press is a drag at once, and a release without moving more than 4px closes the sheet. Elsewhere a press becomes a drag only after 4px of slop; until then a tap stays a tap.
  - **Pointer handling:** once dragging, the sheet captures the pointer and swallows the click that ends the drag. On touch the browser has already captured the press to the row it landed on, and that element's `lostpointercapture` bubbles up when the sheet takes over. Only the sheet's *own* capture loss cancels the drag.
  - **Scrolling bodies:** a body that scrolls keeps its scroll, and drags the sheet only when at its top and pulled down.
- **Release:**
  - **Velocity:** measured over the last 100ms.
  - **Close:** past `min(64px, 15% of the sheet's height)`, or on a downward flick faster than about 0.11 px/ms. The cap keeps tall sheets easy, the percentage keeps short ones from closing by accident, and the flick corroborates Emil Kowalski's momentum rule. The sheet slides out in 300ms on the drawer curve.
  - **Otherwise:** it springs back in 400ms. A press that catches the sheet mid-spring takes it from where it is.
  - **Pulling up:** it only gives, tiring out towards about 32px (`(1 − 1/(d·0.55/32 + 1))·32`). This is the only rubber band in the app.
  - **CSS:** drive the drag with the CSS `translate` property, which stacks on the enter/exit `transform`, so neither interrupts the other.
  - **When not to drag:** never while the sheet can't close (busy, paying). Under reduced motion, a release snaps back or fades out.

## Phone: tables and bottom bars

- **Tables:**
  - **Scrolling:** the frame scrolls sideways with no scrollbar. Columns hug their widest cell (a grid with a subgrid per row), and cells never wrap.
  - **Sticky first column:** the first column stays sticky unless that leaves less than about 88px beside it. Once scrolled, light mode adds a soft inner shadow on its edge.
  - **Last column:** scrolled to the end, it fills the remaining width.
  - **Rows:** the whole row opens the item.
  - **Pager:** the count gets its own line.
- **A fixed bottom action bar for flows** sits on the ground with a top hairline. Its bottom padding is `max(20px, env(safe-area-inset-bottom))`, actions stack with the primary on top, and the content gets enough bottom room to scroll out from under it.
- **Check on a real device:** every target at least 44pt with no overlapping hit areas. Nothing under the notch or home indicator, no sticky hover, no field zoom. Sheets close on a short pull or flick while a tap on a row still lands. Check both themes.

## Snippets

From the source's mobile reference (MIT, © the tactile-design authors). The [full native-feel table](https://github.com/kosta4a/tactile-design/blob/30495a2db7cb59a72bacea106118ffeab7af00d9/skills/tactile-design/references/mobile.md#L11-L44) and [stacking utilities](https://github.com/kosta4a/tactile-design/blob/30495a2db7cb59a72bacea106118ffeab7af00d9/skills/tactile-design/references/mobile.md#L86-L109) are on GitHub, and the [sheet drag rules](https://github.com/kosta4a/tactile-design/blob/30495a2db7cb59a72bacea106118ffeab7af00d9/skills/tactile-design/references/mobile.md#L152-L168) are in the same file.

**Hover only for a mouse or trackpad (Tailwind v4).** This stops hover states from sticking after a tap.

```css
@custom-variant hover {
  @media (hover: hover) and (pointer: fine) {
    &:hover { @slot; }
  }
}
```

**A 44×44 hit area round a small control, without changing its look.**

```css
@media (pointer: coarse) {
  .touch-target { position: relative; }
  .touch-target::after {
    content: ""; position: absolute; left: 50%; top: 50%;
    width: max(100%, 44px); height: max(100%, 44px);
    transform: translate(-50%, -50%);
  }
}
```

**Phone and touch values change in tokens, not per component.**

```css
@media screen and (width < 48rem) {
  :root { --control-h: 44px; --row-h: 44px; --text-body: 15px; --leading-body: 24px; }
}
@media (pointer: coarse) { :root { --text-field: 16px; } } /* iOS zooms fields under 16px */
```

**The sheet's upward give**, the only rubber band in the app:

```js
const give = (d) => (1 - 1 / ((d * 0.55) / 32 + 1)) * 32; // d = px dragged up; tends to 32px
```
