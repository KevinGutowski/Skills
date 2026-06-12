# DHH Style (vanilla 37signals Rails)

*Scope: Write Ruby and Rails code following DHH's 37signals conventions — REST-pure controllers, fat models with concerns, Hotwire, the Solid suite. The DEFAULT Rails school: start here; escalate only on named pains (see rails-event-sourcing's router; ruby-refactoring is a competing extraction school). Owns database-per-tenant architecture (tenant *security/scoping* → rails-security-multitenancy). Use when writing or reviewing vanilla Rails code, or on mentions of DHH, Basecamp, HEY. Triggers: Rails Way, vanilla Rails, Hotwire, 37signals.*

Write Ruby and Rails code in DHH's distinctive 37signals style: **clarity over cleverness**, **convention over configuration**, **vanilla Rails is plenty**.

## Contents

- Core Philosophy
- Quick Reference
- Reference Files
- Naming Conventions
- Architecture Preferences
- Code Review Workflow
- Refactoring to DHH Style
- Code Quality Checklist
- Patterns from dev.37signals.com (primary-source extensions)
- Related skills

## Core Philosophy

> "The best code is the code you don't write. The second best is the code that's obviously correct."

**What they embrace:**
- Rich domain models over service objects
- CRUD controllers over custom actions
- Concerns for horizontal code sharing
- State as records, not boolean columns
- Database-backed everything (Solid Queue, Solid Cache, Solid Cable)
- Build solutions before reaching for gems

**What they deliberately avoid:**
- devise → custom ~150-line passwordless auth
- pundit/cancancan → simple `can_do_x?` methods on User model
- sidekiq/redis → Solid Queue (database-backed)
- view_component → standard partials
- GraphQL → REST with Turbo
- factory_bot → fixtures

## Quick Reference

### Controllers: Only 7 REST Actions

```ruby
# ❌ Custom actions
def archive; end
def search; end

# ✅ New controllers for new behavior
class Messages::ArchivesController < ApplicationController
  def create   # archives
  def destroy  # unarchives
end
```

Details: [references/controllers.md](dhh-style/controllers.md)

### Models: State as Records

```ruby
# ❌ Boolean columns
closed: boolean

# ✅ State records (tracks who/when automatically)
class Card::Closure < ApplicationRecord
  belongs_to :card
  belongs_to :creator, class_name: "User"
end

# Query: Card.joins(:closure) or Card.where.missing(:closure)
```

Details: [references/models.md](dhh-style/models.md)

### Delegated Types (Advanced Pattern)

```ruby
# Powers Basecamp/HEY - uniform interface for mixed content types
class Recording < ApplicationRecord
  delegated_type :recordable, types: %w[ Message Document Comment Upload ]
  belongs_to :bucket
  belongs_to :parent, optional: true
  has_many :children, foreign_key: :parent_id
end

# Query: Recording.messages, Recording.documents
# Access: recording.recordable or recording.message
# Benefit: One controller for all types, efficient copying, mixed pagination
```

Details: [references/delegated-types.md](dhh-style/delegated-types.md)

### Current Attributes

```ruby
class Current < ActiveSupport::CurrentAttributes
  attribute :user, :session, :account
end

# Use anywhere: Current.user.can_administer?(@message)
```

### Ruby Syntax Preferences

```ruby
# Symbol arrays with spaces
before_action :set_message, only: %i[ show edit update destroy ]

# Private method indentation
private
  def set_message
    @message = Message.find(params[:id])
  end

# Expression-less case
case
when params[:before].present? then messages.page_before(cursor)
when params[:after].present? then messages.page_after(cursor)
else messages.last_page
end

# Bang methods for fail-fast
@message = Message.create!(params)
```

## Reference Files

| Topic | File |
|-------|------|
| Controllers, REST mapping, Turbo responses, concerns | [references/controllers.md](dhh-style/controllers.md) |
| Models, concerns, state records, callbacks, scopes | [references/models.md](dhh-style/models.md) |
| Delegated types pattern (Basecamp/HEY architecture) | [references/delegated-types.md](dhh-style/delegated-types.md) |
| Turbo, Stimulus, CSS architecture, view patterns | [references/frontend.md](dhh-style/frontend.md) |
| Routing, auth, jobs, caching, multi-tenancy | [references/architecture.md](dhh-style/architecture.md) |
| Gem choices and what to avoid | [references/gems.md](dhh-style/gems.md) |
| Comprehensive code patterns and examples | [references/patterns.md](dhh-style/patterns.md) |
| Links to source material and further reading | [references/resources.md](dhh-style/resources.md) |
| Maintenance source map and confidence rubric | [references/sources.md](dhh-style/sources.md) |

## Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Concerns | Adjectives | `Closeable`, `Publishable`, `Watchable` |
| Controllers | Nouns matching resources | `Cards::ClosuresController` |
| Scopes | Adverbs/descriptive | `chronologically`, `preloaded`, `with_creator` |
| Predicates | End with `?` | `closed?`, `can_administer?` |
| Setters | `set_` prefix (private) | `set_message`, `set_room` |
| Async methods | `_later` suffix | `notify_watchers_later` |

## Architecture Preferences

| Traditional | DHH Way |
|-------------|---------|
| PostgreSQL | SQLite (for single-tenant) |
| Redis + Sidekiq | Solid Queue |
| Redis cache | Solid Cache |
| Kubernetes | Single Docker container |
| Service objects | Fat models |
| Policy objects | Authorization on User model |
| FactoryBot | Fixtures |
| RSpec | Minitest |

## Code Review Workflow

When reviewing code against DHH style:

