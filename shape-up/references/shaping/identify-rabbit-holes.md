# Identifying and Handling Rabbit Holes

## Why This Matters

Remember that we're shaping work for a fixed time window. We may trust from our experience that the elements we fleshed out are buildable within the appetite. But we need to look closer, because all it takes is one hole in the concept to derail that.

Suppose we bet on the project and a team takes it on. If they run into an unanticipated problem that takes two weeks to solve, they just burned a third of the budget!

Even worse, sometimes you run into problems that don't just delay the project—they have no apparent solution.

### Example: The Home Screen Redesign

We once bet on a project to redesign how we present projects on Basecamp's home screen. We assumed the designer would figure it out; we didn't do the work in the shaping phase to validate that a viable approach existed.

Once the project started, it turned out to be a much harder problem than we expected. None of us were able to find a suitable design solution within the six weeks we budgeted. We ended up abandoning the project and rethinking it later.

## Thin-Tailed vs Fat-Tailed Risk

Well-shaped work looks like a thin-tailed probability distribution. There's a slight chance it could take an extra week but, beyond that, the elements of the solution are defined enough that there's no reason it should drag on longer.

However, if there are rabbit holes—technical unknowns, unsolved design problems, or misunderstood interdependencies—the project could take *multiple times* the original appetite to complete.

We want to remove the unknowns so that our probability is as thin-tailed as possible: independent, well-understood parts that assemble together in known ways.

## How to Find Rabbit Holes

### Slow Motion Walk-Through
Walk through a use case in slow motion. Given the solution we sketched, how exactly would a user get from the starting point to the end? This can reveal gaps or missing pieces.

### Viability Questions
For each part you think you solved, ask:
- Does this require new technical work we've never done before?
- Are we making assumptions about how the parts fit together?
- Are we assuming a design solution exists that we couldn't come up with ourselves?
- Is there a hard decision we should settle in advance so it doesn't trip up the team?

## Case Study: Patching a Hole

When we defined To-Do Groups, we introduced dividers in the to-do list. The logic of loose versus grouped to-dos made sense. But when we looked closer we realized that we didn't address how to display completed items.

In the pre-existing design, completed items displayed below the list. Should we now render completed items at the bottom of each group? Continue to show them at the bottom and repeat dividers within the completed section? Reconsider how we handle completed items entirely?

**This was a hole in the concept.** It's not responsible to give the team a tangled knot of interdependencies and ask them to untangle it under deadline.

**The patch:** Leave completed items exactly as they worked previously. Instead of grouping or segmenting them, just append the name of the group to each completed item. A little messy, but it drastically simplified the problem.

As shapers, we're thinking less about the ultimate design and more about basic quality and risk. With the compromised concept we get to keep all the elements that made the project worth doing—the groups of incomplete items—and we cut off a big tail of risk.

## Three Ways to Handle Rabbit Holes

### 1. Declare Out of Bounds

Call out cases you specifically *aren't* supporting.

**Example:** We worked on notifying groups of people in Basecamp. Rather than checking off five programmers one by one, you could click "Programmers" and they'd be selected. As we looked at the product, we saw tons of places where this might make sense—posting messages, assigning to-dos, mentioning people in chat.

We decided the core value was narrowing down who to notify about a message. We explicitly marked the other cases as "out of bounds" and focused on that win.

### 2. Cut Back

Remove parts that aren't really necessary.

**Example:** When we designed To-Do Groups, we thought it would be great to color-code groups. The page would look more interesting. But we decided to flag this as unnecessary and cut it from the core. We could mention it as a nice-to-have, but everyone starts from the assumption the feature is valuable without it.

### 3. Present to Technical Experts

Before you're ready to share the idea widely, grab some technical experts and walk them through it.

**Key framing:**
- "This is just an idea I'm shaping—not something coming down the pipe yet"
- "What do you think?"

**The critical question:** Instead of asking "Is this possible?" ask "Is this possible in 6 weeks?" That's a very different question.

Talk through the constraints. Emphasize that you're looking for risks that could blow up the project—time bombs that might explode once a team commits.

**Keep the clay wet.** Invite them to a whiteboard. Redraw the elements from the beginning. Once you've covered the work you already did, open it up and invite them to suggest revisions.
