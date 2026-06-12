---
name: research-cataloging
description: "Router for research, archiving, and cataloging work — web research bundles with provenance and saved snapshots, OCR/transcription of scanned PDFs into corpora, exhaustive source sweeps with coverage ledgers, translation promotion into catalogs, catalog/record reconciliation and image-provenance audits, NocoDB record operations, archival image compression. Read this skill's body, then read the named reference file. Triggers: research bundle, source trail, Wayback Machine, museum research, OCR, scanned PDF, source sweep, coverage ledger, catalog reconciliation, provenance, evidence tier, translation promotion, NocoDB, linked records, compress image, shrink PNG, visually lossless."
---

# Research & Cataloging (router)

Read exactly one reference file below; each holds the full discipline for its area.

- [references/archival-research.md](references/archival-research.md) — per-subject research bundles: web source trails with snapshots + attributed imagery, OCR/transcription of scanned PDFs into layered corpora, venue/exhibition/artwork dossiers.
- [references/source-sweep.md](references/source-sweep.md) — exhaustive coverage of bounded sources: inventory every node, coverage ledger, open every page, never judge from titles.
- [references/catalog-reconciliation-research.md](references/catalog-reconciliation-research.md) — making structured records internally consistent: object identities, evidence tiers, image provenance/coverage audits, archive paths, downstream records.
- [references/source-translation-workflow.md](references/source-translation-workflow.md) — translation workflows: promoting translations into catalog records, quote fields, bilingual sources.
- [references/nocodb-catalog-management.md](references/nocodb-catalog-management.md) — NocoDB operations: bases/tables/fields, records, linked-record relations, attachments, gallery views, CSV sync.
- [references/image-archival.md](references/image-archival.md) — shrinking oversized images (PNG/TIFF/PSD) to visually identical smaller files: WebP/JPEG/AVIF re-encode, verify lossless, never overwrite originals. (Applies outside research contexts too — any "huge image, compress it" request.)

Chains: research → reconciliation → NocoDB sync is the common pipeline; [references/archival-research.md](references/archival-research.md) is the entry reference and its Related-references block routes onward.
