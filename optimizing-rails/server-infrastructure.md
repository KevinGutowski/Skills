# Server & Infrastructure

## Contents
- Puma configuration
- Process and thread counts
- Copy-on-write and preloading
- Container sizing
- CDNs
- PostgreSQL tuning
- Connection pooling
- SSL optimization
- The Easy Mode Stack

## Puma Configuration

```ruby
# config/puma.rb
workers ENV.fetch("WEB_CONCURRENCY") { 3 }
threads_count = ENV.fetch("RAILS_MAX_THREADS") { 5 }
threads threads_count, threads_count

preload_app!

on_worker_boot do
  ActiveRecord::Base.establish_connection
end
```

### Process Count (Workers)

The most important setting. Each worker is a forked process that can handle requests in parallel.

**Formula:** `Workers = TOTAL_RAM / (RAM_PER_PROCESS × 1.2)`

| Guideline | Value |
|-----------|-------|
| Minimum per server | 3 (for routing efficiency) |
| Typical range | 3-8 per server |
| Memory per process | 200-400 MB (typical Rails app) |
| CPU guideline | 1.25-1.5× available hyperthreads |

**Why at least 3:** With fewer processes, a single slow request (CSV export, report generation) can block all capacity. With 3+ processes per server, the OS routes requests to idle workers, insulating fast requests from slow ones.

**Measure memory accurately:** Disable worker killers, wait 12-24 hours under production load, then check with `ps`. Ruby processes grow over time—don't measure at boot.

### Thread Count

In MRI Ruby, threads only parallelize I/O waits (database queries, HTTP calls). For most apps, 10-25% of time is parallelizable.

**Recommendation:** Set threads to 5 and forget about it. Settings above 5 rarely help in MRI.

```ruby
# Puma
threads 5, 5

# Passenger
passenger_concurrency_model thread;
passenger_thread_count 5;
```

Threads have a larger memory impact than the 8MB stack space would suggest. Check memory before and after adding threads.

### Preloading (Copy-on-Write)

Preloading loads your app before forking. Child processes share read-only memory with the parent through copy-on-write.

```ruby
preload_app!  # in config/puma.rb
```

Always enable preloading. It reduces total memory usage across workers.

## Container Sizing

Target 70-80% utilization of both CPU and memory.

Most Rails apps need **at least 1 GB RAM** (3 processes × ~300 MB each + headroom). Fewer processes = worse routing = more timeout errors.

**Real example:** A client moved from 30 servers with 2 processes each to 3 servers with 20 processes each. Timeout errors almost completely disappeared—because requests no longer queued behind slow requests on small servers.

### CPU vs Memory

| If... | Then... |
|-------|---------|
| Memory maxes out before CPU | Get more RAM or fewer/leaner processes |
| CPU maxes out before memory | Get more CPU cores, or reduce process count |
| CPU load average > 1.0 consistently | You're CPU-bottlenecked |

Don't exceed 5% of deployed time at 100% CPU. Monitor with your server's built-in tools or `log-runtime-metrics` on Heroku.

## CDNs

CDNs cache content on servers close to users, reducing latency. A user in Houston hitting your server in Virginia adds ~50ms each way. A CDN server in Dallas cuts that dramatically.

**Setup in Rails:**

```ruby
# config/environments/production.rb
config.asset_host = 'https://cdn.example.com'
config.public_file_server.headers = {
  'Cache-Control' => 'public, max-age=31536000'
}
```

**How it works:**
1. First request: CDN fetches asset from your Rails server (origin)
2. Subsequent requests: CDN serves from its cache, no hit to your server

**Recommended:** Cloudflare (free tier, HTTP/2, global edge network). Also good: CloudFront, Fastly.

CDNs also help SSL performance—TLS handshakes terminate at the CDN edge (closer to user), dramatically reducing round-trip times.

## PostgreSQL Tuning

### Indexing

Always index: foreign keys, polymorphic associations, columns in WHERE and ORDER BY, `updated_at` if used in caching.

```sql
-- Debug slow queries
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com';
-- "Seq Scan" = no index. "Index Scan" = good.
```

### Vacuuming

