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
- The grep patterns in [code-compliance-sweep.md](code-compliance-sweep.md) are run by `scripts/test_sweep_patterns.py` against one hit and one miss fixture each (21 commands). That guards the cases review found; it does not measure precision on a real codebase. They were also run once against one React and Tailwind monorepo (vercel-labs/json-render, 394 `.tsx` files). Not covered: plain-CSS or Vue/Svelte codebases and the multi-line patterns' misses. The table no longer says what confirms a finding; that is the owner's rule.
- The sweep hands runtime checks to `browser-verification`. The handoff has no fixture yet showing a `Not verified` sweep item converted by a runtime check.
- [code-pass-checklist.md](code-pass-checklist.md) adapts one rule set (Vercel's Web Interface Guidelines, pinned at `434b7f9`). Recheck it when upstream moves its pin. Its severity map is this library's judgment and has not been calibrated on real PRs. Routing for code-review prompts (B37–B38) passed on the second judge only after a description edit.
