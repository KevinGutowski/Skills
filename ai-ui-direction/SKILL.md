---
name: ai-ui-direction
description: "Direct and fix AI-generated UI — diagnose layout bugs in primitive vocabulary (fixed/fill/hug, padding vs gap, nesting), prompt surgically, choose prompt-vs-edit, run the independent-judge loop. Use when AI UI output looks wrong and you must direct the fix, or when reviewing AI frontend output. Generation itself → frontend-design; agent mechanics → agentic-coding. Triggers: AI generated UI, fix this layout, vibe coded UI, AI slop, v0 output, direct the agent."
---

# AI UI Direction

**Sources:**
- *"The Skill Behind Every AI-Generated UI" + "Good Enough UI Is the Problem" — Matt D. Smith (MDS, Shift Nudge), 2025–26. The layout-primitive literacy thesis.*
- *Ryo Lu (Head of Design, Cursor) — design-to-code tutorial + Cursor panel, 2025. The substrate and bricks discipline.*
- *Jin Park (Notion) — "Building with Cursor" panel, 2025. The Figma-to-code pipeline.*
- *Paul Stamatiou's Claude-Design field test (the 65/100 diff — details in `design-prototyping`).*

The task shape: an AI produced UI and you have to make it *right* — which is a directing job, not a generating job. The thesis (MDS): **layout-primitive literacy is the prompting skill.** If you can't name what's wrong in the layout system's own vocabulary, "sometimes not having the knowledge makes it where you don't even know what questions to ask" — you prompt into the ether and iterate blindly.

## Speak in primitives

- **The three sizing behaviors** — fixed width, fill container, hug contents — are the diagnostic vocabulary (identical in Figma auto layout and CSS): "like a jacket hugging a body… if your jacket was set to fixed and your shirt was set to hug." Fill is only meaningful inside a nested container; hug suits vertical content (it can scroll), fill suits horizontal. Width and height are set *independently* — half of "broken" AI layouts are one axis on the wrong behavior.
- **Decompose before you prompt.** Real dashboards are "about three levels" of nested containers. Name the level the bug lives at (component-internal padding vs parent gap vs grid track) and address the instruction there — not "make it look better."
- **Derive constraints empirically, late.** Resize until it breaks, note the number ("minimum width on these of 184"), and only add min/max constraints "as you need them" — premature constraints in root components are how systems rot.
- **Know the framework axioms, skip the depths**: "the base pixels in Tailwind are 4 pixels. I don't need to know why." The floor for directing code is primitive fluency, not CSS mastery.

## Recognize the failure modes

- **Class-name litter**: when you can't name what you want, the model starts "littering the code with a bunch of class names" and "could just inject a bunch of random code that might make you struggle with your layout" — wrapper divs breeding wrappers. The fix is a more primitive-precise instruction, not another vague retry.
- **Token substitution**: models silently swap your values for framework defaults (Jin Park's pipeline: the AI used Tailwind's default colors — "pull the hex values and apply them as custom arbitrary values"). Diff exact colors, radii, spacing against the source design.
- **Detail loss in translation**: hand an agent a Figma mock and you lose the invisible specifics — "you want this easing curve to be exactly this value with like 0.2 like seconds" (Ryo). Carry motion and micro-detail as explicit specs, or do them yourself and hand the result over: "you do it. And then you can give it over and say, 'This is what I'm talking about'" (MDS).
- The element-by-element diff checklist for mock-to-code output (type weights/sizes, exact colors, corner radii, spacing, completeness, gradient scale) lives in `design-prototyping`'s agents tier.

## Direct the loop

1. **Substrate first** (Ryo): generate onto a constrained base — shadcn/Radix-grade primitives and "a really robust like foundational set of tokens and components" — because AI "is really good at composing patterns that exist." Then theme by hand. (Full de-slop rules → `frontend-design`.)
2. **Prompt surgically, in primitive vocabulary**, scoped to the right container level. Batch-generate options and cull ("five vastly different hover effects" → keep one, ask for five more in its direction).
3. **Prompt vs edit**: don't prompt "change P8 to P4" when you can edit the value directly (MDS's named anti-pattern) — prompting is for structure and behavior; direct edits are for values you can already see. The end-state role: "AI pilots" — "there's still going to be the need for someone to understand what they're doing and what makes it good."
4. **Judge in a fresh context**: have an independent judge with its own context window evaluate the output against explicit criteria (the pattern, loadout, and rationale live in `design-prototyping`'s agents tier #4; criteria sources: `design-principles`, `make-interfaces-feel-better`).
5. **Fundamentals gate the polish stage** (MDS's skateboard maxim): "Have fun dropping into the bowl" — speed is real, but output you can't diagnose is output you can't finish.

## Checklist

- [ ] Complaint translated into primitive vocabulary (which container, which axis, which behavior) before prompting?
- [ ] Generation running on a constrained substrate (real tokens + primitive components), not from scratch?
- [ ] Output diffed against source for token substitution and detail loss (colors, radii, spacing, motion values)?
- [ ] Value tweaks edited directly; prompts reserved for structure/behavior?
- [ ] Independent fresh-context judge run before calling it done?

## Relationship to other skills

- **`frontend-design`** — generates the UI well (de-slop substrate, distinctive aesthetics); this skill takes over when output needs direction and repair.
- **`design-prototyping`** — the agents tier owns the broader prototyping workflow, the mock-diff checklist, and the judge pattern; this skill is its layout-diagnosis sharp end.
- **`agentic-coding`** — agent workflow mechanics (plan mode, prompt protocol, topology); this skill is UI-specific direction.
- **`design-systems`** — the bricks/DS-as-AI-context doctrine that makes step 1 possible.
- **`make-interfaces-feel-better`** / **`emil-design-eng`** — the polish criteria the judge enforces.

> **Staleness note (Kevin's rule):** Tailwind/Figma specifics (4px base, auto-layout terms) are 2025–26-era tooling; the primitive-literacy thesis, failure-mode taxonomy, and direct-the-loop discipline are the durable layer.
