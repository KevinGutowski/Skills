# Component Details

*Scope: Exact, component-scoped decisions for small recurring UI parts: how wide a dropdown menu is, how its rows are built, how long a tooltip waits, how an empty state is built and sized. Use when building or reviewing one of these components and the question is "what value, and why". Not a theme: these apply under any of the craft themes unless the theme states its own value.*

**How this file relates to its neighbours.** A rule that belongs to one mechanism and applies to many components stays with the mechanism (hit areas in [surfaces.md](surfaces.md), motion in `web-design` (web-animation-design), stress data in [worst-case-data.md](worst-case-data.md)). This file is organized by component: it holds what is specific to that component and points to the mechanism rules it depends on. Add a component here when a source gives a complete, measured answer for it.

## Contents

- Dropdown menus
  - Width: let the widest item decide
  - Rows
  - Keyboard
  - How design systems size menus
- Tooltips
  - Timing: delay the first, skip the rest
  - When not to wait
  - Closing
  - Content
  - How design systems time tooltips
- Empty states
  - One style for the whole product
  - What each style looks like
  - One component, three sizes
  - Keep the frame
  - Charts: missing is not zero
  - One action, or none
  - No results and hidden by filter
  - Loading and failure are not empty
  - On Apple platforms
- Sources

## Dropdown menus

### Width: let the widest item decide

A menu's width is a content decision, not a token. The longest label sets it, and two limits keep it from breaking.

- **Hug:** `width: max-content`, so the right edge follows the longest row. Leave **16px** from the end of the longest label to the menu's edge. In Dukkon's demo 12px reads as cramped (the text crowds the edge) and 24px as stretched (the slack reads as empty space).
- **Floor:** `min-width: 132px`. A menu holding only "Edit", "Share" and "Copy" otherwise shrinks to a sliver that is hard to hit.
- **Ceiling:** `max-width: 240px`, then truncate with an ellipsis. A menu listing user content (folders, projects, people) cannot know its longest item. A truncated label must still be readable in full: see [worst-case-data.md](worst-case-data.md) → Truncate, wrap, or clamp, including middle truncation when items differ at the end.

