# Perceived Speed: the instant-feel playbook (Rails equivalents of the performance.dev breakdowns)

*Scope: make a Rails app feel instant — first paint, navigation, mutations, streaming, keyboard-first input — using the Rails/Hotwire equivalents of the techniques Dennis Brotzky documented in his performance.dev breakdowns of Linear, ChatGPT, Conductor, and Wealthsimple (2026). Use when someone says "make it feel like Linear," "why does every click show a spinner," "the first load is slow," or "we want instant navigation." Server-side request tuning stays in the sibling files; this file owns the felt-speed layer.*

**Source stance.** The four essays are one practitioner's reverse-engineering of React/TypeScript apps (Linear: custom sync engine + IndexedDB; ChatGPT: React Router 7 streaming SSR; Conductor: local-first Tauri desktop app; Wealthsimple: React monorepo migration). None of them is Rails. Every rule below is an **equivalent**, not a port: the underlying principle is quoted from the source, the mechanism is the Rails one, and each Rails mechanism was checked against the Turbo handbook, importmap-rails, stimulus-rails, the Rails API docs, and the Active Storage guide (see [sources.md](sources.md)). Where the source's technique has no sane Rails equivalent (a hand-rolled sync engine, a native shell), the table says so instead of inventing one.

## Contents

- The one rule underneath all four essays
- Start with the constraints (architecture picker)
- Technique → Rails equivalent map
- Eliminate the requests the user waits on
- First paint and boot
- Navigation that feels instant
- Mutations that don't wait for the network
- Granular updates: one delta, one cell
- Lists, virtualization, and DOM size
- Designed for speed: keyboard-first input
- Animations (route out)
- Measure the felt path
- Letting strangers in: anonymous surfaces
- Hundreds of little decisions: the tells
- What not to port
- Related references

## The one rule underneath all four essays

> "the secret to building incredible web apps is by hiding all the network requests from the user." (Linear breakdown)

> "The best network request is the one you never make." (ChatGPT breakdown)

Rails already sits on the right side of this rule more often than a CSR app does: the server renders real HTML, the session is checked in the same request that renders, and Turbo Drive reuses the document across navigations. The felt-speed failures in Rails apps are therefore rarely "we need a sync engine" and almost always **a request the user waits on that could have been folded into the first response, started earlier, or moved off the critical path.** Every section below is one of those three moves.

## Start with the constraints (architecture picker)

The ChatGPT essay opens with "the goal and the constraints… shape every downstream decision," and Linear is explicitly the counter-example: "Apps like Linear get away with CSR because their users log in once and live inside the app all day, but that approach doesn't fit OpenAI's goal." Decide the architecture from the constraint, then stop relitigating it.

| Constraint | Their answer | Rails answer |
|---|---|---|
| Anonymous first visit, unknown device, SEO matters (ChatGPT) | Streaming SSR shell, no auth round trip, no webfont | **Default Hotwire SSR.** Rails already renders the full document; add `render stream: true` only for landing pages with slow below-the-fold sections. Keep the logged-out surface auth-free and cache it (`fresh_when`, CDN). |
| Logged-in all day, dense tool, keyboard-first (Linear) | CSR + custom sync engine + IndexedDB | **Still Hotwire**, plus the navigation and mutation sections below (prefetch, preload, morph, optimistic templates, targeted streams). Escalate to [inertia-rails.md](../inertia-rails.md) only on the named pain of *client-owned interaction state* (drag/drop canvases, spreadsheet-like editing). A hand-rolled sync engine is outside every Rails school in this library. |
| Desktop tool over local data (Conductor) | Tauri + SQLite, no network at all | Not a Rails shape. If it must be Rails, run it as a local server with SQLite (Rails 8 defaults) and treat the browser as a thin client. |
| Large legacy frontend shell to unwind (Wealthsimple) | Route-by-route decoupling, never a big-bang | Same rule for a Rails app carrying a legacy SPA shell: migrate one route at a time behind flags; the methodology lives in [rails-upgrades.md](../rails-upgrades.md). |

