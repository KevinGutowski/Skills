# performance.dev Source Mining, 2026-09

## Scope

Ticket: "scan through https://performance.dev, check out all the articles and compare what the equivalents are for rails… look up equivalent best practices for rails and codify them." The site (Dennis Brotzky, ex-Fey, now Wealthsimple) had four essays as of 2026-09-03; the homepage and `feed.xml` were both enumerated to confirm there were no others. All four were fetched with `curl`, text-extracted locally, and read in full. Every article is about React/TypeScript apps, so the deliverable is an **equivalence map** into Rails/Hotwire mechanisms, each verified against primary docs, rather than a port.

## Source Manifest

| Source | Read | Density (for Rails) | Fold |
| --- | --- | --- | --- |
| https://performance.dev (index) + `/feed.xml` | Yes | n/a | Confirms four essays; author and stance recorded in `optimizing-rails/sources.md` |
| "How's Linear so fast? A technical breakdown" (2026-05-03) | Yes | High | Network-elimination rule, bundler arc → `allow_browser`/importmap, modulepreload, fonts, render-first/verify-later → Turbo cache, one-delta-one-cell → targeted streams, keyboard-first → Stimulus key filters, animation tokens → web-animation-design |
| "The Conductor Rewrite" (2026-06-01) | Yes | Medium | Bottleneck-moves audit shape, stable-identity → morph, chat virtualization exception, checkpoint-off-critical-path → `perform_later`, profile-the-real-path |
| "Reverse Engineering ChatGPT Web" (2026-07-02) | Yes | High | Constraints-first architecture picker, server-evaluated flags → Flipper in ERB, no-webfont, first-party origins, boot staged around the first input, non-virtualized list rationale, RUM marks, anonymous-surface defense → `rate_limit`, no service worker |
| "Wealthsimple: one year post-acquisition" (2026-09-03) | Yes | Medium-high | Waterfall/logo fix → N+1 + Active Storage proxy, font double-fetch → `preload_link_tag`, prefetch cache-key discipline → hover URL == click URL, remount bug → morph/stable ids, reserve heights/tabular nums, "hundreds of little decisions" tells list; org/AI-adoption material skipped |

Primary docs consulted to verify each Rails mechanism (URLs in `rails/references/optimizing-rails/sources.md`): Turbo handbook (Drive, Page Refreshes), turbo-rails `DriveHelper`, importmap-rails, stimulus-rails, Stimulus actions reference, Rails API (`allow_browser`, `rate_limit`, `preload_link_tag`), Active Storage guide, Flipper optimization docs, rails/rails PR #50528.

## Article → Rails equivalence map

This is the comparison the ticket asked for, in one place. "Owner" is where the rule now lives.

### Linear

| Linear technique | Rails equivalent | Owner |
| --- | --- | --- |
| Database in the browser (IndexedDB + MobX), custom sync engine | **No equivalent in any Rails school**; the essay itself says most apps don't need it. The felt-speed tier is reached with prefetch + morph + optimistic templates. | perceived-speed "What not to port" |
| Optimistic mutations (`issue.save()` queues, UI updates now) | Server-rendered `<template>` optimistic insert + Turbo Stream reconcile; `deliver_later`/`perform_later` for side effects | rails-hotwire-realtime, perceived-speed |
| Client-side rendering for a logged-in-all-day tool | Still Hotwire SSR; Inertia only for client-owned interaction state | perceived-speed architecture picker |
| Bundler arc: drop legacy browsers, native ESM, aggressive code splitting | `allow_browser versions: :modern` (Rails 7.2+) + importmap: no transpile, each pin/module is its own fingerprinted file | perceived-speed |
| `modulepreload` the critical import graph in `<head>` | `javascript_importmap_tags` emits modulepreload by default; `preload: false` + dynamic `import()` for heavy modules | perceived-speed |
| Service worker precaching ~1,200 assets for offline | Rails 8 PWA files exist; caching off by default; precache fingerprinted assets only if offline is a real story | perceived-speed "What not to port" |
| Per-package vendor chunks (one bump invalidates one chunk) | Same property for free with importmap; don't re-bundle into one `application.js` | perceived-speed |
| Variable font, `font-display: swap`, `crossorigin` on preload | `preload_link_tag` sets font `crossorigin` automatically on the fingerprinted path; or system font stack | perceived-speed, frontend-performance |
| Inlined app shell CSS + inline boot script for theme/sidebar | Server renders the shell; theme class from a cookie; inline only a few hundred bytes of shell CSS | perceived-speed |
| Render first, authenticate second (`localStorage.ApplicationStore` check) | Turbo Drive cached preview then fresh response; `turbo_exempts_page_from_preview`/`_from_cache` guards | perceived-speed, rails-hotwire-realtime |
| One delta, one cell (per-property observables) | Targeted `turbo_stream.replace dom_id(...)`/`morph`, broadcasts gated on meaningful change | rails-hotwire-realtime, perceived-speed |
| Every action has a shortcut; ⌘K palette on local data | Stimulus key filters + visible `<kbd>`; palette from pre-rendered actions or a fresh-when'd frame, never blocking on the network to open | perceived-speed, rails-hotwire-realtime |
| Composited-only animation, 0.1/0.25/0.35 s tokens, instant-in/150 ms-out | Not Rails-specific → corroboration added to `web-design` (web-animation-design) | web-animation-design |

