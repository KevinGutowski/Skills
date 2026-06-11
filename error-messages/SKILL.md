---
name: error-messages
description: "Writes and reviews error messages and failure-state copy — any in-app text shown when something goes wrong. Use when writing error toasts, dialogs, form validation, 404/500 pages, retry prompts, or API/payment/auth failure copy, or reviewing error copy for tone, clarity, or blame. Based on Wix UX's 'Write better error messages'. Triggers: error message, error copy, validation message, something went wrong, failure state, retry prompt."
---

# Error Messages

Principles for writing error and failure-state copy that respects users in their hardest moments. Apply when writing or reviewing any in-app text shown when something doesn't work as expected. Layers: Wix UX rules (the words), Metts & Welfle's *Writing Is Designing* ch. 4 (Rosenfeld, 2020 — the Avoid → Explain → Resolve frame, stress cases, testing, the business case), Apple's alert doctrine, and Walter's *Designing for Emotion* ch. 6 (A Book Apart, 2011 — incident communication).

## Avoid → Explain → Resolve (the organizing frame)

Metts & Welfle: "The best error message is no error message at all." Three principles in order — one involves no writing:

1. **Avoid** — "Find ways to help your user without showing them an error." Fix upstream: prevent the state, accept what the user gave you. Kalbag's forms rule (*Accessibility for Everyone*): formatting input is the developer's job — "the burden should be on the developers to convert user input into the necessary format," never on the user.
2. **Explain** — "Tell your users what's going on and what went wrong" (→ Essentials 1–2 below).
3. **Resolve** — "Provide a solution to the problem that the user is facing" (→ Essentials 4–5 and the Non-negotiables' recovery actions).

A/E/R organizes the work; the Non-negotiables above stay binding on mechanics, and Apple's "not afterthoughts for preventable problems" doctrine below is the same Avoid step.

## Non-negotiables (check every message against these)

Found via blind A/B eval (2026-06-11): outputs following this skill matched bare-model tone but lost on *mechanics* — these four rules are where error copy is won or lost. They override everything below when in tension.

1. **No dead-end buttons.** Never close an error with "OK" or "Got it" alone — every button is labeled for an action ("Retry payment", "Reconnect bank") and at least one button moves the user toward recovery. If the only honest action is acknowledgment, pair it with a path ("View affected transactions").
2. **Take them to the work.** When the error created a backlog or partial state, the primary action opens it — "View uncategorized", not a dismissal.
3. **Give the 5xx page a reference ID** the user can quote to support — it converts "something broke" into a tractable conversation.
4. **State the data's condition explicitly** (what saved, what didn't, what may look wrong until sync) — and never promise resolution timing you can't verify ("usually resolves in a few minutes").

## Core Philosophy

**Write it like you're talking to a friend.** Empathetic, clear, and grounded — not cute, not technical, not generic.

**Generic errors are a development/product failure, not a content failure.** When the cause is known, hiding it behind "Something went wrong" is the ultimate disservice. Before accepting a request to write a generic fallback message, ask:

1. *Why are users seeing this?*
2. *What is happening in the background?*
3. *Can we be specific instead?*

Push back on generic copy when the underlying error is knowable. The fix is often code, not words.

**Stress cases, not "edge cases."** Eric Meyer & Sara Wachter-Boettcher (*Design for Real Life*, via Metts & Welfle): the term "edge cases" "is designed to make it seem like those people don't matter"; they prefer "stress case," "because it draws attention to the frustration and emotion these users might feel." Write failure copy for the user at their worst moment, not the statistical median.

## The Four Anti-Patterns

Reject error messages that do any of these:

### 1. Inappropriate tone
"Oops! Something went wrong…" is unacceptable when stakes are high. Cute or fluffy language undermines credibility when users are stressed (failed payments, lost work, locked accounts). Match the seriousness of the moment.

### 2. Technical jargon
Users don't care about "couldn't fetch data" or "credentials denied" or "401 unauthorized." They care about outcomes in plain language: *what they tried to do didn't happen, and here's why.*

### 3. Blame-shifting
Don't shame the user. Don't blame third parties by name.
- Bad: "Stripe isn't responding"
- Good: "We're having trouble connecting to our payment processor"

Use *we* language for backend failures. Take responsibility on behalf of the product.

