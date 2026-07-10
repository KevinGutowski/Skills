#!/usr/bin/env python3
"""Reference-file hygiene guard.

Catches the defect classes a 2026-07 effectiveness audit found by hand:

1. ERROR: reference files over 100 lines with no ``## Contents`` block
   (docs/skill-library-ops.md layering rule).
2. ERROR: relative markdown links inside skill files that point at files
   which do not exist (the repo validator only resolves SKILL.md links).
3. WARNING: backtick file pointers (`foo.md`, `foo.json`) whose basename
   exists nowhere in the repo — dangling prose pointers such as the
   `feedback_route_tiebreakers.md` residue this audit removed.
4. WARNING: standalone-skill conversion residue ("When this skill is first
   invoked") left inside reference files after consolidation.

Fenced code blocks are ignored throughout so templates and examples do not
trip the checks. Run alone or via scripts/validate_all.py. Exit code 1 on
errors; warnings never fail the build (use --strict to change that).
"""
from __future__ import annotations

import argparse
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONTENTS_HEADINGS = ("## Contents", "## Table of Contents")
LINK_RE = re.compile(r"\[[^\]]*\]\(([^)#\s]+)(?:#[^)]*)?\)")
BACKTICK_FILE_RE = re.compile(r"`([A-Za-z0-9_./-]+\.(?:md|json))`")
RESIDUE_RE = re.compile(r"When this skill is first invoked", re.IGNORECASE)


def skill_dirs() -> list[Path]:
    result = subprocess.run(
        ["git", "ls-files", "*/SKILL.md"],
        check=True,
        capture_output=True,
        text=True,
        cwd=ROOT,
    )
    return sorted((ROOT / line).parent for line in result.stdout.splitlines() if line.strip())


def strip_fenced_code(text: str) -> str:
    out: list[str] = []
    in_fence = False
    for line in text.splitlines():
        if line.lstrip().startswith("```"):
            in_fence = not in_fence
            out.append("")
            continue
        out.append("" if in_fence else line)
    return "\n".join(out)


def skill_markdown_files(skill_dir: Path) -> list[Path]:
    return sorted(p for p in skill_dir.rglob("*.md") if p.name != "SKILL.md")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--strict", action="store_true", help="fail on warnings too")
    parser.add_argument(
        "--errors-only",
        action="store_true",
        help="suppress warning output (used by validate_all.py; warnings are "
        "advisory — artifact names a skill tells the agent to create and "
        "illustrative example paths trip them)",
    )
    args = parser.parse_args()

    errors: list[str] = []
    warnings: list[str] = []

    all_basenames = {
        p.name
        for p in ROOT.rglob("*")
        if p.is_file() and ".git" not in p.parts and ".venv" not in p.parts
    }

    checked = 0
    for skill_dir in skill_dirs():
        for path in [skill_dir / "SKILL.md", *skill_markdown_files(skill_dir)]:
            checked += 1
            rel = path.relative_to(ROOT)
            text = path.read_text(encoding="utf-8")
            prose = strip_fenced_code(text)

            # 1. Contents block for long reference files (not SKILL.md bodies —
            # those are capped at 500 lines and routed by structure instead).
            if path.name != "SKILL.md":
                line_count = text.count("\n") + 1
                if line_count > 100 and not any(h in text for h in CONTENTS_HEADINGS):
                    errors.append(
                        f"{rel}: {line_count} lines with no '## Contents' block "
                        "(required for reference files over 100 lines)"
                    )

            # 2. Relative markdown links must resolve.
            for match in LINK_RE.finditer(prose):
                target = match.group(1)
                if target.startswith(("http://", "https://", "mailto:", "/")):
                    continue
                if not (path.parent / target).exists():
                    errors.append(f"{rel}: broken relative link -> {target}")

            # 3. Backtick file pointers whose basename exists nowhere.
            for match in BACKTICK_FILE_RE.finditer(prose):
                pointer = match.group(1)
                basename = pointer.rsplit("/", 1)[-1]
                if basename not in all_basenames:
                    warnings.append(f"{rel}: dangling file pointer `{pointer}`")

            # 4. Standalone-skill conversion residue in reference files.
            if path.name != "SKILL.md" and RESIDUE_RE.search(prose):
                warnings.append(
                    f"{rel}: standalone-skill residue ('When this skill is first invoked')"
                )

    for error in errors:
        print(f"ERROR: {error}")
    if not args.errors_only:
        for warning in warnings:
            print(f"WARNING: {warning}")

    print(
        f"\nreference hygiene: {checked} files checked — "
        f"{len(errors)} error(s), {len(warnings)} advisory warning(s)"
    )
    if errors or (args.strict and warnings):
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
