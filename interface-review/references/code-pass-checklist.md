# Code-pass checklist: rules you can find by reading UI source

## Contents

- When to use this
- How to run the pass
- Rules by owner
- Where this list and the library disagree
- Output for a code-only pass
- Source

## When to use this

Use this for a **source-only pass** over UI code (React/JSX, HTML, CSS, Tailwind): a PR review, "check this component against best practices", or the source half of a `full` review. Every rule below can be confirmed or ruled out by reading a file, so findings come with `file:line` evidence. Behaviour that needs a running build (press latency, focus visibility after real Tab presses, scroll feel) stays with [behaviour-traps.md](behaviour-traps.md). Taste does not belong here at all.

The list is adapted from Vercel's Web Interface Guidelines (`vercel-labs/web-interface-guidelines`, the rule set behind the `web-design-guidelines` skill). Each rule is assigned to the local owner whose reference carries the reasoning. When an owner has a deeper or conflicting rule, the owner wins (see the disagreements section).

## How to run the pass

1. Grep first, then read. Most rules have a searchable signature: `outline-none`, `transition: all`, `onPaste`, `onClick` on a `div`, `user-scalable`, `maximum-scale`, `<img` with no `width`, `.map(` over large arrays, `autoFocus`, hardcoded date formats.
2. Confirm each hit in context before reporting it. `outline-none` next to a `focus-visible:ring` is fine. A `div` with `role="button"`, `tabIndex`, and key handling is a weaker pattern, but it is not missing a keyboard path.
3. Report one root cause once. Twenty icon buttons without labels because a shared `IconButton` has no `label` prop is a single finding against the primitive.
4. Map severity onto this skill's scale. Blocked zoom, unlabeled controls, blocked paste on auth fields, and destructive actions without confirmation or undo are HIGH. Most others are MEDIUM. Typography glyphs (`...`, straight quotes) are LOW.

## Rules by owner

### `web-design` (web-accessibility)

- Icon-only buttons have an accessible name; decorative icons are `aria-hidden="true"`.
- Actions are `<button>`, navigation is `<a>`/router `Link`. A click handler on a `div` or `span` is a finding.
- Images have `alt` (`alt=""` when decorative). Meaningful media has captions or transcripts, and media controls work from the keyboard.
- Async updates (toasts, inline validation) are announced through a polite live region.
- Headings are hierarchical; a skip link reaches main content; heading anchors set `scroll-margin-top` so a sticky header does not cover the target.
- Visible focus on every interactive element. `outline: none` needs a replacement. Prefer `:focus-visible` over `:focus`; use `:focus-within` for compound controls. Sticky headers, footers, and overlays never cover the focused element.
- Drag, swipe, pinch, and path gestures have a tap/click and keyboard alternative unless the gesture is essential.
- Zoom is never disabled (`user-scalable=no`, `maximum-scale=1`).

### `web-design` (form-design)

- Every control has a `<label>` (clickable, via `htmlFor` or wrapping) or an accessible name; checkbox and radio share one hit target with their label.
- Inputs carry a meaningful `name`, the right `autocomplete`, `type`, and `inputmode`.
- Paste is never blocked.
- Spellcheck is off on emails, codes, and usernames (`spellCheck={false}`).
- Submit stays enabled until the request starts, then shows progress. Errors sit next to their field. On a failed submit, focus moves to the error summary when the form has one (GOV.UK), otherwise to the first invalid field. Either is correct; flag only a submit that moves focus nowhere.
- Navigating away from unsaved changes warns first (a `beforeunload` handler or a router guard).

### `web-design` (web-animation-design)

- `prefers-reduced-motion` has a reduced variant; muted decorative loops stop under it.
- Animate `transform` and `opacity`. `transition: all` is a finding: list the properties.
- `transform-origin` matches where the element comes from. For SVG, put the transform on a wrapping `<g>` with `transform-box: fill-box; transform-origin: center`.
- Animations are interruptible by input.
- Automatic motion longer than five seconds next to other content has a pause, stop, or hide control.

### `web-design` (web-typography)

- `…` not `...`; curly quotes; non-breaking spaces inside units, shortcuts, and brand names (`10&nbsp;MB`, `⌘&nbsp;K`).
- Loading labels end with `…` ("Saving…").
- Number columns and compared figures use `font-variant-numeric: tabular-nums`.
- Headings use `text-wrap: balance` or `pretty`.

### `web-design` (web-layout-design)

