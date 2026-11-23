# Web Layout Design

*Scope: Structure and adapt web layouts through grouping, shared edges, content-driven breakpoints, container queries, logical properties, safe areas, reflow, and discoverable overflow. Visual polish → `design-craft`; type measure/wrapping → web-typography; interaction strategy → `design-principles`; accessibility mechanics → web-accessibility.*

**Sources:** Current platform mechanics come from MDN and W3C/WAI; interface heuristics are adapted from Jakub Krehel's `better-layout` skill and stay explicitly subordinate to project evidence and standards.

## Contents

- Structure before decoration
- Grouping and alignment
- Flow-relative layout and RTL
- Adapt at the owning boundary
- Reflow and content stress
- Safe areas and stable controls
- Discoverable overflow and disclosure
- Scroll snap
- Print
- Review sequence
- Sources and staleness

## Structure before decoration

Layout should make the page understandable before color, borders, or shadows do any work:

1. Put the primary fact and action first in source and reading order.
2. Group related content through proximity and a shared container.
3. Align groups to a small set of intentional edges.
4. Use a background or separator only when spacing cannot carry the relationship.
5. Keep controls visually distinguishable from adjacent static content.

The useful external heuristic is **inter-group space must visibly exceed intra-group space**. `2×` is a diagnostic starting point, not a universal token rule: use the project's spacing scale, then squint-test whether group boundaries remain obvious. Dense tables and settings lists may need separators because spending more space would reduce scanability.

Do not create one primary action per card when the screen has one primary task. Hierarchy is page-relative, not component-local.

## Grouping and alignment

- Choose shared inline-start and inline-end edges; inconsistent one-off insets produce visual noise.
- Use one established indentation step for subordinate content rather than inventing a new inset per nesting level.
- Keep identifying content at inline-start and metadata/actions at inline-end.
- Right-align numeric columns in left-to-right tables and use tabular figures; route the type mechanics to web-typography.
- Prefer `gap` on the owning flex/grid container over child margins that encode relationships indirectly.

When a separator is necessary, keep it quiet. Avoid combining a strong rule with a large gap—the layout is expressing the same boundary twice.

## Flow-relative layout and RTL

Use logical properties for relationships tied to content flow:

| Physical assumption | Flow-relative default |
| --- | --- |
| `margin-left` | `margin-inline-start` |
| `padding-right` | `padding-inline-end` |
| `left: 0` | `inset-inline-start: 0` |
| `text-align: left` | `text-align: start` |
| `width` / `height` for flow-dependent sizing | `inline-size` / `block-size` |

MDN's rule is the reason, not syntactic fashion: logical properties follow the document's writing mode and direction, while physical properties freeze an assumption about the viewport. Keep physical properties only when the relationship is genuinely physical, such as a device-edge affordance or an image crop.

RTL review is more than flipping a row:

- verify source/reading order remains meaningful;
- mirror direction-dependent navigation and progress, not logos or arbitrary physical objects;
- keep numbers and mixed-direction identifiers legible;
- test the real `dir="rtl"` state instead of reasoning from screenshots.

Reviewing existing CSS for RTL (Impeccable `audit`, `d41d986`). The table above is the default for new code; in an audit, a physical property is a signal to check the rendering, not a defect by itself:

- **Scope.** Flag physical directional properties only on pages that declare `dir="rtl"` on `<html>` or `<body>`, and only where the rendered result is wrong. `dir` sets direction; `lang` never does. An RTL-script `lang` with no `dir` is worth a note, not a finding.
- **Do not convert centering.** `left: 50%; transform: translateX(-50%)` is direction-agnostic. Swapping `left` for `inset-inline-start` breaks it, because `translateX` is physical and does not mirror.
- **An override must clear what it replaces.** `[dir="rtl"] .x { margin-right: 1rem }` is only correct if it also resets the base rule's `margin-left`; otherwise both margins apply.
- **Check the drawn icon.** An RTL-only page may ship arrows already drawn the right way; a missing mirror transform is not a defect until the rendered chevron points the wrong way.

## Adapt at the owning boundary

Choose a breakpoint where the content stops working, not because a framework names a device width.

- Use viewport media queries for page-shell changes driven by the viewport.
- Use container queries for a reusable component whose layout depends on the space its parent gives it. MDN defines container queries specifically as styling based on a containing element rather than the viewport.
- Prefer intrinsic grid/flex behavior when it expresses the transition without a query.
- Add a min/max constraint only after resizing reveals the failure it prevents.

