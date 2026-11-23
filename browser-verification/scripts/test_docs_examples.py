"""Lint the skill's copyable examples.

On agent-browser, a browser command without --session uses the machine-wide default session,
so a copied example can navigate or close another pass's browser. Every browser command shown
in this skill must carry --session. Scripts must be invoked through bash with a resolved path,
because some installers drop the executable bit.
"""
import re
import unittest
from pathlib import Path

SKILL = Path(__file__).resolve().parent.parent
NO_SESSION_NEEDED = {"skills", "session", "install", "doctor", "upgrade", "--version", "--help"}


def fenced_lines(path: Path):
    inside = False
    for number, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
        if line.lstrip().startswith("```"):
            inside = not inside
            continue
        if inside:
            yield number, line


def markdown_files():
    return [SKILL / "SKILL.md", *sorted((SKILL / "references").glob("*.md"))]


class ExamplesTest(unittest.TestCase):
    def test_browser_commands_name_a_session(self):
        problems = []
        for path in markdown_files():
            for number, line in fenced_lines(path):
                code = re.split(r"\s#\s", line, maxsplit=1)[0]
                if code.lstrip().startswith("#"):
                    continue
                for match in re.finditer(r"(?:^|&&|\|\||[|;(])\s*agent-browser\s+(\S+)", code):
                    first = match.group(1)
                    if first in NO_SESSION_NEEDED or first == "--session":
                        continue
                    problems.append(f"{path.relative_to(SKILL)}:{number}: {line.strip()}")
        self.assertEqual(problems, [], "browser commands without --session:\n" + "\n".join(problems))

    def test_scripts_are_run_through_bash_with_a_resolved_path(self):
        problems = []
        for path in markdown_files():
            for number, line in fenced_lines(path):
                if "cls-reading.sh" in line and not re.search(r'bash "\$SKILL_DIR/scripts/cls-reading\.sh"', line):
                    problems.append(f"{path.relative_to(SKILL)}:{number}: {line.strip()}")
                if "motion-probe.js" in line and '"$SKILL_DIR/scripts/motion-probe.js"' not in line:
                    problems.append(f"{path.relative_to(SKILL)}:{number}: {line.strip()}")
        self.assertEqual(problems, [], "script examples that depend on the working directory or the executable bit:\n" + "\n".join(problems))


if __name__ == "__main__":
    unittest.main()