### Conductor

| Conductor technique | Rails equivalent | Owner |
| --- | --- | --- |
| Local-first SQLite + Tauri shell, Bun runtime | Not a Rails web shape; noted as not-applicable | perceived-speed map |
| Shimming the Tauri bridge to profile in Chrome | Profile the real path: rack-mini-profiler for admins, local `PROFILE` mode | perceived-speed "Measure", measurement-and-profiling |
| react-router → TanStack Router for stable references (no cascade re-renders) | Morph refreshes + stable `dom_id`s + `data-turbo-permanent` | rails-hotwire-realtime |
| Virtualized chat with memoized rows | The one place virtualization wins (unbounded streaming lists); default stays pagination + capped feed | perceived-speed "Lists" |
| Idle agent-process reclaim, `--resume` | Desktop concern; principle maps to job-process memory sizing | memory-management (no edit) |
| Checkpoint (`git add -A`) moved off the critical path | Anything past the response → `perform_later`; the 150%-of-average rule | backgrounding, perceived-speed |
| "The bottleneck never disappears, it just moves" | Re-profile after each fix; audit shape | perceived-speed "What not to port" |

### ChatGPT

| ChatGPT technique | Rails equivalent | Owner |
| --- | --- | --- |
| Constraints first: anonymous global audience → streaming SSR | Default Hotwire SSR; `render stream: true` only for slow landing pages; auth-free, cacheable logged-out surface | perceived-speed architecture picker |
| Next.js → Remix → React Router 7 ("many of you just need an SPA") | "Many of you just need Hotwire": no framework migration story to port | perceived-speed |
| Inline theme script before paint | Cookie/user preference rendered into `<html class>` server-side | perceived-speed |
| `performance.mark`-style HTML-start/first-frame timestamps for every user | `performance.mark` in `<head>` + `sendBeacon` RUM endpoint; per-route first-frame p75 next to server p95 | perceived-speed "Measure" |
| Server dictates a per-user prefetch plan in loader data | Server-rendered `data-turbo-preload`/prefetch attributes decided per user in ERB | perceived-speed (implicit in preload rules) |
| Anonymous backend surface with real anonymous IDs | Signed-cookie anonymous id as `rate_limit by:` key and Flipper actor | perceived-speed "Letting strangers in" |
| Tailwind over CSS-in-JS for SSR; route-split CSS; token variables | House style already: vanilla CSS with `@layer` and OKLCH tokens (dhh-style/frontend); no change needed | dhh-style/frontend (no edit) |
| No webfont; system stack | Already the 37signals default; cited | perceived-speed |
| Radix primitives / ProseMirror composer hydrating over a static placeholder | Render the plain input first; Action Text/Lexxy upgrades it | perceived-speed "First paint" |
| Message list deliberately not virtualized (find-in-page, a11y) | Default rule: paginate and cap DOM, don't virtualize | perceived-speed "Lists" |
| Boot staged around "can you type yet?" (`deferStartupImportsUntilComposerTTFI`) | First input in the initial HTML; `lazyLoadControllersFrom`; `preload: false` on non-first-screen pins | perceived-speed |
| Everything first-party (`chatgpt.com/cdn/assets`), 30-day cache | Vendored importmap pins, self-hosted fonts, `asset_host` on your own CDN | perceived-speed, frontend-performance |
| No service worker; deploys constantly | Leave Rails 8 service worker caching off unless offline is real | perceived-speed |
| 556 server-evaluated flags inlined; hashed names; first-party experiment logging; flags on the loading strategy itself | Flipper evaluated in ERB with preload/memoize; unreleased markup omitted (not CSS-hidden); own logging endpoint; loading-strategy changes behind percentage rollouts compared via RUM | perceived-speed |
| Cloudflare PoW + Sentinel sandboxed iframe; prepaid `chat-requirements` handshake | `rate_limit` (Rails 7.2+), edge bot defense, prepay checks on focus/first keystroke | perceived-speed |
| SSE over POST fetch for tokens | Turbo Streams broadcast from a job, or `ActionController::Live`; guarantees in rails-realtime | rails-realtime (no edit) |
| ChatGPT vs Claude: strategy readable from the network tab | Reinforces the architecture picker; no separate rule | — |

### Wealthsimple

