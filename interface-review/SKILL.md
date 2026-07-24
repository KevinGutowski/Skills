---
name: interface-review
description: "Run a holistic, evidence-based review of a web interface across accessibility, layout, writing, typography, color, performance, and polish. Use for whole-screen, flow, feature, or product UI audits; supports quick and full modes. Building rather than reviewing → frontend-design; one craft domain → web-design, ux-writing, or design-craft."
---

# Interface Review

Review an interface as one system instead of returning disconnected specialist audits. This skill owns scope, orchestration, evidence, prioritization, and the final verdict. Domain rules remain with their local owners.

**Sources/gaps:** [references/sources.md](references/sources.md) records the external orchestration pattern; [references/coverage-gaps.md](references/coverage-gaps.md) parks unverified rules and missing evals.

## Resolve the review first

Infer the screen, flow, feature, or repository scope from the request and workspace. State that scope and any boundary in the report. If the requested surface is too large to inspect credibly, review the highest-traffic complete flow and say what remains outside scope.

Choose the mode:

| Mode | Coverage | Finding cap |
| --- | --- | --- |
| `quick` | Primary path and highest-traffic states; report only high and medium issues | 5 |
| `full` | Requested scope plus relevant empty, loading, error, overflow, narrow-width, keyboard, and reduced-motion states | 15 |

Default to `full`. A cap is a ceiling, not a quota.

Treat review requests as read-only. Edit code only when the user also asks to implement the findings.

## Recon before judgment

Identify the framework, styling system, component library, tokens, supported viewports, and available preview/test commands. Follow project conventions. Do not recommend a second styling system or a new primitive when the established one can express the fix.

Inspect rendered behavior when the claim depends on layout, appearance, animation, focus, scrolling, or interaction. Inspect source when the claim depends on semantics or implementation. Do not turn a missing runtime check into a finding; mark it not verified.

## Route to the domain owners

Read and apply only the references needed for the requested surface:

1. `web-design` (web-accessibility and form-design) — semantics, keyboard/focus, screen readers, forms, zoom, and web accessibility.
2. `web-design` (web-layout-design) — grouping, reading/source order, responsive structure, RTL, container queries, reflow, safe areas, and overflow.
3. `design-principles` — hierarchy, agency, simplicity, responsibility, and whether the interaction should work this way.
4. `ux-writing` — labels, voice, errors, settings copy, and naming.
5. `web-design` (web-typography) — measure, type scale, font use, wrapping, and numeric alignment.
6. `web-design` (oklch-skill) — color usage, contrast, palettes, gamut, and theming.
7. `web-design` (web-performance and web-animation-design) — responsiveness, loading, motion values, and reduced motion.
8. `design-craft` — spacing, radii, shadows, alignment, state polish, and interface feel.

For AI-generated UI, also read `working-with-ai` (ai-ui-direction). For an Apple-platform interface, replace web-specific rules with `apple-design` and `swiftui`; do not cross-apply web conventions.

Assign an issue to the owner of its underlying rule and mention secondary effects in the rationale. Report one root cause once, even when it appears in several files or affects several domains.

## Evidence and severity

Every finding must:

- cite `path/to/file:line`, or the exact screen and component when no source exists;
- show the current implementation or observed behavior;
- propose an actionable replacement;
- explain the user impact and owning rule;
- distinguish observed facts from inferences.

Use one severity scale:

- **HIGH** — blocks a task, misleads users, hides content or controls, risks data loss, or creates a repeated systemic accessibility failure.
- **MEDIUM** — meaningfully harms comprehension, efficiency, adaptability, performance, or consistency.
- **LOW** — isolated polish with limited task impact; include only in `full`.

Within a severity, rank by reach and leverage. A shared-token or primitive fix outranks the same symptom in one leaf component.

## Make restraint auditable

Record real candidates considered but rejected because the current implementation is permitted, evidence is insufficient, a project convention is intentional, or the proposed change adds complexity without user benefit. Do not invent rejected candidates to fill a table.

This is a defense against taste inflation: a review should show both what warrants change and where the reviewer deliberately left the product alone.

## Output

### Scope and coverage

State mode, exact scope, stack/conventions, and boundaries. Cover every applicable domain:

| Domain | Evidence inspected | Result |
| --- | --- | --- |
| Accessibility | Files, components, states, and checks | Finding count, `Clear`, or `Not reviewed` with reason |

### Findings

Use one table ordered by severity, reach, and leverage:

| # | Severity | Domain | Location | Before | After | Why |
| --- | --- | --- | --- | --- | --- | --- |

Each row is one root cause. If no findings remain, omit the table and state: `No actionable interface findings.`

### Considered but rejected

List the genuine borderline candidates reviewed and why they were rejected. If none exist, say so.

### Verification

List exact commands or interaction steps and their observed results. Separate passed checks from `Not verified` items.

### Verdict

End with exactly one:

- `Block` — one or more high findings remain.
- `Needs changes` — only medium or low findings remain.
- `Approve` — no actionable findings remain and the claimed coverage was verified.
