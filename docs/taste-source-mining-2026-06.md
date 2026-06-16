# Taste Source Mining (2026-06)

## Source Manifest

| Source | Local artifact | Coverage | Density | Notes |
|---|---|---:|---|---|
| Andrew Wilkinson complaint tweet `2066917723666612512` | VxTwitter JSON | read | Medium | Names the user problem: Codex as daily productivity center, design taste as blocker, Claude perceived stronger. |
| Cole reply `2066930925573898433` | VxTwitter JSON | read | Medium | Only explicit numbered recommendation: Jaytel's `taste.md`. |
| Jaytel Taste post `2058310720274440672` | VxTwitter JSON | read | High | Describes references, tight crops, dual-model analysis, anonymized fusion, chunking, concrete imperative skill. |
| Jaytel video | `work/jaytel-taste-demo.mp4`; sampled frames | skimmed/sampled | High | Shows base vs frontend-design vs Taste comparisons, per-image analysis, pipeline diagram, final example site. |
| Hosted site `taste.jaytel.com` | `work/taste-site.html` | read | Medium | Landing page plus links to GitHub and downloadable example skill. |
| Downloaded example skill | `work/taste-design.latest.zip` | read | High | Generated `taste-design/SKILL.md`; concrete neutral UI rules and anti-collapse guardrails. |
| GitHub repo `jaytel0/taste` | `work/taste-main` | read | High | README, AGENTS.md, article/process docs, generated skill, comparison images, prompt code, tests, local runner, hosted app. |
| Prompt/package code | `packages/ai/src/*.ts`, tests | read | High | Actual extraction prompts, anonymization, chunking, frontmatter boundary, output budgets, overfit tests. |
| Hosted app code | `apps/web/src/...` | sampled/read | Medium-High | Copy-to-agent CTA, credential boundary, processing UI, Skill Lab, hermetic iframe candidates, workflow artifacts. |
| External agent trace from Kevin | user-provided transcript | read | High | Showed installer failure on default `skills/.curated`; recovered via GitHub tree and manual install. |

## Key Lessons Extracted

1. **The core design-taste failure is not "bad palette"; it is underconstrained generation.** Codex/AI outputs drift because the prompt leaves visual choices open. Reference-derived constraints close those degrees of freedom.
2. **References are the product input.** Time spent curating high-resolution, tight crops matters more than clever prompts. Bad or random references produce generic rules.
3. **Analyze visual success, not product function.** Every pass should strip domain/function and translate into layout, spacing, type, rhythm, density, hierarchy, texture, color roles, and composition.
4. **Use multiple vision passes to reduce blind spots, then anonymize before fusion.** The repo redacts model labels and frontmatter so the synthesis model does not favor its own phrasing.
5. **Chunking protects granularity.** Large one-shot synthesis collapses into broad summaries; chunk-level rule extraction preserves concrete rules.
6. **Aesthetic labels are allowed only when bound to evidence.** "Editorial", "luxury", "serif", "cinematic", etc. are useful only when paired with visible constraints.
7. **Anti-collapse guardrails must be corpus-specific.** The example skill bans beige commerce, dense SaaS dashboards, photo-led layouts, fake device chrome, etc. because those are failure risks for that neutral UI corpus, not universal bans.
8. **Skill generation itself should be tested by output comparisons.** Taste compares base model, broad frontend-design skill, and specific Taste skill on identical prompts.
9. **Preference labs need a baseline candidate.** Taste's Skill Lab keeps the current skill as a control, mutates bounded hypotheses, renders candidates, records human preference, then updates the skill from preference history.
10. **Agent-facing repos need a hot-zone.** Taste's `AGENTS.md` starts with exact local setup, repo map, boundaries, guardrails, and checks. Its UI also copies a ready-made agent prompt.
11. **Repo layout is part of agent UX.** The external trace showed `skill-installer` defaulted to `skills/.curated` and failed; README now documents explicit root-level paths.

## Fold Map

| Lesson | Fold target |
|---|---|
| Visual-reference corpus -> skill workflow | `creating-skills/references/converting-visual-references-to-skills.md` |
| Reference-derived constraints beat vague adjectives | `frontend-design` |
| Do not hard-code one corpus' taste | `frontend-design`; `working-with-ai` |
| Taste/auditor rules must trace to visible evidence | `working-with-ai/references/ai-ui-direction.md` |
| Base vs broad skill vs specific skill comparisons | `design-prototyping` |
| Skill Lab baseline/control and human preference loop | `design-prototyping` |
| Hermetic candidate HTML for fair skill eval | `design-prototyping` |
| Split DS substrate from expressive taste layer | `design-systems` |
| Copy-to-agent onboarding prompt | `devtools/references/devtool-interface-design.md` |
| AGENTS.md hot-zone and explicit repo setup | `working-with-ai/references/agentic-coding.md` |
| External-agent install failure on root-level repo | `README.md` install quickstart |
| Avoid narrow one-file folds on dense sources | `docs/skill-library-ops.md` high-touch source-mining protocol |

## Parked Or Skipped

- Hosted app security/credential details were mostly implementation-specific. The durable split (hosted OAuth only; direct provider keys local) was folded as an agent-facing repo boundary, not as security doctrine.
- Workflow queue/concurrency code was not folded separately; existing agentic-coding/devtool guidance already covers progress and work queues, and the Taste-specific batching details are in the conversion playbook.
- Exact neutral UI rules from the generated Taste skill were not copied into `frontend-design`; they are a corpus-specific style, not a universal frontend rule.
- Model names are timestamped. Keep the durable pattern (independent models, anonymized fusion, expensive once/cheap later), and verify current model choices before recommending exact providers.
