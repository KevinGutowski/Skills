# Shaping Work

## The Right Level of Abstraction

Shaped work lives between two extremes. Too concrete (wireframes) and you're telling the team "I know you're looking at this, but that's not what I want you to design." Too abstract ("build a calendar") and the team becomes mind readers with no way to make trade-offs.

**The sweet spot:** Rough enough for creativity, solved enough for confidence, bounded enough to ship.

Details: [principles-of-shaping.md](shaping/principles-of-shaping.md)

## Is Work Shaped Enough?

Check three properties:

| Property | Good Signs | Red Flags |
|----------|------------|-----------|
| **Rough** | Room for team judgment, no pixel-perfect specs | Wireframes showing every button |
| **Solved** | Clear direction, main elements connect | "Team will figure it out" |
| **Bounded** | Clear appetite, explicit no-gos | "Let's see how far we get" |

**Decision:** All 3 ✓ → Ready. Any weak → More shaping needed.

Details: [evaluate-shaped-work.md](shaping/evaluate-shaped-work.md)

## Setting Appetite

| Situation | Appetite |
|-----------|----------|
| Critical to core value | Big batch (6 weeks) |
| Nice improvement, customers asking | Small batch (1-2 weeks) |
| Interesting but not pressing | "Maybe someday" |
| Vague or unclear | Narrow the problem first |

Details: [set-appetite.md](shaping/set-appetite.md)

## Fixed Time, Variable Scope

This is the core mindset shift. Don't ask "How long will it take?" Ask "How much time is this worth?"

**Example:** Customers wanted a calendar in Basecamp. A full calendar takes 6 months—but only 10% of customers used the old one. The question became: "What calendar can we build in 6 weeks?" The answer: a read-only two-month grid with dots. No dragging, no multi-day spans—just dots that scroll to events.

The appetite constrains the solution, not the other way around.

Details: [fixed-time-variable-scope.md](shaping/fixed-time-variable-scope.md)

## Spotting Grab-Bags

Red flags: "Redesign the...", "Notifications 2.0", "Refactor...", "Clean up..."

**Test:** Does it have a specific problem, clear start, defined end, and fixed appetite? If not → grab-bag. Break it down or walk away.

**Example:** We kicked off "Files 2.0" without considering what it meant. The project was a mess because we didn't know what "done" looked like. We recovered by splitting into smaller projects: "Better file previews" and "Custom folder colors."

Details: [spot-grab-bags.md](shaping/spot-grab-bags.md)

## Sketching: Breadboard vs Fat Marker

**Breadboard** — When the tricky part is *what happens* (flows, states, logic)
- Places, Affordances, Connection lines
- Example: Autopay feature → "Invoice" → "Turn on Autopay" → "Setup Autopay"

**Fat marker** — When the tricky part is *where things go* (layout, arrangement)
- Example: Dot Grid Calendar → Two month grid, dots on days with events, list below

Use the coarsest tool that captures the idea. If you can solve it with words and arrows, don't draw boxes.

Details: [breadboard-vs-fat-marker.md](shaping/breadboard-vs-fat-marker.md)

## Identifying Rabbit Holes

Ask: "Could this take 2 days or 2 weeks?" If uncertain → rabbit hole.

**Handle by:** Cut it, simplify it, or specify the exact approach.

**Example:** We shaped To-Do Groups but hadn't addressed how to display completed items. That was a hole. We patched it by deciding to leave completed items exactly as before—just append the group name. A little messy, but it cut off a big tail of risk.

Details: [identify-rabbit-holes.md](shaping/identify-rabbit-holes.md)

## Writing the Pitch

Five ingredients, in order:

1. **Problem** — A specific situation that's painful (not "users want X")
2. **Appetite** — Small batch or big batch
3. **Solution** — Breadboard or fat marker sketches showing the idea
4. **Rabbit holes** — What we're NOT doing and why
5. **No-gos** — Explicit boundaries

The pitch is the handoff document. If a concept isn't in the pitch, it's not in scope.

Details: [write-pitch.md](shaping/write-pitch.md)
