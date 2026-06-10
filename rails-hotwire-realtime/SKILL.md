---
name: rails-hotwire-realtime
description: Apply Hotwire, Turbo, Stimulus, and ActionCable best practices for real-time Rails interfaces. Use when building Turbo Streams/Frames, Stimulus interactions, or websocket-driven updates.
---

# Rails Hotwire + Realtime

> Vendored from [marckohlbrugge/37signals-skills](https://github.com/marckohlbrugge/37signals-skills) @ c58e7d5 (skill text MIT; Fizzy code excerpts under the [O'Saasy license](https://osaasy.dev)). LLM-extracted from 265 Fizzy PRs + Campfire — verify unusual claims against the upstream guide's per-PR links.

Use for Turbo/Stimulus/ActionCable architecture and reviews. Patterns from Campfire (cable-heavy chat) and Fizzy (streams-only kanban).

## Choose the Right Realtime Architecture

Two proven 37signals topologies:

- **Streams-only (Fizzy):** no custom ActionCable channels at all. `turbo_stream_from`, `broadcasts_refreshes` + morph, lazy frames with ETags. Default to this for CRUD-ish apps.
- **Cable-augmented (Campfire):** custom channels only for lightweight JSON signals (presence, typing, unread pings) where rendering HTML server-side would be wasteful. Durable DOM state still goes through Turbo Streams.

Rule of thumb: Turbo Streams for anything that changes the DOM; bare ActionCable only for tiny ephemeral signals.

## Turbo Defaults

- Prefer server-rendered partial updates over heavy client-side state systems.
- Set global morph refresh in the layout: `turbo_refreshes_with method: :morph, scroll: :preserve`.
- Use Turbo Streams for targeted updates; one action can render a multi-target stream template that updates every affected region atomically (source column + destination + detail pane).
- Lazy-load expensive sections with `turbo_frame_tag ..., src:, loading: :lazy` and give the frame endpoint its own `fresh_when` ETag. Extract frequently-changing fragments into their own frames so they don't bust the parent cache.
- Use `data-turbo-permanent` for elements that must survive navigation/morph (footer trays, in-progress editors).
- Block morph from clobbering client-owned state (e.g. localStorage-driven collapsed columns) via `turbo:before-morph-attribute` + `preventDefault()`.
- Exempt realtime-heavy pages from Turbo's page cache (`turbo_exempts_page_from_cache`); rely on frame-level ETags instead.
- Optimistic UI without a JS framework: server-render a `<template>` partial with `$placeholder$` tokens; client clones it with a generated ID before submit; the stream response replaces it.

## Broadcast Patterns

- Keep broadcast logic on models (`Message::Broadcasts` concern with `broadcast_create`), not in controllers.
- Scope every stream name by tenant/user: `[board.account, :all_boards]`, `[user, :notifications]` — stream names are isolation boundaries.
- Dual streams when needed: `broadcasts_refreshes` for direct subscribers plus `broadcasts_refreshes_to ->(r) { [r.account, :aggregate_view] }` for account-wide views.
- Gate noisy secondary broadcasts on meaningful change: set a flag in `before_update` when preview-relevant fields change; broadcast `if: :preview_changed?`.
- Suppress broadcasts in background jobs that incidentally touch records (`Model.suppressing_turbo_broadcasts`), e.g. around ActiveStorage analysis.
- Fan-out efficiently: `render_to_string` once, then `broadcast_replace_to user, ..., html:` per recipient.
- Use `broadcast_*_later` async variants when synchronous broadcasting hurts request latency.
- Broadcast-rendered partials lack request context: wrap attachment/url helpers (`broadcast_image_tag` pattern) so URLs resolve.

## Reconnect & Catch-Up

- Catch-up over reload: on reconnect/tab-return, fetch a turbo-stream diff (`?since=<epoch_ms>`); server appends new records and replaces updated ones.
- An empty `HeartbeatChannel` gives reliable `connected`/`disconnected` callbacks for triggering catch-up and a debounced offline UI.
- Guard Stimulus `connect()` with a turbo-preview check so back/forward cache previews don't open sockets or request permissions.

## Stimulus Defaults

- Keep controllers single-purpose; compose multiple small controllers on one element.
- Prefer targets/values over ad-hoc selectors and attribute parsing.
- Always clean up timers/listeners/subscriptions in `disconnect`. For cable subscriptions, defer unsubscribe one animation frame and skip if the element reconnected (morph churn).
- Use event dispatch between controllers (or outlets) instead of tight coupling.
- For complex surfaces, compose `data-controller`/`data-action`/target wiring in Ruby helpers (`message_area_tag`) so views stay declarative and the contract lives in one place.
- Read page context from `<meta>` tags into a tiny `window.Current` object rather than inlining JSON.
- Will elements added later via broadcast get the behavior? Design controllers to handle dynamically-inserted children (e.g. `targetConnected` callbacks).

## Scroll & Interaction Contracts

- Preserve scroll declaratively: pass a custom attribute (`maintain_scroll: true`) on broadcasts and handle it once in a `turbo:before-stream-render` listener.
- Serialize competing scroll mutations through a promise queue when streams and optimistic inserts race.
- Strip a stream target's `id` on `turbo:submit-start` so background broadcasts can't race the form's own stream response.
- Infinite feeds: IntersectionObserver sentinels in turbo-stream pagination (remove trigger, append batch, append new sentinel); cap DOM size; only autoscroll when the user is at the latest page.

## ActionCable / Connection Safety

- Authenticate in `Connection#connect` with the same identity resolution as HTTP; scope channel subscriptions through ownership (`current_user.rooms.find_by(id: params[:room_id])`).
- Disconnect deactivated/banned users remotely: `ActionCable.server.remote_connections.where(current_user: user).disconnect`.
- Presence: reference-count connections with a TTL (`connections` counter + `connected_at`, 60s freshness scope) to survive multi-tab and reconnects; debounce visibility changes (~5s) to avoid flicker.
- Under path-based tenancy, emit the cable URL from `request.script_name` via a custom meta tag helper.

## Caching + Realtime

- Keep cache keys aligned with what affects output (record, user, timezone, filter state); use `touch: true` chains so child edits invalidate parents.
- Personalize cached fragments client-side: render `data-creator-id`, let a Stimulus controller compare against `Current.user` and toggle visibility — don't break fragment caching for per-user toggles.
- Avoid HTTP-caching form pages where token freshness is critical.

## Web Push (when applicable)

- Push only to disconnected users, excluding the actor; respect per-user involvement levels (everything vs mentions-only).
- Deliver via a thread pool with persistent HTTP connections, resolving all AR data before posting to threads; invalidate expired subscriptions async.
- Clean up the push subscription client-side on logout.

## Testing

- Model broadcasts: `assert_turbo_stream_broadcasts([user, :notifications], count: 1) { ... }` and `assert_no_turbo_stream_broadcasts` for negatives.
- Controller responses: `as: :turbo_stream` + `assert_turbo_stream action: :replace, target: dom_id(...)`.
- For DOM-level assertions on broadcasts, a small helper reading `ActionCable.server.pubsub.broadcasts` + `assert_select` covers it.
- System tests: `using_session("OtherUser")` for multi-user realtime, and wait for `turbo-cable-stream-source[connected]` before asserting.

## Red Flags

- Duplicate stream IDs/targets causing unstable updates.
- Broadcast channels or stream names that are not tenant/user-scoped.
- HTML rendering inside bare ActionCable channels (use Turbo Streams).
- Stimulus controllers leaking timers/listeners after navigation.
- Replacing full pages for small interactions that should be streamed.
- Custom ActionCable channels for things `turbo_stream_from` already does.
- Morph refreshes destroying in-progress user input (missing `data-turbo-permanent`).

## Related skills

- `rails-realtime` — the websocket layer at *scale* (connection avalanches, delivery guarantees, AnyCable). This skill is app-level Turbo/Stimulus patterns; that one is infrastructure reliability.
- `dhh-style` — school doctrine (Hotwire over JSON APIs).
