# Solid Glass — a theme for dark, text-dense agent workspaces

## Contents
- Source and scope
- When to use this theme (and when not)
- The four rules
- Thickness: the three panes
- The pane recipe
- One state
- Buttons, fields, focus, grooves
- Color, radius, type
- Light theme differences
- Without transparency
- Motion
- How it is built
- Conflicts with the other themes
- Look it up

## Source and scope

DeepLethe's *Solid Glass* (https://github.com/deeplethe/solid-glass, MIT, read at commit `6e8903e`, 2026-11-18; site https://deeplethe.github.io/solid-glass). It is a stylesheet that restyles stock shadcn/ui on Tailwind 4 by the token names and `data-slot` attributes those components already carry, plus a dozen components for interfaces where an agent works while someone watches. Its stock components, examples, and component docs are shadcn/ui's; the stylesheet, its four docs pages, its own dozen components with their pages and examples, and the agent-workspace block are original, and a few stock components carry small changes (Button gains a `glass` variant). Everything below is paraphrased from the stylesheet's comments, the Material and Theming pages, and the contributing guide.

**Every value here is pinned to `6e8903e`.** The repository is young and has no tests; read the live `src/solid-glass.css` before copying a number.

It is a **fourth complete theme** beside [polish-principles.md](polish-principles.md), [emil-kowalski.md](emil-kowalski.md), and [tactile-design.md](tactile-design.md). Pick one theme per project and don't average them. Several of its rules contradict tactile-design outright (see Conflicts).

The look in one line: an even, unlit dark-gray page; thick smoky panes that read as solid from a distance and as glass only at their edges; ink-colored primary actions; hue only for status.

The agent-surface behavior that ships with it (status line, tool-call rows, composer) is not part of the theme. It lives in `ai-experience-design` (patterns), under Agent-turn surfaces.

## When to use this theme (and when not)

Use it for a **dark-first, text-dense agent or chat workspace** built on shadcn/ui's Base UI components (React 19) and Tailwind 4, where long text sits on layered panels and the brief wants material without color bleeding through.

Don't use it for:

- **Native Apple apps, or a web port of Liquid Glass.** Use `apple-design` (liquid-glass-design-system). This material is deliberately the opposite: it lets an outline through, not color.
- **Marketing or expressive surfaces.** Those belong to `frontend-design`, whose anti-slop catalog treats decorative glass as a tell.
- **Low-powered targets or long virtualised lists of cards.** The theme puts `backdrop-filter` on every card, panel, sidebar, popover, glass button, and chat bubble.
- **Products that need color to rank actions,** a project not on shadcn/ui's token names, or one on Radix-based shadcn components. The construction below depends on those names, and its state selectors key on Base UI's attributes (`data-checked`, `data-popup-open`, `data-pressed`, `data-highlighted`), which Radix components do not set.

## The four rules

