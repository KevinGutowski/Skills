# Skill Library Operations

This is the operating guide for maintaining this repository as a large skill database. It combines the local corpus rules with public skill-authoring guidance and Codex-facing context-file caution.

## Source Basis

- Anthropic Agent Skills docs: metadata is always loaded; `SKILL.md` and references load progressively. Their best-practices guide emphasizes concise instructions, specific descriptions, one-level references, tables of contents for long references, and eval-first iteration.
- Codex note: I found no official OpenAI/Codex guide for large skill databases. The closest Codex-facing evidence is the AGENTS.md evaluation literature: always-loaded repository context can increase cost and reduce success when it adds unnecessary requirements. Treat that as a warning to keep repo-wide docs and skill descriptions lean.
- Recent SkillJuror result: progressive disclosure changes runtime behavior and can improve verifier outcomes when supporting resources guide implementation, checking, or repair. The benefit depends on the task, so organization must be evaluated, not assumed.
- SKILL.md supply-chain research: metadata and natural-language instructions are operational. External skills are untrusted sources; extract durable lessons, do not import scripts or instructions wholesale without review.

## Layering Model

1. **Description layer, always loaded.** Each skill description is the routing contract. Keep it around 350-450 chars unless a cluster truly needs more. Include what it does, when to use it, critical boundaries, and trigger terms.
2. **`SKILL.md`, loaded on trigger.** Keep this as the router plus the highest-value operating rules. Put source identity, workflow, decision boundaries, and reference selection here. Do not bury the decisive rule after appendices.
3. **Reference files, loaded on demand.** Use one-level links from `SKILL.md`. Reference files hold methods, examples, quote banks, source-specific texture, and variants. Files over 100 lines need a `## Contents` block (enforced by `scripts/check_reference_hygiene.py`).
   - **Sanctioned second hop:** a reference may push deep material into a same-named subdirectory (`references/<name>/…`). Three conditions keep it discoverable: every subdirectory file is linked from its parent reference, the parent skill's `SKILL.md` bullet names the members (so a router-only read still reveals they exist), and `SKILL.md` declares the pattern in prose. Substantive content deeper than that, or subdirectory files reachable only via another reference, are out of bounds.
4. **Source maps and ledgers, not skill context.** TOCs, chapter summaries, extraction notes, parked candidates, and cross-reference leads live in `docs/book-source-map.md` and `docs/mining-ledger.md`. They guide future folding; they should not be copied into skill bodies.
5. **Scripts and assets.** Use scripts for repeatable fragile operations: extraction, quote verification, validation, packaging, or deterministic transforms. Prefer executing scripts over loading large code into context.

## Taxonomy Rules

- Top-level skill = platform, activity, or cross-domain tool.
- Topic = reference file under the platform/activity cluster it serves.
- User-invocable commands stay top-level.
- Extend existing skill > create new skill > skip.
- New skill needs a coherent task shape and normally 2-3 independent sources. A single deep method source is allowed only when the task shape is narrow and precedent-backed.
- Conflicting methods become scoped schools, not blended rules. Make the routing condition explicit.
- Platform-specific rules never cross-apply: web, Apple, Rails, SwiftUI, and generic design guidance must stay separated unless a reference explicitly composes them.

## Folding Pipeline

1. **Extract or capture the source.** Preserve local path, extraction method, and source identity in the ledger.
2. **Screen before editing.** Read enough to give an honest density verdict: high, medium, low, skip. Name target skills and conflicts.
3. **Route each lesson.** For every candidate, choose extend/create/skip. Prefer adding a section to an existing reference over expanding a top-level body.
4. **Corroborate across the source map.** Before adding a theme like SVG, metrics, typography, onboarding, or grids, check `docs/book-source-map.md` for already-processed books that may strengthen or contradict the fold.
5. **Verify quotes in batch.** Use `scripts/verify_quotes.py`. A MISS means fix the wording by rereading the source or drop the quote.
6. **Patch close to the owning skill.** Keep edits in the reference file that owns the task. Update the parent `SKILL.md` only when routing changes.
7. **Update docs.** Add source-map entries for processed books and a ledger note for folds, skips, parked candidates, conflicts, and rechecks.
8. **Validate.** Run `python3 scripts/validate_all.py`, `git diff --check`, and targeted greps for renamed skills or moved references.
9. **Probe routing when needed.** Description changes, new skills, and consolidations require routing probes, including controls that must not route to the edited skill.

