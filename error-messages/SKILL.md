---
name: error-messages
description: Write and review error messages, failure-state copy, and any in-app text shown when something goes wrong. Use when writing error toasts, banners, dialogs, form validation messages, 404/500 pages, "something went wrong" screens, retry prompts, API failure copy, payment/auth failure messages, or any UI text that appears in a failure state. Also use when reviewing existing error copy for tone, clarity, or blame issues. Based on Wix UX's "When life gives you lemons, write better error messages" by Itamar Medeiros.
---

# Error Messages

Principles for writing error and failure-state copy that respects users in their hardest moments. Apply when writing or reviewing any in-app text shown when something doesn't work as expected.

## Core Philosophy

**Write it like you're talking to a friend.** Empathetic, clear, and grounded — not cute, not technical, not generic.

**Generic errors are a development/product failure, not a content failure.** When the cause is known, hiding it behind "Something went wrong" is the ultimate disservice. Before accepting a request to write a generic fallback message, ask:

1. *Why are users seeing this?*
2. *What is happening in the background?*
3. *Can we be specific instead?*

Push back on generic copy when the underlying error is knowable. The fix is often code, not words.

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

## Review Checklist

When reviewing error copy, walk through this:

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

## Relationship to Other Skills

- **`user-onboarding`** handles empty states for *new* users (no data yet) and welcome/first-run copy. Use it for "you have no projects yet" — celebratory framing.
- **This skill** handles failure states (something tried and didn't work). Use it for "we couldn't load your projects" — recovery framing.
- Some screens straddle both (a new user hits an API failure on first load). In those cases, prioritize the failure-state framing — clarity about what's wrong beats a welcome message.
