# Source Map

Use this map when updating Rails performance guidance.

## Primary Sources

- Nate Berkopec X feed: https://x.com/nateberkopec
- Speedshop: https://www.speedshop.co/
- The Complete Guide to Rails Performance landing page: https://www.railsspeed.com/
- Puma: https://github.com/puma/puma
- Rack: https://github.com/rack/rack
- Rails performance-related docs and changelogs: https://guides.rubyonrails.org/

## performance.dev (Dennis Brotzky) — perceived-speed equivalents, 2026-09

Reverse-engineering essays about React/TypeScript apps, folded into
[perceived-speed.md](perceived-speed.md) as Rails equivalents, never ported
literally. Fetched 2026-09-03 with `curl` (site is static HTML; text extracted
locally for quote verification). Site index and RSS confirmed four essays total.

- "How's Linear so fast? A technical breakdown" (2026-05-03). https://performance.dev/how-is-linear-so-fast-a-technical-breakdown
- "The Conductor Rewrite: What They Changed to Make It Fast" (2026-06-01). https://performance.dev/the-conductor-rewrite
- "Reverse Engineering ChatGPT Web: How OpenAI Built for a Billion Users" (2026-07-02). https://performance.dev/chatgpt
- "Wealthsimple: one year post-acquisition" (2026-09-03). https://performance.dev/wealthsimple-year-one

Rails mechanisms cited in that file were checked against primary docs on the same date:

- Turbo handbook, Drive (prefetch default/delay, `data-turbo-preload`, cache/preview, `data-turbo-track`, view transitions): https://turbo.hotwired.dev/handbook/drive
- Turbo handbook, Page Refreshes (morph/scroll meta, `data-turbo-permanent`, frame `refresh="morph"`): https://turbo.hotwired.dev/handbook/page_refreshes
- turbo-rails `Turbo::DriveHelper` (`turbo_refreshes_with`, `turbo_exempts_page_from_cache/preview`, `turbo_page_requires_reload`): https://github.com/hotwired/turbo-rails/blob/main/app/helpers/turbo/drive_helper.rb
- importmap-rails README (`modulepreload` default, `preload:` option, vendored pins, no build step): https://github.com/rails/importmap-rails
- stimulus-rails README (`eagerLoadControllersFrom` vs `lazyLoadControllersFrom`): https://github.com/hotwired/stimulus-rails
- Stimulus actions reference (KeyboardEvent filters, `@window`/`@document`): https://stimulus.hotwired.dev/reference/actions
- Rails API `ActionController::AllowBrowser` (`versions: :modern` browser list, 406 behavior): https://api.rubyonrails.org/classes/ActionController/AllowBrowser/ClassMethods.html
- Rails API `ActionController::RateLimiting` (`rate_limit` options, 429 default): https://api.rubyonrails.org/classes/ActionController/RateLimiting/ClassMethods.html
- Rails API `AssetTagHelper#preload_link_tag` (font `crossorigin` default): https://api.rubyonrails.org/classes/ActionView/Helpers/AssetTagHelper.html
- Active Storage guide (redirect vs proxy mode, CDN, `public: true`): https://guides.rubyonrails.org/active_storage_overview.html
- Flipper optimization docs (per-request preload + memoization defaults): https://www.flippercloud.io/docs/optimization
- rails/rails PR #50528 (default `app/views/pwa` manifest + service worker): https://github.com/rails/rails/pull/50528

## Discovery Sources

- Public Speedshop articles and talks
- Rails/Ruby conference pages with Nate Berkopec talks
- Puma, Rack, and Rails issues or PRs linked from primary sources
- Public workshop notes or summaries that link back to Speedshop/RailsSpeed

Treat paid book or course material as attribution and context only unless the
user has provided local authorized access for the current task. Do not store or
commit book/course excerpts, full transcripts, or copied workshop material.

## Update Discipline

- Prefer public primary sources, official docs, source code, and talks with
  captions/transcripts.
- Extract concise, durable performance rules; avoid copying long examples.
- Keep measurement-first guidance ahead of tool-specific advice.
- Record whether video-derived guidance came from transcript, captions, notes,
  or summary.
- Validate with `git diff --check` before committing skill edits.
