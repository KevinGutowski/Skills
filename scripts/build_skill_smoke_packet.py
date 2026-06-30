#!/usr/bin/env python3
"""Build a descriptions-only packet for per-skill smoke routing."""

from __future__ import annotations

import re
from pathlib import Path

import yaml


ROOT = Path(__file__).resolve().parents[1]
TESTS = ROOT / "docs" / "per-skill-smoke-tests-2026-06.md"


def frontmatter(skill_md: Path) -> dict:
    text = skill_md.read_text(errors="replace")
    match = re.match(r"---\n(.*?)\n---", text, re.S)
    if not match:
        raise ValueError(f"{skill_md}: missing YAML frontmatter")
    return yaml.safe_load(match.group(1)) or {}


def smoke_rows() -> list[dict[str, str]]:
    rows: list[dict[str, str]] = []
    for line in TESTS.read_text().splitlines():
        if not line.startswith("| S"):
            continue
        cells = [cell.strip() for cell in line.strip("|").split("|")]
        if len(cells) < 4:
            raise ValueError(f"malformed smoke-test row: {line}")
        rows.append(
            {
                "id": cells[0],
                "prompt": cells[2],
                "notes": cells[3],
            }
        )
    return rows


def main() -> int:
    print("# Skill Smoke Routing Packet")
    print()
    print("Choose the first skill you would load for each prompt using only this packet.")
    print("If a second skill is genuinely required, name it separately.")
    print("Do not inspect the repository, skill bodies, or reference files.")
    print()
    print("## Available Skills")
    print()
    for skill_md in sorted(ROOT.glob("*/SKILL.md")):
        metadata = frontmatter(skill_md)
        print(f"- `{skill_md.parent.name}`: {metadata.get('description', '').strip()}")
    print()
    print("## Prompts")
    print()
    for row in smoke_rows():
        print(f"- {row['id']}: {row['prompt']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
