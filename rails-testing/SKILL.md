---
name: rails-testing
description: "Make Rails test suites fast and reliable — the TestProf diagnosis playbook (eye-profile → sampled StackProf → TagProf/EventProf/FactoryProf), the factory-cascade anti-pattern and its fix ladder (build_stubbed → let_it_be/before_all → FactoryDefault → AnyFixture), hidden-I/O killers (test logging, coverage overhead, production-strength encryption), the flaky-test taxonomy (global state, time, database, external systems, test design) with quarantine governance, and CI parallelization (queue-based runners as a flakiness microscope). Use when a test suite or CI is slow, profiling specs, fixing flaky tests, untangling factory bloat, choosing let_it_be/before_all, stabilizing Capybara/system tests, or parallelizing CI. Based on six Evil Martians Chronicles posts. Triggers: slow tests, slow specs, CI time, TestProf, FactoryProf, factory cascade, let_it_be, before_all, flaky tests, state leak, rspec --bisect, parallel CI, Capybara waiting, VCR, factories vs fixtures."
---

# Rails Testing — Speed & Reliability

**Sources** — this skill aggregates six Evil Martians Chronicles posts (largely Vladimir Dementyev's TestProf lineage; canonical playbook: https://test-prof.evilmartians.io/playbook):
- *"TestProf: a good doctor for slow Ruby tests" (Dementyev, 2017, rev. 2024). https://evilmartians.com/chronicles/testprof-a-good-doctor-for-slow-ruby-tests*
- *"TestProf II: Factory therapy" (Dementyev, 2018, rev. 2024). https://evilmartians.com/chronicles/testprof-2-factory-therapy-for-your-ruby-tests-rspec-minitest*
- *"TestProf III: guided and automated Ruby test profiling" (Dementyev & Turner, 2024). https://evilmartians.com/chronicles/test-prof-3-guided-and-automated-ruby-test-profiling*
- *"The Whop chop: how we cut a Rails test suite and CI time in half" (Platonov & Turner, 2025). https://evilmartians.com/chronicles/the-whop-chop-how-we-cut-a-rails-test-suite-and-ci-time-in-half*
- *"Flaky tests, be gone" (Petrov & Turner, 2025). https://evilmartians.com/chronicles/flaky-tests-be-gone-long-lasting-relief-chronic-ci-retry-irritation*
- *"TestProf Digest 2026.4: surprising finds from 30k specs" (Dementyev & Turner, 2026). https://evilmartians.com/chronicles/test-prof-digest-2026-surprising-finds-from-30k-specs*

"Your biggest performance bottleneck is rarely where you think it is" — profile before touching anything; "guessing is a waste of time." And: "All fast tests are alike; each slow test is slow in its own way."

## The diagnosis playbook (in order)

1. **Eye-profiling:** before running anything, scan config and Gemfile for known perpetrators — verbose logging, production-strength encryption (bcrypt/Argon2 in tests; "the fix was just a single line of code, but gave us ~20% performance boost"), coverage tracking ("well-known for slowing down Ruby tests by 15–20%" — disable it or use one-shot mode), event-bus gems.
2. **Sampled stack profiling:** `TEST_STACK_PROF=1 SAMPLE=200 rspec` → Speedscope's Sandwich view. Sampling is essential — profiling a full suite "would produce a mountain of data so large it would be meaningless."
3. **Aggregate profilers:** **TagProf** (time by test type — don't optimize types that barely contribute); **EventProf** on `sql.active_record` (calibration: "usually around 10–15%, so 20% looks suspicious") and `factory.create` ("85% of the total time was occupied by factories… we see this kind of high percentage all the time"); GC time ~5% is normal — much more means a leak (the 2026 case: one `require` registering a global `before(:all)` hook for every group).
4. **Per-file targeting:** `rspec --profile` or TPS ranking (tests-per-second weighted by potential savings) — at Whop, ~5% of files caused 50% of run time.

**Hidden I/O is the classic first win** (Whop: 25min → 12min): kill test-env logging (`verbose_query_logs = false`, `query_log_tags_enabled = false`, `log_level = :fatal`) and stub observability SDKs. "Logging in a test environment is almost always pure overhead."

## Factory therapy

**The factory cascade** — "an uncontrollable process where excess data is generated through nested factory invocations": `create(:comment)` silently creating 10 records through association chains. ("Think associated models generated through Active Record callbacks (never do that).") Diagnose with **FactoryProf**: a big gap between *total* and *top-level* counts = cascade; the flamegraph heuristic — a "New York City skyline" is cascades, aim for "the Dutch countryside."

The fix ladder, cheapest first:
1. `build_stubbed` where persistence isn't needed (find offenders with FactoryDoctor).
2. **`let_it_be` / `before_all`** — "the best way to keep your tests fast is still by using `let_it_be` instead of `let`/`let!`, and `before_all` instead of `before(:each)`." Caveat: mutated shared state can leak → flakiness (use `refind: true` style modifiers).
3. **FactoryDefault** (`create_default(:account)`) — implicit reuse of top-level entities (tenants); keep defaults at the top of the file.
4. **AnyFixture** — a factory used once-per-test across the suite gets generated once. "There's no need to choose between factories and fixtures — use both!"
5. Stop inlining background jobs globally (`fake!` default; opt in per-test with a tag; bulk-retag mechanically).

## Flaky tests

Governance first: **quarantine with zero tolerance** — tag `:flaky`, exclude on CI, weekly review with owners, fixed timeframes ("tests can't stay quarantined indefinitely"). "A quarantine forces teams to acknowledge flaky tests exist." Surface hidden flakiness proactively: random order with logged seed; rerun suspects 3–10×.

The taxonomy (full remedies in `references/flaky-taxonomy.md`):
1. **Global state** — globals, class vars, gem-held state, `Rails.cache`, ENV/config/locale leaks. "Global variables are particularly insidious because they're invisible… yet quietly accumulate state between runs."
2. **Time** — freeze time in `around` blocks; a global failsafe unfreeze after each test.
3. **Database** — `before(:all)` writes escape transactions; stale in-memory objects after rollback; implicit ordering (use `contain_exactly` or explicit `.order`); never assert specific IDs (sequences don't reset).
4. **External systems** — `WebMock.disable_net_connect!(allow_localhost: true)` as the baseline; VCR matching on uri+method+body with scheduled cassette re-records; Redis/search/queues don't roll back — clear them; stub feature flags.
5. **Test design** — over-random data, timing assumptions; "faster tests are less flaky tests."

System tests: retries **only** for browser tests (low count — "retries in unit tests can mask real issues"); fixed viewport; animations disabled; `data-testid` selectors; **always waiting matchers** (`not_to have_css` vs `have_no_css` is the subtle one); "never use `sleep`"; lockstep JS synchronization. Debug order-dependent failures with `rspec --bisect --seed`; for stuck CI runs, dump thread backtraces on the kill signal — and "always use timeouts for looped conditions."

## CI parallelization

File-level static splitting means "the total build time is always dictated by the slowest worker" — prefer a **queue-based runner** (workers pull individual examples). Expect it to expose every hidden dependency: switching runners is "the ultimate stress test for your suite… a microscope that mercilessly exposed every bit of 'leaky' state." The citizenship rule: "Every test must clean up after itself completely." Cache CI seed databases keyed on schema/seed checksums.

## Checklist

- [ ] Profiled (sampled) before changing anything; calibration numbers checked (sql 10–15%, GC ~5%, coverage off)?
- [ ] Test-env logging and observability SDKs silenced; encryption dialed down to test strength?
- [ ] Factory cascades found via total-vs-top-level gap; fix ladder applied in order; jobs not inlined globally?
- [ ] Flaky tests quarantined with review cadence; random order + seed logged; taxonomy walked for the class of leak?
- [ ] System tests on waiting matchers, testids, no sleeps; retries confined to browser tests?
- [ ] CI queue-based, seeds cached; every test cleans up after itself?

> **Staleness note:** TestProf env-var spellings, gem names (test-queue, capybara-lockstep, sigdump), and tool integrations will date; the playbook order, calibration numbers, cascade concept, fix ladder, and flaky taxonomy are the durable layer. The Digest posts are explicitly agent-readable (share the `.md` URL with a coding agent to audit a suite).

## Relationship to other skills

- **`optimizing-rails`** — runtime/production performance (N+1, caching, Puma); this skill owns the *test suite* as the artifact. Shared vocabulary (StackProf, Speedscope) but different entry points and fixes.
- **`dhh-style`** — 37signals tests with fixtures and Minitest; this corpus is factory_bot/RSpec-centric and argues "use both." Different schools — route by the project's existing choice, don't blend.
- **`agentic-coding`** — encode this skill's nudges ("replace `let` with `let_it_be`", "don't create 50 records to test pagination") as project rules; fast reliable tests are its feedback-loop layer.
