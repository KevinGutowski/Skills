#!/usr/bin/env python3
"""Cross-reference integrity guard for the skills corpus.

Catches the class of routing bug a manual audit found in 2026-06: reference
*files* cited in prose as if they were top-level skills, and skill names that
no longer exist.

Ground truth:
  - SKILLS         = directory names that contain a SKILL.md
  - REFERENCE NAMES = basename (stem) of every *.md under any */references/**,
                      plus every same-named subdir there, mapped to its owner skill

Two checks over backticked cross-references in every SKILL.md and reference .md:

  ERROR  unknown cluster in `cluster (member)` form
         e.g. `ai-enablement (foo)` when ai-enablement is a reference, not a skill
  ERROR  a bare backticked token that exactly matches a known reference name but
         is NOT a top-level skill and is NOT a self-reference within its owner
         e.g. `oklch-skill` instead of `web-design` (oklch-skill)
  WARN   `cluster (member)` where member is not a known reference name (often
         just prose in parens — advisory only)

Reference names are distinctive (oklch-skill, ai-enablement, emil-kowalski, …),
so matching against them keeps false positives near zero — CSS props, package
names, and ordinary prose don't collide.

Usage:
  python3 scripts/check_xrefs.py            # report; exit 1 on any ERROR
  python3 scripts/check_xrefs.py --strict   # also exit 1 on WARN
"""
from __future__ import annotations

import glob
import re
import sys
from pathlib import Path

# Backticked single kebab token: `foo-bar`
BARE = re.compile(r"`([a-z][a-z0-9]*(?:-[a-z0-9]+)+)`")
# `cluster` (member) — member is a clean single kebab token in parens (backticks optional)
CLUSTER_MEMBER = re.compile(r"`([a-z][a-z0-9-]+)`\s+\(`?([a-z][a-z0-9-]+)`?\)")


def skill_names() -> set[str]:
    names = {Path(p).parent.name for p in glob.glob("*/SKILL.md")}
    return names


def reference_owners() -> dict[str, set[str]]:
    """Map every reference stem -> set of owning skill names."""
    owners: dict[str, set[str]] = {}
    for md in glob.glob("*/references/**/*.md", recursive=True):
        p = Path(md)
        skill = p.parts[0]
        owners.setdefault(p.stem, set()).add(skill)
    # same-named subdirs (e.g. references/emil-kowalski/) are referenced by stem too
    for d in glob.glob("*/references/**/", recursive=True):
        p = Path(d)
        if p.name:
            owners.setdefault(p.name, set()).add(p.parts[0])
    return owners


def scanned_files() -> list[Path]:
    files = [Path(p) for p in glob.glob("*/SKILL.md")]
    files += [Path(p) for p in glob.glob("*/references/**/*.md", recursive=True)]
    return sorted(files)


def main() -> int:
    strict = "--strict" in sys.argv
    skills = skill_names()
    refs = reference_owners()
    ref_names = set(refs)

    errors: list[str] = []
    warns: list[str] = []

    for f in scanned_files():
        owner = f.parts[0]
        text = f.read_text(encoding="utf-8", errors="replace")
        for i, line in enumerate(text.splitlines(), 1):
            for m in CLUSTER_MEMBER.finditer(line):
                cluster, member = m.group(1), m.group(2)
                if cluster in skills:
                    if member not in ref_names and member not in skills:
                        warns.append(
                            f"{f}:{i}  `{cluster}` ({member}) — '{member}' is not a known reference name"
                        )
                elif cluster in ref_names:
                    owners = " / ".join(sorted(refs[cluster]))
                    errors.append(
                        f"{f}:{i}  `{cluster}` ({member}) — '{cluster}' is a reference, not a skill; "
                        f"write `{owners}` ({cluster})"
                    )
            for m in BARE.finditer(line):
                tok = m.group(1)
                # skip if this token is the cluster of a cluster(member) on this line
                if re.search(rf"`{re.escape(tok)}`\s+\(", line):
                    continue
                if tok in skills:
                    continue
                # descriptive prose, not a misroute: an owning skill is named on
                # the same line (e.g. "`design-craft` … its `emil-kowalski` reference")
                if tok in ref_names and any(f"`{s}`" in line for s in refs[tok]):
                    continue
                if tok in ref_names and owner not in refs[tok]:
                    owners = " / ".join(sorted(refs[tok]))
                    errors.append(
                        f"{f}:{i}  bare `{tok}` is a reference of {owners}, not a skill; "
                        f"write `{owners}` ({tok})"
                    )

    for w in warns:
        print(f"WARN  {w}")
    for e in errors:
        print(f"ERROR {e}")

    n_skills = len(skills)
    n_refs = len(ref_names)
    print(
        f"\nchecked {len(scanned_files())} files against {n_skills} skills / "
        f"{n_refs} reference names — {len(errors)} error(s), {len(warns)} warning(s)"
    )
    if errors or (strict and warns):
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