1. **The finish is at the edge.** A line of light on top, a hairline all round, a shadow underneath. Never a gradient or highlight across the face.
2. **Heavy, not airy.** Neutral gray. The blur softens what is behind a pane without boosting its color. A pane that takes the color behind it is liquid glass, which this is not.
3. **Depth is thickness.** Panel is thinnest, card in between, anything that floats is thickest. Thicker means more opaque, so text behind a menu does not show through it.
4. **One state.** Hovered, chosen, and held-open wear the same small pane of clear glass, so "this one" reads the same in a sidebar, a menu, and a tab. (That is the source's wording. In the stylesheet "hovered" here means the highlighted row of a menu or list; ordinary hover elsewhere is a flat fill. See One state.)

The source positions itself against both neighbors: flat UI is an opaque block with no finish; liquid glass lets all the color behind through, so on a text-heavy page the reader fights the background for the words.

## Thickness: the three panes

Depth is said with fill opacity, not with lighter and darker fills.

| Surface | Dark | Light |
|---|---|---|
| Page (opaque) | `oklch(0.16 0 0)` | `oklch(0.925 0.007 265)` |
| Panel | white at 4.5% | `oklch(0.975 0.004 265 / 44%)` |
| Card | `oklch(0.31 0 0 / 46%)` | `oklch(0.98 0.004 265 / 60%)` |
| Popover, menu, dialog | `oklch(0.22 0 0 / 96%)` | `oklch(0.985 0.003 265 / 96%)` |

Blur: `blur(26px)` on panes in dark, `blur(26px) saturate(180%)` in light, `blur(14px)` on small controls. Dark adds no saturation on purpose: a pane that leans blue beside a gray one reads as a second palette.

## The pane recipe

A panel or card gives up its border (`border-width: 0`) and draws everything as shadows, in this order: a 1px inset line of light on the top edge (the rim); a fainter 1px inset ring (gives the edge thickness); a 1px outer ring (the hairline that cuts the pane out of the page); a `0 1px 2px` contact shadow; and one narrow shadow pulled downward, `0 12px 32px -14px`.

A popover uses the rim, the outer hairline, a deeper fall of `0 24px 60px -18px`, and a second lift shadow of `0 6px 16px -6px`.

Dark alphas: rim white 16%, inner ring white 4%, hairline white 6%, shade black 60%. Clear glass in dark is a white 7% fill with an 11% rim (outline and secondary buttons, toggles, the open tab, the one state). The glass button keeps the 7% fill under the full 16% rim; the default chat bubble is white 10% under the 11% rim.

## One state

Selection, held-open (a trigger whose menu is open), and the highlighted row in a menu, option list, or command list share one look: the clear-glass fill, a line of light on top, a hairline round it. **No gradient and no shadow**, because a row in a list with a shadow starts to look like a raised button. A step brighter marks an "armed" item (the tag the next Backspace removes).

Where the element keeps a border of its own (a button, a toggle), the border is the hairline and nothing is drawn outside it; an outer ring there stands a pixel off the fill and reads as a second outline.

Ordinary hover (where shadcn uses a muted or accent hover fill) is a flat step with no rim or hairline; only those replacements sit under `@media (hover: hover)`. Button hovers are unguarded at `6e8903e`.

## Buttons, fields, focus, grooves

- **Primary button:** a pane the color of the ink at 86% solidity (88% in light), with a line of light on top, a line of shade on the bottom, a hairline, and a short shadow. Hover thins it by 10 points of opacity; it does not change color. Pressed, it loses its standing shadow. The stylesheet adds **no press scale**; the button's 1px downward translate is the only movement.
- **Smaller ink-filled things** (a default badge, the filled part of a progress bar or slider, an on switch, a ticked box) are the same pane without the standing shadow and with a fainter bottom shade; on something 20px high a full one reads as a bevel.
- **Outline and secondary buttons** are clear glass with the control blur.
- **Fields** are the same clear glass as an outline button, so a form reads as one material. They are not sunk.
- **Focus on a field** is only its border changing to the focus line (white at 40% in dark, near-black at 50% in light). shadcn's 3px ring is removed there as too much light for a dark page.
- **Focus elsewhere** is a 2px line standing 1px off the element: `0 0 0 1px` in the page color, then `0 0 0 3px` in the focus line.
- **Grooves** (a slider or progress track, an off switch, an unticked box, a tab tray) invert the light: an inset shade under the upper lip, a line of light along the lower one.
- **Chart bars** are panes on edge: the series color let through a little, a hairline, a line of light on top.

## Color, radius, type

- The interface has no color of its own. Primary is the ink (near-white in dark, near-black in light). Charts are five grays.
- Hue is reserved for meaning: brand (a green-teal, used sparingly), done, success, interrupted or awaiting a decision, destructive, links, inline code names, and four syntax colors.
- `--radius` is 0.875rem; small, medium, and extra-large corners are 0.6, 0.8, and 1.4 times that. Controls drop to 0.7rem because the full radius turns a 32px-high button or field into a pill.
- Geist and Geist Mono. Body 14px with generous leading; interface text 11 to 13px; tabular numerals on any figure that changes.

## Light theme differences

Dark is the material as designed. Light is where a rule written for dark most often goes wrong, so check every change, including open menus and hovered rows, in both.

- The page is an opaque cool gray deep enough for near-white panes to stand out on.
- The one state becomes **smoked** (a gray tint at 9%), because clear glass on a white pane is white on white. Hover steps are stronger for the same reason.
- The rim is white at 90%; the hairline is a dark cool gray at 10%. The popover, nearly white on a pale page, keeps its edge with a firmer 22% hairline and a line of shade along its foot.
- Three very faint radial light sources sit under the page (4 to 11% alpha). Dark has none: on a dark page ambient light reads as a bright patch and a vignette, and uneven ground behind long text is tiring.

## Without transparency

Under `prefers-reduced-transparency: reduce` the stylesheet removes the blur from the pane classes (card, popover, sidebar, glass panel, glass control), swaps the four pane fills for opaque ones (dark card `oklch(0.225 0 0)`, panel `0.19`, popover `0.22`, sidebar `0.13`), and makes the primary button fully solid. The fallback is partial at `6e8903e`: buttons, bubbles, tooltips, and chart badges that set their own `backdrop-filter` keep it, and control, field, and state fills stay translucent. Extend the swap to those if the setting matters to your users. Rim, hairline, and shadow stay; the source's point is that they were most of the material anyway.

`data-glass="opaque"` on a region removes the blur there, for performance or legibility. At `6e8903e` it removes only the blur; the opaque fills come from the media query alone.

## Motion

"Motion means something is running. Hue means it has finished or stopped." Nothing moves to decorate.

| Motion | Value |
|---|---|
| Dot loader | 1.2s ease-in-out, looping |
| Shimmer across a running status label | 2.4s linear, looping |
| Sweep across a live (determinate) progress bar, with a standing glow between sweeps | 1.6s ease-in-out |
| Float-in for an arriving surface | 220ms `cubic-bezier(0.22, 1, 0.36, 1)` from `translateY(8px) scale(0.985)` |
| Fade-in | 240ms ease-out |
| Resize-handle highlight | 150ms ease-out |

All keyframes are disabled under `prefers-reduced-motion: reduce`.

## How it is built

Worth copying even without the look:

- **The material hangs off the color utilities** (`bg-card`, `bg-popover`, `bg-sidebar`), so a stock component gets it by using the token it already used. Those rules sit outside any cascade layer on purpose, so a utility written later cannot switch the blur or rim off.
- **Restyle, don't ask for edits.** Parts are found by `data-slot` and existing classes. A fix that only works after editing the component file does nothing for someone who installed the stock component.
- **Comments record the traps fallen into**, not what the code does. The reusable ones are in [surfaces.md](surfaces.md) under Translucent Materials on the Web.

## Conflicts with the other themes

Scoped schools, not corrections. Don't combine them on one surface.

- **Lit top edge in dark.** Solid Glass draws a top rim and a white hairline on every dark pane. Tactile-design's never-ship list forbids a lit top edge in dark mode. Solid Glass sides with the Briggs top-light model in [surfaces.md](surfaces.md).
- **Shadows.** The `0 12px 32px -14px` and `0 24px 60px -18px` falls are the large soft shadows tactile-design bans in favor of a crisp 1px drop.
- **Highlight and selected.** Tactile-design requires hover and selected to differ. In Solid Glass the selected item, a held-open trigger, and the keyboard- or pointer-highlighted row of a menu, option list, or command list share one treatment by rule; ordinary hover elsewhere is a separate flat fill (see One state). So the conflict is in menus and lists, where a highlighted row and the chosen row look the same, not on every hovered control.
- **Fields.** Tactile-design sinks fields as wells; here only grooves are sunk (tracks, off switches, unticked boxes and radios, the tab tray), and fields are raised clear glass.
- **Press.** No scale on press (only the button's 1px translate), against the house `scale(0.96)` in [polish-principles.md](polish-principles.md) and tactile-design's press ladder.
- **Glass on glass.** `apple-design` (liquid-glass-design-system) keeps glass to the navigation layer and never stacks it; the web port in [surfaces.md](surfaces.md) says the same of light translucent surfaces. Solid Glass glasses content cards and puts glass controls on glass panes. Its defense is thickness and neutrality: floating panes are 96% opaque, cards about half, and none takes color from behind.
- **Anti-slop catalog.** `frontend-design` (anti-slop-catalog) lists glassmorphism and decorative blur as a tell. Choosing this theme is the stated reason that exempts it; a single glass card on an otherwise flat page is still the tell.
- **Cost.** Blur on every card, panel, and glass control is paint-heavy. Check `web-design` (web-animation-design)'s animation-performance member before using it on long lists or animating over it; `data-glass="opaque"` is the escape hatch.

Open accessibility questions, not measured here:

- **Field focus is a border-color change only.** Whether a 40% white line against the resting 8% edge meets WCAG 2.2 focus-appearance guidance has not been measured. Measure before shipping, or keep a ring on fields.
- **No `prefers-contrast` handling** at `6e8903e`. The web-port rule in [surfaces.md](surfaces.md) (near-solid with a defined border under `prefers-contrast: more`) still applies and has to be added.
- **Text on translucent cards (46% opaque in dark, 60% in light)** should be contrast-checked over the busiest content that can sit behind them, in both themes.

## Look it up

- `src/solid-glass.css`: every token and rule, with its reasons.
- The Material and Theming pages on the site: the variable tables.
- The contributing guide, "Things review will send back": the review rules.
