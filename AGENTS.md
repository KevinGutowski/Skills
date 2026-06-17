# Agent Quickstart

This repository stores installable skills as top-level directories. Do not assume the OpenAI curated layout `skills/.curated`; `skill-installer` list commands that rely on that default path can fail here.

Start here:

1. Read `README.md` for the human index and routing boundaries.
2. Read `docs/agent-quickstart.md` before installing, auditing, or modifying this repo.
3. Read `docs/skill-library-ops.md` before folding new sources or changing skill taxonomy.

Install with explicit root-level paths:

```bash
python /root/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py \
  --repo KevinGutowski/Skills \
  --path design-craft devtools working-with-ai
```

If a listing command fails, inspect the repo tree instead of stopping:

```bash
find . -maxdepth 2 -name SKILL.md | sort
```

Validation before committing:

```bash
python3 scripts/validate_skills.py
git diff --check
```
