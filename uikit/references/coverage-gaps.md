# Coverage Gaps

UIKit uncertainty kept out of the router body.

## Candidate gaps

- **Single external source:** every reference distills one author's skill set (see [sources.md](sources.md)). Its API facts cite Apple docs, WWDC and SDK headers, but this library has not re-verified each symbol. Before promoting a rule into the router, check the symbol's availability via the docs `.md` page.
- **iOS 27 / 27.1 freshness:** `uikit-ios27-sdk` was written against the iOS 27 SDK as of Oct 2026 and its iPhone Duo (27.1) section re-checked against Apple's first-party docs and tech talks on 2026-11-05 — that check found Objective-C declarations for `UIArrangementViewController` and reserved regions that the third-party source called Swift-only. Re-verify after each SDK point release; the iPhone Duo Group Lab livestreams were not read (no transcripts).
- **Measured recipe scope:** the `uikit-live-lists` recipe was measured on one chat-list task, mostly on simulators (iPhone 17 sim, iOS 26.4) plus an iPhone 12, with Opus and one Codex model. Unmeasured: prefetching while finger-flinging, keyboard/inset changes, media rows, RTL, VoiceOver, day sections, the general-list wording (`v1.1.0-general1`). The 0.1 s flush timer vs next-turn flush trades latency for CPU and the source's own evidence disagrees; treat it as a default to measure, not a law.
- **Table-view path:** the source cut its table-view alternative (no build used it). `UITableView` live-list guidance here is thin.
- **Objective-C coverage:** kept as notes per reference, not full examples. Mixed Swift/Objective-C interop beyond annotations is not covered.
- **Mac Catalyst / visionOS:** only incidental notes.

## Candidate promotion form

```markdown
Candidate:
Owning reference:
Apple source checked (doc .md availability / WWDC / header):
Deployment target:
Observed project failure or accepted review:
Rule:
Exception:
Status: proposed | accepted | rejected
```
