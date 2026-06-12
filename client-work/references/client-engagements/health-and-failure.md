# Health Signals, Failure, and Endings

Source: Mike Monteiro, *You're My Favorite Client* (A Book Apart, 2014), chapters 2–3, 5–6. All quotes are Monteiro. This file owns project-health reading, anti-patterns, the failure/firing playbook, and the money mechanics (estimates, deposits, kill fee, termination pay).

## Contents

- Healthy signs (ch. 5)
- Counterintuitive and trick signs
- Anti-patterns (ch. 3)
- Big vs. small mistakes
- The quality-expectation ladder and unrecoverability
- The come-to-Jesus meeting
- Communicating failure
- Firing a designer (and being fired)
- Termination money
- Reconstruction
- Money mechanics: estimate factors, deposits, kill fee, value pricing

## Healthy signs

- **Regular communication.** The top sign. On a healthy Mule project "someone on our team talks to someone on the client team every day." Problems get nipped before they derail anything; both sides worry if a couple of days go silent. Establish a main contact and an escalation path at the start (use escalation sparingly).
- **Deadlines get met.** "There's only one important deadline. The next one." Miss one by three days and the whole project shifts three days. Set realistic, not heroic, timelines; account for vacations and holidays.
- **Questions keep flowing.** A team running around asking questions is getting the information it needs. "If your design team doesn't have any questions, you've got a problem. That's the sound of assumptions solidifying."
- **People form relationships.** Cross-team lunches, jokes, drinks — can't be forced, but it's a strong tell.
- **Context on every share.** "Every time your designer shows you something, you understand why" — what it's for and what feedback they need. A bare "What do you think of this?" is a problem.
- **The work slowly gets better.** Rough early concepts are fine; each round should land closer with more refinement.
- **People argue** (in moderation, about the work). "'Your solution sucks' is okay. 'You suck' is not." Disinterested people don't argue; they go into checklist mode.
- **People tell you they fucked up.** "If you think your project is problem-free, it's because someone is hiding something." You can fix zero of the problems you don't know about.
- **Designers show unfinished work.** Sharing broken, messy work with the person paying you takes trust — it means you've been accepted onto the problem-solving team.
- **Someone complains about legacy systems** — it means the hardest, most-deferred work has actually started. Treat those people "like the heroes they are"; never farm legacy migration out as someone's spare-time job.
- **The team is excited about the next deliverable**; **the old site starts to make the client sick**; **the client didn't mind writing the last check**; **the client wants to poach a designer** (wanting = great sign; doing = don't).
- **The client's boss is happy.** "One of the designer's goals is making the person who hired them look like a genius" — good work plus timeline, budget, clear communication, and standing beside them when they're called upstairs.
- **A defined finish line.** Agree at the start what "done" means (launch? deliverables? QA-clean?) — any definition works if both parties agree.

## Counterintuitive and trick signs

- **Late nights are a bad sign.** Occasional end-of-project rallies happen (bring food, stay out of the way), but if staying late is regular, "something has gone wrong." Long hours are not devotion; check the timeline and the missed-deadline history. "Everyone deserves to go home at a reasonable hour."
- **Showing the unfinished site to someone you shouldn't** = excitement (good) — but don't feed nephew Dick's feedback into the process.

## Anti-patterns