- Text containers handle long content (`truncate`, `line-clamp`, `break-words`), and flex children that truncate get `min-width: 0`.
- Full-bleed layouts respect `env(safe-area-inset-*)`.
- No accidental horizontal scroll: fix the overflowing content rather than hiding it everywhere.
- Layout uses flex or grid, not JavaScript measurement.
- Dates and numbers go through `Intl.DateTimeFormat` / `Intl.NumberFormat`, never hardcoded formats. Language comes from `Accept-Language` / `navigator.languages`, not IP. Brand names, code tokens, and identifiers carry `translate="no"` so browser translation does not garble them.

### `web-design` (web-performance)

- `<img>` has explicit `width` and `height`. Below-fold images are lazy; the above-fold hero gets `fetchpriority="high"` (or the framework's priority flag).
- Lists over about 50 items are virtualized or use `content-visibility: auto`.
- No layout reads during render (`getBoundingClientRect`, `offsetHeight`, `scrollTop`); batch DOM reads and writes.
- Controlled inputs stay cheap per keystroke, or the input is uncontrolled.
- `preconnect` to asset and CDN origins; critical fonts preloaded with `font-display: swap`.
- A looping animation is a muted, inline, autoplaying video with a still fallback, not an animated GIF.

### `web-design` (mobile-web-native-feel)

- `touch-action: manipulation` where double-tap zoom delay matters; `-webkit-tap-highlight-color` set deliberately.
- `overscroll-behavior: contain` on modals, drawers, and sheets. Page-level rubber-band suppression only under `@media (pointer: fine)`, so phones keep pull-to-refresh. `pointer` describes only the primary input, and `none` also disables scroll chaining and swipe-back navigation, so test on hybrid touch devices (touch laptops, tablets with trackpads).
- During drag, text selection is off. `inert` goes only on non-interactive visual copies (a drag ghost or placeholder clone), never on the element the user is dragging or on its handle. In Chromium, an inert keyboard-drag handle loses focus, and Arrow and Escape stop reaching it. Vercel's rule says "`inert` on dragged elements"; this narrower form is the local rule (HTML spec, inert subtrees).
- `autoFocus` only for a single primary input on desktop, never by default on mobile.

### `design-craft` (surfaces)

- Dark themes set `color-scheme: dark` on `<html>`, `<meta name="theme-color">` matches the page ground, and native `<select>` has explicit background and text colors (Windows dark mode).
- Hover, active, and focus states exist and increase contrast over rest.

### `design-principles` and the stack

- URL reflects state: filters, tabs, pagination, and expanded panels live in query params so they can be shared and restored.
- Destructive actions get a confirmation or an undo window, never immediate effect.
- Hydration safety (React/Next): an input with `value` has `onChange` (or uses `defaultValue`); server and client render the same dates; `suppressHydrationWarning` only where truly needed.
- Empty strings and arrays render an empty state, not broken UI → `user-onboarding` (empty-states).

## Where this list and the library disagree

| Vercel rule | Local owner's position | Use |
| --- | --- | --- |
| Title Case for headings and buttons (Chicago) | `ux-writing` defaults to sentence case | The project's house style. With none, sentence case. Do not file a finding either way. |
| `autocomplete="off"` on non-auth fields to avoid password-manager prompts | Browsers often ignore `off`; wrong tokens hurt autofill more | Use the correct `autocomplete` token. Use `off` only where the password manager is actually misfiring. |
| Placeholders end with `…` and show an example | `web-design` (form-design): hints above the field, never placeholder-as-label | Placeholder is optional example text; the label and hint carry the meaning. |
| Interactive elements need key handlers | Native `<button>`/`<a>` already have them | Only custom widgets need explicit key handling; the real finding is usually the missing native element. |
| Numerals for counts; `&` where space is tight; second person | `ux-writing` (ui-voice-and-tone) | Fine defaults. Defer to the product's voice guide. |

## Output for a code-only pass

When the user asks only for a code check, a terse list grouped by file is acceptable inside the Findings section: `path/to/file.tsx:42 — icon button has no accessible name → add aria-label`. Explain only when the fix is not obvious, and mark files with no findings as clear. The verdict rules still apply. A source-only pass cannot verify rendered behaviour, so without a render the verdict is `Unverified` unless findings make it `Block` or `Needs changes`.

## Source

Vercel, Web Interface Guidelines, the command file at https://github.com/vercel-labs/web-interface-guidelines (rev `434b7f9`, 2026-10-05, MIT), the rule file bundled into the `web-design-guidelines` skill in `vercel-labs/agent-skills` (rev `5a37a63`). Paraphrased and regrouped by local owner. The upstream skill pins its rule file to a commit and a SHA-256 hash and tells the agent not to fetch rules at runtime. Recheck upstream when that pin moves.
