#!/usr/bin/env python3
"""Validate routing probe fixtures and build blind descriptions-only packets.

A fixture is a Markdown table with rows `| <ID> | "prompt" | `skill` | notes |`,
where the ID is a letter prefix plus a number (W1, W2, ...). The check verifies
that IDs are contiguous, prompts are present and unique, and every expected
skill exists. `--packet` prints the skill descriptions and prompts without the
expected answers, for a fresh judge.
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

import yaml


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_FIXTURES = [
    ROOT / "docs" / "web-motion-routing-probes-2026-11.md",
    ROOT / "docs" / "description-boundary-routing-probes-2026-11.md",
]

ROW_RE = re.compile(r"^\| ([A-Z]+)(\d+) \|")
SKILL_RE = re.compile(r"`([^`]+)`")


def parse_rows(fixture: Path) -> list[dict[str, object]]:
    rows: list[dict[str, object]] = []
    for line in fixture.read_text(encoding="utf-8").splitlines():
        match = ROW_RE.match(line)
        if not match:
            continue
        cells = [cell.strip() for cell in line.strip("|").split("|")]
        if len(cells) < 4:
            continue
        rows.append(
            {
                "prefix": match.group(1),
                "number": int(match.group(2)),
                "id": cells[0],
                "prompt": cells[1].strip('"'),
                "skills": SKILL_RE.findall(cells[2]),
            }
        )
    return rows


def skill_descriptions() -> list[tuple[str, str]]:
    out: list[tuple[str, str]] = []
    for skill_md in sorted(ROOT.glob("*/SKILL.md")):
        text = skill_md.read_text(encoding="utf-8")
        match = re.match(r"---\n(.*?)\n---", text, re.DOTALL)
        if not match:
            continue
        data = yaml.safe_load(match.group(1)) or {}
        out.append((data.get("name", skill_md.parent.name), data.get("description", "")))
    return out


def check(fixture: Path, skill_names: set[str]) -> list[str]:
    errors: list[str] = []
    label = fixture.name
    if not fixture.exists():
        return [f"{label}: fixture not found"]
    rows = parse_rows(fixture)
    if not rows:
        return [f"{label}: no probe rows found"]

    prefixes = {str(row["prefix"]) for row in rows}
    if len(prefixes) != 1:
        errors.append(f"{label}: mixed probe id prefixes {sorted(prefixes)}")
    numbers = [int(row["number"]) for row in rows]
    expected = list(range(1, len(rows) + 1))
    if numbers != expected:
        errors.append(f"{label}: probe ids are not contiguous: got {numbers}")

    seen: set[str] = set()
    for row in rows:
        probe_id, prompt = str(row["id"]), str(row["prompt"])
        if not prompt:
            errors.append(f"{label} {probe_id}: empty prompt")
        if prompt in seen:
            errors.append(f"{label} {probe_id}: duplicate prompt")
        seen.add(prompt)
        skills = row["skills"]
        if not skills:
            errors.append(f"{label} {probe_id}: no expected skill in backticks")
        for skill in skills:
            if skill not in skill_names:
                errors.append(f"{label} {probe_id}: expected missing skill `{skill}`")
    return errors


def packet(fixtures: list[Path]) -> str:
    lines = [
        "# Routing Probe Packet (descriptions only)",
        "",
        "Choose the first skill you would load for each prompt using only this packet.",
        "If a second skill is genuinely required, name it separately.",
        "If no skill fits, answer `none`. Do not execute the tasks.",
        "Do not inspect any repository, skill bodies, reference files, or the web.",
        "",
        "## Skill Descriptions",
        "",
    ]
    lines += [f"- `{name}`: {description}" for name, description in skill_descriptions()]
    lines += ["", "## Probes", "", "| # | Prompt |", "| --- | --- |"]
    for fixture in fixtures:
        for row in parse_rows(fixture):
            lines.append(f"| {row['id']} | {row['prompt']} |")
    return "\n".join(lines) + "\n"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("fixtures", nargs="*", type=Path, help="fixture files (default: built-in list)")
    parser.add_argument("--packet", action="store_true", help="print a blind judge packet and exit")
    args = parser.parse_args()
    fixtures = [path.resolve() for path in args.fixtures] or DEFAULT_FIXTURES

    if args.packet:
        sys.stdout.write(packet(fixtures))
        return 0

    skill_names = {path.parent.name for path in ROOT.glob("*/SKILL.md")}
    errors: list[str] = []
    total = 0
    for fixture in fixtures:
        errors += check(fixture, skill_names)
        total += len(parse_rows(fixture)) if fixture.exists() else 0

    if errors:
        for error in errors:
            print(f"ERROR: {error}")
        return 1
    print(f"routing probe fixtures passed: {len(fixtures)} fixture(s), {total} probes, {len(skill_names)} skills")
    return 0


if __name__ == "__main__":
    sys.exit(main())
