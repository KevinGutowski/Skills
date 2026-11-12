# Tactile Design — layout and data

Deep file for [../tactile-design.md](../tactile-design.md). Source: `kosta4a/tactile-design` (MIT), its layout-and-hierarchy reference, paraphrased. Siblings: [motion-values.md](motion-values.md), [phone.md](phone.md).

## Contents
- Columns and rhythm
- Proportion and placement
- How much data to show
- Worst-case data and formatting
- Figures, meters, charts, steps
- Empty, loading and error states

## Columns and rhythm

| Page type | Column |
|---|---|
| Read top to bottom (home, overview, guides) | about 800px, centred; prose capped at 70ch |
| Data (tables, charts, usage, plans) | about 1200px |
| Form, flow, sign-in | about 440px |

- **The widths follow the type.** If the type scale is multiplied by f to fit another face, multiply the widths by f too.
- **Step markers hang in the margin** when there's room, so every line of text starts on one left edge.
- **The default section:** a 20/28 title, 6px, a description, 24px, then the content, with 32px of room above and below.
- **The title-to-description gap ladder:** 2px under a 16px card title, 4px under a page title in app chrome, 6px under a section title, 8px under a display title. Tune these in 2px steps.
- **The spacing ladder:** 2, 4, 6, 8, 12, 16, 20, 24, 32, 48, 64. Nudges are 1, 2 or 4px; blocks move in 8, 16 or 32px.

## Proportion and placement

- **Equal padding on all sides** of strips, bars, cards and selectors. Space above equals space below for anything between two things. An icon button in a bar is as wide as the bar is tall.
- **Match the neighbour:** input = button = toggle = selector height, and dropdown rows = button height.
- **One left edge.** When centring, centre the text, not the markers beside it.
- **Align values by context.** Table cells align left, figures included, in tabular numerals. Elsewhere a value set against its label aligns right (a stat row, a meter's amount).
- **Hug or fill.** Table columns, toggles and action cells hug their content. Inputs in a modal fill the width. Desktop dialog buttons hug; phone action stacks fill.
- **Actions sit above the data they act on**, right of the section title and centred on the title and description together. You choose what to do before you read the result. Paging and "View all" come *after* the data, outside its card.
- **A control sits next to what it sets.** Filters stay on one row and scroll sideways on narrow screens rather than wrapping.

## How much data to show

**Show the least that answers the question the page exists for.**

| Where | Default |
|---|---|
| Summary list | 5–6 rows, then a pager or "View all" |
| Full list page | the rows that fit one viewport, rounded to 10/20/25/50 |
| Period breakdown | one natural period of the unit: 24 hours, 7 days, 30 days, 12 months |
| Card grid | a whole multiple of the column count, 2–3 rows |
| Stats on a phone | rows (label left, value right, hairlines between), not tiles |

- **One strong metric** with a small label beats a grid of small numbers. Remove duplicate widgets and fold secondary numbers into the card they belong to. The same number twice makes the user wonder which is right.
- **Gate by state.** New and returning users can see different pages. Before the first key action, the steps to do it can be the whole page. Afterwards the remaining steps shrink to one section and leave once done.
- **Hide rather than delete.** Sections show only if they exist, and completed steps hide.
- **Never show fake data to users.** Mock data belongs in previews.

## Worst-case data and formatting

- **Free text in cells, the rail, breadcrumbs and titles** stays on one line. It hugs up to about 32ch, then end-truncates with "…", with the full value in a tooltip and still selectable. Flex children holding text need `min-width: 0`.
- **Card descriptions** clamp to 2 lines, and badges cap at about 24ch.
- **Figures over 6 digits** use compact notation (`Intl.NumberFormat(locale, { notation: "compact" })`), with the full value in a tooltip.
- **A missing value** shows as a faint en dash.
- **Plurals** go through `Intl.PluralRules`.
- **Money and dates** format through `Intl` with the user's locale. Whole amounts drop ".00"; dates drop the time zone on a phone.
- **Long IDs** truncate to about 8 characters, with a tooltip and a copy action.
- **Preview every component** with the shortest and longest real values before shipping.

## Figures, meters, charts, steps

- **Figure:** a 24/32 number with a body-size label directly under it, and the range in brackets ("Runs (24h)"). While loading, a pulsing dash holds the number and the label stays put.
- **Meter:**
  - **Header:** the label and the amount ("12 / 50") on one line, then a 10px bar.
  - **Fill:** 0 shows no fill; anything above 0 shows at least a 2% sliver.
  - **Colour:** it takes its identity hue and turns red at about 10% remaining, but only for quantities that run down, never for progress.
- **Chart type:** bars for counts per period and for status or health. A line only where the trend is the question (latency, a balance over time), because a line invites optimising a trend.
- **Chart motion:** bars fade in on a range change and never sweep or grow for style. Hovering dims the other bars to about 35%. The latest bar may pulse to mean "now". Figures never animate.
- **Chart styling** (shown in the source's demo):
  - **Gridlines:** dotted, over a hairline baseline.
  - **Scale:** at the right, in mono, so the numbers line up.
  - **Bars:** small rounded tops.
  - **Axes:** short weekday labels in tracked capitals.
- **Steps:**
  - **Marker:** a raised numbered disc.
  - **Done:** a green disc with a tick.
  - **Waiting:** a slowly turning dashed ring with a shimmer on the title.
  - **Blocked:** a step that can't run yet shakes where it stands and says why.
  - **Celebration:** celebrate the *moment* of finishing, then fade the card out. Never replay it on reload.

## Empty, loading and error states

- **Empty:** a bare, centred, ground-coloured panel. A small icon not in a box, two short lines (what's missing, then what to do) and no border. Empty is a state, not an event. With filters on: "Try removing a filter, or clear them all."
- **Failed load:** the empty layout with two lines and one secondary "Try again".
- **Loading:** the empty layout with a spinner, or skeletons that keep labels and column widths and replace only values. Hold panels at a minimum height so buttons don't move. Rotating text shares one grid cell sized to its longest option. Say honestly what is happening until it has actually happened.
