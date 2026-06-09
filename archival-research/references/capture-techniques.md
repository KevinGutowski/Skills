# Capture techniques — worked procedures and code

Detailed mechanics referenced from `SKILL.md`. The discipline (provenance, auto vs. curated, read-it-yourself, never-invent-attributions) lives in `SKILL.md`; this file holds the how-to.

## Section-extraction pattern (for fan-wiki articles)

When a fan wiki has the canonical article as one big page with named sections (Bulbapedia, Wikipedia, Fandom), pre-extract the sections to disk so subsequent passes have *named* HTML/text snippets to work with. Pattern:

```python
heading_re = re.compile(r'<h([234])><span class="mw-headline" id="([^"]+)">([^<]+)</span></h\1>')
# walk; section body is from heading.end() to next-heading.start()
# save each as .html (raw) and .txt (regex-stripped)
```

Save under `_shared/<wiki>_sections/<id>.html` and `.txt`. This turns "go re-read 800KB of HTML" into "open the named section file" for every subsequent question. Cheap up front, pays back constantly.

For Pokémon × Kogei specifically, the per-venue sections that exist on Bulbapedia (and you should always extract) include: `Added_in_<Venue>` (merch), per-venue Bonus Freebies, plus venue-specific entries under Café/Menu, Collaboration, Raffle, Bonus Freebies. Also: Catalog, Videos, External_links, Museums, Media — each contains URLs to chase or IDs to archive.

## Wayback Machine + the hidden-server-assets trick

A common pattern when a primary source goes offline:

1. The page is gone — visiting the original URL returns 404, a redirect to home, or a "page redesigned" splash.
2. **The Wayback Machine has the HTML.** `https://web.archive.org/web/<timestamp>/<original-url>` shows the page as it was. But the wayback page often shows broken images, because Wayback's image URLs can fail (the snapshot didn't capture them, or the wayback CDN drops them).
3. **The original server often still hosts the image binaries** even after removing the HTML. Servers commonly keep static-asset directories online indefinitely while reorganizing pages. So:
   - Open the wayback page
   - Note the original image URLs (View Source on the wayback page; the `<img src="">` paths are usually rewritten to wayback paths but the *original* URL is in `data-src`, `srcset`, or recoverable by stripping the wayback prefix)
   - Reconstruct the original URL: drop `https://web.archive.org/web/<timestamp>/` from the front
   - Try fetching the original direct URL — surprisingly often, you get the image
4. If the server has been retired entirely, fall back to the wayback's stored copy (still in the snapshot's media tree, just at a wayback path).

