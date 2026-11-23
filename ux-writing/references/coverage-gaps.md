# UX Writing Coverage Gaps

Use this file to park candidate copy standards that should not yet become reusable rules. Promote a candidate only after it has source evidence, scope, exceptions, and at least one bad/good or before/after example.

## Candidate Gaps

- **Destructive action labels across surfaces.** Error-message and naming references both support action-specific labels, but this skill does not yet have a dedicated destructive-action rule set with scope, exceptions, and examples for dialogs, menus, bulk actions, and settings pages.
- **Settings copy for AI/agent preferences.** `linear-settings-copy` includes an Agent Personalization page archetype, but needs more accepted examples before it can define stable rules for model-memory, personalization, delegation, and data-use settings.
- **Rule IDs for copy reviews.** The Vercel pattern calls for stable rule IDs when review findings need citations. Existing references have strong rules, but not a normalized `rule/{stable-id}` format yet.
- **Localization-risk examples.** The voice reference has localization-ready principles; the naming reference has "works everywhere." The skill still needs concrete examples of names or labels rejected for translation, market, or grammar reasons.

- **Title Case vs sentence case for headings and buttons.** Vercel's Web Interface Guidelines call for Title Case (Chicago style) on headings and buttons, while their Writing Guidelines use sentence case for docs page headings. The local web convention is sentence case (`web-design` (form-design), `linear-settings-copy.md`), with Title Case left to Apple platforms via `apple-design` (hig). Recorded as a house choice, not blended: a review flags mixed casing inside one product, and follows the product's own style guide when it sets Title Case. No accepted local example yet shows a product that deliberately uses Title Case on the web.
- **Numerals, ellipsis, and ampersand defaults.** Folded into `ui-voice-and-tone.md` from Vercel's two guideline lists (2026-11). No exceptions are written down yet (numbers that open a sentence, "one" as a pronoun, locales where the ellipsis convention differs); add them when a real case appears.

## Promotion Form

```markdown
rule/{stable-id}
Status: proposed | accepted | rejected
Owning reference:
Scope:
Rule:
Why:
Exceptions:
Source:
Bad example:
Good example:
Approver:
```
