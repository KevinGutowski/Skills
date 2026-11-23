# The Still Frame

Rules for the screen itself, moving or not. How it sits in its space is in [framing.md](framing.md); everything that moves is in [demo-motion.md](demo-motion.md). Distilled from Stageshow's craft reference and its teaching pairs; numbers are that source's unless marked.

## Contents

- [Restraint](#restraint)
- [Type](#type)
- [Spacing and alignment](#spacing-and-alignment)
- [Icons and logos](#icons-and-logos)
- [Color](#color)
- [Density](#density)
- [Chrome and devices](#chrome-and-devices)
- [A page of several demos](#a-page-of-several-demos)
- [Code hygiene](#code-hygiene)

## Restraint

**The word budget.** Count the real strings: the title, the thing acted on, what gets typed, the result. Usually 3 to 7. Everything else is a placeholder bar.

- A word budget is not an element budget. A calendar needs a populated week, a search needs a collection, a filter needs enough rows to filter.
- Bars are filler and the subject is words. Bars where the eye lands read as unfinished; bars in a sidebar beside a real subject are fine.
- Where the story touches a list: two or three real rows and at most as many bar rows. At realistic fidelity, a visible list of four or more rows where wordless rows outnumber worded ones is a "skeleton ladder".
- In a small surface (popover, card, tile) a row is one line: avatar, name, value. No gray bar under a real name there.
- Label and value match: both words or both bars. A blank pill beside a real control is dead weight; remove it.
- Placeholder widths vary row to row (for example 60, 45, 70, 52). Identical bars read as a table of nothing.
- Named avatars get their own colors. Gray discs are for filler rows only.
- Keep the domain's signature content: album art in a music app, thumbnails in a file browser, avatars in a chat. Replace them with the feature's signal and it becomes a generic list.
- When output is the subject (a log, a diff, a terminal), real lines are the content: short and few, with the rest of the screen quiet. A terminal is a character grid: a spinner and its tick share one `1ch` cell and swap in place.
- One number gets to be big. The rest are lines.
- Say it once. One clear sign of the feature, not its signal in the header, a satellite, and every row.
- No masthead for a fictional product: no monogram, logo, sidebar, and nav in every crop. The product's name appears only when the brief leans on it, and then only where the real product would show it (a notification's app name, its own title bar). A brief that merely names the product does not need it on screen; the page around the demo already says whose it is.

**Hierarchy.**

- Simplify before polishing: the fewest surfaces and strings that explain the product, then borders and badges only where earned. Simplifying keeps the character; an empty white card is not the cure.
- Judge the silhouette at thumbnail size before any detail: subject, support, and empty space should make one picture.
- Compose objects, not an inventory of cards. Hierarchy comes from proportion, space, material, and ground, not more boxes.
- The heaviest marks sit on what the story is about. Never a 2px black underline under a gray bar.
- Space follows the story: the payoff gets the room. No empty band mid-window while the result is pushed into the crop; no gap above a card; no void between a stat's label and its number.
- Nothing outsized. The hero element stays in proportion to a real screen.
- A specimen still describes one plausible app: title, toolbar, navigation, and body agree with each other.
- Choose copy that fits. Unless the brief fixes them, pick names, emails, and values whose length suits the layout: no truncated chips, wrapped names, or ragged labels.

## Type

- Real sizes, then scale the whole stage: 11 to 15px UI text. In the style pairs: 13 to 14px names, 11 to 12px metadata, and fewer rows rather than 9 to 10px type. Nothing under 10px as rendered at phone width.
- Fit the text before fixing the box. A control's border-box holds content, padding, and border; flex centering does not make text fit.
- Small text gets a line height of at least 1.3 and clearance on every side.
- One family: the product's, or the system stack. Monospace only for code, identifiers, and aligned numbers, never for a technical product's labels.
- Sentence case unless the real product uses caps. Hierarchy from spacing and one weight step. Tracked capitals on headings, labels, and buttons are a template tell.
- No real headings. The faux app's title is a `div`, never `h1` to `h6`, because the demo sits inside someone else's page outline.

## Spacing and alignment

| Thing | Value | Fault when wrong |
|---|---|---|
| Words to the edge of a window, card, panel, or hovered row | 12px | Under 8px is a tight inset. Bars may bleed; words do not |
| Row padding | 12px; 8px in a dense list | A one-line row three times taller than its words is a fat row |
| Title over its subtitle | 4 to 6px of ink between (1.3 line height plus about 2px) | Under 3px is tight; over 10px they stop reading as one item |
| Button to the field, rule, or card edge above it | 8 to 12px | Closer reads as touching; much more and it drifts away from what it belongs to |
| Text to a neighboring box | Fixed gap of 8 to 12px, never leftover `space-between` | Within 5px reads as touching |
| Status dot, badge, or ring to avatar or text | 6px clear, inside the row's inset | A dot is not a column and must not push its row in |
| Two edges that nearly meet | Align exactly, or part by at least the gutter and never under 8px | 1 to 3px apart is a near-tangent and reads as an accident |
| Bar heights 6 and 5px | 7px between them | Bars keep the white space of the lines they replace |

- A bar sits in the same line box as the text it stands for, so a skeleton row keeps the real row's pitch. A bar never touches or runs under an avatar, badge, or icon.
- A floating card (comment popup, toast) pads evenly all round, measured to the edges of its avatar and button, not to their words. 20px above the name with 14px at the side reads as a miss.
- Nested shapes pad evenly, and the outer radius equals the inner radius plus that padding. Carry the inset round the bottom: a comfortable top does not excuse a cramped action.
- Content clears the bar above it by at least the content's side inset.
- Whitespace groups: a title sits closer to its metadata than to the next record. Never spread lines evenly to fill a frame.
- Center a label on its letters, not its line box. Capitals sit low in a plain line box, so a label beside an icon, in a pill, or an initial in a disc reads low. Trim it with `text-box: trim-both cap alphabetic` (verify browser support for the page's targets).
- **A centered amount centers its digits.** `$45` centered as one string sits right of center to the eye. Center the digits and hang the sign outside the centered box (`position: absolute; right: 100%`). A rolling amount rolls only the digits.
- A progress ring is one track and one arc with round caps, never chopped dashes. A number inside it uses proportional figures and is trimmed to cap height so it centers.
- Columns line up: every row shares one grid template with fixed tracks; optional content leaves its track empty.
- A control hugs its content. Never `flex: 1` with the contents pushed to one end. Fix overflow by fitting the content, not by widening the container, then re-measure the padding.
- Hover and selection fills are inset and rounded unless the real product's are square. A trigger keeps its pressed look while its popover is open. A popup under a field lines its sides up with the field's.
- Links get no hover surface; a control gets a surface that is visible at rest.
- Cloning a real product's menu: read its computed styles; do not eyeball it.

## Icons and logos

- **Icons come from a set, never from your hand.** A hand-drawn glyph is the first tell of generated UI because its weight never matches its neighbors. Use the product's own pack first (its dependencies, icons folder, sprite, or icon component).
- Otherwise choose a set on purpose: SF-style filled glyphs for Apple chrome, Material Symbols for Android, else Phosphor, Iconoir, Radix, Tabler, or Heroicons. Lucide only as a deliberate choice, never by reflex.
- One family, one stroke weight, one size (14 to 16px) per scene. Filled beside outline in one nav, list, or toolbar is a fault. At 14px and under, and inside tinted tiles, use filled glyphs; thin outlines go wiry.
- Icons are one opaque color. Quieten with a lighter opaque gray, not a translucent ink: translucent strokes paint darker where they cross ("onion skin"). No duotone.
- Even-sized glyphs in even-sized boxes; an odd glyph in an even box snaps by half a pixel when motion ends. Icon buttons and chips in a flex row get `flex: none`.
- Center glyphs by eye: shift a play triangle toward its point by about a sixth of its width.
- Emoji are content (messages, reactions), never icons. A playful look rounds the icons; it does not swap them for emoji.
- No hand-drawn pins, cursors, badges, chips, or contactless arcs. Use the product's asset or leave it out. If something must be drawn, check it at 4x beside the real thing and ask whether a stranger would know what it is.
- **AI features get no sparkle, wand, or star, and no purple as the AI color.** Show what the AI does. The product's own icon is fine even when it happens to be a sparkle; a sparkle as generic AI decoration is not.
- **No invented logo.** A letter in a colored square is not a mark. Use the real mark or a plain text wordmark. A real company named in the scene carries its real, current mark in original proportions and colors ([looks-and-grounds.md](looks-and-grounds.md), Brand marks).
- Imagery earns its place: a real image or a good icon, never invented illustration. Gray art is for empty states only. Check imagery at its smallest size and over every surface it crosses.

## Color

- One neutral family for window, sidebar, and cards. Five inks and one accent to start. Status colors mean status.
- No redundant tonal borders. Try the fill alone; add a border for separation, state, or because the real product draws one.
- Quiet is not faint. Check text, actions, and surfaces against the real ground.
- A gradient or glow serves the story or goes. A violet-to-pink ground with gradient text and a tinted card reads as generated; so does colored light on a card, button, or status. One soft neutral shadow.
- **Do not outline the hero to point at it.** An accent ring with a halo reads as a focus state nobody gave it. Lift it the way the product would: its own surface, the raised shadow, a label in the accent. A ring is for a field that really has focus.
- A filled button keeps its color under the pointer (one step of its own hue, never a swap to gray). Success is the one real change.
- Nothing translucent overlaps anything. Overlapping avatars, stacked chips, and stacked cards take opaque fills.
- On dark themes, depth comes from a lighter surface, not a shadow. A light document over a dark workspace stays a readable light document with its own ink and edge.
- Inks tuned for white cards on a gray canvas are too light on white; step them up a tone.
- Contrast has a purpose: a dark editor can be the product's identity; a near-black strip for no reason is a hole.
- Build once, check every look the request names. A light pass does not prove dark.

## Density

Density follows the story. Ask whether a person would do this here. There is no element quota; empty space can be hierarchy; enlarge content before adding anatomy. Below about 320px wide, keep the action and readable type and drop the desktop anatomy.

## Chrome and devices

- **Never draw platform chrome from memory.** Open the real app or a screenshot first.
- Does the frame help? Browser chrome only when the browser is part of the picture; a desktop app gets its real chrome. Chrome fits the task: a sharing panel needs a document, permissions, and an action; a browser bar explains none of that.
- Stageshow fixes window chrome at 38px (64px only for a real icon-and-label toolbar). Sidebars and columns run the full height of their window.
- Several windows: pick the active step; quieter contrast and shadow push the others back. Three equally loud surfaces compete even when they all fit.
- A document that is not the hero is content: a ruled page with real margins, not another window.
- **Platform conventions are the product's chrome, not placeholders.** A messaging app on an iPhone keeps the platform's conventions (blue sent bubbles, gray received, the composer's plus and mic, reactions on the bubble) unless the brief gives it a look. "Our messaging app" names a product, not a palette.
- The status bar and home indicator are drawn true to the OS, once, by whatever draws the phone; never a second hand-made one inside the app. System surfaces keep their real proportions: never shrink the clock; a notification is one bold title over its message at true size with a real app icon.
- Nothing sits under the Dynamic Island; a sheet or grabber starts below the status bar.
- A phone is lit from its first frame: never dimmed, blacked out, or faded up. Its background has a job (a lock screen for a notification story); never invented home-screen icons.
- A phone may straddle a window but never covers the amount or state it explains.

## A page of several demos

- One figure language across the page: one ground, one gutter, one hero shadow, one radius set. A different shadow says something or is a mistake.
- Fewer, stronger demos. No small labeled containers or text tiles when a demo already says it.
- A good/bad comparison changes one thing: same content, layout, endpoints, and input timing. Mark the bad half in the page's own annotation style, never with crosses or scrawls.

## Code hygiene

- Scope the demo's CSS under its root class (keyframes outside); a class prefix alone is not enough when several demos share a page. A host that styles prose by class should exclude the demo's subtree.
- Check a fresh load at each width and a resize between them: measured targets, clips, overlays, and the poster all have to survive.
- A demo never fetches data. A real component that needs app context gets fixed props or a small wrapper.