```css
.menu {
  width: max-content;
  min-width: 132px;
  max-width: 240px;
  padding: 4px;
  border-radius: 10px;
}
.menu-item {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;             /* our addition: a native <button> row otherwise shrinks to its label */
  height: 32px;
  padding: 0 12px 0 8px;   /* 12 + the menu's 4 = 16px to the edge */
  gap: 8px;
  border-radius: 6px;      /* 10 - 4: concentric with the menu */
}
.menu-item span {
  min-width: 0;            /* our addition: a flex child will not shrink to show the ellipsis without it */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

- **Why not a fixed width.** `width: 200px` or `w-56` copied from a component example fits one set of labels. Shorter labels leave dead space on the right, longer ones wrap or clip, and one width reused across every menu has both problems at once. Fixed widths are a common default in generated menus, so check for them.
- **Trailing columns count** (ours). With shortcut hints, checkmarks or submenu chevrons, the widest *row* sets the width: label, a minimum gap, then the trailing column. The 16px is then measured after that column.
- **A select attached to a trigger** (ours) takes the trigger's width as its floor and may grow past it. Do not lock it to the trigger when the options are longer than the trigger.
- **Cap to the viewport** (ours): `max-width: min(240px, 100vw - 16px)` on narrow screens.

### Rows

- **Height:** 32px, clickable from edge to edge. WCAG 2.2's minimum target is 24px; touch surfaces want taller rows (the tactile theme uses 36px on desktop and more in phone sheets).
- **No dead pixels between rows.** If rows have a visual gap, draw it inside flush rows instead of using margin: [surfaces.md](surfaces.md) → Contiguous Rows.
- **Icons:** 16px, 8px from the label. Every item gets one or none does; a mixed column leaves labels on two different left edges.
- **Labels:** left-aligned, starting with a verb. Wording rules live in `ux-writing`.
- **Dividers** group related actions. With only one or two actions, use buttons instead of a menu.
- **Unavailable items** stay in place, greyed out, so the menu keeps its shape and people learn where things are.
- **Destructive actions** go last, in red, and ask for confirmation.

### Keyboard

The keys are standard (WAI-ARIA Authoring Practices, Menu Button). Radix and similar libraries implement all of them, which is the main reason not to hand-build a menu.

| Key | Action |
| --- | --- |
| Enter, Space or ↓ on the trigger | Open the menu and focus the first item |
| ↑ and ↓ | Move between items |
| Home and End | Jump to the first or last item |
| Any letter | Jump to the next item that starts with it |
| Enter | Choose the item and close |
| Escape | Close and return focus to the trigger |

### How design systems size menus

All four size menus from their content and bound them; only the numbers differ. These are Dukkon's readings as of 2026-11 and library defaults change, so check the system you are using.

| System | Min | Max |
| --- | --- | --- |
| Fluent 2 | 138px | 300px |
| Material | 112px | 280px |
| Primer | 192px | viewport |
| shadcn/ui | 128px | none |
| Dukkon | 132px | 240px |

When a project already uses one of these systems, keep its numbers. The structure (hug, floor, ceiling) is the rule; 132/16/240 is the default when nothing else decides.

## Tooltips

### Timing: delay the first, skip the rest

- **The first tooltip waits about 400ms.** A pointer crossing the screen passes over many controls it has no interest in; with no delay each one flashes a tooltip. The delay is how a tooltip tells passing from pausing. Anything from 300 to 500ms works (Nielsen Norman Group's range for hover-revealed content; Windows defaults to 500ms). The control's own hover state still reacts at once, so the pause reads as intended.
- **The next ones open at once.** After the first tooltip opens, the person is reading the controls, not passing them. Making them wait at every neighbour is what makes a toolbar feel slow.
- **Keep it warm for about 300ms after a tooltip closes.** If the pointer reaches another trigger within that window it still skips the wait. Radix, Base UI and React Aria all work this way; only the window length differs.
- **Keyboard focus never waits.** Focus is a deliberate step, so the tooltip opens immediately.

In Radix this is `delayDuration={400}` and `skipDelayDuration={300}` on the provider. Without a library it is one timer and one timestamp:

```js
const OPEN_DELAY = 400  // the first tooltip waits
const SKIP = 300        // the next ones don't, for this long
let timer, openTip = null, closedAt = -Infinity

