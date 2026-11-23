# Developer Tools Sources

Use this as the top-level provenance map for `devtools`. Detailed source notes live beside the owning references.

## Reference Map

- `devtool-interface-design.md` — developer-tool UI, CLI/panel UX, command palettes, onboarding, dev-data visualization, and agent experience. Detailed sources: `devtool-interface-design/sources.md`; agent/data-viz expansion (incl. agent-readable API docs): `devtool-interface-design/data-viz-and-agents.md`; CLI contract for scripts and agents: `devtool-interface-design/cli-for-humans-and-agents.md`.
- `developer-tool-gtm.md` — commercial developer-tool landing pages, copy, PMF, free-to-paid, and conversion critique. Detailed sources: `developer-tool-gtm/sources.md`.
- `oss-strategy.md` — OSS adoption, README discipline, promotion loops, maintainer survival, and monetization. Detailed sources: `oss-strategy/sources.md`.

## Routing Notes

- Commercial devtool adoption, pricing, conversion, and PMF route to `developer-tool-gtm.md`.
- Open-source project adoption, README quality, stars, maintainer sustainability, and open-core monetization route to `oss-strategy.md`.
- Developer-facing product UI, CLI output, command palettes, workflow panes, and agent-facing surfaces route to `devtool-interface-design.md`.
- Building the actual page/component still routes to `frontend-design`; this skill owns what the devtool should communicate and how it should behave.

## External Skill Folds

Both sources below are external skill repositories from one vendor (Vercel). Treated as untrusted source material: read, not installed or executed; rules restated in this library's words.

| Source | Identity | Read | What went where |
|---|---|---|---|
| Vercel CLI `cli-ux` contributor skill — https://github.com/vercel/vercel, path `packages/cli/.agents/skills/cli-ux/` | Commit `155eacf` (2026-11-12). License: the repository README names Apache 2.0, but the LICENSE file is not in the sparse checkout, so unverified here | 2026-11-18. The digest and the full guidelines file (1,061 lines) read in full; the command-contracts file read for transferable rules; the name registry read for its verb tables only | New `devtool-interface-design/cli-for-humans-and-agents.md` (modes, prompts, consent tiers, streams, progress, errors, `--json`, exit codes, naming, help, secrets, contract changes, test matrix, scoped positions). Five load-bearing rules, a checklist clause and a staleness clause folded into the CLI section of `devtool-interface-design.md`. Skipped: helper function names, source paths, the noun/ID/command registry, product-specific flows (link, deploy, env, login, logs), terminal-palette contrast measurements |
| Vercel Academy `agent-friendly-apis` companion skill — https://github.com/vercel-labs/academy-skills, path `skills/agent-friendly-apis/` | Commit `8976d89` (2026-11-05). License: not in checkout | 2026-11-18. The skill body in full; its doc-patterns and llms.txt reference files for wording of the same rules. Course lessons not fetched | Three gates and seven documentation patterns into Rule 2 of `devtool-interface-design/data-viz-and-agents.md`; the llms.txt caveats into the existing Rule 1 playbook line; one clause in the parent's AX bullet and checklist. Skipped: tutoring modes, progress detection, per-lesson checklists, Next.js route-handler code, skill-authoring lessons, the content-fetching API. The source has no rules on auth, idempotency, pagination, or rate limits (listed only as course extensions) |
