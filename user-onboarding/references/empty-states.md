# Empty States (Blank States)

The most overlooked onboarding opportunity. Empty states are what users see when a content area has no data yet — dashboards with zero activity, friend lists with no friends, project lists with no projects. These are often the very first thing a user sees after signing up, and many lists end up empty again later.

This file owns *why* a state is empty and *what it says*. The component itself (one visual style product-wide, page/card/inline sizes, keeping the table or chart frame, one action or none, not showing it while loading) lives in `design-craft` (component-details → Empty states). On Apple platforms, that section maps the causes onto `ContentUnavailableView` / `UIContentUnavailableConfiguration`. The copy rules here still apply to its title and description.

## Contents

- The Problem
- Tone Rules
- The Empty State Formula
- Write it short (recurring empty states)
- Emotional job of an empty state
  - Name the cause before writing the copy
- Examples
- Anti-Patterns
- Applying the Rider/Elephant/Path Framework

## The Problem

Unhandled empty states show a lot of zeros and "you haven't done X yet" messages with weak direction on what to do about it. This is demoralizing — the user just signed up and they're already being shown what they lack.

## Tone Rules

**Never blame users for things they couldn't have done yet.**

- Bad: "You haven't set up any projects"
- Bad: "You don't have any friends"
- Bad: "You have no chats"
- Bad: "No data to display"

These sound adversarial. They point fingers at the user for an absence that was inevitable.

**Instead, use empty states as opportunities to paint a picture of what life will be like once they're up and running.**

- Good: "This is where your projects will live. You'll be able to track progress, assign tasks, and hit deadlines without breaking a sweat."
- Good: "This is where your friends will show up once you add them. You'll be able to see how they're doing at a glance and can message them right from here."
- Good: "Your conversations will appear here. Once your first customer reaches out, you'll be able to respond in seconds."

## The Empty State Formula

```
1. Paint the future: "This is where [valuable thing] will appear"
2. Sell the benefit: "You'll be able to [specific desirable outcome]"
3. Clear CTA: [Button to take the action that fills this state]
```

## Write it short (recurring empty states)

Hulick's formula is for first-run surfaces, where the empty state is part of selling the better user. Most empty states are not first-run: a filtered list, a cleared inbox, a quiet week on a dashboard, seen again and again. For those, Kevin Dukkon's rules (*How to design empty states*, 2026) apply:

- **Title: up to five words, no full stop.** Name what is missing: "No invoices yet", not "Nothing here". Naming the object is not blame; "You haven't created any invoices" is.
- **One sentence below** that adds to the title instead of repeating it, usually what makes things appear: "Paid invoices show up here."
- **No blame and no jokes.** A joke is fun the first time and tiring by the tenth.
- **Nothing crucial lives only in the empty state.** It disappears once content arrives (Apple HIG, Writing: "Provide clear next steps on any blank screens"). Put lasting information somewhere that stays.
- **Search titles quote the query, which can be long** (ours). The quoted query does not count toward the five-word cap. If it would wrap past one line, truncate it inside the quotes with an ellipsis, since the field above still shows the whole query; or use "No results" as the title and quote the query in full in the line below.
- **The button names the action and the thing:** "Create invoice", not "Get started".

**Scoped schools, do not blend.** The one-sentence limit is for recurring empty states. A first-use, full-page empty state is the exception: it may follow Hulick's formula with two short sentences, one painting the future and one selling the benefit, plus one CTA, as in the Examples below. Keep the short title above it. Everywhere else, use the short form. Both schools agree on no blame, no "No data to display", and one clear action.

## Emotional job of an empty state

Sten's "good enough" chapter adds a useful review lens: an empty state is not only blank-space management; it is often a user's first emotional proof of whether the product understands them. A strong empty state should leave the user feeling oriented, capable, and one step closer to value.

Check four moments:

- **New/blank:** show what will appear and why it matters.
- **Waiting:** explain what is happening or when the next thing will arrive; avoid dead spinners.
- **Completion:** confirm the specific accomplishment, not just "success."
- **Recovery:** if something failed, switch to `ux-writing` (error-messages) and prioritize reassurance over welcome copy.

