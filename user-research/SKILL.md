---
name: user-research
description: "Plan and run user research — pick the method for the question, conduct field interviews, recruit and screen participants, validate ideas behaviorally, synthesize findings into decisions. Use when writing a research plan/screener/field guide, prepping or debriefing interviews, or choosing among interviews, diary studies, usability/A/B/tree tests. Prototype sessions → design-prototyping; selling research → design-org-influence. Based on Hall, Portigal, Sharon. Triggers: user research, user interviews, screener, field guide, validate idea, persona."
---

# User Research

Three-book synthesis: Erika Hall, *Just Enough Research* (2nd ed., A Book Apart, 2019) — scoping, rigor, bias; Steve Portigal, *Interviewing Users* (Rosenfeld Media, 2013) — interview craft; Tomer Sharon, *Validating Product Ideas* (Rosenfeld Media, 2016) — lean method selection and behavioral validation. Plus Dive Club interview field notes (Ron Goldin, UkQpgslyR3A; Polly D'Arcy, vdYBohOQYm0) — the empathy-transfer and dogfooding notes in §5.

**References (read the one that matches the task):**
- `references/method-selection.md` — Sharon's question→method playbooks: experience sampling, diary studies, concierge MVP, fake doors, A/B rules, tree/first-click/lostness, surveys, metrics
- `references/interviewing-craft.md` — Portigal in depth: worldview, rapport, seven stages, question palette, silence, anti-patterns, troubleshooting, second-chair guide
- `references/study-logistics.md` — plans, stakeholder interviews, screeners, recruiting, field guides, scheduling, consent/releases, equipment, roles
- `references/synthesis-and-impact.md` — debriefs, topline, affinity/KJ, storytelling, rainbow spreadsheet, prioritizing changes, research-as-leadership
- `references/research-fundamentals.md` — Hall: just-enough scoping, research types, bias catalog, assumptions-as-risk, personas, surveys/analytics warnings, maxims

## 1. Start from the question, not the method

"What you need to find out determines the type of research you need to conduct. It's that simple." (Hall). Sharon organizes everything around the need / want / usable trichotomy: **What do people need? What do people want? Can people use the thing?**

| Your question | Primary method (Sharon) | N | When |
|---|---|---|---|
| What do people need? | Experience sampling | ~100 people, 500–1,000 data points | Strategy; before building |
| Who are the users? | Interviews → personas (KJ analysis) | 10 interviewees | Strategy |
| How do people currently solve the problem? | Field observation | 8 participants | Strategy/discovery |
| What is the user's workflow? | Diary study (end with interviews) | 8 participants | Discovery |
| Do people want the product? | Concierge MVP / fake doors | ~5 (concierge); traffic (fake doors) | Before building |
| Can people use the product? | Online usability testing | 5 (qual) or 500 (quant) | Any design artifact |
| Which design generates better results? | A/B testing | Live traffic, ≥7 days | Live product |
| How do people find stuff? | Tree test + first-click + lostness | ~500 | IA, pre-code onward |
| How do I find participants? | Criteria → benchmarks → masked screener via social media | — | Always; start now |

Hall's typology for placing any question: **generative** ("What's up with…?"), **descriptive** ("What and how?"), **evaluative** ("Are we getting close?"), **causal** ("Why is this happening?"). Details → `references/method-selection.md` and `research-fundamentals.md`.

## 2. Consensus doctrine — where all three books agree

1. **You are not your user.** "Assumptions Are Insults" (Hall). Design targets come from research, not from the team's reflection.
2. **Behavior over attitude.** Explore "people's current behavior, which is the best predictor of future behavior" (Sharon). Hall: "never ask anyone what they want."
3. **Recent and specific beats averaged.** "What was the last movie you streamed?" not "What movies do you stream?" (Portigal). Sharon: ask about *the last time*; averaging invites rationalization.
4. **Research questions ≠ interview questions.** "The most significant source of confusion in design research is the difference between research questions and interview questions" (Hall). You design the latter to answer the former.
5. **Surface assumptions first.** Portigal's Brain Dump, Sharon's "bullshit persona," Hall's risk-ranked assumption inventory — externalize what the team believes before fieldwork.
6. **Silence is a tool.** "People speak in paragraphs, and they want your permission to go on to the next paragraph" (Portigal). Hall: "Allow pauses to let the story through."
7. **Use their language.** Mirror the participant's words — even mispronunciations (Portigal's TiVo story: "it was right to be wrong").
8. **Never test, pitch, or correct.** "Don't Make Your Questions Pass/Fail" (Portigal); present concepts neutrally; do the Interviewer Sidestep on questions turned back at you.
9. **Pilot everything** — screeners, experience-sampling questions, usability tasks, surveys. "A bad survey won't tell you it's bad" (Hall).
10. **Recruiting is the bottleneck and is itself data.** "Recruiting is data" (Portigal). "Recruiting participants is the greatest bottleneck of user research. Start as soon as you can" (Sharon). Hall: "always be recruiting."
11. **Synthesis is a team activity.** Affinity walls / KJ with the whole team beat any circulated report (all three).
12. **Bring colleagues to the field.** "The most impact for the least effort comes from your colleagues joining you in the field" (Portigal). Hall: shared understanding doesn't transfer by report.

