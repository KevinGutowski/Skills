---
name: ai-experience-design
description: "Design AI/ML-backed product features — confidence as actions, attributions, calibration, corrections, agent surfaces, prompting/safety/eval (incl. Apple's on-device Foundation Models). Use when designing ML/LLM features or agent UX inside a product. Fixing AI-generated UI or agents on your repo → working-with-ai; users reshaping the product → malleable-software. Triggers: AI feature UX, confidence display, attributions, hallucination, agent UX."
---

# AI Experience Design

**Sources:** [references/sources.md](references/sources.md) — 2 WWDC sessions + CapWords article + Ryo Lu + Dive Club.
Park weak AI-product standards in [coverage-gaps.md](references/coverage-gaps.md) until they have stable evidence, scope, and accepted examples.
With ML, you design **how the product works, not just how it looks** — "machine learning decisions are all design decisions." The 2019 interface patterns remain the vocabulary; 2025 adds the generative model layer (prompting, guardrails, eval). Also see `design-principles`' *Responsibility* section, which already demands anticipating model harm.

Boundary for agent-standard work: product AI and agent surfaces live here when users experience the AI inside the product. Repository agents, CLAUDE/AGENTS rules, skill packaging, evidence-intake loops, and design-system context packs route to `working-with-ai`, `creating-skills`, and `design-systems`.

## Core rules

1. **Data and metrics are design decisions;** storyboard failure paths, not just the happy path.
2. **Outputs** offer different options, attributions, and confidence as actions; say what the model cannot do.
3. **Inputs:** corrections through familiar UI; negative explicit feedback first.
4. **Do not default to chat.** Put AI inside the user's workflow or a purpose-built workbench; keep direct manipulation cheaper than prompting for small edits.
5. **Autonomy is a ladder, not a switch.** Each level needs visibility, reversibility, and opt-in scope; a human stays accountable.
6. **Protect consent.** Interrupt only for consequential actions; Apply/Revert is the user's final say; keep what the AI can perceive legible.
7. **Never rely on the model for facts or math;** safety lines live in instructions and never come from user input.
8. **Evaluate** with use-case and adversarial prompts, and re-run when the prompt or model changes.

## Route by decision

Sections below, in order: **Data & metrics** (what to collect and measure) · **Output patterns** (presenting predictions and options) · **Input patterns** (feedback and corrections) · **The generative layer** (prompting, guardrails, eval) · **Choosing the surface** (chat vs inline vs workbench vs canvas) · **Autonomy and accountability** (how much the AI does alone; agents as actors) · **Consent and trust** (permission prompts, perception, sources, privacy) · **Personalization** · **Waiting and progress** · **Product posture**.

Rules below carry a short name-tag for the source. The per-source summaries and full quotes are in [references/patterns.md](references/patterns.md) (read it for worked examples, verbatim prompts, or to cite a source); bibliography in [references/sources.md](references/sources.md).

## Checklist

- [ ] Data collected for the experience you want; biases catalogued; failure paths storyboarded?
- [ ] Outputs: diverse options, fact-based attributions, confidence as actions/ranges, limitations acknowledged with alternatives?
- [ ] Inputs: one-time calibration, patient implicit feedback, negative-first explicit feedback, corrections via familiar UI?
- [ ] Generative: verified facts in the prompt; safety in instructions (never from user input); guardrail errors handled; flexibility-vs-safety spectrum chosen deliberately?
- [ ] Eval suite includes adversarial prompts and re-runs on model updates?
- [ ] Surface chosen deliberately: AI inside the existing workflow or workbench, chat only where conversation is the right shape, direct manipulation still cheaper than prompting for small edits?
- [ ] Autonomy level named (suggest / first pass / bounded end-to-end), with visibility, reversibility, and opt-in scope at that level, and a human shown as accountable?
- [ ] Interrupting confirmations reserved for consequential or irreversible actions; every approval paired with visible recourse; extent of the AI's perception and its sources legible?
- [ ] Waiting states show specific, real progress with one focus; model latency placed inside a step the user wants anyway where possible?

See `references/patterns.md` for the worked examples (Portrait mode data, Hopper/Lyft confidence, Memoji limitations, the verbatim 2025 prompts).

## Data & metrics (2019)

