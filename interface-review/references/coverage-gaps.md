# Coverage Gaps

- No fresh-agent routing eval yet distinguishes a holistic review from a focused `design-craft`, `web-design`, or `ux-writing` request.
- [report-exemplar.md](report-exemplar.md) is a worked example on an invented interface. No accepted local exemplar yet demonstrates the complete report format on a real interface.
- Quick/full finding caps come from one external implementation and should be revisited after repeated use.
- The best order for domain passes has not been compared experimentally; accessibility-first is the current safety-oriented default.
- Layout-specific numeric rules from the source remain parked until corroborated by primary guidance or independent sources.
- Native Apple and mixed web/native review fixtures still need explicit examples.
- The `scored` lenses (Nielsen rubric, cognitive-load count, personas) come from one external implementation. There is not yet a local calibration showing that two reviewers score the same interface within ±3/40.
- Whether isolating the judgment pass from detector output measurably changes findings has only the source project's claim behind it. A local A/B comparison is needed.
- The behaviour-trap catalog and its thresholds (100 ms press feedback, 1 px control-height tolerance, 20 px dot-loader floor) come from one external implementation. Its IDs match that project's lint, which is not installed here.
- The source's no-persona reviewer panel (identical prompts, findings raised independently by two reviewers rank highest) conflicts in spirit with the persona walk-throughs in `scored` mode. Neither has a local comparison; the panel is parked.
- The grep patterns in [code-compliance-sweep.md](code-compliance-sweep.md) were run once, on 2026-11-18, against one React and Tailwind monorepo (vercel-labs/json-render, 394 `.tsx` files), then corrected over several reviews: explicit paths on every command, an image pattern that catches a missing `height`, an icon-only-button pattern that survives inline handlers, and no focus-ring filter (four versions hid real candidates). Not measured: precision per pattern after the "then check" step, plain-CSS or Vue/Svelte codebases, and the multi-line patterns' misses.
- The sweep's rule families are a snapshot of Vercel's Web Interface Guidelines read on 2026-11-18. Upstream is unversioned, so the table can drift; the reference tells the agent to fetch first, but nothing checks the snapshot against upstream.
- Upstream-only rules with no local owner (`:focus-within` on compound controls, `inert` on a dragged element, the over-50-items virtualization prompt) are single-source and stay in the sweep rather than in a `web-design` reference until corroborated.
- The sweep hands runtime checks to `browser-verification`. The handoff has no fixture yet showing a `Not verified` sweep item converted by a runtime check.
