---
name: research-cataloging-hub
description: "Router for research, archiving, and cataloging work — web research bundles with provenance and saved snapshots, OCR/transcription of scanned PDFs into corpora, exhaustive source sweeps with coverage ledgers, translation promotion into catalogs, catalog/record reconciliation and image-provenance audits, NocoDB record operations, archival image compression. Read this skill's body, then invoke the named member skill. Triggers: research bundle, source trail, Wayback Machine, museum research, OCR, scanned PDF, source sweep, coverage ledger, catalog reconciliation, provenance, evidence tier, translation promotion, NocoDB, linked records, compress image, shrink PNG, visually lossless."
---

# Research & Cataloging (router)

Invoke exactly one member skill via the Skill tool; its full body loads on demand.

- `archival-research` — per-subject research bundles: web source trails with snapshots + attributed imagery, OCR/transcription of scanned PDFs into layered corpora, venue/exhibition/artwork dossiers.
- `source-sweep` — exhaustive coverage of bounded sources: inventory every node, coverage ledger, open every page, never judge from titles.
- `catalog-reconciliation-research` — making structured records internally consistent: object identities, evidence tiers, image provenance/coverage audits, archive paths, downstream records.
- `source-translation-workflow` — translation workflows: promoting translations into catalog records, quote fields, bilingual sources.
- `nocodb-catalog-management` — NocoDB operations: bases/tables/fields, records, linked-record relations, attachments, gallery views, CSV sync.
- `image-archival` — shrinking oversized images (PNG/TIFF/PSD) to visually identical smaller files: WebP/JPEG/AVIF re-encode, verify lossless, never overwrite originals. (Applies outside research contexts too — any "huge image, compress it" request.)

Chains: research → reconciliation → NocoDB sync is the common pipeline; `archival-research` is the entry skill and its Related-skills block routes onward.
