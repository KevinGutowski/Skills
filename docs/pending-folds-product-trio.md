# Pending folds: Perri / Gothelf / Klein (screened 2026-06-11, NOT yet folded)

Screen verdict: **no new skill** — extend user-research, shape-up, user-onboarding,
design-org-influence, client-engagements. Sources (re-extract if /tmp was cleared):
`/tmp/books/escaping-build-trap.txt` (Perri, *Escaping the Build Trap*, O'Reilly 2018),
`/tmp/books/lean-ux.txt` (Gothelf/Seiden, *Lean UX* 1st ed. 2013 — era-tag heavily),
`/tmp/books/build-better-products.txt` (Klein, *Build Better Products*, Rosenfeld 2016).
Extraction recipes in docs/book-mining-handoff.md. All quotes below were verified with
scripts/verify_quotes.py (100/100 OK); fold agents should copy them VERBATIM and
spot-check ~20% rather than re-verifying everything.

## Conflicts to flag at fold time (scope, don't merge)
- Measurement-led (Perri/Klein/Lean UX) vs taste-led (Linear school in shape-up):
  treat as a FOURTH school in shape-up's router; route by org maturity/data volume.
- Lean UX "Speed first, aesthetics second" (Fried, 2013): valid for validation
  artifacts only — era-tag against the corpus's polish doctrine.
- Lean UX fidelity economics inverted by AI generation; the artifact→feedback-type
  mapping survives (sketches→value; wireframes→IA/copy; hi-fi→brand; coded→behavior).
- Klein + Linear anti-roadmap = corroboration, cite both.

## Fold plan (targets → key items; quotes below)
1. **user-research** (biggest — consider new references/validation-and-metrics.md):
   Klein assumption→falsifiable→validation machinery (taxonomy; two-number rule;
   assumption stack; validation-method × assumption-type table; hypothesis tracker +
   danger metrics; no-neutral-results; Fraser evidence-first), predictive personas +
   sell-it test + Alvarez 3-step; Lean UX 3-12-1 + Meetup ~600 sessions/$30k +
   test-everything + artifact-expectation table + contradictory-data triage; metrics
   hygiene (gaming leading metrics/Shmacebook, cohort-by-channel, mutually destructive
   pairs from Perri, vanity→actionable via time component); Perri kata don't-experiment-
   on-non-core rule (Kalma).
2. **shape-up**: Perri strategy-deployment levels + intent calibration + quantified
   initiative template + Product Kata as the metrics-led school; peanut-buttering;
   real Definition of Done + "Version 2 is the biggest lie"; Experiment/Alpha/Beta/GA +
   sales agreement; VC-style budgeting; Klein Finding-the-Core / What-Happens-Next /
   input-output matching as scope-hammering tools.
3. **user-onboarding**: Klein Designing Backward (required/encouraged/eventual),
   give-them-a-task, behavior-trigger table, Amy Jo Kim Game Thinking (core loop first,
   build order habit→onboarding→discovery→mastery), dark-patterns definition.
4. **design-org-influence**: Bungay three gaps + wrong-fix pattern + Bloom unconstrained-
   team line; waiter/order-taker + product death cycle; rewards pathology; six
   product-led diagnostic questions; UX-debt reframe (O'Brien); lead-with-conversation.
5. **client-engagements** (minor): Lean UX agency shift (deliverables→outcomes contracts).

## Verified quotes manifest (copy verbatim)
```json
[
{"q":"The build trap is when organizations become stuck measuring their success by outputs rather than outcomes.","src":"Perri, Escaping the Build Trap, Part I intro","route":"shape-up/design-org-influence"},
{"q":"Good strategy isn't a detailed plan. It's a framework that helps you make decisions.","src":"Perri ch.10","route":"shape-up"},
{"q":"The Knowledge Gap ... is the difference between what management would like to know and what the company actually knows. Organizations try to fill this gap by providing and demanding more detailed information.","src":"Perri ch.11 (after Bungay)","route":"design-org-influence"},
{"q":"Instead of seeking more detailed information, upper management should be limiting its direction to defining and communicating the strategic intent, or the goals of the business.","src":"Perri ch.11","route":"design-org-influence"},
{"q":"The Alignment Gap ... is the difference between what people do and what management wants them to do, which is to achieve the business goals. Organizations try to fill this gap by providing more detailed instruction","src":"Perri ch.11","route":"design-org-influence"},
{"q":"When organizations do not see the results they want, they try to fill this gap by putting more controls in place.","src":"Perri ch.11 (Effects Gap)","route":"design-org-influence"},
{"q":"The unconstrained team is the most frightened and scared to act in the organization.","src":"Jabe Bloom, qtd. in Perri ch.12","route":"design-org-influence/shape-up"},
{"q":"delight customers, in margin-enhancing, hard-to-copy ways","src":"Gibson Biddle (Netflix), qtd. in Perri Part III","route":"shape-up"},
{"q":"One intent is usually good for a small company, and three are plenty for a large organization.","src":"Perri ch.13","route":"shape-up"},
{"q":"You are peanut-buttering your strategy—meaning that you have so many strategic initiatives spread over very few people.","src":"Perri (Marquetly)","route":"shape-up"},
{"q":"We believe that by increasing the amount of content on our site in key areas of interest, we can acquire more individual users and retain existing users, resulting in a potential revenue increase of $2,655,000 per month from individual users.","src":"Perri Part IV (quantified initiative template)","route":"shape-up"},
{"q":"What is the goal? ... Where are we now in relation to that goal?","src":"Perri ch.15 Product Kata Q1-2","route":"user-research/shape-up"},
{"q":"Don't spend your time overdesigning and creating unique, innovative solutions for things that are not core to your value proposition.","src":"Brian Kalma (Zappos), qtd. in Perri ch.15","route":"shape-up/user-research"},
{"q":"Reserve your time and energy for the things that will make or break your value proposition.","src":"Kalma, qtd. in Perri ch.15","route":"shape-up"},
{"q":"the minimum amount of effort to learn","src":"Perri ch.18 (MVP definition)","route":"user-research"},
{"q":"Version 2 is the biggest lie in software development.","src":"Gothelf, qtd. in Perri ch.19","route":"shape-up"},
{"q":"We are done developing or iterating on a feature only when it has reached its goals.","src":"Perri ch.19","route":"shape-up"},
{"q":"I call the system of two metrics that balance out each other mutually destructive pairs","src":"Perri ch.16","route":"user-research"},
{"q":"You can easily turn a vanity metric into an actionable metric by adding a time component to it.","src":"Perri ch.16","route":"user-research"},
{"q":"the product death cycle","src":"David J. Bland, qtd. in Perri ch.6","route":"design-org-influence"},
{"q":"It's not the customer's job to come up with their own solutions. That is your job.","src":"Perri ch.6 (The Waiter)","route":"design-org-influence"},
{"q":"Nobody wants to hear that their baby is ugly.","src":"Josh Wexler, qtd. in Perri ch.17","route":"user-research"},
{"q":"my role was not that of the big idea generator but that of the bad idea terminator","src":"Perri, Afterword","route":"design-org-influence"},
{"q":"Tying livelihoods to the fact that you shipped product at all, instead of learning or solving problems for customers, is what gets people into the build trap.","src":"Perri ch.21","route":"design-org-influence"},
{"q":"it is not a success if you fail and do not learn","src":"Perri ch.22","route":"design-org-influence"},
{"q":"experimentation is the ultimate risk-management strategy","src":"Perri ch.22","route":"design-org-influence"},
{"q":"Success for you would be automating away your team.","src":"Perri ch.20 (product ops)","route":"shape-up"},
{"q":"Instead of thinking of roadmaps as a Gantt chart, you should view them as an explanation of strategy and the current stage of your product.","src":"Perri ch.20","route":"shape-up"},
{"q":"anything being released as GA—or anything further along in Beta—can be added to its sales roadmap","src":"Perri ch.20","route":"shape-up"},
{"q":"It's far wiser to look at funding product development like a venture capitalist","src":"Perri ch.23","route":"shape-up"},
{"q":"Who came up with the last feature or product idea you built?","src":"Perri Appendix (six product-led questions)","route":"design-org-influence"},
{"q":"What was the last product you decided to kill?","src":"Perri Appendix","route":"design-org-influence/shape-up"},
{"q":"We believe that [doing this/building this feature/creating this experience] for [these people/personas] will achieve [this outcome].","src":"Gothelf, Lean UX ch.3 (subhypothesis template)","route":"user-research"},
{"q":"none of your metrics will be meaningful if you don't have a benchmark in place prior to writing your hypotheses","src":"Gothelf, Lean UX ch.3","route":"user-research"},
{"q":"you can always go leaner","src":"Gothelf, Lean UX ch.5","route":"user-research"},
{"q":"three users, by 12 noon, once a week","src":"Gothelf, Lean UX ch.6 (3-12-1)","route":"user-research"},
{"q":"They run approximately 600 test sessions per year at a total cost of about $30,000","src":"Gothelf, Lean UX ch.6 (Meetup)","route":"user-research"},
{"q":"Whatever is ready on testing day is what goes in front of the users.","src":"Gothelf, Lean UX ch.6","route":"user-research"},
{"q":"Look for patterns ... Park your outliers ... Verify with other sources","src":"Gothelf, Lean UX ch.6","route":"user-research"},
{"q":"Speed first, aesthetics second","src":"Jason Fried, qtd. in Lean UX ch.8","route":"FLAG: era-tag vs polish doctrine"},
{"q":"it's not iterative if you only do it once","src":"Gothelf, Lean UX ch.8 (UX debt)","route":"design-org-influence"},
{"q":"The effect was dramatic. Once we presented [rework] as debt, all opposition fell away.","src":"James O'Brien, qtd. in Lean UX ch.8","route":"design-org-influence"},
{"q":"lead with conversation, and trail with documentation","src":"Lane Halley, qtd. in Lean UX ch.8","route":"design-org-influence"},
{"q":"clients pay for deliverables, not outcomes","src":"Gothelf, Lean UX ch.8","route":"client-engagements"},
{"q":"The biggest lie in software is Phase II.","src":"Gothelf, Lean UX Preface","route":"shape-up"},
{"q":"In digital product design, behavior trumps opinion.","src":"Gothelf, Lean UX ch.5","route":"user-research"},
{"q":"Design only what you need. Deliver it quickly. Create enough customer contact to get meaningful feedback fast.","src":"Gothelf, Lean UX ch.5 (concierge)","route":"user-research"},
{"q":"all moms are not necessarily your users","src":"Klein, BBP ch.2","route":"user-research"},
{"q":"it's often better for your product to be fabulous for one group of people rather than mediocre for a lot of people","src":"Klein, BBP ch.2","route":"user-research"},
{"q":"A predictive persona is a tool that allows you to validate whether you can accurately identify somebody who will become a customer","src":"Klein, BBP ch.2","route":"user-research"},
{"q":"Don't ask them if they'd use it. Actually try to sell it to them.","src":"Klein, BBP ch.2","route":"user-research"},
{"q":"if you have the perfect candidate for your product and you can't sell something to them in person, how will you ever do it when you're not there to pitch?","src":"Klein, BBP ch.2","route":"user-research"},
{"q":"Five. And then another five. Until you start to be able to predict what you're going to hear.","src":"Klein, BBP ch.2","route":"user-research"},
{"q":"A customer who uses your product daily but hates it is a customer who is open to switching to another solution.","src":"Cindy Alvarez, qtd. in Klein BBP ch.2","route":"user-research"},
{"q":"The best use for surveys, in my opinion, is when you're screening participants for user research.","src":"Klein, BBP ch.3","route":"user-research"},
{"q":"Trouble with prioritization almost always stems from not understanding your users","src":"Teresa Torres, qtd. in Klein BBP ch.6","route":"shape-up"},
{"q":"They were predicting that features would have a 4x impact on a specific metric, but had never built anything that had more than a 1x impact.","src":"Torres, qtd. in Klein BBP ch.6","route":"user-research"},
{"q":"What has to happen for this feature NOT TO BREAK","src":"Klein, BBP ch.6 (Finding the Core)","route":"shape-up"},
{"q":"Your goal is not to ship features. It's to create value.","src":"Klein, BBP ch.6","route":"shape-up"},
{"q":"the more constrained the environment, the more ruthless you need to be about building only what is absolutely necessary","src":"Klein, BBP ch.6","route":"shape-up"},
{"q":"Just keep asking yourself what's next until the user's intent has been met.","src":"Klein, BBP ch.7","route":"shape-up"},
{"q":"Features don't matter. They don't matter at all. All that matters is customer behavior.","src":"Klein, BBP ch.8","route":"user-onboarding/shape-up"},
{"q":"When a new user comes to your product, give them a task.","src":"Klein, BBP ch.8","route":"user-onboarding"},
{"q":"A UX dark pattern is any interface element that is designed to benefit the company at the expense of doing something a reasonable user would not agree to if they were fully informed.","src":"Klein, BBP ch.8","route":"user-onboarding/form-design"},
{"q":"If you don't have a strong core loop, you're building a leaky bucket","src":"Amy Jo Kim, qtd. in Klein BBP ch.8","route":"user-onboarding"},
{"q":"Design the thing that someone will do every day.","src":"Amy Jo Kim, qtd. in Klein BBP ch.8","route":"user-onboarding"},
{"q":"If you could only afford to build one feature, that feature would have to be so valuable that early adopters would pay to have it","src":"Amy Jo Kim, qtd. in Klein BBP ch.8","route":"user-onboarding"},
{"q":"This product/feature/service will fail unless","src":"Klein, BBP ch.9 (assumption prompt)","route":"user-research"},
{"q":"Building a product on unexamined assumptions is like building a house on ground that you haven't tested.","src":"Klein, BBP ch.9","route":"user-research"},
{"q":"We will know this is true if 80 out of 100 people within that persona group have a specific story about wanting to access the same files from more than one device within the past month.","src":"Klein, BBP ch.9 (two-number rule)","route":"user-research"},
{"q":"each assumption is built on the last one","src":"Klein, BBP ch.9 (assumption stack)","route":"user-research"},
{"q":"You'll figure out if your hypothesis is bad if you can't think of any evidence that you can gather for it.","src":"Janice Fraser, qtd. in Klein BBP ch.10","route":"user-research"},
{"q":"If this happens, it is not a neutral result. If this happens, the experiment is a failure.","src":"Klein, BBP ch.10","route":"user-research"},
{"q":"Opportunity cost is still cost","src":"Klein, BBP ch.10","route":"user-research"},
{"q":"make sure that you're not improving one metric at the expense of others","src":"Klein, BBP ch.10 (danger metrics)","route":"user-research"},
{"q":"gaming the metrics","src":"Klein, BBP ch.11 (Shmacebook parable)","route":"user-research"},
{"q":"the empty room problem","src":"Klein, BBP ch.11","route":"user-onboarding/user-research"},
{"q":"You don't have to have all the answers. You just have to make sure that you don't have any wrong answers.","src":"Klein, BBP ch.11","route":"user-research"}
]
```
