---
name: archival-research
description: >
    Build per-subject research bundles by following source trails across the open web — fan wikis → upload-archive comments → canonical source → press partners → official social media → press reviews. Save HTML snapshots and imagery to disk with attribution preserved. Use when collecting venue/exhibition/artwork/event/person dossiers, building offline reference archives, or systematically gathering imagery + sources for editorial work. Triggers: research bundle, source trail, archive a page, save imagery, Wayback Machine, fan wiki, press kit, install shots, museum research, exhibition research.
---

## When to use

User asks to gather information and imagery about a *finite set of subjects* (venues, artworks, artists, events, products, etc.) and wants the artifacts persisted to disk for later use — UI design, documentation, citation, or just personal archive. The output is a folder per subject containing source HTML, images, and a curated README that documents the trail.

**Don't use for:**
- Quick factual lookup (just WebFetch + summarize).
- Live monitoring or scraping at scale (write a proper scraper).
- Building general search indices (this is for *deliberate single-URL fetches*, one subject at a time).

## Stance: be an exhaustive, breadth-first research partner

This is the most important section. Read it twice.

**Research builds, widens, and deepens.** When the user names a research target, that target is a starting point, not a boundary. Researching one venue uncovers information about the works shown there, the artists involved, the cafe menu, the merchandise, the raffles, the press partner, the city, the architecture. *Capture all of it.* Whatever you find on the way is part of the project.

**Discovery > narrow execution.** A great research partner finds things the user didn't know to ask for. A weak one stops the moment the named deliverable is in hand. Default to "what else is here?" before "am I done?" The skill's earlier draft committed this exact failure on its first run — the agent stopped at posters because the plan said "venue research," missing 312 artwork files, 9 archival videos, and entire Café/Merchandise/Raffle/Bonus-Freebies sections of the source page. Don't repeat that.

**Ask widening questions about every subject.** When researching a venue, run through:
- What made *this* venue unique? Special architecture? An artist talk? A cafe collaboration?
- What works debuted here that weren't at any other stop?
- What merchandise was *added* at this stop? Any venue-exclusive items?
- Was there a raffle? A bonus freebie? A flag campaign?
- Was there a venue-specific subtitle, section structure, or curatorial framing?
- Who was the press partner? What did the local press say?
- Where in the city is the venue located? Architectural significance?
- What's the museum's institutional history? (Privately founded? Public? Re-built recently?)

When researching an artwork, ask:
- Who made it, when, in what material, at what scale?
- Is it new for this exhibition or a re-show of an existing piece?
- What Pokémon does it depict? Why that Pokémon? Personal favorite of the artist?
- How was it photographed (commercial photographer credit)?
- Did the artist publish process notes / making-of?
- Has any press review *singled out* this piece?

When researching an artist, ask:
- What's their primary craft (urushi, ceramic, kimono, metal, lacquer, …)?
- Where do they teach? Are they affiliated with a craft guild or school?
- Other Pokémon × Kogei pieces by them — and earlier non-Pokémon work in the same vein?
- Studio location? Open to visitors?

**Document everything in structured form.** When you uncover information, write it down — even if it doesn't feel "core" to the named deliverable. A line in a README is cheap; the alternative is the user having to re-discover it later.

## Present data in a variety of structured ways

The user explicitly asks for this. *Don't lean on a single layout.* Vary the form to match the question:

- **Source-trail tables** — when explaining where artifacts came from.
- **Hero candidates table** — when curating which images to use, with dimensions + source.
- **Inventory table** — full machine log; the auto-script's TSV.
- **Cross-reference matrix** — venue × something (e.g. venue × merchandise added, venue × works debuted, venue × promo videos).
- **Checklist / gap list** — bullets of what's missing, with hypotheses for where to find it.
- **Annotated source URL ladder** — primary → secondary → tertiary, with each step labeled.
- **Per-section narrative paragraph** — for context that doesn't fit a table (institutional history, curatorial framing, architectural significance).
- **Glossary / term box** — for Japanese terms (e.g. 工字繋ぎ, 美とわざの大発見) explained in English.
- **Timeline** — opening day, phase swap, artist talk, closing — chronological list with dates.

