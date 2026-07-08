# Rails Testing — Fixtures School

*Scope: Test Rails the fixtures school's way (Minitest + fixtures, 37signals practice) — tight behavior coverage at the owning layer, fixture craft (label refs, ERB timestamps, deterministic UUIDv7s), Turbo/broadcast assertions by layer, multi-tenant test wiring, negative-space authorization tests. Use when writing or reviewing tests on a vanilla/37signals-style codebase. For factory/RSpec suites or test-suite speed/flakiness work use rails-testing — different school; route by the project's existing choice.*

> Vendored from [marckohlbrugge/37signals-skills](https://github.com/marckohlbrugge/37signals-skills) @ c58e7d5 (skill text MIT; Fizzy code excerpts under the [O'Saasy license](https://osaasy.dev)). LLM-extracted from 265 Fizzy PRs + Campfire — verify unusual claims against the upstream guide's per-PR links. Assertion names, targeted test-runner usage, and cache-invalidation mechanics checked against the official Rails Guides (see [sources.md](rails-fixtures-testing/sources.md)).

Use for test-writing and test-review tasks. Patterns from Campfire and Fizzy test suites.

## Defaults

- Minitest + fixtures. No RSpec, no FactoryBot.
- Test behavior, not implementation details. Spend coverage once, at the layer that owns the behavior — don't restate the same assertion through every model/service/controller/cache boundary.
- Prefer assertions that name the behavior (`assert_difference`, `assert_changes`, `assert_response`, `assert_enqueued_with`) over generic truthiness. One behavior contract per test; multiple assertions are fine when they describe that one contract and make the failure precise.
- Keep tests deterministic and fast; `parallelize(workers: :number_of_processors)`.
- Tests ship in the same commit/PR as the feature — not before, not later. Security fixes always include a regression test.
- Never add production complexity for testability (no test-induced design damage).

## Coverage Ownership (spend once, at the owning layer)

**How much (where 37signals spends):** *heavy* on model tests (domain invariants, concerns) and controller/integration tests (full request cycle, auth, formats); *light* on system tests (a few critical happy paths — one smoke test can cover signup→use) and job tests (only jobs with real logic); *none* on view tests, JS/Stimulus unit tests, or exhaustive channel tests (UI behavior is covered indirectly by system tests).

**Where (who owns the behavior):** before writing a broad test plan, ask which layer owns each behavior and assert it there once. A layer earns its own test only for the contract it owns — not to restate a lower layer's under a new fixture name.

| Layer | Owns |
|---|---|
| Model | Domain invariants, validations, scopes, association + ordering behavior |
| Controller/integration | Request contract, auth, params, redirects/status, response shape, format handling |
| Service/cache | Derived payload shape, cache key/version compatibility, invalidation + rebuild behavior |
| Job | Orchestration or side effects not already proven by model/import/request tests |
| System | One or two critical user-visible flows where browser, Hotwire, or realtime wiring matters |

**Derived/cached display data — one high-signal contract test, not a ladder of shallow duplicates.** When a derived payload (cached or not) owns both *selection* and *freshness*, one test proves the whole contract:

1. Build or populate the derived payload.
2. Change the record that should invalidate or supersede it.
3. Assert the rebuilt payload reflects the new behavior.

This covers the selection rule, the freshness dependency, and the rebuilt shape at once — without adding a test-only seam to the production API.

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
- Duplicate tests for the same behavior at multiple layers — e.g. several tests proving "the first positioned record wins" under different fixture labels, or a service/cache test that only repeats a model ordering assertion.
- Production response or cache payload shape changed to make a test easier.
- A failure message that says only "expected truthy" instead of naming the broken contract.
- Tests that mainly verify Rails mechanics instead of app behavior.
- Slow suites caused by unnecessary setup in each test (that's what fixtures are for).
- Unit tests for one-line job classes or trivial delegations.
- Hand-rolled HTML strings where production renderers/helpers would stay in sync automatically.
- Time-dependent assertions without `travel_to`.

## Related skills

- [dhh-style.md](dhh-style.md) — the school doctrine this testing practice belongs to.
- [rails-testing.md](rails-testing.md) — the *factories* school (RSpec/FactoryBot, TestProf speed/flakiness method). Different schools — route by the project's existing choice, don't blend.
- [rails-security-multitenancy.md](rails-security-multitenancy.md) — the tenancy architecture these test-wiring patterns exercise.
