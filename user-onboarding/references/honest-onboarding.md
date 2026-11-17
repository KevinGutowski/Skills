# Honest Onboarding (Dark-Pattern Boundary)

Read this when an onboarding goal depends on hiding cost, commitment, consent, or cancellation, or when a growth request ("raise trial-to-paid", "cut cancellations", "get more permissions granted") could be met by tricking the user. It is a boundary check, not a conversion playbook.

## Definition

"A UX dark pattern is any interface element that is designed to benefit the company at the expense of doing something a reasonable user would not agree to if they were fully informed." (Laura Klein, *Build Better Products*, ch. 8)

**Test:** would the user still take this step if the screen told them everything the team knows about cost, commitment, data use, and how to leave? If not, the step is the problem. Fix the offer or the product, not the wording.

## What this skill's sources already say

| Rule | Source |
|---|---|
| Do not use gamification as manipulation. Tricks that advance people through an irrelevant funnel are not sustainable; people are motivated by real improvement. | Hulick (see `driving-momentum.md`, Social Proof Inside the Product) |
| If motivation is real but urgency is not, do not force a trial or signup. Offer a lower-commitment step first. | `selling-the-dream.md` |
| For any personal-data field, explain why you ask and what you will do with the answer; make it optional and editable. | Metts & Welfle, *Writing Is Designing*, ch. 5 |
| Explain the ask before the user pays the cost; make non-essential integrations skippable and defer setup until after the quick win. | Sten, *Products People Actually Want* |
| Sequence trust from low stakes to high; never ask for the high-stakes commitment first. | Jude, Config 2025 (Universal Rule 10) |
| The value should be self-evident before purchase. A trial-expiring email feels desperate when the earlier emails have not done their job. | Hulick (see `driving-momentum.md`, Lifecycle Emails) |

## General-practice checklist

These items are **general practice, not drawn from this skill's sources**. They name the common failure shapes so a review can check for them. Consumer-protection and privacy law covers several of them and varies by jurisdiction; this checklist is not legal advice, so flag legal questions to the team's counsel.

| Area | Honest version | Dark-pattern version |
|---|---|---|
| Consent | Asked in context, in plain words, with a real "no" that leaves the product usable where possible. Each purpose asked separately. | Bundled consent, pre-ticked boxes, consent buried in a wall of terms, or re-asking until the user gives in. |
| Honest defaults | Defaults serve the user's likely intent and are stated. Paid add-ons, marketing email, and data sharing start off. | Defaults that favour the company (pre-selected upsells, sharing on by default) and rely on the user not noticing. |
| Forced continuity | Trial terms, the charge date, and the amount are shown before a card is taken; a reminder is sent before the first charge. | A "free" trial that converts silently, or a card required with the charge terms hidden. |
| Exit symmetry | Cancelling, downgrading, or deleting takes about as many steps, in the same channel, as signing up did. | Sign up in one click online; cancel by phone, through a maze of screens, or after repeated retention offers. |
| Confirmshaming | Decline options are neutral: "No thanks", "Skip for now". | Decline copy that shames the user ("No, I don't want to grow my business"). |
| Urgency and scarcity | Deadlines and limits shown only when true. | Fake countdowns, fake stock or seat limits, invented "others are viewing" signals. |
| Visual weight | The decline or skip path is visible and readable, even when secondary. | Skip links hidden, greyed out to look disabled, or styled as body text. |

## How to respond

1. Name the pattern and who it costs.
2. Offer the honest version that still serves the legitimate goal (clearer value before the ask, a smaller first commitment, a reminder before charge).
3. If the goal can only be met by the dark-pattern version, say so plainly and decline to optimize it. The metric is measuring the trick, not the product.

Copy for the honest version (neutral decline labels, plain consent wording) is written in the product voice; see `ux-writing`.
