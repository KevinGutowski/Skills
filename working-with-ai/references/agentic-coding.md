# Agentic Coding

*Scope: Run coding agents well on real projects — constrained generation, the non-delegable human review role, guardrail abstractions, vibe-coding security. Use when setting up a repo for AI-assisted development, writing AGENTS.md/CLAUDE.md rules, reviewing AI code, or running multi-agent workflows. Triggers: agentic coding, vibe coding, AI drift, worktrees, designer PRs.*

**Sources:** [agentic-coding/sources.md](agentic-coding/sources.md) — Evil Martians posts + Cursor-school interviews + Dive Club episodes + Ona Background Agents Summit 2026. Extended notes, full quotes + video IDs in [agentic-coding/ai-era-field-notes.md](agentic-coding/ai-era-field-notes.md).

The core claim: agentic coding "lives on constrained generation; **the quality of those constraints determines the quality of the output**." Three things let a two-person team ship a production MVP in four weeks: an opinionated stack's default constraints, project decisions encoded as reusable rules, and "a senior engineer [who] realizes the vision and catches what the AI misses." The slogan: **"AI needs a prompter, not just a prompt."**

## Contents

- The constraint stack
- Distilling taste into rules (the style.md process)
- The orchestrator role
- Background agents and software factories
- The Cursor school
- Security checklist (vibe-coded apps' four recurring holes)
- Designer in the repo
- Designer-engineers in the agent era — distilled rules
- Linear's shared-context loop
- Checklist
- Related skills

## The constraint stack

1. **Framework conventions** absorb most drift for free — "Rails gives you architectural constraints by default"; opinionated, predictable stacks make generated code more reliable. Prefer popular technologies and *defaults* (a custom config is something the agent must fight; "your job is to pave the way for LLM, not let it stray away").
2. **Use the framework skill router before local taste.** When a task names a platform or framework, first load that platform skill's `SKILL.md` and follow its reference routing; do not jump directly to a style summary, local helper, or remembered pattern. Example: Rails model behavior starts at `rails`, then the router may send you to `rails` (dhh-style), `rails` (active-record-associations), migrations, testing, or performance. The general rule is framework mechanism first, local doctrine second, app-specific abstraction last.
3. **Project skills / AGENTS.md rules** encode the decisions conventions don't cover: "Once an architectural decision lives in a skill, the AI applies it consistently everywhere, every time." Install them **before scaffolding the first feature** — retrofitting rules onto generated architecture is the expensive order.
4. **Fast mechanical feedback** so the agent faces its own mistakes immediately: strict linters, the most strictly-typed options available, tests. The sooner generation fails loudly, the less time it spends "working on flawed implementation."
5. **The frontier needs you.** Drift concentrates where training data runs out — new libraries, in-house abstractions, post-cutoff idioms ("AI reaches for outdated idioms because that's what it was trained on"). Write skills *at the frontier* and feed current docs into context.
6. **Repo entrypoints should answer the first agent question** (Jaytel Taste repo, 2026): an `AGENTS.md` that starts with exact local setup, repo map, hosted-vs-local boundary, guardrails, and checks lets a fresh agent become useful without spelunking. Taste's guide distinguishes the private local pipeline from the hosted demo, names the generated artifact path, and says which credentials belong in which surface. Put this before philosophy.
7. **Context gets its own lifecycle** (Ona Background Agents Summit, 2026): lint, test, version, register, and observe context the way you would production code. The useful metrics are not "prompt length"; watch retries, hops, stale lookups, failed plans, and where the agent logs show missing context.

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
- **Plans route to skills — the wayfinder pattern** (Matt Pocock + Will Ness fork, 2026): work too big for one session becomes a shared map of **decision tickets** on the issue tracker — "questions whose resolution is a decision, not slices of a build to execute" — resolved one per session until the way is clear. Every ticket is typed (research / prototype / grilling / task) and classified **HITL or AFK**: a human-in-the-loop ticket resolves only through live exchange — "a grilling agent that answers its own questions has broken this." The orchestrator move Pocock singled out ("Using /wayfinder as an orchestrator of custom skills"): the planner's ticket types and the map's Notes block *name the skills* that resolve each ticket — Ness registered his frontend-prototyping skill with one routing sentence in the prototype ticket type, so every future plan with novel frontend work generates a ticket invoking it. Custom skills get routed at planning time, not only by description-matching at request time. The prototype-ticket loop itself — in-app variants, live switcher, design-tree verdicts — lives in `design-prototyping` (its agents-tier convergence pattern).

**Sandbox the agent itself** (Ruby on Whales, 2026): run agents *inside* the dev container with project-only volume mounts and per-project credentials — "a way to prevent unrestricted access to the host system by development software." The container boundary, not the agent's permission prompts, is the guarantee; permissive flags become safe inside it (setup in `rails` (rails-docker-dev)).

**Do not make agents rediscover install shape** (Taste + external-agent trace, 2026): if the repo does not follow a tool's default layout, document the exact install/list command in the README/AGENTS hot zone. A capable agent recovered from `skills/.curated` being absent by querying the GitHub tree, but that was wasted search. Agent-facing repos should expose "first command", "where artifacts land", and "what to read next" explicitly.

## Background agents and software factories (Ona Summit, 2026)

The summit's shared finding: local coding agents improve one workstation but do not automatically improve the organization. Human attention, tool approval, review, merge, and recontextualization become the cap. A background-agent setup moves the work into cloud/ephemeral environments and adds the substrate: coding harness, automatic tool provisioning, secure sandbox, context registry, governance, observability, and fleet coordination.

**Build the harness before chasing autonomy.** Application engineering starts to become harness engineering: decide which triggers can start work (Slack, Jira/Linear, GitHub, schedules), how environments boot, which tools/credentials are provisioned, where context comes from, how outputs are reviewed, and which audit trail explains what happened. Stripe's Minions talk (`W42t-CoXyuE`) emphasized dev boxes, code intelligence, blueprints, and shifting verification left before one-shot agents can work on a large codebase.

**Review becomes triage, not heroic reading.** When agents produce more PRs than humans can read, the system needs deterministic gates and routing: auto-approve only where the standard is machine-checkable; escalate ambiguous, risky, high-blast-radius, or taste-heavy work. Cloudflare's objective AI review gate and the summit keynotes both frame this as the new bottleneck after code generation.

**Verification is the architecture.** The dark-factory pattern (`e7AvdrxsbaU`) is: requirements -> planner/decomposer -> DAG -> isolated agent sandboxes/worktrees -> deterministic tests -> plan/code adversaries -> rework loop -> merge manager. Back pressure is the product: when a plan, test, merge, or review gate fails, the failure context feeds the next attempt instead of becoming a blind retry.

**Isolation has two layers.** Runtime isolation (container, microVM, EC2/Fargate, VPC boundary) reduces blast radius; version-control isolation (worktrees, Jujutsu workspaces, stable change IDs) makes parallel work mergeable and auditable. Agents should be stateless enough to crash, clean up, and resume through stored state.

**Start with factories that fail visibly.** Software-factory.dev (`a4pEznCiWNo`) showed large PR/test volume, but the durable lesson was spec quality, visual review, bug triage, monitoring, feedback loops, and self-improvement. Close one small SDLC loop before scaling the fleet.

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
5. **Runtime guardrails outside the prompt:** prompt rules are advisory; autonomous agents adapt around them. Use kernel/container boundaries, tracked policy profiles, signed/trusted inputs, audit logs, rollback, scoped credentials, and explicit capability elevation for background runs (Ona runtime-security talks `pg0t9jf5DY4`, `XKFKwyFhk8A`).

## Designer in the repo

A designer can ship production frontend the engineer starts from — one shared repo, the design system as the design environment (Storybook), agents bridging skill gaps. Two lessons: a prototype tool outside the production stack creates a **two-system tax** ("constantly translating between separate worlds" — every iteration re-ported); and the mature stance is **"modifying a real, already-configured design system, tweaking what's there rather than conjuring what isn't"** — the payoff is "code consistency, UX coherence, and how much less the AI has to get right on the first try."

## Designer-engineers in the agent era — distilled rules (Dive Club, 2025–26)

Field practices from people running agents daily. Full quotes, attributions, and video IDs live in [agentic-coding/ai-era-field-notes.md](agentic-coding/ai-era-field-notes.md).

- **Assumption decay:** agent-workflow setups have a ~6-month half-life (Notion rewrote its harness ~3 times on that cadence). Adopt philosophies, not setups; schedule tune-up days where the only allowed work is improving your own harness; write automation slightly ahead of model capability so it's ready when the next model lands. Koch's maxim: build with vibes, ship with rigor.
- **Worktrees are the default for parallel agent sessions** — "If you're multi-Clauding, use worktrees" (Choy).
- **Review the PR, not the transcript:** require screenshots/recordings on every agent PR; let the agent self-verify frontend work in a browser; batch micro-polish into cloud sessions and squash into one PR; prompt skills into existence rather than hand-writing them; borrow engineering hygiene skills (simplify / code-review / merge-shepherd).
- **Designer PR-size law:** ~100-line PRs you've reviewed yourself, never a 500-line dump. Review moves upstream to plan mode — share the plan markdown before code exists; engineers bring features to 80–90%, designers own the last mile and the outcome.
- **Slim, layered context:** global + project + per-subdirectory CLAUDE/AGENTS files so only relevant context loads — bloated context degrades the agent's recall.
- **Prompt hygiene:** run a simplify-and-dumber check after every plan and bug fix; have the agent reflect rambling prompts back as clarifying questions; no tired late-night prompts; unlabeled dual-model mutual review is mostly cope — labeled cross-model review (one model as named senior reviewer) is the defensible version.
- **Protect the human hours (the surgeon model):** spend overnight tokens on a morning prep brief covering the code you'll touch and its traps, so the protected sprint is purely high-skill work; demand pedagogy from every AI explanation.
- **Org adoption:** give designers access to the production codebase (sandbox forks go stale and lack internal tooling; some orgs instead staff designer playground repos deliberately); run agents in public channels so prompting is visible and culture-carrying; pair/shadow on real work instead of writing workflow docs; expect skills to be personal — downloaded skills still need customization; triage polish against a surface's ~6-month life expectancy; stay honest about whether the new way was actually faster; budget for internal preview platforms because local dev regresses sharing.
- **Starting-place economics and handoff:** local agents on your real codebase beat scratch generators — the starting place is your actual app, nothing to recreate; handoff survives as richer, information-dense specs; PR-to-prod stays a job boundary, not a tooling gap. The demand side of non-delegable review: unreviewed "slop drop" PRs flood engineers — review your own output before sending it.
- **Verification & dissent:** make the agent grade its own plan and sources; wire observability (error tracker + account state + log drain) into the agent so failures replay end-to-end; keep an anti-autonomy counterweight — no skip-permissions by default; treat agent-legible stack choice as a design-owned decision.
- **Orchestration topologies:** one local agent in the driver's seat for visual work, background agents for defined problems; CTO-pattern orchestrators that write and evaluate sub-agent prompts and hold project memory; a senior-engineer memory note at setup; project-level MCPs with unused ones disabled.
- **Contextual quality bar:** personal tools don't need production-grade code — set the bar per artifact; expect goose chases on niche fast-moving OSS where docs outrun training data.
- **Onboarding & learning:** designer onboarding that requires shipping real PRs; treat the agent as an infinitely patient teacher (screenshot the error, ask); use explain-before-acting prompts; non-engineers build in staged ~10-minute sprints with a project-memory file — and reading agent output is itself a builder skill.

## Linear's shared-context loop (2026)
- **Issue context is the prompt substrate.** The original request, customer signal, product decisions, related work, discussion, codebase knowledge, and observability links should sit beside the agent session. The agent should not require a human to restate all context in a separate coding tool.
- **Agent sessions belong to the organization.** Anyone on the team can follow, contribute context, redirect, request changes, or take over. This prevents private one-person agent work from becoming invisible process debt.
- **Review returns to the same context.** Code review should sit next to the issue and discussion that caused the change so reviewers can trace from report to implementation to diff without reconstructing the thread.
- **Automate the start, not the approval.** Triage can tag an agent the moment a problem arrives; the agent can investigate, propose, code, and open a PR; a human still decides whether the fix merges.
- **Skills compound workflows.** Repeated agent moves should become reusable skills/automations with permissions, not ad hoc prompts living in one person's chat history.

## Checklist

- [ ] Opinionated stack, popular technologies, default configs; strict typing + linting wired before generation?
- [ ] Framework/platform task routed through the owning skill router before applying style summaries or app-specific abstractions?
- [ ] Project rules (AGENTS.md / skills) in place before the first scaffold; frontier areas covered explicitly?
- [ ] README/AGENTS hot zone gives a fresh agent exact setup/install commands, repo map, artifact paths, guardrails, and checks?
- [ ] Distilled rules verified for hallucinations and validated by expert review on fresh work?
- [ ] Bugs that reveal pattern problems answered with gating abstractions, then encoded as rules?
- [ ] Human review on everything; auth architecture designed before generation; the four security holes checked?
- [ ] Delegation matched to the gradient (greenfield/patternized → agent; mature/rare/architectural → human)?
- [ ] Background runs have isolated runtime + isolated version-control state, deterministic verification gates, visible rework loops, and escalation criteria?
- [ ] Context is tested/observed/versioned, with missing-context failures feeding the next rule or skill update?

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
