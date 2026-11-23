---
name: interface-review
description: "Run a holistic, evidence-backed review of existing UI (web default; native Apple via apple-design/swiftui) across accessibility, layout, copy, type, color, performance, polish. Use for screen, flow, product, or UI-code/PR audits; quick/full/scored modes. Building → frontend-design; one craft domain → web-design, ux-writing, design-craft. Triggers: review this UI, UX audit, design review, review UI code, critique this screen, rate this design."
---

# Interface Review

Review an interface as one system instead of returning disconnected specialist audits. This skill owns scope, orchestration, evidence, prioritization, and the final verdict. Domain rules remain with their local owners.

**Worked report:** read [references/report-exemplar.md](references/report-exemplar.md) before writing your first report in a session, or whenever unsure how a section, the `Unverified` verdict, or the scored layout should look. It holds one complete `full` report, an `Unverified` close, and a `scored` variant.

**Sources/gaps:** [references/sources.md](references/sources.md) records the external orchestration, critique-scoring, and behaviour-trap sources; [references/coverage-gaps.md](references/coverage-gaps.md) parks unverified rules and missing evals.

## Resolve the review first

Infer the screen, flow, feature, or repository scope from the request and workspace. State that scope and any boundary in the report. If the requested surface is too large to inspect credibly, review the highest-traffic complete flow and say what remains outside scope.

Choose the mode:

| Mode | Coverage | Finding cap |
| --- | --- | --- |
| `quick` | Primary path and highest-traffic states; report only high and medium issues | 5 |
| `full` | Requested scope plus relevant empty, loading, error, overflow, narrow-width, keyboard, and reduced-motion states | 15 |

Default to `full`. A cap is a ceiling, not a quota.

Add **scored** to either mode when the user wants a rating, a persona or cognitive-load walk-through, or a baseline to re-run after fixes. It layers a design-specificity verdict, Nielsen 0–4 scores (with `n/a` renormalization), a cognitive-load count, persona red flags, and an optional five-dimension technical audit onto the same report: [references/critique-scoring.md](references/critique-scoring.md).

Treat review requests as read-only. Edit code only when the user also asks to implement the findings.

## Recon before judgment

Identify the framework, styling system, component library, tokens, supported viewports, and available preview/test commands. Follow project conventions. Do not recommend a second styling system or a new primitive when the established one can express the fix.

**Judge before you scan.** Form your own design judgment, including whether the interface is authored for this product or could ship unchanged for an unrelated one, *before* reading detector, lint, or axe output, because deterministic findings anchor judgment. Then reconcile: agreements, what the tools caught that you missed, and false positives. When subagents are available, run the two passes in isolation. State in the report how they ran.

**Probe behavior; don't infer it.** When the person describes a symptom ("laggy", "it jumps", "fine on my laptop, not my phone", "I can't click it") or the review covers a running build, use [references/behaviour-traps.md](references/behaviour-traps.md): a symptom-to-trap table, citable trap IDs, the task-level criteria a domain-by-domain pass can miss (shown equals sent, feedback at its trigger), and the measured probes. Responsiveness to input is never judged from a screenshot, in either direction; focus rings are judged from a capture after real Tab presses. Every probe gets a result or a reason it did not run.

**Source pass.** For UI code (a PR, a component, "check this against best practices"), grep and read against [references/code-pass-checklist.md](references/code-pass-checklist.md): source-checkable rules grouped by owning skill, the points where Vercel's guidelines and local owners disagree, and a terse `file:line` format for a code-only pass. Tested ripgrep commands for the grep step are in [references/code-compliance-sweep.md](references/code-compliance-sweep.md).

Inspect rendered behavior when the claim depends on layout, appearance, animation, focus, scrolling, or interaction. Inspect source when the claim depends on semantics or implementation. Do not turn a missing runtime check into a finding; mark it not verified. Runtime check recipes (layout shift, emulated reduced motion and color scheme, dialog focus and inertness, axe scan) and the before/after evidence format live in `browser-verification`.

**Third-party scanners need vetting.** A detector such as `npx impeccable detect` is a third-party package that `npx` downloads and executes. Run it only when it is already a project dependency (check `package.json` and the lockfile) or the user has approved running it. Otherwise skip it, do the manual pass against `frontend-design` (anti-slop-catalog), and record `Detector: not run (not a project dependency; no approval)` under Verification. The same applies to any scanner the project does not already use.

## Route to the domain owners

Read and apply only the references needed for the requested surface:

1. `web-design` (web-accessibility and form-design) — semantics, keyboard/focus, screen readers, forms, zoom, and web accessibility.
2. `web-design` (web-layout-design) — grouping, reading/source order, responsive structure, RTL, container queries, reflow, safe areas, and overflow.
3. `design-principles` — hierarchy, agency, simplicity, responsibility, and whether the interaction should work this way.
4. `ux-writing` — labels, voice, errors, settings copy, and naming.
5. `web-design` (web-typography) — measure, type scale, font use, wrapping, and numeric alignment.
6. `web-design` (oklch-skill) — color usage, contrast, palettes, gamut, and theming.
7. `web-design` (web-performance and web-animation-design) — responsiveness, loading, motion values, and reduced motion.
8. `design-craft` — spacing, radii, shadows, alignment, state polish, and interface feel; its worst-case-data reference when the review should stress components with realistic extreme data; its alignment-pass reference (drawn guides plus a probe) when edges look ragged. If the product has committed to one of its named themes (polish-principles, emil-kowalski, tactile-design), review against that theme, including tactile-design's never-ship list. Don't report the theme's deliberate choices as violations of another theme; only flag the theme's choices if it doesn't fit the surface's mode.
9. `rails` (optimizing-rails, perceived-speed) — only when the interface under review is a Rails/Hotwire app: spinners on navigation, row-by-row pop-in, prefetch/morph/optimistic-update mechanics, and the `ps-…` checklist names. Browser budgets still go to item 7.

