# Worked Proposal Review

Read this before reviewing a product proposal, to see the "Reviewing a proposal" checklist in SKILL.md applied in order and the shape of the review to return.

**This is an illustrative worked example written for this reference.** The company, proposal, numbers, and customer quotes are invented. Nothing here is from Julie Zhuo, Anton Sten, or any other source, and it should not be cited as evidence. The method is the one in SKILL.md.

## Contents

- The proposal as submitted
- The review
  - Verdict
  - The three product-review questions
  - Checklist pass
  - Assumption chain
  - What to do next
- Why the review looks like this
- Review output template

## The proposal as submitted

> **Proposal: AI Weekly Digest for Tallybook**
>
> Tallybook is invoicing software for freelancers and small studios (about 38,000 active accounts).
>
> **Problem.** Engagement is down. Weekly active accounts fell from 61% to 54% over two quarters. Users only open Tallybook when they need to send an invoice.
>
> **Solution.** An AI-generated weekly email digest: income this week, outstanding invoices, a "cash-flow insight", and tips. Each item links back into the app.
>
> **Evidence.** Competitors Ledgerly and Pennant both launched AI summaries this year. In our last survey, 72% of users said they would find "insights about my business" useful.
>
> **Success metric.** Weekly active accounts back above 60% within one quarter of launch.
>
> **Cost.** One designer, two engineers, one cycle. LLM costs estimated at $0.004 per digest.
>
> **Ask.** Approve for next cycle.

## The review

### Verdict

**Not ready for a build decision.** The proposal names a company metric, not a user problem, and the evidence does not show that the problem is real. One week of diagnosis will show whether there is a problem here worth a cycle. A candidate problem is already visible in the data (late payment), and it may deserve the cycle more than the digest does.

### The three product-review questions

| Question | What the proposal says | Assessment |
|---|---|---|
| 1. What people's problem are we solving? | "Engagement is down." | **Weak.** That is Tallybook's problem. No audience, situation, pain, or current alternative is named. A freelancer who opens the app only to invoice may be getting exactly what they came for. |
| 2. How do we know this is a real problem? | Competitor launches; 72% say insights would be "useful". | **Weak.** Competitor activity is not evidence of user pain. A survey answer about hypothetical usefulness is not behaviour. No customer story, support ticket, or usage pattern is cited. |
| 3. How will we know if we've solved it? | Weekly active accounts above 60% in a quarter. | **Weak.** An email that links into the app raises weekly actives whether or not anyone is better off. The metric measures the feature's own clicks. |

All three answers are weak, so the solution debate does not open yet. The checklist below is run to show what is missing and what to gather.

### Checklist pass

