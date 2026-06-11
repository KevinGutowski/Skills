---
name: ai-enablement
description: "Make AI context legible, distributed, and adopted across a design/product org — decision archives wired to MCP, company-specific internal agents, team skills, enablement programs. Use when rolling out AI tooling to a team, sharing agent context beyond one person, or planning AI training. Repo agent rules → agentic-coding; DS-as-AI-context → design-systems. Based on Dive Club interviews. Triggers: AI enablement, AI adoption, internal agents, team skills, builder week."
---

# AI Enablement

**Sources** — Dive Club podcast (2025–26 episodes):
- *Katarina Batina (Design Director, Shop app at Shopify) — 0YjO7wShTkQ*
- *Tommy Geoco — OYNoy468kS8 (incl. survey data + secondhand reports from Ramp, Metalab, Vercel)*
- *Louis Healey & Hall (Atlassian) — CqMZTg7L-wE*
- *Ian Silber (OpenAI) — oM1d9Tau27w*
- *Kris Puckett — nPyxVMd1LIA*
- *Steven Haney field report — Y0n6F9VlLVc*
- *NYC panel (Choy/Shipper/Zipper) — V-jd3v9P-Ps (cross-ref: agentic-coding)*

The task shape: an individual's AI workflow works; the org's doesn't. This skill covers making organizational context *legible* to agents, making one person's context *visible* to teammates, and making adoption actually happen — because "if you build it they do not come" (Louis Healey, Dive Club podcast, CqMZTg7L-wE).

## Make internal decisions legible to agents

The highest-leverage move is upstream of any tool: capture decision-making in queryable form. Shopify's Shop app team (Katarina Batina, Dive Club podcast, 0YjO7wShTkQ):

- "We transcribe all of our meetings. We make those accessible." A homegrown tool (Vault) makes "our entire internal development process legible… all decisions made on all projects can be easily documented."
- The wiring: "all of that data then has an MCP hooked up to it that as I'm looking to make decisions as a product leader, I can just ask my agent and it will query and find all of these previous decisions."
- The payoff is institutional memory on tap: "we've actually worked on that before. Here's where it failed."
- Designers there pair a harness with Claude Code, "plugging directly into production data sets." (Caption renders the harness name as "Pi" — likely a transcription garble; the pattern, not the name, is the point.)

Same pattern at OpenAI, packaged as a role: "we have an internal agent that we use which is like a data scientist. Any designer working on something can ask questions" — how is this actually used, what are the use cases (Ian Silber, Dive Club podcast, oM1d9Tau27w). Wrap org data behind agents named for the *job they do*, not the system they query.

## Company-specific beats general-purpose

Why build internal agents at all? Geoco asked Diego at Ramp why they built Glass instead of using an off-the-shelf agent: "because Co-work is good at general purpose, Glass is good at Ramp" (Diego at Ramp, via Tommy Geoco, Dive Club podcast, OYNoy468kS8; "Co-work" possibly "Cowork" — caption ambiguity). The differentiator is the context layer — Geoco's "context layer of headless design… I think that's where this is going": durable company/team/personal context that travels across tools instead of being rebuilt per tool.

Internal tools spread the same way products do. Ramp reported ~1,500 vibe-coded internal tools; most are throwaway, and that's fine — "how does internal adoption happen? It happens just like anything else happens with a product. It's useful, someone tries it, and then it starts to spread" (Geoco, OYNoy468kS8). Run agents in public channels so prompting itself becomes legible — "you get to see other people prompting" — and a good shared agent becomes a culture carrier, like Ramp's Cody, who taught "other agents how to work and then how to teach their humans how to work" (NYC panel, Dive Club podcast, V-jd3v9P-Ps; fuller treatment in `agentic-coding`).

## The visibility problem

Personal context doesn't transfer by existing. Ridd: "I don't even read my markdown files. So how is another designer going to have any clue what is in there" (Dive Club podcast, OYNoy468kS8). Context that lives in one person's dotfiles is invisible to the team; someone has to deliberately promote it to a shared, named, discoverable artifact. Kris Puckett's framing of the role: "whether it's, I don't know, skills for Claude for the team, or any way I can kind of fill the gap" (Dive Club podcast, nPyxVMd1LIA) — team-level skills are the unit of shared context, and curating them is real work someone must own.

