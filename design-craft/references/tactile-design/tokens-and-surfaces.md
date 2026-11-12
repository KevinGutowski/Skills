# Tactile Design — tokens and surfaces

Deep file for [../tactile-design.md](../tactile-design.md). These are the source's default values, written as roles and ratios so they survive a remap. "ink-N" is step N of a 12-step neutral. "hue-N" is step N of a coloured 12-step scale. Source: `kosta4a/tactile-design` (MIT), its tokens and surfaces-and-layering references, paraphrased.

## Contents
- Neutral roles and contrast gates
- Hue roles
- Surface roles and the step-shift rule
- Shadow ladder, light and dark
- Lines and radii
- Type
- The layer stack and shell
- Cards and tables
- Modals, side panels, sheets, menus, toasts
- Remapping to your palette and typeface
- Snippets

## Neutral roles and contrast gates

Any 12-step neutral works (the default is Radix sand): gray, slate, mauve, olive or your own. Choose it once, at setup. Pairing it with the brand hue is fine. After that, never mix brand hue into neutral steps.

| Steps | Job |
|---|---|
| 1–2 | grounds (2 = the app ground in light, a raised surface in dark, a stripe) |
| 3–5 | fills: the field well, a selected row (3); hover on a fill, a focused well (4); pressed (5) |
| 6–8 | lines: hairlines and control rings (6), strong or hovered lines (7), rare disabled text (8) |
| 9–10 | faint text: leading icons and group titles (9); meta, placeholders, chevrons (10) |
| 11 | secondary text: descriptions, body, row icons |
| 12 | strong text, and the primary fill |

**Gates to check after a remap**, because default sand fails some of them:

- ink-12 is at least 7:1 on steps 1–3, and ink-11 at least 4.5:1 on step 3.
- ink-10 must reach 4.5:1 if it carries meta or labels. Otherwise keep it for placeholders, chevrons and icons at 3:1 or more. Sand's light ink-10 is only 3.87:1 on white (3.40:1 on an ink-3 well), so essential text (rail labels, empty-state lines, figure labels, pager counts) moves to ink-11.
- ink-9 is for icons and non-essential text only.
- hue-11 is at least 4.5:1 on hue-3.
- ink-6 is at least about 1.35:1 against the top surface, so a 0.5px hairline still shows.
- The focus-ring step (ink-10 by default) is at least 3:1 on white, on wells and on dark steps 1–4. Never hard-code a dark alpha for focus, because it vanishes in dark.

## Hue roles

