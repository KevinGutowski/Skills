---
name: ux-writing
description: "Router for UX writing: product voice, microcopy, error/validation messages, settings IA, option labels, feature names, plan names, and button labels. Use when the words appear in the UI. Long-form prose → write-clear-prose; onboarding flow/empty-state strategy → user-onboarding. Read one named reference. Triggers: error copy, rename, label, voice tone, settings copy."
---

# UX Writing

For a focused question, read the single reference file that matches it — each carries the full distillation for its area (deeper worked examples and sources live in a same-named subdirectory next to it). When a task spans areas (e.g. writing copy for a whole flow needs voice *and* naming *and* error states), follow the routing chain below and read each as needed; the one-file rule optimizes Q&A lookups, not multi-surface work.

- **Voice, tone & microcopy** — defining a product's voice, dialing tone per moment, writing or reviewing general UI microcopy, empty state copy, PACE, localization-ready writing: [references/ui-voice-and-tone.md](references/ui-voice-and-tone.md); worked exercises, before→best ladders, tone drills: [references/ui-voice-and-tone/voice-and-tone-examples.md](references/ui-voice-and-tone/voice-and-tone-examples.md); provenance: [references/ui-voice-and-tone/sources.md](references/ui-voice-and-tone/sources.md)
- **Error messages** — writing or reviewing any failure-state copy: error toasts, dialogs, form validation, 404/500 pages, retry prompts, payment/auth failures, incident communication: [references/error-messages.md](references/error-messages.md)
- **Settings IA & copy** — Linear-style settings pages, subpages, sidebar taxonomy, section groupings, row titles, helper descriptions, dropdown option and action labels: [references/linear-settings-copy.md](references/linear-settings-copy.md); the underlying Linear settings audit (sidebar IA, page archetypes, row anatomy): [references/linear-settings-copy/linear-settings-copy-ia.md](references/linear-settings-copy/linear-settings-copy-ia.md)
- **Naming features & labels** — crafting and critiquing names for features, settings, buttons, tabs, modes, plan tiers; descriptive vs clever/branded; candidate generation and elimination: [references/naming-features-and-labels.md](references/naming-features-and-labels.md); full case studies (Apple Cash, Visited Places, Memories, Enhance Dialogue, AutoMix): [references/naming-features-and-labels/worked-examples.md](references/naming-features-and-labels/worked-examples.md)
- **Sources and gaps** — provenance and parked candidate rules: [references/sources.md](references/sources.md), [references/coverage-gaps.md](references/coverage-gaps.md)

**Internal deference chain (route between references the same way the original skills deferred):**
- Voice/tone sets the overall register; when the task is choosing the actual *word* for a feature, button, value, or plan, route from ui-voice-and-tone to naming-features-and-labels.
- Voice/tone sets where the serious/clinical dial sits in general; any "write/review an error" task routes from ui-voice-and-tone to error-messages, which owns the failure-state ruleset.
- Settings work composes both ways: pick the word with naming-features-and-labels, then place it and write the row with linear-settings-copy; keep its quiet register consistent with ui-voice-and-tone.

**When copy becomes agent guidance:** if the task is to make agents repeatedly apply a copy decision, name the rule with a stable ID, scope it to a surface, cite the owning reference/source, and include bad/good examples. Keep product judgment in this skill; route packaging, evals, and repo-agent trigger mechanics to `creating-skills` and `working-with-ai`.

**Boundary splits to respect:**
- **Long-form prose → `write-clear-prose`** — essays, articles, emails, sentence-level prose mechanics. This skill owns the words users read in the UI.
- **Onboarding flows and empty-state strategy → `user-onboarding`** — first-run flows, welcome copy, "no data yet" empty states for new users. Failure-state empty screens ("we couldn't load your projects") stay here in error-messages.
