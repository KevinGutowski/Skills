# AI Experience Design — Worked Examples

*Sources: WWDC 2019-803 "Designing Great ML Experiences"; WWDC 2025-248 "Explore prompt design & safety for on-device foundation models"; plus the 2024–26 sources listed in [sources.md](sources.md) whose full quote texture lives here.*

## Contents

- Data & metrics (2019) · Output patterns (2019) · Input patterns (2019) · Generative layer (2025)
- Fairies (Ruiz multi-agent canvas) · Shape of AI (Campbell) · Tokens before pixels (Silber) · Swarms and waiting · Linear worked patterns
- Full quote texture moved from SKILL.md: Proactive AI over bolt-on chat (Evil Martians) · Zhuo's conversational-interface critique · Confirmation fatigue (Stamatiou) · Relational & agentic AI (Config) · Cursor's AI-surface laws (Ryo Lu + MDS) · CapWords field notes · Agent-era surfaces (additional quote texture)

## Data & metrics (2019)

- **Portrait mode:** data deliberately gathered across races, cultures, scenarios — "historically, face recognition hasn't worked well for people of color." The quote to keep: "You shouldn't optimize for the customers you have. You should optimize for the customers you want."
- **Face ID's 1-in-a-million:** "doesn't tell the whole story. Each failure is a person, a scenario" — Apple publicly communicated the twin/lookalike limitation rather than hiding behind the aggregate.
- **App Store:** time-in-app as a metric would box people into more of the same; editorial content and diversity-aware metrics correct what raw engagement misses.
- Practice: group failure cases into scenarios; decide non-ML fix vs. better model; "the more you rely on something, the more you should question it."

## Output patterns (2019)

- **Multiple options:** Maps shows meaningfully *different* routes — "we can't know everything that a particular person may care about"; the Siri watch face surfaces a few of 19 data sources by time/location/history.
- **Attributions:** "Because you downloaded NYT Cooking" (objective fact) vs. "because you love cooking" (profiling judgment — never). Siri cites Wolfram Alpha for trust.
- **Confidence:** Hopper converts fare confidence into *wait vs. buy now*; Lyft shows pickup *windows*, never "72% confident you'll arrive at 1:30"; Photos asks "Is this you?" instead of auto-labeling at low confidence.
- **Limitations:** Memoji coaches inline when the face is out of view or too dark; Mac Siri (no timers) offers a reminder — the goal-equivalent alternative.

## Input patterns (2019)

- **Calibration:** Face ID scans twice, then adapts forever via implicit feedback; HomeCourt's hoop detection is quick and essentials-only; calibration data stays editable/removable.
- **Implicit:** keyboard tap-target resizing; Siri app suggestions by context. "It's better to be patient and become certain of a suggestion than to be quick and show an unhelpful suggestion."
- **Explicit:** negative-first ("Suggest less" / "Hide this suggestion," with per-source/person/app sub-options) — a "Love" button "implies homework"; act immediately and persistently.
- **Corrections:** retyping "Angie" over the "angle" autocorrect; the suggested crop as a starting point on standard handles. Corrections feed back as implicit signal. "These patterns are not necessarily new but they are applied in a new context."

## Generative layer (2025) — verbatim prompts & specifics

