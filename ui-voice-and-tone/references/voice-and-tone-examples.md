# Voice & Tone — Worked Examples

*Sources:*
- *Apple WWDC 2024, session 10140 — "Add personality to your app through UX writing" (Alex & Liv). https://developer.apple.com/videos/play/wwdc2024/10140/*
- *Apple WWDC 2022, session 10037 — "Writing for interfaces" (Kaely Coon & Jennifer Bush). https://developer.apple.com/videos/play/wwdc2022/10037/*

Quotes are transcribed from the talks. Use these to reason by analogy when defining a voice, dialing tone, or reviewing screen copy.

---

## 1. The voice-definition exercise, worked

**Investment app** (helps people early in their careers make long-term investments). Imagining it as a person produced adjectives like *smart, serious, articulate, sharp* — plus a few that didn't fit (*polite, quick-witted, formal*). Clustering surfaced two themes:
- **Smart** (smart / articulate / sharp)
- **Motivating**

Those two became the voice. The leftover words still inform word choice, but aren't the definition.

**Kids' savings app** (same purpose — reach a financial goal — very different person). Imagined as a teacher or coach: *fun, positive, optimistic, …* → three themes:
- **Kind · Fun · Encouraging**

Side by side, two apps with the same purpose end up with opposite voices. The exercise isn't an exact science: if a word doesn't fit a cluster but matches what you want, keep it.

---

## 2. Welcome-screen evolution (before → better → best)

A welcome screen is one of the first chances to express voice. Start generic, then edit toward the voice — each edit serving a specific attribute.

**Investment app** — voice = *smart, motivating*:
1. `Save your money.` — generic; everyone knows to save. Doesn't sound smart or motivating.
2. Drop "Save"; pick an active, empowering verb → `Customize your investment strategy.` — more motivating *and* smarter (specific about what the app does).
3. Speak to the audience of young investors → **`Customize your long-term investment strategy.`** — specific and on-voice.

**Kids' savings app** — voice = *kind, fun, encouraging*:
1. `Save your money.` — "Save" reads like a directive, not help.
2. Lead with help → `We'll help you save your money.` — reinforces *kind* and *encouraging*.
3. Get specific about the fun payoff → **`We'll help you save up to buy something you want.`** — playful, with a reason to save.

Same starting sentence, two destinations — driven entirely by voice.

**Same line, dialed punchier (tone, not voice):** for an energetic welcome, the kids' line was made more action-oriented — a casual *"really,"* an exclamation mark, and dropping "to buy" — without leaving the *kind/fun/encouraging* voice.

---

## 3. Tone dials in action (Apple voice: clarity · simplicity · friendliness · helpfulness)

Each is turned up or down for the situation; **none goes all the way down.**

- **Celebration — Fitness+ / Activity** (friendliness ↑, simplicity slightly sacrificed, helpfulness low): `Three cheers!` + `You tripled your daily Move goal.` (and elsewhere, `Don't stop now!` after a 100th workout). Exclamation marks are rare here but earned by the moment.
- **Health alert — high heart rate** (clarity ↑, direct): headline `High heart rate`, then `Your heart rate rose above 120 BPM while you seemed to be inactive for 10 minutes starting at 9:59 AM.` — three exact numbers so you can decide what to do.
- **Connectivity / blocking error** (helpfulness + clarity ↑, friendliness ↓ but not off): `Cellular Data is Turned Off.` + `Turn on cellular data or use Wi-Fi to access data.` Repeating "data" is deliberate — clarity is paramount.
- **New-feature intro — Work Focus** (friendliness + helpfulness ↑, simplicity lower): headline is just the feature name `Work Focus`; body gives relatable examples: `When you're working on a project or your to-do list, get things done by silencing notifications or customizing your screens and apps.`

**The 4 steps:** pick four voice qualities → place on a spectrum → decide the balance the situation needs → write to it. Some qualities (e.g. *smart*) stay always-on.

---

## 4. PACE before/afters (Writing for interfaces)

**Purpose**
- *Messages intro* — hierarchy carries purpose: header `Share Your Name and Photo with Friends`, button `Choose Name and Photo`, smaller supporting text below.
- *Temperature warning* — an overloaded draft (why it's hot, emergency-call emphasis, etc.) → simplified to headline `Temperature` + a thermometer image + one sentence that you must let iPhone cool down, with a single `Emergency` button. Know what to leave out.
- *Flows* — give the whole flow a purpose and each screen one too (Apple Cash family-sharing ends on an `Almost Ready` screen that sets the expectation of a notification).

**Anticipate** (app as conversation; answer "what comes next?")
- *Clock* — "apply to all weekends?" defaults to `Change Next Alarm Only` (most people mean just tomorrow).
- *Sleep* — `Sleep Well` at bedtime; next morning: `It looks like you're awake. Would you like to turn off your alarm and sleep mode?`
- *Hard fall* — `It looks like you've taken a hard fall` with an `I'm okay` reply — calm and clear in a stressful moment.
- *Breathe* — `Be still, and bring your attention to your breath.` → `Now inhale…` → `And exhale.`
- *Maps commute* — `8 minutes to Home` / `Take Audubon Ave, traffic is light.`

**Context** (write for the environment; alerts only for a real choice; specific buttons)
- *Subscription cancel* — `Confirm Cancellation` with `Cancel` / `Confirm` buttons is ambiguous → `Cancel Platinum Subscription?` with **`Cancel Subscription`** / **`Keep Subscription`**, body `You'll continue to have access until June 21, 2022.` Buttons must make sense read on their own — never Yes/No.
- *Destructive action* — `Remove iPhone?` with the destructive `Remove` red and on the left, `Cancel` on the right.
- *Error* — `Oops! you can't do that` + `error code 1234567` + `Sorry, bad input. Please try again.` (interjections patronize; "sorry"/"please" can sound insincere) → headline `Billing Problem`, body explaining the fix, buttons `Add Payment Method` / `Not Now`.
- *Empty state* — `Nothing strike your fancy?` (cute idiom, may not translate, no guidance) → Podcasts `No Saved Episodes` + `Save episodes you want to listen to later, and they'll show up here.`

**Empathy** (write for everyone)
- *Localization* — the same "restart to change language" confirmation grows/shrinks across English, Thai (taller characters), Dutch (wraps to a second line), and Hebrew (right-to-left). Day-of-week abbreviations differ too: one letter in US English, two in Catalan, none in Arabic.
- *Accessibility / VoiceOver* — describe **intention and context**, not just appearance: `Person tilting head to the side with hand beside mouth as if sharing a secret`; `person meditating with relaxed arms and forefingers touching`; `nervous person biting fingernails`. Each is a "person," not a man/woman — avoid unnecessary gender.

---

## Cross-cutting takeaways

- Voice attributes **are** your tone dials; never zero a dial — adjust the balance.
- Specificity beats generic; edit each line toward a named voice attribute.
- Personality only where it doesn't cost usefulness.
- **Read it aloud** — it surfaces unnatural phrasing, repetition, and typos, and tests "does this sound like us?"
- For the *name* on the button → `naming-features-and-labels`; for *failure* copy → `error-messages`; for *long-form* prose → `write-clear-prose`.
