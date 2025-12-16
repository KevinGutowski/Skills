# Skill Structure

Source: [Skills Overview](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)

## Basic Structure

A skill is a ZIP file containing a folder with at least a `SKILL.md` file:

```
skill-name.zip
└── skill-name/
    └── SKILL.md
```

## SKILL.md Format

```yaml
---
name: skill-name
description: What it does and when to use it.
---

[Markdown body content]
```

### Frontmatter Requirements

| Field | Requirements |
|-------|--------------|
| `name` | Max 64 chars, lowercase letters/numbers/hyphens only, no XML tags, no reserved words ("anthropic", "claude") |
| `description` | Max 1024 chars, non-empty, no XML tags |

### Body Guidelines

- Keep under **500 lines** for optimal performance
- If approaching limit, split into separate files
- Use progressive disclosure patterns

## Extended Structure

For complex skills:

```
skill-name/
├── SKILL.md              # Main instructions (loaded when triggered)
├── reference.md          # Detailed guide (loaded as needed)
├── examples.md           # Usage examples (loaded as needed)
└── scripts/
    ├── process.py        # Utility script (executed, not loaded)
    └── validate.py       # Validation script
```

## How Loading Works

1. **At startup:** Only `name` and `description` from all skills are pre-loaded
2. **When relevant:** Claude reads `SKILL.md` from filesystem
3. **As needed:** Claude reads additional files on demand
4. **Scripts:** Executed via bash; only output consumes tokens

**Key insight:** Large reference files don't consume context until actually read.

## File Naming Best Practices

| Do | Don't |
|----|-------|
| `form_validation_rules.md` | `doc2.md` |
| `reference/finance.md` | `docs/file1.md` |
| Forward slashes: `reference/guide.md` | Backslashes: `reference\guide.md` |

## Directory Organization

Organize by domain or feature:

```
bigquery-skill/
├── SKILL.md
└── reference/
    ├── finance.md      # Revenue metrics
    ├── sales.md        # Pipeline data
    └── product.md      # Usage analytics
```

When user asks about revenue, Claude:
1. Reads SKILL.md
2. Sees reference to `reference/finance.md`
3. Reads just that file
4. Other files remain unread (zero context cost)
