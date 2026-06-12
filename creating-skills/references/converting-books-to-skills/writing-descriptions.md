# Writing Effective Skill Descriptions

## Why Descriptions Matter

The description is the most critical piece of metadata. It's what Claude uses to decide **when to load the skill**.

A vague description means the skill won't trigger when it should. An overly specific description means it won't trigger often enough.

## The Description Formula

```
[Action verb] [domain] by [key techniques]. Use when [trigger context].
```

### Breaking It Down

| Component | Purpose | Example |
|-----------|---------|---------|
| Action verb | What the skill helps you do | "Shape", "Evaluate", "Build" |
| Domain | What area of work | "product work", "pitches", "projects" |
| Key techniques | How it does it | "setting boundaries, writing pitches" |
| Trigger context | When to use it | "during the shaping phase" |

## Good vs. Bad Descriptions

### Example 1: Shaping Work

❌ **Bad:**
```yaml
description: Helps with product work.
```
- Too vague
- Doesn't specify when
- Won't trigger reliably

✅ **Good:**
```yaml
description: Shape product work by setting boundaries, finding elements, identifying risks, and writing pitches. Use during the shaping phase before betting on projects.
```
- Says what it does (shape work)
- Lists key techniques (boundaries, elements, risks, pitches)
- Says when to use it (shaping phase, before betting)

### Example 2: Converting Books

❌ **Bad:**
```yaml
description: Creates skills from content.
```

✅ **Good:**
```yaml
description: Convert books, guides, or documentation into Claude skills using progressive disclosure patterns. Use when the user wants to encode a book's knowledge into skills.
```

## Trigger Words

Include words that users are likely to say when they need the skill.

| Skill | Trigger Words to Include |
|-------|-------------------------|
| Shaping work | "shape", "pitch", "appetite", "scope", "boundaries" |
| Betting on work | "bet", "cycle", "prioritize", "decide what to build" |
| Building work | "build", "ship", "progress", "scope", "done" |
| Converting books | "skill", "book", "convert", "encode", "create skill" |

## Description Length

The description field has a **1024 character limit** but that doesn't mean you should use all of it.

| Length | Use When |
|--------|----------|
| Short (50-100 chars) | Very specific, narrow skill |
| Medium (100-200 chars) | Most skills |
| Long (200-300 chars) | Broad skill with multiple triggers |

## Common Mistakes

### Being Too Vague

❌ "Helps with planning"
✅ "Plan sprints by estimating stories, balancing capacity, and identifying dependencies. Use when starting a new sprint."

### Forgetting the "When"

❌ "Writes effective commit messages"
✅ "Writes effective commit messages following conventional commit format. Use when committing code or reviewing commit history."

### Using First Person

❌ "I can help you shape work..."
✅ "Shapes product work by..."

Descriptions are injected into the system prompt. First person creates inconsistent voice.

### Being Too Narrow

❌ "Helps with the Dot Grid Calendar case study from Shape Up"
✅ "Shape product work by setting boundaries and finding elements."

The narrow version only triggers on one specific topic.

## Testing Your Description

After writing a description, test it:

1. **Say the trigger words** — Does the skill activate?
2. **Describe the work** — "I'm trying to decide what to build next" → Does betting skill trigger?
3. **Use synonyms** — "prioritize features" should still trigger betting skill
4. **Check false positives** — Does it trigger when it shouldn't?
