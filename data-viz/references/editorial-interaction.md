# Editorial and Interactive Chart Craft

*Scope: Polish charts and dashboards that need to read as editorial, trustworthy, and implemented with real interaction quality. Use after the chart type is chosen and the Tufte integrity pass is clean.*

Source spine: Hyperagent public skill `nyt-data-viz` (alexmcdonnell-airtable/hyperagent-public-skills), which distilled NYT/Upshot chart-production patterns plus D3 failure cases. Treat it as a practitioner source, not a license to copy its typography or scripts wholesale.

## Editorial Frame

1. **One claim, not a label.** The headline should say what the reader should notice. The subtitle names unit, timeframe, and denominator. The source line stays visible.
2. **One hero accent.** Put the series or segment that matters in color; push comparison/context marks into gray. Use monotonic-luminance ramps for ordered data; use diverging color only when there is a meaningful center or zero.
3. **Direct labels before legends.** Label endpoints, notable categories, and annotated inflections where the eye already is. Legends are a fallback when direct labeling would create collisions.
4. **Chart-type discipline.** Line charts for time, bars from zero for magnitude, dot/lollipop when zero is not meaningful, small multiples once too many series compete. Avoid dual y-axes and pie/donut charts unless the task is truly rough part-to-whole recognition.
5. **Mobile first.** At 375px wide, the crucial reading must still be visible without hover, tap, or a legend hunt. Interaction can enrich, but it cannot carry the main point.

## Annotation Rules

- Annotate the change, threshold, or exception, not the obvious chart mechanics.
- Give annotation text a subtle background-colored halo when it crosses marks or grids.
- Lift trough/edge labels off the data with leader lines; do not let labels share the same visual column as axis ticks.
- Use tabular numerals for labels, ticks, and tooltips so numeric columns do not jitter.
- Keep axes human-readable: units in labels, short tick formats, and only the gridlines needed for comparison.

## D3 Interaction Failure Checks

These bugs are easy to miss in static screenshots and show up immediately in a user test.

1. **Hit layer shares mark coordinates.** Append the transparent hover rectangle to the same margin-translated `<g>` as the marks. If the overlay lives on the SVG root while marks live in plot-space, `d3.pointer()` is offset by the margins and the wrong mark highlights.

```js
g.append("rect")
  .attr("width", innerWidth)
  .attr("height", innerHeight)
  .attr("fill", "transparent")
  .on("mousemove", function (event) {
    const [mx, my] = d3.pointer(event, this);
    // mx/my now match the plotted mark coordinates.
  });
```

2. **Proximity, not pixel hunting.** Do not require the pointer to land on a 2-3px dot. Build a Delaunay/Voronoi hit field over plotted points and snap to the nearest valid datum.

```js
const points = data.map((d) => [x(d.key), y(d.value), d]);
const delaunay = d3.Delaunay.from(points, (p) => p[0], (p) => p[1]);
const i = delaunay.find(mx, my);
```

3. **Tooltip anchors to the mark.** Position tooltips from the hovered mark's rendered bounds or a highlight node, not raw cursor coordinates. Cursor-following tips jitter, cover the point, and feel detached on dense charts.

4. **Domains cover the data.** Never hand-type a round axis cap without checking the actual max/min. Compute domains from the data, call `.nice()` if appropriate, then add explicit ticks only after the range is honest.

```js
const maxValue = d3.max(data, (d) => d.value);
const y = d3.scaleLinear().domain([0, maxValue]).nice().range([innerHeight, 0]);
```

5. **Interaction is not the explanation.** Hover states can reveal exact values and secondary context, but the main comparison, outlier, or trend must be legible before interaction.

## Prepublish Pass

- Headline makes a claim; subtitle states unit/timeframe/denominator.
- Source, sample size, and caveats are visible near the chart.
- The important series/category has one accent; background context is quieter.
- Labels sit next to marks; no avoidable legend.
- No dual axis, rainbow palette, decorative 3D, or chart type mismatch.
- At mobile width, the main point is readable without interaction.
- Hover hit test selects the nearest intended mark across the whole plot area.
- Tooltip does not cover the mark or flicker at panel edges.
- Axis domains include all outliers; projections/incomplete periods are visually distinguished.
