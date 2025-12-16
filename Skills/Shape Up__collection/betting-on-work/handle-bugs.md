# Handling Bugs

## Bugs Aren't Automatically Special

The first thing to understand about bugs is that they aren't automatically more important than everything else. The default response is: bugs can wait.

**Why?** Because:
- Most bugs don't affect most users most of the time
- Interrupting a cycle to fix bugs fragments focus
- There are always more bugs than time

## The Severity Spectrum

| Severity | Examples | What to Do |
|----------|----------|------------|
| **Crisis** | Data loss, security breach, service down | Drop everything, fix immediately |
| **Serious** | Core feature broken for many users | Triage—might warrant cycle interruption |
| **Annoying** | Edge case bug, ugly but functional | Fix during cool-down |
| **Minor** | Cosmetic issues, rare edge cases | Maybe never fix |

True crises are rare. Most bugs that feel urgent in the moment are actually annoying or minor.

## Three Strategies for Bugs

### 1. Cool-Down

Most bugs can wait for the two-week cool-down period between cycles.

**Works for:**
- Bugs that don't affect core functionality
- Issues with workarounds
- Edge cases affecting few users

**During cool-down:** Teams have flexibility to fix bugs that have been bothering them without derailing project work.

### 2. Shape It, Pitch It, Bet On It

If a bug is really a big problem—affecting many users or core functionality—treat it like any other work.

**Example:** A programmer wants to change a slow synchronous process to async. That's not a quick fix—it's a project. They should:
1. Shape the solution
2. Write a pitch explaining the problem and approach
3. Bring it to the betting table
4. Compete for cycle time like any other work

**This works for:**
- Bugs that require significant refactoring
- Performance issues needing architectural changes
- Problems entangled with other systems

### 3. Bug Smash

Dedicate a whole cycle to fixing bugs.

**When to use:**
- When bug debt has accumulated too much
- During holiday periods when shipping new features is risky
- When teams need a break from shaped project work

**How it works:**
- One or two cycles per year
- Teams focus entirely on bugs and cleanup
- No shaped project work during this time

## The Key Principle

Bugs don't get a fast lane around the system. They go through the same process as other work:
- Small bugs → cool-down
- Big bugs → shape and bet
- Crisis bugs → the only exception

## Why This Works

| Without This Approach | With This Approach |
|-----------------------|-------------------|
| Constant interruptions | Protected focus time |
| "Everything is urgent" | Clear prioritization |
| Bug fixing fragments cycles | Bugs handled systematically |
| No time for features | Balanced work |

## Example Conversation

**Developer:** "There's a bug where sorting fails for customers with special characters in their names."

**Questions to ask:**
- How many customers does this affect? (Very few)
- Is there a workaround? (Use the search instead of sort)
- Does it lose data? (No, just inconvenient)

**Decision:** Fix it in cool-down. It's annoying, not urgent.

---

**Developer:** "The payment system is timing out for 20% of transactions."

**Questions to ask:**
- Is this affecting revenue? (Yes, significantly)
- Is there a quick fix? (No, needs investigation)
- Can it wait for cool-down? (No, too severe)

**Decision:** This is a crisis. Interrupt current work.

## Tracking Bugs

Keep bug lists decentralized:
- Support tracks what they see most often
- Programmers track bugs they want to fix
- Product occasionally reviews for patterns

No central bug backlog that grows forever. If a bug matters, someone will champion it.
