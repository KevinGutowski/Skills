# Breadboarding and Fat Marker Sketches

## The Right Speed

Two things enable us to move at the right speed during shaping:

1. **The right people** — Working alone or with a trusted partner who can speak in shorthand and jump between ideas quickly.
2. **The right level of detail** — Avoiding wireframes or specific visual layouts that bog us down in unnecessary details.

The challenge is to be concrete enough to make progress on a specific solution without getting dragged down into fine details.

## Breadboarding

We borrow a concept from electrical engineering. A breadboard has all the components and wiring of a real device but no industrial design. Deciding to include an indicator light and a rotary knob is very different from debating the chassis material or which side the knob goes on.

### The Three Elements

| Element | What It Is | How to Draw It |
|---------|------------|----------------|
| **Places** | Screens, dialogs, menus | Write the name, underline it |
| **Affordances** | Buttons, fields, links, copy | Write below the place line |
| **Connections** | How affordances lead to places | Arrows between elements |

We use words for everything instead of pictures. The important things are the components and their connections.

### Example: Autopay Feature

Our product is an invoicing tool. We're considering adding "Autopay" so customers can pay future invoices automatically.

**Step 1: Start with a place**
```
Invoice
────────
```

**Step 2: Add an affordance**
```
Invoice
────────
Turn on Autopay
```

**Step 3: Connect to the next place**
```
Invoice              Setup Autopay
────────      →      ──────────────
Turn on Autopay      CC fields
                     FI logo
                     Submit
```

**Step 4: Think it through**
Writing out the flow confronts us with questions we didn't think of:
- Did we actually pay the original invoice or not?
- What does enabling Autopay actually do?
- Does it apply only for the future or also pay the current invoice?

**Step 5: Explore alternatives quickly**
Since we're using lightweight notation, we can jump around:

Maybe Autopay should be an option when making any payment instead of a separate flow?

```
Invoice     Pay Invoice           Confirm
────────    ───────────    →      ────────────────
Pay  →      Autopay in Future?    Print Receipt
            Submit                Confirm Autopay if Chosen
```

This removed the ambiguity about whether the current amount is being paid.

**Step 6: Cut scope to fit appetite**
The team decided adding username/password flows was too much scope. Instead, customers could ask the invoicer to turn off Autopay, and we'd add a single option to the existing customer detail page.

## Fat Marker Sketches

Sometimes the idea is visual. Breadboarding would miss the point because the 2D arrangement of elements is the fundamental problem. We use fat marker sketches—drawn with such broad strokes that adding detail is difficult or impossible.

### Example: To-Do Groups

We found ourselves creating fake to-dos as dividers: "––– Needs testing –––". We had the idea to make official dividers.

**First sketch: The basic concept**
```
┌─────────────────────────┐
│ To-Do List              │
├─────────────────────────┤
│ □ Item (loose)          │
│ □ Item (loose)          │
│─────── Divider ─────────│
│ □ Item (grouped)        │
│ □ Item (grouped)        │
│─────── Divider ─────────│
│ □ Item (grouped)        │
└─────────────────────────┘
```

**Second sketch: Where does "Add" go?**
We could add buttons within each group, or rely on the action menu for inserting items.

**The output: Clear elements**
- Loose to-dos above the first group belong directly to the parent
- Grouped to-dos appear below the loose to-dos
- Try an *add* affordance within each section; if that doesn't work visually, use the action menu

## When to Use Which

| Technique | Use When | Examples |
|-----------|----------|----------|
| **Breadboard** | The tricky part is *what happens* | Flows, states, sequences, logic |
| **Fat marker** | The tricky part is *where things go* | Layouts, arrangements, visual structure |

## Room for Designers

By leaving details out, these methods give room for creativity in later stages. This isn't a spec—it's more like the boundaries and rules of a game. It could go countless different ways once it's time to play.

Working at the right "level of abstraction" not only ensures we move at the right speed, it also leaves important room for the team's creativity.
