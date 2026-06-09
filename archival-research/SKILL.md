---
name: archival-research
description: "Build per-subject research bundles and offline reference archives from web or on-disk sources. Two modes share one discipline (provenance + auto-captured vs. human-curated separation + read-it-yourself verification + never-invent-attributions): (1) WEB — follow source trails (fan wikis → upload-archive comments → canonical source → press partners → official social media → press reviews), saving HTML snapshots and imagery with attribution; (2) LOCAL — OCR/transcribe scanned PDFs/magazines/documents into a layered text corpus (raw OCR → audited transcription → translation) with uncertainty preserved inline. Use when collecting venue/exhibition/artwork/event/person dossiers, building offline archives, gathering imagery + sources for editorial work, or OCR/transcription/translation of a scanned-document corpus. Triggers: research bundle, source trail, archive a page, Wayback Machine, fan wiki, press kit, install shots, museum research, OCR, transcribe, scanned PDF/magazine, text corpus, translate scans."
---

## Reference files

Detailed worked procedures live in `references/` — load them when you reach the relevant step:

- `references/capture-techniques.md` — section-extraction code for fan wikis, Wayback hidden-server-assets trick, live-vs-Wayback era diffing, the URL-surgery table for hi-res recovery, social-handle parsing, capture mechanics per site type, the reusable downloader pattern, virtualized-list scraping code, URL-encoding non-ASCII paths.
- `references/checklists-and-templates.md` — widening-question checklists (venue/artwork/artist), data-presentation forms, the per-section sweep map (Pokémon × Kogei / Bulbapedia), the per-subject README template, lateral discovery patterns, visual-labeling failure modes.

## When to use

User asks to gather information and imagery about a *finite set of subjects* (venues, artworks, artists, events, products, etc.) and wants the artifacts persisted to disk for later use — UI design, documentation, citation, or just personal archive. The output is a folder per subject containing source HTML, images, and a curated README that documents the trail.

**The source can be local, not just the web.** This skill applies just as much when the artifacts already sit on disk — a folder of scanned magazine PDFs, document images, a photographed archive — and the job is to turn them into a durable, citable text corpus. The *acquisition* step differs (OCR a page vs. fetch a URL), but everything else is identical: preserve provenance, keep the auto layer separate from the curated layer, read the source yourself instead of trusting the tool, and never invent text to fill a gap. If you're about to write an ad-hoc OCR/transcription pipeline, you're doing archival work — operate from this skill. See "Local-source corpora" below.

**Don't use for:**
- Quick factual lookup (just WebFetch + summarize).
- Live monitoring or scraping at scale (write a proper scraper).
- Building general search indices (this is for *deliberate single-URL fetches*, one subject at a time).
- A one-off "what does this one page say?" OCR — just OCR it. The skill is for building a *corpus* with layers and provenance.

## Local-source corpora: OCR → clean → translate

When the source is scanned documents you already hold (magazines, catalogs, flyers, photographed pages), the deliverable is a **layered text corpus**, not an image bundle. The layers mirror the auto-vs-curated split that governs the whole skill:

1. **`*_ocr_pages/` — raw OCR (auto).** Machine output, one file per logical page, never hand-edited. On macOS, prefer the **Apple Vision framework** (`VNRecognizeTextRequest`, `.accurate`, set `recognitionLanguages`) over Tesseract for CJK and mixed layouts — it is dramatically more accurate, runs locally with no API/network, and returns per-line bounding boxes + confidence. A compiled Swift binary OCRs a 300-DPI page in ~2s. Emit a JSON sidecar per page (bbox + confidence per line) — it's what makes verification croppable. Carry a `Source locator` line (source file + page) in every output so provenance is recoverable, exactly like a web bundle's source URL.
2. **`cleaned_text_pages/` — audited source-language transcription (curated).** Created only after checking the OCR against the page image. This layer is *sacred* the same way `from_user/` is: the raw layer must never overwrite it.
3. **`translated_text_pages/` — translation (curated).** Built *from the cleaned layer*, not from raw OCR, with uncertainty preserved inline in `[brackets]`.

**Page geometry matters.** Two-page magazine spreads render as one landscape image; split at the gutter into single pages before OCR — it removes the cross-column reading-order problem and isolates dense tables. Check binding direction from the folios (page numbers): if they increase left→right the spread reads L→R; a right-bound Japanese magazine reads R→L.

