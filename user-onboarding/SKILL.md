---
name: user-onboarding
description: Design and write user onboarding experiences using principles from "The Elements of User Onboarding" by Samuel Hulick. Use when designing empty states, shaping first-run flows, writing onboarding or welcome copy, cutting steps from signup flows, planning what new users see first, building setup wizards, writing lifecycle emails, introducing features to users, or deciding how to handle blank screens. Also useful for landing page copy that sells outcomes. Applies the Fire Flower philosophy — sell the better user, not the product.
---

# User Onboarding

Principles from "The Elements of User Onboarding" by Samuel Hulick for designing and writing onboarding experiences that make users successful. Applies to both **shaping features** (what to build, what to cut, how to structure flows) and **writing copy** (empty states, welcome messages, CTAs).

## Core Philosophy: The Fire Flower

Don't sell the fire flower. Sell the ability to throw fireballs.

Every onboarding decision — what to build, what to cut, what to write — should be about **the user becoming better**, not about the product being great. Your product is the fire flower; the user becoming a fireball-throwing Mario is the real value.

**Define your singular improvement.** Articulate what your product makes people better at in a single statement — not a list of features. "We make people better at remembering things" not "we help with writing, storing, and searching notes." This singular definition should drive every onboarding decision.

**Test**: Does this feature/copy talk about THEM or about US?

- Bad: "Our powerful analytics dashboard..."
- Good: "See exactly where your customers come from..."
- Bad: "We offer industry-leading project management..."
- Good: "Ship projects on time without the midnight scrambles..."

## The Customer Journey

Each stage is a transition where users drop off. Onboarding lives in the gap between Marketing and Product.

```
Introduced → Signup → First Use → Recurring Use → Purchase → Ongoing Use → Advanced
```

Know which transition you're designing for. Different stages need different approaches:
- **Introduced → Signup**: Selling the dream, aha moment, rational ammunition
- **Signup → First Use**: First impressions, empty states, quick win
- **First Use → Recurring Use**: Momentum, setup quests, lifecycle emails, social accountability
- **Recurring Use → Purchase**: The value should already be self-evident by now

## By Context

| Context | When to Use | Reference |
|---------|-------------|-----------|
| **Empty States** | Designing or writing copy for screens with no user data yet | [empty-states.md](references/empty-states.md) |
| **First Impressions** | Shaping the first-run experience, welcome screens, post-signup flow | [first-impressions.md](references/first-impressions.md) |
| **Pre-Signup** | Landing pages, marketing, selling the dream before signup | [selling-the-dream.md](references/selling-the-dream.md) |
| **Progress & Momentum** | Setup quests, progress bars, lifecycle emails, keeping users moving | [driving-momentum.md](references/driving-momentum.md) |

Read the appropriate reference based on context.

## Universal Rules

1. **Talk about them, not you.** "You can slay from far away!" beats "This thing is totally the best."
2. **Sell outcomes, not features.** Lead with what improves in their life.
3. **Never blame the user.** Especially for states they couldn't have influenced yet.
4. **Maintain scent of information.** Each touchpoint must deliver on what the previous one promised.
5. **Treat attention like oxygen.** It's finite and precious. Every word must earn its place.
6. **Be the world's best butler, not a DMV teller.** Warm, helpful, and anticipating needs.
7. **Encourage at inflection points.** When they complete something hard, celebrate with them.

## Shaping Onboarding Features

When deciding what to build or cut from an onboarding flow:

- **Every step is a drop-off point.** Ruthlessly question each one.
- **Don't mistake activity for achievement.** Amazon 1-Click vs a full shopping cart — same outcome, wildly different step counts.
- **For each step ask:** Does this help them reach their quick win? Can a machine do it? Can we use a smart default? Can we defer it until after they've experienced value?
- **Define flows by user improvement**, not by steps. Beginning state = who they are arriving. End state = who they are after "base camp."
- **Points of Friction** slow users down (confusion, tedious fields). **Points of Disconnect** let them drift away (coupon code fields, external links). Eliminate both.
- **The quick win must:** demonstrate core product value, be achievable in one sitting, not depend on other people, harness the user's current intent.

## Quick Copy Formulas

**Empty state pattern:**
```
[What will appear here once they take action].
[What they'll be able to do with it — paint the picture].
[CTA button to take that action]
```

**Welcome message pattern:**
```
[Brief warm greeting]
[Orient them: here's what to do first]
[Single clear CTA toward their quick win]
```

**Feature introduction pattern:**
```
[User outcome this enables — in their words]
[Briefest possible explanation of how]
[CTA to try it]
```

## Related skills

Define the product's writing voice with `ui-voice-and-tone`, then structure the first-run flow and write the welcome/empty-state copy here in that voice — this skill owns the *flow and quick-win framing*, that one owns the *voice*. For failure states, route to `error-messages`. For in-app *feature* teaching after signup — no-tutorial first launches, visual cues, gesture hints, tips — use `feature-discoverability` (the Apple counterpart to this skill's journey framework).
