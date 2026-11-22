# Alignment Pass (Gridlines)

Use this to line up the left and right edges inside containers: sidebars, toolbars, panels, menus, dialogs and tables. Draw guides down the interface first, list every item that misses its line, and then fix the container's padding so every item sits on one of a few named lines. Typical asks: "line up the sidebar", "the padding is off", "the edges don't line up", "do the margin exercise".

## Contents
- Scope and boundaries
- Before you start
- The pass (draw → read → decide → fix → re-draw → record)
- Rules: text line and box line
- Rules: sidebars and lists
- Rules: bars and toolbars
- Rules: panels and the window frame
- Optical corrections at the edge
- Shapes
- What the pass never changes
- Running the probe
- What the probe gets wrong
- Common mistakes
- Checklist
- Sources

## Scope and boundaries

This pass covers horizontal edges and the vertical centre of each row. Neighbouring owners:

- **Centring an icon inside its button**: that is a nudge within one control, not an edge. See [surfaces.md](surfaces.md) → Optical Alignment, which has the ink-centroid script.
- **Row height, section spacing, density**: the project's spacing policy, or [refactoring-ui.md](refactoring-ui.md) and [polish-principles.md](polish-principles.md) §22 when there is no policy.
- **Hit areas**: [surfaces.md](surfaces.md) → Minimum Hit Area.
- **Page-level content edges** (how many left edges a whole page shows): [practical-demonstrations.md](practical-demonstrations.md), which says more than about two implicit vertical rules reads as disorder. This pass works one level down. Inside one container you may have a text line, a box line and an icon column, because the box line nests inside the text line and does not add a new content edge.
- **Native Apple layout margins**: `apple-design` (hig) and `uikit`/`swiftui`. The rules here are written for web and Electron-style desktop UI.

## Before you start

1. **Read the project's design policy first.** If it already records edge lines (for example "text 16px in, controls 8px in"), those lines are the target. Don't re-derive them, and don't change them without the owner's agreement.
2. **Run the real app with real data.** Empty and logged-out states hide most of the rows that misalign. If you could only reach empty states, say so in the report.

## The pass

Do these steps in order for every page, panel and overlay in scope.

1. **Draw.** Run the probe (below) at 1440px and at 390px. Open every overlay the page owns: menus, selects, popovers, dialogs, sheets, the command palette. Save the captures under `.gridlines/` and keep that folder out of version control.
2. **Read.** For each container, write down its lines: lead, box, icon-column centre, label, trailing, trailing centre. Then list every miss: the item, which edge, how far off, and which line it should be on. The probe groups rows by their centre and can assign an item to the wrong row, so check every miss against the capture before acting on it.
3. **Decide the lines.** For each container:
   - If the policy names its lines, use them.
   - If it shares an edge with a neighbour (stacked panels, a toolbar over a table), take the neighbour's line. A shared edge gets one line.
   - Otherwise take the line most rows already sit on, and move the rest.

   Then mark each row as either edge-positioned or centred. A row that is 3px off-centre and 5px off the edge is neither, and it reads as a mistake.
4. **Fix.**
   - Move the outlier, not the majority. If nine rows sit at 8px and the tab strip sits at 20px, the tab strip moves.
   - Fix it in the container: change its padding, or a shared inset variable (`--row-inset`, `--table-inset`) that both the rows and the header read. Don't give one item its own margin (`ml-[3px]`). The next row added to that container would miss again.
   - Use the spacing scale. If the line needs a value that isn't on the scale, the container's padding is wrong, not the scale.
   - If you remove padding that someone added on purpose (a comment explains it), update the comment with the new reason.
5. **Re-draw.** Run the probe on the same states. It passes when every item is within 1px of its line; 2px or more is a miss. The 1px absorbs rounding. Glyph side bearings (0–1px) are inside the text box the probe measures, so it never sees them, and they need no fix. Then check the capture for what the probe can't see (below): icons drawn off-centre inside their SVG, and boxed controls sitting on the text line. At 390px, check that wrapped toolbars still end on the trailing line.
6. **Record and report.** Add any new line to the design policy next to the existing edge rules, with the date and who set it. For each page, report where each fix was, its before and after values, and the guide captures. Add a "not covered" list: states you couldn't reach, and gaps you left on purpose.