**"READ the page yourself" applies verbatim to OCR.** OCR confidence is the script's signal; your eyes are the primary tool. For low-confidence regions, crop the bbox, re-OCR the crop in isolation (single lines are far more accurate), and if still unclear **open the crop with `Read` and read it yourself.** Only what's genuinely illegible gets flagged to the user. Note that low confidence ≠ wrong — display type and stylized headings routinely score ~0.3 while being perfectly correct; confirm by eye rather than "fixing" them.

**Anti-hallucination — the cardinal rule applies to "cleaning" too.** "Cleaning" OCR is the most dangerous moment in this mode: the temptation is to silently turn a garbled string into a plausible guess — a mangled card name into the *wrong* card, a broken kanji into a confident-but-fabricated one. This is the same failure as inventing artist names from visual style (see "Canonical inventory first"). Discipline: **correct only what the page image confirms; for proper names (cards, Pokémon, sets, people) grep a canonical inventory before normalizing; where neither the image nor a canonical source resolves it, preserve the uncertainty inline rather than inventing.** A `[?]` or `[unclear: …]` marker is cheap; a fabricated card name propagates into the translation and the consuming UI.

**Bundle layout (local mode):**
```
<corpus>/
  <source>_ocr_pages/<source_id>/page_NNN[_L|_R].md   raw OCR (auto), + _json/ sidecars
  cleaned_text_pages/<source_id>/page_NNN[_L|_R].md    audited source-language (curated)
  translated_text_pages/<source_id>/page_NNN[_L|_R].md translation (curated)
  <source>_ocr_manifest.tsv     one row/page: source, page, dims, confidence, quality flag
  STATUS.md / VERIFICATION_SUMMARY.md   the README-as-index for this corpus
```

**Same cadence: pilot then batch.** OCR one magazine end-to-end (benchmark engine + DPI, validate splitting and reading order), record the findings in a `SPEED_LAB.md`/`STATUS.md`, then batch the rest with the validated config. Keep auto and curated separate so a re-run of the OCR layer never clobbers audited text — identical to "the script captures, the README curates."

**README-as-index, varied forms** apply unchanged: a manifest TSV (machine log), a status doc (what's done, what's flagged), a **glossary box** for recurring source-language terms, and a flagged-pages gap list with the residual that needs human eyes. (This mode was added after an OCR-a-magazine task reinvented all of the above from scratch instead of starting here.)

## Stance: be an exhaustive, breadth-first research partner

This is the most important section. Read it twice.

**Research builds, widens, and deepens.** When the user names a research target, that target is a starting point, not a boundary. Researching one venue uncovers information about the works shown there, the artists involved, the cafe menu, the merchandise, the raffles, the press partner, the city, the architecture. *Capture all of it.* Whatever you find on the way is part of the project.

**Discovery > narrow execution.** A great research partner finds things the user didn't know to ask for. A weak one stops the moment the named deliverable is in hand. Default to "what else is here?" before "am I done?" The skill's earlier draft committed this exact failure on its first run — the agent stopped at posters because the plan said "venue research," missing 312 artwork files, 9 archival videos, and entire Café/Merchandise/Raffle/Bonus-Freebies sections of the source page. Don't repeat that.

**Ask widening questions about every subject.** Run the per-subject-type checklists (venue / artwork / artist) in `references/checklists-and-templates.md` against each subject before declaring it done.

**Document everything in structured form.** When you uncover information, write it down — even if it doesn't feel "core" to the named deliverable. A line in a README is cheap; the alternative is the user having to re-discover it later.

## Present data in a variety of structured ways

The user explicitly asks for this. *Don't lean on a single layout.* Mix source-trail tables, hero-candidates tables, inventory tables, cross-reference matrices, gap lists, annotated URL ladders, narrative paragraphs, glossary boxes, and timelines inside a single README — tables for inventories, paragraphs for context, lists for gaps. The full menu of forms (with when to use each) is in `references/checklists-and-templates.md`.

For fan-wiki articles, pre-extract named sections to `_shared/<wiki>_sections/` so subsequent passes open named snippets instead of re-reading 800KB of HTML — see "Section-extraction pattern" in `references/capture-techniques.md`.

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

The Pokémon × Kogei / Bulbapedia per-section sweep map (what each section yields and how to fold it back) is in `references/checklists-and-templates.md`.

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

The recommended per-subject README skeleton (source trail table, hero candidates, gaps, next leads) is in `references/checklists-and-templates.md`.

