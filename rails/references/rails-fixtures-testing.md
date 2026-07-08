# Rails Testing — Fixtures School

*Scope: Test Rails the fixtures school's way (Minitest + fixtures, 37signals practice) — tight behavior coverage at the owning layer, fixture craft (label refs, ERB timestamps, deterministic UUIDv7s), Turbo/broadcast assertions by layer, multi-tenant test wiring, negative-space authorization tests. Use when writing or reviewing tests on a vanilla/37signals-style codebase. For factory/RSpec suites or test-suite speed/flakiness work use rails-testing — different school; route by the project's existing choice.*

> Vendored from [marckohlbrugge/37signals-skills](https://github.com/marckohlbrugge/37signals-skills) @ c58e7d5 (skill text MIT; Fizzy code excerpts under the [O'Saasy license](https://osaasy.dev)). LLM-extracted from 265 Fizzy PRs + Campfire — verify unusual claims against the upstream guide's per-PR links.
>
> Official docs checked: [Testing Rails Applications](https://guides.rubyonrails.org/testing.html) for Minitest/Rails assertions and targeted test runner usage; [Caching with Rails](https://guides.rubyonrails.org/caching_with_rails.html) for cache keys, versions, and `touch:` invalidation; [Minitest README](https://github.com/minitest/minitest) for the small assertion/mock surface.

Use for test-writing and test-review tasks. Patterns from Campfire and Fizzy test suites.

## Defaults

- Minitest + fixtures. No RSpec, no FactoryBot.
- Test behavior, not implementation details. Spend coverage at the layer that owns the behavior; do not restate the same assertion through every model/service/controller/cache boundary.
- Prefer Rails/Minitest assertions that name the behavior directly (`assert_difference`, `assert_changes`, `assert_response`, `assert_enqueued_with`) over generic truthiness or bespoke test helpers.
- One behavior contract per test; multiple assertions are fine when they describe the same contract and make the failure precise.
- Keep tests deterministic and fast; `parallelize(workers: :number_of_processors)`.
- Tests ship in the same commit/PR as the feature — not before, not later. Security fixes always include a regression test.
- Never add production complexity for testability (no test-induced design damage).

## Coverage Budget (where 37signals actually spends)

- **Heavy:** model tests (domain invariants, concerns) and controller/integration tests (full request cycle, auth, formats).
- **Light:** a few system tests for the critical happy paths (one smoke test can cover signup→use); job tests only for jobs with real logic.
- **None:** view tests, JS/Stimulus unit tests, exhaustive channel tests. UI behavior is covered indirectly by system tests.
- Don't duplicate the same behavior assertion at multiple layers.

## Coverage Ownership Heuristic

When reviewing a broad test plan, first ask "who owns the behavior?" Then keep the assertion there unless another layer adds distinct behavior to protect.

| Layer | Owns |
|---|---|
| Model test | Domain invariants, validations, scopes, association behavior, ordering rules |
| Controller/integration test | Request contract, auth, params, redirects/status, response shape, format handling |
| Service/cache test | Derived payload shape, compatibility, invalidation, rebuild behavior, orchestration not owned elsewhere |
| Job test | Orchestration or side effects not already proven by model/import/request tests |
| System test | One or two critical user-visible flows where browser, Hotwire, or realtime wiring matters |

Prefer one high-signal test over a ladder of shallow duplicates. If the model test proves an association ordering rule, another layer should only test its distinct contract, not reassert the ordering under a different fixture name. If a derived display payload — cached or not — owns both selection and freshness, write one contract test that:

1. Builds or populates the derived payload.
2. Changes the record that should invalidate or supersede the cached value.
3. Asserts the rebuilt payload reflects the new behavior.

This single test protects the selection rule, freshness dependency, and rebuilt API shape without forcing the production API to expose test-only seams.

## Fixtures

- Express relationships by label, not ID; use ERB for relative timestamps (`created_at: <%= 1.hour.ago %>`) and shared computed values (one bcrypt digest reused).
- Mirror `app/models` structure in `test/models`: `app/models/card/closeable.rb` ↔ `test/models/card/closeable_test.rb`; shared concerns under `test/models/concerns/`.
- UUID PKs break fixture ordering: generate deterministic, label-derived UUIDv7s in fixtures so `.first`/`.last` are stable and runtime records are always newer.
- Build rich-content fixtures with production code (`ActionText::Attachment.from_attachable(user).to_html`), not hand-written markup.

## Good Practices

- Use system/integration tests for user workflows; model tests for domain invariants.
- `travel_to` for time-based logic.
- Mock/stub only at boundaries (external APIs, network, time, `SecureRandom`); use VCR for external HTTP — auto-name cassettes from class+test name, normalize timestamps in matching.
- Test async side effects from model tests with `perform_enqueued_jobs(only: SpecificJob)` and `assert_enqueued_with` — not by unit-testing trivial job classes.
- Correlated count changes in one assertion: `assert_difference({ -> { card.assignees.count } => -1, -> { Event.count } => +1 })`.
- Test both response formats where controllers serve them: `as: :turbo_stream` (assert stream targets) and `as: :json` (status, Location header, body).
- Turbo/broadcast assertions by layer: `assert_turbo_stream_broadcasts` in model tests, `assert_turbo_stream action:, target:` in controller tests, `assert_no_turbo_stream_broadcasts` for negatives.
- Authorization tests assert the negative space: cross-tenant/role access returns 403/404, not just that allowed access works.
- Multi-tenant suites: set `Current.account` (and `Current.session` when behavior depends on the actor) in setup; integration/system tests set `default_url_options[:script_name]`; provide an `untenanted { }` helper for auth routes. Clear `Current` in teardown.
- Test middleware in isolation with `Rack::MockRequest`.
- System tests: `using_session("Kevin")` for multi-user scenarios; wait for cable connection before asserting realtime; auth via a fast session-transfer helper, keeping the full login flow to one smoke test.
- Suites with non-transactional side effects (FTS tables) opt out per-helper: `self.use_transactional_tests = false` + explicit cleanup.
- Reset shared global state per test in parallel suites (thread pools, `ActionCable.server.pubsub`, `Current`).

## Red Flags

- Adding production complexity only for testability.
- Over-mocking internal app code.
- Duplicate tests for the same behavior at multiple layers.
- Multiple tests proving "the first positioned record wins" with different fixture labels.
- A service/cache test that only repeats a model ordering assertion.
- Production response or cache payload shape changed to make a test easier.
- Tests whose failure says only "expected truthy" instead of naming the broken contract.
- Tests that mainly verify Rails mechanics instead of app behavior.
- Slow suites caused by unnecessary setup in each test (that's what fixtures are for).
- Unit tests for one-line job classes or trivial delegations.
- Hand-rolled HTML strings where production renderers/helpers would stay in sync automatically.
- Time-dependent assertions without `travel_to`.

## Related skills

- [dhh-style.md](dhh-style.md) — the school doctrine this testing practice belongs to.
- [rails-testing.md](rails-testing.md) — the *factories* school (RSpec/FactoryBot, TestProf speed/flakiness method). Different schools — route by the project's existing choice, don't blend.
- [rails-security-multitenancy.md](rails-security-multitenancy.md) — the tenancy architecture these test-wiring patterns exercise.
