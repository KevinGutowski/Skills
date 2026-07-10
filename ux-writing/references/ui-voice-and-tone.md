# UI Voice and Tone

*Scope: Defines an app's writing voice, adapts tone per situation, and crafts the microcopy. Use when establishing a product's voice, dialing tone, or writing or reviewing UI microcopy. Defers naming to naming-features-and-labels, failure copy to error-messages, long-form to write-clear-prose. Triggers: voice and tone, UX writing, microcopy, copy review, empty state copy, dial up tone.*

**Sources:** [ui-voice-and-tone/sources.md](ui-voice-and-tone/sources.md) — 4 Apple WWDC sessions + Writing Is Designing + Designing for Emotion.

Writing is a design discipline, not decoration — when words work seamlessly with the design, you barely notice them, yet they carry every part of the experience. Every app already has a personality whether or not you chose it. This skill **defines the voice, adapts the tone per moment, and writes the microcopy** that expresses both. It owns overall voice/tone and general in-product copy; it routes naming, failure copy, and long-form prose to the skills below.

## Contents

- Voice vs. tone — the spine
- Define your voice
- Document the voice — and know where it recedes
- Dial the tone for the moment
- Write the screen — PACE
- Simplify — four small edits with big impact (2025)
- Localization-ready writing (2017 global-audience layer)
- Keep it useful (the guardrail both talks share)
- Checklist
- Relationship to other skills

## Voice vs. tone — the spine

- **Voice** = the expression of your brand and values through words — the things that *don't* change. (Apple's own working set: clarity, simplicity, friendliness, helpfulness.)
- **Tone** = how that voice flexes to the situation — the things that *should* change moment to moment.

The kids'-savings app's voice stays *kind / fun / encouraging* throughout, but its tone goes punchier on a win and gentler on a setback. The 2022 talk and the 2024 talk converge here: **develop the voice first, then vary the tone.**

**Tone is a channel switcher, not a volume knob** (Metts & Welfle ch. 7). Marketing style guides map content types to *how much* brand voice to pour in; that hierarchy doesn't fit product UI, where the user's situation — not the content type — drives the change. Switch channels per moment instead of dialing brand infusion up and down. And tone is present even when neutral: "When you write in a short, neutral, terse style, that's a tone decision. Choosing not to emphasize the emotional aspects of an interface is also a tone choice" — fine for 70–80% of interface writing, but it should be chosen, not defaulted. The stakes, per researcher Melanie Polkosky: tone is "the thing that kills most interfaces" — the same social skills that tell you within seconds whether someone is a jerk or respectful "govern our perception of technology, as well as humans."

## Define your voice

