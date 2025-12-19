# Integrating One Slice

## The Problem with Horizontal Layers

As the team gets oriented, they start discovering tasks. It's tempting to work in horizontal layers—do all the design first, then all the back-end. But this creates problems.

**Front-end only:** The team could design a variety of screens and even implement them as templates. But until they're wired to a backend, nothing does anything. The work remains hypothetical.

**Back-end only:** A lot of tasks could be checked off, but without any UI—what can you do with it? How do you judge if the business logic is right without interacting with it?

If the team completes a lot of tasks but there's no "one thing" to click on and try out, it's hard to feel progress. A team can do a lot of work but feel insecure because they don't have anything real to show.

**Lots of things are done but nothing is really done.**

## The Solution: Vertical Integration

Instead, pick off one slice of the project to integrate. When that's done, the team has something tangible that they've proven to work (or not work).

Anyone can click through the interaction and see if the feature does what it should and if what it does is what they want.

## Case Study: Clients in Projects

We built a feature in Basecamp to let service firms invite clients and share chosen content with them. The concept had several moving parts:

- **Client Access:** A new permissions model (major back-end and caching implications)
- **Client Management:** UI to add/manage clients separately from team members
- **Visibility Toggle:** Each piece of content should have a toggle to expose it to clients

The team had one designer and one programmer.

### What They Did

**Day 1-2:** After getting oriented, the designer chose the visibility toggle as the first slice. This was the most central piece of UI—the one that would appear in demos and the interaction customers would use most.

**The designer's approach:**
- Didn't make a pixel-perfect mockup
- Experimented with different affordances in the HTML templates
- Should it be radio buttons, a checkbox, or a custom button?

**Meanwhile, the programmer:**
- Wasn't waiting around
- Had enough guidance from the pitch to start spiking the access model

**The handoff:** As soon as the designer felt confident in the basic direction, he pinged the programmer and showed him the stubbed toggle. The programmer wired it so it would:
- Appear on all supported content types
- Change state when clicked
- Save its state in the database

**What it didn't do yet:** The toggle didn't actually change visibility. But it worked from the user's point of view. The designer could click it, feel it, and judge how well it worked with live data.

**The result:** About three days in, the designer demoed the working toggle to a manager. A few tweaks, and they called it "done." One important piece was designed, implemented, demoed, and settled.

The team felt good about showing tangible progress. And by clicking through a core interaction early, they validated that what they hoped would make sense did indeed work in practice.

## Affordances Before Pixel-Perfect Screens

Programmers don't need a pixel-perfect design to start implementing. All they need are endpoints: input elements, buttons, places where stored data should appear.

**First make it work, then make it beautiful.**

The first interface a designer gives to a programmer can look very basic—more like a breadboard than a visual design:

```
┌────────────────────────────────────────────┐
│ [Course Registration - Unstyled]           │
│                                            │
│ Arrival Date: [Dropdown]                   │
│ Arrival Time: [Dropdown]                   │
│                                            │
│ [Submit]                                   │
└────────────────────────────────────────────┘
```

As rough as it looks, this design tests important trade-offs. The specific options in the dropdown correspond to rules about pricing. The designer chose a dropdown over a calendar picker because option groups could label phases of multi-week courses.

Beautiful alignment, colors, and typography don't matter on the first pass. Visual styling is important in the end product, not in the early stages. The biggest uncertainties are:
- Whether it will work
- Whether it will make sense
- How hard it will be to implement

After the elements are wired up, they can be rearranged, restyled, and repainted.

## Start in the Middle

The team didn't build login first. They didn't build a way to create an interview project before solving the problem of adding interview data. They jumped straight into the middle where the interesting problem was and stubbed everything else.

### Three Criteria for Choosing What to Build First

| Criterion | Question | Example |
|-----------|----------|---------|
| **Core** | Is this central to the concept? | Visibility toggle vs. renaming a client |
| **Small** | Can we finish it in a few days? | If it's not small, carving it off doesn't help |
| **Novel** | Is this something new? | Prefer unknown over familiar work |

The visibility toggle was core, small, and novel. Starting with it boosted everyone's confidence because it proved a new idea was going to work.
