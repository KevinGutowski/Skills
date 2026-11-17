# Tactile Design — controls

Deep file for [../tactile-design.md](../tactile-design.md). These are the default values with the reason that transfers. Source: `kosta4a/tactile-design` (MIT), its buttons-and-controls and decisions references, paraphrased.

## Contents
- Button roles
- How many primaries, and where they go
- Sizes, padding, icons
- States: hover, press, focus, disabled, loading, copy
- Fields and errors
- Segmented toggle and switch
- Choice rows, tiles, filter pills
- Menus
- Badges, key chips, status dots
- Labels and keyboard
- Snippets

## Button roles

| Role | Use it for | Look |
|---|---|---|
| Primary | the one action that commits or completes this surface | ink-12 fill and ink-1 text. In light it has a 1px ring in the local surface colour and no drop. In dark it has a 0.5px ring in its own fill plus the black drop. Hover is a 7% `color-mix` toward its text colour, which works on any fill; `brightness(.95)` barely moves near-black. |
| Accent primary (opt-in) | the same job, when the brand demands colour | accent-9 fill, contrast text, accent-10 hover |
| Secondary | every other surface action: Cancel, Close, Skip, header and section actions | raised white with the button shadow and no border. In dark, the ground + 2 with its solid outline and drop. Cancel is always secondary. |
| Utility pill | tools attached to content: Copy on a code block, filters, Back in a flow, Show key, ⋯ | fully round, 28px tall (36px on a coarse pointer), white with the toggle shadow |
| Icon | per-row tools with a universal glyph | no fill; faint glyph, strong on hover |
| Ghost | tertiary actions inside a form (Remove, Clear) | no fill; faint text over a light wash on hover |
| Text link | tertiary navigation inside a sentence | only the link word underlined |
| Destructive trigger | opens a destructive confirm | the secondary look with red-11 text and icon (or a soft red-3 tint). It never shouts. |
| Destructive confirm | the final yes inside its dialog | solid red-9, white text, named for the action ("Yes, delete", "Delete project") |

- **No grey filled buttons in light.** A grey fill reads as disabled.
- **Hue fills at most two buttons:** the final destructive confirm and an opted-in accent primary. Otherwise brand colour lives in tints (badges, charts, identity).
- **The heaviest irreversible deletes** can ask for a press-and-hold instead of one click.
- **Over media**, a button uses a translucent black fill with a backdrop blur and white text.

## How many primaries, and where they go

- **One per surface:** each modal footer, flow footer and multi-select menu (Apply) gets one. A page usually has none or one; header and section actions stay white.
- **Only when it is the real next step.** An Upgrade button shows only on a plan that can upgrade. Never add a primary to fill space.
- **Key chips** (a ⌘-style hint after the label) go on the page's primary only. They hide under 768px and on coarse pointers.
- **Disabled until it can work.** Create waits for its required field, Apply for a selection. But once required fields are filled, the primary stays enabled, and errors show on submit.
- **Order:**
  - **Desktop dialogs:** Cancel left, confirm right, buttons hugging their labels. Desktop footer buttons never go full width.
  - **Page groups:** secondary first, primary at the far right.
  - **Flow footer:** Skip, then Continue filling the rest. When Skip leaves, Continue grows into its space.
  - **Phone:** stacked full width. Pages put the primary on top; dialogs and flows put the confirm on top (iOS alert order), 8px apart. Previous and Next stay side by side, half and half.
- **Never pre-focus Cancel.** Enter submits; Escape closes.

## Sizes, padding, icons

| Height | Used for |
|---|---|
| 44 | every button, field and toggle track on a phone (the same token, so recipes lift without a phone class) |
| 36 | standard button, field, select, menu item, rail row |
| 32 | compact confirm inside a menu |
| 28 | pills, toggle options, icon buttons |
| 24 | inline row or card actions |
| 22 | row icon buttons |
| 20 | badges, the search key pill |
| 18 | the key chip on a button |

- **One control height rules a surface:** input = button = toggle = selector. Things beside a button take its height.
- **Padding:** about 14px a side for centred text buttons, 12px for page buttons, and 10px for strip and section actions. The side with a leading icon is 2px tighter.
- **Icons:**
  - **In a button:** a 16px leading icon in a faint ink, with the text 2px closer to it than to the edge.
  - **Stroke:** about 1.5px rendered at 16px, with round caps and joins. Small icons need a *heavier* nominal stroke: 2.5 on the 24px grid at 14px, because the default 2 renders near 1.2px and looks thin beside text. An absolute stroke width does this for you.
  - **Alignment:** an icon beside text centres on the text line, not the baseline.
  - **External-link arrows** appear only where a link truly leaves the app.

## States: hover, press, focus, disabled, loading, copy