| Step | Role |
|---|---|
| 3 / 4 | tint fill / tint hover (badges, callouts, toasts, status rows) |
| 6 | edge on a tint |
| 9 / 10 | solid / solid hover (dots, chart bars, done markers, the destructive confirm, a switch that's on) |
| 11 | text on a tint, and red text on a white button |
| contrast | text on a step-9 solid (dark for yellow, amber, lime, mint and sky) |

- **Status roles are fixed** (success green, danger red, warning yellow or amber, info blue, inactive neutral) and status wins any clash. A brand hue within about 25° of a status hue in OKLCH becomes that status's scale and is never used for identity.
- **Identity hues** (a tier, a category) take a non-status hue, carried to its badge, bar and avatar tint.
- **A brand colour too dark or light for text** at step 9 stays step 9 for fills without text. Where a solid carries a label, use 10 or 11.

## Surface roles and the step-shift rule

| Role | Light | Dark |
|---|---|---|
| Ground (window, rail) | ink-2 | below ink-1: lower dark ink-1's OKLCH lightness by the ink-1→2 gap (about 0.04) at the same hue |
| Panel (page body) | top surface (white) | ink-1 |
| Raised card | white | ground + 1 |
| Control fill | white | ground + 2 |
| Well (field, toggle track) | one step darker than its surface | one step lighter |
| Overlay (menu, modal, popover) | white | ink-2 |
| Hover / selected on any fill | local ground + 1 / + 2 | the same |

**Step-shift rule.** Components are drawn as if they sit on step 1. A container whose ground is a different step remaps steps 1–7 inside itself, so every child keeps the same contrast against its ground. Text steps 8–12 never move. A rail on an ink-2 ground maps 1→2, 2→3 … 7→8. An overlay maps 1 and 2 to the top surface and leaves 3–7 at their root values. A raised surface resets to root.

Implementation gotchas:

- A step can't be defined from its own neighbours on the same element, because each would chain to the last. Keep fixed `--root-ink-N` handles per theme and remap `--ink-N` from them.
- **Derived variables resolve where they are declared.** Redeclare every token built from a working step on each surface class: in light the hairline colour and the primary's surface-coloured ring; in dark the control outline inside the button shadow, plus any alias of it, such as a toggle shadow that points at the button shadow. Edges drawn in an alpha, in black or in a `currentColor` mix adapt by themselves.

## Shadow ladder, light and dark

Light shadows are drawn in the neutral's ink-12 as RGB (`--shadow-ink`), never pure black, so a tinted neutral gets one shadow colour. Dark drops stay black.

| Token | Light | Dark |
|---|---|---|
| Button / toggle / pill | ring `0 0 0 1px` at 8% + drop `0 1px 2px` at 12% | `0 0 0 0.5px` of the step three above the control's fill (ink-6 on the panel, ink-7 on a card or overlay) + `0 1px 2px` black 50% |
| Primary | a 1px ring in the *local surface colour*, so the fill reads a pixel smaller and sits level with the white buttons | a 0.5px ring in its own fill + the black drop |
| Card | ring 7% + drop 12% + `0 3px 4px -2px` at 8% | 0.5px ink-6 + the black drop + `0 3px 4px -2px` black 40% |
| Table | the 1px drop only (its 0.5px frame is the ring) | the same, in black |
| Menu / popover | ring 8% + drop 12% + `0 4px 8px -4px` at 16% | 0.5px ink-7 + the black drop + `0 4px 8px -4px` black 50% |
| Modal / side panel | ring 7% + drop 14% + `0 6px 8px -4px` at 14% | 0.5px ink-7 + the black drop + `0 6px 8px -4px` black 50% |
| Panel on the ground | a 0.5px alpha ring and very faint drops | darker, so it reads on near-black |
| Badge | `currentColor` ring at 14% + drop at 16% | 0.5px `color-mix(in srgb, currentColor 34%, #000)` + the black drop |

The dark rule: every edge is 0.5px and solid, the same colour all round. There is no lit top inset and no second line under the outline, because on a dark ground the pair reads as a gradient outline.

## Lines and radii

- **One structural line weight: 0.5px**, in ink-6 (one step darker in dark, so lines don't glow). The 1px rings inside the light shadows are the only 1px lines.
- **A ring as `box-shadow: 0 0 0 0.5px`** replaces a border without affecting layout.
- **If the dark line rule is written as a selector list** of hairline utilities, a line drawn any other way (an inset box-shadow, say) keeps its light colour in dark. Give it its own remap.
- **Bar edges are drawn over the bar** as an absolutely positioned 0.5px element, so content centres on the full bar height.
- **A sticky header's foot line** appears only once content scrolls under it.
- **Prefer a fade to a hard cut.** Where content scrolls, a background-coloured mask fade says "more" better than a scrollbar. Animate its length through a registered `@property`.
- **Radius ladder from one knob.** Set the control radius (4–8px, matched to the icon set's corners; the default is 6). Key chips take half of it, checkbox marks 2px less, containers (panel, cards, tables, menus, dialogs) 2px more, feature cards 1.5× the container, and phone sheet tops a fixed 14px. Pills, badges, tracks and dots are fully round.
- **Nested radius = outer minus border.** A header band inside an 8px dialog keeps 8px when the dialog's edge is a shadow ring, but takes 7.5px under a 0.5px border.

## Type

- **One sans for every word, one mono for machine values** (IDs, code, keys). A table never gets a mono column; it uses tabular figures in the sans.
- **One rendered weight.** `normal`, `medium` and `semibold` all draw at the weight where the face reads solid at 13px (Medium for Inter).
- **Line heights are absolute px.** The defaults: 13/20 for body and controls, 12/16 for meta, 16/24 for card and dialog titles, 20/28 for section titles, 24/32 for figures, and 32/40 for display at −0.02em. Button labels track −0.01em. 13px is the base, not 14, for dense product UI.
- **Bar and row heights are a line height plus twice the padding** (36 = 20 + 2×8; 38 = 20 + 2×9). Recompute them if the line height changes.

## The layer stack and shell

Bottom to top: the **ground** (window and rail) → the **panel** (page body; it floats 8px off the window on top, right and bottom, flush with the rail, radius 8; pages scroll inside it) → **raised** (cards, buttons, the chosen toggle option) → **wells** (fields, tracks) → **overlays** (menus, popovers, modals, side panels, search) → **toast**.

- **Rail:** its width is the widest nav label + a 16px icon + gap + padding, rounded up to 4px. It has a pinned top (switcher, search), a scrolling middle with fades and a pinned foot (one notice, then the account). Space separates the groups, not rules. Groups are always open. The current page is a fill only: no edge, no shadow. Navigation shouldn't look like a button.
- **Top strip:** a control height plus twice its inset (52 = 36 + 2×8). The page title is centred at body size and absolutely positioned so it doesn't move with the switcher. Breadcrumbs at the left replace back buttons; page actions sit at the right.
- **Collapsing a rail is three beats:** contents fade out (about 80ms), the width animates (about 220ms), contents fade back in. Contents stay pinned at full width, so nothing reflows mid-move.

## Cards and tables

| Content | Container |
|---|---|
| Navigation, link and choice lists | plain rows, with a fill on hover only |
| One unit of related data (a figure with its chart, a balance, a plan) | a card |
| Many records with the same fields | a table |
| Grouped settings on a phone | one raised card of rows |

- **Section headings sit outside cards.** The card doesn't repeat the heading's name.
- **A data card** has 24px padding and 16–24px gaps. An optional header strip holds a body-size title, a hairline under it and its action at the right.
- **A clickable card** hovers one step darker and presses to about .99. Cards in a row share one height.
- **A selection card** looks *pressed in* when picked: a fill and a hairline, no shadow.
- **A confirm shown in place** (no backdrop) takes the button shadow, not the modal's. It is raised, not floating.
- **Tables:**
  - **Frame and fill:** a 0.5px frame with 0.5px column dividers, radius 8, the table drop, and one fill for the header and every row. Stripes only on long tables.
  - **Rows and ink:** 38px rows (44pt on a phone) with 12–16px cell padding, matched within a table. The header row and the identifying first column are ink-12; the other cells are ink-10, or ink-11 if 10 misses 4.5:1.
  - **Alignment and status:** every cell left-aligned, figures included, in tabular numerals. Status is a coloured dot with its label, not a badge.
  - **Columns:** they hug their content. Free text caps at about 32ch, then truncates with "…" and a tooltip. The actions column comes last and offers only valid actions.
  - **Row states:** an expired row fades as a whole row, never one cell. A new row's fill fades from a tint to clear over about 700ms.
  - **Pager:** outside and 12px below the card, the count at the left and Previous/Next at the right, shown only when there is a page to move to.
  - **Empty:** hide the header and pager. Show a bare, centred ground-coloured panel with a small icon (not in a box) and two lines: what's missing, then what to do.
  - **Failed load:** the empty layout plus one secondary "Try again".
  - **Loading:** keep the frame and column widths and pulse bars in place of text.

## Modals, side panels, sheets, menus, toasts

- **Modal widths:** about 620px for forms, 460px for confirms, 440px for a compact info popup. Cap at full width with a 16px gutter and at the viewport height minus 32px.
- **Three parts split by full-width hairlines:** a header band (title 16/24, description 4px under), a body (the only part that scrolls; inputs fill the width), and a footer (Cancel left, confirm right, buttons hugging their labels). A simple confirm has two parts: the band holds the message, then the actions. State the consequence plainly ("This will delete the key from 3 projects").
- **No × on footer-driven modals.** Cancel, Escape and a backdrop click close them. Once the form has changed, the backdrop click does nothing, or asks first.
- **Behaviour:**
  - Focus the first field on open, not Cancel. Trap Tab, return focus to the trigger on close, and lock page scroll.
  - Never stack two modals; replace the content in place, holding the card's size where possible.
  - Anything opened from a modal sits above it.
  - An error from a modal on a list page becomes a toast after it closes.
- **Backdrop:** one recipe everywhere: black at about 30% in light and 90% in dark, with a 2px blur. Modals always dim. A side panel dims only when fullscreen. The side panel itself is 400–480px wide with the modal's structure, and becomes a sheet on a phone.
- **Phone sheet surface:** white in light, with 14px top corners and a hairline on the top edge only. There is no header band and no ×: a white tactile grab handle above the sheet replaces the ×, and tapping it closes the sheet. The sheet is the ground its children borrow from, so give it the overlay surface class. Related information joins one raised card of rows. **Buttons never sit inside that card**; they go below it as full-width secondary buttons. Drag physics: [phone.md](phone.md).
- **Menu:**
  - **Trigger:** the secondary button, its chevron turning over while open.
  - **Body:** portalled, 6px from the trigger, min width about 160px, radius 8, with the menu shadow as its only edge.
  - **Items:** button height, 2px apart. Highlight is ground + 1 and chosen is ground + 2, in full ink with no tick.
  - **Closing and moving:** it closes on outside press, Escape, resize or page scroll. Don't move an open menu while its items shift. A menu stays inside the container it opens in.
- **Tooltip:** it names an icon-only action with zero delay, and is never the only place information lives.
- **Toast:**
  - **Placement:** one at a time, bottom centre.
  - **Look:** a tinted pill (tone-3 fill, tone-6 ring, tone-11 text) with at most one action. It auto-dismisses after about 6s.
  - **When:** only for a result the user can't otherwise see, such as a background job or a failure from a closed modal. Never for a copy or anything already on screen. Decorative shapes are for celebrations only, never for errors or routine saves.

## Remapping to your palette and typeface

1. **Neutral:** fill the 12 root steps for light and dark, then run the gates above. Derive the alpha steps from ink-12 (about 6% and 10% in light, 7% and 11% in dark) if your generator doesn't supply them.
2. **Top surface:** pure white by default. If your step 1 is tinted, make the top surface lighter than it and recheck the hairline gate.
3. **Hues:** generate 12 light and 12 dark steps per brand colour. Fill the hue roles, alias the standard families to their nearest brand colour, and apply the status-collision rule.
4. **Primary:** ink-12 on ink-1 by default. An accent primary is opt-in: accent-9 fill, accent-contrast text at 4.5:1 or more, accent-10 hover. That hue then leaves status use, and the destructive confirm must still look clearly different.
5. **Shadow ink:** set it to light ink-12's RGB.
6. **Radius:** change the control radius only.
7. **Typeface fit:**
   - **Size:** `font-size-adjust: 0.546` (Inter's x-height ratio) matches another face's apparent size to the tuned px values. Otherwise scale every size by `0.546 / (sxHeight / unitsPerEm)`. Scale column widths by the same factor.
   - **Weight:** render 13px in Inter 500 next to your face at 400, 500 and 600, and pick the closest ink coverage. Ties go lighter. Never use a synthesised weight.
   - **Tracking:** keep the negative tracking only for faces as loose as Inter.
   - **Requirements:** the face needs `tnum` and a real "…" glyph.
8. **Non-default faces:** a brand heading face may set display and section titles only, in one weight, never controls or tables. Non-Latin scripts start from 14/22 (16/24 on a phone) with no negative tracking.
9. **From other systems:**
   - **shadcn:** background → panel; muted and input → ink-3; muted-foreground → ink-11; border → ink-6; ring → the focus step.
   - **Tailwind grays:** 50→1, 100→2–3, 200→4–5, 300→6–7, 400→8–9, 500→10, 600→11, 900–950→12.
10. **Leave the rest:** heights, the 0.5px hairline, shadow geometry, durations, curves and spacing are the system. Change them only on purpose, and everywhere at once.

## Snippets

Trimmed from the source's CSS template (MIT, © the tactile-design authors). The values are the sand defaults. View the full set on GitHub:

- [Full CSS template](https://github.com/kosta4a/tactile-design/blob/30495a2db7cb59a72bacea106118ffeab7af00d9/skills/tactile-design/references/tokens.md#L331-L462): every `--root-ink-*`, hue slot, size, type and duration token, plus the phone, touch and dark blocks.
- [Step-shift surface classes](https://github.com/kosta4a/tactile-design/blob/30495a2db7cb59a72bacea106118ffeab7af00d9/skills/tactile-design/references/tokens.md#L61-L115).
- [Tailwind v4 mapping](https://github.com/kosta4a/tactile-design/blob/30495a2db7cb59a72bacea106118ffeab7af00d9/skills/tactile-design/references/tokens.md#L464-L500).

**Working steps over fixed handles.** Components read `--ink-N`; only surfaces remap them.

```css
:root {
  --root-ink-1: #fdfdfc; --root-ink-2: #f9f9f8; --root-ink-3: #f1f0ef; /* … through 12 */
  --ink-1: var(--root-ink-1); --ink-2: var(--root-ink-2); --ink-3: var(--root-ink-3); /* … */
  --surface-top: #fff;
  --primary-bg: var(--ink-12);
  --primary-fg: var(--ink-1);
  --primary-hover: color-mix(in oklab, var(--primary-bg) 93%, var(--primary-fg));
  --radius-control: 6px;                       /* the one radius knob */
  --radius-container: calc(var(--radius-control) + 2px);
}
```

**The shadow ladder, light and dark.** Light shadows are drawn in `--shadow-ink`. Dark mode changes colour and shadow only, never sizes.

```css
:root {
  --shadow-ink: 33 32 28; /* light ink-12 as RGB */
  --shadow-button: 0 1px 2px 0 rgb(var(--shadow-ink) / .12), 0 0 0 1px rgb(var(--shadow-ink) / .08);
  --shadow-primary: 0 0 0 1px var(--ink-1); /* ring in the local surface colour */
  --shadow-card: 0 0 0 1px rgb(var(--shadow-ink) / .07), 0 1px 2px 0 rgb(var(--shadow-ink) / .12),
                 0 3px 4px -2px rgb(var(--shadow-ink) / .08);
  --shadow-menu: 0 0 0 1px rgb(var(--shadow-ink) / .08), 0 1px 2px 0 rgb(var(--shadow-ink) / .12),
                 0 4px 8px -4px rgb(var(--shadow-ink) / .16);
  --shadow-badge: 0 1px 2px 0 color-mix(in srgb, currentColor 16%, transparent),
                  0 0 0 1px color-mix(in srgb, currentColor 14%, transparent);
}
:root[data-theme="dark"] {
  /* one solid 0.5px outline + a tight black drop; no lit top edge */
  --shadow-button: 0 0 0 0.5px var(--ink-6), 0 1px 2px 0 rgb(0 0 0 / .5);
  --shadow-primary: 0 0 0 0.5px var(--primary-bg), 0 1px 2px 0 rgb(0 0 0 / .5);
  --shadow-card: 0 0 0 0.5px var(--ink-6), 0 1px 2px 0 rgb(0 0 0 / .5), 0 3px 4px -2px rgb(0 0 0 / .4);
  --shadow-badge: 0 0 0 0.5px color-mix(in srgb, currentColor 34%, #000), 0 1px 2px 0 rgb(0 0 0 / .5);
}
```

**Redeclare derived tokens per surface.** This is why the edge follows its parent.

```css
/* Light: a rail on the ink-2 ground shifts steps 1–7 up by one */
.surface-rail { --ink-1: var(--root-ink-2); --ink-2: var(--root-ink-3); /* … 7 → 8 */
                --line: var(--ink-6); --shadow-primary: 0 0 0 1px var(--ink-1); }
/* Dark: each surface redeclares the control outline, three steps above the control fill */
:root[data-theme="dark"] :is(.surface-raised, .surface-overlay) {
  --shadow-button: 0 0 0 0.5px var(--root-ink-7), 0 1px 2px 0 rgb(0 0 0 / .5);
  --shadow-toggle: var(--shadow-button); /* aliases must be redeclared too */
}
```

**Tailwind v4: colours in `@theme inline`, shadows as arbitrary values.** A shadow aliased in `@theme` resolves once, at `:root`, and stops following the surface. Writing `shadow-[var(--shadow-button)]` makes the utility read the token on the element itself.

```css
@theme inline {
  --color-ink-1: var(--ink-1); /* … through ink-12 */
  --color-line: var(--line);
  --color-primary: var(--primary-bg);
  --text-sm: var(--text-body); --text-sm--line-height: var(--leading-body); /* base is 13px */
  --font-weight-normal: var(--font-weight-ui); /* one weight: map normal/medium/semibold */
  --font-weight-medium: var(--font-weight-ui);
}
@theme { --ease-out: cubic-bezier(.23, 1, .32, 1); } /* fixes the weak default ease-out utility */
```
