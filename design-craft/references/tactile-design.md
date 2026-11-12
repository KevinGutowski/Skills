# Tactile Design — a theme for tactile, layered, quiet product UI

## Contents
- Source and scope
- When to use this theme (and when not)
- Operating posture
- The decision order
- The core model: tactility borrows from its parent
- Elevation per theme
- Hierarchy from contrast steps
- Rules worth remembering
- Never ship
- Conflicts with the other themes
- Deep files

## Source and scope

Kosta's *Tactile design* agent skill (https://kosta.fyi/skills/tactile-design; repo `kosta4a/tactile-design`, MIT, read at commit `30495a2`, 2026-11-02). It was distilled from building one production dashboard through hundreds of rounds of pixel-level review, and it records the reasons next to each decision. Its motion and sheet-drag rules credit Emil Kowalski, its colour model uses Radix's 12-step scales, and its touch and sheet sizes follow Apple's HIG. Everything below is paraphrased. Ledger: `docs/tactile-design-source-mining-2026-11.md`.

It is a **third complete theme** next to [polish-principles.md](polish-principles.md) (the house set) and [emil-kowalski.md](emil-kowalski.md). Pick one theme per project and don't average them. This theme is the most opinionated of the three about *surfaces and hierarchy*: what is raised, what is sunk, how dark mode lifts, and how many strong things a screen may hold.

The look in one line: soft off-white ground; white controls lifted by a fine ring and a crisp 1px drop, squeezing slightly on press; one black action per surface; fields sunk as wells; one type weight; 0.5px lines; colour only for meaning.

## When to use this theme (and when not)

Use it for **dense product UI** where calm is the goal: dashboards, settings, admin and billing pages, onboarding flows, tables, modals, menus and phone sheets. It is especially useful when an agent's output looks flat or generic and the brief says "make it feel like something you can press", or when you need a dark mode that lifts without glows.

Don't use it for:

- **Marketing or expressive surfaces.** A bold committed aesthetic belongs to `frontend-design`.
- **Native Apple apps.** Use `apple-design`. The theme borrows only HIG sizes, not the platform materials.
- **Brands that need colour to rank actions.** The theme forbids that. Either opt into its single accent primary or pick another theme.

## Operating posture

These habits come from how the source designer reviewed work. They transfer even if you don't adopt the look.

- **Smallest fix first.** Move in units of 2px, one ink step, or 5% of opacity or scale. One element and one change per note.
- **Reuse before inventing.** Find the product's existing role recipes (its primary and secondary button strings, pill and table helpers) and match them exactly. Treat a stock library primitive as legacy until it carries the recipe: press scale, hover, fill and edge.
- **Remove before adding.** "Remove" was the most common review verb: borders, separators, containers, eyebrows, icons, repeated words. Decoration such as gradients, stripes and glows was tried and came back out.
- **Unmatched siblings are bugs.** Neighbours share height, padding, radius, text size and ink.
- **A decided rule goes global at once.** Audit every instance in the same change rather than fixing one.
- **Light first, dark on purpose.** A light restyle doesn't touch dark unless dark is named. Sizes never fork between themes.
- **Check at 4–8× zoom** in both themes, with empty, loading, error, shortest and longest real data.

## The decision order

Work top to bottom. Most weak UI comes from starting at step 4.

1. **Hierarchy.** Name the single next step on this surface. That is the one primary, or there is none. Rank everything else below it: secondary (white, raised), utility (round pill or icon), tertiary (ghost or a text link). Destructive is never the primary.
2. **Amount of data.** Show the least that answers the page's question. One strong figure beats six tiles. Summary lists stop at 5–6 rows. Hide what is empty, finished or not yet relevant.
3. **Placement.** Pick the column by page type: about 800px to read, 1200px for data, 440px for a form or flow. A section's actions sit right of its title, *above* the data they act on. Paging sits below the data, outside its card.
4. **Component.** Plain rows for lists and navigation, a card for one unit of related data, a table for many records. Use a modal only for a focused task or a confirm; on a phone it becomes a sheet. Use a toast only for a result the user can't otherwise see.
5. **Surface.** Decide the ground first, then raise or sink, taking fill, edge and drop from that ground (next section).
6. **Type and spacing.** Use one weight. Rank with a size step plus an ink step. Put 4–8px inside a control, 12–16px between items and 24–32px between sections.
7. **Colour roles.** The neutral carries structure. Hue carries meaning only: a status, or an identity such as a tier or category. Hue never ranks importance.
8. **Motion gate.** Should it move at all? The more often it is seen, the less it moves.
9. **Phone.** 44pt targets, a 15px text floor, 16px field text, stacked full-width actions, dialogs as sheets, nothing that only appears on hover.
10. **Review.** At zoom, look for 1px seams, double borders, mismatched radii, wrapped labels, jumping layout and unmatched siblings.

