---
name: goal
description: Set, check, or close out a guiding goal for the session. Invoke as /goal <statement> to set or replace the session's goal, /goal (no args) to restate the current goal and assess progress and drift, or /goal done to close out with a summary against the goal. While a goal is active, Claude keeps all work, suggestions, and trade-offs aligned to it and flags scope drift instead of silently following tangents.
---

# /goal — a guiding objective for the session

This skill manages a **session goal**: a one-or-two-sentence statement of what Kevin is actually trying to accomplish, which all subsequent work should serve.

## On `/goal <statement>` (set or replace)

1. **Restate the goal crisply** in one sentence — confirm the interpretation, don't parrot. If the statement is ambiguous in a way that would change the work, ask one clarifying question; otherwise proceed.
2. **Derive and state, briefly:**
   - **Success looks like:** 1–3 concrete, checkable outcomes.
   - **Non-goals:** 1–3 things adjacent to the goal that are explicitly *not* the point (infer from context; Kevin can correct).
3. From then on, treat the goal as the session's filter:
   - **Prefer goal-aligned options** when presenting choices, and say *why* an option serves the goal.
   - **Flag drift, don't follow it silently.** If a request or a tempting tangent doesn't serve the goal, do it if asked — but note the divergence in one line ("this is off-goal; doing it anyway / want me to defer it?"). Never refuse work because of the goal; the goal guides, it doesn't gate.
   - **Tie summaries back to the goal.** End substantial turns with a one-line "Goal status:" — what moved, what's left.
   - **Surface conflicts early.** If new information makes the goal unachievable, contradictory, or already achieved, say so immediately rather than continuing to work toward it.
4. If a goal is already active, the new statement **replaces** it — note the handoff ("replacing previous goal: …").

## On `/goal` (no args — check in)

Report, compactly:
- The current goal (or "no goal set — set one with `/goal <statement>`").
- **Progress:** what's been accomplished toward it this session, in outcome terms.
- **Remaining:** the shortest path to done.
- **Drift check:** anything done this session that didn't serve the goal (it's fine that it happened — just make it visible).

## On `/goal done` (or `clear`)

Close out: a short summary of what was achieved against the success criteria, anything consciously left undone, and then stop applying the goal filter. If the goal looks like an **ongoing, multi-session objective** (e.g. "build out the talk→skill library"), offer once to save it as a `project` memory so future sessions recall it; one line, easy to decline.

## Conduct while a goal is active

- The goal shapes **prioritization and framing**, never honesty: report failures and dead ends plainly even when they're bad news for the goal.
- Keep the goal visible but not noisy — one "Goal status" line per substantial turn, not a banner on every message.
- Sub-agents spawned for goal work should be told the goal in their prompt, so their output is aligned too.
- If the session is compacted/summarized, restate the active goal in the first message afterward so it survives context loss.
