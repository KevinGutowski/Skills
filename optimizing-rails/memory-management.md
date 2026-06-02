# Memory Management

## Contents
- How Ruby uses memory
- Memory bloat vs memory leaks
- jemalloc
- Memory fragmentation
- Profiling memory
- GC tuning

## How Ruby Uses Memory

Ruby objects live in "slots" of 40 bytes each, organized into heap pages. Objects larger than 40 bytes (most strings, arrays, hashes) allocate additional memory outside the slot on the OS heap.

**Critical fact:** MRI Ruby rarely returns memory to the OS. Once RSS grows, it stays. This is by design—Ruby keeps freed heap pages for future use rather than releasing them.

```ruby
# See current object counts
ObjectSpace.count_objects
# => {:TOTAL=>53802, :FREE=>31, :T_STRING=>36497, :T_ARRAY=>9399, ...}

# Count memory by type (requires 'objspace')
require 'objspace'
ObjectSpace.count_objects_size
# Shows bytes per object type

# All objects are at least 40 bytes
ObjectSpace.memsize_of("hello") # => 40
ObjectSpace.memsize_of(Array.new(10_000) { :a }) # => 80040
```

### String allocation trap

```ruby
# This allocates 500 strings (not 300):
# "hello" + " " → "hello "  (1 new string per iteration × 100)
# "hello " + "world" → "hello world"  (1 more × 100)
# Plus the 3 literals × 100 = 300
100.times { 'hello' + ' ' + 'world' }

# Better: use interpolation or frozen strings
100.times { "hello world" }
```

## Memory Bloat vs Memory Leaks

| | Bloat | Leak |
|-|-------|------|
| **Behavior** | RSS spikes then plateaus | RSS grows without bound |
| **Cause** | Large temporary allocations | Objects retained forever |
| **Example** | Loading 10K AR objects at once | Appending to a global array |
| **Fix** | `find_each`, reduce allocations | Find with ObjectSpace, memory_profiler |
| **Detection** | `derailed exec perf:mem_over_time` | Same tool—if it never levels off, it's a leak |

**Bloat is more common than leaks.** A single request that loads thousands of AR objects can permanently increase your process's RSS by hundreds of MB (because Ruby doesn't release memory back).

### Identifying bloat

```bash
# Audit gems for boot-time bloat
bundle exec derailed bundle:mem
# Target: TOP should be 50-60 MB

# Watch memory over requests
PATH_TO_HIT=/heavy_page TEST_COUNT=200 bundle exec derailed exec perf:mem_over_time
# Levels off → bloat. Keeps growing → leak.
```

### Identifying leaks

```ruby
# Track old_objects in GC.stat over time
# If GC.stat[:old_objects] keeps growing, something is being retained

# Use memory_profiler to find retained objects
require 'memory_profiler'
report = MemoryProfiler.report { do_suspicious_work }
report.pretty_print
# Look at "retained" section — these survive GC
```

## jemalloc

jemalloc is a memory allocator developed by Facebook. It reduces fragmentation in multithreaded programs (Puma, Sidekiq). Real-world savings: 10-30% less RSS.

### Why it helps

The default glibc `malloc` uses per-thread memory arenas. With Puma's threads, this creates many arenas that fragment memory. jemalloc's arena design avoids this fragmentation.

The memory savings are so significant and the penalties so minor that **if you use Puma or Sidekiq, you should always use jemalloc**.

### Setup

**Docker:**
```dockerfile
RUN apt-get install -y libjemalloc2
ENV LD_PRELOAD=/usr/lib/x86_64-linux-gnu/libjemalloc.so.2
ENV MALLOC_CONF="dirty_decay_ms:1000,muzzy_decay_ms:1000"
```

**Heroku:**
```bash
heroku buildpacks:add --index 1 https://github.com/gaffneyc/heroku-buildpack-jemalloc
```

**Compile Ruby with jemalloc:**
```bash
./configure --with-jemalloc
```

**Mac (development):**
```bash
brew install jemalloc
DYLD_INSERT_LIBRARIES=$(brew --prefix jemalloc)/lib/libjemalloc.dylib rails s
```

### Alternative: MALLOC_ARENA_MAX

If you can't use jemalloc, reduce glibc's arena count:

```bash
export MALLOC_ARENA_MAX=2
```

This can reduce memory by 20-40% with a ~13% performance penalty. Values of 2-4 work for most Ruby apps. Setting to 1 has diminishing returns.

## Memory Fragmentation

Fragmentation occurs because Ruby never moves memory locations (C extensions use raw pointers). Combined with per-thread arenas in glibc, multithreaded apps (Puma, Sidekiq) can use 2-4x more memory than needed.

**Causes:**
1. Per-thread memory arenas in glibc malloc
2. Ruby's inability to compact/move objects
3. Mixed allocation sizes (small and large objects interleaved)

**Fixes (in order of recommendation):**
1. **Use jemalloc** — best option, no code changes
2. **Set MALLOC_ARENA_MAX=2** — if jemalloc not available
3. **Ruby 2.7+ compacting GC** — `GC.compact` helps but not a complete solution

## Profiling Memory

### Boot-time profiling

```ruby
# config/environment.rb (temporary)
require "memory_profiler"
MemoryProfiler.report do
  require File.expand_path('../application', __FILE__)
  Rails.application.initialize!
end.pretty_print(to_file: "boot_memory_report.txt")
```

### Per-request profiling

Use rack-mini-profiler with `?pp=profile-memory` or `?pp=analyze-memory`.

### Background job profiling

```ruby
require 'memory_profiler'
report = MemoryProfiler.report do
  MyJob.new.perform(args)
end
report.pretty_print
```

### ObjectSpace exploration

```ruby
# Count objects by class
ObjectSpace.each_object
  .map(&:class)
  .each_with_object(Hash.new(0)) { |e, h| h[e] += 1 }
  .sort_by { |k, v| v }
```

## How It Feels

**Watching RSS climb** is anxiety-inducing. You deploy, memory starts at 250MB, and over hours it creeps to 600MB. Is it a leak? Is it bloat? You don't know. Running `derailed exec perf:mem_over_time` and seeing it level off at 500MB is a relief — it's bloat, not a leak. Ruby just doesn't give memory back.

**The jemalloc moment:** You add two lines to your Dockerfile (`apt-get install libjemalloc2` and `LD_PRELOAD`), deploy, and watch your memory graphs drop 25%. No code changes. No tradeoffs. It feels like cheating.

**Chasing a real leak** is grueling. RSS grows without bound. You wrap suspect code in `MemoryProfiler.report`, stare at retained object counts, dig through `ObjectSpace`. When you finally find the global hash that's accumulating entries on every request, the fix is one line — but finding it took hours.

## GC Tuning

**In general, don't tune GC in Ruby 2.3+.** The defaults are good. Only tune if profiling shows GC is a specific bottleneck.

Key `GC.stat` values to monitor:
- `minor_gc_count` / `major_gc_count` — how often GC runs
- `old_objects` — if steadily increasing, possible memory leak
- `heap_live_slots` — total live objects

```ruby
# Check if GC runs during a specific operation
before = GC.count
do_something
after = GC.count
puts "GC ran #{after - before} times"
```

If you must tune, the most impactful variable is `RUBY_GC_HEAP_INIT_SLOTS` (pre-allocate heap space to reduce early GC churn). Reset all GC variables when upgrading Ruby versions.
