---
name: x-post-reader
description: "Reads public X (Twitter) posts without auth — single tweets, a user's timeline, top ~100 tweets, or topical tweets. Use when the user pastes an x.com/twitter.com status URL or asks for a user's tweets. For authenticated X API operations (mentions, followers, search), use the x-api skill, if installed (needs X_BEARER_TOKEN). Triggers: tweet URL, x.com, what has @handle posted, top tweets."
---

# X Post Reader: single posts, recent timeline, top tweets, and topical search — no auth

## When to use

Use this skill any time you encounter a public X/Twitter status URL, e.g.:

- `https://x.com/{handle}/status/{tweet_id}`
- `https://twitter.com/{handle}/status/{tweet_id}`
- `https://x.com/{handle}/status/{tweet_id}?s=20` (query params are fine — strip them)

Triggers include: "read this tweet", "what does this post say", "summarize this thread", "draft a reply to this", "quote tweet this", or any pasted status URL.

Do NOT scrape x.com directly — it requires JS and login walls. Use VxTwitter's JSON endpoint instead.

## Path health (probed 2026-11-12)

Probed with `curl --max-time 15` against `jack/status/20` and the `jack` profile, from a cloud sandbox. Results from a datacenter IP can differ from a residential one (rate limits, bot checks, regional blocks), so treat this as the order to try, not a guarantee. Re-probe and re-date this table when a path misbehaves.

| Path | Used for | Status 2026-11-12 | Verdict |
|---|---|---|---|
| `api.vxtwitter.com/{handle}/status/{id}` and `/{handle}` | single post, profile | `200` JSON with curl's default User-Agent; `403` Cloudflare "Just a moment..." challenge when a browser User-Agent is sent | Working — do not add `-A` |
| `api.fxtwitter.com/{handle}/status/{id}` and `/{handle}` | single post, profile (fallback) | `200` JSON with either User-Agent | Working |
| `syndication.twitter.com/srv/timeline-profile/screen-name/{handle}` | timeline, top ~100 | `200`, ~300KB HTML, 101 tweet entries, with either User-Agent. An earlier November probe from this sandbox returned `429` | Working, rate-limited at times — first choice for timelines |
| `cdn.syndication.twimg.com/timeline/profile?screen_name={handle}` | (old JSON variant) | empty `200` | Dead — do not use |
| Google `site:x.com` via WebSearch | older/topical posts | not re-probed (not a curl path) | Assume working |
| `nitter.net/{handle}/rss` | recent ~20 | `410 Gone`, empty body (was `502` in June) | Down |
| `xcancel.com/{handle}/rss` | recent ~20 | `451`, page titled "XCancel service is suspended." | Down |
| `nitter.tiekoetter.com/{handle}/rss` | recent ~20 | `200` but an Anubis bot-check page ("Making sure you're not a bot!"), not RSS | Unusable from scripts |
| `nitter.privacyredirect.com/{handle}/rss` | recent ~20 | `403` (`307` on one attempt) | Unusable |
| `nitter.poast.org/{handle}/rss` | recent ~20 | DNS does not resolve | Gone |

## How to fetch

Swap the host for `api.vxtwitter.com` and keep the `/{handle}/status/{tweet_id}` path:

```bash
curl -sS "https://api.vxtwitter.com/{handle}/status/{tweet_id}"
```

No auth header. No bearer token. Works for any public post. Leave curl's default User-Agent in place: on 2026-11-12 a browser User-Agent (`-A "Mozilla/5.0"`) got a `403` Cloudflare challenge page from VxTwitter while the default got `200`.

If VxTwitter errors, times out, or returns an HTML challenge page instead of JSON, swap the host to `api.fxtwitter.com` (same path shape, different field names: the post is nested under `tweet`, with `tweet.text`, `tweet.author.screen_name`, `tweet.created_at`, `tweet.likes`/`retweets`/`replies`, `tweet.community_note`, `tweet.replying_to`) before giving up.

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

VxTwitter and FxTwitter only do single posts and profile metadata — they do **not** expose user timelines. Use one of these three paths instead, in this order (see Path health for why).

### Path A — Top ~100 tweets: Twitter's syndication endpoint (try first)

Best for "what are @handle's notable/best tweets" and the only scriptable timeline path working as of 2026-11-12. This is the official embed-widget backend — no auth:

```bash
curl -sS -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" \
  "https://syndication.twitter.com/srv/timeline-profile/screen-name/{handle}" -o timeline.html
```

Returns a several-hundred-KB HTML page (~300KB on 2026-11-12, ~500KB in June) with the timeline embedded as JSON. Extract it:

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