| Wealthsimple technique | Rails equivalent | Owner |
| --- | --- | --- |
| Angular shell removed route by route, never big-bang | Same methodology for a legacy SPA shell inside Rails; pointer to rails-upgrades | perceived-speed architecture picker |
| Merge-to-main deploys, dogfooding, POC-sets-the-bar, AI-agent throughput | Org/process material; already owned by `design-craft` (linear-product-craft), `shape-up`, `working-with-ai`; **skipped** here | — |
| Logo waterfall (one GraphQL query per row) → URL stitched into the first response; SVG on a guessable first-party URL | N+1 fixes; no lazy frame per row; Active Storage proxy/public URLs; first-party CDN | perceived-speed, activerecord-performance |
| Paint final layout from local knowledge: cached avatar initial, real skeleton row counts, reserved chart heights, tabular numerals | SSR renders real rows (no skeleton guessing); size lazy-frame placeholders; `tabular-nums` for live numbers | perceived-speed "Lists" |
| Font double-fetch from `?v=N` vs preload URL mismatch → content hashing | `preload_link_tag` + matching `asset_path` in `@font-face` | perceived-speed |
| Prefetch on hover with identical cache keys ("one extra variable and the cache never hits") | Turbo prefetch keyed by URL: hover `href` must equal click `href` | perceived-speed, rails-hotwire-realtime |
| Route remount from unstable JSX shape → single stable shape reading a prefetch cache | Morph refreshes, stable `dom_id`s, `data-turbo-permanent` | rails-hotwire-realtime |
| Mint design system, AI-first primitives | `design-systems` territory; not a Rails performance rule; **skipped** | — |
| "Hundreds of little decisions"; broken-windows; the tells list | Rails review-tell list (custom actions, `.each` in views, lazy frames in collections, redirect-mode attachments, incomplete cache keys, hover/click URL drift, font URL mismatch, API calls in callbacks, CSS-hidden flags, new third-party origins) | perceived-speed "the tells" |

## Fold map

- **New:** `rails/references/optimizing-rails/perceived-speed.md` — the playbook: architecture picker, technique → Rails map, and sections for request elimination, boot, navigation, mutations, granular updates, lists, keyboard-first input, measurement, anonymous surfaces, review tells, and what not to port. Verified-mechanism staleness note at the end.
- `rails/references/optimizing-rails.md` — scope sources/triggers, Contents, a "Perceived Speed" section with the felt-speed failure → Rails move table, related-skill link to `web-design` (web-performance).
- `rails/references/optimizing-rails/checklist.md` — items 69–80.
- `rails/references/optimizing-rails/sources.md` — performance.dev section with the four URLs, fetch method, and the twelve primary-doc URLs used for verification.
- `rails/references/rails-hotwire-realtime.md` — "Instant-feel additions" section (prefetch discipline, preload, preview guards, virtualization rule, key filters, optimistic revert), marked as a library addition, not vendored content.
- `rails/SKILL.md` — optimizing-rails bullet now names the second-hop members (including perceived-speed) and the boundary line routes felt speed vs request tuning.
- `web-design/references/web-animation-design.md` — Linear timing tokens and asymmetric enter/exit as field corroboration under Duration rules.
- `web-design/references/web-performance.md` + `web-performance/sources.md` — constraints-first architecture rule, with the Rails pointer.

Follow-up pass (same day, after review):

- Checklist items 69–80 carry stable `ps-…` names; `perceived-speed.md` tells section says to cite them.
- `docs/application-fixtures-2026-07.md` gained A03 (Rails felt-speed diagnosis) and `scripts/check_application_fixtures.py` expects it.
- `interface-review` routes Rails/Hotwire interfaces to `rails` (optimizing-rails, perceived-speed) as domain 9.
- `rails/references/coverage-gaps.md` records the single-source caveat and the corroborators to look for before promotion.
- README `rails` row and `docs/agent-quickstart.md` name the perceived-speed playbook.
- Routing probe (one fresh descriptions-only judge, 6 probes): three Rails felt-speed prompts → `rails`; Next.js INP → `web-design`; Sidekiq autoscaling → `rails`; dropdown easing → `motion`. 6/6, no description edit needed.

## Parked or skipped

- Sync engine internals, Linear's data-level lazy hydration (Issue/Comment tables), and CRDT collaboration: no Rails school owns them; revisit only if the library adds a local-first school with a second source.
- Conductor's Tauri/Electron, Bun/Node, and process-reclaim material: desktop app concerns.
- ChatGPT's Sentinel/Cloudflare challenge internals, Statsig acquisition history, and the Next.js → Remix → RR7 timeline: context, not rules.
- Wealthsimple's org story (acquisition, POC-as-blueprint, Mint design system, AI-agent throughput curves): already covered by `design-craft`, `shape-up`, `design-systems`, `working-with-ai`; no new delta strong enough to fold from a single memoir post.
- Numeric claims (500–800 ms per click, 59% first-paint drop, 21 MB of JS, 377 KB flag payload) are quoted with attribution only; none were measured on a Rails app.
- No routing probes run: the `rails` description was not edited (it already names performance, and every probe phrasing for this material contains "Rails"); the fold is body/reference-level plus a SKILL.md topic-line edit, which is the "parent SKILL.md body edit" gate (validator + first-120-lines read).

## Coverage check

- Read: all four essays in full, the site index, and the RSS feed. Verified: 44 quotes via `scripts/verify_quotes.py` against the local extractions; 12 primary-doc pages for the Rails mechanisms.
- Skipped: image/video captions (visual demos only), the newsletter/subscribe surface, the author's X profile.
- Changed: `rails` (optimizing-rails router, perceived-speed, checklist, sources, rails-hotwire-realtime, SKILL.md), `web-design` (web-animation-design, web-performance, its sources).
- Parked: listed above.