1. **Controllers** — Only 7 REST actions? Custom actions should become new controllers
2. **Models** — Business logic here, not in services? State tracked via records?
3. **Concerns** — Horizontal behavior extracted? Named as adjectives (`Closeable`)?
4. **Authorization** — `can_x?` methods on User model, not policy objects?
5. **Tests** — Minitest + fixtures, not RSpec + factories?
6. **Infrastructure** — Database-backed (Solid suite) over Redis?

## Refactoring to DHH Style

Converting existing code:

1. **Custom controller actions** → Extract to new resource controllers
   - `POST /cards/:id/archive` → `POST /cards/:id/archival` (new controller)
2. **Boolean state columns** → Convert to state record models
   - `closed: boolean` → `Card::Closure` model with `creator` and timestamps
3. **Service objects** → Move logic into models
   - `CardClosingService.call(card)` → `card.close`
4. **Policy objects** → Move authorization to User model
   - `CardPolicy#update?` → `user.can_administer?(card)`
5. **External dependencies** → Replace with database-backed alternatives
   - Sidekiq → Solid Queue, Redis cache → Solid Cache

## Code Quality Checklist

Code follows DHH style when:
- [ ] Controllers map to CRUD verbs on resources
- [ ] Models use concerns for horizontal behavior
- [ ] State is tracked via records, not booleans
- [ ] No unnecessary service objects or abstractions
- [ ] Database-backed solutions over external services
- [ ] Tests use Minitest with fixtures
- [ ] Turbo/Stimulus for interactivity (no heavy JS frameworks)
- [ ] Private methods indented under `private` keyword

---

Based on analysis of 37signals production codebases (Campfire/Fizzy) and [The Unofficial DHH Rails Style Guide](https://gist.github.com/marckohlbrugge/d363fb90c89f71bd0c816d24d7642aca).

## Patterns from dev.37signals.com (primary-source extensions)

- **"A vanilla Rails stack is plenty" (Manrubia, 2024):** the dependency discipline behind everything above — "Fight hard before adding Ruby dependencies. Keep that Gemfile that Rails generates as close to the original one as possible"; Hotwire over JSON APIs, import maps over bundling, the Solid suite over Redis, Minitest, Kamal. "Vanilla means your app stays nimble. Fewer dependencies mean fewer future headaches."
- **Delegated types (Hardy, 2025)** *(primary-source detail for the pattern in Quick Reference above)*: the Basecamp Recording/Recordable architecture, "running this architecture for 10 years" — a lean `recordings` table (identity, tree via parent_id, creator, timestamps) delegating to dumb per-type recordable tables ("literally just a title and content… no connection to the outside world"). Recordables are *immutable* — edits create a new recordable and repoint (versioning + cheap copying for free); capabilities are boolean methods subtypes override (`commentable?`). Beats STI (no ever-growing table) and polymorphism (associations point the right way — one query paginates all types). "You can build entirely new features that should take months in a week."
- **Multi-tenancy (Dalessio, 2026):** database-per-tenant via Active Record Tenanted — tenant resolved at the network layer (subdomain → connection), runtime cross-tenant write guards ("you can't cross the streams anymore"), tenant identity threaded through cache keys, Active Storage, Action Cable, Solid Queue; supports multi-dimensional tenanting (customer × region). Honest caveat from Fizzy: SQLite-per-tenant replication wasn't production-ready in time — they launched on MySQL with manual scoping, the exact risk the gem exists to remove.

## Related skills

- **Vanilla-school satellites (vendored from [marckohlbrugge/37signals-skills](https://github.com/marckohlbrugge/37signals-skills), mined from 265 Fizzy PRs):** [rails-webhooks.md](rails-webhooks.md), [rails-migrations.md](rails-migrations.md), [rails-security-multitenancy.md](rails-security-multitenancy.md), [rails-jobs.md](rails-jobs.md), [rails-hotwire-realtime.md](rails-hotwire-realtime.md), [rails-fixtures-testing.md](rails-fixtures-testing.md) for domain depth, and `dhh` for reviewing a diff in DHH's literal review voice (`/dhh`). This skill stays the doctrine layer; route domain work there. Also [rails-upgrades.md](rails-upgrades.md) (FastRuby upgrade methodology) for Rails/Ruby version upgrades.
- **Competing school — [layered-rails.md](layered-rails.md) (Evil Martians / Dementyev):** converges with this skill on staying vanilla as long as possible and modeling business logic in Active Record, but diverges where 37signals stays plain: it extracts named layers (Action Policy, form/query/collaborator objects, dry-monads Results), tests with RSpec + FactoryBot (not Minitest + fixtures), runs Sidekiq/AnyCable (not the Solid suite), and often ships Inertia + React (see [inertia-rails.md](inertia-rails.md)) instead of Hotwire. **Pick one school per project and stay consistent — route, don't blend.**
- **[rails-testing.md](rails-testing.md)** — test-suite speed/reliability method (TestProf lineage; factory-centric — note the fixtures-first tension with this skill). This school's own testing practice lives in [rails-fixtures-testing.md](rails-fixtures-testing.md).
- **`working-with-ai` (agentic-coding)** — when coding agents generate Rails code, encode these conventions as project rules so they're applied consistently.
- **[rails-event-sourcing.md](rails-event-sourcing.md)** — the escalation school when *processes* become the pain (workflow enums, `*_sent_at` columns); its router names this skill the default starting point.
- **[ruby-refactoring.md](ruby-refactoring.md)** — competing extraction doctrine (it lists callbacks as a smell; this school treats them as idiomatic). Its smell *diagnosis* transfers; temper its extraction prescriptions here.
