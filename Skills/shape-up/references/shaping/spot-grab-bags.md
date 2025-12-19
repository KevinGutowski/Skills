# Spotting Grab-Bags

## What Is a Grab-Bag?

When it comes to unclear ideas, the worst offenders are "redesigns" or "refactorings" that aren't driven by a single problem or use case.

When someone proposes something like "redesign the Files section," that's a grab-bag, not a project. It's going to be very hard to figure out what it means, where it starts, and where it ends.

## Red Flag Phrases

Watch out for these:
- "Redesign the..."
- "[Feature] 2.0"
- "Refactor..."
- "Clean up..."
- "Improve..."
- "Overhaul..."

These sound like projects but they're actually undefined containers that could hold anything.

## Case Study: Files 2.0

We made the mistake of kicking off a "Files 2.0" project without really considering what that meant. Our excitement about improving a huge part of our app got the better of us.

We knew there were a lot of problems with our Files feature, but we didn't ask ourselves what specifically we were going to do. **The project turned out to be a mess because we didn't know what "done" looked like.**

We recovered by splitting the project into smaller projects:
- "Better file previews"
- "Custom folder colors"

We set appetites and clear expectations on each project and shipped them successfully.

## The Grab-Bag Test

| Question | If Yes → Project | If No → Grab-Bag |
|----------|------------------|------------------|
| Is there a specific problem? | ✓ | ✗ |
| Is there a clear starting point? | ✓ | ✗ |
| Is there a defined end? | ✓ | ✗ |
| Is there a fixed appetite? | ✓ | ✗ |

All four must be "yes" for it to be a real project.

## Converting Grab-Bags to Projects

### Before (Grab-bag)
"We need to rethink the Files section"

### After (Project)
"We need to rethink the Files section because sharing multiple files takes too many steps."

Now we can start asking:
- What's not working?
- In what context are there too many steps?
- What parts of the existing design can stay the same?
- What parts need to change?

## Why Grab-Bags Fail

1. **No boundaries** — Without a specific problem, scope grows without limit
2. **No definition of done** — How do you know when you've "redesigned" something?
3. **Competing visions** — Different team members have different ideas of what "better" means
4. **No trade-offs** — Without constraints, every improvement seems equally important
5. **No momentum** — Big vague projects feel overwhelming and grind to a halt

## What to Do Instead

1. **Identify specific pain points** — Talk to customers, look at support tickets, observe usage
2. **Pick one problem** — Even if there are ten things wrong, shape one fix
3. **Set an appetite** — Is this a 2-week fix or a 6-week project?
4. **Define what "done" looks like** — What specifically will be different when you ship?

The result should be something like:
- "Better file previews" (6 weeks) — Inline preview for images and PDFs without downloading
- "Faster file upload" (2 weeks) — Drag-and-drop multiple files at once

These are projects. "Files 2.0" is a wish.
