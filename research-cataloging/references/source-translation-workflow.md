# Source Translation Workflow

*Scope: Preserves, cleans, translates, and promotes multilingual research sources without collapsing provenance. Use for Japanese/English research translation, bilingual transcripts, ASR cleanup, source excerpts and Airtable excerpt fields, captions/subtitles, or publication copy derived from translated text. Triggers: translation workflow, four-layer transcript, translated from JA, direct transcript excerpt, interpreter echo, caption QA.*

Use this when research sources cross languages or when a transcript/excerpt must become reliable English research material. The goal is to keep source evidence, cleanup, translation, and publication/database use as separate layers.

## Contents

- Core rule
- The four layers
- Transcript workflow
- Article and excerpt workflow
- Status vocabulary
- Promotion guardrails
- Relationship to catalog reconciliation

## Core rule

Never treat generated captions, ASR, machine translation, or a cleaned transcript as the finished source. Preserve each layer and promote only source-backed text.

When the user asks for a translation, produce a faithful, readable direct translation by default. "Direct" means source-backed and unsummarized, not stiffly word-for-word. Do not substitute a summary, topic note, paraphrase, or "the source says..." research gloss unless the user explicitly asks for a summary. If both are useful, label them as separate layers: `Direct translation` and `Research summary`.

## The four layers

1. **Raw source evidence**
   - Platform captions, subtitle files, source HTML/PDF text, social captions, raw OCR, raw ASR JSON, and audio chunks.
   - Preserve exact files and metadata. Do not overwrite.
   - Use for provenance, timing, and audit.

2. **Working source-language text**
   - Cleaned transcript or extracted passage.
   - Fix obvious name drift, Pokemon names, craft terms, line breaks, duplicate ASR loops, and encoding damage.
   - Keep the original language: Japanese stays Japanese, English stays English.
   - This is still a working transcript/source text, not a summary and not publication copy.

3. **Manual English research translation**
   - Translate Japanese source text directly into English.
   - Preserve sentence-by-sentence meaning and the source's rhetorical shape as much as readable English allows; let English flow naturally when the source uses fragments or promotional cadence.
   - Do not collapse several source sentences into a summary or introduce summary phrasing such as "the article notes" unless that phrase exists in the source.
   - Use interpreter English, machine translation, or bilingual captions only as context/checks.
   - Remove interpreter echoes when they merely repeat a Japanese answer.
   - Mark uncertainty inline as `[unclear]` or `[translation uncertain]`.
   - Keep craft terms when useful: `kogei`, `urushi`, `raden`, `maki-e`, `yuzen`, etc., with plain-English glosses where needed.

4. **Structured or editorial promotion**
   - Airtable excerpts (Airtable MCP setup → the `airtable-mcp` skill; NocoDB operations → [nocodb-catalog-management.md](nocodb-catalog-management.md)), quote fields, source summaries, site copy, artist/venue notes, and public-facing prose.
   - Use only direct source text, direct transcript text, English originals, or manual translations of selected passages.
   - Link the promoted text back to local archive paths and source locators.
   - Keep summaries clearly separate from translated excerpts.

## Transcript workflow

Start with platform-native captions when available. For YouTube or Vimeo, save captions/subtitles and metadata before running new ASR. Use ASR only when captions are missing, incomplete, language-mismatched, or visibly unreliable.

For the mechanical OpenAI ASR pass, including chunking long recordings, preserving `openai_chunk_###.json`, detecting hallucinated loops, and retrying only failed chunks, use the `openai-transcription-chunking` skill first. Return here after the working transcript is assembled.

Preserve typical transcript artifacts:

- `<video_id>.<lang>.vtt` or caption JSON/Markdown
- `audio_16k_32k.mp3`
- `chunk_###.mp3`
- `openai_chunk_###.json` and retry JSON files
- `<video_id>_bilingual_raw.md`
- `<video_id>_bilingual_working_vN.md` or `<video_id>_working_vN.md`
- `<video_id>_english_session_vN.md`
- `audit.md` or caption QA notes

Before creating an English-only transcript:

- Confirm caption/ASR coverage and note what was missing.
- Scan raw and working transcripts for repeated phrases, chunk-boundary duplication, hallucinated loops, code fences, and known name/term drift.
- Retry only bad chunks or smaller time slices when ASR fails.
- Keep failed JSON for provenance but assemble working files from successful retries.
- Translate Japanese speech directly from the working transcript.
- Preserve English speech in cleaned English.
- Use interpreter English only as a check unless it contains unique content.

## Article and excerpt workflow

For written Japanese sources:

- Save the source page/PDF/OCR output before extraction.
- Select a bounded passage by line number, section heading, timestamp, or local source locator.
- Keep `Excerpt (JA)` as direct source text when rights and length allow.
- Write `Excerpt (EN)` as a manual, direct translation of that passage, not as a summary.
- Put any compressed explanation in a separate `Research Summary`, `Notes`, or `Evidence Use` field.
- Do not create an interview/practice-context record from a source that only provides metadata, a public paywall shell, or image captions unless the catalog explicitly tracks it as a source lead.

For English originals:

- Preserve the original passage as the English excerpt.
- Mark the status as `English original`; do not pretend it was translated.

## Status vocabulary

Use explicit statuses so downstream readers know what kind of text they are seeing:

| Status | Meaning |
| --- | --- |
| `Direct source text` | Exact text from a written source or caption. |
| `Direct transcript excerpt` | Exact passage from an audited transcript. |
| `Translated from JA` | Manual English translation from Japanese source/transcript text. |
| `English original` | Source was originally English. |
| `Working audited` | Transcript has been cleaned and checked enough for research extraction. |
| `English session reviewed` | English-only transcript has been manually translated/reviewed for research use. |
| `Source lead only` | Source has metadata/context but not enough accessible text for excerpt promotion. |

## Promotion guardrails

Promote translated material only when:

- The source locator is recoverable.
- The excerpt is tied to a specific speaker/source section.
- Japanese and English fields do not silently diverge.
- Uncertainty is marked instead of smoothed over.
- The final use distinguishes translated excerpt, summary, and editorial interpretation.

Do not promote when:

- The only available text is machine translation.
- ASR contains unresolved loops or severe name/term drift.
- Interpreter English contradicts or compresses Japanese and the Japanese has not been checked.
- A source is paywalled or unavailable and only the public shell was captured.
- The passage is actually a summary of several places but is being stored as a quote/excerpt.

## Relationship to catalog reconciliation

Use [catalog-reconciliation-research.md](catalog-reconciliation-research.md) after this workflow when translated excerpts need to become database records, source links, local archive pointers, site content, or cross-linked artist/artwork evidence.

This workflow produces trustworthy text layers. Catalog reconciliation decides how those layers become structured records.
