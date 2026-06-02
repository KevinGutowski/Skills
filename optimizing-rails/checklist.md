# The Complete Rails Performance Checklist

68 items from "The Complete Guide to Rails Performance" by Nate Berkopec.

## Measurement & Monitoring

1. **Ensure production instance counts conform to Little's Law.** Target 25-50% utilization ratio. Run at least 3-4 processes per machine.
2. **95th percentile times should be ≤ 4× average response time.** Example: 4s p95 with 1s average = acceptable. 10s p95 with 1s average = bad.
3. **No endpoint's average should exceed 4× the app-wide average.**
4. **Quantify the cost of an additional second of browser load time.** Post this number where your team can see it.
5. **Set a frontend load time budget.** Agree that exceeding it is a bug.
6. **Set maximum acceptable response time and p95 time.** Rails average: 300ms with 1s p95.
7. **Set a page weight budget** based on audience bandwidth.
8. **Set up a long-term performance benchmark** with `siege`, `ab`, or `wrk`.
9. **Learn to use profilers.** Use `stackprof` to profile startup time.
10. **Audit your Gemfile with `derailed_benchmarks`.** TOP output should be 50-60 MB.
11. **Log memory statistics in production.** Track memory against deploy times to detect regressions.
12. **Run `rack-mini-profiler` in production for admins.** Use flamegraph and memory_profiler add-ons. Look for pages with 12+ SQL queries.
13. **Set up a profiling mode locally.** Use a PROFILE env var to flip settings in development.rb.
14. **Use production-like data in development.** Sanitized production dumps or large seed scripts.
15. **Use a performance monitor** — New Relic, Datadog, or Scout.

## Frontend

16. **Add `async defer` to every non-critical script tag.**
17. **CSS goes before JavaScript** in the head tag.
18. **Minimize JavaScript usage.** JS is downloaded once but evaluated on every page load.
19. **Use Turbo or a SPA** to re-use the DOM between navigations.
20. **Specify content encoding with HTTP headers** or meta tag at the very top.
21. **`X-UA-Compatible` as high in the document as possible** (if needed).
22. **Viewport meta tag before any CSS.**
23. **Don't rely on any particular resource being cached.** Third-party CDN-hosted libraries aren't reliably cached.
24. **Use resource hints** — especially `preconnect` and `prefetch`.
25. **Be aware of partial rendering cost.** Cache aggressively or inline partials in hot loops.
26. **Gzip static assets.** For HTML, use NGINX to compress on the fly.
27. **Use a CDN that supports HTTP/2.** Set `config.asset_host`.
28. **Configure NGINX/Apache for HTTP/2** (NGINX 1.9.5+, Apache 2.4.17+).
29. **Keep pages under ~5,000 DOM elements.**
30. **Look for layout thrash with Chrome DevTools.** Red flags = forced reflows.
31. **Consider splitting application.js/application.css** into 2-3 files based on churn rate.

## HTTP Caching

32. **Verify sane Cache-Control headers.** Check in Chrome DevTools Network tab.
33. **Ensure API clients have response caches.** Faraday and Typhoeus are the only Ruby clients with caches.
34. **Mark user data with `Cache-Control: private`.** Use `no-store` for sensitive data.
35. **Use Rails HTTP caching for infrequently changed API data.** `fresh_when`, `stale?`, `ActionController::ConditionalGet`.

## ActiveRecord & Database

36. **Use `find_each` instead of `.all.each`.** Batch loading prevents memory bloat.
37. **Reset any tweaked GC parameters when upgrading Ruby.** GC changes significantly between versions.
38. **Look for large allocations with Oink or `ps`.** Short spikes become permanent bloat.
39. **Watch development logs for N+1 queries.** Use rack-mini-profiler or Bullet gem.
40. **Restrict `where`/`find` to scopes and controllers.** Query methods in instance methods cause N+1s.
41. **Use `select` for slow queries** to load only needed columns.
42. **Don't eager load more than a few associations.** Each eager load increases object count.
43. **Do math in the database.** Use `.sum`, `.average`, `.maximum` instead of Ruby iteration.
44. **Bulk insert/update/delete in single queries.** Use `update_all`, `activerecord-import`, or Rails 6+ `insert_all`.

## Background Jobs

45. **Background work for external network calls, non-immediate work, and slow operations.**
46. **Make jobs idempotent.** Running twice should produce the same result. Use database locks, not uniqueness hacks.
47. **Keep jobs small.** One unit of work per job. Fan out to many small jobs instead of one big one.
48. **Set aggressive timeouts.** Fail fast, retry later.
49. **Add failure handlers and alerting.** Know when jobs fail permanently.
50. **Consider DB-backed queues for reliability, Redis for speed.**
51. **Colocate queue backend with app servers.** Same datacenter, minimal latency.

## Rails Application Caching

52. **Use key-based cache expiration over manual expiration.** Russian Doll with `touch: true`.
53. **Ensure cache backend is fast.** Monitor cache read/write times in logs.
54. **Consider in-memory cache (LRURedux) for simple, hot operations.**

## Server Configuration

55. **Only require the Rails components you need.** Replace `require 'rails/all'`.
56. **Don't log to disk in production.**
57. **Use `config.api_only` for API servers.**
58. **Eliminate exceptions as flow control.** A 200 response should not raise/rescue exceptions. Check with rack-mini-profiler.
59. **Use Puma, Unicorn+NGINX, or Passenger.** Unicorn must be behind a reverse proxy.
60. **Use streaming for landing pages and complex endpoints.** `render stream: true` for faster time-to-first-byte.

## Database

61. **Index foreign keys, polymorphic associations, and frequently queried columns.**
62. **EXPLAIN ANALYZE your worst queries.** Take top 5 from your performance monitor.
63. **Ensure autovacuum is running.** Run `VACUUM FULL` during maintenance.
64. **Verify connection pool math.** `Workers × Threads` connections needed at minimum.
65. **Consider disabling durability in test environments** for faster test suites.

## Runtime & Allocator

66. **Consider JRuby** for CPU-heavy, highly parallel workloads.
67. **Try jemalloc.** Low risk, possible 10-30% memory savings. No code changes required.
68. **Test SSL configuration.** Use Qualys SSL Labs. Check: session resumption, OCSP stapling, HSTS, forward secrecy.
