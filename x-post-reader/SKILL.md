---
name: x-post-reader
description: "Reads public X (Twitter) posts without authentication — single tweets, a user's recent timeline, a user's top ~100 tweets (syndication endpoint), or topical tweets from an account. Use when the user pastes an x.com/twitter.com status URL or asks to read, summarize, or find a user's tweets or best tweets. For authenticated X API operations (mentions, followers, search), use x-api instead (needs X_BEARER_TOKEN; if not installed, say authenticated ops unavailable). Triggers: tweet URL, x.com, what has @handle posted, top tweets."
---

# X Post Reader: Fetch a public tweet via VxTwitter

## When to use

Use this skill any time you encounter a public X/Twitter status URL, e.g.:

- `https://x.com/{handle}/status/{tweet_id}`
- `https://twitter.com/{handle}/status/{tweet_id}`
- `https://x.com/{handle}/status/{tweet_id}?s=20` (query params are fine — strip them)

Triggers include: "read this tweet", "what does this post say", "summarize this thread", "draft a reply to this", "quote tweet this", or any pasted status URL.

Do NOT scrape x.com directly — it requires JS and login walls. Use VxTwitter's JSON endpoint instead.

## How to fetch

Swap the host for `api.vxtwitter.com` and keep the `/{handle}/status/{tweet_id}` path:

```bash
curl -sS "https://api.vxtwitter.com/{handle}/status/{tweet_id}"
```

No auth header. No bearer token. Works for any public post.

### Example

```bash
curl -sS "https://api.vxtwitter.com/jack/status/20"
```

Returns JSON like:

```json
{
  "text": "just setting up my twttr",
  "user_name": "jack",
  "user_screen_name": "jack",
  "date": "Tue Mar 21 20:50:14 +0000 2006",
  "likes": 309499,
  "retweets": 126335,
  "replies": 17881,
  "hasMedia": false,
  "mediaURLs": [],
  "media_extended": [],
  "qrt": null,
  "replyingTo": null,
  "communityNote": null,
  "lang": "en",
  "tweetURL": "https://twitter.com/jack/status/20"
}
```

## Key fields

| Field | What it gives you |
|---|---|
| `text` | The post body. This is what you usually want. |
| `user_name` / `user_screen_name` | Display name / @handle |
| `date` | Human-readable timestamp |
| `likes` / `retweets` / `replies` | Public metrics |
| `hasMedia` / `mediaURLs` / `media_extended` | Image/video URLs if attached |
| `qrt` | If this post quote-tweets another, the quoted post is nested here as a full tweet object |
| `replyingTo` / `replyingToID` | If this is a reply, the parent's handle and ID |
| `communityNote` | Community Note text if one is attached |
| `article` | Long-form article body (X Articles), if any |
| `pollData` | Poll options and vote counts, if any |

## Tips

- **Quote tweets**: check `qrt`. If non-null, you have a quote tweet — read both `text` (the wrapper) and `qrt.text` (the quoted post) to understand the full meaning. Don't summarize a QT without the quoted content.
- **Threads**: VxTwitter returns a single post, not the full thread. If the user wants a thread, fetch the root post, then walk replies via the `x-api` skill if installed (`conversation_id` search) — otherwise ask the user for each URL in the chain.
- **Replies**: if `replyingTo` is set, the post may not make sense in isolation. Fetch the parent (`replyingToID`) for context before drafting your own reply.
- **Media**: `media_extended` has richer info (type, dimensions, video bitrates) than `mediaURLs`. For images you can `curl -O` directly; for video, pick the highest-bitrate variant from `media_extended[].variants`.
- **Long posts**: VxTwitter returns the full text for long-form posts — no `note_tweet` flag needed (unlike the official API).
- **Deleted/protected posts**: a 404 or error response means the post is gone, private, or the handle/ID is wrong. Tell the user; don't guess at the contents.
- **URL parsing**: handle is the segment after the host; tweet ID is the segment after `/status/`. Strip query strings, fragments, and trailing slashes before constructing the API URL.

## Browsing a user's tweets (no auth)

VxTwitter and FxTwitter only do single posts and profile metadata — they do **not** expose user timelines. Use one of these two paths instead.

### Path A — Recent posts (last ~20): Nitter RSS

Best for "what has @handle been posting lately" or "show me their last few tweets".

```bash
curl -sS -A "Mozilla/5.0" "https://nitter.net/{handle}/rss"
```

Returns an RSS feed where each `<item>` has:
- `<title>` — full post text (long posts included)
- `<link>` — `https://nitter.net/{handle}/status/{tweet_id}#m` (extract the ID)
- `<pubDate>` — RFC-822 timestamp
- `<dc:creator>` — author handle (matches retweets vs originals)

