# Component API Contracts and Distribution

*Scope: the code-library layer of a design system: what to call each artifact and who owns it, the contract every exported part keeps with its consumers, and how the library ships (package or copy-in registry). Distilled from Vercel's components.build spec (Hayden Bleasel and shadcn; read 2026-11-18 at `0861fbc`). Examples are React and TypeScript; much of the styling and distribution detail is the shadcn/Radix/Tailwind convention and is labeled where it is. React mechanics (compound parts, providers, flag refactors) are `react` (react-composition). Accessibility doctrine is `web-design` (web-accessibility). Which primitive library to install is `frontend-design` (ui-library-picks). Provenance: [sources.md](sources.md).*

## Contents

- [When this applies](#when-this-applies)
- [Vocabulary that settles ownership](#vocabulary-that-settles-ownership)
- [The element contract](#the-element-contract)
- [Changing the rendered element: `as` or `asChild`](#changing-the-rendered-element-as-or-aschild)
- [State: controlled and uncontrolled](#state-controlled-and-uncontrolled)
- [Styling hooks: data attributes, classes, tokens](#styling-hooks-data-attributes-classes-tokens)
- [Distribution: package or copy-in registry](#distribution-package-or-copy-in-registry)
- [Documentation contract](#documentation-contract)
- [Do not copy the spec's code](#do-not-copy-the-specs-code)
- [Scoped positions and conflicts](#scoped-positions-and-conflicts)
- [Review checklist](#review-checklist)
- [Look it up](#look-it-up)

## When this applies

- Building or reviewing a component that other teams or other repositories will consume.
- Deciding whether a piece of UI belongs in the core library, an extension library, or a product repository.
- Choosing how the library ships, or adding a component to a shadcn-style registry.
- Auditing an existing library for the reasons consumers detach from it: props that do not pass through, styles that cannot be overridden, state that cannot be driven from outside.

It does not apply to a one-off product component with a single call site. Local evidence says to codify late: let a few real uses shape the API first (Briggs, in [field-notes](field-notes.md#dive-club-deltas--full-quotes)). The contract below is what a component owes once it is promoted.

## Vocabulary that settles ownership

The spec's taxonomy, plus an owner column that is this library's **default**, accepted 2026-11-18. The spec defines the terms and assigns no owners; the column applies the federated model in SKILL.md (core team, extension libraries, product teams). Use it as the starting assignment and change it to fit the org: with no core team, "core" means whoever maintains the shared package, and a block that three products have copied without editing is a candidate to promote to a component.

| Artifact | What it is (spec) | Reused how | Default owner (local) | Ships as |
| --- | --- | --- | --- | --- |
| **Primitive** | Behavior and accessibility with no styling: focus management, keyboard interaction, layering, ARIA wiring. One responsibility. | Imported | Adopted, not written. The core team owns the choice of library and the upgrade. | Package |
| **Component** | A styled, reusable unit: a primitive plus visual design, or elements composed into one finished control. | Imported | Core design-system team. | Package, or copy-in for open-source libraries |
| **Pattern** | A documented solution to a recurring problem (inline form validation, confirming a destructive action). It is documentation: behavior, keyboard map, failure modes. | Read | Design-system team, as guidance. | Docs |
| **Block** | An opinionated composition for one concrete use case (pricing table, auth screen). Trades generality for speed. | Copied, then edited | The product team that copies it. | Copy-in |
| **Page / Template** | One route made of blocks; a multi-page scaffold with routing, providers and project structure. | Forked | Whoever forks it. | Starter repository |
| **Utility** | Non-visual helper (hook, class utility, focus scope). Side-effect free, testable alone, tree-shakable. | Imported | Core team. | Package |

Why the distinction matters:

- **It answers "should this be in the design system?"** A pricing table is a block. Putting it in the core package makes the core team own product copy and layout. Local evidence agrees: primitives beat "the 20th card component" (Atlassian, in [field-notes](field-notes.md#field-operations-details-atlassian-booking-github-back-market--config-2024)).
- **It picks the distribution model.** Things that are imported need versions. Things that are copied and edited need a clean starting point and no promise of updates. A block is "typically not reusable like a component. You don't import them" (Rob Austin's note in the spec).
- **A pattern is the layer a component library lacks.** This is the same gap Worboys names in SKILL.md's counter-positions (patterns as rules). A pattern may have reference implementations, but the deliverable is the written behavior.
- **Blocks keep data outside.** A block takes data through props and stubs domain logic as handlers. It does not fetch internally unless it documents an adapter. A block with a hidden fetch cannot be previewed, tested or re-pointed.

Terms that are used loosely elsewhere, including in this skill's own sources:

- **Primitive.** In the spec it means strictly headless. Coinbase's "primitives → complex components → product components" ladder and Atlassian's layout primitives (both in field-notes) use the word for basic building blocks that may be styled. When someone says "primitive", ask whether it carries styling before deciding who owns it.
- **Registry.** A component registry is a catalog of source files with metadata and install instructions. It is not a package manager, and it is not the npm registry. The spec uses the word for both in one heading; keep them apart.
- **Variant.** See [Scoped positions and conflicts](#scoped-positions-and-conflicts).
- **Widget.** The spec avoids the word. Say component or pattern.

## The element contract

These are the rules an agent most often breaks when it writes a library component. Each one is a reason consumers fork or wrap a component instead of using it.

1. **One exported part renders one element.** A `Card` that takes `title`, `description` and `footer` props owns four elements, so the consumer cannot restyle the header, change the heading level or add an attribute without a new prop. Export `Card`, `CardHeader`, `CardTitle`, `CardFooter` and let each take its own props. How the parts share state is `react` (react-composition). A prop that takes one leaf node (an `icon`) is fine; a prop that takes a region is a missing part.
2. **Each part accepts every native prop of the element it renders.** Type the props as the element's own props plus yours, and spread the rest onto the element. `id`, `aria-*`, `data-*`, event handlers and `style` then work without the library anticipating them.
3. **Export the prop types**, named `<Part>Props`. Consumers need them to wrap the part, extend it, or read one prop's type. An unexported type gets re-declared by hand and drifts.
4. **Do not shadow native attribute names.** A custom `title: string` on a `div`-based part collides with the HTML `title` attribute. Pick `heading`. The same goes for `color`, `type`, and `size` on inputs.
5. **Merge `className` and `style`; never let one side replace the other.** Take them out of the rest object first. Leaving `className` inside `...props` and spreading afterwards silently discards the merged value (the spec's own typography example has this bug).
6. **Order decides who wins.** Put defaults before the spread so the consumer can override them. Put anything the component cannot work without after the spread. An internal `onClick` written before `{...props}` is replaced, not joined, the moment a consumer passes `onClick`. Compose it instead. Letting the consumer cancel the internal step with `preventDefault()` is the Radix convention:

```tsx
export type DisclosureTriggerProps = React.ComponentProps<"button">;

export function DisclosureTrigger({ className, onClick, ...props }: DisclosureTriggerProps) {
  const { open, toggle } = useDisclosure();
  return (
    <button
      type="button"                      // default: consumer may override
      data-slot="disclosure-trigger"
      {...props}
      aria-expanded={open}               // invariant: after the spread
      data-state={open ? "open" : "closed"}
      className={cn("disclosure-trigger", className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) toggle();
      }}
    />
  );
}
```

The spec states only "spread props last" and its examples differ on what goes before and after. The default/invariant split is this library's rule, accepted 2026-11-18: it follows from how a JSX spread resolves (later attributes win) and matches how Radix composes handlers. Exception: a prop the consumer must be able to control fully (a controlled `open`, an `aria-label`) is never an invariant; only attributes the component computes from its own state go after the spread.

7. **Refs must reach the element. How depends on the React version.** The spec types parts with `React.ComponentProps<"div">` and uses no `forwardRef`, which forwards a ref only where `ref` is an ordinary prop (React 19 and later, as of the source's 2026-11-10 commit). Its npm example declares a peer range of React 18, where a function component never receives `ref` and the consumer's ref is dropped without an error. Read the library's peer range and the installed `react` version before choosing, and verify against current React docs. Version notes live in `react` (react-composition).
8. **Document custom props in the type** (JSDoc with the default). The props table should be generated from it.
9. **Name parts and props the same way across the library.** `Root`, `Trigger`, `Content`, `Header`/`Body`/`Footer`, `Title`/`Description` are the Radix and shadcn names. Any fixed vocabulary works; the rule is that a consumer who knows one component can guess the next. Booking's "design API" in field-notes is the same idea applied to prop names.

## Changing the rendered element: `as` or `asChild`

Both let a consumer pick the element. They are different contracts; offer one per component.

| | `as` prop | `asChild` (Radix convention, adopted by shadcn/ui) |
| --- | --- | --- |
| Call site | `<Text as="h2">` | `<Trigger asChild><Link href="/x" /></Trigger>` |
| What happens | The component renders the tag you name | The component renders nothing of its own and merges its props, handlers and ref onto its single child |
| Good for | Layout and typography parts that switch between plain HTML tags | Putting a behavior onto the consumer's own component: a router link, the design system's `Button` as a dialog trigger |
| Cost | Full generic typing is heavy; handlers and refs are a plain spread | Needs a slot utility; fails silently when the child does not cooperate |

Rules:

- **For `as`, prefer a closed union of tags** (`"div" | "section" | "article"`) over an open generic unless consumers truly need arbitrary components. Default to the semantic element for the common case, not `div`.
- **For `asChild`, use the primitive library's slot utility. Do not write a `cloneElement` merge by hand.** The spec's simplified version lets the child's props overwrite the parent's and merges only `onClick`; a real slot also joins class names, merges styles, composes every handler and forwards the ref.
- **The child of an `asChild` part must be exactly one element that spreads its props and accepts a ref.** A fragment, two children, a string, or a component that ignores its props means the behavior never attaches, usually with no error. With a conditional child, both branches must qualify.
- **Neither prop repairs semantics.** Rendering a button's behavior onto a `div` still needs a role, a tab stop and key handling, and HTML nesting rules still apply (no button inside a button). Prefer the real element. Doctrine is `web-design` (web-accessibility).
- **Follow the primitive library the project already has.** `asChild` is one vendor family's answer. Base UI, the pick in `frontend-design` (ui-library-picks), exposes a `render` prop for the same job (not from this source; check its docs). Do not add a second slot mechanism to a codebase.

## State: controlled and uncontrolled

- **A reusable stateful component supports both modes.** Uncontrolled (it keeps its own state from a `default…` prop) is the easy path. Controlled (the parent passes the value and receives change requests) is what forms, URL state and tests need.
- **Use one prop trio per piece of state, and make all three optional:** `value` / `defaultValue` / `onValueChange`, `open` / `defaultOpen` / `onOpenChange` (Radix naming). The spec's merged example types all three as required, which defeats the purpose.
- **Call the change callback in both modes.** A consumer may listen without controlling.
- **`undefined` means uncontrolled.** So `undefined` cannot also mean "no selection"; use `null` or an empty value. A component must not switch mode during its lifetime. (These two are general React practice, not stated in the spec.)
- **The merge hook.** The spec installs `@radix-ui/react-use-controllable-state` and in the same paragraph says Radix does not intend it for public use. Treat it as a pattern to implement or vendor (it is small), or use the hook the project's primitive library documents. Do not add a dependency on another library's internals to a design system.
- Lifting state into a provider so siblings can read it is `react` (react-composition).

## Styling hooks: data attributes, classes, tokens

The spec's styling pages describe the shadcn stack: Tailwind, `clsx` + `tailwind-merge` wrapped as `cn`, `cva` for variants, CSS variables for tokens. The contract underneath is portable; the tools are one vendor family's.

- **Expose state as data attributes; do not add a class prop per state.** `openClassName` / `closedClassName` multiply with every state and cannot express combinations. One `className` plus `data-state="open"` on the element lets consumers style any combination with ordinary selectors and see the state in DevTools. Common attributes: `data-state`, `data-orientation`, `data-side`, `data-align`, `data-disabled`.
- **Choose presence or value per attribute, and write it down.** React renders `data-disabled={false}` as `data-disabled="false"`, which a presence selector such as `[data-disabled]` still matches. Either emit `data-disabled={disabled ? "" : undefined}` (presence, the Radix convention) or always select on the value. The spec's examples mix both.
- **Data attributes are for styling. They do not replace `disabled`, `aria-expanded` or `aria-selected`.** Set both.
- **Give each part a stable `data-slot` name** (shadcn convention) so a parent or global CSS can target "the card header" without depending on tag names or internal classes. Kebab-case, named for purpose, prefixed by the component (`card-header`, not `header`; never `blue-button` or `div-wrapper`). Once published, slot names and data-attribute values are public API: renaming one is a breaking change.
- **What goes where:** props for style variants, sizes, behavior configuration and handlers. Data attributes for state and layout facts the component computes. Slots for identity.
- **Class order is base, then variant, then state, then the consumer's `className`.** With Tailwind this needs `tailwind-merge`, because two utilities for the same property do not resolve by order in the class attribute. Outside Tailwind the same guarantee needs another mechanism; the spec does not cover one.
- **Define `cva` variant maps at module scope.** Pass runtime values through a CSS custom property in `style`; a class name assembled from a runtime value is never generated by Tailwind.
- **Components reference semantic tokens only.** The spec's token page is the shadcn naming: a surface token paired with the text color that sits on it (`--primary` with `--primary-foreground`), values redefined under a `.dark` class. Token taxonomy, theming scope and the component-token ration are owned by SKILL.md's token sections; nothing in the spec changes them.

## Distribution: package or copy-in registry

| | Package (npm) | Copy-in registry (shadcn-style) |
| --- | --- | --- |
| Consumer gets | Built code imported from the package | Source files written into their repository |
| Who owns the code after install | The library | The consumer |
| Fixes and security patches | Arrive through a version bump | Do not arrive. The spec describes no upgrade path for copies already installed, although it lists version tracking as a registry benefit |
| Customization | Only through the public API; anything else is a fork | Unlimited: edit the file |
| Breaking changes | Semver, changelog, codemods | Not applicable; each copy is frozen at install |
| Dependencies | Resolved by the package manager | Declared in the item's metadata; the CLI installs npm packages and other registry items |
| Measuring adoption | Count imports and versions | Copies diverge and cannot be counted as "on the system" |

Decision rules. The first three are this library's defaults, accepted 2026-11-18; the spec presents both models as valid and says some libraries should offer both.

- **An internal design system with adoption targets ships primitives, components and utilities as a package.** The adoption ratio, yearly breaking-change windows and automated migrations in SKILL.md all assume a versioned artifact. A copied component is the code equivalent of a detached instance. The common hybrid fits this rule: copy shadcn-style source *into the design-system package once*, own it there, and publish that package to product teams. Copy-in is how the system acquires code, the package is how products consume it. Exception: a single product, or a team with no adoption target and no one to maintain a package, can copy in directly and skip the package until a second consumer appears.
- **Blocks, pages and templates are copy-in or fork.** They are meant to be edited, and versioning them promises updates nobody can apply.
- **An open-source library whose consumers must restyle deeply can reasonably be copy-in.** The spec's case for it is transparency and ownership: consumers can read, fix and trim the code without waiting for a maintainer.
- **A registry needs three things:** the source files, a public endpoint serving item metadata as JSON (name, type, npm dependencies, registry dependencies, files), and a CLI that writes the files. The shadcn CLI installs from any URL that serves an item (`npx shadcn@latest add <url>`), so a small registry can be static files. The item schema is shadcn's and changes; fetch it rather than recalling it.
- **Publishing a package:** `react` and `react-dom` are peer dependencies, not dependencies. Ship type declarations and an `exports` map. If the components use Tailwind classes, the consumer's Tailwind build does not scan installed packages by default; the README must say how to add the package as a source (`@source` in Tailwind v4 as of the spec's 2026-11 text; verify against the installed Tailwind version).
- **Installing from a registry or marketplace is importing third-party source.** Read the diff as you would a pull request. The spec's own list of marketplace risks: abandoned components, demos that break in production, proprietary metadata that makes leaving hard, and dependence on a platform that can change terms or close. It names 21st.dev as the example. The maintenance check in `frontend-design` (ui-library-picks) applies.

## Documentation contract

A published component's page has, in this order of usefulness: what it is and when to use it; a live demo with the code that produced it; a one-command install; examples covering variants, states, composition and responsive behavior; a props table (name, type, default, required, description) generated from the exported types; an accessibility section giving the keyboard map, the ARIA roles and states used, and focus behavior; and a changelog with before/after code for breaking changes.

Two points an agent tends to skip: every interactive component declares a **keyboard map**, and the props table is **generated**, which matches the local Atlassian rule to derive docs from the code so they cannot drift.

## Do not copy the spec's code

The spec's prose is sound; several of its examples would fail review against its own rules. Read them as illustration.

- The composition page's accordion: the root is controlled-only with a `setOpen` prop, one boolean opens every item, `Trigger` and `Content` accept `asChild` and ignore it, `Content` never reads the open state, and a consumer `onClick` replaces the toggle.
- The polymorphism page's `Text` and `Flex` examples merge `className` and then spread it away. `<Button as="h2" role="presentation">` and a `div` given button behavior are shown as acceptable uses.
- The accessibility page hand-writes a focus trap, a menu and tabs. The menu puts `aria-selected` on `role="menuitem"` (not a supported state for that role) and never moves focus to the items. Its contrast block shows 7:1 and 4.5:1 under a plain "WCAG" heading after stating 4.5:1 and 3:1 earlier, without naming the levels. It calls 44px the minimum touch target.
- The Tailwind examples mix a v3 config file with v4 directives.

For anything on that page, `web-design` (web-accessibility) is the doctrine here, and the rule in `frontend-design` (ui-library-picks) stands: do not hand-roll behavior a maintained primitive already solves. The spec's own definition of a primitive supports that reading.

## Scoped positions and conflicts

- **"Variant" has three meanings; keep them apart.** (a) Figma variants, in SKILL.md's "Component API design": collapse variant explosions into props. (b) The spec: a variant is a documented style permutation chosen by a prop (`size`, `tone`) on one component, never a separate component. (c) `react` (react-composition), "explicit variants": a separate named component per use case, for flags that change what renders or which behavior runs. Scoped rule: a style axis is a prop; a mode axis is composed parts plus a named component per use case. (b) and (c) are both right inside their scope and should not be blended into "variants are props" or "variants are components".
- **Slot props or parts.** The spec's vocabulary lists named slot props (`icon`, `footer`) as valid, and its types page calls a card with `title` / `description` / `footer` props an anti-pattern. `react` (react-composition) prefers children over `renderX` callbacks for static structure. Position here: rule 1 of the element contract.
- **Target size and contrast.** The spec's 44px minimum and unlabeled ratios conflict with `web-design` (web-accessibility), which gives 24×24 CSS px as the WCAG 2.2 AA floor and treats 44 as a product target. The local reference wins.
- **`aria-disabled` instead of `disabled`** so a control stays focusable and can explain itself: stated by the spec, not corroborated locally. Parked in [coverage-gaps.md](coverage-gaps.md).
- **Primitive picks.** The spec lists Radix, React Aria Components, Base UI and Headless UI without ranking. `frontend-design` (ui-library-picks) picks one. No conflict: the project's installed library wins in both.

## Review checklist

- [ ] Is the artifact named correctly (primitive, component, block, pattern, template, utility), and does its owner and distribution match the name?
- [ ] Does each exported part render one element, accept that element's native props, and spread them?
- [ ] Are `className` and `style` merged rather than replaced, with the consumer's value last?
- [ ] Do internal handlers and ARIA or state attributes survive a consumer passing their own?
- [ ] Does a ref reach the DOM element on the oldest React version in the peer range?
- [ ] Are prop types exported as `<Part>Props`, with no custom prop shadowing a native attribute?
- [ ] Does stateful behavior work controlled and uncontrolled, with all three props optional and the callback firing in both modes?
- [ ] Is state exposed through documented data attributes (presence or value, consistently), not per-state class props?
- [ ] Is there one element-switching mechanism (`as` or the library's slot), with the child requirements documented?
- [ ] Do styles reference semantic tokens only, with variants defined once at module scope?
- [ ] Is the distribution model deliberate: package for what is imported and measured, copy-in for what is edited?
- [ ] For a package: React as a peer, types shipped, Tailwind scanning documented? For a registry item: dependencies and registry dependencies declared?
- [ ] Does the docs page carry install, demo with code, generated props table, keyboard map, and changelog?
- [ ] Do blocks take data through props and leave fetching to the consumer?

## Look it up

- The spec: <https://components.build> (definitions, composition, types, state, `asChild`, polymorphism, data attributes, styling, design tokens, registry, npm, marketplaces, docs). Install the upstream skill for full examples: `npx skills add vercel/components.build`.
- shadcn registry item schema and CLI: <https://ui.shadcn.com/docs/registry>
- Radix composition guide (`asChild`, Slot): <https://www.radix-ui.com/primitives/docs/guides/composition>
- The installed primitive library's docs for its slot or render mechanism and its controlled-state props.
- react.dev for `ref` as a prop and `forwardRef` on the installed version; WAI-ARIA Authoring Practices for any keyboard map.
- Tailwind docs for source detection in the installed major version; <https://cva.style> for variant maps.
