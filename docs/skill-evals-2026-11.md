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

## 2026-11-18 addition: `faux-ui`

Three cases for the new `faux-ui` skill, run with and without it. The output is a picture, so each build was rendered in headless Chromium and graded from the images. Two rounds were run the same day; the second is the current one.

| Case | With (round 2) | Without (round 2) | With (round 1) | Without (round 1) |
| --- | --- | --- | --- | --- |
| hero-still-beside-copy | 6/6 | 3/6 | 6/6 | 2/6 |
| bento-five-features | 5/6 | 2/6 | 6/6 | 3/6 |
| upload-loop-with-cursor | 6/6 | 3/6 | 6/6 | 4/6 |
| **Total** | **17/18** | **8/18** | 18/18 | 9/18 |

Round 1 used the first wording of the skill and the graders. Its graders flagged eight loose assertions, and it exposed two rules the skill run still broke. Round 2 rebuilt the with-skill arm against the revised skill and regraded both arms blind against the tightened graders; the baseline builds are the same files in both rounds, since the baseline prompt did not change. The rounds are not comparable score for score.

The skill changed the result in all three cases in both rounds. Each arm was built once per round and each case had one grader, so read this as "the skill moves the picture in the direction it claims", not as a score.

Round 2's builds, renders, and the exact capture commands are in `docs/evidence/faux-ui-evals-2026-11/` (its README lists them). After round 2, two graders were extended to fail a real word cut by a crop (loop #6, bento #3), because both skill builds had one and no assertion caught it; round 2's scores predate that change, and by it the skill run would lose one point in each of those two cases.

### What the skill changed (round 2)

- **Hero still.** The baseline put a whole small window, a tilted floating ticket card, and an "Assign to" panel on a rounded lavender gradient plate, with a status pill on every row and a count beside every teammate (17 real strings). The skill run drew one window a gutter in from the top and left that runs off the right and bottom of a white stage, nine real strings over placeholder rows, and an open assign menu kept whole inside the frame.
- **Bento.** The baseline had four UI-fragment tiles, no stat tile (three small countdown rings instead), a tracked-caps eyebrow over a heading and a description in every tile, and letter-in-a-colored-square logos for real companies. The skill run had one hero tile with the only window chrome, one "14m" at 72px on a single line, an assignee menu, a draft card, and integrations as plain wordmark chips bleeding off the edge.
- **Loop.** The baseline filled the slot edge to edge with a gray-tinted app surface, dragged the file with the cursor sitting on its name, and reset by fading the new row out. The skill run cropped a window off the right and bottom of a white stage, gripped the file clear of its label, and reset by having the cursor press a trash button on the row.

### Findings

1. **The reset rule now holds (fixed after round 1, confirmed in round 2).** In round 1 both arms faded out the row the loop had added, and a loose assertion passed both. The assertion now fails an uncaused fade, and step 6 of the skill's workflow says a fade is not a cause. In round 2 the skill run reset with a visible cause and the baseline failed.
2. **"Say each thing once" still fails in the bento.** In round 2 the skill run repeated a customer's name and a ticket title across tiles (the baseline repeated a name too). The rule is in `bento-grids.md` and in the plan's five questions; the builder did not apply it. Not fixed.
3. **The void under tile copy is smaller, not gone.** Round 1's skill run pinned pictures to the bottom of four tiles. After the "one gap below the copy" clause was restored, round 2's stat tile sits under its copy, but the three lower tiles still leave more air than one gap.
4. **Defects no assertion covers, round 2 skill run:** the loop's bottom file row is cut mid-text by the stage edge, which the framing rules forbid; the bento's third integrations row cuts a wordmark mid-word; the hero's window shadow is clipped into a faint plate-like edge at the bottom-left. Round 1's loop shipped a clipped "Just now" label. Three of the four are crop faults a builder should catch from its own render.
5. **Filming is used when it is cheap.** Round 1's loop builder did not film the loop. With `scripts/contact-sheet.mjs` in the skill, round 2's did, and said so. One observation each way, not a measurement.
6. **Remaining ambiguity in the graders:** hero #4 (a baseline whose selected row is bars plus a pill while the ticket's words sit on a floating card passed on a lenient reading), bento #6 (what counts as "miniature UI" when a tile is a big number or name chips), loop #5 (whether a list row is a "control" for the idle cursor).
7. **The no-kit path is what was tested.** Both arms wrote plain HTML and CSS. The skill's recommended path for React work, with Stageshow's kit and filming script installed, was not exercised in the eval.

