# Coverage Gaps

Use this file for craft guidance that needs accepted examples, screenshots, or low-false-positive checks before becoming reusable.

## Candidate gaps

- **Exemplars:** Add before/after UI examples only when the surface, failure, fix, and rationale are recorded.
- **Mechanical checks:** Candidate checks include off-token radii/shadows, text overflow, missing focus states, low contrast, excessive blur, or duration outliers; add only when the repo exposes stable tokens/components.
- **Theme conflicts:** Record examples where bold/distinctive, restrained/invisible, and platform-native themes should not be blended.
- **Quality rituals:** Add repeatable dogfood/unship/triage templates only after accepted team rituals exist.
- **AI-generated UI:** Route repair workflow to `working-with-ai`; this skill should own the craft bar and examples.
- **Parked component recipes (2026-07 ui-skills fold):** Raphael Salaja's full morphing-icons component (line tables, `useSpring` rotation, reduced-motion gating — github.com/raphaelsalaja/skill) is linked from animations.md but not vendored; Budge's Next.js widget runtime (github.com/millionco/skills) is tooling, not craft guidance — only its token-snapping/coupled-parameter principles were folded into SKILL.md § Live tuning. Promote either only with an accepted in-repo example.

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
