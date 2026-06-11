---
name: layered-rails
description: "Architect Rails apps the Evil Martians way (Extended Rails Way) — stay vanilla as long as you can, then extract named layers; curated gem map included. Distinct school from dhh-style — route by project, don't blend. Use when structuring a growing Rails app, fighting god objects, choosing gems, or splitting authn from authz. Triggers: layered design, Extended Rails Way, service objects, god object, Action Policy, which gem."
---

# Layered Rails (the Extended Rails Way)

**Sources** — this skill aggregates the Evil Martians architecture lineage:
- *"Gemfile of dreams: the libraries we use to build Rails apps" (Dementyev, 2023, rev. 2026 — a living document, explicitly agent-readable at the URL + ".md"). https://evilmartians.com/chronicles/gemfile-of-dreams-libraries-we-use-to-build-rails-apps*
- *"Baking with Rails at scale: recipes in Ruby, cookware from Go, C, and Rust" (Nazarova & Kryukov, 2025). https://evilmartians.com/chronicles/baking-with-rails-at-scale-recipes-in-ruby-cookware-from-go-c-rust*
- *"It deserved its own tome" — layered-design interview (Dementyev, 2023; the book: "Layered Design for Ruby on Rails Applications"). https://evilmartians.com/chronicles/it-deserved-its-own-tome-vladimir-dementyev-on-his-rails-design-book*
- *Their open-sourced agent skills: https://github.com/palkan/skills/tree/master/layered-rails*

The stance: "not contradicting the Rails Way… we just need to *extend* the Rails Way to better match our use cases." Stick to framework defaults "for as long as you can" (onboarding, free upgrades) — and when you do extract a layer, "if you want to make something look like it was built by the Rails team — do that." Anti-patterns are "patterns that are helpful in the beginning, but may hurt in the long term."

## ⚠️ A school, not the truth — vs `dhh-style`

This and `dhh-style` **converge** on: stay vanilla as long as possible, Active Record models business logic ("we do not 'derail' from the Rails Way"), conventions over invention. They **diverge** on: layered-rails names and extracts abstraction layers (policies via Action Policy, form/query objects, collaborator objects, dry-monads Results) where 37signals says fat models + concerns + ceremony-free POROs suffice; Martians use RSpec + FactoryBot (37signals: Minitest + fixtures); Martians run Sidekiq/GoodJob and AnyCable (37signals: the Solid suite); ~half of Martian greenfields are Inertia + React (37signals: Hotwire only — see `inertia-rails`). **Pick one school per project and stay consistent** — same discipline as the design-themes rule. "Use other kits as a reference — not a source of truth."

## The layer moves

- **Collaborator objects over god objects/anemic jobs:** `has_object :deployer` → a `Cable::Deployer.new(self)` companion class; jobs declared *on* the behavior (`performs def provision` auto-generates `provision_later`). Kills the job-class boilerplate without a "service layer."
- **Authentication ≠ authorization:** "Authentication answers 'Who's there?', authorization answers 'Am I allowed to do that?'" Split authorization into the *model* (app-specific rules) and a generic *enforcement layer* (Action Policy — born as "imagine Rails had an authorization component").
- **Typed data without new tables:** `store_attribute`/`store_model` for typed JSONB; `discard` for soft deletes; pagination and grouping as extensions, not rewrites.
- **Result objects** (dry-monads) where operations have meaningful failure values — "work especially well with pattern matching." (Note: the 37signals school rejects this; route, don't mix.)

## Transactional integrity doctrine

"Database transactions aren't the same as logical transactions."
- Detect side effects inside transactions (HTTP calls, job enqueues) with an isolator-style check; move them to `after_commit` (helper gems make this uniform anywhere in the stack).
- Keep schema and validations consistent (database_consistency-style audits); guard migrations on live tables (strong_migrations).
- N+1: *detect* in dev (prosopite), *prevent* with regression tests (n_plus_one_control).

## Choosing gems

The selection framework: collective experience plus "static code properties (API, architecture) and less on popularity metrics." Throughput first — offload everything possible to background jobs (the GVL limits parallel request work): Sidekiq by default; SolidQueue for smaller/SQLite apps; GoodJob when already Postgres-bound or memory-constrained. The full category→gem map lives in the living post — give the `.md` URL to a coding agent as a trusted reference rather than letting it invent dependencies.

## Extraction without microservices ("baking at scale")

When Ruby itself is the bottleneck: "Keep your cake recipe (business logic) in Ruby, but upgrade the tools in your kitchen with Go, C, Rust." Three rules:
1. **Extend Rails natively** — performance tools plug into existing abstractions (Active Storage services/analyzers, cache stores, Action Cable servers, queue adapters, Rack handlers) "rather than fighting them."
2. **Tools don't know the recipes** — "Performance helpers should be pure execution engines, completely unaware of your business recipes. The moment they start making decisions about users, permissions, UX, or domain logic, you've crossed from performance helper into microservices territory."
3. **Plan maintenance** — battle-tested OSS over custom ("custom solutions should be your last resort"); foreign-language services need expertise you may not have.

"The best performance upgrades feel invisible to your team and native to Rails." Example: imgproxy swapped in via the Active Storage variant pipeline — production uses the proxy, dev keeps Rails defaults.

## Checklist

- [ ] Still vanilla where vanilla works; each extracted layer justified by a named pain (god object, callback soup, tangled authorization)?
- [ ] New abstractions framework-flavored — would this look at home in Rails core?
- [ ] No side effects inside DB transactions; schema and validations consistent; migrations guarded?
- [ ] Gems chosen from the trusted map by category, not by the agent's training-data instinct?
- [ ] Performance extractions hold all three rules — native plug-in, no business logic, maintained by someone?
- [ ] School consistency: not mixing 37signals and layered idioms in one codebase?

> **Staleness note:** specific gem picks rotate (the living post's changelog retires gems every edition — sorcery, Timecop, oj all left); the doctrine (layering moves, transactional integrity, the three extraction rules, the school boundaries) is the durable layer. Re-check the living posts before citing a gem.

## Relationship to other skills

- **`dhh-style`** — the competing school (see the divergence list above). Route by the project's existing idiom; never blend in one codebase.
- **`optimizing-rails`** — measurement-first runtime tuning lives there; when tuning isn't enough, this skill's extraction rules govern *what* to extract and what must stay in Ruby.
- **`inertia-rails`** — this school's frontend wing for JS-component-heavy apps.
- **`rails-realtime`** — AnyCable and real-time reliability, the same lineage's real-time layer.
- **`rails-testing`** — the test-suite discipline (TestProf lineage, same author).
- **`rails-event-sourcing`** — the next escalation: this school's service objects are its migration step 1; when the pain is processes and modules rather than layers, route there.
- **`ruby-refactoring`** — the nearest catalog: its form/query/value-object solutions are this school's layer moves; it supplies the smells and thresholds for *when*.
- **`rails-docker-dev`** — same school/author; the dev-environment layer of this stack.
- **`agentic-coding`** — this school ships its decisions as agent skills (palkan/skills `/layered-rails:analyze`); the Gemfile post is designed to be fed to agents as a trusted reference.