### Name the cause before writing the copy

"Empty" covers several different states, and each needs its own next action. Causes from Impeccable (`onboard`/`clarify`, 2026); "All done" and "No data in range", and the example titles and actions, from Dukkon (2026). Only the title and action change; the component stays the same.

| Cause | Next action | Example title → action |
| --- | --- | --- |
| First use (never used the feature) | Value plus a starter action or template | "No projects yet" → Create project |
| User cleared it (deleted everything on purpose) | Light touch and an easy way to recreate; no re-onboarding | "No projects" → Create project |
| All done (worked through it: inbox zero, no open tasks) | Confirm it and stop; no button | "You're all caught up" → none |
| No results (search or filter returned nothing) | Repeat the exact query in quotes, keep it in the field, offer to widen the search or clear the filter. If a filter hides items, name it and the count | "No results for “march invoice”" → Search all files; "3 tasks are hidden by Status: Open" |
| No permission | Why, who can, and a way to ask; never a disabled button | "Only owners can see billing" → Request access |
| No data in range (nothing measured in this period) | Say so; on a chart draw no line, not a zero line | "No requests this week" → none, or widen the range |
| Failed to load | What happened and a retry → `ux-writing` (error-messages) | "Couldn't load projects" → Try again |

Still loading is not a cause: show no empty state until the request returns empty (`design-craft` (component-details → Loading and failure are not empty)). A single generic "Nothing here yet" for all of these hides the one action each case needs.

## Examples

First-run, full-page examples in Hulick's school. For recurring empty states use the short form above.

**Bad empty state:**
> You have no chats.
> Invite your website visitors to chat.

**Good empty state:**
> This is where your conversations will appear. Once you add the chat widget, customers can reach you instantly — and you'll never miss a question again.
> [Add chat widget to your site]

**Bad empty state:**
> No reports yet.

**Good empty state:**
> Your weekly reports will show up here automatically. You'll see exactly which campaigns drove revenue and which need attention — no spreadsheets required.
> [Connect your first data source]

## Anti-Patterns

### Don't use dummy/fake data
A faint *preview* of the row or card that will appear (one of the visual styles in `design-craft` (component-details)) is fine: it shows a shape, not numbers. The problem is believable fake content.

Filling empty areas with fake activity and statistics creates confusion:
- "Am I supposed to do something with this, or just look at it?"
- "Am I looking at my own data, or is this fake?"
- "How do I get my real stuff in here?"

Dummy data illustrates what the product is *capable of*, which should have already happened in marketing. Don't conflate showing a picture of success with actually progressing toward success. **Skew towards being useful over being illustrative.**

If you want to show a populated dashboard, put it on the marketing site (like Baremetrics does with their live dashboard).

### Don't show zero counts on user content
The "showing zeros is demoralizing" rule extends past first-run to ongoing metrics. When Twitter tested per-tweet view counts (~2015), most people's tweets got almost no views and showing **"0 views" was depressing** — the team added minimum thresholds before displaying a count at all, then concluded the vanity metric wasn't worth investing in further. (Source: the designer who worked on it — https://x.com/Stammy/status/1606021753725034497)

Apply it: gate any engagement counter (views, likes, followers, usage stats) behind a threshold; render nothing rather than a zero next to the user's own work.

### Content-as-Tutorial (Recommended Alternative)
Instead of fake data, pre-load content that actively instructs. Basecamp does this brilliantly with an "Explore Basecamp!" sample project. The content is self-referential — each piece guides you through using its own little corner of the interface.

The key difference from dummy data: content-as-tutorial exists to actively instruct, not merely to be seen.

## Applying the Rider/Elephant/Path Framework

Empty states can address all three:
- **Rider (rational):** Clear direction on what to do next and why
- **Elephant (emotional):** Paint an exciting picture of the future state, use encouraging tone
- **Path (environment):** Include a direct CTA button that makes the next step obvious and easy