## The core model: tactility borrows from its parent

A tactile thing has three parts: **fill, edge and drop**. None of them is a fixed value. Each is derived from the surface it sits on, so the same button reads equally pressable on a panel, a card, a rail, a table row, a sheet or a tint.

| Part | Light | Dark |
|---|---|---|
| Fill | the top surface (white) | the parent + 2 steps for a control, + 1 for a card |
| Edge | a 1px *alpha* ring of the neutral's darkest ink at about 8%, which adapts to whatever is beneath | one *solid* 0.5px outline about three steps lighter than the fill, the same colour all round |
| Drop | a crisp `0 1px 2px` in the neutral's darkest ink at about 12% | the same geometry in black at about 50% |

Consequences an agent gets wrong:

- **White on white still needs an edge.** A secondary button on a white card stays white. Its edge comes from the ring and the drop, never from a grey fill, because grey reads as disabled.
- **A drop is always darker than its parent.** In dark mode a light-coloured shadow, such as a badge's light text colour used as a blur, reads as a glow.
- **Derived tokens must be redeclared per surface.** A CSS custom property built from another variable resolves where it is *declared*, not where it is used. If `--shadow-button` is built from `--ink-7` and set once on `:root`, it won't follow a surface that remaps `--ink-7`. Redeclare the tactile tokens on every surface class. Alpha-based edges and drops adapt by themselves.
- **A badge borrows from itself.** Its edge and drop are mixed from its own text colour (`color-mix(in srgb, currentColor …)`), so every hue tints its own rim with one formula. In dark the rim is a *darker* shade of the hue, never the light text colour.

## Elevation per theme

**Light:** raised = white, a ring and a crisp drop. The shadow ladder is crisp. Every level is the button's ring and 1px drop plus *at most one* short drop with a negative spread:

| Level | The extra drop |
|---|---|
| Control | none (ring + `0 1px 2px`) |
| Table | the 1px drop alone, under its 0.5px frame |
| Card | `0 3px 4px -2px` |
| Menu, popover | `0 4px 8px -4px` |
| Modal | `0 6px 8px -4px` |

No big soft blurs. A tight drop reads as an edge resting on its parent; a big blur reads as haze.

**Dark:** a shadow alone doesn't read on near-black. Raised = **lighter steps + one solid 0.5px outline + a tight black drop**. Controls, badges, toggle pills, cards and tables all keep the drop, or grey controls look printed on. The order also turns over: the window ground sits *below* the neutral's step 1, the panel is step 1, and cards and overlays step up from there.

**Sizes never fork.** Every ring is a `box-shadow` (a 1px or 0.5px spread), so switching themes moves no pixel. Where dark shows a border that light hides, the border exists in both themes (transparent in light). `dark:` overrides may change colour and shadow only, never padding, height, radius or border width.

## Hierarchy from contrast steps

The ladder of emphasis, strongest first: **primary fill** (the darkest ink) → **white with a shadow** (secondary, cards, the chosen option) → **fill only** (selected rows, wells) → **text only** (links, ghost actions).

- **One weight renders everywhere.** For Inter that is Medium. Text ranks by a size step plus an ink step (darkest for titles and values, the next for descriptions, a third for meta). Bold is rare emphasis, not hierarchy.
- **Hue means status or identity, never rank.** Status wins a clash, and a brand hue near a status hue becomes that status. Highlights inside a sentence stay monochrome, because a hued word reads as a link.
- **No grey filled buttons in light.** Every button is white or the primary fill.
- **Destructive escalates.** The trigger on the page is a white button with red text. Only the final confirm *inside* its dialog is solid red, and it names the action ("Yes, delete"). In a "give something up" dialog (downgrade, cancel plan), the *keep* option is the primary.
- **Shape tells ownership.** A rectangle at control radius belongs to the surface (page and dialog actions). A round pill belongs to the content (copy, filter, back).
- **Fields are sunk, buttons are raised.** A field is a borderless well one step darker than its surface (one lighter in dark). Focus deepens it one step and adds the shared focus ring for keyboard users.

## Rules worth remembering

The deep files hold the numbers. These are the ones that change behaviour most:

- **Hover:** colour only, about 150ms, on a fine pointer only. Each row fades its *own* fill in place, never one highlight that slides between rows.
- **Selected vs hover:** hover is the local ground + 1 step and selected is + 2, so they never match. A chosen menu item is marked by its grey fill alone, with no tick and no reserved tick column.
- **Press squeeze grows as the target shrinks:** about .99 for cards and rows, .97 for buttons, .94 for 44px round icons, .92 for 22px row icons. Do it in CSS so a fast second press retargets.
- **Copy feedback is optimistic.** The icon becomes a tick on the click, before the clipboard promise resolves. If the write fails, revert at once. Never toast a copy.
- **Loading stays in the button.** The label swaps in place to a spinner plus "Saving…". Both labels share one grid cell, so the width never jumps. Never show a wrong label while the real state is unknown.
- **Springs stay inside their containers.** Overshoot grows with travel. A segmented pill crossing 100px at bounce .35 overshoots about 7px, past a 4px track inset. Use about .12 for toggle pills and .2 for a switch knob, and keep `overflow: hidden` only as a backstop.
- **Tables:** white rows in a 0.5px frame with a table drop, no zebra on short tables, one typeface with tabular figures (never a mono column), every cell left-aligned, status as a coloured dot rather than a badge, and the pager outside and below the card.
- **No eyebrows.** No small label over a title, no "Step 1 of 4" over a progress bar, no warning icon before an alert title.

## Never ship

Use this as a review checklist under this theme:

- [ ] More than one primary on a surface, or a primary that isn't the real next step
- [ ] A grey filled button in light, or hue used to rank actions
- [ ] A destructive action styled as the primary
- [ ] A `dark:` style that changes padding, height, radius or border width
- [ ] A fill, edge or drop hard-coded so it ignores the surface beneath
- [ ] A big soft shadow blur
- [ ] In dark: a lit top edge, an outline that changes colour round the edge, an edge thicker than 0.5px, or a drop lighter than its parent
- [ ] Double borders, or an inner radius that isn't the outer radius minus the border
- [ ] Hierarchy made with bold or with colour
- [ ] Actions placed below the data they act on (paging excepted), or a pager inside a table's card
- [ ] Fake data, or layout that jumps when data or a label arrives
- [ ] A tick on the chosen menu item, a toast for a copy, or a sliding row highlight
- [ ] `transition: all`, ease-in on UI, scaling from 0, or animation on keyboard actions, drag or data figures
- [ ] Hover-only information, sticky hover on touch, targets under 44pt, or fields under 16px on touch screens
- [ ] Not checked at 4–8× in both themes

## Conflicts with the other themes

Treat these as forks, chosen per project, not as rules to blend:

| Topic | This theme | Elsewhere in the library |
|---|---|---|
| Dark-mode edges | No lit top edge. One solid 0.5px outline, the same colour all round, plus a black drop. | Briggs' top-light model adds a white inset highlight on the top edge ([surfaces.md](surfaces.md) → Dark Mode Edge Highlights). |
| Shadow depth | A crisp ladder: a ring, a 1px drop and at most one short drop | Briggs' natural multi-layer stacks; Refactoring UI's 5-step ambient-decay scale ([surfaces.md](surfaces.md)) |
| Press scale | A ladder: .99 cards, .97 buttons, .92 small icons | The house value .96 ([polish-principles.md](polish-principles.md) §12); the Kold article's .98 |
| Button hierarchy | Primary = the darkest neutral; secondary = raised white; hue never fills a button except the final destructive confirm and an opted-in accent primary | `web-design` (form-design) follows Practical UI: a brand-filled primary and an outlined secondary |
| Validation timing | On blur and on submit, never per keystroke | form-design offers three approaches, including instant validation for working toward an answer |
| Disabled buttons | Disabled until the action can work (Create waits for its required field), then enabled with errors shown on submit | form-design (Dannaway): avoid disabled buttons; keep them enabled and validate, remove, or lock instead |
| Error placement | A 1px red box-shadow ring and the message directly *under* the field, replacing its help text | form-design (Dannaway): the message *above* the field, because autofill and keyboards cover the space below |
| Type weight | One weight everywhere | Most type guidance ranks with weight steps (`web-design` web-typography) |

## Deep files

The deep material sits one level down in `tactile-design/`. Each file lists the numbers, with the reason next to each:

- [tactile-design/tokens-and-surfaces.md](tactile-design/tokens-and-surfaces.md): the 12-step neutral roles and contrast gates, the step-shift rule and its CSS, the light and dark shadow ladders, radii, the layer stack, modals, sheets, menus, toasts, cards and tables, and remapping to your own palette and typeface.
- [tactile-design/controls.md](tactile-design/controls.md): button roles and sizes, press, hover, focus, disabled, loading and copy states, fields and errors, segmented toggles, switches, choice rows, menus, badges and status dots.
- [tactile-design/layout-and-data.md](tactile-design/layout-and-data.md): columns, rhythm, placement, amount of data, worst-case data, figures, meters, charts, steps, and empty, loading and error states.
- [tactile-design/motion-values.md](tactile-design/motion-values.md): the motion decision order, curves, durations, springs, travel, blur, patterns and reduced motion.
- [tactile-design/phone.md](tactile-design/phone.md): native feel, phone sizes and type, sheet anatomy and drag physics, phone tables and bottom bars.
