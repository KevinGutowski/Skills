# Migration — moving an app onto a design system that already exists

How an agent (or a fleet of them) moves every screen onto a settled system without changing behavior, with each surface checked against its before-state. Source: design.how `migrate-design-system` and the boss migrate playbook (Arlan Marat, MIT, screened at `148b94c`, 2026-11-14) — see [sources.md](sources.md). Paraphrased; the lessons come from one real multi-day migration, so treat the numbers as that run's defaults (single-source items are in [coverage-gaps.md](coverage-gaps.md)). The upstream scripts are linked, not vendored.

This is the execution layer under the body's adoption levers ("the DS team does big migrations itself", codemods, automated migrations). Making the system is [system-from-shipped-ui.md](system-from-shipped-ui.md); fleet mechanics that are not design-system-specific live in `working-with-ai` (agentic-coding).

## Contents

- Two modes, and what counts as clearance
- Ground rules
- Steps
- The worker brief
- Verification matches risk
- Eight incident-backed lessons
- Behavior parity classes
- The correction pass at close
- Upstream scripts

## Two modes, and what counts as clearance

**Audit mode is the default.** It writes only its own notes in a git-excluded run folder, cuts no branch, commits nothing, and ends with the inventory, the plan, and an offer of the full run *with its size*. This is also the right answer to "run an adoption audit".

**Full mode** starts only when the ask names the migration or the person accepted the offer with a budget. "Clean it up" and "fix it" are not clearance.

## Ground rules

- The system is settled and **behavior stays unchanged**, except for announced data-bug fixes.
- A missing token or component is a gap for the system's owner. Park the draft, restore the file, mark the surface blocked on that gap. No workarounds inside a surface.
- A bug in a primitive's contract is fixed in the primitive, and every caller is found. Patching one caller leaves the rest broken.
- "Legacy did it too" never keeps a data bug. Fix it in its own commit as a recorded intended change and name it in the report — never as a quiet behavior change.
- A test that fails because copy changed on purpose is updated in the same commit, at least as strong, with the reason. Any other failure blocks.
- Never edit a harness, a baseline, or a threshold, or restructure a component, to make a diff pass. A baseline that looks wrong is kept as captured and becomes a gate.
- Commit messages and shipped code describe the product, never workers, verdicts, or the migration.
- Delete legacy only once nothing imports it; a module another package or a public API exports becomes a gate.
- Take defaults and record them. Stop only for what git cannot undo, a missing repo, or a tool call the host refused.

## Steps

