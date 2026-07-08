# Rails Guides Lookup

*Scope: Official Rails documentation routing. Use when a Rails task turns on a framework mechanism, DSL option, lifecycle callback, query API, rendering/routing behavior, asset pipeline, security feature, job/storage/cable component, upgrade step, or version-specific behavior. This is a lookup router, not a Rails style school.*

## Operating Rule

The Rails Guides are the canonical baseline for framework mechanics. Use local skill references for judgment, architecture, and house style; use the official guides to verify what Rails already provides before adding app-level abstractions, gems, or custom conventions.

Check the project's Rails version first when behavior may differ. The guides index is versioned; use the matching version from the selector when the app is not on the current stable guide version.

## Where To Look

| Task surface | Official guide | Local skill reference |
|---|---|---|
| Associations, scoped `has_many`, `has_one`, `dependent`, `inverse_of`, counter caches | https://guides.rubyonrails.org/association_basics.html | [active-record-associations.md](active-record-associations.md) |
| Query methods, `order`, `first`, joins, eager loading, `where.missing` | https://guides.rubyonrails.org/active_record_querying.html | [active-record-associations.md](active-record-associations.md), [optimizing-rails.md](optimizing-rails.md) |
| Migrations, schema changes, indexes | https://guides.rubyonrails.org/active_record_migrations.html | [rails-migrations.md](rails-migrations.md) |
| Validations and callbacks | https://guides.rubyonrails.org/active_record_validations.html, https://guides.rubyonrails.org/active_record_callbacks.html | [dhh-style.md](dhh-style.md), [dhh-style/models.md](dhh-style/models.md) |
| Controllers, params, sessions, rendering, redirects | https://guides.rubyonrails.org/action_controller_overview.html, https://guides.rubyonrails.org/layouts_and_rendering.html | [dhh-style.md](dhh-style.md), [dhh-style/controllers.md](dhh-style/controllers.md) |
| Routing and resource shape | https://guides.rubyonrails.org/routing.html | [dhh-style.md](dhh-style.md), [dhh-style/resources.md](dhh-style/resources.md) |
| Jobs and queue behavior | https://guides.rubyonrails.org/active_job_basics.html | [rails-jobs.md](rails-jobs.md), [optimizing-rails.md](optimizing-rails.md) |
| Active Storage attachments | https://guides.rubyonrails.org/active_storage_overview.html | [active-record-associations.md](active-record-associations.md) for model relationship shape |
| Action Cable and realtime | https://guides.rubyonrails.org/action_cable_overview.html | [rails-hotwire-realtime.md](rails-hotwire-realtime.md), [rails-realtime.md](rails-realtime.md) |
| Testing APIs | https://guides.rubyonrails.org/testing.html | [rails-fixtures-testing.md](rails-fixtures-testing.md), [rails-testing.md](rails-testing.md) |
| Security mechanisms | https://guides.rubyonrails.org/security.html | [rails-security-multitenancy.md](rails-security-multitenancy.md) |
| Caching and production performance | https://guides.rubyonrails.org/caching_with_rails.html, https://guides.rubyonrails.org/tuning_performance_for_deployment.html | [optimizing-rails.md](optimizing-rails.md) |
| Upgrades and release behavior | https://guides.rubyonrails.org/upgrading_ruby_on_rails.html, release notes from the guides index | [rails-upgrades.md](rails-upgrades.md) |
| Autoloading/reloading, configuration, command line | https://guides.rubyonrails.org/autoloading_and_reloading_constants.html, https://guides.rubyonrails.org/configuring.html, https://guides.rubyonrails.org/command_line.html | Use project conventions; add a topic reference only after repeated misses |

## Fold Criteria

Fold guide material into a local Rails reference when it changes agent behavior: a recurring miss, a non-obvious Rails-native API, a version-sensitive default, or a common over-abstraction pattern. Do not copy broad guide explanations. Link the guide from the owning topic reference and distill the decision rule.

For a one-off mechanism lookup, cite the official guide in the answer or code review and leave the skill unchanged.

## Sources

- Ruby on Rails Guides index, current guide set and version selector. https://guides.rubyonrails.org/
