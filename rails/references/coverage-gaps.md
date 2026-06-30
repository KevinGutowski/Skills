# Coverage Gaps

Use this file to keep Rails guidance honest across projects and Rails versions.

## Candidate gaps

- **Source maps for operational topics:** Webhooks, migrations, multitenancy/security, jobs, fixtures, Hotwire realtime, Docker dev, and Ruby refactoring need top-level provenance before new durable rules are promoted.
- **Rails version drift:** Solid Queue/Cache/Cable defaults, migration safety APIs, Hotwire behavior, and security defaults should be checked against the project's Rails version.
- **School conflicts:** DHH/37signals, layered Rails, event-sourced Rails, and refactoring-heavy Ruby guidance can conflict. Add examples that show when to stay in the current school instead of importing another one.
- **Deterministic checks:** Future scripts could lint unsafe migrations, missing idempotency keys, or webhook signature verification, but only after matching repo conventions.
- **Project-local exceptions:** Tenant model, auth stack, job backend, and testing style should be recorded as project facts before applying library-level guidance.

## Candidate promotion form

```markdown
Candidate:
School:
Owning reference:
Source checked:
Project convention:
Rule:
Exception:
Status: proposed | accepted | rejected
```
