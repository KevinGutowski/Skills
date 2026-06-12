# Catalog Reconciliation Research

*Scope: Turn archival research into a source-backed catalog — reconcile object identities, evidence tiers, image provenance, archive paths, downstream records. Use alongside archival-research when structured records (inventories, artworks, images, Airtable) need internal consistency; alongside source-translation-workflow when translations are promoted into catalog records. Triggers: catalog reconciliation, image coverage audit, provenance gap.*

Use this after or alongside [archival-research.md](archival-research.md). The archival reference governs gathering the source trail broadly; this one turns that trail into a maintained catalog where every object, image, source, and database row can be traced back to evidence.

When the source material is multilingual, use [source-translation-workflow.md](source-translation-workflow.md) first. That reference preserves raw text, working transcripts, manual translations, and excerpt statuses; this one then links those translated excerpts into the catalog.

## Core stance

Research is not done when a page is saved. It is done when the finding has been reconciled into the project's structured truth:

- The canonical object or subject identity is known, or the uncertainty is named.
- The source tier is explicit: primary, near-primary, secondary, visitor, mirror, or lead-only.
- The local archive path, source URL, source type, caption, dimensions, and notes are recorded.
- The best current asset is selected, while alternates remain preserved.
- Downstream records, indexes, and site data are updated from the same source-backed facts (Airtable MCP setup → the `airtable-mcp` skill; NocoDB operations → [nocodb-catalog-management.md](nocodb-catalog-management.md)).
- Gaps stay visible with exact next leads instead of disappearing into prose.

## Working loop

1. Start from the current structured inventory, not from search results.
   - Identify the row, subject, or gap being improved.
   - Read the existing status, source URLs, notes, and local paths before adding anything.
   - Avoid broad probing until candidate names, filenames, or URLs are evidence-backed.

2. Treat secondary sources as routers.
   - Fan wikis, mirrors, roundups, catalogs, search snippets, and press aggregators are useful for finding source trails.
   - Do not promote a claim from a secondary source as canonical until the linked primary, near-primary, archive comment, or caption trail has been checked.
   - If a mirror has a better image than the local primary archive, treat that as a smell: find the original media URL or missing source page.

3. Capture first, promote second.
   - Save source pages, social text, images, PDFs, captions, and probe outputs locally before changing the catalog.
   - Keep staging areas for extracted assets that are not yet matched to a specific object.
   - Promote only when caption, filename, nearby source text, visual review, or another evidence chain supports the assignment.

4. Record evidence level in the data, not just in notes.
   - Use statuses such as `confirmed_official_artist`, `confirmed_venue`, `confirmed_organizer_press`, `confirmed_media_caption_needs_primary`, `confirmed_official_object_list_image_gap`, or `needs_primary_verification`.
   - A row can be confirmed for title but still have an image gap.
   - A row can have a useful image while still needing primary confirmation.

5. Prefer exact caption and identity over high resolution.
   - A high-res image with uncertain identity belongs in staging or review candidates.
   - A lower-res primary caption can confirm a title, year, material, or object split even if it should not become the best image.
   - Shared/group images can support multiple objects only when the source text says so clearly.

6. Always try original-image recovery before final selection.
   - Check `srcset`, direct media URLs, CDN query variants, and archive-rewritten URLs.
   - For WordPress-style uploads, test removing generated size suffixes and `-scaled`.
   - For X/Twitter, inspect original media via VxTwitter or equivalent metadata, including dimensions.
   - Compare live pages with Wayback snapshots when pages are reused, redesigned, or partially removed.

7. Make every promotion reproducible.
   - Append to a machine-readable index when adding or moving image files.
   - Keep source URL, original image URL, source type, evidence status, dimensions, notes, and local path together.
   - If using scripts, write review manifests before network-heavy probes or bulk promotions.

8. Rebuild derived outputs from indexes.
   - After updating inventory or image indexes, regenerate best-image tables and site/database exports using the project scripts.
   - Best-image ranking should consider usable pixel area first, then source confidence as a tie-breaker.
   - Preserve alternates and process images even when they do not win the best-image slot.

9. Reconcile downstream systems as a graph.
   - Database rows should link to reusable Sources, not only raw URLs.
   - Images should link to Sources and local files.
   - Subjects such as artists, venues, art pieces, goods, food items, interviews, and images should have reciprocal links when the system supports them.
   - Audit for orphaned sources, missing local paths, missing attachments, and records that remain `Needs verification`.

10. Leave a continuation trail.
    - Update handoff/worklog files after meaningful progress.
    - State what changed, what was verified, what remains weak, and the next exact leads.
    - Prefer small, dated audit notes and TSVs over memory.

## Evidence ladder

Use the strongest available evidence, but preserve weaker evidence as leads:

| Tier | Examples | How to use |
| --- | --- | --- |
| Primary | Official site, museum page, artist post, official PDF, official social caption | Can confirm facts when caption/text is explicit. |
| Near-primary | Organizer PR Times, partner shop page, press kit, official campaign vendor | Usually strong enough for promotion with clear notes. |
| Source-router | Art catalog index, fan wiki file page, upload archive comments | Follow links; do not stop here. |
| Secondary | Media preview, review article, roundup, visitor guide | Useful for gap-fillers and discrepancy detection. |
| Visitor/social report | Blog, Note, Ameblo, visitor photo, uncited social image | Use only with clear captions or visual evidence; keep looking for primary. |
| Mirror | Bulbapedia/Bulbagarden hosted file, reposted image | Use as a high-res smell detector and source-trail clue. |

## Image promotion rules

Promote an image into a per-object folder only when at least one of these is true:

- The source caption explicitly names the object.
- The file path or filename includes the object title and the page context confirms the exhibition/project.
- The source page has an image/caption pair that can be parsed without ambiguity.
- A primary or near-primary source identifies a group image and the project intentionally maps the group image to each named object.
- The user supplied the image and its object assignment, in which case preserve it as `from_user` evidence.

Do not promote when:

- The caption belongs to a neighboring figure and the page layout is ambiguous.
- The image is only visually similar to the expected object.
- A secondary catalog row supplies a title but the linked primary source has not been checked.
- A generated URL probe returns an image but no source context confirms relevance.

## Probing discipline

Use URL probes only after a source-derived pattern exists:

- Build candidates from confirmed titles, known filename grammar, observed punctuation, and neighboring filenames.
- Save a candidate manifest before probing.
- Record all hits and misses.
- Treat 404s as evidence against that exact candidate pattern, not against the object's existence.
- Prefer focused probes around known URLs over broad permutations.

## Catalog outputs to maintain

Adapt names to the project, but keep these roles covered:

- Canonical inventory: one row per object/subject, with title, year, status, primary source, filename seeds, and notes.
- Image index: every promoted image with object, local folder, source URL, source type, status, dimensions, and notes.
- Best-image table: one selected image per object, regenerated from the image index.
- Source leads: unresolved source routes, candidate pages, and discrepancy notes.
- Promotion manifest: reviewed staging assets that are safe to copy into canonical folders.
- Handoff/worklog: dated human-readable continuation notes.

## Final response pattern

When reporting a reconciliation pass, keep it brief and source-shaped:

- New or updated records.
- Local files archived or promoted.
- Verification performed.
- Remaining weak spots and exact next leads.

If no new primary evidence was found, say that directly and record what was checked.
