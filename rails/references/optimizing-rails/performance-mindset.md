# Performance Mindset

## Contents
- Measure first, optimize second
- Slowdowns are partial outages
- The Pareto Principle
- Little's Law and capacity planning
- Setting performance budgets

## Measure First, Optimize Second

### The Conventional Approach

Most teams optimize reactively — someone says "it feels slow," and a developer spends a day rewriting code they suspect is the problem. Or they chase framework benchmarks, trying to squeeze microseconds out of code that isn't even the bottleneck. The instinct is to start fixing things immediately.

### The Problem with That

Intuition is wrong about performance almost every time. Developers consistently misidentify bottlenecks. A micro-benchmark might show "X is 10x faster than Y," but if that line is 0.001% of total execution time, the optimization is meaningless. Without measurement, you're guaranteed to waste effort on the wrong 80% of code.

### The Alternative Mindset

> "I will not optimize anything in my application until my metrics tell me so."

This is the single most important principle. The workflow is always:

1. **Measure** — Identify what's actually slow using profilers and monitors
2. **Profile** — Understand where time/memory is spent in the slow path
3. **Optimize** — Fix only the identified bottleneck
4. **Verify** — Confirm the optimization worked with the same measurement

### How It Changes Behavior

| Without Measurement | With Measurement |
|---------------------|-----------------|
| "It feels slow, let me rewrite this" | "Let me see what the flamegraph says" |
| Chase micro-benchmarks | Profile real requests |
| Optimize random code | Fix the vital 20% |
| Hope it's faster | Verify with same metric that found the problem |
| Rewrite in a "faster" language | Realize the bottleneck is N+1 queries, not Ruby |

### How It Feels

The measurement-first approach feels counterintuitive at first — slower, even. You want to just fix things. But once you see a flamegraph light up on one method eating 60% of request time, you feel the clarity. You know exactly what to fix and can prove it worked. The alternative — spending a day optimizing something that turns out not to matter — feels demoralizing in a way that's hard to shake.

### The Difference: Benchmarking vs Profiling

- **Benchmarking**: Compare N alternatives on a contrived task. Produces a score. Good for micro-decisions ("is A faster than B?").
- **Profiling**: Account for all sub-steps of real code. Shows where time goes. Good for finding the vital 20%.

**Example:** A developer found that `Array#shuffle` was 12x faster than Minitest's `sort.sort_by { rand }`. But profiling the full test suite showed the line accounted for a negligible fraction of total execution time. The "12x faster" micro-benchmark was meaningless in context.

## Slowdowns Are Partial Outages

### The Conventional Approach

Teams treat slowdowns as inconveniences — something to fix when there's time. Outages get war rooms; slowdowns get backlog tickets.

### The Problem with That

TRAC Research estimates organizations lose **twice as much revenue from slowdowns as from full outages**. While partial outages cost ~20% as much per hour as a full outage, they occur 10x as often. A slowdown that nobody panics about is quietly costing more than the outage everyone remembers.

### The Alternative Mindset

A slowdown is a partial outage. Quantify it in dollars:
- What does an additional second of load time cost in revenue?
- What does it cost in conversions?
- Post this number where your team can see it.

Research consistently shows:
- Amazon: Every 100ms of latency cost 1% in sales
- Google: 500ms delay caused 20% drop in traffic
- Aberdeen Group: 1 second delay means 7% fewer conversions

### How It Changes Behavior

When you frame slowdowns as outages, performance work stops competing with feature work for priority. It becomes an operational concern with a dollar value attached — the kind of thing that gets fixed now, not "when we have time."

## The Pareto Principle

The Pareto distribution — 80% of effects from 20% of causes — appears everywhere in software performance:

> 80% of an application's work occurs in 20% of its code.
> 80% of an application's traffic comes from 20% of its features.
> 80% of memory usage comes from 20% of allocated objects.

The ratio is often more severe: 90/10, 95/5, even 99/1. This means optimizing any random line of code is unlikely to speed up your application. You must measure to find the vital few.

## Little's Law and Capacity Planning

Little's Law tells you how many application instances you need:

```
Workers needed = Average response time × Requests per second
```

**Example:** Average response time is 300ms (0.3 seconds). You get 100 requests/second. You need 0.3 × 100 = 30 workers.

For background jobs:
```
Workers needed = Average job time × Jobs enqueued per second
```

Use your 95th percentile response time for more realistic capacity planning — you're only as good as your slowest responses.

## Setting Performance Budgets

Agree on these with your team:

| Budget | Recommendation |
|--------|---------------|
| Average response time (MART) | < 300ms (Rails average) |
| 95th percentile response time | ≤ 4x average (e.g., < 1.2s) |
| Frontend page load budget | Based on audience bandwidth |
| Page weight budget | Based on above |
| Cost per second of load time | Calculate from your conversion data |

The 95th percentile rule: no endpoint's p95 should exceed 4x its average. If average is 300ms, p95 should be under 1.2 seconds. If it's much higher, you have unpredictable slowdowns that need investigation.

## Common Mistakes

| Mistake | Why It's Wrong |
|---------|---------------|
| Optimizing without measuring | You're probably not in the vital 20% |
| Using averages for response times | Averages hide terrible p95/p99 |
| Chasing framework benchmarks | Framework overhead is ~5% of end-user experience |
| Rewriting in a "faster" language | Your bottleneck is almost certainly not the language |
| Optimizing in development only | Production data and traffic patterns differ dramatically |