- **Hover:** one step above the local ground on fills, and a step stronger ink on text. Selected is two steps up, so hover never matches it. Colour only, about 150ms, fine pointer only; on touch the same look shows while pressed. Inside overlays, use the *root* step-2 for hover, because the overlay has repainted its own step 2 to white.
- **Press:** a CSS `:active` scale, so a quick second press retargets instead of restarting. The squeeze deepens as the target shrinks: .99 for cards and full-width rows, .97 for buttons and pills, .94 for 44px round icons, .92 for 22px icons (icon-only targets are the sole exception to the .95 press floor for buttons and larger). Disabled controls cancel both scale and hover. In Tailwind v4, name `scale` in the transition list, because the `scale-*` utilities set the separate `scale` property.
- **Focus:** one token on every control, a mid-ink step that keeps 3:1 on white, on wells and on dark surfaces, drawn as a 2px outline with a 2px offset. Fields deepen their fill *and* add a 2px ring shadow, because the fill change alone is about 1.08:1, too faint for keyboard users. Arrow-key lists (menus, choice lists) show the highlight fill instead of an outline.
- **Disabled:** about `.6` opacity for buttons, switches and fields, and `.4` for icon buttons. In dark, a faded light primary still glows like a live button, so make it solid instead: a dark step-4 fill, step-8 text, and no outline or drop. On a phone, explain why a control is disabled in text under it, never only in a tooltip.
- **Loading:**
  - **The swap:** the label swaps *in place* to a spinner plus an -ing verb with a real "…" ("Saving…").
  - **No jump:** both labels share one grid cell, so the button keeps the wider width. The incoming label rises from 6px below with a 2px blur and the outgoing one leaves upward, over about 200ms.
  - **Unknown state:** never show a wrong label. If the state is unknown, read "Loading…" and stay disabled.
- **Copy:**
  - **Optimistic tick:** the icon becomes a tick *on the click*, before the clipboard promise resolves. Waiting for the promise makes the press feel slow, and the write almost never fails.
  - **Size and timing:** draw the tick about 1.3× so it reads at the size of the icon it replaces. Crossfade with a .5↔1 scale over about 200ms, then hold about 1s on an icon button or 1.5s on a pill.
  - **Failure:** revert at once, or show "Copy failed" in a pill's label. Never toast a copy.

## Fields and errors

- **A field is a well, not a button.** The well is borderless and shadowless, one step darker than its surface (one lighter in dark). Focus deepens it one step. Read-only fields keep their resting fill on focus.
- **Label and help:** the label sits 6–8px above the field in strong ink, and help text sits under it in faint ink. Mark optional fields "(optional)" in faint ink. Leave about 20px between fields; fields in a modal fill its width.
- **Field text equals button text on desktop. On any touch screen it is 16px,** because iOS zooms into a smaller field and stays zoomed. Gate the rule on `(pointer: coarse)`, not on width alone, so an iPad's wider layout gets it too.
- **A search trigger wears a field's look** (a hairline border, no shadow). The exception is a phone in light, where the search bar is raised like the buttons around it.
- **Errors:** keep the well and add a 1px red-11 ring as a box-shadow, so nothing moves. Put a short red-11 message directly under the field in place of the help text, linked with `aria-describedby` and `role="alert"`, saying what to do. Validate on blur and on submit, never per keystroke, and on submit focus the first invalid field.

## Segmented toggle and switch

- **The segmented toggle replaces underline tabs** for view switching inside a page (Live / All).
  - **Track:** fully round, a well one step darker than its surface, with a 4px inset and 28px options in a 36px track.
  - **Pill:** one sliding pill behind the active option, raised like a button.
  - **Size:** toggles hug their content; they are the one control that doesn't fill a modal's width.
  - **Accessibility:** `role="radiogroup"`, one tab stop, arrow keys between options.
- **The pill springs** with a shared-layout spring at about bounce .12, 0.4s. The overshoot must stay inside the 4px inset: at .35 a pill travelling 100px overshoots about 7px and visibly hits the end of the track. Keep the track's `overflow: hidden` as a backstop, not the fix. The first placement snaps; only a real toggle animates.
- **On a phone** the track is 42px with 34px options, and each option gets a 44pt hit area. If the options don't fit, the toggle becomes a dropdown pill that opens a sheet.
- **Switch:**
  - **Size:** about 52×26 on desktop, small beside a 36px control, because it reads as a mark in a settings row. On a phone, use the iPhone switch size (51×31, a 23px knob 4px in).
  - **Placing the knob:** use flex justification (`start` off, `end` on) with a layout animation, not a pixel offset. Then it is correct at any size from the first paint, and reduced motion makes the move instant.
  - **Knob:** white with the toggle shadow, and it stays white in dark (a grey knob reads as a hole). On is green-9.
  - **Motion:** the knob springs at about bounce .2, 0.45s; the track colour fades over 150ms.

## Choice rows, tiles, filter pills

- **Choice rows: the row is the control and the mark is only drawn.**
  - **Layout:** rows sit 2–4px apart with no box and no lines between them.
  - **States:** hover is ground + 1 and selected is ground + 2, with no stroke.
  - **Marks:** the mark sits at the far right. Single choice uses circles and multiple choice uses squares, so the checkbox is the radio made square.
  - **"Other"** comes last. Picking it opens and focuses an inline field.
