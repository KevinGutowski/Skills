---
name: apple-search-design
description: "Design search experiences on Apple platforms — field placement and how it signals scope, suggestions, recent searches, scope bars and tokens, no-results states. Use when designing or reviewing in-app search, deciding where search lives, or adding a search tab or tokens. Triggers: search field, search placement, search tab, scope bar, search tokens, no results."
---

# Apple Search Design

*Source: Apple WWDC 2026, session 292 — "Design intuitive search experiences" (Rob, Apple Design team). https://developer.apple.com/videos/play/wwdc2026/292*

Search is often the first thing people reach for, and how effortless it feels depends mostly on **where it lives** and **how it helps before and after typing**. This skill covers the system Search Field, the placement decision, and the interaction best practices — for iOS, iPad, and Mac. (For the *visual* side of a branded search field, see `ios-brand-identity`.)

## The Search Field

Use the system search component; it ships the elements people expect:
- A **leading magnifying-glass icon** that establishes the field as search.
- **Placeholder text** telling people where to type.
- A **clear button** once text is entered.
- On iOS, a **Cancel button** when focused (exits search and dismisses the keyboard).

It adapts its presentation to placement automatically — **glass** in a toolbar, **standard content styling** in the scroll region. If your brand has custom iconography, keep the core elements intact and make any custom search glyph closely resemble the magnifying glass — it's universally read as "search."

## Where to put search — the decision

Ask two questions:
1. **How do people navigate this app?** (Does it need to coexist with a tab bar? Contextual toolbars?)
2. **What is the scope of the search?** Placement *signals* what content is being searched — get this wrong and people misjudge what they'll find.

### iOS

| Placement | Use when | Behavior / example |
|---|---|---|
| **Bottom toolbar** (preferred) | Most ergonomic; sits beside primary actions | Field animates **up over the keyboard**. Width adapts to adjacent items (leading + trailing). >2 other items → start as a **button** that expands into a field. *Mail.* |
| **Top toolbar** | The bottom is occupied (e.g. a sheet) | Still pulls up over the keyboard. *Stocks.* |
| **Search tab** | Tabbed app needing a single global entry point | Two variants below. |
| **Inline field** (under title / in content) | Scope is a *specific* tab/section; app has multiple search fields | Stays at the top when active (no bottom UI). Title + descriptive placeholder reinforce the narrow scope. *Apple Music library.* |

**Search tab, two styles** (HIG June 2026 names — "prominent/focused" is the old vocabulary):
- **Standard tab** → displayed uniformly with the other tabs; tapping lands on a search landing page with the field at top. "Choose the standard tab style to provide suggestions, promote discovery, and encourage exploration" (*Apple TV* surfaces genres/categories before searching).
- **Button appearance** → displayed as a separate button; tapping **immediately** focuses the field + keyboard. "Choose the button appearance to help people quickly find what they need" — a "more transient experience that brings people directly back to their previous tab after they exit search." Always one tap away.

**Field pattern — pull-to-search** (Paul Stamatiou, "Stocketa," 2023 — https://paulstamatiou.com/stocketa/): in a single-feed app with minimal chrome and no tab bar, the pull-down gesture opened *search* instead of refresh. The reasoning generalizes: his data auto-updated so refresh added nothing, and the pull gesture should introduce a new cell into the list — which search-to-add does and refresh doesn't. Match the gesture to what it actually adds to the view. (See also https://x.com/Stammy/status/1492335795847450626 — "every app needs a fun and fast 'pull down to search' interaction.")

### iPad & Mac (keep the two as aligned as possible)

| Placement | Use when | Example |
|---|---|---|
| **Trailing position of the toolbar** | Splitview / multi-column; results stay visible in the list while the detail view shows the selection; or results appear *in* the detail view | *Mail, Notes, Files; Freeform* (filters the boards). Field scales/collapses to a button by available space; on activate it expands for input and moves overflow items into a menu. |
| **Top of the sidebar** | Filtering content or navigation that lives in the sidebar; clean line between the searched list and a rich detail view | *Settings; Stocks* (add symbols — sidebar placement makes scope clear; placing it over "Top Stories" would imply searching news). |
| **Dedicated tab / sidebar item** | Rich, multi-section app needing one global place to search, with a large canvas for results | *Apple Music.* |

## Best practices

**Recent searches** — many searches are repeats; show recents so people can return without typing.
- iOS: inline when the field is focused. iPad/Mac toolbar or sidebar: in a **menu**. Search tab: alongside other suggestions.
- Be **selective** (e.g. only results the person actually viewed/engaged). Let people remove them: swipe individual items + a "clear all" button in the section header.

**Predictive suggestions** — show relevant results as fast as possible while typing, and integrate predictive completions that feel like a natural finish of the query.
- **Visually distinguish** typed input from the predicted part.
- **Limit** the number shown so results stay front and center. Good ranking means people rarely type the whole query.

**Filtering / refine** — start broad, then let people narrow. Choose the control by complexity:
- **Scope bar** — lightweight switching between a few scopes; also reinforces *where* you're searching (*Mail*: all mailboxes vs. current).
- **Filters** — for multi-category search; show only **relevant, contextual** filters to avoid overwhelm (*Maps*: restaurants → hiking trails).
- **Search tokens** — keyword filters that surface as you type and appear as highlighted text in the field; combinable for natural-language queries (*Photos*: "Joshua Tree" + "2021"). Powerful but **less discoverable** — don't let them replace visible filter UI; pair them with a scope bar or filter controls.

**Fail gracefully** — never leave a blank view on no results (people wonder if the search even ran). Use a **no-results state** (`ContentUnavailableView` configured for search: search symbol, title, subtitle), and **echo the current search text** so people can spot a typo.

## Review checklist

- [ ] Does placement match how people **navigate** and correctly signal **scope**?
- [ ] iOS: is the field reachable (bottom toolbar where possible) and does it rise over the keyboard?
- [ ] Tabbed app: one clear search entry point — standard tab (explore) vs. button appearance (go straight in)?
- [ ] iPad/Mac aligned with each other; toolbar-trailing vs. sidebar chosen by where results should appear?
- [ ] Recent searches shown, selective, and removable?
- [ ] Predictive suggestions distinguished from input and limited in number?
- [ ] Right refine control (scope bar / filters / tokens), with tokens backed by visible filter UI?
- [ ] A considered no-results state that echoes the query?

See `references/patterns.md` for the full placement examples and decision walkthroughs.

## Relationship to other skills

- **`design-principles`** is the parent — search placement is *Familiarity* (use the conventional component and location), *Simplicity* (fewest steps to a result), and *Flexibility* (adapt across iOS/iPad/Mac). Use it to resolve trade-offs; use this skill for the concrete search patterns.
- **`liquid-glass-design-system`** — the material behind the glass search field and the dedicated bottom Search tab; placement patterns here, material rules there.
- **`apple-navigation-design`** — answers this skill's first question, "how do people navigate my app?" (tabs, push, modality, sidebars). Structure navigation there, then place search here; nav-bar search filters the current view, whole-app search gets a search tab.
- **`ios-brand-identity`** — covers how a branded/custom search field should still keep the magnifying glass and native feel. Sibling skill; use together when search is part of a branded UI.
- **`swiftui` (swiftui-lazy-stacks)** — search results are usually a scrolling list; that skill governs the lazy-stack/scroll implementation beneath the results.
- **`naming-features-and-labels`** — for the placeholder text and scope/filter labels (clear, scope-signaling wording).
- **`error-messages`** — the no-results view is an empty state, not a failure; keep it neutral and helpful rather than error-toned.
