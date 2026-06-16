#!/usr/bin/env python3
"""Run the repo validator plus skill-creator-compatible frontmatter checks.

Use this as the PR/CI gate:
  python3 scripts/validate_all.py
"""
from __future__ import annotations

import glob
import os
import re
import shutil
import subprocess
import sys
from pathlib import Path

import yaml

ALLOWED_FRONTMATTER = {"allowed-tools", "description", "license", "metadata", "name"}
MAX_SKILL_NAME_LENGTH = 64


def skill_dirs() -> list[Path]:
    try:
        result = subprocess.run(
            ["git", "ls-files", "*/SKILL.md"],
            check=True,
            capture_output=True,
            text=True,
        )
        paths = [Path(line).parent for line in result.stdout.splitlines() if line.strip()]
        if paths:
            return sorted(paths)
    except (subprocess.CalledProcessError, FileNotFoundError):
        pass
    return sorted(Path(path).parent for path in glob.glob("*/SKILL.md"))


def validate_quick_compatible(skill_dir: Path) -> list[str]:
    skill_md = skill_dir / "SKILL.md"
    content = skill_md.read_text(encoding="utf-8")
    errors: list[str] = []

    match = re.match(r"^---\n(.*?)\n---", content, re.DOTALL)
    if not match:
        return [f"{skill_md}: invalid frontmatter format"]

    try:
        frontmatter = yaml.safe_load(match.group(1))
    except yaml.YAMLError as exc:
        return [f"{skill_md}: invalid YAML in frontmatter: {exc}"]

    if not isinstance(frontmatter, dict):
        return [f"{skill_md}: frontmatter must be a YAML dictionary"]

    unexpected = sorted(set(frontmatter) - ALLOWED_FRONTMATTER)
    if unexpected:
        allowed = ", ".join(sorted(ALLOWED_FRONTMATTER))
        errors.append(
            f"{skill_md}: unexpected frontmatter key(s): {', '.join(unexpected)}. "
            f"Allowed: {allowed}"
        )

    name = frontmatter.get("name")
    if not isinstance(name, str) or not name.strip():
        errors.append(f"{skill_md}: missing string name")
    else:
        if not re.match(r"^[a-z0-9-]+$", name):
            errors.append(f"{skill_md}: name {name!r} must be lowercase hyphen-case")
        if name.startswith("-") or name.endswith("-") or "--" in name:
            errors.append(f"{skill_md}: name {name!r} has invalid hyphen placement")
        if len(name) > MAX_SKILL_NAME_LENGTH:
            errors.append(f"{skill_md}: name is too long ({len(name)} chars)")

    description = frontmatter.get("description")
    if not isinstance(description, str) or not description.strip():
        errors.append(f"{skill_md}: missing string description")
    else:
        if "<" in description or ">" in description:
            errors.append(f"{skill_md}: description cannot contain angle brackets")
        if len(description) > 1024:
            errors.append(f"{skill_md}: description is too long ({len(description)} chars)")

    return errors


def find_quick_validate() -> str | None:
    env_path = os.environ.get("QUICK_VALIDATE")
    candidates = [
        env_path,
        "/root/.codex/skills/.system/skill-creator/scripts/quick_validate.py",
        str(Path.home() / ".codex/skills/.system/skill-creator/scripts/quick_validate.py"),
    ]
    for candidate in candidates:
        if candidate and Path(candidate).is_file():
            return candidate
    return shutil.which("quick_validate.py")


def run_quick_validate_script(script: str, dirs: list[Path]) -> list[str]:
    errors: list[str] = []
    for skill_dir in dirs:
        result = subprocess.run(
            [sys.executable, script, str(skill_dir)],
            capture_output=True,
            text=True,
        )
        if result.returncode != 0:
            output = (result.stdout + result.stderr).strip()
            errors.append(f"{skill_dir}: {output}")
    return errors


def main() -> int:
    repo_result = subprocess.run([sys.executable, "scripts/validate_skills.py"])
    dirs = skill_dirs()

    strict_errors: list[str] = []
    for skill_dir in dirs:
        strict_errors.extend(validate_quick_compatible(skill_dir))

    quick_script = find_quick_validate()
    if quick_script:
        strict_errors.extend(run_quick_validate_script(quick_script, dirs))

    for error in strict_errors:
        print("FAIL", error)

    if quick_script:
        print(f"\nquick_validate.py checked via {quick_script}")
    else:
        print("\nquick_validate.py not found; ran built-in compatibility checks")
    print(f"{len(dirs)} tracked skills checked for strict frontmatter compatibility")

    return 1 if repo_result.returncode or strict_errors else 0


if __name__ == "__main__":
    raise SystemExit(main())