## Rules: text line and box line

Each container has one **text line** (labels, headings, values, bare icons) and at most one **box line** (buttons, selects, inputs, pills, chips). When a boxed control sits at the edge, inset the box so that its label lands on the text line. In other words, box line = text line − the box's horizontal padding. With a 16px text line and 8px button padding, the box starts at 8px and its label continues the column of text above it.

Readers follow the text, not the boxes. A box aligned to the text line pushes its label inward and breaks the column.

## Rules: sidebars and lists

- **One icon column.** Either left-align icons on the box line or centre them on one vertical line, and use the same choice for the whole sidebar. If icons differ in width (a 14px dot next to a 20px glyph), centre them. Left-aligning them staggers the labels after them.
- **One label line.** Every row's label starts on it, after the icon column and the gap: nav items, the workspace switcher, favourites, teams. This matches [component-details.md](component-details.md) → menus: every item gets an icon, or none does.
- **Section headers start on the icon column's leading edge**, not on the label line. Starting left of the labels shows that the header owns the group.
- **Nested items indent by exactly one column.** The child's icon sits where the parent's label starts. A child with no icon starts its label on the child label line. Don't indent by an arbitrary 12px or 20px.
- **A logo or avatar wider than the icon column** starts on the box line, and its name still sits on the label line. Adjust the gap after the logo, not the label line.
- **Trailing badges and counts** sit on the trailing line or the trailing centre line, whichever the toolbar buttons above them use.

The model is Linear's sidebar: one line through the icons, one through the labels, and one through every trailing item.

## Rules: bars and toolbars

- **One centre line per bar.** Compare centres, not tops: a 24px button and a 16px icon in the same bar share a centre.
- **Desktop app windows:** that centre line is the centre of the window controls (the macOS traffic lights). The app's first bar is centred on them. Don't centre the bar's contents on the bar itself if the controls sit higher or lower than its middle.
- **A toolbar belongs to the panel's grid.** Its first item starts on the panel's text or box line. Its last item ends on the trailing line or is centred on the trailing centre line.
- **Trailing controls of different widths** (a count badge, a 28px icon button, a 20px icon) centre on one vertical line. Controls of the same width align their trailing edges.

## Rules: panels and the window frame

- Panels that share an edge share the line. For example, the filters in a table toolbar end exactly below the trailing edge of the panel above.
- The window frame (navbar, status bar) has its own inset from the window edge. The first and last items of every frame bar use it.
- Within one product area, every panel uses the same text line. Different areas can use different lines (8px in dense data panels, 16px on settings pages) if the policy says so.

## Optical corrections at the edge

- **Align the content, not the affordance.** If a select's label has to end on a trailing line, put the chevron before the label. A chevron on the line pushes the label off it.
- **Invisible borders count.** A transparent 1px border moves the label 1px. Cancel it with a −1px margin on that side.
- **Icon viewBox padding counts.** A 24px icon drawn in a 20px area sits 2px in from its box. Correct this with the icon size or the column width, never row by row. The probe measures the SVG element, not the drawing inside it, so it can't see this: compare the icons' painted edges in the capture.
- **Tabs align their label, not their hit area.** Remove the tab list's padding and pull the strip in so the first label's ink sits on the text line.
- **Round shapes look smaller.** On a shared line, a circle should overhang by about 1px compared with a square of the same size. This is the placement side of the drawing rule in `design-systems` (icon-systems → optical adjustments). For a play triangle or another glyph inside its own button, measure the nudge instead ([surfaces.md](surfaces.md) → Measuring the Nudge). The source's "about 1px toward the point" is a 16–24px figure.
- **Text side bearing is 0–1px.** Never correct it glyph by glyph.

## Shapes

