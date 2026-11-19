# React Composition

*Scope: the shape of a component's API — when flags, render props and trapped state should become composed parts. Distilled from Vercel `composition-patterns` (8 rules). Rule IDs are upstream's; full code is upstream (install line in the router). Visual design of the component is `frontend-design`; design-system governance is `design-systems`.*

## When this applies

Reach for these patterns when at least one is true:

- A component takes several booleans that select a mode (`isThread`, `isEditing`, `isDMThread`, `isForwarding`), and the body is nested ternaries on them.
- The task is "add one more variant" to such a component.
- A sibling or a parent needs the component's state or actions (a submit button outside the form frame, a preview next to an editor) and the code reaches for refs, an `onChange` mirror or an effect that syncs state upward.
- A component takes `renderHeader`, `renderFooter`, `renderActions` props to customize static structure.
- You are designing a component other teams will reuse. The library-level contract for such a component (prop pass-through, merged `className`, `asChild`, data-attribute state hooks, controlled/uncontrolled trios, package vs copy-in registry) is in `design-systems` (component-api-contracts); this file covers the React mechanics of composing it.

Do not apply them to a leaf component with one or two orthogonal visual flags (`disabled`, `size`, `loading`). A boolean that toggles a style or a state is fine; a boolean that swaps *what is rendered or which behavior runs* is the smell. Do not refactor a working flag-based component in passing: propose it, or do it when the requested change would add another mode.

## The four moves

**1. Stop adding mode booleans (`architecture-avoid-boolean-props`).** Each mode flag doubles the states the component can be in, and most combinations are meaningless (`isEditing && isForwarding`). The fix is not a `mode` enum inside the same monolith; it is to split the monolith into parts and let each use case assemble its own.

**2. Compound parts with a shared context (`architecture-compound-components`).** Export the pieces — frame, header, input, footer, submit, and the optional extras — and let them read shared state from context instead of props. A consumer composes exactly the parts it wants; there are no hidden conditionals.

```tsx
<Composer.Frame>
  <Composer.Input />
  <AlsoSendToChannelField id={channelId} />   {/* only the thread variant has this */}
  <Composer.Footer><Composer.Formatting /><Composer.Submit /></Composer.Footer>
</Composer.Frame>
```

**3. The provider is the state interface (`state-lift-state`, `state-context-interface`, `state-decouple-implementation`).**

- Lift state out of the visual component into a provider. Anything inside the provider can read state and call actions, including components that are not visually inside the frame. The provider boundary is what matters, not the visual nesting.
- Give the context one generic shape: `state`, `actions`, `meta` (refs and other handles). Parts depend on that shape only.
- Only the provider knows *how* state is kept. One provider uses `useState`, another a global store synced to the server; the same parts work under both. Swapping the provider swaps the behavior without touching the UI.
- Replaces three workarounds: an effect that copies child state up to the parent, a ref the parent reads on submit, and prop drilling through layers that do not use the value.

**4. Explicit variants (`patterns-explicit-variants`).** Name each use case as its own small component — `ThreadComposer`, `EditMessageComposer`, `ForwardMessageComposer` — that picks a provider and composes the parts. The call site then says what it renders; no reader has to work out which flag combination is valid, and impossible states cannot be expressed.

## Children or render props (`patterns-children-over-render-props`)

- Static structure (a header, a footer, a set of actions): pass `children` and compose parts. `renderHeader={() => ...}` props are harder to read and force the consumer to learn callback signatures.
- The parent must hand data back to the caller (a list giving each row its `item` and `index`, a virtualizer): a render prop is the right tool. Keep it.

## React 19 notes (`react19-no-forwardref`)

As of upstream 2026-10, for React 19 and later only — check the installed `react` version first and verify against current docs:

- `ref` is an ordinary prop on function components, so new components do not need `forwardRef`.
- `use(Context)` reads context and, unlike `useContext`, may be called conditionally. Upstream phrases this as "`use()` replaces `useContext()`"; this library has not confirmed that react.dev treats `useContext` as superseded (see [coverage-gaps.md](coverage-gaps.md)), so prefer `use` in new React 19 code where it helps and leave working `useContext` calls alone.

On React 18 and earlier, skip this section entirely. Do not mass-migrate `forwardRef` in an unrelated change.

## Refactoring a flag-heavy component: order of work

1. List the real use cases (call sites), not the flag combinations. Each becomes a named variant.
2. Extract the parts the variants share; move per-variant extras out of the monolith.
3. Move state and actions into a provider with the `state` / `actions` / `meta` shape; parts read from context.
4. Write each variant as provider + composed parts; migrate call sites one variant at a time.
5. Before calling a new variant done, list what each existing flag changed (extra rows, validation, submit target, disabled rules) and decide for every item whether the variant keeps it. A 2026-11 eval run of this skill built a clean scheduled-message variant that dropped the thread's "also send to channel" row and reused the old component's export name for the new compound object. A variant that loses behavior, or two things with one name, is a regression.
6. Delete the flags last, once no call site passes them. Keep the old export as a thin wrapper if other packages depend on it. The wrapper must reproduce flag *combinations*, not just single flags: a first-match chain (`if (isEditing) return <Edit…/>`) drops what a second flag added (an edit inside a thread still showed the thread's row). Either pass the combined behavior through to the variant or list the combinations call sites actually use and cover those.

## Review prompts

- Would the requested change add a boolean that changes what renders? Propose a variant instead.
- Is there an effect whose only job is to push state to a parent, or a ref the parent reads to get child state? Lift into a provider.
- Does a part import the store or hook that implements state, rather than the context interface? Decouple it.
- Are `renderX` props used where `children` would do?
- Does the code use `forwardRef` or `use` in a way that matches the installed React version?

## Look it up

- Upstream `composition-patterns` (`rules/<rule-id>.md`) for the full composer example.
- react.dev: "Passing Data Deeply with Context", `use`, `forwardRef` (React 19 notes).
