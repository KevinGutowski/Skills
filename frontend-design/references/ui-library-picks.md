# UI library picks: what to install instead of hand-rolling

## Contents

- Decision rules
- Task → library (Emil Kowalski's picks, 2026-11)
- Mismatches to catch in review
- Base UI traps
- Sonner traps
- Look it up

*Source: Emil Kowalski's `pick-ui-library` and `ask-sonner` skills (github.com/emilkowalski/skills, MIT, rev `715c180`, 2026-11-10; rechecked at `64eb3de`, 2026-11-18). The table is **one practitioner's taste-driven list**, React-centric, and includes his own library (Sonner). It is a default, never a standard. Provenance: [sources.md](sources.md).*

Use this when a build needs a standard behavior (toast, dialog, command menu, virtualized list, drag and drop) and the choice is between writing it by hand, installing something, or keeping what the project has.

## Decision rules

1. **Identify the task, not the library the user named.** "I need a dropdown" is a UI-primitives task whatever package was mentioned.
2. **Read `package.json` first.** A listed library already installed wins. A competitor already installed also wins: say what you would have picked and why, and leave the dependency alone unless asked to migrate. The design system's own components outrank everything here.
3. **Don't hand-roll behavior a maintained primitive already solves.** Focus trapping, dismissal, keyboard navigation, toast stacking and swipe, digit transitions, and virtualization are where hand-built versions fail. Hand-theme the visual layer on top (the primitive/theme split in [visual-execution.md](visual-execution.md)).
4. **Don't install an abandoned package.** Before adding anything, from this table or elsewhere, check the last release date, open-issue health, and support for the project's framework version. This list is dated; maintenance status moves.
5. **Recommend one, in a sentence.** When the table has a clear answer, don't hand the user a menu. When the task isn't covered, say you have left the list and recommend from current knowledge.
6. **Plain CSS first for simple motion.** A hover or a fade needs no animation library. Reach for one when the work needs springs, layout animation, exit animation, or gesture-driven values. Motion implementation → `motion`.

## Task → library (Emil Kowalski's picks, 2026-11)

> **Staleness:** captured 2026-11-10, rechecked 2026-11-18 (upstream dropped DialKit as the Leva alternative and added Vaul). Verify maintenance status and current docs before installing. Several of these are single-maintainer projects.

| Task | Pick |
| --- | --- |
| Unstyled accessible primitives (dialog, popover, menu, select) | [Base UI](https://base-ui.com) |
| Command menu (⌘K) | [cmdk](https://cmdk.paco.me) |
| Toasts | [Sonner](https://sonner.emilkowal.ski) (his own) |
| One-time-code input | [input-otp](https://input-otp.rodz.dev) |
| Drawers / bottom sheets | [Vaul](https://vaul.emilkowal.ski) (his own) |
| Tuning GUI / control panel | [Leva](https://github.com/pmndrs/leva). Kowalski's list dropped DialKit in rev `0f2e23b`; it stays Josh Puckett's live-tuning option in `web-design` (web-animation-design) |
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

Effect libraries (border beams, shader backgrounds, liquid metal, confetti, Rive/Lottie) are a separate survey with licence traps: `ui-fx` (effect-libraries).

Local note: the Ryo Lu evidence in [visual-field-notes.md](visual-field-notes.md) names shadcn/Radix for the same primitives slot. That is the same rule (use an established primitive) with a different pick. Follow what the project already has. shadcn/ui itself now generates on Base UI by default (its changelog, July 2026) and still supports Radix and React Aria, so a shadcn project can be on any of the three: read its `components/ui` imports before assuming which API applies. Tuning-panel practice (Leva, DialKit) → `design-prototyping`.

## Mismatches to catch in review

- A toast built by hand or out of a modal library.
- A `div`-based dropdown or dialog with manual focus handling.
- A number "animated" by re-rendering text.
- A 1,000+ row list rendered directly, or patched with pagination hacks, where virtualization fits.
- Shared state threaded through per-component `useState` and props.
- Template-literal class strings with ternaries three conditions deep.

## Base UI traps

Only what agents get wrong even with the docs open. Read from the Base UI docs at 1.9.0 on 2026-11-18; props and full examples → the live docs below.

**Setup and upgrade**

| Trap | Fix |
| --- | --- |
| Importing `@base-ui-components/react` | The package was renamed. Install and import `@base-ui/react`. |
| A popup renders under page content, or z-index fights start | Wrap the app in a root element with `isolation: isolate`. Popups are portaled outside it and then always sit on top. |
| iOS 26 Safari: a dialog backdrop leaves a strip uncovered beneath the browser chrome | Under `@supports (-webkit-touch-callout: none)`, give the backdrop `position: absolute` instead of `fixed`, and add `body { position: relative }` so it still covers after the page scrolls. From Base UI's docs; not device-tested here. |
| A `ScrollArea` around a long list scrolls slowly in Safari and iOS browsers | Its four `--scroll-area-overflow-*` variables inherit in WebKit and restyle every row per scroll event. Apply the temporary `@property` workaround after checking where the variables are read: `web-design` (web-performance, "Custom properties written per frame"). Remove it when Base UI drops its WebKit check. |
| Strict Content Security Policy blocks inline styles | `ScrollArea.Viewport` and an aligned `Select` popup inject a `<style>` tag. Use the CSP Provider with a nonce. Its `disableStyleElements` option also works, but it removes the injected CSS that hides native scrollbars, so copy the `.base-ui-disable-scrollbar` rules from the CSP Provider page into your own stylesheet. |
| RTL layout but arrow keys go the wrong way | `DirectionProvider` changes component behavior only. Set `dir="rtl"` yourself as well. |

**Picking the part**

| Need | Use |
| --- | --- |
| Choose one of a few fixed options | Select |
| Choose from a list long enough to need filtering | Combobox (a filterable Select; it does not accept free text) |
| Free text with optional suggestions, such as search | Autocomplete |
| Panel that slides from a screen edge | Dialog, positioned. Drawer only when it needs swipe gestures, snap points, or the indent effect |
| Hint that names an icon button | Tooltip, and an icon-only trigger still needs its own `aria-label` |
| An info icon that reveals explanatory text | Popover with `openOnHover`, so touch and screen-reader users can reach it. Base UI tooltips are disabled on touch |
| Link preview on hover | Preview Card, holding nothing that is not also on the linked page |

**Composition and behavior**

| Trap | Fix |
| --- | --- |
| A custom component passed to `render` does nothing when clicked | It must forward `ref` and spread every received prop onto its DOM node. |
| `Button` inside a form does not submit | Base UI's `Button` needs an explicit `type="submit"`. |
| `Button` rendered as a link | Don't. It enforces button semantics. Style the `<a>` to look like a button. For a non-`<button>` tag that should act as a button, pass `nativeButton={false}`. |
| Button disabled while loading, and keyboard focus is lost | Set `focusableWhenDisabled` so focus stays on it. |
| Controlled state plus guards just to stop one kind of close | Stay uncontrolled and call `eventDetails.cancel()` in `onOpenChange`, branching on `eventDetails.reason`. |
| Esc closes only the inner popup and the outer one should close too | Base UI stops propagation on purpose. Call `eventDetails.allowPropagation()` for that case. |
| Two parts merged with `render`, and a handler does not run | Handlers run render-element first, and `event.preventBaseUIHandler()` skips every handler after it. Some parts call it internally. |
| Combobox or Autocomplete with a large list types slowly | Memoize each item up to roughly 1,000 items; past that, mount cost dominates and the list needs virtualizing (the docs show TanStack Virtual). |
| Native validation bubble points at the wrong place | The control submits through a hidden input. Give it a `name` and wrap the control in a relatively positioned container. |
| High-priority toast is not announced | Screen readers get the `title` and `description` strings passed to the toast, not custom content rendered inside `Toast.Root`. |

**Open and close animation**

| Trap | Fix |
| --- | --- |
| Keyframe animation jumps when a popup is closed mid-open | Use CSS transitions with `[data-starting-style]` and `[data-ending-style]`. A transition reverses from where it is. |
| Popup scales from its center | `transform-origin: var(--transform-origin)` on the popup. |
| Motion exit animation is cut off, or the popup never unmounts | Base UI waits for an animation it can detect, and for Motion that means one that includes `opacity`. Otherwise use manual unmounting (`preventUnmountOnClose()` and the `actionsRef` `unmount()`). Patterns per mount mode: `motion` (best-practices, Base UI). |

## Sonner traps

Only what agents get wrong even with the docs open. Props, types, and defaults → the live docs below.

| Symptom | Cause and fix |
| --- | --- |
| Toast never appears | No `<Toaster />` mounted, or it unmounted (rendered per page or conditionally). Mount exactly one near the root. `toast()` is client-only: from a server action, return the result and call `toast()` in the client code that receives it. |
| Same toast twice | Two Toasters without their own `id` mounted (layout *and* page) without their own `id`: keep one. Or `toast()` fires inside an effect that React StrictMode double-invokes in development: move the call to the event handler, or pass a stable `id` so the second call updates the first. |
| Tailwind or CSS classes do nothing | Sonner's injected styles win the cascade. Classes passed through `classNames` need `!important` (Tailwind's important modifier). Needing it on more than a few parts is the signal to go headless. |
| Building a design-system toast | Skip the class overrides. Use `toast.custom()` with your own JSX, which keeps Sonner's positioning, stacking, and swipe, and wrap it in your own `toast()` helper. |
| Completely unstyled (seen with Astro and view transitions) | The injected stylesheet was lost. Import the package stylesheet explicitly in a layout. |
| Unstyled inside Shadow DOM | Styles land in `document.head`. Copy the Sonner style tag into the shadow root. |
| Behind a modal, or clipped | An ancestor with `transform` or `filter` creates a stacking context and becomes the containing block for the fixed-position Toaster, so the Toaster is trapped, repositioned, and clipped by that ancestor's `overflow` (`overflow` alone neither clips a fixed Toaster nor creates a stacking context; checked in Chromium, 2026-11-23), or the overlay out-ranks it. Move the Toaster to the document root, outside any dialog or portal container. |
| Dark mode ignored | `theme` defaults to light and does not follow the OS. Set it to `system`, or pass the resolved theme from the theme provider. |
| Success and error look gray | That is the default. `richColors` on the Toaster turns the color on. |
| Loading toast never resolves | `toast.promise` needs a promise (or a function returning one) that actually settles. For manual control, keep the id from `toast.loading()` and call `toast.success(…, { id })`: reusing an id updates the toast in place instead of adding a second one. |
| Toast shows in every toaster, or in the wrong one | With several Toasters, give each an `id` and target it with `toasterId`. A Toaster with an `id` renders only toasts targeted at it; a Toaster without one renders only untargeted toasts. (Corrected 2026-11-18: this row used to say untargeted toasts render in all of them. Checked against Sonner's source on `main`, which filters on exactly that.) |
| Action button closes the toast too early | An action's click closes the toast unless the handler calls `event.preventDefault()`. |
| Need one "closed" callback | There isn't one. `onDismiss` covers the close button, swipe, and `toast.dismiss()`; `onAutoClose` covers the timeout. Wire both. |

## Look it up

- Sonner: <https://sonner.emilkowal.ski> (Toaster props, `toast()` options, styling, offsets, swipe directions)
- Base UI: <https://base-ui.com/llms.txt> indexes every page, and each page has a Markdown version at the same URL plus `.md`. Fetch the component page before using a part you have not used in this project. Releases: <https://base-ui.com/react/overview/releases>
- Motion: <https://motion.dev> (also `motion`, which searches the Motion docs)
- cmdk: <https://cmdk.paco.me> · dnd kit: <https://dndkit.com> · Virtuoso: <https://virtuoso.dev>
- Each package's releases page, for the maintenance check in rule 4.
