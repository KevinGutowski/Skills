# Worked Examples

Read this when producing an actual learning artifact (a course outline, a session plan, a module rewrite) and you need to see the method in SKILL.md applied end to end, or when calibrating how concrete the output should be.

**These are illustrative worked examples written for this reference.** The scenarios, companies, numbers, and learner quotes are invented. They are not from Dirksen or *Universal Principles of Design* and should not be attributed to any source. The method they apply (gap diagnosis, goals as actions in context, CCAF, practice that matches use, spacing, feedback, job aids) is the one in SKILL.md.

## Contents

- Example 1: Gap diagnosis and alignment table (incident triage course)
- Example 2: Session plan with a spacing schedule (same course)
- Example 3: Before/after rewrite of a weak module (data-handling training)
- What the examples have in common

## Example 1: Gap diagnosis and alignment table

**Request as received:** "We need a two-hour training deck on our incident process for new on-call engineers."

**Gap diagnosis** (SKILL.md, Start With The Gap):

| Gap | Evidence gathered | Verdict |
|---|---|---|
| Knowledge | New engineers cannot name the severity levels. The definitions sit in a 40-page wiki. | Real, but small. A one-page reference covers it. |
| Skill | Shadowing three on-call shifts showed new engineers taking 15+ minutes to assign severity and choosing "wait and see" on customer-facing errors. Nobody becomes proficient at this without practice. | The main gap. Design practice. |
| Motivation | Engineers avoid paging the incident lead at night: "I don't want to wake someone for nothing." | Real. Needs modelling and an explicit norm from leads. |
| Environment | The paging tool hides severity definitions two clicks away. The escalation list is out of date. | Real. Fix the tool and list; no course repairs this. |
| Communication | Two teams define "customer-facing" differently. | Not a learning problem. Send to the engineering leads to resolve first. |

**Recommendation:** not a two-hour deck. A short practice-based course plus a job aid, and two non-training fixes (severity definitions in the paging tool; one definition of "customer-facing").

**Alignment table.** Each row starts from an action in context. Assessment and practice use the same task shape as the job.

| Goal (action in context) | Assessment (perform the real task) | Practice activity (CCAF) | Knowledge needed, cut to minimum | Job aid / environment |
|---|---|---|---|---|
| Given a live alert and dashboards, assign severity within 5 minutes and state the reason. | Three unseen replayed incidents. Learner assigns severity against the clock; scored against the rubric the leads use. | Context: replay of a real past incident in a sandbox. Challenge: "You have 5 minutes." Activity: assign and justify. Feedback: what the lead did, and what happened to customers in the next 30 minutes under each choice. | Four severity levels, one example and one counterexample each. | Severity card shown inside the paging tool. |
| Decide whether to page the incident lead, and do it without delay when criteria are met. | Role-play with a real lead: learner makes the call and gives the 30-second brief. | Context: 2 a.m. scenario, ambiguous signal. Challenge: page or not. Activity: make the call aloud. Feedback: the lead's reaction, modelling that an early page is welcome. | Paging criteria; the brief format. | Brief template in the pager message field; leads state the norm in onboarding. |
| Write the first customer status update within 15 minutes. | Learner writes an update for a replayed incident; a support lead reviews it against criteria. | Context: incident in progress, partial information. Challenge: customers are asking. Activity: draft. Feedback: side-by-side with the update that was actually sent, plus criteria. | What must and must not be promised. | Status-update template with examples. |

**Cut from the course:** incident-process history, the full tooling tour, and post-mortem writing (a different task, taught at first post-mortem).

## Example 2: Session plan with a spacing schedule

Same course. The constraint is honest: one session produces familiarity, so practice is distributed over five weeks (SKILL.md, Design Skills: space practice over time).

**Session 1 (75 minutes, cohort of 6)**

| Time | Activity | Why |
|---|---|---|
| 0:00 | Open with a challenge, no objectives slide: replay of a real incident. "You are on call. What do you do in the next 5 minutes?" Learners commit to an answer individually. | Starts with a concrete problem; surfaces current mental models. |
| 0:10 | Compare answers; the lead shows what happened. Introduce the four severity levels through this example and one counterexample. | Examples before definitions. |
| 0:25 | Practice round 1: two replayed incidents in pairs, with the severity card visible. Feedback after each: consequence shown, then the lead's reasoning. | Scaffolded practice; feedback while there is time to adjust. |
| 0:50 | Practice round 2: one incident, solo, card visible, 5-minute clock. | Fades one support (the partner), keeps the other. |
| 1:05 | Paging role-play, two volunteers, with a real lead answering. | Models that paging early is welcome; builds self-efficacy. |
| 1:15 | Close: each learner names the case they are least sure about. These seed the spaced practice. | Feeds later retrieval. |