```css
.card-list {
  container-type: inline-size;
}

@container (width < 26rem) {
  .card {
    grid-template-columns: 1fr;
  }
}
```

Test the smallest and largest supported sizes first, then the transition points. A breakpoint is good when the layouts on both sides are valid and the switch happens before clipping, crowding, or unreadable measure begins.

## Reflow and content stress

WCAG 2.2 Reflow requires vertically scrolling content to work at a width equivalent to `320 CSS px` without losing information/functionality or requiring two-dimensional scrolling, except where two-dimensional layout is essential.

Build toward that outcome:

- avoid fixed block sizes on text-bearing containers;
- let rows wrap or recompose instead of clipping labels; a flex or grid child that holds text needs `min-width: 0` (`min-w-0`, or `minmax(0, 1fr)` in grid) before it can shrink, wrap, or truncate — the failure table is in `design-craft` (worst-case-data);
- fix the element that overflows instead of putting `overflow-x: hidden` on a wrapper (upstream Vercel guidance suggests the wrapper; house position is the opposite): hiding clips focus rings and content and stops `position: sticky` descendants from sticking to the viewport. Where clipping is the intent, `overflow-x: clip` avoids creating a scroll container;
- make actions size from content and padding, not ideal English copy;
- preserve access to every action when zoom, text size, or content length grows;
- allow essential two-dimensional content such as data tables to use a deliberate overflow treatment.

Stress-test with:

- 320 CSS px reflow or 400% zoom from a 1280 CSS px viewport;
- 200% text size where relevant;
- longest realistic labels and values;
- pseudo-localized strings rather than an assumed universal expansion percentage;
- empty, one-item, dense, error, loading, and permission-limited states.

