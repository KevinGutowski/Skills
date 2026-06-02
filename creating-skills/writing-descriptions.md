# Writing Effective Descriptions

Source: [Best Practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)

## Why Descriptions Matter

The description is critical for skill selection. Claude uses it to choose the right skill from potentially 100+ available skills.

Your description must provide enough detail for Claude to know **when** to select this skill.

## The Golden Rule

**Always write in third person.**

The description is injected into the system prompt. Inconsistent point-of-view causes discovery problems.

| Good | Avoid |
|------|-------|
| "Processes Excel files and generates reports" | "I can help you process Excel files" |
| "Extracts text from PDFs" | "You can use this to extract PDF text" |

## The Formula

```
[What it does]. Use when [trigger context].
```

Both parts are essential:
- **What it does** — The capability
- **When to use it** — The trigger conditions

## Effective Examples

### PDF Processing

```yaml
description: Extract text and tables from PDF files, fill forms, merge documents. Use when working with PDF files or when the user mentions PDFs, forms, or document extraction.
```

### Excel Analysis

```yaml
description: Analyze Excel spreadsheets, create pivot tables, generate charts. Use when analyzing Excel files, spreadsheets, tabular data, or .xlsx files.
```

### Git Commit Helper

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

## Include Key Terms

Think about what words users might say:

| Skill | Key Terms to Include |
|-------|---------------------|
| PDF processing | PDF, forms, extract, document, merge |
| Data analysis | spreadsheet, Excel, CSV, analyze, chart |
| Code review | review, security, bugs, vulnerabilities |

## Length Guidelines

| Length | Use When |
|--------|----------|
| 50-100 chars | Very specific, narrow skill |
| 100-200 chars | Most skills |
| 200-300 chars | Broad skill with multiple triggers |

Maximum: 1024 characters
