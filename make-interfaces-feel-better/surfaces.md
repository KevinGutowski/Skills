# Surfaces

## Contents
- Concentric Border Radius
- Optical Alignment
- Shadows Instead of Borders
- Elevation Systems & Light-Source Shadows
- Eased Gradients
- Backdrop Blur × mix-blend-mode (Chrome Gotcha)
- Image Outlines
- Minimum Hit Area

Border radius, optical alignment, shadows, eased gradients, backdrop blur, and image outlines.

## Concentric Border Radius

When nesting rounded elements, the outer radius must equal the inner radius plus the padding between them:

```
outerRadius = innerRadius + padding
```

This rule is most useful when nested surfaces are close together. If padding is larger than `24px`, treat the layers as separate surfaces and choose each radius independently instead of forcing strict concentric math.

*Practical UI*'s fixed radius tokens — 8/16/32pt for small, medium, and large elements — can set the *base* sizes, but when surfaces nest, the concentric formula wins: derive the outer radius from inner + padding rather than picking both from the token set.

### Example

```css
/* Good — concentric radii */
.card {
  border-radius: 20px; /* 12 + 8 */
  padding: 8px;
}
.card-inner {
  border-radius: 12px;
}

/* Bad — same radius on both */
.card {
  border-radius: 12px;
  padding: 8px;
}
.card-inner {
  border-radius: 12px;
}
```

### Tailwind Example

```tsx
// Good — outer radius accounts for padding
<div className="rounded-2xl p-2">       {/* 16px radius, 8px padding */}
  <div className="rounded-lg">          {/* 8px radius = 16 - 8 ✓ */}
    ...
  </div>
</div>

// Bad — same radius on both
<div className="rounded-xl p-2">
  <div className="rounded-xl">          {/* same radius, looks off */}
    ...
  </div>
</div>
```

Mismatched border radii on nested elements is one of the most common things that makes interfaces feel off. Always calculate concentrically.

## Optical Alignment

When geometric centering looks off, align optically instead.

> "Junior designer: This is not aligned. Senior designer: It's optically aligned." — Stammy, https://x.com/stammy/status/1276602518693445637

### Buttons with Text + Icon

Use slightly less padding on the icon side to make the button feel balanced. A reliable rule of thumb is:
`icon-side padding = text-side padding - 2px`.

```css
/* Good — less padding on icon side */
.button-with-icon {
  padding-left: 16px;
  padding-right: 14px; /* icon side = text side - 2px */
}

/* Bad — equal padding looks like icon is pushed too far right */
.button-with-icon {
  padding: 0 16px;
}
```

```tsx
// Tailwind
<button className="pl-4 pr-3.5 flex items-center gap-2">
  <span>Continue</span>
  <ArrowRightIcon />
</button>
```

### Play Button Triangles

Play icons are triangular and their geometric center is not their visual center. Shift slightly right:

```css
/* Good — optically centered */
.play-button svg {
  margin-left: 2px; /* shift right to account for triangle shape */
}

/* Bad — geometrically centered but looks off */
.play-button svg {
  /* no adjustment */
}
```

### Asymmetric Icons (Stars, Arrows, Carets)

Some icons have uneven visual weight. The best fix is adjusting the SVG directly so no extra margin/padding is needed in the component code.

```tsx
// Best — fix in the SVG itself
// Adjust the viewBox or path to visually center the icon

// Fallback — adjust with margin
<span className="ml-px">
  <StarIcon />
</span>
```

## Shadows Instead of Borders

For **buttons, cards, and containers** that use a border for depth or elevation, prefer replacing it with a subtle `box-shadow`. Shadows adapt to any background since they use transparency; solid borders don't. This also helps when using images or multiple colors as backgrounds — solid border colors don't work well on backgrounds other than the ones they were designed for.

**Do not apply this to dividers** (`border-b`, `border-t`, side borders) or any border whose purpose is layout separation rather than element depth. Those should stay as borders.

### Shadow as Border (Light Mode)

The shadow is comprised of three layers. The first acts as a 1px border ring, the second adds subtle lift, and the third provides ambient depth:

```css
:root {
  --shadow-border:
    0px 0px 0px 1px rgba(0, 0, 0, 0.06),
    0px 1px 2px -1px rgba(0, 0, 0, 0.06),
    0px 2px 4px 0px rgba(0, 0, 0, 0.04);
  --shadow-border-hover:
    0px 0px 0px 1px rgba(0, 0, 0, 0.08),
    0px 1px 2px -1px rgba(0, 0, 0, 0.08),
    0px 2px 4px 0px rgba(0, 0, 0, 0.06);
}
```

### Shadow as Border (Dark Mode)

In dark mode, simplify to a single white ring — layered depth shadows aren't visible on dark backgrounds:

