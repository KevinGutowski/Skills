# Evaluating Shaped Work

## The Three Properties

Before committing to a project at the betting table, verify the shaped work has these three properties. Miss one, and the project is at risk.

### Property 1: It's Rough

Work in the shaping stage is rough. Everyone can tell by looking at it that it's unfinished. They can see the open spaces where their contributions will go.

**Why roughness matters:**
Work that's too fine, too early commits everyone to the wrong details. Designers and programmers need room to apply their own judgment and expertise when they roll up their sleeves and discover all the real trade-offs that emerge.

| Good Signs | Red Flags |
|------------|-----------|
| Leaves room for designer/programmer judgment | Wireframes show every button and field |
| No pixel-perfect mockups | Specifies exact technical approach |
| Open questions about implementation details | No room for the team to apply expertise |
| Team can see where their contributions go | "Just build exactly this" |

### Property 2: It's Solved

Despite being rough and unfinished, shaped work has been thought through. All the main elements of the solution are there at the macro level and they connect together.

**Why solved-ness matters:**
The work isn't specified down to individual tasks, but the overall solution is spelled out. While surprises might still happen, there is clear direction showing what to do. Any open questions or rabbit holes we could see up front have been removed to reduce the project's risk.

| Good Signs | Red Flags |
|------------|-----------|
| Clear direction on what to build | Core questions still unanswered |
| Main elements connect together | "Figure it out as we go" attitude |
| Known rabbit holes have been addressed | Major technical unknowns remain |
| Macro-level solution is spelled out | No clear path from A to B |

### Property 3: It's Bounded

Shaped work indicates what *not* to do. It tells the team where to stop. There's a specific appetite—the amount of time the team is allowed to spend on the project.

**Why boundaries matter:**
Completing the project within that fixed amount of time requires limiting the scope and leaving specific things out. Without boundaries, scope naturally grows until the project can never ship.

| Good Signs | Red Flags |
|------------|-----------|
| Clear appetite (small batch or big batch) | "Let's see how far we get" |
| Explicitly states what's OUT of scope | No clear scope limits |
| Team knows where to stop | Everything seems equally important |
| Specific trade-offs have been made | Appetite not set or vague |

## Example: The Dot Grid Calendar

Customers wanted "a calendar" in Basecamp. A full calendar takes 6 months. Only 10% of customers used the old one.

**How it was shaped:**

- **Rough:** A sketch showing a grid with dots and a list below. No pixel-perfect mockups, no color specs, no exact layout.

- **Solved:** Clear interaction—click a dot, the event scrolls into view. Two-month read-only grid. Dots for events (not spanned pills).

- **Bounded:** 6 weeks. No dragging events. No multi-day spans. No color coding. No different time scale views.

This is the level of specificity that works: rough enough to leave room, solved enough to reduce risk, bounded enough to ship.

## The Decision Framework

| Situation | Action |
|-----------|--------|
| **All 3 properties check out** | Ready for betting table |
| **1 property is weak** | Go back and address it before presenting |
| **2+ properties are weak** | Not ready, needs more shaping work |

## Common Mistakes

| Mistake | Example | Why It Fails |
|---------|---------|--------------|
| Too rough | "Just build a calendar" | No solution—team is doing shaping work on your dime |
| Too solved | Complete specs with every detail | No room for team creativity; hides complexity |
| Unbounded | "Redesign the whole section" | No limits—project grows forever |

## The Goldilocks Zone

The sweet spot: Rough enough for creativity, solved enough for confidence, bounded enough to ship.

Taken together, the roughness leaves room for the team to resolve all the details, while the solution and boundaries act like guard rails. They reduce risk and channel the team's efforts, making sure they don't build too much, wander around, or get stuck.
