---
name: optimizing-rails
description: Optimize Rails performance using measurement-first methodology. Covers profiling (rack-mini-profiler, stackprof), N+1 fixes, Russian Doll caching, jemalloc, Puma tuning, and CDN setup. Use when diagnosing slow requests, memory bloat, or reviewing Rails code for performance.
---

## Core Philosophy

**Measure first, optimize second.** Performance slowdowns are partial outages—quantify in dollars, not milliseconds. The Pareto Principle applies: 80% of slowness comes from 20% of code. Blind optimization is guaranteed waste.

| Mindset | Instead Of |
|---------|-----------|
| Measure → Profile → Optimize | "I think this is slow" |
| Quantify cost per second of load time | "It feels sluggish" |
| 80/20 — find the vital few | Optimize everything equally |
| Latency is the enemy, not bandwidth | "We need more bandwidth" |
| Slowdowns are partial outages | "It's just a bit slow" |

> "I will not optimize anything in my application until my metrics tell me so."

Details: [performance-mindset.md](performance-mindset.md)

## Measurement & Profiling

### Which Tool When

| Question | Tool |
|----------|------|
| Which requests are slow? | rack-mini-profiler, New Relic/Datadog |
| Where in this request is time spent? | rack-mini-profiler flamegraph (`?pp=flamegraph`) |
| Which method is the CPU bottleneck? | stackprof (wall/cpu mode) |
| Full call tree with timings? | ruby-prof |
| Is this code change faster? | benchmark/ips |
| How much memory does boot use? | `derailed bundle:mem` |
| Where are memory allocations? | memory_profiler, stackprof (object mode) |
| Is memory leaking over time? | `derailed exec perf:mem_over_time` |
| What's my app's capacity? | Little's Law: `Throughput = Workers / Avg Response Time` |

**Example:** `rack-mini-profiler` adds a speed badge to every page. In production, add `Rack::MiniProfiler.authorize_request` in a before_action for admins. Use `?pp=flamegraph` to see where time is spent, `?pp=profile-memory` for allocations.

Details: [measurement-and-profiling.md](measurement-and-profiling.md)

## Frontend Performance

### The Optimal Head Tag

```html
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- CSS first (before any blocking JS) -->
  <link rel="stylesheet" href="application.css">
  <!-- Preconnect to CDN/API domains -->
  <link rel="preconnect" href="https://cdn.example.com">
  <!-- Preload critical resources -->
  <link rel="preload" href="critical-font.woff2" as="font" type="font/woff2" crossorigin>
  <!-- Scripts: defer for non-critical, async for independent -->
  <script src="app.js" defer></script>
</head>
```

### Quick Wins

| Action | Why |
|--------|-----|
| Enable and measure YJIT on modern Ruby | 37signals saw broad request-time gains with no app-code changes |
| `async defer` on non-critical scripts | Unblocks HTML parsing |
| `preconnect` to external domains | Saves 100-300ms per domain |
| Subset webfonts (latin only) | 90%+ smaller font files |
| `font-display: swap` | Text visible immediately |
| CSS before blocking JS | Prevents flash of unstyled content |
| Use Turbo or SPA for navigation | Avoids full DOM teardown |
| Keep DOM under ~5000 elements | Selectors and reflows stay fast |

Details: [frontend-performance.md](frontend-performance.md)

## HTTP Caching

The fastest request is one never made. Latency—not bandwidth—is the real enemy.

| Scenario | Cache-Control Header |
|----------|---------------------|
| Fingerprinted assets (forever cache) | `public, max-age=31536000` |
| User-specific data, needs revalidation | `private, no-cache` |
| Sensitive data (passwords, payment) | `no-store` |
| API response, changes infrequently | `public, max-age=300` + ETag |

```ruby
# config/environments/production.rb — serve assets through CDN
config.public_file_server.headers = { 'Cache-Control' => 'public, max-age=31536000' }
config.asset_host = 'https://cdn.example.com'
```

**Example:** Use `fresh_when` to skip DB queries when content hasn't changed:

```ruby
def show
  @article = Article.find(params[:id])
  fresh_when last_modified: @article.updated_at
end
```

Details: [http-caching.md](http-caching.md)

## ActiveRecord Performance

ActiveRecord's convenience hides expensive database patterns. In most Rails apps, ActiveRecord queries are the single largest chunk of response time — and the most common problems (N+1s, full table loads) are invisible with small development datasets.

### Common Pitfalls

| Problem | Fix |
|---------|-----|
| N+1 queries | `includes(:association)` or `strict_loading!` |
| Loading all records into memory | `find_each(batch_size: 1000)` not `.all.each` |
| `SELECT *` when you need 2 columns | `.select(:id, :name)` or `.pluck(:id, :name)` |
| Counting with Ruby | `counter_cache: true` on `belongs_to` |
| Missing indexes | Index foreign keys and frequent WHERE columns |
| Slow tenant pagination | Prefer covering tenant-prefixed indexes, narrow selects, then load rows |
| Math in Ruby over AR objects | Use `.sum(:amount)`, `.average(:score)` in DB |
| Bulk updates one-by-one | `update_all` or `activerecord-import` gem |
| Query methods in instance methods | Restrict `where`/`find` to scopes and controllers |