Caveats (first noted June 2026; endpoint re-probed 2026-11-12):
- Returns ~100 tweets sorted roughly by **engagement (top tweets), not recency** — the pinned tweet comes first. Good for finding someone's best content; it does NOT answer "what did they post this week" on its own. Sort the entries by `created_at` to pull the recent ones out of the ~100; if the week's posts are not among them, use Path B, or Path C if a Nitter mirror has come back.
- Each tweet object includes `full_text`, `favorite_count`, `in_reply_to_screen_name`, and nested `retweeted_status`/`quoted_status` — usually no VxTwitter enrichment needed.
- `cdn.syndication.twimg.com/timeline/profile?screen_name={handle}` (the older JSON variant) returns an empty 200 — use the `syndication.twitter.com` HTML endpoint above.
- A plain `curl/8.x` User-Agent may be rejected; send a browser UA (on 2026-11-12 both were accepted). This is the opposite of VxTwitter, which rejects the browser UA.
- A `429` means the endpoint is rate-limiting this IP: wait and retry once, then fall to Path B rather than looping.

### Path B — Older or topical tweets: Google site search

Best for "find tweets from @handle about {topic}" — the syndication endpoint returns top tweets and Nitter only the recent window, but Google has years of indexed posts.

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

### Path C — Recent posts (last ~20): Nitter RSS (down as of 2026-11-12; opportunistic only)

Best for "what has @handle been posting lately" or "show me their last few tweets" — when a mirror is up. Check the Path health table before spending a request here.

```bash
curl -sS -A "Mozilla/5.0" "https://nitter.net/{handle}/rss"
```

Returns an RSS feed where each `<item>` has:
- `<title>` — full post text (long posts included)
- `<link>` — `https://nitter.net/{handle}/status/{tweet_id}#m` (extract the ID)
- `<pubDate>` — RFC-822 timestamp
- `<dc:creator>` — author handle (matches retweets vs originals)

**Coverage**: ~20 most recent posts, typically the last few weeks for an active account. No pagination.

**Mirror health** (re-probed 2026-11-12; full results in the Path health table above): every documented Nitter mirror failed. `nitter.net/{handle}/rss` returns `410 Gone` (it was `502 Bad Gateway` with body `stream reset by client (INTERNAL_ERROR)` on June 11, 2026). `xcancel.com/{handle}/rss` returns `451` with "XCancel service is suspended." (in June it served an RSS-shaped whitelist stub, "RSS reader not yet whitelisted"). `nitter.tiekoetter.com` fronts with an Anubis bot-check page ("Making sure you're not a bot!"), `nitter.privacyredirect.com` returns `403`, and `nitter.poast.org` no longer resolves. Probe `nitter.net` once with `--max-time 15`; if it returns 4xx/5xx or any mirror returns a bot-check/suspension page, stop trying Nitter for that run and use Path A (syndication) or Path B (search).

To extract tweet IDs from the feed:

```bash
curl -sS -A "Mozilla/5.0" "https://nitter.net/{handle}/rss" \
  | grep -oE 'status/[0-9]+' | sort -u
```

Then enrich any post you want full structured data for (metrics, media, qrt, etc.) by feeding the ID through the VxTwitter pattern at the top of this skill.

### Recommended workflow for "find good detailed tweets from @handle about {topic}"

1. Pull the syndication endpoint (Path A) for their ~100 top tweets — the path that is working as of 2026-11-12, and it catches high-signal older posts that recency and search both miss. On `429`, retry once, then go to step 2.
2. If still thin, run `WebSearch` with `{handle} {topic} site:x.com` (Path B) to surface historical posts.
3. Only if the user needs the last few weeks specifically and steps 1–2 did not cover them: probe Nitter RSS (Path C) once. Every mirror was down on 2026-11-12 (see Path health); if the response is not the user's timeline, stop rather than retrying.
4. Collect candidate tweet IDs from all sources.
5. For each candidate, `curl https://api.vxtwitter.com/{handle}/status/{id}` (default User-Agent; FxTwitter as fallback) to confirm it's real, get the full text, metrics, media, and quote-tweet context.
6. Present the user a short ranked list with URL + 1-line summary + why it matched.

### Profile metadata

If you only need bio/follower counts/etc. (not posts), VxTwitter and FxTwitter both have user endpoints:

```bash
curl -sS "https://api.vxtwitter.com/{handle}"   # description, followers_count, location, ...
curl -sS "https://api.fxtwitter.com/{handle}"   # similar shape, slightly different fields
```

## When NOT to use this skill

- Authenticated search across all of X, fetching a user's mentions/followers/following, list members, or anything requiring auth → use the `x-api` skill (requires `X_BEARER_TOKEN`; if it's not installed, tell the user authenticated operations are unavailable).
- Going beyond the ~100 top tweets and ~20 recent posts AND beyond what Google has indexed → only the authenticated API can paginate a user's full timeline.
- Posting, liking, replying, or any write action → not supported by either skill.
