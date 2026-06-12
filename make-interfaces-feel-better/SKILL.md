---
name: make-interfaces-feel-better
description: Design engineering principles for making interfaces feel polished. Use when building UI components, reviewing frontend code, or implementing animations, hover states, shadows, borders, typography, micro-interactions, or any visual detail work. Triggers on UI polish, "make it feel better", "feels off", stagger animations, optical alignment, font smoothing, tabular numbers, box shadows, eased gradients, scrims, backdrop blur.
---

# Details that make interfaces feel better

Great interfaces rarely come from a single thing. It's usually a collection of small details that compound into a great experience. Apply these principles when building or reviewing UI code.

## Theme Note

The specific values in this skill (scale magnitudes, stagger delays, shadow recipes, radii) are tuned to work as a coherent set — like a color scheme, they look best when committed to as a whole. If another design skill is also loaded with different numbers, pick one skill's values and apply them consistently rather than averaging across skills.

For motion-specific work, `web-animation-design` is the default theme — defer to its values when both are loaded. When the user is mixing skills and a genuine choice surfaces, briefly present the options as a menu rather than picking silently.

This skill is the *how* of the **Craft** principle. For the strategic layer — whether a feature should exist, what to cut, and how to weigh craft against the other design principles — use `design-principles`. For applying this polish to *custom iOS components* (Liquid Glass, concentric edges, branded controls that must still feel native), use `ios-brand-identity`. For the before/during/after feedback model behind press states and hit areas (Apple's "Life of a Button"), see `swiftui` (touch-interaction-design).

## Quick Reference

| Category | When to Use |
| --- | --- |
| [Typography](typography.md) | Text wrapping, font smoothing, tabular numbers |
| [Surfaces](surfaces.md) | Border radius, optical alignment, shadows, eased gradients, backdrop blur, image outlines, hit areas |
| [Animations](animations.md) | Interruptible animations, enter/exit transitions, icon animations, scale on press |
| [Performance](performance.md) | Transition specificity, `will-change` usage, perceived performance (spinner choice) |

## Core Principles

### 1. Concentric Border Radius

Outer radius = inner radius + padding. Mismatched radii on nested elements is the most common thing that makes interfaces feel off. (Apple's design system formalizes this as the *concentric* shape type — see `liquid-glass-design-system` for the fixed/capsule/concentric taxonomy on Apple platforms.)

**The geometry behind the rule** (Dan Hollick, *Making Software*, makingsoftware.com/chapters/drawing-curves): a rounded corner is a circle arc placed at tangent distance `d = r / tan(θ/2)` from the corner point along each edge — for 90° corners, d equals the radius. Nested curves run parallel exactly when "the radius of the inner circle needs to be equal to the radius of the outer circle minus the distance between the two rectangles" (e.g. 40 − 13 = 28) — `outer − gap = inner`, the same formula as above. For squircles, CSS superellipses interpolate by exponent: 0 = straight chamfer between tangent points, 4 = the classic squircle, and large values square off — "10 or higher, effectively approximate a square."

### 2. Optical Over Geometric Alignment

When geometric centering looks off, align optically. Buttons with icons, play triangles, and asymmetric icons all need manual adjustment.

### 3. Shadows Over Borders

Layer multiple transparent `box-shadow` values for natural depth. Shadows adapt to any background; solid borders don't.

For richer elevation, use Briggs' (PixelJanitor) natural shadow stack: a 0-offset 1px ring layer, geometric Y progression (1/3/6/12/24) with blur equal to Y and negative spread half of Y, and one shared color/alpha across all layers. In dark mode, prefer outline borders *darker* than the background plus falloff shadows and tiny inner highlights — again sharing one alpha — before adding heavier black shadows.

### 4. Interruptible Animations

Use CSS transitions for interactive state changes — they can be interrupted mid-animation. Reserve keyframes for staged sequences that run once.

### 5. Split and Stagger Enter Animations

Don't animate a single container. Break content into semantic chunks and stagger each with ~100ms delay.

### 6. Subtle Exit Animations

Use a small fixed `translateY` instead of full height. Exits should be softer than enters — asymmetry can be in the *properties*, not just speed: movement (`translateX/Y`) on enter, dissolve (blur + opacity, no movement) on exit. See [animations.md](animations.md) → Asymmetric Properties.

### 7. Contextual Icon Animations

Animate icons with `opacity`, `scale`, and `blur` instead of toggling visibility. Use exactly these values: scale from `0.25` to `1`, opacity from `0` to `1`, blur from `4px` to `0px`. If the project has `motion` or `framer-motion` in `package.json`, use `transition: { type: "spring", duration: 0.3, bounce: 0 }` — bounce must always be `0`. If no motion library is installed, keep both icons in the DOM (one absolute-positioned) and cross-fade with CSS transitions using `cubic-bezier(0.2, 0, 0, 1)` — this gives both enter and exit animations without any dependency.

For custom switches and pill indicators, consider a sequenced middle state: stretch the thumb/indicator to span the control (width to `100%`), swap the parent's justification while it is spanning, then contract to the destination (width to `auto`). Use it only when the control has enough space for the morph to read clearly.

### 8. Font Smoothing

Apply `-webkit-font-smoothing: antialiased` to the root layout on macOS for crisper text.

### 9. Tabular Numbers

Use `font-variant-numeric: tabular-nums` for any dynamically updating numbers to prevent layout shift.

### 10. Text Wrapping

Use `text-wrap: balance` on headings. Use `text-wrap: pretty` for body text to avoid orphans. (Deeper web typography reference — measure, scales, pairing, OpenType, font loading: `web-typography`.)

### 11. Image Outlines

Add a subtle `1px` outline with low opacity to images for consistent depth. The color must be pure black in light mode (`rgba(0, 0, 0, 0.1)`) and pure white in dark mode (`rgba(255, 255, 255, 0.1)`) — never a near-black like slate, zinc, or any tinted neutral. A tinted outline picks up the surface color underneath it and reads as dirt on the image edge.

### 12. Scale on Press

A subtle `scale(0.96)` on click gives buttons tactile feedback. Always use `0.96`. Never use a value smaller than `0.95` — anything below feels exaggerated. Add a `static` prop to disable it when motion would be distracting.

### 13. Skip Animation on Page Load

Use `initial={false}` on `AnimatePresence` to prevent enter animations on first render. Verify it doesn't break intentional entrance animations.

### 14. Never Use `transition: all`

Always specify exact properties: `transition-property: scale, opacity`. Tailwind's `transition-transform` covers `transform, translate, scale, rotate`.

### 15. Use `will-change` Sparingly

Only for `transform`, `opacity`, `filter` — properties the GPU can composite. Never use `will-change: all`. Only add when you notice first-frame stutter.

### 16. Minimum Hit Area

Interactive elements need at least 40×40px hit area. Extend with a pseudo-element if the visible element is smaller. Never let hit areas of two elements overlap.

### 17. Layout Stability Over Skeletons

(Dennis Brotzky, Fey — animations.dev interview.) "When you open a page, things don't move around. There aren't loaders. And if you can achieve that, I think you'll be in the top, top 1% of web apps."
- **Preload over placeholders**: have the data ready before the click whenever possible — a burst of spinners/skeletons on navigation "completely ruins the experience."
- If a skeleton is unavoidable, the loaded content must land **exactly where the skeleton was** — no shift.
- A skeleton for content of *unknown width* (a team name, a title) is a design smell — "an engineering solution thinking first." Redesign so the unknown isn't load-bearing (lead with an icon or fixed-size element instead).
- **Motion as wayfinding**: animate things *toward where they live* (Linear's composer minimizes into the sidebar, teaching you where drafts go) — the animation is the tutorial.

### 18. Modern CSS Primitives (Jhey Tompkins, Config 2024)

Let the browser do the boring stuff "so we can focus on the really important stuff":
- `@starting-style` + `transition-behavior: allow-discrete` — transition from `display: none` (dialogs/popovers) with zero JS.
- **Popover + anchor positioning** — top layer ("z-index, see you later"), free light-dismiss/focus; `position-try: flip-block flip-inline` keeps it in-viewport; `anchor-size()` enables button-morphs-into-form patterns.
- **Scroll-driven animations** — `view-timeline`/`scroll-timeline`, `animation-range: entry`, `timeline-scope` to scroll one element and animate another.
- **Gradient borders** via layered `padding-box`/`border-box` backgrounds + transparent border; `offset-path` for constant-speed perimeter motion (mask rotation speeds up in corners); progressive blur via stacked masked blur layers with exponential multipliers.
- Write-once habits: `pow()`-based fluid type scale (`--font-level` per element), `color-mix()` theming toward white/transparent, `light-dark()`, a `linear()` spring dropped into the stylesheet "and never touched again," **`sin()`-based eased staggers** (set a spread angle instead of guessing per-index delays).
- Small wins: `field-sizing: content` for auto-growing textareas; `scrollbar-color`/`scrollbar-width`.

### 19. The Squint Test & Anti-Sterile Texture

- **Squint test** (Henry Modisett, Perplexity): "squint at the screen and still flow through the product… the best products have almost a gravitational pull to them. You can't really use them the wrong way."
- **Anti-sterile texture** (Inga Hampton, Raycast): "Blur is a superpower. Nothing in the real world is perfectly sharp" — even ~0.3px of blur de-sterilizes vector art; grain "ties everything together and helps with color banding"; in raster-painting, "blend modes do most of the work" (lighten, color dodge, plus-darker).

### 20. Emphasis Can Read as an Ad

Visual emphasis backfires past a threshold: banner blindness means highly differentiated content gets filtered as advertising — "it's good to be aware of when visually differentiating content could inadvertently lead to it being mistaken for an ad" (Jon Yablonski, *Laws of UX*, ch. 8, von Restorff). If a promoted card uses gradient-on-color treatment unlike anything around it, users may skip it entirely; emphasize within the page's own visual language.

## Common Mistakes

| Mistake | Fix |
| --- | --- |
| Same border radius on parent and child | Calculate `outerRadius = innerRadius + padding` |
| Icons look off-center | Adjust optically with padding or fix SVG directly |
| Hard borders between sections | Use layered `box-shadow` with transparency |
| Jarring enter/exit animations | Split, stagger, and keep exits subtle |
| Numbers cause layout shift | Apply `tabular-nums` |
| Heavy text on macOS | Apply `antialiased` to root |
| Animation plays on page load | Add `initial={false}` to `AnimatePresence` |
| `transition: all` on elements | Specify exact properties |
| First-frame animation stutter | Add `will-change: transform` (sparingly) |
| Tiny hit areas on small controls | Extend with pseudo-element to 40×40px |
| Visible band/edge where a gradient ends | Use eased gradient stops; `in oklab` for muddy color midpoints |
| Backdrop blur silently stops rendering (Chrome) | Wrap the page's `mix-blend-mode` element in a div with `backdrop-filter: opacity(1)` |
| Custom branded loader on slow, uncontrollable waits | Use the system spinner — custom loaders make users blame *you* for the wait |

## Review Output Format

Always present changes as a markdown table with **Before** and **After** columns. Include every change you made — not just a subset. Never list findings as separate "Before:" / "After:" lines outside of a table. Group changes by principle using a heading above each table, and keep each row focused on a single diff so the reader can scan the whole list quickly.

### Example

#### Concentric border radius
| Before | After |
| --- | --- |
| `rounded-xl` on card + `rounded-xl` on inner button (`p-2`) | `rounded-2xl` on card (`12 + 8`), `rounded-lg` on inner button |
| `border-radius: 16px` on both nested surfaces | Outer `24px`, inner `16px` with `8px` padding |

#### Tabular numbers
| Before | After |
| --- | --- |
| `<span>{count}</span>` on animated counter | `<span className="tabular-nums">{count}</span>` |
| Default numerals on timer | Added `font-variant-numeric: tabular-nums` to root |

#### Scale on press
| Before | After |
| --- | --- |
| `<button className="...">` | Added `active:scale-[0.96] transition-transform` |
| `scale(0.9)` on press | Raised to `scale(0.96)` — anything below `0.95` feels exaggerated |

Rows should cite the specific file and the specific property that changed when it isn't obvious from the snippet. If a principle was reviewed but nothing needed to change, omit that table entirely — empty tables add noise.

## Review Checklist

- [ ] Nested rounded elements use concentric border radius
- [ ] Icons are optically centered, not just geometrically
- [ ] Shadows used instead of borders where appropriate
- [ ] Enter animations are split and staggered
- [ ] Exit animations are subtle
- [ ] Dynamic numbers use tabular-nums
- [ ] Font smoothing is applied
- [ ] Headings use text-wrap: balance
- [ ] Images have subtle outlines
- [ ] Buttons use scale on press where appropriate
- [ ] AnimatePresence uses `initial={false}` for default-state elements
- [ ] No `transition: all` — only specific properties
- [ ] `will-change` only on transform/opacity/filter, never `all`
- [ ] Interactive elements have at least 40×40px hit area
- [ ] Gradients (scrims, fades, large color changes) use eased stops, not two-stop linear

## Reference Files

- [typography.md](typography.md) — Text wrapping, font smoothing, tabular numbers
- [surfaces.md](surfaces.md) — Border radius, optical alignment, shadows, eased gradients, backdrop blur, image outlines
- [animations.md](animations.md) — Interruptible animations, enter/exit transitions, icon animations, scale on press
- [performance.md](performance.md) — Transition specificity, `will-change` usage, perceived performance (spinner choice assigns blame)
- [references/sources.md](references/sources.md) — bibliography (Briggs/PixelJanitor tweet IDs, CodePens, video IDs)

### 21. Eased Gradients

Two-stop linear gradients leave a visible edge where they start and stop — especially fade-to-transparent scrims and significant color changes. Add intermediate stops sampled from an easing curve so the transition starts and ends gently. For color-to-color gradients also interpolate in a better space (`in oklab`) to avoid muddy midpoints — but only eased stops fix the hard edges. For dark mode, make a dedicated dark-mode hero asset rather than overlaying a gradient on the light-mode one.

### 22. Spacing Scale Construction

(Wathan & Schoger, *Refactoring UI*; Adham Dannaway, *Practical UI* 2nd ed.)

- **The 25% rule** (RUI): spacing perception is relative — 12px→16px "is an increase of 33%!" while 500px→520px is 4%. So "make sure no two values in your scale are ever closer than about 25%": packed at the small end, spreading at the large end.
- **Pick by process of elimination** (RUI): "start by taking a guess… Then try the values on either side (12px and 24px) for comparison." Both outer options obviously wrong → the middle wins; if an outer one looks best, re-run with it as the middle.
- **A concrete default** (PUI): t-shirt sizes on an 8pt grid — XS 8 / S 16 / M 24 / L 32 / XL 48 / XXL 80 (4pt increments for dense UI). Like a type scale, options "should grow by larger amounts as they get bigger."
- **Assign by relatedness, growing outward** (PUI): "Space elements based on how closely related they are" — interfaces are rectangles within rectangles; apply XS to the innermost rectangles and "gradually increase the spacing between rectangles as you move outwards" (XXL between page sections).
- **Theme note:** these numbers are one coherent set satisfying the 25% rule. If another loaded skill carries a different scale, pick one system whole — never mix values from two scales. Elevation systems and light-source shadow recipes from the same books: [surfaces.md](surfaces.md) → Elevation Systems.

## Rendering physics worth knowing

(Dan Hollick, *Making Software* — makingsoftware.com/chapters/blurs-noise-and-other-effects and /chapters/how-a-screen-works.)

- **Why blur radius is the cost knob.** "A 3x3 kernel requires 9 multiplications for every single pixel in the image but a 20x20 kernel means 400 multiplications." The saving grace: "because the Gaussian function is separable, we can split a 2D blur into two 1D passes… we only need 40 operations per pixel instead of 400. This is actually how most blur implementations work in practice, including CSS filter: blur()". Cost still scales linearly with radius — large `backdrop-filter` blurs over big areas are the expensive case, not blur per se.
- **OLED economics of dark UI.** OLED pixels "can simply be turned off when not in use. This means they can be perfectly black… while also having the benefit of reducing power consumption in practice." True-black (`#000`) backgrounds are free battery on OLED; near-black isn't.
- **Burn-in is a static-chrome risk.** OLED compounds "slowly degrade after use… This is what causes burn in on OLED displays that are used to display static images for long periods of time, with the blue sub-pixels tending to degrade faster than the others." For always-on or kiosk-style UI, avoid bright static chrome — and be most careful with blue-heavy elements.

## MDS field rules (live polish sessions)

(MDS — Matt D. Smith, Shift Nudge — live design sessions, YouTube.)

- **Layout connectors.** Every element corner should line up with something else — from any edge you should be able to draw a straight line to another element. If "you couldn't draw these straight lines, these lines of continuation… it would just feel off balance." This is how a grid is actually *used*: not columns to fill, lines to connect. Maxim: "negative space is design oxygen."
- **Border/spacing trade law.** "When you have a distinct and like overt divider you can get away with a smaller amount of space"; with no border or background change you need more "negative space to give that implied separation." It's one knob — don't turn both up (wasted room) or both down (lost grouping).
- **One stroke color, deliberate weights.** Every divider/border on a screen uses the exact same color (and the same width unless consciously different): "a lot of UI design is just exercising constraint and building these little systems."
- **Contrast = depth control.** "Every time you use a contrast color you're playing with depth." Don't put everything at 4.5:1 — uniform contrast feels "washed out and flat." And "failing scores are great for borders": 1.2–1.5 is a *deliberate* range for hairlines, disabled states, and decorative text.
- **Mud City.** Low-contrast fill + drop shadow = "bad muddy color combination" — "as soon as we put a drop shadow on this it's just Mud City." Never shadow a low-contrast button; earn the shadow with contrast first.
- **Proximity law.** "The space between two different elements… should be larger than the space between two similar elements."
- **Shape scarcity.** Reserve a shape for the primary action: "the only thing that's a rectangle on this screen is the add to cart button… the shapes allow us to kind of subconsciously know what to choose." The primary CTA gets a unique color *and* a unique shape — "an unmistakable undeniable clickability."
- **Baseline-align adjacent text rows.** When different text sizes sit side by side, "anytime you align Baseline it's just going to be so much tighter."
- **Button padding ratios.** Horizontal padding ≈ double vertical — "16 and 8 or 20 and 10" is the starting point. Kill default layout gaps ("I always change this to zero"). And verify concentric radii in outline mode (⌘Y in Figma) — measure inner radius + gap on the actual paths instead of eyeballing (the formula is Principle 1).
