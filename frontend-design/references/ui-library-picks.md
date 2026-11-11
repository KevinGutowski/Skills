# UI library picks: what to install instead of hand-rolling

## Contents

- Decision rules
- Task → library (Emil Kowalski's picks, 2026-11)
- Mismatches to catch in review
- Sonner traps
- Look it up

*Source: Emil Kowalski's `pick-ui-library` and `ask-sonner` skills (github.com/emilkowalski/skills, MIT, rev `715c180`, 2026-11). The table is **one practitioner's taste-driven list**, React-centric, and includes his own library (Sonner). It is a default, never a standard. Provenance: [sources.md](sources.md).*

Use this when a build needs a standard behavior (toast, dialog, command menu, virtualized list, drag and drop) and the choice is between writing it by hand, installing something, or keeping what the project has.

## Decision rules

1. **Identify the task, not the library the user named.** "I need a dropdown" is a UI-primitives task whatever package was mentioned.
2. **Read `package.json` first.** A listed library already installed wins. A competitor already installed also wins: say what you would have picked and why, and leave the dependency alone unless asked to migrate. The design system's own components outrank everything here.
3. **Don't hand-roll behavior a maintained primitive already solves.** Focus trapping, dismissal, keyboard navigation, toast stacking and swipe, digit transitions, and virtualization are where hand-built versions fail. Hand-theme the visual layer on top (the primitive/theme split in [visual-execution.md](visual-execution.md)).
4. **Don't install an abandoned package.** Before adding anything, from this table or elsewhere, check the last release date, open-issue health, and support for the project's framework version. This list is dated; maintenance status moves.
5. **Recommend one, in a sentence.** When the table has a clear answer, don't hand the user a menu. When the task isn't covered, say you have left the list and recommend from current knowledge.
6. **Plain CSS first for simple motion.** A hover or a fade needs no animation library. Reach for one when the work needs springs, layout animation, exit animation, or gesture-driven values. Motion implementation → `motion`.

## Task → library (Emil Kowalski's picks, 2026-11)

> **Staleness:** captured 2026-11-10. Verify maintenance status and current docs before installing. Several of these are single-maintainer projects.

| Task | Pick |
| --- | --- |
| Unstyled accessible primitives (dialog, popover, menu, select) | [Base UI](https://base-ui.com) |
| Command menu (⌘K) | [cmdk](https://cmdk.paco.me) |
| Toasts | [Sonner](https://sonner.emilkowal.ski) (his own) |
| One-time-code input | [input-otp](https://input-otp.rodz.dev) |
| Tuning GUI / control panel | [Leva](https://github.com/pmndrs/leva); [DialKit](https://joshpuckett.me/dialkit) as the alternative |
| General animation (springs, layout, enter/exit) | [Motion](https://motion.dev) |
| Animated numbers | [NumberFlow](https://number-flow.barvian.me) |
| Animated text | [torph](https://torph.lochie.me/) |
| 3D globe | [Cobe](https://cobe.vercel.app) |
| Dynamic OG images | [Satori](https://github.com/vercel/satori) |
| Syntax highlighting | [Shiki](https://shiki.style) |
| Real-time / streaming chart | [Liveline](https://github.com/benjitaylor/liveline) |
| General charts | [Recharts](https://recharts.org) |
| Drag and drop | [dnd kit](https://dndkit.com) |
| Virtualized lists and tables | [Virtuoso](https://virtuoso.dev) |
| Client state | [Zustand](https://zustand.docs.pmnd.rs) |
| Conditional `className` strings | [clsx](https://github.com/lukeed/clsx) |
| Typed variant styling with Tailwind | [cva](https://cva.style) |
| Theme switching with no flash on load | [next-themes](https://github.com/pacocoursey/next-themes) |

Two splits he draws:

- **Charts:** data arriving live with a time axis that scrolls → Liveline. Everything else → Recharts. Chart *type* and integrity → `data-viz`.
- **Class names:** clsx for ad-hoc conditions; cva once a component has real variants (size, intent, state) that deserve a typed API. They compose.

Local note: the Ryo Lu evidence in [visual-field-notes.md](visual-field-notes.md) names shadcn/Radix for the same primitives slot. That is the same rule (use an established primitive) with a different pick. Follow what the project already has. Tuning-panel practice (Leva, DialKit) → `design-prototyping`.

## Mismatches to catch in review

- A toast built by hand or out of a modal library.
- A `div`-based dropdown or dialog with manual focus handling.
- A number "animated" by re-rendering text.
- A 1,000+ row list rendered directly, or patched with pagination hacks, where virtualization fits.
- Shared state threaded through per-component `useState` and props.
- Template-literal class strings with ternaries three conditions deep.

## Sonner traps

Only what agents get wrong even with the docs open. Props, types, and defaults → the live docs below.

| Symptom | Cause and fix |
| --- | --- |
| Toast never appears | No `<Toaster />` mounted, or it unmounted (rendered per page or conditionally). Mount exactly one near the root. `toast()` is client-only: from a server action, return the result and call `toast()` in the client code that receives it. |
| Same toast twice | Two Toasters mounted (layout *and* page): keep one. Or `toast()` fires inside an effect that React StrictMode double-invokes in development: move the call to the event handler, or pass a stable `id` so the second call updates the first. |
| Tailwind or CSS classes do nothing | Sonner's injected styles win the cascade. Classes passed through `classNames` need `!important` (Tailwind's important modifier). Needing it on more than a few parts is the signal to go headless. |
| Building a design-system toast | Skip the class overrides. Use `toast.custom()` with your own JSX, which keeps Sonner's positioning, stacking, and swipe, and wrap it in your own `toast()` helper. |
| Completely unstyled (seen with Astro and view transitions) | The injected stylesheet was lost. Import the package stylesheet explicitly in a layout. |
| Unstyled inside Shadow DOM | Styles land in `document.head`. Copy the Sonner style tag into the shadow root. |
| Behind a modal, or clipped | An ancestor creates a stacking context (`transform`, `filter`, `overflow`), or the overlay out-ranks it. Move the Toaster to the document root, outside any dialog or portal container. |
| Dark mode ignored | `theme` defaults to light and does not follow the OS. Set it to `system`, or pass the resolved theme from the theme provider. |
| Success and error look gray | That is the default. `richColors` on the Toaster turns the color on. |
| Loading toast never resolves | `toast.promise` needs a promise (or a function returning one) that actually settles. For manual control, keep the id from `toast.loading()` and call `toast.success(…, { id })`: reusing an id updates the toast in place instead of adding a second one. |
| Toast shows in every toaster | With several Toasters, give each an `id` and target it with `toasterId`. Untargeted toasts render in all of them. |
| Action button closes the toast too early | An action's click closes the toast unless the handler calls `event.preventDefault()`. |
| Need one "closed" callback | There isn't one. `onDismiss` covers the close button and swipe; `onAutoClose` covers the timeout. Wire both. |

## Look it up

- Sonner: <https://sonner.emilkowal.ski> (Toaster props, `toast()` options, styling, offsets, swipe directions)
- Base UI: <https://base-ui.com> · Motion: <https://motion.dev> (also `motion`, which searches the Motion docs)
- cmdk: <https://cmdk.paco.me> · dnd kit: <https://dndkit.com> · Virtuoso: <https://virtuoso.dev>
- Each package's releases page, for the maintenance check in rule 4.
