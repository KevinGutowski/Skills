# Rails Event Sourcing (the Arkency school)

*Scope: Apply Arkency's Rails school — selective DDD, event sourcing, and CQRS: past-tense events, aggregates, read models, process managers. Includes the four-school router (vanilla default → layered → packwerk → this). Use when entity tables accrete process state (status enums, *_sent_at/retry columns), flows span contexts, or weighing event sourcing. Triggers: event sourcing, CQRS, DDD Rails, aggregate, read model, Rails Event Store.*

**Sources:** [references/sources.md](rails-event-sourcing/sources.md) — twelve Arkency posts (blog.arkency.com).

The founding diagnosis: "Active Record is not only the state of an entity. It's very often the state of a process." A `status` enum running pending → confirmed → paid → shipped "is not really the state of a thing. It's the state of a process the thing is going through" — and columns like `last_reminder_email_sent_at` and `failed_payment_attempts` are "persisted process state, living on the entity table because there's nowhere else for them to live." Their bias, self-declared: "we tend to see the apps that have grown past the point where the default Rails shape still fits."

## ⚠️ Choosing a Rails architecture school (the router)

Four positions; **default to vanilla** and escalate only on named pains:
1. **[dhh-style.md](dhh-style.md) (vanilla — the default).** Arkency themselves: the Rails Way is "great at the beginning, when you're still not sure where you go with the features." Stay here while entities are mostly entities. (They review 37signals' Fizzy respectfully: concerns "applied intentionally rather than as accidental accumulation.")
2. **[layered-rails.md](layered-rails.md) (extraction)** when controllers/models bloat but the domain is one coherent module. Arkency's honest take: service objects "are a good solution to the transaction boundary… It's not bad" — but "service objects do nothing about modularisation… just another horizontal slice."
3. **Module boundaries (Shopify/packwerk)** when the pain is "200 models, zero modules" but processes are simple. Shopify's retrospective lessons: developers package by *semantic* clues that diverge from *runtime* reality; zero static violations can still crash in isolation; privacy enforcement bred undocumented blessed APIs ("privacy is sugar"); and "running code, more than any metric, will always be the best indicator of real progress." Packwerk is "a sharp knife" — a measurement tool and line-holder, not a modularization strategy by itself.
4. **This school** when *processes* are the pain: status enums that are workflows, `*_sent_at`/retry-counter columns, multi-step flows, audit + "how did we get here" debugging combined with domain complexity.

Anti-pattern by their own admission (quoting Greg Young): "the common anti-pattern of building a whole system based on Event sourcing… CQRS and Event sourcing are not top-level architectures and normally they should be applied selectively just in few places." And Udi Dahan on audit-only justifications: you can usually meet that "with some simple interception and logging." **The ladder: CRUD → event-driven (publish events alongside state changes — recommended almost universally) → event-sourced, only for the core subdomains that earn it.** "You don't have to go all in with events."

## Events

"Event sourcing is just another persistence technique." An event is "a fact, something that happened in our system. It's immutable" — named as a **verb in past tense** in the ubiquitous language (`ShipmentPacked`; "ShipmentUpdated is… too vague"). Updates destroy information — "We do know what it is now… But we don't know how we got there." Corrections work like accounting: append a correction, never mutate. A **stream** "is a logical representation of a business concept" (`Shipment$1234`) — read "the exact events that you need to make a decision. No more"; one event can be linked into many streams (per-day sales, audit timelines, agent feeds). Runs on your existing Postgres/MySQL/SQLite — no new infrastructure.

## Aggregates — the two-methods trick

"Event Sourcing is like having two methods when previously there was one": a **public command method** that protects business rules and emits the event, and a **private apply method** that maps the event to internal state. Plain Ruby, zero Rails — built from past events, exposing `unpublished_events`:

```ruby
# 2017 shape — exactly what the aggregate_root gem codifies
class Product
  def supply(quantity)                      # public: guard invariants, emit
    raise CannotSupply unless @store_id && @sku
    apply(ProductSupplied.new(data: {store_id: @store_id, sku: @sku, quantity:}))
  end
  private
  def supplied(event) = @quantity_available += event.data.fetch(:quantity)  # apply: mutate
end
```

"It is the domain events that are our source of truth." **Side effects enter as lambdas, never injected gateways**: the aggregate decides, calls `response = request.()` inside its invariant-protected method, and applies the event only on success — yielding "nice and clean aggregate tests without messing with mocks, VCRs, massive fake gateway adapters" (assert against `unpublished_events`).

## Read models — "Event Sourcing basically requires CQRS"

An event-sourced repository offers only `find_by_id` — every list/search/sum needs a **read model**: plain ActiveRecord (this is where vanilla Rails lives happily), denormalized per view, rebuilt from events, app-specific and disposable. "We move the pressure from reads to writes" — often *faster* than querying. The killer long-term benefit: "having an event log allows us to define new models, appropriate for the new business requirements… Just replay all your events and build new model."

## Process managers & bounded contexts

Workflows become objects: a process manager waits for multiple events ("Only after both happened you can proceed further"), is often itself event-sourced into its own stream, and absorbs cross-context coupling — "this is a place you want to go when you want to understand how the whole flow is working." Handler placement heuristic: the *downstream* context owns the handler; conditional flow logic graduates to a process manager.

"You can have 200 models and zero modules… layers are not modules." `Order.first.user.invoices.last.line_items` "crosses 4 business boundaries. In just 1 line of code. All thanks to associations." Typical apps hold 5–50 bounded contexts; physical separation (directories — their default — gems, engines) is interchangeable and evolvable; the conceptual boundary is what matters. Microservices don't fix it: "More layers, less performance, but still no modules." The closing question for any model: **"What does your User class hide?"**

## The legacy on-ramp (production-safe)

1. Introduce service objects (the application layer — Arkency's step 1, not destination). 2. Publish events from them inside the transaction. 3. Build read models reacting only to events. 4. **Event-name archaeology**: event prefixes suggest aggregate names, past-tense verbs suggest methods. 5. Event-source only the core. Discipline: "Your boss and your clients will never allow introducing any bug 'because I was improving the architecture'."

## Checklist

- [ ] School chosen by named pain, not taste; vanilla remains the default; ES applied selectively, never whole-app?
- [ ] Events past-tense facts in domain language; never "Updated"; streams per business concept?
- [ ] Aggregates plain Ruby with the two-methods split; side effects as lambdas; tests against unpublished_events?
- [ ] Every query need met by a read model; write side answers only find_by_id?
- [ ] Process state off entity tables and into process managers; cross-context coupling concentrated there?
- [ ] Associations not crossing bounded contexts; modules, not just layers?

> **Staleness note:** RailsEventStore API surface (`link_to_stream`, AggregateRoot DSL; v2.x era, 3.0 imminent as of May 2026) and 2015-era code (Virtus) are perishable; the two-methods pattern, streams, read-model pipeline, process-manager shape, and the school criteria are durable. Posts at blog.arkency.com.

## Relationship to other skills

- **[dhh-style.md](dhh-style.md)** — the default school; this one is the escalation for process-heavy domains. Arkency teaches the Rails Way first and endorses it early-stage.
- **[layered-rails.md](layered-rails.md)** — its service objects are this school's on-ramp step 1; this school adds the vertical (modules) axis layers can't.
- **[rails-realtime.md](rails-realtime.md)** — event-driven plumbing at the transport layer; domain events here are about persistence and truth, not delivery.
- **[optimizing-rails.md](optimizing-rails.md)** — read models are also a performance tool (precomputed views); profile before reaching for either.
- **[rails-testing.md](rails-testing.md)** — aggregate tests are pure-Ruby fast by construction; the suite discipline lives there.
- **[ruby-refactoring.md](ruby-refactoring.md)** — local smell fixes; when its diagnosis reveals *process state on entities*, the answer graduates to this school.
