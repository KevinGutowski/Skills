# Chart Experience — Worked Examples

*Sources:*
- *WWDC 2022, 110340 — "Design an effective chart." https://developer.apple.com/videos/play/wwdc2022/110340/*
- *WWDC 2022, 110342 — "Design app experiences with charts." https://developer.apple.com/videos/play/wwdc2022/110342/*

Both are design talks (no Code-tab samples; Swift Charts implementation lives in the linked developer sessions). The running example is a pancake food-truck app operating in San Francisco and Cupertino, charting 30 days of sales.

---

## Marks: the pancake bar-chart decision (110340)

- **Points** looked fine with idealized data but hid the pattern in real, noisy data → "test your designs with real data early."
- **Lines** show rate of change, but the truck was closed 5 alternating days — the connecting segments across gaps visually dominated.
- **Bars** won: zeros are visible without distracting, "more white means more sales," and cumulative bar area tracks total sales.
- Non-visual parity: VoiceOver navigates the data values; **Audio Graphs** renders the chart as audio — Swift Charts provides both automatically with customizable labels.

## Axes (110340)

- Fixed range when bounds are known: Settings' battery chart (0–100%). Dynamic when there's no natural max: Health steps, pancake sales.
- Bar charts: keep the lower bound at 0 — "a bar that's twice as tall has twice as many sales."
- Grid lines: tiny trend platters need none; the detail chart settled on ~4 horizontal lines (7 was "overwhelming"); use intuitive increments (multiples of 20 for sales; 7-day steps for dates).

## Descriptions (110340 + 110342)

- Axis-label "Sales" → contextual heading "Pancakes sold" → takeaway "Total Sales: 1,234 Pancakes."
- Weather's model: "Light Rain Forecasted — light rain expected to start in 9 minutes and last for 36 minutes."
- The interpretation ladder (110342): "Sales in the Past 30 Days" → + total → "Sales in the past 30 days totaled 1,234 pancakes" → "Sales for the past 30 days are up 12%, totaling 1,234 pancakes" (interpretation helps unfamiliar data).
- Audio Graphs supplies non-visual axis descriptions ("The x-axis is time. The y-axis is sales."); without it, provide equivalents via accessibility labels.

## Interaction & accessibility labels (110340)

- Tooltip for exact daily values; **touch target = full chart height**, not the bar's pixels.
- Same details must be reachable by keyboard, Voice Control, Switch Control, VoiceOver; focus indicators large and visible.
- Label style: succinct (no axis-name repetition), spelled out ("June," never "Jun" or "6-1"), **context first** ("June 1, 36 pancakes") so jumping around the chart stays oriented.
- Granularity follows the goal: Maps' cycling elevation labels *sections* — "From 3.6 miles to 4.4 miles: Climb 100 feet, descend 5 feet"; a chart inside a small button can carry a single summary label.

## Color (110340)

- Uses: distinguish categories (Fitness rings), convey intensity (heat maps), or *remove* color to highlight (Health min/max heart rate).
- Color rides on top of redundant encodings: SF vs. Cupertino lines got circle/square point symbols + a legend before color — required for colorblindness and Differentiate Without Color.
- **Visual-weight balance:** vibrant pink vs. deep purple falsely implied hierarchy → equalize saturation/luminosity; deliberate imbalance only when highlighting (Fitness trend arrows).
- Pick colors "easy to differentiate by name," high-contrast against each other and the background; test against colorblind filters, Dark Mode, Light Mode, Increase Contrast.
- Culture check: US stocks green=gain/red=loss; in China the convention is reversed.

## The app experience (110342)

- **When to chart:** change over time; portion of a whole (goal progress); comparisons. "Only the most important information should become a chart." Food truck: recent sales, popular items, best location per day.
- **Three perspectives as tappable stat rows** under the chart (tap re-renders): macro = totals/averages; medium = weekday/weekend, pancake style, city; micro = last transaction, largest sale.
- **Size ↔ function:** Watch complications / Stocks thumbnails / Health trend platters are static, label-free previews of a chart "a tap away"; interactive charts run view-width with axes and range controls.
- **Continuity rule** on tap-through: preserve values, context, state — "they want to see more of what they have already seen… You can add information, but showing something different can be frustrating or disorienting."
- **Design-system mutations demo:** duplicate the sales chart and change—
  - time scope only → new description + data, same everything else;
  - **data type** → also change color (description-only changes get missed);
  - subject + range + metric → also change bar styling. "Purposefully distinct to ensure that these differences will be noticed."
- **Form moves:** popular-pancakes chart made **horizontal** to distinguish it from the vertical time series (longer bars, same platter height; preview drops labels to spotlight the top style); city-by-day chart converted split bars to **lines** → "the best sales day over the past 30 days was Sunday in San Francisco."
- Novel forms need onboarding: Activity rings get an intro splitting move/exercise/stand; supporting charts stay familiar (bar, line); scatter plots need extra guidance.
- Reference apps named: Health, Fitness, Weather, Stocks; third-party Strava ("detailed workout analysis") and Duolingo ("playful progress charts").
- The app restructure: two tabs (orders + transaction list) → a sales tab of stacked chart platters, with "View all sales" pushed behind navigation.
