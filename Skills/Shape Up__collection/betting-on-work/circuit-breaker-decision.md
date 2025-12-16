# The Circuit Breaker

## What It Is

By default, the project doesn't get an extension if it runs past its deadline. We call this the **circuit breaker**.

It sounds harsh. But without it:
- Projects run on indefinitely
- "Just one more week" becomes a habit
- Appetite and budget lose meaning
- Teams never learn to make trade-offs

The circuit breaker forces the question: Is this project going to work or not?

## Why It Matters

The six-week bet has real stakes. The team is betting their time and focus. Management is betting resources. If the work doesn't get done, the project doesn't happen.

This creates healthy pressure:
- Forces trade-offs during the cycle
- Prevents scope creep
- Makes teams question new work before accepting it
- Reveals when shaping wasn't adequate

## When a Project Doesn't Ship

At the end of the cycle, if work remains, you have three options:

| Option | When to Use It |
|--------|----------------|
| **Ship with cuts** | Core is done, only nice-to-haves remain, 90%+ complete |
| **Kill it** | Less than 70% done, core isn't working, problem was different than expected |
| **Extend** (RARE) | Core works, clear 1-2 week path, executive approval |

**Default:** Don't extend. Ship with cuts or kill.

## Ship with Cuts

If the core functionality works and only polish/edge cases remain:
- Mark remaining items as nice-to-haves (~)
- Ship what's done
- Consider the nice-to-haves for a future cycle

**Example:** A notification feature is done except for some formatting edge cases on older browsers. Ship it—those edge cases affect a tiny fraction of users.

## Kill It

If the project hit fundamental problems:
- The problem was different than we thought
- The solution approach didn't work
- We discovered architectural issues
- Less than 70% of the work is done

**Don't throw good time after bad.** Put it back into shaping. Learn from what went wrong. Maybe pitch a different approach in a future cycle.

**Example:** A redesign project stalled because the team couldn't find a design solution. Rather than keep trying, kill it and go back to shaping with what we learned.

## Extend (Very Rare)

Extension requires:
1. **All must-haves survived scope hammering** — You've cut everything possible
2. **All remaining work is downhill** — No unsolved problems, no open questions
3. **Clear short path** — 1-2 weeks, not "as long as it takes"
4. **Executive approval** — Someone senior signs off

If work is uphill (unknowns remain), **don't extend**. Unknowns are too risky to bet on. Go back to shaping.

## The Cool-Down Buffer

The two-week cool-down usually provides enough slack for a team with a few too many must-haves to ship before the next cycle starts.

But running into cool-down shouldn't become a habit. If it happens often, it points to:
- Problems in the shaping process
- Performance issues with the team
- Chronic under-scoping

## What Extensions Signal

| Situation | What It Means |
|-----------|---------------|
| Occasional extension request | Normal—sometimes things run long |
| Frequent extension requests | Shaping isn't de-risking enough |
| "We just need more time" | Probably a scoping problem, not a time problem |
| Unknowns at the end | Shaping missed something important |

## The Discipline

It feels uncomfortable to kill a project or ship something imperfect. But the circuit breaker creates discipline:

- Teams learn to be realistic about scope
- Shapers learn to de-risk more thoroughly
- Everyone learns to make trade-offs instead of cramming
- The organization ships more, not less

Projects that get killed aren't failures—they're learning opportunities. Bring the lessons back to shaping and try again with a better approach.
