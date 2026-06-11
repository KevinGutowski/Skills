# Book-mining handoff (2026-06-11)

Operating manual for continuing the book→skill mining pipeline on this corpus
(96 skills, github.com/KevinGutowski/Skills). Written for any agent (Codex, Claude,
human) picking up where the prior sessions left off. Companion files:
`docs/mining-ledger.md` (full history + parked candidates + rechecks),
`docs/skill-listing-budget.md` (description-budget constraints),
`docs/pending-folds-product-trio.md` (verified quotes ready to fold),
`creating-skills/SKILL.md` House Style section (the canonical authoring rules).

## The pipeline (per book or book-batch)

1. **Extract.** Source library: `~/Library/Mobile Documents/iCloud~com~apple~iBooks/Documents/`
   (106 items). PDFs → `pdftotext`. EPUBs → unzip/walk `*.x?html` files, strip tags
   (some EPUBs are directories, not zip files — handle both). Output to `/tmp/books/<slug>.txt`.
   Image-only PDFs (e.g. Gal Shir's *60 Tips for Logo Design*) need OCR — flag, don't fake.

2. **Screen** (one agent per book or coherent trio, reads IN FULL — no skimming):
   - **Density verdict** (high/med/low) with brutal honesty about model-known content.
     The model already knows: famous frameworks (Radical Candor 2x2, build trap, Lean UX
     hypotheses, Laws of UX, Refactoring UI's core advice, BICEPS-as-acronym, design
     psychology staples). What's additive: named procedures with steps/numbers/scripts,
     worked examples, decision tables, specific values with reasoning.
   - **Fold-routing table**: lesson → verified quote → target skill / new-skill candidate /
     skip-as-known. Check existing neighbors' SKILL.md before routing.
   - **Fold-vs-create call** under governance (below).
   - **Emit a quotes.json manifest** of all verified quotes (q + src + route) so fold
     agents copy verbatim instead of retyping (kills transcription drift).

3. **Fold/create** (agents with disjoint file targets, parallel):
   - Verify quotes in BATCH: `python3 scripts/verify_quotes.py SOURCE... <<'EOF'` (one
     quote/line; handles curly quotes, OCR mid-word spaces, stutter, ellipsis fragments).
     MISS = fix wording from source or drop. NEVER ship unverified quotes.
   - Merge into the relevant section, don't append at the end. Bodies ≤5k tokens —
     push depth to `references/` (## Contents on >100-line files).
   - **PR #5 review lesson:** treat the 5k body budget as a hard operating cap even
     when the validator is clean. Main `SKILL.md` bodies keep routing rules, the
     durable operating move, and at most one load-bearing quote per point; full quote
     banks, source texture, examples, and secondary deltas move to the nearest
     `references/` file with a pointer back from the body. The accepted pattern was:
     Made to Stick sticky-framing stayed in `design-org-influence`, but its full
     SUCCESs notes moved to `references/influence-field-notes.md`; Buley's influence
     stance stayed in `design-org-influence`, while prototyping/session mechanics
     stayed in `design-prototyping` with depth in references.
   - Cite: (Author, *Book*, chapter). Era-tag stale specifics ("verify against current docs").

4. **Gate + ship**: run `python3 scripts/validate_skills.py` from repo root; independent
   spot-check (~5 quotes re-verified by the orchestrator); for NEW skills add a README
   row + 2-3 routing probes incl. a control (`~/.claude/skill-evals/routing-eval.md`,
   outside the repo) and spot-check them with a fresh agent reading descriptions only;
   commit + push as you go (Kevin's standing directive).

## Governance (the rules that decide fold-vs-create)

- **Extend > create > skip.** New skills need 2–3+ independent sources with ONE coherent
  task shape. Exception precedent: a single deep source that is a complete named method
  (user-onboarding=Hulick, logo-design=Peters, form-design=Dannaway) — frame it as
  "the X method" in the description.
- Park borderline candidates in `docs/mining-ledger.md` with the named awaited source.
- **Conflicts are scoped, never merged**: competing schools get explicit routing
  (Rails four schools; shape-up's Basecamp/Linear/metrics-led schools; the polish-skills
  "themes" rule — pick one skill's values, never average). Platform splits are sacred
  (web vs Apple: typography, a11y, forms, motion — never cross-apply).
- **Descriptions**: 350–450 chars, official shape (what + use-when + boundary clause +
  triggers). Boundary clauses ("X → other-skill") are load-bearing — never cut them.
- **Cross-refs bidirectional** for load-bearing relationships.
- **Budget constraint** (see docs/skill-listing-budget.md): do NOT raise
  skillListingBudgetFraction. If a new skill joins a hubbed cluster (rails, research/
  cataloging), update the hub body AND the overlay snippet in that doc.
- Members-only/purchased sources → skill is gitignored, generalizable lessons distilled
  into public skills with citation (precedents: interface-craft-principles,
  graphics-fundamentals).

## Immediate queue (in order)

1. **Product trio folded 2026-06-11** — Perri / Gothelf-Seiden / Klein stayed NO new
   skill and landed in user-research, shape-up, user-onboarding, design-org-influence,
   and client-engagements. Manifest/archive: `docs/pending-folds-product-trio.md`;
   completion ledger: `docs/mining-ledger.md`.
2. **Remaining shelf** (extract + screen): ~~Kleon *Show Your Work*~~ folded 2026-06-11
   into building-in-public; ~~Heath & Heath *Made to Stick*~~ targeted fold 2026-06-11
   into design-org-influence; ~~Dirksen *Design For How People Learn*~~ created
   `learning-experience-design` 2026-06-11; ~~Buley *The User Experience
   Team of One*~~ targeted fold 2026-06-11; next: *Universal Principles of Design* (2003 — expect heavy model-known),
   *The UX Reader*, *Light: Science & Magic* + Tony Northrup (photography — assess
   whether a photography skill has a task shape Kevin needs), *Generative Design* (p5.js,
   dated), misc UX PDFs (Treder, UserTesting/UXPin guides — probably skip-thin).
3. **Ledger rechecks** (see docs/mining-ledger.md): Gal Shir OCR → second source for
   logo-design; web-information-architecture parked at ~2 sources (awaits Covert or
   Rosenfeld/Morville); design-prototyping+design-systems stayed <5k after slimming —
   keep them there; effectiveness-eval candidates: web-animation-design,
   malleable-software, web-typography, people-management.

## Quality culture (non-negotiable)

Agents read sources in full; every shipped quote is grep-verified; the orchestrator
independently spot-checks; honest density verdicts (most of a famous book is usually
skip-as-known — that's a finding, not a failure); report misses and corrections
faithfully. Screens that recommend "no new skill" are as valuable as creations.