When the failure *is* yours, blame-shouldering builds loyalty: Slack's most popular error message of all time (per Metts & Welfle) "demonstrated what a company could do by shouldering the emotional burden of something going wrong" — wordy, but it took the blame for a failed connection and helped users move forward.

### 4. Generic without cause
"Something went wrong" when the cause is actually known is the worst offender. If the system knows the file is too large, the password is wrong, or the network dropped — say so.

**Generic vs. unclear:** Generic = states a failure with no detail. Unclear = attempts an explanation in confusing language. Both fail; specific-and-clear is the goal.

## The Five Essentials

Every error message should have these, in order of priority:

### 1. Say what happened and why
Make it crystal clear what did or didn't happen. Use phrases like *"an issue on our end"* to make it explicit when the user isn't to blame.

### 2. Reassure what's safe
Tell the user what *wasn't* lost or affected.
- "Your changes were saved as a draft."
- "Your card wasn't charged."
- "No data was lost."

This is often the most calming line in the message.

### 3. Empathy without grovel
Use "please" when warranted. Don't apologize excessively — it reads as performative. One acknowledgment, then move to the fix.

### 4. Help them fix it
Provide concrete next steps or a descriptive link.
- Bad: "Click here for more info"
- Good: "Learn how to resolve this"
- Good: "Check your internet connection and try again"

If the fix is a button, label it for the action: "Retry payment" not "OK".

