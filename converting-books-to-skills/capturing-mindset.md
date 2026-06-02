# Capturing Mindset, Not Just Process

## The Difference

Books teach **ideology**, not just procedures. The mindset is what makes the techniques work.

| Process | Mindset |
|---------|---------|
| "Set an appetite before shaping" | "Time is fixed, scope is variable" |
| "Don't maintain a backlog" | "Important ideas come back on their own" |
| "Ship at the end of the cycle" | "Compare to baseline, not to ideal" |

Process tells you *what to do*. Mindset tells you *why it works*.

## Identifying Core Mindsets

Look for statements in the book that:
- Challenge conventional thinking
- Explain the philosophy behind techniques
- Could stand alone as principles
- Get repeated in different contexts

### Example: Shape Up Mindsets

| Mindset | What It Challenges |
|---------|-------------------|
| Fixed time, variable scope | "Estimate first, then plan" |
| No backlogs | "Track everything, prioritize later" |
| Assign projects, not tasks | "Break work into tickets" |
| Compare to baseline | "Strive for perfection" |
| Circuit breaker | "Extend if not done" |

## Creating Mindset Reference Files

Each core mindset deserves its own reference file. These are some of the most valuable content in a skill.

### Structure for Mindset Files

```markdown
# [Mindset Name]

## The Conventional Approach

[What most people/teams do]

## The Problem with That

[Why the conventional approach fails]

## The Alternative Mindset

[The book's philosophy]

## How It Changes Behavior

[Concrete differences in action]

## Example

[A story that illustrates the mindset]
```

### Example: No Backlogs Mindset

```markdown
# The No Backlogs Philosophy

## The Conventional Approach

Most teams maintain a backlog—a master list of ideas, requests, and 
bugs. They spend time grooming it, prioritizing it, organizing it.

## The Problem with That

Backlogs are a big weight we don't need to carry. Dozens and 
eventually hundreds of tasks pile up that we all know we'll never 
have time for.

The growing pile gives us a feeling like we're always behind even 
though we're not. Just because somebody thought some idea was 
important a quarter ago doesn't mean we need to keep looking at it.

## The Alternative Mindset

Before each cycle, a few well-shaped pitches compete at the betting 
table. If something doesn't get picked, let it go.

Important ideas come back on their own. That's how you know they're 
important.

## How It Changes Behavior

| With Backlogs | Without Backlogs |
|---------------|------------------|
| Grooming meetings | Fresh pitches each cycle |
| "We'll get to it eventually" | "Pitch it or let it go" |
| Guilt about old items | Focus on what matters now |
| Ideas feel obligatory | Ideas compete on merit |

## Example

A feature request comes in. Instead of adding it to a backlog, the 
product person might track it privately. If customers keep asking, 
it gets shaped and pitched. If not, it fades—and that's fine.
```

## Weaving Mindset into SKILL.md

SKILL.md should reference mindsets, not just techniques.

### Example Section

```markdown
## Fixed Time, Variable Scope

This is the core mindset shift. Don't ask "How long will it take?" 
Ask "How much time is this worth?"

**Example:** Customers wanted a calendar. Full calendar = 6 months. 
Question: "What can we build in 6 weeks?" Answer: dots on a grid.

The appetite constrains the solution, not the other way around.

Details: [fixed-time-variable-scope.md](fixed-time-variable-scope.md)
```

The section:
1. Names the mindset ("core mindset shift")
2. States the reframe (how long → how much is it worth)
3. Gives a concrete example
4. Reinforces the principle
5. Links to deeper content

## Common Mistakes

### Capturing Process Without Philosophy

❌ **Process only:**
```markdown
## Setting Appetite

Choose small batch (1-2 weeks) or big batch (6 weeks).
```

✅ **Process + Philosophy:**
```markdown
## Setting Appetite

The appetite is how much time this problem is *worth*, not how long 
it will *take*. This flips the traditional estimate → plan approach.

Choose small batch (1-2 weeks) or big batch (6 weeks).
```

### Burying the Mindset

❌ **Mindset buried:**
```markdown
## Setting Appetite

There are two sizes: small batch and big batch. Small batch is 1-2 
weeks. Big batch is 6 weeks. You should pick based on the problem 
importance. Remember that time is fixed and scope is variable.
```

✅ **Mindset upfront:**
```markdown
## Setting Appetite

Time is fixed, scope is variable. The appetite is how much time 
the problem is *worth*—this constrains the solution.

| Size | Time | Use When |
|------|------|----------|
| Small batch | 1-2 weeks | Quick wins, focused fixes |
| Big batch | 6 weeks | Major features |
```