**Arabic-script data handling** (Arabic, Persian, Urdu, Pashto, Kurdish; from Impeccable's `harden`. The `Intl` outputs below were checked in Node with ICU on 2026-11-09). Mirroring the layout is not enough:

- Preserve the Zero-Width Non-Joiner (U+200C). Persian and Kurdish use it inside compound words, and a sanitizer that strips it changes meaning.
- Store Persian ی/ک (U+06CC/U+06A9) and Arabic ي/ك (U+064A/U+0643) as typed, but treat them as equivalent for search and validation. Rejecting one form locks out users whose keyboard sends the other.
- Format digits and dates with the locale: `Intl.NumberFormat('fa-IR')` gives ۱٬۲۳۴, and `Intl.DateTimeFormat('fa-IR')` uses the Solar Hijri calendar. Never hard-code Western digits or the Gregorian calendar.

Locale mechanics for every language (Vercel, Web Interface Guidelines; formatting failures and plural rules are in `design-craft` (worst-case-data)): build dates, numbers, and currency with `Intl.DateTimeFormat` / `Intl.NumberFormat` rather than hand-assembled strings; choose the language from `Accept-Language` or `navigator.languages`, never from IP geolocation; and mark brand names, code tokens, and identifiers `translate="no"` so browser auto-translation leaves them intact.

The external source's `30–40%` translation expansion is a useful test stimulus, not a safe sizing formula. Real expansion varies by source language, target language, string length, and context.

**Floating lists size from content too.** A dropdown menu's width comes from its widest item (`max-content`), with a `min-width` floor for short labels and a `max-width` ceiling that truncates, never from a fixed width. Values, CSS, and the row rules: `design-craft` (component-details) → Dropdown menus.

## Safe areas and stable controls

CSS environment variables let layouts account for user-agent-defined regions such as display cutouts and virtual keyboards.

For websites installed to the iOS/iPadOS Home Screen or macOS Dock, read [apple-installed-web-apps.md](apple-installed-web-apps.md) too. It owns `viewport-fit`, standalone-mode, Apple metadata, launch assets, and version-specific Safari behavior; this section remains the cross-browser layout baseline.

```css
.action-bar {
  padding-inline:
    max(1rem, env(safe-area-inset-left))
    max(1rem, env(safe-area-inset-right));
  padding-block-end:
    max(1rem, env(safe-area-inset-bottom));
}
```

- Let backgrounds/media bleed when the composition calls for it.
- Keep text and controls inside layout margins and safe areas.
- Keep primary actions in stable, reachable chrome when a pane or keyboard can clip scrolling content.
- Verify sticky/fixed chrome does not obscure keyboard focus; current WCAG 2.2 requires a focused component not be entirely hidden by author-created content.
- Give headings and other anchor targets `scroll-margin-top` (at least the sticky header's height plus breathing room) so a followed in-page link leaves space above the heading instead of pinning it to the viewport edge or under fixed chrome (Krehel, Interfaces Cheat Sheet).

Do not cargo-cult a fixed mobile inset. Use the project's spacing tokens and actual safe-area behavior.

## Discoverable overflow and disclosure

Hidden content needs a visible, operable path:

- label disclosure controls by outcome or quantity (`Show 12 more results`);
- keep clamped text expandable;
- provide visible previous/next controls for carousels and make them keyboard operable;
- communicate carousel changes to assistive technology;
- stop auto-rotation when users interact and provide pause/stop control;
- use scroll snap only as motion/position assistance, never as the sole discoverability cue (mechanics in the next section);
- treat an edge fade the same way: it hints that a scroller continues, and should show only on the side with more content (mask recipe in `design-craft` (surfaces → Scroll Fades)). Hiding the scrollbar behind a fade is acceptable only for a short row that still scrolls by keyboard and touch.

A partially visible next item can hint that a horizontal list continues, but the external source's `16–32px` peek is a visual heuristic, not an accessibility guarantee. Pair visual continuation with controls, semantics, and keyboard behavior. WAI notes that carousel content is intrinsically hard to discover; first ask whether a simpler list or grid is better.

## Scroll snap

Native snapping is the default for carousels, paged rows, and full-height home-page sections; it beats a JS gesture because the browser already owns the physics ([gestures](web-animation-design/gestures.md)). Four controls, each with one job (@gkurttech's *CSS Little-Known* scroll-snap series, Parts 1–4, Nov 2026):

```css
.row {                                   /* the scroll container */
  overflow-x: auto;
  scroll-snap-type: x mandatory;         /* axis + strictness */
  scroll-padding-inline-start: 48px;     /* insets the snapport */
}
.card {                                  /* each child */
  scroll-snap-align: start;              /* which edge lines up: start | center | end */
  scroll-margin-inline-start: 24px;      /* outsets this child's snap area */
  scroll-snap-stop: always;              /* fast flicks cannot pass this item */
}
```

| Decision | Choose | Why |
|---|---|---|
| Strictness | `mandatory` for carousels and paged sections, where resting between items is always wrong. `proximity` for long or uneven content, where a reader may stop mid-item | With `proximity` the browser decides how near a snap position has to be, and it can be generous: Chromium snapped a rest 84px from the nearest point in a 400px row. Do not design around a threshold |
| Alignment | `start` for rows that read from the leading edge. `center` for a focused item with neighbours peeking on both sides. `end` rarely, for rows anchored to the trailing edge | Alignment is set per child, so one row can mix them |
| Breathing room | `scroll-padding` on the container for an inset every item shares: the row's gutter, or the height of a sticky header in a vertical feed. `scroll-margin` on a child for an offset only that child needs | Padding moves the snapport and margin moves the item's snap area. The two add: 48px of padding and 24px of margin rest the card 72px in |
| Flick past items | `scroll-snap-stop: always` on onboarding slides, home-page sections and short carousels, where each stop should be seen. Leave the default `normal` on long lists | On a long list, `always` turns a fast flick into one item per swipe |

Traps:

- **Type without align does nothing.** `scroll-snap-type` on the container is inert until children declare `scroll-snap-align`. Chromium left the scroll exactly where it was put.
- **Use logical properties.** The demos use `scroll-padding-left` and `scroll-margin-left`. Write `-inline-start` instead so the inset follows RTL, as the rest of this reference does.
- **Items larger than the snapport scroll freely.** A card wider than its row, under `mandatory` too, lets the reader scroll within it and only snaps once the card's edge would leave the snapport. `mandatory` cannot hide the middle of tall content. It still forces a snap at the edge, so `proximity` is the safer choice when item sizes vary.
- **`scroll-snap-stop` also stops your buttons.** In Chromium, `scrollBy()` 700px across `always` items stopped at the first one. `scrollTo()` and `scrollIntoView()` jumped straight to the target. A Next button that moves one item with `scrollBy` is fine. Jump-to-item navigation should use `scrollIntoView` or `scrollTo`.
- **Padding also applies to `scrollIntoView`.** `scroll-padding` and `scroll-margin` also shape scroll-into-view operations (`scrollIntoView()`, fragment navigation, focus scrolling), not just snaps. Coordinate scrolls are different: with snapping off, `scrollTo({left})` lands on the exact coordinate and subtracts neither, so derive offsets from `scrollIntoView` instead of hand-computing them. One `scroll-padding-block-start` equal to the header height fixes snapping, anchor links and focus scrolling below a sticky header together (the anchor-target rule above is the per-target version).
- **Snap is not a discoverability cue.** Keep the visible controls, keyboard access and edge hint from the section above.

Behaviour above was checked in headless Chromium (Playwright 1.65) on 2026-11-22. For the padding trap, only `scrollIntoView` was measured; anchor links and focus scrolling rest on the spec. Snap-stop on fast touch flicks was not reproduced headlessly; it rests on the source's screen recording and the spec. Re-check Safari and Firefox before relying on the `scrollBy` result.

## Print

Long reads still get printed. Matter's 2026 web reader treats print as its own layout (launch post and its print video; single source):

- **Wide margins and the screen's text setting.** Keep the justification and hyphenation from the screen reader; set the page with `@page { margin: … }` rather than the screen column.
- **Let readers leave images out.** An image cannot split across pages, so one that does not fit moves to the next page and leaves a large blank gap behind it. Matter offers a "Without images" switch for this reason; it sits beside the export formats in the article's ⋯ menu and applies to print too. Where images stay, cap their height in print (for example `max-height` in `vh` or `cm`) so fewer of them jump a page.
- **Give the pages a book's furniture.** Matter's print preview has the article title as a small running header and a page number at the foot. In CSS these belong in `@page` margin boxes (`@top-center`, `@bottom-center` with `counter(page)`), whose support varies by browser; check before relying on them.
- **Drop the chrome.** Navigation, toolbars, side panels and the reading-position UI go in `@media print { display: none }`.

These are a product's choices, not a print standard. Preview with the browser's print preview or a PDF export at two paper sizes; the screen layout does not predict where breaks fall.

## Review sequence

1. **Source order:** does DOM order match the intended reading and focus sequence?
2. **Hierarchy:** are primary content/actions distinguishable without decoration?
3. **Grouping:** are proximity, containers, and separators communicating one consistent structure?
4. **Edges:** do related elements share intentional inline/block alignments?
5. **Adaptation:** are component changes owned by intrinsic layout, container query, or viewport query at the right level?
6. **Stress:** test reflow, zoom, long content, RTL, and state extremes.
7. **Occlusion:** check sticky/fixed chrome, virtual keyboards, safe areas, and focused controls.
8. **Overflow:** verify every hidden or off-screen item has visible and programmatic access.

## Sources and staleness

- Vercel, Web Interface Guidelines (command.md, read 2026-11-18): locale detection and `translate="no"`, the `min-width: 0` reminder, and the `overflow-x: hidden` advice recorded here as a house disagreement. https://github.com/vercel-labs/web-interface-guidelines
- Impeccable (Paul Bakaus), `harden` at `b3ced85`, Apache-2.0: the Arabic-script data-handling notes. https://github.com/pbakaus/impeccable
- Jakub Krehel, `better-layout`, revision `f2d1354f9966fd4d03f9c2beb69591ecec22af54`: grouping, alignment, adaptivity, safe-area, and disclosure heuristics. https://github.com/jakubkrehel/skills
- MDN, CSS logical properties and values: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Logical_properties_and_values
- MDN, CSS container queries: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries
- MDN, CSS environment variables: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Environment_variables
- W3C WAI, Understanding SC 1.4.10 Reflow: https://www.w3.org/WAI/WCAG22/Understanding/reflow.html
- W3C WAI, Understanding SC 2.4.11 Focus Not Obscured: https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html
- W3C WAI, Carousels Tutorial: https://www.w3.org/WAI/tutorials/carousels/
- gokhan (@gkurttech), *CSS Little-Known* 13–16, scroll snap Parts 1–4 (X, 2026-11-12 to 11-15): https://x.com/gkurttech/status/2120770568475599138 (alignment), https://x.com/gkurttech/status/2121145036125450331 (padding, margin), https://x.com/gkurttech/status/2121562958589239668 (strictness), https://x.com/gkurttech/status/2121882792477016408 (`scroll-snap-stop`)
- Matter, *The new Matter for Web* (launch post, November 2026), read 2026-11-23: the Print section and its print video. https://www.getmatter.com/web-app/
- MDN, CSS scroll snap: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll_snap

Verify browser support and current WCAG text before treating an exact API or conformance detail as current. The structural principles are durable; syntax and standards details can move.
