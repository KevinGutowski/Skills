---
name: rails-hub
description: "Router for ALL Ruby on Rails and Ruby work — writing/reviewing code (four schools: vanilla 37signals default, Evil Martians layered, packwerk, Arkency event sourcing), webhooks, migrations, multitenancy/security, jobs, Hotwire/realtime, testing (fixtures AND factories schools), Docker dev, performance, upgrades, Inertia, Ruby refactoring, DHH review voice. Read this skill's body, then invoke the named member skill. Triggers: Rails, Ruby, Hotwire, Turbo, Sidekiq, Active Job, migration, backfill, multitenant, RSpec, Minitest, factory, fixture, Puma, N+1, webhook, Action Cable, event sourcing, refactoring, DHH, Basecamp."
---

# Rails (router)

Pick the school first — **vanilla 37signals (`dhh-style`) is the DEFAULT**; escalate only on named pains — then the topic skill. Invoke exactly one member skill via the Skill tool; its full body loads on demand.

**Schools:** `dhh-style` (vanilla default — fat models, concerns, Hotwire, Solid suite; owns database-per-tenant architecture) · `layered-rails` (Evil Martians extraction — named layers, Action Policy, gem map) · `rails-event-sourcing` (Arkency — DDD, events, aggregates; carries the full four-school router) · `ruby-refactoring` (thoughtbot smell→refactoring catalog). Route by project; never blend schools in one codebase.

**Topics:** `rails-webhooks` (outbox, signing, SSRF, circuit breakers) · `rails-migrations` (safe schema changes, locks, backfills) · `rails-security-multitenancy` (tenant boundaries, scoped lookups, auth chain) · `rails-jobs` (Active Job design, idempotency, Solid Queue) · `rails-fixtures-testing` (fixtures school) · `rails-testing` (factories school — TestProf, flaky taxonomy, CI) · `rails-hotwire-realtime` (app-level Turbo/Stimulus patterns) · `rails-realtime` (websocket SCALE — Action Cable, avalanches, LLM streaming) · `rails-docker-dev` (containerized dev, agent sandboxing) · `optimizing-rails` (production performance — profiling, N+1, Puma/GVL, Sidekiq throughput, queue-time autoscaling) · `rails-upgrades` (FastRuby dual-boot methodology) · `inertia-rails` (React-on-Rails without an API layer) · `dhh` (/dhh — review a diff in DHH's voice).

**Boundary splits to respect:** job *design* → `rails-jobs`, queue *throughput* → `optimizing-rails` · app-level Turbo → `rails-hotwire-realtime`, websocket scale → `rails-realtime` · fixtures vs factories: route by the project's existing choice.
