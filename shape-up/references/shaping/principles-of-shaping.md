# Principles of Shaping

## The Right Level of Abstraction

When we shape the work, we need to do it at the right level of abstraction: not too vague and not too concrete. Product managers often err on one of these two extremes.

## Wireframes Are Too Concrete

When design leaders go straight to wireframes or high-fidelity mockups, they define too much detail too early.

A designer who worked in that situation said:

> I'll give a wireframe to my designer, and then I'm saying to her: "I know you're looking at this, but that's not what I want you to design. I want you to re-think it!" It's hard to do that when you're giving them this concrete thing.

**Problems with too much detail:**

| Issue | Consequence |
|-------|-------------|
| Commits to wrong details | Designers can't apply their judgment |
| Makes estimation harder | Hidden complexities aren't visible in mockups |
| Removes room for creativity | Team just executes instead of thinks |
| Scope isn't variable | Can't reconsider decisions that cost too much |

## Words Are Too Abstract

On the other end, projects that are too vague don't work either. When a project is defined in a few words, nobody knows what it means.

"Build a calendar view" or "add group notifications" sound sensible, but what exactly do they entail?

A programmer who worked in that situation said:

> You're solving a problem with no context. You have to be a mind reader. It's like: "we'll know it when we see it."

**Problems with too little detail:**

| Issue | Consequence |
|-------|-------------|
| No information for trade-offs | Team doesn't know what to include or leave out |
| No boundaries | Under-specified projects grow out of control |
| No context | Team is guessing at requirements |
| Mind-reading required | "We'll know it when we see it" |

## The Sweet Spot

Shaped work lives between these extremes. It has three properties:

### Property 1: It's Rough

Work in the shaping stage is rough. Everyone can tell by looking at it that it's unfinished. They can see the open spaces where their contributions will go.

### Property 2: It's Solved

Despite being rough, shaped work has been thought through. All the main elements of the solution are there at the macro level and they connect together.

### Property 3: It's Bounded

Shaped work indicates what *not* to do. It tells the team where to stop. There's a specific appetite—the amount of time the team is allowed to spend.

**Taken together:** The roughness leaves room for the team to resolve all the details, while the solution and boundaries act like guard rails.

## Case Study: The Dot Grid Calendar

We launched Basecamp 3 without a calendar. Soon after, customers started asking us to "add a calendar."

We had built calendars before and knew how complex they are. A proper calendar can easily take six months:
- Dragging and dropping events between cells
- Wrapping multi-day events around the edge
- Different views for monthly, weekly, or daily
- Dragging the edge of an event to change duration
- Color coding events for different categories

Past versions of Basecamp had calendars, and only about 10% of customers used them. We didn't have the appetite for six months.

**The question shifted:** With only six weeks to work with, we could only build about a tenth of what people think of when they say "calendar." Which tenth?

**The answer:** The Dot Grid. A two-month, read-only grid view. Any day with an event would have a dot. A list of events below the calendar. Clicking a day with a dot scrolls that day's events into view.

**What we didn't do:**
- No dragging events between days
- No multi-day event spans (just repeated dots)
- No color coding or categories

**The sketch was rough but specific:**
- Rough enough that the designer had room to interpret
- Specific enough that it was clear what to build, what's in, and what's out

## Who Shapes

Shaping is creative and integrative. It requires combining:
- Interface ideas
- Technical possibilities
- Business priorities

You need to either embody these skills as a generalist or collaborate with one or two other people.

**Skills needed:**
- Primarily design work (interaction design from user's perspective)
- Technically literate (judge what's possible, easy, or hard)
- Strategic thinking (what counts as success? which customers are affected?)

## Two Tracks

Shaping happens on a separate track from building:
- During any six-week cycle, teams build previously shaped work
- Shapers work on what teams might build in a future cycle
- Shaping work stays private until the commitment to bet on it

This gives shapers the option to shelve or drop work-in-progress when it's not working out.

## The Four Steps

1. **Set boundaries** — How much time is this worth? How do we define the problem?
2. **Rough out the elements** — Sketch a solution at high abstraction, not wireframes
3. **Address risks and rabbit holes** — Find holes, cut things out, specify tricky spots
4. **Write the pitch** — Package it for the betting table
