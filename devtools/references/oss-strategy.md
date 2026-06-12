# Open Source Strategy

*Scope: Make an open source project adopted, sustainable, and profitable — Sitnik's popularity formula, progressive-JPEG README, the promotion loop, maintainer survival, honest monetization. Use when launching or promoting an OSS library, writing a README, fighting burnout, or monetizing. Triggers: open source, README, GitHub stars, promote my library, maintainer burnout, open core.*

**Sources:** [oss-strategy/sources.md](oss-strategy/sources.md) — 3 Evil Martians posts + Steve Ruiz (Dive Club).

The motivation gate first: don't do OSS for fame (talks and articles have better ROI) or your resume (contribute to big projects instead — "it's so much easier than building a project"). "The best reason to make open source is if you want to change the world." And the realism: of Sitnik's ~56 projects, **4 are popular** — "the proper mindset going into each project may be expecting failure."

## The popularity formula

> **Your popularity + promotion + benefits for users + luck = project popularity.**

Corollaries: "a good idea does not necessarily equate with popularity"; popular projects come from popular developers, "not necessarily by *better* developers"; people choose tools irrationally ("most projects are simply started by frameworks with more stars"). Promotion is real work: "popularity is the result of direct efforts. The amount of resources for promotion is comparable to writing the code itself." (Webpack adopting PostCSS "was not by chance, I suggested PostCSS to its authors.")

## The README discipline (progressive JPEG)

"People will stop scanning at any point if they can't find a benefit" — structure docs so every truncation point still sold something:
1. **Benefits first, first block.** Description + why it's useful + how it differs. "The most important part is the first paragraph because, well, people only have time to read the first one." (PostCSS spent ~a week on its first block.)
2. **The bar test:** explain it as you would to coworkers at a bar, "in real, human terms" — then "cut it 2–4 more times." (Counter-example: "Svelte is cybernetically enhanced web apps ❌ Not clear!")
3. Lists, bold text, code examples, images.
4. **"Use real stats. Like, real stats"** — actual benchmarks (Nano ID: 141 bytes, 16% faster than UUID), not "concepts of stats."
5. Only then the step-by-step guide — tested by following it yourself from scratch.

## Promotion: the loop, not the launch

The failure mode: "1. They make a single social media post 2. They get nothing. 3. They get depressed. 4. They stop working." Instead: content/action → feedback → fix → content about the fixes → repeat. Every post explains the project from scratch (it's someone's first sighting) with a code example or image. **Promote via PRs to other projects** ("this is how PostCSS was promoted!") and credit mergers in your README. "Post regularly. But never spam. There is a difference."

## Sustaining it (maintainer survival)

- **Break the circle of guilt** (issues pile up → self-blame → avoidance → more issues): cap issue time (~15 min/day); "simply ask, 'can you send a PR?'"; acknowledging is itself a solution — "the main frustration for users… isn't a lack of immediate fixes, it's the feeling of being ignored." Engage critics with questions ("sometimes haters… just want to vent their pain").
- **Fix systemically:** "when I close an issue caused by user error, I always try to add a warning, an input check, or a documentation clarification." Priority: types → runtime checks → docs last ("many users don't read the docs"). Let the *reporter* fix the docs — "you, as the person who completely knows the tool… don't know how to learn your tool."
- **Plugins need batteries:** "if you have plugins, provide a full working solution out of the box for most users" — convention over configuration; "people don't like to make choices."
- **Tick-tack deprecation** (from Rails): deprecate in one major, remove in the next; migration guides; ecosystem-migration status pages; pre-release feedback channels.
- **Boilerplate shapes the ecosystem:** "examples in docs are not just illustrations, but something that forms habits in the community."
- **Befriend competitors** — collaboration (shared naming, benchmarks) and even promotion of alternatives; "any new 'competitor' could just free you from spending your own time on supporting people for free." Don't fear being late: Autoprefixer and PostCSS outlived every announced killer — "it's better to create a quick prototype and see the real result." And: architecture beats language ("PostCSS, written in JS, was 4 times faster than Sass, written in C++ … because of better architecture and memory management").

## The design-answer pattern (Steve Ruiz, tldraw — Dive Club 3SvL0r-Lhh8)

- **Open-source a design answer, not just a utility.** Perfect Arrows (draw a good arrow between any two boxes) got popular precisely because "there was no answer. It's kind of like a design answer, you know, but expressed through code" — an educated take on all the parameters of a problem, "my best shot at making it look good in all of the circumstances." Taste, packaged as a library, is a differentiated OSS category — "kind of unusual and kind of new for a developer to be trying to tackle."
- **Build-with-it marketing.** "The best way to market a tool like this is you just build with it. You build interesting things with it and you kind of develop it a little bit in public." (Pairs with the promotion loop above — the content is the artifacts.)
- **Leave visible unanswered questions.** "Unanswered questions are kind of like things that are obviously not done or maybe even not doneable — are most interesting to builders": the audience wants to follow along and wonder how *they* would do it. Polished completeness is less magnetic than legible open problems.

## Monetizing (the four models, honestly ranked)

1. **Donations/grants** — won't sustain you (PostCSS, used by Meta and Google, "collects only about $12K per year").
2. **Consulting/support** — "lower margins and harder to scale," but hands-on exposure to real pain points (and a lead channel: AnyCable generated ~$1M in parent-company consulting).
3. **SaaS** — the standard: "customers pay you to run, scale, and manage the software — so they don't have to."
4. **Open core / commercial license** — "think about the customers who would get so much value… they would be willing to pay — and then build features specifically for them" (whale-sized problems individuals don't have).

Practice: validate the pain recurs before open-sourcing; ~10 hrs/week minimum; "force yourself to have real human conversations with potential customers… your gut will make you avoid it"; define your measure of success up front (stars? revenue? leads?); "start monetizing immediately (create a simple landing page)."

## Checklist

- [ ] Motivation honest (change-the-world, not fame/resume); failure expected, marathon mindset?
- [ ] README first paragraph passes the bar test and carries benefit + difference; real stats?
- [ ] Promotion running as a loop (incl. PRs outward), not a single launch post?
- [ ] Issues time-boxed; systemic fixes; reporters asked for PRs; deprecations tick-tack with guides?
- [ ] Out-of-the-box defaults; docs examples teach the habits you want?
- [ ] Monetization model matched to reality; success metric defined; landing page exists from day one?

> **Staleness note:** channels (specific social platforms), market stats, and tool comparisons date; the formula, README discipline, promotion loop, maintainer toolkit, and the four-model ranking are the durable layer.

## Relationship to other skills

- **[developer-tool-gtm.md](developer-tool-gtm.md)** — commercial devtool pages and PMF; "open source users are users, too" bridges them. README discipline here; landing-page anatomy there.
- **`write-clear-prose`** — sentence mechanics for the README's prose; the structure/benefit ordering lives here.
- **`user-onboarding`** — "benefits for users" is its sell-the-better-user in OSS form; first-run flows for products live there.
- **`rails` (layered-rails)** / **`rails` (dhh-style)** — the plugins-need-batteries lesson is convention-over-configuration, the principle both Rails schools share.
- **`working-with-ai` (agentic-coding)** — open-sourcing your project skills ("every project makes the harness smarter") is this skill's promotion loop applied to agent rules.