Mix these inside a single README. Variety helps the reader scan. Tables for inventories, paragraphs for context, lists for gaps.

## Section-extraction pattern (for fan-wiki articles)

When a fan wiki has the canonical article as one big page with named sections (Bulbapedia, Wikipedia, Fandom), pre-extract the sections to disk so subsequent passes have *named* HTML/text snippets to work with. Pattern:

```python
heading_re = re.compile(r'<h([234])><span class="mw-headline" id="([^"]+)">([^<]+)</span></h\1>')
# walk; section body is from heading.end() to next-heading.start()
# save each as .html (raw) and .txt (regex-stripped)
```

Save under `_shared/<wiki>_sections/<id>.html` and `.txt`. This turns "go re-read 800KB of HTML" into "open the named section file" for every subsequent question. Cheap up front, pays back constantly.

For Pokémon × Kogei specifically, the per-venue sections that exist on Bulbapedia (and you should always extract) include: `Added_in_<Venue>` (merch), per-venue Bonus Freebies, plus venue-specific entries under Café/Menu, Collaboration, Raffle, Bonus Freebies. Also: Catalog, Videos, External_links, Museums, Media — each contains URLs to chase or IDs to archive.

## Cross-reference matrices belong at the index

Once you have multi-subject data, put a *cross-reference matrix* at the top-level `<topic>/README.md`. Examples that have proven valuable:

- **Subject × feature presence**: did each venue have a café? freebies? new works? collaboration items?
- **Subject × inventory counts**: pages/images/videos per venue, side by side.
- **Subject × dimensions**: poster sizes per venue, helps spot the low-res outliers.
- **Subject × dates**: chronological timeline of the whole tour, one row per stop.

The matrix surfaces *gaps* faster than reading any single subject README. If column "Has café" is mostly empty but two cells are filled, that's a story.

## Spread the work across the whole subject domain

When the source page has multiple sections (Works, Catalog, Videos, Merchandise, Café, Bonus Freebies, External Links, etc.), **don't just walk the section that matches the named deliverable.** Iterate every section once. For each, ask:

- Is there a deliverable here that should be archived?
- Does this section contain venue/artwork/artist data I should fold back into the existing README?
- Is anything venue-specific that I should mirror into a venue's README?

For Pokémon × Kogei specifically (Bulbapedia article structure):
- **Venues + Posters** — venue bundle posters (8 posters, 1 missing).
- **Works** — every artwork has a file page. Walk all of them; the file-page comment names the canonical primary source.
- **Catalog** — exhibition catalog; usually has its own ISBN, retailer page, and may have higher-res cover art.
- **Videos** — every embedded YouTube ID; archive all of them with `yt-dlp`.
- **Merchandise** — venue-exclusive items per stop ("Added in National Crafts Museum", etc.); cross-reference into venue READMEs.
- **Raffle** — prize tiers, gallery of prizes — distinct from regular merch.
- **Bonus Freebies** — handed out at specific venues; treat as venue-exclusive.
- **Menu** (Café) — venue-specific cafés, collab menus, exclusive plating.
- **External links** — museum sites, press partners — feeds the source-trail tables.

## Mental model

You're building a *journalist's morgue* — a per-subject folder of source material that future-you (or a collaborator) can quickly skim to know: what's known, what's authoritative, what's missing, what to chase next. Three principles:

1. **Preserve provenance.** Every artifact's source URL must be recoverable. Filenames or folder names should encode it.
2. **Separate auto-captured from human-curated.** A `from_user/` (or equivalent) subfolder is sacred — it's where the user drops things they found. Never overwrite it; integrate by reference in the README.
3. **The README is the index, not a wall of text.** Lead with hero candidates and the source trail; gaps and next leads at the bottom. Keep it scannable.

## Bundle layout