- The ~3B on-device model vs. hundreds of billions server-side; the bagel demo: it invents toppings for a plain bagel — "a weird bagel flavor might be funny in a game rather than misleading" (fine for an NPC, not an encyclopedia).
- Prompts spoken in the talk: `"Generate a bedtime story about a fox."` (+ "in one paragraph"); a fox role "who speaks Shakespearean English"; instructions `"You are a helpful assistant who generates scary stories appropriate for teenagers."`; diary instructions `"You are a helpful assistant who helps people write diary entries by asking them questions about their day."` → user: `"Ugh, today was rough."` → model: `"What made today rough?"`
- Few-shot: "fewer than five examples… directly into your prompt." Stern voice: all-caps "DO NOT."
- **Instructions > prompts** ("our model is trained to obey instructions over prompts"); instructions never from untrusted content. Guardrails run on inputs *and* outputs (output-guarding catches jailbreaks that slip input checks).
- Guardrail-error handling: proactive features swallow silently; user-initiated features show an alert or alternatives (Image Playground lets you undo the offending prompt).
- The flexibility-vs-safety spectrum: raw user input (max flexibility/risk) → your prompt + user input → curated built-in prompt list (max control).
- Use-case mitigations: bagel-flavor generator + allergies → warning UI or dietary-restriction filters; trivia app → instruction lines, keyword deny-list, or a trained classifier.
- Eval: cover all use cases + likely-unsafe prompts; automate end-to-end; LLM-as-grader to scale; "test the unhappy path"; re-run when prompts or Apple's model change; report via Feedback Assistant. "Happy prompting! But remember, safety first!"

## Fairies (2025–26) — Steve Ruiz's multi-agent canvas, worked (Dive Club podcast, 3SvL0r-Lhh8)

tldraw's "fairies" demo as a worked example of metaphor-driven agent UX:

- **Why fairies:** "They could be little like bugs or they could be like fairies. They're small… They kind of fit the cursor size. They're not people. They're definitely not people, but they're like kind of humanoid. They're not bonded to you." Even the folklore branch was chosen for tone — Irish fairies are "terrifying… Steal your kids"; "they're definitely English fairies" (the charming Tinkerbell kind). Right-sizing the creature right-sizes user expectations of the model.
- **Legible state, no dashboards:** wings "start flapping to represent it working"; a fairy taps its chin and says "that's too much work for me. Let me summon some other fairies" — then "switch[es] into an orchestrator mode… creating tasks and assigning tasks to the other agents… checking in on the progress." The host's read: "even down to the posture of the fairies as a signal for what they're doing."
- **The kill switch is social, not modal:** "Oh, no, no, no. stop, stop building that. That's just wrong. You know, bad fairy."
- **Metaphor → feature and feature → metaphor:** MCP access becomes the fairy "warging into Notion… eyes roll back in its head" (busy + unavailable while perceiving elsewhere); fairy lore's gift-giving maps onto context files — "you could kind of leave things for the fairy… extra context that if you're working in this area, make sure that you read this first… little context files or agents files." The "enchanted pond": a folder-scoped agent — "if anything enters the pond… that should be the prompt to this agent… establishing a domain, a folder… an AI agent that essentially manages the contents of that folder."
- **Game AI as the architecture:** "it's actually very similar to video game AI… StarCraft or CRPGs… little entities that have their own little state machine of like I'm waiting, I'm acting, I'm moving." Turn-taking, waiting, and role/mode switching are solved problems in game AI — borrow them.
- **Why the canvas:** code "is really not good at that ideation stage… not good at making decision[s] and comparing things together" — even agent-parallel tools (Cursor worktrees) are "very clunky… not the way that you compare things… tweak and dial in." A good tool gives "that safety net of I'm not destroying anything" plus side-by-side comparison — the canvas is that medium for agent output.
- **Ship before maturity:** the prompts-on-canvas work "sucks. It's going to be shitty, but it's also going to be amazing because we were all totally impressed by it internally, but it was clearly not enterprise software."

## Shape of AI — Campbell's taxonomy, worked (Dive Club podcast, PEDzBT-jNmI)

Emily Campbell (VP Design at HackerRank; creator of Shape of AI) pockets "the patterns that I'm seeing emerge into categories":