- **Data** — "determines the behavior of a model… easily the most important decision you'll make." Collect intentionally for the experience you want (Portrait mode deliberately spanned races, cultures, scenarios); test for biases; beware academic datasets. The line to keep: **"You shouldn't reflect the world as it is. You should reflect a better world, the world that you want it to be."**
- **Metrics** — "your metrics reflect your values"; whatever isn't measured gets sacrificed. Unpack aggregates — **not all mistakes are equal** ("each failure is a person, a scenario"); metrics are proxies (time-in-app boxes people in). **Storyboard the failure paths, not just the happy path.** "The model is not the experience. The actual experience is the experience." "If the experience is bad and the metric says it's good, your metric is probably wrong."

## Output patterns

1. **Multiple options** — the single "best" prediction often isn't the best experience; show meaningfully *different* options (Maps routes); every pick is implicit feedback.
2. **Attributions** — explain with **objective facts, never subjective taste**: "Because you downloaded NYT Cooking," never "because you love cooking" (no profiling language); cite sources for trust.
3. **Confidence** — never raw percentages ("85% match" is jargon) unless people are conditioned to them (weather). Translate confidence into **actions** (Hopper: wait vs. buy now) or **ranges** (Lyft pickup windows); at low confidence, **ask** ("Is this you?").
4. **Limitations** — a mismatch between the mental model and what the feature can do. Acknowledge in the moment (Memoji's inline coaching when the face is dark), manage expectations, and **offer goal-equivalent alternatives** (no timer on Mac Siri → a reminder; the *goal* was an alert at a time).

## Input patterns

1. **Calibration** — quick, essentials-only, once (Face ID scans twice, then adapts forever); always editable/removable later.
2. **Implicit feedback** — from natural use; slow but accurate: "It's better to be patient and become certain of a suggestion than to be quick and show an unhelpful suggestion." Give privacy controls.
3. **Explicit feedback** — **prioritize negative over positive** (positive is better inferred; a "Love" button is homework). Consequence-precise labels ("Suggest less," "Hide this suggestion") and act immediately and persistently.
4. **Corrections** — fix mistakes through **familiar UI, not new chrome**: retype over the bad autocorrect; the suggested crop is a *starting point* on the standard handles. Reuse corrections as feedback.

## The generative layer (2025, on-device Foundation Models)

The on-device model is ~3B parameters: great at summarization, classification, conversation, composition, tags — **never math** ("non-AI code is much more reliable"), not code generation, limited world knowledge. **Don't rely on it for facts** — feed verified information into the prompt; fact-check outputs. Use **guided generation** to constrain outputs to your data structures.

**Prompting:** ask for length ("in three sentences"); assign roles; one clear command; <5 few-shot examples in the prompt; all-caps "DO NOT" suppresses ("like talking to it in a stern voice"). **Instructions vs. prompts:** instructions are session-level, persist across prompts, and the model is *trained to obey instructions over prompts* — so safety lines go in instructions, and **instructions must only come from you, never user input.** Iterate in Xcode `#Playground`.

**Generative interaction patterns (HIG Generative AI, June 2026):**
- **Refine, revert, acknowledge:** surface "controls like Edit, Undo, Retry, or Adjust near generated content" — and when people adjust output, "provide a clear signal that their action had an effect." This is the Corrections pattern extended to generation; it "helps people build an accurate mental model… and fosters trust."
- **Specific progress messages:** during generation, "instead of 'Processing…', say 'Finding substitutions for ingredients'" — "specific feedback reduces uncertainty and makes waiting feel purposeful." On failure: plain language + a clear next step. On blocked output, coach: offer example requests that lead to better results.
- **Model-type rubric:** on-device = private, fast, offline; server-based when you need "more processing power or a larger context size" — but "process as much information locally as possible, minimize what's shared," and disclose what's sent, stored, and whether it trains. (The on-device guidance below assumes the first branch.)
- For *generated* outputs the HIG endorses lightweight paired thumbs up/down — the negative-first rule above still governs *recommendation* feedback, where positives are better inferred.

**Safety — the Swiss-cheese stack:** built-in guardrails (inputs *and* outputs) → your safety instructions → controlled inclusion of user input (raw input = max risk; your-prompt-plus-input; curated prompt list = max control) → use-case mitigations (allergen warnings, deny-lists). "The holes in the whole stack will have to line up for something to fall through" — but "you are still responsible for the experience in your app." Handle guardrail errors: silently for proactive features, with alternatives for user-initiated ones. **Evaluate:** datasets covering use cases *plus* adversarial prompts; an LLM auto-grader to scale; test the unhappy path; re-run when prompts or the model change. The **Foundation Models instrument** is now a real eval/debugging surface (WWDC26): beyond token counts, it "allows you to inspect all of your requests, prompts, understand how many tokens are being cached" — use it to audit prompt cost and cache behavior on device.

## Choosing the surface

- **Proactive AI over bolt-on chat** (Evil Martians): don't paste a chat interface onto the product — escalate inside the user's natural workflow through three modes: *suggestion* (context monitoring surfaces help as the user works; the timing is the innovation), *action* (decompose complexity: sub-tasks, groupings, estimates), *question + action* (proactive asks inside the flow, never a separate chat).
- **Workbench over empty chat** (Linear): the product supplies structured context, familiar UI, permissions, review points, and places for suggestions to land. Triage Intelligence lives inside the triage view, uses native metadata chips, distinguishes AI suggestions from human/rule-set values, shows concise reasoning on hover, exposes a deeper thinking panel, and lets teams tune guidance at workspace/team level.
- **Chat-only is a bad floor** (Ryo Lu): re-skin the prompt→response primitive as inline inputs, selection actions, and Tab autocomplete. Keep direct manipulation cheaper than prompting for tiny edits (MDS). If you need a date, use a date picker (Perplexity).
- **Chat's five gaps to design against** (Zhuo): (1) blank page: show examples, templates, continuations; (2) iteration: marry chat to direct manipulation, editable canvases, variants; (3) input/output: choose the most obvious mode per intent — diagrams, voice, or charts may beat prose; (4) scope: state uncertainty and suggest a different approach outside competence; (5) personalization: ask situational questions, then adapt presentation. Chat is a power-user interface in disguise (Litt): no mutual pointing and text-only returns; his version-control fix lives in `malleable-software` §5.
- **When chat is the right shape, the chatbot laws** (Evil Martians): interactive onboarding tasks over instructions, error-tolerant input, **feedback within ~2 seconds** or show state, and every error gets a clear, personable message.
- **Tokens before pixels** (Silber): ask whether the model itself can do it before adding pixels; design into the capability gap with a dynamic-UI library the model can interpret. Design the harness, not screens (Lovin): at the model boundary, capability — not polish — is the moat; frontier users tolerate rough surfaces to reach new capability.
- **Many agents need a spatial or tabular surface:** canvas as multi-agent ops surface (Ruiz) — the canvas is the compare/branch medium code can't be; spreadsheets as thousand-agent harnesses (Guo) — start from the invariants.
- **Many valid outputs: expose the design space, not a consultant's answer** (Ballard): present the massive design space navigably rather than one architect-style answer. Gen-AI flips the push model to a **pull model** (Park) — design the tuning loop, not just the prompt, and own the input model (→ `hardware-product-design`). Generation is want-articulation (Ouriach): the product's job is eliciting the want, not just executing the prompt.
- **Bulletproof stencils** (Perplexity): design layouts that look good no matter what the model emits.

## Autonomy and accountability

- **The autonomy ladder** (Linear): model AI behavior in levels, not a binary. Level 1 suggests actions; Level 2 takes a first pass and lets people correct, reverse, or tune rules; Level 3 handles a bounded class of work end-to-end and brings humans back for final judgment. Each level needs explicit visibility, reversibility, and opt-in scope before increasing autonomy.
- **Agents are native but disclosed actors** (Linear): scope how they're assigned, mentioned, or invoked; track interaction state; humans are assigned and accountable, agents are delegated work and visible as helpers.
- **AI supplements user agency, never replaces it** (Evil Martians): recommendations are options, never forced; Apply/Revert is the user's final say (it *is* confidence-as-actions).
- **The human-opinion law** (Ryo Lu): "There needs to be something for the human to specify what is good, what is right, how I want to do it. If you don't put in that opinion, it will just produce AI slop."
- **Multi-agent output needs steering:** cluster changes semantically and front the swarm with one PM-like triage agent (Ryo Lu); give agents spatial identity, legible state, and an in-situ kill switch, and match metaphor to model capability — fairies, not colleagues (Ruiz).
- **Automate the burdensome, protect the rewarding** (IDEO Play Lab): decide per-task before automating, and remember the AI's advantage is sometimes emotional (removing social anxiety), not functional.

## Consent and trust

- **Confirmation fatigue corrodes consent** (Stamatiou): habitual approve dialogs train a reflex that destroys informed consent. Reserve interrupting confirmations for genuinely consequential or irreversible actions; make each dialog state what is granted, to whom, at what risk (identical-looking dialogs train the reflex); pair every approval with visible recourse. Apply/Revert only protects agency if approval hasn't become a reflex.
- **Social license** (New Computer): find the human analog for the software's role (search ≈ librarian) and keep tone and initiative within its social license; move boundaries by explicit offer-and-consent protocol — old data was never consented for new reasoning; keep the extent of perception continuously legible (an assistant commenting on something it shouldn't have seen destroys trust instantly).
- **Show sources for every piece of content** (Perplexity).
- **The Shape of AI taxonomy** (Campbell): **wayfinders**, **tuners**, **governors**, **trust builders** — "the new usability becomes how quickly can you build trust in a legible way." Trust-ladder, inverted onboarding, consent defaults: `references/patterns.md`.
- **Privacy by architecture** (CapWords): the strongest privacy story is the one with no data to protect.

