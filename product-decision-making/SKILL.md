---
name: product-decision-making
description: "Make product decisions with data, design judgment, and user-problem clarity. Use when deciding whether to build a feature, interpreting metrics, reviewing a product proposal, distinguishing optimization from new-behavior bets, or choosing who should own a solution. Based on Julie Zhuo's Looking Glass essays, talks, and product interviews. Triggers: product decision, data-informed, product intuition, metrics vs taste, new behavior, product review."
---

# Product Decision Making

**Sources:** [references/sources.md](references/sources.md) — Julie Zhuo's personal site, The Looking Glass/Substack archive, Medium archive, and selected product/AI interviews and talks. Deeper source notes: [field-notes.md](references/field-notes.md).

This skill owns the product-judgment layer: deciding what to build, what evidence matters, and how to turn diagnosis into action. Process systems route to `shape-up`; research methods route to `user-research`; stakeholder buy-in routes to `design-org-influence`; AI feature UX routes to `ai-experience-design`.

## The three product-review questions

Use Zhuo's product-review frame before arguing about solutions:

1. **What people's problems are we solving?** Name the audience, the concrete situation, the pain, and the current alternative.
2. **How do we know this is a real problem?** Use qualitative observations, behavioral data, market data, support tickets, or direct customer stories. Vibes are not enough.
3. **How will we know if we've solved it?** Define the outcome and time window before the work starts. If the metric is only a proxy, state the proxy risk.

If any answer is weak, do not open the solution debate yet. Go to `user-research` for evidence gathering or `design-org-influence` if the problem is stakeholder alignment.

## Diagnose with data, treat with design

Zhuo's durable rule is: **diagnose with data; treat with design.** Data and design are not rivals; both are trying to understand the truth of a phenomenon. Keep their jobs separate:

- **Data diagnoses:** what is happening, where the problem or opportunity is, who is affected, how large it is, what has changed, and what patterns repeat.
- **Design treats:** what future could exist, which solution might change behavior, how the product should work, and what experiment should happen next.
- **Data does not provide purpose.** Define what matters before optimizing. "Increase Metric X" is not a mission.
- **Data does not provide certainty.** Every metric depends on human choices: what to measure and over what time period. The same facts can support different stories if the goal or patience window changes.
- **Data does not explain why by itself.** Pair behavioral data with user research, support texture, or customer context.

Decision move: convert opinions into assumptions. Say "I am assuming..." or "My hypothesis is..." and ask: **What evidence would convince us this is wrong?** If no evidence would change the decision, admit that the team is making a values/taste call, not a data-informed one.

## Optimization vs new behavior

First classify the initiative. The decision posture changes.

| Initiative | Meaning | Best posture | Failure mode |
|---|---|---|---|
| **Optimization** | Extend or deepen behavior that already exists | Try many small ideas; use A/B tests and speed where traffic supports it | Over-arguing about details that can be tested |
| **New behavior** | Ask people to do something they do not already do | Build confidence through deep customer, market, problem, and alternative understanding | Trying to experiment your way into a compelling vision |

For optimization, curiosity and cadence matter more than conviction. For new behavior, lack of confidence is a signal that the team has not done enough homework. Probe: Do we know the target customer, their day-to-day, when the problem appears, and their next-best alternative? Can we explain why this solution should work even if the first version misses?

## Data-informed values

Use these five values when a team claims to be data-informed:

- **Purpose before numbers:** choose metrics because they represent human value, not because they are measurable.
- **Verifiable goals:** replace vague aspirations with observable outcomes and a baseline.
- **Everyone knows the numbers:** do not outsource metric fluency to analysts. Regular metric review is operational hygiene, not a panic ritual.
- **Test beliefs actively:** seek disconfirming evidence; do not use dashboards only to support intuition.
- **Accept probabilities:** imperfect evidence can still improve decision quality. Demanding certainty is often a way to avoid learning.

Cadence rule: look at core metrics every day or week, not only when something is broken. The prize is an up-to-date model of the business's actionable levers.

## Strategy is an assumption chain

Zhuo's "chains of assumptions" frame is the bridge between first principles and day-to-day work. A useful product decision always compresses a long chain: task → project success → customer value → business value → time horizon. Make the chain visible enough to test.

- **Name the target and effect.** Impact requires both: who/what is affected, and what observable effect you expect.
- **Write the links.** For a proposed task, list why doing it well should make the project succeed, why that project matters to the selected customers, why those customers matter now, and why the time horizon is right.
- **Find the weakest link.** The decision rarely hinges on the whole chain; it hinges on the assumption most likely to be false or most costly if false.
- **Use disagreement to locate assumptions.** When reasonable people prefer different options, ask what would have to be true for each option to be best.

## Quality vs time

When a team asks whether to ship something mediocre or delay for quality, ask the upstream question: **if we knew this would take this long to make high-quality, would we still have chosen to build it?**

- If no, cut it. Do not ship a worse version because the team is attached to sunk cost.
- If yes, protect the work. Cut lower-ranked items until the important thing can be done well.
- Treat recurring quality/time debates as evidence of bad prioritization, weak estimation, or execution trouble earlier in the process.