## Primary vs. secondary sources

**Bulbapedia and Wikipedia are secondary sources.** They're great as *indices* — fan editors have already done the cross-referencing work for you, often with cited links to the actual source. But the imagery they host is almost always a re-upload that's been resized, recompressed, or stripped of EXIF on the way in. Treat them as a starting catalog, not the destination.

**Always chase the primary source** (the museum's own page, the artist's own portfolio, the press partner's press kit, the publisher's official PDF). Primary sources tend to have:
- Higher-resolution imagery (often the original print-resolution file)
- Original captions, photo credits, and context
- Additional images the wiki editor didn't bother to upload
- The "official" version of facts when secondary sources disagree

**When a primary source is offline or has mutated**, the Wayback Machine procedures in `references/capture-techniques.md` cover the two key moves: the hidden-server-assets trick (the original server often still hosts image binaries after the HTML is gone) and live-vs-snapshot era diffing (the same URL can lose images and captions across redesigns — check opening-period, mid-run, and pre-redesign snapshots).

### Hi-res is non-negotiable — try the URL surgery EVERY time

**Default behavior should be: never accept the first-returned image bytes as final.** Every CDN serves multiple resolutions; the URL the page hands you is almost always a downsized variant. *Before saving any image, do the URL surgery, then re-fetch.* Then `sips -g pixelWidth -g pixelHeight` to confirm you got the master. The per-CDN surgery table (MediaWiki thumbs, WordPress suffixes, Movable Type auto-thumbnails, Cloudinary transforms, Twitter/X `?name=orig`, etc.) is in `references/capture-techniques.md`.

The cost is a single extra HTTP request per image. The reward is sometimes 5–20× the resolution. A page-cached "1200×800" rendering is useless for print-quality use; the same source URL with `?name=orig` or with the WordPress `-WIDTHxHEIGHT` suffix dropped often returns a 4096×2731 or 6192×8256 master. **If you save without checking, you've effectively lost the master forever** — the user will not know the larger version exists, and the bundle becomes a thumbnail collection.

When you've already saved at low res, do a *retroactive bulk re-fetch pass*: walk the bundle's saved images, derive the original URL, request `?name=orig` (or equivalent), and overwrite if the new file is meaningfully larger (e.g. >10% bigger). One pass over the bundle catches whatever the initial pass missed.

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

**When the canonical chain runs dry, expand sideways.** The lateral-discovery table (architecture shots, install photos, hi-res posters, floor plans, language-variant wikis) is in `references/checklists-and-templates.md`. Find a subject's social handles by parsing the official site's HTML for outbound links — faster and more authoritative than Google; the snippet is in `references/capture-techniques.md`.

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

## Capture mechanics

The per-site-type tooling table (static sites, Cloudflare-gated wikis, JS SPAs, YouTube, Twitter/X, image CDNs), the reusable downloader-script pattern (including mandatory document extraction), the virtualized-list scraping technique (accumulate during scroll — never scroll-then-query), and URL-encoding for non-ASCII paths are all in `references/capture-techniques.md`. Read it before writing any capture code. Two rules that bear repeating here:

- **The script captures, the README curates** — keep them separate so the curated section survives re-runs.
- **Document extraction is mandatory, not optional.** Skipping PDFs silently halves the value of a museum-site capture.

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

The catalogued visual-labeling failure modes (silhouette confusion, crop-vs-wide-shot blindness, wrong-reference comparison, composition misreading, texture-to-medium inference) are in `references/checklists-and-templates.md` — review them before any vision-labeling pass.

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
- **Inferring "no content exists" from a single virtualized-list scrape.** Modern social/feed UIs (Instagram, Twitter, TikTok, Pinterest, infinite-scroll product grids) use *virtual scrolling* — after a scroll-to-bottom loop, `document.querySelectorAll(...)` returns only the *currently-visible* slice, not "everything you loaded." The wrong inference: "I see only old IDs in the DOM, therefore the account stopped posting after that date." Accumulate during scroll instead — see `references/capture-techniques.md`. And when the user tells you "the relevant content is on screen now," **trust them over your own inference** — they're seeing the live UI, you're seeing a stale DOM snapshot.

## Update this skill

When a research session teaches you a new pattern — a new gate, a better tool, a clever filename trick, a fresh source-trail step — add it here (or to the matching file in `references/`). The user invoked this skill to *create memory* of how to research well; treat it as living.
