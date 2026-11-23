# CLI for Humans and Agents

*Source: Vercel CLI's contributor design standard (`cli-ux` skill in vercel/vercel, commit `155eacf`, read 2026-11-18). One vendor, and a **target** standard: the source says outright that its own code does not meet all of it yet. Rules below are restated in this library's words. "(Vercel CLI house)" marks a vendor choice rather than a general principle; copy the idea, pick your own value.*

One command line now has three readers: a person at a terminal, a script, and a coding agent that can read output but must not be trusted to consent. The design job is one behavior that all three can predict.

## Contents

- The bar: four questions
- Modes: four settings, resolved once
- Prompts
- Consent tiers
- Streams and human output
- Progress, waiting, interrupts
- Errors
- Machine output (`--json`)
- Exit codes
- Names, options, help
- Secrets and remote text
- Changing a contract
- Test matrix
- Scoped positions
- Checklist

## The bar: four questions

Every command answers these for a person and for a script:

1. **What will it act on?** The resolved account, project and resource are visible before anything consequential happens.
2. **What will change?** Risky or broad effects are shown first.
3. **What happened?** Done, pending, no-op, partial, canceled or failed, in both the text and the exit code.
4. **What next?** One exact, runnable command when a useful next step exists.

Two principles sit under the rest. **Capability first:** define the task (inputs, permissions, effects, result, failures) before the syntax, and give it the same meaning in the CLI, API, SDK, MCP server and dashboard. **Resolve before acting:** missing or invalid input never licenses guessing, creating, or switching targets. A mutation target is never resolved by first match, fuzzy match, or ID prefix.

## Modes: four settings, resolved once

| Setting | Values | Decided by |
|---|---|---|
| Interaction | interactive / non-interactive | Non-interactive when any of: an explicit no-prompt flag, `--json`, CI, a detected agent harness, stdin used as payload, no TTY on stdin or stderr |
| Format | human / JSON | Only an explicit `--json` |
| Presentation | rich / plain, per stream | Rich only on a TTY whose `TERM` is not `dumb`; color has its own precedence |
| Consent | ask / granted | `--yes`, within the limits under Consent tiers |

- **Detection lives in one place.** Commands read the resolved settings; none checks `isTTY`, `CI`, or agent environment variables itself. Back it with a lint, because rules that depend on every call site erode.
- **The settings are independent, with one deliberate link:** `--json` turns prompts off. Nothing runs the other way. Non-interactive does not select JSON, `--json` grants no consent, `--yes` supplies no data.
- **Agents are non-interactive, not a format.** A detected agent gets the human output unless it asks for `--json`. (The source keeps two legacy log commands that emit JSONL when non-interactive, as documented exceptions to migrate.)
- **A pipe changes presentation only.** Redirecting stdout drops color and animation there. It does not select JSON and does not suppress prompts, which render on stderr.
- **Stdin used as payload cannot also answer prompts.**
- **Complete explicit input behaves the same with or without a TTY.** Non-interactive runs keep results, receipts, warnings and recovery hints, and drop prompts, spinners and redraws.
- **No ambient context for headless agents.** An agent with no terminal never inherits the saved "current team" style of state and cannot change it. Scope comes from a flag, a pinned environment variable, the directory's link, or the only option; otherwise the run fails with a missing-scope error that lists the choices.
- **Accessible mode** (an opt-in environment variable; Vercel CLI house) swaps arrow-key menus for numbered choices and spinners for one plain line per phase. Content stays identical.

## Prompts

- Prompt only for data that cannot be inferred, a real choice between valid options, a confirmation the consequence requires, or one optional offer after the result. Never ask for intent the invocation already expressed.
- **Never prompt in non-interactive mode.** Every prompt has a flag, argument, or stdin equivalent, and the non-interactive error names it.
- One concept per prompt, as a short question. Show resolved context before asking about it. Defaults are valid and labelled. Secret input is masked.
- Lists get search past about ten options. Search may be fuzzy; the selection is exact.
- Escape and Ctrl+C cancel. Escape never means "back"; multi-step flows offer an explicit Back choice that keeps earlier answers.
- **Flows of three or more questions** summarize the answers before the first mutation, then print the equivalent prompt-free command after success. That replay never contains a value typed at a prompt.
- Prompts render on stderr, so `tool cmd > out.txt` can still ask.
- Open a browser only in an interactive local desktop session, and print the URL as well. Over SSH, in CI, or non-interactively, print the URL and the next step. Offer `--no-open`.

