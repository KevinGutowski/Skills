# Coverage Gaps

Use this file for hardware guidance that needs current suppliers, tested prototypes, or domain-specific expert review.

## Candidate gaps

- **Supplier/manufacturing examples:** Add templates for RFQs, tolerances, sample reviews, or factory communication only after real artifacts are reviewed. Part 2 of `build-stages-and-manufacturing.md` (EVT/DVT/PVT, DFM, CMF) is a general-practice checklist with no source in this corpus; promote any item to a rule only after a source or reviewed artifact backs it.
- **Regulatory/safety:** Medical, assistive, electrical, battery, RF, child-safety, and accessibility requirements need current expert/regulatory checks before final advice. The certification list in `build-stages-and-manufacturing.md` is a set of questions to raise, not compliance guidance.
- **Unit-economics fixtures:** Promote cost/yield/inventory models only when assumptions, break-even count, and risk buffers are explicit.
- **AI hardware:** Input/output models for AI-first devices are unstable; keep product interaction patterns tied to observed prototypes and route AI behavior to `ai-experience-design`.
- **Physical test protocols:** Add repeatable protocols for rigs, jigs, field tests, and spatial-context evaluations when concrete projects recur.

## Candidate promotion form

```markdown
Candidate:
Product/category:
Source or artifact:
Prototype/manufacturing evidence:
Rule:
Risk/safety check:
Exception:
Status: proposed | accepted | rejected
```