- **Wayfinders** — "first we've got what I've been calling wayfinders and these are the things that help me understand how to get started." Examples: sample galleries — "how are other people using this AI? What prompts are they using? Can I actually go in and see how they got to this result… and then have a starting place." And onboarding never ends: "there's a continuous onboarding inherent in these experiences. As AI is getting to know you, it opens up new ways to interact with it."
- **Tuners** — keep the human feeling "like they are the ones always in charge": preset styles; the prompt enhancer ("if I hit enhance prompt, it actually writes essentially a PRD for me" — "removing the sense that I always need to have the answers"); intent echo-back ("having AI say back to you, okay, this is what I actually understand this action to be. Is this right?"); model-choice guidance — against ChatGPT-5's automatic router, Krea "does a really good job… telling you, hey, use this model if you're looking for human accuracy in photography, but if you are producing more like generative artwork… use this other model."
- **Governors** — "this category of governors, which is where you see a lot of trust": planning mode ("Replit does, I think, the best job… If you tell it what you want to build, before it ever builds something" it shows the plan — "you don't need to necessarily be the product manager for AI"); inline stream-of-thought — "the number one thing… I'm paying attention to right now because it's changing really fast."
- **Trust builders** — "literally trust builders." The umbrella law: "It's almost like the new usability becomes how quickly can you build trust in a legible way… the user knows okay something's happening that I can understand."

**The intern trust-ladder** — pace oversight to demonstrated competence: "if I hired an intern, before I trust that intern… I'm going to meet with them daily. Hey, show me what you were working on. Show your work… let me talk to you a little bit about border radii… come back to me, show me that you learned it. But after I've seen that a few times, I'm going to start stepping away." Governors should loosen on a schedule the user controls.

**Inverted onboarding** — instead of interrogating new users for context ("they just start asking you questions because they're trying to build context about you"), an agentic-workflow tool "inverted that and said, 'This is what I think I know about you. Let me just prove to you that I'm good at what I'm doing at step one of onboarding'" — enter a URL, connect Gmail, it immediately reflects context back. The host's gloss on why forms lose: "hey, go and fill out five forms about your personal tone of voice. No man, go to my email. My email contains my tone of voice." (→ `user-onboarding`'s funnel-inversion rule, AI-native.)

**Defaults are consent design** — the Limitless Pendant "originally had this incredible feature where it would only record once it actually heard consent from another person in the conversation… And they've removed this by default. It's still available as an option, but they've removed it by default, which I think is telling." Designer responsibility now sits below the visible interface.

**Service-design-first** — "we've been building software as a service and now it's almost like well design the service first and then say how do we translate this to software."

**Model as party; brand as personality** — get designs into code fast "because the model itself is now part of the experience. It's actually a party to the experience"; and "what is the personality of AI when you first meet it during onboarding? That's brand."

## Tokens before pixels — Ian Silber, OpenAI (Dive Club podcast, oM1d9Tau27w)

- The reflex: "a lot of times it's like, 'What can we do this without pixels? Can we do this with tokens? Can we do this with the model itself?'… What can happen directly in the conversation and in the flow."
- **The capability gap**: "the models actually are now at a point where they can do a lot" (Codex spending tokens over long runs) vs what everyday usage exercises — "there's actually now a gap." Product design work lives in closing it.
- **The Madden constraint**: "you do have to deal with the realities of what it is now because if you go too far ahead, you can't put 11 people on the field" — design slightly ahead of the model, never past what it can execute.
- **Dynamic user interface library**: "a whole system called the dynamic user interface library, which allows us to design things that the model can then interpret" — components as a vocabulary handed to the model, not screens you ship.

## Swarms and waiting (Dive Club podcast, tranche 2)

- **Spreadsheet as agent-swarm harness** (Flora Guo, Paradigm, mdV8APhz2j4): "we work on a way… to prompt basically a thousand agents at once. There is this interface of the spreadsheet which people are so familiar with as knowledge workers, but it's just a completely different model" — the formula cell becomes a prompt cell. Scaffolding heuristic: with structured data ask "what are the invariants? What are ways that you can pull out something that is constant across all of them… so that the AI can really help you build it out as you scaffold it."
- **Loading time as education surface** (Kyle Xantos, oYc_dF95VAE): "AI tools need so much proactive handholding and education… little just cyclable tips like that and having like a bank of, you know, 50 plus that also get added to… in real time as your app progresses… is one of the best ways I've seen for using AI['s] processing time" (final phrase garbled in captions). Complements the HIG specific-progress rule and Ryo's curated-focus waiting states in SKILL.md.

