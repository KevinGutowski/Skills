# Writing Effective Skill Descriptions (book-specific examples)

The rules for descriptions — shape, the ~350–450 character band and 450 hard cap, third person, boundary clauses, routing probes — live in the one guide, [../description-writing.md](../description-writing.md). This file keeps only the examples drawn from converting a book (Shape Up); the upstream two-part formula it uses is the core of the house shape, to which a house description adds a boundary clause and triggers.

## Contents

- Why Descriptions Matter
- The Description Formula
- Good vs. Bad Descriptions
- Trigger Words
- Length, Mistakes, and Testing

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

## Length, Mistakes, and Testing

See [../description-writing.md](../description-writing.md): Length (house band and caps), Common Mistakes (including the "too narrow" Dot Grid Calendar example moved from this file), and Testing: Routing Probes.