```
research/<topic>/<subject-slug>/
  README.md            curated overview, source trail, hero candidates, gaps, leads
  pages/               full HTML snapshots: <label>.html
  images/              downloaded imagery
  videos/              archived video (yt-dlp), with .info.json + thumbnails
  capture_log.tsv      append-only machine log of every fetch
  from_user/           user's drop folder; contains a README and any contributed files
```

For shared/cross-subject reference: `research/<topic>/_shared/`.

### README per subject — recommended sections

```markdown
# <Subject title>

**Slug:** `<slug>`     **Dates / scope:** ...     **Official URL:** <...>
*One paragraph of context — why this subject matters, what's distinctive.*

## Source trail
| Step | URL | Status |
| --- | --- | --- |
| Fan wiki / index | <...> | Cached → `pages/...` |
| Upload archive (poster/file page) | <...> | Cached |
| Canonical source (per archive comment) | <...> | Cached |
| Official venue/subject page | <...> | Cached |
| Official social media | <handle> | Captured posts in `from_user/...` |
| Press review(s) | <...> | Cached |

## Hero candidates
| Use | File | Source |
| --- | --- | --- |
| Poster (high-res) | `images/...` (WxH) | <...> |
| Exterior architecture | `images/...` (WxH) | <...> |
| Install shot | `images/...` (WxH) | <...> |

## Gaps
- Specific named-thing-missing (with hypothesis about where to find it)

## Next leads
1. Specific URL or query to try next
```

## Primary vs. secondary sources

**Bulbapedia and Wikipedia are secondary sources.** They're great as *indices* — fan editors have already done the cross-referencing work for you, often with cited links to the actual source. But the imagery they host is almost always a re-upload that's been resized, recompressed, or stripped of EXIF on the way in. Treat them as a starting catalog, not the destination.

**Always chase the primary source** (the museum's own page, the artist's own portfolio, the press partner's press kit, the publisher's official PDF). Primary sources tend to have:
- Higher-resolution imagery (often the original print-resolution file)
- Original captions, photo credits, and context
- Additional images the wiki editor didn't bother to upload
- The "official" version of facts when secondary sources disagree

### Wayback Machine + the hidden-server-assets trick

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

### Same URL, different era: compare live pages against Wayback snapshots

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

### Hi-res is non-negotiable — try the URL surgery EVERY time

**Default behavior should be: never accept the first-returned image bytes as final.** Every CDN serves multiple resolutions; the URL the page hands you is almost always a downsized variant. *Before saving any image, do the URL surgery, then re-fetch.* Then `sips -g pixelWidth -g pixelHeight` to confirm you got the master.

The cost is a single extra HTTP request per image. The reward is sometimes 5–20× the resolution. A page-cached "1200×800" rendering is useless for print-quality use; the same source URL with `?name=orig` or with the WordPress `-WIDTHxHEIGHT` suffix dropped often returns a 4096×2731 or 6192×8256 master. **If you save without checking, you've effectively lost the master forever** — the user will not know the larger version exists, and the bundle becomes a thumbnail collection.

When you've already saved at low res, do a *retroactive bulk re-fetch pass*: walk the bundle's saved images, derive the original URL, request `?name=orig` (or equivalent), and overwrite if the new file is meaningfully larger (e.g. >10% bigger). One pass over the bundle catches whatever the initial pass missed.

### Higher-res via URL manipulation

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

## Source trail — the canonical chain

For most pop-culture / exhibition / museum subjects:

```
Fan wiki article (Bulbapedia, Fandom, Wikipedia) — secondary source / index
    ↓ click image → "more details" / file page
Archive page on the wiki's image host (e.g. archives.bulbagarden.net/wiki/File:...)
    ↓ read the upload comment for the source URL — that's the trailhead to the primary
Canonical source page (often press partner, not the museum itself) — primary
    ↓ search the page for additional links
Museum/subject's own official page (often archived/moved after the event ends) — primary
    ↓
Museum's official social media (Facebook, X/Twitter, Instagram) — primary, often highest-res
    ↓ each post has hi-res install/opening photos
Press reviews (art press, local press) — secondary, but with original photos
    ↓ best install shots usually live here
```

