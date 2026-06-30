# Data Visualization Coverage Gaps

Use this file to park chart and visualization standards that need stronger evidence, examples, or fixtures before becoming reusable rules.

## Candidate Gaps

- **Bad/good chart examples.** The skill has strong principles, but needs a compact exemplar set for misleading axes, part-to-whole misuse, over-encoded dashboards, and weak annotations.
- **Interactive tooltip fixtures.** `editorial-interaction.md` has hover and hit-testing guidance; it needs small reproducible examples for tooltip jitter, mobile tap targets, Voronoi hit areas, and keyboard/focus access.
- **Dashboard-specific decisions.** The chart references cover individual charts well; recurring dashboard questions such as grouping, comparison baselines, alert thresholds, and scan order need accepted examples.
- **Accessibility split with Apple charts.** The skill defers Apple in-app chart experience to `apple-design`; it needs examples showing when to stay in generic data-viz versus when to route to platform-specific chart accessibility.
- **Deterministic checks.** Potential lintable rules include zero-baseline misuse on bars, unlabeled units, inaccessible color-only encoding, and missing source/time range. No script or fixture exists yet.

## Promotion Form

```markdown
rule/{stable-id}
Status: proposed | accepted | rejected
Chart/surface:
Question:
Rule:
Why:
Mechanical check possible:
Exceptions:
Source:
Bad example:
Good example:
Approver:
```
