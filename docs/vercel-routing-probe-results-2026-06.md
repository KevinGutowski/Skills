# Vercel-Pattern Routing Probe Results

Probe source: `docs/vercel-routing-probes-2026-06.md`
Packet builder: `python3 scripts/build_vercel_probe_packet.py`

## 2026-06-26 Deterministic Fixture Check

Command: `python3 -B scripts/check_vercel_routing_probes.py`

Result: pass. The fixture has 15 contiguous probes, every expected skill exists in the local skill set, the generated probe packet includes each probe ID and prompt, and `~/.claude/skill-evals/routing-eval.md` probes 115-129 match the repo-local prompt and first-skill expectations when present.

## 2026-06-29 Fresh Descriptions-Only Judge

Judge: Kepler (`019f15ca-9c65-7251-b637-4c96f47c92b4`)
Authorization: user approved the fresh-judge/subagent pass on 2026-06-29.
Setup: `fork_context=false`; the judge was instructed to use only the generated routing packet descriptions and probes, not skill bodies, repo files, or external context.

Result: pass, 15/15 probes.

| Probe | First skill | Second skill if needed | Result | Rationale |
| --- | --- | --- | --- | --- |
| V1 | `creating-skills` | `working-with-ai` | Pass | Converting repeated PR feedback into reusable agent guidance, examples, and checks is skill authoring; agent behavior rules also need AI-workflow guidance. |
| V2 | `working-with-ai` |  | Pass | CLAUDE.md rules for coding agents are explicitly covered by `working-with-ai`. |
| V3 | `design-systems` |  | Pass | The description directly covers design systems as AI context. |
| V4 | `design-systems` | `creating-skills` | Pass | The core issue is design-system component governance; agent-facing documentation/checks may require skill guidance. |
| V5 | `design-craft` |  | Pass | "Feels off" and repeated polish debates match `design-craft`'s quality rituals and UI polish remit. |
| V6 | `frontend-design` |  | Pass | Building a distinctive landing page that avoids generic AI aesthetics is exactly `frontend-design`. |
| V7 | `ai-experience-design` |  | Pass | Confidence display and calibration without raw percentages match AI experience design. |
| V8 | `ai-experience-design` |  | Pass | Designing AI suggestions inside an existing workflow is an AI/agent UX problem. |
| V9 | `ux-writing` | `creating-skills` | Pass | Settings-page copy rules start with UX writing; making agents cite source rules in reviews requires encoding guidance/checks. |
| V10 | `user-onboarding` |  | Pass | Empty dashboard, first-run path, and example states are onboarding/empty-state strategy. |
| V11 | `product-decision-making` |  | Pass | Choosing setting vs default behavior vs onboarding step is a product decision. |
| V12 | `design-prototyping` |  | Pass | Validating a prototype before production maps to prototype validation and review structure. |
| V13 | `creating-skills` |  | Pass | Folding repo and PR-history lessons into skills is explicitly `creating-skills`. |
| V14 | `design-systems` |  | Pass | Generated UI using tokens and component APIs is design-system architecture and adoption. |
| V15 | `creating-skills` |  | Pass | Auditing trigger text, sources, examples, and tests is skill-library maintenance. |

## 2026-06-26 Current-Agent Sanity Pass

This pass was not a formal fresh-context judge. The available subagent tool requires explicit user authorization for delegation, so this record only captures a descriptions-and-boundaries sanity pass from the current agent. Treat it as weaker evidence than the existing routing-eval fresh-agent results.

| # | Expected | Result | Notes |
| --- | --- | --- | --- |
| V1 | `creating-skills` + `working-with-ai` | Pass | Evidence-to-skill architecture triggers both; packaging first. |
| V2 | `working-with-ai` | Pass | CLAUDE.md/repo-agent wording should beat `ux-writing`. |
| V3 | `design-systems` | Pass | Design system as agent context is explicit in description. |
| V4 | `design-systems` + `creating-skills` | Pass | Component misuse/lint decision starts in DS, then packaging. |
| V5 | `design-craft` | Pass | "feels off", polish, review quality ritual all route there. |
| V6 | `frontend-design` | Pass | Bold landing page and generic AI output are generation/aesthetic signals. |
| V7 | `ai-experience-design` | Pass | Confidence display for an AI feature is explicit. |
| V8 | `ai-experience-design` | Pass | Product workbench where AI suggestions land is product-agent UX. |
| V9 | `ux-writing` + `creating-skills` | Pass | Copy rule source and settings-page wording route to `ux-writing`, packaging second. |
| V10 | `user-onboarding` | Pass | Empty dashboard and first-run path match description. |
| V11 | `product-decision-making` | Pass | Setting/default/onboarding choice is a product decision before UI. |
| V12 | `design-prototyping` | Pass | Prototype eval fixture route is explicit after the P1 note. |
| V13 | `creating-skills` | Pass | Source repo and PR history folding match conversion trigger. |
| V14 | `design-systems` | Pass | Tokens/component APIs/raw classes is DS-as-agent-context. |
| V15 | `creating-skills` | Pass | Collection-level skill audit and missing tests match skill authoring/improvement. |

Next formal step: rerun `python3 scripts/build_vercel_probe_packet.py` and repeat the fresh descriptions-only judge after future description or routing-probe changes.

## 2026-11-12 design-craft plain-request triggers (V16–V18)

Change: the `design-craft` description now names everyday requests ("make it look better", "fix the jank") and adds a "frame drops → motion" boundary; "quality ritual" and "unship" were dropped from the trigger list (the body still covers both). The body gained a plain-request router that sorts symptoms by kind before picking a theme.

