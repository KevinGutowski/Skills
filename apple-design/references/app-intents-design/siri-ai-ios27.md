# Siri AI in iOS 27 — Adoption Detail

*Second-hop detail for [../app-intents-design.md](../app-intents-design.md). Use when making an app work with the iOS 27 Siri (Siri AI): app schemas, entities, on-screen awareness, confirmation, long-running intents, cross-device identity, and testing.*

*Sources: WWDC26 sessions 240, 343, 344, 345, 295, 310 (see [sources.md](sources.md)). Names checked against developer.apple.com on 2026-11-05.*

**How to use this file:** it records the decisions and traps. Names are search terms; for signatures and availability, fetch the docs (links at the end; append `.md`). For code, use Apple's Xcode-bundled `app-intents-specialist` / `app-intents-whats-new-27` skills.

## Contents

- The model
- Schemas first
- Entities: index, query, or transient
- On-screen awareness
- Responses and confirmation
- Donations and relevance
- Parameters, time limits, identity
- Shortcuts and Use Model
- Testing ladder
- Adoption checklist
- Look it up

## The model

Siri in the iOS 27 releases does three things with an app, all built on App Intents: it **answers questions from your entities**, **takes actions through intents**, and **understands what's on screen**. Siri owns the language ("No training phrases, no natural language processing on my end"), clarification, disambiguation and confirmation. Your app owns the data and the action.

## Schemas first

