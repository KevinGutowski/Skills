# Refactoring UI Visual Pass

*Scope:* Wathan/Schoger-style visual refactors for web/product UI. Use this when a
screen is structurally correct but feels amateur, flat, noisy, cramped, or hard to
scan. Code-native examples: [examples/refactoring-ui-gallery.html](../examples/refactoring-ui-gallery.html).
The gallery covers 45 recreated examples: 36 compact bad/good lesson pairs plus
9 larger panels for the highest-signal full-page examples. The examples were
rebuilt in HTML/CSS from local PDF renders and extracted images; do not commit
the source book screenshots.

## Contents

1. Workflow
2. Hierarchy
3. Spacing
4. Text
5. Color
6. Depth
7. Images
8. Finishing touches
9. Routing

## 1. Workflow

Start from a real feature, not the shell. Get a small useful slice on the page,
then refactor it visually. Detail comes in passes: grayscale hierarchy first,
then spacing/type systems, then color/depth/image treatment, then finishing
touches.

Do not design more states than you can build now. If a control implies upload,
bulk edit, comments, or file attachment, either build that behavior or remove
the affordance until the feature exists.

## 2. Hierarchy

When everything asks for attention, the UI reads as one content wall. First
choose the one thing the user should notice, then de-emphasize everything that
competes with it.

- Size alone is a weak hierarchy tool. Combine moderate size with weight and
  color. Avoid making important text comically large or supporting text tiny.
- Use two or three text colors: primary dark, secondary muted, tertiary lighter.
  Stay above readable contrast for real content.
- Labels are a last resort for data displays. Prefer format/context when obvious
  (`janedoe@example.com`, `$19.99`), or combine label and value (`12 left in
  stock`, `3 bedrooms`). When labels are necessary, make the value the focus.
- Do not let semantic elements dictate visual size. An `h1` page label in an app
  can be small if the section content is what matters.
- Balance weight and contrast. Heavy icons next to text often need a softer
  color; soft 1px borders may need 2px weight instead of darker color.
- Button semantics do not determine button prominence. Primary = current page's
  main action; secondary = clear but quiet; tertiary = discoverable. A destructive
  action only becomes red and dominant inside the confirmation step.

## 3. Spacing

Start with too much whitespace, then remove it. Adding space upward from a
cramped default usually stops at "not bad"; removing from a generous default
finds cleaner layouts faster.

- Use a non-linear spacing scale. Small values need tight increments; large
  values need wider jumps. Adjacent values should differ by roughly 25% or more.
- Pick by elimination: guess a spacing value, try the next lower and higher
  scale values, then keep the one that is obviously best.
- Do not force proportional scaling. A dense table, a hero, and a mobile card can
  all use the same scale without preserving identical ratios.
- Avoid ambiguous spacing. Space inside a group must be smaller than space
  between groups: label-to-input < input-to-next-label, list-line-height <
  bullet-to-next-bullet, heading-to-paragraph < previous-paragraph-to-heading.

## 4. Text

Use a type scale for decisions, not arbitrary pixel values. Interface type scales
usually need hand-picked sizes more than pure modular ratios.

- Use `rem` or `px` for scale values. `em` makes nested text drift off-scale.
- Choose UI fonts with enough weights, legible x-height, and proven small-size
  behavior. For source-depth typography decisions, route to `web-design`
  (`web-typography`).
- Keep paragraphs around 45-75 characters. If a layout needs wide media, the
  text can still be narrower than the media.
- Align mixed-size text by baseline, not center.
- Line-height is proportional: tighter for large headings, looser for small body.
- Not every link needs brand color. In dense UI, weight/underline/context may be
  enough.
- Letterspace uppercase and numeric display strings; avoid tracking lowercase.

## 5. Color

The original book argues for HSL over hex/RGB. In this corpus, OKLCH is the
modern endpoint of the same intent: adjust color in perceptual dimensions and
define fixed scales, not one-off values.

- A real UI needs greys, primary colors, and accent/semantic colors, each with
  multiple shades.
- Define shades up front. Choose the base from a real use case such as a button,
  choose edges from text/tinted backgrounds, then fill the gaps.
- Trust the eye after the system. Do not generate unlimited near-duplicate blues.
- Greys can be warm or cool. Keep temperature consistent across light/dark
  shades.
- Accessibility can be quiet. If white text on a colored badge needs a dark
  background that hijacks hierarchy, flip it: dark colored text on a light tint.
- Color must support another signal; it cannot be the only indicator. Add text,
  icon shape, direction, or contrast.

## 6. Depth

Depth is not decoration. It tells the user what sits above what, what is active,
and where focus should go.

- Light comes from above. Raised elements get a slight lighter top edge and a
  small lower shadow; inset elements get the inverse.
- Use a shadow/elevation scale. Small shadow = slight lift, medium = dropdown,
  large = modal/focus capture.
- Two-part shadows: a large soft cast shadow plus a tighter darker ambient shadow
  near the object. As elevation rises, the tight ambient part fades.
- Flat designs still need depth. Use lighter/darker background layers or short
  hard shadows.
- Overlap sections/cards to create layers. For overlapping images, add an
  invisible border/gap matching the background so edges do not clash.

## 7. Images

Bad images break good UI. Do not design around perfect placeholder imagery unless
the real system can guarantee similar images.

- Text over photos needs a controlled background. Use an overlay, lower image
  contrast, colorize/desaturate, and/or add a broad subtle text glow.
- Everything has an intended size. Small icons do not become professional hero
  illustrations when scaled up; keep the glyph near its drawn size inside a
  larger shape. Full screenshots shrunk into tiny areas become illegible; use a
  smaller-device screenshot, partial crop, or simplified mock.
- User-uploaded images need fixed containers and `object-fit: cover`; never let
  intrinsic aspect ratios break a grid. Prevent image/background bleed with an
  inner shadow or translucent inner ring instead of a clashing hard border.

## 8. Finishing Touches

Once hierarchy, spacing, type, color, depth, and image handling are solid, add
small deliberate details:

- Supercharge defaults: icons in lists, styled quotes, custom underlines, custom
  checked states.
- Add accent borders to otherwise plain cards, active nav items, alerts, or
  section headers.
- Decorate backgrounds with subtle tints, gradients no more than about 30
  degrees apart, low-contrast patterns, or simple geometric shapes.
- Empty states are first impressions. Hide dead supporting controls, add a clear
  illustration/visual anchor, and make the next action prominent.
- Use fewer borders. Prefer shadows, background contrast, or spacing before
  adding divider lines.

## 9. Routing

- Use `design-polish` for the visual refactor pass and concrete HTML/CSS fixes.
- Use `web-design` (`web-typography`) for deeper reading typography.
- Use `web-design` (`oklch-skill`) for palette generation and contrast math.
- Use `web-design` (`web-accessibility`) for accessibility standards and testing.
- Use `frontend-design` when the user asks to build a distinctive new page/app
  rather than refactor an existing utilitarian screen.