The sticky-note exercise (one idea per note, don't filter):
1. **Imagine the app as a person** — who are they? Write every adjective that fits.
2. **Group into themes** — alike words cluster (e.g. *smart / articulate / sharp* → "smart"). Off-theme words you like (e.g. *quick-witted*) can still inform word choice later.
3. **Land on ~3–4 attributes** — these become the definition of your voice.

> The voice attributes you land on **are the names of your tone dials** — this is the hinge into the next section.

*Defer:* choosing the actual word on a button/feature/value is naming, not voice → [`naming-features-and-labels`](naming-features-and-labels.md). Here you're defining the felt character of the prose, not the noun.

## Document the voice — and know where it recedes

- **Brand voice ≠ product voice.** Derive the product voice from the brand; don't paste marketing's register into the UI.
- **This-but-not-that.** Two sources converge on the format. Mailchimp via Metts & Welfle: "Fun but not childish … Weird but not inappropriate" — the first word sets a baseline, the second (the first word taken to the extreme) sets a hard outer limit. Walter's design-persona document (ch. 3) uses the same move for Freddie: "Brand traits: Fun, but not childish. Funny, but not goofy. Powerful, but not complicated. Hip, but not alienating. Easy, but not simplistic. Trustworthy, but not stodgy. Informal, but not sloppy." Define every attribute with its failure mode attached. (Full lists → references.)
- **Declarative statements** are the other documentation format (Mailchimp's 2018 rebrand) — flat assertions of what the voice is.
- **Tie voice to strategy — Pickard's priority stack** (Slack): "'Clear' makes work simpler. 'Concise' makes work productive. And 'human' makes work pleasant." Each principle earns its place by connecting to the mission, and the order resolves conflicts.
- **Voice recedes in urgent flows.** Geico's app is gecko-friendly throughout — until accident reporting and roadside assistance, where "the friendly phrases and exclamation marks drop away" and the app acts like an emergency dispatcher.
- **Plan the surface taper** (Walter ch. 3; Dave Gorum of Carbonmade): "We lay it on pretty thick in our marketing site, dial it back a bit in our admin tools, and remove it all together on the product." Decide personality density per surface, deliberately.

## Dial the tone for the moment

Apple's four qualities sit in gentle tension (more friendliness costs some simplicity, and vice versa) — that tension is the control surface. Four steps:
1. Pick four qualities that describe your voice.
2. Place them on a spectrum.
3. Decide the balance the **situation** needs.
4. Write to that balance.

**The rule: never turn a dial all the way down — adjust the balance.** (And some qualities, like *smart*, are always on; you don't dial them.)

| Situation | Dial up | Dial down (not off) |
|---|---|---|
| Celebration (hit a goal) | friendliness | simplicity, helpfulness |
| Health / security alert | clarity | friendliness |
| Connectivity / blocking error | helpfulness + clarity | friendliness |
| New-feature intro | friendliness + helpfulness | simplicity |

**Scale it with tone profiles** (Metts & Welfle ch. 7) when intuition stops covering the product: **audit** the workflows → **inventory** the messages (capture examples; even one- or two-word labels make tone choices) → **flag** anything that fails the four questions (*Is this message contextual? empathetic? inclusive? ready for translation?*) → **group** by scenario and write a profile per group — using the Facebook Content Strategy questions (what is someone likely *doing* when they hit this message? their likely *mindset*? our *intention* in the UI? how *receptive* are they?) plus the user-side factors per profile (emotion, receptiveness, stress) → give each profile **tactical rules** ("lead with the value of performing this action," "be respectful of the user's time"). "Tone profiles give you and your team a framework that you can use to evaluate tone decisions." Revisit the framework quarterly — gaps, dead profiles. Drafting drill (one password-reset message in four tones, read back, eliminate what sounds ridiculous) → references.

*Defer:* failure-state tone has its own ruleset (no "Oops!", reassure what's safe, don't blame, give a way out) → [`error-messages`](error-messages.md). This skill sets where the serious/clinical dial sits in general; that skill owns what to say when something breaks.

## Write the screen — PACE

The 2022 framework is the screen-level craft that carries the voice:

- **Purpose** — name the single most important thing on the screen; use information hierarchy; **know what to leave out**; give every screen (and the whole flow) a purpose.
- **Anticipate** — treat the app as a conversation; develop voice first, vary tone; keep a list of common terms; always answer *"what comes next?"*
- **Context** — write for where/how the person is (driving, at an airport, mid-task); use alerts only for a real confirm/choice; make button labels specific and self-explanatory (not Yes/No, not Confirm/Cancel); write useful empty states.
- **Empathy** — write for everyone in plain language; avoid idioms/humor that won't translate; respect localization (length, vertical space, RTL); make VoiceOver/accessibility text carry *intention and context*, not just appearance, and avoid unnecessary gender.

*Defer:* sentence-level prose mechanics (rhythm, paragraphing, cutting clutter in long copy) → `write-clear-prose`.

## Simplify — four small edits with big impact (2025)

"UX writing is all about economy of language." Fast passes over existing copy:
1. **Remove fillers** — adverbs like *easily/quickly/simply* (test: does each word add value?), interjections (*oops/hooray*), empty pleasantries (*we're sorry* in an alert "sounds insincere"), decorative punctuation. Keep a modifier only when it clarifies behavior ("feed your pets **automatically**").
2. **Avoid repetition** — don't restate the headline in the body; combine. ("Uh oh. We're running late…" collapsed to **"Delivery delayed 10 minutes. Check the app for your driver's location."**)
3. **Lead with the why** — "To get reservation updates, enter your phone number," not the reverse. Especially for errors, notifications, and tips.
4. **Keep a word list** — words you use / words you avoid / definitions ("alias," not Handle/User Name); button labels belong on it; seed from the Apple Style Guide. "Consistency helps provide clarity." Metts & Welfle's case for it: **one term per action** — label an action "Delete" in one place and "Erase" in another and "the user will have to pause whatever they are doing and think about it." Choosing the one word (with rationale) is naming → [`naming-features-and-labels`](naming-features-and-labels.md).

Two boundaries on the simplify pass (Metts & Welfle ch. 3):
- **When words can't fix it, the module is wrong.** From Welfle's impasse over an overloaded notification string: "We either need to be concise, or we need to simplify the functionality." Escalate to design/product rather than writing around complexity.
- **Strategy before writing.** Kristina Halvorson: "strategy tells you what to do . . . and, by default, what not to do" — align on a directional statement first; it's the cheapest copy-review filter you'll ever get.

## Localization-ready writing (2017 global-audience layer)

Extends PACE's Empathy point — write so the copy survives translation, partial or full:

- **When near-synonyms exist, pick the term that travels.** Picture vs photo are interchangeable in English, but across languages "Photo is the clear winner for multilingual clarity" — check key terms against your target languages before they ossify into the word list.
- **If you can't translate everything, prioritize**: headings/titles (orientation), the important information in instructions, commonly used terms — and "make sure that users can read error messages just in case something goes wrong."
- **Slang and figures of speech aren't banned** — they add character — but offense-check them and "offer contextual clues" so someone who doesn't parse the idiom can still figure out the meaning. (Stricter than PACE's avoid-idioms default: allowed, with a safety net.)
- Plan: have translations for key terms *before* you need them; batch second-market artwork in one pass; check iTunes Connect/App Store analytics — your audience map may surprise you.
- Cheap research paths: informal focus groups recruited by language/cultural background, language-learning and travel references, libraries. Visual/cultural symbol choices (gestures, iconography, associations) → `apple-design` (apple-visual-accessibility).

## Keep it useful (the guardrail both talks share)

Personality serves the experience, never the reverse — look for the **special moments** where it can shine, and don't trade away usefulness for it. Then **read it aloud** and ask: *does this sound like the best version of this app?* Avoid jargon; write inclusively.

**Delight-layer ground rules** (Walter ch. 4 — Freddie the mascot, designed as the anti-Clippy): the personality layer never carries function. "He's not there to help. He's simply a layer of fun that enhances a usable workflow, and above all, he has to stay out of the way" — no feedback, no stats, no error delivery through the fun layer. And "Blocking a busy user's workflow is always a bad idea."

**Defend a defined voice with an opt-out plus measurement** (Walter ch. 7): when stakeholders fear the personality will alienate users, ship a toggle and count — Mailchimp's "party pooper mode" settled the argument: "only 0.007% of users actually turn on party pooper mode."

**Inclusive-language rules** (Metts & Welfle ch. 5): use the singular "they" — "It's okay to use the singular 'they.' And, in fact, it's preferred"; avoid language that assigns value (positive or negative) to traits, especially around disability; describe what the product helps people *do*, not which kinds of people it's "for." Deeper reference: the Conscious Style Guide — recommended by both Metts & Welfle and Kalbag's *Accessibility for Everyone*.

From Andy Welfle's "Writing is designing" (Config 2025):
- **The take-the-words-away test** (via Mig Reyes): strip all text from a screen — the brand survives, usability dies. The fastest demonstration that words are design.
- **The button-copy question set** — "what should this button say?" is never answerable alone: where did the user enter from? what happens immediately after? is a button even the right component? what's the inverse action? will it truncate in Norwegian? does it match voice and tone?
- **Voice run amok kills usability**: Caviar's "Eat a salad cuz sure" — brand personality applied where a person just needs to order food. The triad to balance: *usable* (helps do), *useful* (does what's wanted), *responsible* (serves stress cases — "content designers are the connective tissue").
- **Research the language itself**: harvest users' own words from interviews for terms and actions; run card sorts for taxonomy and mental models; usability-test for language gaps. Vocabulary should come from users, not the org chart (cautionary tale: a transit kiosk's "Accept an e-cash upgrade" meaning "add $20").

## Checklist

- [ ] Voice defined as ~3–4 attributes, consistent across screens?
- [ ] Tone dialed to the moment — and **no dial fully off**?
- [ ] Each screen has one clear purpose; everything else cut or moved?
- [ ] Buttons specific and understandable on their own (no Yes/No, no Confirm/Cancel)?
- [ ] Alerts reserved for a real choice; destructive action clearly marked?
- [ ] Empty states educate or guide (not just decorate)?
- [ ] Personality density decided per surface (marketing → admin → product taper), and voice receding in urgent flows?
- [ ] One term per action everywhere (no Delete/Erase splits)?
- [ ] Plain language; no untranslatable idioms; localization-safe?
- [ ] Accessibility text conveys intention + context; no unnecessary gender?
- [ ] Read aloud — sounds conversational and like *us*?

## Relationship to other skills

This skill owns the app's **overall voice and tone** and the general microcopy that carries them. It sits beneath `design-principles` and serves *Delight* (the feeling you want) and *Familiarity* (sounding like one coherent, trustworthy product). Compose with the skills below; defer the specialized units to them.

- **[`naming-features-and-labels`](naming-features-and-labels.md)** — names the individual *thing* (feature, label, value, button, plan). Voice is the felt character of prose; a name is one chosen word judged on belongs / sets-expectation / travels. Define the voice here; pick and defend the word there. The exercises rhyme (adjective-clustering vs. Think/Feel/Do) but produce different outputs — run the right one.
- **[`error-messages`](error-messages.md)** — owns failure-state copy and its tone rules. This skill sets the general serious/clinical dial; route any "write/review an error" task there.
- **`write-clear-prose`** — long-form nonfiction craft (sentence rhythm, structure, cutting clutter). UI microcopy is a different unit; share the read-aloud instinct, route essays/articles there.
- **`apple-design` (ios-brand-identity)** — places brand in the iOS content layer and names this skill as the voice/tone arm. Decide *where* brand belongs there; define and write the voice here.
- **`user-onboarding`** / **[`linear-settings-copy`](linear-settings-copy.md)** — voice applied to specific surfaces (first-run, empty/welcome states; settings IA/rows). Set the voice here; structure and write the surface there.
- **`apple-design` (app-intents-design)** — Siri dialog and snippets are voice-only microcopy with their own constraints (full dialog for AirPods, ≤5 disambiguation options); set the voice here, apply the intent patterns there.
- **`notification-design`** — owns notification *strategy and anatomy* (when to send, grouping, rich content); this skill writes the notification's words in the right tone.

See [ui-voice-and-tone/voice-and-tone-examples.md](ui-voice-and-tone/voice-and-tone-examples.md) for the worked voice-definition exercise, the welcome-screen before→best ladders, the tone-dial notification set, the PACE before/afters, the full this-but-not-that lists (Mailchimp + Walter's design persona), the four-tone password-reset drill, and the tone-profile worksheet.
