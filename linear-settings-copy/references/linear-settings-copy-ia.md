# Linear Settings Copy And IA Reference

Grounded in a live inspection of Linear settings pages on May 20, 2026. This file is a structured analysis, not a verbatim transcript. It captures the patterns needed to write similar settings copy and organize settings surfaces.

## Sidebar IA

Linear separates settings by ownership and product domain.

Account-level pages:

- Preferences: personal defaults and interface behavior.
- Profile: identity fields, avatar, username/name fields, and workspace access actions.
- Notifications: channels and subscription preferences.
- Security/access: sessions, devices, account access, and revocation actions.
- Connected accounts: user-level external accounts and attribution sync.
- Agent personalization: personal instructions, reusable prompts, and MCP access for agents.

Workspace/product pages:

- Issues: labels, templates, service-level agreements.
- Projects: labels, templates, statuses, update behavior.
- Features: AI/agents, initiatives, documents, customer requests, releases, update feeds, intake/ask flows, emojis, integrations.
- Teams: each team has its own settings hub for general properties, access, members, notifications, labels, templates, workflows, cycles, and views.

Placement rule:

- If it changes only the current user's experience, put it under Account.
- If it changes shared defaults or shared data, put it under Workspace or the relevant feature page.
- If it configures an external service for the whole workspace, put it under Integrations.
- If it affects one team, put it under that team's settings.
- If it is a personal OAuth/account link, put it under Connected accounts.

## Page Archetypes

### Preferences

Use for small personal choices. Group into compact sections, each with bordered cards of rows. Rows usually pair a short label with a short description and a right-side dropdown, toggle, or button.

Observed section pattern:

- General behavior settings.
- Interface/theme settings.
- Code/editor-style settings when relevant.

Use this archetype for:

- App launch defaults.
- Display/name behavior.
- Input shortcuts.
- UI density, theme, cursor behavior.
- Personal syntax/theme preferences.

### Profile

Use a very sparse page. Avoid a page intro unless the context is ambiguous. Put field rows directly in a card. Include profile photo first, then identity fields, then workspace access/destructive-adjacent actions.

Good row order:

1. Profile picture/avatar.
2. Email or account identifier.
3. Name fields.
4. Short public identifier such as username.
5. Workspace access or remove-yourself actions.

### Notifications

Separate delivery channels from product/update subscriptions. Channel rows describe what goes through the channel and show a compact state summary. Newsletter/product-update rows can be grouped separately.

Description pattern:

- Explain what activity flows through the channel.
- Use status summaries as controls or secondary labels.

### Security And Access

Use lists for sessions/devices and action buttons for revoke/log out. Write device/session rows as object-first labels with location/recency metadata. Use stronger verbs for security actions, but keep them concise.

### Connected Accounts

Use provider rows. Each provider row should state:

- Provider name.
- What connecting enables.
- Current connected identity or workspace when connected.
- Action: connect, reconnect, disconnect, or manage.

Use this for user-specific account links. Do not put workspace-wide integrations here.

### Agent Personalization

Use for personal AI context and per-user agent resources. Group by the thing the agent consumes: guidance, reusable prompts/skills, external context/MCP. Empty states are acceptable when they clarify the missing object and offer a creation action.

### Feature Settings Pages

Feature pages often begin with a short description of the feature, then an enablement row, then operational sections.

Common feature sections:

- Enablement: whether the workspace can use the feature.
- Routing/defaults: where new objects go.
- Schedules/reminders: cadence and notification behavior.
- Statuses/tiers/types: taxonomy objects the workspace can configure.
- Slack or external notifications: delivery targets and connection state.
- Templates: reusable creation flows.

Use a subpage when a feature has more than one of these concepts.

### Templates, Labels, Statuses

Use list/table pages. Page copy should explain availability and scope, then move quickly to the table or empty state. Empty states should be plain and object-specific, with a creation action nearby.

Pattern:

- Page title names the object type.
- Description says where templates/labels/statuses apply.
- Primary action is object creation.
- Table headers are nouns, not sentences.

### Integrations Directory

Use a marketplace/directory structure: page title, one-line benefit, search, enabled group, then categories. Integration cards use provider names, state badges, and compact category grouping.

Use this for workspace-level app integrations, not individual account connections.