## Personalization

- **The personalization stack** (Soleio Cuervo, 2014): **identity** (who the product helps the person become), **graphs** (which relationships/data networks create value), **context** (device, location, cadence, attention state), **behavior** (what the person is likely to do next). Be opinionated-but-adjustable: be purposeful about the behavior you want, then give people contextual chances to confirm, tune, or switch to manual. The competitor is existing habit, not other services.
- **Pace personalization to relationship age,** preferring shared history over stated preferences (New Computer).
- **Personalization bounds** (Worboys vs Choy; emerging theme — watch for a third source): decide per-layer what is fixed canvas vs user-malleable (→ `malleable-software`).

## Waiting and progress

- **Show real progress but curate focus** (Ryo Lu): no twin spinners, no vanity status lines — complements the HIG's specific-progress rule in the generative layer.
- **Choreograph latency into an interaction the user wants anyway** (CapWords): the confirm step *is* the API wait.
- **Use load time as an education surface** (Xantos).

## Product posture

- **Early days** (NYC panel): only search and coding are solved — design from observed behavior, not assumed preference.
- **Context and agency are the durable design job; AI apps compete as products** (Soleio Cuervo, 2025–26): when agents handle visual execution, leverage moves to the context the agent sees, the knobs the human steers, and the evidence loop after generation; once model capability commoditizes, advantage shifts to workflow fit, speed, trust, and craft.
- **Prefer platform frameworks over bundled models; the founding gap can be emotional rather than functional — warmth is the product** (CapWords).

> **Staleness note:** the 2019 HIG ML chapter is now supplemented by the HIG's **Generative AI guidelines**; Foundation Models API names (`LanguageModelSession`, guided generation, `#Playground`) are 2025-era — verify against current docs. The interface patterns (options/attributions/confidence/corrections) are stable.

## Relationship to other skills

- **`design-principles`** — its *Responsibility* section (anticipate model harm, remove features whose risk outweighs value) is the values layer; this skill is the practice.
- **`apple-design` (app-intents-design)** — Siri/intent disambiguation and confirmation are this skill's low-confidence patterns applied to voice.
- **`feature-discoverability`** — "convey a sense of control" over personalization is shared territory; recommendation controls live in both.
- **`ux-writing` (error-messages)** — model-failure copy follows its rules; this skill decides *what* the failure experience is.
- **`claude-api`** (Anthropic's skill, if installed) — for building with Claude rather than Apple's on-device model; the interface patterns here apply to either.
- **`malleable-software`** — owns the version-control fix to chat's limits (Patchwork, branch/review/discard) and the philosophy under personalization bounds; this skill owns the interaction patterns around AI output.
- **`hardware-product-design`** — when the AI lives in a device: input-method ownership, voice/light feedback channels, far-field pacing.