Within one container, buttons and fields are either all rounded rectangles or all pills. You may break this for one special control, such as a single primary compose button, but write down why in the policy. Two shape families in one bar read as two systems.

## What the pass never changes

- Row heights, hit areas and control sizes the policy has approved. If closing a gap would need one of them changed, leave the gap, note its size, and ask.
- Semantics and behaviour. This pass only changes padding.
- Colours, type sizes and radii.

## Running the probe

The probe is vendored from the source repo, unchanged apart from a provenance header: `design-craft/scripts/gridlines/` (`probe.js`, `audit.mjs`, MIT `LICENSE`). It measures **layout boxes, not painted ink**:

- a text run's line box from the DOM, which includes side bearings and any leading blank characters;
- the element box of each `svg`, `img`, `input`, checkbox or switch between 6px and 64px wide, including any empty space inside the viewBox;
- for a boxed control (a fill, a full border or a shadow), the box itself, standing in for its contents.

That makes it exact for padding and layout errors, which are what this pass fixes. Where the box and the visible shape differ, it is blind; the capture is how you check those cases. It draws dashed guides for each container:

| Line | Colour |
| --- | --- |
| Lead (first item in text rows) and label (first text after a leading icon) | solid red |
| Box line | faint red |
| Icon-column centre | fainter red |
| Trailing line | blue |
| Trailing centre | amber |

**Headless.** `audit.mjs` and its regression test share one setup: the `playwright` package (not `playwright-core`) in the folder named by `PW_DIR`, or in the current directory if `PW_DIR` is unset, plus its Chromium. To use a Chromium you already have, set `CHROMIUM_PATH`.

```bash
npm i --prefix /tmp/gridlines-pw playwright
npx --prefix /tmp/gridlines-pw playwright install chromium
npx --prefix /tmp/gridlines-pw playwright install-deps chromium   # bare Linux only (needs root)
PW_DIR=/tmp/gridlines-pw node design-craft/scripts/gridlines/audit.mjs \
  "file://$PWD/design-craft/examples/gridlines-sidebar.html" .gridlines 800
PW_DIR=/tmp/gridlines-pw node design-craft/scripts/gridlines.test.mjs   # after editing or re-syncing the probe
```

Output from the example (re-run 2026-11-22). The example has four planted misses:

```text
## Sidebar  x0 w240
   lead 12px  box -  icon centre 20px  label 36px  trailing 12px  trailing centre 22px
   MISS y56 trailing: 15px vs 12px  [12]
   MISS y88 leading: 15px vs 12px  Workspace
   MISS y120 label: 38px vs 36px  Views
   MISS y120 vertical-centre: 3px vs 0px  <svg> … Views
```

Arguments are `<url> <outDir> [width=1440] [prep.mjs]`. A `prep.mjs` that default-exports `async (page) => {}` can open the menu, tab or dialog to measure, or sign in. Environment variables: `CHROMIUM_PATH` (use an existing browser), `SCHEME` (`light`/`dark`), `SETTLE_MS` (default 3000), `CONTAINERS` (CSS selectors to measure instead of the defaults: `aside`, `nav`, `header`, `section`, `article`, dialog/menu/listbox roles and common shadcn `data-slot`s), and `TAG` (a suffix for output file names). The run writes a 2x PNG and a JSON report with every row's edges.