## High-Touch Source Mining Protocol

Use this when a user points at a tweet, repo, website, video, course, app, or external skill and asks to "research", "mine", "fold in", or "learn from" it. Do this before deciding the edit shape.

1. **Build a source manifest first.** List every direct post/page, quoted post, reply parent, linked site, downloadable artifact, repo README, docs, generated examples, tests, app UI, scripts, media, and images. For each: local path or URL, how fetched, whether read, and density verdict.
2. **Follow both obvious and implementation links.** Marketing pages explain intent; repos show actual behavior. Read prompts, tests, config defaults, generated artifacts, app copy, agent instructions, and failure-handling code. Tests are often the clearest statement of "what must never regress."
3. **Extract lessons before touching skills.** For each candidate lesson, write: source evidence, reusable rule, owning skill, neighboring skill boundary, and skip/park reason if not folded.
4. **Fold by use, not by source.** A single repo may teach generation (`frontend-design`), repair (`working-with-ai`), evaluation (`design-prototyping`), agent-facing docs (`devtools`), and skill authoring (`creating-skills`). Do not dump all findings into one new reference just because the source is about skills.
5. **Keep a ledger artifact.** If the source has more than one branch or artifact, add a `docs/<source>-source-mining-YYYY-MM.md` file or a detailed `docs/mining-ledger.md` entry with source coverage and fold map. The point is to make missed branches visible.
6. **Prefer larger folds when the source earns them.** Small surgical edits are fine for one lesson; a dense source should change multiple owning skills, relationship notes, checklists, or ops docs. Being concise is not the same as being timid.
7. **Validate coverage explicitly.** Before finalizing, answer: What did I read? What did I skip? Which existing skills changed? Which useful findings were parked and why?

## Evaluation Gates

Use the lightest gate that matches the change:

- **Reference-only fold:** validator, whitespace check, targeted grep for broken cross-refs.
- **Parent `SKILL.md` body edit:** validator plus quick read of the first 120 lines to ensure routing still appears early.
- **Fold reconciliation:** before finishing any fold, grep the parent reference and its siblings for every number, API name, and rule the fold introduces, and reconcile older examples with the new rule in the same change. Fold into the existing text; do not fold beside it. When a fold or a review *changes* a rule, re-read the primary source before applying the correction (a fix can overcorrect), then grep the whole repo for the superseded wording and fix every hit, including checklists and other skills' copies.
- **Claim audit:** before finishing a fold, grep the added lines for absolutes (`never`, `always`, `every`, `all`, `only`, "conformance", "whether or not") and check each against its source's actual scope. Four failures recur. Blending schools into a "shared floor" when one source disagrees on timing or placement: list what truly agrees, and keep the rest as schools. Restating a standard without its exceptions: a WCAG criterion with alternatives or exceptions becomes a check, not an automatic failure. Widening a vendor's framing into a general rule ("mockups never carry content"). Leaving a version-bound fact open-ended ("0.82+"): name the version or docs page it was checked against. A fifth failure is the mirror image: condensing drops the source's qualifiers (`unless`, `when the brief gives them`, `except`, `only on`, a version or platform). For any reference condensed from one source, have a fresh reader compare it against that source, listing only dropped or inverted exceptions that would cause a real defect, and fix those before finishing. Apply the same audit to subagent output before accepting it, and record user decisions in the user's own words, without extending them.
- **Body budget:** `scripts/validate_skills.py` warns when a body passes ~5k tokens. Claude Code keeps only the first 5,000 tokens of an invoked skill after compaction, so treat the warning as a defect: a fold adds one line or table row to the body and puts the texture in a reference.
- **Description edit:** validator plus routing probes for target, nearest neighbor, and control. Keep the prompts in a fixture under `docs/` and register it in `scripts/check_routing_probe_fixtures.py`; its `--packet` flag prints a blind descriptions-only packet (no expected answers) for the fresh judge.
- **New skill:** source bar check, README row, routing probes, validator, and a grep audit for missing relationship links.
- **Output quality:** routing probes test retrieval only. For skills made largely of judgment, keep at least three cases under `<skill>/evals/<case-name>/` (`prompt.md`, `case.yaml`, `graders/`), run each with and without the skill, and keep the skill only where it changes the result. `claude plugin eval` reads this layout (run it from the skill directory); the method and the 2026-11 baseline are in `docs/skill-evals-2026-11.md`.
- **Consolidation or rename:** before/after probes, corpus-wide edge remap, independent grep audit with zero dangling live names, and rollback if routing worsens.

