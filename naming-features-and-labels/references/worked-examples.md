# Worked Examples

*Source: Apple WWDC 2026, session 290 — "Craft clear names for features and labels in your app." https://developer.apple.com/videos/play/wwdc2026/290/*

Full case studies behind the principles in SKILL.md. Each shows the criteria (Belongs / Sets expectation / Works everywhere) doing real work. Use these as patterns to reason by analogy when naming something new.

---

## 1. Apple Cash — labeling the available amount → **Balance**

**Context:** When sending money, the one thing a user needs to know is how much they have. That value sits right next to the Send button and needs a label.

**Candidates considered:**
- **Spending Power** — sounds compelling but isn't concrete. Raises questions (is it a credit limit? a score?). In a financial context, ambiguity is the worst failure. And when the value is low or zero, "Spending Power" stops being a label and starts feeling like a *judgment* — which breaks the trust a payment service depends on.
- **Current Funds** — accurately describes what's there, but reads like a spreadsheet. Say it aloud: "let me check my Current Funds." Nobody talks like that. The gut check alone disqualifies it.
- **Balance** ✓ — the industry-standard term: well understood, clear, neutral. Belongs in the app, sets exactly the right expectation, travels without friction.

**Lesson:** In high-trust contexts, clarity and trust come *before* brand expression. Sometimes the most obvious word is right because it's already doing the job. Watch for names that can read as judgment at their low/empty state.

---

## 2. Gym app — subscription tiers → clarity vs. brand

**Context:** Two plans on a subscription screen.

- **Basic Access / All Access** — clear, easy to choose between, low friction.
- **Lightweight / Heavyweight** — fun, on-brand for a gym, but introduces a learning curve. What do they actually mean? That friction makes choosing harder.

**Lesson:** Neither is wrong. You don't have to satisfy every criterion. If `Lightweight`/`Heavyweight` genuinely fit the brand better, that's a legitimate choice — there's just *more work to do* to make sure the names are understood (the brand tax). Decide by asking what matters most given where the names live: a purchase decision leans toward clarity.

---

## 3. Apple Maps — places you've been → **Visited Places** (full exercise)

**Context:** A feature that remembers places you've been — that café you found last week, the park with accessible trails. Built with privacy in mind (private, encrypted).

**Think / Feel / Do brainstorm (audience: everyday Maps users):**
- **Think:** easy, helpful, clever
- **Feel:** the delight of rediscovering a place whose name you couldn't remember; secure, because your places are private
- **Do:** find the feature, use it, share places with whoever they choose

**Themes that emerged:** Ease · Excitement (rediscovery) · Security

**Candidate generation + elimination:** Names were generated for each theme, then crossed out against the criteria — some didn't fit Apple, some were too vague, some wouldn't translate.

**Say-it-out-loud test:** survivors were dropped into natural sentences ("Hey, check out ___" / "search for ___"). Names that read and sounded natural advanced.

**Outcome — Visited Places:**
- *Belongs:* the interface already uses "places" throughout.
- *Sets expectation:* signals ownership — these are *your* places, not readable by Apple.
- *Travels:* works across languages.

**Lesson:** The criteria feel abstract until you anchor them to a specific audience. Think/Feel/Do turns them concrete and actionable.

---

## 4. Photos — algorithmic photo grouping → **Memories** (emotional register)

**Context:** A feature that scans your library and surfaces moments that matter — a birthday, a trip, an ordinary Tuesday worth remembering. Technically, it's algorithmic photo grouping.

**Why not a technical label:** The person who just found a five-year-old photo they'd forgotten, or a video of a laugh they hadn't heard in years, isn't thinking about algorithms. They're looking for a memory.

**Outcome — Memories:** meets the user where they are emotionally in a way a technical label never could. Fits the app's tone and the relationship people have with their photos. Still straightforward — but the clarity comes from *emotion, not explanation*.

**Lesson:** Clarity has more than one source. An evocative name can be clearer than a literal one when the feeling *is* the meaning.

---

## 5. Apple Podcasts — voice isolation → **Enhance Dialogue** (elimination chain)

**Context:** Podcast audio quality varies wildly — some polished, some recorded in a kitchen. The feature isolates voices and reduces background noise without altering the original audio. It lives in the menu that also controls playback speed.

**Chain (each flaw points to the next candidate):**
1. **Vocal Isolation** — audio-engineering jargon; names the tech, not the experience.
2. **Isolate Vocals** — a verb is right here (puts the user in control: something you *do*, not *have*), but still an engineering term.
3. **Clarify Speech** — closer, but only half the story; the feature does more than clarify.
4. **Enhance Playback** — puts the feature before the person. Enhanced *for whom*?
5. **Enhance Dialogue** ✓ — answers *what's being enhanced* and *for whom* before you even tap.

**Why it wins:** Fits the context, sets the right expectation, and delivers on it when toggled — all three criteria. Clincher: the same name already ships on **Apple TV** for a similar feature — strong proof it belongs.

**Lesson:** Build names by elimination, naming each candidate's specific flaw. For a feature the user toggles or performs, prefer a verb. Reuse of an existing name elsewhere is evidence of belonging.

---

## 6. Apple Music — automatic song transitions → **AutoMix** (invented compound)

**Context:** A setting that does what a good DJ does — handles transitions between songs automatically so playback never stops.

**How the coinage works:**
- **Auto** — it happens without you doing anything
- **Mix** — it blends songs together

Together they form a word that doesn't exist, yet is understood immediately.

**Lesson:** Naming with intention means you don't have to default to words that already exist. An invented name earns its clarity from its parts — so the coinage doesn't have to explain itself. Deliberate naming isn't only for hero features.

---

## Cross-cutting takeaways

- **Descriptive** (Balance, Visited Places, Enhance Dialogue), **emotional** (Memories), and **branded** (AutoMix) names all succeed — for different reasons. The criteria don't change; how you weigh them does.
- A name that already exists elsewhere in the product (or on a sibling platform) for the same concept is strong evidence it **belongs**.
- The **say-it-out-loud** test is a fast, reliable filter at any scale.
- Watch the **empty/low state**: a label that's fine when full ("Spending Power: $200") can read as judgment when zero.
