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
- **AI-generated UI:** Route repair workflow to `working-with-ai`; this skill should own the craft bar and examples.

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
