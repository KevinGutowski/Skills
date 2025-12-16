---
name: betting-on-work
description: Evaluate pitches and make betting decisions for 6-week cycles. Use during cool-down when deciding what to build next, and at cycle end when projects haven't shipped.
---

## No Backlogs

Backlogs are a weight that makes you feel perpetually behind. The time spent grooming old ideas prevents moving forward on what matters now.

**The alternative:** Before each cycle, a few well-shaped pitches compete at the betting table. If something doesn't get picked, let it go. Important ideas come back on their own—that's how you know they're important.

**Example:** A feature request comes in. Instead of adding it to a backlog, the product person might track it privately. If customers keep asking, it gets shaped and pitched. If not, it fades—and that's fine.

Details: [no-backlogs-philosophy.md](no-backlogs-philosophy.md)

## The Rhythm: Cycles + Cool-Down

```
6 weeks building → 2 weeks cool-down → 6 weeks building → ...
```

**During the cycle:** Teams work uninterrupted on shaped projects. No "just one quick thing."

**During cool-down:**
- Teams: Fix bugs, explore ideas, recover
- Stakeholders: Hold betting table, review pitches, shape future work

Two weeks every six weeks adds up to ~4 months per year of flexible time.

Details: [cool-down-period.md](cool-down-period.md)

## Evaluating Pitches

At the betting table, ask five questions:

| Question | Good Answer | Red Flag |
|----------|-------------|----------|
| Does the problem matter NOW? | Customers asking, blocking revenue | Vague, "nice to have" |
| Is the appetite right? | Worth 6 weeks, couldn't be smaller | Overpaying for the value |
| Is the solution solved? | Clear sketches, rabbit holes addressed | "Team will figure it out" |
| Is this the right time? | No blockers, fits the moment | Dependencies, bad timing |
| Are the right people free? | Designer + programmer available | Key people committed elsewhere |

**Decision:** All good → Bet. Any red flags → Fix first or don't bet.

Details: [betting-table-decision.md](betting-table-decision.md)

## Circuit Breaker (End of Cycle, Didn't Ship)

If a project doesn't ship in the cycle, the default is NOT to extend it. This sounds harsh but prevents runaway projects.

| Option | When to Use It |
|--------|----------------|
| **Ship with cuts** | Core done, only nice-to-haves remain |
| **Kill it** | Less than 70% done, problem was different than expected |
| **Extend** (RARE) | Core works, clear 1-2 week path, executive approval |

If you need an extension, something went wrong in shaping. Use the next cycle to reshape with lessons learned.

Details: [circuit-breaker-decision.md](circuit-breaker-decision.md)

## Handling Bugs

Bugs aren't automatically more important than everything else. Most can wait.

| Severity | What to Do |
|----------|------------|
| **Crisis** (data loss, app down) | Drop everything |
| **Big** (too large for cool-down) | Shape it, pitch it, bet on it |
| **Medium/Small** | Fix during cool-down |

**Example:** A programmer wants to change a slow synchronous process to async. That's not a quick fix—it's a project. They shape the solution, write a pitch, and bring it to the betting table like any other work.

Details: [handle-bugs.md](handle-bugs.md)

## Project Modes (New Products)

When building something new, you pass through three phases:

| Mode | What's Happening | How Betting Changes |
|------|------------------|---------------------|
| **R&D** | Architecture unsettled, learning what works | Senior team only, spike don't ship |
| **Production** | Core architecture works, expanding | Normal shaping and betting |
| **Cleanup** | Getting ready to launch | Unstructured time, fix what's needed |

Don't try to run normal Shape Up during R&D—you can't shape what you don't understand yet.

Details: [project-modes.md](project-modes.md)
