---
name: research-cataloging
description: "Router for research, archiving, and cataloging: provenance bundles, OCR/transcription, exhaustive source sweeps, translation promotion, catalog reconciliation, NocoDB/Airtable ops, and archival image compression. Use before conversion skills to cover a whole site/course/source set, or whenever you need a transcript. Read the reference for each stage. Triggers: Wayback, OCR, coverage ledger, captions, yt-dlp, Whisper."
---

# Research & Cataloging (router)

**Sources/gaps:** [references/sources.md](references/sources.md) maps the research/cataloging references; [references/coverage-gaps.md](references/coverage-gaps.md) parks source completeness, transcript, database, and handoff standards.

Read the one reference below that matches the task; each holds the full discipline for its area. For a pipeline task (research → reconciliation → NocoDB sync), read each stage's reference as you reach that stage.

**Second hop:** deeper worked procedures, helper scripts, and agent manifests live in a same-named subdirectory next to the reference (`references/<name>/…`). Each bullet names its members; open them through the parent reference, which says at which step each applies.

**Credentials:** the NocoDB helper script reads its token from the `NOCODB_API_TOKEN` environment variable (base URL from `NOCODB_BASE_URL`, default `http://127.0.0.1:3010`) and fails with a clear error if the token is unset. It never reads shell profiles.

- [references/archival-research.md](references/archival-research.md) — per-subject research bundles: web source trails with snapshots + attributed imagery, OCR/transcription of scanned PDFs into layered corpora, venue/exhibition/artwork dossiers. Second-hop members under `archival-research/`: capture-techniques, checklists-and-templates, local-corpus-ocr, attribution-discipline.
- [references/source-sweep.md](references/source-sweep.md) — exhaustive coverage of bounded sources: inventory every node, coverage ledger, open every page, never judge from titles.
- [references/catalog-reconciliation-research.md](references/catalog-reconciliation-research.md) — making structured records internally consistent: object identities, evidence tiers, image provenance/coverage audits, archive paths, downstream records. Second-hop member under `catalog-reconciliation-research/`: `agents/openai.yaml` (agent manifest).
- [references/source-translation-workflow.md](references/source-translation-workflow.md) — translation workflows: promoting translations into catalog records, quote fields, bilingual sources. Second-hop member under `source-translation-workflow/`: `agents/openai.yaml` (agent manifest).
- [references/nocodb-catalog-management.md](references/nocodb-catalog-management.md) — NocoDB operations: bases/tables/fields, records, linked-record relations, attachments, gallery views, CSV sync. Second-hop members under `nocodb-catalog-management/`: api-patterns, `scripts/nocodb_helper.py` (needs `NOCODB_API_TOKEN`), `agents/openai.yaml` (agent manifest).
- [references/image-archival.md](references/image-archival.md) — shrinking oversized images (PNG/TIFF/PSD) to visually identical smaller files: WebP/JPEG/AVIF re-encode, verify lossless, never overwrite originals. (Applies outside research contexts too — any "huge image, compress it" request.)
- [references/openai-transcription-chunking.md](references/openai-transcription-chunking.md) — transcribing audio/video into auditable transcript evidence: caption-first preflight with `yt-dlp` (YouTube, Instagram, Reels, TikTok, Vimeo, podcasts), then OpenAI/Whisper ASR when captions are missing, with chunking, hallucination audits, and per-chunk retries. Use whenever you need the actual words from a recording — including studying a creator's voice — rather than a webpage's paraphrase. Second-hop member under `openai-transcription-chunking/`: `agents/openai.yaml` (agent manifest).
- [references/coverage-gaps.md](references/coverage-gaps.md) — parked candidate standards for pagination completeness, transcript evidence, database write posture, source-to-skill handoff packets, and scanned-corpus sidecars.

Chains: research → reconciliation → NocoDB sync is the common pipeline; [references/archival-research.md](references/archival-research.md) is the entry reference and its Related-references block routes onward.

Also here: [references/airtable-mcp.md](references/airtable-mcp.md) (Airtable MCP setup/auth/troubleshooting in Codex + record ops) — second-hop member under `airtable-mcp/`: `agents/openai.yaml` (agent manifest).
