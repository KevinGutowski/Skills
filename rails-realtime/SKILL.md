---
name: rails-realtime
description: "Make Rails real-time features reliable at scale — connection-avalanche safety (client init is O(clients × subscriptions)) via the four-level mitigation taxonomy (operations: slow rollouts + least-connections balancing; client: backoff with jitter, linearized subscriptions; protocol: disconnect notices, session resume; server: pre-authorized signed streams, slow-drain shutdown, real-time proxy), plus delivery guarantees: Action Cable is at-most-once with no FIFO ordering — LLM token streaming needs at-least-once + ordering via log-backed streams with client-tracked offsets. Use when designing WebSocket/Action Cable/Turbo Streams features at scale, debugging reconnect storms or out-of-order messages, streaming LLM responses, or choosing Action Cable vs AnyCable. Based on two Evil Martians posts (Dementyev, 2024–2025). Triggers: WebSockets, Action Cable, AnyCable, LLM streaming, message ordering, at-least-once, reconnect storm, connection avalanche, signed streams, slow drain."
---

# Rails Real-Time Reliability

**Sources** — two Evil Martians Chronicles posts by Vladimir Dementyev (AnyCable author):
- *"Connection avalanche safety tips and prepping for real-time applications" (2024). https://evilmartians.com/chronicles/connection-avalanche-safety-tips-and-prepping-for-realtime-applications*
- *"AnyCable, Rails, and the pitfalls of LLM-streaming" (2025). https://evilmartians.com/chronicles/anycable-rails-and-the-pitfalls-of-llm-streaming*

Two failure domains: **capacity** (avalanches) and **correctness** (delivery guarantees). Both stem from the same fact: "real-time client initialization is a resource-intensive operation" — auth + authorization + N subscriptions per client — so total init work is **O(clients × subscriptions)**.

## Connection avalanches

Two types: **recovery** (a deploy/restart drops every connection; reconnects arrive simultaneously, with secondary avalanches as overwhelmed clients re-retry) and **celebrity** (mass simultaneous joins for an event). Mitigations by layer — combine several:

- **Operations:** deployment windows (does the hotfix outweigh mid-event reconnect pain?); slow rollouts (`maxSurge: 1, maxUnavailable: 0`); and **least-connections load balancing** — round-robin piles every reconnection onto the surviving nodes ("based on a true story").
- **Client:** **backoff + jitter** — "always spice reconnection delays with some randomness"; **linearized subscriptions** (queue subscribe commands, send the next only after ack) — counterintuitively up to 2× *faster* total init under load, and avoids retry amplification.
- **Protocol:** **disconnect notices** with reasons and server-suggested cooldowns ("delegated throttling"); **session resumeability** — a session token restores state and skips re-subscription on reconnect.
- **Server:** **pre-authorized subscriptions** — flip authorization from *pull* (per-subscribe rule evaluation hitting the DB under avalanche) to *push* (signed streams/JWT verified statelessly — "exactly how Hotwire Turbo Streams work"); **slow-drain disconnection** on shutdown (gradual over a window — "one of the most efficient ways to prevent recovery avalanches in terms of the amount of refactoring needed," and the only option on Heroku-like platforms); a **dedicated real-time server as a proxy** (bulkhead) — "separating real-time and non-real-time infrastructure… is an important step towards higher loads and calmer nights."

Anti-pattern: live-components sprinkled per UI element ("applications with such live components representing table cells (!!!) — do not try this at home") — every component is a subscription multiplying the O(N×S) bill.

## Delivery guarantees (the LLM-streaming lens)

Stock Action Cable fails token streaming twice:
- **No ordering:** "Action Cable uses thread pools to distribute broadcast work… 100 messages… 4 Ruby threads… transmitted to the client concurrently — oops!" Workarounds ranked: accumulate-and-resend (wasteful), throttling (~100ms, breaks under load), faster pub/sub (helps, "the Curse of Threads still holds"), client-side reordering (robust DIY).
- **At-most-once delivery:** "not enough for reliable streaming of LLM responses. We need at-least-once at minimum!" — a reconnecting client loses chunks forever.

The architecture answer: **log-backed streams** — publications written to per-stream logs with position metadata; clients track offsets and catch up on reconnect; optional history fetch at subscribe kills page-load races. AnyCable bakes this in with app code unchanged; the emerging Durable Streams protocol standardizes the same design (one log per stream, client-tracked offsets). Reference Rails shape: a job streams chunks (`chat.ask(prompt) { |chunk| Turbo::StreamsChannel.broadcast_append_to(...) }`) and persists the final message for ground truth.

## Checklist

- [ ] Reconnect path: backoff + jitter, linearized subscriptions, disconnect notices honored?
- [ ] Deploys: slow rollout + least-connections balancing + slow drain; no deploys mid-event?
- [ ] Authorization pushed (signed streams) rather than pulled per-subscribe?
- [ ] Subscriptions counted per page — no per-cell live components?
- [ ] Streaming features: ordering and at-least-once actually guaranteed (log + offsets), or knowingly best-effort?
- [ ] Real-time traffic bulkheaded from the request path?

> **Staleness note:** product specifics (AnyCable features, actioncable-next status, Durable Streams adoption) will date; the taxonomy, the O(N×S) model, and the guarantee analysis are platform-agnostic and durable (the posts cite Action Cable, Pusher, Centrifugo, and Socket.io alike).

## Relationship to other skills

- **`layered-rails`** — same school; AnyCable is its real-time pick and its "extraction without microservices" example (a logic-less Action Cable swap).
- **`inertia-rails`** — its real-time patterns (`router.reload` escalation) ride on this skill's transport guarantees.
- **`optimizing-rails`** — request-path performance; this skill owns the persistent-connection failure domain.
- **`ai-experience-design`** — designs *what* streaming AI output should feel like; this skill makes the tokens actually arrive in order.
