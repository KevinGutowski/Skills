---
name: inertia-rails
description: "Build Rails apps with React/Vue/Svelte components and no API layer using Inertia.js. Decision rule: Hotwire for low interactivity, Inertia for rich JS components, never API+SPA by default. Use when choosing Hotwire vs Inertia vs SPA on Rails, building an Inertia + Rails app, or escaping a Rails-API + separate-SPA split. Based on Evil Martians' series. Triggers: Inertia, inertia_rails, React on Rails, SPA vs monolith, partial reload, useForm."
---

# Inertia.js on Rails

**Sources** — this skill aggregates Evil Martians' Inertia-on-Rails series (all by Svyatoslav Kryukov unless noted):
- *"Simplicity, vanished?! Solving the mystery with Inertia.js + Rails" (2025) — the cost model and pattern catalog. https://evilmartians.com/chronicles/simplicity-vanished-solving-the-mystery-with-inertia-js-and-rails*
- *"Inertia.js in Rails: a new era of effortless integration" — setup mechanics. https://evilmartians.com/chronicles/inertiajs-in-rails-a-new-era-of-effortless-integration*
- *"Optimistic UI with Inertia" (2026) — optimistic update patterns. https://evilmartians.com/chronicles/optimistic-ui-with-inertia*
- *Open-sourced agent rules: https://github.com/inertia-rails/skills*

"You build a traditional server-side app that happens to use JavaScript components for the UI." The cost model it eliminates — dual codebases, serialization layers, duplicated routing/validation/business rules, token auth, client-state synchronization: "each of these creates ongoing maintenance burden that serves no user value."

## The decision rule

- **Low client-side interactivity → Hotwire.** "Hotwire is genuinely simpler and probably the right choice."
- **Rich JS components needed → Inertia.** "Don't let anyone convince you that means accepting architectural complexity or abandoning Rails conventions."
- **API + separate SPA → only when you actually need an API** (mobile clients, third parties) — never as the default. Meta-rule: "Complexity should solve problems, not create them."

This is the **frontend wing of the `layered-rails` school** and diverges from `dhh-style`'s Hotwire-only/no-build stance — route by project, don't blend.

## The pattern catalog (2025-era; verify current Inertia docs)

- **Navigation:** `<Link>` intercepts clicks → AJAX against normal Rails routes; "the Rails routes file remains the single source of truth"; generate JS path helpers (js-routes) instead of hardcoding URLs.
- **Props:** controllers `render inertia: { post:, comments: InertiaRails.optional { ... } }` — optional/lazy props only serialize on demand; `router.reload({ only: ["messages"] })` for partial reloads; deferred + merging props for progressive loading (Inertia 2.0).
- **Shared data kills global client state:** `inertia_share flash:, current_user:, feature_flags:` in ApplicationController — "your current_user is just there, like it always was in ERB templates."
- **Forms:** `useForm` posts to Rails; plain model validations; errors flow back automatically — "no client-server error mapping… just Rails doing what Rails does best."
- **Modals:** the same controller action renders page or modal — no backend branching.
- **Real-time:** standard Action Cable channels; escalate frontend handling `router.reload()` → `reload({only})` → direct prop replacement. (Reliability concerns → `rails-realtime`.)
- **Type safety without leaving Rails:** generate TypeScript interfaces from your serializers (Typelizer over Alba: `typelize_from User`) — the answer to "but Next.js gives us types."
- **Optimistic UI:** apply the expected result locally, reconcile from server props on response; reserve it for interactions where latency is felt and rollback is cheap.

## Checklist

- [ ] The decision rule applied honestly — would Hotwire do? Is an API actually needed by a non-browser client?
- [ ] Routes/validations/auth live only in Rails; no parallel client-side copies?
- [ ] Expensive props optional/deferred; partial reloads instead of full refetches?
- [ ] Cross-cutting data shared via `inertia_share`, not a client state library?
- [ ] Types generated from serializers, not hand-written interface duplicates?

> **Staleness note:** Inertia 2.0-era APIs (deferred/merge props, the `<Form>` component trajectory) and the gem ecosystem (inertia_rails, alba, typelizer, js-routes, useInertiaForm) move fast — verify against current docs. The cost model and decision rule are the durable layer. The companion agent-rules repo encodes these patterns for coding agents.

## Relationship to other skills

- **`layered-rails`** — the parent school; ~half of Evil Martians' greenfield apps are Inertia + React. Stack decisions live there; Inertia mechanics here.
- **`dhh-style`** — the competing school's frontend is Hotwire/no-build. Pick per project; never mix idioms in one codebase.
- **`agentic-coding`** — "React is the lingua franca for AI coding tools"; Inertia is how that meets Rails without an API layer. Feed the inertia-rails/skills repo to agents.
- **`rails-realtime`** — delivery guarantees and avalanche safety for the Action Cable layer these patterns lean on.
- **`frontend-design`** / **`web-animation-design`** — what the React components should look and move like; this skill is the architecture they sit in.