## Linear worked patterns

- **Triage Intelligence: trust stack.** Place suggestions inside the existing triage workflow, not in a separate AI drawer. Use the product's native metadata language for labels, assignees, projects, and related issues; clearly distinguish AI suggestions from human-entered or rule-generated metadata; show short reasoning at point of use; offer a deeper trace for users who need to audit what context the model used; and allow workspace/team guidance to tune future suggestions.
- **Progress for reasoning models.** When frontier models are slower than deterministic UI, show a meaningful thinking state and elapsed time so the feature feels active rather than stalled. Do not fake precision; expose enough activity to make waiting legible.
- **Agent identity.** An agent should have a visible workspace identity, admin-manageable permissions, and a clear agent marker. It may appear in people-like surfaces such as mentions or assignee menus only when explicitly scoped to do so.
- **Session state.** Wrap agent interactions in sessions with states like waiting, working, completed, and errored. This gives users a handle for what the agent is doing and gives developers a consistent surface for replies.
- **Delegation, not assignment.** Assignment transfers accountability to a person. Agents cannot be accountable, so show the human owner and delegated agent separately. This prevents orphaned work and clarifies whom to talk to when output needs review.

## Proactive AI over bolt-on chat — Evil Martians (2024), full quotes

"Simply copying and pasting AI chat interfaces isn't the answer" — three escalating modes inside the user's natural workflow: *suggestion* (context monitoring surfaces help as the user works — "the key innovation here is the timing… suggestions appear as the user writes," not flagged after the fact), *action* (decompose complexity: sub-tasks, groupings, estimates), *question + action* (proactive asks inside the flow, never a separate chat). Three governing principles: AI "should supplement user agency — but it should not replace it"; "never force AI recommendations — present them as helpful options"; integrate "within the user's natural workflow, not as a separate conversational interface." When chat is the right shape, the chatbot laws: intuitive commands + interactive onboarding tasks ("users rarely take the time to actually read instructions"); error-tolerant input ("our goal is to try as hard as humanly possible to comprehend the user's request" — golden mean between auto-correct and asking); feedback within ~2 seconds or show state; tactful personalization; every error gets a clear, personable message and never crashes the bot.

## Zhuo's conversational-interface critique (2025), elaborated

Chat won because natural language + messaging were already familiar, but the pattern has five predictable gaps. (1) Blank page: a blank input shifts discovery burden to the user; show use cases, examples, templates, trending prompts, and continuations. (2) Iteration: text commands are slow for refinement; marry chat to direct manipulation, editable canvases, selectors, and variants. (3) Input/output: choose the most obvious mode for the intent, not the same mode for both sides; moodboards, prototypes, diagrams, voice, or charts may beat prose. (4) Scope: the AI should know when it is outside its competence, state uncertainty, and suggest a different approach. (5) Personalization: ask situational questions like a good collaborator, then adapt presentation to how the person understands best.

## Confirmation fatigue — Paul Stamatiou, crypto-wallet design (2021)

Source: https://paulstamatiou.com/crypto-design-challenges/. When every interaction triggers an approve dialog, people "absent-mindedly get into a habit of accepting these without quite understanding what's happening." For agent and AI permission prompts: reserve interrupting confirmations for genuinely consequential or irreversible actions; make each dialog state specifically what is being granted, to whom, and with what risk (identical-looking dialogs train the reflex); and pair every approval with visible recourse — how to undo or revoke after an accidental accept.

## Relational & agentic AI (Config 2024–25), full quotes

