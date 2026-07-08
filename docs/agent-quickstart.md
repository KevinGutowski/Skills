# Agent Quickstart

Use this when an AI agent, Codex session, or installer needs to work with this repository as a skill source.

## What Is Unusual Here

This repo does not use the default curated-skill layout:

- Skills live as root-level directories such as `design-craft/`, `devtools/`, `working-with-ai/`, and `creating-skills/`.
- There is no `skills/.curated` directory.
- A generic `skill-installer` list command may fail if it assumes that default path.
- The correct install path is explicit: `--path <root-level-skill-dir>`.

## First Commands

List available skills from a local checkout:

```bash
find . -maxdepth 2 -name SKILL.md | sed 's#^\./##; s#/SKILL.md$##' | sort
```

Install a focused bundle from GitHub:

```bash
python /root/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py \
  --repo KevinGutowski/Skills \
  --path design-craft devtools working-with-ai
```

If using a fresh Codex session, installed skills normally route after restart. In the current session, read the installed `SKILL.md` files directly.

## Bundle Recipes

| Task | Install |
|---|---|
| UI polish / frontend cleanup | `design-craft frontend-design web-design` |
| Admin or developer-tool UI | `devtools design-craft data-viz` |
| AI-generated UI repair | `working-with-ai design-prototyping design-craft frontend-design` |
| Skill authoring / source conversion | `creating-skills research-cataloging x-post-reader` |
| Rails work | `rails dhh` |
| Apple platform design | `apple-design swiftui` |

Keep bundles small. Install the few skills that match the task, then follow their `SKILL.md` routing to references.

For framework work, start with the framework/platform skill router, not a remembered style summary or a deep reference. Example: Rails work starts with `rails/SKILL.md`; that router decides whether to read DHH style, Active Record associations, migrations, testing, performance, or official Rails Guides lookup. Only after the framework mechanism is grounded should project-specific rules or helper methods decide the final shape.

## If Installer Listing Fails

Failure shape seen in the wild:

```text
Skills path not found: https://github.com/KevinGutowski/Skills/tree/main/skills/.curated
```

Recovery:

1. Inspect the repository tree instead of assuming the repo is invalid.
2. Find root-level `SKILL.md` files.
3. Install the selected root-level directory names with `--path`.
4. Read each installed `SKILL.md`; if it points to a relevant reference, read that reference before acting.

GitHub API fallback when only a remote repo is available:

```bash
curl -sS https://api.github.com/repos/KevinGutowski/Skills/git/trees/main?recursive=1 \
  | python3 -c 'import json,sys; data=json.load(sys.stdin); print("\n".join(sorted(i["path"][:-9] for i in data["tree"] if i["path"].endswith("/SKILL.md"))))'
```

## Working In The Repo

Before editing:

- Read the relevant skill body and any directly linked references.
- Use [docs/skill-library-ops.md](skill-library-ops.md) for source folds, taxonomy changes, or external skill intake.
- Prefer extending existing skills over adding new ones.
- Keep decisive instructions near the top of a `SKILL.md`; agents often read only the first chunk.

Before committing:

```bash
python3 scripts/validate_all.py
git diff --check
```

Run targeted validation too when diagnosing one skill:

```bash
python3 /root/.codex/skills/.system/skill-creator/scripts/quick_validate.py path/to/skill
```

## Maintenance Checklist

- README names the repo layout and gives a working install command.
- `AGENTS.md` stays short enough to read automatically.
- Bundle recipes remain examples, not exhaustive taxonomy.
- Any new top-level skill gets a README row and validation.
- Any renamed skill gets a grep audit for stale references.
