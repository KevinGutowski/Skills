---
name: developer-tool-gtm
description: "Earn developer adoption and revenue for a developer tool — landing-page anatomy, the five conversion killers, devtool copywriting, the PMF Compass (TTFV/retention/NRR). Use when writing or reviewing a devtool landing page or copy, diagnosing weak conversion or adoption, or assessing product-market fit. Based on five Evil Martians Chronicles posts. Triggers: devtool landing page, developer marketing, CTA, free-to-paid conversion, NRR, PMF."
---

# Developer-Tool Go-To-Market

**Sources** — this skill aggregates five Evil Martians Chronicles posts:
- *"We studied 100 dev tool landing pages — here's what really works" (Lovchikov & Turner, 2025; open template: launchkit.evilmartians.io). https://evilmartians.com/chronicles/we-studied-100-devtool-landing-pages-here-is-what-actually-works-in-2025*
- *"How to kill conversions on your developer tool's landing page" (Melnikova & Turner, 2025). https://evilmartians.com/chronicles/how-to-kill-conversions-on-your-developer-tool-landing-page*
- *"Hey developer tool teams, don't copy these copywriting clichés!" (Rusakova & Turner, 2025). https://evilmartians.com/chronicles/hey-developer-tool-teams-dont-copy-these-copywriting-cliches*
- *"6 things developer tools must have to earn trust and adoption" (Valyaev & Turner, 2026). https://evilmartians.com/chronicles/six-things-developer-tools-must-have-to-earn-trust-and-adoption*
- *"Product-market fit methodology for early-stage devtool companies" (Nazarova, 2026 — the PMF Compass). https://evilmartians.com/chronicles/product-market-fit-methodology-devtools*
- *Ryo Lu (Head of Design, Cursor) — live YC-startup website roast, 2025.*
- *Jared Erondu — Valio Con 2013/2014 talk (Drew Wilson's conference): story mechanics for product pages.*

The audience truth behind everything: developers are skeptical, scan rather than read, distrust marketing, and evaluate before talking to sales. The summary rule: **"Everything comes down to respecting developers' time and intelligence."** The pipeline: product quality earns trust → page + copy convert attention → PMF metrics tell you whether the problem is product or distribution.

## Landing-page anatomy (the 100-page study)

Two meta-rules: "No salesy BS" and "Clever and simple wins" — solid typography, clear layout, breathing room, centered max-width. The canonical structure:
- **Hero:** centered composition, big headline, product shot below. Six visual options keyed to maturity: animated UI / static UI / switchable UIs (when messaging isn't narrowed yet) / live embed ("a power move… only realistic for narrow-scope tools") / code snippet (libraries, infra) / abstract-or-none (pre-UI, stealth tests). Two CTAs — primary specific ("avoid generic 'Get started'… use 'Start building', 'Download now'"), secondary visually subordinate. Eyebrows/banners for momentum.
- **Trust block:** right after the hero — customer logos, or big numbers for individual-oriented tools (stars, downloads, awards). "Open source users are users, too." No big names yet → one testimonial + photo.
- **Features:** "highlight real user problems and the way the product solves them instead of talking about features." Storytelling ranked weakest→strongest: function list ("here's what we have, figure it out… doesn't sell well") → task-oriented → **problem-oriented story** ("users feel like the tool 'gets' them… much more effective for early-stage") → bold statements (established products only) → mission statement ("rare, but powerful… that's not easy to fake"). Add "How it works" when there's magic (AI, sync).
- **Social proof:** "nearly all use curated testimonials (and not auto-pulled tweets)… manually chosen." One honest sentence beats none; quotes placed next to the feature they praise read contextual, not bolted on.
- **Supporting:** "you probably only need an FAQ." Comparison tables only in crowded execution-competition markets; pricing usually on its own page.
- **Final CTA:** full-width, one button, one goal — "a safety net." (Few-leads startups: an embedded booking calendar beats another Sign up.)

Maintenance cost is a hero-choice criterion too (Paul Stamatiou's Stocketa site v1→v2 retro, 2023 — https://paulstamatiou.com/stocketa/): his scroll-driven 3D phone-frame sequence (Apple-product-page style) demoed well but "it was just there for show; it wasn't the best way to show off parts of the app," and every content update meant regenerating and re-optimizing the whole frame sequence. V2 swapped it for a fixed device frame beside a skimmable feature list — updatable with plain simulator screenshots. Pick a hero you can refresh as fast as the product changes. (Same retro: bento-box feature grids "become very common" — they now read as default rather than distinctive.)

## The five conversion killers

1. **Vague language** — "technical audiences need specificity and the lowest possible level of abstraction." Not "blazing fast" but "handles JPEG images at least 35% faster than leading alternatives"; not "leading companies trust us" but the named case with numbers.
2. **Invisible CTAs** — commercial-OSS trap: the main CTA points back to GitHub. CTA wording is testable ("Hire Martians" lifted clicks 1.3%→2.0% over "Build with us").
3. **First-screen distractions** — "the very elements we added to appear more credible were actually hurting our credibility." Strip to what developers need; "the best way to impress developers is to respect their time enough to not waste it."
4. **Multi-step enterprise gating** — direct scheduling beat request-demo forms ~20× in their data; "technical buyers want to evaluate the solution themselves before talking to sales."
5. **Build once and walk away** — "treating your landing page like a monument rather than an experiment." Set metrics before changes, review on schedule, test with real target users, accept that "sometimes your clever ideas will fail spectacularly."

## Copy discipline

Draft by pretending you're telling a fellow developer about their exact pain — what hurts, why this helps, why it fits better — in "the same simple, friendly and professional language you'd expect talking with another developer." Then: **numbers over adjectives** ("avoid using the word 'better'… Show it!"); scannability (≈3 sentences per paragraph, one paragraph per section); consistency papercuts ("Github" vs "GitHub" — "death by a thousand website-copy papercuts"); and the cliché blocklist — *built by developers for developers, blazing-fast, community-driven, …-first, next-gen, future-proof, best-in-class, seamless developer experience, get started in minutes* — "not necessarily bad… just overused… they fail to highlight your differentiators."

**Conversion humility from the field** (Grace Walker, Spellbook — Config 2025): "a beautiful page is not enough… our best performing landing pages were not all that beautiful… but they had pointed messaging" — and "marketing collateral that is harmonious and unified is often ignorable." Protocol for rebrands: **copy the old high-converting pages verbatim into the new site and sunset each only after a new-brand page beats it in an A/B test** — never cut over conversion surfaces on launch day. Calibration: six new-brand variants all lost to the ugly incumbent; the first win took ~3 months. Operating maxim: "**almost nothing works** — persistence is often just as important as a good idea." And remember the attention funnel: most visitors never get past the hero. Growth-design mechanics that generalize beyond devtools (Becca Ramos, Config 2025): a **sticky CTA** that drops in once the user scrolls past the hero doubled signups on a high-bounce SEO page; **heatmap leak diagnosis** — >10% of pricing-page clicks were escaping to a secondary off-page CTA → kill the leak, bring the info on-page; **a neutral A/B result is a license, not a loss** (a hero animation tested neutral → kept it and "suddenly had validation to continue using it in other places"); benefits-led headlines don't universally beat product-forward lists — "what works for some audiences doesn't universally work for all," test per audience; and scale method to team size (solo: mine existing data + scrappy Zoom tests; small: heatmap + basic tracking "is more than enough"; large: start from researchers' existing learnings, hand off pages with variants pre-built).

## Story mechanics (Jared Erondu, Valio Con)

The structural version of the problem-oriented-story rule, and why feature lists fail: **"features don't convert if they don't connect."** Three steps — **theme** (the core message: who are you, why do you do it, why would I use it) → **characters** (the features — the step teams already have down, "because this is the stuff that we actually do") → **"craft the connection"**, "the part that we just" plain forget: tying theme and characters into one story. His proof case: Dropbox's original get-dropbox.com video opened on the *problem* ("you're about to buy lunch and realize your wallet is in your other pants… you need one place for everything, like a magic pocket") — complexity sold as a story people relate to, not a feature dump. Two guardrails: design paradigms "should be used as templates" and not as escapes — think about the actual content filling the lines, don't drag a pattern over an empty page; and never self-describe by other products (his parody: "we're kind of like an Airbnb for Uber for Facebook for Instagram cats with a synergistic social graph disruption" — Ryo Lu's "one name / own it" rule, a decade earlier).

## The live-critique checklist (Ryo Lu roasting YC startup sites, 2025)

- **The visitor question order**: "What is this? Is it for me? Does it work? Is it credible?" — answer them in that order. Per scroll: "There's always like a priority. Your main message, what the hell is it? The CTAs, and then it's like the proofs." And "kill all the distractions" — one main CTA per scroll, not Discord + GitHub + docs + signup all at once.
- **People only read headlines**: "assume people are not going to read the sub headline" — they reach it only if the headline intrigues. If the sub-headline is the only sentence that explains the product, promote it to *the* headline.
- **Speak the user's language**: companies "love talking in their own words… concepts that they came up that nobody else understands." Nobody searches "progressive discovery"; users say "I have so many MCPs, I don't know how to manage them." Show old world → new world → "What are the problems? How do you solve the problems?"
- **One name**: two brand names pre-launch — "kill your naming confusion, just pick one." And don't define yourself by competitors ("Cursor for email… best of Superhuman" — "calling out all these other products… rather than just clearly explaining what they do and owning it themselves").
- **Don't lead with backers**: a YC badge and investor wall aren't the proof a visitor needs first — "don't scare them with like money too too quickly." Instead let people play before the signup wall ("even in real OS you can send three free messages before you sign in. Like just let people play") and make "the initial demo more constrained so that it gives you a better output."
- **Above-the-fold perfection**: "the first impression really matters. And anything above the fold just make them as good as you can" — no broken logo hovers, no marquee that snaps at loop end (it "should just be a continuous stream"), no misclipped video.
- **The vibe-coded tell**: "If you look at all the little details, they don't melt together" — mixed shadows, radius on top but not bottom, inconsistent icon sizes, style drift from marketing page to app. Polish reads as a proxy for product quality.

## Product qualities that earn adoption (the six)

Developers drop tools over usability, time cost, security, and pricing — "'no AI' is almost never the deal-breaker." (1) **Speed:** latency compounds over long sessions; ~100ms visible feedback, 200ms upper comfort; "perceived speed is determined by the slow tail (p95/p99), not the average"; slow jobs: admit it — stream partials, honest progress, cheap cancel. (2) **Discoverability:** the findability loop "recall → compose → retrieve → decide → act → learn"; command palettes as the progressive-disclosure mechanism; "UI on top, CLI underneath." (3) **Consistency = predictability** (muscle memory; tokens + visible stable focus). (4) **Multitasking:** "'More settings' ≠ 'better usability'" — strong opinionated defaults first, customization as a layer; daily-hub tools earn workspaces. (5) **Resilience:** "capture state continuously → expose a timeline → recover in one move"; investigations survive reloads and are shareable, "not reconstructed from screenshots and Slack threads." (6) **AI governance:** AI must be "opt-in, reversible, and explainable" — the strongest pattern is **propose → preview diff → apply/revert**.

## The PMF Compass

"PMF is not a Boolean, it's a spectrum" (seven levels, $0 → $200M+ ARR). Score two things separately: **signal quality** (weighted: time-to-first-value, retention, NRR ×3; free-to-paid conversion, organic signups ×2) and **revenue stage** — because **"product signal and revenue signal are separate — and the gap between them is informative":** strong product + weak revenue = a go-to-market problem; revenue outpacing product = "a shaky foundation." "Your weakest product metrics tell you where to look first." Devtool benchmarks (2026 snapshot; AI is compressing TTFV): tooling TTFV <5min exceptional; PLG D7 retention >35% exceptional / <15% needs work; NRR >130% exceptional (usage-based runs 120–140%); free→paid >7% top-tier vs 2–4% SaaS median; "by strong PMF, 50–70% of your signups should be organic. Paid acquisition is a scale lever, not the engine." Quick read: "if users return within a week, convert to paid without sales pressure, and expand their usage over time — and you're past $500K ARR — you're at or beyond early PMF." Self-serve is existential: "if you can't deliver value in 5 minutes, developers leave."

## Checklist

- [ ] Page follows the anatomy; hero visual matches product maturity; CTAs specific and unrivaled?
- [ ] Every claim specific and numbered; cliché blocklist clean; scannable; capitalization consistent?
- [ ] No forms where a calendar or trial would do; first screen stripped to essentials?
- [ ] The six product qualities audited — especially TTFV and the slow tail?
- [ ] PMF dual-score read: is the bottleneck product (signal) or distribution (revenue)? Weakest metric targeted first?
- [ ] Page treated as a running experiment with pre-set metrics?

> **Staleness note:** benchmark numbers, company examples, conversion data points, and design trends (bento grids) are dated snapshots — the anatomy, storytelling ranking, conversion killers, cliché list, six qualities, and gap-diagnosis logic are the durable layer.

## Relationship to other skills

- **`user-onboarding`** — supplies the philosophy (sell the better user; Fire Flower); this skill is the devtool-audience refinement ("specificity and the lowest possible level of abstraction") plus the empirics. TTFV is the metric form of its time-to-value concern.
- **`devtool-interface-design`** — makes the tool worth adopting (including the a-ha onboarding and AX discovery rules that feed this skill's organic-signups engine); this skill gets it adopted.
- **`write-clear-prose`** — sentence-level mechanics; the devtool copy layer (clichés, numbers, scannability) lives here.
- **`naming-features-and-labels`** — names features; CTA wording (conversion-tested) lives here.
- **`oss-strategy`** — READMEs and OSS popularity; "open source users are users, too" is the bridge.
- **`shape-up`** — the gap diagnosis ("GTM problem vs product problem") is an input to what to bet on next.
