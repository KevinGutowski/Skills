---
name: agentic-coding
description: "Run coding agents well on real projects — constrained generation (the quality of your constraints determines output quality), encoding architectural decisions as project skills/AGENTS.md rules, the human-as-orchestrator role (review is non-delegable; the goal is business value, not code), guardrail abstractions that gate generation, the vibe-coding security checklist (secrets, auth, dependencies, inputs), and where agents help vs hurt (greenfield/popular/patternized vs mature/rare codebases). Use when setting up a repo for AI-assisted development, writing AGENTS.md/CLAUDE.md/project rules, deciding what to delegate, reviewing AI-generated code, fixing agent drift, securing vibe-coded apps, or setting team expectations. Based on four Evil Martians Chronicles posts (2025–2026). Triggers: agentic coding, coding agents, AGENTS.md, CLAUDE.md, vibe coding, constrained generation, AI drift, guardrail abstraction, AI code review, spec-driven development, designer in the repo."
---

# Agentic Coding

**Sources** — this skill aggregates four Evil Martians Chronicles posts:
- *"2 Martians, greenfield to MVP in 4 weeks: agentic coding on Rails" (Stroganov, Nekhina, Turner; engineering voice Svyatoslav Kryukov & Vladimir Dementyev, 2026). https://evilmartians.com/chronicles/2-martians-greenfield-to-mvp-in-4-weeks-agentic-coding-on-rails*
- *"Vibe coding in style.md" (Nazarova, Dementyev, Turner, 2025). https://evilmartians.com/chronicles/vibe-coding-in-style-dot-md*
- *"The 4 most common security risks when vibe coding your app" (Torgunakova, Turner, 2026). https://evilmartians.com/chronicles/four-most-common-security-risks-when-vibe-coding-your-app*
- *"So, your developers use AI now — here's what to know" (Eltsov, Turner, 2026). https://evilmartians.com/chronicles/so-your-developers-use-ai-now-here-is-what-to-know*

The core claim: agentic coding "lives on constrained generation; **the quality of those constraints determines the quality of the output**." Three things let a two-person team ship a production MVP in four weeks: an opinionated stack's default constraints, project decisions encoded as reusable rules, and "a senior engineer [who] realizes the vision and catches what the AI misses." The slogan: **"AI needs a prompter, not just a prompt."**

## The constraint stack

1. **Framework conventions** absorb most drift for free — "Rails gives you architectural constraints by default"; opinionated, predictable stacks make generated code more reliable. Prefer popular technologies and *defaults* (a custom config is something the agent must fight; "your job is to pave the way for LLM, not let it stray away").
2. **Project skills / AGENTS.md rules** encode the decisions conventions don't cover: "Once an architectural decision lives in a skill, the AI applies it consistently everywhere, every time." Install them **before scaffolding the first feature** — retrofitting rules onto generated architecture is the expensive order.
3. **Fast mechanical feedback** so the agent faces its own mistakes immediately: strict linters, the most strictly-typed options available, tests. The sooner generation fails loudly, the less time it spends "working on flawed implementation."
4. **The frontier needs you.** Drift concentrates where training data runs out — new libraries, in-house abstractions, post-cutoff idioms ("AI reaches for outdated idioms because that's what it was trained on"). Write skills *at the frontier* and feed current docs into context.

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

**Sandbox the agent itself** (Ruby on Whales, 2026): run agents *inside* the dev container with project-only volume mounts and per-project credentials — "a way to prevent unrestricted access to the host system by development software." The container boundary, not the agent's permission prompts, is the guarantee; permissive flags become safe inside it (setup in `rails-docker-dev`).

## Security checklist (vibe-coded apps' four recurring holes)

1. **Secrets:** server-side only, injected at runtime (secret stores/env); frontend goes through a backend proxy; secret-scanning + pre-commit hooks; a leaked key is "permanently compromised" — rotate, don't delete.
2. **Auth:** generic prompts "produce a system that looks correct but is unsafe" — define roles, permissions, ownership, and *enforcement on every endpoint* before generating; never trust client-side role checks or hidden-in-UI controls; human review of the auth architecture always.
3. **Dependencies:** agents reach for "add this library" as the quickest path — keep the tree minimal, review every addition (and its popularity), enforce a minimum release age, watch vulnerability alerts.
4. **Inputs/uploads:** "assume anything 'client-side validated' is untrusted" — server-side schema validation, parameterized queries; uploads get a format allowlist, size limits, and **content-based type verification** (an "image" can be an SVG with a script).

## Designer in the repo

A designer can ship production frontend the engineer starts from — one shared repo, the design system as the design environment (Storybook), agents bridging skill gaps. Two lessons: a prototype tool outside the production stack creates a **two-system tax** ("constantly translating between separate worlds" — every iteration re-ported); and the mature stance is **"modifying a real, already-configured design system, tweaking what's there rather than conjuring what isn't"** — the payoff is "code consistency, UX coherence, and how much less the AI has to get right on the first try."

## Checklist

- [ ] Opinionated stack, popular technologies, default configs; strict typing + linting wired before generation?
- [ ] Project rules (AGENTS.md / skills) in place before the first scaffold; frontier areas covered explicitly?
- [ ] Distilled rules verified for hallucinations and validated by expert review on fresh work?
- [ ] Bugs that reveal pattern problems answered with gating abstractions, then encoded as rules?
- [ ] Human review on everything; auth architecture designed before generation; the four security holes checked?
- [ ] Delegation matched to the gradient (greenfield/patternized → agent; mature/rare/architectural → human)?

> **Staleness note:** 2025–26 posts; tool names (Claude Code, Bolt.new, specific gems/scanners) and productivity percentages will date fast. The method — constraint stack, distillation loop, orchestrator role, security categories — is the durable layer. Reference open-sourced skill repos: https://github.com/palkan/skills/tree/master/layered-rails · https://github.com/inertia-rails/skills

## Relationship to other skills

- **`dhh-style`** — *what good Rails code looks like*; this skill is *how to get an agent to produce it*. The two compose: dhh-style conventions are exactly the kind of rules step 2 encodes.
- **`optimizing-rails`** — performance decisions (like their N+1 strategy) are prime skill-encoding material; the measurement-first method lives there.
- **`design-prototyping`** — its agents tier covers *design exploration* with agents ("collaborators, not designers"); this skill covers *production engineering* with agents, including the designer-ships-production-code workflow and the prototype-outside-the-stack tax that motivates skipping straight to the real repo.
- **`shape-up`** — scoping what the MVP even is; this skill is the build engine once scoped.
- **`creating-skills`** / **`skill-creator`** — the mechanics of writing the skill/rule files this method depends on.