## Consent tiers

Tier a command by its effect, not its name.

| Tier | Examples | Interactive | Non-interactive |
|---|---|---|---|
| **Ordinary** | Explicit, reversible, or narrow writes; replacing one target named on the command line | No confirmation | Runs |
| **Destructive** | Data loss, access changes, purchases, many resources, taking something from another owner | Preview, then yes/no defaulting to No | Requires `--yes` |
| **Severe** | Irreversible loss of a whole project, account, store, or all of a resource's data | Preview, then type the exact name | Requires `--yes`, the target named in argv, and an explicit account scope unless only one exists. Never inferred from local link state |

- **Preview** the exact target and each downstream effect on its own line. Name counts ("Remove 5 DNS records?"), never "selected". Say when it cannot be undone.
- **`--yes` answers yes/no confirmations and nothing else.** It never picks between ambiguous targets, supplies missing data, or overrides permissions. In an interactive session it skips a severe confirmation only when the inputs its non-interactive tier demands are also present.
- **`--force` overrides a refusal** (a conflict, an existing resource). On a single target named in argv it also counts as consent for that replacement. Bulk, inferred, cross-owner and severe cases still need `--yes`. (The `--yes` / `--force` split is Vercel CLI house; the general rule is that no flag does two jobs silently.)
- **An agent must not add `--yes`, or a `--force` that replaces user data, on its own.** The confirmation-required error carries a human-action flag, the effect preview as data, and a next command annotated "only after a human approves".
- **Bind approval to what was previewed.** Where supported, return a digest of the effects with the preview; a rerun that passes the digest fails if the target or effects changed in between.
- **Typos never create.** Under `--yes`, in CI, or for an agent, a name that does not exist fails with a suggestion rather than creating a new resource and reporting success. Creation needs its own explicit flag.
- **Explicit production commands need no extra confirmation** when the command itself states the intent. An inferred target is previewed first and must be explicit non-interactively.
- **Never add blanket confirmations to ordinary writes.** Confirmation fatigue trains people to say yes.
- **Purchases** show price, start date, payment method, renewal and refund terms before consent. Non-interactively they also need the expected amount passed back; a mismatch fails as "price changed" and charges nothing (Vercel CLI house). Extra usage on a plan the account already has is ordinary.
- **Dry run** does the reads and validation, performs no mutation, never prompts, and reports what would change.

## Streams and human output

