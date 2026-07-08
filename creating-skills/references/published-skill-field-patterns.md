# Published-Skill Field Patterns

*Scope: patterns observed in published, third-party skills in the wild — distribution/discovery models, authoring formats, and supply-chain cautions. Source: a full sweep of the ui-skills.com registry (~80 skills, 2026-07; manifest in `docs/ui-skills-source-mining-2026-07.md`). These are field observations, not house style — promote via the coverage-gaps form. House rules stay in `SKILL.md`.*

## Contents

- Distribution and discovery models
- Authoring formats observed
- Recurring techniques worth considering
- Agent-workflow discipline (audit/fix skills)
- Supply-chain and intake cautions

## Distribution and discovery models

The ui-skills.com model (Julien Thibeaut/ibelick, github.com/ibelick/ui-skills) is the most complete public skill-distribution stack observed so far. Its layers:

- **Flat-file registry**: `registry.txt` — one line per skill: `author/slug <TAB> raw SKILL.md URL <TAB> description`. Trivially parseable by any agent; no API, no auth. The registry aggregates *other people's repos* by raw URL rather than vendoring them.
- **Per-skill `llms.txt`** plus a site-wide `llms.txt` — every catalog page has an agent-readable twin, so agents can browse the catalog without HTML scraping.
- **A CLI as the discovery surface**: `npx ui-skills start` / `categories` / `list --category <c>` / `get <slug>`. The intended agent flow is CLI-first: inspect categories, then fetch only the chosen skill.
- **A root routing skill** (`ui-skills-root`) whose whole job is selection: decide if the task is UI-related ("if not, return `no skill needed`"), identify category, then "select the smallest useful skill set." Its selection rules are a compact minimal-context doctrine: **prefer 1 skill; 2 only for two clear angles; 3 only for broad review/redesign; never more than 3; route by topic, then stack, then specificity; prefer specific over broad, framework-specific when the stack is obvious.**
- **Per-agent install pages** (Claude Code, Cursor, Codex, Copilot…) — installation instructions are an agent-specific concern, kept off the skills themselves.

Contrast with this corpus: we vendor-and-audit (fold lessons, verify quotes, keep provenance in sources.md) where the registry model links-and-fetches. The registry model is always current but inherits upstream drift unreviewed — see cautions below. The load-bearing ideas that transfer regardless: a machine-readable index whose entries are `name + one-line routing description + pointer`, an explicit selection-budget rule (smallest useful set, hard cap), and routing order topic → stack → specificity.

## Authoring formats observed

