# Skill Authoring Checklist

The one shipping checklist for this repository. `SKILL.md` and the conversion playbooks point here instead of carrying their own copies; a playbook may add source-specific items (see [converting-books-to-skills/checklist.md](converting-books-to-skills/checklist.md)) but never restates these.

House rules are stated as the rule. Where the upstream [Best Practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) default differs, it is noted in one line. Rule numbers refer to House Style in `SKILL.md`.

## Contents

- Name
- Description
- Body
- References and files
- Folding a source
- Code and scripts
- MCP tools (if used)
- Evaluate
- Validators
- Final review
- Quick reference: limits

## Name

- [ ] **Noun phrase by task shape** — `hardware-product-design`, not `designing-hardware` or `fintech-skills` (rule 4). Upstream default: gerund form.
- [ ] **Lowercase with hyphens** — No spaces or underscores
- [ ] **Max 64 characters** — Keep it scannable
- [ ] **No reserved words** — Not "anthropic" or "claude"
- [ ] **Descriptive** — Not `helper`, `utils`, `tools`

## Description

Guide: [description-writing.md](description-writing.md).

- [ ] **~350–450 characters, never over 450** — hard cap enforced by `scripts/check_vercel_overhaul.py` (rule 1). Upstream default: any length up to 1024.
- [ ] **What + when + boundaries + trigger terms** — capability, 3–5 situations, the boundary clause against near neighbours, 6–8 terms users would say
- [ ] **Third person** — Not "I can" or "You can use"
- [ ] **Single quoted line** — descriptions contain `:` characters
- [ ] **Edited a description, added a skill, or consolidated?** Routing probes run for target, nearest neighbour, and a control; fixture under `docs/`, registered in `scripts/check_routing_probe_fixtures.py` (rule 3)

## Body

- [ ] **≤500 lines and ≤ ~5k tokens** — only the first 5,000 tokens survive compaction (rule 5)
- [ ] **Decisive rules first** — routing and decision rules before appendices; nothing load-bearing in the tail
- [ ] **No time-sensitive information** — Or dated, with a staleness note
- [ ] **Consistent terminology** — Same terms throughout
- [ ] **Examples are concrete** — Not abstract or theoretical
- [ ] **Workflows have clear steps** — Numbered or bulleted
- [ ] **Nothing Claude already knows** — every line earns its tokens (rule 8)

## References and files

- [ ] **One level deep, plus the sanctioned second hop** — every reference linked from `SKILL.md` with a when-to-read hint; a `references/<name>/` subdirectory only when the parent reference links every file, the router bullet names the members, and `SKILL.md` declares the pattern (rule 18). Upstream default: strictly one level.
- [ ] **`## Contents` block on every reference over 100 lines**, in sync with its headings
- [ ] **Progressive disclosure used** — Details in separate files
- [ ] **Descriptive file names** — `form_validation_rules.md`, not `doc2.md`
- [ ] **Organized by domain** — `references/finance.md`, not `docs/file1.md`
- [ ] **Clear execution intent** — "Run X" vs "See X for reference"
- [ ] **Cross-skill mentions use real skill names in backticks**; external skills marked "if installed"
- [ ] **Sources and gaps recorded** — `references/sources.md` holds the bibliography (rule 12)

## Folding a source

- [ ] **Folded into, not beside** — parent and sibling files grepped for every number and API the fold introduces; each hit reconciled (rule 19)
- [ ] **Body got one line or one table row; the reference got the texture**
- [ ] **Quotes verified** — `scripts/verify_quotes.py`; a MISS is fixed or dropped (rule 11)

## Code and scripts

- [ ] **Scripts solve problems** — Don't punt to Claude
- [ ] **Error handling explicit** — Helpful error messages
- [ ] **No "voodoo constants"** — All values justified
- [ ] **Required packages listed** — In instructions
- [ ] **Packages verified available** — In execution environment
- [ ] **Scripts documented** — Clear purpose and usage
- [ ] **Forward slashes only** — No Windows-style backslashes
- [ ] **Validation steps included** — For critical operations
- [ ] **Feedback loops** — For quality-critical tasks
- [ ] **Credentials from environment variables** — never read from shell profiles or committed files

## MCP tools (if used)

- [ ] **Fully qualified tool names** — `ServerName:tool_name`
- [ ] **Server prefix included** — `BigQuery:bigquery_schema`

## Evaluate

- [ ] **At least three eval scenarios** — different use cases, real tasks
- [ ] **With-skill vs without-skill baseline run** — rules the baseline already follows are cut (rule 17, [measuring-skill-effect.md](measuring-skill-effect.md))
- [ ] **Eval cases laid out as** `evals/<case-name>/{prompt.md,case.yaml,graders/}` — runnable with `claude plugin eval`
- [ ] **Tested with Haiku** — Does it provide enough guidance?
- [ ] **Tested with Sonnet** — Is it clear and efficient?
- [ ] **Tested with Opus** — Does it avoid over-explaining?
- [ ] **Team feedback incorporated** — If applicable

## Validators

Run from the repository root before committing:

```bash
python3 scripts/validate_all.py
python3 scripts/check_xrefs.py
python3 scripts/check_reference_hygiene.py
python3 scripts/check_vercel_overhaul.py
python3 scripts/check_routing_probe_fixtures.py
git diff --check
```

Outside this repository: `claude plugin validate` for structure, `/doctor` for the listing budget, `/skill-doctor` for usage and context cost.

## Final review

Ask yourself:
1. Would the skill trigger on the right keywords, and stay quiet on its neighbours' prompts?
2. Is the description clear enough for Claude to choose it?
3. Is SKILL.md scannable for quick reference?
4. Are details accessible but not loaded by default?
5. Have I tested with all models I plan to use?

## Quick reference: limits

| Field | House rule | Platform limit |
|-------|-----------|----------------|
| `name` | noun phrase, lowercase/hyphens/numbers | 64 characters |
| `description` | ~350–450 characters, hard cap 450 | 1024 characters; Claude Code truncates description + `when_to_use` at 1,536 |
| SKILL.md body | ≤500 lines and ≤ ~5k tokens | 500 lines recommended; first 5,000 tokens kept after compaction |
| Reference file | `## Contents` block over 100 lines | — |

```yaml
---
name: required (lowercase, hyphens, numbers only)
description: "required (what + when + boundaries + triggers)"
---
```
