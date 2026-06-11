# Pitching design work for approval

Source: VTnT5zFjzfQ (impact framework; guests Filippos, Florian, Miranda Slater) and -dtCf1DAAKc (strategic narrative framework, four lenses). All quotes verified against auto-captions; speaker is Femke unless credited.

## Contents

- [The diagnosis: solution-first thinking](#the-diagnosis-solution-first-thinking)
- [The impact framework (6 steps)](#the-impact-framework-6-steps)
- [The strategic narrative framework — worked example](#the-strategic-narrative-framework--worked-example)
- [The four lenses for craft and design-system asks](#the-four-lenses-for-craft-and-design-system-asks)
- [No analytics? No research time? The workaround scripts](#no-analytics-no-research-time-the-workaround-scripts)
- [Credibility moves for projections](#credibility-moves-for-projections)
- [Timing windows and manufactured urgency](#timing-windows-and-manufactured-urgency)
- [The before/after transformation](#the-beforeafter-transformation)
- [The credibility ladder (Miranda Slater)](#the-credibility-ladder-miranda-slater)

## The diagnosis: solution-first thinking

What usually happens when ideas get shot down: "You fall in love with a solution before understanding the business problem. You present features instead of outcomes. You focus on what the design does, not what it achieves. You assume everyone sees the same problems that you see." Femke calls this solution-first thinking, "and it is killing your influence as a designer." The fix: "think business first and design second."

## The impact framework (6 steps)

### 1. Identify the business problem first

Before showing a single mockup: *What business problem are we solving?* "Not user problems, not design problems, but business problems."

- Bad: "This checkout flow has usability issues."
- Good: "Our checkout abandonment rate is 68%, costing us $2.3 million annually."

"User problems and business problems aren't always the same thing" — users may want feature A while the business needs feature B because it drives more revenue. Homework before designing: interview key stakeholders about their biggest challenges; read quarterly goals/OKRs/metrics; identify where performance falls short; find the gap. Pro tip: "If you can't clearly articulate the business problem in one sentence, you're probably not ready to design just yet."

### 2. Connect design to metrics leadership cares about

Filippos (product design leader): "How do you connect your design decisions to business impact? … If you make that connection and you bring back every conversation to that connection, then you can be someone that is extremely valuable to the business." His phrasing in practice: "our initiatives drove this much conversion rate… this initiative that we had about rethinking that entire flow led to us making double the money… or this kept us from losing customers in month three." And: the only way to learn the connection is to "speak to your stakeholders and really get to understand what's important for them."

- Don't say: "We conducted user interviews and followed design thinking."
- Say: "Customer interviews with 25 users revealed the key barrier to conversion, leading to a 23% increase in signups."

"If your company's goal is growth, show how your design increases conversion or reduces churn. If it's efficiency, show how it saves time or reduces support tickets. Your design brief should read like a business case, not a creative brief."

### 3. Present with data — three layers of evidence

"Stakeholders make decisions based on evidence, not aesthetics."

1. **Quantitative foundation** — current-state metrics (where are we failing?), industry benchmarks (how do we compare?), historical performance (trends).
2. **Qualitative insights** — research findings explaining the *why* behind the numbers, support feedback and pain points, usability test results validating the approach.
3. **Design solution** — mockups/prototypes, projected impact based on similar changes, success metrics you'll track post-launch.

The 5-slide skeleton of a data-packed pitch:

1. "Our mobile conversion rate is 40% below desktop."
2. "Users abandon at step three of the checkout, and here's why" (user quotes).
3. "Competitors solve this with a simplified form" (benchmark data).
4. "Our solution addresses the top three friction points."
5. "Expected outcome: 25% increase in mobile conversion."

Story shape: problem → evidence → solution → expected outcome. "Data transforms opinions into facts. And facts get budgets approved."

### 4. Anticipate objections; understand motivations

See [objections.md](objections.md) — ask what the stakeholder's goal/responsibility is before defending the design. Quick map: "this will take too long" → phased rollout plan; "users won't understand this" → usability test results; "it's too risky" → A/B testing approach.

### 5. Create a clear implementation plan

"Here is where most designers lose credibility. They present amazing solutions with zero thought about execution. Stakeholders immediately think, 'This person doesn't understand how business works.'" Answer:

- **Resources & timeline** — weeks, eng effort (get estimates from engineering), external dependencies (legal, third-party), realistic timeline with buffer.
- **Phased rollout** — smaller milestones; "What's the MVP version that delivers 80% of the value?"; de-risk with gradual rollouts. Worked example — instead of "redesign the entire checkout flow": Phase 1, simplify form fields (2 weeks, low risk) · Phase 2, add a progress indicator (1 week, medium impact) · Phase 3, implement guest checkout (4 weeks, high impact).
- **Success metrics** — specific KPIs, measurement window post-launch, rollback plan if metrics don't improve.

(Related framing from her Figma walkthroughs, uQLAUq4TstI: show MVP *and* future vision side by side — it pre-answers "why not X?" and steers the MVP choice toward the version that builds toward the vision instead of creating design/tech debt.)

### 6. Time the pitch strategically

See [Timing windows](#timing-windows-and-manufactured-urgency) below.

## The strategic narrative framework — worked example

From -dtCf1DAAKc. Four parts: **problem context → your insight → design solution → expected impact.** Worked example (onboarding redesign), with all numbers:

1. **Problem context**: "Our onboarding completion rate is 45%, which means we're losing over half of new sign-ups before they experience the core product value. At our current sign-up volume of around 2,000 users a month, that's 1,100 potential customers dropping off. And based on our LTV, that's approximately $220,000 in lost annual revenue."
2. **Your insight**: "I analyzed the drop-off points and ran user interviews with 15 people who abandoned onboarding. The issue isn't that the steps are too complicated, it's that users don't understand why we're asking for certain information. The moment they hit our integration setup screen, 60% of them bail."
3. **Design solution**: show the value unlocked at each step — instead of "connect your tools," "connect Slack to get real-time notifications when deals close"; progressive onboarding (skip non-essential integrations), reducing initial commitment "from seven steps to three."
4. **Expected impact**: "Based on similar patterns I've seen in A/B tests from comparable products, reducing friction at this stage typically improves completion rates by 20 to 30%. If we hit the low end, that takes us from 45 to 54% completion, and an additional 180 activated users per month, or roughly $36,000 in recovered annual revenue."

"You're not changing your design process. You're changing how you talk about the outcomes." Quantify where you can, "be directional when you can't."

## The four lenses for craft and design-system asks

Context (-dtCf1DAAKc): a design lead ("Alex") couldn't get buy-in for design-system investment — "We need to make our UI more polished" — and his CTO kept answering "that's an opportunity cost." Translation: every engineer-hour on UI read as an hour not spent shipping revenue features. Reframe through four lenses:

1. **Customer impact** — tie experience to business outcomes: "our inconsistent UI is causing confusion during onboarding… If we standardize the navigation patterns, we can reduce time to first value and improve activation rates."
2. **Company goals** — "We're targeting 30% growth in new customers this quarter. Our current UI is creating friction in the sign-up flow that's costing us conversions. This work directly supports that growth target."
3. **Team efficiency** — quantify time saved: "engineers are rebuilding the same components from scratch on every project, which adds two to three days per feature. If we build these components once… we'll ship features 30% faster going forward. That's not opportunity cost, that's opportunity creation."
4. **Tech debt & timing** — the case for now vs later: company is "only 65 people today. If we don't standardize now, we'll be maintaining three different navigation patterns across 10 teams in the next six months. And the cost of fixing this scales with the company size. So, this is the cheapest it will ever be to do this work."

The key move on top: **bring engineering allies into the conversation** — "it wasn't just Alex advocating alone, it was Alex plus engineers who also saw the value presenting a unified case to leadership." When competing for roadmap space, "design craft without this kind of business context loses every single time."

Adaptation: if your PM "cares less about revenue numbers and more about team velocity and reducing tech debt — adjust your framing accordingly."

## No analytics? No research time? The workaround scripts

- **No metric access**: go to whoever owns the metrics — "I want to understand our onboarding performance so I can identify design improvements." If they won't share numbers, paint the picture anyway: "I've been watching support tickets and talking to customer success. We're losing a significant number of users in onboarding before they see product value. Can we prioritize understanding why?"
- **No time for 15 interviews**: start smaller — talk to 3–5 users, check support tickets, read app-store reviews, "grab your customer success team for just 20 minutes and ask them, 'What are you hearing?'" Then pitch: "I've talked to a handful of users and reviewed support tickets, and here's the pattern I'm seeing. If we want to validate this further, I can run a more comprehensive study, but the early signal is strong enough that we should consider addressing this." You're "building a case for the research itself while showing you've already done the leg work."
- **Exploratory work with no benchmarks**: frame as risk reduction — "before we commit engineering resources to building X, let's spend 2 weeks validating the core assumptions. The cost of getting this wrong is 3 months of wasted eng time."

## Credibility moves for projections

How to keep projected numbers from sounding made up:

- **Reference comparable products**: "this competitor published a case study showing that simplifying their onboarding improved completion by 25%."
- **Use industry benchmarks**: "The average SaaS onboarding completion rate is around 60%, so we're underperforming the benchmark by 15 points."
- **Acknowledge uncertainty**: "I can't guarantee exactly 20%, but directionally we know that reducing steps and adding clarity improves conversion. The worst case is we learn something. The best case is we recover significant revenue."
- **Propose a test**: "Let's ship this to 20% of users and measure the impact. If it doesn't move the needle, we'll iterate."

"The goal isn't to be perfectly right. It's to be credible enough that stakeholders see this as a smart bet."

## Timing windows and manufactured urgency

"The same idea can get approved or rejected based purely on when you present it."

- **Budget/planning cycles** — quarterly planning when budgets are allocated; annual goal-setting; right before roadmap planning.
- **Market pressure** — "after a competitor launches something similar"; industry reports highlighting the trend; churn or negative-feedback spikes.
- **Internal catalysts** — metrics particularly bad right now; research just revealed critical insights; support escalations.

The advanced move — create urgency when timing isn't naturally perfect: "If we don't address this by Q2, we'll miss our annual targets." · "Our biggest competitor just launched this. We need to respond." · "This aligns perfectly with the company's new focus on retention."

Bad timing: "Here's a nice improvement we should probably make someday." Good timing: "This addresses the top customer complaint from last month's NPS survey, and implementing it before our next product review would demonstrate our commitment to user experience." — "Smart designers don't just wait for the perfect timing, they create it."

## The before/after transformation

- **Before**: "I redesigned our mobile app because the current design looks outdated and users are confused by the navigation."
- **After**: "Mobile app engagement dropped 23% this quarter, while our competitors grew 15%. User interviews revealed 67% of users can't find features within 30 seconds. This redesign addresses the three biggest navigation pain points and is projected to increase screen time by 40% and feature discovery by 60%. Here's the six-week rollout plan."

"Same design, completely different reception."

## The credibility ladder (Miranda Slater)

"You have to prove that you actually can contribute value to the planning road map… every single time you present a design, you have to help people understand what business value it adds." It can't be "this will make our users happy" — it has to be the impact you anticipate. The progression:

1. **Master the language** — drop UX jargon, speak in business metrics ("If you always come in with UX jargon, you're setting that barrier for yourself").
2. **Find small wins** — a usability test for one feature often surfaces broader insights (users struggled with the step before/after); turn them into a proposal: "I found these additional problems that could exponentially increase our conversion if we address them."
3. **Build credibility gradually** — small design explorations tied back to business impact; show the wins.
4. **Then ask for your seat at the table** — "I know planning's coming up. Can I be included to add more design exploration and give you more confidence behind the product decisions we're making?"

"You have to prove your value before they'll even consider including you in strategic conversations."
