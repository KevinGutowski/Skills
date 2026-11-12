# Report exemplar

*Scope: one complete worked review in this skill's output format, plus the two variants that are easiest to get wrong: the `Unverified` close and the `scored` layout. Read it for shape, not for rules; the rules stay in SKILL.md and [critique-scoring.md](critique-scoring.md).*

**This is a worked example, not a real review.** The product ("Ledgerline"), its files, line numbers, commands, and results are invented to show the format. Do not cite any of it as evidence about a real interface or copy its findings into another report.

## Contents

- What the exemplar demonstrates
- Report A: `full` mode, verdict `Block`
- Report B: re-review close, verdict `Unverified`
- Report C: `scored` variant of Report A
- Reading notes

## What the exemplar demonstrates

| Rule in SKILL.md | Where to see it |
| --- | --- |
| Scope, mode, stack, and boundary stated up front | Report A, Scope and coverage |
| Every applicable domain has a row, including `Clear` and `Not reviewed` | Report A coverage table |
| One root cause per row, owned by one domain, with before, after, and why | Report A findings 1–5 |
| A shared-primitive fix outranks a leaf fix within a severity | Finding 1 above finding 2 |
| Observed facts kept apart from inferences | Finding 3 "observed", finding 4 "inferred from source" |
| Restraint is auditable | Report A, Considered but rejected |
| Third-party detector not run without approval | Report A Verification; Report C method line |
| Clean findings with unverified coverage is not a pass | Report B |
| Scored layout, `n/a` renormalization, questions last | Report C |

## Report A: `full` mode, verdict `Block`

### Scope and coverage

- **Mode:** `full`.
- **Scope:** Settings → Members: the members table and the Invite teammates dialog (`app/settings/members/`), including empty, loading, error, narrow-width, keyboard, and reduced-motion states.
- **Stack and conventions:** Next.js App Router, Tailwind v4 with tokens in `app/theme.css`, Radix primitives wrapped in `components/ui/`. Operate surface. No named `design-craft` theme is committed.
- **Boundary:** billing and role-permission screens are outside scope. Dark theme exists but was not requested.
- **Method:** single context; design judgment written before reading axe or lint output.

| Domain | Evidence inspected | Result |
| --- | --- | --- |
| Accessibility | `InviteDialog.tsx`, `MembersTable.tsx`; keyboard walk in the local preview; axe on both states | 1 finding |
| Layout | Preview at 1280, 768, and 375 px wide; table and dialog source | 1 finding |
| Interaction principles | Invite flow end to end, including resend and revoke | `Clear` |
| Writing | All labels, empty state, and three error paths | 1 finding |
| Typography | Table and dialog at 100% and 200% text zoom | `Clear` |
| Color | Token usage in both files; contrast of badge and muted text | `Clear` |
| Performance and motion | Dialog transition source; reduced-motion emulation | 1 finding |
| Craft and polish | Radii, spacing, and states in both components | 1 finding |
| Screen-reader output | Not run | `Not reviewed`: no screen reader available in this environment |

### Findings

| # | Severity | Domain | Location | Before | After | Why |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | HIGH | Accessibility | `components/ui/role-picker.tsx:14` (used at `InviteDialog.tsx:48`) | Role picker is a `div` with `onClick`; it takes no focus and has no role or name | Replace with the existing `components/ui/select.tsx` (Radix Select) and a visible `<label>` | Observed: Tab skips from the email field to Send, so a keyboard user cannot choose a role and every invite goes out as Admin, the default. Fixing the shared primitive also fixes its two other call sites. Owner: `web-design` (web-accessibility). |
| 2 | HIGH | Writing | `InviteDialog.tsx:112` | On a duplicate address the dialog shows "Something went wrong (422)" and clears all entered emails | Keep the input; show "dana@example.com already has a pending invite. Resend it?" with a Resend action | Observed: the typed list is lost and the message names neither the problem nor the recovery. Owner: `ux-writing`; secondary effect on error recovery. |
| 3 | MEDIUM | Layout | `MembersTable.tsx:31` | Table wrapper is `w-[720px]` | `w-full`, and hide the "Last active" column below the `sm` breakpoint | Observed at 375 px: the page scrolls sideways and the row actions sit off-screen. Owner: `web-design` (web-layout-design). |
| 4 | MEDIUM | Performance and motion | `InviteDialog.tsx:20` | `transition-all duration-500 ease-in` on the dialog panel | `transition-[opacity,transform] duration-200` on the project's ease-out token; under reduced motion, opacity only | Inferred from source and confirmed by eye in the preview: the dialog opens slowly and the back-loaded curve delays feedback. `transition: all` also animates layout properties. Owner: `web-design` (web-animation-design). |
| 5 | LOW | Craft and polish | `MembersTable.tsx:77` | Role badges use three radii (`rounded`, `rounded-md`, `rounded-full`) | One radius token, `rounded-md`, matching the other badges in `components/ui/badge.tsx` | Isolated inconsistency with no task impact. Owner: `design-craft`. |

### Considered but rejected

- **13 px table text.** Smaller than the body size, but it is the project's documented density for data tables, contrast passes, and it holds at 200% zoom. Intentional convention.
- **No confirmation on "Resend invite".** The action is reversible and cheap; a confirmation would add a step without protecting anything.

### Verification

Passed:

- `pnpm lint`: no errors.
- `pnpm test members`: 14 passed.
- Keyboard walk of the dialog: focus is trapped inside, Esc closes it, focus returns to the Invite button.
- Text zoom at 200%: no clipping in either component.

