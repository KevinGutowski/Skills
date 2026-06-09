#!/usr/bin/env python3
"""Validate every */SKILL.md in the repo.

Checks:
  1. Frontmatter parses as strict YAML (--- delimited block at top of file)
  2. `name` and `description` keys present; name matches the directory name
  3. description <= 1024 chars (official Agent Skills limit)
  4. SKILL.md body <= 500 lines (progressive-disclosure guidance)
  5. Relative links / referenced files in SKILL.md resolve on disk

Exit code 0 = clean, 1 = problems found. Run from the repo root:
  python3 scripts/validate_skills.py
"""
import glob
import os
import re
import sys

try:
    import yaml
except ImportError:
    sys.exit("pyyaml required: pip3 install pyyaml")

MAX_DESC = 1024
MAX_LINES = 500

problems = []
warnings = []

for path in sorted(glob.glob("*/SKILL.md")):
    skill_dir = os.path.dirname(path)
    text = open(path, encoding="utf-8").read()

    # 1. frontmatter parses
    m = re.match(r"^---\n(.*?)\n---\n", text, re.S)
    if not m:
        problems.append(f"{path}: no frontmatter block")
        continue
    try:
        meta = yaml.safe_load(m.group(1))
    except yaml.YAMLError as e:
        problems.append(f"{path}: YAML error — {str(e).splitlines()[0]}")
        continue

    # 2. required keys
    if not isinstance(meta, dict) or "name" not in meta:
        problems.append(f"{path}: missing `name`")
        continue
    if "description" not in meta or not str(meta.get("description", "")).strip():
        problems.append(f"{path}: missing `description`")
        continue
    if meta["name"] != skill_dir:
        warnings.append(f"{path}: name `{meta['name']}` != directory `{skill_dir}`")

    # 3. description length
    if len(meta["description"]) > MAX_DESC:
        problems.append(f"{path}: description {len(meta['description'])} chars (max {MAX_DESC})")

    # 4. body line count
    lines = text.count("\n") + 1
    if lines > MAX_LINES:
        problems.append(f"{path}: {lines} lines (max {MAX_LINES} — move detail to references/)")

    # 5. referenced local files exist (markdown links + bare references/ mentions).
    # Strip fenced/inline code first — teaching skills show example paths there.
    prose = re.sub(r"```.*?```", "", text, flags=re.S)
    prose = re.sub(r"`[^`\n]*`", "", prose)
    refs = set(re.findall(r"\]\((?!https?://|#)([^)\s]+)\)", prose))
    # Backticked references/ paths are checked only when the skill actually has
    # a references/ dir — teaching skills cite example paths illustratively.
    if os.path.isdir(os.path.join(skill_dir, "references")):
        refs |= set(re.findall(r"`(references/[\w./-]+\.md)`", prose))
    for ref in refs:
        target = os.path.normpath(os.path.join(skill_dir, ref.split("#")[0]))
        if not os.path.exists(target):
            problems.append(f"{path}: broken reference -> {ref}")

for w in warnings:
    print("WARN", w)
for p in problems:
    print("FAIL", p)

total = len(glob.glob("*/SKILL.md"))
print(f"\n{total} skills checked — {len(problems)} problem(s), {len(warnings)} warning(s)")
sys.exit(1 if problems else 0)
