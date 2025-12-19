# QA Approach

## QA Is a Level-Up, Not a Gate

We think of QA as a level-up, not a gate or checkpoint that all work must go through. We're much better off with QA than without it. But we don't depend on QA to ship quality features that work as they should.

## Why Teams Own Basic Quality

The designers and programmers take responsibility for the basic quality of their work:
- Programmers write their own tests
- The team works together to ensure the project does what it should according to what was shaped

This follows from giving the team responsibility for the whole project instead of assigning them individual tasks. When you own the project, you own the quality.

## What QA Does

QA comes in toward the end of the cycle and hunts for edge cases outside the core functionality.

**QA can focus on edges because:**
- The team has already verified the core works
- The shaped work defined what "working" means
- The team has been testing as they build

## QA Generates Nice-to-Haves

QA generates discovered tasks that are all **nice-to-haves by default**.

The designer-programmer team triages them and, depending on severity and available time, elevates some to must-haves.

| QA Finds | Team Response |
|----------|---------------|
| Critical bug affecting core use case | Elevate to must-have, fix immediately |
| Edge case affecting few users | Keep as nice-to-have, fix if time |
| Minor polish issue | Keep as nice-to-have, probably skip |
| Improvement suggestion | Consider for future cycle |

## Tracking QA Issues

The most rigorous way:

1. Collect incoming QA issues on a separate to-do list
2. If the team decides an issue is a must-have, drag it to the list for the relevant scope
3. The scope isn't "done" until the must-have issue is addressed
4. Nice-to-haves can remain on the QA list or be cut

**Example:**
```
QA Issues (to triage)
- [ ] Error on empty form submit
- [ ] Slow load on large datasets
- [~] Alignment off on mobile

Store Scope
- ✓ Save draft
- ✓ Load draft
- [ ] Error on empty form submit  ← elevated from QA
```

## When QA Makes Sense

QA becomes more important as your user base grows. Small edge cases that affected nobody start to impact hundreds or thousands of users in absolute numbers.

**The trade-off:**
- Without QA: Ship faster, some edge cases slip through
- With QA: Extra cycle time, catch more edge cases

For early-stage products with few users, QA might be overkill. For mature products with millions of users, the extra QA step helps reduce support burden.

## Code Review Is Similar

We treat code review the same way:
- The team can ship without waiting for a code review
- There's no formal checkpoint
- But code review makes things better

If there's time and it makes sense, someone senior may look at the code and give feedback. It's more about taking advantage of a teaching opportunity than creating a step that must happen every time.

## The Key Principle

Quality is the team's responsibility, not QA's responsibility. QA helps *improve* quality. They don't *create* quality.

If a team ships broken work, the problem isn't "we need more QA." The problem is the team didn't own their quality.