**Don't stop at step 3.** The user's archival workflow that taught me this skill went all the way to step 6 (museum's X/Twitter and Facebook posts), and that's where the install shots and opening-ceremony photos lived — not on the museum's main site. The official poster on the museum's social media was *higher resolution* than the version on Bulbapedia (2481×3508 vs 2116×2731), proving the secondary-source rule in practice.

## Lateral discovery patterns

When the canonical chain runs dry, expand sideways:

| Looking for | Try |
| --- | --- |
| Architecture / exterior shots | Wikimedia Commons `Category:<subject_name>`; the museum's About/Visit page; tourism office press kits |
| Install / opening photos | The subject's own social media first (Instagram + X), then local press, then visitor blogs |
| High-res poster | Bulbapedia/Fandom file pages, then official Pokémon/publisher press archives, then the subject's own social media (often posted as JPG attachment), then yokoso/print-supplier sites |
| Archived past-event pages | Wayback Machine (`web.archive.org/web/2024*/site.com/exhibitions/`) when the live page returned a 404 or general landing |
| Maps & floor plans | Tourism boards, the venue's "Access" page, transit map screenshots |
| Subject-specific subtitles or section names | Different language versions of the wiki article; press release in original language |

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

## Filename conventions

For machine-captured assets:

```
<safe-name>_<sha1[:8]>.<ext>
```

The 8-char hash de-duplicates and lets you re-run capture without clobbering.

For human/from_user drops, mirror the source URL's path with `:` replacing `/` (filesystem-safe):

```
from_user/x.com:dokinbi:status:2048250720579928249/HGy9ODdbkAAedxc.jpeg
from_user/www.facebook.com:dokinbi:posts:pfbid02XYZ.../IMG_001.jpg
```

This preserves provenance even when no metadata is attached. (This convention came from how the user organized their drops — adopt it whenever a human is curating.)

## After every capture: READ the page yourself, don't trust the script

**This is non-negotiable.** Scripts (image-extractors, regex link-finders) only catch what their patterns were programmed for. A regex looking for `<img>` will silently skip the `<a href="*.pdf">` flyer link sitting next to it. A regex looking for PDFs will skip a `<a href="*.zip">` press kit. Patterns are dumb; they cannot recognize *new* asset types or judge significance.

**The page text is the primary source. Your judgement is the primary tool. The script is a fallback for scale.**

After every page capture, before declaring done:

1. **Open the captured HTML** (or even just a stripped-text version). Read it like a human visitor reads a museum page.
2. **Note every "ダウンロード", "download", "PDF", "[PDF: NN MB]", "図録", "プレスリリース", "申込書", "press release", "press kit", "catalog", "work list", "作品リスト" mention.** These are explicit signals from the museum that downloadable artifacts exist.
3. **Note every numbered/bracketed reference**: チラシ（表裏）, チラシ（中）, 申込書PDF, etc.
4. **Note every nav-bar link** to other pages on the same site that might also have PXK content (talks, events, news, articles).
5. **Note every cross-link** to external press partners, sponsors, ticket sellers, photographers.

A real-world miss that motivated this section: a museum exhibition page for the Hiroshima PXK stop linked two flyer PDFs ("チラシ（表裏）ダウンロード [PDF：1MB]" and "チラシ（中）ダウンロード [PDF：2MB]") in plain `<a href>` tags. The image-extracting script captured all 71 images on the page but missed both PDFs because they weren't `<img>` tags. A 30-second human read would have caught both. Worse: across 16 captured pages in the same project, the same pattern silently dropped **the National Crafts Museum's official bilingual work-list PDF** (the canonical artwork inventory), two NCM press releases, and several other primary-source documents.

**Symptom that you skipped this step**: you have 50+ images captured but no PDFs. Almost any institutional site of this type has a flyer PDF. If your `pdfs/` is empty, you didn't read the page.

## Capture mechanics — what works against what

| Site type | Tool | Notes |
| --- | --- | --- |
| Static museum sites (most JP cultural institutions) | `urllib.request` + Mozilla UA | Set 1s politeness delay between fetches. URL-encode non-ASCII paths before fetching. |
| Cloudflare-gated wiki / archives | Playwright MCP browser | Navigate first to pass the JS challenge, then `page.evaluate(async () => fetch(url))` and base64 the bytes back. Same-origin fetches succeed; cross-origin gets blocked by COEP/CORP. |
| JS-rendered SPAs (gallery sites, modern museums) | Playwright with explicit wait-for-render | The script's static HTML parser will return a near-empty image list. |
| YouTube videos (events get taken down) | `yt-dlp -o "<dir>/%(title)s.%(ext)s" --write-info-json --write-thumbnail` | Always archive when the user mentions a video — they get pulled. |
| Twitter/X images | Right-click on the user's browser, save with the original filename — or `yt-dlp` works for individual tweet URLs | API access is broken for unauthenticated; treat human curation as the canonical path. |
| Image CDNs | Direct URL navigation in Playwright; `fetch()` from same-origin page; save base64 bytes | Save the image as the actual extension, not `.html`. |

### Reusable downloader pattern

A small Python script with this interface scales to any subject domain:

```
python3 download.py <subject-slug> --url <page-url> [--label <name>] [--no-images]
```

It should: fetch the page, save to `pages/<label>.html`, parse `<img>`/`<source srcset>`/`<meta og:image>` for images **AND** `<a href="*.pdf|.doc|.docx|.zip|.xlsx|.ppt|.pptx|.epub">` for documents, download images to `images/` and documents to `pdfs/`, append a TSV row per asset to `capture_log.tsv`, and append a section to `README.md`. **The script captures, the README curates** — keep them separate so the curated section survives re-runs.

**Document extraction is mandatory, not optional.** Museums use PDFs for: official work lists, press releases, exhibition flyers (front-back AND inside-spread), application forms, ticket flowcharts, access maps, education guides, audio-tour transcripts. Skipping these silently halves the value of a museum-site capture. See the "READ the page yourself" section above — even with document extraction in the script, manual page-read is still required to catch references the script's regex can't predict (e.g., links to assets on subdomains, links phrased as button text, archive-index pages).

The captured pages directory often picks up site chrome (logos, social icons, header SVGs). Filter these from the capture_log.tsv (using a chrome-pattern matcher with PXK-keyword allowlist), so the log only records subject-relevant assets — the chrome files can stay on disk but shouldn't pollute the provenance index.

### Scraping virtualized lists (Instagram profile grids, Twitter timelines, infinite scroll)

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

### URL-encoding non-ASCII characters

Always wrap the fetch URL with proper percent-encoding before handing it to urllib:

```python
def encode_url(url: str) -> str:
    parsed = urllib.parse.urlsplit(url)
    safe_path = urllib.parse.quote(parsed.path, safe="/%:@!$&'()*+,;=~-._")
    safe_query = urllib.parse.quote(parsed.query, safe="=&%/?:@!$'()*+,;~-._")
    return urllib.parse.urlunsplit((parsed.scheme, parsed.netloc, safe_path, safe_query, parsed.fragment))
```

Without this, Japanese/Korean/Chinese paths throw `URL can't contain control characters`.

## Per-image provenance logging — non-negotiable

**Every image saved to disk must have its provenance recorded the moment it lands.** Provenance means at minimum:

- **Direct source URL** (the actual CDN URL of the image bytes, *not* just the page that displayed it)
- **Page URL** (the post / article / file-page where you found it)
- **Date posted** (from the page metadata, not the date you fetched)
- **Account / author** (uploader handle, museum name, artist name — whoever posted it on the source)
- **Local filename** (the path on disk you saved it to)
- **Captured-at timestamp** (when you pulled it)

Without per-image provenance, you cannot:
- Re-find the original to get a higher-res version later
- Cite the source in the consuming UI
- Tell the user *which post* an install shot came from
- Distinguish near-duplicates from the same source vs. different sources

**Where to write it:** the per-bundle `capture_log.tsv` is the canonical store. Append one row per saved image with the full set of fields above. The bundle's `README.md` curates the highlights from this log; the log itself is the durable record.

**Format** (TSV recommended; CSV/JSONL also fine):
```
captured_at  page_url  page_label  image_url  hint  local_path  result  content_type  bytes  width  height  date_posted  account
```

(`hint` = how you found it: `og:image`, `img@src`, `srcset`, `manual`, `carousel-slide-3`, etc. `account` may be empty for non-social sources.)

**For social-media captures specifically**, also record:
- The post date (parse from `og:description` for Instagram; from tweet timestamp for X/Twitter)
- The carousel index when applicable (slide 0, 1, 2…)
- The poster's @handle

**Backfill if you forgot.** If you've been saving images without logging, do a backfill pass before adding more: walk the existing files, derive what provenance you can (from filenames, parent dir conventions, sibling `capture_log.tsv` rows, `info.json` files left by `yt-dlp`), and produce a `provenance.tsv` at the bundle root. Note explicitly which fields you couldn't recover.

**The test:** pick any image at random in your bundle. Within 10 seconds you should be able to tell the user (a) what page it came from, (b) when it was posted, (c) who posted it. If not, your logging is incomplete.

## Cadence — pilot then batch

For multi-subject research (e.g. 9 venues, 30 products, all members of a band):

1. **Pilot one subject end-to-end.** Walk the full canonical chain. This validates your tooling + reveals which page types are gated, what filename collisions happen, what the README template should emphasize.
2. **Apply the validated workflow in a batch** to the rest. Note per-subject what was easy/hard/missing in a single sentence at the top of each README — gives the user a fast skim.
3. **Iterate based on the user's drops** into `from_user/`. The user's contributions teach you what the auto-pass missed; fold the lessons back into the next batch.

## Working with the user's drops

When the user adds files to `from_user/`:

1. **List what they dropped** — use `ls -la` (catches dotfiles + spaces).
2. **Read their `from_user/README.md` for notes** — they may have flagged what each item shows or why it matters. Their notes are gold; quote them in the parent README.
3. **Use `Read` on a representative image** — confirm what it shows so you can describe it in the parent README. (The `Read` tool can render images directly; use it.)
4. **Don't move their files into `images/`.** Leave them in `from_user/` and reference by path. They may keep adding.
5. **Integrate insight, not files.** Update the parent README's "Hero candidates" / "Gaps" / "Notes" sections with what you learned from their drops. If they found a higher-res poster than the auto-pass, surface it.

### `from_user_misc/` — cross-subject drops

In addition to per-subject `<slug>/from_user/` folders, expect a top-level `from_user_misc/` (or similar — the user names it). This is for leads that don't yet fit one subject: a list of social-media URLs, a press article that mentions multiple venues, screenshots of unsorted material. Same rules: leave files alone, fold insight into the right place. After integrating, update `from_user_misc/README.md` so it's clear what's unprocessed vs. integrated.

## What not to capture

- **Site chrome** (logos, social icons, header SVGs) — fine if your script grabs them, but don't surface in the README.
- **Generic stock imagery** (Pixabay, Shutterstock placeholders) — usually not subject-specific.
- **Tracking pixels / analytics gifs** — `pixel.wp.com/g.gif`, `googletagmanager.com`, etc. Filter by zero-byte response or `image/gif` 1×1.
- **Social-media login walls** — if the page returns "log in to see this content," don't save the wall HTML.

## License & attribution

For each `images/` entry, log in `capture_log.tsv` and the README:

- Source URL
- Visible attribution string (photo credit, "© Museum X", "Fair use", etc.)
- Whether the source page made a copyright claim

Don't render usage decisions in this skill — that's downstream. Just capture the metadata so the downstream user can decide.

## Canonical inventory first — never invent attributions

Many archival projects have a **canonical inventory** that authoritatively lists what exists: a museum's object list, an exhibition catalog, an episode guide, a product SKU table, an artist roster. For Pokémon × Kogei this is `research/official_object_names.tsv` (84 rows of artist + title + year + source). For other projects it'll be named differently, but it's almost always there if you look.

**The canonical inventory must be your starting reference for any labeling, attribution, or "is this piece new?" question.** Visual labeling is for matching observations to known canonical entries — never for inventing new entries.

### The wrong workflow (which I keep falling into)

1. Look at a visitor photo
2. Describe what I see ("round red crab-like ceramic with claws emerging from black spheres")
3. Try to infer the artist from style ("texture looks like Imai's chip-fragment work")
4. When the inference doesn't match a known piece, declare it "new / undocumented"
5. Invent a plausible-sounding artist kanji name to fill the gap

This produced **3 fabricated Japanese artist names** (森前武明, 坂本一正, 合田泰美) that don't exist anywhere on the open web. They were entirely my hallucinations, propagated through 4 passes of "confirmation."

### The right workflow

1. Look at the visitor photo
2. Describe what I see (forms, colors, scale, display context)
3. **Identify candidate Pokémon names from the silhouettes**
4. **Grep the canonical inventory for each candidate Pokémon name** (Japanese kana / kanji)
5. Pull up the canonical reference image for each TSV hit
6. Match the visitor photo to one of the canonical pieces
7. If genuinely no match: mark as **"unidentified, awaiting catalog cross-reference"** — never invent an attribution

The canonical TSV has ~84 rows. Grepping it costs nothing. Skipping that step costs hours of recursive error-correction.

### Anti-hallucination rules for proper names

- **Never write a Japanese kanji artist name unless you can cite the source.** Before writing 森前武明 or any other name, grep all canonical sources for it. If zero hits, the name doesn't exist — do not write it.
- **Never write a wrong kanji variant.** 池田晃将 ≠ 池田輝政; 坪島悠貴 ≠ 壺島誠; 田口義明 ≠ 田口善昭; 植葉 ≠ 上羽. Romanizations may coincide while kanji differ. Always grep the canonical TSV for the *kanji*, not the romanization.
- **Visual style matching is evidence for grouping pieces, NEVER proof of who made them.** Two pieces that look like the same artist's hand → label as "by same artist, name TBD." Don't promote the inference to "by artist X."
- **A piece marked "unattributed" in the canonical source stays unattributed.** Don't infer-then-promote.

### Visual-labeling failure modes I've hit

When you're vision-labeling images and want to map them to canonical pieces, watch for:

1. **Pokémon-ID errors from similar silhouettes.** Wingull confused for Lugia (both spread-wing bird shapes). Mantyke confused for Lapras/Wailord (both round whale-like). Shaymin confused for Meowth (round white body, round face). Always check whether your candidate Pokémon shares silhouette properties with a more famous Pokémon you might be defaulting to — and grep canonical TSV for both candidates.

2. **Crop-vs-wide-shot blindness.** A close-up of a vase surface looks completely different from the wide shot. The Hayama Yuki Universe vase looks like a blue starry sphere at 1×; at 50× zoom the same surface is densely embedded Pokémon. If you see a "new" close-up texture, ask: could this be a zoom into a piece I already have a wide shot of? Try matching surface pattern, not overall form.

3. **Wrong-reference comparison.** I compared a Kingler photo to Imai's Squirtle/Magikarp reference (smooth glossy ceramic) and concluded "not Imai." But Imai uses different surface treatments per piece — his Venusaur and Kingler use chip-fragment style; Squirtle/Magikarp are smooth. **One reference photo doesn't generalize across an artist's portfolio.** Check multiple reference photos before concluding "doesn't match artist X."

4. **Composition misreading.** "Two black spheres bound with rope" struck me as not-a-single-artwork. It IS Imai's Kingler — the bound-spheres arrangement is part of the composition. Compositions don't always have to match a "standard form" for the Pokémon depicted.

5. **Texture-to-medium inference is unreliable.** I called Yoshida Taiichiro's overlapping copper-scale technique "shredded paper / fibers." I called Ikemoto Kazumi's vitreous-pigment-on-glass "painted ceramic." A texture can have many candidate mediums; the **artist's documented medium** (per their README) overrides what you think you see.

### When the canonical inventory is incomplete

Sometimes new venues add pieces not yet in the canonical TSV. The correct handling:

- Mark as **"observed at [venue], not in canonical inventory [TSV name] as of [date]"**
- Note the strong visual style match if there is one ("style matches [artist], piece title TBD")
- **Add to a `gaps_to_verify.tsv` file** rather than inventing a title or attribution
- Re-check at next venue catalog capture

The discipline is: a missing entry is an `unidentified` row in a gap file, never a fabricated row in research notes.

### Cardinal rule

**Canonical inventory has 84 rows; my memory hallucinates infinitely.** Always grep first. The TSV is the only thing that was right across every pass; everything I added by visual labeling alone needed correction.

## Common failure modes

- **Capturing the museum's *current* landing page when you needed the *archived* exhibition page.** After a show ends, museums move the page under `/archive/` or `/past-exhibitions/`. The site root won't have what you want. → Wayback Machine query for the date range.
- **Treating the fan wiki as canonical.** It's an index, not the source. The "more details" comment on the file page tells you the *real* canonical URL.
- **Skipping social media because "it's noisy."** Official institutional social accounts are often the *only* source for install/opening photos.
- **Not archiving videos.** Promo videos get pulled when the show ends. yt-dlp them on first encounter.
- **Stopping at the script's auto-pass.** The script captures static HTML's imagery. JS-rendered galleries and login-gated content require Playwright + manual sweeps.
- **Inventing proper names to fill attribution gaps.** When visual labeling produces a piece that doesn't match anything in the canonical inventory, the temptation is to invent a plausible-sounding artist name (Japanese kanji are easy to combine into plausible-but-fake names). Don't. Grep the canonical inventory first; if not found, mark "unidentified" — never write a kanji name without a verifiable source. See "Canonical inventory first" above.
- **Recursive self-confirmation.** Writing "Pass 2 confirms Pass 1" / "Pass 3 confirms Pass 2" without grounding each pass in the canonical source. Errors compound across passes. Every pass must re-check against the authoritative source, not against the previous pass's output.
- **"Visual style match = attribution".** Similar surface texture across two pieces tells you "probably same artist" — it does NOT tell you who that artist is. Style-matching is for *grouping*, not for *naming*. Name only from canonical source.
- **One reference photo treated as the artist's whole style.** Artists use different surface treatments for different pieces. Comparing a visitor photo against ONE canonical reference and concluding "doesn't match artist X" is wrong. Check multiple reference photos per artist before ruling them out.
- **Defaulting to "new piece" when canonical match fails.** Default should be "I haven't matched this yet" not "this is undocumented." Most "undocumented" claims turn out to be canonical pieces I failed to match by sight (close-up vs wide-shot blindness, Pokémon ID errors, etc.). The canonical inventory is closed; new pieces are rare; expand your matching effort before declaring something new.
- **Inferring "no content exists" from a single virtualized-list scrape.** Modern social/feed UIs (Instagram, Twitter, TikTok, Pinterest, infinite-scroll product grids) use *virtual scrolling* — as you scroll down, topmost tiles get **unmounted from the DOM** to save memory. After a scroll-to-bottom loop, `document.querySelectorAll(...)` returns only the *currently-visible* slice, not "everything you loaded." Re-scrolling to the top doesn't fix this — the original recent tiles may already be evicted. **The wrong inference:** "I see only old IDs in the DOM, therefore the account stopped posting after that date." **What's actually true:** the recent tiles loaded fine, you just scrolled past them and they got evicted. See "Capture mechanics" below for how to do this right (accumulate during scroll). And: when the user tells you "the relevant content is on screen now," **trust them over your own inference** — they're seeing the live UI, you're seeing a stale DOM snapshot.

## Update this skill

When a research session teaches you a new pattern — a new gate, a better tool, a clever filename trick, a fresh source-trail step — add it here. The user invoked this skill to *create memory* of how to research well; treat it as living.
