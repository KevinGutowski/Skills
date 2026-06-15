---
name: research-cataloging
description: "Router for research, archiving, and cataloging: provenance bundles, OCR/transcription, exhaustive source sweeps, translation promotion, catalog reconciliation, NocoDB/Airtable record ops, and archival image compression. Use before conversion skills when asked to cover a whole site/course/source set. Read one named reference. Triggers: research bundle, Wayback, OCR, scanned PDF, coverage ledger, Whisper, NocoDB, Airtable, compress image."
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

Also here: [references/airtable-mcp.md](references/airtable-mcp.md) (Airtable MCP setup/auth/troubleshooting in Codex + record ops) · [references/openai-transcription-chunking.md](references/openai-transcription-chunking.md) (Whisper/OpenAI chunked transcription with hallucination audits and per-chunk retries).
