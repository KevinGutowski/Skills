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