## 3. Minimum viable study

- **One-page plan** (Sharon): Background · Goals · Research questions · Methodology · Participants · Schedule. Hall's problem statement discipline: use outcome verbs ("describe," "evaluate," "identify") — never "understand" or "explore."
- **Recruiting pipeline** (Sharon): criteria → measurable benchmarks ("Uses Facebook" → "Posts on Facebook at least once a week") → masked screener questions (broad question, decoy options) → post where the audience lives. Hall: screen for *behaviors*, never enthusiasm; "If you're talking to the wrong people, it doesn't matter what you ask."
- **Ethics floor:** informed consent (purpose, recording, data use, voluntary, can stop anytime), no research while anyone is driving, safety rule ("If you feel unsafe, don't go in" — Portigal), minors need parental consent. "Half-assing your research ethics, means you're half-assing your learning process" (Sharon). Full checklists → `references/study-logistics.md`.

## 4. The interview, compressed

Portigal's seven stages: **1 Crossing the threshold → 2 Restating objectives → 3 Kick-off question → 4 Accept the awkwardness → 5 The tipping point → 6 Reflection and projection → 7 The soft close.** The tipping point is the shift from question-answer to question-story: "Stories are where the richest insights lie." Keep recording to the door (doorknob phenomenon).

Top question moves: sequence ("Walk me through your day yesterday"), specific example (last time), exhaustive list ("What else?"), reenactment ("Please demonstrate exactly how you did that"), outsider perspective (explain it to a newcomer), native language ("Why do you call it the bat cave?"), three wishes ("What really matters here are not the wishes but the reasons" — Sharon). Signal lane changes: "Okay, this is great. I'm just going to shift direction here…"

Six anti-patterns: pass/fail quizzing (USB story); correcting the participant (TiVo); imposing your framework (Old Keith/New Keith); answering their questions about the concept (use the Interviewer Sidestep); filling silence with suggested answers ("…was it toast, or juice?"); talking about yourself beyond strategic self-disclosure. Full craft → `references/interviewing-craft.md`.

## 5. Data to decision

