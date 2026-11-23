# Coverage Gaps

React/Next.js uncertainty kept out of the router body.

## Candidate gaps

- **Single vendor.** Every reference distills Vercel-authored skills (see [sources.md](sources.md)). They cite react.dev and nextjs.org, but this library has not re-verified the rules against react.dev or any non-Vercel source. Vendor lean shows in defaults: SWR for client fetching, `next/dynamic`, `after()`, Fluid Compute as the reason in-process LRU caches work, `better-all`. Treat library choices as "what the project already uses" and the impact labels as Vercel's ranking.
- **Version freshness.** Upstream `react-best-practices` and `composition-patterns` carry January 2026 metadata, `react-view-transitions` March 2026; read at a 2026-10-27 commit. The Next.js notes come from canary on 2026-11-18 and describe 16.3-era features (`cacheComponents`, `instant`, `partialPrefetching`, `prefetch = 'partial'`, `/_next/mcp`, `next analyze`, `@next/playwright` `instant()`). Canary skills can describe behavior that is not in the user's installed release. Re-check on each Next.js minor and each React minor.
- **Unverified version claims carried from upstream** (stated once, undated at the source): `ViewTransition`/`addTransitionType` stable in React 19.3; browser floors Chromium 125 / Firefox 144 / Safari 18.2; `transitionTypes` on `next/link` from Next.js 16.2.0; bundled docs from 16.2 and generated agent file from 16.3; `optimizePackageImports` behavior from 13.5; `agent-browser` 0.31.1 floor for `next-dev-loop`. `<Activity>` and `useEffectEvent` are named by upstream with no minimum version.
- **React Compiler scope.** Upstream attaches a compiler note to four rules only (`rerender-memo`, `rendering-hoist-jsx`, `rerender-split-combined-hooks`, `rerender-functional-setstate`). Which of the remaining `rerender-*` rules the compiler makes moot is this library's inference, not a sourced fact. The React Native skill has two compiler-specific rules that were not read.
- **Upstream inconsistencies noticed, not resolved here:**
  - `advanced-effect-event-deps` says Effect Event functions have no stable identity; `advanced-event-handler-refs` describes `useEffectEvent` as giving a stable function reference. Follow react.dev.
  - "`use()` replaces `useContext()`" (`react19-no-forwardref`) is stronger than this library can confirm; kept as "may use".
  - `bundle-defer-third-party` shows `next/dynamic` with `ssr: false` inside a root layout. Resolved 2026-11-18 against the Next.js lazy-loading guide: the option is an error in Server Components, and react-performance now says to use a client wrapper or `next/script`.
  - `client-event-listeners` and `client-passive-event-listeners` sit under "client-side data fetching" upstream though they are about listeners; `server-auth-actions` is a security rule in a performance guide. IDs kept as-is.
  - Rule counts differ between upstream files (70 vs "40+").
- **Motion values.** Upstream view-transition recipes disagree with `web-design` (web-animation-design) on duration ceiling, `ease-in` and reduced-motion policy. This skill defers to `web-design`; nobody has checked whether view-transition snapshots justify the longer morph durations upstream uses.
- **Non-Next.js frameworks.** React Router/Remix, TanStack Start, Astro islands and plain Vite SPAs are thin: no loader/action guidance, no router-specific data patterns, no `React.lazy`/route-splitting detail, no Vite or Rspack bundle analysis workflow. `server-*` rules are written against Next.js App Router. Pages Router gets one line.
- **Testing.** Nothing on component or hook testing (Testing Library, Vitest/Jest), mocking server components, or end-to-end beyond the `instant()` notes.
- **State management.** No guidance on choosing or using Zustand, Redux, Jotai, TanStack Query or URL state beyond "provider hides the implementation".
- **Forms.** No coverage of form actions, `useActionState`, `useFormStatus`, validation libraries or progressive enhancement. Form *design* is `web-design` (form-design).
- **Accessibility.** No React-specific a11y (focus management on route change, live regions with Suspense, `aria-*` with compound components). Doctrine is `web-design` (web-accessibility).
- **Also absent:** error boundaries and error handling strategy, TypeScript patterns for components, i18n, security beyond Server Action auth and `localStorage` hygiene, image and font optimization, virtualization libraries, the Next.js workflow skills' rig/test templates and reference files (not read), React Native (pointer only).
- **Evals: few runs, one case flat.** History in `docs/skill-evals-2026-11.md`. Latest run, all three cases at the same wording (after the 2026-11-18 cut): waterfall 6/6 against 5/6, composer 6/6 against 4/6, nested fetch 3/3 against 3/3. The nested-fetch case is a regression guard for an example that was once published wrong, not evidence the skill helps. One run per arm; if a weaker model is used, re-run before assuming the trimmed body is enough.

- **View transitions: short on purpose.** react-view-transitions was cut on 2026-11-18 to statements checked against react.dev that day, after three review rounds found upstream-derived claims wrong (blanket `default="none"`, a two-boundary requirement, every default boundary firing on each navigation). It no longer covers transition types, Next.js wiring, shared-element recipes or a symptom table; those are read from the primary sources. Nothing in it was run in a browser by this library.
- **Rule paraphrases removed.** react-performance is now the impact order, an index of upstream's rule IDs and titles, and five rules checked here. The per-rule trap/fix tables were removed on 2026-11-18 after seven reviews found errors in them; a reader must open the upstream rule to apply one. The router's core-rule bullets are the remaining paraphrase: the promise, Server Component, and composition bullets were exercised by evals or Node runs, while `React.cache` identity, the `lucide-react` typing note, serialization, and the compiler bullet are upstream's statements, unverified here.

- **Next.js notes removed.** nextjs no longer paraphrases Cache Components or Partial Prefetching behavior (a review built two of its claims on Next.js 16.3.8 and found them wrong), nor each workflow skill's requirements and outputs. It keeps where the docs live by version (from the next-skills README and the workflow skills, not re-checked on an installed project), a one-line chooser, and generic verification habits.

## Candidate promotion form

```markdown
Candidate:
Owning reference:
Primary source checked (react.dev page / installed Next.js doc path / upstream rule ID):
React and Next.js versions it was checked against:
React Compiler on or off:
Observed project failure or accepted review:
Rule:
Exception:
Status: proposed | accepted | rejected
```
