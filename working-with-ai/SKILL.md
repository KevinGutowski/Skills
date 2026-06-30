---
name: working-with-ai
description: "Teams working with AI as a tool: coding agents on real repos, AI-generated UI repair, and org enablement. Use for AGENTS.md/CLAUDE.md rules, vibe-coding security, multi-agent workflows, layout diagnosis, judge loops, MCP/context archives, or internal agents. AI inside product → ai-experience-design; user-resculptable software → malleable-software."
---

# Working with AI

**Sources/gaps:** [references/sources.md](references/sources.md) maps the agentic-coding, AI-UI-direction, and enablement corpus; [references/coverage-gaps.md](references/coverage-gaps.md) tracks fast-moving tool/workflow candidates.

**The boundary that matters:** this skill is about you and your team using AI as a *tool* — agents in your repo, AI output on your screen, AI rollout in your org. If you're designing AI features *into your product* for end users (confidence, attributions, corrections, agent UX), that's `ai-experience-design`. If end users are reshaping the product itself with AI, that's `malleable-software`.

Read exactly one reference file below; each carries the full distillation for its area (sources and extended notes live in a same-named subdirectory next to it).

- **Agentic coding** — running coding agents on real projects: the constraint stack, AGENTS.md/CLAUDE.md rules, distilling taste into rules, the non-delegable human review role, vibe-coding security holes, worktrees/multi-agent topologies, designer-in-the-repo: [references/agentic-coding.md](references/agentic-coding.md)
- **AI UI direction** — an AI produced UI and you have to make it right: diagnosing layout bugs in primitive vocabulary (fixed/fill/hug, padding vs gap, nesting), the named-failure catalog, prompt-vs-edit, the independent-judge loop: [references/ai-ui-direction.md](references/ai-ui-direction.md)
- **AI enablement** — making one person's AI workflow an org capability: decision archives wired to MCP, company-specific internal agents, promoting personal context to team skills, enablement programs and adoption mechanics: [references/ai-enablement.md](references/ai-enablement.md)

**Teaching agents a product standard (Vercel pattern):** when the request is to make agents follow a team's product/design judgment, do not stop at prompt advice. Build the loop: persistent trigger instructions, a lean skill entry point, routed source references, traceable rule IDs, exemplars from real work, explicit coverage gaps, deterministic checks for mechanical rules, and a human-owned evidence/update review. Use `creating-skills` for packaging mechanics, `design-systems` for token/component context, and this skill's agentic-coding/ai-enablement references for repo and rollout mechanics.

**Boundary splits to respect:**
- **AI features in your product → `ai-experience-design`** — restated because it's the most common misroute: building *with* AI lives here; building AI *into* the product lives there.
- **Generation quality itself → `frontend-design`** — de-slop substrate and distinctive aesthetics; the ai-ui-direction reference takes over when output needs direction and repair.
- **DS-as-AI-context → `design-systems`** — wiring a design system into codegen; the ai-enablement reference covers the programs that get people using it.
- **Skill-authoring mechanics → `creating-skills`** — writing the rule/skill files the agentic-coding and ai-enablement references depend on.
