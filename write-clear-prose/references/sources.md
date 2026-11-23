# Sources

This source map records the prose craft authorities named in `SKILL.md` and the local reference files.

## Core craft corpus

- William Zinsser, George Orwell, Strunk and White, Joseph Williams, Steven Pinker, John McPhee, Ursula K. Le Guin, Roy Peter Clark, and adjacent craft teachers supply the durable defaults: clarity, concrete language, structure, rhythm, humane voice, and revision.
- Chip Heath and Dan Heath, *Made to Stick*, supplies the sticky-message lens for memorable and action-oriented prose.
- Julie Zhuo's Looking Glass writing essays supply the workplace-writing lens: think, feel, connect, and reader-empathy passes.
- Anton Sten, *Products People Actually Want* (2025 ebook, local attachment), supplies the designer-writing lens: write knowns vs assumptions, practical vs emotional goals, user scenarios, and concept stories before visuals harden.
- Vox (@Voxyz_ai), X post, July 19, 2026, supplies the AI-assistant calibration warning: "don't sound like AI" needs a writing system, not one-off bans on words or punctuation. It routes back to Orwell-style clarity rather than introducing a separate style doctrine.

- Vercel, Writing Guidelines (https://github.com/vercel-labs/writing-guidelines, command.md on `main`, unversioned; raw: https://raw.githubusercontent.com/vercel-labs/writing-guidelines/main/command.md; read 2026-11-18; shipped as the `writing-guidelines` wrapper skill in vercel-labs/agent-skills, which fetches the file before each review). A docs-handbook review checklist. Folded by use: the docs playbook (page plan, content types and tone, titles and headings, code samples, placeholders and units, pricing pages, links, model-assisted workflow, review flag list) became `technical-docs.md`; the sentence-level tells went into existing lists in `revision-moves.md` (Clarity and Clutter cut list, Diction, AI-Default Pass, Paragraph Work, Revision Tactics) and two lines in `editing-rubric.md`; UI-copy items went to `ux-writing`. Style conflicts (em-dash ban, banned words, curly quotes, heading case, blanket passive flag, `30s`) are recorded as house choices in `technical-docs.md`, not adopted as rules. Not imported: Vercel frontmatter keys, dashboard deep-link format, canonical Vercel URLs, named model strings, and pull-request etiquette.

## Local references

- `technical-docs.md` holds the documentation-page playbook and docs review flag list.

- `revision-moves.md` holds detailed revision checklists, sentence-level moves, and an illustrative before/after bank (original examples, not from the sources).
- `form-playbooks.md` holds genre-specific playbooks.
- `editing-rubric.md` holds scoring, edit levels, and feedback formats.
- `../agents/openai.yaml` is a Codex/OpenAI skill-interface manifest (display name + default prompt) kept from the exported layout; it is packaging metadata, not a content reference.

## Promotion rule

Promote a prose rule when it is a durable craft principle, a genre pattern that repeatedly helps, or a user-accepted rewrite move. Do not add author-voice fingerprints; characterize transferable moves from genuine samples instead.

## skills.sh Design topic (2026-11-22)

- Vercel, Writing Guidelines: https://github.com/vercel-labs/writing-guidelines (rev `83e2316`, 2026-06-01), wrapped as the `writing-guidelines` skill in https://github.com/vercel-labs/agent-skills (`5a37a63`). Read: its command file in full. Folded, paraphrased: the sentence-level shapes in the AI-Default Pass (revision-moves) and the product-documentation block in the technical-explanation playbook (form-playbooks). Not imported: Vercel-specific rules (MDX meta fields, dashboard links, model strings), source-formatting rules, and the PR review process. UI-copy deltas went to `ux-writing`. Ledger: `docs/skills-sh-design-topic-source-mining-2026-11.md`.