**Rule:** pick from this table once per project and write the choice into the project's agent rules. "Which school" is the Rails router's job ([../dhh-style.md](../dhh-style.md) is the default); this table only answers "how much client-side machinery does felt speed justify," and the answer for most Rails apps is *none beyond Hotwire.*

## Technique → Rails equivalent map

Read the mechanism column as "what Rails already gives you, and the knob to turn." Details in the sections that follow.

| performance.dev technique | Seen in | Rails equivalent | Owner |
|---|---|---|---|
| Server-evaluated feature flags inlined in the document, never fetched on boot | ChatGPT | Flags evaluated in Ruby at render time (Flipper, preloaded + memoized per request); expose to JS only via `<meta>`/`window.Current`, never by fetching a flag table | this file |
| Theme/dark-mode class applied before first paint | ChatGPT, Linear | Read the preference from a cookie or the user record and render it into `<html class>` server-side; no inline script needed unless the page is CDN-cached | this file |
| Kill the per-row logo waterfall; return the URL in the first response | Wealthsimple | Fix N+1s (`includes`, `strict_loading`), never a lazy `turbo_frame` per row, Active Storage proxy/public URLs instead of redirect mode | [activerecord-performance.md](activerecord-performance.md) + this file |
| Everything first-party; no third-party origins | ChatGPT | Self-host fonts and JS (importmap downloads pins to `vendor/javascript`), `asset_host` on your own CDN | [frontend-performance.md](frontend-performance.md) |
| Drop legacy browsers: no polyfills, no transpile | Linear | `allow_browser versions: :modern` (Rails 7.2+) + importmap, no build step | this file |
| One chunk per npm package, cache-invalidated per library | Linear | importmap: every pin is its own fingerprinted file; bumping one pin busts one URL | this file |
| `modulepreload` the critical import graph in `<head>` | Linear, ChatGPT | `javascript_importmap_tags` emits `modulepreload` links by default; `pin ..., preload: false` + dynamic `import()` for the rest | this file |
| Defer everything behind "can you type yet?" | ChatGPT | `lazyLoadControllersFrom` for Stimulus, `preload: false` for heavy pins, composer/first input markup in the initial HTML | this file |
| Fonts: single variable woff2, `font-display: swap`, matching `crossorigin` on preload, content-hashed URL | Linear, Wealthsimple | `preload_link_tag` (adds `crossorigin="anonymous"` for fonts automatically) on a fingerprinted asset path; or the system font stack | [frontend-performance.md](frontend-performance.md) + this file |
| No webfont at all for UI text | ChatGPT | System font stack (already the 37signals house default) | [../dhh-style/frontend.md](../dhh-style/frontend.md) |
| Prefetch routes/data on hover | Wealthsimple, Linear | Turbo Drive prefetch on hover (on by default since Turbo 8, 100 ms delay), `data-turbo-preload` on the handful of destinations everyone visits next | this file |
| Render first, verify auth later / cached preview then reconcile | Linear | Turbo Drive cache: preview from cache, then the fresh response replaces it; `turbo_exempts_page_from_preview` where a stale preview misleads | this file |
| Stable element identity so navigation morphs instead of remounting | Wealthsimple (route remount bug), Conductor (stable refs) | `turbo_refreshes_with method: :morph, scroll: :preserve`, stable `dom_id`s, `data-turbo-permanent` for client-owned state | [../rails-hotwire-realtime.md](../rails-hotwire-realtime.md) |
| Optimistic mutations; server is a confirmation step, not a permission step | Linear | Server-rendered `<template>` optimistic insert + Turbo Stream reconcile; `broadcast_*_later`; `deliver_later` | [../rails-hotwire-realtime.md](../rails-hotwire-realtime.md) |
| Move the synchronous pre-step off the critical path (Conductor's `git add -A` checkpoint) | Conductor | Anything not needed for the response → `perform_later` before rendering; the 150%-of-average rule | [backgrounding.md](backgrounding.md) |
| Prepay expensive checks while the user is still typing | ChatGPT | Warm caches / create the parent record on focus or first keystroke via a Stimulus-triggered request; abuse checks and rate-limit lookups before submit, not during | this file |
| One delta re-renders one cell, never the list | Linear | Targeted `turbo_stream.replace`/`morph` on `dom_id(record)`; gate broadcasts on meaningful change | [../rails-hotwire-realtime.md](../rails-hotwire-realtime.md) |
| Virtualize the chat list (Conductor) vs. deliberately don't (ChatGPT) | both | Default: paginate + capped turbo-stream infinite feed; virtualization only with a measured DOM-size problem, because it costs find-in-page and accessibility | this file |
| Every action has a shortcut; ⌘K palette | Linear | Stimulus key filters (`keydown.meta+k@window->palette#open`), visible shortcut hints, palette backed by a fresh-when'd endpoint or a pre-rendered list | this file |
| Composited-only animations, sub-100 ms durations, instant-in/150 ms-out | Linear | Not Rails-specific; route to `web-design` (web-animation-design) | route out |
| Timestamp HTML-start and first frame for every user; feed RUM | ChatGPT | `performance.mark` in the layout + `sendBeacon` to a Rails endpoint or vendor RUM; segment by flag to A/B loading strategies | this file |
| Anonymous surface with real IDs for rate limits and experiments | ChatGPT | Cookie-issued anonymous id as the `rate_limit by:` key and the Flipper actor; Cloudflare/Turnstile in front | this file + [../rails-security-multitenancy.md](../rails-security-multitenancy.md) |
| Precache the whole app in a service worker for offline | Linear | Available (Rails 8 ships `app/views/pwa/service-worker.js`) but **not a default**; see What not to port | this file |
| Custom sync engine, browser-side database | Linear | No equivalent in any Rails school; if the pain is real the project has outgrown this library's Rails guidance | — |
| Native shell (Tauri vs Electron), Bun vs Node, idle-process reclaim | Conductor | Not applicable to Rails web apps; the *principle* ("memory management is a feature, not an afterthought" for spawned processes) maps to job-process sizing in [memory-management.md](memory-management.md) | — |

## Eliminate the requests the user waits on

**Waterfalls hide in three Rails places.** Wealthsimple's activity feed fetched one logo per row after the feed loaded; "a painful waterfall." The Rails versions:

1. **N+1 queries** — same shape, server-side. `includes`, `strict_loading_by_default` in development, `bullet`. Owner: [activerecord-performance.md](activerecord-performance.md).
2. **A lazy Turbo Frame per row.** `turbo_frame_tag ..., src:, loading: :lazy` is for *one* expensive region, not for each of 50 rows; per-row lazy frames are an HTTP N+1 that shows up as 50 spinners. Render rows inline; lazy-frame only the sidebar that costs more than the page.
3. **Active Storage redirect mode.** The default `url_for(blob)` route redirects to the service URL, which is a second request per image (the redirect has a 5-minute HTTP expiration). For images rendered in lists, switch to proxy mode (`config.active_storage.resolve_model_to_route = :rails_storage_proxy`, put the CDN in front — the proxy controller sets cache headers for it) or `public: true` services with direct URLs. Wealthsimple's fix was the same idea: a guessable, cacheable, first-party URL (`logos.wealthsimple.com/aapl-xnas.svg`) returned in the first response.

**Flags never cost a request.** ChatGPT inlines a server-evaluated snapshot so that "By the time React hydrates, every gate is already answered." Rails does this by construction — `Flipper.enabled?(:new_holdings, current_user)` runs in ERB — as long as the flag adapter is not hit per check: Flipper's Rails integration preloads and memoizes all features per request by default ("one adapter call per request"); keep `config.flipper.preload` on unless you have hundreds of features. Two ChatGPT details to copy: **hash or hide unreleased feature names** — in Rails that means wrapping the *markup* in the flag check so unreleased features never reach the response (not `display: none`), because Stimulus identifiers and `dom_id`s leak roadmaps; and **first-party experiment logging** (your own controller endpoint, not a third-party host that ad blockers strip).

**Theme without a flash.** Both Linear and ChatGPT run an inline script that reads `localStorage` before paint. Rails has a better move: the server knows. Store the preference in a cookie (or on the user) and render `<html class="<%= cookies[:theme] %>">`; there is nothing to flash. Fall back to `prefers-color-scheme` in CSS. Use the inline-script version only when the HTML itself is CDN-cached across users.

**Everything first-party.** ChatGPT serves every chunk, stylesheet, and font from its own origin behind Cloudflare because "every new origin is another source." importmap-rails downloads CDN pins into `vendor/javascript` and serves them through the asset pipeline; do that, self-host fonts, and set `asset_host` to a CDN in front of *your* origin, not to a third-party library CDN (checklist item 23).

## First paint and boot

**Drop legacy browsers on purpose.** Linear's biggest bundle win was "dropping legacy support… no polyfills, no ES5 transpilation, no nomodule fallback." Rails 7.2+ generates `allow_browser versions: :modern` in `ApplicationController`, which admits only browsers that natively support import maps, CSS nesting, `:has`, webp, and web push (Safari 17.2+, Chrome 120+, Firefox 121+, Opera 106+; agents without a user-agent header pass). Combined with importmap there is no build step to keep legacy-compatible. Subscribe to `browser_block.action_controller` to see who you're turning away before tightening.

**Per-package chunks for free.** Linear splits vendor code so that "Bumping a single dependency invalidates one chunk; the rest stay cached." An importmap app already has this: each `pin` is its own fingerprinted URL, and each of your own modules is its own file. Do not undo it by bundling everything into one `application.js`.

**Modulepreload the critical graph.**

> "Modulepreload is for what the app needs now, parallel-fetched so the browser never blocks on a serial import chain. The service worker is for what the app needs next." (Linear breakdown)

`javascript_importmap_tags` emits `<link rel="modulepreload">` for pinned modules by default, which is exactly Linear's head. The knob is the other direction: mark rarely-used heavy modules `pin "chart-lib", preload: false` and load them with `await import("chart-lib")` from the Stimulus controller that needs them.

**Stage the boot around the first input.** ChatGPT's boot is organized around a flag literally named `deferStartupImportsUntilComposerTTFI`: nothing non-essential loads before the composer is typeable. Rails equivalents, in order of leverage:

1. The first input is real server-rendered HTML in the initial response (a form, not a JS-mounted editor). Rich editors hydrate over a static placeholder (ChatGPT server-renders a "visually identical static placeholder" for ProseMirror) — with Action Text/Lexxy or Trix, render the plain textarea/`<div>` first and let the controller upgrade it.
2. `lazyLoadControllersFrom("controllers", application)` in `controllers/index.js` so controllers load "when their `data-controller` identifier is encountered in the DOM."
3. `preload: false` on everything the first screen doesn't touch.

**Inline only the shell CSS.** Linear inlines "just enough CSS to paint the loading state." In Rails the shell is already HTML; inline a `<style>` block only for the frame that must paint before `application.css` arrives (sidebar width, background), and keep it under a couple of KB. Do not inline the whole stylesheet — it defeats the fingerprinted, forever-cached asset.

**Fonts: the two bugs and the one helper.** Wealthsimple double-fetched every font because "the preload tag and the `@font-face` rule requested two different URLs," and Linear's breakdown flags the missing `crossorigin` on the preload as the other double-fetch. Rails' `preload_link_tag(asset_path("inter-variable.woff2"))` sets `as="font"` and `crossorigin="anonymous"` automatically for fonts and points at the fingerprinted URL — use it, and reference the same `asset_path` in `@font-face` (`font-url` in the pipeline) so both resolve to one URL. Or take ChatGPT's answer — "the fastest font is the one already installed on the device" — which is also the 37signals default. Full font rules: [frontend-performance.md](frontend-performance.md) and `web-design` (web-typography).

**Asset tracking.** `data-turbo-track="reload"` on the stylesheet/JS tags (the generator default) forces a full document load when a deploy changes assets, so Turbo never runs new HTML against a stale bundle.

## Navigation that feels instant

**Prefetch on hover is already on.** Turbo 8 prefetches links on hover after a 100 ms delay ("a speed bump of 500-800ms per click navigation"). Wealthsimple's lesson is the discipline around it, not the mechanism: "One extra variable on either side and the cache never hits." Turbo's prefetch is keyed by URL, so the hovered `href` must be byte-identical to the clicked one — no per-click cache-busting params, no `?t=` timestamps, no different `?page=` between the hover target and the form that submits. Disable it per link (`data-turbo-prefetch="false"`) for expensive or side-effectful GETs (exports, "mark all read" links that should be `button_to`), and page-wide with the `turbo-prefetch` meta if the app can't afford speculative requests.

**Preload the two or three pages everyone visits next.** `data-turbo-preload` fetches a page before the first visit "even before the first visit" so the preview renders instantly; it ignores cross-domain, frame-targeted, `data-turbo="false"`, and non-GET links. Wealthsimple's POC had a folder literally called `Prefetch` (`PrefetchApp`, `PrefetchSecurity`, `PrefetchOrderFlow`) and "made sure to have no loading states or skeletons." Preload the home/dashboard/inbox trio, not every nav item.

**Render from cache, verify in the background.** Linear's boot "isn't 'do you have a valid session.' It's 'do we have anything to show you.'" Turbo Drive's cache does the equivalent for navigation: on an application visit it "will render a preview of the page from cache immediately after the visit starts," then swaps in the fresh response; restoration visits (back/forward) render from cache with no request. Keep the cache honest: `turbo_exempts_page_from_preview` on pages whose stale preview would mislead (a form whose token or draft changed), `turbo_exempts_page_from_cache` on realtime-heavy pages that rely on frame ETags, and `turbo:before-cache` cleanup in controllers that leave transient UI open.

**Stable identity, not remounts.** Wealthsimple's worst invisible bug was "tearing down and rebuilding the entire route subtree" because the element type changed at the same position; Conductor's 50% win was stable references. The Turbo analog is morphing: `turbo_refreshes_with method: :morph, scroll: :preserve` in the layout so a refresh "will only update the DOM elements that have changed," stable `dom_id`s so the morph can match nodes, `data-turbo-permanent` for elements that own client state (open editors, scroll containers), and `turbo_frame_tag ..., refresh: "morph"` for frames that accumulate content (pagination). Full pattern list: [../rails-hotwire-realtime.md](../rails-hotwire-realtime.md).

**View transitions** are a one-liner (`<meta name="view-transition" content="same-origin">`; Turbo sets `data-turbo-visit-direction` for forward/back styling). Keep them to `opacity`/`transform` and under Linear's regular 250 ms token, or skip them — "Know when to hold back."

## Mutations that don't wait for the network

> "UI responsiveness should not depend on network latency." (Linear breakdown)

The Rails version is not a client store; it is a shorter critical path:

- **Optimistic insert without a framework.** The Fizzy pattern in [../rails-hotwire-realtime.md](../rails-hotwire-realtime.md): server-render a `<template>` with placeholder tokens, clone it client-side before submit, let the Turbo Stream response replace it. Linear's rollback rule applies: "If the server rejects, the observable reverts" — the stream's `remove`/`replace` on the temporary id is the revert.
- **Fire-and-forget the side effects.** `deliver_later`, `broadcast_*_later`, `perform_later` for anything past the redirect. Conductor found a synchronous `git add -A` "right between you and the response"; the fix was to "fire the snapshot in the background and let the agent respond immediately." Rails apps hide the same thing in `after_create` callbacks that call APIs. The threshold rule from [backgrounding.md](backgrounding.md): anything that talks to the network or exceeds ~150% of average response time leaves the request.
- **Prepay the checks.** ChatGPT runs its abuse-check handshake "while you're still typing, so that by the time you hit enter the bouncer has already checked your ID" — "do the expensive work early, hidden behind something the user is already doing." Rails moves: create the draft/parent record on first focus (a Stimulus `focus->draft#create` that POSTs once), warm the caches the submit will read, run the rate-limit lookup and CSRF-independent validations on a cheap pre-request rather than in the submit path.
- **Stream the first token.** For LLM or long-running responses, the only thing between Enter and the first byte should be the model: a job streams chunks via `Turbo::StreamsChannel.broadcast_append_to`, or `ActionController::Live` SSE for a single consumer. Ordering and reconnect guarantees are [../rails-realtime.md](../rails-realtime.md)'s problem.

**The fastest operation is the one the user never waits on.** (Conductor breakdown) — that sentence is the whole section.

## Granular updates: one delta, one cell

Linear's third pillar: "A change that updates one field of one issue re-renders exactly the components that read that field. Not the parent list, not the sidebar, one cell." Rails equivalents, from cheapest to broadest:

1. `turbo_stream.replace dom_id(record)` / `turbo_stream.morph` targeting the row, with the partial fragment-cached (`render partial:, collection:, cached: true`).
2. Multi-target stream templates when one action legitimately touches several regions (source column + destination + detail pane), rendered once, atomically.
3. `broadcasts_refreshes` + morph as the *fallback* for pages where diffing the whole body is cheaper than enumerating targets.

Gate secondary broadcasts on meaningful change (`if: :preview_changed?`) and suppress incidental broadcasts in jobs — "the cost of receiving updates scales with what changed, not with what's on screen."

## Lists, virtualization, and DOM size

Two sources disagree, and the disagreement is the rule. Conductor virtualizes its chat ("A 500-message session has maybe 15 message components in the DOM at any moment, not 500") because sessions are unbounded and stream. ChatGPT deliberately does not: "the message list is not virtualized… find-in-page needs to work for a billion people, and virtualization carries real complexity and accessibility costs."

Rails default: **paginate, and cap the DOM**, which is what the Fizzy/Campfire infinite-feed pattern already does (IntersectionObserver sentinel, append batch, remove trigger, cap DOM size, autoscroll only at the latest page). Reach for a client-side virtualizer only when you have measured a DOM-size problem (the ~5,000-element budget in [frontend-performance.md](frontend-performance.md)) *and* accepted losing find-in-page and native screen-reader traversal. Chat-shaped, streaming, unbounded lists are the one place the Conductor answer wins; everything else is the ChatGPT answer.

Also from Wealthsimple: reserve heights. "Charts reserve their loaded heights. Scrubbing values use tabular numerals so digits don't jitter." Lazy frames get a placeholder sized like the content; numbers that update live get `font-variant-numeric: tabular-nums`.

## Designed for speed: keyboard-first input

> "Engineering speed makes a single interaction fast. Design speed makes the path to each interaction short." (Linear breakdown)

Rails has no palette primitive, but Stimulus has the wiring:

- **Shortcuts with key filters.** `data-action="keydown.meta+k@window->palette#open keydown.esc->palette#close"`; single-letter filters (`keydown.c->issues#new`) for the most frequent actions, two-key sequences in a small controller. Stimulus supports `enter tab esc space up down left right home end page_up page_down [a-z] [0-9]` and `ctrl`/`meta`/`alt`/`shift` modifiers, with `@window`/`@document` for global listeners.
- **Show the shortcut** next to every action it triggers (a `<kbd>` in the menu item); Linear's are "visible everywhere," and every action also works with the mouse.
- **The palette.** Linear's is fast "because it's searching the local MobX object pool, not a server." The Rails equivalent is either (a) a pre-rendered list of navigation targets and actions in the initial HTML, filtered client-side, or (b) a Turbo Frame search endpoint with `fresh_when` and a short debounce, for data-backed results. Do (a) for actions and navigation, (b) for records. Never make the palette wait on the network to *open*.
- **Contextual commands** come for free from server rendering: the palette's action list is whatever the current page's helpers say the user can do.

## Animations (route out)

Linear's animation section is not Rails-specific: composited properties only ("Never animate those. I mean never." about `width`/`height`/`margin`), tokens of 0.1/0.25/0.35 s, and asymmetric timing ("appear instantly when you summon them, then fade out over 150ms"). Those values are corroborated in `web-design` (web-animation-design); apply them there. The Rails-side touch points are only: `@starting-style` and native CSS in the house style ([../dhh-style/frontend.md](../dhh-style/frontend.md)), the view-transition meta above, and *not* adding transitions to Turbo Stream inserts on busy lists ("There are no transitions on list items to keep things snappy").

## Measure the felt path

ChatGPT timestamps "the moment the HTML starts executing and the first frame after it, for every single user" — "You can't improve what you don't measure!" The server-side metrics in [measurement-and-profiling.md](measurement-and-profiling.md) never see this. Add:

```erb
<%# app/views/layouts/application.html.erb, first thing in <head> %>
<script>performance.mark("html-start")</script>
```

```javascript
// once, after boot: one beacon per page view
requestAnimationFrame(() => {
  performance.mark("first-frame")
  const nav = performance.getEntriesByType("navigation")[0]
  navigator.sendBeacon("/rum", JSON.stringify({
    ttfb: nav.responseStart, first_frame: performance.now(), path: location.pathname
  }))
})
```

Log the beacon through `ActiveSupport::Notifications`/your APM and watch p75 of first-frame by route, next to the server p95. Then do what ChatGPT does with `promoteCss`/`stripModulepreloadImports`: put loading-strategy changes (preload set, lazy vs eager controllers, morph vs replace) behind a Flipper percentage rollout and compare the RUM percentiles per cohort — the same A/B discipline the YJIT/GC section of [../optimizing-rails.md](../optimizing-rails.md) prescribes for the runtime. Vendor RUM (Datadog, Sentry) is fine; the rule is that *some* first-frame number exists per route.

Conductor's meta-lesson belongs here too: they could not profile React inside the Tauri webview, so they shimmed the bridge to run the real client in Chrome. "That's how the bottlenecks stopped being a guess." The Rails analog is `rack-mini-profiler` for admins in production and a `PROFILE=1` mode locally — profile the real path, never a reconstruction.

## Letting strangers in: anonymous surfaces

ChatGPT's open door works because "The open door isn't the absence of security. It's a frictionless door bolted onto one of the most aggressive bot-defense stacks on the consumer web, tuned so the cost falls on scripts and never on people." Any Rails endpoint that does expensive work for logged-out users (AI demos, search, share pages) needs the same three layers:

1. **An anonymous identity.** Issue a signed cookie id on first visit; anonymous visitors "get a real user ID so rate limits and experiments work without an account." Use it as the Flipper actor and as the rate-limit key.
2. **Rate limits in the controller.** `rate_limit to: 10, within: 3.minutes, by: -> { anonymous_id }, with: -> { head :too_many_requests }` (Rails 7.2+; backed by the cache store, so it needs a shared cache in production, and multiple limits per controller need `name:`).
3. **Edge defense** — Cloudflare bot management / Turnstile in front, and prepay the check on page load rather than on submit.

Tenant and auth boundaries stay in [../rails-security-multitenancy.md](../rails-security-multitenancy.md).

## Hundreds of little decisions: the tells

> "it's hundreds of little decisions done right. How you do anything is how you do everything." (Wealthsimple)

Brotzky's audit list — "URL design, API response bodies, schema design, waterfalls vs. parallel execution, caching strategies, pagination, error handling, retry logic, database queries, authentication, state management, component boundaries, prefetching, dependencies, logging, and validation" — as Rails review tells, in the order a reviewer can check them from a diff:

- URL that isn't a resource (custom actions instead of a new controller) → [../dhh-style/controllers.md](../dhh-style/controllers.md).
- A `.each` over an association inside a view → N+1.
- A lazy frame inside a collection partial → HTTP N+1.
- `url_for(attachment)` in a list → redirect-mode double request.
- Cache key that omits something the output depends on (user, timezone, filter) → stale or cache-miss-always.
- Hover target and click target differ by a query param → prefetch never hits.
- Font `@font-face` URL that doesn't match the preload URL → double download.
- `after_create` that calls an API → belongs in a job.
- A flag check that hides markup with CSS → roadmap leak and wasted render.
- New third-party asset origin → new DNS + TLS handshake per visitor.

"Individually these are small. Together they're the difference between an app that works and an app that feels considered."

When a review cites one of these, use the stable `ps-…` names from [checklist.md](checklist.md) items 69–80 (for example `ps-hover-url-equals-click-url`, `ps-no-lazy-frame-per-row`) so findings stay greppable across reviews and fixtures.

## What not to port

- **A sync engine / database in the browser.** Linear wrote it as "the first lines of code." No Rails school in this library owns it, and the essays themselves say "most people won't build a custom sync engine… and they don't need to." Optimistic templates + prefetch + morph get a Rails app to the felt-speed tier for CRUD-shaped tools.
- **Service-worker precache by default.** Linear precaches ~1,200 assets for offline; ChatGPT deliberately ships none: "a stale service worker is one of the few bugs that can outlive the fix you deploy for it," and "When your product is a network conversation, offline-first buys you complexity, not value." Rails 8 generates `app/views/pwa/service-worker.js` and `manifest.json.erb` (served through a built-in controller, ERB-capable). Leave the worker's caching logic off unless the product has a real offline story; if you enable it, precache only fingerprinted assets, never HTML.
- **A 377 KB inline bootstrap of every flag.** Rails evaluates flags server-side; the client needs at most the handful that change JS behavior, via `<meta>` tags.
- **Native shell, runtime swaps, process reclaim** (Conductor) — desktop concerns. The transferable principle is the audit shape: *the bottleneck never disappears, it just moves* — after fixing the network, re-profile, because the next slowest thing is now the slowest thing.

> **Staleness note:** mechanisms verified 2026-09 against the Turbo handbook (prefetch default and delay, `data-turbo-preload`, cache/preview, refresh method/scroll meta, view-transition meta), importmap-rails README (`modulepreload` default, `preload:` option, vendored pins), stimulus-rails README (`lazyLoadControllersFrom`), Stimulus actions reference (key filters), Rails API (`allow_browser`, `rate_limit`, `preload_link_tag` font `crossorigin`), Active Storage guide (proxy mode, `public: true`), Flipper optimization docs (preload/memoize defaults), and rails/rails PR #50528 (PWA files). Turbo prefetch/morph need Turbo 8+; `allow_browser`/`rate_limit` need Rails 7.2+; PWA files need Rails 8. The source essays are one author's reverse engineering of non-Rails apps — the *principles* are the durable layer, the numeric claims (500–800 ms per click, 59% first-paint drop) are theirs, not measurements of a Rails app.

## Related references

- [frontend-performance.md](frontend-performance.md) — head order, async/defer, resource hints, font mechanics, DOM budget. This file adds the boot staging, prefetch/preload, and identity rules on top.
- [../rails-hotwire-realtime.md](../rails-hotwire-realtime.md) — the Turbo/Stimulus building patterns (optimistic template, morph guards, infinite feeds, broadcast gating) this file keeps pointing at.
- [backgrounding.md](backgrounding.md) — the critical-path threshold and job design.
- [../rails-realtime.md](../rails-realtime.md) — streaming delivery guarantees.
- `web-design` (web-performance) — the browser-side budgets (6-frame instant rule, defer/anticipate/offload triage) that these techniques serve; `web-design` (web-animation-design) — the animation values.
- `design-craft` (linear-product-craft) — the quality-ritual side of "hundreds of little decisions"; this file owns the performance tells only.
