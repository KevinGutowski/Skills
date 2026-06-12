# Chart Decision Matrix

Sources: IBM Design Language charts guide and Atlassian's essential chart types guide. IBM groups charts by goal: comparison, trend, part-to-whole, correlation, relationships/connections, and maps. Atlassian adds pragmatic chart-type notes such as using bars for measured groups, lines for continuous change, dot plots when a zero baseline is not useful, and tables/single values when exact values matter.

## Selection Matrix

| Reader job | Data shape | Prefer | Use when | Avoid when |
|---|---|---|---|---|
| Show change over time | Ordered time series | Line chart | Shape, direction, inflection, pace, or forecast matters | Categories are unordered; values are isolated totals with no continuity |
| Show incomplete/projection over time | Time series plus estimate | Line chart with dashed final segment or shaded forecast band | One period is not complete or is annualized | The projection could be mistaken for observed data |
| Compare category magnitude | Categories sharing unit and denominator | Bar/column chart | Zero is meaningful and magnitude comparison is the job | Axis does not start at zero or labels are too long for columns |
| Compare categories without over-weighting magnitude | Categories, rates, or mixed lenses | Dot plot or lollipop | Zero baseline is not informative, denominators differ, or progress bars would mislead | The audience needs part-to-whole composition |
| Compare subgroup values across categories | Two categorical variables | Grouped bar, dot plot matrix, or small multiples | Subgroup comparison matters more than total | There are too many groups to scan |
| Show total plus composition | Categories that sum to whole | Stacked bar | Both total and component contribution matter | Readers need precise component comparison across many bars |
| Show composition only | Percent shares summing to 100 | 100% stacked bar | Share comparison matters more than total | There are many tiny slices |
| Show simple share of whole | Few categories | Donut/pie sparingly | The task is rough composition and there are very few slices | Precise comparison matters |
| Show relationship | Two numeric variables | Scatter plot | Correlation, clusters, outliers, or gaps matter | One variable is time and sequence is the story |
| Show relationship with many overlapping points | Two variables, dense points | Heatmap or hexbin | Overplotting hides density | Individual points matter |
| Show distribution | One numeric variable | Histogram | Shape, skew, modality, and frequency matter | The y-value is not a count/frequency |
| Compare distributions | Numeric variable by group | Box plot, violin plot, or small-multiple histogram | Spread, median, outliers, or shape differ by group | There are only a few values per group |
| Show exact values | Any tabular data | Table | Lookup, auditability, or precise value comparison matters | The pattern matters more than exact reading |
| Show one key fact | Single metric | Stat callout | One number carries the point | There is a trend or comparison behind the claim |
| Show geographic pattern | Geographic units | Choropleth or symbol map | Location itself explains the pattern | Ranking or comparison is the main job |
| Show flow between states | Source-to-target categories | Alluvial/Sankey | Movement, conversion, migration, or pipeline flow matters | Exact values or many small paths matter |
| Show hierarchy or connections | Nodes/edges or tree | Network/tree diagram | Relationship structure is the story | The reader needs magnitude comparison |

## Practical Caveats

- Use the reader's job as the first decision, not the available component library.
- Do not use time-series bars by default. Use bars for per-period totals; use lines for trajectory.
- Do not use progress bars for unrelated rates unless they share a clear target or denominator.
- Do not hide projections. Use dashed lines, labels, or a forecast band.
- Do not use dual axes unless the relationship is essential and both axes are clearly labeled. Prefer indexed lines or small multiples.
- Do not use maps for non-geographic questions. A ranked bar chart is often clearer than a map.
- Do not use pie/donut charts for fine comparison, many slices, or values that do not form a meaningful whole.
- Include a caption that states unit, time period, denominator, and any caveat.

## Examples

- Annual foreclosure filings from 2019-2026 pace: line chart, because the job is historical shape over time; dash the 2026 run-rate.
- Q1 filing count and April filing count: stat cards, because the job is to call out current scale and pulse.
- Bank mortgage delinquency vs MBA all-loan vs FHA vs credit-card delinquency: dot plot, because the values are rates on different denominators and should not look like progress bars.
- Active housing listings by year/month: line chart, because the story is recovery from a low point.
- New-home median prices by quarter/year: line or column depending on emphasis; use line for cooling trend, columns for discrete period comparison.
