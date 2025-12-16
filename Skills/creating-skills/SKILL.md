---
name: creating-skills
description: Create Claude skills following official best practices. Covers structure, naming, descriptions, progressive disclosure, and testing. Use when authoring new skills or improving existing ones.
---

## Official Documentation

- [Skills Overview](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) — How skills work, architecture, structure
- [Quickstart](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/quickstart) — Create your first skill
- [Best Practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) — Authoring guidelines
- [Using Skills with the API](https://platform.claude.com/docs/en/build-with-claude/skills-guide) — Programmatic usage

## Core Principles

### 1. Concise is Key

The context window is shared. Only add what Claude doesn't already know.

**Ask yourself:**
- "Does Claude really need this explanation?"
- "Can I assume Claude knows this?"
- "Does this paragraph justify its token cost?"

Details: [conciseness.md](conciseness.md)

### 2. Set Appropriate Degrees of Freedom

| Freedom Level | Use When | Example |
|---------------|----------|---------|
| **High** (text instructions) | Multiple approaches valid | Code review guidelines |
| **Medium** (pseudocode) | Preferred pattern exists | Report generation template |
| **Low** (exact scripts) | Operations are fragile | Database migrations |

Details: [degrees-of-freedom.md](degrees-of-freedom.md)

### 3. Test with All Models

Skills effectiveness depends on the underlying model.

| Model | Consider |
|-------|----------|
| Haiku | Does the skill provide enough guidance? |
| Sonnet | Is the skill clear and efficient? |
| Opus | Does the skill avoid over-explaining? |

## SKILL.md Structure

```
---
name: skill-name (lowercase, hyphens, max 64 chars)
description: What it does + when to use it (max 1024 chars)
---

[Body content - under 500 lines]
```

Details: [skill-structure.md](skill-structure.md)

## Naming Convention

Use **gerund form** (verb + -ing):

| Good | Avoid |
|------|-------|
| `processing-pdfs` | `helper` |
| `analyzing-spreadsheets` | `utils` |
| `managing-databases` | `documents` |

## Writing Descriptions

**Always write in third person.** The description is injected into the system prompt.

**Template:**
```
[What it does]. Use when [trigger context].
```

**Example:**
```yaml
description: Extract text and tables from PDF files, fill forms, merge documents. Use when working with PDF files or when the user mentions PDFs, forms, or document extraction.
```

Details: [writing-descriptions.md](writing-descriptions.md)

## Progressive Disclosure

SKILL.md is an overview that points to detailed materials. Claude reads files on-demand.

```
skill-name/
├── SKILL.md              # Overview (< 500 lines)
├── reference.md          # Detailed guide (loaded when needed)
├── examples.md           # Usage examples
└── scripts/
    └── utility.py        # Executed, not loaded into context
```

**Key insight:** Scripts' outputs consume tokens, not their contents.

Details: [progressive-disclosure.md](progressive-disclosure.md)

## Checklist Before Shipping

**Core quality:**
- [ ] Description says what AND when
- [ ] SKILL.md body under 500 lines
- [ ] Examples are concrete, not abstract
- [ ] File references one level deep
- [ ] Consistent terminology

**Code and scripts:**
- [ ] Scripts solve problems (not punt to Claude)
- [ ] Error handling is explicit
- [ ] Required packages listed
- [ ] Forward slashes only (no Windows paths)

**Testing:**
- [ ] Tested with Haiku, Sonnet, and Opus
- [ ] Tested with real usage scenarios

Details: [checklist.md](checklist.md)
