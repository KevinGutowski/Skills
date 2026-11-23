# Skill-listing budget (Claude Code)

Claude Code reserves ~1% of the context window (in characters) for the skill
listing; over budget, it silently shortens/drops least-used descriptions
(`/doctor` reveals it). Constraint from Kevin: do NOT raise
`skillListingBudgetFraction`; and (2026-06-12) the library must be
**environment-agnostic** — no per-machine `skillOverrides`, because other
machines and other agents (Codex) never see those settings.

## Current approach: repo-native consolidation (2026-06-12)
Low-fire-rate clusters are single skills whose members live as reference files
(progressive disclosure — works identically in every environment):

- `rails` — 16 former member skills under `rails/references/` (four schools +
  topics). `dhh` stays standalone (user-invocable /dhh).
- `research-cataloging` — 6 former members under `research-cataloging/references/`.
- `swiftui` — 9 former members (swiftui-×4, swift-concurrency,
  touch-interaction-design, widget-design, sf-symbols, sound-design).

This took the listing from 99 skills (~41k chars, ~2x budget, ~20 hot
descriptions silently evicted) to 68 skills. The 2026-06-15 pruning pass kept
the hub model and trimmed the longest router descriptions instead of adding
new consolidation. Hot design/book skills stay flat
with full descriptions — their boundary clauses do real routing work.

## History
- 2026-06-11: first hit the wall at 94 skills (46 descriptions dropped). Interim
  fix was a per-machine `skillOverrides` overlay (validated 36/36 in
  docs/routing-experiment-2026-06.md) — retired 2026-06-12 in favor of
  consolidation when /doctor showed the wall again at 98 and Kevin set the
  agnostic requirement.

## House rules going forward
- Hot design-core skills stay flat with full descriptions. Consolidate only
  LOW-FIRE-RATE clusters, in the repo, never via settings.
- Description band: 350-450 chars (consolidated routers may run ~600-700).
  Boundary clauses are sacred.
- Adding to a consolidated cluster: new content = a reference file + a line in
  the cluster SKILL.md body + vocabulary in its description if novel.
- Re-check /doctor after corpus growth; prefer consolidation/demand reduction
  over raising skillListingBudgetFraction.

## 2026-11-12 check

After the November description edits the library is 42 skills and 17,552 description characters. `/doctor` and `/skill-doctor` were not run (they need a local Claude Code session); run both and record any shortened or dropped descriptions here.

## 2026-11-17 check

After adding `make-font` and rewording `design-systems` the library is 43 skills and 17,975 description characters. `/doctor` and `/skill-doctor` were not run.

## 2026-11-18 check

Adding `ui-fx` (445-character description after its same-day revisions) to the library as it stood with `make-font` brings it to 44 skills and 18,418 description characters (recounted after merging main on 2026-11-19). No other description changed on this branch. `/doctor` and `/skill-doctor` were not run (they need a local Claude Code session); run both and record any shortened or dropped descriptions here.

## 2026-11-18 check

After adding `faux-ui` and adding one trigger each to `frontend-design`, `working-with-ai`, and `creative-coding`, the library on that branch was 44 skills and 18,478 description characters. `/doctor` and `/skill-doctor` were not run.

## 2026-11-23 check

After merging main (which added `ui-fx`, `react`, and `browser-verification`) into the `faux-ui` branch, the library is 47 skills and 19,899 description characters. `/doctor` and `/skill-doctor` were not run.