- **stdout is the answer; stderr is everything else:** context, receipts, progress, prompts, warnings, errors, next steps. stdout is never interleaved with animation.
- **A mutation's stdout is one bare identifier** (URL or ID) when stdout is not a TTY or the run is non-interactive, so `url=$(tool deploy)` works. It prints only on exit 0. A requested secret prints alone in its place.
- **Flow,** using only the phases needed: context → input → preview → work → result → next. The final block leads with the real outcome and the primary destination, short enough to find beside the returned shell prompt.
- **Never print success for work that is only accepted, queued, or partial.** One success mark per completed operation.
- **The verb carries through.** Prompt, receipt and JSON outcome reuse the command's verb: "Revoke token?" → "Revoked" → `"outcome": "revoked"`.
- **Never rely on color, glyph, or animation alone.** A transcript must still make sense with all styling removed, and stripping ANSI must recover the exact text of any command shown.
- **Never truncate the only copy of an ID, URL, path, or command.** Truncate optional descriptive columns first; fall back to one record per block before dropping identity or status. Never insert line breaks or shell continuations into a command the tool prints.
- **Tables on a non-TTY stdout** keep the header, separate columns with one tab, never pad or truncate, and use ISO timestamps, so `grep`, `cut` and agents read them reliably.
- **Empty is success** (exit 0). A missing parent, ambiguous selector, or denied access is an error, not an empty state. Write "No deployments", not "0 deployments", and give the command that adds the first item.
- **No-ops are explicit:** "already assigned", exit 0, outcome "unchanged".
- **Next steps** derive from current state and are checked against it. Give the benefit, then the command on its own line. While remote work may still be running, suggest checking status, never retrying.
- **Commands the tool prints** (help examples, next steps, recovery) use canonical names and long options, one complete command per line, with no `$` prompt or backticks. Each is tested through the parser. Placeholders are `<UPPER_CASE>` in angle brackets, sample values are synthetic, and no secret ever appears.
- **Tips and update notices** are gated: at most one per run, once per user, only after exit 0 in interactive human mode. Never in CI, `--json`, or agent runs. Anything needed every time is a warning. Offer an environment variable that turns optional guidance off.
- **Color precedence** (Vercel CLI house): `--no-color` → non-empty `NO_COLOR` → `FORCE_COLOR` → per-stream detection. Forcing color never enables prompts, animation, or rich layout. Machine output is never styled, even under force. Use the terminal's own ANSI palette and default foreground; no hue is legible on every theme, so emphasis in the foreground color is the safe fallback.
- **Width:** assume 80 columns when unknown; check 40, 80 and 120. Measure display width, not string length.
- **Units** (Vercel CLI house): relative ages under 7 days and absolute after; ISO 8601 UTC in non-TTY output; real plurals, never "project(s)"; lists inside a receipt or error stop at 5 items, then "and N more" plus the command that lists them all.

## Progress, waiting, interrupts

- Feedback within 100 ms of starting slow work (Vercel CLI house). A spinner names its phase. A bar needs a real total. Never invent a percentage.
- **Animate only in rich interactive mode.** Elsewhere print each phase once as a plain line. Long byte transfers report at intervals (every 10%, or after 30 s of silence, at most once per 10 s; Vercel CLI house).
- Progress clears before results, prompts, or errors, never spins over logs or child output, and parallel work shares one indicator.
- **Stalled is not failed.** Past the usual duration, say so once and name the external thing being waited on with its typical bound. Never "this might take a while".
- **Everything finite is bounded:** request timeouts, a retry budget, a cap on total waiting. Commands that wait accept `--timeout` and state the default.
- **Retries cover transient failures only,** with backoff. Reads retry automatically. A mutation retries only when the endpoint is documented idempotent or takes an idempotency key reused with the same payload. Otherwise a 5xx or dropped connection after sending is an **unknown outcome**. `Retry-After` sets the delay; it is never permission to replay a mutation.
- **Async work:** a no-wait flag returns once work is accepted, reports "accepted", and gives the ID and the status command. A wait that times out exits non-zero and says the work may still be running.
- **Interrupts:** the first Ctrl+C stops local work and restores the terminal; the second exits at once. Never claim remote work was canceled because local waiting stopped. Say "Stopped waiting", then the confirmed facts.
- **One evidence model** for cancel, timeout and unknown outcome: the remote operation was not started, finished, may continue, or is unknown. Report confirmed facts only. Recovery is "inspect this ID" or "list and look", never "resubmit". Absence from one page of a list proves nothing.

## Errors

