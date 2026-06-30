---
name: learning-experience-design
description: "Designs courses, workshops, training, tutorials, and job aids that change behavior — gap diagnosis, practice, feedback, motivation, transfer. Use when people need to learn a skill or adopt a process. Product onboarding → user-onboarding/feature-discoverability; managing reports → people-management. Triggers: training, course, workshop, curriculum, practice, feedback, job aid."
---

# Learning Experience Design

**Sources/gaps** — [references/sources.md](references/sources.md) maps the Dirksen/UPD corpus; unresolved training artifacts and measurement candidates live in [references/coverage-gaps.md](references/coverage-gaps.md).

## Start With The Gap

A learning request is usually misdiagnosed as a content request. Dirksen's frame: "The end of the journey isn't just knowing more, it's doing more." Before making slides, name the performance gap:

- **Knowledge gap** — they lack information, concepts, examples, or a mental model.
- **Skill gap** — they cannot perform yet. Test it with: "Is it reasonable to think that someone can be proficient without practice?" If yes, it is not a skill; if no, design practice.
- **Motivation/attitude gap** — they know what to do but do not choose it: "If somebody knows what to do, but chooses not to do it, that's a motivation gap."
- **Environment gap** — the process, tools, incentives, time, references, or job aids do not support the behavior.
- **Communication gap** — the directions are vague, conflicting, or unsupported by leadership; this may not be a learning problem.

If the answer is "they need all five," sequence them. Do not use a suspension bridge to fix a pothole: a two-day course cannot repair a process, a missing manager, or a bad interface by itself.

## Know The Learner In Context

Avoid learner personas that are only demographics. You need motivation, current skill, context, and the learner's model of the world.

- **Follow learners around.** Dirksen maps this to UX contextual inquiry: "follow your learners around in their actual environment." If you can do only one audience-analysis method, observe the work where the learning will be used.
- **Use current learners, not only experts.** Recent learners remember where it hurt; experts often skip steps because the work is automatic.
- **Prototype the learning.** Reviews are weak because "everyone fills in the gaps with their own understanding." "Nothing will show up gaps like trying stuff out." Pilot an activity, role-play, e-learning branch, job aid, or practice prompt with a small audience.
- **Reject learning-styles theater.** Evidence for adapting to VARK-style categories is weak; use varied approaches for attention, memory triggers, and inclusion, not because each person has one fixed style.

## Set Goals That Match Transfer

Write goals as actions in context, not content coverage. "Understand project management" is not enough; "provide appropriate feedback to a chronically late employee" gives you a target scenario, practice shape, and assessment method.

- Use "Why, why, no really, why?" and "What bad thing will happen if they don't know?" to find the real reason for learning.
- Decide how far the experience can take someone: familiarity, conscious effort, conscious action, proficiency, or transfer across messy contexts.
- Be honest about time. "You absolutely cannot get past Conscious Action without a significant amount of practice distributed over time."
- Skip objective slides. Start with a challenge, scenario, mission, or concrete problem that focuses attention and sets direction.
- **Use advance organizers when the path is linear.** For a course, workshop, or guided tutorial, orient before detail with an abstract frame that presents the "big picture" prior to the details (Lidwell/Holden/Butler, *Universal Principles of Design*, "Advance Organizer"). Use **expository** organizers for genuinely new domains and **comparative** organizers when learners already know a nearby system. Do not force this into nonlinear exploration; even the book notes the technique is hard to validate and fits defined-entry learning best.

## Design Knowledge

Give less content than your expertise wants to provide: "What's the right amount of content for your learners? Probably less than you think it should be."

- Make content usable, not complete. Cache secondary information as references, checklists, examples, or searchable resources.
- Use examples and counterexamples before definitions when learners need concepts.
- Match retrieval to final use. If they will need recall, practice recall. If recognition is enough, do not overtrain recall.
- Use CCAF for active learning: **Context** (conditions), **Challenge** (stimulus to act), **Activity** (learner response), **Feedback** (reflection of action effectiveness).
- Whenever possible, show, do, and compare instead of explaining in the abstract.

