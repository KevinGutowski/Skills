# Agentic Coding

*Scope: Run coding agents well on real projects — constrained generation, the non-delegable human review role, guardrail abstractions, vibe-coding security. Use when setting up a repo for AI-assisted development, writing AGENTS.md/CLAUDE.md rules, reviewing AI code, or running multi-agent workflows. Triggers: agentic coding, vibe coding, AI drift, worktrees, designer PRs.*

**Sources:** [agentic-coding/sources.md](agentic-coding/sources.md) — 4 Evil Martians posts + Cursor-school interviews + Dive Club 2025–26 episodes. Extended notes, full quotes + video IDs in [agentic-coding/ai-era-field-notes.md](agentic-coding/ai-era-field-notes.md).

The core claim: agentic coding "lives on constrained generation; **the quality of those constraints determines the quality of the output**." Three things let a two-person team ship a production MVP in four weeks: an opinionated stack's default constraints, project decisions encoded as reusable rules, and "a senior engineer [who] realizes the vision and catches what the AI misses." The slogan: **"AI needs a prompter, not just a prompt."**

## The constraint stack

1. **Framework conventions** absorb most drift for free — "Rails gives you architectural constraints by default"; opinionated, predictable stacks make generated code more reliable. Prefer popular technologies and *defaults* (a custom config is something the agent must fight; "your job is to pave the way for LLM, not let it stray away").
2. **Project skills / AGENTS.md rules** encode the decisions conventions don't cover: "Once an architectural decision lives in a skill, the AI applies it consistently everywhere, every time." Install them **before scaffolding the first feature** — retrofitting rules onto generated architecture is the expensive order.
3. **Fast mechanical feedback** so the agent faces its own mistakes immediately: strict linters, the most strictly-typed options available, tests. The sooner generation fails loudly, the less time it spends "working on flawed implementation."
4. **The frontier needs you.** Drift concentrates where training data runs out — new libraries, in-house abstractions, post-cutoff idioms ("AI reaches for outdated idioms because that's what it was trained on"). Write skills *at the frontier* and feed current docs into context.
5. **Repo entrypoints should answer the first agent question** (Jaytel Taste repo, 2026): an `AGENTS.md` that starts with exact local setup, repo map, hosted-vs-local boundary, guardrails, and checks lets a fresh agent become useful without spelunking. Taste's guide distinguishes the private local pipeline from the hosted demo, names the generated artifact path, and says which credentials belong in which surface. Put this before philosophy.

## Distilling taste into rules (the style.md process)

