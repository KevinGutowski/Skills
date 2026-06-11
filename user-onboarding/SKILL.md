---
name: user-onboarding
description: "Designs and writes user onboarding — empty states, first-run flows, signup-step cutting, setup wizards, lifecycle emails — selling the better user, not the product. Use when shaping what new users see first, writing onboarding or welcome copy, handling blank screens, or introducing features. Based on Samuel Hulick's 'The Elements of User Onboarding'. Triggers: onboarding, empty state, first run, welcome copy, setup wizard, lifecycle email."
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
8. **Leverage what users already carry** (Josh Wardle, Config 2024): Wordle never teaches mechanics because "humans are creatures of language" — players already know words rarely start with X. Build on knowledge users bring, then **curate the invisible layer** so the product never undermines it (he filtered 13,000 valid words to ~2,500 his partner actually knew — "a very invisible part of Wordle… but a huge impact"). And **reward curiosity instead of instructing** (Andy Allen): easter eggs and explorable details "mean you don't have to do as much instruction."
9. **Design the share artifact** (Wardle): the emoji grid is spoiler-free, narrates "the journey you went on," and deliberately contains no link-back — "if I was getting something by you sharing… that kind of felt gross." Artifacts that don't self-promote get shared more.
10. **Sequence trust from low stakes to high** (Jude, ex-Coinbase/Instagram — Config 2025): trust "is really just consistency over time," and first impressions form in **~50 milliseconds**. Climb a *pyramid of trust*: Waymo first asks only for initials and a favorite color (which become the car's beacon), then proves it can find you, and only then asks you to ride — "the car has proven along the way, through lower-stakes moments, that it's worthy of your trust." Never ask for the high-stakes commitment first. Wrap novel tech in a **familiar analog** (Blackbird "works a lot like a credit card — many people don't even realize it's onchain"), and diagnose *whose* trust is missing: Coinbase's seed-phrase anxiety wasn't distrust of the company — "users had trouble trusting *themselves* to be the sole custodian."
11. **You have ~30 seconds** (Tara Feener, Browser Company): "for most people trying a new web browser you've got like 30 seconds… or I'm going to go back to the thing I know." And **name the private shame** (Arc): "tab hoarding is a 'me problem' people blame themselves for… we made people feel seen" — naming a self-blamed pain creates instant resonance. Caveat from the same team: "a simpler learning experience is not the same as the better UX" — sometimes the better design deserves its learning curve.
12. **Invert the funnel — ask after value** (Jiaona Zhang, Config 2024): TikTok asks only your birthday before landing you in the For You page, "only prompting you… after you've experienced real value." Radically streamline or fully invert signup. And build "**canvases, not corridors**" — multiple paths to the same goal, as long as "the moments of delight still outweigh the moments of difficulty."
13. **Free play before signup** (Ryo Lu, Cursor — YC-website roast, 2025): "even in real OS you can send three free messages before you sign in. Like just let people play" — and constrain that first-use surface ("the initial demo is more constrained so that it gives you a better output") so the free taste is a *good* one. Same family as the funnel-inversion rule above. AI-native version: *inverted onboarding* — prove value at step one instead of asking questions (Emily Campbell → `ai-experience-design`, references/patterns.md).
14. **Delight has a measured conversion cost — spend it deliberately** (Rafa Conde, Dive Club podcast, 3rnhlZj25iY): an emotional intro video shown before the signup button — "I think we lost like 20% or 30% of sign-ups for people… who would see the video first." The trade is real (softened only by "would those people drop anyways during the onboarding flow?"); pay it only when the emotional frame is the product's edge — and design targeted, not generalized: "if you try to design for everyone then it's harder to make these things."
15. **Pattern fidelity for utilitarian flows** (Brandon Jacoby, Dive Club podcast, RaKFP_DuqpA): for "utilitarian flows in product… there are patterns that work that show up in 90% of the products out there. Those patterns are there for a reason." The judgment — "know when to reinvent the wheel, know when to follow patterns… is like the number one trait that any, especially junior designer, can have." Signup and setup are usually the follow-patterns zone; save invention for the product's signature moments.

## Shaping Onboarding Features

When deciding what to build or cut from an onboarding flow:

- **Every step is a drop-off point.** Ruthlessly question each one.
- **Don't mistake activity for achievement.** Amazon 1-Click vs a full shopping cart — same outcome, wildly different step counts.
- **For each step ask:** Does this help them reach their quick win? Can a machine do it? Can we use a smart default? Can we defer it until after they've experienced value?
- **Define flows by user improvement**, not by steps. Beginning state = who they are arriving. End state = who they are after "base camp."
- **Points of Friction** slow users down (confusion, tedious fields). **Points of Disconnect** let them drift away (coupon code fields, external links). Eliminate both.
- **For any personal-data field, explain why you ask and what you'll do with the answer; make it optional and editable** (Metts & Welfle, *Writing Is Designing*, ch. 5 — Fitbit's sex question, which trans users can't answer without knowing whether it's demographic or biometric). Exclusion compounds at scale: "If you exclude even one-tenth of one percent, that means there are 755 million people" less able to use your product.
- **The quick win must:** demonstrate core product value, be achievable in one sitting, not depend on other people, harness the user's current intent.

**Design backward from the behavior** (Cindy Alvarez, *Build Better Products*, ch. 8). "Features don't matter. They don't matter at all. All that matters is customer behavior." Start with the recurring behavior the product needs, then classify onboarding work:
- **Required** — the minimum path to the user's first real value.
- **Encouraged** — actions that make future success more likely but can wait.
- **Eventual** — advanced setup, mastery, integrations, polish.

"When a new user comes to your product, give them a task." Empty welcomes and feature tours are weaker than a constrained job with a visible finish. For habit products, use Amy Jo Kim's sequence via Klein: core loop first, then onboarding, then discovery, then mastery. If there is no strong loop, "you're building a leaky bucket." Build the thing someone will do every day before decorating the path into it.

**Dark-pattern boundary:** a dark pattern is any interface element that benefits the company at the expense of what a reasonable, fully informed user would agree to. If the onboarding goal depends on hiding cost, commitment, consent, or cancellation, route to `error-messages` / `form-design` ethics rather than conversion optimization.

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

Define the product's writing voice with `ui-voice-and-tone`, then structure the first-run flow and write the welcome/empty-state copy here in that voice — this skill owns the *flow and quick-win framing*, that one owns the *voice*. For failure states, route to `error-messages`. For in-app *feature* teaching after signup — no-tutorial first launches, visual cues, gesture hints, tips — use `feature-discoverability` (the Apple counterpart to this skill's journey framework). For courses, workshops, curricula, practice/feedback systems, and job aids, route to `learning-experience-design`.