PostgreSQL's MVCC requires regular vacuuming. Autovacuum should be enabled (it is by default). During maintenance windows, run `VACUUM FULL`.

### Full-text search

PostgreSQL's built-in full-text search is "enough" for 80% of apps that reach for Elasticsearch. Fewer moving parts = less to break.

### Connection to app

**Your database must be in the same datacenter as your app.** Dozens of round-trips happen per request. Even 10ms of latency per query × 15 queries = 150ms added to every request.

## Connection Pooling

### Database connections

Each thread needs a database connection. Set your pool size accordingly:

```yaml
# config/database.yml
production:
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
```

**Total connections needed:** `Workers × Threads per worker`

Example: 3 workers × 5 threads = 15 connections minimum across your app. Make sure your database supports this many concurrent connections.

### Redis connections

Similar math applies. Each Sidekiq thread needs a Redis connection.

```ruby
# config/initializers/sidekiq.rb
Sidekiq.configure_server do |config|
  config.redis = { url: ENV['REDIS_URL'], size: 25 }
end
```

## SSL Optimization

SSL adds 1-2 round-trips to connection setup. Key optimizations:

| Setting | Effect |
|---------|--------|
| SSL session resumption | Skips a full round-trip for returning visitors |
| OCSP stapling | Eliminates certificate revocation check round-trip |
| HSTS | Prevents HTTP→HTTPS redirects |
| Forward secrecy (DHE/ECDHE) | Enables SSL False Start in Chrome/Firefox/Safari |

```nginx
# nginx.conf
ssl_session_cache   shared:SSL:10m;
ssl_session_timeout 10m;
ssl_stapling on;
ssl_stapling_verify on;
add_header Strict-Transport-Security "max-age=31536000" always;
```

Use [Mozilla's SSL Configuration Generator](https://ssl-config.mozilla.org/) for cipher suite selection. Don't hand-pick ciphers based on performance—prioritize security.

Test your configuration: [Qualys SSL Labs](https://www.ssllabs.com/ssltest/)

## Slimming Rails

### Only require what you need

```ruby
# config/application.rb — instead of require 'rails/all':
require 'active_record/railtie'
require 'action_controller/railtie'
require 'action_view/railtie'
# Skip: action_mailer, active_job, action_cable, sprockets if not needed
```

Memory savings: ~10 MB for Sprockets, ~3.5 MB for ActiveRecord, ~0.5 MB each for ActionMailer and ActiveJob.

### Remove unnecessary middleware

```ruby
# config/application.rb
# For API-only apps, these are safe to remove:
config.middleware.delete ActionDispatch::Cookies
config.middleware.delete ActionDispatch::Session::CookieStore
config.middleware.delete ActionDispatch::Flash
config.middleware.delete Rack::MethodOverride
```

Or just use `config.api_only = true` for API apps—Rails strips unnecessary middleware automatically.

### Logging

```ruby
# Don't log to disk in production
config.logger = Logger.new(STDOUT)

# Consider reducing log level (INFO logs on every request)
config.log_level = :warn
```

## The Easy Mode Stack

The recommended default stack for most Rails applications:

| Component | Choice | Why |
|-----------|--------|-----|
| App Server | Puma | Multi-threaded + forking, battle-tested |
| Database | PostgreSQL | Performance, full-text search, JSONB, parallel queries |
| Cache | Solid Cache by default; Redis when measured needs justify it | Simpler Rails 8 infrastructure first, external cache when workload demands it |
| Background Jobs | Solid Queue by default; Sidekiq when measured needs justify it | Rails-integrated reliability first, Redis-backed throughput when necessary |
| CDN | Cloudflare | Free tier, HTTP/2, global edge |
| Frontend | Turbo + Stimulus | Minimal JS, server-rendered HTML |
| Memory Allocator | jemalloc | Less fragmentation for threaded apps |
| Templates | ERB | 5-8x faster than HAML, 2-4x faster than Slim |
| HTTP Library | Typhoeus (or Faraday) | Parallel requests, response cache, no exceptions for failures |
| Auth | `has_secure_password` | Built-in, bcrypt, covers 80% of needs |
