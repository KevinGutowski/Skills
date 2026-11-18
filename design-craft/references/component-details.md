# Component Details

*Scope: Exact, component-scoped decisions for small recurring UI parts: how wide a dropdown menu is, how its rows are built, how long a tooltip waits. Use when building or reviewing one of these components and the question is "what value, and why". Not a theme: these apply under any of the craft themes unless the theme states its own value.*

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

## Sources

- Kevin Dukkon (@keviduk), *Sizing dropdown menus*, 4 Nov 2026. https://www.kevdu.co/reads/sizing-dropdown-menus and X 2117975138541146303 (text, a 15.2s video, one still). The article cites WAI-ARIA APG Menu Button, WCAG 2.2 SC 2.5.8, Nielsen Norman Group on drop-down menus, Apple's HIG on pull-down buttons, and the Fluent 2, Material, Primer and shadcn/ui docs; those were not re-read here.
- Kevin Dukkon, *Timing tooltips*, 6 Nov 2026. https://www.kevdu.co/reads/tooltip-delay. It cites WCAG 2.2 SC 1.4.13, the APG Tooltip pattern, Nielsen Norman Group's timing guidelines, Microsoft's `TTM_SETDELAYTIME`, React Aria, Radix UI, Base UI and MUI; not re-read here.
- Lines marked "ours" are this library's additions, not Dukkon's.
- Two more reads were listed as "Coming soon" on 2026-11-18 (*Spacing navigation*, *Designing interface icons*). Recheck https://www.kevdu.co/reads; navigation spacing would get a section here, and icon design routes to `design-systems` (icon-systems).
