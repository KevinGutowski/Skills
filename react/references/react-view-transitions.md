# React View Transitions

*Scope: deciding whether and where to use React's `<ViewTransition>`, and the handful of behaviors that decide whether an animation runs. This file is deliberately short. An earlier, longer distillation of Vercel's `react-view-transitions` skill carried several claims that turned out wrong against React's reference and browser tests, so it was cut on 2026-11-18 to statements checked against react.dev that day plus this library's own positions. For patterns, recipes and Next.js wiring, read the primary sources under "Look it up".*

## Before writing any

- **Check that the API exists in the installed React**, and how the framework enables it. Availability has changed between releases; read the installed version's docs, not this file.
- **Decide whether the interaction should move at all.** That is a design question for `web-design` (web-animation-design). Upstream's skill says to implement every pattern that fits; here that is a ceiling, not a target. High-frequency actions usually should not animate.
- **Durations, easings and the reduced-motion policy come from `web-design` (web-animation-design)**, not from upstream's recipes, which use 400 ms moves, `ease-in` on entering content, and zero all motion under reduced motion. The library keeps UI motion under 300 ms unless a reason is written down, does not use `ease-in` on UI, and under reduced motion removes movement but keeps a fade that carries meaning. React does not disable these animations for you: write the `prefers-reduced-motion` rule.

## What decides whether a boundary animates (react.dev, checked 2026-11-18)

- **Only updates in a Transition activate it:** `startTransition`, a `<Suspense>` reveal, `useDeferredValue`, and router navigations built on them. A plain `setState` does not.
- **`enter` / `exit`:** the boundary is the first component inserted or deleted in that Transition, and it is placed before any DOM nodes in the inserted or deleted subtree.
- **`update`:** React mutates DOM inside the boundary, or an immediate sibling changes the boundary's size or position. With nested boundaries, a mutation applies to the inner one, not the parent.
- **`share`:** a named boundary in a deleted subtree and another with the same name in an inserted subtree, in the same Transition, animate as one shared element.
- **React is conservative:** an update elsewhere does not animate every boundary on the page. When a region animates unexpectedly, find which of the triggers above fired for it.
- **A boundary animates as one image** that is moved, scaled and cross-faded. Elements inside it do not animate individually; to animate list items on reorder, each item needs its own boundary.

## `default="none"` and opting out

- `default` sets the animation for every trigger you do not set; `"none"` disables them. So `default="none"` with no `share` on a named boundary means the pair never morphs.
- To keep one region still while its parent still animates, put `update="none"` on an inner boundary around it.
- Use either to silence a specific unwanted animation. Do not add `default="none"` to every boundary as a default posture.

## When it does not run

Work through the list above in order: was the update in a Transition; is the boundary placed before any DOM node; did anything inside it or beside it actually change; is a nested boundary taking the mutation; did `default="none"` switch off the trigger you wanted; for a shared pair, were both names present in the same Transition. Then check it in a real browser on a production build (`browser-verification`), since dev and production can differ.

## Look it up

- https://react.dev/reference/react/ViewTransition — triggers, props, classes, caveats, list and shared-element examples. Authoritative.
- https://react.dev/reference/react/addTransitionType — transition types for direction-specific animations.
- In a Next.js project: the view-transition pages in the installed docs (`node_modules/next/dist/docs/`), which state how the framework enables the API and any `next/link` props for it.
- Upstream's fuller pattern catalog and CSS recipes: `npx skills add vercel-labs/agent-skills --skill vercel-react-view-transitions`. Treat its behavioral claims as leads to verify against react.dev; take motion values from `web-design` (web-animation-design).
