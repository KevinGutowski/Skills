# Frontend Performance

## Contents
- The optimal head tag
- Async and defer
- Resource hints
- WebFonts
- Page weight and latency
- JavaScript performance
- HTTP/2

## Why This Matters

Backend optimization is pointless if the browser wastes 2 seconds downloading render-blocking scripts and waiting for font files. Frontend performance is dominated by latency, not bandwidth — setting up a new HTTPS connection costs 150-300ms in round-trips regardless of how fast your server is. The good news: most frontend wins are simple configuration changes, not rewrites.

## The Optimal Head Tag

Order matters. The browser parses the document top-down, and blocking resources halt rendering.

**Correct order:**
1. `<meta charset="utf-8">` — first, to avoid re-parsing
2. `<meta name="viewport">` — before any CSS, to avoid layout reflow
3. CSS `<link>` tags — before blocking JS
4. `<link rel="preconnect">` — for known external domains
5. `<link rel="preload">` — for critical fonts/resources
6. Blocking `<script>` tags (if absolutely necessary) — after CSS
7. `<script defer>` or `<script async>` — non-blocking

```html
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="/assets/application.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preload" href="/assets/critical-font.woff2" as="font" type="font/woff2" crossorigin>
  <script src="/assets/application.js" defer></script>
</head>
```

**Why CSS before JS:** If CSS appears after a blocking script tag, the browser can't use the styles until the script downloads and executes. This causes a flash of unstyled content.

## Async and Defer

| Attribute | Behavior |
|-----------|----------|
| (none) | Blocks parsing. Downloads, executes, then parser continues. |
| `async` | Downloads without blocking. Executes as soon as download completes (order not guaranteed). |
| `defer` | Downloads without blocking. Executes after parsing completes, in document order. |
| `async defer` | Use `async` where supported, `defer` as fallback for older browsers. |

**Rule:** Add `async defer` to every script tag that isn't required for initial page render. This is especially important for third-party trackers and analytics scripts.

**Caveat:** `async` scripts execute in download-completion order, not document order. If script B depends on script A, use `defer` (which preserves order) or concatenate them.

## Resource Hints

Resource hints tell the browser to prepare for future navigations or resource needs.

```html
<!-- Preconnect: DNS + TCP + TLS handshake for a domain you'll need soon -->
<link rel="preconnect" href="https://cdn.example.com">

<!-- DNS Prefetch: just DNS lookup (lighter than preconnect) -->
<link rel="dns-prefetch" href="https://analytics.example.com">

<!-- Preload: fetch a resource needed by the current page -->
<link rel="preload" href="hero.webp" as="image">

<!-- Prefetch: fetch a resource likely needed on the next page -->
<link rel="prefetch" href="/next-page-data.json">
```

**Preconnect** is the biggest win. Each new HTTPS connection costs ~150-300ms in round-trips (DNS + TCP + TLS). Preconnecting to CDN, font, and API domains saves that time.

## WebFonts

WebFonts are one of the most common causes of slow text rendering.

**Quick wins:**
1. **Use `font-display: swap`** — shows fallback font immediately, swaps when custom font loads
2. **Subset your fonts** — most users only need Latin characters. A full font file can be 200KB+; Latin-only subset is often <20KB
3. **Self-host fonts** — eliminates the DNS/connection overhead to Google Fonts
4. **Preload critical fonts** — `<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>`
5. **Use woff2 format** — best compression, supported everywhere modern

```css
@font-face {
  font-family: 'MyFont';
  src: url('myfont-latin.woff2') format('woff2');
  font-display: swap;
  unicode-range: U+0000-00FF; /* Latin only */
}
```

## Page Weight and Latency

**Bandwidth is not the problem. Latency is.**

Setting up a typical HTTPS connection involves ~5.5 round-trips. Even on a good connection, that's 150ms per new connection. On mobile, closer to 300ms.

HTML doesn't parallelize well by default. The parser stops at blocking scripts, and resources discovered late in the document open connections late in the page load.

**Solutions:**
1. Don't stop the parser (use `async`/`defer`)
2. Minimize new connections (concatenate assets, preconnect)
3. Use HTTP caching aggressively
4. Use resource hints to start connections early

## JavaScript Performance

### Common Rails anti-patterns

**The `$(document).ready()` pile-up:** Rails developers pile dozens of functions into `$(document).ready()`, executing on every page load. Use event delegation instead:

```javascript
// Bad: requires DOM ready, re-attaches on every page load
$("#myID").on("click", function() {...});

// Good: delegates to document, works with async scripts and Turbo
$(document).on("click", "#myID", function() {...});
```

**Too much JavaScript evaluation:** Browsers cache downloaded JS but must evaluate it on every page load. Minimize JS where possible.

**No DOM reuse:** Use Turbo or a SPA framework. Regular page navigation destroys the entire DOM, CSSOM, and JS VM. Turbo just replaces the `<body>` element.

### DOM size

Keep pages under ~5,000 DOM elements. Large DOMs make selectors slow and reflows expensive.

```javascript
// Check your page's element count
document.getElementsByTagName('*').length
```

## HTTP/2

HTTP/2 brings multiplexing (many requests over one connection), header compression, and server push.

**What it changes for Rails:**
- Domain sharding becomes unnecessary (multiplexing handles parallelism)
- Asset concatenation becomes less critical (but still useful for compression)
- You can split JS/CSS into more granular files without connection overhead

**Setup:** Use a CDN that supports HTTP/2 (Cloudflare, CloudFront). Set `config.asset_host` to your CDN. If using NGINX, version 1.9.5+ supports HTTP/2.

```ruby
# config/environments/production.rb
config.asset_host = 'https://cdn.example.com'
```
