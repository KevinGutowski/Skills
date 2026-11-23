# Framing

How the screen sits in its space decides whether it reads as a product shot or as a screenshot in a box. Decide the framing before building the screen: a crop needs nothing drawn past the crop, and it sets how big the type must be. Distilled from Stageshow's framing reference; the percentages and pixel values are that source's.

Terms: the **stage** is the picture's rectangle, which masks everything (`overflow: hidden`). The **hero** is the main window or phone. A **satellite** is a smaller second object (a receipt, a phone, a detail card) that straddles the hero's edge. The **gutter** is the hero's inset from the stage edge. A **plate** is a tinted field the window floats on.

## Contents

- [The rules](#the-rules)
- [Layouts](#layouts)
- [Shadows and fades](#shadows-and-fades)
- [Small formats and the page](#small-formats-and-the-page)
- [Phones](#phones)
- [Checks](#checks)

## The rules

Rule numbers are upstream's, so a citation such as "framing, rule 4" means the same thing in both places. They are grouped here by topic, so they do not run in order.

**What is in the frame**

- **Rule 1.** One hero object, and at most one or two satellites that carry the point.
- **Rule 2.** Keep what identifies the product: a title, its real chrome, the rows that give the action a reason. Logo and nav are optional; crop around the story.
- **Rule 3.** The medium picks the first layout: corner bleed for a hero beside copy, pinned bottom bleed for a card or tile, a phone pinned from the top. If it does not hold, try a second from the table.
- **Rule 4.** **Crop only filler.** The payoff, the action, whatever the cursor touches, and every real word stay whole. A list, diff, or terminal may run one line off a bled bottom edge. A placeholder action the crop would slice is removed, not sliced. A button, chip, or shadow cut by the stage edge is the usual fault. If the story does not fit, change the stage size or the layout.
- **Rule 5.** **Crop 10 to 40% of the hero off stage.** The window or phone fills at least two thirds of the stage's width and runs off an edge. Labelled controls stay whole. Shapes that still read when cut (a card, a slider track, a row of avatars) run off by a third or more.
- **Rule 6.** The stage masks everything, with one rounded corner per edge. Fades are for sliding tracks, stacks, and charts, plus one crop: a window fading out at its foot.

**Gutters and shape**

- **Rule 10.** **One gutter,** measured in the final visible crop after any wrapper. Every other edge distance in the frame matches it. The exception is a satellite straddling in a wider reserved column; a phone counts as a satellite.
- **Rule 11.** **A full gutter or well past it, on every edge.** Crossing an edge by under 24px, or stopping a few pixels short of it, is a mistake. Content near the bottom of any container follows the same rule.
- **Rule 12.** A window keeps its device's shape: shown whole, 1.25:1 or wider; bled, what shows is at least square. Fix by crop or layout, never by squashing.
- **Rule 13.** What the story opens (menu, popover, panel) stays in frame, a gutter from every edge on every frame. Place the trigger so the overlay has room.
- **Rule 14.** On a colored stage the hero is inset 8 to 20% from the sides and runs off the bottom, so the ground frames it on three sides.
- **Rule 15.** No dead corners, at rest or anywhere in the loop. Fix the crop or layout first; add a satellite only if it has a role; a reserved column is filled from the first frame.

**Satellites and depth**

- **Rule 7.** A satellite straddles the hero's edge, about half outside. Never fully inside, never floating apart. If it must sit fully outside, tie it back with a 1px leader ending in a dot.
- **Rule 8.** Distinct depth: a tighter shadow for a satellite sitting on the hero, a hairline plus a long faint fall for a lone surface on the ground. The shadow goes on the outlined shape itself, never on a wrapper.
- **Rule 9.** Start flat and frontal. Earn a tilt by comparing against the straight version at final size. Depth comes from shadow, z-order, scale, and opacity; perspective only when asked.
- **Rule 16.** Anchored UI (popover, menu, toast) is not a satellite. It sits where the product would put it.
- **Rule 17.** Two satellites are two kinds, not a stack: a card and a small system object (a notification at true size, a chip, a receipt). Two cards of one width on one edge read as a pile. Where the second object only points at something, use an annotation line instead.
- **Rule 18.** A satellite covers chrome, not content: straddle where the window has a sidebar, header, or margin.
- **Rule 19.** Related surfaces get different jobs and weights. The result sits in the hero's quiet margin, never hiding the setting, the trigger, or the payoff.
- **Rule 20.** A small illustration may need more air than the real app has.

The layouts below are recipes, not an order to crop every product. A whole window with even gutters is valid when its contents read at that size and the brief asks for it.

## Layouts

| Layout | Hero | Satellite | Use for |
|---|---|---|---|
| **Pinned, bottom bleed** | Inset 8 to 12% left, right, and top; 15 to 35% past the bottom; centered | Optional, straddling a side | Feature cards and bento tiles; the first thing to try |
| **Corner bleed** | Inset 10% top and left; 15 to 35% past right and bottom | Straddling the left or bottom edge | A hero beside copy; the first thing to try |
| **Stage with gutters** | Inset 8 to 20% each side on a colored stage; off the bottom | Straddling one side; hero stays centered | Brand moments |
| **Satellite focus** | Cropped hard, mostly context | Large (30 to 40% of hero width), straddling, carries the story | One small thing: a notification, a receipt, a diff |
| **Wide hero** | A 900 to 1100px window at 1:1, inset top, off the bottom and often both sides; realistic fidelity | A card or thread on its lower edge | Full-width homepage heroes |
| **Row of windows** | Three or four at one height, the outer ones off both sides; focus by depth | None | Agents, tabs, or sessions side by side |
| **Device pair** | Desktop inset top and left, about 75 to 80% wide, off the bottom | Phone straddling the right edge, about a third outside, its top in the upper half, present from frame one | Cross-device stories |
| **Many of one** | A grid of one small thing at one size, off every edge | None; one tile in focus by depth, the only one with words | Scale shown as repetition: previews, deploys, templates |
| **Fade crop** | A window inset top and sides, fading out over its last third | Optional | When a stage edge would cut the window at an arbitrary line |
| **Close-up** | The whole window scaled 1.3 to 1.6x, chrome included, inset top and sides, off the bottom; the subject row whole across | None; a larger cursor to match | A card about one control: a setting, a field, a button |
| **Panel over product** | Product inset top and left, off the bottom; its focal control whole | A settings panel straddling the right edge over the product's margin; one neutral leader from the panel to what it changed, through empty ground | A setting and its effect |
| **Overlapping windows** | A window inset top, off the bottom, its words clear of the stage edges | A smaller chromeless card in front whose edge lands on a structural line of the window (its sidebar edge), covering only filler | Two views of one event |
| **Stacked cards** | Two components at one width and left edge, 12px apart, centered; the lower one off the bottom | None | A setting over the detail it drives |
| **Opposite corners** | Copy bottom-left at the tile's inset; the product hung off the top-right corner, its words clear of the cut | None | Bento tiles with a line of copy |
| **Tilted stack** | Three same-size cards at -6, 4, and -2 degrees, offset 12 to 20px; the straightest on top and the only one with words | None | Paper: receipts, tickets. The one place tilt earns its keep |
| **Corner chip** | A window inset top-left, off the bottom | A small pill centered on the window's corner, half outside, over chrome only | One live fact about the whole product |
| **Monochrome row** | Three windows at one height, whole across, grayscale, faded at the foot by a mask | None | Customers or integrations whose brand colors would fight |

To make a satellite straddle evenly, reserve a column of gutter plus half the satellite's width beside the hero.

## Shadows and fades

Use a small fixed set of shadows and give each one job: one for the page's hero windows; a quieter one for a window that is not the hero; a tighter one for a satellite (it falls on a white window, where a wide blur smears); a hairline with a long faint fall for a small surface on the ground; and separate ones for popovers, small raised cards, and a thing being carried. On dark themes use lighter surfaces instead ([still-frame.md](still-frame.md), Color).

Fades are for moving or stacked content: about a 32px edge mask on a sliding track, or the last 25 to 30% of a stack or chart.

A window may fade out instead of running off, **at its foot only**. Top and sides stay whole and hard-edged; the fade covers the last third; only filler is under it. Fade with a mask, never a color overlay, so the window dissolves into whatever ground it sits on. Never fade a side, the focal content, or more than one window in a scene.

## Small formats and the page

- **The page is the ground.** "White page" means a transparent stage: no plate and no panel behind the device on a white or dark page. A hero's window bleeds or fills. Whole and centered with air on four sides, it floats.
- **Unframed is the requester's call.** If asked for no framing, the window, card, or phone sits whole and centered with an even margin at least as deep as its shadow, so the shadow is never cut. Never choose this on your own: a floating window is the fault this file exists to fix.
- **The phone-column design is a second design, not a squeeze.** Anything that can sit in a phone column gets a composition at the column's width (358 in a 390 viewport): crop closer, drop or stack a satellite, keep action and payoff whole. A desktop screen scaled into a small slot passes an overflow check while its text becomes unreadable. A card that already fits at 358 needs none.
- **Small formats crop harder.** A 400px card holds a third of a dashboard at full size, not all of it at a third.
- The stage is the shot: the tile is cut to the stage's shape and the stage fills it edge to edge. Never a stage boxed inside another ground.
- Size the design for its slot. A lone card in a 680px column wants a 500 to 560 wide design, so its text reads at 15 to 20px.
- After any move or resize, recheck what the crop cuts and what overlaps, remove any newly sliced placeholder actions, and re-film the whole loop.

## Phones

- A satellite phone starts at 40% of the window's visible width and at least 220px wide. Let it run off the bottom rather than shrink.
- Notifications stay at true OS proportion. A phone so small that its notification needs enlarging is too small.
- A banner is native width and never cut: it spans the screen minus its side margin at the phone's own scale. Compose a side-cropped phone so the banner shows whole.
- A phone cropped at the top loses its status bar and nav bar together. The crop falls inside the content below the nav, never between the island and the nav.
- In a 400px host a phone is cropped, never whole: pinned a gutter from one edge and off the other, screen at 1:1, stage a little taller than wide.
- A lone phone in a column of figures keeps the column's width, centered at design size on the stage's own ground.

## Checks

Answer from the rendered still, at both widths, before any motion work:

- Is the hero's top-left corner visible?
- Is each bleed a deliberate crop and not a sliver?
- Does each satellite connect to its hero with clear depth?
- Is anything with words on it cut by the crop?
- Is any corner of the stage empty for no reason?
- Is a faded window faded only at its foot, over filler, with a mask?
- Is the phone readable at the host's real width, and does a wide scene have its phone-column design?
- Beside the closest good reference at the same size: is yours the emptier, flatter, or more boxed one?