### Team Settings Hub

Use an index page when a team has many settings subareas. Each row links to a subpage and uses:

- Subpage name.
- One-line description of what it manages.
- Optional count/state on the right.

## Row Anatomy

Every row should be understandable by scanning the title and control.

Recommended structure:

```text
Title
Short description
[control/action/state]
```

Title rules:

- Use sentence case.
- Prefer 2-5 words.
- Use nouns for objects: profile picture, update schedule, Slack notifications.
- Use concise verb phrases for behavioral toggles: use pointer cursors, convert text emoticons.
- Avoid product-marketing language.
- Avoid repeating the page title unless needed for clarity.

Description rules:

- Keep to one line when possible.
- Explain the outcome, not the UI.
- Mention scope: your account, this workspace, this team, project members, subscribers.
- Mention trigger when relevant: when creating issues, when hovering, when updates are due.
- Omit terminal punctuation for short fragments if the surrounding UI style does.
- Use a period only for multi-sentence explanatory text or docs-like feature descriptions.

Control label rules:

- Dropdown options should be states, not instructions.
- Toggle-side state labels should be short.
- Action buttons should be direct verbs.
- If the control opens a deeper editor, use configure, customize, edit, manage, or connect.

## Description Formulae

Use these as patterns, not templates to copy blindly.

Personal preference:

```text
Choose how [thing] appears across the interface
```

Shortcut/input behavior:

```text
Choose which key press submits [object]
```

Display or privacy behavior:

```text
Choose how [sensitive thing] is shown
```

Workspace default:

```text
Applies to all members who have not set their own preference
```

Routing/default:

```text
New [objects] are routed to [place] for [reason]
```

Notifications:

```text
Send [object] updates to [destination]
```

Integration:

```text
Sync [specific data/action] between [product] and [service]
```

Enablement:

```text
Workspace-wide access to [capability]
```

Empty state:

```text
No [objects] configured
```

## Option Labels

Observed option labels are usually short states or named presets.

Use:

- Default
- Enabled / Disabled
- Daily / Weekly / Never
- Visible / Hidden / Show on hover
- Regular / Compact / Comfortable
- Light / Dark / System
- Sunday / Monday for calendar starts
- Named provider/model/profile options when the option is a real entity

Avoid:

- Full sentences in dropdown options.
- Repeating the row title inside each option.
- Explaining consequences in the option label. Put consequences in helper text or a detail panel.

## Action Labels

Use concise verbs:

- Connect
- Reconnect
- Configure
- Customize
- Edit
- Manage
- Revoke
- Log out
- Upload
- New template
- New label
- Create skill

Destructive actions should be literal and object-specific. Use the object name in the button when ambiguity is possible.

## Subpage Split Rules

Create a separate settings subpage when:

- The topic has a table/list of objects.
- There are multiple create/edit/manage actions.
- There is an enablement row plus follow-up configuration.
- A feature has routing, statuses, schedules, and notifications.
- The settings affect a specific domain such as projects, issues, releases, or a team.
- The sidebar label would make scanning easier than a long section inside a generic page.

Keep settings as a section inside an existing page when:

- There are only 1-3 rows.
- The rows share the same ownership and mental model.
- The setting is a preference, not an admin workflow.
- The user should not need to "visit" the concept as a destination.

## Naming Pages And Sections

Page names are mostly nouns:

- Preferences
- Profile
- Notifications
- Security and access
- Connected accounts
- Agent personalization
- Integrations
- Labels
- Templates
- Statuses
- Updates
- Members

Section names should be shorter than page names when possible:

- General
- Interface and theme
- Sessions
- Notification channels
- Updates
- Automation rules
- Display options
- Slack notifications
- Workspace access

Do not add a section heading if the card is self-explanatory and the heading merely repeats the row title.

## Good Settings Copy Checklist

- The title names the setting, not the control.
- The description explains effect or scope in plain language.
- The right-side control can be understood without reading the description.
- The setting is in the smallest appropriate IA container.
- Personal, workspace, integration, and team settings are not mixed.
- Option labels are parallel in grammar and length.
- Empty states say what is absent and pair with the natural creation action.
- Destructive/security actions are explicit but not dramatic.
- The page can be scanned by reading only headings and row titles.

