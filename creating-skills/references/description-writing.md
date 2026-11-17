# Writing Effective Descriptions

The one description guide for this repository. `SKILL.md` and the conversion playbooks point here; [converting-books-to-skills/writing-descriptions.md](converting-books-to-skills/writing-descriptions.md) keeps only book-specific examples.

House rules are stated as the rule; the upstream default ([Best Practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)) is noted in one line where it differs.

## Contents
- Why Descriptions Matter
- The House Rule
- The Formula
- Length
- Boundary Clauses
- Include Key Terms
- Effective Examples
- Common Mistakes
- Testing: Routing Probes

## Why Descriptions Matter

The description is critical for skill selection. Claude uses it to choose the right skill from potentially 100+ available skills. It is the only part of a skill that is always loaded, so it is the routing contract.

The description must provide enough detail for Claude to know **when** to select the skill. A vague description means the skill won't trigger when it should; an overly specific one means it won't trigger often enough.

## The House Rule

**Third person; what + when + boundaries + trigger terms; ~350–450 characters, hard cap 450.**

The description is injected into the system prompt. Inconsistent point-of-view causes discovery problems.

| Good | Avoid |
|------|-------|
| "Processes Excel files and generates reports" | "I can help you process Excel files" |
| "Extracts text from PDFs" | "You can use this to extract PDF text" |

Write it as a single quoted YAML line (descriptions contain `:` characters).

## The Formula

```
What it does (verb-led). Use when <3–5 situations>. <Boundary clause>. Based on <credit>. Triggers: <6–8 query-like terms>.
```

| Component | Purpose | Example |
|-----------|---------|---------|
| What it does | The capability, action verb first, with key techniques | "Shape product work by setting boundaries, finding elements, identifying risks, and writing pitches" |
| Use when | The trigger conditions | "Use during the shaping phase before betting" |
| Boundary clause | What it is not, and which neighbour owns that | "Generation itself → frontend-design" |
| Credit | The source that names the school | "Based on Shape Up" |
| Triggers | Words users actually say | "pitch, appetite, scope, boundaries" |

Upstream default: `[What it does]. Use when [trigger context].` — the first two components only. It assumes a small library with no near neighbours; the shape generalizes, the brevity does not.

## Length

| Limit | Value | Source |
|-------|-------|--------|
| House target | ~350–450 characters | House Style rule 1 |
| House hard cap | 450 characters | `scripts/check_vercel_overhaul.py` fails above it |
| Platform cap | 1024 characters | API limit |
| Claude Code listing | description + `when_to_use` truncated at 1,536 characters | listing budget; `/doctor` shows drops |

The caps are limits, not budgets: every description preloads into every session. Below ~350 characters a description in this library has usually dropped its boundary clause or its triggers. Upstream default: 100–200 characters for most skills, up to 300 for broad ones; do not use that band here.

## Boundary Clauses

Dense libraries have near neighbours. A clause such as "DEFAULT school; escalate on named pains" or "Distinct from X's perf audit" exists because of a real routing miss. Compress a boundary clause; never drop it (House Style rule 2). Name the neighbouring skill that owns the excluded work.

## Include Key Terms

Think about what words users might say:

| Skill | Key Terms to Include |
|-------|---------------------|
| PDF processing | PDF, forms, extract, document, merge |
| Data analysis | spreadsheet, Excel, CSV, analyze, chart |
| Code review | review, security, bugs, vulnerabilities |

## Effective Examples

House shape (a description from this library):

```yaml
description: "Create Claude skills following best practices: structure, naming, descriptions, progressive disclosure, testing, and converting sources into skills. Use for authoring or improving skills, or encoding a book, guide, codebase, PR history, or visual reference corpus into skills. Triggers: create a skill, SKILL.md, taste.md, convert this book/repo/images to a skill."
```

Upstream examples. They show the what + when core well; in this library each would still need a boundary clause and triggers:

```yaml
description: Extract text and tables from PDF files, fill forms, merge documents. Use when working with PDF files or when the user mentions PDFs, forms, or document extraction.
```

```yaml
description: Analyze Excel spreadsheets, create pivot tables, generate charts. Use when analyzing Excel files, spreadsheets, tabular data, or .xlsx files.
```

```yaml
description: Generate descriptive commit messages by analyzing git diffs. Use when the user asks for help writing commit messages or reviewing staged changes.
```

## Common Mistakes

### Too Vague

```yaml
# Bad
description: Helps with documents

# Good
description: Convert Word documents to PDF format with preserved formatting. Use when the user needs to export or convert .docx files.
```

### Missing Triggers

```yaml
# Bad
description: Processes data

# Good
description: Clean and transform CSV data by handling missing values, removing duplicates, and standardizing formats. Use when working with messy CSV files or data cleaning tasks.
```

### Wrong Point of View

```yaml
# Bad
description: I can help you analyze code

# Good
description: Analyzes code for security vulnerabilities and suggests fixes. Use when reviewing code security or when the user mentions security audits.
```

### Too Narrow

❌ "Helps with the Dot Grid Calendar case study from Shape Up"
✅ "Shape product work by setting boundaries and finding elements."

The narrow version only triggers on one specific topic.

### No Boundary

A description that claims a whole domain ("animation", "design review") without saying which neighbour owns the adjacent work will collide with that neighbour. Add the clause.

### Drifting Toward the Cap

Adding a trigger term for every fold pushes a description past 450. Pool vocabulary; cut the weakest term when adding one.

## Testing: Routing Probes

Any description edit, new skill, or consolidation requires routing probes (House Style rule 3):

1. Write realistic prompts for the target skill, its nearest neighbour, and a control that must NOT route to the edited skill. Include synonyms ("prioritize features" should still reach a betting skill) and a description of the work without the trigger words.
2. Save them as a fixture under `docs/` and register it in `scripts/check_routing_probe_fixtures.py`.
3. Give a fresh judge the descriptions only (the script's `--packet` flag prints the blind packet) and compare its routing with the expected answers.
4. Check false positives: does the skill trigger when it shouldn't? Revert if routing is worse than before.