**Spacing schedule**

| When | Practice | Support faded | Feedback |
|---|---|---|---|
| Day 2 | One replayed incident by chat, 5 minutes. Recall severity without opening the card first, then check. | Card hidden at first | Automatic consequence, then one line from a lead |
| Week 1 | Shadow one on-call shift; make the severity call silently, then compare with the on-call engineer. | No time pressure from real stakes | Debrief with the engineer |
| Week 2 | Two replayed incidents, one deliberately ambiguous. Write the status update for one. | No partner, clock on | Rubric score; support lead's comments |
| Week 3 | Reverse shadow: learner takes the pager with an experienced engineer beside them. | Real stakes, backup present | Debrief after each alert |
| Week 5 | Assessment: three unseen replays plus the paging role-play. | All course supports gone; the in-tool card stays because it stays on the job | Rubric; go/no-go for solo on-call |

**Measures** (behaviour, baseline, time horizon; not completion rate): time to severity assignment on real incidents in the first three months, compared with the previous cohort; number of under-called severities; leads' rating of paging briefs.

## Example 3: Before/after rewrite of a weak module

**Before.** An annual "Customer data handling" e-learning module for support agents: 42 slides of policy text, then a 10-question multiple-choice quiz (80% to pass).

```text
Slide 1   Learning objectives: Understand the data classification policy...
Slides 2-14   The four data classes and their definitions
Slides 15-30  Policy sections 3.1 to 7.4
Slides 31-41  Penalties and regulations
Slide 42  Quiz: "Which of the following is Class 3 data?"
```

**Diagnosis.**

- The stated goal is content coverage ("understand the policy"), not an action.
- Observation of agents shows the failure is specific: pasting full customer records into chat tools and tickets when asking colleagues for help. Agents can recite the classes.
- So the knowledge gap is small. The gaps are skill (recognising the moment in the flow of work), motivation ("everyone does it, it's faster"), and environment (the ticket tool makes copying the whole record the easiest path).
- The quiz tests recognition of definitions. The job requires action under time pressure.

**After.**

```text
Goal: When asking a colleague for help on a ticket, share only the fields
      needed, through the approved link, every time.

Environment fixes (requested first, outside the course):
  - "Share ticket link" button placed beside the copy action.
  - One-line prompt in the chat tool when a pasted message matches a record pattern.

Module (20 minutes, replaces 42 slides):
  1. Challenge first: a realistic ticket and a colleague's chat window.
     "You need help with this refund. Ask for it."            (Context, Challenge)
  2. Learner writes the message.                               (Activity)
  3. Feedback as consequence: what the colleague could now see, and where
     that message is stored. Then the approved version beside theirs.  (Feedback)
  4. Four more tickets of rising difficulty, including one where the
     customer pasted their own card number into the conversation.
  5. A team lead on video: the two-step habit they use, and why.

Job aid: three-line card in the ticket sidebar: what to share, how, what never to paste.

Spaced follow-up: one 2-minute ticket scenario in weeks 2, 4, and 8.

Assessment: a sample of real help-request messages reviewed monthly against
  one criterion (only needed fields, shared by link). No definitions quiz.

Reference, not taught: the full policy, linked from the job aid.
```

**What changed and why.**

| Before | After | Principle applied |
|---|---|---|
| Objectives slide | Opens with a ticket to handle | Start with a challenge, not an objectives slide |
| 42 slides of policy | Policy linked as reference; module carries only what the action needs | Less content; cache the rest |
| Definitions quiz | Review of real messages | Assess the actual task |
| One annual event | Module plus three short spaced scenarios | Space practice; change is a process |
| Training only | Button, prompt, and sidebar card | Put knowledge in the world; fix the process |

## What the examples have in common

- The first output is a diagnosis, and it is allowed to say "part of this is not a training problem".
- Every goal is an action in a context, and the assessment asks for that action.
- Practice is planned across weeks, with supports removed on a schedule.
- A job aid or environment change sits beside the course.
