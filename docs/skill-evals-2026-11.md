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

With Claude Code installed and signed in, from a skill directory:

```bash
claude plugin eval .
```

That bare command grants only read-only tools and runs no scaffold, which is enough for the cases that only ask for a written answer. Cases that must edit files need grants, and cases with a fixture need the scaffold. For `ui-fx`, whose cases write components and whose composer case starts from a scaffolded project:

```bash
cd ui-fx
claude plugin eval . --scaffold --allow-tools Write Edit
# one case:
claude plugin eval . --case named-beam-binds-to-state --scaffold --allow-tools Write Edit
```

Put the target (`.`) before `--allow-tools`, which takes a list. Do not grant `Bash` for the composer case: the prompt says the user is offline, and without Bash no install can run. (An earlier `tool_used` grader asserting that no install ran was removed on 2026-11-19: with Bash withheld it passed by construction and added a free point to both arms.) Without `--scaffold` that case starts in an empty workspace, and without the `Write` and `Edit` grants its five file graders cannot pass. These commands follow the documented flags; they have not been run here, because the CLI is not authenticated in this environment.

Without it, give each `prompt.md` to a fresh session twice, once with an instruction to read the skill first and once without, then grade both replies against `graders/` without knowing which is which. Run each arm at least three times before trusting a one-assertion difference.

## 2026-11-18 addition: `ui-fx`

Run after the skill was written and revised, in answer to a QA note that the new-skill gate was unfinished.

| Skill | With skill | Without skill | Cases where the skill changed the result |
| --- | --- | --- | --- |
| `ui-fx` | 12/12 | 7/12 | 3 of 3 |

| Case | With | Without |
| --- | --- | --- |
| open-request-picks-a-moment | 4/4 | 2/4 |
| named-beam-binds-to-state | 4/4 | 3/4 |
| app-screen-gets-a-yes | 4/4 | 2/4 |

**What the skill changed**

- **Checkout "make it pop":** the baseline morphed the Pay button (spinner, green "Paid", tick), popped a badge on the receipt, offered one design, and held 650 ms after the payment succeeded before showing the receipt. The skill run sent a clip-path wave and canvas sparks from the press point, revealed the receipt under the wave front, added no wait, and named a quieter and a WebGL direction with costs.
- **border-beam on a composer:** both bound the beam to `isStreaming`, used a client component and gated reduced motion. Only the skill run put the state in text (`aria-busy`, a visible status) and gave a static cue under reduced motion. The baseline said its prop names were from memory; the skill run's library facts (version, clipping, radius from the first child, no reduced-motion handling in rotate types) match the libraries-dev reference.
- **Settings page "explore some dazzle":** the baseline argued for restraint, recommended its subtle tier, and its boldest ideas were a ten-dot CSS burst and a blurred header gradient. The skill run built a four-level switchable explorer up to a WebGL2 field with particles and a save wave, defaulted to the showiest level, and listed what was still open before shipping.

**Findings**

1. **Assertions tightened after grading (not re-run).** The grader called five loose: case 1 #1 (what counts as "originates from the button") and #4 (whether the built design counts as a direction), case 3 #1 ("lecture" is subjective), #2 (a ten-dot burst is technically a particle effect) and #4 (any "untested" disclaimer passed). Their wording is now stricter. Two baseline fails in case 3 and one skill pass in case 1 were borderline under the old wording.
2. **Two assertions do not discriminate.** `named-beam` #1 and #2 (bound to `isStreaming`, client component) passed in both arms.
3. **The skill run on the settings page still recommended a middle level** while defaulting to the boldest. That fits Finish mode on a shipped screen; the prompt said "explore". Watch for it on a re-run before changing the skill.
4. **Risk in the ambitious outputs:** the grader flagged untested Safari exposure (masked `backdrop-filter`), reliance on recent CSS, and a beam that would loop on a hung request. None was run in a browser.

**Method, and how it differs from the runs above**

- Six fresh subagents, one per arm per case, on the session's model rather than `claude -p --model sonnet` (the headless CLI was not authenticated in this environment). The with-skill arm was told to read `ui-fx/SKILL.md` and follow its routing; the baseline was told to read nothing under the skills repo. Each worked in its own empty directory and wrote a reply plus code.
- One blind grader saw the prompts, assertions and the six output directories, without knowing which arm was which, and was told to read the code and not trust the replies. Unblinded afterwards.
- Limits: one run per arm, one grader, nothing rendered or type-checked, no project fixture for the composer case (both arms had to create a stand-in), and the with-skill arm was instructed to load the skill, so this measures content and not triggering. A stronger model than the earlier runs may narrow or widen the gap.