For a motion-only pass across an app (what should animate, what to remove, or a roadmap of motion fixes as handoff plans), use `web-design` (web-animation-design)'s motion-audit member instead of a full review. Inside a full review, use its gate and removal hazards for the motion slice and report on this skill's severity scale.

For AI-generated UI, also read `working-with-ai` (ai-ui-direction) and check the named tells in `frontend-design` (anti-slop-catalog). Respect the brief and the surface's mode (Persuade, Operate, Read, Experience): a tell the brief pinned or the world earned is not a finding. An effect the user asked for, subtle or showy, or one chosen through `ui-fx` for an effects request, is such a pin: review it against the shipping floor in `ui-fx` (honest about results and fired on click, a reduced-motion path, no rapid flashing, automatic motion that stops within five seconds or has a visible, keyboard-operable pause, stop or hide control, a visible still cue and a status announcement for any state it conveys, legible text, a fallback, focus not clipped or covered, holds frame rate) instead of flagging its presence, its boldness, its frequency or its length, including under a theme's never-ship list. A missing floor item is a finding to fix in shipped work (in a prototype, list it as open; only the flash limit always applies), not a reason to remove the effect. If you cannot tell whether an effect was requested, ask or check the change description before treating it as a finding. The motion-audit gate in `web-design` (web-animation-design) carries the same exemption. For a native Apple-platform interface, replace web-specific rules with `apple-design` and `swiftui`; do not cross-apply web conventions. A website installed to the iOS/iPadOS Home Screen or macOS Dock remains web work and adds `web-design` (apple-installed-web-apps).

Assign an issue to the owner of its underlying rule and mention secondary effects in the rationale. Report one root cause once, even when it appears in several files or affects several domains.

## Evidence and severity

Every finding must:

- cite `path/to/file:line`, or the exact screen and component when no source exists;
- show the current implementation or observed behavior;
- propose an actionable replacement;
- explain the user impact and owning rule;
- where practical, state the fix as a check that fails on the current build, so it can be verified;
- distinguish observed facts from inferences.

Use one severity scale:

- **HIGH** — blocks a task, misleads users, hides content or controls, risks data loss, or creates a repeated systemic accessibility failure.
- **MEDIUM** — meaningfully harms comprehension, efficiency, adaptability, performance, or consistency.
- **LOW** — isolated polish with limited task impact; include only in `full`.

A user who believes the task finished when it did not is blocked: HIGH. A field that shows one value and sends another is HIGH when the hidden value grants access, spends money, or picks a recipient. Within a severity, rank surfaces that write data first, then by reach and leverage. A shared-token or primitive fix outranks the same symptom in one leaf component.

## Make restraint auditable

Record real candidates considered but rejected because the current implementation is permitted, evidence is insufficient, a project convention is intentional, or the proposed change adds complexity without user benefit. Do not invent rejected candidates to fill a table.

This is a defense against taste inflation: a review should show both what warrants change and where the reviewer deliberately left the product alone.

## Output

### Scope and coverage

State mode, exact scope, stack/conventions, and boundaries. Cover every applicable domain:

| Domain | Evidence inspected | Result |
| --- | --- | --- |
| Accessibility | Files, components, states, and checks | Finding count, `Clear`, or `Not reviewed` with reason |

In `scored` mode, put the method line and the design-specificity verdict first, then the score tables, then findings.

### Findings

Use one table ordered by severity, reach, and leverage:

| # | Severity | Domain | Location | Before | After | Why |
| --- | --- | --- | --- | --- | --- | --- |

Each row is one root cause. If no findings remain, omit the table and state: `No actionable interface findings.` When coverage was not verified, write `No actionable interface findings in the inspected scope.` instead.

### Considered but rejected

List the genuine borderline candidates reviewed and why they were rejected. If none exist, say so.

### Verification

List exact commands or interaction steps and their observed results. Separate passed checks from `Not verified` items.

### Verdict

End with exactly one:

- `Block` — one or more high findings remain.
- `Needs changes` — only medium or low findings remain.
- `Approve` — no actionable findings remain and the claimed coverage was verified.
- `Unverified` — no actionable findings in what was inspected, but coverage is not verified: an applicable domain is `Not reviewed`, or a check the result depends on is `Not verified` (no render, no keyboard walk, no reduced-motion or narrow-width check). This is not a pass.

`Unverified` must report, on the verdict line or directly under it: (1) each unverified domain, state, or check and why it could not be run; (2) what was inspected instead (source only, one viewport, screenshots); (3) the exact command, access, or device that would settle each gap. Never shorten it to "approved", "clean", or "looks good" in a summary. Re-run the gaps to convert it to `Approve`.

When findings exist and coverage is also unverified, the verdict is still `Block` or `Needs changes`; list the gaps under Verification so a later pass does not read the fix list as complete.

In `scored` mode, after the verdict end with 2–4 targeted questions, each with concrete options tied to the findings (what to fix first, intended tone, scope, anything off-limits). Nothing follows the questions. With fewer than three priority findings, skip the questions and write `Questions skipped: <n> priority findings` instead.
