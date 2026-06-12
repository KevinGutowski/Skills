# Prototyping & Presenting — Methods Detail

*Sources: WWDC 2014-223 "Prototyping: Fake It Till You Make It"; WWDC 2017-818 "60-Second Prototyping"; WWDC 2018-811 "Presenting Design Work." The 2018 talk deliberately reuses 2014's toast motif — one curriculum.*

## Toast Modern (2014) — the canonical fake app

An artisanal-toast discovery app demoed convincingly on stage: "Except it's not. None of this is real. It's just a prototype." Built by faking:
- Screens in **Keynote**: screenshot the Music app, block out areas with shapes, color-pick the real nav bar, reuse **three photos of toast for every screen**, invent the text ("toast with goat butter and trout... not a thing"), Special Characters palette as icons (★ for ratings), a text-box "+" as a button — "you've designed an icon in five seconds." Orange theme "because it's the toastiest color of the rainbow."
- **Animation via Magic Move**: slides as keyframes; identical shapes on both slides prevent cross-fades; stagger list items horizontally so they animate at different speeds and "feel like distinct items"; duplicate the first slide as the third for the free reverse animation. Keynote runs on iPhone; taps advance — fake interactivity.
- **Interaction by hacking**: a `Layer` convenience class over UIImageView; the "list" is one tall screenshot moved by touch deltas (constrain to y); the map is an oversized screenshot with pins "sprinkled in an artisanal way"; typing is a slideshow of keyboard images. "Don't engineer it, just hack it together as quick as you can."
- The payoff lesson: the grid-view concept was killed by **a drawing** — "would've taken a whole bunch of real code. For our prototype, we just made a quick drawing, which was enough to realize that this concept sucked."

Marching orders by role: company devs — tell management prototyping saves time and money; solo devs — "draw, animate and hack before you go and build something"; designers — "don't just draw pictures, also make animated and interactive things"; managers — "make time for your designers and engineers to prototype."

## The 60-second timer (2017)

Keynote doc at iPhone size; shapes for the clock face and Start button; the **rotation-pivot trick** — copy the clock hand, paste an invisible mirrored twin below, group them so rotation pivots on the clock's center; rotate with **no easing** "to make it look just like a real clock." On-device tests in context: a coworker timing a pH test; David solving a Rubik's Cube (verdicts: Start button too small, wants a countdown, wants digital time). v2: bold red face, white hand, whole lower half as the tap region, a "Timer Done" slide. Parallel explorations followed — film-developing timer, steak timer, a tooth-brushing timer for a kid. Triage: "a few things won't work at all, and it is great when that happens. You've just learned something very valuable… and you're not going to be spending designing time or programming time building things that would not have worked out."

## Presenting (2018) — the texture behind the ten rules

- The audience caricature: "detectives of design crime, guardians of good sense, Draculas of deadlines, and captains of code."
- On stubborn problems: "When you have exhausted all possibilities, remember this: you really haven't."
- Recaps work "like that 30-second refresher" before a TV episode; assert when you'd like feedback ("it almost certainly won't work that way but still do try").
- Relatability demo: "ding, a handy reminder it's time for breakfast… just one swipe down and we're toasting" — first-person narrative; flow diagrams suit engineers but disconnect for concepts; a live prototype is strongest.
- Duarte structure applied: "Today, people are frustrated — cold, joyless toast. It's an epidemic. But imagine happy, flawless toast at the top of the button on your iPhone."
- "If I had more time, I would have written a shorter letter."

## Quotables trimmed from SKILL.md (2014/2017/2023, Stamatiou)

- On Magic Move vs code: "It's so much easier to pare down… when you don't have to throw away code." (2014)
- On hacking interactions: "It doesn't have to be good code or reusable code." (2014)
- On parallel exploration: a diverse team "will let you stumble upon things you never would have on your own." (2017)
- The 2023 framing that supersedes "never real code": "common things should be easy and complex things should be possible" — SwiftUI "lowers the floor for simple tasks and raises the ceiling."
- The elevation bug texture: hilly San Francisco data hid a Y-axis bug that flat New York routes exposed — "as if you were hiking a mountain"; "I can get carried away designing for ideal scenarios… it's important to find out where my designs break." (2023)
- On demos leading reviews: "No slide deck in the world can compare with one spectacular demo." (2023)
- Stammy on mocks (Craft, 2022): "Figma is where initial hunches live; a starting point. Not final designs. It's not until I start building and really using it that I get more signal to understand what aspects of the design feel good." And: "never treat design as something you just handoff to engineers… Treat it more like a conversation between design and engineering."

