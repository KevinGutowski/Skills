# Coverage Gaps

Use this file for design-system standards that are plausible but not yet supported strongly enough to become reusable guidance.

## Candidate gaps

- **Agent context pack exemplars:** Need accepted examples of a token/component/recipe pack that actually improved generated UI without dumping the whole design system.
- **Deterministic DS checks:** Candidate lint rules include off-token colors, unapproved radii, one-off shadows, missing focus states, unsupported component props, and undocumented variants. Add only when a repo exposes stable token/component metadata.
- **Product judgment boundary:** The DS can expose allowed substrate; it should not decide product-specific UX, copy, onboarding, or AI behavior unless those rules live in the owning skill.
- **AI-legible naming evidence:** Add examples where renaming tokens/props helped or hurt agent output before promoting naming rules beyond the existing source-backed guidance.
- **Governance fixtures:** Contribution, deprecation, and adoption dashboards need concrete templates if this skill starts generating DS governance artifacts repeatedly.
- **System quality audit examples:** Sten's warning that systems can speed, standardize, and scale poor work needs accepted examples before becoming a deterministic preflight beyond the current guidance.
- **Component API contract evidence (components.build, single source):** the element contract in [component-api-contracts.md](component-api-contracts.md) rests on one spec written by two authors from the shadcn/Radix ecosystem. Corroborated locally only in part (slots over opinionated components, primitives over one-off cards, generated docs). Before promoting any of it to a deterministic check, confirm against a second primitive library's documented conventions (React Aria Components or Base UI).
- **Local positions accepted on delegated judgment (2026-11-18):** the maintainer left three calls in that reference to the agent that wrote it, so they have no independent reviewer and no project evidence yet. Decisions are logged under "Decision log" below. Reopen any of them on a counter-example from real work.
- **Copy-in upgrades:** the spec lists version tracking as a registry benefit but describes no way to update copies already installed. Need evidence of how teams running a shadcn-style internal registry handle fixes, security patches and adoption measurement.
- **`aria-disabled` instead of `disabled`:** the spec recommends keeping an invalid form's submit button focusable with `aria-disabled` plus an explanation. Not corroborated by `web-design` (web-accessibility); do not apply as a rule until it is.
- **Unverified in this pass:** Base UI's `render` prop as its equivalent of `asChild` (from memory, not from the source); Tailwind's package-scanning syntax per major version; React's handling of `ref` on function components per version (dated 2026-11, also tracked by `react`); the shadcn registry item schema (linked, not encoded).
- **Styling contract outside Tailwind:** the spec's override guarantee (consumer classes win) depends on `tailwind-merge`. No source yet for the equivalent contract in CSS Modules, cascade layers or other styling systems.
- **Framework reach:** the spec says its principles apply to Vue, Svelte and Angular and gives only React examples. The `asChild`, ref and controlled-state rules are React-shaped; no evidence here for other frameworks.
- **Marketplaces:** one named platform (21st.dev) and no outcome data. Kept to a risk list.
- **Source license mismatch:** vercel/components.build's LICENSE file is Apache-2.0 and its README says MIT (at `0861fbc`). Nothing was copied; recheck if a later fold wants to quote at length.
- **Code-side composition and persisted overrides (2026-11):** The structural-boolean rule comes from one vendor guide (Vercel composition patterns, React only). The MASTER-plus-page-override layout comes from one tool (`ui-ux-pro-max`). Both are noted in field-notes, not promoted to checks. Needs a second source or a local migration that shows agents produce fewer wrong combinations.

- **Correction capture (Kowalski learn-taste, single source):** the five signals and the roughly 40-line threshold for moving a DESIGN.md section into a skill are one author's skill, not run here. Wanted: one real session mined this way, with the approved and skipped rules recorded.
- **Hands-on run numbers (design.how, single source):** merge tolerances (ΔE OK 2, 2 px, 1 px font size, 30 ms), the 30%-and-12 gap threshold, capture widths 390/1280 and scroller widths 390/768/1280/1920, the eight-surface "small app" cutoff, and the nine-heading doc order all come from one practitioner's migration. Treat them as defaults until a second source or a local run corroborates them.
- **Upstream scripts unreviewed:** the drift check, guarded capture, pixel diff, legacy ratchet, landing, and parity scripts are linked, not vendored. A line-by-line review is needed before recommending them as installable tooling rather than as a pointer.
- **No local exemplar of a hands-on run:** there is no accepted before/after report, mapping table, or component entry produced with these references yet.

## Candidate promotion form

```markdown
Candidate:
Owning section/reference:
Source or accepted DS example:
Mechanical check possible:
Rule:
Exception:
Status: proposed | accepted | rejected
```

## Decision log

```markdown
Candidate: Defaults before the prop spread, invariants after, internal handlers composed with the consumer's
Owning section/reference: component-api-contracts, element contract rule 6
Source or accepted DS example: components.build ("spread props last", examples inconsistent); Radix handler composition; JSX spread semantics
Mechanical check possible: partly (lint for an internal handler declared before a rest spread)
Rule: accepted as a rule
Exception: props the consumer must fully control are never invariants
Status: accepted (delegated to the agent, 2026-11-18)
```

```markdown
Candidate: Internal systems with adoption targets ship primitives, components and utilities as a package; blocks, pages and templates are copy-in
Owning section/reference: component-api-contracts, distribution
Source or accepted DS example: components.build (both models valid); SKILL.md adoption ratio, breaking-change windows and automated migrations, which assume a versioned artifact
Mechanical check possible: no
Rule: accepted as the default
Exception: copy shadcn-style source into the system package once, then publish the package; a single product or a team with nobody to maintain a package may copy in directly until a second consumer appears
Status: accepted (delegated to the agent, 2026-11-18)
```

```markdown
Candidate: Artifact → owner mapping (primitive adopted, component and utility core team, pattern as guidance, block product team, template whoever forks)
Owning section/reference: component-api-contracts, vocabulary table
Source or accepted DS example: components.build taxonomy (no owners assigned); federated model in SKILL.md
Mechanical check possible: no
Rule: accepted as a default starting assignment, not a standard; column renamed "Default owner (local)"
Exception: org structure decides; no core team means the shared-package maintainer; an unedited block copied by several products is a promotion candidate
Status: accepted as default (delegated to the agent, 2026-11-18)
```
