# Rails Fixtures Testing Sources

This file records the source basis for `rails-fixtures-testing.md`.

## Primary sources

- `marckohlbrugge/37signals-skills` @ c58e7d5 — original 37signals/Fizzy-derived fixtures-school guidance vendored into this repository. Use for school-specific practice, then verify unusual claims against upstream PR links when needed.
- Rails Guide: [Testing Rails Applications](https://guides.rubyonrails.org/testing.html) — confirms Rails' default Minitest stack, Rails-specific assertions such as `assert_difference`, `assert_changes`, `assert_response`, and targeted `bin/rails test` usage by file, line, directory, or test name.
- Rails Guide: [Caching with Rails](https://guides.rubyonrails.org/caching_with_rails.html) — confirms cache keys/versions, `Rails.cache.fetch`, low-level cache key generation via `cache_key_with_version`, and `touch: true` invalidation across associated records.
- Minitest README: [minitest/minitest](https://github.com/minitest/minitest) — confirms the small assertion and mock/stub surface this fixtures-school reference assumes.

## Local promotion notes

- The coverage ownership heuristic is a local synthesis for vanilla Rails/Minitest review. It is aligned with Rails' layer-specific test classes and with the existing 37signals coverage budget, but should stay scoped to this fixtures-school reference.
- The derived/cached display-data pattern should be applied only when the derived payload is the behavior contract. If the cache stores an implementation detail behind a request endpoint, prefer an integration test for the endpoint plus a narrower cache invalidation test only when invalidation is risky.
