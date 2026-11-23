# Measuring Whether a Skill Helps

*Scope: Task-completion evaluation of a skill (not routing): with/without-skill benchmark arms, what to score, reading transcripts for what agents actually read, thinning by evidence, wording that causes detours, and benchmark hygiene. Use when deciding whether a skill earns its tokens, cutting a skill down, or iterating one against real builds. Routing probes stay in House Style rule 3.*

*Source: Fernando Olivares, uikit-skill (MIT) — upstream docs: experiment-plan, thinning-plan, v0.9-adversarial-review, uikit-chat-list-sources (Oct 2026), https://github.com/notolivaresf/uikit-skill. One author's benchmark of agents building the same UIKit chat screen with Claude Code and Codex, with and without the skill. Single source: the method is general, the numbers are one task. Corroborates House Style rules 5 (front-load the body) and 7 (gotchas from observed failures).*

## Contents

- Set up the arms
- Score in this order
- Read the transcripts, not just the scores
- Thin by evidence
- Wording that causes detours
- Generative skills: when guidance makes output timid
- Visual skills: examples, re-runs, and filmed evidence
- Rules that reach the model by more than one path
- Hygiene: don't teach to the test
- Suite hygiene for sibling skills
- Finish gates, retrieval-backed skills, and pinned rule files
- Versioning and records

## Set up the arms

- **Always have a no-skill control on the same task, same models, same clean checkout.** Run each arm one build at a time on a quiet machine. If an arm differs from the control by less than the spread between control runs, call it no difference.
- **Match the comparison.** When comparing two platforms or two skills, give each side a skill of the same kind and similar size (a general skill against a general skill), or say why not.
- **Isolate what the agent sees.** Install exactly the arm's skill folders into the project (`.claude/skills/`, `.agents/skills/`), nothing global. Record the skill list the agent reports at start (Claude Code init event; Codex session log) in each run record and check it against the arm.
  - Claude Code: `--disable-slash-commands` hides *all* skills, including yours; a `permissions.deny` on `Skill(<name>)` stops a bundled skill from running but leaves it in the listing. Pick one approach per experiment and record it.
  - Codex: point `CODEX_HOME` at an empty directory; it may add its own system skills on first run, so record the list.
- **Only skill folders get installed.** A companion agent file (e.g. a reviewer under `.claude/agents/`) shipped next to the skill never ran in 8 of 8 builds because the harness copied only the skill folder. If the skill depends on it, ship it inside the install path or drop it.
- **Cheap checks before an expensive build:** a load check (does the agent list and invoke the skill, which reference does it open?), a handful of short prompts answered with and without the skill on a small model, and a review prompt against a known-bad file to see if the checklist catches its faults.

## Score in this order

