# Progressive Disclosure

Source: [Skills Overview](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)

## The Concept

SKILL.md serves as an overview that points Claude to detailed materials as needed—like a table of contents in an onboarding guide.

Claude reads files on-demand, not all at once.

## How It Works

1. **User triggers skill** — Keywords in conversation match description
2. **Claude reads SKILL.md** — Gets the overview and structure
3. **Claude reads specific files** — Only what's needed for the task
4. **Scripts execute** — Output (not source) enters context

## Directory Patterns

### Pattern 1: High-Level Guide with References

```
pdf-processing/
├── SKILL.md              # Quick start + references
├── FORMS.md              # Form-filling guide
├── reference.md          # API reference
└── examples.md           # Usage examples
```

SKILL.md:
```markdown
## Quick start
[Basic usage]

## Advanced features
- **Form filling**: See [FORMS.md](FORMS.md)
- **API reference**: See [reference.md](reference.md)
- **Examples**: See [examples.md](examples.md)
```

### Pattern 2: Domain-Specific References

```
bigquery-skill/
├── SKILL.md
└── reference/
    ├── finance.md        # Revenue metrics
    ├── sales.md          # Pipeline data
    └── product.md        # Usage analytics
```

Claude reads only the relevant domain file.

### Pattern 3: Scripts for Deterministic Operations

```
data-validation/
├── SKILL.md
└── scripts/
    ├── validate.py       # Runs validation
    ├── clean.py          # Cleans data
    └── report.py         # Generates reports
```

Scripts are **executed**, not read. Only their output enters context.

## Token Economics

| Content Type | Token Cost |
|--------------|------------|
| SKILL.md | Loaded when skill triggers |
| Reference files | Zero until read |
| Script source code | Zero (executed, not read) |
| Script output | Consumed when executed |

## Best Practices

### Keep SKILL.md Under 500 Lines

If approaching this limit, split content:

```markdown
## Topic A
[Brief overview]
Details: [topic-a.md](topic-a.md)

## Topic B
[Brief overview]
Details: [topic-b.md](topic-b.md)
```

### One Level Deep

References should not reference other references.

```
# Good
SKILL.md → reference.md

# Avoid
SKILL.md → reference.md → deep-reference.md
```

### Make Intent Clear

```markdown
# Execute the script
Run `analyze_form.py` to extract fields

# Read as reference
See `analyze_form.py` for the extraction algorithm
```

### Scripts vs. References

| Use Script When | Use Reference When |
|-----------------|-------------------|
| Operation is deterministic | Information varies by context |
| Output is structured | Content is explanatory |
| Validation is needed | Examples are needed |
| Computation is required | Guidelines are provided |

## Example: Complete Structure

```
form-processing/
├── SKILL.md                    # Overview (100 lines)
├── field-types.md              # Field type reference
├── validation-rules.md         # Validation logic
├── examples/
│   ├── simple-form.md          # Basic example
│   └── complex-form.md         # Advanced example
└── scripts/
    ├── extract_fields.py       # Extract form fields
    ├── validate_form.py        # Validate filled form
    └── fill_form.py            # Fill form with data
```

User asks to fill a form:
1. Claude reads SKILL.md (100 lines)
2. Runs `extract_fields.py` (sees output only)
3. Reads `validation-rules.md` (as needed)
4. Runs `fill_form.py`
5. Runs `validate_form.py`

Total context: SKILL.md + script outputs + one reference file
