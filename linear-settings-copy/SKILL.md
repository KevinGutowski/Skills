---
name: linear-settings-copy
description: Write and organize settings IA/copy in a Linear-inspired style. Use when designing settings pages, subpages, sidebar taxonomy, section groupings, setting row titles, short helper descriptions, dropdown option labels, action labels, empty states, and account/workspace/team/integration settings copy.
---

# Linear Settings Copy

Use this skill when creating or revising product settings. It is grounded in a live audit of Linear settings surfaces, summarized in `references/linear-settings-copy-ia.md`.

Before writing copy, read the reference file when the task involves:

- Deciding where a setting belongs in the settings IA
- Naming settings pages, sidebar items, sections, or rows
- Writing helper text under setting titles
- Labeling dropdown options, status chips, buttons, toggles, or empty states
- Splitting a settings surface into multiple subpages

## Workflow

1. Classify the setting scope.
   - Personal/account: user preferences, profile, notifications, sessions, connected user accounts.
   - Workspace: defaults, shared objects, automations, billing/security/admin controls.
   - Feature: a product capability with enablement, configuration, routing, schedules, statuses, or templates.
   - Integration: external app connection or marketplace-style listing.
   - Team: team-specific defaults, permissions, notifications, labels, templates, workflows.

2. Choose the right IA unit.
   - Use a row for a single setting with one control.
   - Use a card for 1-4 closely related rows.
   - Use a section when a group needs a meaningful heading or visual pause.
   - Use a subpage when the setting has lists/tables, multiple entity types, enablement plus configuration, or more than roughly 5 rows.

3. Write each setting row as:
   - Title: 2-5 words, noun phrase or concise verb phrase.
   - Description: one short sentence or fragment explaining effect, scope, or trigger.
   - Control: current state, concise action, or short option label.

4. Keep copy quiet and operational.
   - Prefer sentence case.
   - Avoid marketing adjectives.
   - Avoid explaining the UI itself.
   - Say what changes, where it applies, and when it applies.
   - Use `your` for personal settings and `workspace` / `team` for shared settings.

5. Validate the page.
   - Is the sidebar placement based on ownership/scope?
   - Does every section group a real concept?
   - Are row titles scannable without descriptions?
   - Are descriptions shorter than the row title plus control combined?
   - Do option labels read as states, not instructions?

## Output Shape

When asked for settings copy, provide:

- Suggested sidebar/page placement
- Section names
- Setting rows in `Title — Description — Control/options` format
- Any subpage split recommendations
- Notes for edge cases such as destructive actions, empty states, or integration ownership

## Relationship to Other Skills

- **`naming-features-and-labels`** decides *what to call* a feature, setting, value, or option, and how to defend that choice against clarity/fit/tone criteria. **This skill** decides *where a setting lives* in the IA and writes the full row (title + helper + control). They compose: choose the word with `naming-features-and-labels` first — especially for a new feature name, a value label, or dropdown option labels — then place and surround it here.
- **`ui-voice-and-tone`** sets the overall product voice this settings copy should sound like; keep the quiet, operational register here consistent with that voice.