Debrief immediately after each session (IDEO-inspired four questions; Portigal's "What would we design for this user?") → field highlights → **topline report** (5–15 thematic areas) → team affinity wall / KJ (silent grouping, silent naming, silent voting) → themes → mandates.

Notes are **descriptive, not interpretive**: "Worked 14 hrs/day for 10 years," not "Larry is a workaholic" (Portigal). Hall: separate observations from interpretations; no solutions during analysis.

Research must change something: "If you don't make any changes, your online usability test has failed" (Sharon). Prioritize changes by impact, persistence, frequency — and politics: "Develop changes as if you live in a bubble." Full pipeline → `references/synthesis-and-impact.md`.

**Test-design caveat — the aesthetic-usability effect.** Beautiful stimuli contaminate usability tests: "perceived aesthetic quality has the potential to mask usability issues" (Yablonski, *Laws of UX*, ch. 7, citing Sonderegger & Sauer, 2010 — an attractive phone mock scored as more usable despite identical function). Mitigate by "listening to what users say … and, more importantly, watching what they do" — one more reason behavior outranks attitude (§2.2) and notes stay descriptive.

**Engineer the empathy transfer** (Ron Goldin, Dive Club). Findings that the org merely *reads* don't change behavior — design the delivery so people feel them. His Uber Eats move: mount an Insta360 camera on the courier bike, record real trips, send Google Cardboard viewers to leadership with the 360° footage — and in the all-hands cut, "we just like left a minute. We left a minute in that presentation of just like the feeling of sitting in a car waiting for nothing to happen." A minute of enforced boredom communicated the courier wait problem better than any chart. Same doctrine as Portigal's bring-colleagues-to-the-field (§2.12), extended to the people who'll never go: bring the field to them, uncompressed.

**Dogfooding only counts with real stakes** (Polly D'Arcy, Dive Club): "it's one thing to like test something in staging and it's another thing to actually like use a product with your own money because you just… deeply feel the pain points" — and the team rule with teeth: if people at the company "do not want to use it with your own money, it's not good enough." Staging walkthroughs are evaluative theater; stake-bearing use is behavioral data on yourselves (§2.2 applied inward).

## 6. The school dial: Portigal-deep vs Sharon-lean

Same doctrine, different postures. Set the dial per project; don't blend mid-study.

| Question | Portigal (deep) | Sharon (lean) |
|---|---|---|
| Who runs research | Skilled interviewer leads; colleagues second-chair | Non-researchers run it themselves, prescribed steps |
| Prep depth | Weeks: screener iteration, agency recruiting, field guide rehearsal | "discuss needed research in the morning, launch a study in the afternoon, and get results before 4 p.m." |
| Depth vs cadence | Two interviews/day max; 90-min sessions; rapport is the product | Ten interviews in 1–3 days; remote-first; speed over polish |
| Quant appetite | Skeptical; qualitative stories are the payload | Comfortable: 500-participant tree tests, lostness math, A/B confidence levels |
| Posture toward ideas | Reframe: concepts are props to discover criteria; "right to be wrong" | Validate/invalidate: thresholds decided in advance, kill or build |
| Surveys | Out of scope | "The hardest research technique to do right… I don't encourage you to do it" (Hall agrees: "the most dangerous research tool") |

Hall sits above the dial: whichever school, scope to the riskiest assumptions and stop at the "satisfying click."

## Checklist

- [ ] Riskiest assumptions listed and ranked (what's most expensive to be wrong about?)
- [ ] Research question phrased with an outcome verb; method chosen from the question
- [ ] One-page plan shared; roles assigned
- [ ] Recruiting started immediately; screener masks criteria, screens on behavior; piloted
- [ ] Field guide drafted as a flexible tool, not a script; consent/release ready
- [ ] Sessions debriefed same day; notes descriptive, source-coded
- [ ] Team synthesis session (affinity/KJ) before any report
- [ ] Findings end in decisions/changes, with severity × frequency prioritization
- [ ] Nothing rested on asking people what they want, would do, or would pay

## Relationship to other skills

- **design-prototyping** — running prototype-feedback sessions, fidelity choices, presenting work; this skill covers using prototypes as research stimuli (reactions-to-concepts), that one covers building and pitching them.
- **design-org-influence** — selling research and its findings to stakeholders, business-case framing; this skill's research-as-leadership notes hand off there.
- **user-onboarding** — apply evaluative findings about first-run/empty states there.
- **shape-up** — research feeds shaping/betting; pitch-shaped problem definitions consume this skill's discovery output.
- **building-in-public / developer-tool-gtm** — audience validation, landing pages, and PMF measurement for products; fake-doors/landing-page caveats here inform both.

## Staleness

Sources are 2013–2016 (Portigal, Sharon) plus Hall's 2019 second edition. Methods (interviewing, sampling logic, affinity analysis, lostness) are durable. Named tools decay: UserTesting, UserZoom, Optimal Workshop (Treejack/Chalkmark), Google Forms/Hangouts/Plus, Optimizely, Ethnio — treat as category examples, verify current options. Social-media recruiting channels (Facebook groups, Twitter hashtags, Google Plus) reflect 2016; the criteria→benchmark→screener pipeline still applies on whatever channels exist.
