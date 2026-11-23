# Coverage Gaps

Use this file for design-system standards that are plausible but not yet supported strongly enough to become reusable guidance.

## Candidate gaps

- **Agent context pack exemplars:** Need accepted examples of a token/component/recipe pack that actually improved generated UI without dumping the whole design system.
- **Deterministic DS checks:** Candidate lint rules include off-token colors, unapproved radii, one-off shadows, missing focus states, unsupported component props, and undocumented variants. Add only when a repo exposes stable token/component metadata.
- **Product judgment boundary:** The DS can expose allowed substrate; it should not decide product-specific UX, copy, onboarding, or AI behavior unless those rules live in the owning skill.
- **AI-legible naming evidence:** Add examples where renaming tokens/props helped or hurt agent output before promoting naming rules beyond the existing source-backed guidance.
- **Governance fixtures:** Contribution, deprecation, and adoption dashboards need concrete templates if this skill starts generating DS governance artifacts repeatedly.
- **System quality audit examples:** Sten's warning that systems can speed, standardize, and scale poor work needs accepted examples before becoming a deterministic preflight beyond the current guidance.

- **Correction capture (Kowalski learn-taste, single source):** the five signals and the roughly 40-line threshold for moving a DESIGN.md section into a skill are one author's skill, not run here. Wanted: one real session mined this way, with the approved and skipped rules recorded.
- **Hands-on run numbers (design.how, single source):** merge tolerances (ΔE OK 2, 2 px, 1 px font size, 30 ms), the 30%-and-12 gap threshold, capture widths 390/1280 and scroller widths 390/768/1280/1920, the eight-surface "small app" cutoff, and the nine-heading doc order all come from one practitioner's migration. Treat them as defaults until a second source or a local run corroborates them.
- **Upstream scripts unreviewed:** the drift check, guarded capture, pixel diff, legacy ratchet, landing, and parity scripts are linked, not vendored. A line-by-line review is needed before recommending them as installable tooling rather than as a pointer.
- **No local exemplar of a hands-on run:** there is no accepted before/after report, mapping table, or component entry produced with these references yet.

## Candidate promotion form

```markdown
Candidate:
Owning section/reference:
Source or accepted DS example:
Mechanical check possible:
Rule:
Exception:
Status: proposed | accepted | rejected
```
