# Chart Selection

*Scope: Choose and critique chart types — line/bar/dot/scatter/histogram/heatmap/map/table/single value — for dashboards, reports, articles, decks, frontend visuals.*

Use this skill to choose the chart that best answers the reader's question without misleading them.

## Core Workflow

1. Name the reader task in one sentence.
   - Compare categories?
   - Show change over time?
   - Explain distribution?
   - Show relationship between variables?
   - Show composition of a whole?
   - Locate a geographic pattern?
   - Provide exact lookup?

2. Identify the data shape.
   - Time series, categorical, ordinal, continuous numeric, geographic, network/hierarchy, part-to-whole, distribution, or single value.
   - Number of series and points.
   - Whether values share a denominator, unit, baseline, and timescale.

3. Pick the simplest chart that preserves the truth.
   - Prefer line charts for time and shape.
   - Prefer bars for category magnitude from a meaningful zero.
   - Prefer dot plots when comparing categories but the zero baseline is not important or bars imply too much weight.
   - Prefer scatter plots for relationships between two numeric variables.
   - Prefer histograms, box plots, or density/violin plots for distributions.
   - Prefer tables or single-value callouts when exact values matter more than visual pattern.

4. Run a misread check before implementing.
   - Does the chart imply completed data when it is a projection?
   - Are unlike denominators shown as if they are equivalent?
   - Does the visual emphasize magnitude when the story is change, or vice versa?
   - Is a zero baseline required for honest comparison?
   - Would a simpler table, annotation, or sentence be clearer?

5. Write the chart's job in normal prose.
   - Avoid meta-copy like "This chart is here because..."
   - Use article/deck language: "The current pace is above..." or "FHA loans stand apart..."
   - If the chart has caveats, put them in the caption.

## Quick Decision Guide

- **Single important number**: use a stat callout, not a chart.
- **Exact lookup across many values**: use a table, optionally paired with a chart.
- **Time trend**: use a line chart. Use a dashed segment for projections or incomplete periods.
- **Few ordered time points with focus on total volume**: use line or column; choose line if shape matters, columns if per-period totals matter.
- **Category comparison with meaningful zero**: use bar/column; use horizontal bars for long labels.
- **Category comparison where zero is not informative**: use a dot plot or lollipop.
- **Different lenses with different denominators**: use dot plot, small multiples, or annotated table; avoid progress-bar styling.
- **Part-to-whole at one time**: use stacked bar or 100% stacked bar; avoid pie/donut unless there are very few slices and exact comparison is unimportant.
- **Part-to-whole over time**: use stacked area only when total and composition both matter; use small multiples when component readability matters.
- **Two numeric variables**: use scatter plot; add color/shape only if it clarifies a third variable.
- **Dense two-variable matrix**: use heatmap.
- **Distribution**: use histogram for one numeric variable; box plot for group comparison; violin/density when shape matters.
- **Geography**: use map when location is essential; use bars or tables when ranking is the real task.
- **Flow or relationship**: use alluvial/Sankey for movement between states; network/tree only when connections or hierarchy are the point.

## Reference

For a fuller matrix with rationale, caveats, and source notes, read [references/chart-decision-matrix.md](chart-selection/chart-decision-matrix.md).

## Related skills

This skill picks the chart *type*. For designing the chart and its surrounding experience inside an app (marks/axes/descriptions, accessibility/Audio Graphs, progressive disclosure from platter to detail chart, multi-chart consistency), use `apple-design` (chart-experience-design); for critique of integrity and data-ink, read the Tufte reference in `data-viz`.