Judge: fresh general-purpose subagent with no repo context. It read only a *blind* packet (the descriptions plus the V1–V18 prompts, with the Expected column removed).

| Probe | Expected | Judge first / second | Result |
| --- | --- | --- | --- |
| V5 | `design-craft` | `design-craft` | Pass (no regression) |
| V16 | `design-craft` | `design-craft` | Pass |
| V17 | `design-craft` | `design-craft` / `motion` | Pass; the judge flagged it as ambiguous with `motion`'s "jank audits" because the menus blink in. Second-skill motion is acceptable. |
| V18 | `motion` | `motion` | Pass (control); the judge cited the new "frame drops → motion" boundary. |

Other probes: V2–V8 and V10–V15 matched their first skill. V1 came back as the accepted pair in reverse order (`working-with-ai` then `creating-skills`). **V9 drifted:** it was judged `working-with-ai` + `ux-writing` against the expected `ux-writing` + `creating-skills`. This drift predates the change; none of those descriptions were edited. Recheck V9 at the next description pass. The judge also named V4, V11, V12 and V14 as genuinely ambiguous between neighbouring descriptions.

Note: if a local `~/.claude/skill-evals/routing-eval.md` exists, `check_vercel_routing_probes.py` expects it to carry probes 130–132 mirroring V16–V18.

### 2026-11-12 recheck after merging main (Emil Kowalski open-skills fold)

Both branches edited the `design-craft` description, so the two were merged under the 450-character cap. The merged version keeps main's "stress-test", "worst-case data" and "quality ritual" alongside this branch's "make it look better", "fix the jank" and "frame drops → motion". It drops "decide wider vs deeper", "polished", "dogfood" and "unship"; the body still covers all four.

A fresh judge read a blind packet: the descriptions plus W1–W18 from `docs/web-motion-routing-probes-2026-11.md` and V1–V18, with no expected answers.

- **`design-craft` targets:** W10, W16, W17, V5, V16 and V17 all pass. V17's second skill was `web-design`.
- **Frame-drop control:** V18 → `motion`, pass.
- **W1–W9, W11–W17:** all pass. W18 came back as "none", which its notes accept.
- **Drift in descriptions this change didn't touch:** V9 (as before) and V12 (`working-with-ai` first, `design-prototyping` second, against the expected `design-prototyping`). Recheck both at the next description pass.

## 2026-11-14 design-systems hands-on triggers (V19–V22)

Change: the `design-systems` description now covers the hands-on work folded from design.how (extract a system from shipped UI, audit token use, document a component, migrate screens) and adds a "reviewing one screen → interface-review" boundary. It dropped "multi-brand", "token taxonomies", "adoption planning", the "org AI rollout → working-with-ai" boundary, and the "icon font" trigger to stay under the 450-character cap; the body still covers all of them. No other description changed.

Judge: fresh general-purpose subagent with no repo context. It read only a blind packet: the descriptions plus the V1–V22 prompts, with the Expected and Notes columns removed.

| Probe | Expected | Judge first / second | Result |
| --- | --- | --- | --- |
| V19 | `design-systems` | `design-systems` | Pass; cited the "hardcoded colors" trigger. |
| V20 | `design-systems` | `design-systems` | Pass; `working-with-ai` did not take over. |
| V21 | `design-systems` | `design-systems` | Pass; neither `ux-writing` nor `devtools` took over. |
| V22 | `interface-review` | `interface-review` | Pass (control). The judge called it ambiguous with `web-design` because "laggy on my phone" reads as one performance domain. |
| V3, V14 | `design-systems` | `design-systems` (V14 second: `working-with-ai`) | Pass (no regression). |
| V4 | `design-systems` + `creating-skills` | `design-systems` / `working-with-ai` | First skill passes; the second came back as `working-with-ai`. |

Other probes: V5–V8, V10–V13 and V15–V18 matched their first skill, so V12's earlier drift did not recur. V1 came back as the accepted pair in reverse order, as before. **V9 still drifts** (`working-with-ai` + `ux-writing` against the expected `ux-writing` + `creating-skills`); none of those descriptions were edited here.

### 2026-11-14 recheck after adding `make-font` (V23–V24)

Change: new top-level skill `make-font` with a new description. No other description changed since the run above.

Judge: a second fresh general-purpose subagent, blind packet with the descriptions plus V1–V24 and no expected answers.

| Probe | Expected | Judge first / second | Result |
| --- | --- | --- | --- |
| V23 | `make-font` | `make-font` | Pass; neither `web-design` nor `logo-design` took over. |
| V24 | `web-design` | `web-design` | Pass (control); the judge cited the "choosing or pairing existing fonts → web-design" boundary. |
| V19–V22 | as above | unchanged | Pass. |

All other probes matched the run above, including the standing V9 drift and V4's `working-with-ai` second skill.

### 2026-11-17 recheck after merging main (November audit, PR #52)

Main rewrote 13 descriptions and slimmed several bodies. The `design-systems` description from this branch applied cleanly on top; its body kept main's slimmed text and gained a compact hands-on router, staying under the 5k-token budget.

A third fresh judge read a blind packet built from the merged descriptions (V1–V24, no expected answers). V19–V24 all pass, with `web-design` as an accepted second skill on V22. V3, V14 and every other first-skill match is unchanged; V9 still drifts as before, and V4's second skill is still `working-with-ai`.