- **Siri executes schema intents.** Plain App Intents still surface in Shortcuts, Spotlight, widgets and controls, but to be actionable by Siri AI, adopt the app schema for your domain (mail, messages, calendar, photos, Maps, Clock, …). Keep App Shortcuts for features no schema covers.
- **Adopt a domain as a set.** Xcode fails the build when companion schemas are missing (`sendMessage` without `draftMessage`) and offers a fix-it stub. Treat it as a design hint: sending needs drafting for confirmation.
- Leave optional schema properties you don't support unset. Add your own properties freely, and map your terms onto schema enum cases, adopting only the cases that apply.
- **Ship a `system.open` intent** that navigates to the entity. Without it, tapping a Siri or Spotlight result only opens your main screen. This is the most common miss.
- In-app search uses the `.system.searchInApp` schema (renamed from iOS 17's `.system`). It needs no indexing; your app shows its own results.
- Perform: resolve parameters, call your existing logic, **return the created or updated entity**.

## Entities: index, query, or transient

`AppEntity` describes data you already have; it's "not a new data model." Pick one strategy per entity type:

| Situation | Use | Trap |
|---|---|---|
| Data fits on device | `IndexedEntity` + Spotlight indexing | Indexing isn't automatic: index on create, re-index when key or display properties change, delete on delete. Semantic matching gives Siri the fewest follow-ups. |
| Too large, server-side, fast-changing | `EntityStringQuery` | You do the matching, so Siri gets no semantic understanding. |
| Structured search, or several types for one parameter | `IntentValueQuery` | Can return a union (songs *or* playlists). |
| Siri should offer choices | `EnumerableEntityQuery` | — |
| No identity of its own (an attendee) | `TransientAppEntity` | Can't be used for annotations. |

This refines the HIG's "index what's personally relevant": index everything feasible locally (all playlists), and query for what isn't (the whole catalog).

## On-screen awareness

- One primary item on screen: put the entity in `.userActivity`. Many items: annotate each row (`.appEntityIdentifier`), or use the `List` collection form, which keeps selections known after scrolling.
- **Make the query's display representations fast.** Siri fetches them to resolve "the third one"; if they're slow, Siri asks clarifying questions or picks wrong.
- Annotate system surfaces too: notifications (reply to an announced one), Now Playing (identifiers ordered most to least specific), alarms.

## Responses and confirmation

- **Default to no custom response.** Siri phrases the result from your entity's `DisplayRepresentation`, which Spotlight and Shortcuts reuse, so polish that first. Add dialog only when it adds meaning. Full dialog must stand alone for voice-only listening (AirPods). Snippets follow the parent reference's design rules.
- **Don't build confirmation for schema intents.** Siri confirms side-effecting actions and disambiguates multiple matches itself.
- Siri assumes entities are **private** and may skip confirmation for them. Entities that can be shared must say so (`OwnershipProvidingEntity`) and keep that state current. Don't adopt it on entities that can't be shared.

## Donations and relevance

- **Donate only UI interactions.** Siri and Shortcuts usage is already known, and over-donating can get your donations ignored. Donations also tell Siri about ongoing sessions (navigation, stopwatch).
- `RelevantEntities` suggests entities for a context before anyone searches for them (running playlists when a workout starts).
- Rule of thumb: Spotlight indexing is how Siri finds things; donations teach usage patterns; relevant entities are situational hints.

## Parameters, time limits, identity

- **Update intents: a nil check corrupts edits.** Read the parameter's value state: set with a value means change it, set to nil means clear it, unset means it wasn't mentioned.
- Bulk actions: `EntityCollection` parameters pass only identifiers, skipping per-entity resolution (Apple's 1,000-photo demo became "almost instant").
- **Intents get about 30 seconds.** Longer work uses `LongRunningIntent`. It must report progress regularly or gets cancelled, and the system shows it as a Live Activity. Clean up partial work on cancellation.
- **Use stable IDs.** Siri continues conversations across devices and Shortcuts storage syncs, so per-device row IDs break both. Use server or CloudKit IDs, or pair local and stable IDs (`SyncableEntity`).
- Cross-app hand-off: export to standard types (people, places) via `Transferable`. For incoming content, resolve it if it already exists, otherwise import it.

## Shortcuts and Use Model

- The **Use Model** action takes app entities, so **expose the properties a model needs to reason** (a recipe's ingredients to judge spiciness). Thin entities produce bad choices.
- Notifications can now trigger automations, filtered by words. Write them so they're distinct, use a specific verb, and include the actionable detail (see `notification-design`).

## Testing ladder

1. **`AppIntentsTesting`** runs from a UI-test bundle with the same signing team and drives the real stack by bundle ID: "No mocks, no stubs." Cover intents, chained results, queries, that Spotlight actually finds indexed entities (catches a removed indexing call), and that on-screen annotations carry the right entity. Seed state with debug-only, non-discoverable intents.
2. **Shortcuts**: the intent's shape and parameters.
3. **Spotlight**: indexed, and opens to the right place.
4. **Siri**: end to end.

## Adoption checklist

- [ ] Core nouns are entities with good display representations; domain verbs use schemas; companion schemas complete.
- [ ] One resolution strategy per entity type; index lifecycle wired.
- [ ] `system.open` implemented.
- [ ] Primary content and lists annotated; display representations fast.
- [ ] No custom confirmation on schema intents; shareable entities declare ownership.
- [ ] Only UI interactions donated.
- [ ] Update intents respect value state; long work uses `LongRunningIntent`; IDs stable across devices.
- [ ] AppIntentsTesting covers intents, queries, indexing and annotations.

## Look it up

Fetch as Markdown by appending `.md`:

- https://developer.apple.com/documentation/appintents · .../appintents/appschema · .../appintents/indexedentity · .../appintents/indexedentityquery · .../appintents/intentvaluequery · .../appintents/transientappentity
- .../appintents/ownershipprovidingentity · .../appintents/relevantentities · .../appintents/entitycollection · .../appintents/longrunningintent · .../appintents/syncableentity · .../appintents/intentvaluerepresentation
- .../appintentstesting
- HIG: https://developer.apple.com/tutorials/data/design/human-interface-guidelines/siri.md
- Sessions: https://developer.apple.com/videos/play/wwdc2026/240/ (schemas), /343/ (advanced: responses, confirmation, annotations), /344/ (code-along), /345/ (new capabilities), /295/ (testing), /310/ (Shortcuts)