```css
/* Dark mode — adapt to whatever setup the project uses
   (prefers-color-scheme, class, data attribute, etc.) */
--shadow-border: 0 0 0 1px rgba(255, 255, 255, 0.08);
--shadow-border-hover: 0 0 0 1px rgba(255, 255, 255, 0.13);
```

### Usage with Hover Transition

Apply the variable and add `transition-[box-shadow]` for a smooth hover:

```css
.card {
  box-shadow: var(--shadow-border);
  transition-property: box-shadow;
  transition-duration: 150ms;
  transition-timing-function: ease-out;
}

.card:hover {
  box-shadow: var(--shadow-border-hover);
}
```

### When to Use Shadows vs. Borders

| Use shadows | Use borders |
| --- | --- |
| Cards, containers with depth | Dividers between list items |
| Buttons with bordered styles | Table cell boundaries |
| Elevated elements (dropdowns, modals) | Form input outlines (for accessibility) |
| Elements on varied backgrounds | Hairline separators in dense UI |
| Hover/focus states for lift effect | |

## Elevation Systems & Light-Source Shadows

(Wathan & Schoger, *Refactoring UI*; Adham Dannaway, *Practical UI* 2nd ed.)

### A fixed shadow scale with ambient decay (RUI)

Define shadows like spacing: "You don't need a ton of different shadows — five options is usually plenty." Define the smallest and largest, fill the middle linearly. Good shadows have two parts: a larger, softer cast shadow (big blur, big vertical offset — direct light) and a tighter, darker shadow hugging the bottom edge (where "even ambient light has a hard time reaching"). The rule that makes a 5-step elevation system coherent: as elevation rises, the ambient part fades — "make that shadow more subtle for shadows that represent a higher elevation. It should be quite distinct for your lowest elevation, and almost (or completely) invisible at your highest elevation." Assign shadows by z-position, not by looks: "Don't think about the shadow itself, think about where you want the element to sit on the z-axis." Interaction follows the same axis: a grabbed list item gains shadow (pops forward); a pressed button shrinks or loses its shadow (pushed in).

### Light-source recipes (RUI)

People look slightly downward at screens — simulate an overhead light:

