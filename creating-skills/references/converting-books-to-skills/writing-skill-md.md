# Writing SKILL.md: The Quick Reference

## Purpose

SKILL.md is the first thing Claude reads when the skill triggers. It should provide:
- Quick decision frameworks
- Scannable reference
- Links to deeper content

Think of it as a **cheat sheet**, not a textbook chapter.

## Constraints

| Constraint | Reason |
|------------|--------|
| Under 500 lines | Claude best practices; keeps context efficient |
| Follow chapter order | Temporal consistency with the book |
| One example per section | Grounds the concept without overloading |
| Links to references | Depth is one click away |

## The Section Template

Every major concept gets a section following this pattern:

```markdown
## [Concept Name]

[1-2 sentence narrative explaining why this matters]

[Decision framework as a table or list]

**Example:** [One concrete case from the book]

Details: [reference-file.md](reference-file.md)
```

### Example: Well-Written Section

```markdown
## Fixed Time, Variable Scope

This is the core mindset shift. Don't ask "How long will it take?" 
Ask "How much time is this worth?"

**Example:** Customers wanted a calendar in Basecamp. A full calendar 
takes 6 months. The question became: "What calendar can we build in 
6 weeks?" The answer: a read-only grid with dots.

The appetite constrains the solution, not the other way around.

Details: [fixed-time-variable-scope.md](fixed-time-variable-scope.md)
```

### What Makes This Work

| Element | What It Does |
|---------|--------------|
| Narrative opening | Explains why this matters |
| Concrete example | Grounds the concept in reality |
| Key insight | The takeaway (appetite constrains solution) |
| Link to details | Depth available when needed |

## Decision Framework Formats

Use tables when comparing options:

```markdown
| Situation | Appetite |
|-----------|----------|
| Critical to core value | Big batch (6 weeks) |
| Nice improvement | Small batch (1-2 weeks) |
| Interesting but not pressing | "Maybe someday" |
```

Use lists when showing steps or properties:

```markdown
Check three properties:
1. **Rough** — Room for team judgment
2. **Solved** — Clear direction, elements connect
3. **Bounded** — Clear appetite, explicit no-gos
```

Use conditional logic when the action depends on context:

```markdown
**Decision:** All 3 ✓ → Ready. Any weak → More shaping needed.
```

## Ordering Sections

**Follow the book's chapter order.** This creates:
- Temporal consistency (matches the workflow)
- Predictable navigation (users know where to look)
- Natural flow (builds on previous sections)

### Example: Shaping Skill Order

| Section | Book Chapter |
|---------|--------------|
| The Right Level of Abstraction | Ch 2: Principles |
| Is Work Shaped Enough? | Ch 2: Properties |
| Setting Appetite | Ch 3: Boundaries |
| Fixed Time, Variable Scope | Ch 3: Boundaries |
| Spotting Grab-Bags | Ch 3: Boundaries |
| Breadboard vs Fat Marker | Ch 4: Elements |
| Identifying Rabbit Holes | Ch 5: Risks |
| Writing the Pitch | Ch 6: Pitch |

## Common Mistakes

### Too Much Narrative

❌ **Bad:**
```markdown
## Setting Appetite

The appetite is a really important concept in Shape Up. It represents 
how much time we're willing to spend on something. There are different 
sizes of appetite...
[continues for 50 lines]
```

✅ **Good:**
```markdown
## Setting Appetite

| Situation | Appetite |
|-----------|----------|
| Critical to core value | Big batch (6 weeks) |
| Nice improvement | Small batch (1-2 weeks) |

Details: [set-appetite.md](set-appetite.md)
```

### No Examples

❌ **Bad:**
```markdown
## Fixed Time, Variable Scope

The appetite constrains the solution. Time is fixed, scope is variable.

Details: [fixed-time-variable-scope.md](fixed-time-variable-scope.md)
```

✅ **Good:**
```markdown
## Fixed Time, Variable Scope

**Example:** Customers wanted a calendar. Full calendar = 6 months. 
Question: "What can we build in 6 weeks?" Answer: dots on a grid.

Details: [fixed-time-variable-scope.md](fixed-time-variable-scope.md)
```

### Missing Links

❌ **Bad:**
```markdown
## Breadboarding

Use places, affordances, and connection lines to sketch flows.
```

✅ **Good:**
```markdown
## Breadboarding

Use places, affordances, and connection lines to sketch flows.

Details: [breadboard-vs-fat-marker.md](breadboard-vs-fat-marker.md)
```
