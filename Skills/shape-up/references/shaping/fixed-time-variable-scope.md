# Fixed Time, Variable Scope

## The Core Mindset Shift

An appetite is completely different from an estimate.

| Estimate | Appetite |
|----------|----------|
| Starts with a design | Starts with a number |
| Ends with a number | Ends with a design |
| "How long will this take?" | "How much time is this worth?" |
| Time adapts to scope | Scope adapts to time |

## Why This Matters

Take this book as an example. It's hard to ship a book when you can always add more, explain more, or improve what's already there.

When you have a deadline, all of a sudden you have to make decisions.

**With one week left:** You can choose between fixing typos or adding a new section. That's the tension between time, quality, and scope.

- Don't want to release with embarrassing typos → reduce scope by leaving out the extra section
- Without the fixed deadline → wouldn't make the trade-off
- If scope wasn't variable → would *have* to include the extra section and no time to fix quality issues

## How It Works in Practice

We apply this principle at each stage:

### During Shaping
The appetite constrains what kind of solution we design. A six-week appetite leads to a different solution than a two-week appetite or a six-month appetite.

### During Building
The fixed time box pushes the team to make decisions about what is core and what is peripheral or unnecessary.

## "Good" Is Relative

There's no absolute definition of "the best" solution. The best is relative to your constraints.

**Without a time limit:** There's always a better version. The ultimate meal might be a ten-course dinner.

**When you're hungry and in a hurry:** A hot dog is perfect.

## Example: The Calendar

We could model a whole set of database columns in the fancy version, or just provide a flat textarea in the simple version.

We could redesign the main landing page to accommodate a new feature, or we could push it back to a screen with fewer design constraints.

We can only judge what's a "good" solution in the context of:
- How much time we want to spend
- How important it is

## Example: The Dot Grid

Customers wanted a calendar. A full-featured calendar takes 6 months. Our appetite was 6 weeks.

**The question shifted from:**
"How can we build a calendar?" (unbounded)

**To:**
"What calendar can we build in 6 weeks?" (bounded)

**The answer:** A read-only two-month grid with dots. Click a dot, scroll to the event. No dragging, no multi-day spans, no color coding.

Is it a worse calendar than a full Outlook-style calendar? In absolute terms, maybe. But:
- It solves the core problem (seeing free spaces)
- It ships in 6 weeks instead of 6 months
- Customers get value now instead of waiting
- We can always improve it later

## The Trade-Off Triangle

```
        Quality
           △
          / \
         /   \
        /     \
       /───────\
    Time       Scope
```

You can't have all three without trade-offs:
- **Fixed time + fixed scope** → quality suffers
- **Fixed quality + fixed scope** → time slips
- **Fixed time + fixed quality** → scope must flex

We choose to fix time and quality. Scope becomes the variable.

## In Practice

| What We Fix | Why |
|-------------|-----|
| Time | The appetite is the constraint |
| Quality | We don't ship broken or embarrassing work |

| What Varies | How |
|-------------|-----|
| Scope | We cut, simplify, and hammer to fit the time box |

## The Mindset

This isn't about doing less. It's about doing the *right* amount for the time available.

A two-week appetite forces creative constraint. You find simpler solutions. You cut what's unnecessary. You focus on what matters.

A six-month "estimate" invites scope creep. Every idea seems reasonable. Every enhancement seems worthwhile. The project balloons.

**Fixed time creates focus. Variable scope creates shipping.**