### Method

- **Cases:** `faux-ui/evals/<case-name>/` in the standard layout, six assertions each.
- **Runs:** fresh subagents on sonnet, one per arm per case, on 2026-11-18, each confined to its own empty directory. The with-skill arm was told to read `faux-ui/SKILL.md` and follow its routing, with the kit not installed; the baseline got the prompt alone and was told not to read the repository. Both arms were offered the same optional headless-browser command to look at their work; in round 2 the with-skill arm could also run the skill's own script. This differs from the earlier runs in this file, which used `claude -p`.
- **Rendering:** stills at 2x; the bento as a full-page image at 1.5x; the loop as a contact sheet of half-size frames every 0.5s for 20s plus four full-size frames (round 2 used the skill's `contact-sheet.mjs --loop 19000`).
- **Grading:** outputs were copied to X and Y per case with the arm hidden, in a different order per case and per round. One fresh grader per case saw only the prompt, the two builds, their renders, and the assertions, and graded from the image first and the source second. Grades were unblinded afterwards.
- **Limits:** one build per arm per round, one grader per case, sonnet only, the skill was loaded by instruction, and half-size contact-sheet frames hide small defects. The assertions were written and then tightened by the person who wrote the skill, after seeing round 1's builds, so they test what the skill teaches; they do not test whether a designer would prefer the result. Round 2's baseline scores come from regrading round 1's baseline builds.

### Round 3: the fallback path with exemplars

The skill gained two original exemplars to copy from (`faux-ui/examples/still-hero.html` and `bento.html`), because rounds 1 and 2 showed builders working from rules alone getting scale and density wrong. The hero and bento cases were rebuilt once more against that version and graded blind against the same baseline builds, with the current graders (including the two extended after round 2).

| Case | With skill | Without |
| --- | --- | --- |
| hero-still-beside-copy | 6/6 | 3/6 |
| bento-five-features | 5/6 | 2/6 |

- **What changed in the picture:** UI type dropped to 11 to 14px, weights lightened, row pitch tightened, and tile copy sat at 17px over the picture with one gap. The bento stopped repeating a name across tiles. Each grader was also asked which build a product designer would sooner ship, and chose the skill build both times.
- **What the bento builder did not copy:** the exemplar's variety. It kept one ground for every tile and built three UI tiles plus a stat and text chips, where the exemplar has a dark stat, a diagram, and an object. It also cut two wordmark chips mid-letter at the tile edge, which is the one assertion it failed. The collection rule in `bento-grids.md` now says a word may not be cut.
- **Caveat:** the skill file was edited to point at the exemplars seconds after these two builders were launched. Both reported using the exemplars, which their prompt named, so the result stands, but the routing text they read may have been the older one.
- The loop case was not rerun: there is no animated exemplar.

Renders and builds are in the evidence directory as `round3-*`.

### Kit path, for comparison (not part of the scores)

The eval tests the no-kit path. Its skill builds beat the baseline but are visibly weaker than Stageshow's own examples: larger type, heavier weights, one ground for every tile, no object or diagram tile. To see what the recommended path produces, the hero and the bento were built again with Stageshow installed, by a stronger model with room to iterate (film the closest gold example, copy it, replace look and content, film with `--gate`, fix; four and five rounds). Both ended `rehearsal passed`. The results are in the evidence directory as `kit-path-hero-still.png`, `kit-path-hero-loop-sheet.png`, and `kit-path-bento.png`, with their sources under `kit-path/` and the commands to regenerate them in that directory's README.

These were not graded blind, and they differ from the eval's skill arm in model, effort, and path at once. They are there to show the gap, and they are why the skill now says to use the kit for anything that ships.
