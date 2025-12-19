# Scope Hammering

## The Problem: Scope Grows Like Grass

Scope creep isn't the fault of bad clients, bad managers, or bad programmers. Projects are opaque at the macro scale. You can't see all the little micro-details until you get down into the work. Then you discover:
- Complexities you didn't anticipate
- Things that could be fixed or made better

Every project is full of scope we don't need. Every part of a product doesn't need to be equally prominent, equally fast, and equally polished. Every use case isn't equally common or equally critical.

**This is how it is.** Rather than trying to stop scope from growing, give teams the tools, authority, and responsibility to constantly cut it down.

## Cutting Scope Isn't Lowering Quality

Picking and choosing which things to execute—and how far—doesn't leave holes in the product. Making choices makes the product *better at some things* instead of others.

Being picky about scope *differentiates* the product. It moves us in competitive space, making us more alike or more different than products that made different choices.

Variable scope is not about sacrificing quality. We are extremely picky about:
- Quality of our code
- Visual design
- Copy in our interfaces
- Performance of our interactions

**The trick:** Asking which things actually matter, which things move the needle, and which things make a difference for the core use cases we're trying to solve.

## The Hammering Metaphor

People often talk about "cutting" scope. We use a stronger word—**hammering**—to reflect the power and force it takes to repeatedly bang the scope so it fits in the time box.

## Questions to Ask

As we come up with things to fix, add, improve, or redesign, we ask ourselves:

| Question | What It Reveals |
|----------|-----------------|
| Is this a "must-have" for the new feature? | Core vs. peripheral |
| Could we ship without this? | True necessity |
| What happens if we don't do this? | Actual impact |
| Is this a new problem or pre-existing? | Should it block shipping? |
| How likely is this case to occur? | Frequency |
| When it occurs, which customers see it? | Core vs. edge case |
| What's the actual impact if it does happen? | Severity |
| How aligned is this use case with our audience? | Strategic fit |

The fixed deadline motivates us to ask these questions. Variable scope enables us to act on them.

## Must-Haves vs. Nice-to-Haves

Throughout the cycle, teams talk about **must-haves** and **nice-to-haves** as they discover work.

| Type | How to Handle |
|------|---------------|
| **Must-have** | Captured as a task; scope isn't "done" until finished |
| **Nice-to-have** | Marked with ~ in front; do if time, cut if not |

**Example:**
```
✓ Store draft content
✓ Load draft on edit
✓ Auto-save indicator
~ Keyboard shortcut for save
~ Undo support
```

The act of marking something with ~ is the scope hammering. Usually the ~ items never get built. That's fine—they were nice-to-have, not must-have.

## Compare to Baseline

When asking "Is it good enough?", don't compare up to the ideal. Compare down to **baseline**—the current reality for customers.

| Compare To | Feeling | Result |
|------------|---------|--------|
| Ideal | "Never good enough" | Paralysis, delays |
| Baseline | "Better than what they have now" | Momentum, shipping |

**Questions to ask:**
- How do customers solve this problem today, without this feature?
- What's the frustrating workaround this eliminates?
- How much longer should they wait while we debate design A vs. design B?

Seeing that our work is better than current alternatives makes us feel better about progress and motivates us to make calls on things slowing us down.

## In Practice

Week 3-4 is typically when hammering intensifies:

1. **Review what's left** — Look at all outstanding work across scopes
2. **Categorize ruthlessly** — Must-have / Nice-to-have / Don't need
3. **Cut aggressively** — Mark everything non-essential with ~
4. **Focus the team** — Only must-haves block shipping

The deadline isn't a constraint to fight against. It's a tool that forces the team to make smart trade-offs and ship something great instead of nothing perfect.
