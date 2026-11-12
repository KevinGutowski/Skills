# Product Decision Making Coverage Gaps

Use this file to park candidate product-decision standards before they become reusable agent guidance.

When a product decision should become reusable agent guidance, keep it in candidate form until the evidence is stable: audience, problem, decision, rationale, source, exceptions, and what would falsify it. Route skill packaging or lint/eval mechanics to `creating-skills`; keep the product judgment in `product-decision-making`.

## Candidate Gaps

- **Proposal-review exemplars.** `worked-proposal-review.md` now holds one illustrative review of an invented proposal. Still missing: accepted reviews of real proposals, and a weak-vs-strong pair tied to recent evidence.
- **Decision-to-agent-rule promotion.** The Vercel pattern needs a repeatable way to decide when a product decision becomes skill guidance, a lint/eval, an exemplar, or no change. The candidate standard is stated at the top of this file, but concrete examples are still missing.
- **Metric guardrail examples.** The skill says metrics are proxies and need guardrails; it needs examples where optimizing a metric harmed the product goal.
- **AI data-trust evals.** The AI/data trust section describes canonical context and accuracy measurement, but does not yet include sample eval fixtures or review packets.
- **Ownership decisions.** The title-independent ownership rule is useful, but needs examples of designer/PM/engineer/data-owner assignment by outcome and required knowledge.

## Promotion Form

```markdown
decision/{stable-id}
Status: proposed | accepted | rejected
Problem:
Audience:
Decision:
Evidence:
Assumptions:
Falsifier:
Metric / guardrail:
Owner:
Exceptions:
Bad example:
Good example:
Approver:
```
