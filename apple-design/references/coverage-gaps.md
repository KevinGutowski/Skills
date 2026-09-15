# Coverage Gaps

Use this file to keep weak Apple platform guidance visible without turning it into durable skill law.

## Candidate gaps

- **Post-WWDC HIG drift:** Liquid Glass, menus, sidebars, search placement, app icons, App Intents, and charting should be re-checked against the live HIG after Apple updates the design docs.
- **Platform-specific exceptions:** Some references are iOS-heavy. macOS, watchOS, tvOS, visionOS, and iPad windowing exceptions need live docs before a cross-platform rule is promoted.
- **Current API/spec names:** The design skill should avoid hard-coding implementation API names unless the corresponding SwiftUI/UIKit docs were just verified — verification is a single Markdown fetch now (`/documentation/<Framework>/<Symbol>.md`, `availability` block in the leading comment). Route implementation names to `swiftui`.
- **Real app exemplars:** Add accepted before/after examples only after an actual app review or redesign decision is worth repeating.
- **Deterministic checks:** Possible future checks include HIG slug reachability, dead reference links, and stale "June/WWDC" claims, but do not add a linter until false positives are low. Slug reachability is now trivially scriptable against the Markdown endpoint (a HEAD per slug); a manual sweep on 2026-09-15 had all 153 topic-map slugs returning 200, so the check would have caught nothing yet — revisit after the next WWDC renames some pages.

## Candidate promotion form

```markdown
Candidate:
Owning reference:
Current Apple source checked:
Local example:
Scope/platform:
Rule:
Exception:
Status: proposed | accepted | rejected
```
