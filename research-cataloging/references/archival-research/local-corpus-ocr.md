# Local-source corpora — OCR layer specs, geometry, cadence

Full detail for the "Local-source corpora: OCR → clean → translate" mode summarized in the parent reference, [archival-research.md](../archival-research.md) (in `research-cataloging`). Everything below is the canonical wording.

## The three layers

The layers mirror the auto-vs-curated split that governs the whole skill:

1. **`*_ocr_pages/` — raw OCR (auto).** Machine output, one file per logical page, never hand-edited. On macOS, prefer the **Apple Vision framework** (`VNRecognizeTextRequest`, `.accurate`, set `recognitionLanguages`) over Tesseract for CJK and mixed layouts — it is dramatically more accurate, runs locally with no API/network, and returns per-line bounding boxes + confidence. A compiled Swift binary OCRs a 300-DPI page in ~2s. Emit a JSON sidecar per page (bbox + confidence per line) — it's what makes verification croppable. Carry a `Source locator` line (source file + page) in every output so provenance is recoverable, exactly like a web bundle's source URL.
2. **`cleaned_text_pages/` — audited source-language transcription (curated).** Created only after checking the OCR against the page image. This layer is *sacred* the same way `from_user/` is: the raw layer must never overwrite it.
3. **`translated_text_pages/` — translation (curated).** Built *from the cleaned layer*, not from raw OCR, with uncertainty preserved inline in `[brackets]`.

## Page geometry

**Page geometry matters.** Two-page magazine spreads render as one landscape image; split at the gutter into single pages before OCR — it removes the cross-column reading-order problem and isolates dense tables. Check binding direction from the folios (page numbers): if they increase left→right the spread reads L→R; a right-bound Japanese magazine reads R→L.

## "READ the page yourself" applies verbatim to OCR

**"READ the page yourself" applies verbatim to OCR.** OCR confidence is the script's signal; your eyes are the primary tool. For low-confidence regions, crop the bbox, re-OCR the crop in isolation (single lines are far more accurate), and if still unclear **open the crop with `Read` and read it yourself.** Only what's genuinely illegible gets flagged to the user. Note that low confidence ≠ wrong — display type and stylized headings routinely score ~0.3 while being perfectly correct; confirm by eye rather than "fixing" them.

## Bundle layout (local mode)

```
<corpus>/
  <source>_ocr_pages/<source_id>/page_NNN[_L|_R].md   raw OCR (auto), + _json/ sidecars
  cleaned_text_pages/<source_id>/page_NNN[_L|_R].md    audited source-language (curated)
  translated_text_pages/<source_id>/page_NNN[_L|_R].md translation (curated)
  <source>_ocr_manifest.tsv     one row/page: source, page, dims, confidence, quality flag
  STATUS.md / VERIFICATION_SUMMARY.md   the README-as-index for this corpus
```

## Cadence and index forms

**Same cadence: pilot then batch.** OCR one magazine end-to-end (benchmark engine + DPI, validate splitting and reading order), record the findings in a `SPEED_LAB.md`/`STATUS.md`, then batch the rest with the validated config. Keep auto and curated separate so a re-run of the OCR layer never clobbers audited text — identical to "the script captures, the README curates."

**README-as-index, varied forms** apply unchanged: a manifest TSV (machine log), a status doc (what's done, what's flagged), a **glossary box** for recurring source-language terms, and a flagged-pages gap list with the residual that needs human eyes. (This mode was added after an OCR-a-magazine task reinvented all of the above from scratch instead of starting here.)