- **Anatomy:** headline (the failed action and its exact object, then the known cause) → detail rows → context rows → ID rows last, for copying → a blank line → a recovery instruction and the command on its own line. Omit parts with nothing true to say.
- At most two recovery options, likeliest first. Never "try again" alone: give the command to rerun, or the status command when the outcome is unknown.
- Never a status code in the headline, a raw API payload, or a stack trace outside debug mode. Never guess a cause. Never print a warning and an error for one condition.
- **Every failure has one class,** fixing its headline formula, reason-code family and exit code: usage, missing input, authentication, permission, not found, conflict, limit or plan, rate limit, network, platform, unknown outcome, partial, config, internal bug. Map HTTP status and API codes to classes in one shared place, never per command.
- **Validate all local input before the first request, and report every problem at once.**
- **Not found** stays inside the caller's scope and never reveals that a private resource exists elsewhere. Suggest at most one unambiguous match and never act on it.
- **Partial** counts succeeded, failed and unknown separately. Unknown is not failed.
- **Config errors** point at file, line and column with the surrounding source. Malformed config fails; it is never treated as absent or silently reset.
- **Usage errors** name the offending token, suggest at most one close alternative without running it, and point to help.
- **An internal bug says so** and gives a report link that carries no argv values, paths, or tokens.
- Verb choice (Vercel CLI house): "Can't" for a present blocker, "Couldn't" for a failed attempt, "Failed to" for system failures. Budget: headline within about 100 characters, the whole error within about 8 lines.
- Wording, tone and words to avoid → `ux-writing` (error-messages). Two CLI-specific mechanics from this source: use straight ASCII quotes, because output is pasted into shells; and reframe blame as a constraint ("Names use lowercase letters, numbers, and hyphens").

## Machine output (`--json`)

`--json` is a contract, not a rendering.

- Every command that reads or changes a resource supports it. **Success:** stdout holds exactly one JSON document and a newline; stderr is empty apart from debug output and CI secret-mask lines.
- **Failure:** stdout is empty; stderr ends with exactly one single-line JSON error document, with no progress, receipts, or hints beside it. The exit code is the source of truth.
- Two exceptions: a bulk operation that ran to completion writes its per-item result to stdout and exits non-zero if any item failed or is unknown; a line-delimited stream keeps the lines already emitted.
- **Result shapes are keyed by resource noun** so top-level fields can be added later: `{ "project": {…} }`, `{ "projects": […], "pagination": { "next": … } }`, and for mutations an `outcome` field.
- **Outcome vocabulary:** the past-tense verb, or `unchanged`, `accepted`, `staged`, `started`, `planned`. Consumers decide whether to wait from the outcome and the resource state, never from a null field.
- An empty list is `[]`. Known-absent values are `null`, not omitted. **Withheld secrets are omitted, never nulled,** so a consumer cannot mistake "not disclosed" for "unset".
- **Error document fields:** `status` (`action_required` when blocked before any effect and input or approval would unblock it, else `error`), a stable snake_case `reason`, `message` (the human headline; never parse it), `next`, a human-action flag, `data` (choices, validation issues, remote evidence), request ID, `retryable`, `retryAfter`.
- **`next` entries carry both a display string and an argv array,** plus a `when` note on the condition or on filling placeholders. The array spares the agent from shell quoting.
- **`retryable` is true only when repeating cannot duplicate effects.** A retry-after hint is a delay, not permission.
- "Did you mean" guesses go in `data`, never in a runnable `next` entry.
- Warnings travel in a `warnings` array (or as typed lines in a stream), not on stderr.
- **Streams are JSONL:** one object per line with a `type` field, flushed as events arrive, closed by a summary line with pagination. Never buffer a stream into one array.
- **Pagination:** `--limit` is the total wanted; the tool pages internally and never over-fetches. The cursor is an opaque tool-owned string bound to the query, filters and scope, never the upstream API's pagination object. Fetching everything is explicit, bounded and cancelable. If a later page fails, a JSON list emits nothing and never returns a cursor that skips undisclosed rows.
- **Help is machine-readable too:** `--help --json` returns arguments, options and the declared result schema with secret fields marked; an offline help search finds commands by task.
- Pretty-print on a TTY, compact otherwise. Consumers never depend on whitespace or key order.

## Exit codes

| Code | Meaning (Vercel CLI house mapping; `130` and `128 + n` follow shell convention) |
|---|---|
| `0` | The promised operation completed: success, empty result, no-op, acceptance under no-wait, help, version |
| `1` | Operational failure |
| `2` | Usage error or missing input |
| `130` | Canceled by the user: Ctrl+C, Escape, or declining a confirmation the operation needs |
| `128 + n` | Terminated by signal `n` |
| Child's code | A wrapper that runs a child exits with the child's code |