New Computer's Sam Whitmore & Jason Yuan; Perplexity's Henry Modisett; IDEO Play Lab:

- **Find the human analog** for the software's role — search engine ≈ librarian, mail app ≈ postal carrier — and keep the AI's tone and initiative within that analog's social license ("skeuomorphism for relational design"). If it will exceed it, say so up front.
- **Move boundaries by protocol**: start firmly at the previous boundary → make the offer → state where the new boundary ends ("I notice you're using Notes a lot — want to give me more access to reason on top of that?"). Consent must be contemporaneous — old data was never consented for new reasoning.
- **Capability legibility**: continuously signal the extent of perception (Clippy's eyes say "I can see your screen"); an assistant that comments on something it shouldn't have seen reveals covert watching and destroys trust instantly.
- **Trust takes calendar time** (~six months for human closeness) — full-access on day one "felt weird even with consent." Pace personalization to relationship age, and prefer **shared history over stated preferences**: what people do repeatedly beats what they say they want.
- **Don't default to chat** (Perplexity's anti-chat decision): "a conversation has all this extra cognitive load… any extra word or pixel on the screen that isn't your answer is wasted." If you need a date, use a date picker. **Show sources for every piece of content** — "an honesty that establishes trust." You're "building machines, not screens": ship something simple and mold it; design **bulletproof stencils** that look good no matter what the model emits.
- **Automate the burdensome, protect the rewarding** (IDEO Play Lab): AI may fix grammar; it must not write the essay — "writing is about thinking." Decide per-task which kind of work it is before automating. (Duolingo's corollary: AI tutors beat human ones partly because they remove *social anxiety* — sometimes the AI's advantage is emotional, not functional.)

## Cursor's AI-surface laws — Ryo Lu (2025) + MDS, full quotes

- **Chat-only is a bad floor:** "imagine there is only chat. I think that will also be like a really bad experience" — blank input, you must initiate, ask the right questions. Re-skin the prompt→response primitive instead: inline inputs, selection actions ("select some element in my artboard and say make four variants"), autocomplete-as-Tab — "underneath it's the same thing."
- **The human-opinion law:** "There needs to be something for the human to specify what is good, what is right, how I want to do it. If you don't put in that opinion, it will just produce AI slop" — the LLM "has seen everything and it doesn't really have an opinion."
- **Multi-agent steering:** dumping "15 agents… 2,000 lines of changes" on a human is "all horsepower, no steering wheel." Cluster changes "semantically," and front the swarm with one agent that's "almost like your PM" — triaging what's blocked, what's fine, what needs your eyes.
- **AI-waiting states:** show real progress but curate focus — "when things are happening, where do I want people to focus their eyes on?" No "random empty states with spinners everywhere," no twin spinners, no "looping some random messages" (vanity status lines are "actually kind of distracting").
- **MDS's "AI pilots" stance** (Matt D. Smith, "Good Enough UI" interview 4p5LzrAYN30) — the same human-opinion law from the user side: he refuses to vibe-design ("Anytime I've ever tried to vibe design, it just didn't live up to my standards"); the anti-pattern is prompting "change P8 to P4" when "you could literally just highlight the four and change it to an eight yourself" — design AI surfaces so direct manipulation stays cheaper than prompting for tiny edits. The durable role: "there's still going to be the need for someone to understand what they're doing and what makes it good."

## Field notes from CapWords (2025 ADA winner for Delight & Fun; Apple article), full quotes

- **Choreograph latency into the flow:** the user-facing confirm step ("is this the object you want?") *is* the API wait — "that confirmation step actually gives the system time to get results," staged capture → remove background → confirm → display, with a micro-animation so "most users don't notice." Hide model latency inside an interaction the user would want anyway.
- **Platform frameworks before bundled models:** they evaluated shipping on-device models and rejected them (storage, download time, ragged edges) in favor of VisionKit + system APIs — "it worked really well without needing to integrate big models inside the app."
- **Privacy by architecture:** photos go to the model for one-time recognition and are deleted; nothing stored locally, no server to upload to. The strongest privacy story is the one with no data to protect.
- **Warmth is the product:** the founding gap was emotional, not functional — a translation app's "robotic voice" vs. a parent's answer. Users called it "the warmest and most humane AI I've ever used."

