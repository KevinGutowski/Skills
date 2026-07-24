#!/usr/bin/env python3
"""Check application-fixture structure and coverage for optimized entry points."""

from __future__ import annotations

import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
FIXTURES = ROOT / "docs" / "application-fixtures-2026-07.md"
AUDIT = ROOT / "docs" / "hot-zone-audit-2026-07.md"
REQUIRED_FIELDS = (
    "Entry point",
    "Mode",
    "Prompt",
    "Rule that must be applied",
    "Exception/boundary",
    "Likely failure mode",
    "Expected decisions",
)
EXPECTED_IDS = ("A01", "A02")
EXPECTED_ENTRY_POINTS = ("`frontend-design`", "`working-with-ai` → `agentic-coding`")


def main() -> int:
    errors: list[str] = []
    for path in (FIXTURES, AUDIT):
        if not path.exists():
            errors.append(f"missing required artifact: {path.relative_to(ROOT)}")

    if errors:
        for error in errors:
            print(f"ERROR: {error}")
        return 1

    text = FIXTURES.read_text(encoding="utf-8")
    headings = list(re.finditer(r"^## (A\d{2}) — .+$", text, re.M))
    fixtures = []
    for index, heading in enumerate(headings):
        end = headings[index + 1].start() if index + 1 < len(headings) else len(text)
        fixtures.append((heading.group(1), text[heading.end() : end]))

    ids = tuple(fixture_id for fixture_id, _body in fixtures)
    if ids != EXPECTED_IDS:
        errors.append(f"fixture IDs must be {EXPECTED_IDS}; got {ids}")

    for index, (fixture_id, body) in enumerate(fixtures):
        for field in REQUIRED_FIELDS:
            if not re.search(rf"^- \*\*{re.escape(field)}:\*\*", body, re.M):
                errors.append(f"{fixture_id}: missing field {field!r}")
        if EXPECTED_ENTRY_POINTS[index] not in body:
            errors.append(f"{fixture_id}: wrong or missing entry point")
        decisions = re.findall(r"^  - .+", body, re.M)
        if len(decisions) < 4:
            errors.append(f"{fixture_id}: expected at least 4 decision assertions")

    if errors:
        for error in errors:
            print(f"ERROR: {error}")
        return 1

    print(f"application fixture check passed: {len(fixtures)} decision-based fixtures")
    return 0


if __name__ == "__main__":
    sys.exit(main())
