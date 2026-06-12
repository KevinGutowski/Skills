# Flaky-Test Taxonomy — Full Remedies

*Source: "Flaky tests, be gone" (Petrov & Turner, 2025) + Whop chop part IV (2025). ClickFunnels case: ~80% CI success → ~100% across 9k unit + 1k feature tests.*

## 1. Global state

- **Globals / class vars / singletons:** reset in `around` hooks; for tests that define classes, use `class_double(...).as_stubbed_const` instead of defining real constants (collisions across files are an order-dependent bomb).
- **Gem-held state:** some stores need **double-clearing** — before *and* after each test (RequestStore case).
- **Caches:** `Rails.cache.clear` between tests; watch in-memory caches inside your own classes (memoized class-level state).
- **Config/ENV/locale/logger/routes leaks:** a `with_config` around-helper that snapshots and restores; a dedicated ENV-stubbing helper for ENV; reset `I18n.locale` if any test sets it.
- Verbatim: "Global variables are particularly insidious because they're invisible… yet they quietly accumulate state between test runs."

## 2. Time

- Freeze with `travel_to`/Timecop **in `around` blocks** so unfreezing is guaranteed; add a global failsafe (`after(:each) { Timecop.return }`).
- "If your test depends on the current time, date, or timezone, it will behave differently every time it runs." Whop's Doorkeeper-403 mystery — a leaked frozen time expiring tokens — was solved with `rspec --bisect --seed`.

## 3. Database state

- `use_transactional_tests = true`; remember **`before(:all)` writes escape the transaction** — use `let_it_be` (TestProf) which wraps in its own transaction.
- After rollback, in-memory objects are stale → `let_it_be` `refind: true` default modifier.
- **DDL auto-commits** (Postgres `CREATE TABLE` in a test) — needs manual cleanup.
- Seeds loaded into memory get mutated by tests → regenerate via AnyFixture instead of sharing live seed objects.
- **Implicit ordering:** unordered queries return rows in undefined order — assert with `contain_exactly` or add explicit `.order(...)`.
- **Never assert specific IDs:** sequences don't reset with transactions. For "missing record" use a sentinel that can't exist (GitLab uses `2147483647`; `-1` also works).

## 4. External systems

- **HTTP baseline:** `WebMock.disable_net_connect!(allow_localhost: true)` from day one.
- **VCR:** stricter matching `match_requests_on: %i[uri method body]`; a monthly scheduled CI job re-records cassettes and opens a PR (catches drifted APIs without surprise failures).
- **Redis / Elasticsearch / RabbitMQ:** not transactional — clear explicitly between tests.
- **Queues/mailers:** clear `Sidekiq::Queues`/`ActionMailer::Base.deliveries`.
- **Feature flags:** stub the client (a LaunchDarkly test client seeded from production flag dumps, wired via `Rails.configuration.x`).
- **Filesystem:** FakeFS or per-test tmp dirs.
- **DNS:** a real-DNS dependency "went unnoticed for a long time, as major outages of public DNS resolvers are rare" — mock resolution if anything resolves at test time.

## 5. Test design & system tests

- Over-random factory data (Faker uniqueness collisions), `wait: 0` selectors, timing assumptions. "Faster tests are less flaky tests."
- Browser tests: `run_with_retry(retry: 2)` on `type: :system` ONLY ("avoid retries in unit tests, as they can mask real issues"); register fixed viewport sizes and reset after each test; `disable_animation = true`; precompile assets on CI; clear localStorage/sessionStorage; screenshots to `tmp/screenshots`.
- **Selectors:** `data-testid`, "not implementation details that expire faster than people who Google their symptoms."
- **Waiting matchers:** the four Capybara pairs — the subtle one is `expect(page).not_to have_css(...)` (waits for *presence*, false-positives) vs `have_no_css` (waits for absence). "Never use `sleep`" (exception: smoke tests asserting eventual consistency); use capybara-lockstep to synchronize with JS/AJAX.

## Stuck runs & infrastructure

- **sigdump** with `SIGDUMP_SIGNAL=TERM`: when CI kills a frozen run, dump all thread backtraces first. Found: a Rails multi-DB query-cache deadlock; a custom Capybara matcher looping without timeout — "Always use timeouts for looped conditions."
- The Sidekiq Enterprise `unique!` sandbox: an `around` hook with `ensure` that removes the uniqueness middleware and resets `Sidekiq::Testing.fake!` — pattern for any middleware that persists state across tests.
- CI seed-database caching keyed on `hashFiles('db/**/*.rb')` checksums.
