# Coverage Gaps

Use this file for feature-teaching guidance that needs current platform docs or accepted examples before becoming durable.

## Candidate gaps

- **Current TipKit API names:** the example in [examples.md](examples.md) was rewritten to shipped names against the TipKit docs on 2026-11-12 but not compiled (no Xcode in the authoring environment); the talk's launch-argument testing override was not re-verified. Verify against the target SDK before writing implementation guidance.
- **Non-Apple platforms:** The core discoverability principles travel, but platform-specific teaching patterns for web, Android, desktop, and CLI tools need their own examples.
- **Re-entry flows:** The Ryo Lu re-entry idea needs accepted examples for churned users returning to changed products.
- **Tip eligibility fixtures:** Add examples only when a product has event data, display caps, invalidation rules, and a clear "benefited user" definition.
- **Onboarding boundary:** Signup, activation, and empty-state persuasion belong in `user-onboarding`; this skill should own in-app feature finding and teaching.

## Candidate promotion form

```markdown
Candidate:
Surface/platform:
Source or accepted example:
Eligibility/event data:
Rule:
Exception:
Status: proposed | accepted | rejected
```