**When the failure cost something, say what it cost — in-product.** From crypto wallet design, where a failed transaction still burns fees (Paul Stamatiou, "Crypto design challenges," 2021 — https://paulstamatiou.com/crypto-design-challenges/): "Show me how much money I just lost on gas with this failed transaction. Don't make me go to Etherscan to try to piece it all together." Generalized: state the concrete cost (money, lost data, time), and never make the user reconstruct what happened from logs or an external dashboard. If a parameter caused the failure, suggest the corrected retry ("trying again but with more gas if that was the reason it failed").

### 5. Always give a way out
If the user can't self-resolve, include a path to support. Never trap them in a dead end.

## Before/After Examples

**Login failure:**

| Bad | Good |
|---|---|
| "Authentication failed. Credentials denied." | "That email and password don't match. [Reset password]" |
| "Oops! Something went wrong" | "We couldn't sign you in. Check your password, or [reset it here]." |

**Save failure:**

| Bad | Good |
|---|---|
| "Error: 500 Internal Server Error" | "We couldn't save your changes — an issue on our end. Your work is saved as a draft. [Try again]" |

**Payment failure:**

| Bad | Good |
|---|---|
| "Stripe declined." | "Your card was declined. Your account wasn't charged. Try a different card or [contact support]." |

**Upload failure:**

| Bad | Good |
|---|---|
| "Upload failed." | "That file is over the 10 MB limit. Try compressing it or upload a smaller version." |

**Network failure:**

| Bad | Good |
|---|---|
| "Network error." | "We're having trouble connecting. Check your internet, then [retry]." |

## Voice & Tone Calibration

Tone scales with stakes. Use this rough mapping:

| Stakes | Tone | Example |
|---|---|---|
| Trivial (unsaved formatting) | Light, brief | "Couldn't apply that style. [Try again]" |
| Moderate (failed save, network blip) | Calm, factual, reassuring | "Your work is saved as a draft. We'll retry automatically." |
| High (payment, account, data loss) | Direct, professional, no jokes | "Your card wasn't charged. [Contact support] if this keeps happening." |

**Never** use exclamation points, emoji, or "Oops!" for high-stakes errors. They read as dismissive.

## Incident communication (outages, breaches, big mistakes)

Walter's sequencing rule — **facts before fun**: "you must explain what happened swiftly, honestly, and clearly. Give people the facts of the event, communicate that you're doing your best to resolve things, then update users regularly, even if not much has changed." Only after the honest explanation may you redirect attention — Flickr's storage-failure coloring contest (print the outage page, win a Pro account) turned downtime into goodwill, but it *followed* the facts, never replaced them.

Why it works: "you must accrue goodwill as an insurance policy for the problems that are certain to occur," and psychologists' rosy effect — "this phenomenon of positive recollection" — means a well-handled failure fades while the good response is remembered.

## Test the error copy

Natalie Yee's method (via Metts & Welfle): print the screens and put them in front of users with no way to interact — reactions surface immediately ("That would make me mad." / "That's fine. I would wait."). A daily-limit message read as data loss; rewritten and retested, "the error message was reassuring instead of concerning." Her summary: "We actually changed a lot of text from those tests because we realized the messages were alarming, or that people would have no idea what to do next." Test methods and follow-up question types → `user-research`.

## Apple's alert doctrine (complementary layer)

*Source: Apple WWDC 2017 session 813 — "Writing Great Alerts" (lost session, via WWDC Index archive).* The Wix rules above govern the *words*; this layer governs whether an alert should exist and how its parts divide the work.

**Should this be an alert at all?** "Alerts are disruptive by design" — before putting anything in one, ask "do people really need to know this, and do they need to know this now." Only three legitimate jobs: correct an error, request access to user data, or announce a major update (significant feature, critical security fix — "certainly not every update merits an alert"). Alerts are also *lightweight* by design — disqualifiers:
- **Not settings or multiple-choice questions** — if the alert takes most of the viewport, cut choices or move the task to a larger UI element.
- **Not diagnostic tools** — no technical data, especially error codes (matches anti-pattern 2).
- **Not afterthoughts for preventable problems** — if you have password rules, state them on the main screen and disallow invalid input; don't let the error happen and then alert about it.

**Structure — each part has one job:**
- **Title**: the main point in one sentence or less. Name the specific object ("file.pdf", not "this file").
- **Message**: brief cause or reason, only if necessary. Ideally people understand the situation from **title + buttons alone**, without reading the message.
- **Buttons**: easy to understand and perform; if an action takes people outside the app or to another state, *navigate them there* — don't leave them to find their way.
- Mnemonic: a good alert answers **what happened, why am I seeing this, how do I proceed**.

**The Cancel-download trap**: "Cancel download? … [Cancel] [OK]" follows every guideline and is still ambiguous — "even when using guidelines, always check the result for any ambiguity or confusion." When the action verb collides with a button convention, rephrase the title and restate the choices in the buttons ("Stop Download" / "Continue Download").

Style: "Avoid platitudes, jargon or fillers"; correct formatting/spelling/punctuation; match the editorial voice to your audience. Periodically re-audit: do you still need every alert you ship?

## Review Checklist

When reviewing error copy, walk through this:

- If it's a dialog/alert: does it need to interrupt at all — and was the problem preventable upstream?
- Does it say specifically what happened? (not "something went wrong" if cause is known)
- Does it explain *why* in plain language? (no jargon, no error codes alone)
- Does it avoid blaming the user or third parties?
- Does it reassure what wasn't lost or affected?
- Does it give a concrete next step?
- Does it offer a way out (support link, retry, alternative)?
- Does the tone match the stakes? (no cute language for serious failures)
- If it's generic, can engineering make it specific instead?

## When to Push Back on Engineering

Writers should reject requests for generic fallback copy without investigation. If a PM or engineer asks for "just write something for the error state," ask:

- What error states actually fire here?
- How often does each one trigger?
- Does the system know which one fired?

If the system knows, write a specific message per case. If it truly doesn't, write the most useful generic possible — but flag the underlying gap as a backend/product issue, not a content one.

**Make the business case in money** (Sue Lucchese, via Metts & Welfle): "You have to monetize the risk of not considering these things." Her playbook: pull call-center data — how many people called because they were locked out and couldn't figure out why, and how long each call lasted — and price the bad error flow in support cost. Better avoidance/explanation copy becomes a measurable savings line, not a taste argument.

## Relationship to Other Skills

- **`user-onboarding`** handles empty states for *new* users (no data yet) and welcome/first-run copy. Use it for "you have no projects yet" — celebratory framing.
- **This skill** handles failure states (something tried and didn't work). Use it for "we couldn't load your projects" — recovery framing.
- Some screens straddle both (a new user hits an API failure on first load). In those cases, prioritize the failure-state framing — clarity about what's wrong beats a welcome message.
- **`ui-voice-and-tone`** sets the product's overall voice and where the serious/clinical tone dial sits; this skill owns the failure-state specifics (the four anti-patterns, the five essentials). Inherit the voice from there; apply the failure rules here.