1. **Roles.** Write down coordinator, worker, verifier, and reviewer. **The writer never grades itself;** the verifier is a different agent, on another model family when the host has one. Keep an append-only decisions log (time, phase, decision, why, evidence pointer, result). A wrong call gets a superseding row, never an edit. Evidence is a sha, a path, or a command, not prose.
2. **Ready?** Run the readiness audits from [system-from-shipped-ui.md](system-from-shipped-ui.md#readiness-audits-before-any-migration). Check every open backlog row against the code first — rows go stale, and a "needs a system change" row is often a caller ignoring a prop the system has. No fan-out while a text or control primitive is missing, a gap is open, or the system's own check is red.
3. **Inventory.** Scan for legacy imports, files mixing system and legacy, and raw or palette values. Every finding gets a surface. In audit mode, stop here and write the plan. In full mode, record the baseline counts as a committed **ratchet** (per-file, may fall, never rise) in its own commit.
4. **Baselines.** Capture every surface, state, width, and theme before the first edit, in the environment CI uses, with fixture data and a frozen clock, plus a no-change control capture. No baseline, no parity claim.
5. **Shared layer first.** One agent, alone, lands layout and providers. Then migrate the pilot surface by hand with a verifier, **write the codemod from the hand work, diff its output against the hand work, and run it twice** — the second run changes nothing. Fan out only after that.
6. **Fan out.** A rolling window, one surface per worker, each with a may-edit list, each surface verified by another agent. A retry or fix goes to a *fresh* worker with the brief, every later directive, and the prior verdict.
7. **Land.** One commit per verified surface, then the system's check at that commit. A surface whose diff touches write code lands only with the request-body check (lesson 5).
8. **Delete legacy.** A module with zero callers goes in one change with its adapter and allowlist rows, and the ratchet bans its path.
9. **Close.** Recapture every surface at the final commit; only verdicts at that commit count. A read-only reviewer goes through the diff's comments (narration, worker or gate references, "do not change" notes) — offer to turn each "do not change" into a check, then delete the comment. A different agent audits the decisions log against the run. Then run the correction pass.

**Done** when no legacy import and no mixed file remains at the final commit, every remaining raw or palette row is a listed exception, every surface has a verified verdict at that commit, the system's check passes, the correction pass has run, and the report lists what was found and not fixed.

## The worker brief

Every brief carries the same fields:

- **Surface** — an id that is never reused, a name, and the commit.
- **May edit** — paths, one per line. Dirty files not listed are read-only. Conflicts go to the coordinator.
- **Keep** — behaviors that must not change, one per line.
- **Lessons** — the numbers below that apply to this surface.
- **Standing** — the person's standing preferences, word for word ("never delete files, list them instead").
- **Bans** — push, in-place `sed` (use exact edits), killing processes you did not start, `git add -A`, stash, merge or checkout in the shared tree, hard reset.
- **Scratch** — one folder per worker inside the run folder, nowhere else.
- **Return** — the verdict file, *written before the final message*: verdict, commands with exit codes, files changed, evidence paths, what was not exercised.

## Verification matches risk

- A **visual-only** change gets unit tests, typecheck, the system's check, and one before/after capture pair.
- A **write surface** — anything whose diff adds, moves, or rewraps a mutation, a submit handler, or a non-GET request — gets every width and theme plus request-body equality. Its tier is set by the diff, never by a label on the plan.
- A full-app sweep at close backs up the light tier.
- A claim names the command that proved it this session. Evidence older than the last edit is stale. Evidence not collected is `blocked`, never `verified`.

## Eight incident-backed lessons

Each happened in a real run and has a check that can see it. A report names each lesson that changed a decision.

1. **An edit is the size of its change.** Workers kept using in-place `sed` after a prose ban, and a formatter on the wrong config rewrote whole files. If the diff stat shows a file rewritten whole for a small change, keep only the real hunks. A regex over many files is a codemod you diff. Enforce with a hook or the brief's bans plus commits limited to named paths.
2. **Payload strings are not copy.** A curly apostrophe landed in a prompt users copy into an assistant; nothing on the page showed it. A copy rule, formatter, or codemod must not touch copied prompts, API examples, clipboard values, verbatim text, data-layer strings, or strings a test pins. Enforce with element-scoped exemptions and a byte comparison of each payload string against the base commit after every sweep.
3. **A control swap needs a parity table.** An integer field saved 25 for `2.5`; an upload control refused a file by extension though its MIME type matched. Every visual check passed. Any differing row nobody approved stops the surface.
4. **A date-only value is not a moment.** A date serialized through a local-midnight `Date` shifted a day west of UTC. Keep it a `YYYY-MM-DD` string or a UTC date, and test under a zone west and a zone east of UTC.
5. **Write bodies come from one run.** Before and after request bodies joined from two separate runs produced a pair that passed and had to be reverted. Serve the base build and the branch build side by side and drive the same write against both in one logged run; any body difference without a recorded intended change holds the surface.
6. **Capture behind a guard.** A capture leaked a real update call; another script's abort filter matched the wrong URL shape and created real records. Before any script drives a live app, a dry run must send every known write in the shape the app sends it and see each one blocked. **Deny writes by default and pass reads by exact name** — blocking non-GET is not enough, because reads are POST in many RPC APIs.
7. **No write surface on a code read.** A grid landed on a code read alone and broke. A verifier that cannot run the surface in a browser returns `blocked` with the missing evidence and the rerun command.
8. **Widths are measured inside the scroller.** No row control was in view while a window-based script passed. Measure control reachability inside the scroll container at 390, 768, 1280, and 1920, each a fresh navigation, with a long title and more rows than fit. Treat a capture of a few hundred bytes as a blank render, not a capture.

## Behavior parity classes

Dozens of behavior regressions in the source migration passed typecheck, lint, unit tests, and the system's check; a verifier driving a browser caught them. Each class is a table run on the old control and the new one with the same inputs. Columns: case, old result, new result, expectation, verdict. Expectations are `same`, `rejected`, `intended change`, `preexisting`. **An intended-change row that does not change fails,** so a fix that quietly did not land is caught.

- **Numbers and amounts.** Type and paste: `2.5`, `-3`, `1e3`, `12.50`, `0.123456789`, `1,234.56`, a padded `42`, empty, `abc`, `12abc`, `007`, `-0`, a 20-digit number, `1.2.3`, `.5`, `5.`, `+3`, a Unicode minus, `1 000`. Compare what the box shows, what the control commits, and whether submit is enabled. A box holding `abc` must not submit the last good value.
- **Dates.** Run under at least `America/Los_Angeles` and `Asia/Tokyo`, and compare the payload, not the label.
- **Upload inputs.** Extension only, MIME only, upper-case extension, wrong MIME, rejected type.
- **Enter and Space on open.** For a picker that writes on select, press each immediately after it opens (0 and 300 ms). Expect no write.
- **Accessible names.** Diff the accessibility tree before and after: names, roles, headings, `aria-current`. A shortened visible label keeps its full accessible name.
- **Focus.** For each dialog, read the active element after Escape, cancel, confirm success, confirm failure, and when the opener disappears. Record the old value first.
- **Refetch error.** Force the next fetch of a loaded record to fail and refocus the window. The page keeps its data instead of replacing it with an error page.
- **Filter values.** Assert the stored value for every filter operator, not the chip that displays it.
- **Widths inside the scroller.** As lesson 8.
- **Fixtures.** A title over 100 characters, a long file name, and more rows than fit at 1920. Short fixtures hide truncation and unreachable pages.

Without a browser, run the pure parsing functions through the table and mark the control itself `blocked`.

## The correction pass at close

Group the run's reverts, blocked and rework rows, review comments, and workaround comments into classes; a class counts once it has happened twice. Fix each at the highest level that works — architecture, then types or a lint rule whose message names the fix, then a test, and docs or brief text last. Keep a rule table (rule · enforced by · proven against which real case) in the system's agent instructions, and list any rule that only a sentence enforces as unenforced. Full method → `working-with-ai` (agentic-coding), "Correction pass".

## Upstream scripts

Not vendored. If the repo wants them, read each `--help` and `--self-test` first, at the pinned revision: https://github.com/arla6ka/design.how/tree/148b94c/skills/migrate-design-system/scripts (legacy inventory and ratchet, named-path landing, body-pair check, number/date parity) and https://github.com/arla6ka/design.how/tree/148b94c/skills/build-design-system/scripts (guarded capture, pixel diff).