To turn "an expert cleans up my vibe code" into a reusable asset:
1. Get a **before/after pair** (vibe-coded version vs expert rewrite of the same thing) and ask a thinking model to diff them into a style document explaining the expert's decisions.
2. **Compress** into a short AGENTS.md: app context + "the key style and structure decisions as rules and patterns" — concrete, example-bearing rules (domain language over generic names; extraction thresholds like "any method over ~15 lines"; prefer/avoid pattern lists *with the caveat* that they're rules for this codebase, not universal truths).
3. **Verify**: a thinking-model inconsistency pass *plus* a human read-through — the process hallucinates (theirs invented a gem dependency).
4. **Validate on a fresh project**: success is when expert review changes from "throw it away" to "I could work with this."
5. Compound: "every project makes the harness smarter" — carry skills forward, open-source the general ones.

## The orchestrator role

- The end-state: not writing code by hand but "orchestrating: reviewing, directing, encoding decisions, and asking AI to fix things."
- **Review is non-delegable**: "you can neither avoid having thorough reviews, nor assign it to another LLM." AI output ships more code "that we'll have to rework later" — the human is responsible for long-term project health.
- The agent "is like a junior developer without the professional vision… It sprints confidently in one direction. But if the architecture needs to pivot, it won't notice." When a bug reveals a pattern problem, **don't patch — build the abstraction that gates future generation, then encode it as a skill** (their filter/sort DSL case: one clean abstraction, and "the AI consistently applied [it] everywhere" after).
- Anchor on value, not volume: "An engineer's goal isn't to write code, it's to bring business value" — choosing what *not* to build, cutting the right 5% of a feature, and knowing **when not to use AI at all** (mature unfamiliar codebases, rare stacks, small scoped tasks where the rule-writing loop costs more than it saves). Expect ~30–40% gains under good conditions — greenfield, popular stack, patternized tasks — and possibly negative gains outside them.

**Sandbox the agent itself** (Ruby on Whales, 2026): run agents *inside* the dev container with project-only volume mounts and per-project credentials — "a way to prevent unrestricted access to the host system by development software." The container boundary, not the agent's permission prompts, is the guarantee; permissive flags become safe inside it (setup in `rails` (rails-docker-dev)).

**Do not make agents rediscover install shape** (Taste + external-agent trace, 2026): if the repo does not follow a tool's default layout, document the exact install/list command in the README/AGENTS hot zone. A capable agent recovered from `skills/.curated` being absent by querying the GitHub tree, but that was wasted search. Agent-facing repos should expose "first command", "where artifacts land", and "what to read next" explicitly.

## The Cursor school (Ryo Lu & Jin Park, 2025)

- **The plan-mode/spec pattern:** vague idea → agent researches the codebase and asks clarifying questions → an editable markdown spec (≈ a PRD: "that's where a lot of the product decisions get made") → review, edit, then build — optionally handing the build to a different model. "The spec is dead" is backwards — better models make specs *more* valuable: they'll be "really good at implementing exact… specifications," but "without a lot of specifications, the model will only make you something mediocre, like something really generic."
- **One-local-agent topology:** keep the main agent local for visual work — "I still prefer kind of being in the driver's seat. I want to look at everything and see it happen" — and ship "more defined problems, say like a bug to fix" to background agents.
- **Bricks:** "AI is really good at composing parts. I'm actually thinking we need to like build bricks. Really good bricks" — extract your core patterns from the codebase, because agents without guidance reinvent wheels ("weird patterns emerge… you need to wrangle it back"). The Martians' step-2 rules, restated from the design side.
- **Jin Park's prompt protocol (Notion):** "pre-context confirmation" warm-ups before real tasks; scoping checks — "do you see X… really helps me to target my changes. You don't want to be changing code across other people's prototypes"; and a graded response temperature: "This looks great" = aligned, keep this style → "can you simplify this" = try again, wrong method → "no" = "I'm unsubscribing."
- **Code is the shared truth across roles.** The old loop — drop a mock "into my PM's PRD and I'll wait for things to happen and things don't happen" — inverts: designers and PMs edit the product directly via specs and agents; a PRD is just an indirect code edit.

## Security checklist (vibe-coded apps' four recurring holes)

1. **Secrets:** server-side only, injected at runtime (secret stores/env); frontend goes through a backend proxy; secret-scanning + pre-commit hooks; a leaked key is "permanently compromised" — rotate, don't delete.
2. **Auth:** generic prompts "produce a system that looks correct but is unsafe" — define roles, permissions, ownership, and *enforcement on every endpoint* before generating; never trust client-side role checks or hidden-in-UI controls; human review of the auth architecture always.
3. **Dependencies:** agents reach for "add this library" as the quickest path — keep the tree minimal, review every addition (and its popularity), enforce a minimum release age, watch vulnerability alerts.
4. **Inputs/uploads:** "assume anything 'client-side validated' is untrusted" — server-side schema validation, parameterized queries; uploads get a format allowlist, size limits, and **content-based type verification** (an "image" can be an SVG with a script).

## Designer in the repo

A designer can ship production frontend the engineer starts from — one shared repo, the design system as the design environment (Storybook), agents bridging skill gaps. Two lessons: a prototype tool outside the production stack creates a **two-system tax** ("constantly translating between separate worlds" — every iteration re-ported); and the mature stance is **"modifying a real, already-configured design system, tweaking what's there rather than conjuring what isn't"** — the payoff is "code consistency, UX coherence, and how much less the AI has to get right on the first try."

## Designer-engineers in the agent era (Dive Club, 2025–26)

Field practices from people running agents daily. Extended notes + context: [agentic-coding/ai-era-field-notes.md](agentic-coding/ai-era-field-notes.md).

**Meta-rules — the half-life layer:**
- **Assumption decay:** "every 6 months everything that we did before becomes more or less irrelevant" — Notion rewrote its agent harness ~3 times on that cadence (Brian Lovin, Dive Club podcast, dvEwb1Ajkwo). Kyle Santos: "the recommendations from 4 months ago almost certainly are not ones you should follow today… unless it's a philosophical" one — adopt philosophies, not setups, and run scheduled "tune-up days" where the only allowed work is improving your own harness (Kyle Santos, Dive Club podcast, HcLz3ikw-n0).
- **Write automation ahead of model capability** (Megan Choy, Claude Code's lead designer — Dive Club podcast, hKeDfupbA4U): her design-cop routine (scrape repos for frontend changes shipped without a designer, draft an adversarial design PR, DM the engineer) failed on today's model and she kept it anyway: "I'm always ready for when the next model's going to come out and this is actually going to be ready." Think "not just the first step, but like the next step, the next step, the next step after that."
- **"Build with vibes but ship with rigor"** (Karl Koch, Dive Club podcast, 7_VEb9iDW2c).

**The Claude Code workflow (Megan Choy, Dive Club podcast, hKeDfupbA4U):**
- "If you're multi-Clauding, use worktrees" — worktrees as the default for parallel sessions.
- The `/prototype` skill shape: generate n implementation options (default five) as HTML previews, and make the model commit — "you should choose what you're going to do and then tell me why."
- "No one ever writes their skills by hand anymore. If anyone tells you they do, they're lying. Everyone just prompts them."
- Point research prompts at org telemetry: "please look at Slack, Google Docs, any discussions, and… BigQuery… and figure out which is the best one."
- Review the PR, not the transcript: "I actually don't review the outputs anymore of Claude in the transcript. I'm typically reviewing a PR… that has a recording of the feature" — require screenshots/recordings on every PR; Claude-in-Chrome is "the best way to have Claude be able to self-verify" frontend changes.
- Cloud polish drip: "hundreds of tiny little polish fixes" sent via cloud sessions, not worth a local session each; squash into one PR when engineers complain.
- Borrow engineering hygiene skills (simplify / code-review / commit-push-PR — "ask your engineering partners… what skills do you guys have") and the merge-shepherd that reviews open PRs and DMs reviewers via Slack: "the full integration of your suite is where it's at."
- Tenets: Claude "and most LLMs are not good at design yet" — stay in the loop for craft; think "more than just code when we think about AI automation"; and "just because everyone can ship doesn't mean not everything should ship."

**Prompting & self-healing (Brian Lovin, Dive Club podcast, dvEwb1Ajkwo):**
- Horoscope prompts — Simon Last's snippet: "let's step back and think really hard. How can we make this simpler and dumber while still achieving our goals?" Run "20 times a day," after every plan and every bug fix.
- The vocabulary advantage: engineers can *name* queues, parallelization, edge cases; cultivate substrate curiosity instead of letting the model take the wheel — "wait, what is grep?" leads to sed, awk, the actual machine.
- Dual-model review is partly cope: "you've just been like slop cannoning thinking that you're doing this genius like two models reviewing each other. They don't know yet."
- The rock-tumbler loop: Sentry + Supabase + Axiom log drain wired into the agent — paste a user's email and it replays "exactly what happened leading up to the moment of failure."
- "I've stopped writing late night prompts" — tired prompts produce tired work.

**Protect the human hours (Geoffrey Litt, Dive Club podcast, zJf0UeCwQqE):** code like a surgeon — "A surgeon does the damn surgery," not the admin. Spend overnight tokens on a morning prep brief ("a brief on all the code I'm going to be touching today, how it works, what the traps are") so the protected "three-hour sprint" is purely your high-skill work. And AIs are "the best learning machines ever invented… but they happen to also be cheat on your homework machines" — demand pedagogy from every AI explanation.

**Context discipline (Kyle Santos, Dive Club podcast, HcLz3ikw-n0):** "be slimmer on your cloud.mds [CLAUDE.mds]" — global, project, *and* per-subdirectory files so only relevant context loads; bloat makes "its memory worse." Claude Code as general computer: it sits on his Obsidian vault and drives Linear, not just code.

**Org adoption (panel — Choy/Shipper/Zipper, Dive Club podcast, V-jd3v9P-Ps; Andy Madrick, Dive Club podcast, IfPK0LwbX_0):**
- The milestone: "let your designers get access to your production codebase" — sandbox forks are "always going to be out of date[s]" and lack the org's internal tooling.
- Frontier polish triage: "is it worth polishing something that's not going to be here 6 months from now?"
- Skill libraries half-work: "skills turn out to be pretty personal… you can download it but then you have to customize it for yourself anyway."
- Run agents in public channels — "you get to see other people prompting." Agents become culture carriers: Ramp's Cody taught "other agents how to work and then how to teach their humans how to work."
- Pair/shadow on real work instead of writing workflow docs: "it's actually really hard to explain your workflow to someone."
- Designer PR-size law (Madrick): "a hundred-line PR" — never "a 500-line PR that you didn't even review yourself." Review shifts upstream to plan mode — share the plan MD before code exists, or expect: "The fundamental premise of how you built this is wrong. Like why am I looking at a code diff right now?" Engineers bring features "up to 80 to 90%"; designers own the last mile — "own the outcome."

**Field report — what top orgs actually do (2026 tranche; full quotes + video IDs in the reference file):**
- AI usage is "mandated in performance reviews for designers"; orgs build "designer copies of their repos" as playgrounds. The local-agent edge is **starting-place economics**: "that starting place that you get is your real app" — nothing to recreate, unlike scratch generators. Handoff survives: "these are still specs. They are specs with a lot more information inside of them." PR-to-prod is a *job boundary* ("do you want to start wearing a pager?"); stay honest about speed ("Was that actually faster than the old way? Not sure. Not sure."); local dev regresses sharing — budget for internal preview platforms (Steven Haney).
- The review doctrine's demand side (Polly D'Arcy): the "slop drop," and "product and design flooding our poor engineers with PRs… half of them are garbage."
- **Agent-legible stack as a design concern** (Katarina Batina): "agents choose to write in those things and design is actually now responsible for… reconsidering our commitment to React Native."
- Onboarding & learning (Marvin Schwaibold, Shopify): designer onboarding requires two PRs to main; "Tools are innately patient. This is the most patient teacher you will ever have" (Flora Guo's "infinitely patient tutor" seconds it); the explain-before-acting prompt: "before you do this, explain to me what you're going to do and why."
- Non-engineer staged builds (Ron Goldin): ugly PRD → "make me a series of prompts and a plan" → 10-minute sprints with checks → project memory; reading agent output "makes you a more successful builder."
- Verification & dissent (Kris Puckett): open with "I don't know… Here's how I work"; make it grade its own plan — "Did you hallucinate? Did you pull from accurate sources?"; his anti-autonomy stance (no skip-permissions; "beware the barrenness of a busy life") is the corpus's counterweight to swarm maximalism.
- Orchestration topologies: Ridd's Claude-as-CTO — plan, have Claude write the parallel worktree agents' prompts, agents "report back to the CTO," it evaluates and writes the next prompt — plus an engineer-empathy review agent. Kyle Santos pt. 2: a senior-engineer memory note ("make my senior engineer… not mad"), project-level MCPs with unused ones disabled, and cross-model review — Codex reviews Claude's work "as a senior reviewer."
- **Contextual quality bar** (Ryan M.): for personal tools, "this doesn't need to go to production. I don't care about the quality of the code" — and expect goose chases on niche fast-moving OSS where docs outrun training data.

## Checklist

- [ ] Opinionated stack, popular technologies, default configs; strict typing + linting wired before generation?
- [ ] Project rules (AGENTS.md / skills) in place before the first scaffold; frontier areas covered explicitly?
- [ ] README/AGENTS hot zone gives a fresh agent exact setup/install commands, repo map, artifact paths, guardrails, and checks?
- [ ] Distilled rules verified for hallucinations and validated by expert review on fresh work?
- [ ] Bugs that reveal pattern problems answered with gating abstractions, then encoded as rules?
- [ ] Human review on everything; auth architecture designed before generation; the four security holes checked?
- [ ] Delegation matched to the gradient (greenfield/patternized → agent; mature/rare/architectural → human)?

> **Staleness note:** 2025–26 posts; tool names (Claude Code, Bolt.new, specific gems/scanners) and productivity percentages will date fast. The method — constraint stack, distillation loop, orchestrator role, security categories — is the durable layer. Reference open-sourced skill repos: https://github.com/palkan/skills/tree/master/layered-rails · https://github.com/inertia-rails/skills

## Relationship to other skills

- **`rails` (dhh-style)** — *what good Rails code looks like*; this skill is *how to get an agent to produce it*. The two compose: dhh-style conventions are exactly the kind of rules step 2 encodes.
- **`rails` (optimizing-rails)** — performance decisions (like their N+1 strategy) are prime skill-encoding material; the measurement-first method lives there.
- **`design-prototyping`** — its agents tier covers *design exploration* with agents ("collaborators, not designers"); this skill covers *production engineering* with agents, including the designer-ships-production-code workflow and the prototype-outside-the-stack tax that motivates skipping straight to the real repo.
- **`shape-up`** — scoping what the MVP even is; this skill is the build engine once scoped.
- **`creating-skills`** / **`skill-creator`** — the mechanics of writing the skill/rule files this method depends on.
- **`rails` (rails-docker-dev)** — the container sandbox that makes permissive agent flags safe (project-only mounts).
- **`malleable-software`** — Litt's philosophy layer (version control as the human-AI substrate, jigs, teaching primitives); this skill is the daily practice on real repos — his surgeon/prep-brief workflow lives here.
- **`devtools` (devtool-interface-design)** — the inverse perspective: this skill runs agents *on your codebase*; its AX section designs your *product* for agents as customers.
- **[ai-ui-direction.md](ai-ui-direction.md)** — UI-specific direction of AI output (layout diagnosis, prompt-vs-edit, the judge loop); this skill owns the workflow mechanics around the agent.
- **[ai-enablement.md](ai-enablement.md)** — team/org-level rollout: shared context, internal agents, enablement programs; this skill owns single-repo practice.