## Agent-era surfaces (Dive Club, 2025–26) — additional quote texture

Quote texture behind the SKILL.md one-rule-per-source list; the Ruiz fairies, Campbell taxonomy, Silber tokens-before-pixels, and Guo/Xantos swarm sections above carry their full treatments.

- **Design the harness, not screens** (Brian Lovin, Dive Club podcast, dvEwb1Ajkwo): "as soon as you realize you can't design half of this stuff in Figma, what you're really designing is the harness for the agent to do longer things and verify its own work." Design at the model boundary — frontier users' "tolerance… for sub-par experiences is actually quite high… people are still willing to crawl over glass" to reach new capability.
- **Chat is a power-user interface in disguise** (Geoffrey Litt, Dive Club podcast, zJf0UeCwQqE): "AI chat is actually a very power user interface. People think that it's like a simple consumer interface." Its two structural limits: no mutual pointing ("I need to point at things out to the AI. AI needs to point things out to me") and text-only returns ("I want to get back like an interactive chart that I can mess with myself, not just like a number"). His fix — human-AI collaboration as a version-control problem ("version control is the thing that matters"; Patchwork's one-button branches that "12-year-olds understand") — lives in full in `malleable-software` §5.
- **The multi-agent problem statement** (Steve Ruiz, Dive Club podcast, 3SvL0r-Lhh8): "it's very hard to remember which agent is doing what and which agent is which and what context they have." Code is "really not good at that ideation stage… not good at making decision[s] and comparing things" — the canvas is the compare/branch medium.
- **Generation is want-articulation** (Luis Ouriach, Dive Club podcast, Pn2G7JhxNKc): "the ability to articulate what you want is not there for the vast majority of people" — the product's job is eliciting the want, not just executing the prompt.
- **Personalization bounds** (emerging theme, two sources — watch for a third): Worboys's one-of-one ambition — "I want everyone who's sitting at a dinner table to open their cash apps and put them on the table and every single one looks different" (Cam Worboys, Dive Club podcast, KH9GBasDTI8) — vs Choy's fixed/flexible law: "you don't want your login screen to change every single time you log in, but you might want your dashboard to be flexible… The decision of what to keep fixed, what to be allowed to customize, how you guide people through that, that's like fundamental UX" (Megan Choy, Dive Club podcast, V-jd3v9P-Ps).
- **Early-days posture** (panel, Dive Club podcast, V-jd3v9P-Ps): "we have really only solved two use cases… Search and coding" — and design from observed behavior, not assumed preference: "if you were to tell me last year that people would like having four terminal windows open I would have been like that's crazy… and then we saw our team do that."
- **Context and agency are the durable design job** (Soleio Cuervo, Design Chat clip, 2026 — https://x.com/soleio/status/2052435210365477305): if agents can handle visual execution, the designer's leverage moves to influencing the product directly and owning the iteration cycle. Design Buddies' recap (2025) frames the same shift as increased surface area and orchestration: designers guide intelligent systems, connect choices to metrics, and create coherent releases across surfaces. In practice: design the context the agent sees, the knobs the human can steer, the evidence loop after generation, and the system/story/world the outputs belong to.
- **AI apps compete as products, not model wrappers** (Soleio Cuervo, X 2025 — https://x.com/soleio/status/1885074028848964011): raising from designers and hiring top design talent is a market signal that the company intends to compete through design. When model capability commoditizes, durable advantage shifts to workflow fit, speed, trust, craft, and how cleanly the AI vanishes into the job.
