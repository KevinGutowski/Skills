---
name: source-sweep
description: "Exhaustively explores a bounded source (course, site, archive, doc set) before distilling — open every page, never judge from titles, keep a coverage ledger. Runs FIRST (coverage), then conversion skills distill. Use when mining a source for skills, resuming a sweep, or on 'go through everything' / 'go through this entire site/course' / 'encode everything useful'. Triggers: sweep the site, full coverage, did you check everything, coverage ledger."
---

# Source Sweep

A discipline for mining bounded sources (courses, libraries, archives, vaults) completely — born from a real failure: lessons judged "already covered" from index blurbs, a link vault never opened, interviews declared "video, needs transcription" from thumbnails when full text transcripts sat one click away. **Sampling that presents itself as a sweep is worse than no sweep** — it forecloses the user's questions with false confidence.

## The core rules

1. **Inventory before judgment.** First pass produces a complete node list (every lesson, article, link, video, download) with URLs — from the site's own navigation, not your assumptions. Collections can hide entries behind tabs/params/JS; enumerate each collection view. Record items marked "coming soon"/unpublished — they're future work, not non-existent.
2. **Open every node personally.** A title, thumbnail, or one-line description is *advertising*, not content. A "video" page may carry a full transcript; a "basics" lesson may contain the one number you're missing; a link list may bury the canonical source. The browser/fetch call costs seconds; a wrong disposition costs the whole point.
3. **Coverage ledger, per node.** Maintain a running ledger (a file, not memory) with one line per node: `status — disposition — evidence`. Statuses: `mined` (content extracted + where it went), `read-skip` (opened, read, skipped — with the reason), `blocked` (paywall/not published/broken — with what unblocks it), `pending`. A node is never "covered" because its *topic* is covered elsewhere — only because *it was opened and read*.
4. **Follow curated links one level minimum — coverage should be *sprawling* at first.** Every outbound link in the content is part of the source: a tweet cited in a lesson, a referenced article, a linked talk, a resources section. Open them (tweets via x-post-reader, articles via fetch), judge, ledger. A practical method: after visiting all primary nodes, **harvest every external URL from the saved page evidence** (`grep` the snapshots), dedupe, triage (content links vs docs/tools vs profiles), and read all content links. On those pages, note further links as *candidates* with a one-line reason; recurse only while marginal value stays obvious, and record where and why you stopped. Sprawl first, prune later — pruning happens at the distill step, never at the visit step.
5. **Sampled vs swept — say which.** Any claim of coverage states its basis: "swept: all 45 nodes opened" vs "sampled: 6 of 45, selected by X". Never say "the rest is already represented" unless the ledger shows each node was opened. If the user asks "did you check everything?", the ledger *is* the answer.
6. **Save evidence as you go.** Extract each page's text to a local file at visit time (snapshots rot, sessions expire, members-only logins are fleeting). Name files by node slug. This also makes the sweep resumable and verifiable.
7. **Delegate screening, never visitation.** Agents may screen *captured* evidence files for relevance, but the inventory and the page visits are yours — an agent's summary of a page you never opened re-creates the original failure one level down. Verify agent-extracted quotes against the evidence files before encoding (beware transcript spacing/punctuation defeating literal grep — search loose substrings).
8. **Mid-sweep discoveries change the plan, not the standard.** Finding an installer, a downloadable skill file, an API, or a transcript endpoint doesn't excuse skipping the remaining nodes — fold it in and continue the sweep.

## Workflow

1. **Enumerate**: walk all navigation surfaces (menus, collections, tabs, pagination, sitemaps where allowed) → write the ledger file with every node `pending`.
2. **Estimate + report**: tell the user the node count and rough cost before diving in; for very large sources agree on tranche order (but the default is *all of it*).
3. **Visit loop**: for each node — open → extract text/evidence to file → read it → set disposition in the ledger. Batch mechanically (navigate/extract), but the *reading* is per-node.
4. **Link pass**: visit every curated outbound link; ledger each; note candidate next-hops with reasons.
5. **Distill**: only now route findings (extend existing skills > new skill > skip — per the codify pipeline's house style).
6. **Report**: coverage summary from the ledger — swept/blocked/pending counts, what was skipped and why, and what remains (e.g. unpublished entries to recheck).

## Ledger format

```
# sweep: animations.dev — 2026-06-10
[mined]     /learn/animation-theory/the-easing-blueprint → web-animation-design (already its source; verified no delta)
[read-skip] /learn/css-animations/transforms — mechanics tutorial, fully represented in skill's Transforms section
[blocked]   /library/layout-alignment — marked "Soon", unpublished; recheck ~July 2026
[pending]   /vault → https://ui.land
```

## Relationship to other skills

- **`archival-research`** — sibling discipline: that skill governs *provenance and evidence-grade capture* for dossiers/archives; this one governs *coverage* when the goal is distillation. A big mine often uses both: sweep for coverage, archive what's load-bearing.
- **`deep-research`** — for open-web questions (unbounded space, search-driven); this skill is for *bounded* sources where "all of it" is a meaningful target.
- **`catalog-reconciliation-research`** — downstream consumer: its evidence tiers assume the sweep actually happened.
- The codify-talks pipeline (memory): source-sweep is its mandatory first phase whenever the source is a site/course/library rather than a single talk.
