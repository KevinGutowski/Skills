# Writing the Pitch

## Why Write a Pitch?

We've got the elements of a solution now, and we've de-risked our concept to the point that we're confident it's a good option to give a team. But the concept is still in our heads or in some hard-to-decipher drawings on the whiteboard.

Now we need to put the concept into a form that other people will be able to understand, digest, and respond to.

The purpose of the pitch is to present a good potential bet. It's basically a presentation. The ingredients are all the things we need to both capture the work done so far and present it in a form that will enable the people who schedule projects to make an informed bet.

## The Five Ingredients

### 1. Problem

It's critical to always present both a problem and a solution together. Diving straight into "what to build" is dangerous.

**Why it matters:**
- Without a problem, there's no test of fitness to judge whether one solution is better than another
- The solution might be perfect, but what if the problem only happens to customers who are a poor fit?
- We could spend six weeks on an ingenious solution that only benefits the wrong people

**The best problem definition** consists of a single specific story that shows why the status quo doesn't work. This gives you a baseline to test fitness against.

### 2. Appetite

You can think of the appetite as another part of the problem definition. Not only do we want to solve this use case, we want to do it in six weeks, not three months.

**Why state it explicitly:**
- There's always a better solution; the question is whether *this specific solution* fits the time we want to spend
- It prevents unproductive conversations about gold-plated alternatives
- It turns everyone into a partner in finding a simple solution

Anybody can suggest expensive and complicated solutions. It takes work and design insight to get to a simple idea that fits in a small time box.

### 3. Solution

A problem without a solution is unshaped work. Giving it to a team means pushing research and exploration down to the wrong level, where the skillsets, time limit, and risk profile are all misaligned.

**It's only ready to bet on when problem, appetite, and solution come together.**

### 4. Rabbit Holes

Sometimes addressing a rabbit hole just requires a few lines of text.

**Example:** In a Payment Form project, the shapers wanted to call out that URLs would never live on custom domains for v1. This isn't central to the concept, but spelling it out patches a potential rabbit hole.

### 5. No-Gos

If there's anything we're *not* doing in this concept, mention it here.

**Example:** In the Payment Form project, the team decided up front that they wouldn't allow any kind of WYSIWYG editing of the form. Users would only be able to provide a logo and customize header text on a separate page. Given the appetite, it was important to mark this as a no-go.

## Help Them See It

We need to draw at the right level of detail. People who read the pitch without much context need to "get" the idea. But we don't want to over-specify with wireframes that box in designers later.

### Technique: Embedded Sketches

Take a screenshot of the existing UI and draw rough elements on top of it:

```
┌────────────────────────────────────────────┐
│ [Screenshot of Dashboard]                  │
│                                            │
│  ┌──────────────────────────────────────┐  │
│  │ Hand-drawn box showing where         │  │
│  │ new feature elements go              │  │
│  └──────────────────────────────────────┘  │
│                                            │
└────────────────────────────────────────────┘
```

This makes it easier to see what the elements are and evaluate how clearly the feature presents itself. Add a disclaimer that reminds designers of the latitude they should take.

### Technique: Annotated Fat Marker Sketches

Redraw the sketch on an iPad—still with a fat brush size. Use different colors to separate labels from the material parts:

- **Orange:** The sketch itself (boxes, shapes, UI elements)
- **Purple:** Labels and annotations pointing to specific parts

This selectively gets into more visual detail when you need it to sell the concept.

## Example Pitch Structure

```markdown
# [Feature Name]

## Problem
[Single specific story showing why the status quo doesn't work]

## Appetite
[Small batch: 2 weeks / Big batch: 6 weeks]

## Solution
[Fat marker sketches or breadboards with annotations]

### How It Works
[Walk through the key interactions]

## Rabbit Holes
- [Thing we're specifically NOT doing]
- [Technical decision we've already made to avoid complexity]

## No-Gos
- [Feature X is out of scope]
- [Use case Y is not supported]
```

## Ready to Present

The first step for presenting a pitch is posting the write-up somewhere that stakeholders can read it on their own time. This keeps the betting table short and productive.

People comment on the pitch asynchronously—not to say yes or no (that happens at the betting table) but to poke holes or contribute missing information.

In ideal conditions, everyone has time to read the pitches in advance. If that isn't possible, the pitch is ready to pull up for a quick live sell.
