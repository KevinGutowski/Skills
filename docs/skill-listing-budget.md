# Skill-listing budget & the hub overlay (2026-06)

Claude Code loads every skill's description into context, capped at **1% of the context
window (in characters)**. Overflow silently shortens descriptions and drops least-used
skills to name-only (`/doctor` shows which). At ~94 skills this corpus needed ~2%, so
roughly half the descriptions were being silently evicted.

## The overlay architecture (validated — see routing-experiment-2026-06.md)
- Two **router skills** (`rails-hub`, `research-cataloging-hub`) carry cluster-level
  trigger vocabulary and point to member skills BY NAME. Model reads the router body
  (one hop) → invokes the member → full body loads. Experiment: 36/36 routing accuracy,
  zero loss vs flat, including keyword-free adversarial probes.
- Member skills keep their full SKILL.md descriptions in the repo (portable; baseline
  environments behave exactly as before, routers are additive/harmless there).
- On machines that want the savings, hide member descriptions via `skillOverrides`
  in `~/.claude/settings.json` (NOT in this repo — it's a per-machine overlay):

```json
"skillOverrides": {
  "dhh-style": "name-only", "layered-rails": "name-only", "inertia-rails": "name-only",
  "optimizing-rails": "name-only", "ruby-refactoring": "name-only",
  "rails-webhooks": "name-only", "rails-migrations": "name-only",
  "rails-security-multitenancy": "name-only", "rails-jobs": "name-only",
  "rails-fixtures-testing": "name-only", "rails-hotwire-realtime": "name-only",
  "rails-testing": "name-only", "rails-realtime": "name-only",
  "rails-docker-dev": "name-only", "rails-event-sourcing": "name-only",
  "rails-upgrades": "name-only", "archival-research": "name-only",
  "catalog-reconciliation-research": "name-only", "source-translation-workflow": "name-only",
  "nocodb-catalog-management": "name-only", "image-archival": "name-only",
  "source-sweep": "name-only", "route-planning": "name-only", "airtable-mcp": "name-only",
  "openai-transcription-chunking": "name-only", "skill-creator": "name-only",
  "dhh": "user-invocable-only", "goal": "user-invocable-only"
}
```

## House rules going forward
- Hot design-core skills stay flat with full descriptions (their boundary clauses do
  real routing work — eval-proven). Hub-ify only LOW-FIRE-RATE clusters.
- Description band: 350–450 chars (routers may run ~600). Boundary clauses are sacred.
- When adding a skill to a hubbed cluster: update the hub body + add the override.
- Re-check `/doctor` after corpus growth; prefer demand reduction over raising
  `skillListingBudgetFraction`.
