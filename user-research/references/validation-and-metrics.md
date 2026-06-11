# Validation and Metrics

Sources: Cindy Alvarez, *Build Better Products* (Rosenfeld Media, 2016); Melissa Perri, *Escaping the Build Trap* (O'Reilly, 2018); Jeff Gothelf and Josh Seiden, *Lean UX* (1st ed., O'Reilly, 2013). Quotes verified against the extracted texts. Era note: the 2013 Lean UX tooling/fidelity economics are stale; the artifact-to-feedback mapping and weekly-contact discipline are durable.

## Contents

- Assumption stacks
- Predictive personas and sell-it tests
- Lean UX as validation economics
- Metrics hygiene
- Decision rules

## Assumption stacks

Start with Klein's failure prompt: **"This product/feature/service will fail unless"**. List everything that must be true, then order it as a stack: audience exists → audience has the problem → problem is painful/frequent → current alternatives disappoint → proposed behavior is possible → channel can reach them → economics work. "Each assumption is built on the last one"; do not test a high-level growth metric before the lower claims can stand.

Convert assumptions into falsifiable hypotheses with **two numbers**. Bad: "people need mobile file access." Better: "We will know this is true if 80 out of 100 people within that persona group have a specific story about wanting to access the same files from more than one device within the past month." The first number is the threshold; the second is the sample size. Add a time window and a behavioral story, not an attitude.

Janice Fraser's test for bad hypotheses: "You'll figure out if your hypothesis is bad if you can't think of any evidence that you can gather for it." If no observable evidence can prove the claim wrong, rewrite it until it can fail.

## Predictive personas and sell-it tests

Personas must predict who will become a customer. Klein: "A predictive persona is a tool that allows you to validate whether you can accurately identify somebody who will become a customer." If the team cannot find and recruit people who match the persona, the persona is fiction even if the document is tidy.

Segmentation rule: "all moms are not necessarily your users." Prefer a product that is fabulous for one identifiable group over a mediocre average. Recruit five, then another five, until the team can predict what it will hear; inability to predict means the persona is still too broad or too speculative.

For willingness-to-pay, do not ask if people would use it. "Actually try to sell it to them." If a perfect candidate cannot be sold in person, the remote funnel will not magically rescue the product. This is the same behavioral-data doctrine as Sharon's concierge MVP and fake doors.

## Lean UX as validation economics

Gothelf/Seiden's reusable hypothesis shape:

```
We believe that [doing this/building this feature/creating this experience]
for [these people/personas] will achieve [this outcome].
```

Before writing it, establish the benchmark: "none of your metrics will be meaningful if you don't have a benchmark in place prior to writing your hypotheses." Run the smallest artifact that produces the needed evidence:

| Artifact | Best feedback |
|---|---|
| Sketches / paper flows | Value proposition, rough concept, language |
| Wireframes | Information architecture, task sequence, copy hierarchy |
| Visual mockups | Trust, brand fit, perceived quality |
| Clickable or coded prototype | Behavior, interaction, implementation constraints |
| Concierge / manual service | Demand and service economics before software |

Cadence: "three users, by 12 noon, once a week." The point is not ritual purity; it is forcing weekly customer contact and lowering the cost of being wrong. Their Meetup example ran about 600 sessions a year for about $30k. On testing day, "Whatever is ready on testing day is what goes in front of the users."

Contradictory data triage: look for patterns, park outliers, verify with other sources. A surprising single failure can justify a head-banger fix; a strategic reversal needs corroboration.

## Metrics hygiene

Metrics become research only when they are decision-grade:

- **Baseline first.** Without a before-state, the hypothesis cannot be evaluated.
- **Time component.** Perri: "You can easily turn a vanity metric into an actionable metric by adding a time component to it." "Users" is vanity; weekly activated users by acquisition cohort is usable.
- **Cohorts by channel.** Aggregate metrics hide mismatched audiences. Separate people by how they arrived and what promise brought them in.
- **Mutually destructive pairs.** Perri's phrase for balancing metrics: pair activation with retention, conversion with refunds/support load, speed with quality, engagement with user control.
- **Danger metrics.** Klein: "make sure that you're not improving one metric at the expense of others." Name the number that must not degrade before the experiment starts.
- **Gaming check.** Leading metrics invite local optimization; Klein's Shmacebook parable is the warning. If a team can make the number move while worsening the product, it is not a north star.
- **Do not experiment on non-core polish.** Perri's Kalma/Zappos lesson: "Don't spend your time overdesigning and creating unique, innovative solutions for things that are not core to your value proposition." Save research energy for what can make or break the value prop.

## Decision rules

Validation is not "learning theater." Write this before launch:

| Field | Required |
|---|---|
| Assumption | The riskiest claim being tested |
| Evidence | Observable behavior that would support or refute it |
| Success threshold | The number that justifies continuing |
| Failure threshold | The number that stops or changes the bet |
| Danger metrics | What must not get worse |
| Next decision | What the team will do on success, failure, or inconclusive data |

Klein's no-neutral rule: "If this happens, it is not a neutral result. If this happens, the experiment is a failure." Opportunity cost still counts; ambiguous experiments consumed time that could have tested a sharper assumption.

Perri's MVP definition is the useful one: "the minimum amount of effort to learn." It is not the smallest embarrassing release, not a scope excuse, and not a promise of Version 2.
