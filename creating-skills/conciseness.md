# Conciseness: The Core Principle

Source: [Best Practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)

## Why Conciseness Matters

The context window is a public good. Your skill shares it with:
- The system prompt
- Conversation history
- Other skills' metadata
- The user's actual request

Not every token has an immediate cost:
- **At startup:** Only metadata (name, description) from all skills is pre-loaded
- **When relevant:** Claude reads SKILL.md
- **As needed:** Claude reads additional files

But once SKILL.md is loaded, every token competes with conversation history.

## The Default Assumption

**Claude is already very smart.**

Only add context Claude doesn't already have. Challenge each piece of information:
- "Does Claude really need this explanation?"
- "Can I assume Claude knows this?"
- "Does this paragraph justify its token cost?"

## Good vs. Bad Examples

### Good: Concise (~50 tokens)

```markdown
## Extract PDF text

Use pdfplumber for text extraction:

```python
import pdfplumber

with pdfplumber.open("file.pdf") as pdf:
    text = pdf.pages[0].extract_text()
```
```

### Bad: Too Verbose (~150 tokens)

```markdown
## Extract PDF text

PDF (Portable Document Format) files are a common file format that contains
text, images, and other content. To extract text from a PDF, you'll need to
use a library. There are many libraries available for PDF processing, but we
recommend pdfplumber because it's easy to use and handles most cases well.
First, you'll need to install it using pip. Then you can use the code below...
```

The concise version assumes Claude knows what PDFs are and how libraries work.

## Practical Tips

1. **Skip obvious explanations** — Don't explain what PDFs are
2. **Trust Claude's knowledge** — Assume familiarity with common tools
3. **Lead with code** — Show, don't tell
4. **Cut filler phrases** — "In order to", "It's important to note that"
5. **Use tables** — More scannable than paragraphs
