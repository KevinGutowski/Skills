# Skill Authoring Checklist

Source: [Best Practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)

## Core Quality

- [ ] **Description is specific** — Includes key terms users would say
- [ ] **Description says what AND when** — Both capability and trigger context
- [ ] **Description in third person** — Not "I can" or "You can use"
- [ ] **SKILL.md body under 500 lines** — Split if approaching limit
- [ ] **No time-sensitive information** — Or clearly marked as "old patterns"
- [ ] **Consistent terminology** — Same terms throughout
- [ ] **Examples are concrete** — Not abstract or theoretical
- [ ] **File references one level deep** — No nested references
- [ ] **Progressive disclosure used** — Details in separate files
- [ ] **Workflows have clear steps** — Numbered or bulleted

## Naming

- [ ] **Gerund form preferred** — `processing-pdfs`, `analyzing-data`
- [ ] **Lowercase with hyphens** — No spaces or underscores
- [ ] **Max 64 characters** — Keep it scannable
- [ ] **No reserved words** — Not "anthropic" or "claude"
- [ ] **Descriptive** — Not `helper`, `utils`, `tools`

## Code and Scripts

- [ ] **Scripts solve problems** — Don't punt to Claude
- [ ] **Error handling explicit** — Helpful error messages
- [ ] **No "voodoo constants"** — All values justified
- [ ] **Required packages listed** — In instructions
- [ ] **Packages verified available** — In execution environment
- [ ] **Scripts documented** — Clear purpose and usage
- [ ] **Forward slashes only** — No Windows-style backslashes
- [ ] **Validation steps included** — For critical operations
- [ ] **Feedback loops** — For quality-critical tasks

## File Organization

- [ ] **Descriptive file names** — `form_validation_rules.md`, not `doc2.md`
- [ ] **Organized by domain** — `reference/finance.md`, not `docs/file1.md`
- [ ] **Clear execution intent** — "Run X" vs "See X for reference"
- [ ] **Bundle comprehensive resources** — Include full docs, examples

## Testing

- [ ] **Tested with Haiku** — Does it provide enough guidance?
- [ ] **Tested with Sonnet** — Is it clear and efficient?
- [ ] **Tested with Opus** — Does it avoid over-explaining?
- [ ] **Tested with real scenarios** — Not just synthetic examples
- [ ] **At least three evaluations** — Different use cases
- [ ] **Team feedback incorporated** — If applicable

## MCP Tools (If Used)

- [ ] **Fully qualified tool names** — `ServerName:tool_name`
- [ ] **Server prefix included** — `BigQuery:bigquery_schema`

## Final Review

Ask yourself:
1. Would this skill trigger on the right keywords?
2. Is the description clear enough for Claude to choose it?
3. Is SKILL.md scannable for quick reference?
4. Are details accessible but not loaded by default?
5. Have I tested with all models I plan to use?

## Quick Reference: Limits

| Field | Limit |
|-------|-------|
| `name` | 64 characters |
| `description` | 1024 characters |
| SKILL.md body | 500 lines (recommended) |

## Quick Reference: Required Fields

```yaml
---
name: required (lowercase, hyphens, numbers only)
description: required (what it does + when to use it)
---
```
