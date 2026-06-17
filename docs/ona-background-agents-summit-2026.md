# Ona Background Agents Summit 2026 Source Mining

## Source Manifest

Captured 2026-06-17 from the 17-item YouTube playlist `PL3TSF5whlprXNdegxuGPSoa13wqx-dcAw` and the Ona channel listing. Local working archive: `work/ona_archive/` in the mining run, with `*.info.json`, `*.en.vtt`, `*.en-orig.vtt`, a generated `source-index.md`, per-video Markdown transcripts, and `quote-candidates.md`. Raw transcripts are not committed to this repo; video IDs below are the durable source handles.

| # | Video ID | Talk | Coverage | Density | Fold targets |
|---:|---|---|---|---|---|
| 1 | `1VZPX7QD2tk` | What Comes After AI Coding Assistants | transcript + metadata | High | `working-with-ai` agentic-coding; ai-enablement |
| 2 | `W42t-CoXyuE` | Stripe Minions | transcript + metadata | High | `working-with-ai` agentic-coding |
| 3 | `MbLdrAZFQRs` | Cloudflare's AI Engineering Stack | transcript + metadata | High | `working-with-ai` ai-enablement; agentic-coding |
| 4 | `pg0t9jf5DY4` | Agent Runtime Security | transcript + metadata | High | `working-with-ai` agentic-coding |
| 5 | `-T_Qc1Vmbtk` | Internal Background Agent Systems | transcript + metadata | Medium-High | `working-with-ai` agentic-coding; `devtools` |
| 6 | `GXDtw0EmoX0` | Genomics and Cloud Ops | transcript + metadata | Medium-High | `working-with-ai` ai-enablement |
| 7 | `XKFKwyFhk8A` | Why Prompt-Level Guardrails Fail | transcript + metadata | High | `working-with-ai` agentic-coding |
| 8 | `Pz-vVV0Jmfc` | Context Is the New Code | transcript + metadata | High | `working-with-ai` agentic-coding; creating-skills adjacency |
| 9 | `TrT1ysbWDos` | Day 1 Recap | transcript + metadata | Medium | Synthesis only |
| 10 | `bguL5ZEWbPo` | Day 2 Opening | transcript + metadata | Medium | Synthesis only |
| 11 | `2pod6GeckXc` | Harvey Spectre | transcript + metadata | High | `devtools`; `working-with-ai` ai-enablement |
| 12 | `uG0Jz6kLWV0` | incident.io AI SRE | transcript + metadata | High | `devtools`; `working-with-ai` ai-enablement |
| 13 | `a4pEznCiWNo` | Software Factory in Public | transcript + metadata | High | `working-with-ai` agentic-coding |
| 14 | `o7G5EHDqQ1g` | Uber Minion | transcript + metadata | High | `working-with-ai` agentic-coding; ai-enablement |
| 15 | `e7AvdrxsbaU` | Dark Factories | transcript + metadata | High | `working-with-ai` agentic-coding |
| 16 | `ptVO89qaxY4` | Monzo's Control Model | transcript + metadata | High | `working-with-ai` ai-enablement; agentic-coding |
| 17 | `yuVFSvJf8tk` | Summit Wrap | transcript + metadata | Medium | Synthesis only |

## Key Lessons

1. **The laptop/local-agent phase is a false summit.** Faster code generation moves the bottleneck to human attention, tool approval, review, merge, and recontextualization. Background agents need cloud runtimes, persistent-but-disposable environments, automatic tool provisioning, context engineering, governance, and fleet coordination.
2. **Application engineering becomes harness engineering.** The reusable work is no longer just product code; it is the sandbox, coding harness, context registry, orchestrator, review gate, and observability loop that lets agents run without making humans approve every step.
3. **Review becomes triage.** Once agents can produce more PRs than humans can read, teams need deterministic standards, objective gates, routing, escalation, and auto-approval boundaries. Humans still own judgment and taste; they should spend it where the system cannot prove safety or quality.
4. **Verification is the architecture, not an afterthought.** Dark-factory talks converged on decomposers, DAG plans, isolated sandboxes/worktrees, deterministic tests, plan/code adversaries, rework loops, merge managers, and back pressure. Model access is not the differentiator; what the system can verify without reading every diff is.
5. **Runtime security must sit outside the prompt.** Prompt-level guardrails fail against autonomous tool users. Policies, kernel-level boundaries, signed/trusted inputs, audit logs, rollback, and explicit capability elevation are the durable controls.
6. **Context needs an SDLC.** Context should be linted, tested, versioned, observed, promoted through registries, and improved from agent logs. Measure context quality by retries, hops, stale lookups, and failed plans, not by prompt length.
7. **Start where pain already exists.** Uber started with toil; Genomics/cloud-ops examples started with operational work; Monzo emphasizes controlled interfaces and golden paths; Cloudflare made system maps and objective review gates useful enough that engineers had reasons to keep them current.
8. **Agent sessions are collaboration products.** Harvey and incident.io show that the interface is often a Slack thread plus durable cloud session plus PR/IDE handoff. Summaries, citations, progress, memory, and handoff shape trust as much as model output.
9. **Regulated adoption is a control-design problem.** Monzo's lesson is not "ban AI"; it is own the interface, use platform consistency, static analysis, code mods, golden paths, and scoped controls so teams can experiment inside known boundaries.
10. **Software factories need product loops.** Software-factory.dev's public run demonstrated that specs, visual review, user feedback, monitoring, bug triage, and self-improvement loops matter more than raw PR count. The first factory should fail visibly before it scales.

## Fold Map

| Lesson | Fold target |
|---|---|
| Background-agent runtime primitives and false-summit framing | `working-with-ai/references/agentic-coding.md` |
| Software-factory architecture, verification gates, and back pressure | `working-with-ai/references/agentic-coding.md` |
| Runtime security outside the prompt | `working-with-ai/references/agentic-coding.md` security/runtimes |
| Context development lifecycle | `working-with-ai/references/agentic-coding.md` |
| Start narrow, pain-first adoption, trust stages | `working-with-ai/references/ai-enablement.md` |
| System maps, objective AI review gates, controlled interfaces | `working-with-ai/references/ai-enablement.md` |
| Slack/session/citation/handoff UX | `devtools/references/devtool-interface-design/data-viz-and-agents.md` |
| Agent-run queue/DAG/rework surfaces | `devtools/references/devtool-interface-design/data-viz-and-agents.md` |

## Parked Or Skipped

- No new `background-agents` top-level skill: the material is a dense update to existing `working-with-ai` and `devtools` clusters, not a separate task shape.
- No raw transcript commit: 17 transcripts are useful archive artifacts but too bulky and source-like for the skill repo. Keep them in the working archive/output artifact.
- No long quotes folded: YouTube captions are auto-generated and sometimes garbled. Rules are paraphrased with video IDs; any future exact quote should be rechecked against the VTT/transcript.
- Product/vendor claims about Ona itself were skipped unless they expressed a general background-agent operating rule.
