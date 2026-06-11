---
name: rails-security-multitenancy
description: "Secure multi-tenant Rails apps — tenant-scoped queries everywhere, SSRF defenses for user-supplied URLs, rate limiting, tenant-scoped realtime broadcasts, authorization boundaries. Use when implementing auth, tenant isolation, security-sensitive endpoints, or reviewing for cross-tenant leaks. Database-per-tenant architecture lives in dhh-style. Triggers: multi-tenant, tenant scoping, SSRF, rate limiting, cross-tenant leak, authorization boundary, current tenant."
---

# Rails Security + Multi-Tenancy

> Vendored from [marckohlbrugge/37signals-skills](https://github.com/marckohlbrugge/37signals-skills) @ c58e7d5 (skill text MIT; Fizzy code excerpts under the [O'Saasy license](https://osaasy.dev)). LLM-extracted from 265 Fizzy PRs + Campfire — verify unusual claims against the upstream guide's per-PR links.

Use for security-sensitive Rails work and tenant-boundary reviews. Patterns from Fizzy (path-based multi-tenant SaaS) and Campfire (single-tenant, bot APIs).

## Core Rules

- Scope all tenant data access through tenant/user ownership boundaries.
- Never trust naked `Model.find(params[:id])` in tenant-aware flows.
- Scope realtime broadcasts and stream names by tenant/account.
- Rate-limit auth and abuse-prone endpoints.
- Treat user-provided URLs as untrusted input.
- Fail closed (`head :forbidden`) when access cannot be proven.

## Tenancy Architecture (path-based, Fizzy-style)

- Middleware extracts the account prefix from `PATH_INFO` into `SCRIPT_NAME`, loads the account, and wraps the request in `Current.with_account(account)`. URL helpers stay tenant-correct automatically (including ActiveStorage and webhook payload URLs via `script_name:`).
- **Three-layer auth: Identity → Session → account-scoped User.** Sessions attach to an `Identity`; each request resolves `Current.user = identity.users.find_by(account: Current.account)`. A valid session in account A can never act in account B. Apply the same resolution in ActionCable `Connection#connect`.
- `Current` setters cascade: assigning `session` resolves `identity`, assigning `identity` resolves `user` for the current account.
- Auth routes (login, signup, magic links) explicitly opt out of tenancy (`disallow_account_scope`) and redirect away from tenant-prefixed URLs.
- Path-scope session cookies (`path: account.slug`) when simultaneous multi-tenant login is supported.
- Recurring jobs run outside request context: iterate tenants explicitly (`with_each_tenant`). Serialize `Current.account` into job payloads (see rails-jobs).
- Test the tenancy middleware in isolation with `Rack::MockRequest`; integration tests set `default_url_options[:script_name]` from the fixture account.

## Scoped Lookups (defense in depth)

Params choose *which* record within an already-authorized set — never establish access:

```ruby
@card = Current.user.accessible_cards.find_by!(number: params[:card_id])   # access graph
@membership = Current.user.memberships.find_by!(room_id: params[:room_id]) # join model
@user = Current.account.users.find(params[:user_id])                       # tenant association
```

- Even single-tenant code scopes through associations; wrong IDs 404 naturally.
- Public sharing uses opaque tokens (`has_secure_token :key` on a `Publication` record), never internal IDs.
- ActiveStorage: attach blobs to accounts, and authorize blob/representation controllers through the domain (`blob → attachment → record.accessible_to?(user)`); published content gets an explicit `publicly_accessible?` path.
- Revoking access cleans up derived data (mentions, notifications, watches) via a scoped async job — don't leave dangling cross-boundary state.

## Authentication Hardening

- Magic links / codes: single-use (consume destroys the row), short-lived, compared with `secure_compare`, bound to the email via a verified pending-auth cookie.
- Anti-enumeration: unknown email gets the same fake flow/UX as a real one.
- API tokens: HTTP-method-scoped permissions (read-only tokens can't POST); show generated secrets once via a short-lived message verifier (~10s), then never again.
- Bot/automation auth as an explicit mode: skip CSRF only for bot-key auth, deny bots everywhere by default (`deny_bots` + `allow_bot_access only:`).
- Rate limit with Rails built-ins, with responses matching endpoint semantics:

```ruby
rate_limit to: 10, within: 15.minutes, only: :create,
  with: -> { redirect_to ..., alert: "Try again in 15 minutes." }
```

- Throttle session bookkeeping writes (update `last_active_at` at most hourly).
- Filter sensitive params beyond passwords: message bodies, push endpoints, tokens.

## SSRF Defense Baseline

For webhooks, push endpoints, unfurling — any user-influenced URL:

- Resolve DNS and validate the destination IP before the request; block loopback/private/link-local/IPv4-mapped-IPv6 ranges (link-local = cloud metadata).
- Pin the request to the validated IP (`Net::HTTP.new(host, port, ipaddr: resolved_ip)`) to beat DNS rebinding.
- Validate at creation time and again at execution time.
- Re-resolve and re-validate on every redirect hop — redirect chains are the classic bypass.
- Cap response sizes (content-length pre-check + chunked read limit) to prevent memory DoS.
- Layer allowlists on top where the destination set is known (web push: permitted vendor host suffixes AND public-IP resolution).

## CSRF and Caching

- Never HTTP-cache pages that render forms/CSRF tokens.
- Add `Sec-Fetch-Site` verification (`same-origin`/`same-site`) on top of origin checks; roll out in report-only mode first, and append `Sec-Fetch-Site` to the `Vary` header.
- Set a CSP with a hard floor (`object_src :none`, `base_uri :none`, `frame_ancestors :self`); use report-only + `report_uri` to validate before enforcing.
- Private apps: send `X-Robots-Tag: none`.

## Authorization Defaults

- Predicate methods on models (`card.editable_by?(user)`, `user.can_administer_board?(board)`); controllers check and `head :forbidden`.
- Declarative controller macros (`allow_unauthenticated_access`, `ensure_can_administer`) over scattered conditionals.
- Centralize shared guard logic in small concerns.

## Abuse Response

- Banning a user cascades: convert their session IPs to bans, disconnect ActionCable remotely, delete sessions, purge content async with UI broadcasts.
- Enforce IP bans only on mutating requests (POST/PUT/PATCH/DELETE).
- Validate ban targets are public IPs — never let loopback/private ranges be banned.
- Disconnect deactivated users: `ActionCable.server.remote_connections.where(current_user: user).disconnect(reconnect: false)`.

## Inbound Webhooks (receiving)

- Verify signatures (e.g. `Stripe::Webhook.construct_event`), then re-fetch canonical state from the source API rather than trusting payload contents/ordering.

## Red Flags

- Tenant-unscoped broadcast channels or stream names.
- Tenant data inferred from request params without ownership checks.
- A global `User` looked up by session without account scoping (identity/user conflation).
- Webhook or fetch requests to unvalidated destinations; redirects followed without re-validation.
- ActiveStorage URLs that bypass domain authorization.
- Security controls hidden in ad-hoc conditionals across controllers.
- Secrets permanently visible in admin UIs.
- Auth endpoints without rate limiting.

## Related skills

- `dhh-style` — school doctrine; its multi-tenancy section covers the database-per-tenant architecture this skill's path-based patterns sit beside.
- `rails-webhooks` — applies this SSRF baseline to outbound deliveries.
- `rails-realtime` — scale/reliability of the cable layer itself.