## Agent-Standard Governance

Use the Vercel product-design pattern when a source teaches how agents should repeatedly make or review product/design decisions. See `docs/vercel-product-design-overhaul-2026-06.md` for the current overhaul ledger.

- Start with repeated decisions, not broad adjectives. A rule like "destructive actions use Verb + Noun" is usable; "copy should be clear" is not.
- Separate the entry point from the evidence. `SKILL.md` resolves mode, scope, boundaries, and reference routing; references hold source-grounded method; examples and exemplars show repeatable decisions; coverage gaps keep weak evidence from becoming fake certainty.
- Give reusable rules stable names when they may be cited by reviews, evals, or scripts. Include scope, rule, why, exceptions, and source.
- Prefer deterministic checks only when code or text can identify the failure reliably, avoid likely false positives, and suggest a concrete fix. Otherwise keep the rule in agent guidance.
- Run `python3 scripts/check_vercel_overhaul.py` after agent-standard edits to verify the audit matrix, description cap, required artifacts, and source/gap scaffolding.
- Run `python3 scripts/check_vercel_routing_probes.py` after routing-probe edits to verify the probe fixture and generated packet.
- Test retrieval separately from application. A routing miss and a bad rule application are different failures.
- Keep collection separate from judgment. Raw evidence intake should gather links, files, comments, examples, and nearby context; a separate review step decides whether each candidate becomes guidance, exemplar, lint/eval, coverage gap, or no change.
- Require human acceptance before promoting a candidate into a reusable standard. Record scope, rationale, evidence, exceptions, and an approver.

## Agent-Facing Repo Instructions

Keep the repo's first-contact path explicit. A real agent trace showed `skill-installer` failing because it assumed `skills/.curated`; the agent recovered only after manually inspecting the GitHub tree.

- Root `AGENTS.md` should answer the first operational questions: where skills live, what to read first, how to install, and how to validate.
- `README.md` should include a short install command with explicit root-level `--path` values.
- Longer troubleshooting belongs in `docs/agent-quickstart.md`, not in every skill body.
- When the install shape changes, update all three surfaces in the same PR: `AGENTS.md`, `README.md`, and `docs/agent-quickstart.md`.
- Prefer examples that match real bundles an agent would install for a task; do not present the whole library as a default install.

## Encode vs Link Out