### Re-run against the revised graders (2026-11-18, later the same day)

A second QA note pointed out that the 12/12 against 7/12 result predated five grader edits. Both arms were run again from scratch against the current skill and graders, with a fourth case added.

| Case | With | Without | First run (old graders) |
| --- | --- | --- | --- |
| open-request-picks-a-moment | 4/4 | 1/4 | 4/4, 2/4 |
| named-beam-binds-to-state | 4/4 | 2/4 | 4/4, 3/4 |
| app-screen-gets-a-yes | 4/4 | 1/4 | 4/4, 2/4 |
| ideas-only-no-edits (new) | 4/4 | 2/4 | — |
| **Total** | **16/16** | **6/16** | 12/12, 7/12 |

- **Changes since the first run:** checkout grader #2 now also requires the receipt to start appearing as soon as payment is confirmed, with no fixed hold over about 300 ms; the five assertions listed above were tightened; `ideas-only-no-edits` was added for the new "match the deliverable to the ask" step.
- **Checkout:** the baseline again inserted a hold after the confirmed response (900 ms this time, 650 ms before) and now fails #2 for it. The skill run's longest delay was a 300 ms stagger on the receipt body, with the header revealed at once.
- **Composer:** this time the baseline had no reduced-motion handling and no text state at all; the skill run had both.
- **Settings:** the baseline again argued for restraint and shipped one subtle variant. The skill run built four switchable levels defaulting to the fullest.
- **Ideas only:** neither arm edited the project. The baseline's roughly 18 ideas were lifts, tints, borders, glow and tilt with almost no costs; the skill run gave four tiered directions (foil edge, foil notebook cover, WebGL liquid metal, a light sweep from the toggle) with a cost each and one recommendation.

**Findings from the re-run**

1. **The skill run asked for a go-ahead to install a package the user had named** (border-beam). Fixed: a user who names the package has given the go-ahead (SKILL.md, libraries-dev, glimm). Not re-run.
2. **Assertions that still do not discriminate:** `named-beam` #1 and #2, and `ideas-only` #1 (both arms left the project alone, so the new workflow step is not what kept the skill arm from editing).
3. **Assertions the grader still found loose:** the "about 300 ms" threshold in checkout #2; `app-screen` #4 passes on "placeholder data to swap"; `ideas-only` #2 ("or similar"), #3 (static treatments have no trigger) and #4 (whether design caveats count as costs). Under a looser reading the baseline would score 8/16.
4. The grader could not verify the library facts the skill arm stated for border-beam; they are the ones in the libraries-dev reference, taken from the vendor's reference on 2026-11-18.

**Runner and tool grants.** Each arm was a fresh general-purpose subagent of this session with the full default tool set (file read/write/edit, shell, search, web). The `allowed_tools`, `max_turns` and `timeout_seconds` in each `prompt.md` are for `claude plugin eval` and were **not** enforced here. Limits were given by instruction only: work inside one empty directory, install nothing, run no dev server, write the user-facing reply to `reply.md`; the with-skill arm was told to read `ui-fx/SKILL.md` and its references and nothing else in the skills repo, the baseline to read nothing there. Compliance was not audited beyond the files left in each directory. The wrapper wording changed between runs: the first told agents to "create files there", the re-run said files may be created "if, and only if, the user's message calls for it", so that the ideas-only case was not biased toward building. The grader was a separate fresh subagent restricted by instruction to the run directories, blind to arm; arm order was mixed across cases. Still one run per arm per round, one grader per round, the session's model, nothing rendered.

### Third round (2026-11-18): five cases, after the independent review pass

Run after a third QA note and three independent adversarial reviews changed the skill and several graders. Both arms were run from scratch on all five cases.

| Case | With | Without |
| --- | --- | --- |
| open-request-picks-a-moment | 4/4 | 1/4 |
| named-beam-binds-to-state | 4/4 | 2/4 |
| app-screen-gets-a-yes | 4/4 | 1/4 |
| ideas-only-no-edits (now names border-beam and glimm) | 5/5 | 3/5 |
| subtle-request-stays-subtle (new) | 4/4 | 3/4 |
| **Total** | **21/21** | **10/21** |