- Never exit 0 after a failure because output was printed. The error class fixes the code; the JSON `status` field never changes it.
- Declining an optional offer exits with the result's code. Post-command work (update checks, telemetry) never changes the code.
- A closed stdout pipe (`| head`) ends a read quietly with 0. A mutation already sent finishes and exits with its real outcome.
- A "differences found" exit from a diff command is a result, not an error: no error document.

## Names, options, help

- **One concept, one name:** one noun per concept, one verb per operation, one option per input, kept in a registry that a lint checks. Never add a synonym for variety.
- **Grammar** (Vercel CLI house): `tool <group> [<subgroup>…] <action> [<resource>] [options]`. Groups are plural nouns; top-level verbs are reserved for workflows on the current directory or session. The resource follows the action. A verb is never fused with a noun (`create-store`) and never a positional value (`feature on`).
- **The verb states the real consequence.** Never soften or overstate: `delete` destroys, `remove` detaches an entry, `revoke` invalidates a credential and keeps the record, `disconnect` severs a link and leaves the data. Vercel CLI house picks: `inspect` over get/show/describe; `create` for a standalone resource with its own lifecycle and `add` for an entry in a container; `update` for partial change and `set` for upsert.
- **`update` distinguishes omitted (unchanged), explicitly empty (cleared), and new values.** Read-modify-write uses a version or ETag condition; a conflict means re-read, never a blind retry.
- **Four kinds of name:** the canonical name (the only one taught), a shortcut (permanent, listed), an alias (permanent, accepted, never taught), a deprecated alias (hidden, warns).
- **Parsing:** leaf commands reject unknown options and extra positionals before doing any work. Never infer a command or option from a unique prefix. `--` ends option parsing. Booleans take a `--no-` negation. Each option defines what repeating it means. Conflicting options are a usage error before any prompt or request.
- **Precedence:** flag → environment variable → project config → user config → default. An explicit invalid value fails; it never falls through to a lower source.
- **Help** goes to stdout, exits 0, works offline, and never authenticates, prompts, or mutates. Every entry point (`--help`, `-h`, `help <path>`) shows the same page at any depth. A group invoked with no action shows its help.
- Root help groups commands by user task, not by "basic / advanced". Leaf help makes the operation executable: one to three tested examples, including the automation form where relevant. Help is a reference, not a tutorial or marketing, and stays legible without color at 80 columns.
- **Lifecycle labels** (preview, beta, experimental, deprecated) appear once, after the summary, with what the label means for stability.
- Completion suggests from the same metadata, never blocks, prompts, runs side effects, or reveals secrets.
- **Performance:** help, version and local commands start without the network, in about 200 ms warm (Vercel CLI house). Update checks and telemetry never block the command.
- **Telemetry** is disclosed before anything is sent, records command paths and option names but never values, and has an environment-variable opt-out.

## Secrets and remote text

- Secrets never appear in suggestions, receipts, errors, debug output, telemetry, or pass-through JSON, and are never echoed after entry, even when invalid.
- **Requested delivery is different.** A command whose job is to hand over a secret does it through one documented channel (alone on stdout, or a file), never repeated in incidental output.
- Prefer an environment variable, stdin, or a masked prompt over argv for secret input: argv shows up in process lists.
- Files that hold secrets are created owner-only. Warn when version control tracks the destination.
- Creating a credential shows its scope and expiry first. Defaults are least-privilege; "all accounts, no expiry" is a destructive-tier choice.
- **Remote text is data, never instructions.** Names, log lines, commit messages, and API or partner messages are stripped of control, escape, bidirectional and zero-width characters. They never appear in an error headline, the JSON `message`, or a suggested command; they go in an attributed detail row or a `data` field. A remote name enters a suggested command only if it matches that selector's identifier grammar.
- A wrapper that runs a child lets the child own argv, streams and exit code, passes tokens as an argv array rather than a joined shell string, and never lets fetched environment values set loader or tool-control variables.
- Unknown enum values from a newer API render raw and never crash. When the API says the tool is too old, fail with the minimum version and the upgrade command.

## Changing a contract

