# Coverage Gaps

Use this file for craft guidance that needs accepted examples, screenshots, or low-false-positive checks before becoming reusable.

## Candidate gaps

- **Exemplars:** Add before/after UI examples only when the surface, failure, fix, and rationale are recorded.
- **Mechanical checks:** Candidate checks include off-token radii/shadows, text overflow, missing focus states, low contrast, excessive blur, or duration outliers; add only when the repo exposes stable tokens/components.
- **Theme conflicts:** Record examples where bold/distinctive, restrained/invisible, and platform-native themes should not be blended.
- **Quality rituals:** Add repeatable dogfood/unship/triage templates only after accepted team rituals exist.
- **Refinement-move numbers:** quieter's 70–85% saturation and 10–20px travel, and distill's 3–4 sizes / 2–3 weights, are single-source heuristics from Impeccable. Treat them as starting points until a local before/after confirms them.
- **Tactile-design values:** the tactile theme's numbers (the press ladder, the shadow alphas, the 13px base, sheet close at `min(64px, 15%)`) come from one production dashboard. Its sheet flick threshold corroborates Emil Kowalski's 0.11 px/ms. Treat the rest as one coherent theme to adopt whole, not as cross-theme facts. Its never-ship list could seed mechanical checks (a `transition: all` grep, `dark:` layout utilities, more than one primary per surface) once a repo exposes the tokens.
- **Worst-case data:** [worst-case-data.md](worst-case-data.md) is single-source (Emil Kowalski's `break-ui`). Its severity labels (Broken / Ugly / Fragile) are local to that report; add an accepted before/after exemplar before promoting any catalog row to a check.
- **Unverified platform claims from Fior's *Craft*:** the scroll-fade recipe in [surfaces.md](surfaces.md) was checked in Chromium and Firefox during QA (2026-11-18), which is why the source's always-on fallback was dropped; its inner-wrapper scrollbar variant is untested and looks doubtful. macOS font-smoothing rendering was not checked on a Mac. The claim that iOS Safari needs a `touchstart` listener before `:active` applies ([animations.md](animations.md) → Scale on Press) is single-source. Confirm these on real devices before promoting any to a check.
- **Construction drawings:** [construction-drawings.md](construction-drawings.md) is single-source (Plotter) and its numbers are one author's house standard. Only one local drawing exists (the no-data-in-range example). The cause → relationship table is this library's reading of the source's empty-state catalogue, and the motion section was not exercised here. No local checker: the reference points at upstream `check.py`. Add a second accepted drawing and an animated one before promoting any of it to a check.
- **Alignment pass:** [alignment-pass.md](alignment-pass.md) is single-source (the *gridlines* skill). Its Linear rules (headers on the icon edge, the top bar centred on the window controls) reach us only through that repo, because Karri Saarinen's redraw was not located. The vendored probe measures layout boxes, not painted ink. It reports false positives on nested rows and on narrower icons centred in the column, misses a box on the text line and shapes moved inside their SVG, and its headless runner fails on strict-CSP pages. `scripts/gridlines.test.mjs` pins all of these (2026-11-22). Fix them upstream, and update the test, before making the probe a gate.
- **AI-generated UI:** Route repair workflow to `working-with-ai`; this skill should own the craft bar and examples.
- **Interface Craft collections not yet mined:** Means & Methods (8 technique articles: layout/alignment, visual style errors, color/blending, typographic errors, interpolation/map-range, compositing, wave functions, masks), Collaborating with AI (8 entries incl. DialKit and agent skills), Interface Kit, Reference Desk.

## Candidate promotion form

```markdown
Candidate:
Surface:
Source or accepted before/after:
Rule:
Mechanical check possible:
Theme/exception:
Status: proposed | accepted | rejected
```
