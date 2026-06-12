# Rails Upgrades (the FastRuby method)

*Scope: Upgrades Rails apps safely with FastRuby.io's methodology — dual booting via next_rails, deprecations-first, strictly sequential versions, broken-build triage, gem vetting. Use when planning or executing a Rails/Ruby upgrade, estimating effort, fixing a suite red under the next version, or auditing gems for upgrade risk. Based on FastRuby.io posts. Triggers: Rails upgrade, dual boot, next_rails, Gemfile.next, deprecation warnings, load_defaults.*

**Sources:** [references/sources.md](rails-upgrades/sources.md) — 4 FastRuby.io posts + their open-sourced agent skills.

Distilled from "more than 60,000 developer-hours of hands-on upgrade work." The pipeline: **roadmap → dual boot → fix deprecations on current (deploy!) → fix the broken build under next → flip → cleanup.**

## The four non-negotiables

1. **Dual boot, never a long-lived branch.** `next_rails` creates `Gemfile.next` as a *symlink* to your Gemfile with its own lockfile; switch via `BUNDLE_GEMFILE`. Why not a branch: "you will have to constantly resolve conflicts between your long running upgrade branch and master." Note their explicitly anti-LLM-default warning: "Claude will say that it is unnecessary complexity. Our teams have learned from experience that dual booting is essential for debugging, testing, and even gradual deployments to production."
   ```ruby
   # Gemfile — the whole trick
   if next?  # File.basename(__FILE__) == "Gemfile.next" (next_rails provides NextRails.next?)
     gem "rails", "~> 7.1.0"
   else
     gem "rails", "~> 7.0.8"
   end
   ```
   CI runs a matrix over both Gemfiles. Workflow: `bundle install` → `next bundle update` → `next bundle exec rake` → iterate.
2. **Green suite before and throughout.** Tests must pass on the current version before any upgrade work; run against both versions continuously.
3. **Sequential versions, never skip.** 5.2 → 6.0 → 6.1 → 7.0 → … "Each Rails minor/major version introduces changes that build on previous versions."
4. **Align `config.load_defaults` before bumping** — adopt each new default incrementally (they tier defaults by risk), so the version bump itself changes as little behavior as possible.

**Deprecations-first ordering:** enable deprecation warnings on the *current* version → fix them all → **deploy those fixes to production** → only then bump. Backwards-compatible changes ship ahead of the flip, shrinking the risky diff to nearly nothing.

## Fixing the broken build (triage method)

"The next step in a Rails upgrade is often the most challenging" — the suite is red under the next version. Make it systematic:
1. **Errors before failures** — exceptions/missing methods/crashes block progress and mask the true picture.
2. **Model/unit tests first** — isolated layers first reduce cascading breakage up the stack.
3. **Batch by root cause, not test-by-test** — one cause often clears dozens of failures. "Commit often: fix a batch, commit, and move on. If a later fix breaks things, you'll have a clean rollback point."

Expect nonlinearity: "You might fix one issue, only to reveal three more. That's normal." And "don't estimate by number of failures" — the remainder skews complex. **Dual boot is a debugging instrument**, not just deploy safety: "we can easily switch back and forth between the versions to gather information" (diff behavior via logging under both boots). Tactics: read the full error (Rails often hints the fix); trace to *your* frames; check changed internals (callbacks, scoping, parameter filtering); check gem compatibility; question stale mocks; verify schema consistency. Document recurring failure patterns for the next upgrade.

## The flip and cleanup

Promote `Gemfile.next` to `Gemfile`, then clean in phases: (1) remove `NextRails.next?`/`current?` branches and dual-boot scaffolding; (2) retire old-version code — monkey-patches, stale gem pins, docker configs; (3) housekeeping — CI matrix, Dockerfile, version files; (4) final verification; (5) commit/PR. Don't let dual-boot conditionals outlive the upgrade.

## Gem vetting (upgrade risk starts at `bundle add`)

First gate: do you need a gem at all? Small utilities → write in-house; complex domains (PDF, OAuth) → well-maintained gem. "Sometimes the safest dependency is the one you never add." (Mike Perham: "Every dependency in your application has the potential to bloat your app, destabilize your app, inject odd behavior.") The seven checks: release within a year + steady commits · issues/PRs triaged · life beyond the original author · license compatibility · vulnerability scan clean, fast patches · semver + readable changelog · right-sized, not over-engineered.

## Checklist

- [ ] Roadmap built from a dual-boot trial (deprecation count + failing specs → estimate)?
- [ ] Dual boot via Gemfile.next symlink; CI matrix over both; no long-lived branch?
- [ ] All deprecations fixed AND deployed on the current version before the bump?
- [ ] Versions strictly sequential; load_defaults aligned before each bump?
- [ ] Broken build triaged errors → unit tests → root-cause batches, committed per batch?
- [ ] Post-flip: conditionals, pins, and patches removed; CI/docker updated?
- [ ] New dependencies pass the seven-point vet — or weren't added at all?

> **Staleness note:** version paths, next_rails API spellings, and tool names (bundler-audit, Libraries.io) date; the method — dual boot, deprecations-first-then-deploy, sequential bumps, triage order — is the durable layer. FastRuby ships the method as open-source agent skills; theirs are the upstream if you want the executable version.

## Relationship to other skills

- **`agentic-coding`** — the dual-boot quote is a textbook "encode hard-won constraints agents will argue against": put this methodology in project rules so the agent doesn't optimize it away. FastRuby pre-codified theirs as Claude Code skills.
- **[rails-testing.md](rails-testing.md)** — a fast, reliable suite is this method's precondition (green before starting) and its instrument (the triage works through the suite).
- **[dhh-style.md](dhh-style.md)** / **[layered-rails.md](layered-rails.md)** — "keep that Gemfile as close to the original one as possible" (37signals) and the trusted gem map (Evil Martians) are the two schools' answers to the same risk this skill's vetting checklist measures.
- **[optimizing-rails.md](optimizing-rails.md)** — GC/JIT tunings can become counterproductive across Ruby versions — re-run performance experiments after upgrading.
