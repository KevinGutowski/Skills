# Method Selection — Sharon in Depth

Source: Tomer Sharon, *Validating Product Ideas* (Rosenfeld Media, 2016), quotes verified against the text. Sharon's "lean user research" answers three big questions: "What do people need? … What do people want? … Can people use the thing?" Each chapter is a question with a prescribed method (see the table in SKILL.md).

## Experience sampling — "What do people need?"

Interrupt ~100 participants several times a day/week with **the same question** about a behavior, in real time. "The key to experience sampling is asking the same question over and over again at random times during the day or week."

Rules for the question — it must:
- **Ask about repeated behavior.** If the behavior is rare (moving house, buying a laptop, boarding a plane 1–2×/year), use interviews, observation, or a diary study instead.
- **Never ask opinions.** "Asking for someone's opinion about something several times a day or week is useless. Opinions don't change five times a day."
- **Never ask for averages.** "What frustrates you most about boarding a train?" forces an averaged, self-flattering answer. "The best way to avoid this trap is to ask about the last time the behavior happened."
- **Be specific, not general.** Not "What annoys you about driving in a city?" but "What was the most frustrating thing that happened to you the last time you were looking for a parking space?"
- **No yes/no, no purely quantitative questions.** A number "tells you nothing about unmet needs."

Math: target **500–1,000 valuable answers** ("Just about right… a range of answers you can work with"). Plan for loss: "about a third of the answers you want will be lost" (non-response, duplicates, gibberish) — so to net 1,000, collect 1,500 (e.g., 5×/day × 3 days × 100 participants). Match frequency to assumed behavior frequency (smartphone use ~150×/day → ask 5–8×/day; website updates 2×/week → ask 1×/week for 10 weeks). Collect into one spreadsheet; pre-define classification categories with the team; classify, bar-chart, then eyeball for themes.

Why it works: it explores "people's current behavior, which is the best predictor of future behavior." "The worst way to know if people would pay to use a product or if they would use it repeatedly is ask them directly."

## Diary study — "What is the user's workflow?"

For behavior that unfolds over days/weeks: 8 carefully recruited participants log entries (text/photo/video, even via messaging apps). **Structured** diaries give specific daily assignments; **unstructured** diaries let participants decide what's worth recording. Pilot first; prompt participants for the right data during the study; **end with interviews** to elicit depth behind the entries; then reframe diary data and construct the workflow. Sharon's sample plan: 7 days, ≤10 minutes/day of participant effort, with a Day-0 artifact (sketch your house, mark where the device lives) that becomes a longitudinal probe.

## Concierge MVP — "Do people want the product?"

Deliver the service manually — phone, email, SMS, in person — before writing code. "As a rule of thumb, five people should be enough for exploring a concierge MVP." SMS is favored: "the lowest fidelity way of prototyping since it strips away all user interface and interaction design."

Run it: keep interaction minimal; track key events per participant (first impression, first problem, complaints, reaction to payment request); proactively seek feedback but "pay extra attention and put more weight on how customers behave rather than what they think and say"; make changes (a "head-banger" — an obvious miss — justifies change after one occurrence).

Then **ask for payment**: "do not confuse asking for payment as described above with just asking 'Would you pay for this?' Asking this question is not a substitute or shortcut for asking for payment. … If you ask for payment, you gather behavioral data, while if you ask the 'would you' question, you are collecting attitudinal data that will mislead you since people have no idea what they would do in the future."

## Fake doors — also "Do people want it?"

Three designs: **landing/crowdfunding page** (commitment = pay/fund), **button to nowhere** (feature link in a live product → "coming soon"), **404 testing** (ads → error page — Sharon: "I wouldn't recommend… too nasty"). Be honest: thank people, apologize, consider a small gift.

**Decide thresholds in advance**: "When you decide in advance what the ratio (or dollar value) is that will make you want to develop the product or feature, you have a powerful research tool that drives decisions."

Landing-page warning: "the only question landing pages answer is 'Are people interested enough to give us their email address?' They learn nothing about what people want or need." Same for pitching ideas to top customers — "It doesn't cost them much to be nice and say it's a great idea."

## A/B testing — "Which design generates better results?"

- **Prioritize high-risk unknowns.** "Don't waste your time on issues with low risk (for example choosing between 41 shades of light blue…) … prioritize high-risk unknowns." Rule of thumb: whatever you've been 100% certain of since day one belongs at the top of the test list.
- **Never A/B test prices.** "Pricing is a sensitive subject… People might see the different prices and complain to and about you."
- Don't change many things at once — test linearly or run a proper multivariate test.
- **Run ≥7 days**: "Stop the test after at least seven days, preferably after 30 days" — weekday/weekend and month-boundary seasonality is real. Don't stop early on an apparent winner.
- **Statistical ties** break via sample size (more visitors) or confidence level (lower it — but you're "forcing" a winner; raise to 99% for high-risk decisions). Variability you can't control.
- **Local maximum warning**: "A/B testing… will always help you reach a local maximum, not the maximum." It can't tell you what a *different* design or feature should be — that's what need/user/problem research (experience sampling, interviews, observation, diaries) is for. And don't generalize wins into a style guide: a winning green button "worked for what you are testing. Not more, not less."
- Always chase "why," not just "what" — pair with qualitative follow-up.

## Tree testing, first-click, lostness — "How do people find stuff?"

Findability needs scale: ~500 participants. **Tree test** the naked IA (no visual design); metrics: success, direct success (optimal path), indirect success (backtracked), failure. **First-click test**: "Users who click down the right path on the first click complete their task successfully 87% of the time, while those who click down the wrong path on the first click tend to only complete their task successfully 46% of the time." Also track time to first click, confidence, perceived difficulty; compare designs side by side.

**Lostness** (L) ranges 0–1; "At lostness scores of about 0.4 and up, it is very clear a person is lost even if you sit next to him." Formula (presented as a figure in the book; variables per Sharon):

L = √[(N/S − 1)² + (R/N − 1)²]

where N = unique pages visited, S = total pages visited counting revisits, R = minimum pages required for the task. Lostness "can only be measured in a meaningful way if you know what users want to do" — measure in task-based tests, not from analytics logs.

## Surveys and metrics — handle with gloves

"A survey is probably the hardest research technique to do right, and I don't encourage you to do it. Running a proper survey is a science." (Hall concurs — see `research-fundamentals.md`.)

**Vanity metrics**: "The number of users, visitors, and downloads, as well as likes, followers… are all examples of vanity metrics. The thing with vanity metrics is that no matter what happens, they will always grow." Prefer **ratios** (conversion rate) tracked over time.

**5-qual / 500-quant**: qualitative usability testing needs ~5 participants per round; quantitative benchmarks and findability need ~500. Pick the mode from the question — diagnosing problems (5) vs measuring/comparison (500).