When a source has live, agent-readable docs (Apple's HIG and developer docs serve Markdown, framework API references), split the work:

- **Encode in the reference:** decisions and trade-offs (when to use X vs Y), traps and corrections (what an agent gets wrong even after reading the docs), synthesis across several sources, talk-only lessons (videos are hard for agents to fetch), and checklists.
- **Link out:** signatures, parameters, enum cases, availability, exact spec values, and code beyond a few lines. These change each SDK point release and the docs are always current.
- **Name APIs as search terms**, not documentation: enough that the agent knows what to look up and doesn't invent a name. Mark names seen only in a talk as "talk-named."
- **End API-heavy references with a "Look it up" list** of the doc pages to fetch.
- Test each line: *would an agent get this wrong without it, even after reading the doc?* If not, replace it with a name and a link.

## External Skill Intake

Treat external skill repositories as source material, not installable truth.

- Inventory all files and identify task shapes.
- Read bodies for non-obvious rules, numbers, scripts, failure cases, and examples.
- Do not import long prose, prompt wording, credentials, or scripts by default.
- Fold only durable, locally useful lessons into existing skills.
- Park single-source doctrine until corroborated by a primary source or a second independent source.
- Log read-skip decisions so another agent does not rescreen the same low-value material.
- **Apple first-party skills ship with Xcode (27+); leverage them when available.** Apple-platform skills here (`uikit`, `swiftui`, `apple-design`) tell agents to check for `xcrun` and use the exported skills at task time. For intake, export with `xcrun agent skills export` when Xcode is installed; otherwise use a public mirror of the export (e.g. https://github.com/mariusfanu/xcode-skills at commit `047c090` for Xcode 27.2 27B52, with per-beta rename history; the pinned build and task-time instructions live in `apple-design` (xcode-agent-skills)). Treat them as a first-party source that outranks third-party Apple-platform skills when they disagree, record the Xcode build you read, and fold lessons in this library's own words — the content is Apple-authored, so do not copy it wholesale. Re-check on each Xcode release: skills get renamed, split and replaced (27.1 replaced `uikit-app-modernization` with `app-resizability`).

## Instruments, Facts, and Doctrine (lessons from the 2026-11 Vercel intake)

Nine review rounds on that intake found about fifty defects. Almost none were in judgment guidance. They fell into three classes, each with a structural fix; patching instances one at a time did not converge.

1. **A check that can certify is an instrument, and instruments are code.** Hand-run recipes in a reference (a measurement, a grep pattern) kept returning clean results on broken input: sampled too early or too late, read from the wrong element or document, rounded, or filtered too hard.
   - Ship the fragile ones as scripts under the skill's `scripts/` directory, fail closed, with unit tests or hit/miss fixtures. When the command lives in the doc, drive the test from the doc (`interface-review/scripts/test_sweep_patterns.py` reads the table it tests).
   - Give every check an outcome vocabulary that cannot over-claim: failed, fixed (same check and conditions saw it before and not after), not observed under stated conditions, unverified. No bare "pass".
   - List each check's known blind spots beside it. They are the most valuable content: a model can write the read itself, it cannot know where the read lies.
   - **Every verdict needs a measurement; the rest is "unknown".** Decide what the instrument can establish in each direction before writing it, and write that as an invariant test over all input combinations. The reduced-motion probe went through eight designs. Seven failed the same way, by inferring rendered behavior from something else: a list of movement properties (missed `padding-left`), start and end positions (missed movement that returns), the element's own box (missed its `::before`), the presence of a `transform` (failed a correct fade), changing keyframe values (failed a fix that overrides them with `!important`), the animation events seen so far (called a page clean while a delayed slide waited), and a changed computed value (failed a pseudo-element that `position: static` kept in place). Three rules came out of it:
     - **Measure the effect, not its description.** Rendered boxes, sampled over the whole run. Declarations, keyframes, durations, property names, and computed values are not evidence in either direction; where nothing rendered can be read (a pseudo-element), the answer is "unknown".
     - **Take the inventory from the platform.** Ask the browser which animations exist; do not rebuild the list from events you happened to receive. An incomplete history looks exactly like a clean result. And check that the platform's inventory is itself complete: the browser's buffered layout-shift history silently keeps only its first 150 entries, so the CLS scorer reported a busy page as stable until it recorded from navigation and refused to score a full buffer. Any history has a limit; find it, or the signal that says entries were dropped, and turn it into "unverified".
     - **Shrink the claim until it is provable.** "Nothing on the page moves" cannot be established from inside the page. "This target moved before the change and did not after" can. When an instrument keeps failing review, the claim is usually too big, and narrowing it ends the cycle faster than a better implementation does.
   The same goes for arguments, missing content, places the instrument cannot see (it should say so), and anything a script could not check.
   - **Moving a recipe into a script is half the job.** The first scripted version of the CLS check shipped with tests for its arithmetic only, and review found four defects in the untested wrapper within a day. Test three layers: the pure logic (unit), the control flow against a fake of the external tool (every failure path, every argument, what gets printed), and the real tool on fixture pages (skipped where it is not installed). Add a regression case for each defect found, in the layer that would have caught it. Test helpers must fail on a failed tool command: a browser test that ignored a rejected click here was asserting on a page where nothing had happened.
   - **An injected instrument must leave no trace and repeat nothing.** Two properties, each tested as a property instead of case by case:
     - *Isolation.* Code evaluated in the thing under test is one enclosed function with, at most, one deliberately namespaced state object. The first probe declared `classify()` at top level and silently replaced a page's own function. The test evaluates each script in a sandbox that already defines every name the script uses internally and asserts that none was replaced and nothing was added.
     - *Disclosure.* Decide what the output may contain and emit only that. "We redact URLs" was true at one print statement and false at three others; selectors and expressions carry tokens too. The script now describes its inputs instead of echoing them, and one test runs every success and failure path with a sentinel in every input and asserts the sentinel never appears. That test found a leak in the fix itself, and still missed URL credentials because its sentinel sat only in the query and fragment: enumerate every place a secret can live in each input, and build what you print from a parse, not by trimming the string.
   - **Lint the examples.** A copyable command in a reference is an interface. If a rule applies to every example (here: every browser command names a session, every script is run through `bash` with a resolved path), enforce it with a test over the Markdown, not by rereading.
2. **Do not paraphrase a fast-moving third-party fact.** Version floors, CLI syntax, framework behavior, and per-rule code restated from another skill were wrong repeatedly, including after correction.
   - Generate it from the primary source (the rule index in `react` is built from upstream's rule files), or
   - replace the claim with a command that discovers it (`ls node_modules/next/dist/docs` instead of a table of which release ships docs), or
   - link out. If a fact must be stated, say whether it was run here or read in source, and at what version.
   - A secondary source's summary of a tool is a lead, not a fact: read the tool's source or run it.
3. **Do not restate an owner's doctrine in a second place.** A scan or checklist that explains what counts as a finding duplicates the owning reference and drifts from it. Name the owner and stop. This is "fold into, not beside" applied to cross-skill pointers.

**The same three classes recurred on the 2026-11 design-skills intake** (six sources, the `faux-ui` skill). Five review rounds found about twenty-five defects, one or two per round in each class, until each class was treated as a class:

- *Instrument.* `faux-ui`'s capture script was patched for one input at a time (viewport, HTTP errors, loop length, oversized elements, late mounts, a flag with no value). What ended it: declaring every flag in one table and parsing strictly, so an unknown flag, a missing value, or a wrong kind of value stops the run before a browser starts; a contract test with a row per way to get the arguments wrong; a `--dry-run` that the test suite runs against every command shown in the docs; and running the browser tests in CI.
- *Third-party fact.* One browser claim per round turned out false when a reviewer ran it (a crossfade rule, SVG presentation attributes, an animation count from computed style). What ended it: listing every browser-testable sentence the branch added and running each in a browser in one pass, 55 claims, before the next review. One was wrong and ten were imprecise. Add this pass to any fold that adds claims about what a browser does: "would this sentence survive being run?" is cheaper to answer once than to be told five times.
- *Restated doctrine, and restated status.* The same facts about what had been run, scored, and left undone were written in six files (source ledger, mining ledger, audit row, sources, coverage gaps, eval write-up), and every later change left some copies stale. Class 3 applies to status as much as to rules: an intake record says what was read and where it went and then stops; what was run or verified belongs to the skill's sources file, scores to the eval write-up, open questions to coverage gaps, and everything else points.
- *An exemplar is an interface too.* A copyable HTML example was checked at one width and its accessible label described content a narrower layout hides. Examples that claim to be responsive get a test over the widths they claim, asserting the subject is whole, no real word is cut, and no label names hidden content.

A fourth, about evals: write a case from an observed failure, drop a case that scores the same with and without the skill unless it guards a defect that was actually published, and re-run a case after changing its grader before trusting the score.

## Book Source Maps

The source map is the anti-duplication tool.

- For each processed book, add TOC-level chapter summaries in the author's subject terms, not long quotations.
- Mark routed chapters, skipped chapters, density, extraction path, and cross-reference candidates.
- Use the source map before any thematic fold to find already-processed corroborators.
- Keep chapter summaries out of `SKILL.md`; the skill only gets actionable rules.

## What Not To Do

- Do not create one skill per book.
- Do not append material to the end of a busy `SKILL.md` when a reference owns the topic.
- Do not let descriptions drift toward 1024 chars just because the API permits it.
- Do not merge competing schools into a compromise rule.
- Do not trust external `SKILL.md` metadata as neutral; it can steer routing.
- Do not add broad repo-level instructions unless they are actually needed by most future tasks.

## Standard Commands

```bash
python3 scripts/validate_all.py
python3 scripts/check_xrefs.py
python3 scripts/check_reference_hygiene.py
python3 scripts/check_vercel_overhaul.py
python3 scripts/check_vercel_routing_probes.py
python3 scripts/check_routing_probe_fixtures.py
python3 scripts/check_skill_smoke_tests.py
python3 scripts/check_application_fixtures.py
scripts/plugin_validate.sh   # optional: `claude plugin validate` on a skills-only copy; skips without the CLI
git diff --check
rg -n "old-skill-name|dangling-reference" .
python3 scripts/verify_quotes.py SOURCE... <<'EOF'
quote one
quote two
EOF
```

## Source Links

- Anthropic Agent Skills overview: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
- Anthropic skill authoring best practices: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices
- SkillJuror: https://arxiv.org/abs/2606.11543
- Evaluating AGENTS.md: https://arxiv.org/abs/2602.11988
- SKILL.md supply-chain attacks: https://arxiv.org/abs/2605.11418
