#!/usr/bin/env python3
"""Check per-skill smoke-test fixture coverage and recorded result shape."""

from __future__ import annotations

import re
import sys
from collections import Counter
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
TESTS = ROOT / "docs" / "per-skill-smoke-tests-2026-06.md"
RESULTS = ROOT / "docs" / "per-skill-smoke-results-2026-06.md"
BUILDER = ROOT / "scripts" / "build_skill_smoke_packet.py"


def smoke_rows() -> list[tuple[str, str, str]]:
    rows: list[tuple[str, str, str]] = []
    for line in TESTS.read_text().splitlines():
        if not line.startswith("| S"):
            continue
        cells = [cell.strip() for cell in line.strip("|").split("|")]
        if len(cells) < 4:
            raise ValueError(f"malformed smoke-test row: {line}")
        rows.append((cells[0], cells[1].strip("`"), cells[2]))
    return rows


def main() -> int:
    errors: list[str] = []
    for path in [TESTS, RESULTS, BUILDER]:
        if not path.exists():
            errors.append(f"missing required smoke-test artifact: {path.relative_to(ROOT)}")

    if errors:
        for error in errors:
            print(f"ERROR: {error}")
        return 1

    skills = sorted(path.parent.name for path in ROOT.glob("*/SKILL.md"))
    rows = smoke_rows()
    ids = [row[0] for row in rows]
    expected_skills = [row[1] for row in rows]

    wanted_ids = [f"S{index:02d}" for index in range(1, len(skills) + 1)]
    if ids != wanted_ids:
        errors.append(f"smoke IDs must be contiguous {wanted_ids[0]}-{wanted_ids[-1]}; got {ids}")

    if set(expected_skills) != set(skills):
        missing = sorted(set(skills) - set(expected_skills))
        extra = sorted(set(expected_skills) - set(skills))
        errors.append(f"smoke-test skill coverage mismatch: missing={missing} extra={extra}")

    duplicates = [skill for skill, count in Counter(expected_skills).items() if count > 1]
    if duplicates:
        errors.append(f"smoke-test duplicate expected skills: {duplicates}")

    for probe_id, skill, prompt in rows:
        if not prompt:
            errors.append(f"{probe_id}/{skill}: prompt is empty")
        if len(prompt) > 240:
            errors.append(f"{probe_id}/{skill}: prompt is {len(prompt)} chars (max 240)")

    packet = __import__("subprocess").run(
        [sys.executable, str(BUILDER)],
        cwd=ROOT,
        text=True,
        capture_output=True,
        check=False,
    )
    if packet.returncode != 0:
        errors.append(f"packet builder failed: {packet.stderr.strip()}")
    else:
        packet_text = packet.stdout
        for probe_id, _skill, prompt in rows:
            if probe_id not in packet_text or prompt not in packet_text:
                errors.append(f"packet missing {probe_id}")

    results_text = RESULTS.read_text(errors="replace")
    if re.search(r"Result: pass, 39/39", results_text):
        table_rows = [line for line in results_text.splitlines() if line.startswith("| S")]
        if len(table_rows) != len(skills):
            errors.append(f"result table has {len(table_rows)} rows, expected {len(skills)}")

    if errors:
        for error in errors:
            print(f"ERROR: {error}")
        return 1

    print(f"skill smoke-test check passed: {len(rows)} prompts for {len(skills)} skills")
    return 0


if __name__ == "__main__":
    sys.exit(main())
