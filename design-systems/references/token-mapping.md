# Token mapping — a read-only report of raw values against an existing token list

How to answer "are we using our tokens here?", "which hardcoded colors map to which tokens?", or plan a token migration without editing anything. Source: design.how `token-mapping` (Arlan Marat, MIT, screened at `148b94c`, 2026-11-14) — see [sources.md](sources.md). Paraphrased. Replacing the values afterwards is the tokens step of [system-from-shipped-ui.md](system-from-shipped-ui.md).

## The one rule that makes the report trustworthy

**Purpose first, then value.** A raw value that equals a token but does a different job is not a match.

- Wrong: `#6b7280` mapped to the default border token because the hex is equal.
- Right: it colors text, so the candidates are text tokens; the border token is listed under "Do not use".

Tolerance is applied only after purpose fits and never turns a wrong-purpose token into a match.

## Steps

1. **Find the list.** Token files, theme entries, custom properties on `:root`, a component library's variable pairs. A framework's default theme is not the team's list, and neither is a public system's. Record its name, location, and how it was read. If the read fails, say so and stop — never fill a token list from memory.
2. **Find the values.** What the person named, else the branch diff, else the product code. Record each with file, line, property, and job.
3. **Resolve.** Follow every alias to its final value in each mode (theme). Write down every disagreement between two sources.
4. **Normalize both sides with code, never by eye.** Lengths to px (16 px root unless the project sets another), line height to a unitless ratio, colors to OKLCH plus alpha, compared by ΔE OK (OKLab distance × 100). Alpha is part of the color: a hex at 80% is not that hex. Formats a simple converter cannot read (`color-mix()`, relative colors, `lab()`/`lch()`) are resolved from a browser's computed style, and the report says so.
5. **Classify each row once per mode:**
   - **Exact** — the token's stated job covers the row and the values match.
   - **Semantic** — the job covers it and the value is inside tolerance; state the difference in numbers.
   - **Ambiguous** — two or more tokens fit and nothing picks one; name every candidate.
   - **Gap** — no token's job covers it, or the only fitting token is out of tolerance. A gap never gets a new name invented for it.
6. **Count and close.** When gaps exceed 30% of rows and number 12 or more, the list is probably the wrong one: say so, still deliver the table, and lead with a not-actionable status.

Tolerances are the same table as in [system-from-shipped-ui.md](system-from-shipped-ui.md#token-rules), plus letter spacing at 0.01 em. A difference equal to the limit is inside it.

## Categories

A candidate must be in the same category as the row's job.

- **Color by role:** surface, text, border, icon, action, focus, status.
- **Spacing by job:** inset (inside a component) versus gap (between items). One scale often serves both, so record which job the row does — an 8 px radius never stands in for an 8 px gap.
- Size, radius, border width, typography (family, size, weight, line height, letter spacing), shadow (each part its own row), opacity, motion (duration, easing), z-index.

Not mapped, only counted: a role token with alpha applied over it, and graphic values (logo art, illustration, decorative gradient stops).

## Details that change the answer

- A semantic token wins over the primitive it aliases. Map to a primitive only when no semantic token covers the job, and say so.
- A palette class (`text-gray-500`) names a value and no job. It gets a row, counted apart from raw values.
- Anything inferred rather than read — a job taken from a class name — is marked inferred.
- Counts carry their unit: occurrences, lines, or mapping rows.
- **When the list states no purposes** (palette-only), the run can only match values. Say "value only" on every reason, leave "Do not use" empty because it cannot be checked, and make **consistency by role** the main output: group color rows by role, give the distinct values with counts, their ΔE spread, and near pairs (under 5) that probably mean one thing — e.g. three grays within ΔE 4 across 150 text rows likely mean one muted text color.

## Report shape

Summary · Mapping · Do not use (value matches, job differs) · Ambiguous · Gaps · For a person to decide · Source (including source conflicts, with both sides) · a last line `Coverage:` with what was scanned and what was not.

## Stops

Stop and report only when: no list exists; one name has two values in the same mode; or two sources disagree and no project rule says which wins (report both, choose neither). Return what stopped it, the groundwork so far, and the shortest message that unblocks it ("paste the token file or give its path").

**Done** when every row has a job, a class, and a reason; every ambiguous row names two or more candidates; and `git status` is unchanged from before the run.
