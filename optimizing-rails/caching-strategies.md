# Caching Strategies

## Contents
- Key-based cache expiration
- Russian Doll caching
- Using `touch` for cache propagation
- Cache backends comparison
- When to cache (and when not to)
- Low-level caching

## Why This Matters

Caching is the most powerful tool for making Rails apps fast — but traditional cache invalidation ("expire this cache when X changes") is fragile and error-prone. The modern Rails approach eliminates manual invalidation entirely. Instead of asking "when should this cache expire?", you ask "what does this cache depend on?" — and encode those dependencies into the cache key itself. This shift from manual expiration to key-based expiration is what makes Russian Doll caching practical at scale.

## Key-Based Cache Expiration

The modern Rails approach: never manually expire caches. Instead, make the cache key contain information about the cached value.

When an ActiveRecord object is saved, its `updated_at` changes. Rails uses this in cache keys:

```ruby
<% cache(todo) do %>
  <%= todo.description %>
<% end %>
```

Generated cache key: `views/todos/123-20240114181500/7a1156131a6928cb`

The key changes when:
- The object's `updated_at` changes (object was saved)
- The template changes (template tree digest updates on deploy)

Old cache entries are never manually expired—the cache store's LRU eviction removes them when space is needed.

### Array cache keys

Include multiple objects in the cache key:

```ruby
<% cache([current_user, todo]) do %>
  <%= render_todo_for(current_user, todo) %>
<% end %>
```

This cache busts if the user OR the todo changes.

## Russian Doll Caching

Nest cache fragments inside each other. When an inner cache expires, the outer cache also expires—but unchanged inner fragments are reused.

```erb
<% cache(["todo_list", @todos.map(&:id), @todos.maximum(:updated_at)]) do %>
  <ul>
    <% @todos.each do |todo| %>
      <% cache(todo) do %>
        <li><%= todo.description %></li>
      <% end %>
    <% end %>
  </ul>
<% end %>
```

**How it works:**
1. If any todo changes → `@todos.maximum(:updated_at)` changes → outer cache busts
2. When outer cache rebuilds, unchanged inner todo caches are reused (same keys)
3. If a todo is added/removed → `@todos.map(&:id)` changes → outer cache busts

## Using `touch` for Cache Propagation

`touch: true` on `belongs_to` propagates `updated_at` changes up the association chain:

```ruby
class Corporation < ApplicationRecord
  has_many :cars
end

class Car < ApplicationRecord
  belongs_to :corporation, touch: true
  has_many :brakes
end

class Brake < ApplicationRecord
  belongs_to :car, touch: true
end
```

Now saving a Brake updates `updated_at` on the Brake, its Car, and the Corporation. Russian Doll caches at every level expire correctly:

```erb
<% cache @corporation do %>
  <%= @corporation.name %>
  <% @corporation.cars.each do |car| %>
    <% cache car do %>
      <%= car.model %>
      <% car.brakes.each do |brake| %>
        <% cache brake do %>
          <%= brake.type %>
        <% end %>
      <% end %>
    <% end %>
  <% end %>
<% end %>
```

## Cache Backends Comparison

### Performance (fetch operations/second)

| Backend | Local | Over Network |
|---------|-------|-------------|
| LRURedux (in-process) | 337,000 i/s | N/A |
| MemoryStore | 52,800 i/s | N/A |
| FileStore | 12,300 i/s | N/A |
| Redis (same host) | 6,300 i/s | — |
| Memcached (same host) | 6,600 i/s | — |
| Redis (cloud) | 26 i/s | ~50ms per operation |
| Memcached (cloud) | 27 i/s | ~50ms per operation |

**Key insight:** Network cache stores are 200-500x slower when the cache is far away. Choose a provider physically close to your servers. Don't cache anything that generates faster than ~10-20ms if using a remote cache.

### When to use each

| Backend | Best For |
|---------|----------|
| **Redis** | 2+ servers/processes, recommended default. Configure with LRU eviction. Use a separate instance from Sidekiq. |
| **Memcached** | Similar to Redis but fewer eviction options. Fine if already using it. |
| **SolidCache** | Rails 8+ DB-backed cache. Simpler infrastructure (no Redis needed). |
| **MemoryStore** | Single server, small cache (<20MB). Can't share across processes. |
| **FileStore** | Low traffic, need large cache. NOT on Heroku (ephemeral filesystem). Not LRU—expires by creation time, not access time. |

### Redis configuration for caching

```ruby
# config/environments/production.rb
config.cache_store = :redis_cache_store, {
  url: ENV['REDIS_CACHE_URL'],
  expires_in: 1.hour
}
```

Redis must be configured for LRU eviction when used as a cache:
```
# redis.conf
maxmemory 256mb
maxmemory-policy allkeys-lru
```

**Do NOT use the same Redis instance for caching and Sidekiq.** LRU eviction is inappropriate for background jobs.

## When to Cache

**Cache when:**
- A page or fragment is slow (> your MART)
- The same expensive computation runs repeatedly
- Data changes infrequently relative to read frequency

**Don't cache when:**
- The operation takes <10-20ms (network cache overhead may exceed savings)
- Data changes on every request
- You haven't profiled first to confirm the operation is actually slow

**Workflow:**
1. Set a MART (Maximum Average Response Time)
2. If a page exceeds MART → profile with rack-mini-profiler
3. Identify slow fragments → cache them
4. Verify improvement

## Low-Level Caching

For caching expensive computations, API calls, or complex queries outside of views:

```ruby
# Basic fetch — compute only on cache miss
Rails.cache.fetch("user_#{user.id}_dashboard_stats", expires_in: 15.minutes) do
  user.compute_expensive_dashboard_stats
end

# With race condition TTL — prevents thundering herd
Rails.cache.fetch("popular_items", expires_in: 5.minutes, race_condition_ttl: 30.seconds) do
  Item.compute_popular
end
```

`race_condition_ttl` prevents multiple processes from computing the same expensive value simultaneously when the cache expires.