- **The swoop and poop.** Industry term. The team has debated research and data for hours; an exec bounces through the door: "I like the one in the middle!" Don't venture opinions without the context.
- **The dive-bomb.** During presentations, no instant reactions: "Sit on your hands and let them finish telling you why they made the decisions they made." A team designing for your reactions ("you've expressed a distaste for orange, photos, or the word potato") optimizes for your happiness over the project's success — and if it tanks, the blame lands on designers who executed demands they knew wouldn't work.
- **No surprise guests on calls.** "If you're in the room, I need to know you're in the room, and I need to know what your role is." A lurker springing a surprise comment "sows distrust."
- **Strategy pivots reset the clock.** Sell-cheese-online → dairy-farmer video network three-quarters through means the research-rooted work must be redone: "When you change your strategy, you reset the clock," and nobody knows how far back until the homework is redone. Course corrections are normal; destination changes mean regrouping. (But don't soldier on with a known-flawed strategy either — that costs more.)
- **Hope isn't a design word.** Positive-sounding feedback that masks unhappiness (see the honesty preamble in feedback-system.md) lets failure compound silently.
- **Withheld information.** "Every piece of information you withhold increases the project's risk of failure" — strategy shifts, re-orgs, sensitive context. "That's like not telling your doctor you smoke."
- **Stealth competition.** Hiring a second designer to quietly work in parallel because you can't tell the first one they're failing — Mule refuses these clients outright.

## Big vs. small mistakes

- Small mistake: wrong template count, forgotten minor functionality, feedback a half-day late — fixable in hours or days. Settle up, adjust the timeline, move on.
- **What converts small to big is failing to acknowledge it.** The basketball rule: the minute you're whistled for a foul, you raise your hand; free throws happen and everyone moves on. People who can't admit errors are usually afraid of being judged — create an environment where mistakes are part of the process. "A small mistake that isn't uncovered can grow into a large one."
- Big mistake: anything that puts the timeline at risk — e.g., revisiting a decision made three months ago, which throws every decision made since up in the air.
- Prevention: frequent check-ins, attention to detail, and "taking extra care that sign-off really means sign-off." The hard rule: "never, ever, ever sign off on work without being absolutely confident in your decision," with green lights from anyone who could undo it.

## The quality-expectation ladder and unrecoverability

Descending levels of project quality expectation:

1. We're going to do amazing work
2. We're going to do pretty good work
3. We're going to get this out the door
4. We're going to cover our ass
5. We can probably spin this on our résumé

"When you get down to those last two, you're in the middle of an irreversible mistake — the type that needs a project reset." The moment goals shift from doing good work to salvaging current work, the quality standard is already compromised.

**The trust test:** the relationship is unrecoverable when you no longer believe the team can do good work — even when that's unfair to them (you may be the one who screwed up, or scapegoating them; parting may still be right for the project, "but a jerk who's getting the project done" is still a jerk).

**The CEO-designer story:** a client's CEO "fancied himself a designer (biggest red flag in the business)"; every presentation drew the same "This doesn't feel like us. Why aren't we doing this work internally?" The rest of the team trusted Mule fine, but with no way past the CEO, Mule asked to be fired — gratefully. The project never launched.

## The come-to-Jesus meeting

Only when something is worth saving — one last shot, not theater.

- **The one rule: "never make people think they have a chance when they don't."** A fake last chance costs more time and money and is unfair to people who need a fresh start elsewhere. If you've decided, just fire them.
- Be blunt and direct — "You've strayed off course and the project is headed toward failure!" — not a "let's see if they come to the same conclusion" meeting.
- Lay out severity and consequences; then present the recovery plan, or workshop it together if you still trust them to. Leaving the room, their only job is executing the plan.
- Promise nothing beyond the chance — "Even if they manage to pull the project out of the toilet, they're still the team that dumped it there."
- Why endure it: this meeting is your last chance to avoid the meeting where you explain failure to your boss and investors.

## Communicating failure

- The only thing worse than telling someone they failed is "making someone feel like they've succeeded when they haven't."
- **Never communicate angry.** "Walk it off." Fury guarantees defensiveness, then "Don't get defensive!", then everything goes nuclear.
- Do it in person whenever possible. **Have a plan**: what you'll say, in what order, the outcome you want, whether their future is already decided.
- **Know the outcome you want.** If there's a second chance, spell out the steps and the evidence required — and accept that their recovery is now tied to you: clear goals, regular check-ins, open door.
- **Read the room.** Ownership of mistakes → give the second chance. Blame-shifting and coworkers under the bus → keep it in your back pocket. The bottom line is whether you can trust them again.
- For the failed party: get defensive and learn nothing, or own it, review what went wrong, ask for advice, and "come off as a person who knows how to hop back on a horse after being thrown."

## Firing a designer (and being fired)

- **"Getting fired should never come as a surprise."** Warn first, name the needed improvement and the deadline. No progress (or worse) → "cut 'em loose." Someone in over their head already knows it.
- Firing should feel bad — "The fact that you feel terrible about it is a sign you're actually a human being" — and it still doesn't compare to being fired. "Doing the right thing doesn't always feel great."
- Do it with clarity, honesty, and empathy; people deserve to know why, "no matter what your HR department says."
- Perspective: "Getting fired isn't the end of the world; it's the end of a job." Monteiro has fired designers who went on to great careers, and been fired more than once himself.
- Mirror image: a client who can't tell a designer they're doing a bad job (and shops for a shadow replacement instead) is the fireable party.

## Termination money

- Employee: routine — last paycheck, unused vacation, HR process.
- Outside designer: "You pay people for the work they did." **Approved work stays paid** — "you most definitely owe people for the work you've approved"; sign-off acknowledged satisfaction, and arguing you approved work under false pretenses is a hard case to make (though Monteiro has "no love for design firms that swindle their clients").
- In-progress work at firing time: contract question first, then the guideline — **"if you're going to use the work, even after firing them, pay them for it. But if you're not using the work, well, fuck 'em."**
- The kill fee covers the inverse case: the client eighty-sixes the project for reasons unrelated to work quality (see Money mechanics below).

## Reconstruction

- First question: can you finish without a designer at all? Only if the project is "well into implementation" with major systems defined — and never by shipping substandard work users pay for. "You may win a battle to lose the war."
- Before rehiring, audit yourself: missed red flags? quality problem or relationship problem? need more experience? chose cheapest? — "Guess what? You didn't save money. **What you save on cost, you take on risk.**"
- **"Transference is not in scope."** The next designer "isn't responsible for what happened with your previous one… A new designer starts with a clean slate" — even though you're handing them a hot potato.
- Constrain the new designer honestly: a half-finished project needing "an honest evaluation of how much is worth keeping," not a re-do for the sake of their own mark. A completion-date bonus makes a surprising amount of the old work salvageable.
- "Remember, saving a few bucks often ends up costing you far more."

## Money mechanics (ch. 2)

Why five designers quote five wildly different prices — the estimate factors:

- **Scope** — by far the biggest component; once signed off by both parties, "it doesn't increase. We're building what we're building" (horse-trade within it as discovery reveals complexity).
- **Experience** — convoluted-problem veterans cost more; "You benefit from all the mistakes they made in the past that they won't repeat with you."
- **Value** — the more influence the work has, the more it should cost.
- **Availability** — supply and demand; the same firm might have bid $80K instead of $100K a month earlier.
- **Perceived awesomeness** — dream projects price down; and the **secrecy premium**: if the work is secret and can't go in the portfolio, "it'll probably cost more to compensate for the lost value."
- **Org size/complexity** — coordinating twenty people costs more than five.
- **Timeline** — rush costs more, not less (the FedEx joke).
- **Costs of doing business** — SF/NY/London rents and salaries.
- **The asshole tax** — "if you're a jerk during the business development process, designers assume you'll be a jerk during the project, and they'll charge you more." The **angel discount** is its inverse, for admirable nonprofits and good repeat clients; skeezing for a discount earns a higher quote.

Payment structure:

- **Deposit 25–50%** of total before work starts — "you pay for flights when you reserve them, not when you get to your destination"; the deposit reserves a limited resource (the team's time).
- Milestone payments on bigger projects, final payment on completion — and **define completion as something within the designer's control** (e.g., delivery of final code, not your team's launch).
- **Kill fee**: if the client exits for reasons unrelated to work quality, a percentage of the remaining budget is owed — the studio reserved the calendar and stopped selling that time. Bad work is different: "if we're working on the project and doing a terrible job, you can flat out fire us. That's on us." Monteiro won't let lawyers strike the clause.
- Contracts always: "A designer that works without one doesn't take their business seriously."

Value framing (client education): **"Things cost more when they matter more… and this is right and good."** Why are some logos $99 and others $1M — or BP's 2008 rebrand at $211M? "The million-dollar logo didn't take ten thousand times as long to make. Say it with me: it's about the value." Established orgs pay more "because the cost of fucking things up is much higher." Pay equation for in-house: pay designers like engineers, design directors like other directors, "and pay the ones willing to disagree with you twice as much as the ones who aren't." (The full pricing/negotiation discipline is in [../pricing-creative-work.md](../pricing-creative-work.md) (same skill); the budget-disclosure script is in feedback-system.md.)
