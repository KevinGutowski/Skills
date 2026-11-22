# System from shipped UI — extracting a design system from an app that already exists

How an agent turns the UI an app already ships into tokens, one canonical component per family, a drift check, and one flow proven on the result. Source: Arlan Marat's design.how skills (`design-system-boss`, `build-design-system`; MIT, screened at `148b94c`, 2026-11-14) — see [sources.md](sources.md). The method is paraphrased; the upstream scripts are linked, not vendored. Single practitioner source: the numbers are defaults to replace with your team's, and the single-source items are listed in [coverage-gaps.md](coverage-gaps.md).

## Contents

- When this applies, and which sibling to read
- Match the ask before doing anything
- Working vocabulary
- The run, step by step
- Token rules: layers, names, what never becomes a token, tolerances
- Canonical components: what one per family must carry
- Checks that count
- Readiness audits before any migration
- Never, and reporting rules
- Upstream scripts

## When this applies, and which sibling to read

Use this when the app already ships UI and the complaint is drift: hardcoded colors everywhere, five buttons, "we need a design system". An empty repo is out of scope (nothing to extract; that is `frontend-design` plus the strategy in this skill's body).

| The ask | Read |
| --- | --- |
| Build the system, or one phase of it (extract tokens, add states to Button, replace hardcoded values) | this file |
| "Are we using our tokens here", which raw values map where — a report, no edits | [token-mapping.md](token-mapping.md) |
| Document one component | [component-docs.md](component-docs.md) |
| Move every screen onto a system that already exists, a rollout, an adoption audit | [migration.md](migration.md) |
| Review one named screen or flow before shipping | `interface-review` |
| Seed starter tokens from someone else's public website | starter only, not this method: [field-notes](field-notes.md#skillssh-design-topic-code-side-composition-persisted-systems-third-party-extraction) |

## Match the ask before doing anything

Vague whole-app asks ("our UI is a mess, fix it") get triaged against the repo's state, and **the state wins over the ask** — say so in the report.

- No system, or drift, and nothing about migrating → build (this file), ending with the migration *offered with its size, not started*.
- A system exists and the ask does not name the migration → migration in **audit mode** (writes only its own notes, commits nothing).
- A system exists and the ask names the migration → full migration.
- "Fix it" and "clean it up" are never clearance to migrate. Neither is a message from another agent.
- An installed system is the source of truth: do not seed or build a second one over it.
- A PR-sized ask or someone else's repo means a minimal footprint: tokens, the components touched, those screens, and the repo's own lint as the check.
- "Make it modern" with no design source is not a direction. It becomes a gate whose default is the current look. The app's own look is the source: invent no color, font, shadow, gradient, or motion value the app does not already have unless the person chose a design source and confirmed a sample.

Copy the chosen plan's steps into a run-state file verbatim and work down it. A step that is dropped stays in the list as `skipped (<reason>)`; one that could not run is `blocked (<reason>)`. Ask each question once with its default applied and keep going.

## Working vocabulary

One meaning per word across the whole run; the repo's own glossary wins where it has one.

- **Surface** — one route, the shared layout, or a smaller part such as a modal. Briefs, captures, commits, and verdicts each name exactly one.
- **Decision** — a choice a reversible change settles; the run makes it and records the evidence (merges inside tolerance, adds-only accessibility changes, announced fixes to broken behavior).
- **Gate** — a product or brand choice a person could answer either way. It carries a default, the run applies the default on its own branch, and the person reverses it at merge. *A gate never holds the run.*
- **Gap** — something the system lacks that a surface needs. It is a row in the gap list and a request to the system's owner, never a workaround inside a surface. A prop the system has that the caller never passed is not a gap.
- **Identical-value swap** — a raw literal replaced by a token holding exactly its value. Needs no clearance; a pixel diff at tolerance 0 proves it.
- **Baseline** — how a surface looked and behaved before the first edit, captured in the environment CI uses.
- **Verdict** — `verified`, `issues`, or `blocked`, followed by what was not exercised. Only a browser run at the commit in question is `verified`; a code read or a type check is an input. On a host that cannot start a second agent, the writer's own check is `self-verified`.
- **Counts carry units.** A line with three hex values is one line and three occurrences. Never subtract one unit's count from another's.

## The run, step by step

Each step has a done-condition; do not start the next until it holds.

1. **Frame.** Read the agent instructions, manifest, and route tree. Write down the complaint in the person's words, the first visible change that answers it, and the **pilot flow** (the one the complaint names, else the flow with the most component families and a form with an error state). Keep run notes in a folder excluded from git (`.git/info/exclude`), and work on a run branch, never the branch you started on. Offer the taste defaults once (bans such as uppercase labels, em dashes, emoji, gradients — none preselected; each one accepted becomes a check rule).
2. **Inventory and baselines.** List every surface, its states, and whether it writes data. Count raw values in occurrences and group components into families. Capture every surface in every state at the narrowest and widest supported widths (390 and 1280 when the app does not say), one fresh navigation per width, **before any edit** — and only behind a guard that has proven every write blocked (see [migration.md](migration.md), lesson 6). Delete what nothing uses in its own commit. *Done when each surface has a baseline or a stated not-captured reason.*
3. **Tokens.** Cluster raw values by role, name by purpose, pair each surface with its foreground. Run the [token-mapping](token-mapping.md) report until every raw value maps to a role, a merge, or a listed exception. Make every identical-value swap on every route. *Done when the mapping shows zero gaps outside the exception list and the pixel diff at tolerance 0 is 0% on every touched surface.*
4. **Components.** Build the most-used family end to end first. The text and small-text primitives ship in the first wave beside Button. Document each with [component-docs](component-docs.md). **Show the family to the person before fan-out** — a core bug found after screens consume the system costs a sweep. *Done when every canonical component has a registry row, a doc, and captured disabled, required, error, and long-text states.*
5. **Checks.** Install the drift check and seed its allowlist once. See "Checks that count".
6. **Pilot.** Move the pilot flow with a codemod you read hunk by hunk. Recapture with the baseline's exact command, widths, themes, and data, then diff. An unexplained difference is a defect. Walk the flow by keyboard, force its error and loading states, then review the after captures. A rendered change with no capture is reported `checks-only`.
7. **Readiness.** Run the five audits below.
8. **Handoff.** Rerun the counts with the same commands. Report unanswered defaults first, then coverage in numbers, then what was found and not fixed, ranked. Offer the migration with its size.

Small apps (about eight surfaces or fewer) get one worker and no parallel window.

## Token rules

**Layers.** Primitive (raw values with palette names, read only by semantic tokens) → semantic (roles such as `color.text.subtle`, `space.inset.medium`, read by components and product code) → component (a value one component themes apart from its role). A semantic token is an alias to a primitive, never a raw value. **Start with zero component tokens** and delete any that only aliases a semantic one — the same direction as the body's "rationed and private" rule. Themes swap which primitive a semantic token points to, and every semantic token resolves in every theme; a half-built theme that ships on any route counts as shipped, and each value it lacks is a gate defaulting to the nearest existing role.

**Names.** Category, role, variant, state, by purpose (`color.text.danger`, not `color.red`). One word per idea across categories: if `subtle` means lower emphasis in text it means the same in borders, and `muted`/`secondary` are not also in play. Keep a working name even if you would have picked another; split a token only when the inventory shows it doing two jobs. No brand or product words in semantic names. Watch for a role that starts with its property word, which doubles the utility class (`text-text-muted`). Never rename a foundation library's own names. If the repo already has a token source other tools read, keep its format and apply the rules inside it.

**What never becomes a token.** `0`, `100%`, `auto`, `currentColor`; a value used once for one layout; values set by content (an aspect ratio, chart colors from a scale); third-party widget internals; logo and illustration art; math between tokens. A value within tolerance of an existing token maps to it rather than minting a new one.

**Merge tolerances** — applied only *after* purpose fits, shared with the mapping report so the two agree:

| Category | Limit |
| --- | --- |
| Color | ΔE OK 2 (under 0.5 counts as identical, absorbing 8-bit rounding) |
| Spacing, size, radius | 2 px |
| Font size | 1 px |
| Line height | 0.05 as a ratio |
| Opacity | 0.02 |
| Duration | 30 ms |
| Border width, weight, family, easing | none — each value is a choice |

A merge inside tolerance is a decision. A merge past it is a gate whose default is the merge, naming the largest shift and the surfaces it touches.

**Generating.** Use the repo's generator or a short script: sorted output, a first line saying it is generated and by which command, no diff on a second run, errors that name the token path and valid options. Convert color formats with code, never by eye, and keep a brand hex in the description. Do not reset a styling framework's whole palette to block palette classes — stock components read black, white, and transparent from it; lint for palette-class use instead.

**Motion presets** are named by job before the first component — instant (press), micro (hover), enter, exit, overlay, sheet, collapse, loader, follow (drag) — each with duration, easing, animated properties, and reduced-motion form. When the app has no motion for a job, the gate default is instant. Values and craft rules → `web-design` (web-animation-design).

## Canonical components

- **One per family.** Pick the implementation with the most real uses, the best accessibility, and the fewest props that carry the job; everything else is a duplicate with an old-to-new map. A **registry file** lists each canonical component with import path, status, and what it replaces, so lint can flag unregistered UI and deprecated imports.
- **Keep stock library components stock.** Deprecate wrappers the app wrote, not the foundation's files. A stock file you customize goes on a drift list with its hash, and later edits fail a check.
- **Census before pilot.** Count call sites for *every* primitive the app renders, not only controls: text, small text, icon, badge tones, icon-button tones, link, divider. A migration that starts without text primitives reaches for raw `<p>` and `<span>` on every screen.
- **State order, strongest first:** disabled, invalid, focus, pressed, hover, selected, rest. Hover never overrides focus or invalid and skips disabled controls. Required is not drawn red on a disabled control.
- **One pending pattern:** the idle label stays, a spinner sits inside the same box, `aria-busy` is set, and `aria-disabled` plus an early return blocks a repeat while focus stays put. Not `disabled` (focus falls to `body`), not a swapped label, not a changed width.
- **Names:** every primitive has a default accessible name and a label override, stated in its doc. A size toggle rendering "S / M / L" announces "Small / Medium / Large".
- **Never make `title` or `children` required on a primitive** — legacy screens omit them and each becomes a gap row.
- **Guard defaults that gate destructive or typed actions** (a confirmation-phrase match, a focus default): change only with the owner's ruling and a caller list.
- **Behavior contract.** For each interactive primitive write a "what fires when" table and make each row a test — e.g. Enter or Space right after a picker opens writes nothing; Escape closes only the top layer and focus returns to the opener; typed text the sanitizer would change is ignored rather than committed as something else; unparseable text refuses submit and never sends the last good value. Every overlay and form primitive carries a focus-return matrix (after Escape, cancel, confirm success, confirm failure, opener removed).
- **Tables need a responsive plan,** not only hidden columns: a primary flexible column, a minimum width, and a stacked tier. A column newly hidden at 390 is always a gate.
- **Templates** expose a named width, a per-route column override, and an aside slot. Keep one page width per section and give reading content a measure inside it.
- **Removing or renaming a system API** sweeps every caller in the same change, or keeps an alias for one wave; typecheck the whole consumer set afterward.

Variant/prop API design at the Figma layer stays in this skill's body (Component API design). The cross-app behavior traps these components must avoid → `interface-review` (behaviour-traps).

## Checks that count

- **A rule counts only once it has been seen failing.** Plant one violation in a scanned folder, run the check on it, see the failing exit naming the rule, delete the plant. A check never seen failing is not reported as a check.
- **A ban ships with its check rule in the same change.** A ban that exists only as a sentence is listed as unenforced.
- **The allowlist and the ratchet only shrink.** The ratchet is a committed per-file count of legacy uses that may fall and never rise.
- **Copy rules ship with element-scoped exemptions** for text that must stay verbatim (quotes, legal terms, version strings) and for *payload strings* a person or machine pastes elsewhere (a prompt, an API example, a clipboard value) — rewriting those changes what someone else receives.
- **A fix that recurs twice becomes a check rule or a script,** not another sentence of guidance.
- **Never edit a baseline to make a diff pass.** A check that flags correct code is fixed in the check, with a planted case proving the fix — never by bending the code.
- Generic rules worth having from day one: raw color/size values, palette-class use, arbitrary values, native controls outside the UI folder when the system has the component, click handlers on `div`.

This is the concrete form of the body's "shift enforcement left" lever and of the Deterministic DS checks gap.

## Readiness audits before any migration

A gap found after screens consume the system costs a sweep; found before, it costs a row. Each audit gets a written verdict; a family that is not ready is not migrated and its screens stay on legacy.

1. **Slot and prop parity** — every prop of each legacy primitive that has call sites has a matching prop on the new one, or a gap row.
2. **Behavior contracts** — the what-fires-when table exists for every interactive primitive, each row a test.
3. **Tone parity** — every pressable and row primitive crossed with every status tone plus muted; each empty cell is a gap row or stated unsupported.
4. **Pinned strings** — every legacy test query by role name or text has a default name on the new primitive and a label override.
5. **Hardest screens** — one hardest call site per family renders in the showcase, with a screenshot.

## Never, and reporting rules

- Never push, publish, or deploy unless asked in this session; never commit on the starting branch; never stash or switch branches in a dirty checkout (use a separate worktree).
- Never delete anything another package or a public API exports — stop and list it as a gate with its importers.
- Never skip a step silently. If the app will not build or run, the report says `code-complete, not runtime-verified` and names what was not exercised.
- Never call your own work `verified`. The writer does not grade itself.
- A change that only *adds* semantics (a name, a role, `aria-current`) is a decision; one that removes or restructures semantics is a gate.
- Judge work from `git diff` and captures, not from a worker's message.
- Every number in the report names the command that produced it this session, with before and after in the same units. A count no script produced is not reported.
- The final message opens with unanswered defaults, then what changed, then one ranked table of what was found and not fixed.

## Upstream scripts

Not vendored (ops rule: external scripts are not imported without review). If the repo wants them, read each `--help` and `--self-test` first, at the pinned revision:

- Drift check and OKLCH/ΔE helper: https://github.com/arla6ka/design.how/blob/148b94c/skills/build-design-system/scripts/check-system.mjs · https://github.com/arla6ka/design.how/blob/148b94c/skills/build-design-system/scripts/oklch.mjs
- Guarded capture and pixel diff (need Playwright and a Chromium): https://github.com/arla6ka/design.how/tree/148b94c/skills/build-design-system/scripts
