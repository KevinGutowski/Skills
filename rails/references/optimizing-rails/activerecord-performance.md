# ActiveRecord Performance

## Contents
- N+1 queries
- Batch loading
- Select only what you need
- Counter caches
- Database indexing
- Large pagination queries
- Bulk operations
- Query method placement
- Using production-like data

## N+1 Queries

The most common ActiveRecord performance problem. Loading a collection and then querying each item's association individually.

```ruby
# Bad: N+1 — 1 query for posts + N queries for authors
@posts = Post.all
@posts.each { |post| post.author.name }

# Good: Eager load with includes — 2 queries total
@posts = Post.includes(:author).all
@posts.each { |post| post.author.name }
```

### Detection

**In development:**
```ruby
# config/environments/development.rb
config.active_record.strict_loading_by_default = true
# Raises ActiveRecord::StrictLoadingViolationError on lazy loads
```

**With rack-mini-profiler:** Look for pages generating dozens of queries to the same table.

**With Bullet gem:**
```ruby
# Gemfile (development only)
gem 'bullet', group: :development

# config/environments/development.rb
config.after_initialize do
  Bullet.enable = true
  Bullet.alert = true
  Bullet.rails_logger = true
end
```

### Includes vs Preload vs Eager_load

| Method | Strategy | Use When |
|--------|----------|----------|
| `includes` | Rails picks (preload or eager_load) | Default choice |
| `preload` | Separate queries | No WHERE conditions on association |
| `eager_load` | LEFT OUTER JOIN | Need to filter/sort by association columns |

**Rule:** Don't eager load more than a few associations at once. Each eager-loaded model increases object instantiation.

## Batch Loading

Never load all records into memory at once.

```ruby
# Bad: loads ALL users into an array, then iterates
User.all.each { |user| process(user) }

# Good: loads in batches of 1000
User.find_each(batch_size: 1000) { |user| process(user) }

# Good: for operations on batches (not individual records)
User.in_batches(of: 1000) do |batch|
  batch.update_all(processed: true)
end
```

`find_each` and `in_batches` use `LIMIT` and `OFFSET` internally, keeping memory constant regardless of table size.

## Select Only What You Need

`SELECT *` loads every column into Ruby objects. If you only need 2 columns, you're wasting memory and time.

```ruby
# Bad: loads all columns
User.where(active: true).map(&:email)

# Good: loads only email column into AR objects
User.where(active: true).select(:email).map(&:email)

# Best: returns plain values, no AR object overhead
User.where(active: true).pluck(:email)
```

| Method | Returns | Memory |
|--------|---------|--------|
| `.select(:col)` | AR objects with only specified columns | Medium |
| `.pluck(:col)` | Array of raw values | Low |
| Full query | AR objects with all columns | High |

Use `pluck` when you don't need AR model methods. Use `select` when you need some model behavior but want to reduce memory.

## Counter Caches

Avoid `COUNT(*)` queries for association sizes.

```ruby
# Bad: executes COUNT query every time
@project.tasks.count  # SELECT COUNT(*) FROM tasks WHERE project_id = 1

# Good: reads cached integer column
@project.tasks_count  # No query — reads the column directly
```

Setup:
```ruby
# Migration
add_column :projects, :tasks_count, :integer, default: 0, null: false

# Model
class Task < ApplicationRecord
  belongs_to :project, counter_cache: true
end

# Reset existing counts
Project.find_each { |p| Project.reset_counters(p.id, :tasks) }
```

## Database Indexing

Indexes are the key to fast queries. Always index:

| Column Type | Why |
|-------------|-----|
| Foreign keys (`*_id`) | JOINs and WHERE clauses |
| Polymorphic associations (`*_type` + `*_id`) | Composite index needed |
| `updated_at` / `created_at` | If used in caching or ordering |
| Columns in frequent WHERE clauses | Obvious |
| Columns in ORDER BY | Prevents full table scan + sort |

```ruby
# Migration examples
add_index :tasks, :project_id
add_index :comments, [:commentable_type, :commentable_id]  # polymorphic
add_index :articles, :published_at
```

### Debugging slow queries

```sql
-- Use EXPLAIN ANALYZE on your worst queries
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'foo@bar.com';
-- Look for "Seq Scan" — means no index is being used
```

Take your top 5 worst queries from your performance monitor and run `EXPLAIN ANALYZE` on them.

## Large Pagination Queries

For multi-tenant tables, the slowest pagination queries often come from loading
too many scattered index or table pages before sorting down to one screen of
records. When a page joins and filters across tables, inspect whether the
database can read the target rows in sort order from a compact index.

37signals' HEY pagination fix used this shape:

1. Add a covering index prefixed by the tenant key, such as `account_id`.
2. Include the tenant key in the query or join condition so the optimizer can
   use that prefix.
3. Select only the columns contained in the covering index for the first query.
4. Load the full rows in a second query by the small set of returned IDs.

Use index hints only after the plan proves the optimizer is choosing poorly, and
keep the optimization wrapped in a named scope or object so the controller still
speaks domain language.

Source: https://dev.37signals.com/faster-paging-in-hey/

## Bulk Operations

Don't run 10,000 queries to update 10,000 records.

```ruby
# Bad: N individual UPDATE queries
users.each { |u| u.update(synced: true) }

# Good: single UPDATE query
User.where(id: user_ids).update_all(synced: true)

# For complex inserts: activerecord-import gem
User.import(new_users, on_duplicate_key_update: [:name, :email])
```

Do mathematical calculations in the database:
```ruby
# Bad: loads all records, calculates in Ruby
Order.all.map(&:total).sum

# Good: single SQL query
Order.sum(:total)
Order.average(:total)
Order.maximum(:total)
```

## Query Method Placement

**ActiveRecord instance methods should not use query methods** (`where`, `find`, etc). This inevitably causes N+1 problems when used in views.

```ruby
# Bad: instance method with query — N+1 when called in a loop
class User < ApplicationRecord
  def recent_orders
    Order.where(user_id: id).where('created_at > ?', 30.days.ago)
  end
end

# Good: use scopes (class methods) and eager loading
class User < ApplicationRecord
  has_many :orders
  has_many :recent_orders, -> { where('created_at > ?', 30.days.ago) },
           class_name: 'Order'
end

# Controller
@users = User.includes(:recent_orders)
```

## How It Feels

**Discovering an N+1 in production** is a sinking feeling. You open rack-mini-profiler and see 200 queries to the same table on one page. The page works fine in development with 5 records — but production has 200. Every user has been waiting 3 seconds for something that should take 300ms. Adding one `includes` call and watching the query count drop from 201 to 2 is one of the most satisfying fixes in Rails.

**The strict_loading revelation:** Enabling `strict_loading_by_default` in development for the first time is overwhelming — your app throws errors everywhere. But each error is a real N+1 you never noticed. After a day of fixing them, your production response times visibly improve.

**The pluck moment:** You refactor a report from `User.all.map(&:email)` to `User.pluck(:email)` and memory usage drops from 500MB to 2MB. The difference between instantiating 100,000 ActiveRecord objects and getting 100,000 strings is dramatic.

## Using Production-Like Data

N+1 queries and memory bloat are invisible with 10 rows. They become obvious with 10,000.

Options:
1. **Sanitized production dump** — best for realistic data
2. **Large seed script** — `seeds.rb` that creates production-scale quantities
3. **Single-tenant export** — export one large customer's data for dev use
