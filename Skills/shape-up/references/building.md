# Building Work

## Assign Projects, Not Tasks

Don't break work into tasks and assign them. Give the team the whole project and let them figure it out.

**Why:** When you assign tasks, the team waits for more tasks. When you assign projects, the team owns the outcome. They discover what's really needed, make trade-offs, and solve problems you never anticipated.

**Example:** After kick-off, expect 1-3 days of silence. The team is reading the pitch, poking around the codebase, and discovering what's actually involved. Don't panic. Don't ask for updates.

Details: [team-ownership.md](building/team-ownership.md), [hand-over-project.md](building/hand-over-project.md)

## Get One Piece Done First

Don't build all the back-end, then all the front-end. Integrate one slice—front and back working together—as early as possible.

**Example:** Building a "Clients in Projects" feature? Don't start with the client model and all its fields. Start with: add a client to a project, see the client appear. One slice, working end-to-end.

**Choose your first slice:**
- **Core interaction** — The most central feature
- **Riskiest part** — Where uncertainty hides
- **Most visible** — What you'd demo to prove progress

**Goal:** Something working in week 1, not everything in week 6.

Details: [integrate-one-slice.md](building/integrate-one-slice.md)

## Mapping Scopes

Scopes are the language of the project—how the team talks about what's done and what's left.

**Organize by structure, not by person.** Bad: "Front-end tasks" / "Back-end tasks." Good: "Autopay" / "Notifications" / "Receipts."

A good scope:
- Is an integrated slice (front + back)
- Can be finished independently
- Takes days, not weeks

**You discover scopes by doing work.** Don't try to map everything upfront. After 1-2 weeks, patterns emerge.

**Example:** A "Message Drafts" project might break into: Start New, Locate, Send, Store, Reply, Trash. Each scope has design and programming work interleaved.

Details: [map-project-scopes.md](building/map-project-scopes.md)

## Showing Progress

Traditional task lists lie. They show items completed, not uncertainty resolved.

**Use the hill chart.** Every scope lives on a hill:
- **Uphill** = Figuring it out (unknowns, research, experiments)
- **Top of the hill** = "I know what to do"
- **Downhill** = Execution (known work, just cranking)

**The important question isn't "how much is done?" but "is anything stuck uphill?"**

A scope that hasn't moved in a week is a red flag—even if tasks are getting checked off.

Details: [show-project-progress.md](building/show-project-progress.md)

## Cutting Scope (Scope Hammering)

Scope grows like grass. You have to cut it constantly.

**Week 3-4:** Look hard at what's left. For each item, ask:
- "Is this a must-have or nice-to-have?"
- "Could we ship without this?"
- "Is there a simpler version?"

Mark nice-to-haves with ~ so everyone knows they're negotiable.

**Cutting scope ≠ lowering quality.** It's making smart trade-offs to ship something great instead of nothing perfect.

Details: [scope-hammering.md](building/scope-hammering.md)

## Deciding "Good Enough"

Compare **down to baseline**, not up to ideal.

Is this better than what customers have now? Ship it.

**Example:** The calendar isn't as full-featured as Outlook. But compared to driving to the office to look at a chalkboard? Massively better. Ship it.

Details: [compare-to-baseline.md](building/compare-to-baseline.md)

## QA Approach

**QA is a level-up, not a gate.** Team owns basic quality.

QA focuses on edge cases toward the end of the cycle. QA issues are nice-to-haves by default—the team decides what's worth fixing.

Details: [qa-approach.md](building/qa-approach.md)

## Handling Feedback After Ship

1. **Let storm pass** — Don't react immediately to first-wave feedback
2. **Stay debt-free** — Say "no" to keep a clean slate for next cycle
3. **Shape feedback** — Important requests go through shaping like any other idea

Details: [handle-feedback.md](building/handle-feedback.md)