function onEnter(tip) {
  clearTimeout(timer)
  const warm = openTip || performance.now() - closedAt < SKIP
  if (warm) return show(tip)
  timer = setTimeout(() => show(tip), OPEN_DELAY)
}
function onLeave() {
  clearTimeout(timer)
  if (!openTip) return
  timer = setTimeout(() => { hide(); closedAt = performance.now() }, 100)
}
function onTooltipEnter() { clearTimeout(timer) }       // the pointer made it across; keep it open
function onFocus(tip) { clearTimeout(timer); show(tip) } // keyboard focus never waits
```

Subsequent tooltips also skip their enter *animation*, not only their delay: [emil-kowalski/css-techniques.md](emil-kowalski/css-techniques.md) → Tooltips.

### When not to wait

The wait protects people from controls they are only passing. When pointing *is* the task there is nothing to protect: chart points, the value on a slider while it is dragged, the preview while scrubbing a video. The test: **would someone point here only to see the tooltip? Then don't make them wait.** Chart tooltip construction is owned by `data-viz` (editorial-interaction).

### Closing

- **On pointer leave, close after about 100ms.** That still feels immediate and gives the pointer time to cross onto the tooltip. WCAG 2.2 SC 1.4.13 requires hover content to stay while the pointer is on it.
- **A click closes it**, and it stays closed until the pointer leaves the trigger.
- **Escape closes it** without moving the pointer or focus.

### Content

- One line, a few words. If it needs a heading or a link, it is a popover.
- It adds to the label and does not repeat it. Text buttons rarely need one.
- The keyboard shortcut sits next to the name.
- It sits 8px from its trigger and never covers what it explains.
- Nothing important lives only in a tooltip, because touch screens cannot hover. Every icon button needs an accessible name whether or not a tooltip shows.

### How design systems time tooltips

All of them shorten or skip the wait for the next tooltip; they disagree on the first. Dukkon's readings as of 2026-11.

| System | First | Next |
| --- | --- | --- |
| Radix UI | 700ms | 0ms |
| Base UI | 600ms | 0ms |
| MUI | 100ms | 0ms |
| Windows | 500ms | 100ms |
| Dukkon | 400ms | 0ms |

**Scoped schools, do not average.** Emil Kowalski's range for the first tooltip is 400–700ms (`web-design` (web-animation-design) PRACTICAL-TIPS), which contains this 400ms. The tactile theme opens the tooltip that names an icon-only action with **zero** delay ([tactile-design/tokens-and-surfaces.md](tactile-design/tokens-and-surfaces.md)); a project on that theme keeps that. Otherwise default to 400ms first, 0ms next, 300ms warm window.

## Empty states

An empty state has three jobs: say why there is nothing here, say what will show up, and offer a way to fill it (NN/g's system status, learning cues and direct pathways). "No data found" does none of them and does not even say whether the request finished. This section covers the component: its visual, size, frame, action and when it shows. The cause behind each empty state and the words for each one live in `user-onboarding` (empty-states), which also owns first-run strategy.

### One style for the whole product

Dukkon names seven styles. They differ only in how much room the picture above the words takes:

| Style | What it is | Trade-off |
| --- | --- | --- |
| Illustration | A drawn scene | Warm on a first visit; every new screen needs a new drawing |
| Spot | One small object on a soft wash of colour | Lighter than a scene, warmer than an icon |
| Icon tiles | A few small icons hinting at what will land here | |
| Badge | One icon with a small state mark (count, check, arrow) | |
| Preview | A faint copy of the row or card that will appear | A ghost of the shape, not fake data (see `user-onboarding` (empty-states) → Don't use dummy data) |
| Icon | One small grey icon | Cheap; turns generic fast |
| Text only | Title, one line, action | Fits rows, tiles and menus |

None is wrong. The failure is one product using all seven, which happens when each empty screen is designed on its own. Pick one style and use it everywhere. It is also brand surface: an empty state is one of the few places in a product UI with room for a visual, so a consistent one reads as yours.

### What each style looks like

Anatomy measured from Dukkon's interactive demo (rendered 2026-11-18). An editable recreation of all seven, and of the demos below, is in [`../examples/empty-states-gallery.html`](../examples/empty-states-gallery.html); open it before drawing a new one.

**Shared by all seven:** the visual sits 20px above a 14px/500 title, then one 13px muted line and one 28px-high secondary button. The demo's muted grey (`#8f8f8f`) is only 3.4:1 on white, so use a grey that reaches 4.5:1 (about `#6e6e6e` or darker) for the line, column headers and axis labels. Keep the pale greys for glyphs and rules. Every visual is monochrome greys plus **at most one accent colour** marking the thing that will change (where "now" or the first item will land). Visuals are drawn from simple shapes and CSS, so they inherit the palette and dark mode.

| Style | Size (W×H) | How it is built |
| --- | --- | --- |
| Illustration | ~196×124 | An isometric tray with a faint grid. Empty bars stand on it as dashed outlines, and one small tile in the accent colour sits where data will arrive. Soft blurred shadow underneath. |
| Spot | ~168×116 | Two small white "sheets" (about 54×66, 6px radius), the back one at −8° and lower opacity, the front at +4°, carrying a 3px accent line and tiny bars. Behind them a radial wash of the accent (≈28% → 8% → 0). |
| Icon tiles | ~112×54 | Three icons in tiles: two 30px grey side tiles rotated ±8°, and a 36px centre tile, raised with a small shadow, whose glyph is in the accent colour. The glyphs name what will land (trend, time, breakdown). |
| Badge | ~176×68 | One 40px tile holding a dark glyph, on a dotted field (1px dots on an 8px grid, faded out with a radial mask). A 16px accent dot at the top-right corner carries the state: a count, a check or an arrow. |
| Preview | ~132×50 | Three stacked ghost cards, 34px high and 9px radius, at opacity .45, .75 and 1, each slightly wider than the one behind. The front card holds the real row's shape in light grey: bars for a chart, or glyph + line + short line for a list. |
| Icon | 20×20 | One outline glyph, 1.25 stroke, in the axis grey. |
| Text only | n/a | Title, line, action. This is what every style becomes at card and inline size. |

