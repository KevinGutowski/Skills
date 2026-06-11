---
name: naming-features-and-labels
description: "Craft and critique clear names for anything users see — features, labels, settings, buttons, tabs, modes, plan tiers, product names. Use when naming or renaming a feature, choosing descriptive vs clever/branded, generating candidates, or judging a name's clarity, fit, and tone. Based on Apple's 'Craft clear names' WWDC session. Triggers: what should we call this, name this feature, rename, label copy, plan names, clarity vs brand."
---

# Naming Features and Labels

*Source: Apple WWDC 2026, session 290 — "Craft clear names for features and labels in your app" (Heej, Human Interface design team). https://developer.apple.com/videos/play/wwdc2026/290/*

Naming is as fundamental to a product as layout, interaction, and visual design. A name is the first thing a user reads, and they predict what they'll find before they tap. Get it right and trust builds; get it wrong and every interaction starts from confusion.

This skill covers naming anything user-facing: features, settings, labels, values, buttons, plans, tabs, menu items, modes, and product names. Apply it when generating names, choosing between candidates, or reviewing a name someone proposes.

## The three criteria

Judge every candidate against three questions. A name doesn't have to satisfy all three — but it's great when it does, and you should know which one you're trading away and why.

1. **Belongs** — *Does it fit?* It should sound like this product, match what users expect to find there, and sit naturally among everything else you've already named. A name that already appears elsewhere in the product (or on a sibling platform) for the same concept is strong evidence it belongs.
2. **Sets the right expectation** — *Does it deliver on the prediction it creates?* When someone reads the name, they form an expectation. The name must pay it off. This is where clarity and trust live.
3. **Works everywhere** — *Does it travel?* Holds up across languages, markets, platforms, and the contexts where the product lives. Watch for terms that won't translate or that collide with other meanings.

You may also carry your own criteria — trademark availability, regulatory or industry constraints, existing brand terms. These are a guide, not a rulebook. **The trade-offs are yours to make** — but make them on purpose.

## The clarity ↔ brand dial

Every name sits somewhere between "maximally clear" and "maximally expressive." Pick the position deliberately based on where the name lives:

- **Lean clarity** in high-trust, high-stakes, or ambiguous-cost contexts: money, security, privacy, account state, anything financial or destructive. Here, the obvious industry-standard word usually wins. `Balance` beats `Spending Power` (ambiguous — credit limit? score? — and reads as judgment when it's low) and beats `Current Funds` (sounds like a spreadsheet; nobody says it out loud). Clarity and trust come before brand expression.
- **Lean brand** for personality-forward or hero features where the experience is the point. But know the cost: a clever or invented name carries a **learning-curve tax**. `Lightweight`/`Heavyweight` gym tiers may fit the brand better than `Basic`/`All Access` — but now you owe the user the work of teaching what they mean.

Ask: *given where this feature or setting lives, what matters most here?* Let the answer decide which criterion you prioritize.

## The naming workflow

### 1. Start with the audience, not the technology
The instinct is to name a thing by what it does, the tech behind it, or its internal function. Users don't see it that way — they want to know what it does *for them*. Get specific about who they are (new parents? marathon trainers?) before you generate a single name.

### 2. Run the Think / Feel / Do exercise
With the audience in mind, ask: when they encounter this feature, what should they **think**, **feel**, and **do**? Brainstorm freely — one idea per sticky note, don't filter, more is better. You're not hunting for the perfect word yet; you're surfacing **themes that keep recurring**.

> *Example — Apple Maps "places you've been" feature:*
> - **Think:** easy, helpful, clever
> - **Feel:** the delight of rediscovering a place you'd forgotten; secure (your places are private and encrypted)
> - **Do:** find it, use it, share places with whoever they want

### 3. Group into themes
Step back and cluster the notes. Different words pointing at the same feeling become a theme. For the Maps example: **Ease**, **Excitement (rediscovery)**, **Security**.

### 4. Generate candidates per theme, then eliminate against the criteria
Produce name options that honor each theme. Then cross out the ones that fail a criterion — doesn't fit the product, too vague, won't translate. Make the elimination explicit (see "Iterate by elimination" below).

### 5. The say-it-out-loud test
Drop each surviving candidate into a real sentence a user would read or say to a friend:
- "Hey, check out **___**."
- "Just search for **___**."

If it reads and sounds natural, it's worth exploring. If you wouldn't say it out loud (`let me check my Current Funds`), that gut check alone disqualifies it. Maps landed on **Visited Places**: descriptive, at home in an interface that already says "places" everywhere, signals ownership (*your* places, not readable by Apple), and translates cleanly.

## Iterate by elimination

The fastest path to a good name is a chain of candidates where each one's specific flaw points to the next. State the flaw, don't just discard. Worked example — a Podcasts feature that isolates voices and cuts background noise, living in the playback-speed menu:

| Candidate | Why it falls short |
|---|---|
| Vocal Isolation | Audio-engineering jargon; describes the tech, not the experience. |
| Isolate Vocals | A verb is good here — it puts the user in control (something you *do*, not *have*) — but still an engineering term. |
| Clarify Speech | Closer, but tells only half the story; the feature does more than clarity. |
| Enhance Playback | Puts the feature before the person. Enhanced *for whom*? |
| **Enhance Dialogue** | Answers both *what's enhanced* and *for whom* before you even tap. ✓ |

`Enhance Dialogue` won on all three criteria — and the clincher: the same name already ships on Apple TV for a similar feature. That reuse is proof it belongs.

**Note the verb insight:** for a feature the user toggles or performs, a verb ("Enhance," "Isolate") puts them in control better than a noun.

## Four registers that all work

Clarity isn't only achieved by being literal. Pick the register that fits the relationship the user has with the feature:

- **Descriptive** — says what it is plainly. `Balance`, `Visited Places`, `Enhance Dialogue`. Default for functional and high-trust surfaces.
- **Emotional / evocative** — clarity through feeling, not explanation. Photos' algorithmic photo-grouping is **Memories**, not "Smart Albums" — because the person on the other end isn't thinking about algorithms, they're finding a memory. Fits the tone and the relationship.
- **Action / verb** — names the thing the user does, keeping them in control. `Enhance Dialogue`, `Isolate`.
- **Invented / branded compound** — a coined word that earns its clarity from its parts. Apple Music's **AutoMix** (Auto = happens without you + Mix = blends songs) is a word that doesn't exist, yet is understood immediately. Naming with intention means you don't have to default to existing words — but the parts must carry the meaning so the invented word doesn't have to explain itself.

The criteria don't change across registers. Only how you weigh them does.

## Evaluation checklist

When reviewing any proposed name:

- [ ] **Belongs:** sounds like this product; sits well beside sibling names; matches what users expect here?
- [ ] **Expectation:** does it deliver on the prediction it creates? No ambiguity in a high-trust context?
- [ ] **Travels:** holds up across languages, markets, and platforms?
- [ ] **Audience-first:** describes what it does *for the user*, not the tech/internal function?
- [ ] **Tone:** never reads as judgment (e.g. a "power"/"score" label at zero)? Matches the stakes of the surface?
- [ ] **Say-it test:** sounds natural in a sentence a user would speak?
- [ ] **Register fit:** descriptive / emotional / verb / branded — the right one for this relationship?
- [ ] **Brand tax acknowledged:** if it's clever or invented, is the learning curve worth it and accounted for?
- [ ] **Consistency:** reuses an existing in-product term for the same concept where one exists?

## Three things to carry

1. **Naming is fundamental, not decoration.** It shapes the experience as much as layout or visuals. Come back to the criteria every time.
2. **The best names speak to the person, not just the thing.** Clarity can come from emotion (`Memories`) as much as from description. When what the product *is* and what the person *needs* align, the name feels like it belongs.
3. **Names compound.** Every good name makes the next one easier; together they become the language of your product. Consistency across names is itself a feature.

## Relationship to other skills

- **`linear-settings-copy`** decides *where a setting lives* in the IA and writes the full row (title + helper text + control/option labels). **This skill** decides *what to call* the feature, value, or option in the first place, and how to defend that choice. They compose: use this skill to pick the word, then `linear-settings-copy` to place it and write the surrounding copy. When a task is purely "name this setting/option label," reach for this skill's criteria; when it's "lay out this settings page," reach for `linear-settings-copy`.
- **`error-messages`** handles failure-state copy (what to say when something breaks). No overlap, but a feature's *name* should still appear correctly inside an error message.
- **`user-onboarding`** introduces and explains features to new users. A clear name does much of onboarding's job for free; name first, then onboard.
- **`write-clear-prose`** is for sentences and paragraphs. This skill is for the single word or short phrase that labels a thing — a different unit of work, though the say-it-out-loud instinct is shared.
- **`ios-brand-identity`** treats words/voice as part of brand in the content layer. This skill names the individual thing; situate that naming within the app's overall voice and brand there.
- **`ui-voice-and-tone`** defines the app's overall writing voice and the microcopy around a name; this skill picks the name itself. Set the voice there, choose and defend the word here. (The exercises rhyme — adjective-clustering vs. Think/Feel/Do — but produce different outputs.)
- **`app-intents-design`** — Siri invocation phrases and intent names are naming problems with extra constraints (app name in phrase, synonyms, say-it-aloud). Judge the words with this skill's criteria; structure the intent there.

See `references/worked-examples.md` for the full case studies (Apple Cash, gym plans, Visited Places, Memories, Enhance Dialogue, AutoMix) with the reasoning spelled out.
