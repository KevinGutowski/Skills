# Mapping Project Scopes

## Organize by Structure, Not by Person

When asked to organize tasks, people often separate work by person or role: a list for Designers and a list for Programmers. This leads to problems—people complete tasks, but the tasks don't add up to a finished part of the project.

**Example:** Consider organizing a fundraising event. You could create a list of tasks for each volunteer. But then there'd be no way to see the big picture—what's done and what's not at the macro level.

**Better:** Create lists based on the *structure* of the project—things that can be worked on and finished independently: Food Menu, Venue Setup, Light/Sound. Now you can see which areas are done.

## What Is a Scope?

Scopes are integrated slices of the project that can be finished independently in a short period—a few days or less. They are bigger than tasks but much smaller than the overall project.

Each scope reflects the meaningful parts of the problem. Scopes become the language of the project at the macro level.

## How Scopes Emerge

### At the Start
The team starts discovering tasks. It's too early to organize them into higher level categories. It's enough just to capture things that need to happen.

### After Week One
As the team does real work, they learn how tasks are related and what the structure of the project is really like. Then they can factor the project into scopes—like dividing a map into separate territories.

**You discover scopes by doing work.** Scope mapping isn't planning. You need to walk the territory before you can draw the map.

## Case Study: Message Drafts

A designer and programmer were building a feature to create and save message drafts.

**End of Week 1:** They had completed some tasks, but there wasn't anything to show. In the spirit of "get one piece done," they focused on one key interaction: creating a new draft.

They called the new scope "Start New" and created a to-do list for it. After finishing the remaining tasks, the scope was complete.

**Factoring More Scopes:** Looking at the remaining unscoped tasks, they broke them out:
- **Locate** — Finding drafts
- **Trash** — Deleting drafts
- **Save/Edit** — Saving and editing

As they dug deeper into Save/Edit, they noticed they could carve off more pieces:
- **Send** — Sending the drafted message
- **Store** — Storing information
- **Reply** — Special case for reply drafts

**The Result:** The team suddenly felt like they could see the whole project at a high level. All the major parts were visible as scopes.

## Signs the Scopes Are Right

| Good Signs | Bad Signs |
|------------|-----------|
| You can see the whole project at a high level | Important work is hidden in the details |
| Conversations flow because scopes give you the right language | You struggle to talk about what's done |
| When new tasks come up, you know where to put them | Tasks float around without a home |

## Signs the Scopes Need Redrawing

| Symptom | Problem | Fix |
|---------|---------|-----|
| Hard to say how "done" a scope is | Tasks inside are unrelated | Factor something out |
| Name isn't unique (e.g., "front-end" or "bugs") | Not integrated enough | File bugs under their specific scope |
| Too big to finish soon | Scope became its own project | Break it into smaller pieces |

## Special Cases

### Layer Cakes
Most software projects require some UI design and a thin layer of code below. The work looks like a layer cake—you can judge work by UI surface area because back-end work is thin and evenly distributed.

In these cases, integrate all design and programmer tasks together in the same scope.

### Icebergs
Sometimes there's significantly more back-end work than UI work (or vice versa). This is an iceberg.

For icebergs, factor out the UI as a separate scope. If the back-end is complex enough, split it into separate scopes too. The goal is to define things you can finish and integrate in stages.

**Always question icebergs:** Is the complexity really necessary? Do we need that fancy UI? Is there a simpler approach?

### Chowder
There are almost always a couple things that don't fit into a scope. Allow yourself a "Chowder" list for loose tasks. But keep a skeptical eye—if it gets longer than 3-5 items, there's probably a scope to be drawn somewhere.

## Mark Nice-to-Haves with ~

New tasks constantly come up. A good way to deal with them: record them but mark them with a ~ in front. This allows everyone to constantly sort must-haves from nice-to-haves.

**Example:**
- ✓ Store draft content
- ✓ Load draft on edit
- ~ Add autosave
- ~ Improve loading indicator

The ~ is your machete for cutting down constantly growing scope.
