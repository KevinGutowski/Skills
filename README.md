# Skill Forge

A local app for authoring [Claude Skills](https://support.claude.com/en/articles/12512198-how-to-create-custom-skills) — the modular capabilities that extend Claude's functionality.

## Quick Start

```bash
# Install Node.js if you haven't already
# https://nodejs.org/

# Navigate to the project folder
cd /path/to/Skills

# Start the server
node server.js

# Open in browser
open http://localhost:8765
```

The server will display:
```
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   ⚒  Skill Forge Server                              ║
║                                                       ║
║   Running at: http://localhost:8765                  ║
║   Skills stored in: ./skills/                         ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
```

## Features

- **Create Skills** — Form-based editor with name validation, character counts, and markdown preview
- **Edit Skills** — Modify existing skills and save changes
- **Delete Skills** — Remove skills from disk
- **Import ZIP** — Add existing skill ZIPs to your collection
- **Download ZIP** — Export skills as ZIPs for sharing or uploading to Claude

## How It Works

Skills are stored as ZIP files in the `./skills/` folder:

```
Skills/
├── server.js       # Node.js backend
├── index.html      # Frontend
├── style.css
├── script.js
└── skills/         # Your skills (auto-created)
    ├── my-skill.zip
    └── another-skill.zip
```

Each ZIP contains the skill folder with a `SKILL.md` file:

```
my-skill.zip
└── my-skill/
    └── SKILL.md
```

## SKILL.md Format

Generated files follow [Claude's skill format](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview):

```yaml
---
name: my-skill
description: What this skill does and when Claude should use it.
dependencies: python>=3.8, pandas>=1.5.0
---

## Overview

Instructions for Claude...

## Examples

Example usage...
```

## Uploading to Claude

### Claude.ai

1. Go to **Settings > Features**
2. Click **Add Skill**
3. Upload your `.zip` file from the `./skills/` folder

### Claude API

Use the Skills API endpoints to upload your ZIPs programmatically. See the [API documentation](https://platform.claude.com/docs/en/build-with-claude/skills-guide).

## Requirements

- Node.js (v14 or later)
- Modern browser (Chrome, Edge, Firefox, Safari)

## Port Configuration

By default, the server runs on port `8765`. To change it, edit `server.js`:

```javascript
const PORT = 8765; // Change this
```

## License

MIT
