---
name: data-viz
description: "Design, choose, and critique charts. Use when picking chart types (line, bar, dot, scatter, histogram, heatmap, map), reviewing fit/integrity, polishing editorial, dashboard, or interactive charts, or applying Tufte: graphical integrity, data-ink, chartjunk, small multiples. Swift Charts/in-app Apple chart UX → apple-design. Triggers: chart type, dashboard design, data visualization, chartjunk, data-ink, small multiples, D3 tooltip."
---

# Data Visualization

Defaults that survive without the references:

- **Single important number** → stat callout, not a chart; **exact lookup** → table.
- **Data over time** → decide by what is being read. *Trajectory* (shape, direction, pace of a continuous measure: latency, a balance, a price, a rate) → line chart, on any surface; dash the segment for projections or incomplete periods. *Per-period counts or status* (sessions per day, signups per week, health per hour) on an in-app product dashboard → bars, one per period. On editorial pages, reports, and decks a time series defaults to a line unless discrete period totals are the point. Dashboard conventions: editorial-interaction → Product Dashboard Conventions.
- **Category magnitude** → bars from a meaningful zero; **zero not informative** → dot plot/lollipop.
- **Never** dual y-axes or pie/donut for fine comparison; prefer indexed lines or small multiples.
- Prefer direct labels near marks over legends; the main point must read at mobile width without interaction.

Read the reference that matches the task:

- **Choosing a chart** (which type fits the data and question; building dashboards, reports, decks, frontend visuals): [references/chart-selection.md](references/chart-selection.md); deep dive: chart-decision-matrix (full prefer/use-when/avoid-when table)
- **Critiquing or redesigning** (graphical integrity, data-ink ratio, chartjunk, small multiples, dense displays, visual encodings): [references/tufte.md](references/tufte.md); deep dives: tufte-principles (critique vocabulary), analytical-design (sparklines, layering, dense dashboards)
- **Editorial and interactive chart craft** (NYT/Upshot-style chart pages, dashboard polish, direct labels, annotations, hover hit testing, tooltip behavior, mobile prepublish checks): [references/editorial-interaction.md](references/editorial-interaction.md)
- **Sources and gaps** — provenance map and parked candidate standards: [references/sources.md](references/sources.md), [references/coverage-gaps.md](references/coverage-gaps.md)

Typical flow: select the type first (chart-selection), refine integrity/density with the critique principles (tufte), then use editorial-interaction when the chart must ship as a polished page, dashboard, or interactive artifact. For the *in-app experience* around a chart — platters, progressive disclosure, Swift Charts, Audio Graphs, accessibility labels — use `apple-design` (chart-experience-design) instead.