**Example:** N+1 detection—enable strict loading in development:

```ruby
# config/environments/development.rb
config.active_record.strict_loading_by_default = true
```

Details: [activerecord-performance.md](activerecord-performance.md)

## Caching Strategies

### Key-Based Expiration (Never Manually Expire)

Cache keys include `updated_at`—when the object changes, the key changes. Old entries get evicted by the cache's LRU algorithm.

```ruby
# Russian Doll caching — outer cache busts when inner changes
<% cache(["todo_list", @todos.map(&:id), @todos.maximum(:updated_at)]) do %>
  <% @todos.each do |todo| %>
    <% cache(todo) do %>
      <%= render todo %>
    <% end %>
  <% end %>
<% end %>
```

Use `touch: true` on `belongs_to` to propagate cache busting up the association chain.

### Which Cache Backend

| Backend | Use When |
|---------|----------|
| SolidCache | Rails 8+/37signals-style apps, DB-backed, simple infrastructure |
| Redis | Measured high-throughput or distributed cache needs |
| Memcached | Similar to Redis, less flexible eviction policies |
| MemoryStore | 1 server, < 20MB cache, can't share across processes |
| FileStore | Low traffic, large cache, NOT on Heroku |

**Key rule:** Don't cache anything that takes less than ~10-20ms to generate if using a network cache store. Network latency can exceed the savings.

Details: [caching-strategies.md](caching-strategies.md)

## Memory Management

Ruby allocates memory in pages of 40-byte slots. Objects larger than 40 bytes spill onto the heap. **Ruby rarely returns memory to the OS**—once RSS grows, it stays.

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| RSS grows steadily, never drops | Normal Ruby behavior | jemalloc, tune GC |
| RSS grows without bound | Memory leak | `ObjectSpace`, generation-aware profiling |
| RSS spikes then plateaus | Large temporary allocations | `find_each`, reduce object churn |
| High RSS at boot | Bloated gems | `derailed bundle:mem`, swap gems |

**Quick win:** Switch to jemalloc for 10-30% memory reduction with multithreaded apps (Puma, Sidekiq):

```dockerfile
RUN apt-get install -y libjemalloc2
ENV LD_PRELOAD=/usr/lib/x86_64-linux-gnu/libjemalloc.so.2
ENV MALLOC_CONF="dirty_decay_ms:1000,muzzy_decay_ms:1000"
```

Details: [memory-management.md](memory-management.md)

## Backgrounding

Move work out of the request cycle when:
- It contacts an external service over the network
- It always takes longer than ~150% of your average response time
- The user doesn't need the result immediately

```ruby
# Instead of sending email in the request:
UserMailer.welcome(@user).deliver_later

# Instead of processing uploads synchronously:
ProcessUploadJob.perform_later(@upload.id)
```

**Key patterns:** Make jobs idempotent (safe to run twice), use database locks for uniqueness, keep jobs small, set aggressive timeouts.

Details: [backgrounding.md](backgrounding.md)

## Server & Infrastructure

### The Easy Mode Stack

| Component | Choice | Why |
|-----------|--------|-----|
| App Server | Puma | Multi-threaded + multi-process |
| Database | PostgreSQL | Performance, full-text search, JSONB |
| Cache/Queue Store | Solid Cache by default; Redis when measured needs justify it | Fewer moving parts first, external services when the workload demands them |
| Background Jobs | Solid Queue by default; Sidekiq when measured needs justify it | Rails-integrated reliability first, Redis-backed throughput when necessary |
| CDN | Cloudflare | Free tier, HTTP/2, global edge |
| Frontend | Turbo + Stimulus | Minimal JS, server-rendered |
| Memory Allocator | jemalloc | Less fragmentation for threaded apps |
| Templates | ERB | 5-8x faster than HAML |

### Puma Configuration

```ruby
# config/puma.rb
workers ENV.fetch("WEB_CONCURRENCY") { 2 }
threads_count = ENV.fetch("RAILS_MAX_THREADS") { 5 }
threads threads_count, threads_count
preload_app!

# Workers = TOTAL_RAM / (RAM_PER_PROCESS * 1.2)
# Threads = 5 (default, rarely benefits from more in MRI)
# Run at least 3 workers per server for routing efficiency
```

Details: [server-infrastructure.md](server-infrastructure.md)

## Quick Performance Checklist

### Before Deploy
- [ ] `derailed bundle:mem` — audit Gemfile for bloat
- [ ] Check for N+1 with `bullet` gem or `strict_loading`
- [ ] Verify indexes on foreign keys and WHERE columns
- [ ] Background jobs for external service calls

### In Production
- [ ] Monitor p50/p95/p99 response times (not averages)
- [ ] Set performance budgets (e.g., p95 < 300ms)
- [ ] `rack-mini-profiler` for admins in production
- [ ] Track memory growth trends over 24+ hours

Full checklist (68 items): [checklist.md](checklist.md)
