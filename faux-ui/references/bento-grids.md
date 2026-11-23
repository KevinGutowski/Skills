# Bento Grids

A bento grid is one picture made of tiles, not five demos side by side. Most of its quality is decided before any tile is built: which tiles show UI at all, which one leads, and what sits next to what. A grid in which every tile is a cropped window reads as generated however well each window is made. Distilled from Stageshow's bento and backgrounds references; the numbers are that source's.

Single-tile framing (crops, satellites, gutters) is in [framing.md](framing.md). This file is about the set.

The rules are regrouped here, so their numbers are this library's and do not match those in upstream's bento reference (upstream 14 is rule 6 here, 9 is 7, 6 to 8 are 8 to 10, 10 to 12 are 11 to 13, and 13 is the Widths section).

## Contents

- [Plan the set first](#plan-the-set-first)
- [The rules](#the-rules)
- [Kinds of tile](#kinds-of-tile)
- [Layouts](#layouts)
- [Objects and drawings as tiles](#objects-and-drawings-as-tiles)
- [Widths](#widths)

## Plan the set first

Write the tile list before building anything:

| Tile | Span | Kind | The one thing | Words |
|---|---|---|---|---|
| Inbox | 2 × 1 | Hero UI | One conversation arriving, selected | "Shared inbox" plus one sentence |
| SLAs | 1 × 1 | Stat | "14m" left, in the warning color | "Never miss a reply." |
| Assign | 1 × 1 | Component | The assignee menu with one person checked | "Assignments" |
| AI drafts | 1 × 2 | Component | The draft reply and its Send button | "Drafts that sound like you." |
| Integrations | 1 × 1 | Collection | App marks bleeding off the right | "Works with your tools." |

Then check the plan with five questions before any code:

1. How many tiles are UI? (A third to a half.)
2. Which one is the hero?
3. Does every UI tile show one thing rather than a window?
4. Does any tile sit next to another of the same kind?
5. Does any real string, avatar, color mark, or piece of chrome appear twice?

A grid of five usually wants one hero UI tile, one or two components, one stat or statement, and one object, diagram, or collection.

## The rules

**What goes in the tiles**

1. **Not every tile is UI.** About a third to a half show product UI. UI is what a bento breaks up, not what it repeats.
2. **One hero.** One tile is bigger (two columns or two rows) and carries the richest picture. Equal tiles need a clear difference in content and weight; four equal tiles of heading and bars read as a template.
3. **A UI tile shows one thing, not a window.** Crop to the single component the tile is about (the button, the status stepper, the command row) at real size or larger, so one control can be a third of the tile. Window chrome appears at most once in the grid, on the hero.
4. **Neighbors contrast,** like a checkerboard, across and down: a picture beside a number, dense beside calm. Two window crops never sit side by side.
5. **Big type is a tile.** A stat tile is one real number at display size (48 to 72px as shown), a short lead ("Up to"), a one-line label, at most one colored glyph. A short statement in large type is a tile too. Real figures, never "10x" filler. A stat pinned to the bottom of a tall tile under a void reads as missing content.
6. **A stat is one line.** Number and unit sit together and never wrap. Size the number to the tile with its unit attached, or move the unit into the lead line.
7. **Say each thing once across the set.** One conversation threaded through five tiles is the same signal five times, not a story.

**The frame around them**

8. **Copy is short and outside the picture.** A title of one to four words or one sentence, at most one supporting sentence, never a paragraph or bullets. Two patterns work: a bold lead running into a gray continuation at the same size, or a large title alone. Tile copy is page type (17 to 24px, set by the page), never the 12px of the UI inside the tile. Copy is page HTML beside the picture, not part of the picture.
9. **One frame, varied contents.** Tiles share radius, gap, padding, and where the copy sits (all top or all bottom). Pick one family: rounded tiles on a gap, or a ruled grid with fine lines and no gap. The gap equals the tiles' inner padding or a clear fraction of it. Left-led UI aligns to the copy's gutter, with one gap between the copy and the picture; do not center each picture by habit, and do not pin the picture to the far edge of a tall tile so that a void opens under the copy. If the tile is taller than its content, make the picture bigger or the tile shorter.
10. **Use the tile edge deliberately.** The tile owns the bleed. A fixed-width picture must not be sliced halfway across a wider tile with a blank strip beside it: measure the picture's slot and match it at every breakpoint. A UI fragment without chrome can dissolve into the tile's ground; a solid window crops at a clear boundary. The boxed failure is shrinking a whole screen until it is unreadable, not leaving a margin.
11. **Compose the grounds together.** A quiet grid shares one surface, with one photo, accent, or inverted tile as punctuation. An expressive grid can use several grounds when their lightness, temperature, and saturation make a rhythm: keep neighbors distinct, give one tile the lead, and do not spend every accent everywhere ([looks-and-grounds.md](looks-and-grounds.md)).
12. **Give motion one place to lead.** In a supporting grid each tile does one small thing (a number ticks, a bar fills, a button settles), once as the grid scrolls in, staggered 80 to 120ms across tiles in reading order, or on hover for that tile alone. A hero grid can give its lead tile a short cursor story while the others hold still. Several competing loops leave the eye nowhere to land.
13. **Shown at 1:1, one picture per tile.** Never scale the whole grid as one image: a 1000px grid in a 630px column draws 15px titles at 9.5px. Each tile's picture is laid out at its slot's native width.

## Kinds of tile

| Kind | Holds |
|---|---|
| **One component** | A single control or panel at real size or larger, cropped by the tile |
| **Hero UI** | The one tile with a real screen: window or phone, cropped per [framing.md](framing.md) |
| **Stat** | One big number, a lead, a label, perhaps one colored glyph |
| **Statement** | One sentence in large type, with an icon in color beside or above |
| **Object** | A product, a payment card, a chip, an isometric drawing |
| **Diagram** | An abstract picture of what the feature does: a grid, a heatmap, nodes and lines |
| **Collection** | Many small marks bleeding off an edge: logos, app icons, file tiles. A mark may be cut by the tile; a word may not. If the collection is text chips, the row ends with a whole chip before the edge or the cut falls in the gap between chips |
| **Photo** | A real, licensed photo, with type over its quiet part |

**Never fake a photo.** A scene drawn in SVG or CSS to stand in for a photograph reads as generated however much grain and haze it gets. With no licensed photo to hand, pick another kind. A landscape photo rarely fits a tall tile with copy on top. An illustration in a photo's place is either purely graphic (a pattern or motif) or drawn in smooth continuous curves, and it holds still.

## Layouts

| Layout | Shape | Use for |
|---|---|---|
| **Hero and strip** | A row of 2/3 + 1/3, then three equal tiles | The default for five or six features |
| **Staggered pair** | Two columns, tall and short tiles alternating, offset between columns | Four to six claims with photos |
| **Even grid** | 3 × 2 equal tiles | Only when every neighbor is a different kind |
| **Big square** | Four columns, a 2 × 2 hero with small tiles round it | Many products, one flagship |
| **Ruled** | One rounded container, 1px rules, no gaps, mixed spans | Technical or developer pages |

## Objects and drawings as tiles

The tiles that stop a grid being five windows are rarely UI.

- Give an object one light source, a real material (a matte card has a soft falloff; a glass pane has a rim), and a shadow that agrees with the tiles around it.
- A line drawing uses one stroke weight and the grid's own ink, and holds still.
- Neither needs a label inside the picture; the tile copy does that.
- A stack of objects is one object. Center the whole silhouette (every card in the fan, not the front one) and keep the back ones clear of the copy.
- A payment card keeps its real anatomy at any size: the chip about an eighth of the card's width and a third of the way down, contactless arcs beside it at about half the chip's height, name and number along the bottom edge, the network's real mark bottom-right. An icon-sized chip on a tile-sized card is the first thing that gives a drawn card away.

## Widths

**Every width is its own design.**

- Check the grid at each width it will meet, down to an article column (about 550px, so half tiles near 270px).
- Keep two columns only while each tile stays readable and deliberately framed. A phone column usually stacks, hero first. Pick the breakpoint from the content, not a universal screen width.
- Each UI picture gets a recomposed design when it no longer fits; type tiles reflow by themselves.
- At every width each picture lines up with its tile's copy: left edge on the copy's gutter, and either a matching gutter on the right or a clear crop off the right or bottom. Never center a picture about as wide as its tile, so that it touches both edges or loses a few pixels to each.
- Important text stays at least 10px at a 320px host, gutters included.
- Inspect the built grid and each crop at the widest and narrowest host. A good tile can still be the wrong neighbor.
