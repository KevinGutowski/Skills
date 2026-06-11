---
name: rails-docker-dev
description: "Set up containerized Rails dev the Ruby on Whales way — three layers (Dockerfile, compose.yml as services registry, dip.yml as command layer) plus rules that keep it fast. Use when dockerizing Rails dev, debugging a Compose env, choosing Dip vs DevContainers, or sandboxing coding agents. Based on Evil Martians' Ruby on Whales. Triggers: dockerize Rails, dip.yml, compose.yml, docker compose Rails, DevContainers, sandbox agent."
---

# Rails Docker Dev (Ruby on Whales)

*Source: "Ruby on Whales: Dockerizing Ruby and Rails development" (Vladimir Dementyev with Travis Turner; living document, 2019 → v3.0 2026 — its changelog is itself a lesson in which parts rot). https://evilmartians.com/chronicles/ruby-on-whales-docker-for-ruby-rails-development*

"A reproducible development environment is the key to efficient teamwork." The architecture is three files with distinct jobs:
1. **`Dockerfile`** — the runtime. Parameterized (`ARG RUBY_VERSION`, `PG_MAJOR`, `NODE_MAJOR` fed from compose args; ARGs reset after `FROM`) with system packages in an external **Aptfile** bind-mounted at build time, so the Dockerfile stays universal across projects. Use BuildKit cache mounts for apt instead of cleanup incantations.
2. **`compose.yml`** — the services registry. Use extension fields (`x-app`, `x-backend`) to deduplicate; health checks + `depends_on: condition: service_healthy` so Rails never races Postgres.
3. **`dip.yml`** — the developer-facing layer: `dip provision`, `dip rails s`, `dip rspec`, `dip psql`. Dip is "a thin wrapper over docker compose that provides a switch from an infrastructure-oriented flow to a development-oriented one."

**Dip vs DevContainers:** "The Dip approach separates the tools for running code (within containers) from those for writing code (editors and terminals)" — your editor stays native. DevContainers put the IDE inside. They can coexist on the same Docker/Compose files.

## The rules that keep it fast

- **Version your image tags** — "using `example-dev:latest` is like shooting yourself in the foot." Rule of thumb: bump the tag every time the Dockerfile or its arguments change; versioned tags also make branch-switching across Ruby versions rebuild-free.
- **Volumes for generated content** — bundle, node_modules, assets — "to keep Docker fast." Put `BOOTSNAP_CACHE_DIR` inside the bundle volume so it resets with Ruby upgrades.
- **`tmpfs` for `/tmp` and `tmp/pids`** — kills "A server is already running" permanently.
- **`docker compose run` (not `up`) for the server** — interactive terminal, so the debugger works.
- **Idempotent provisioning:** `bundle check || bundle install`; `db:prepare` over reset scripts; an explicit full-reset escape hatch.
- Quality-of-life: persist shell/psql/irb history in a `history` volume; `MALLOC_ARENA_MAX: 2`, `WEB_CONCURRENCY: 1` for dev memory; multi-app local dev via Compose external networks with per-app aliases.

## Sandboxing AI agents (2026 addition)

"Reproducibility implies isolation… these days, we more often consider isolation from the opposite perspective: a way to prevent unrestricted access to the host system by development software. Yes, I'm talking about AI tools." The pattern: run the agent *inside* the container (`dip claude`) with permissive flags safely contained — project-only volume mounts, per-project credentials stored in Docker volumes, sandbox env flag set. The container boundary, not the agent's own permission prompts, is the guarantee.

## Checklist

- [ ] Three layers present; Dockerfile parameterized + Aptfile external; compose deduplicated with extension fields?
- [ ] Image tags versioned and bumped on every Dockerfile change?
- [ ] Generated content on volumes; tmp on tmpfs; healthcheck-gated dependencies?
- [ ] Server started via `run` (debugger works); provisioning idempotent with a reset escape hatch?
- [ ] Agents containerized with project-only access rather than host-wide permissions?

> **Staleness note:** pinned versions (Ruby/PG/Node), editor-LSP tricks, and macOS filesystem-performance notes date quickly — the post is a living document; check the current revision. The three-layer architecture and the speed rules are the durable core.

## Relationship to other skills

- **`agentic-coding`** — the container sandbox here is the infrastructure for its guardrails: isolation makes "dangerously skip permissions" workflows safe.
- **`layered-rails`** — same school/author; this is the dev-environment layer of the stack it describes.
- **`rails-testing`** — a reproducible env is what makes "runs on a plane" test suites portable across machines and CI.
