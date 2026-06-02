# Measurement & Profiling Tools

## Contents
- rack-mini-profiler
- stackprof
- ruby-prof
- benchmark/ips
- derailed_benchmarks
- memory_profiler
- Performance monitors (New Relic, Datadog)
- Load testing tools

## Why This Matters

You can't optimize what you can't see. Without profiling tools, performance work is guesswork — and guesswork almost always targets the wrong code. These tools turn "it feels slow" into "this method takes 400ms because it runs 200 SQL queries." The difference between a productive performance session and a wasted afternoon is whether you measured first.

## rack-mini-profiler

The essential profiling tool for Rails. Adds a speed badge to every page showing request time and SQL query count. Works in development and production.

### Setup

```ruby
# Gemfile
gem 'rack-mini-profiler'
gem 'stackprof'        # for flamegraphs
gem 'memory_profiler'  # for memory profiling
```

### Usage

| URL Parameter | What It Shows |
|---------------|--------------|
| (default) | Speed badge with timing breakdown |
| `?pp=flamegraph` | Flamegraph showing where CPU time is spent |
| `?pp=profile-memory` | Memory allocation report |
| `?pp=profile-gc` | GC statistics for the request |
| `?pp=analyze-memory` | Detailed memory analysis |
| `?pp=help` | List all available commands |

### Production Setup

```ruby
# config/initializers/rack_mini_profiler.rb
if defined?(Rack::MiniProfiler)
  Rack::MiniProfiler.config.authorize_cb = lambda { |env|
    current_user(env)&.admin?
  }
  # Store results in Redis for multi-process setups
  Rack::MiniProfiler.config.storage = Rack::MiniProfiler::RedisStore
end
```

**Key insight:** Use rack-mini-profiler to find pages with too many SQL queries. Any page generating more than ~12 queries probably has N+1 issues or needs caching.

## stackprof

CPU and allocation profiler for MRI Ruby. Low overhead, suitable for production sampling.

```ruby
# CPU profiling
StackProf.run(mode: :cpu, out: 'tmp/stackprof-cpu.dump') do
  # code to profile
end

# Object allocation profiling
StackProf.run(mode: :object, out: 'tmp/stackprof-object.dump') do
  # code to profile
end

# View results
# $ stackprof tmp/stackprof-cpu.dump
# $ stackprof tmp/stackprof-cpu.dump --method 'ClassName#method_name'
```

Use `mode: :wall` for web requests (captures time spent waiting on I/O), `mode: :cpu` for computation-heavy code.

## ruby-prof

More detailed than stackprof but higher overhead. Use in development only.

```ruby
require 'ruby-prof'

# As Rack middleware (add to config.ru)
use Rack::RubyProf, path: './tmp/profile'

# Inline profiling
result = RubyProf.profile { some_code }
printer = RubyProf::CallStackPrinter.new(result)
printer.print(File.open('profile.html', 'w'))
```

Produces call-stack graphs similar to flamegraphs. Good for understanding the full call tree including Rack middleware overhead.

## benchmark/ips

For micro-benchmarking competing code alternatives. Always prefer this over the stdlib `Benchmark` module.

```ruby
require "benchmark/ips"

Benchmark.ips do |x|
  x.report("find_each") { User.find_each { |u| u.name } }
  x.report("all.each")  { User.all.each { |u| u.name } }
  x.compare!
end
```

**Caveat:** Micro-benchmarks can mislead. "X is 10x faster" means nothing if the line is 0.001% of total execution time. Always validate with profiling.

## derailed_benchmarks

Audit your Gemfile for memory bloat and benchmark boot/runtime performance.

```bash
# Static: memory per gem at require time
bundle exec derailed bundle:mem
# Target: "TOP" output should be 50-60 MB

# Dynamic: memory growth over requests
PATH_TO_HIT=/users TEST_COUNT=100 bundle exec derailed exec perf:mem_over_time
# If memory keeps growing → you have a leak

# Dynamic: object allocations per request
PATH_TO_HIT=/users bundle exec derailed exec perf:objects
```

**Common find:** The `mime-types` gem often causes 12+ MB of bloat. Fix:

```ruby
# Gemfile — force the columnar (low-memory) version
gem 'mime-types', '~> 3.0'
# or if stuck on v2:
gem 'mime-types', '~> 2.6', require: 'mime/types/columnar'
```

## memory_profiler

Profile memory allocations in any block of code. Used under the hood by rack-mini-profiler and derailed.

```ruby
require 'memory_profiler'

report = MemoryProfiler.report do
  # code to profile
end

report.pretty_print
# Shows: Total allocated, Total retained, Allocated by gem, by file, by location
```

- **Allocated memory**: Everything allocated during the run (includes GC'd objects)
- **Retained memory**: Objects still alive after the run (potential leak indicators)

Useful for profiling background jobs and non-Rack code that rack-mini-profiler can't reach.

## Performance Monitors

Use one of these in production. It doesn't matter which—just use one.

| Monitor | Notes |
|---------|-------|
| New Relic | Generous free tier, most feature-rich |
| Datadog | Strong APM + infrastructure monitoring |
| Scout | Simple, developer-friendly |
| Skylight | Rails-focused, great UI, pricey |

Focus on: p50/p95/p99 response times per endpoint, throughput, error rates, and Apdex scores.

## Load Testing Tools

```bash
# wrk — high-performance, scriptable with Lua
wrk -t12 -c400 -d30s http://localhost:3000/

# siege — great for hitting multiple URLs from a file
siege -c 32 -t 60s -f urls.txt

# ab (Apache Bench) — simple, built-in on most systems
ab -n 1000 -c 50 http://localhost:3000/
```

Use `siege` with a URL file for realistic traffic patterns. Use `wrk` for maximum throughput testing.

## Workflow Summary

1. **Monitor** production with New Relic/Datadog → identify slow endpoints
2. **Profile** slow endpoints with rack-mini-profiler flamegraph → find bottleneck
3. **Benchmark** competing solutions with benchmark/ips → pick the best fix
4. **Verify** the fix with the same monitoring that identified the problem