**In a live browser:** paste `probe.js` into the page (the console, or a browser tool's evaluate) and call `window.__gridlines()`. Pass `{ draw: false }` to measure without drawing guides.

**Pages with a strict Content Security Policy** (`script-src` without `'unsafe-inline'`): `audit.mjs` injects the probe as an inline `<script>`, so the page blocks it. The run exits 1 and writes nothing. Evaluating the probe's source directly isn't blocked, so use the live-browser route, or the same two calls in your own Playwright script: `await page.evaluate(readFileSync('design-craft/scripts/gridlines/probe.js', 'utf8'))`, then `await page.evaluate(() => window.__gridlines())`. Take the screenshot yourself. Or measure a dev build that doesn't send the CSP header.

## What the probe gets wrong

Each of these is pinned by a case in `design-craft/scripts/gridlines.test.mjs` (13/13 passing on 2026-11-22). Re-run that test after re-syncing the probe from upstream. If a limit case starts failing, the probe improved: update this list and the case together. Treat the probe's output as candidates to check against the capture, not as verdicts.

- **Icons are measured by their element box.** A shape drawn 4px to the right inside a 16px SVG, next to rows whose shapes fill the box, reports no miss. Compare icon edges in the capture, and fix the asset or its size rather than the row.
- **Text is measured by its layout box.** A label that starts with a no-break space paints about 4px further right and still reports on the line. So do italic overhangs and unusual side bearings.

- **Nested children are reported as misses.** A child row indented one column, which is correct by the nested-items rule, is reported as an `icon-column` and `label` miss, because the probe expects every row to use the most common column. Look for these first in any tree or nested sidebar.
- **A centred narrower icon is reported as a leading miss.** The sidebar rule says to centre icons of different widths on one column. With 20px, 14px and 20px icons centred on one column, the 14px icon's left edge is 3px in, so the probe reports `leading 15 vs 12`. Ignore that miss when the row's icon-column centre and label are both on their lines, and no `icon-column` or `label` miss is reported for it.
- **A box on the text line is not flagged.** A button whose box starts on the 16px text line (so its label lands at 24px) passes, because the probe accepts a row on *any* line. This is exactly what the text/box rule forbids, so check boxed controls at the edge by eye.
- **The headless runner fails on a strict CSP.** See the workaround above.
- **Only landmark containers.** By default it measures landmark elements and common shadcn slots. Panels built from plain `div`s are missed unless you pass `CONTAINERS`.
- **Row grouping uses a 6px centre window.** Tightly stacked rows, or one tall item next to small ones, can be grouped into the wrong row (the source says the same).
- **Ragged-right text is skipped on purpose.** Only rows whose last item ends in the container's last quarter count towards the trailing line.

## Common mistakes

- **Fixing by eye.** A 2px miss looks fine on one row and wrong across a page. Draw first.
- **Moving the majority to match the outlier.**
- **Per-item nudges** (`ml-px` on one label). The next row added won't inherit them.
- **Measuring a boxed control's box against the text line.** A button box at 8px with its label at 16px is correct, not a miss.
- **Checking only empty states** and then reporting the page as aligned.
- **Centring a desktop top bar on the bar** when the window controls sit off its middle.

## Checklist

- [ ] The policy's recorded lines were read first and used as the target
- [ ] Guides drawn at 1440px and 390px, overlays opened, captures saved in an ignored `.gridlines/` folder
- [ ] Every container has a named text line, box line (if it has boxes) and trailing line
- [ ] Every row is either edge-positioned or centred, nothing in between
- [ ] Sidebar: one icon column, one label line, headers on the icon edge, children indented one column
- [ ] Bars: one centre line, matched to the window controls in desktop apps
- [ ] Fixes made in container padding or shared inset variables, not on single items
- [ ] Re-drawn: every item within 1px of its line; icon drawings, boxes on the text line and nested rows checked in the capture, since the probe can't judge them
- [ ] New lines recorded in the policy; the report lists what was not covered

## Sources

- Pritam Paul, *gridlines* agent skill: https://github.com/pritamux/gridlines (MIT), read at commit `20d0944` (2026-11-21). Its process and rules are paraphrased here, and its probe, audit script and example are vendored. The source credits Karri Saarinen's redraw of the Linear sidebar and his notes on rhythm (edge positioning or centring, the top bar centred on the window controls, one panel padding with icons on one column, round or rectangular shapes), backed by the layout chapter of Apple's HIG. The redraw itself was not located (2026-11-22), so those rules are single-source until it is. Linear's published redesign post (in [sources.md](sources.md) → Linear product-craft articles) says the sidebar, tabs, headers and panels were adjusted to keep visual alignment, but it gives no edge values.
