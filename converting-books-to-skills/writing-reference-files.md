# Writing Reference Files: The Deep Dives

## Purpose

Reference files hold the full narrative that doesn't fit in SKILL.md. Claude loads these on demand when the user needs more depth.

Think of them as **the chapter content**, restructured for quick reference.

## When Claude Loads Reference Files

Claude reads a reference file when:
- User asks for more detail on a concept
- User clicks a link in the skill preview
- The quick reference in SKILL.md isn't enough

This is **progressive disclosure** — load only what's needed.

## The Reference File Template

```markdown
# [Concept Name]

## Why This Matters

[Narrative context from the book — the "why" behind the technique]

## How It Works

[Explanation with decision frameworks]

## Case Study: [Name]

[Concrete example from the book, told as a story]

## Common Mistakes

[Anti-patterns to avoid]

## Key Takeaways

[Bullet points summarizing the main insights]
```

## What to Include

### Narrative Context

Books explain *why* techniques exist. Preserve this.

```markdown
## Why This Matters

Backlogs are a big weight we don't need to carry. Dozens and eventually 
hundreds of tasks pile up that we all know we'll never have time for. 
The growing pile gives us a feeling like we're always behind even though 
we're not.
```

### Multiple Concrete Examples

SKILL.md has one example. Reference files can have many.

```markdown
## Case Study: The Calendar Request

A customer called asking for a calendar. Instead of asking what it 
should look like, we asked *when* she wanted a calendar. What was 
she doing when the thought occurred?

She was working from home. A client called to schedule a meeting. 
She had to drive to the office to look at the wall calendar. Traffic 
was terrible, and there wasn't a free space anyway.

The insight: "See free spaces" was the important thing, not "do 
everything a calendar does."

## Case Study: The Permissions Request

A customer asked for complex permission rules. It could have taken 
six weeks. Instead, we dug deeper.

Someone had archived a file without knowing it would disappear for 
everyone. Instead of permission rules, we added a warning on the 
archive action.

Result: A one-day change instead of a six-week project.
```

### Anti-Patterns

Show what goes wrong when the technique isn't followed.

```markdown
## Common Mistakes

### The "Files 2.0" Trap

We kicked off "Files 2.0" without considering what it meant. Our 
excitement got the better of us. The project was a mess because 
we didn't know what "done" looked like.

We recovered by splitting into specific projects: "Better file 
previews" and "Custom folder colors."

### The Gold-Plated Solution

Without an appetite, every improvement seems worthwhile. A two-week 
fix becomes a two-month project because "while we're in there, we 
should also..."
```

### The Subjective Experience

Books often describe how things *feel*. This is valuable context.

```markdown
## How It Feels

**Uphill work** feels uncertain. You're not sure if your approach 
will work. You might be going in circles. There's no clear path.

**Top of the hill** is a moment of clarity. "Now I know what to do." 
You can see all the steps that remain.

**Downhill work** feels like execution. You're cranking through 
known tasks. The uncertainty is gone.
```

## What to Avoid

### Nested References

❌ **Bad:**
```markdown
For more on this, see [advanced.md](advanced.md).
```
(And advanced.md says "For details, see [details.md](details.md)")

✅ **Good:**
All reference files link directly from SKILL.md. No chains.

### Duplicating SKILL.md

❌ **Bad:**
Reference file repeats the same decision table from SKILL.md.

✅ **Good:**
Reference file expands on the table with narrative and examples.

### Abstract Explanations Without Examples

❌ **Bad:**
```markdown
The appetite constrains the solution by limiting the scope of 
possible implementations to those achievable within the time box.
```

✅ **Good:**
```markdown
The appetite constrains the solution. If we only have 6 weeks, we 
can't build a full calendar—but we can build a grid with dots that 
shows free slots.
```

## File Naming

Use lowercase with hyphens. Match the concept name.

| Concept | File Name |
|---------|-----------|
| Fixed Time, Variable Scope | `fixed-time-variable-scope.md` |
| Identifying Rabbit Holes | `identify-rabbit-holes.md` |
| The Betting Table | `betting-table-decision.md` |

## Length Guidelines

| Type | Typical Length |
|------|----------------|
| Simple concept | 50-100 lines |
| Complex technique | 100-200 lines |
| Major philosophy | 150-250 lines |

If a reference file exceeds 300 lines, consider splitting it.
