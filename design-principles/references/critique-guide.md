# Critique Guide & Worked Examples

*Source: Apple WWDC 2026, session 250 — "Principles of great design." https://developer.apple.com/videos/play/wwdc2026/250/*

Per-principle diagnostic questions for reviewing a design, plus the talk's worked examples. Use the questions to drive a critique; use the examples to reason by analogy.

---

## Diagnostic questions, by principle

### Purpose
- What is this feature *for*, in one sentence about the person — not the technology?
- What does it ask of the user (time, attention, trust), and is that exchange fair?
- What could be cut without hurting the core purpose? (Start here, not with what to add.)

### Agency
- Where is the user forced down a path instead of offered a choice?
- Can every meaningful action be undone? Is undo discoverable?
- Are destructive actions confirmed? Are confirmations reserved for genuinely big mistakes, not used so often they become noise?

### Responsibility
- **Privacy:** Is data requested at first launch or only when contextually needed? Is each request minimal and explained? Would this feel acceptable if a stranger asked for it in person?
- **Safety:** How could this be misused? Who — including non-users — could be harmed? What's the safeguard?
- **AI specifically:** What's the worst plausible model output here? Is there a preview/confirmation/disclaimer? Does the value justify the risk, or should the feature be removed?

### Familiarity
- Do icons/metaphors match their established meaning elsewhere (no hijacked trash can, no reinvented delete)?
- Is the metaphor pitched between too-literal and too-abstract — does it help people *predict* behavior?
- Do same-looking elements behave the same? Are key actions in consistent locations across screens and devices?

### Flexibility
- What contexts will this be used in (home, mobile, hands-free, etc.), and does it adapt to each?
- Does it use each device's strengths (touch on iPhone, pointer/depth on Mac)?
- Who's in the audience by age, language, expertise, and accessibility need — and where does the design exclude them?
- Where one layout can't satisfy everyone, can people personalize (rearrange/hide)?

### Simplicity
- Is it actually *simple* (frictionless, findable) or just *minimal* (functionality hidden to look clean)?
- Is the language plain — no jargon, no redundancy? How many steps to the goal, and which can be removed?
- Is there a clear hierarchy (order, spacing, contrast) so the most important thing is the most obvious?
- Is anything *missing* that would give needed context (the "add to simplify" case)?

### Craft
- Fonts, colors (light *and* dark), icons, animations — does each feel high-quality and give immediate feedback?
- Does anything feel rushed: lag on tap, jittery scroll, misalignment, broken rotation/resize?
- Is there a plan to maintain and evolve it as new features/hardware arrive?

### Delight
- What specific emotion should the user feel here (relaxed, confident, excited)?
- Where in the experience is that emotion reinforced — and is it intrinsic, not bolted-on confetti?
- Does the whole feel human, as the sum of the other principles done well?

---

## Worked examples from the talk

**Permission prompts (Responsibility / Privacy).** Apps that throw permission prompts the instant they launch — before the person knows what the app does — are the interface version of a stranger demanding your phone number with no reason. Fix: wait for the moment the data is actually needed, ask only for what's necessary, and say what it's for.

**Recipe app + allergy (Responsibility / Safety + AI).** A user logs an allergy. An AI feature must anticipate that the model might suggest an ingredient that triggers a severe reaction — real-world harm you can't leave to chance. Add safeguards (previews, confirmations, disclaimers); if the risk outweighs the value, remove the feature.

**Trash can (Familiarity / Metaphor).** The trash can works because it maps to the real world — unwanted things go in, and you can retrieve them if you made a mistake. It breaks the moment you use the trash icon to mean something other than delete, or restyle the delete icon into something unrecognizable: you forfeit instant recognition.

**Inspector (Familiarity / Metaphor calibration).** An inspector shows details of whatever is selected. Too literal and people don't connect it to the in-app concept; too abstract and the idea doesn't land. A good metaphor sits in between and lets people predict what it does.

**Mac close button (Familiarity / Consistency of placement).** You can always close a Mac window from the top-left corner — same spot every time. Consistent placement across screens and devices speeds people up because they don't have to think about where the control is.

**Listening to music (Flexibility / Context).** The same task changes completely by situation: at home through speakers, on a run with AirPods + Watch, driving fully hands-free. An interface that accommodates each feels more comfortable and serves a wider audience.

**Rearrangeable controls (Flexibility / Personalization).** No single control layout works for everyone, so let people rearrange controls to fit their workflow or hide ones they never use.

**Video play/pause + scrubber (Simplicity / add to simplify).** The play/pause control is simple and familiar. But on returning later, the user needs more context — so showing current position and time remaining *adds* information that makes the simple control more useful. Simplicity is "exactly enough," which sometimes means more, not less.

**Cheap vs. crafted (Craft).** Real-world tells: a rickety door that won't close, a shirt that unravels in the wash. Software equivalents: a button you tap and then wait on, jittery scrolling, misaligned icons, a layout that breaks on rotation. These make people distrust the results the product gives. Crafted details do the opposite — they inspire confidence.
