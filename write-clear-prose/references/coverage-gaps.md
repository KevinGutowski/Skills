# Coverage Gaps

Use this file for prose guidance that needs real samples, accepted edits, or factual verification before becoming reusable.

## Candidate gaps

- **Reference voice packets:** Add examples only from genuine samples with source URLs or provided text; avoid invented impressions of a creator's voice.
- **Fact-checking workflow:** The skill names a truth pass, but high-stakes citation/fact verification should use source-specific workflows before becoming a script.
- **Genre templates:** Add templates only after repeated user requests show a stable form, such as executive updates, op-eds, speeches, or technical explainers.
- **Boundary with `ux-writing`:** Product UI copy, settings, error states, and labels belong in `ux-writing`; this skill owns prose pieces.
- **Before/after exemplars:** Add anonymized examples only when the accepted rewrite and rationale are both available.
- **House-style ban promotion:** Add banned words or phrase warnings only from repeated accepted edits, and preserve the reason for each warning. A naked list of disliked tokens is not enough evidence.

- **Docs playbook is single-source:** `technical-docs.md` rests on Vercel's Writing Guidelines alone. The numeric limits (80 columns, 25 lines, sentences under 20 words, paragraphs of two to four sentences) and the placeholder and unit conventions are that house's choices and have no second source or accepted local edit behind them. The content-type split matches the widely used tutorial / how-to / reference / explanation model, which was not read as a source here.
- **Reader-pressure words and "by monkeys":** added to the cut list with their reasons, on one source, ahead of the repeated-accepted-edit bar the previous entry sets. Demote them if they start producing token-swapping instead of rewrites.
- **AI-default additions evaluated once:** recap openers, staccato fragments, datasheet verbs, and borrowed frames were added to the AI-Default Pass on 2026-11-18. The `ai-sounding-draft` eval was re-run once the same day: 4/4 in both arms, and the skill run's rewrite was the shorter one (19 words against the baseline's 47), so the earlier length regression did not recur. One run; not evidence that the additions help.
- **No docs eval case:** nothing under `evals/` exercises `technical-docs.md` (a docs review with a `file:line` list, or the page test).

## Candidate promotion form

```markdown
Candidate:
Genre or move:
Source or accepted rewrite:
Audience/context:
Rule:
Bad example:
Good example:
Exception:
Status: proposed | accepted | rejected
```
