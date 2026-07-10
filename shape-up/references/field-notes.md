# Field Notes — Org Shape, Decisiveness, Killing Products

Verbatim quote texture behind three compressed sections in `SKILL.md`: team shape (Nan Yu), decisiveness-predicts-quality (Linear "Conversations on Quality"), and killing products (Subham Agarwal). The decision rules live in the body; this file preserves the sources' own words.

## Contents

- Team shape — "ship the org chart you want" (Nan Yu, Linear — Config 2024)
- Decisiveness predicts quality (Linear "Conversations on Quality" series, 2024)
- Killing products — the sunset side of betting (Subham Agarwal, Config 2025)

## Team shape — "ship the org chart you want" (Nan Yu, Linear — Config 2024)

*Source: "The heirloom tomato org chart," Config 2024. Org design as product design — the layer above betting/appetite.*

- **Conway's law as a design tool**: "You will ship your org chart… so make an org chart that you actually want to ship." Five-to-eight symmetric squads ship "five to eight vaguely related products." A perfectly symmetric chart should make you suspicious — "where's the main thing?" ("Having pretty-looking charts is not your KPI" — the heirloom vs sphere tomato: "one is designed to taste good, the other to be a sphere.")
- **Over-provision the main thing**: Linear's core product = >50% of staff — that surplus is their stated answer to "how do you maintain such a high quality bar" (teams can go "almost all the way to full debt-payback mode" while a few people carry the changelog).
- **The scoping question**: "What is the *largest* scope you can give to a team and have them make reasonable tradeoffs?" Start near whole-product; slice narrow teams off one at a time only on demonstrated need (legit slice lines: skill-set boundaries like iOS/Android); set explicit **disband conditions** — "team, you've fulfilled your purpose, you don't need to exist anymore."
- **Zero-default rule**: "the default number of people that works on stuff that's not important should be zero" — table-stakes work should cost other teams a conscious tradeoff, never become a junior-dev dumping ground. Narrow scopes breed kingdom-building ("put ambitious people in a little box — we're going to overbuild it… and secretly make the box bigger").
- **Interrogate borrowed numbers**: the 5–8-person team meme traces to the 2012 Spotify paper, two-pizza teams, and Andy Grove's *High Output Management* (1983 — a no-Slack world); Jensen Huang runs 40–60 directs. "You can't take a nugget of wisdom a million miles removed from its source and assume it works for you." And don't patch a broken structure with OKRs — that's "layering on even more complexity."
- **The big-bet acceptance bar** (Duolingo, Config 2025): run a portfolio per pillar — many incremental A/B tests on known levers plus a few big bets a year, where "new bets don't actually have to improve metrics. They should just at least be neutral" — neutrality buys strategic repositioning without demanding immediate wins.

## Decisiveness predicts quality (Linear "Conversations on Quality" series, 2024)

Stated independently by five guests: how fast a team decides — and *un-decides* — predicts its quality bar.
- **The two-week reframe** (Dick Costolo): when 1%-experiment launches bloated to 14 weeks, ask not "how do we get to 12" but "**what would have to be true for it to be two weeks?**" — forces enumerating the currently-true assumptions to delete.
- **Rolling 80/20** (Henry Modisett, Perplexity): "we 80/20 everything, but we do that every week, and the thing we 80/20'd last week we circle back on… **if you invest in velocity you can actually make more things good more of the time**." Mutable-software amnesty: "users won't remember the thing that was worse — the new users only know the new good thing." Pair with **clarity of ownership**: one named decider per surface.
- **Unshipping is a skill** (Tara Feener, Browser Company): the three-channel loop — product-ideas → product-updates (prototype already on for the whole company) → dogfooding — then "we very rapidly make a call: hey, this feels wrong — unship it." Maxim: "it's what you leave out." When a member asks for a literal feature, "assume you don't know" — interrogate the need, don't build the bug report verbatim.
- **Set the bar, then stop** (Adena Nadler, Browser Company): "we set a bar for what we're able to get away with… do everything required to meet that bar and try not to do more." Their fastest-deciding pods are their most successful. Commodity-product law: features make people *switch*, stability makes them *stay* — you can't pick one.
- **Bet-doc sculpting** (Ethan Eismann, Slack): a short "here's the bet" doc, engineer starts immediately, designer "almost playing catch-up," team molds it to GA — "it's not a step-by-step process, it's molding and sculpting."
- **Comms enables craft** (Basheer Tome, Fellow): "communication issues are, full stop, the number one thing" when projects go wrong — "clear comms is what enables the focus that you need to do craft"; knowing your priority is what lets you say no to the pings.

## Killing products — the sunset side of betting (Subham Agarwal, Config 2025)

The betting table decides what to build; this decides what to stop. Five legitimate death reasons: never took off · terrible unit economics · traction-but-strategy-mismatch (Netflix DVD) · technology obsolete (Zune) · **less is more** ("fewer, better maintained products often create a superior experience than a sprawling ecosystem").
- **RADAR**: **R**ead the signals (usage, support, sales feedback — "products rarely fall silently, there's almost always a pulse") → **A**ssess on a customer-value × business-value 2×2 → **D**ecide (pause / iterate / kill) → **A**ct → **R**eview.
- Decision maxim: "The moment you start optimizing important decisions on a long list of pros and cons, you're doomed. The best decisions come from identifying the most critical assumption and acting with confidence." Their question: "Are we holding on out of inertia or ambition? Could this be a 10x?"
- The four forces that block the call: **inertia** (nothing exists in isolation — map the dependency chain), **hope** ("one more feature will save us"), **fear** (public backlash), **love** ("this product is my baby" — and a customer's love isn't viability either). Their failure timeline: 18 months → iterate, +6 → maintenance mode, +6 → finally killed. Two years lost.
- Sunset comms — internal first: what's going away / why / celebrate what was right / share what was learned. External: tell them, tell them why, give them time, give them alternatives. "Someone will always be mad." (Mechanics for deprecating *components* live in `design-systems`.)
