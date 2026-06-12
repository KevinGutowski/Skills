# HTTP Caching

## Contents
- Why HTTP caching matters
- Cache-Control directives
- ETags and revalidation
- Caching static assets
- Caching JSON APIs
- Minimizing churn

## Why HTTP Caching Matters

Network latency is governed by the speed of light. A packet takes at least 13ms from New York to Los Angeles. With DNS, TCP, and TLS overhead, a new HTTPS connection costs 150-300ms. The fastest request is one never made.

HTTP caching is most useful for:
- **Static assets** (JS, CSS, images, fonts) — your Rails server should serve each asset once, then let the CDN handle it
- **JSON APIs and AJAX endpoints** — revalidation can skip expensive DB queries
- **HTML documents** — limited by CSRF tokens, but possible for sessionless pages

## Cache-Control Directives

| Directive | Meaning |
|-----------|---------|
| `public` | CDNs and intermediate caches may store this |
| `private` | Only the end-user's browser may cache this (Rails default for controllers) |
| `max-age=N` | Cache is valid for N seconds from now |
| `no-cache` | Cache may store, but must revalidate with server on every use |
| `no-store` | No caching anywhere — use for sensitive data (passwords, payment info) |
| `must-revalidate` | After `max-age` expires, cache must revalidate (can't serve stale) |

**Common combinations:**

```
# Fingerprinted assets — cache forever
Cache-Control: public, max-age=31536000

# User-specific API response — revalidate every time
Cache-Control: private, no-cache

# Shared API response cached for 5 minutes
Cache-Control: public, max-age=300

# Sensitive data — never cache
Cache-Control: no-store
```

## ETags and Revalidation

When a cached resource expires, the browser sends a conditional request:

**With Last-Modified:**
```
Browser: GET /api/articles/1
         If-Modified-Since: Thu, 14 Jan 2024 18:09:41 GMT

Server: 304 Not Modified  (if unchanged — no body sent)
   or:  200 OK + full body (if changed)
```

**With ETags:**
```
Browser: GET /api/articles/1
         If-None-Match: "abc123"

Server: 304 Not Modified  (if ETag matches)
   or:  200 OK + full body (if ETag changed)
```

ETags are useful when "last modified" is unclear (dynamic pages). Rails uses Last-Modified for static assets by default.

## Caching Static Assets in Rails

Recommended setup: Rails serves assets, CDN caches them.

```ruby
# config/environments/production.rb
config.public_file_server.enabled = true
config.public_file_server.headers = {
  'Cache-Control' => 'public, max-age=31536000'
}
config.asset_host = 'https://cdn.example.com'
```

The Rails asset pipeline fingerprints filenames with a content digest. When the file changes, the filename changes, busting the cache automatically. This is why `max-age=31536000` (1 year) is safe.

## Caching JSON APIs

APIs don't have CSRF tokens, so HTTP caching works well.

### Prevent unnecessary DB queries

```ruby
class ArticlesController < ApplicationController
  def show
    @article = Article.find(params[:id])
    # Only runs full query if article changed since last request
    fresh_when last_modified: @article.updated_at
  end

  def index
    @articles = Article.published
    # Uses maximum updated_at across all articles
    fresh_when last_modified: @articles.maximum(:updated_at)
  end
end
```

### Use stale? for more control

```ruby
def show
  @article = Article.find(params[:id])
  if stale?(last_modified: @article.updated_at)
    render json: @article
  end
  # If not stale, Rails automatically returns 304
end
```

### Mark public for CDN caching

```ruby
# Rails marks controller responses as `private` by default
# Explicitly mark public if appropriate:
fresh_when @article, public: true
```

## Minimizing Churn

If one part of your JS/CSS changes constantly but another part (libraries) rarely changes, split them:

```ruby
# application.js — your app code (changes often)
# vendor.js — libraries (changes rarely)
```

This way, when you deploy, only `application.js` cache busts. Users keep `vendor.js` cached. More beneficial with HTTP/2 since multiple files don't incur connection overhead.

## CSRF and HTML Caching

Rails embeds a unique CSRF token in every HTML response:

```html
<meta name="csrf-token" content="Xc0vf6L7..." />
```

This makes HTML documents effectively uncacheable with standard HTTP caching. Workarounds exist (fetching CSRF token via AJAX, edge-side includes) but are rarely worth the complexity.

**Practical approach:** Use HTTP caching for assets and API responses. For HTML, use Rails fragment caching (Russian Doll) instead.

## Client Response Caches

Most Ruby HTTP clients do NOT have response caches. If you run an API, make sure clients actually use caching headers:

| Client | Has Response Cache? |
|--------|-------------------|
| Faraday + faraday-http-cache | Yes |
| Typhoeus | Yes (curl wrapper) |
| Net::HTTP | No |
| rest-client | No |
| HTTParty | No |

Browser AJAX requests use the browser's cache automatically.
