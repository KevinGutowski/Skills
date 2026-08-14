# 37signals Manager Playbook source mining — 2026-08

Source: **https://basecamp.com/managers** — *The 37signals Manager Playbook*, a public web book of 16 chapters (~15k words), fetched 2026-08-13 with `curl` and normalized to plain text locally (working files kept outside the repo; only the bibliography and verified quotes are committed).

## Verdict

Density **HIGH** for `people-management`. **No new top-level skill.** The task shape — running direct reports — is already owned, and the taxonomy rule is extend-before-create. What the source adds is the layer the existing book corpus (Scott/Zhuo/Hogan) is thinnest on: a *working operating manual* from one company, with a named assessment model, a fixed review calendar, escalation boundaries around leave/complaints/pay, and literal conversation scripts. Two new references were created inside `people-management` because no existing reference owned those task shapes.

Context to keep attached to the material (from the text itself): a small software company working in project cycles, with benchmarked flat pay per role/level, no merit raises or incentive pay, a small central People Ops team, an L1–L5 ladder per job function, and hires expected to operate as "managers of one." Policy specifics are that company's settings; mechanisms are portable.

## Source manifest — all 17 pages read

| Page | Read | Density | Fold |
|---|---|---|---|
| `/managers` (index) | ✅ | Low | Structure only: four sections, 16 chapters. |
| 1. Fundamental Resources | ✅ | Skip | Internal links (handbook, progression frameworks, Jotform review forms, org chart, past job ads). Only durable idea — one progression framework per job function, each expressing Skills/Engagement/Coachability per level — folded with ch. 6. |
| 2. Manager Standard of Excellence | ✅ | High | SEC applied to the manager → `performance-cadence.md` (manager's own standard). |
| 3. Boundaries of Managerial Authority | ✅ | High | PTO/leave, complaints, comp, profit share → new `authority-and-escalation.md`. |
| 4. Hiring a New Teammate | ✅ | High | Open-call process + take-home exercise design → `hiring-and-firing.md`. |
| 5. Onboarding & Expectations of New Managers | ✅ | High | First-year ramp curriculum → `performance-cadence.md`. |
| 6. Performance Management Model | ✅ | High | SEC model, HIGH/MID/LOW scans, escalation patterns → `performance-cadence.md`, SKILL.md. |
| 7. Performance Reviews | ✅ | High | Review calendar, what you weigh, peer-question design, goal split, storage, AI review prep → `performance-cadence.md`. |
| 8. Giving Feedback | ✅ | High | Approach/tactics/engagement surfaces, ❌/✅ pairs, micromanagement boundary → `feedback-and-guidance.md`. |
| 9. Upholding Standards, Underperformance & Terminations | ✅ | High | Escalation order, correction plan, recovery + graduation, authority switch → `hiring-and-firing.md`, `authority-and-escalation.md`. |
| 10. Navigating Difficult Conversations | ✅ | High | Prep rules, five talking points, follow-up questions, termination script → `hiring-and-firing.md`. |
| 11. Getting the Most Out of 1:1s | ✅ | Medium-high | Cadence, shared agenda, judgment question, documentation → `meetings-and-comms.md` + SKILL.md pointer. |
| 12. Coaching Your Report | ✅ | High | Directive / non-directive / situational → `growth-and-careers.md`. |
| 13. Employee Recognition | ✅ | Medium-high | Values-aligned recognition, 3-part template, channels → `growth-and-careers.md`. |
| 14. Promoting Your Report | ✅ | High | Performance gate + business gate, pitch, no-timeline rule, AI level-diff → `growth-and-careers.md`; decider's-view note → `design-org-influence`. |
| 15. Multiplier Managers | ✅ | High | Why the cadence compounds (retention, quality, scale, risk, culture) → `performance-cadence.md`, SKILL.md. |
| 16. Conclusion | ✅ | Low | One durable line (clarity of expectations · consistency of process · courage in communication) — used as framing, not folded as a rule. |

## Fold map

**`people-management` — new references**

- `references/performance-cadence.md` — why a cadence compounds · SEC model · scans and escalation patterns · the review calendar (3/6/12 + retain decision, 2-year progression, annual) · first-year ramp curriculum · cycle reviews · what you weigh when writing a review · designed peer-feedback questions · attainable vs stretch goals · two-place documentation · the manager's own SEC standard · AI as a bounded prep lens.
- `references/authority-and-escalation.md` — the boundary map · time off (inform, not request) · leave programs (escalate, never advise) · complaints hard stop and script · compensation/profit share · your own capacity as a boundary · a 10-item escalation-trigger checklist.

**`people-management` — extended**

- `SKILL.md` — new "The operating cadence" router section, source line, two new reference links, 1:1 cadence pointer, three checklist items, description updated (447 chars) to carry `performance review`, `promote my report`, and `escalate to HR` triggers.
- `references/feedback-and-guidance.md` — "Three surfaces: approach, tactics, engagement," incl. the micromanagement boundary and three ❌/✅ pairs.
- `references/growth-and-careers.md` — directive/non-directive/situational coaching; promotion decision (two gates, pitch, no-timeline); recognition mechanics.
- `references/hiring-and-firing.md` — open-call hiring; take-home exercise design; the underperformance path step by step; recovery and graduation; prep rules and both conversation scripts.
- `references/meetings-and-comms.md` — 1:1 cadence, shared agenda mechanics, judgment question, what to document.
- `references/sources.md`, `references/coverage-gaps.md` — source entry with context caveat; AI gap partially resolved with named limits; new single-company-policy gap.

**Other skills**

- `design-org-influence/references/promotion-and-reviews.md` — "What the decider is actually weighing": the two gates and why timelines stay vague, aimed at the person *building* their own case (the mirror of the people-management fold).

**Considered and skipped** (logged so nobody re-screens):

- `shape-up` — the playbook ties manager check-ins to cycle boundaries and mentions scope hammering/judo, but adds nothing about shaping, appetite, or betting. The cycle-boundary review is a management mechanism, not a product one; it stayed in `performance-cadence.md`.
- `working-with-ai` — the four sanctioned AI uses are all "critique the draft I already made, don't write my lines." Real, but inseparable here from HR-sensitive context (identifiable employee data, bias in assessments), so it stayed in `people-management` under the coverage-gap limits rather than becoming general agent guidance.
- `learning-experience-design` — the onboarding curriculum is a list of topics, not a teaching method; the existing skill already owns curriculum design.
- Chapter 1's internal tool links, BambooHR/Jotform/Basecamp-specific mechanics, dollar figures, and this company's leave/comp policy numbers — kept only where they illustrate a mechanism, always labeled as one org's settings.

## Source-to-rule map

| Reusable rule | Chapter |
|---|---|
| One performance vocabulary (SEC) reused for leveling, reviews, coaching, and underperformance. | 6 |
| Two lows on a quick three-axis scan is an escalation, however high the third. | 6 |
| Year one gets a fixed 3/6/12 calendar ending in a named, dated retain decision at an enthusiasm bar. | 7 |
| Look back at every cycle boundary, say you're doing it, and say what you found. | 9 |
| Reviews cite artifacts; peer input comes from 2–3 designed questions, summarized and anonymized. | 7 |
| Goals split into attainable (≥2) and stretch (1–2, explicitly not load-bearing). | 7 |
| Don't correct an approach that is merely different from yours; intervene when it harms quality, process, or morale. | 8 |
| Feedback on engagement targets behavior with examples, and stops at the therapy line. | 8 |
| Choose the coaching mode deliberately: directive only for skill gaps, urgency, or one right answer. | 12 |
| Recognition names the achievement and its impact, and is tied to stated team/company values. | 13 |
| Promotion needs a sustained performance case *and* a business case; never promise a timeline. | 14 |
| Escalate leave, complaints, pay, and severe performance lapses before advising the report. | 3, 9 |
| Hand off performance management before it degrades your own core work. | 9 |
| Termination call: five sentences, under five minutes, then stop talking. | 10 |
| AI critiques your documented work; it never writes the script or sets the bar. | 7, 8, 10, 14 |

## Quote verification

114 quotes verified with `scripts/verify_quotes.py` against the locally normalized chapter texts (four batches: 30/30, 29/29, 30/30, 25/25, plus 8/8 short-phrase recheck). Zero misses shipped. Utterances that are illustrative rather than quoted from the source were converted to italics so quotation marks in this corpus continue to mean "verified source text."

## Routing probes

| Prompt | Expected first route | Why |
|---|---|---|
| "My report's 6-month review is due and I don't know what to write." | `people-management` → performance-cadence | Review-writing method and evidence bar. |
| "An employee told me they're being harassed by a teammate." | `people-management` → authority-and-escalation | Hard stop + escalation script. |
| "My report asked whether they qualify for disability leave." | `people-management` → authority-and-escalation | Route, don't advise. |
| "Should I promote my senior designer to lead?" | `people-management` → growth-and-careers | Decider's two gates. |
| "I want to make a case for my own promotion to lead." | `design-org-influence` | Own promotion stays there (with the new decider's-view note). |
| "How do I run the termination call tomorrow?" | `people-management` → hiring-and-firing | Script + prep rules. |
| "My report keeps solving things the wrong way — should I tell them how I'd do it?" | `people-management` → feedback-and-guidance + growth-and-careers | Micromanagement boundary, then coaching mode. |
| "Shape this feature into a six-week bet." | `shape-up` (control) | Cycle language must not pull management routing. |
| "Design an onboarding flow for new users of our app." | `user-onboarding` (control) | Employee onboarding must not capture product onboarding. |

Deterministic fixtures and the description/boundary review are committed; no fresh-agent routing judge was run in this change because the active collaboration policy did not authorize subagents.

## Validation

`validate_all.py`, `check_xrefs.py`, `check_reference_hygiene.py`, `check_vercel_overhaul.py` (description cap 450 — people-management now 447), `check_vercel_routing_probes.py`, `check_skill_smoke_tests.py`, `check_application_fixtures.py`, and `git diff --check` all pass. No skill count change, so smoke-test and audit-matrix fixtures were untouched.
