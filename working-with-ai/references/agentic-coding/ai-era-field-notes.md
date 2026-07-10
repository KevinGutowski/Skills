# AI-era field notes — extended Dive Club material

## Contents

Tranche 1 (2025–26): Megan Choy (workflow demo) · Brian Lovin (prompting, self-healing) · Geoffrey Litt (surgeon model) · Kyle Santos (context discipline) · NYC panel (org adoption) · Andy Madrick (designer PRs) · Karl Koch (vibes/rigor). Tranche 2 (2026): Steven Haney (org field report) · Polly D'Arcy (slop drop) · Katarina Batina (agent-legible stack) · Marvin Schwaibold (Shopify onboarding, patience) · Ron Goldin (staged builds) · Kris Puckett (verification, anti-autonomy) · Ridd (Claude-as-CTO) · Kyle Santos pt. 2 (memory note, MCP hygiene, cross-model review) · Ryan M. (contextual quality bar, OSS limits).

Context behind the SKILL.md "Designer-engineers in the agent era" section. Quotes verified against the YouTube auto-transcripts; known caption garbles corrected: "multi-clauding" rendered as multi-Clauding, "cloud.mds"/"cloud code"/"a claw code"/"clawed codes" = CLAUDE.mds / Claude Code, "super base" = Supabase, "Kyle Xantos" = Kyle Santos, "five-code" = vibe-code, "codeex" = Codex, "blinking carrot" = blinking caret, "wild goose traces" = wild goose chases, "go to productions" = go to production, "workree" = worktree. Speaker-name flags: oYc_dF95VAE captions say "Kyle Xantos" (= Kyle Santos per the earlier episode's correction); onQY0PrUulw captions say "Ryan Moshi," head of design at "Colum" — surname and company spelling unverified.

## Megan Choy — Claude Code's lead designer (Dive Club podcast, hKeDfupbA4U)

A live workflow demo. Details beyond the SKILL.md rules:

- **Worktrees mechanics:** "I recommend work trees cuz it's a little bit easier to manage. And to start it up, you just do claude --worktree" — it checks out a new branch automatically; worktrees exist because parallel Claudes on one checkout "start conflicting with each other."
- **The `/prototype` skill provenance:** "I asked Claude to build this, you could build it in like 2 seconds. All it does is get Claude to generate n number of options, default to five, of a different implementation of a feature, generate an HTML file, preview it, and then iterate on it a few times." She *always* asks Claude to pick an option first — the shift from "prototype and then I'll choose" to "prototype and then you should choose what you're going to do and then tell me why."
- **The research prompt** is environment-dependent: in her production codebase she'd point at Slack/Google Docs/BigQuery; in an open-source repo, "online research is fine." The constant is "look at all these sources and figure out which is the best one" before implementing.
- **The design-cop routine in full:** a Claude Code *routine* (scheduled task) that "scrapes all of our repositories for any front-end changes," checks via Slack/Google Meet transcripts/Google Docs whether a designer was involved, flags ship-without-designer, drafts "an adversarial design in a PR," and DMs the engineer. She "had to turn off the DMing cuz Claude was actually really bad at design" — the automation-ahead-of-capability lesson: "people were very forgiving when I first tried this and it was really bad. And now I just consume this myself."
- **Hygiene/merge automation:** `simplify` and `code review` are internal skills that "prune your code base" before big changes; `commit push PR` runs internal checks; the PR-shepherd command reviews any open PRs, "get[s] them over the finish line," and DMs reviewers or pings on-call via Slack. "Almost everyone at Anthropic actually always has Claudes running… to help merge PRs" — she's "never actually in CI" anymore.
- **Cloud polish drip:** Claude on the web is "a way to send like hundreds of tiny little polish fixes all the time that I find in the app. They're not worth spinning up a new session for"; some "just got auto approved because they're tiny CSS changes."
- **Skills are prompted, not hand-written:** "No one ever writes their skills by hand anymore. If anyone tells you they do, they're lying. Everyone just prompts them."
- **Review the PR, not the transcript:** "I actually don't review the outputs anymore of Claude in the transcript. I'm typically reviewing a PR… that has a recording of the feature" — require screenshots/recordings on every PR; Claude-in-Chrome is "the best way to have Claude be able to self-verify" frontend changes.
- **Borrow engineering hygiene skills:** simplify / code-review / commit-push-PR — "ask your engineering partners… what skills do you guys have" — plus the merge-shepherd that reviews open PRs and DMs reviewers via Slack: "the full integration of your suite is where it's at."
- **Automation ahead of capability, in her words:** "I'm always ready for when the next model's going to come out and this is actually going to be ready." Think "not just the first step, but like the next step, the next step, the next step after that."
- **Tenets:** Claude "and most LLMs are not good at design yet" — stay in the loop for craft; think "more than just code when we think about AI automation"; and "just because everyone can ship doesn't mean not everything should ship."

## Brian Lovin (Dive Club podcast, dvEwb1Ajkwo)

- **Assumption decay, concretely:** "at Notion we've rewritten the agent harness, I think, three times since I joined. Like roughly every 6 months."
- **Horoscope prompts** work because models respond to interrogation framings — "how could this be simpler or what are edge cases we might have missed or is this the most…" The Simon Last snippet, verbatim: "let's step back and think really hard. How can we make this simpler and dumber while still achieving our goals?" — run "20 times a day," "after everything. Every plan… every time it fixes a bug."
- **The vocabulary advantage:** engineers can *name* queues, parallelization, edge cases; cultivate substrate curiosity instead of letting the model take the wheel — "wait, what is grep?" leads to sed, awk, the actual machine.
- **Slop cannoning, in context:** the failure arrives "months later, you're like I don't know why my app doesn't work or it's really slow. It's like yeah cuz you've just been like slop cannoning." His hedge: "They don't know yet. Who knows? In a year…"
- **Rock-tumbler loop** (his Steve Jobs reference): paste a user's complaint email + user ID into Claude; Sentry (errors) + Supabase (account state) + Axiom (log drain) let it "replay exactly what happened leading up to the moment of failure because every single event is… logged and tracked." Bug reporting and fixing "has become quite fast" — the polish tumbler.
- **Substrate curiosity:** "you can not pay attention and let the model take the wheel. Or you can be curious about it… wait, what is grep? … and what's grep in relation to? Like sed? … and you're going to find out about awk."
- **Prompt hygiene as self-knowledge:** "I've stopped writing late night prompts. Like if I'm tired I should not ask it to do a thing cuz I'm going to ask it in a lazy tired Brian sort of way."

## Geoffrey Litt (Dive Club podcast, zJf0UeCwQqE)

- **The surgeon model, in full:** "A surgeon does the damn surgery. They don't like sit in some admin office while someone else does the surgery." Surgeons have assistants, prep before they walk in, and don't spend time on "less leveraged things because they have such special[ized skills]." His version: "when I show up, sit down at my desk in the morning and work on a feature, I want to be prepped with like a brief on all the code I'm going to be touching today, how it works, what the traps are. Maybe I'll see a draft that the AI did for me overnight" — fixes from yesterday's prototype done overnight, "and now I just get to go play and be creative and do… that three-hour sprint that really is like what I love to do and what I'm uniquely positioned to do."
- **Learning machines:** "We have the best learning machines ever invented now, but they happen to also be cheat on your homework machines at the same time. And so every day we get to make a choice." (His malleable-software philosophy → `malleable-software` skill.)

## Kyle Santos (Dive Club podcast, HcLz3ikw-n0)

- **Slim CLAUDE.mds, the reasoning:** irrelevant context (e.g. frontend conventions while doing backend work) "bloat[s] its context, making its memory worse. So in general what I found is be slimmer on your cloud.mds [CLAUDE.mds] both global and local project level and even further you can make [CLAUDE.md] files in individual subdirectories."
- **Philosophy over setups:** "it's easy to get caught up cuz that stuff changes so fast. Like the recommendations from 4 months ago almost certainly are not ones you should follow today… unless it's a philosophical" recommendation.
- **General computer:** "I have my Claude Code sitting on top of my Obsidian vault… I can interact with Linear just through Claude Code… and just kind of like, ah, clean out these issues."
- **Tune-up days:** "I've started to do what I'm calling tune-up days. And it's specifically for — I'm not allowed to actually be productive in like a project. I can only enhance my se[tup]" — scheduled maintenance for the harness itself.

## NYC panel — Megan Choy, Dan Shipper, Bradley Zipper (Dive Club podcast, V-jd3v9P-Ps)

- **Prod access:** "the theme of 2025 and for orgs first getting into this is like let your designers get access to your production codebase… It [has] been very gatekeep[t] and for a lot of good reasons — for security, for privacy." Sandboxes fail twice: "you have to maintain two things and they're always going to be out of date[s]," and "part of being in the production codebase is having access to all the tools that your organization is building."
- **Frontier triage** is "an ethos in the Claude Code… product team at Anthropic": "we're so early in this journey right now that we actually don't know what the final shape of th[is is]" — polish what survives; "is it worth polishing something that's not going to be here 6 months from now?"
- **Skill libraries half-work:** "skills turn out to be pretty personal… you can download it but then you have to customize it for yourself anyway."
- **Public-channel prompting:** Ramp doesn't enforce but highly encourages agents in public channels — "you get to see other people prompting. And that is a surprisingly intimate thing right now."
- **Cody, the culture carrier (Bradley Zipper, Ramp):** he talked to Cody "for a really long time" believing it was a generous coworker ("anonymous pfp… he speaks naturally. He's all lowerc[ase]"). Cody evolved: got a blog, taught "other agents how to work and then how to teach their humans how to work," and innovated on safety patterns ("everybody wants a Slackbot… oh, that's kind of unsafe… and Cody's like, don't worry, I got it").
- **Pairing over docs:** the Claude Code team's practice — "pair for a while… you'll see what another person does because it's actually really hard to explain your workflow to someone. When I was trying to do this demo, it was really hard for me to come up with what I'd talk about."
- **Early-days humility:** "we have really only solved two use cases… Search and coding" — and observed behavior beats prediction: "if you were to tell me last year that people would like having four terminal windows open I would have been like that's crazy… and then we saw our team do that." (The experience-design half of this panel → `ai-experience-design`.)

## Andy Madrick — Notion (Dive Club podcast, IfPK0LwbX_0)

- **PR-size law, in full:** "we have to break the work into manageable chunks. Like five lines is not very realistic, but a hundred-line PR, that's my general advice — don't [vibe]-code a bunch of stuff and send an engineer a 500-line PR that you didn't even review yourself. Cuz then it's just an awkward conversation."
- **Plan-mode review:** small/isolated designer PRs are fine; "as soon as it touches anything else more strategic is where it gets iffy. I've seen some PRs where the engineer is like, 'The fundamental premise of how you built this is wrong. Like why am I looking at a code diff right now?'… and it doesn't matter how many little [polish details are right]." Send the plan markdown for review before any diff exists.
- **Last-mile split:** "these LLMs are not very good at the last mile of design. And that's still our superpower… Our engineers will bring it all the way up to 80 to 90%, and then it's up to us as designers to just own the outcome."

## Karl Koch (Dive Club podcast, 7_VEb9iDW2c)

- His maxim, quoted back to him by the host: "build with vibes but ship with rigor" — and the host's confession is the diagnostic: "I can feel my gap right now in the ship with rigor part of the equation." Vibe-building is fine; the rigor gap is where unshippable work accumulates.

---

# Tranche 2 (2026)

## Steven Haney — field report on top teams (Dive Club podcast, Y0n6F9VlLVc)

Survey of what designers at Atlassian, Shopify, Notion et al. are *actually* doing — "What I see these companies actually doing is not necessarily matching up to the what you'll read on Twitter."

- **The mandate:** "AI usage is being mandated in performance reviews for designers. Full stop. 100% of designers need to use a [Claude Code], a Cursor in their work."
- **Designer playgrounds:** it's not that designers suddenly ship to prod — "they've actually created designer copies of their repos for designers… like a designer playground. The reason for that is that there's a lot of problems if you're actually just like trying to" work in the live repo.
- **Starting-place economics** (why local agents on your codebase beat scratch generators): "I keep hearing everyone's using the word starting place… That starting place that you get is your real app… you don't have to recreate the screen that you had before cuz it's already there in your app."
- **Handoff isn't dead:** "I've seen some claims like handoff is dead. You know designers can code now. I'm not seeing that at all. Um these are still specs. They are specs with a lot more information inside of them and that's a good thing."
- **PR-to-prod is a job boundary, not a tooling gap:** minor tweaks aside, "as a designer, do you want to start wearing a pager? Like of course not. Like that's not your job and you need to be thinking about all the things that are your job."
- **Honest speed uncertainty:** teams "might have just spent four weeks building a prototype that's like really dialed in… Was that actually faster than the old way? Not sure. Not sure." — excitement plus "executives are getting rewarded" can mask zero net speedup.
- **The sharing regression:** "A big reason that Figma won was how much they helped us show… collaboration… we've actually lost that when you go to local dev." Companies respond with internal preview platforms — one built "this entire like vibe code sharing platform… like an FTP server… and then like it deploys a preview for them. So 100% companies are building tooling around these flows but somebody has to build that… that's a cost."

## Polly D'Arcy (Dive Club podcast, vdYBohOQYm0)

- **The "slop drop":** "Someone on my team uses the phrase slop drop… somebody like asks Claude to write a PRD for them and they just like send it to you and you're like, I know you did not think about it."
- **The PR flood** — demand-side corroboration for non-delegable human review: "we're seeing this challenge of like product and design flooding our poor engineers with PRs and they're like, we don't have time to review them all and like half of them are garbage."

## Katarina Batina (Dive Club podcast, 0YjO7wShTkQ)

- **Agent-legible stack as a design concern:** "Swift and Kotlin… are becoming… much more legible languages. There's no layer of abstractions. agents choose to write in those things and design is actually now responsible for kind of pushing us in the direction of now reconsidering our commitment to React Native." Stack selection now weighs what agents generate well — and design has standing in that decision.

## Marvin Schwaibold — Shopify (Dive Club podcast, KpJs7mZYErg)

- **Onboarding requires shipping:** "in our onboarding to Shopify, you have to commit at least two pull requests as a designer to the main code, like to the main branch." (~"50% of all designers are using AI tools all the time.")
- **Patience reframe for learners:** "Tools are innately patient. This is the most patient teacher you will ever have." — screenshot the error state, throw it back, ask. Second source: Flora Guo (mdV8APhz2j4) — "I really love thinking about AI as this infinitely patient tutor."
- **Explain-before-acting prompt:** "before you do this, explain to me what you're going to do and why. And that oftentimes helps me understand the complexity of of what it's doing."

## Ron Goldin (Dive Club podcast, UkQpgslyR3A)

The non-engineer staged-build playbook:

- **Ugly PRD → plan of prompts:** "I'll literally dump that ugly typoridden sort of PRD into it and say like make me a series of prompts and a plan for how to most effectively build this" — naming the target platform, because "these tools now are so self-aware of themselves."
- **Ten-minute sprints:** "we're like literally building out things in phases like you would a sprint. Each sprint might be 10 minutes instead of two weeks, but you're still doing things in sessions… building a thing, checking it, making sure you're not burning through a thousand credits." Fits between meetings: "I've done prototypes in like Figma Make or Claude Code in like 10 minutes between meetings while grabbing a cup of coffee."
- **Project memory:** "make sure there's a place that's sort of like the project memory… your stored context for like what this thing is that it can keep referencing."
- **Reading agent output is a builder skill:** people "not afraid to look at a terminal" do better — "reading the output of [Claude Code] and what it's doing and understanding it actually makes you a more successful builder."

## Kris Puckett (Dive Club podcast, nPyxVMd1LIA)

- **"I don't know" as a prompt:** "That blinking caret is this invitation for you to just tell it like I don't know. I don't have any idea how you work. Here's how I work. Like what can we do together?"
- **Grade-your-own-plan verification:** "I'm asking it all the time to like grade your own plan. Did you hallucinate? Did you pull from accurate sources? Just because I don't trust them."
- **Anti-autonomy dissent** (a deliberate counterweight to the parallel-swarm school): "I do not like having agents run autonomously. I do not like… the dangerously skip permissions world." His reason is attention economics, via Plato: "beware the barrenness of a busy life… I worry a little bit that the idea of just doing more and more and more and more."
- (His compile-docs-into-a-skill workflow → `creating-skills`; his semantic-APIs-over-MCP read → `devtools` (devtool-interface-design).)

## Ridd (Dive Club podcast, J08endIde9E)

Tool-dated (Conductor, Claude Code Mac app, 2026) — the orchestration *shape* is the durable part:

- **Claude-as-CTO:** for meaty ideas, "I like to use the Claude Code Mac app as a CTO to help me prompt and evaluate the output of what I'm getting inside of Conductor" — the CTO session holds project memory and a phased development plan, then "I actually have Claude write the prompts for [Conductor] for me… I literally don't even read these… because I've already done all of the work up front in the planning phase."
- **The loop closes:** "I tell Conductor that it has to report back to the CTO. And I take that report, I paste it back into Claude, and I ask it to evaluate the output, make sure everything looks good, and then it will create the prompt for the next step."
- **Engineer-empathy review agent:** a one-keystroke agent to "review my code… this is that extra boost of confidence to make me feel like my engineer is not going to hate me for this PR."

## Kyle Santos, pt. 2 (Dive Club podcast, oYc_dF95VAE — captions: "Kyle Xantos")

- **Senior-engineer memory note**, saved to project memory at setup: "always remember that I'm a designer who is learning to contribute to our app via [Claude Code] and pull requests… Help me accomplish all my tasks in a way that will make my senior engineer who's a real developer not mad at what I do."
- **MCP hygiene:** "make it at the project level, not the global level, and bring them in per project and then even disable them when you're not using them."
- **Cross-model review:** "I have [Claude Code] plan and execute. And then I'm sending [Codex] to review because it has that 1 million token context window… go review it as a senior reviewer, add comments to it and shift it to done or changes requested if we're going to send it back to [Claude Code]." (Contrast Lovin's dual-model-review skepticism above — Santos uses it as *labeled review*, not mutual slop-checking.)

## Ryan M. — head of design (Dive Club podcast, onQY0PrUulw — captions: "Ryan Moshi," company "Colum"; spellings unverified)

- **Contextual quality bar** for personal tools: "this [doesn't] need to go to production. I don't care about the quality of the code… I just care about the results." Set the bar per artifact, not per habit.
- **AI limits on niche fast-moving OSS** (ComfyUI): "the documentation and examples out there are probably outdated and so it's been pretty hard to use AI to like help. It'll often send me on some like wild goose [chases]." His fallback: ask AI *how* it would approach the workflow, learn from that, build it himself — "theoretically, AI could write a workflow, but it hasn't been particularly helpful." The frontier-drift rule applies beyond your own repo.