1. **Behaviours that pass** (the task's acceptance checks).
2. **Agent cost:** wall time, turns, builds and failed builds, tokens. A skill that saves turns and failed builds is worth having even if the product is no faster. The measured win here was cost, not runtime: ~37% less wall time and ~27% fewer output tokens with all checks passing.
3. **The gap between models:** does the skill bring the weaker model up to the stronger one?
4. **Only then runtime metrics** (fps, hitches, launch, memory) — watch for regressions more than gains; mature baselines leave little to buy.

Also record whether the skill was invoked, which files were opened at which turn, and whether the agent followed the rule that mattered.

## Read the transcripts, not just the scores

- **The body is read once, early, and never re-read; references are opened 0-2 times.** In every transcript, SKILL.md was read at turn 1-2; one reference was opened once per run, others never. Whatever must change the code has to be in the body, short. (Same direction as rule 5.)
- **Charge every tool call to a phase** (reading, writing code, builds, failed builds, simulator by hand, own tests, waiting, final report). In this benchmark the agents' self-written UI tests were the largest phase (634-1,423 s per build) though the task never asked for tests — and one hung test run cost ~600 s by itself.
- **Read the generated code rule by rule** against the control builds: "does the code do what the rule says?" and "do the no-skill controls already do it?"

## Thin by evidence

The skill went from 3,928 to 621 words (later 826 after targeted additions) with no lost behaviour. The cuts that held:

- **Cut rules the no-skill controls already follow.** If every control build already does it, the rule spends tokens and buys nothing. Keep a rule when controls get it wrong *or* when an earlier skill version had pushed builds the wrong way (a rule can be needed to undo the skill's own past advice).
- **Move or cut surfaces the task doesn't have.** Material on keyboard, RTL, VoiceOver and images made one model implement all of it unasked: +22 turns, double the builds, 2.5x input tokens, no score gain. Keep such material behind an explicit "only when the screen has them" pointer, or out.
- **Cut process lines that leave no trace.** "How to work" timing advice and a closing self-review checklist were never followed in any transcript.
- **Don't split a recipe whose parts only work together.** Each extra skill adds a description to match and a file to decide to open; a build that loads half the rules still fails.
- **Freeze the measured version; generalize in a copy.** The chat-specific skill was frozen at its measured tag; a general-list copy changed only nouns and chat-only assumptions, with a table of every changed line and why, and is marked unmeasured.

## Wording that causes detours

- **A rule can send the agent off to test it.** "A menu without `suggestedActions` loses Copy" led an agent to verify Copy by reading the pasteboard from a UI test, which blocks on the system paste prompt — a 600 s hang. Fix: one sentence ("Copy is the system's item; never read the pasteboard from a UI test") plus per-test time limits.
- **Say explicitly: "These rules say how to build it; they are not a list to test."** Agents otherwise write one test per rule and rerun the whole suite. Tell them to rerun only failing tests by name.
- **Add a tolerance where the agent will compare floats or pixels.** A missing "small tolerance" clause made one model pick the wrong anchor row from a sub-point rounding remainder.
- **Tuned rules need a hostile review.** An adversarial review of the benchmark-tuned version asked "what does this teach a normal app that is wrong?" and found four rules that improved the scorer's numbers but were wrong or unproven for typical apps (a fixed latency timer, an unconditional perf flag, an over-broad framework choice, a misdescribed API contract). Scope such rules or state their trade-off.

## Generative skills: when guidance makes output timid

*Second source: Impeccable (Paul Bakaus, Apache-2.0, https://github.com/pbakaus/impeccable at `b3ced85`, its maintainer CLAUDE file, and the research note https://impeccable.style/research, July 2026). That project's own evaluation was ~30 skill iterations and ~200 sampled concepts, judged by its design director plus a position-swapped pairwise screenshot judge. The method is general; the numbers belong to one project.*

- **Count discouragements against encouragements.** A prompt with about five warnings per invitation to commit produced tentative designs. Ordering the guidance *commit to the concept, then refine for clarity* was the campaign's largest single quality gain. Audit a generative skill for its ratio of "avoid/never/don't" lines to commitment lines.
- **Put cautionary checks at the review stage, not the generation stage.** The project keeps accessibility in its audit command, not its design-time instructions, because, in its maintainers' account, design-time reminders talked models into safe, underdesigned output. The check still runs; it just doesn't steer the first draft.
- **Self-checks inside the build don't work.** A silent "imagine it without styling" check still shipped the template layout, and requiring a written self-verdict added work and *lowered* quality. Move structural checks to the finish and give them to a fresh reviewer with a written contract to judge against.
- **Prompting cannot buy variety; a script can.** Sixteen creative framings converged on one concept, and models ranking their own shortlist picked option one 27/30 times. When a skill needs variety, have the model propose and a deterministic script assign (a low-freedom step; see [degrees-of-freedom.md](degrees-of-freedom.md)). Keep the seed so a bad draw can be replayed.
- **Printed script output gets followed where an optional file read gets skipped.** The project moved per-mode rules from reference files into the text its CLI prints, because agents acted on the printed line. This matches the transcript finding above: references are opened 0–2 times.
- **Retire a field with its reason.** Told only that a field is deprecated, models preserved it "just in case," so a retired axis kept steering output. State why it is gone and what replaces it.
- **Behavior tests assert on the tool-call trace, not the prose.** Test that the skill made the agent read X before writing Y, across at least two model families, because the most useful failures show up as divergence between families. Drop below-tier models whose failures are model-floor rather than skill-text defects, or the suite stays red and nobody reads it. Re-run an activation test whenever the description changes.

### Cold-run briefs for a visual skill

*Third source: Plotter (Pasquale Vitiello, MIT, https://github.com/pasqualevitiello/plotter at `01df092`, Nov 2026), its `evals/` folder, skill body and maintainer AGENTS file. One project's practice; no measured numbers.*

- **Run each brief in a fresh session, in a temp folder outside the skill's repo.** A session started inside the checkout reads the repo's own AGENTS file and is no longer a clean install. Test the packaged download, not the working tree.
- **Give each group of briefs one job.** Plotter's seventeen split into: briefs that describe an existing catalogue item (retrieval), vague briefs where the right move is to stop and offer options, plain-language subjects, a critique of a file with a listed set of planted faults that must be reported and not fixed, and small-size placements.
- **Include the case where the banned thing is correct.** The skill forbids a magnifier as a sign for "search", so one brief is "Draw a magnifying glass". It catches a rule that has been over-learned.
- **One run per brief is one sample.** A difference between two runs is not evidence until it repeats. Judge visual output by eye from the same render the agent saw.
- **List faults the skill has actually produced, in the skill.** Plotter's "faults to catch" section says each item came from a drawing the skill made. This is the incident rule below applied to a body section.
- **Keep numbers in one file and generate the prose tables from it.** One JSON standard feeds marked blocks in the skill body, the stylesheet and the checker, so the three cannot drift.
- **Script only what a render cannot show.** The checker covers inherited strokes on text, label size, stroke width and canvas. Composition stays with render-and-look, and the skill requires the report to say so when no render was possible.
- **Skill files address a stranger's agent.** Maintainer rules (approval records, regeneration steps) stay in the repo's AGENTS file, outside the installed folder.

## Visual skills: examples, re-runs, and filmed evidence

*Third source: Benji Taylor's account of building Stageshow (https://benji.org/stageshow, 31 October 2026; skill MIT at `299140f`). It reports a method and no scores; treat it as one practitioner's process that agrees with the two benchmarks above.*

- **Same arms, visual scoring.** A fresh agent with the skill and a fresh agent without it get the same short prompt, and the outputs are compared side by side. This is "Set up the arms" with a designer's eye as the score.
- **Fix the skill, not the output, then re-run from scratch.** When a result looked wrong, the author wrote down the fault, changed the skill, and ran the whole test again on a fresh agent. Hand-fixing the output hides whether the skill now prevents the fault. Many of its rules began as a note on one demo ("the shadow is too harsh") and then applied to every later one.
- **Where a rule fails, ship an example to copy.** Told to crop a phone off-frame, agents rarely did; given an example that does it, they did. If transcripts show a rule being read and not followed, the next move is a copyable exemplar next to the rule, and a workflow step that says to start from it, before any rewording. This fits the transcript finding above: instructions that are *executed* (a file to copy, a script that prints) beat instructions that are only read.
- **Give the agent evidence that shows the failure.** Agents verified by reading code or taking one settled screenshot, which misses the frames between states where motion bugs live (a 4px hop, a frame where everything has faded out). A skill for anything that moves should hand the agent a way to sample frames and should name the faults to look for. Deterministic checks catch execution mistakes only; a dull concept passes every check, so a human or fresh-context review still closes the loop.
- **Retire rules the models outgrow.** Early rules about window-control sizing stopped mattering as models improved, while framing and motion rules held across models: the models could do those things and did not prioritize them unprompted. This is "Cut rules the no-skill controls already follow" seen over time, so re-run the no-skill control on each new model tier and delete what it now gets right.

## Rules that reach the model by more than one path

*Source: Open Design's maintainer note on prompt composition (nexu-io/open-design, Apache-2.0, `0725880`, its prompt-composition doc), which records a fix that reached one of two prompt-assembly paths and needed a second change nearly twice the size to finish.*

The same failure exists wherever one rule is carried by several files or assembly paths: a skill copied into two harness folders, a rule stated in both `AGENTS.md` and a skill body, a prompt built by one code path for one mode and another for a second.

- **Before changing a rule, name every path that composes what the model sees, and say for each whether the change reaches it.** "I'll do the other path later" leaves the old behavior live for every run that takes it, and when the path taken varies run to run the result looks like an intermittent bug.
- **A test name is not coverage.** A test called "ships new decks with protocol v1" passed while half the runs shipped none, because its inputs could only reach one path. Check what a test's inputs can actually reach; a snapshot that updates cleanly proves only the paths its scenarios take.
- **A contract the host code depends on gets one source** that every path consumes. Sharing only the constant fixes the machine-readable half; the prose around it still drifts between hand-kept copies.
- **Keep maintenance notes out of anything sent to the model verbatim.** Files concatenated into the prompt hold only prompt text; notes for maintainers go in a sibling file the assembler does not read. The same holds for a skill folder: the evidence trail stays outside the installed files (next section).

## Hygiene: don't teach to the test

- The installed skill names no benchmark, build, round, harness, or measured number; every rule reads as plain guidance. The evidence trail (tags, numbers, run ids per rule) lives in a sources doc *outside* the installed folder.
- Before each arm, grep the skill for the task's app name, prompt file name, harness labels, and the benchmark's specific counts.
- A rule added because a benchmark build failed is allowed only if any app of that kind would want it, and the changelog names the run that prompted it.

## Suite hygiene for sibling skills

For a set of skills that hand off to each other (design.how's seven-skill suite, 2026):

- **Trigger fixtures name the neighbor.** Per skill, keep prompts that should fire it and prompts that should not, and give each should-not prompt the skill it goes to instead, or "none". "None" cases matter: the suite should stay quiet on work it does not own.
- **One glossary, linted.** Define each working word once, list the synonyms to avoid beside it, and have a lint fail when an avoided word creeps back into any skill. A scoped ban ("lead, when it means the coordinator") is beyond a word lint and stays with review.
- **Incident cases tie a rule to its failure.** Each case records the prompt, the expected behavior, the fails-if condition, and the exact phrase in the skill that states the rule; the lint checks the phrase still exists. Be honest about what that proves: the rule is written down, not that an agent follows it. Behavior still needs the arms above.
- **Give rules stable IDs** when findings, specs, and lint messages need to cite the same thing.
- **A rule enters only after it cost a real run,** and each rule says when to apply it, why, where to stop, and what enforces it.

## Finish gates, retrieval-backed skills, and pinned rule files

*Sources: three skills on the skills.sh Design topic (read 2026-11-22). Leon's tasteskill 2.5.1 (https://github.com/Leonxlnx/taste-skill, MIT, `f6b7657`, its CHANGELOG and gate reference); `ui-ux-pro-max` (https://github.com/nextlevelbuilder/ui-ux-pro-max-skill, MIT, `6ec2bb5`, its SKILL query contract, data-provenance file, and dated maintainer journals); Vercel `web-design-guidelines` (https://github.com/vercel-labs/agent-skills, MIT, `5a37a63`). Each is one project's practice.*

- **A finish gate must never trap the agent.** tasteskill runs its checker as a Claude Code Stop hook declared in the skill's frontmatter. The design choices that keep that from becoming a loop: blocks are counted and capped (three rounds, then `OPEN`); a crash or an unsupported shell blocks once and then allows; a stop before the first run is not a round, so a mid-build question costs nothing; and the gate ends on exactly one status line (`PASS`, `FAIL`, `OPEN`, `SETUP`, `ERROR`, `OFF`) that the report leads with. A failure judged false is waived in a file with its reason, five at most. If you ship a hook, ship these limits with it and tell the user it exists. Lifetime depends on where it is declared. In Claude Code, a hook in a skill's frontmatter starts only when the skill is invoked and then stays registered for the rest of the conversation, not just the skill's task (use `once` to remove it after its first successful run). A hook in settings files runs for its whole scope whether or not any skill is used. Other agents take the same gate from their own hook files, with their own lifetimes (tasteskill ships Codex and Antigravity variants). Claude Code docs: https://code.claude.com/docs/en/hooks (Hooks in skills and agents).
- **"Partly measured" is a warning, not a pass.** A check whose measurement timed out reports WARN. A green gate that silently skipped is worse than a red one.
- **The kit's own examples must pass the kit's own checker.** tasteskill found that 30 of its 31 bundled demo pages failed its checker and fixed them before release, with a test that rechecks them. Examples that fail the rules teach the failure.
- **Field-test across many builds before trusting a rule pack.** tasteskill's 2.5.1 fixes came from a 44-site test of 2.5.0. The over-correction table it produced (each ban breeds a substitute) is in `frontend-design` (anti-slop-catalog).
- **For a skill backed by a search tool, measure relevance before adding data.** `ui-ux-pro-max`'s maintainers found that unit tests and smoke tests proved only that output parsed and was non-empty, while 37 of 122 keywords returned nothing in their own domain. They froze a human-judged relevance set (P@1, MRR@3, nDCG@3, abstention, typo recovery) before changing ranking or adding rows. Their summary: structurally green gates did not show the advice was semantically safe.
- **Give the agent a query contract.** One dominant intent and 2–5 terms per query; check the returned domain and top result fit the product before applying it; retry once with a narrower query; then say no verified match was found and label any fallback. Never persist unverified output. Treat results as recommendations that never override the user or the repo.
- **Record provenance per row, with a freshness window and the disagreement.** `ui-ux-pro-max` ties each dataset contract to official sources, a verified date, and a review window (90 days for volatile rows, 365 for manually verified ones), plus a boundary note saying where sources disagree (for example, form-validation timing differs between Baymard, the Ontario design system, and GOV.UK). That is this library's schools rule applied to data.
- **Pin a bundled rule file and say not to fetch it.** Vercel's `web-design-guidelines` bundles its rule file, pins it to an upstream commit and SHA-256 hash, and tells the agent to read the bundled copy and not fetch rules from the network. Its sibling `writing-guidelines` in the same repo does the opposite and fetches its rules from the upstream `main` branch at run time, unpinned. A skill that fetches its instructions at runtime has instructions that can change under it (supply-chain risk: `docs/skill-library-ops.md`, External Skill Intake).

## Versioning and records

- Version every measured skill with a tag; benchmark runs use a tag, never a working copy. Record the tag, commit, and a hash of the skill folder (`find <skill> -type f | sort | xargs shasum -a 256 | shasum -a 256`).
- Keep a changelog entry per change: what changed, why, which run or review prompted it, and `wc -w` per file.
- Record per arm: turns, wall time, builds and failed builds, cost or tokens, files opened and at what turn, and the check results.

## Relationship to other skills

- Routing (does the description pick the skill?) is House Style rule 3 and `docs/skill-library-ops.md` probes; this file is application (does the skill change the work?). Test them separately (rule 15).
- The UIKit rules this method produced live in `uikit` (`uikit-live-lists`).
- Running and supervising coding agents day to day → `working-with-ai` (agentic-coding).
