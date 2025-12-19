---
name: dhh-style
description: Write Ruby and Rails code following DHH's 37signals conventions. Use when writing Rails controllers, models, views, or any Ruby code. Triggers on Rails architecture, code review, refactoring, or mentions of DHH, 37signals, Basecamp, HEY, Campfire, or Fizzy. Covers REST-pure controllers, fat models, Current attributes, Hotwire, and the Solid suite.
---

Write Ruby and Rails code in DHH's distinctive 37signals style: **clarity over cleverness**, **convention over configuration**, **vanilla Rails is plenty**.

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

Details: [references/controllers.md](references/controllers.md)

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

Details: [references/models.md](references/models.md)

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

Details: [references/delegated-types.md](references/delegated-types.md)

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
| Controllers, REST mapping, Turbo responses, concerns | [references/controllers.md](references/controllers.md) |
| Models, concerns, state records, callbacks, scopes | [references/models.md](references/models.md) |
| Delegated types pattern (Basecamp/HEY architecture) | [references/delegated-types.md](references/delegated-types.md) |
| Turbo, Stimulus, CSS architecture, view patterns | [references/frontend.md](references/frontend.md) |
| Routing, auth, jobs, caching, multi-tenancy | [references/architecture.md](references/architecture.md) |
| Gem choices and what to avoid | [references/gems.md](references/gems.md) |
| Comprehensive code patterns and examples | [references/patterns.md](references/patterns.md) |
| Links to source material and further reading | [references/resources.md](references/resources.md) |

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