**Coverage**: ~20 most recent posts, typically the last few weeks for an active account. No pagination.

**Mirror health** (re-tested June 2026): `nitter.net` was returning 502s for days. `xcancel.com/{handle}/rss` redirects to `rss.xcancel.com`, which requires emailing them to whitelist your reader. `nitter.poast.org`, `nitter.tiekoetter.com`, and `nitter.privacyredirect.com` front with Anubis bot-checks (JS proof-of-work — curl gets a "Making sure you're not a bot!" page). If `nitter.net` returns 5xx, try once more after a moment, then fall back to Path C (syndication) or Path B (search).

To extract tweet IDs from the feed:

```bash
curl -sS -A "Mozilla/5.0" "https://nitter.net/{handle}/rss" \
  | grep -oE 'status/[0-9]+' | sort -u
```

Then enrich any post you want full structured data for (metrics, media, qrt, etc.) by feeding the ID through the VxTwitter pattern at the top of this skill.

### Path B — Older or topical tweets: Google site search

Best for "find tweets from @handle about {topic}" — Nitter only sees the recent window, but Google has years of indexed posts.

Use the WebSearch tool with this query shape:

```
{handle} {topic keywords} site:x.com
```

Concrete example for the user's "PixelJanitor shadows" case:

```
PixelJanitor shadows site:x.com
```

Notes:
- Use `site:x.com` (not `site:x.com/{handle}/status` — the narrower path returns no results).
- Results include profile pages, `/status/` URLs, and unrelated accounts with similar names — filter by URL prefix `https://x.com/{handle}/status/`.
- For each `/status/{id}` URL you find, fetch the full post via VxTwitter to get the actual text (Google snippets are often truncated or stale).

### Path C — Top ~100 tweets: Twitter's syndication endpoint

Best for "what are @handle's notable/best tweets" or as the timeline fallback when Nitter is down. This is the official embed-widget backend — no auth:

```bash
curl -sS -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" \
  "https://syndication.twitter.com/srv/timeline-profile/screen-name/{handle}" -o timeline.html
```

Returns a ~500KB HTML page with the timeline embedded as JSON. Extract it:

```bash
python3 - <<'EOF'
import re, json
html = open('timeline.html').read()
m = re.search(r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>', html, re.S)
entries = json.loads(m.group(1))['props']['pageProps']['timeline']['entries']
for e in entries:
    t = e.get('content', {}).get('tweet')
    if t:
        print(t['id_str'], t['created_at'], t['favorite_count'], t['full_text'][:200], sep=' | ')
EOF
```

Caveats (as of June 2026):
- Returns ~100 tweets sorted roughly by **engagement (top tweets), not recency** — the pinned tweet comes first. Good for finding someone's best content; it does NOT replace Path A for "what did they post this week."
- Each tweet object includes `full_text`, `favorite_count`, `in_reply_to_screen_name`, and nested `retweeted_status`/`quoted_status` — usually no VxTwitter enrichment needed.
- `cdn.syndication.twimg.com/timeline/profile?screen_name={handle}` (the older JSON variant) returns an empty 200 — use the `syndication.twitter.com` HTML endpoint above.
- A plain `curl/8.x` User-Agent may be rejected; send a browser UA.

### Recommended workflow for "find good detailed tweets from @handle about {topic}"

1. Pull `nitter.net/{handle}/rss` and scan the ~20 recent items by topic — fast, no rate limits.
2. Pull the syndication endpoint (Path C) for their ~100 top tweets — catches high-signal older posts that recency and search both miss.
3. If still thin, run `WebSearch` with `{handle} {topic} site:x.com` to surface historical posts.
4. Collect candidate tweet IDs from all sources.
5. For each candidate, `curl https://api.vxtwitter.com/{handle}/status/{id}` to confirm it's real, get the full text, metrics, media, and quote-tweet context.
6. Present the user a short ranked list with URL + 1-line summary + why it matched.

### Profile metadata

If you only need bio/follower counts/etc. (not posts), VxTwitter and FxTwitter both have user endpoints:

```bash
curl -sS "https://api.vxtwitter.com/{handle}"   # description, followers_count, location, ...
curl -sS "https://api.fxtwitter.com/{handle}"   # similar shape, slightly different fields
```

## When NOT to use this skill

- Authenticated search across all of X, fetching a user's mentions/followers/following, list members, or anything requiring auth → use the `x-api` skill (requires `X_BEARER_TOKEN`; if it's not installed, tell the user authenticated operations are unavailable).
- Going beyond ~20 recent posts AND beyond what Google has indexed → only the authenticated API can paginate a user's full timeline.
- Posting, liking, replying, or any write action → not supported by either skill.
