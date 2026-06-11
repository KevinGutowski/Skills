# AI-era field notes — extended Dive Club material

Context behind the SKILL.md "Designer-engineers in the agent era" section. Quotes verified against the YouTube auto-transcripts; known caption garbles corrected: "multi-clauding" rendered as multi-Clauding, "cloud.mds"/"cloud code" = CLAUDE.mds / Claude Code, "super base" = Supabase, "Kyle Xantos" = Kyle Santos, "five-code" = vibe-code.

## Megan Choy — Claude Code's lead designer (Dive Club podcast, hKeDfupbA4U)

A live workflow demo. Details beyond the SKILL.md rules:

- **Worktrees mechanics:** "I recommend work trees cuz it's a little bit easier to manage. And to start it up, you just do claude --worktree" — it checks out a new branch automatically; worktrees exist because parallel Claudes on one checkout "start conflicting with each other."
- **The `/prototype` skill provenance:** "I asked Claude to build this, you could build it in like 2 seconds. All it does is get Claude to generate n number of options, default to five, of a different implementation of a feature, generate an HTML file, preview it, and then iterate on it a few times." She *always* asks Claude to pick an option first — the shift from "prototype and then I'll choose" to "prototype and then you should choose what you're going to do and then tell me why."
- **The research prompt** is environment-dependent: in her production codebase she'd point at Slack/Google Docs/BigQuery; in an open-source repo, "online research is fine." The constant is "look at all these sources and figure out which is the best one" before implementing.
- **The design-cop routine in full:** a Claude Code *routine* (scheduled task) that "scrapes all of our repositories for any front-end changes," checks via Slack/Google Meet transcripts/Google Docs whether a designer was involved, flags ship-without-designer, drafts "an adversarial design in a PR," and DMs the engineer. She "had to turn off the DMing cuz Claude was actually really bad at design" — the automation-ahead-of-capability lesson: "people were very forgiving when I first tried this and it was really bad. And now I just consume this myself."
- **Hygiene/merge automation:** `simplify` and `code review` are internal skills that "prune your code base" before big changes; `commit push PR` runs internal checks; the PR-shepherd command reviews any open PRs, "get[s] them over the finish line," and DMs reviewers or pings on-call via Slack. "Almost everyone at Anthropic actually always has Claudes running… to help merge PRs" — she's "never actually in CI" anymore.
- **Cloud polish drip:** Claude on the web is "a way to send like hundreds of tiny little polish fixes all the time that I find in the app. They're not worth spinning up a new session for"; some "just got auto approved because they're tiny CSS changes."

## Brian Lovin (Dive Club podcast, dvEwb1Ajkwo)

- **Assumption decay, concretely:** "at Notion we've rewritten the agent harness, I think, three times since I joined. Like roughly every 6 months."
- **Horoscope prompts** work because models respond to interrogation framings — "how could this be simpler or what are edge cases we might have missed or is this the most…" The Simon Last snippet runs "after everything. Every plan… every time it fixes a bug."
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
- **Frontier triage** is "an ethos in the Claude Code… product team at Anthropic": "we're so early in this journey right now that we actually don't know what the final shape of th[is is]" — polish what survives.
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
