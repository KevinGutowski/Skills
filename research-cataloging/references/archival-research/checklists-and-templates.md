# Checklists, templates, and labeling failure modes

## Contents
- Widening questions to ask about every subject
- Present data in a variety of structured ways
- Spread the work — per-section sweep (Pokémon × Kogei / Bulbapedia article structure)
- README per subject — recommended sections
- Lateral discovery patterns
- Visual-labeling failure modes I've hit
- Cross-reference matrices — worked examples
- Working with the user's drops — full procedure
- What not to capture — full list


Exhaustive checklists and worked templates referenced from `SKILL.md`.

## Widening questions to ask about every subject

When researching a venue, run through:
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

## Spread the work — per-section sweep (Pokémon × Kogei / Bulbapedia article structure)

When the source page has multiple sections (Works, Catalog, Videos, Merchandise, Café, Bonus Freebies, External Links, etc.), iterate every section once. For each, ask:

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

## README per subject — recommended sections

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

## Visual-labeling failure modes I've hit

When you're vision-labeling images and want to map them to canonical pieces, watch for:

1. **Pokémon-ID errors from similar silhouettes.** Wingull confused for Lugia (both spread-wing bird shapes). Mantyke confused for Lapras/Wailord (both round whale-like). Shaymin confused for Meowth (round white body, round face). Always check whether your candidate Pokémon shares silhouette properties with a more famous Pokémon you might be defaulting to — and grep canonical TSV for both candidates.

2. **Crop-vs-wide-shot blindness.** A close-up of a vase surface looks completely different from the wide shot. The Hayama Yuki Universe vase looks like a blue starry sphere at 1×; at 50× zoom the same surface is densely embedded Pokémon. If you see a "new" close-up texture, ask: could this be a zoom into a piece I already have a wide shot of? Try matching surface pattern, not overall form.

3. **Wrong-reference comparison.** I compared a Kingler photo to Imai's Squirtle/Magikarp reference (smooth glossy ceramic) and concluded "not Imai." But Imai uses different surface treatments per piece — his Venusaur and Kingler use chip-fragment style; Squirtle/Magikarp are smooth. **One reference photo doesn't generalize across an artist's portfolio.** Check multiple reference photos before concluding "doesn't match artist X."

4. **Composition misreading.** "Two black spheres bound with rope" struck me as not-a-single-artwork. It IS Imai's Kingler — the bound-spheres arrangement is part of the composition. Compositions don't always have to match a "standard form" for the Pokémon depicted.

5. **Texture-to-medium inference is unreliable.** I called Yoshida Taiichiro's overlapping copper-scale technique "shredded paper / fibers." I called Ikemoto Kazumi's vitreous-pigment-on-glass "painted ceramic." A texture can have many candidate mediums; the **artist's documented medium** (per their README) overrides what you think you see.

## Cross-reference matrices — worked examples

Once you have multi-subject data, put a *cross-reference matrix* at the top-level `<topic>/README.md`. Examples that have proven valuable:

- **Subject × feature presence**: did each venue have a café? freebies? new works? collaboration items?
- **Subject × inventory counts**: pages/images/videos per venue, side by side.
- **Subject × dimensions**: poster sizes per venue, helps spot the low-res outliers.
- **Subject × dates**: chronological timeline of the whole tour, one row per stop.

## Working with the user's drops — full procedure

When the user adds files to `from_user/`:

1. **List what they dropped** — use `ls -la` (catches dotfiles + spaces).
2. **Read their `from_user/README.md` for notes** — they may have flagged what each item shows or why it matters. Their notes are gold; quote them in the parent README.
3. **Use `Read` on a representative image** — confirm what it shows so you can describe it in the parent README. (The `Read` tool can render images directly; use it.)
4. **Don't move their files into `images/`.** Leave them in `from_user/` and reference by path. They may keep adding.
5. **Integrate insight, not files.** Update the parent README's "Hero candidates" / "Gaps" / "Notes" sections with what you learned from their drops. If they found a higher-res poster than the auto-pass, surface it.

### `from_user_misc/` — cross-subject drops

In addition to per-subject `<slug>/from_user/` folders, expect a top-level `from_user_misc/` (or similar — the user names it). This is for leads that don't yet fit one subject: a list of social-media URLs, a press article that mentions multiple venues, screenshots of unsorted material. Same rules: leave files alone, fold insight into the right place. After integrating, update `from_user_misc/README.md` so it's clear what's unprocessed vs. integrated.

## What not to capture — full list

- **Site chrome** (logos, social icons, header SVGs) — fine if your script grabs them, but don't surface in the README.
- **Generic stock imagery** (Pixabay, Shutterstock placeholders) — usually not subject-specific.
- **Tracking pixels / analytics gifs** — `pixel.wp.com/g.gif`, `googletagmanager.com`, etc. Filter by zero-byte response or `image/gif` 1×1.
- **Social-media login walls** — if the page returns "log in to see this content," don't save the wall HTML.
