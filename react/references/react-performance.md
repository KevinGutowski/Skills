# React Performance by Impact

*Scope: the order in which to look for React/Next.js performance problems, an index of upstream's rule IDs so a review can cite them, and the few rules this library checked itself. This file was cut on 2026-11-18. It used to paraphrase each of upstream's 70 rules as a trap and a fix; seven review rounds kept finding those paraphrases wrong (a dropped `Promise.all`, a deferral that does not build, a cache that never retried), so the paraphrases were removed. Read a rule's own text upstream before applying it. Design-level performance doctrine (frame budgets, Core Web Vitals, fluid UI) is `web-design` (web-performance).*

## Contents

- [How to use the order](#how-to-use-the-order)
- [Rule index](#rule-index)
- [Checked by this library](#checked-by-this-library)
- [React Compiler](#react-compiler)
- [Look it up](#look-it-up)

## How to use the order

Categories are ranked by how much a fix usually buys. A sequential await costs a full round trip; an oversized initial bundle delays every interaction; a wasted re-render usually costs a fraction of a frame. Find the waterfalls and the bundle weight first, and reach the lower categories only when a profile points there. In review, list findings in this order even when the diff is mostly about re-renders.

Upstream's impact labels and numbers are Vercel's claims from its own codebases. Use them to rank, not to promise a result; measure the project. Categories 1 and 3 assume a server; in a client-only SPA, category 3 mostly does not apply.

## Rule index

IDs and titles are upstream's (vercel-labs/agent-skills at `1a2c79d`), generated from its rule files, not paraphrased. The full text of a rule, with incorrect and correct code, is `rules/<id>.md` in that skill: `npx skills add vercel-labs/agent-skills --skill vercel-react-best-practices`.

- **1. Waterfalls** (`async-`, critical): `async-api-routes` (Prevent Waterfall Chains in API Routes); `async-cheap-condition-before-await` (Check Cheap Conditions Before Async Flags); `async-defer-await` (Defer Await Until Needed); `async-dependencies` (Dependency-Based Parallelization); `async-parallel` (Promise.all() for Independent Operations); `async-suspense-boundaries` (Strategic Suspense Boundaries)
- **2. Bundle size** (`bundle-`, critical): `bundle-analyzable-paths` (Prefer Statically Analyzable Paths); `bundle-barrel-imports` (Avoid Barrel File Imports); `bundle-conditional` (Conditional Module Loading); `bundle-defer-third-party` (Defer Non-Critical Third-Party Libraries); `bundle-dynamic-imports` (Dynamic Imports for Heavy Components); `bundle-preload` (Preload Based on User Intent)
- **3. Server side** (`server-`, high): `server-after-nonblocking` (Use after() for Non-Blocking Operations); `server-auth-actions` (Authenticate Server Actions Like API Routes); `server-cache-lru` (Cross-Request LRU Caching); `server-cache-react` (Per-Request Deduplication with React.cache()); `server-dedup-props` (Avoid Duplicate Serialization in RSC Props); `server-hoist-static-io` (Hoist Static I/O to Module Level); `server-no-shared-module-state` (Avoid Shared Module State for Request Data); `server-parallel-fetching` (Parallel Data Fetching with Component Composition); `server-parallel-nested-fetching` (Parallel Nested Data Fetching); `server-serialization` (Minimize Serialization at RSC Boundaries)
- **4. Client data and listeners** (`client-`, medium-high): `client-event-listeners` (Deduplicate Global Event Listeners); `client-localstorage-schema` (Version and Minimize localStorage Data); `client-passive-event-listeners` (Use Passive Event Listeners for Scrolling Performance); `client-swr-dedup` (Use SWR for Automatic Deduplication)
- **5. Re-renders** (`rerender-`, medium): `rerender-defer-reads` (Defer State Reads to Usage Point); `rerender-dependencies` (Narrow Effect Dependencies); `rerender-derived-state-no-effect` (Calculate Derived State During Rendering); `rerender-derived-state` (Subscribe to Derived State); `rerender-functional-setstate` (Use Functional setState Updates); `rerender-lazy-state-init` (Use Lazy State Initialization); `rerender-memo-with-default-value` (Extract Default Non-primitive Parameter Value from Memoized Component to Constant); `rerender-memo` (Extract to Memoized Components); `rerender-move-effect-to-event` (Put Interaction Logic in Event Handlers); `rerender-no-inline-components` (Don't Define Components Inside Components); `rerender-simple-expression-in-memo` (Do not wrap a simple expression with a primitive result type in useMemo); `rerender-split-combined-hooks` (Split Combined Hook Computations); `rerender-transitions` (Use Transitions for Non-Urgent Updates); `rerender-use-deferred-value` (Use useDeferredValue for Expensive Derived Renders); `rerender-use-ref-transient-values` (Use useRef for Transient Values)
- **6. Rendering** (`rendering-`, medium): `rendering-activity` (Use Activity Component for Show/Hide); `rendering-animate-svg-wrapper` (Animate SVG Wrapper Instead of SVG Element); `rendering-conditional-render` (Use Explicit Conditional Rendering); `rendering-content-visibility` (CSS content-visibility for Long Lists); `rendering-hoist-jsx` (Hoist Static JSX Elements); `rendering-hydration-no-flicker` (Prevent Hydration Mismatch Without Flickering); `rendering-hydration-suppress-warning` (Suppress Expected Hydration Mismatches); `rendering-resource-hints` (Use React DOM Resource Hints); `rendering-script-defer-async` (Use defer or async on Script Tags); `rendering-svg-precision` (Optimize SVG Precision); `rendering-usetransition-loading` (Use useTransition Over Manual Loading States)
- **7. JavaScript micro-optimizations** (`js-`, low-medium): `js-batch-dom-css` (Avoid Layout Thrashing); `js-cache-function-results` (Cache Repeated Function Calls); `js-cache-property-access` (Cache Property Access in Loops); `js-cache-storage` (Cache Storage API Calls); `js-combine-iterations` (Combine Multiple Array Iterations); `js-early-exit` (Early Return from Functions); `js-flatmap-filter` (Use flatMap to Map and Filter in One Pass); `js-hoist-regexp` (Hoist RegExp Creation); `js-index-maps` (Build Index Maps for Repeated Lookups); `js-length-check-first` (Early Length Check for Array Comparisons); `js-min-max-loop` (Use Loop for Min/Max Instead of Sort); `js-request-idle-callback` (Defer Non-Critical Work with requestIdleCallback); `js-set-map-lookups` (Use Set/Map for O(1) Lookups); `js-tosorted-immutable` (Use toSorted() Instead of sort() for Immutability)
- **8. Advanced patterns** (`advanced-`, low): `advanced-effect-event-deps` (Do Not Put Effect Events in Dependency Arrays); `advanced-event-handler-refs` (Store Event Handlers in Refs); `advanced-init-once` (Initialize App Once, Not Per Mount); `advanced-use-latest` (useEffectEvent for Stable Callback Refs)

A current model already follows most of these without being told (with/without runs, 2026-11: parallel awaits, Suspense boundaries, lazy-loading, deferred analytics, literal `import()` paths). The index is for citing and for looking up the rule that fits, not for reading top to bottom.

## Checked by this library

Each of these was reproduced or checked against a primary source on 2026-11-18. They are the places where the obvious code is wrong.

- **A started promise needs a handler before the next `await`** (`async-parallel`, `async-api-routes`). `const configP = fetchConfig(); const session = await auth()` ends a Node 24 process if `fetchConfig()` rejects while `auth()` is pending, even inside `try`/`catch`. Hand every started promise to one `Promise.all`, chaining dependent calls off the promise they need. Two things that look similar are not: calling and awaiting each operation in turn (`await a(); await b()`) is safe but sequential, the waterfall again; starting both and then awaiting them one at a time (`const pa = a(); const pb = b(); await pa; await pb`) is the unsafe case, because `pb` can reject while `pa` is pending.
- **Per-item chains still need the outer `await Promise.all`** (`server-parallel-nested-fetching`). `await Promise.all(ids.map(id => getChat(id).then(c => getUser(c.author))))`. Without the outer call you hold an array of promises: the function returns at once and a rejected lookup escapes the caller's `try`/`catch`.
- **A promise handed to a child that renders later is unobserved until then** (`server-parallel-fetching`). Prefer fetching inside the component that awaits. If a promise must start early, attach `p.catch(() => {})` at creation; a later `await p` still throws (Node 24).
- **`next/dynamic` with `ssr: false` is an error in a Server Component** (`bundle-defer-third-party`; Next.js lazy-loading guide). A layout is a Server Component: put the dynamic import in a `'use client'` wrapper, or use `next/script`. Upstream's example does not say this.
- **A cached read must not cache its failure** (`server-hoist-static-io`). `cached ??= readFile(p).catch(e => { cached = undefined; throw e })`, started in the first request that needs it. A bare `cached ??= readFile(p)` returns the first error forever; a read started at module load and left unawaited ends the process if it rejects before a request arrives.

Stated by upstream and repeated in the router because the cost of missing them is high, but not tested here: `server-auth-actions` (a Server Action is a public endpoint; authorize inside it) and `server-no-shared-module-state` (no request data in module scope).

## React Compiler

Upstream marks manual memoization (`rerender-memo`) and static-JSX hoisting (`rendering-hoist-jsx`) as unnecessary when React Compiler is enabled. Confirm in the build config that it is on, not merely installed, and read the compiler's current docs before removing or adding `memo`, `useMemo` or `useCallback`. Do not strip existing memoization in an unrelated change.

## Look it up

- Upstream rule text: `rules/<rule-id>.md` in `vercel-react-best-practices`, or its compiled `AGENTS.md`.
- react.dev: "You Might Not Need an Effect", `useTransition`, `useDeferredValue`, `useEffectEvent`, `cache`, `use`, `<Activity>`, React Compiler.
- Next.js, installed docs first (see `nextjs`): `optimizePackageImports`, lazy loading, `next/script`, `after`, the authentication guide for Server Actions.
- A measured Next.js bundle audit: upstream `next-bundle-optimizer` (see `nextjs`).