| Checklist item | Finding |
|---|---|
| User problem, in a recent concrete situation | Missing. The closest signal is in the support queue, not the proposal: tickets about chasing late payments have risen. A concrete situation would read: "A studio owner sent a $4,200 invoice 40 days ago, has no reminder set, and finds out it is unpaid when rent is due." |
| Business problem, in business language | Partly stated. The drop in weekly actives matters only if it predicts churn or lower paid conversion. The proposal does not show that link. Ask: do accounts that go from weekly to monthly use churn more, or are they seasonal invoicers who retain fine? |
| Technical or operational reality | Understated. Per-digest cost is small, but a wrong "cash-flow insight" about someone's income is a trust and support cost. Needs: accuracy checks on generated figures, unsubscribe and frequency handling, email deliverability, and an owner after launch. |
| Whole journey or only the visible screen | Only the email. Where does a link land? If "3 invoices overdue" leads to a list with no next action, the digest adds a notification without resolving anything. |
| Optimization or new behaviour | **New behaviour.** Users do not read a weekly business summary from Tallybook today. That calls for confidence from customer and problem understanding before building, not an experiment-your-way-there approach. The proposal treats it as an optimization. |
| What the data diagnoses, and what it cannot say | Data says weekly actives fell seven points. It does not say who (new or tenured accounts, solo or studio), when (after the March pricing change? seasonally?), or whether it matters. Segment before interpreting. |
| Qualitative evidence for the why | None. Needs 6 to 8 conversations with accounts whose usage dropped, and a read of recent cancellation reasons. |
| Assumption that would kill the idea if false | "Users want to hear from Tallybook weekly when they have nothing to invoice." If false, the digest becomes unsubscribes and spam complaints. |
| Weakest link in the assumption chain | Weekly opens lead to retention. See the chain below. |
| Success metric, proxy, and time window | Replace weekly actives. Candidates tied to user value: days-to-paid on invoices, share of overdue invoices followed up within 7 days, 90-day retention of the affected segment. State a baseline and a window for each. |
| Guardrail | Email unsubscribe rate, spam complaints, support tickets about incorrect figures. If weekly actives rise while days-to-paid and retention do not move, the feature has optimized the metric against the mission. |
| Quality versus time | Not yet in conflict. Flag for later: if accurate figures need a second cycle, ask whether the digest would have been chosen at that cost. |
| Who should own the solution | If the problem turns out to be late payment, the person who knows payment behaviour and reminders best (here, the engineer who built reminders plus the support lead), not whoever proposed the digest. |
| Next step when confidence is low | Research and a smaller experiment, below. Not a build. |

### Assumption chain

Target and effect as proposed: freelancers on Tallybook (target) open the app weekly (effect).

1. Users will open a weekly digest. *Plausible for a few weeks; unknown after.*
2. Opening it leads them into the app. *Plausible; links guarantee some of it.*
3. Being in the app weekly means they get more value. *Unsupported.*
4. More value weekly means they retain and convert at a higher rate. **Weakest link.** *No evidence that the drop in weekly use predicts churn.*
5. Retention in this segment matters now more than other bets. *Not argued.*

What would convince us the proposal is right: churn is measurably higher among accounts whose use fell, and interviews show those users wanted information they did not have. What would convince us it is wrong: those accounts retain normally, or their stated pain is getting paid, not lacking a summary.

### What to do next

1. **Segment the drop** (2 days, data). By tenure, plan, account size, and the March pricing change. Check whether the affected accounts churn more.
2. **Talk to 6 to 8 affected accounts and read cancellation reasons** (1 week; method in `user-research`). Ask about the last time they opened Tallybook and what they were trying to get done.
3. **Size the late-payment signal.** Share of invoices overdue beyond 30 days, how many have reminders on, ticket volume.
4. **If the late-payment problem holds up, run the smaller experiment first:** a plain overdue-invoice nudge with a one-tap reminder, sent to a sample for four weeks. Measure days-to-paid, with unsubscribes as the guardrail. No generated text is needed to learn this.
5. **Return with a rewritten proposal** that answers the three questions. If it still argues for a digest, it should say why a summary is the right treatment for the diagnosed problem. Shape the bet in `shape-up` once the problem is settled.

## Why the review looks like this

- **It does not argue about the solution.** Whether the digest should be AI-written, weekly, or an email is left alone until the problem holds.
- **It separates diagnosis from treatment.** The data shows a drop; it does not explain it or supply a purpose.
- **It classifies the initiative** and applies the matching posture. That one step changes the recommendation from "ship and test" to "do the homework".
- **It names the falsifier**, so the team knows what result would end the idea.
- **It leaves with a next step sized to the uncertainty**, not a yes or no.

## Review output template

```markdown
### Verdict
[Ready / not ready for a build decision, in one or two sentences, with the main reason]

### The three product-review questions
| Question | What the proposal says | Assessment |

### Checklist pass
| Checklist item | Finding |
[SKILL.md "Reviewing a proposal" items, in order; say "missing" where the proposal is silent]

### Assumption chain
[Target and effect; numbered links; weakest link marked; what would prove it right or wrong]

### What to do next
[Research, prototype, smaller experiment, or strategy call, with owner and time box]
```