Failed or observed (already in the findings):

- Keyboard walk: the role picker is unreachable (finding 1).
- 375 px viewport: horizontal scroll (finding 3).
- axe on the open dialog: 1 violation, matching finding 1.

Not verified:

- Screen-reader announcements for the error and for invite success: no screen reader available. Settle with VoiceOver on the local preview.
- Touch behavior on a real phone: the 375 px result is an emulated viewport, which proves layout only.
- Detector: not run (`impeccable` is not a project dependency and running it via `npx` was not approved). The anti-slop pass was done by hand; no named tells found.

### Verdict

`Block`: two high findings remain (1 and 2).

## Report B: re-review close, verdict `Unverified`

The same scope reviewed again after fixes, in an environment with source access only. Sections identical to Report A's shape are abbreviated here; a real report writes them in full.

### Scope and coverage

- **Mode:** `full`. **Scope:** as Report A. **Method:** source diff review only; the preview could not be started.

| Domain | Evidence inspected | Result |
| --- | --- | --- |
| Accessibility | Diff of `role-picker.tsx` removal and `InviteDialog.tsx`; no keyboard walk | `Clear` from source; behavior `Not verified` |
| Layout | Diff of `MembersTable.tsx`; no render | `Not reviewed`: needs a render at 375 px |
| Writing | New error strings | `Clear` |
| Performance and motion | New transition classes; no reduced-motion emulation | `Clear` from source; behavior `Not verified` |
| Craft and polish | Badge radius diff | `Clear` |

### Findings

`No actionable interface findings in the inspected scope.`

### Considered but rejected

None this pass.

### Verification

Passed: `pnpm lint`, `pnpm test members` (16 passed).

Not verified: everything that depends on a render (below).

### Verdict

`Unverified`: not a pass.

- **Unverified:** keyboard reachability of the new role Select; layout at 375 px; reduced-motion behavior of the dialog; screen-reader announcements.
- **Why:** `pnpm dev` fails in this environment (missing `DATABASE_URL`), so nothing was rendered.
- **Inspected instead:** the source diff for all five findings, lint, and unit tests.
- **To settle:** start the preview with a seeded database, then repeat Report A's keyboard walk, the 375 px check, and reduced-motion emulation; run VoiceOver over the error and success paths. If all pass, the verdict becomes `Approve`.

## Report C: `scored` variant of Report A

Only the parts that `scored` adds or reorders are shown. Coverage table, findings table, rejected candidates, and verification are the same as Report A and still appear in a real report, after the score tables.

**Method:** single context, A before B. Pass B: axe and project lints only; detector not run (third-party, not approved).

**Design specificity:** authored, with one lapse. The table, density, and controls follow the product's own Operate conventions and would not transplant unchanged. The dialog is the stock primitive with default spacing and a generic error, which reads as scaffolding next to the rest. No anti-slop tells.

**Nielsen heuristics**

| # | Heuristic | Score | Evidence |
| --- | --- | --- | --- |
| 1 | Visibility of system status | 2 | Sending shows a spinner; success closes the dialog with no confirmation in the table |
| 2 | Match with the real world | 3 | Plain role names; "(422)" leaks in one error |
| 3 | User control and freedom | 3 | Esc and Cancel work; revoke is available |
| 4 | Consistency and standards | 3 | Custom role picker differs from every other select |
| 5 | Error prevention | 1 | Role silently defaults to Admin when the picker cannot be reached |
| 6 | Recognition over recall | 3 | Pending invites are listed with their role |
| 7 | Flexibility and efficiency | 2 | Paste of several addresses works; no keyboard path to the role |
| 8 | Aesthetic and minimalist design | 3 | Quiet table; mixed badge radii |
| 9 | Error recovery | 1 | Duplicate-address error clears the input and offers no next step |
| 10 | Help and documentation | n/a | A two-field dialog on a settings page has no help surface to assess |

**Total: 21 / 36 (58%), Acceptable.** Nine heuristics scored; the denominator is 4 × 9, not 40.

**Cognitive load:** 2 failures, moderate. *One decision at a time* fails (role and addresses are entered together, and the role applies to all of them without saying so). *No memory bridge* fails after the duplicate error, when the user must retype the list from memory.

**Persona red flags** (dashboard and admin surface: power user, accessibility-dependent user)

- **Impatient power user:** pastes six addresses, hits one duplicate, loses all six (`InviteDialog.tsx:112`).
- **Accessibility-dependent user:** cannot reach the role picker by keyboard, so cannot invite a non-admin at all (`role-picker.tsx:14`).

*Coverage table, findings table, considered-but-rejected, and verification follow here, as in Report A.*

### Verdict

`Block`: two high findings remain (1 and 2).

**Questions**

1. Which should land first? (a) The role picker, since it changes what access invites grant. (b) The duplicate-address error, since it loses typed input. (c) Both in one change.
2. Is defaulting new invites to Admin intended? (a) Yes, keep it. (b) Default to Member. (c) Require an explicit choice.
3. Scope of the fix pass? (a) High findings only. (b) All five. (c) All five plus the unverified screen-reader check.

## Reading notes

- Report A has findings and unverified items at once. The verdict stays `Block`; the gaps live under Verification.
- Report B has no findings and still does not approve. `Clear` in its coverage table is qualified ("from source") wherever behavior was not observed.
- Report C scores `n/a` with a reason and renormalizes. The severity scale and the single verdict are unchanged by scoring.
- With fewer than three priority findings, Report C would end with `Questions skipped: <n> priority findings` instead of the question list.
