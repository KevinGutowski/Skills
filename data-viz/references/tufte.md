# Tufte Visualization

*Scope: Critique and redesign visualizations with Tufte-inspired principles — graphical integrity, data-ink ratio, chartjunk, small multiples, dense displays.*

Use this skill to make data displays clearer, more truthful, denser, and less decorative. Favor substance over style: comparisons, evidence, labels, scales, sources, and the data itself should carry the design.

## Workflow

For a new visualization:

1. Clarify the analytical question.
   - What comparison, change, distribution, relationship, or exception matters?
   - What should the viewer be able to decide after seeing it?
   - What data, units, time spans, and categories are available?

2. Choose the display around the comparison.
   - Time series: prefer a line chart with direct labels and muted reference lines.
   - Group comparison: prefer bars, dots, slopegraphs, or small multiples.
   - Dense repeated trends: consider sparklines in a table.
   - Part-to-whole: prefer a sorted bar, stacked bar, or table unless the whole relationship is truly the point.
   - Many comparable panels: use small multiples with shared scales.

3. Increase the data-ink ratio.
   - Remove decoration, heavy grids, unnecessary borders, 3D effects, shadows, and repeated labels.
   - Keep context that prevents distortion: baselines, units, source notes, sample sizes, and clear scales.
   - Use color for encoding, emphasis, or alerts; default secondary marks to quiet grays.

4. Add density without adding noise.
   - Prefer direct labels near the marks they explain.
   - Layer primary data above secondary context.
   - Let repeated structure do comparison work.
   - Preserve detail when the data rewards close inspection.

For a critique or redesign:

1. Check integrity first.
   - Verify that visual magnitude matches data magnitude.
   - Watch for truncated axes, inconsistent intervals, area/volume exaggeration, missing baselines, and out-of-context quotes.
   - Calculate lie factor when the visual effect looks suspicious.

2. Identify chartjunk.
   - Remove decoration that does not encode data or aid interpretation.
   - Treat 3D, gradients, clip art, excessive color, and heavy gridlines as suspects.

3. Ask what can be erased.
   - If removing an element does not remove information, remove or soften it.
   - If an element repeats information already shown elsewhere, combine or simplify it.

4. Propose a concrete replacement.
   - Name the chart type, encoding, scale behavior, labeling approach, and any small-multiple or sparkline structure.
   - Explain which distortion or comprehension problem the redesign fixes.

## Tufte Test

Use this checklist before finalizing a recommendation:

- Does the chart show the data clearly?
- Does it answer "compared to what?"
- Does visual magnitude match data magnitude?
- Can decoration be removed without losing information?
- Are labels, units, scales, dates, sources, and context sufficient?
- Does the viewer think about the evidence rather than the chart styling?
- Does the design reveal both overview and detail where useful?
- Are words, numbers, and graphics integrated instead of separated into distant legends or notes?
- Do primary data dominate while axes, grids, and annotations recede?

## References

- Read `tufte/tufte-principles.md` for the core critique vocabulary: graphical excellence, graphical integrity, lie factor, data-ink ratio, chartjunk, small multiples, density, and multifunctioning elements.
- Read `tufte/analytical-design.md` for dense dashboards, sparklines, layering, micro/macro displays, explanatory graphics, causality, and evidence documentation.
- For charts living *inside an app* (anatomy, accessibility/Audio Graphs, platter→detail progressive disclosure, multi-chart design systems), compose with `chart-experience-design`; for picking the chart type, `chart-selection`.