- **Tiles:** for options in a grid on a page. Two columns with a 10px gap (one on a phone); the filled mark, not the fill, tells selected from hovered.
- **Filter pills:**
  - **Content:** each names what is picked ("Status **Failed**", the label faint and the value strong) and has a small × to clear it.
  - **Placement:** one row beside the toggles, with search at the right. The last pill truncates so search keeps its place.
  - **On a phone:** the row scrolls sideways under edge fades and never wraps.

## Menus

- **Trigger:** the secondary button with a chevron that turns over (180°) while the menu is open.
- **Shadow:** the menu has the button's ring and 1px drop plus one short drop, and no big soft blur.
- **Motion:** it grows from the trigger, `scale(.97)` to 1 with a fade, over 150ms in and 120ms out, with the transform origin at the trigger.
- **Items:** button height (taller in long lists and phone sheets), 2px apart, at control radius. Highlight (pointer or keys share one state) is ground + 1; chosen is ground + 2 in full ink, with **no tick**. A tick needs a reserved column that pushes every label right, and a fill already says "chosen".
- **A destructive item** uses red text with a red tint on hover.
- **A multi-select menu** ends with a primary Apply, faint until there is something to apply.
- **One dropdown component everywhere.**

## Badges, key chips, status dots

- **Badge formula:** fully round, hue-3 fill, hue-11 text, and a shadow mixed from its own `currentColor`. One formula covers every status and identity badge in every size, with no one-offs. A neutral status (Released, Stopped) is a white badge with the button shadow, never a grey fill.
- **Badge sizes:** beside a 20px title, the badge goes one size up. Numbers use tabular figures. While loading, a pulsing pill holds the badge's place.
- **Status dot:** 8px in `currentColor`, the colour of its label. Dots replace ticks and crosses in status text. Ongoing states ping, and **every dot shares one clock**, so rows mounted at different times beat together. There is no ping under reduced motion.

## Labels and keyboard

- **Labels:** sentence case, verb plus object ("Create project", "Copy command"), short. Confirm buttons name the action. Use the real "…", never three dots, and no em dashes in UI copy.
- **Keys:** Enter submits or continues. Escape closes a modal, menu or panel (in a flow it skips). ⌘K opens search and shows as a key pill inside the search field. Arrow keys move inside toggles and menus.

## Snippets

Trimmed from the source's Tailwind v4 recipes (MIT, © the tactile-design authors). The [full recipes](https://github.com/kosta4a/tactile-design/blob/30495a2db7cb59a72bacea106118ffeab7af00d9/skills/tactile-design/references/buttons-and-controls.md#L69-L105) also cover the utility pill, the row icon button, and the sheet-action and over-media variants. Recipes use tokens only: a literal px or hex value is a bug, because a remap can't reach it.

**Primary and secondary.** `scale` is in the transition list because `active:scale-*` sets the separate `scale` property.

```html
<button class="h-[var(--control-h)] px-3.5 rounded-[var(--radius-control)]
  bg-[var(--primary-bg)] text-[var(--primary-fg)] text-sm tracking-[var(--tracking-label)]
  shadow-[var(--shadow-primary)] hover:bg-[var(--primary-hover)] active:scale-[0.97]
  transition-[transform,scale,background-color] duration-[var(--dur-hover)] ease-[var(--ease-out)]
  disabled:opacity-60 disabled:active:scale-100
  dark:disabled:opacity-100 dark:disabled:bg-ink-4 dark:disabled:text-ink-8 dark:disabled:shadow-none">
  Create project</button>

<button class="h-[var(--control-h)] px-3.5 rounded-[var(--radius-control)]
  bg-[var(--raised)] text-ink-12 text-sm tracking-[var(--tracking-label)]
  shadow-[var(--shadow-button)] hover:bg-[var(--root-ink-2)] active:scale-[0.97]
  transition-[transform,scale,background-color] duration-[var(--dur-hover)] ease-[var(--ease-out)]
  dark:bg-ink-3 dark:hover:bg-ink-4 disabled:opacity-60">Cancel</button>
```

**Field well.** This is composed from the source's well recipe and its focus and error rules. It has no border; focus deepens the fill. The keyboard ring and the error ring are box-shadows, so nothing moves. `--text-field` becomes 16px on coarse pointers.

```html
<input class="h-[var(--control-h)] rounded-[var(--radius-control)] border-0 bg-ink-3 px-3
  text-[length:var(--text-field)] leading-[var(--leading-body)] placeholder:text-ink-10
  focus:bg-ink-4 focus-visible:shadow-[0_0_0_2px_var(--focus-ring)]
  aria-invalid:shadow-[0_0_0_1px_var(--red-11)]">
```

**Badge.** One formula covers every hue; the edge is mixed from its own text colour.

```html
<span class="h-[var(--badge-h)] rounded-full px-2 text-xs leading-[var(--badge-h)]
  bg-green-3 text-green-11 shadow-[var(--shadow-badge)] tabular-nums">Live</span>
```
