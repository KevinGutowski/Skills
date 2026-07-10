# Field Notes — Corroborating Practices (full quotes)

Long-form field material distilled into one-line rules in `SKILL.md`'s methodology sections. Everything here is verbatim from the skill's source notes; quotes from auto-captioned video are verbatim caption text.

## Contents

- Field rituals (Matt D. Smith / Shift Nudge)
- Valio field notes (Valio Con 2012–14 — GMUNK, Craig Henry; Jaytel pipeline)
- Dive Club deltas (Josh Puckett; Katie Dill; tranche 2 — D'Arcy, Batina, Jacoby)

## Field rituals (Matt D. Smith / Shift Nudge — YouTube jSLfQ0sJDCw, wXAa2HNNjM4; "Good Enough UI" interview 4p5LzrAYN30)

Corroborating practices from outside the IC corpus — the same loop, drilled on camera:

- **The one-hour timer:** "I set a one hour timer inside of figma and see how much of an existing design I can improve" — a bounded depth-push rep. Setup matters: duplicate the design as before/after at identical widths ("that one's 430 I want to make sure that one is like right at 4 30 as well just so we have like a side-by-side comparison"), and in critique mode, write the observations as a numbered list before touching pixels ("make them a list so we have some numbers to reference") — noticing first, fixing second.
- **Place everything before judging anything:** rough the whole layout in, *then* tweak — "it's hard to make design decisions like one by one you kind of need to see everything all in place."
- **The good-enough verdict:** "good enough has a place but pushing for excellence does as well" — and the bar drifts down without exposure: "it takes me seeing something like fantastic to be like, 'Oh yeah, we can make things fantastic.'" (Reference-the-best, restated as recalibration.)
- **Ship the safe thing, explore the better one in parallel:** under deadline, "I will try to go ahead and produce something that I know that can work and then I will try to spend as much possible time on this other idea" — depth-pushing without betting the deliverable on it.

## Valio field notes (Valio Con 2012–14 talks, Drew Wilson's conference — GMUNK, Craig Henry)

- **Reference first** (GMUNK): "when you start a project, that's the first thing you should do is start looking at reference, looking at everything… that'll spark your own take on things." His license, via Godard: "it's not where you take things from, it's where you take them to." (The IC "reference the best" move, promoted from depth-rescue to project step zero.)
- **The over-planning failure mode** (GMUNK, his Tycho music-video post-mortem): "I was too organized. It was too structured… Everything was laid out to the every third second… and I followed that and I feel like I shouldn't have." Structure that's locked before the work talks back forecloses the discovery levels of depth — leave room to break your own breakdown.
- **Concept is the special sauce** (Craig Henry): what made his work land "wasn't nice colors and it wasn't intricate Line work or cool lighting… they ended up not being really the special sauce… it comes down to the concept and having a really… great story behind the work." Execution facets polish a concept; they can't substitute for one.
- **Reference-to-rule pipeline** (Jaytel Taste, public repo/post, 2026): when the goal is reusable taste rather than one critique, collect a tight set of high-resolution crops with repeated visual signals, ask independent vision models why each reference works visually (not functionally), fuse the notes anonymously, chunk them before extracting rules, then write imperative constraints plus anti-collapse guardrails. Concrete output beats mood words: "one dominant focal mass", "80-95% neutral tones", "one accent hue", "no fake device chrome", not "premium/polished/tasteful." Preserve labels like editorial/serif/luxury only when they are evidence-backed and tied to visible constraints; do not let one example style become the generic default. For packaging this into a skill, use `creating-skills` (converting-visual-references-to-skills); for applying it as an AI UI auditor, use `working-with-ai` (ai-ui-direction).
- **The passion inventory** (Henry): "figure out what you're passionate about and then when you get the chance to step away from client work and create for yourself focus on those" things — name your recurring themes explicitly and aim self-directed work at them; that's where taste compounds fastest.

## Dive Club deltas (Josh Puckett — wym3V9FycTk; Katie Dill, Stripe — Dpy-yyYXhgU; tranche 2 below)

New from Josh's Dive Club interview, beyond the IC corpus:

- **The three-slider problem → Lissajous solution.** When parameters would each demand a labeled slider, ask "how do we basically get like one slider that can control three different values at one time?" — drive them all from one position on a Lissajous curve. General move: **AI as cross-field prior-art finder** — "how is there prior art out there in other fields that I can run with?"
- **Fidgetability as a named quality attribute** — "things that feel tactile, you can move with them." Supports: constrained co-creation so the result feels "oh, it's mine" (not "picking one of five presets"); play thresholds + sound.
- **Labels-off mystery.** Chunky controls with "no labels on them… as you start to experiment with it, you get rewarded" — for small expert audiences.
- **Scope compression doctrine.** "Instead of creating more scope… take the limited amount of scope that is really essential and just execute it to a bar that folks maybe have never seen before." Backed by the Shakers — "make it as well as you can and make it as simple as you can" — and Bruce Lee: "not daily increase, but the daily decrease."
- **Tokens with functional value.** Mailbox's redeemable waitlist coin → his library-card onboarding → gift cards you literally scratch off for credits. The artifact does something, not just looks like something.
- **Audience-scoped liability.** "I'm okay taking more potential liability from like a usability perspective or accessibility perspective, because I know it's a small audience and this is also my thing." Risk tolerance scales with audience.
- **Reps economics.** Kanye: "I made five beats a day for three summers." "The only shortcut is like, cool, make a lot of things." And AI "compresses your ability to… reach" — far ideas become buildable; keep reach exceeding grasp.

Katie Dill corroborations (Stripe):
- **The 10% skim test:** "you read only 10% of the words on the page — do you get a sense?" Imagery must carry the gist unread.
- **The sentence-H1 pattern:** Stripe's hero is a full sentence; she preferred the short option, the team overruled her ("the team felt strongly… and honestly I think they're right").
- **Beauty as utility:** "beauty for the sake of beauty is a wonderful thing. And there quite literally is utility in that" — without it "you would probably just skim right by."
- **Collison's standing prompt:** "what are the things that modernism left behind" — recovering what the ultra-clean, "sometimes sterile" look lost.
- **AI imagery is never ship-ready:** generated images get hand-reworked; skip it and "subconsciously… you would feel that something's off" — eroding perceived care everywhere else.

Tranche 2 (Polly D'Arcy, Wealthsimple — vdYBohOQYm0; Katarina Batina, Shop app — 0YjO7wShTkQ; Brandon Jacoby, ex-Cash App/Capital/X — RaKFP_DuqpA):

- **The quality hierarchy** (D'Arcy): "at like the bottom of this diagram is functionality" — the thing must literally work — "then we need to make sure that it's reliable… The third layer being performance… we only really can dig into those details and make the experience excellent once those foundations are in place. And if we do it the other way around, it can sort of be a waste" — sequence the depth push: function → reliability → performance → excellence. (Industry-standards floor, ordered.)
- **The "shoplifting" ritual** (Batina): "this funny thing we do called shoplifting… these two to four weeks where design just goes ham on every surface horizontally" — roughly annual, a small group asking what would make the whole product feel a step better. Institutionalized horizontal noticing: depth pushes usually run vertical on one feature; this sweeps the seams between them.
- **Taste = calibrated rule-breaking** (Jacoby): "the tastemakers know when to break the rules and when to push beyond the boundaries of what exists today and when to quiet and to go with the flow. And I think that is actually the like core ability that AI doesn't allow for right now" — knowing that balance is the unautomated layer of craft.
- **Between-the-prompts discovery** (Jacoby): "when you're in between the prompts essentially, being able to like discover… it's not just A or B, but it's some weird C thing that you didn't think of originally that like you stumbled upon as like a happy accident." Ridd's corollary: "you almost always have to cross over the this is probably good enough line in order to get to the some weird C thing." The depth spectrum restated for AI workflows — the discovery levels live past good-enough, in the gaps the prompts don't reach.
