# Skill Output Evals — 2026-11

Routing probes test whether the right skill loads. These evals test the next question: once it loads, does the answer get better? Five judgment-heavy skills were run on three prompts each, with and without the skill, and graded blind.

## Result

| Skill | With skill | Without skill | Cases where the skill changed the result |
| --- | --- | --- | --- |
| `creative-coding` | 12/12 | 8/12 | 2 of 3 |
| `learning-experience-design` | 12/12 | 10/12 | 1 of 3 |
| `personal-growth` | 13/14 | 10/14 | 2 of 3 |
| `product-decision-making` | 12/12 | 11/12 | 1 of 3 |
| `write-clear-prose` | 10/12 | 11/12 | 0 of 3 (one regression) |
| **Total** | **59/62** | **50/62** | |

Each arm was run once, so a one-assertion difference is within noise. Read the table as "where to look", not as a score.

## Per case

| Skill | Case | With | Without |
| --- | --- | --- | --- |
| `creative-coding` | ember-particles-state-loop | 4/4 | 2/4 |
| `creative-coding` | flocking-neighbor-search | 4/4 | 4/4 |
| `creative-coding` | physics-library-threshold | 4/4 | 2/4 |
| `learning-experience-design` | diagnoses-non-learning-gap | 4/4 | 4/4 |
| `learning-experience-design` | job-aid-over-memorization | 4/4 | 4/4 |
| `learning-experience-design` | skill-needs-spaced-practice | 4/4 | 2/4 |
| `personal-growth` | persist-or-quit-judges-trajectory | 5/5 | 5/5 |
| `personal-growth` | red-flag-pauses-coaching | 3/4 | 2/4 |
| `personal-growth` | stuck-does-not-pronounce-a-career | 5/5 | 3/5 |
| `product-decision-making` | friction-as-value-exchange | 4/4 | 3/4 |
| `product-decision-making` | metric-win-versus-judgment | 4/4 | 4/4 |
| `product-decision-making` | proposal-review-three-questions | 4/4 | 4/4 |
| `write-clear-prose` | ai-sounding-draft | 3/4 | 4/4 |
| `write-clear-prose` | exec-update-from-notes | 3/4 | 3/4 |
| `write-clear-prose` | tighten-memo-keeps-facts | 4/4 | 4/4 |

## What the skills changed

- **`creative-coding`:** the baseline added forces straight into velocity and left buoyancy, drift and decay as unnamed numbers; the skill run kept position, velocity and acceleration separate and exposed named constants with a seed. On the physics-library case, only the skill run covered world-unit-to-pixel scaling and a fixed step separate from drawing.
- **`learning-experience-design`:** on the manager-feedback workshop, the baseline listed six generic outcomes and claimed "~70% practice" over an agenda that was about 40–45% practice. The skill run stated one goal as an action in a situation and built the day around feedback rounds.
- **`personal-growth`:** on the "stuck" case, only the skill run gave an if-then plan and a review date with persist, modify, pause and stop criteria. On the red-flag case, the baseline declined the 30-day plan in words and then delivered a five-item "gentler" daily routine; the skill run set the plan aside.
- **`product-decision-making`:** the baseline named what a phone-number gate costs users but never said what they receive for it.

## Findings to act on

1. **`personal-growth` red-flag reply named a condition (fixed, re-run once).** Both arms explained the thought as depression or exhaustion ("something depression and exhaustion often say"). The Boundaries line now also forbids naming a condition as the cause of a thought or feeling. A single re-run of the skill arm after the edit did not name one; that re-run was graded by the editor, not blind.
2. **`write-clear-prose` produced a longer rewrite (fixed, not re-run).** On the AI-sounding draft, the skill run refused to invent product facts and returned a bracketed template of about 88 words against a 49-word original. The baseline wrote a 45-word version. The refusal is correct; the length is not. The skill's rules now say to cut to what the draft does say and list the missing facts as questions.
3. **Both arms added "$160k over 12 months" to the exec update.** It is derived from the notes ($40k × 4), and the skill run disclosed that. Decide whether derived arithmetic counts as an added claim, then tighten the assertion's wording.
4. **Nine of fifteen cases do not discriminate.** `flocking-neighbor-search`, both passing `learning-experience-design` cases, `persist-or-quit-judges-trajectory`, `metric-win-versus-judgment`, `proposal-review-three-questions` and `tighten-memo-keeps-facts` passed fully in both arms. On these prompts the model already does what the skill asks. Replace them with harder prompts, or accept that the skill adds little there.
5. **Loose assertions flagged by graders:** `ember` #4 is compound (constants *and* a seed); `metric-win` #4 ("ends with") passes too easily; `ai-sounding` #4 ("shorter") is unclear when the rewrite is a template; `friction` #1 does not say whether "users get nothing back" counts as naming the return.

## Method

- **Cases:** `<skill>/evals/<case-name>/` with `prompt.md`, `case.yaml` and one grader file per assertion. This is the layout `claude plugin eval` reads.
- **Runs:** 30 headless runs, `claude -p --model sonnet`, one per arm per case, on 2026-11-12. The with-skill arm was told to read the skill's `SKILL.md` and follow its routing; the baseline got the prompt alone. Both ran from an empty directory so repo instructions did not leak into the baseline. Total cost was $2.53.
- **Grading:** responses were shuffled into X and Y per case. One grader per skill saw only the prompts, the two responses and the assertions, and did not know which arm was which. Grades were unblinded afterwards.
- **Limits:** one run per arm, one grader per case, sonnet only, and the with-skill arm was instructed to load the skill, so this measures skill content and not triggering. The headless runs inherited the account's user context (one reply addressed the user by first name).

## Rerun

With Claude Code installed, from a skill directory:

```bash
claude plugin eval
```

Without it, give each `prompt.md` to a fresh session twice, once with an instruction to read the skill first and once without, then grade both replies against `graders/` without knowing which is which. Run each arm at least three times before trusting a one-assertion difference.
