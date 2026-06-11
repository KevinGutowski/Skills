# Skill-routing experiment: flat vs hub (2026-06-11)

## Setup
- Flat: actual 94 descriptions (~10.0k tok). Hub: research/cataloging (6 skills) + Rails (17 skills)
  each collapsed to one router skill → 73 descriptions (~7.8k tok). Saving: ~2.2k tok (22%).
- Probes: 14 easy (trigger words present; incl. fixtures-vs-factories and jobs-vs-throughput traps,
  4 cross-cluster controls) + 6 hard (no trigger keywords; incl. out-of-context boundary trap H2).
- Judges: fresh agents, blind (answer key flagged as do-not-use), descriptions only.
- Second hop: separate blind judges given only the hub router bodies.

## Results
| Condition | Easy (14) | Hard (6) | 2nd hop easy (10) | 2nd hop hard (6) |
|---|---|---|---|---|
| Flat | 14/14 | 6/6 | n/a | n/a |
| Hub  | 14/14 | 6/6 | 10/10 | 6/6 |
- Controls held in all runs. Boundary trap H2 (screenshot compression, no research context)
  correctly reached research-cataloging → image-archival under hub.

## Interpretation
- Zero measured routing loss from hub-ification of LOW-FIRE-RATE clusters whose hub description
  carries each member's distinctive triggers. The two-hop chain is reliable when the hub body is a
  tight router (one line per module, trigger-dense).
- Cost of hub per USE: one extra body load (~0.3-0.5k tok router body) + reference file. Cost of
  flat per SESSION: 2.2k tok descriptions always loaded (cached after first turn, but occupies window).
- Caveats: n=1 judge per cell (deterministic-ish task, all cells saturated); probes authored by the
  same author as the hub descriptions (mitigated by adversarial set); fire-rate assumption — hubs
  only pay off for clusters that fire rarely; hot-path clusters would pay the extra hop often.
