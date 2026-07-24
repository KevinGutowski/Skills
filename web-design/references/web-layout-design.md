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
- let rows wrap or recompose instead of clipping labels;
- make actions size from content and padding, not ideal English copy;
- preserve access to every action when zoom, text size, or content length grows;
- allow essential two-dimensional content such as data tables to use a deliberate overflow treatment.

Stress-test with:

- 320 CSS px reflow or 400% zoom from a 1280 CSS px viewport;
- 200% text size where relevant;
- longest realistic labels and values;
- pseudo-localized strings rather than an assumed universal expansion percentage;
- empty, one-item, dense, error, loading, and permission-limited states.

The external source's `30–40%` translation expansion is a useful test stimulus, not a safe sizing formula. Real expansion varies by source language, target language, string length, and context.

## Safe areas and stable controls

CSS environment variables let layouts account for user-agent-defined regions such as display cutouts and virtual keyboards.

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

Do not cargo-cult a fixed mobile inset. Use the project's spacing tokens and actual safe-area behavior.

## Discoverable overflow and disclosure

Hidden content needs a visible, operable path:

- label disclosure controls by outcome or quantity (`Show 12 more results`);
- keep clamped text expandable;
- provide visible previous/next controls for carousels and make them keyboard operable;
- communicate carousel changes to assistive technology;
- stop auto-rotation when users interact and provide pause/stop control;
- use scroll snap only as motion/position assistance, never as the sole discoverability cue.

A partially visible next item can hint that a horizontal list continues, but the external source's `16–32px` peek is a visual heuristic, not an accessibility guarantee. Pair visual continuation with controls, semantics, and keyboard behavior. WAI notes that carousel content is intrinsically hard to discover; first ask whether a simpler list or grid is better.

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

- Jakub Krehel, `better-layout`, revision `f2d1354f9966fd4d03f9c2beb69591ecec22af54`: grouping, alignment, adaptivity, safe-area, and disclosure heuristics. https://github.com/jakubkrehel/skills
- MDN, CSS logical properties and values: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Logical_properties_and_values
- MDN, CSS container queries: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries
- MDN, CSS environment variables: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Environment_variables
- W3C WAI, Understanding SC 1.4.10 Reflow: https://www.w3.org/WAI/WCAG22/Understanding/reflow.html
- W3C WAI, Understanding SC 2.4.11 Focus Not Obscured: https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html
- W3C WAI, Carousels Tutorial: https://www.w3.org/WAI/tutorials/carousels/

Verify browser support and current WCAG text before treating an exact API or conformance detail as current. The structural principles are durable; syntax and standards details can move.
