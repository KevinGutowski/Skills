# Rails Fixtures Testing Sources

This file records the source basis for `rails-fixtures-testing.md`.

## Primary sources

- `marckohlbrugge/37signals-skills` @ c58e7d5 — the original 37signals/Fizzy-derived fixtures-school guidance vendored into this repository. Use it for school-specific practice, then verify unusual claims against the upstream per-PR links.
- Rails Guide: [Testing Rails Applications](https://guides.rubyonrails.org/testing.html) — confirms Rails' default Minitest stack, the Rails-specific assertions this reference names (`assert_difference`, `assert_no_difference`, `assert_changes`, `assert_response`, `assert_redirected_to`), and targeted `bin/rails test` usage by file, line, line-range, directory, or `-n` name.
- Rails Guide: [Caching with Rails](https://guides.rubyonrails.org/caching_with_rails.html) — confirms cache keys/versions, `Rails.cache.fetch`, `cache_key_with_version`, and `touch: true` invalidation across associated records — the mechanics behind the derived/cached display-data contract test.
- Rails Guide: [Testing Jobs](https://guides.rubyonrails.org/testing.html#testing-jobs) / `ActiveJob::TestHelper` — confirms `assert_enqueued_with` and `perform_enqueued_jobs`.
- Minitest README: [minitest/minitest](https://github.com/minitest/minitest) — confirms the small assertion and mock/stub surface this fixtures-school reference assumes.

## Scope notes

- The coverage-ownership heuristic is a local synthesis for vanilla Rails/Minitest review. It aligns with Rails' layer-specific test classes and the existing 37signals coverage budget, but stays scoped to this fixtures-school reference — it is not promoted into a library-wide, cross-school rule (see `../sources.md` promotion rule).
- The derived/cached display-data pattern applies only when the derived payload *is* the behavior contract. If the cache merely stores an implementation detail behind a request endpoint, prefer an integration test for the endpoint plus a narrower cache-invalidation test only when invalidation is genuinely risky.
