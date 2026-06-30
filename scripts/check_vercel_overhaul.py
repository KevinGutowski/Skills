#!/usr/bin/env python3
"""Check the local Vercel-pattern skill overhaul invariants."""

from __future__ import annotations

import re
import sys
from collections import Counter
from pathlib import Path

import yaml


ROOT = Path(__file__).resolve().parents[1]
AUDIT = ROOT / "docs" / "vercel-skill-audit-2026-06.md"
LEDGER = ROOT / "docs" / "vercel-product-design-overhaul-2026-06.md"
COMPLETION_AUDIT = ROOT / "docs" / "vercel-completion-audit-2026-06.md"
PROBES = ROOT / "docs" / "vercel-routing-probes-2026-06.md"
PROBE_RESULTS = ROOT / "docs" / "vercel-routing-probe-results-2026-06.md"
PROBE_BUILDER = ROOT / "scripts" / "build_vercel_probe_packet.py"
PROBE_CHECKER = ROOT / "scripts" / "check_vercel_routing_probes.py"
SMOKE_TESTS = ROOT / "docs" / "per-skill-smoke-tests-2026-06.md"
SMOKE_RESULTS = ROOT / "docs" / "per-skill-smoke-results-2026-06.md"
SMOKE_BUILDER = ROOT / "scripts" / "build_skill_smoke_packet.py"
SMOKE_CHECKER = ROOT / "scripts" / "check_skill_smoke_tests.py"

MAX_DESCRIPTION_CHARS = 450
PRIORITIES_REQUIRING_REF_SCAFFOLD = {"P0", "P1", "P2"}


def skill_frontmatter(skill_md: Path) -> dict:
    text = skill_md.read_text(errors="replace")
    match = re.match(r"---\n(.*?)\n---", text, re.S)
    if not match:
        raise ValueError(f"{skill_md}: missing YAML frontmatter")
    return yaml.safe_load(match.group(1)) or {}


def audit_rows() -> list[tuple[str, str]]:
    rows: list[tuple[str, str]] = []
    for line in AUDIT.read_text().splitlines():
        if not line.startswith("| `"):
            continue
        cells = [cell.strip() for cell in line.strip("|").split("|")]
        if len(cells) >= 2:
            rows.append((cells[0].strip("`"), cells[1]))
    return rows


def main() -> int:
    errors: list[str] = []

    for required in [
        AUDIT,
        LEDGER,
        COMPLETION_AUDIT,
        PROBES,
        PROBE_RESULTS,
        PROBE_BUILDER,
        PROBE_CHECKER,
        SMOKE_TESTS,
        SMOKE_RESULTS,
        SMOKE_BUILDER,
        SMOKE_CHECKER,
    ]:
        if not required.exists():
            errors.append(f"missing required overhaul artifact: {required.relative_to(ROOT)}")

    skills = sorted(path.parent.name for path in ROOT.glob("*/SKILL.md"))
    rows = audit_rows()
    row_names = [name for name, _priority in rows]

    if set(skills) != set(row_names):
        missing = sorted(set(skills) - set(row_names))
        extra = sorted(set(row_names) - set(skills))
        errors.append(f"audit matrix mismatch: missing={missing} extra={extra}")

    duplicates = [name for name, count in Counter(row_names).items() if count > 1]
    if duplicates:
        errors.append(f"audit matrix duplicate rows: {duplicates}")

    priorities = dict(rows)
    for skill_name in skills:
        skill_dir = ROOT / skill_name
        frontmatter = skill_frontmatter(skill_dir / "SKILL.md")
        description = frontmatter.get("description", "")
        if len(description) > MAX_DESCRIPTION_CHARS:
            errors.append(
                f"{skill_name}: description is {len(description)} chars "
                f"(max {MAX_DESCRIPTION_CHARS})"
            )

        refs = skill_dir / "references"
        if refs.exists() and priorities.get(skill_name) in PRIORITIES_REQUIRING_REF_SCAFFOLD:
            skill_text = (skill_dir / "SKILL.md").read_text(errors="replace")
            for scaffold in ["sources.md", "coverage-gaps.md"]:
                if not (refs / scaffold).exists():
                    errors.append(f"{skill_name}: missing references/{scaffold}")
                elif scaffold not in skill_text:
                    errors.append(f"{skill_name}: SKILL.md does not link references/{scaffold}")

    if errors:
        for error in errors:
            print(f"ERROR: {error}")
        return 1

    print(
        f"vercel overhaul check passed: {len(skills)} skills, "
        f"{len(rows)} audit rows, description cap {MAX_DESCRIPTION_CHARS}"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
