# Analytical Design, Sparklines, and Layering

Use this reference when the task involves dense dashboards, explanatory graphics, sparklines, small multiples, evidence documentation, or visualizations that need to show mechanism as well as pattern.

## 1. Analytical Design

Analytical graphics should do more than display values. They should support reasoning.

Check whether the presentation:

1. Shows comparisons, contrasts, or differences.
2. Shows causality, mechanism, structure, or explanation.
3. Shows multivariate data rather than over-reducing the problem.
4. Integrates words, numbers, images, and diagrams.
5. Describes the evidence: sources, authorship, units, scales, sample sizes, and uncertainty.
6. Depends on high-quality content; design cannot rescue weak evidence.

Critique move:

- Walk through the six checks. The weakest item is usually the best redesign opportunity.

## 2. Sparklines

Sparklines are compact, word-sized time-series graphics. Use them when trend shape matters but a full chart would dominate the page.

Defining properties:

- Sized like text or a compact table cell.
- Minimal or no axes.
- Usually paired with a current value, delta, or endpoint label.
- Sometimes marks the most recent value, maximum, minimum, or anomaly.

Use sparklines for:

- Dashboard rows where each metric has a recent trend.
- Tables comparing many entities over time.
- Inline prose where trend shape supports a sentence.

Avoid sparklines when:

- Precise value reading is the task.
- The data are categorical or part-to-whole.
- The trend needs detailed annotations or multiple scales.

Implementation guidance:

- Keep height around surrounding text height or a compact table row.
- Align sparklines vertically in tables.
- Use quiet strokes with one accent color only when emphasis is needed.
- Pair the sparkline with the most important numeric value.

## 3. Layering and Separation

Dense displays work when the layers are separated by visual hierarchy rather than spread across disconnected panels.

Techniques:

- Put primary data in the strongest value, weight, or color.
- Push grids, axes, comparison bands, and uncertainty intervals into lighter tones.
- Avoid adjacent heavy lines that create visual interference.
- Use color to distinguish data roles, not to decorate.
- Let annotations sit close to the evidence they explain.

Squint test:

- Squint at the display. The main data should remain visible; support scaffolding should recede.

## 4. Micro/Macro Design

A strong dense display can tell different stories at different viewing distances.

- Macro view: the overall shape, trend, distribution, ranking, or exception.
- Micro view: individual values, labels, annotations, and evidence details.

Design implication:

- Avoid forcing a choice between overview and detail when the task needs both. Use layering, direct labels, small multiples, and dense tables to preserve both levels.

## 5. Escaping Flatland

A screen or page is flat, but graphics can encode multiple dimensions without fake 3D.

Useful dimensions:

- Position.
- Color.
- Size.
- Shape.
- Time.
- Layering.
- Small multiple position.
- Annotation and labels.

Anti-patterns:

- 3D bars, beveled pies, and perspective effects that distort quantitative reading.
- Decorative depth that adds visual dimension without adding information dimension.

## 6. Range Frames and Dot-Dash Plots

Tufte-style redesigns often make chart scaffolding carry data.

Range frame:

- Replace a full axis line with a line spanning only the observed data range.
- Let the axis communicate min and max rather than arbitrary chart extent.

Dot-dash plot:

- Add marginal rug marks on scatterplot axes.
- Show each variable's one-dimensional distribution without much extra ink.

General pattern:

- Convert empty or redundant chart furniture into evidence-bearing marks.

## 7. Confections, Parallelism, and Narrative

Confections combine maps, diagrams, images, text, tables, and charts into one explanatory composition. They work when every element serves the argument.

Parallelism:

- Repeat visual structure to enable comparison.
- Use side-by-side maps, before/after states, repeated panels, or repeated annotation styles.

Narrative graphics:

- Combine space and time when the explanation depends on both.
- Show sequence, direction, intervention, or changing conditions in the same analytical frame when possible.

## 8. Cause and Effect

Causality is hard to visualize because it requires both variables and mechanism.

Techniques:

- Show intervention and response together.
- Annotate the proposed mechanism directly on the data.
- Use small multiples or sequences to show change through time.
- Pair data with a process diagram when the chart alone cannot show mechanism.
- Include confounders, uncertainty, and source context when causal claims are risky.

## Extended Tufte Test

After the quick test in `tufte-principles.md`, ask:

8. Comparison: Does the graphic answer "compared to what?"
9. Causality: Is mechanism visible, not just pattern?
10. Multivariate: Are important interactions shown?
11. Integration: Are words, numbers, and graphics close together?
12. Documentation: Can a stranger evaluate the evidence?
13. Layering: Do important elements dominate while secondary elements recede?
14. Micro/macro: Does the display reward both a glance and close reading?