## Design Skills

Skills are built through practice and feedback. Dirksen's blunt summary: "Teaching skills requires two main elements—practice and feedback."

- **Practice like the real task.** "The practice needs to match the eventual use." Role-play, simulation, shadowing, project work, or real artifacts beat multiple-choice unless the task is taking multiple-choice tests.
- **Space practice over time.** For long-term retention, "you want to distribute your learning over time if possible." One dense class mostly creates familiarity.
- **Keep challenge near ability.** Too easy is boring; too hard is shame or frustration. Scaffold by reducing environment complexity, using walkthroughs, and then fading supports.
- **Give frequent, varied feedback.** Learners need to know how they are doing while there is still time to adjust. Use consequences, criteria, examples, coaching, visual cues, peer critique, and self-assessment; avoid generic "Good Job!" popups.
- **Assess the actual task.** "When assessing learner performance, have them perform the actual task whenever possible."

## Design Motivation And Environment

Motivation to learn is not the same as motivation to do. Required training often has extrinsic motivation; awaken intrinsic motivation with real pain points, relevant challenges, autonomy, social proof, and early wins.

- **Change is not an event.** "Change is a process, not an event." Expect backsliding; reinforce over time.
- **Let learners work on their own problems.** The best scenarios are often "the learner's actual problems or challenges."
- **Build self-efficacy.** Let learners see the behavior modeled, try smaller versions, succeed early, and receive coaching before the high-stakes moment.
- **Put knowledge into the world.** "Proximity matters—try to get the knowledge as close to the behavior as possible." Job aids, checklists, templates, decision trees, interface prompts, and environmental cues can be better than memorization.
- **Prefer recognition for performance support.** In assessment, recall may prove knowledge; in the environment, "recognizing the right option is easier than recalling it."
- **Fix the process.** Do not just teach people a process; simplify the process, interface, incentives, timing, or support system when that is the real barrier.

## Checklist

- [ ] Desired behavior named: what should learners do differently afterward?
- [ ] Gap diagnosed: knowledge, skill, motivation, environment, communication?
- [ ] Learners observed in the real context, not only surveyed or interviewed?
- [ ] Goal framed as a contextual action, not a topic list?
- [ ] Content cut to the minimum needed for action, with references/job aids for the rest?
- [ ] Practice matches final use and is spaced over time?
- [ ] Feedback is frequent, varied, criteria-based, and available before stakes are high?
- [ ] Motivation addressed with relevance, autonomy, early wins, self-efficacy, and social proof?
- [ ] Environment changed where possible: job aids, prompts, process simplification, manager reinforcement?
- [ ] Assessment asks learners to perform the real task whenever possible?

## Relationship to other skills

- **`user-onboarding`** — product first-run journeys, empty states, signup flow, and quick wins. Use this skill when the work is a course, workshop, curriculum, training program, or job aid.
- **`feature-discoverability`** — in-app feature teaching, tips, gestures, first-launch cues. Use this skill when the teaching object is broader than the app surface or requires practice/feedback outside the UI.
- **`people-management`** — manager/report relationships and feedback delivery. Use this skill for designing manager training, coaching curricula, or practice systems.
- **`working-with-ai` (ai-enablement)** — rolling AI tooling out across an org: shared context, internal agents, social proof, and adoption programs. Use this skill to design the learning mechanics inside that rollout.
- **`user-research`** — study methods for learning about learners; this skill translates those findings into practice, feedback, and performance support.
- **`design-prototyping`** — prototype and test the learning artifact there when it is a product/session artifact; diagnose the learning design here.

> **Staleness note:** the cognitive principles and practice/feedback method are durable. The e-learning tool examples and references to then-current technology are dated; verify current platform mechanics before implementation.
