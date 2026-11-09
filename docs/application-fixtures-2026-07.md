# Skill application fixtures

These fixtures test application after routing. A response passes by making the expected decisions; wording and implementation details may vary. The evaluator must also reject the named boundary violation and catch the likely failure mode.

## A01 — Distinctive frontend build

- **Entry point:** `frontend-design`
- **Mode:** build
- **Prompt:** Build a production landing page for a local astronomy club. The hero should show the next observing night from supplied event data, the page must work offline as one HTML file, and the visual direction should feel like a field notebook rather than a generic SaaS page. Include keyboard states and reduced motion.
- **Rule that must be applied:** commit to one context-specific concept and make the hero truthfully demonstrate the supplied event data.
- **Exception/boundary:** because the deliverable is single-file and offline, a characterful system stack is allowed; do not add a font CDN merely to satisfy distinctive-type guidance.
- **Likely failure mode:** generic dark gradient/cards or a decorative star chart whose date/time conflicts with the event data.
- **Expected decisions:**
  - states the field-notebook concept and implements it as a coherent token/type/composition system;
  - uses accessible native/proven controls with visible keyboard focus and reduced-motion handling;
  - renders the supplied observing date/time consistently in the focal artifact;
  - keeps the artifact offline and avoids network font/assets;
  - verifies primary interaction, target sizes, content stress, accessibility states, and console health, or names unavailable checks.

## A02 — Agent workflow hardening

- **Entry point:** `working-with-ai` → `agentic-coding`
- **Mode:** harden
- **Prompt:** Design an agent workflow for a mature Rails billing repository. Two agents may work in parallel, but production credentials and deploy approval must remain human-controlled. The project already uses its own Rails conventions. Return the proposed AGENTS.md rules and verification plan; do not edit application code.
- **Rule that must be applied:** load repository instructions and the `rails` router before encoding only missing project-specific constraints; require evidence and human final acceptance.
- **Exception/boundary:** parallel agents are allowed only with isolated runtime/version-control state and scoped credentials; the request is workflow-only, so application code remains unchanged.
- **Likely failure mode:** replacing local Rails conventions with a generic style guide, sharing one dirty worktree, granting production secrets, or treating passing agent output as approval.
- **Expected decisions:**
  - preserves existing repository and Rails-school authority instead of inventing a new doctrine;
  - partitions bounded tasks with isolated worktrees/runtime and explicit ownership;
  - denies production credentials and deploy authority to agents and defines escalation/stop conditions;
  - proposes lean, decision-point AGENTS.md rules rather than a narrative prompt dump;
  - records tests/static checks/diff inspection and human acceptance, with unresolved risks;
  - makes no application-code edits.

## A03 — Rails felt-speed diagnosis

- **Entry point:** `rails` → `optimizing-rails` (perceived-speed)
- **Mode:** diagnose
- **Prompt:** Our Rails 8 + Hotwire app feels slow: a spinner on almost every click, list pages that pop in row by row, and the team keeps proposing a React rewrite with a local-first sync engine. Server p95 is under 250 ms and there are no obvious N+1s. Propose what to check and change first; do not edit application code.
- **Rule that must be applied:** felt speed is a critical-path problem, not a server-latency problem — find the requests the user waits on and fold them into the first response, start them earlier, or move them off the request; stay on Hotwire and do not port the sync engine.
- **Exception/boundary:** Inertia is allowed only for a named client-owned interaction-state pain (canvas, spreadsheet editing), not for "feels slow"; browser frame budgets and animation values belong to `web-design`, so the response may route them there but must not restate them as Rails rules.
- **Likely failure mode:** recommending the React/sync-engine rewrite, adding a service worker precache by default, or answering only with server-side tuning (Puma threads, caching) when server p95 is already fine.
- **Expected decisions:**
  - checks that hover prefetch is hitting (hover URL byte-identical to click URL, no cache-busting params) and proposes `data-turbo-preload` for the few most-visited destinations;
  - identifies the row-by-row pop-in as an HTTP N+1 (a lazy Turbo Frame or Active Storage redirect-mode URL per row) and moves it into the first response;
  - proposes morph refreshes with stable `dom_id`s and `data-turbo-permanent` instead of full-body replaces;
  - moves post-redirect work (mailers, API calls, broadcasts) to jobs and keeps optimistic inserts as server-rendered templates;
  - declines the sync-engine rewrite and default service-worker precache with the stated reasons, and names Inertia only as a conditional escalation;
  - asks for or proposes a first-frame RUM number per route so the change can be measured, and makes no application-code edits.