## The complete question battery

Before making: what needs to be more real? · what can we fake? · where will they use it?
While showing: do you know how to do X? · is it easy? · how can we make this better?
After: what's working? · what's not? · what other ideas does this give us?

## Field note — keep exploration loose, structure later (Stamatiou)

**Keep exploration loose — structure later.** Field note (Paul Stamatiou, 2022 — https://x.com/Stammy/status/1488310850008104960): "figma auto layout is great when you have mature designs, ready to scale / componentize. but auto layout is the worst thing when you're quickly exploring wildly different concepts and you spend most of your time fighting it." The same defer-the-engineering ethic as "hack it, don't engineer it" — don't pay the systemization tax during divergence. His "Craft" essay extends it to design systems and a divergence prompt (https://paulstamatiou.com/craft/): for new products don't start from the design system — "applying your design systems thinking… all too eagerly may prevent you from noticing the obvious"; to break your own aesthetic tendencies, ask **"how would [another company] design this?"** and mock up their answer — "I may hate it, but it will get me thinking."

## Field notes — Make tier (spatial context, scaffolds, Figma's role)

- **Prototype at true spatial context** (Jae Park, Config 2025): for anything viewed off-desk, fake it at real distance/angle — his foam-core Echo Show model with a 7-inch tablet, evaluated from 10 feet across a conference table ("it was two Kleenex boxes short"), beat a PRD spec'd at desk distance. Full physical-tier methods (mockups, rigs, jigs) → `hardware-product-design`.
- **Scaffold, don't script, for collaborators** (PBJ article): hand a collaborator structure that frames the problem (10 acts of storyboards — "a scaffold") while leaving the craft decisions theirs. **Prototype the core loop before the app exists** (CapWords): they validated photo→cutout→LLM-naming by manually feeding VisionKit cutouts into ChatGPT — "we didn't even have an app yet."
- **Figma diverges, code decides** (Mariana Castilho, poolside/Vercel): use the drawing tool only for fast divergent exploration and flow communication — "most of the times I don't even finish my designs in Figma… 99% of the times the final output in code looks nothing like my initial sketch." Component motion and interaction feel are *never* prototyped in Figma — always tuned in code where the real parameters live.

## The animation documentation matrix (Rachel Nabors, *Animation at Work*, A Book Apart 2017, ch. 4 "Communicating Animation")

Three artifacts document animation, and each carries only part of what a team needs:

- **Storyboards** — values + reasoning, no feel. "Storyboards are useful because they put words, even values, next to snapshots of an animation… a great place to document *why* a decision was made." But "you can't demonstrate or test an animation's look and feel with them, and they are clunky to integrate with existing online design guidelines. But, as far as quantifying what changes when, tried and true storyboards can't be beat."
- **Animatics** — feel, no values. "Where storyboards excel at providing deliverable values and inline reasoning, they fall short at conveying an animation's 'mouthfeel'… If a picture is worth a thousand words, then an animatic must be worth a thousand meetings." Yet "animatics are terrible for developers to work from because they don't provide values for an animation's easing, duration, and properties."
- **Prototypes** — testable, unarchivable. "Prototypes give us the chance to observe real people doing real things with our animations" — but "prototypes, unlike storyboards, are terrible for documentation: only code-savvy team members can read them, and the files must be organized and sometimes compiled or served before inspection."

The rule that falls out — always couple verbal + visual: "The best approach to get both deliverables and archival information is to combine two of these approaches: coupling animatics with storyboards, or adding live microinteractions to design systems along with the values necessary to reproduce them. The former works great on smaller teams and projects on a shoestring budget, while the latter reinforces the authority of a larger enterprise." (DS-side counterpart — timing tokens, microanimation vocabularies → `design-systems`.)

## Field note — the caricature technique (Show)

**When words fail on visual nits, draw a caricature** (type-designer technique, 2018-801): redraw the shape "with exaggerated features… through that drawing, usually the other people can start seeing that much more toned down but existing feature." Finding "the joint gaze… is the key of a successful collaboration in design." And budget patience: "you can't hire more people to get there faster. You just have to sit with it."

## Field notes — Polygon at scale (Vox Media team, Valio Con 2013 — Drew Wilson's conference)

The Polygon launch (Ted Irvine, Ryan Gantz, Brent Laverty, Georgia Cali, Warren Schultes — 25 key screens × 3 breakpoints, tens of thousands of pages at launch):

- **The decoy mood board:** stakeholders said they *didn't* want a video-game-looking site, so the team "did put together a mood board… that was everything that they said they didn't want… just to make sure… we showed that first and i remember he was he was just like nope." Cheap insurance: prototype the rejected direction to confirm the rejection — and to make the chosen spectrum legible by contrast.
- **"Get real as early as possible":** the lead front-end developer "was kind of actively present in campfire and in a collaborative mode with designers as they were working through things" — embedded in exploration, not waiting at handoff, "able to get ahead of stuff to anticipate what was coming." (Same lesson as Stammy's design-as-conversation, learned at publishing scale.)
- **Plan for polish at the end:** with responsive work, "so much of the detail is in how things fall across break points or the interaction that you don't really experience until you get into a touch environment… you have to plan for polish at the end and not the beginning" — budget a designer+front-end refinement phase as a *scheduled* stage, not leftover time.
- **The production-dependency test:** SB Nation "had based a ton of design around knockout and there was no screen smart of knockout" (Hoefler's Knockout had no screen-optimized version) — "we had gone really far down the road" before discovering it, forcing a radical shift to Gotham Narrow. Verify every production dependency renders in the target medium *before* designing around it; "until the thing is actually on production and turned on and exist it's not done."
- **Real content always:** "gut checking… every choice that we were making with… real content" their editors "were publishing on the verge… every choice along the way" — 20 type boards, three meetings with editorial stakeholders, zero lorem ipsum.

## The prototyping team's 2022 Q&A (Learn)

From the team's 2022 Q&A:
- **No hole-in-ones:** "If we're not getting feedback on something, we're just not showing it to the right people."
- **Keep multiple directions alive** — several prototypes, or one with sliders/preferences; when feedback conflicts with the current direction, "we keep both around to let people compare."
- **Phrase feedback as the experience, not taste:** not "I don't like this color" but "I think blue instead of red would better communicate what the experience is about."
- **Let the creators scope the feedback** (Metts & Welfle, *Writing Is Designing*, ch. 8): before someone presents, ask "What sort of feedback are you looking for?" — "It empowers them to control the conversation and avoids a feeling of vulnerability, like they've been thrown to the wolves." Same chapter's facilitation move: worksheets/canvases make "the thing… asking for information," shifting you from interrogator to facilitator.
- **Refocus on what wins hearts:** with dozens of ideas competing, advance the two or three people loved; "no one true winner" is fine — the rest recycle into future work. And the recurring trap: "we sometimes get caught up in trying for a perfectly polished prototype" — always remember the question the prototype exists to answer.

## Team-of-one prototyping (Leah Buley, *The User Experience Team of One*, Rosenfeld 2013)

When you need buy-in as much as answers, make the artifact participatory:

- **Turn any meeting into a design session.** Sketch live and invite non-designers to sketch — "people love it when ideas start to become tangible." The imperfect, in-progress artifact is the invitation; it makes the work less threatening and turns spectators into co-authors.
- **Avoid the prototype drop.** "Don't just release the prototypes into the wild and ask people to send feedback." Review synchronously; if testing, "invite the team to observe" so learning transfers to the room rather than landing in an unread doc.

The influence stance around these methods (listening tours, pyramid evangelism, size-not-permission negotiation) lives in `design-org-influence`.
