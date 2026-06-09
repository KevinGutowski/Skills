# AI Experience Design — Worked Examples

*Sources: WWDC 2019-803 "Designing Great ML Experiences"; WWDC 2025-248 "Explore prompt design & safety for on-device foundation models."*

## Data & metrics (2019)

- **Portrait mode:** data deliberately gathered across races, cultures, scenarios — "historically, face recognition hasn't worked well for people of color." The quote to keep: "You shouldn't optimize for the customers you have. You should optimize for the customers you want."
- **Face ID's 1-in-a-million:** "doesn't tell the whole story. Each failure is a person, a scenario" — Apple publicly communicated the twin/lookalike limitation rather than hiding behind the aggregate.
- **App Store:** time-in-app as a metric would box people into more of the same; editorial content and diversity-aware metrics correct what raw engagement misses.
- Practice: group failure cases into scenarios; decide non-ML fix vs. better model; "the more you rely on something, the more you should question it."

## Output patterns (2019)

- **Multiple options:** Maps shows meaningfully *different* routes — "we can't know everything that a particular person may care about"; the Siri watch face surfaces a few of 19 data sources by time/location/history.
- **Attributions:** "Because you downloaded NYT Cooking" (objective fact) vs. "because you love cooking" (profiling judgment — never). Siri cites Wolfram Alpha for trust.
- **Confidence:** Hopper converts fare confidence into *wait vs. buy now*; Lyft shows pickup *windows*, never "72% confident you'll arrive at 1:30"; Photos asks "Is this you?" instead of auto-labeling at low confidence.
- **Limitations:** Memoji coaches inline when the face is out of view or too dark; Mac Siri (no timers) offers a reminder — the goal-equivalent alternative.

## Input patterns (2019)

- **Calibration:** Face ID scans twice, then adapts forever via implicit feedback; HomeCourt's hoop detection is quick and essentials-only; calibration data stays editable/removable.
- **Implicit:** keyboard tap-target resizing; Siri app suggestions by context. "It's better to be patient and become certain of a suggestion than to be quick and show an unhelpful suggestion."
- **Explicit:** negative-first ("Suggest less" / "Hide this suggestion," with per-source/person/app sub-options) — a "Love" button "implies homework"; act immediately and persistently.
- **Corrections:** retyping "Angie" over the "angle" autocorrect; the suggested crop as a starting point on standard handles. Corrections feed back as implicit signal. "These patterns are not necessarily new but they are applied in a new context."

## Generative layer (2025) — verbatim prompts & specifics

- The ~3B on-device model vs. hundreds of billions server-side; the bagel demo: it invents toppings for a plain bagel — "a weird bagel flavor might be funny in a game rather than misleading" (fine for an NPC, not an encyclopedia).
- Prompts spoken in the talk: `"Generate a bedtime story about a fox."` (+ "in one paragraph"); a fox role "who speaks Shakespearean English"; instructions `"You are a helpful assistant who generates scary stories appropriate for teenagers."`; diary instructions `"You are a helpful assistant who helps people write diary entries by asking them questions about their day."` → user: `"Ugh, today was rough."` → model: `"What made today rough?"`
- Few-shot: "fewer than five examples… directly into your prompt." Stern voice: all-caps "DO NOT."
- **Instructions > prompts** ("our model is trained to obey instructions over prompts"); instructions never from untrusted content. Guardrails run on inputs *and* outputs (output-guarding catches jailbreaks that slip input checks).
- Guardrail-error handling: proactive features swallow silently; user-initiated features show an alert or alternatives (Image Playground lets you undo the offending prompt).
- The flexibility-vs-safety spectrum: raw user input (max flexibility/risk) → your prompt + user input → curated built-in prompt list (max control).
- Use-case mitigations: bagel-flavor generator + allergies → warning UI or dietary-restriction filters; trivia app → instruction lines, keyword deny-list, or a trained classifier.
- Eval: cover all use cases + likely-unsafe prompts; automate end-to-end; LLM-as-grader to scale; "test the unhappy path"; re-run when prompts or Apple's model change; report via Feedback Assistant. "Happy prompting! But remember, safety first!"