**Order of operations when chasing a dead source:**
1. Try the original page URL directly (sometimes it's just slow / temporarily down).
2. Try `web.archive.org/web/*/<original-url>` to find any snapshot.
3. From the wayback HTML, extract the original image URLs.
4. Try fetching those original image URLs from the live server first, *then* from wayback.

Save both forms when you have them — original-server image is usually higher fidelity (no wayback recompression), but wayback is the only proof the image existed at that URL on that date.

## Same URL, different era: compare live pages against Wayback snapshots

Do not assume a current venue/exhibition URL represents the full historical record. Museums and publishers often reuse or mutate the same URL across years: a live page may keep the same path while replacing the older artwork list, adding new works, removing old images, or rewriting the layout. A current capture can therefore be "complete" for today's page while missing images that were visible in an earlier snapshot.

For any high-value official URL, especially a venue/exhibition page:

1. Capture the live/current page.
2. Check Wayback for at least the opening-period snapshot, the mid-run snapshot, and the latest pre-redesign snapshot when available.
3. Diff the image URL sets between live and Wayback snapshots.
4. Extract captions near each historical image; older snapshots often contain authoritative work captions and photographer credits that the current page no longer shows.
5. Save a snapshot-specific inventory, e.g. `wayback_<timestamp>_image_inventory.tsv`, with page timestamp, original image URL, recovered full-size URL, local path, dimensions, caption, and notes.
6. Promote only the clearly captioned artwork images into per-artwork folders; keep uncaptioned/page-level images in the source bundle until identified.

When Wayback mangles filenames, inspect both `src` and `srcset`. The `srcset` may be rewritten as a broken relative path or mojibake filename, while the primary `img src` still preserves the original WordPress upload stem. In that case, trust the intact original stem from `src`, then apply normal URL surgery (`-WIDTHxHEIGHT` removal, `-scaled` vs non-scaled comparison) and verify with dimensions.

Before trying adjacent filename probes (`DSCF2189.jpg`, `IMG_2636.jpg`, etc.), first harvest every URL actually present in the HTML and Wayback snapshot. Probe only tight neighbors around confirmed filenames, record the 200/404 results, and do not treat successful adjacent filenames as relevant until the image content or surrounding source confirms it belongs to the subject.

## Higher-res via URL manipulation

When you find an image on a wiki or CDN, *try the URL surgery before settling for the thumbnail*:

| Pattern you see | Try also |
| --- | --- |
| `/thumb/a/a1/Name.jpg/300px-Name.jpg` (MediaWiki thumb) | `/a/a1/Name.jpg` (drop the `/thumb/` segment + `/300px-` prefix) |
| `?w=600&h=400` or `?width=600` (CMS query params) | Strip the params, or set them to a much larger value |
| `_thumb.jpg`, `_small.jpg`, `_400x300.jpg` | `_full.jpg`, `_orig.jpg`, no suffix |
| `/uploads/2024/12/img-768x432.jpg` (WordPress) | `/uploads/2024/12/img.jpg` (drop the `-WIDTHxHEIGHT`) |
| `/<dir>/assets_c/2024/01/<hash>-thumb-autox400-NNNN.jpg` (Movable Type CMS auto-thumbnailer — common on JP museum sites like sagawa-artmuseum.or.jp) | `/<dir>/<hash>.jpg` (drop the `assets_c/<YYYY>/<MM>/` prefix AND the `-thumb-autox<N>-NNNN` suffix) — recovered a 6192×8256 master from a 300×400 thumb |
| `/c_fill,w_600/...` (Cloudinary path transforms) | Remove the transform segment to get the source upload |
| Twitter/X `?format=jpg&name=small` | `?format=jpg&name=orig` |
| Facebook `?_nc_..._n.jpg` | Often the same URL with `&w=2048` returns a larger render |

Always re-check the actual dimensions after a URL surgery — sometimes the bigger URL 404s or returns the same file. The `sips -g pixelWidth -g pixelHeight` trick on macOS confirms quickly.

When a thumbnail URL gets you, e.g., 300×425 but the wiki's file page says "Full-size: 2116×2731," prefer the link from the file page — that's the originally uploaded asset, dimensionally identical to (or only marginally smaller than) what you'd get from the primary source.

## Finding social handles by parsing the official site

**Find the subject's social handles by parsing the official site's HTML for outbound links.** It's faster and more reliable than Google or guessing handle patterns. Pattern that works in seconds:

```python
for href in re.findall(r'href=[\'"]([^\'"]+)[\'"]', page_html):
    for platform, domains in [
      ('twitter', ['twitter.com/', 'x.com/']),
      ('instagram', ['instagram.com/']),
      ('facebook', ['facebook.com/']),
      ('youtube', ['youtube.com/', 'youtu.be/']),
    ]:
        for d in domains:
            if d in href:
                handle = href.split(d)[1].split('/')[0].split('?')[0]
                # filter out 'share', 'intent', 'sharer', 'watch', 'channel'
```

For a multi-subject project, run this on every subject's front page in one pass and produce a per-platform handle inventory. Google search will surface fan accounts and unofficial mirrors; the museum's own footer is authoritative. Subject sites that publish handle links are also signaling "this is where to find us" — primary intent of the institution.

## Capture mechanics — what works against what

| Site type | Tool | Notes |
| --- | --- | --- |
| Static museum sites (most JP cultural institutions) | `urllib.request` + Mozilla UA | Set 1s politeness delay between fetches. URL-encode non-ASCII paths before fetching. |
| Cloudflare-gated wiki / archives | Playwright MCP browser | Navigate first to pass the JS challenge, then `page.evaluate(async () => fetch(url))` and base64 the bytes back. Same-origin fetches succeed; cross-origin gets blocked by COEP/CORP. |
| JS-rendered SPAs (gallery sites, modern museums) | Playwright with explicit wait-for-render | The script's static HTML parser will return a near-empty image list. |
| YouTube videos (events get taken down) | `yt-dlp -o "<dir>/%(title)s.%(ext)s" --write-info-json --write-thumbnail` | Always archive when the user mentions a video — they get pulled. |
| Twitter/X images | Right-click on the user's browser, save with the original filename — or `yt-dlp` works for individual tweet URLs | API access is broken for unauthenticated; treat human curation as the canonical path. |
| Image CDNs | Direct URL navigation in Playwright; `fetch()` from same-origin page; save base64 bytes | Save the image as the actual extension, not `.html`. |

## Reusable downloader pattern

A small Python script with this interface scales to any subject domain:

```
python3 download.py <subject-slug> --url <page-url> [--label <name>] [--no-images]
```

It should: fetch the page, save to `pages/<label>.html`, parse `<img>`/`<source srcset>`/`<meta og:image>` for images **AND** `<a href="*.pdf|.doc|.docx|.zip|.xlsx|.ppt|.pptx|.epub">` for documents, download images to `images/` and documents to `pdfs/`, append a TSV row per asset to `capture_log.tsv`, and append a section to `README.md`. **The script captures, the README curates** — keep them separate so the curated section survives re-runs.

**Document extraction is mandatory, not optional.** Museums use PDFs for: official work lists, press releases, exhibition flyers (front-back AND inside-spread), application forms, ticket flowcharts, access maps, education guides, audio-tour transcripts. Skipping these silently halves the value of a museum-site capture. See the "READ the page yourself" section in `SKILL.md` — even with document extraction in the script, manual page-read is still required to catch references the script's regex can't predict (e.g., links to assets on subdomains, links phrased as button text, archive-index pages).

The captured pages directory often picks up site chrome (logos, social icons, header SVGs). Filter these from the capture_log.tsv (using a chrome-pattern matcher with PXK-keyword allowlist), so the log only records subject-relevant assets — the chrome files can stay on disk but shouldn't pollute the provenance index.

## Scraping virtualized lists (Instagram profile grids, Twitter timelines, infinite scroll)

Modern feed UIs use **virtual scrolling**: only the in-viewport tiles plus a small buffer are mounted in the DOM. As you scroll down, the topmost (off-screen) tiles get *unmounted* to free memory. This breaks the naïve pattern of "scroll to bottom, then `querySelectorAll`."

**Wrong:**
```js
// Scroll to bottom, then extract
while (notAtBottom) { window.scrollTo(0, document.body.scrollHeight); await sleep(2500); }
const all = document.querySelectorAll('a[href*="/p/"]');  // ← only the bottom slice
```

**Right — accumulate during scroll:**
```js
const seen = new Set();
const collected = [];
async function snapshot() {
  for (const a of document.querySelectorAll('a[href*="/p/"]')) {
    if (seen.has(a.href)) continue;
    seen.add(a.href);
    const img = a.querySelector('img');
    collected.push({ href: a.href, alt: img ? img.alt : '' });
  }
}
let prevH = 0, stable = 0;
for (let i = 0; i < 30 && stable < 4; i++) {
  await snapshot();                         // capture before each scroll
  window.scrollTo(0, document.body.scrollHeight);
  await new Promise(r => setTimeout(r, 2500));
  if (document.body.scrollHeight === prevH) stable++; else { stable = 0; prevH = document.body.scrollHeight; }
}
await snapshot();                            // one final pass
return { collected, totalSeen: seen.size };
```

The `snapshot()` call before each scroll tick captures whatever is currently mounted. Across many ticks, the union builds up the full list. The `seen` set dedupes.

**Always check the very-first DOM tile *before* scrolling.** That's the newest post — it tells you the account's true latest activity. If you scroll first then check, you'll have lost the top tiles to virtualization and may falsely conclude the account is dormant.

**When the user says "the relevant content is on screen now," trust them.** They're seeing the live UI; you're querying a stale, virtualized DOM snapshot. If your inference contradicts what they said, you're wrong. Switch to extracting what they pointed at, not arguing the count.

## URL-encoding non-ASCII characters

Always wrap the fetch URL with proper percent-encoding before handing it to urllib:

```python
def encode_url(url: str) -> str:
    parsed = urllib.parse.urlsplit(url)
    safe_path = urllib.parse.quote(parsed.path, safe="/%:@!$&'()*+,;=~-._")
    safe_query = urllib.parse.quote(parsed.query, safe="=&%/?:@!$'()*+,;~-._")
    return urllib.parse.urlunsplit((parsed.scheme, parsed.netloc, safe_path, safe_query, parsed.fragment))
```

Without this, Japanese/Korean/Chinese paths throw `URL can't contain control characters`.
