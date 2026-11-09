# Rails Reference Apps

*Scope: Use the official Rails reference-app library when a Rails task benefits from reading real application code before copying or inventing a pattern. This is an exemplar router, not a framework API reference and not a separate architecture school.*

## Operating Rule

When building Rails features, especially with Hotwire, Active Storage, Action Text, custom auth, or REST-shaped controllers, inspect the closest official reference app for working code patterns before adding a gem, service layer, bespoke JavaScript architecture, or speculative abstraction.

Use the apps as exemplars for idiomatic production Rails shape. Use [rails-guides.md](rails-guides.md) for current API behavior and version-specific framework mechanics. If an app pattern conflicts with the target repo's established school or Rails version, follow the project first and cite the app only as inspiration.

## App Router

| Need | Start with | Why |
|---|---|---|
| Server-rendered chat, presence-adjacent UI, Turbo Streams, Action Cable | Campfire: https://github.com/basecamp/once-campfire | Complete realtime group chat app with lean, dependency-light Rails |
| Publishing/editorial flows, book/page modeling, uploads, rich text, custom auth | Writebook: https://github.com/basecamp/writebook | Self-hosted publishing app showing model design, Active Storage, Action Text, and auth |
| Kanban boards, drag-and-drop, crisp REST controllers, Stimulus-backed interactions | Fizzy: https://github.com/basecamp/fizzy | Board app with modern Hotwire patterns and RESTful controller shape |

## How To Mine A Pattern

1. Find the smallest nearby feature in the reference app: controller, model, view partial, Stimulus controller, job, mailer, or test.
2. Trace the whole request path before copying a local idiom. For Rails, the useful pattern is usually the collaboration among routes, controller, model, view, Turbo/Stimulus, and tests.
3. Prefer the ordinary Rails object if the app uses it directly. A plain partial, concern, callback, scope, fixture, or `Current` attribute is often the point.
4. Copy the shape, not names or business assumptions. Re-map resources, authorization, tenant scoping, lifecycle states, and test data to the target app.
5. Verify the mechanism against the target app's Rails version and dependencies before applying an app example.

## Boundaries

- App code is evidence for style and composition; Rails Guides remain canonical for APIs.
- These apps currently sit in the vanilla 37signals family. Do not import their conventions into a layered, Packwerk, event-sourced, RSpec/factory, or Inertia codebase unless the project has already chosen that direction.
- For app-level Turbo and Stimulus pattern judgment, route to [rails-hotwire-realtime.md](rails-hotwire-realtime.md) after selecting the closest app.
- For controller/model doctrine, route to [dhh-style.md](dhh-style.md) and its `dhh-style/` files.
- For security, migrations, jobs, testing, or performance, use the owning topic reference; the reference apps can provide examples but do not replace topic-specific checks.

## Sources

- Ruby on Rails Reference Apps, official curated library. https://rubyonrails.org/docs/reference-apps
- Campfire source. https://github.com/basecamp/once-campfire
- Writebook source. https://github.com/basecamp/writebook
- Fizzy source. https://github.com/basecamp/fizzy