Do fewer things better, but make them the most important things.

## Operationalized product teams

The best product teams do not treat data as reporting service. They build a decision system:

- Rock-solid instrumentation and logging from the start.
- Desired outcomes mapped to clear output metrics.
- Weekly metric reviews or reports.
- Hypotheses generated from both user conversations and segmented data.
- High-velocity experiments that test which hypotheses hold.
- Data team time spent mostly on new business-driving insights, not routine query/report requests.
- Roadmaps built from those insights.

When this is missing, route to `user-research` for the human evidence, `working-with-ai` (ai-enablement) for decision/context legibility, or `shape-up` for process structure.

## Growth as blockage removal

For growth work, borrow the Brian Hale / Zhuo contrast:

- Do not optimize a funnel step in isolation; own the full user journey from first exposure to actual value.
- Do not maximize experiment count; maximize learning rate. A test only matters when it targets a real user confusion, fear, cost, or friction.
- Do not celebrate a win and move on; ask why it worked unusually well and where the same underlying blockage appears elsewhere.
- Watch relationship metrics, not only activity metrics. Power users hide the fact that new or occasional users are getting lost.

Excellent growth teams ask: **Where is the user stuck, and why?**

## Sales and customer truth

Zhuo's David Fischer interview is useful for founders and product leaders because it reframes sales as a product-learning surface:

- Know the product well enough to do the customer's job with it, not merely demo it.
- Treat the customer's problem as shared, especially when something goes wrong.
- Fish for "no" early; false hope is expensive.
- Read the organization behind the buyer: incentives, risk tolerance, procurement, decision power, and internal politics.
- Ask whether a good quarter was truly earned. Sustainable revenue comes from real customer value, not extraction.

Route go-to-market pages to `devtools` (developer-tool-gtm) or `building-in-public`; keep this skill on the decision-quality and customer-truth layer.

## AI and data trust

AI lowers the cost of producing analysis; it raises the value of deciding which analysis deserves belief. For AI-assisted data work, require:

- Canonical metric definitions and authoritative tables.
- A machine-readable log of business, instrumentation, pricing, campaign, and policy changes.
- Analyst playbooks: what to check first, which segments matter, which questions are usually noise.
- Institutional memory: prior investigations, conclusions, evidence, and what was ruled out.
- Accuracy measurement over time, with regressions inspected instead of buried under more context.

The trust gap is usually context, not raw model intelligence.

## Choose the owner by outcome, not title

Zhuo's higher-level design frame: design is intentionally trying to influence an outcome. Roles are shorthand for knowledge and skills, not ownership destiny.

Use this three-step assignment rule:

1. Define the outcome the team wants.
2. Identify the knowledge and skills needed to design well for that outcome.
3. Give solution leadership to the person or small group best qualified for those needs, regardless of whether their title is designer, PM, engineer, data scientist, or founder.

This helps avoid two traps: designers treated as production resources after the real decisions are made, and PM/engineering/design turf debates that ignore who actually understands the problem.

## Product intuition

Product intuition improves through repeated contact with reality:

- Use the product as a real customer would, with real stakes when possible.
- Constantly research the target customer.
- Study support tickets, sales calls, lost deals, analytics outliers, and competitor behavior.
- Keep a visible list of assumptions that changed after evidence.

Trust intuition most when it comes from deep study in the same domain. Distrust it when the audience does not look like the team, when the system is too large for personal experience, or when the decision is an accumulation of many tiny effects.

## Reviewing a proposal

Ask these in order:

- [ ] What user/customer problem is this solving, in a recent concrete situation?
- [ ] Is this optimization or new behavior?
- [ ] What data diagnoses the problem? What can the data not say?
- [ ] What qualitative evidence explains the why?
- [ ] What assumption, if false, would kill the idea?
- [ ] Which link in the assumption chain is weakest?
- [ ] What does success mean, by which metric/proxy, over what time window?
- [ ] What guardrail prevents optimizing the metric against the mission?
- [ ] If quality/time is in conflict, should the feature be cut or protected by cutting lower priorities?
- [ ] Who has the knowledge and skills to own the solution?
- [ ] If confidence is low, is the right next step research, prototype, smaller experiment, or a clearer strategy call?

## Relationship to other skills

- **`shape-up`** — product development systems, appetites, bets, Linear/taste-vs-data and metrics-led schools. Use this skill for the pre-bet judgment and evidence framing.
- **`user-research`** — methods for learning whether the problem is real and why it happens.
- **`design-org-influence`** — translating the product decision into stakeholder buy-in, business-case framing, and managing up.
- **`design-principles`** — high-level critique of whether the product is well-designed; this skill decides what problem and evidence the product work is anchored to.
- **`working-with-ai`** (ai-enablement / agentic-coding) — org and coding-agent mechanics. Zhuo's AI-era note here is only the management analogy: purpose, model/person fit, and verification still matter.

> **Staleness note:** sources span 2015-2026. Current AI-org predictions, social-platform details, and Sundial examples will age fastest; the product-review questions, data-informed values, optimization/new-behavior split, and outcome-before-title ownership rule are the durable layer.
