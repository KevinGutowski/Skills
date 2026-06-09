# Search Placement Patterns & Examples

*Source: Apple WWDC 2026, session 292 — "Design intuitive search experiences." https://developer.apple.com/videos/play/wwdc2026/292*

The talk's worked examples, organized so you can reason by analogy when choosing a placement. The two guiding questions throughout: **how do people navigate this app?** and **what is the scope of search?**

---

## iOS placement examples

**Mail — bottom toolbar (the preferred default).** Navigation happens through the mail list, with contextual toolbars over each view. Bottom-toolbar search is the most ergonomic spot, adjacent to the app's other primary actions, and clearly conveys "you're searching your mail." The field's width adapts to the number of adjacent toolbar items, accommodating a leading and a trailing action. If you need more than two other toolbar items, search can start as a **button** and animate into a field when tapped.

**Stocks — top toolbar (when the bottom is taken).** The bottom of the Stocks list is occupied by a sheet, which precludes a bottom toolbar or field. Search goes in the top toolbar and still pulls up over the keyboard when tapped.

**Apple TV — standard Search tab (explore first).** A tabbed app with broad, rich content. Tabbing to Search lands on a page with the field at the top and room to surface genres and categories *before* searching — grounding people in what's available. Good when people arrive in an exploratory mindset.

**Phone — prominent Search tab (go straight in).** People usually know what they want (a recent call or contact). Making Search a *prominent* (button-appearance) tab means tapping immediately engages search and brings up the keyboard. Search is always present and never more than a tap away.

**Apple Music library — inline field (narrow scope).** Search sits directly inline with the content, beneath the title. The title plus more descriptive placeholder text reinforce that you're searching just the albums in your library — not the entire app. This pattern shines when an app has more than one search field and when location is critical to scope. An inline field stays at the top when active, avoiding any UI at the bottom.

**Why placement = scope signal.** Where the field lives sets people's expectation of *what* they're searching. The same query feels different under a library title vs. a global Search tab. Choose placement so the implied scope matches the actual scope.

---

## iPad & Mac placement examples

Keep iPad and Mac search as aligned as possible — they share navigation models and wide displays. Primary search field can go in the **trailing toolbar**, the **top of the sidebar**, or a **dedicated Search tab/section**.

**Mail / Notes / Files — trailing toolbar (splitview).** When searching across multiple columns, the trailing toolbar position is a great use of space: people navigate results while the selected content stays visible in the detail view. This is one of the most familiar desktop search patterns.

**Freeform — trailing toolbar (results in the detail view).** Consider the toolbar when results should appear in the detail area — here search directly filters the boards below. With multiple toolbar items/groups, the field scales or collapses into a button by available space; when activated it expands to a width optimized for text input and moves overflow items into a menu.

**Settings — sidebar (filter the sidebar).** Place search at the top of the sidebar when you're filtering content or navigation that lives in the sidebar itself. Useful when the app has a rich detail view and you want a clean line between the searched list and the adjacent view.

**Stocks — sidebar (scope clarity).** Search finds and adds symbols to the stocks list; the sidebar placement makes it clear that's what you're searching. Placing search over the "Top Stories" section instead would wrongly imply you're searching news and stories.

**Apple Music — dedicated Search tab/sidebar item.** For a rich, multi-section app, a dedicated search destination gives people one place to search everything and a larger, more immersive canvas to express results.

---

## Interaction details

**Recent searches.**
- iOS: shown inline the moment the field is focused.
- iPad/Mac: if the field is in the toolbar or sidebar, show recents in a menu.
- Search tab: present recents alongside other content suggestions on the page.
- Be selective — in some apps it's most helpful to surface only the specific results a person viewed or engaged with.
- Always let people remove recents: a swipe gesture on individual items, plus a button in the section header to clear all.

**Predictive suggestions.** Once typing starts, show relevant results as quickly as possible. Integrate predictive suggestions that correspond to what's typed and read as a natural completion of the query. Keep people oriented by visually distinguishing the user's input from the predictive part, and limit the number of suggestions so results stay front and center. With good ranking, people generally shouldn't have to type the entire search.

**Refining results.**
- *Scope bar* — lightweight filtering. In Mail it switches between results across all mailboxes or just the current mailbox, while reinforcing where you're searching.
- *Filters* — for apps searching across many categories, offer a richer set of narrowing options, but only show filters that are relevant and contextual to what's being searched (Maps tailors filters from restaurants to hiking trails).
- *Search tokens* — filter by keyword tokens that surface as you type; applied tokens appear as highlighted text in the field and can be combined (Photos: your photos from Joshua Tree in 2021). Tokens allow natural-language filtering but are less discoverable, so don't use them to replace more visible filtering UI — they pair well with a scope bar or other filter controls.

**No-results / empty state.** A completely blank view leaves people unsure the search even went through. Use a well-considered no-results view — Apple's `ContentUnavailableView`, configured for search, shows a search symbol, title, and subtitle. Displaying the current search text in the view helps people quickly catch typos or errors.
