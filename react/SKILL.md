---
name: react
description: "React and Next.js implementation and review: fetch waterfalls, bundle size, Server Components and Server Actions, re-renders and effects, component composition, view transitions, Next.js workflow skills. Distinctive UI → frontend-design; CSS craft, motion values, Web Vitals → web-design; motion/react → motion; Rails → rails; browser checks → browser-verification. Triggers: React, Next.js, RSC, Suspense, useEffect, re-render, ViewTransition."
---

# React and Next.js Implementation

Rules for React code that loads fast, stays correct on the server and is easy to extend. This skill owns **React/Next.js implementation and code review**; what the UI should look like, CSS craft and motion values belong to the neighbors listed at the bottom.

**Sources/gaps:** [references/sources.md](references/sources.md) maps provenance (Vercel's agent skills and the Next.js workflow skills, read 2026-10/11); [references/coverage-gaps.md](references/coverage-gaps.md) holds the single-vendor, version-freshness and non-Next.js risks.

**Installed docs outrank this skill.** In a Next.js project, look for bundled docs (`node_modules/next/dist/docs/`) and an `AGENTS.md` or `CLAUDE.md` that points at them, and read the matching page before trusting anything here (`nextjs` has the commands). For React APIs, check react.dev against the installed `react` version.

**Full upstream rule text** (incorrect/correct code for every rule ID cited here): `npx skills add vercel-labs/agent-skills --skill vercel-react-best-practices` (also `vercel-composition-patterns`, `vercel-react-view-transitions`, `vercel-react-native-skills`; the selector is the frontmatter name, which carries a `vercel-` prefix the directory lacks); Next.js workflow skills: `npx skills add vercel/next.js`. Rule IDs such as `async-parallel` are upstream's and stay stable so reviews can cite them.

## How to work

1. Read the project first: `react` and `next` versions, framework and router (App Router, Pages Router, React Router/Remix, TanStack Start, Vite SPA), whether Server Components exist, whether React Compiler is on, the data library in use (SWR, TanStack Query, none). Match what is there; do not add a library to apply a rule.
2. Fix by impact, in this order, and stop when the problem is gone: **waterfalls → bundle size → server-side → client data fetching → re-renders → rendering → JS micro-optimizations → advanced patterns.** A memoization pass on a page with three sequential awaits is wasted work.
3. Change the least code that fixes the problem. Do not migrate working code to a newer API (`use`, `ref` as a prop, `<Activity>`, `<ViewTransition>`) unless asked or the old pattern is the bug; guard every new API on the installed version.
4. Server-only rules (`server-*`, `after()`, Server Actions, cache components) apply only where the framework has them. In a client-only SPA, skip them and say so.
5. Say how a performance claim was checked (bundle analyzer before/after, network panel, React Profiler, production build). The savings numbers in upstream rules are Vercel's, not measurements of this project. Runtime checks in a real browser → `browser-verification`.

## Core rules (the ones agents most often miss)

- **Sequential awaits are the first thing to look for** (`async-parallel`, `async-api-routes`, `async-dependencies`). Independent calls start together; with a partial dependency, start the independent promise first and chain the dependent call off the promise it needs. Do not `await` one promise while another sits unobserved: if `fetchConfig()` rejects during `await auth()`, nothing is handling it yet and Node ends the process on the unhandled rejection (checked on Node 24), even inside a `try`/`catch`. The fix is to hand every started promise to `Promise.all` in the same statement, not to await them one after another, which brings the waterfall back:
  ```ts
  const configP = fetchConfig()                                   // in flight now
  const dataP = auth().then(session => fetchData(session.user.id)) // chained off the one promise it needs
  const [config, data] = await Promise.all([configP, dataP])       // both handed to Promise.all at once
  ```
  Also: do the cheap synchronous check and the early return before any await (`async-defer-await`, `async-cheap-condition-before-await`); in a per-item chain, chain inside the map so one slow item does not hold the rest (`server-parallel-nested-fetching`).
- **In a Server Component, parallel and safe looks like this** (`server-parallel-fetching`, `async-suspense-boundaries`): independent calls the page itself needs go in one statement, `const [session, config] = await Promise.all([auth(), fetchConfig()])`; each slow section is then a sibling async component that awaits its own fetch inside `<Suspense>`. Two ways to get it wrong: a parent that awaits and then renders an async child that awaits is sequential; so is splitting independent calls between the page and its children (the page awaits config, the children call `auth()`), even though nothing is left dangling. Avoid starting a promise in the parent and passing it down; if you must, attach `p.catch(() => {})` at creation, because it has no handler until the child renders (the child's `await p` still throws). Keep data that decides layout or is above-the-fold SEO content out of a fallback.
- **A Server Action is a public endpoint** (`server-auth-actions`). Validate input, authenticate and authorize inside every action; middleware, layout or page guards do not cover it.
- **Module scope on the server is shared by all requests** (`server-no-shared-module-state`). Never stash the current user or any request data in a module-level `let`. Static assets and correctly keyed caches may live there (`server-hoist-static-io`, `server-cache-lru`).
- **Props that cross from a Server Component into a Client Component are serialized into the response** (`server-serialization`, `server-dedup-props`). This is about that boundary only; props passed between components already on the client add nothing to the payload. Pass the fields the client uses, not the 50-field record; do not pass both a list and a sorted/filtered copy of it.
- **`React.cache()` dedupes per request and keys by argument identity** (`server-cache-react`). An inline object argument never hits; pass primitives. It is for database, auth and other non-`fetch` work; it does not persist across requests.
- **Barrel imports** (`bundle-barrel-imports`): in Next.js keep the normal named import and rely on `optimizePackageImports` (check the installed docs for which packages are covered); elsewhere import the module path directly. Do not hand-write deep `dist/` paths without checking the package ships types for them — `lucide-react` does not.
- **Cite, don't re-teach.** With/without runs (2026-11) showed a current model already parallelizes independent awaits, adds Suspense boundaries, lazy-loads heavy client code, defers analytics, and keeps `import()` paths literal without this skill. Those rules, and the equally familiar ones on effects and inline components, are not restated here: use the IDs in review (`bundle-dynamic-imports`, `bundle-defer-third-party`, `bundle-analyzable-paths`, `rerender-derived-state-no-effect`, `rerender-move-effect-to-event`, `rerender-no-inline-components`) and read the rule upstream (react-performance indexes them). The bullets in this list are the ones a baseline run got wrong or that depend on facts it cannot infer.
- **Check for React Compiler before adding or reviewing `memo`/`useMemo`/`useCallback`.** As of upstream 2026-10, with the compiler on, manual memoization and static-JSX hoisting are unnecessary (verify against current docs). Compiler or not: functional `setState` for updates based on previous state (`rerender-functional-setstate`), no `useMemo` around a trivial primitive expression, `toSorted()` instead of `sort()` on props/state (`js-tosorted-immutable`), and `cond ? <X/> : null` when `cond` can be `0` (`rendering-conditional-render`).
- **Boolean props that pick a mode are a design smell** (`architecture-avoid-boolean-props`). When a change would add another, stop: build compound parts with a shared provider and name each variant as its own component. See `react-composition`.
- **`<ViewTransition>`:** only updates made in a Transition animate, a boundary animates for its own enter/exit, a mutation inside it, or a sibling moving it (not on every transition), and `default="none"` switches off every trigger you do not list, including `share`. Check react.dev for the installed version before relying on more than that; see `react-view-transitions`.

## References (read the one the task needs)

- [references/react-performance.md](references/react-performance.md) — read when reviewing or writing for performance: the impact order, an index of upstream's 70 rule IDs and titles for citing, and the five rules this library checked itself (unhandled promises, nested `Promise.all`, `ssr: false`, cached reads). Rule text lives upstream.
- [references/react-composition.md](references/react-composition.md) — read when a component grows flags, render props or prop drilling, or when designing a reusable component API: compound components, provider as the state interface, explicit variants, children vs render props, React 19 `ref`/`use` notes.
- [references/react-view-transitions.md](references/react-view-transitions.md) — read before adding or debugging `<ViewTransition>`: a short, react.dev-checked list of what makes a boundary animate, `default="none"` semantics, this library's motion positions, and where the full patterns live.
- [references/nextjs.md](references/nextjs.md) — read for any Next.js App Router task: where current Next.js knowledge lives (installed docs by version), which of the six upstream workflow skills fits a task, shared verification habits, React Native pointer.
- [references/sources.md](references/sources.md) and [references/coverage-gaps.md](references/coverage-gaps.md) — read before promoting a rule, or when a rule here disagrees with the installed docs.

## Review checklist

1. Waterfalls: sequential awaits with no dependency; parent await before an async child; a fetch that blocks the whole page instead of one Suspense boundary.
2. Bundle: heavy client module in the initial route; barrel import without `optimizePackageImports`; third-party script or analytics loaded before hydration; non-literal `import()` path.
3. Server boundary: Server Action without its own auth and validation; request data in module scope; oversized or duplicated props into client components; logging or analytics awaited before the response where `after()` exists.
4. Client data: per-component `useEffect` fetches with no dedupe; unversioned or unguarded `localStorage`; scroll/touch listeners that never call `preventDefault()` but are not passive.
5. State and effects: derived state stored in state; event logic modelled as state plus effect; component defined inside a component; app-wide init in a mount effect.
6. Rendering: hydration mismatch or flash from client-only data; `&&` with a numeric condition; long list with no `content-visibility` or virtualization.
7. API shape: mode booleans, `renderX` props for static structure, state trapped in a component that siblings need.
8. Version fit: every React 19 / Next.js 16 API used exists in the installed version; nothing dated here contradicts the installed docs.

Quote the line and cite the rule ID. Report by impact order, not file order.

**Boundary splits:** what the UI looks like, distinctive visual direction → `frontend-design` · CSS, layout, typography, easing/duration values, Core Web Vitals and fluid-UI doctrine → `web-design` (web-performance, web-animation-design) · animation with the `motion/react` library → `motion` · Rails, Hotwire, Inertia → `rails` · driving a real browser to verify behavior → `browser-verification` · component-library API contracts and how a library ships → `design-systems` (component-api-contracts) · React Native and Expo → install upstream `vercel-react-native-skills` (pointer in `nextjs`).