- **Checkout:** the baseline again held the receipt after confirmation (850 ms) and kept its effect on the button and receipt badge. The skill run revealed the receipt through a circle expanding from the press point, moved focus to the receipt heading, offered glimm with its install command, and installed nothing.
- **Composer:** the baseline left reduced motion and any visible status to the user. The skill run gated the beam and put visible "Generating response…" text in a status region outside the button.
- **Settings:** the baseline argued for restraint and shipped one 2 px sweep. The skill run built four switchable levels and opened on the showpiece.
- **Ideas only, packages named:** neither arm edited the project or installed anything. The baseline said it did not know glimm; the skill run placed both packages and added material directions.
- **Subtle request:** both arms stayed quiet and dependency-free. The baseline's status text was visually hidden; the skill run had a visible label and capped auto-started drafts at five seconds.

**Order of events, stated plainly.** The ten runs were launched against the skill as it stood after the first three reviews. While they ran, a second-pass review led to further wording fixes in the skill and to four grader edits (status region required in two graders, no-install in one, a timer allowance in one). Grading used the final graders. The runs therefore predate the last wording fixes; none of those fixes changed a rule the graders test, but a purist reading is that this round measures the skill one small revision back.

**Findings**

1. **Still not discriminating:** `named-beam` #1 and #2, `ideas-only` #1, `subtle` #2. The ideas-only case shows that the model already leaves the project alone when told "just ideas", with or without the skill.
2. **Still loose, per the grader:** `open-request` #4 bundles four conditions; `app-screen` #4 lets a build with almost no effects pass on one sentence; `ideas-only` #4 and #5 do not say how to treat design caveats or an honest "I don't know this package"; `subtle` #1 has no opacity threshold.
3. **Unverified library facts** stated by the skill arm (glimm's size, border-beam's version and clipping) come from the references, which an independent fact-check corrected against the published packages the same day.
4. **Integration cost:** in two cases the skill arm rebuilt a whole component where a wrapper was asked for. Worth a line in the skill if it recurs.

