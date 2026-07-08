# Sources

This is a top-level provenance map for the Rails router. The detailed references remain topic-owned; this file helps decide when a rule can be promoted.

## Source-backed references

- `dhh-style.md` has `dhh-style/sources.md` for 37signals/DHH-style Rails.
- `rails-guides.md` maps Rails skill topics to the official Rails Guides index and versioned framework documentation.
- `active-record-associations.md` is sourced to the Rails Guides for association scope blocks and query ordering behavior.
- `layered-rails.md` has `layered-rails/sources.md` for Evil Martians-style layering.
- `rails-event-sourcing.md` has `rails-event-sourcing/sources.md` for DDD/event-sourcing routing.
- `rails-testing.md` has `rails-testing/sources.md` for factory/TestProf/flakiness guidance.
- `rails-realtime.md` has `rails-realtime/sources.md` for websocket and streaming scale.
- `optimizing-rails.md` has `optimizing-rails/sources.md` for profiling/performance guidance.
- `rails-upgrades.md` has `rails-upgrades/sources.md` for dual-boot and upgrade methodology.
- `inertia-rails.md` has `inertia-rails/sources.md` for Inertia Rails.

## References needing source refresh before rule promotion

- `rails-webhooks.md`
- `rails-migrations.md`
- `rails-security-multitenancy.md`
- `rails-jobs.md`
- `rails-fixtures-testing.md`
- `rails-hotwire-realtime.md`
- `rails-docker-dev.md`
- `ruby-refactoring.md`

These can still guide local work, especially when they match the project, but new global rules should be tied to Rails guides, gem docs, source articles, project incidents, or accepted review outcomes.

## Promotion rule

Never blend Rails schools into a new library-wide rule. Promote a rule only with its school, scope, source, and exception path.
