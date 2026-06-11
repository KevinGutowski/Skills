---
name: rails-testing
description: "Makes Rails test suites fast and reliable — TestProf diagnosis, the factory-cascade fix ladder, hidden-I/O killers, the flaky-test taxonomy, CI parallelization. Use when a suite or CI is slow, fixing flaky tests, untangling factory bloat, or structuring readable tests. Based on Evil Martians and thoughtbot posts. For Minitest+fixtures suites (37signals school) use rails-fixtures-testing. Triggers: slow tests, TestProf, factory cascade, let_it_be, flaky tests, rspec --bisect, parallel CI."
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

## The thoughtbot canon (the factories school's own discipline)

*Sources: thoughtbot's Mystery Guest (Croak, 2009/2022), Four-Phase Test (Croak, 2012/2022), Factories Should Be the Bare Minimum (Sumner, 2016/2022), build_stubbed (Clayton, 2012/2022) — they created factory_bot; this is its intended usage.*

- **Four-phase structure:** setup / exercise / verify / teardown, separated by newlines — the test reads as a story.
- **No mystery guests:** "the test reader is not able to see the cause and effect between fixture and verification logic because part of it is done outside the Test Method" — shared fixture files, far-away instance variables, and prebuilt response files all break tests-as-documentation. Inline what matters; name what you assert.
- **Bare-minimum factories:** "only add the bare minimum required to create this model and then add the other attributes in the test or as traits"; required associations earn a validation before they earn a factory default. Fat factories are cascades waiting to happen — the two schools agree on the disease (this skill's FactoryProf diagnoses it) even where they differ on fixtures-vs-factories.
- **`build_stubbed` as the go-to** over build/create — looks persisted, builds associations stubbed, raises on DB access. Exception: uniqueness constraints, scopes — anything needing real DB state. "Code should typically depend less on the state of the data in relation to the database and more on its state in relation to other objects."

**Skips are signals (Rails at Scale, 2026):** reserve `skip` for *actionable* states — temporarily-disabled tests during upgrades, missing local services. Never conditionally skip on permanent runtime factors ("it completely ruins the value of the skip signal") — instead organize shared tests by capability, conditionally *define* tests, or exclude at configuration time.

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
- **`dhh-style`** — 37signals tests with fixtures and Minitest; this corpus is factory_bot/RSpec-centric and argues "use both." Different schools — route by the project's existing choice, don't blend. The fixtures school's own playbook is `rails-fixtures-testing`.
- **`agentic-coding`** — encode this skill's nudges ("replace `let` with `let_it_be`", "don't create 50 records to test pagination") as project rules; fast reliable tests are its feedback-loop layer.