## Enablement programs (Atlassian playbook)

From design-system AI-context work at Atlassian scale (Louis Healey + co-presenter Hall, Dive Club podcast, CqMZTg7L-wE):

- **"If you build it they do not come."** Guidance must be "as simple as possible and also in the different formats that people learn in."
- **Baseline content:** "101 prototyping essentials" Looms + written guidance; even "a 3-minute UI tour of this button does this" — "a lot of people aren't that exploratory."
- **Tools-down time:** a dedicated AI builder week — the president told "thousands of people tools down for an entire week" to learn.
- **High-touch at scale:** a ~500-person Replit masterclass ("incredibly stressful but incredibly valuable"), step by step.
- **Targeted nudges beat broadcasts:** "if you blast out a thousand people… most people are going to ignore it. So what I created was a Slack bot that creates a group DM" — design-ops leads DM inactive users in batches.
- **Leaders demo top-down:** design leaders sharing prototypes in weekly Looms and design reviews — "my boss's boss is doing this. Maybe I should do this as well."
- **Let status do the work:** "the good demos in our sort of design reviews appear to be the prototypes" — static designs get less commentary; the social gradient pulls people in.

DS-specific mechanics (icon hallucination fixes, navigation templates, prompt-ready system context) live in `design-systems` → "The design system as AI context."

## Adoption patterns and top-down investment

- **Pilot team vs all-at-once:** Metalab's "Team Zero" — ~three people, one real client project, tasked with working as AI-natively as possible — vs Atlassian's whole-company builder week. Both are deliberate; the failure mode is neither (waiting for organic adoption).
- **Unblock with money and time:** exploration "is expensive… you go down rabbit holes that are throwaway work a lot. Leaders are saying, 'No, I'm going to unblock it. We're going to throw spend at it. We're going to give people time for this'" (Geoco, OYNoy468kS8) — e.g. Vercel's Friday hackathons.
- **Mandates are appearing:** "AI usage is being mandated in performance reviews for designers. Full stop" — framed as forcing exploration, not output quotas (Steven Haney, Dive Club podcast, Y0n6F9VlLVc).
- **Infrastructure is a staffed investment, not a side effect:** designer playgrounds (forked repos stripped of env-var/lint/build friction) and internal sharing platforms — one company built an "FTP-like" drag-and-drop platform that auto-deploys previews of vibe-coded work. "100% companies are building tooling around these flows but somebody has to build that" — and maintain it (Haney, Y0n6F9VlLVc).

## Checklist

- [ ] Are decisions captured somewhere queryable (transcripts, decision docs) — and is an agent wired to it (MCP)?
- [ ] Do internal agents carry company-specific context, or are you shipping a general-purpose tool and hoping?
- [ ] Has anyone promoted personal markdown/skills to named, team-level artifacts — and does anyone own that?
- [ ] Do agents run in public channels so prompting is visible and copyable?
- [ ] Does the enablement plan have all four layers: baseline content (101s/tours), protected time (builder week/pilot team), targeted nudges (bots, not broadcasts), and leaders demoing?
- [ ] Is spend/time explicitly unblocked, and is playground/sharing infrastructure staffed for maintenance?

> **Staleness note:** 2025–26 tooling era; fast-moving. Tool and agent names (Claude Code, Glass, Cody, Replit, specific harnesses) and specifics like the performance-review mandates will date quickly. The durable layer: decision legibility → agent access; company-specific context as the moat; visibility/promotion of personal context; enablement as multi-format programs plus social proof; adoption as a funded, staffed product.

## Relationship to other skills

- **`agentic-coding`** — repo-level agent rules (AGENTS.md/CLAUDE.md), individual workflows, and the NYC-panel org-adoption notes (public channels, Cody, skill libraries being personal); this skill is the org-wide enablement layer above the repo.
- **`design-systems`** — DS-as-AI-context mechanics (system knowledge wired into codegen, hallucination fixes); this skill covers the *programs* that get people using it.
- **`design-org-influence`** — the business case and political capital for design initiatives; use it when the enablement budget or mandate itself needs selling.
- **`creating-skills`** — the craft of writing the team-level skills this skill says someone must own.