- **Linter-skill format** (Raphael Salaja, github.com/raphaelsalaja/skill): the skill is an audit checklist of namespaced rule IDs (`timing-under-300ms`, `nested-propagate-required`), each with minimal Fail/Pass code pairs, a mandated `file:line - [rule-id]` report format, and a severity summary table. Deterministic and greppable; rule IDs double as acceptance criteria when the same skill generates code. The cost: rules read as laws with no tradeoff discussion — mine them as defaults, not doctrine.
- **Priority-ordered audit format** (ibelick `fixing-*` family): "rule categories by priority" table (impact column: critical → low), a "when to apply" trigger list, and — notably — **"tool boundaries" as its own top-priority category** (minimal targeted fixes, never migrate libraries, follow the project's existing pattern). Encoding restraint as rules of the same rank as the domain rules is what keeps an audit skill from rewriting the codebase.
- **Command-suite with per-command references** (Paul Bakaus, Impeccable: 23 sub-commands, register routing, bundled detector scripts + edit hooks) — the most elaborate progressive disclosure seen in the wild; both exemplar and cautionary scale. Its lighter cousin (0xdesign design-lab): command files are thin pointers that delegate wholly to the skill, keeping one source of truth.
- **Two-tier navigation** (wshobson): a ~2.5KB SKILL.md router + one `references/details.md`, with an explicit "read that file when the tier above is insufficient" pointer.
- **Three-tier asset disclosure** (Zara Zhang, frontend-slides): compact `selection-index.json` (metadata incl. `mood/best_for/avoid_for`) → shortlisted preview cards → full design file only after user selection. Token-budget-aware retrieval for large asset libraries.
- **Repo-adaptive, self-extending references** (Thomas Ricouard, dimillian/skills): a components index where every entry carries a "use when" clause; references instructed to link to concrete files in the *current* repo (the skill improves in situ); an "adding a new component reference" section makes the skill self-extending. Per-agent metadata (`agents/openai.yaml`) rides alongside for cross-harness install.

## Recurring techniques worth considering

- **Project design-memory files** — four independent skills converged on skill-managed persistent context with save-on-completion offers: Impeccable (PRODUCT.md/DESIGN.md), interface-design (`.interface-design/system.md` with measured component records: "Button primary — 36px h · 12px 16px pad · 6px radius"), ui-ux-pro-max (MASTER.md + per-page overrides with explicit precedence), design-lab (DESIGN_MEMORY across sessions). Convergence this strong is a signal; the risk (stale taste lock-in) is tracked in coverage-gaps.
- **Dated, countable taste tells**: Impeccable dates its anti-slop tells ("the saturated AI default of 2026") and quantifies them (OKLCH bands, "appears on 55–95% of generations"); taste-skill tags rules with provenance ("the #1 violated rule in production tests"). Tells drift with training data — anti-slop guidance should carry evidence dates and, where possible, a mechanical count, moving judgment toward detectors.
- **Per-model defect catalogs**: skills are starting to carry model-specific failure lists ("Codex-specific defects") and model-targeted variants (gpt-tasteskill) instead of universal rules.
- **Talking to the model about its own biases** (frontend-slides): "you still converge on Space Grotesk across generations" — naming the convergence behavior directly in the prompt, rather than only banning outputs.
- **Failure-driven emphasis escalation**: shouted NON-NEGOTIABLE blocks accrete exactly where models repeatedly failed (design-lab's overlay warnings, frontend-slides' authenticity rules). When *mining* external skills, treat the shouted sections as the highest-evidence lessons, not noise — the field corroboration of house rule 7 (gotchas from observed failures).
- **Counter-rationalization tables** (Addy Osmani): a "Common Rationalizations" table (rationalization → reality) pre-empting the agent's own corner-cutting excuses; paired with a Red Flags + Verification closing checklist, and eval cases shipped next to the skill (`evals/cases/*.json`).
- **Mechanical trigger tests for proactive skills** (Million, Budge): ambient skills gate on a *mechanical* test, not judgment — "the last StrReplace call touched exactly one CSS value literal … in exactly one file," with Pass/Fail examples — plus an explicit turn-boundary rule (end the turn immediately after the change to hand control to the human-in-the-loop tool).
- **Capability-gated instructions with fallback ladders**: "never assume the tool exists; check, then use it" (interface-design's render-when-you-can; taste-skill's image-gen ladder). Tool-conditional behavior always names its fallback.
- **Scope-and-defer with precedence** (zeke/swiss-design): a theme skill declares its non-scope (no a11y/behavior rules), delegates to a behavior skill, and states the conflict rule ("rules inlined here take precedence"). Clean composition model for aesthetic-theme skills.
- **Output-quality prompting levers** (Anthropic's own canvas-design): two-phase self-prompt (author a named design-philosophy manifesto first, express it visually second); a pre-baked rejection ("the user ALREADY said it isn't perfect enough") forcing a refinement pass every run — the cheap cousin of the fresh-context judge, with an anchoring limitation; a refine-don't-add second pass ("if the instinct is to draw a new shape, STOP"); deliberate repetition of quality framing as an acknowledged lever.
- **Generation dials**: two independent sources (taste-skill, ui-ux-pro-max) converged on the same three 1–10 sliders — variance / motion intensity / visual density — as the steering interface for one generation pipeline. Tunable scalars beat binary style flags.

## Agent-workflow discipline (audit/fix skills)

The AccessLint suite and Million's react-doctor playbook are the strongest workflow documents in the sweep; their moves generalize to any audit-and-fix skill:

- **Mode disambiguation from user intent**, with "If unsure, ask. Don't default-to-fix" — and per-skill one-line contracts ("Locate; don't fix") with named handoffs between sibling skills.
- **Fixability split**: mechanical fixes applied verbatim; judgment-requiring fixes flagged with rule-ID'd TODOs, never guessed ("never invent content").
- **"When to bail" sections**: verification fails → "name it and stop. Do not iterate silently."
- **Anti-cop-out deferral rules** (react-doctor): deferral is instance-level and last-resort — "'Large file', 'many sites', 'subagent failed', or 'running out of time' are not deferral reasons."
- **Score by unique rule keys, not instance counts** (react-doctor: `100 − 1.5×|error rules| − 0.75×|warning rules|`) so one systemic bug isn't 40 points; report before/after scores.
- **Validation strategy by severity**: errors fixed serially with per-fix typecheck and revert-on-fail; warnings batched with one validation, falling back to serial re-application to isolate an offender.
- **Per-rule prompt files split "is this real?" from "how to fix"** — a `## Validation prompt` (false-positive triage) and a `## Fix prompt` (canonical recipe) per rule.
- **User-curated suppression files** the agent may read but never auto-edit (false-positive lists surfaced in chat for the human to paste).
- **A "Gotchas" section as operational scar tissue** ("never hardcode port 9222", HMR sleep, selector drift) — the field form of house rule 7.

## Supply-chain and intake cautions

Observed failure modes when treating published skills as installable truth (extends `docs/skill-library-ops.md` §External Skill Intake):

- **Remote-fetch behavior is unpinned.** Several skills move their real content outside the versioned skill text: react-doctor fetches its canonical playbook and per-rule prompts at run time ("updating the prompt at its source updates every agent on its next fetch"), antfu's web-design-guidelines WebFetches Vercel's rules live, Budge injects a CDN-hosted widget, rams.ai calls a hosted engine. Always-current, but unreviewable at install time and a standing injection surface. House position: vendor and audit. The clean middle ground observed: antfu's `SYNC.md` provenance stub (vendored source path + upstream git SHA + sync date, backed by a submodule) — worth adopting when vendoring external material.
- **Commercial skills embed marketing.** rams.ai mandates a footer ad with UTM on every review and scripts an upsell; screen commercial sources for conflict-of-interest before folding their "rules."
- **Registries rot.** In one sweep: a listed repo deleted and superseded (gpt-tasteskill → taste-skill), a skill set restructured under new names (AccessLint), five registry entries pointing at one identical file ("compatibility listings"), and a skill whose linked reference file doesn't exist in its repo (addyosmani — the wild-world case for our `check_xrefs.py` gate). Re-resolve a registry entry to its actual current content before mining or recommending it.
- **Descriptions steer routing** (known SKILL.md supply-chain finding): a derivative skill in the sweep (bencium) copied Anthropic's frontend-design description verbatim — identical routing surface, different body. Screen for description/body mismatch.
