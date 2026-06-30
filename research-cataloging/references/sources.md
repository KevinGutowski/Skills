# Sources

This source map records the provenance shape for the research/cataloging router.

## Reference map

- `archival-research.md` covers per-subject source bundles, snapshots, attributed imagery, OCR/transcription, and dossiers.
- `source-sweep.md` covers exhaustive bounded-source coverage, inventory, and coverage ledgers.
- `catalog-reconciliation-research.md` covers object identity, evidence tiers, image provenance, archive paths, and downstream record consistency.
- `source-translation-workflow.md` covers translation promotion into catalog records and bilingual source handling.
- `nocodb-catalog-management.md` covers NocoDB base/table/record operations and CSV sync.
- `airtable-mcp.md` covers Airtable MCP setup/auth/troubleshooting and record operations.
- `image-archival.md` covers visually identical image compression and original preservation.
- `openai-transcription-chunking.md` covers caption-first transcript capture and ASR fallback.

## Promotion rule

Promote a research/cataloging rule only when it comes from a completed source sweep, a repeated archival failure, a database consistency requirement, or a verified transcription/OCR workflow. Keep database writes review-only unless the task explicitly asks to write.
