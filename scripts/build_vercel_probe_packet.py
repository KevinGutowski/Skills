#!/usr/bin/env python3
"""Build a descriptions-only packet for Vercel-pattern routing probes."""
from __future__ import annotations

import re
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
PROBES = ROOT / "docs" / "vercel-routing-probes-2026-06.md"


def skill_descriptions() -> list[tuple[str, str]]:
    rows: list[tuple[str, str]] = []
    for skill_md in sorted(ROOT.glob("*/SKILL.md")):
        text = skill_md.read_text(encoding="utf-8")
        match = re.match(r"---\n(.*?)\n---", text, re.DOTALL)
        if not match:
            continue
        data = yaml.safe_load(match.group(1)) or {}
        name = data.get("name", skill_md.parent.name)
        description = data.get("description", "")
        rows.append((name, description))
    return rows


def probe_rows() -> list[tuple[str, str, str]]:
    rows: list[tuple[str, str, str]] = []
    for line in PROBES.read_text(encoding="utf-8").splitlines():
        if not line.startswith("| V"):
            continue
        parts = [part.strip() for part in line.strip("|").split("|")]
        if len(parts) < 4 or parts[0] == "#":
            continue
        rows.append((parts[0], parts[1].strip('"'), parts[2]))
    return rows


def main() -> int:
    print("# Vercel-Pattern Routing Probe Packet\n")
    print(
        "Task for a fresh judge: using only the skill descriptions below, choose "
        "which one skill you would load first for each probe. If the expected "
        "answer lists a pair, choose the first skill you would load and name the "
        "second only if you think it is also required. Do not execute the tasks.\n"
    )
    print("## Skill Descriptions\n")
    for name, description in skill_descriptions():
        print(f"- `{name}`: {description}")
    print("\n## Probes\n")
    print("| # | Prompt | Expected | Judge answer | Notes |")
    print("| --- | --- | --- | --- | --- |")
    for probe_id, prompt, expected in probe_rows():
        print(f"| {probe_id} | {prompt} | {expected} |  |  |")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
