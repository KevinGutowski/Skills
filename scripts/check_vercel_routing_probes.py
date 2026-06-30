#!/usr/bin/env python3
"""Validate the Vercel-pattern routing probe fixture."""

from __future__ import annotations

import re
import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PROBES = ROOT / "docs" / "vercel-routing-probes-2026-06.md"
PACKET_BUILDER = ROOT / "scripts" / "build_vercel_probe_packet.py"
EXTERNAL_ROUTING_EVAL = Path.home() / ".claude" / "skill-evals" / "routing-eval.md"


PROBE_ID_RE = re.compile(r"^V(\d+)$")
SKILL_RE = re.compile(r"`([^`]+)`")


def parse_probe_rows() -> list[dict[str, object]]:
    rows: list[dict[str, object]] = []
    for line in PROBES.read_text().splitlines():
        if not line.startswith("| V"):
            continue
        cells = [cell.strip() for cell in line.strip("|").split("|")]
        if len(cells) < 4:
            continue
        probe_id, prompt, expected, notes = cells[:4]
        rows.append(
            {
                "id": probe_id,
                "prompt": prompt.strip('"'),
                "expected": expected,
                "notes": notes,
                "skills": SKILL_RE.findall(expected),
            }
        )
    return rows


def main() -> int:
    errors: list[str] = []
    skill_names = {path.parent.name for path in ROOT.glob("*/SKILL.md")}
    rows = parse_probe_rows()

    if not rows:
        errors.append("no routing probe rows found")

    numbers: list[int] = []
    for row in rows:
        probe_id = str(row["id"])
        match = PROBE_ID_RE.match(probe_id)
        if not match:
            errors.append(f"invalid probe id: {probe_id}")
            continue
        numbers.append(int(match.group(1)))

        prompt = str(row["prompt"])
        if not prompt:
            errors.append(f"{probe_id}: empty prompt")

        expected_skills = row["skills"]
        if not expected_skills:
            errors.append(f"{probe_id}: no expected skill in backticks")
        for skill in expected_skills:
            if skill not in skill_names:
                errors.append(f"{probe_id}: expected missing skill `{skill}`")

    expected_numbers = list(range(1, len(rows) + 1))
    if numbers != expected_numbers:
        errors.append(f"probe ids are not contiguous: got {numbers}, expected {expected_numbers}")

    try:
        packet = subprocess.check_output(
            [sys.executable, str(PACKET_BUILDER)],
            cwd=ROOT,
            text=True,
            stderr=subprocess.STDOUT,
        )
    except subprocess.CalledProcessError as exc:
        errors.append(f"packet builder failed:\n{exc.output}")
        packet = ""

    for row in rows:
        probe_id = str(row["id"])
        prompt = str(row["prompt"])
        if probe_id and probe_id not in packet:
            errors.append(f"{probe_id}: missing from generated probe packet")
        if prompt and prompt not in packet:
            errors.append(f"{probe_id}: prompt missing from generated probe packet")

    if EXTERNAL_ROUTING_EVAL.exists() and rows:
        external = EXTERNAL_ROUTING_EVAL.read_text(errors="replace")
        for row in rows:
            probe_number = 114 + int(PROBE_ID_RE.match(str(row["id"])).group(1))
            prompt = str(row["prompt"])
            first_skill = row["skills"][0] if row["skills"] else ""
            pattern = re.compile(
                rf"^{probe_number}\.\s+\"{re.escape(prompt)}\"\s+→\s+\*\*{re.escape(first_skill)}\*\*",
                re.M,
            )
            if not pattern.search(external):
                errors.append(
                    f"{row['id']}: external routing-eval probe {probe_number} "
                    f"does not match prompt and first skill"
                )

    if errors:
        for error in errors:
            print(f"ERROR: {error}")
        return 1

    print(f"routing probe fixture check passed: {len(rows)} probes, {len(skill_names)} skills")
    return 0


if __name__ == "__main__":
    sys.exit(main())
