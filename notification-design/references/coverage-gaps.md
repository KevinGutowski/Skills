# Coverage Gaps

Use this file for notification strategy that needs current platform docs, product metrics, or accepted examples before becoming durable guidance.

## Candidate gaps

- **Current Apple APIs:** Interruption levels, Focus, the scheduled summary and the Live Activity decision/lifecycle were promoted on 2026-11-12 into [delivery-system.md](delivery-system.md) from the live HIG and ActivityKit/UserNotifications docs (no talk source behind them — re-fetch on each OS release). Still unverified here: critical-alert entitlement process, Time Sensitive setup steps, notification-triggered automations (one line in `apple-design` (app-intents-design)), Live Activity presentation design (link-out to the HIG only), and broadcast/channel pushes.
- **Rule IDs:** Candidate reusable rules include earn-the-interruption, pause-the-unengaged, prompt-in-context, thread-only-real-streams, and self-contained-package. Add IDs only with source and examples.
- **Frequency/retention metrics:** Add thresholds only when product data shows value, opt-outs, fatigue, and re-engagement effects.
- **Non-Apple channels:** Email, SMS, Slack, Discord, browser push, and in-app inboxes need channel-specific examples before cross-channel rules.
- **Copy boundary:** Notification wording and tone belong in `ux-writing`; this skill owns whether, when, and what notification surface.

## Candidate promotion form

```markdown
Candidate:
Channel/platform:
Current docs checked:
Source or product evidence:
Rule:
User-control setting:
Exception:
Status: proposed | accepted | rejected
```
