# Sources

This is a top-level provenance map for the Apple platform design skill. It does not replace the per-topic source files; use it to decide which reference has source support and which claims need live verification.

## Canonical live sources

- `hig.md` points to Apple's living Human Interface Guidelines and the JSON fetch playbook. Use it for current component specs, platform-considerations tables, and staleness tie-breakers.
- Apple's design "What's New" page is the audit entrypoint after WWDC or point releases. If it names a covered topic, re-check that reference before promoting a rule.

## Local distilled sources

- `liquid-glass-design-system.md` is sourced from WWDC 2025 Liquid Glass sessions and related showcase sessions. Its subfolder carries the detailed source list and adoption case studies.
- `apple-navigation-design.md`, `apple-search-design.md`, `apple-typography.md`, `apple-visual-accessibility.md`, `app-icon-design.md`, `app-intents-design.md`, and `chart-experience-design.md` each have a same-named `sources.md` in their subfolder.
- `classic-hig-principles.md` is a local historical reference. Use it for durable principles, not current component specs.
- `ios-brand-identity.md` synthesizes local Apple/platform sources. Treat brand guidance as a decision layer and use `hig.md` or the relevant topic source for exact platform rules.

## Promotion rule

Promote a new Apple design rule only when at least one of these is true:

- The current HIG or Apple developer/design documentation supports it.
- A topic reference's same-named `sources.md` supports it and the rule is not contradicted by the current HIG.
- The rule is a local accepted convention with a named scope, owner, and exception path.

If none of those hold, put the candidate in `coverage-gaps.md` instead of adding it to `SKILL.md`.
