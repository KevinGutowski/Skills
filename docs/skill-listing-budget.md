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
descriptions silently evicted) to 68 skills. Hot design/book skills stay flat
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
