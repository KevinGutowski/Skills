# Next.js: Where the Knowledge Lives and Which Workflow Skill to Install

*Scope: Next.js App Router work. This file does not teach Next.js APIs: the framework ships its own agent-readable docs, and they outrank anything here. It says where to read and which of the six upstream workflow skills fits a task. Read 2026-11 (vercel/next.js canary); verify against the installed version.*

## Contents

- [Read the installed docs first](#read-the-installed-docs-first)
- [The six workflow skills](#the-six-workflow-skills)
- [Cache Components and Partial Prefetching](#cache-components-and-partial-prefetching)
- [Verification habits the workflow skills share](#verification-habits-the-workflow-skills-share)
- [React Native and Expo](#react-native-and-expo)
- [Look it up](#look-it-up)

## Read the installed docs first

Vercel retired its standalone Next.js reference skills (`next-best-practices`, `next-upgrade`, `next-cache-components`) so that guidance stays matched to the framework version. Which release ships what has shifted (an earlier table here by version number was wrong for 16.2), so look instead of assuming:

```bash
ls node_modules/next/dist/docs 2>/dev/null | head     # bundled, version-matched docs, if this release has them
ls AGENTS.md CLAUDE.md .next-docs 2>/dev/null         # agent rules or docs already written into the project
```

- Bundled docs present: read them; they outrank this skill.
- An `AGENTS.md` or `CLAUDE.md` that points at Next.js docs: follow it. Depending on the release it comes from `create-next-app` scaffolding or from `next dev`.
- Neither: upstream's README says `npx @next/codemod@canary agents-md` downloads version-matched docs into `.next-docs/` and points `AGENTS.md` at them. It writes into the user's repository: ask first.

- The bundled tree is numbered for ordering (for example `01-app/02-guides/…`). File names carry the number too (`08-caching.md`, `06-fetching-data.md`), so search with a wildcard: `find node_modules/next/dist/docs -name '*<slug>.md'` (a reviewer's 16.3.8 install returned nothing for the exact name).
- Error pages under `nextjs.org/docs/messages/*` are **not** bundled. Each build or dev-overlay error prints its link; fetch it, and if offline say so in the report.
- Upgrades: `npx @next/codemod@latest upgrade`, then the version upgrade guide in the docs. There is no upgrade skill any more.
- Check the version before anything else (`next --version` or `package.json`). The workflow skills state their own version floors.

## The six workflow skills

Install all with `npx skills add vercel/next.js`, or one with `--skill <name>`. They are procedures with gates, versioned with the framework; install the one the task matches and follow it. Their own text states the versions and packages each needs, which this file does not repeat.

| Skill | Use when |
|---|---|
| `next-dev-loop` | Confirming an edit works in the running app, not just that it compiles |
| `next-bundle-optimizer` | Slow route startup, oversized client bundles, duplicate browser dependencies, features that could wait for interaction |
| `next-cache-components-adoption` | Turning on Cache Components or migrating to it |
| `next-cache-components-optimizer` | A route's first paint or a client navigation is not instant |
| `next-partial-prefetching-adoption` | Turning on Partial Prefetching |
| `next-partial-prefetching-optimizer` | Choosing what a specific link has ready before the click |

- Order: Cache Components adoption → its optimizer → Partial Prefetching adoption → its optimizer.
- Pages Router only (`pages/` and no `app/`): the Cache Components and prefetching skills do not apply. Say so.
- The rules indexed in `react-performance` apply before and alongside these. Browser verification outside Next.js → `browser-verification`.

## Cache Components and Partial Prefetching

Not paraphrased here. An earlier version of this file listed about fifteen behaviors taken from the upstream workflow skills (what blocks a prerender, which values fail the build, how prefetch policies resolve). A review on 2026-11-18 built two of them on Next.js 16.3.8 and found them wrong: a page awaiting a param supplied by `generateStaticParams` prerendered, and so did a cached page rendering `new Date()`. The list was removed rather than corrected line by line, because these rules change between minor releases.

- Read the installed guides: the caching guide, "migrating to Cache Components", and the Partial Prefetching adoption and optimization guides under `node_modules/next/dist/docs/`.
- For hands-on work, install the matching workflow skill from the table above and follow it; it is versioned with the framework.
- Two things that are safe to carry in your head: both features are flag-level changes to how routes prerender and prefetch, so adopt them route by route with a failing check first; and automatic link prefetching only runs in production builds, so verify prefetch behavior against a production-like build, not `next dev`.

## Verification habits the workflow skills share

Worth adopting even without installing them:

- A passing compile or build is not proof of behavior; streaming and prefetching are runtime properties. Verify in a browser after each fix.
- Make the test fail first for the right reason, fix, then revert only the fix to confirm it fails again.
- One small change at a time, compared on the same metric and scope; revert what does not improve it.
- Build evidence (analyzer output) is not runtime evidence (requests, timing). Label which one a claim rests on.
- Report in terms of what the user sees before and after, not the internal step names.

## React Native and Expo

Not distilled here. Install upstream: `npx skills add vercel-labs/agent-skills --skill vercel-react-native-skills`. The web rules in this skill do not transfer wholesale to React Native.

## Look it up

- Installed docs: migrating to Cache Components, caching, revalidating, streaming, instant navigation, optimizing the static shell, adopting Partial Prefetching, optimizing prefetching, prefetching, Playwright testing (`instant()`), AI agents setup.
- Upstream skills: https://github.com/vercel/next.js/tree/canary/skills
- Why the old skills moved: https://github.com/vercel-labs/next-skills (README).