**Swap the glyph, not the style** (from the demo). After the style picker, every cause demo in the article (before/after, done/no access, no results/hidden by filter) reuses Preview: a document glyph for invoices, a lock for no access, a magnifier for no results, a checklist for hidden-by-filter, an avatar dot for a cleared inbox. One drawing system, a different glyph per surface. Two demos teach something else, so they are not counterexamples. The Page-size demo uses Spot with an accent upload badge on the sheet; the Card size drops the visual and uses a text link; the chart demo puts a small glyph + label pill in the plot area instead of a block above it.

**Badge counts** (ours): the demo badge shows "0". Prefer the check or arrow mark wherever the zero-count rule in `user-onboarding` (empty-states → Don't show zero counts) applies.

**Motion in the demo:** each visual enters once in about 0.3–0.46s on a strong ease-out (`cubic-bezier(.23, 1, .32, 1)`), with parts staggered 30–60ms (bars grow from the bottom, tiles fan out, sheets settle). Hover nudges the parts 1–7px or 3–4° and scales a glow about 5%. Nothing loops by default, and `prefers-reduced-motion` removes all of it. Timing vocabulary → `web-design` (web-animation-design).

**Keep the visual small**, whatever the style. A large illustration pushes content down, needs a new drawing per screen, and gets loud when three dashboard panels are empty at once. Save illustrations for a full page on first use, which people see once. (This narrows Refactoring UI's "add a clear illustration/visual anchor" in [refactoring-ui.md](refactoring-ui.md) to that case.)

### One component, three sizes

Build one empty-state component and let its container pick the size. Drawing a new one per placement is how the styles multiply.

- **Page:** visual, title, one line, one action.
- **Card:** the same with less padding; the action is often a text link.
- **Inline:** one line of text, no icon. For a table row, a dashboard tile or a menu.

Primer, PatternFly and SAP Fiori all work this way; Fiori picks the size from the container's width. Implement that with a container query (ours) rather than a prop each caller has to remember. Dukkon's readings of design-system sizes as of 2026-11:

| System | Sizes |
| --- | --- |
| Primer | Small, medium, large |
| PatternFly | Extra small, small, large, extra large |
| SAP Fiori | Base, dot, spot, dialog, scene |
| GitLab | Compact, regular |
| Atlassian | Narrow, wide |

### Keep the frame

Only the area where content would be changes. An empty table keeps its header, an empty chart keeps its axes, an empty folder keeps its path. People still see where they are, and nothing jumps when the first row arrives (the same no-shift goal as [polish-principles.md](polish-principles.md) §17). This is compatible with Refactoring UI's "hide dead supporting controls": keep the structure that says *where you are*; hide filters, sort and bulk actions that have nothing to act on (ours).

### Charts: missing is not zero

If nothing was measured, draw no line and leave the number out. A line at zero says something happened and the value was zero. Leave gaps for missing points instead of joining across them (Datawrapper and Grafana both do). The rule for charts generally lives in `data-viz` (editorial-interaction → Product Dashboard Conventions).

### One action, or none

- **One main action**, named verb + noun: "Create project", "Upload". Not "Get started". Docs go in a text link below it. Two buttons of equal weight make people choose before they have started.
- **No button when the state is done.** A cleared inbox says so and stops.
- **No disabled button when the person cannot act.** Say who can and offer to ask them ("Request access"). A button they cannot use is worse than none.

### No results and hidden by filter

No results means the person did something, so the empty state is about their input:

- Repeat the exact query, in quotes, and keep it in the field.
- Offer the next step: search somewhere wider, clear a filter, check the spelling. The button widens the search; it does not reset it.
- When a filter hides results, name the filter and the count: "3 tasks are hidden by Status: Open". A blank list looks like there is nothing at all.

### Loading and failure are not empty

Show the empty state only when the request returned zero items. "No projects yet" flashing for half a second before projects load is, in Dukkon's words, the most common empty-state bug. Until the request settles, show the loading treatment from [polish-principles.md](polish-principles.md) §17 (preload first; a skeleton that matches the final layout if you must). A failed request gets its own message with a retry ("Couldn't load projects" / "Try again"), never the empty state, so the person knows which one happened. Error wording → `ux-writing` (error-messages).

In code (ours): render from an explicit status (`loading | error | empty | ready`), not from `items.length === 0`, which is also true before the first response. In a review, this failure is trap `select-async` in `interface-review` (behaviour-traps).

### On Apple platforms

Use the system component, not a custom drawing: SwiftUI `ContentUnavailableView` and UIKit `UIContentUnavailableConfiguration` (both iOS 17+, verified against Apple's API docs 2026-11-18). Their anatomy is the Icon style at system size: an SF Symbol, a title, a description and optional actions. That makes Apple's look the product's one style, and people already recognize it. The HIG has no empty-state page, but its Writing page has one guideline for empty states (checked 2026-11-18), "Provide clear next steps on any blank screens":
- Guide people to an action and give them a button or link to take it.
- The empty state may welcome people and show the app's voice, but the content must be useful in context.
- Empty states are temporary, so never put crucial information in one: it disappears once content arrives.

It agrees with this section and with `user-onboarding` (empty-states); the last point is the one Apple adds. Everything else in this section still applies:

- **Causes map onto built-ins.** No results → `ContentUnavailableView.search(text:)` / `.search()`, which echoes the query. Loading → UIKit `.loading()`, or a `ProgressView` in SwiftUI. First use, done, no access and failed to load → `.empty()` or the `init(label:description:actions:)` form, with the copy from `user-onboarding` (empty-states).
- **Keep the frame.** Show it as an overlay on the list, or through the view controller's content-unavailable configuration, so the navigation bar, search field and scope bar stay put.
- **Trap in Apple's own sample** (ours): the `ContentUnavailableView` doc shows `.search` when `searchResults.isEmpty && !searchText.isEmpty`. That is also true while the fetch for the new text is still running, so the view flashes. Gate it on a finished request.
- Implementation: `uikit` (uikit-lists → Empty and loading states); `swiftui` (swiftui-lazy-stacks), which shows the view *instead of* the stack when content is gated. Search-specific rules: `apple-design` (apple-search-design → Fail gracefully).

## Sources

- Kevin Dukkon (@keviduk), *Sizing dropdown menus*, 4 Nov 2026. https://www.kevdu.co/reads/sizing-dropdown-menus and X 2117975138541146303 (text, a 15.2s video, one still). The article cites WAI-ARIA APG Menu Button, WCAG 2.2 SC 2.5.8, Nielsen Norman Group on drop-down menus, Apple's HIG on pull-down buttons, and the Fluent 2, Material, Primer and shadcn/ui docs; those were not re-read here.
- Kevin Dukkon, *Timing tooltips*, 6 Nov 2026. https://www.kevdu.co/reads/tooltip-delay. It cites WCAG 2.2 SC 1.4.13, the APG Tooltip pattern, Nielsen Norman Group's timing guidelines, Microsoft's `TTM_SETDELAYTIME`, React Aria, Radix UI, Base UI and MUI; not re-read here.
- Kevin Dukkon, *How to design empty states*, 18 Nov 2026. https://www.kevdu.co/reads/empty-states, read 2026-11-18 (text read; interactive demos rendered headless and inspected for anatomy, sizes, colour and motion). It cites NN/g *Designing Empty States in Complex Applications*, Primer Blankslate, PatternFly, SAP Fiori Illustrated Message, GitLab Pajamas, Atlassian, Carbon, Datawrapper Academy *Patchy data* and Grafana's No value option; not re-read here, so both tables are Dukkon's readings. Copy rules and the per-cause table from the same read are in `user-onboarding` (empty-states).
- Lines marked "ours" are this library's additions, not Dukkon's.
- Two more reads were listed as "Coming soon" on 2026-11-18 (*Spacing navigation*, *Designing interface icons*). Recheck https://www.kevdu.co/reads; navigation spacing would get a section here, and icon design routes to `design-systems` (icon-systems).
