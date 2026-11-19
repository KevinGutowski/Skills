# Sources

Provenance map for the `react` skill. All sources are Vercel-authored agent skills, read as untrusted source material and rewritten in this library's words; no scripts or prompt text were imported.

## Primary sources

- **vercel-labs/agent-skills** (MIT, stated in the repo README and each skill's frontmatter; no top-level LICENSE file in the checkout), https://github.com/vercel-labs/agent-skills, read at commit `1a2c79d` (2026-10-27).
  - `react-best-practices` v1.0.0 (metadata dated January 2026, "Vercel Engineering"): SKILL.md index, compiled AGENTS.md, 70 rule files in eight prefixed categories. Its own counts disagree (SKILL.md says 70 rules, metadata says "40+"); 70 rule files plus two scaffolding files were present.
  - `composition-patterns` v1.0.0 (January 2026): 8 rules.
  - `react-view-transitions` v1.0.0 (March 2026): SKILL.md plus five references (implementation, patterns, CSS recipes, Next.js, troubleshooting).
  - `react-native-skills` v1.0.0 (January 2026): SKILL.md index only was skimmed (36 rules); pointer in `nextjs`, no distillation.
- **vercel/next.js `skills/` directory** (MIT, repo license file), https://github.com/vercel/next.js/tree/canary/skills, canary read 2026-11-18 at `ad2642a9`. Six workflow skills: `next-dev-loop`, `next-bundle-optimizer`, `next-cache-components-adoption`, `next-cache-components-optimizer`, `next-partial-prefetching-adoption`, `next-partial-prefetching-optimizer`. SKILL.md bodies were read (the two longest in part); their rig/test templates and reference files were not.
- **vercel-labs/next-skills README** (pointer repo, read at `c522619`, 2026-09-16): states that Next.js reference knowledge moved into the bundled docs and the agent file `next dev` generates in 16.3+, and that workflow skills moved to vercel/next.js.
- **Vercel Web Interface Guidelines** (https://github.com/vercel-labs/web-interface-guidelines, rule file read 2026-11-18): its hydration-safety and input rules are not restated in this skill; the source-level sweep that flags them is `interface-review` (code-compliance-sweep).

## Sources the upstream skills cite (not read by this library)

- react.dev: "You Might Not Need an Effect", `cache`, `use`, `useTransition`, `useDeferredValue`, `useEffectEvent`, React Compiler, `<ViewTransition>`, resource preloading APIs.
- nextjs.org docs: authentication guide, `after`, output tracing, View Transitions, Prefetching, migrating to Cache Components, adopting Partial Prefetching, optimizing the static shell, Playwright testing.
- Vercel blog: "How we optimized package imports in Next.js", "How we made the Vercel dashboard twice as fast".
- Libraries named by rules: SWR, `better-all`, `lru-cache`.
- w3c/csswg-drafts issue 10930 (hit-testing of named view-transition participants); facebook/react PR 36690 (`parentEnter`/`parentExit`).

## Where the routed references came from

| Reference | Source files |
|---|---|
| `react-performance` | Rule IDs and titles generated from the frontmatter of upstream's 70 rule files (`react-best-practices`, `1a2c79d`). The "Checked by this library" items: Node 24 runs here and in review (unhandled promises, cached read), the upstream nested-fetching rule file, and the Next.js lazy-loading guide (fetched 2026-11-18). The earlier per-rule paraphrase was removed on 2026-11-18 |
| `react-composition` | `composition-patterns` SKILL.md and compiled AGENTS.md |
| `react-view-transitions` | https://react.dev/reference/react/ViewTransition (fetched 2026-11-18) for every behavioral statement; upstream `react-view-transitions` only for the three motion defaults this library overrides. The longer upstream-derived version was cut on 2026-11-18 after review found several of its claims wrong |
| `nextjs` | the six vercel/next.js SKILL.md files; vercel-labs/next-skills README; `react-native-skills` SKILL.md for the pointer section |
| Router core rules | the CRITICAL/HIGH rules of `react-best-practices`, `architecture-avoid-boolean-props`, the view-transition activation and placement rules |

## Corroboration inside this library

- `useTransition` / `useOptimistic` for instant-feeling UI, CSS-first animation and page-load entrances: `web-design` (web-performance), from independent talks. Its staleness note already flags React/Next.js specifics as 2024–25-era.
- Easing, duration and reduced-motion policy that the view-transition recipes must follow: `web-design` (web-animation-design). Three upstream defaults disagree with it; listed in `react-view-transitions` (Motion values and reduced motion).
- View Transitions as a mixed-tier performance item and interruption handling: `motion` (performance audit).
- Component API, variant and composition-model governance at the design-system level: `design-systems` (a neighbor, not corroboration of the specific patterns).

## Promotion rule

Promote a rule into the router only when it is tied to a current primary source (react.dev or the installed Next.js docs for the version in use), a verified project failure, or a repeated accepted review outcome. Upstream impact labels are Vercel's ranking, not evidence for a given codebase. Re-read upstream when its skill versions change or on each Next.js minor release; record the commit and date here.