- **Raised elements** (buttons): reveal a sliver of the lighter top edge via a top border or inset shadow with a slight vertical offset, plus a small dark drop shadow below with only a couple of pixels of blur (sharp, like a wall outlet's shadow). "Choose the lighter color by hand instead of using a semi-transparent white for best results — simply overlaying white can suck the saturation out of the underlying color."
- **Inset wells** (text inputs, checkboxes, wells): the *bottom* lip faces the light — lighter bottom border or inset shadow with a *negative* vertical offset, plus a small dark **inset** shadow with a slight *positive* vertical offset so the page above blocks light at the top.

### Dark-mode elevation is colour, not shadow (PUI)

"Shadows can be difficult to see in dark interfaces, so you mostly need to rely on colour to indicate depth." Use "3 background colours to indicate elevation": **Base** (darkest, main background), **Raised**, **Overlay** — three small lightness steps (PUI uses HSB brightness 10/15/20). Keep foregrounds consistently prominent across all three with a transparent foreground palette — see `oklch-skill` → Palette Roles & State Layers.

### Shadow value-systems menu

Three coherent systems — pick **one** per project, don't blend:

1. **MIB layered recipes** — this file's three-layer `--shadow-border` values (shadow-as-border + lift + ambient).
2. **RUI 5-step decay scale** — the elevation system above.
3. **PUI minimalist two** — "You'll generally need 2 shadow options (raised and overlay)."

## Eased Gradients

A plain two-stop `linear-gradient(A, B)` interpolates linearly, which leaves a visible edge where the gradient starts and stops — the eye picks up the abrupt change in rate. It's most obvious on fade-to-transparent scrims and on gradients with significant color changes (e.g. a brand color melting into a dark background). Ease the gradient instead: add intermediate stops that follow an easing curve so the transition starts and ends gently.

> "designers, please use eased gradients. 🙏 especially with significant color changes." — Stammy (Paul Stamatiou), Jun 2026: https://x.com/Stammy/status/2064496431214575671

This is a long-standing pro habit, not a one-off: asked "what's a design thing you do that is so subtle most people won't notice," his answer was "I almost always add easing to any gradients. Lots of figma plugins for this." (Apr 2022: https://x.com/Stammy/status/1519091644385136644) — so apply it in design files too, not just CSS.

### Scrim / Fade Example

```css
/* Bad — linear fade, visible line where the gradient ends */
.scrim {
  background: linear-gradient(to bottom, rgb(0 0 0 / 0.6), transparent);
}

/* Good — eased fade: alpha follows (1 − t)³ instead of a straight line */
.scrim {
  background: linear-gradient(
    to bottom,
    rgb(0 0 0 / 0.6) 0%,
    rgb(0 0 0 / 0.4) 12.5%,
    rgb(0 0 0 / 0.25) 25%,
    rgb(0 0 0 / 0.15) 37.5%,
    rgb(0 0 0 / 0.075) 50%,
    rgb(0 0 0 / 0.03) 62.5%,
    rgb(0 0 0 / 0.009) 75%,
    rgb(0 0 0 / 0.001) 87.5%,
    rgb(0 0 0 / 0) 100%
  );
}
```

Any smooth curve works — sample your preferred easing at 6–12 points and use those as stops. Generators exist (search "easing gradients"; `postcss-easing-gradients` automates it), and the same technique applies to native platforms by converting the stops (e.g. to a `CAGradientLayer` — neither UIKit nor SwiftUI eases gradients for you). Inspect the result at real size: the gradient should do its contrast job without becoming the first thing the eye notices.

### Color-to-Color Gradients

Two separate problems, two separate fixes — large color jumps often need both:

- **Muddy gray midpoints** come from interpolating in sRGB. Use a better interpolation space: `linear-gradient(in oklab, blue, hotpink)`. (See `oklch-skill` for color-space details.)
- **Hard start/end edges** come from linear stop spacing. Only eased stops fix this — interpolation space doesn't.

### Dark Mode Note

Don't fake a dark-mode variant by overlaying a gradient on a light-mode hero asset — the seam where the gradient meets the asset is exactly where banding shows. Ideally produce both a dedicated dark-mode version of the asset *and* an eased gradient:

```html
<picture>
  <source srcset="/hero-dark.avif" media="(prefers-color-scheme: dark)" />
  <img src="/hero-light.avif" alt="" />
</picture>
```

If a separate asset isn't available, use an eased overlay and verify the image still looks intentional rather than dimmed.

## Backdrop Blur × mix-blend-mode (Chrome Gotcha)

A `backdrop-filter: blur()` on one element can silently stop rendering when a completely different element on the page — not a parent, not a sibling — uses `mix-blend-mode`. If a backdrop blur mysteriously disappears, search the page for `mix-blend-mode`.

```css
/* Fix — isolate the blend-mode element behind its own backdrop context */
.blend-wrapper {
  backdrop-filter: opacity(1);
}
```

Wrap the `mix-blend-mode` element in a div carrying that no-op `backdrop-filter`. (Source: https://x.com/Stammy/status/1777719861306679322)

> ⚠️ Staleness: Chrome behavior observed April 2024 — verify the bug still reproduces in current Chrome before adding the workaround.

## Image Outlines

Add a subtle `1px` outline with low opacity to images. This creates consistent depth, especially in design systems where other elements use borders or shadows.

### Color rules (non-negotiable)

- **Light mode**: pure black — `rgba(0, 0, 0, 0.1)`. Exact values: R=0, G=0, B=0.
- **Dark mode**: pure white — `rgba(255, 255, 255, 0.1)`. Exact values: R=255, G=255, B=255.
- Never use a near-black or near-white from the project palette (e.g. slate-900, zinc-900, `#0a0a0a`, `#111827`, `#f5f5f7`). Tinted outlines pick up the surrounding surface color and read as dirt on the image edge.
- Never match the outline to the project's accent or ink color. The outline is a neutral separator, not a themed element.
- Scope note: *Practical UI*'s "avoid pure black" rule is about long-form *text* on white (eye strain) — it doesn't apply to these outlines, nor to OLED true-black backgrounds; don't generalize it into "never #000".

### Light Mode

```css
img {
  outline: 1px solid rgba(0, 0, 0, 0.1);
  outline-offset: -1px; /* inset so it doesn't add to layout */
}
```

### Dark Mode

```css
img {
  outline: 1px solid rgba(255, 255, 255, 0.1);
  outline-offset: -1px;
}
```

### Tailwind with Dark Mode

```tsx
<img
  className="outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
  src={src}
  alt={alt}
/>
```

Use `outline-black/10` and `outline-white/10` specifically — not `outline-slate-*`, `outline-zinc-*`, `outline-neutral-*`, or any tinted scale.

**Why outline instead of border?** `outline` doesn't affect layout (no added width/height), and `outline-offset: -1px` keeps it inset so images stay their intended size.

## Minimum Hit Area

Interactive elements should have a minimum hit area of 44×44px (WCAG) or at least 40×40px. If the visible element is smaller (e.g., a 20×20 checkbox), extend the hit area with a pseudo-element.

### CSS Example

```css
/* Small checkbox with expanded hit area */
.checkbox {
  position: relative;
  width: 20px;
  height: 20px;
}

.checkbox::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
}
```

### Tailwind Example

```tsx
<button className="relative size-5 after:absolute after:top-1/2 after:left-1/2 after:size-10 after:-translate-1/2">
  <CheckIcon />
</button>
```

### Collision Rule

If the extended hit area overlaps another interactive element, shrink the pseudo-element — but make it as large as possible without colliding. Two interactive elements should never have overlapping hit areas.
