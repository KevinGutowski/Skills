---
name: ai-experience-design
description: Design AI/ML-powered experiences — the four design surfaces (data, metrics, outputs, inputs), output patterns (multiple options, fact-based attributions, confidence as actions not percentages, acknowledged limitations), input patterns (calibration, implicit/explicit feedback, corrections via familiar UI), plus prompting and layered safety for Apple's on-device foundation model (instructions vs prompts, guardrails, eval). Use when designing ML/LLM-backed features, presenting model outputs or confidence, designing feedback/correction flows, handling model mistakes or hallucinations, writing Foundation Models prompts/instructions, or reviewing an AI feature for trust and safety. Based on Apple WWDC sessions 803 (2019) and 248 (2025). Triggers: ML experience, AI feature design, model output UX, confidence display, attributions, recommendations UX, corrections, calibration, prompt design, Foundation Models, on-device LLM, guardrails, AI safety, hallucination.
---

# AI Experience Design

**Sources** — this skill aggregates two Apple sessions a generation apart:
- *Apple WWDC 2019, session 803 — "Designing Great ML Experiences" (Kayur Patel, Rubii & Cas). https://developer.apple.com/videos/play/wwdc2019/803/*
- *Apple WWDC 2025, session 248 — "Explore prompt design & safety for on-device foundation models" (Mary Beth Kery & Sprite). https://developer.apple.com/videos/play/wwdc2025/248/*
- *Apple Developer article — "Behind the appealing design of CapWords" (2025; the field notes below). https://developer.apple.com/articles/capwords/*

With ML, you design **how the product works, not just how it looks** — "machine learning decisions are all design decisions." The 2019 interface patterns remain the vocabulary; 2025 adds the generative model layer (prompting, guardrails, eval). Also see `design-principles`' *Responsibility* section, which already demands anticipating model harm.

## The four design surfaces (2019)

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

**Safety — the Swiss-cheese stack:** built-in guardrails (inputs *and* outputs) → your safety instructions → controlled inclusion of user input (raw input = max risk; your-prompt-plus-input; curated prompt list = max control) → use-case mitigations (allergen warnings, deny-lists). "The holes in the whole stack will have to line up for something to fall through" — but "you are still responsible for the experience in your app." Handle guardrail errors: silently for proactive features, with alternatives for user-initiated ones. **Evaluate:** datasets covering use cases *plus* adversarial prompts; an LLM auto-grader to scale; test the unhappy path; re-run when prompts or the model change.

**Field notes from CapWords** (2025 ADA winner for Delight & Fun; Apple article) — a worked example of the patterns shipping:
- **Choreograph latency into the flow:** the user-facing confirm step ("is this the object you want?") *is* the API wait — "that confirmation step actually gives the system time to get results," staged capture → remove background → confirm → display, with a micro-animation so "most users don't notice." Hide model latency inside an interaction the user would want anyway.
- **Platform frameworks before bundled models:** they evaluated shipping on-device models and rejected them (storage, download time, ragged edges) in favor of VisionKit + system APIs — "it worked really well without needing to integrate big models inside the app."
- **Privacy by architecture:** photos go to the model for one-time recognition and are deleted; nothing stored locally, no server to upload to. The strongest privacy story is the one with no data to protect.
- **Warmth is the product:** the founding gap was emotional, not functional — a translation app's "robotic voice" vs. a parent's answer. Users called it "the warmest and most humane AI I've ever used."

> **Staleness note (Kevin's rule):** the 2019 HIG ML chapter is now supplemented by the HIG's **Generative AI guidelines**; Foundation Models API names (`LanguageModelSession`, guided generation, `#Playground`) are 2025-era — verify against current docs. The interface patterns (options/attributions/confidence/corrections) are stable.

## Checklist

- [ ] Data collected for the experience you want; biases catalogued; failure paths storyboarded?
- [ ] Outputs: diverse options, fact-based attributions, confidence as actions/ranges, limitations acknowledged with alternatives?
- [ ] Inputs: one-time calibration, patient implicit feedback, negative-first explicit feedback, corrections via familiar UI?
- [ ] Generative: verified facts in the prompt; safety in instructions (never from user input); guardrail errors handled; flexibility-vs-safety spectrum chosen deliberately?
- [ ] Eval suite includes adversarial prompts and re-runs on model updates?

See `references/patterns.md` for the worked examples (Portrait mode data, Hopper/Lyft confidence, Memoji limitations, the verbatim 2025 prompts).

## Relationship to other skills

- **`design-principles`** — its *Responsibility* section (anticipate model harm, remove features whose risk outweighs value) is the values layer; this skill is the practice.
- **`app-intents-design`** — Siri/intent disambiguation and confirmation are this skill's low-confidence patterns applied to voice.
- **`feature-discoverability`** — "convey a sense of control" over personalization is shared territory; recommendation controls live in both.
- **`error-messages`** — model-failure copy follows its rules; this skill decides *what* the failure experience is.
- **`claude-api`** — for building with Claude rather than Apple's on-device model; the interface patterns here apply to either.