**Runner:** as in the second round (fresh general-purpose subagents with the full default tool set, limits by instruction only, `prompt.md` tool grants not enforced, one run per arm, one blind grader restricted by instruction to the run directories, the session's model, nothing rendered).

### Composer case re-run with a project fixture (2026-11-18)

A fourth QA note pointed out that the composer case could pass on prose alone. It now ships a small Next.js project (`files/`: package.json, a page, `components/Composer.tsx` using `useChat`, its CSS module) with `place-files.sh`; grader 2 judges the edit on disk and a new grader 5 checks every `BorderBeam` prop and value against the documented set. Only this case was re-run, both arms, each starting from a copy of the fixture, blind-graded against the originals.

| Case | With | Without |
| --- | --- | --- |
| named-beam-binds-to-state (5 graders, fixture) | 5/5 | 3/5 |

- Both arms edited `Composer.tsx` in place, kept its behaviour, gated the beam on `isStreaming` and reduced motion, and gave the install command without installing.
- **Correction (same day):** this bullet and the 3/5 figure were wrong about `borderRadius`. The published border-beam 1.4.1 types and README accept it (and `duration`, `brightness`, `saturation`, `glowSize`, `hueRange`, `staticColors`, `css`, `onActivate`, `onDeactivate`); the grader's allowlist had been taken from the vendor's shorter agent reference. On a correct reading the baseline scored 4/5 here, failing only the visible status cue. See the next section for the corrected grader and re-run.
- The baseline passed `borderRadius={16}` and left the Send-to-Stop swap as the only cue besides the beam. The skill arm used documented props only and added visible "Generating reply…" text in a status region.
- With this, the five-case picture is: the other four cases as in the third round, and this case 5/5 against 3/5. The earlier 21/21 against 10/21 total predates the fixture and the fifth grader; adding this case's new figures in place of its old ones gives 22/22 against 11/22, across runs made at two different points in the day.
- Still loose, per the grader: assertions 1 and 3 are satisfied by one expression and do not discriminate; assertion 5 bundles three checks; assertion 4 does not say whether an always-mounted empty status element is acceptable.
- Same runner and limits as before.

### Composer case, corrected and made reproducible (2026-11-18)

A fifth QA note found three faults in the composer case, all confirmed:

- `case.yaml` did not register the scaffold, so `claude plugin eval` would start without the project. It now sets `context.scaffold_script: place-files.sh` (run with `--scaffold`).
- The fixture called a chat API that did not exist, so Send returned a 404. The fixture now uses a local `lib/chat.ts` hook that streams a fixed reply on timers, with `submitted`, `streaming` and `ready` states and a working Stop. It needs no network. A scaffolded copy was installed and built with `next build` to confirm it compiles.
- The prop grader rejected valid props. It now lists the full published 1.4.1 API. Graders 1–5 use `focus: { source: file, path: components/Composer.tsx }` so they judge the edited file; the install command is a `regex` grader on the last message; and a `tool_used` grader asserts no install command was run.

Re-run, both arms from the scaffolded fixture, blind-graded:

| Case | With | Without |
| --- | --- | --- |
| named-beam-binds-to-state (7 graders) | 7/7 | 5/7 |

- Both arms edited the file in place, kept the behaviour, bound the beam to `isStreaming`, used only valid props, and gave the install command.
- The baseline had no reduced-motion handling and no visible status text. The skill arm had both, and added the dependency line to package.json without installing.
- Graders 1, 6 and 7 did not discriminate. Grader 7 was judged by proxy in this run (no `node_modules`, no lockfile), because the subagent runner has no tool-call record; under `claude plugin eval` it checks the calls themselves. That run has not been made: the CLI is not authenticated in this environment.

This supersedes the 5/5 against 3/5 figure above. The other four cases stand as in the third round.

### Checkout case re-run against the tightened grader (2026-11-18)

A QA note pointed out that the checkout grader allowed a 300 ms hold and only asked when the first receipt content appeared, so a confirmed outcome could stay covered. Grader 2 now requires the outcome text to be readable at once, outside the swept area or under translucent light only. Only this case was re-run, both arms from an empty directory, blind-graded.

| Case | With | Without |
| --- | --- | --- |
| open-request-picks-a-moment | 3/4 | 3/4 |

This run is a tie, and it is recorded as one.

- **Grader 2 (the tightened one):** both passed. The skill arm put a visible "Payment confirmed" line outside the animated panel, at full opacity on the first frame, and revealed the receipt with a radial wave from the press point. The baseline's success text was the button label fading in over 160 ms, which the grader passed as borderline, and its receipt sat behind an 800 ms plus 180 ms timer chain.
- **Grader 1 (effect travels from the control):** skill arm passed; baseline failed (everything stayed on the button).
- **Grader 4 (names another direction with its cost):** the skill arm **failed**. It built its version and offered only tuning knobs, no alternative. The baseline passed on a borderline reading (one sentence on why not confetti). In the third round the skill arm had passed this grader, so the behaviour is not reliable.
- **Change made:** workflow step 9 now says a build never skips naming the directions it did not build, each with its cost. Not re-run after that edit.
- The grader also noted that assertion 2 does not say whether a short fade on the outcome text itself counts as hidden, and that assertion 3 is too easy.

With this, the standing figures per case are: checkout 3/4 against 3/4 (this run), composer 7/7 against 5/7, and the other three as in the third round. Different cases were last run at different points in the day against different revisions of the skill; treat the set as indicative.

### Checkout case, graders made explicit and re-run (2026-11-18)

After the tie above, a QA note asked for the first-readable-frame criterion to be explicit and for a distinct alternative with its trade-off to be required, and noted that the strengthened workflow step had not been re-run. Grader 2 is now three numbered conditions, the second being the first painted frame after confirmation (outcome text at near-full opacity, in its final position, not behind a fade, timer, mask or cover). Grader 4 is judged on the last message and requires a different effect or route, not a tuning knob or fallback, with a concrete cost; a remark about tone alone does not count. Both arms were run again from an empty directory against the current skill and blind-graded.

| Case | With | Without |
| --- | --- | --- |
| open-request-picks-a-moment | 4/4 | 0/4 |

- **Skill arm:** a clip-path reveal, wave and sparks from the press point inside the card; a "Payment confirmed" line outside the card, unanimated, present in the first frame; three alternative directions in the reply, one with an install command and a no-WebGL note; nothing installed. The missing-alternatives miss from the previous run did not recur.
- **Baseline:** a button morph with a 14 px halo; a 500 ms minimum spinner and a 900 ms hold before the receipt; the "Paid" label fading from opacity 0; in-progress state shown only as a spinner with screen-reader-only text; confetti declined on tone alone.
- The two borderline baseline passes in the previous run both became fails under the explicit wording, which is the point of the change, and also means this gap is partly the graders getting stricter. One run per arm.
- Still open, per the grader: whether a 14 px halo counts as leaving the button, and that the reply's named package was not looked up.

Standing figures per case, each from its latest run: checkout 4/4 against 0/4, composer 7/7 against 5/7, settings 4/4 against 1/4, ideas-only 5/5 against 3/5, subtle 4/4 against 3/4. The last three were run earlier in the day against an earlier revision of the skill.

### Composer case: one grader removed (2026-11-19)

The `tool_used` grader that asserted no install command was run has been deleted. The documented command withholds Bash, so it could not fail, and it was judged by proxy in the subagent runs. The case now has six graders. Dropping that point from the last run gives 6/6 with the skill against 4/6 without; nothing was re-run.
