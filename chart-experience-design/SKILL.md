---
name: chart-experience-design
description: Design effective, accessible charts and the experience around them in apps — the five-part anatomy (marks, axes, descriptions, interaction, color), when information deserves a chart, progressive disclosure from static platters to interactive detail charts, pairing charts with text at macro/medium/micro perspectives, and multi-chart design systems. Use when designing or reviewing in-app charts (Swift Charts or any framework), choosing marks and axis ranges, writing chart titles and accessibility labels, supporting VoiceOver/Audio Graphs, or linking preview charts to detail views. Based on Apple WWDC 2022 sessions 110340 and 110342. Triggers: chart design, in-app charts, chart anatomy, Audio Graphs, chart accessibility, chart platter, progressive disclosure charts, chart design system.
---

# Chart Experience Design

**Sources** — this skill aggregates two Apple WWDC 2022 design sessions:
- *Session 110340 — "Design an effective chart" (Halden & Lilian, Apple Design). https://developer.apple.com/videos/play/wwdc2022/110340/*
- *Session 110342 — "Design app experiences with charts" (Nicholas Felton, Human Interface). https://developer.apple.com/videos/play/wwdc2022/110342/*

An effective chart is **focused** (a few key insights, intentionally), **approachable** (easy to interpret), and **accessible** (works non-visually). This skill covers a single chart's anatomy *and* the experience around charts in an app. It composes with `chart-selection` (which chart type fits the data) and `tufte-viz` (graphical integrity and data-ink critique) — pick the form there, design the in-app experience here.

## When does information deserve a chart?

Three strong cases: **change over time** (historical/predicted values), **portion of a whole** (progress toward a goal, filling/emptying), and **comparison** (items or categories). Charts are a strong focal signal — "only the most important information should become a chart."

## The five-part anatomy (per chart)

1. **Marks** — design for your goals *and the data's shape*; **"test your designs with real data early."** Points hide patterns in noisy data; lines mislead across gaps (closed days dominate as connecting segments); bars made zeros visible and let "more white mean more sales." Every mark needs a non-visual form: VoiceOver over the data + **Audio Graphs** (Swift Charts provides both; customize the labels).
2. **Axes** — fixed range when bounds are known (battery 0–100%), dynamic when not (sales, steps); with bars, pin the lower bound at 0 so twice as tall = twice the value. Tune grid density to size: none on tiny platters, ~4 lines on detail charts (7 was "overwhelming"); use intuitive steps (multiples of 20; 7-day ticks).
3. **Descriptions** — prefer a contextual title over an axis label ("Pancakes sold" as the heading); best is the **takeaway as a sentence**: "Total Sales: 1,234 Pancakes" or Weather's "Light Rain Forecasted — expected to start in 9 minutes." A description "if read in isolation, should be informative."
4. **Interaction** — details on demand via tooltips; **stretch touch targets to the full chart height**, not the mark. Every touch path must also work via keyboard, Voice Control, Switch Control, VoiceOver. Accessibility labels: succinct, no axis-name repetition, spelled-out words ("June," not "Jun"), context first ("June 1, 36 pancakes"); label granularity follows the goal (Maps labels elevation *sections*; a button-sized preview gets one summary label).
5. **Color** — personality and clarity, **never the sole carrier** (redundant encodings first: symbols + legend). Color can distinguish categories, convey intensity, or be *removed* to highlight. **Balance visual weight** between category colors (a vibrant pink falsely outranked a deep purple); colors should be nameable, mutually high-contrast, tested against colorblind filters, Dark Mode, and Increase Contrast. Mind cultural meaning (US: green gains/red losses; China: reversed).

## The experience around charts

- **Pair charts with text and stats.** Ladder: bare labels → add the total → full sentence → *interpreted* ("Sales for the past 30 days are up 12%, totaling 1,234 pancakes") when the data is unfamiliar.
- **Three perspectives**, surfaced as tappable stat rows that re-render the chart: **macro** (totals/averages), **medium** (weekday vs. weekend, category, city), **micro** (last transaction, largest sale).
- **Size tracks function.** Small static platters (complications, thumbnails, trend cards): no grids, labels, or interactivity — they *preview* a bigger chart "a tap away." Interactive charts: view-width, axes + labels + range controls. Largest: deep investigation.
- **Progressive disclosure with continuity.** "Progressively reveal chart complexity so someone can choose the level of information that matches their interest" — and the expanded chart must preserve the preview's **values, context, and state**: keep the shape, keep previously visible numbers. "You can add information, but showing something different can be frustrating or disorienting."

## A chart design system (multiple charts, one app)

- **Familiar forms for supporting charts** (bar, line); scatter plots need guidance; a novel form must be central and introduced (Activity rings get an onboarding moment).
- **Make differences visible.** Same data, new time scope → change description + data only. **Different data type → also change color** (text changes alone get missed). Different subject + range + metric → also change mark styling. "The design is purposefully distinct to ensure that these differences will be noticed."
- Worked moves: the popular-pancakes chart went **horizontal** purely to distinguish it from the vertical time-series (and bars got longer without a taller platter); the best-day-by-city chart converted bars to **lines** to focus on daily change.

## Checklist

- [ ] Does this information earn a chart (time / portion / comparison)?
- [ ] Marks tested against *real* data; zeros and gaps honest?
- [ ] Axis ranges fixed-vs-dynamic deliberate; bar baselines at 0; grid density tuned to size?
- [ ] Title states the takeaway as a sentence; informative in isolation?
- [ ] Interaction targets full-height; all input methods + VoiceOver/Audio Graphs covered; labels succinct and context-first?
- [ ] Color redundant, weight-balanced, colorblind/Dark Mode/Increase Contrast tested?
- [ ] Small charts static and clean; tap-through preserves values, context, state?
- [ ] Across the app: familiar forms, visible differences, consistent system?

See `references/examples.md` for the pancake food-truck walkthrough and the per-rule examples (Weather, Health, Maps, Stocks, Activity rings).

## Relationship to other skills

- **`chart-selection`** — picks the chart *type* for the data (line vs. bar vs. dot plot…). Choose the form there; design the marks/axes/experience here. They overlap on "bars vs. lines for gappy data" — this skill adds the Apple in-app experience layer.
- **`tufte-viz`** — the critique lens (data-ink, graphical integrity, chartjunk). Use it to audit what this skill produces; its data-ink instinct matches this skill's "no grids on platters."
- **`apple-visual-accessibility`** — the broader accessibility settings behind this skill's color and VoiceOver rules (Differentiate Without Color, contrast, Increase Contrast).
- **`design-principles`** — *Simplicity* (distill data to a graphic, "exactly enough") and *Flexibility*; the "complex data better understood as a graphic" line in its Simplicity section routes here.
- **`swiftui-lazy-stacks`** — chart platters in scrolling feeds are lazy-stack content; follow its rules for stable layout.
