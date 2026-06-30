# Research Cataloging Coverage Gaps

Use this file to park research and archive standards that need more evidence, examples, or user approval before becoming reusable rules.

## Candidate Gaps

- **Pagination completeness checks.** `source-sweep.md` requires full coverage, but common pager shapes (`rel=next`, `?page=2`, `/page/2`, API `total_page`) need a compact check pattern with examples before becoming a universal rule.
- **Article/interview capture completeness.** The skill needs accepted examples showing how to prove a captured article or interview is complete, especially where transcripts, "load more" regions, or multi-page articles are hidden.
- **Database write posture.** NocoDB/Airtable workflows need clearer examples distinguishing review-only source sweeps from approved live record updates.
- **Transcript source hierarchy.** `openai-transcription-chunking.md` gives caption-first rules, but the skill still needs examples for choosing between uploaded captions, auto-captions, ASR retries, and human cleanup when they disagree.
- **Source-to-skill handoff packets.** Sweeps often feed `creating-skills`; the exact review packet shape for mined lessons, rejected candidates, and coverage gaps should be standardized after a few more examples.
- **Local scanned corpus sidecars.** `archival-research.md` defines raw OCR / cleaned / translated layers, but needs more examples for where to store sidecars relative to mixed image/PDF source folders.

## Promotion Form

```markdown
standard/{stable-id}
Status: proposed | accepted | rejected
Research mode:
Scope:
Rule:
Evidence required:
Exceptions:
Example source:
Bad example:
Good example:
Approver:
```