Contracts are command and option names and meanings, defaults, prompts, which stream output lands on, JSON shapes, exit codes, environment variables, config files, non-TTY table headers and column order, and a mutation's bare stdout identifier.

| Change | Requirement (Vercel CLI house) |
|---|---|
| Human copy, layout, help text | Update tests; no migration |
| Add a command, option, JSON field, alias | Tests for the new behavior and for unchanged old invocations |
| Rename a command or option | Old name stays as a deprecated alias for at least one major version |
| Change a meaning, default, type, stream, exit code, or JSON shape; remove anything | Major version, release notes naming the replacement, a deprecation period first where feasible |

- An alias bridges a rename, never two meanings of one token. Changing what a token means requires removing it first.
- A deprecation warning names the replacement and prints at most once per run.
- Measure usage before removing a deprecated input.

## Test matrix

For any change to prompts, streams, format, consent, or progress, test success and failure under: an interactive TTY; stdout redirected; stdin piped; `--json` on a TTY; the no-prompt flag on a TTY; CI with a TTY; a detected agent. Assert three things each time: whether a prompt appeared, what each stream contains, and the exit code.

- Parse JSON from stdout and the error document from stderr. Assert no ANSI in either.
- A snapshot or polished transcript alone does not prove a command works. Test public behavior with no live mutations.
- Read real before-and-after transcripts, not only code, for order, repetition and the next action.
- Journeys worth walking: first run with no login; token expiry mid-command; several accounts; a CI deploy; an agent's discover → act → verify → recover loop; offline; rate limited; an interrupted long operation; partial bulk failure; a broken config file; a tool older than the API expects; piping into `jq`, `grep` and `head`; two processes at once.
- Prefer shared mechanisms to review: one mode resolver plus a lint, one result writer, one confirmation helper driven by declared consequence, one API-error mapper, one retry policy, one root abort signal.

## Scoped positions

Recorded as separate positions, not blended.

- **Example values.** In commands the tool prints, this source wants labelled `<PLACEHOLDER>` templates with synthetic sample values, because the real value differs per user. For API docs an agent will copy, the Academy course wants real values that run unchanged ([data-viz-and-agents.md](data-viz-and-agents.md), Rule 2). Shared ground: an example either runs as written or is unmistakably a template. A plausible-looking fake value is the failure in both.
- **How much an error reveals.** This source wants every error to give the cause and exact recovery; its audience is an authenticated user or their agent. The AX defense rule in [data-viz-and-agents.md](data-viz-and-agents.md) gives anonymous actors generic errors. Route by actor: full recovery detail for identified callers, generic for anonymous ones. The not-found rule above already leans that way.
- **Where human approval is enforced.** Here the gate is a convention: the error tells the agent not to add `--yes` without approval, and nothing stops a non-compliant agent. The AX rule's approval URL is enforced by the server. Use the flag convention for cooperative agents and server-side approval where the action must not happen without a human.
- **Agents and output format.** "Agents get human output unless they ask for JSON" is this vendor's position, and it keeps two legacy exceptions itself. A tool that switches format on detection is making a different contract; whichever is chosen, document it and never let detection grant consent.

## Checklist

- [ ] Mode resolved once; no command reads TTY, CI, or agent variables directly?
- [ ] Every prompt has a flag, argument, or stdin equivalent, named in the non-interactive error?
- [ ] `--json`: one document on stdout on success; empty stdout and one error document on stderr on failure?
- [ ] Destructive and severe tiers previewed, defaulting to No, with `--yes` never supplying data or choosing a target?
- [ ] Success shown only for completed work; accepted, partial and unknown reported as such, and the exit code agrees?
- [ ] Errors: what failed, known cause, exact recovery command; unknown outcomes recover by inspecting?
- [ ] No mutation retried without idempotency; every wait bounded?
- [ ] No secret in incidental output; remote text kept out of headlines and suggested commands?
- [ ] Printed commands canonical, parser-tested, copyable, and free of secrets?
- [ ] Mode matrix tested (TTY, redirected, piped stdin, `--json`, no-prompt flag, CI, agent)?
