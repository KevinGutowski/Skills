"""Run every ripgrep command published in references/code-compliance-sweep.md against fixtures.

The reference's table is the source of truth: this test reads the commands from it, points
each at sweep-fixtures/<flag-slug>/ and checks that hit.* is reported and miss.* is not.
A row with two commands uses <flag-slug>-1 and <flag-slug>-2. Needs ripgrep; no network.
"""
import re
import shutil
import subprocess
import unittest
from pathlib import Path

HERE = Path(__file__).resolve().parent
DOC = HERE.parent / "references" / "code-compliance-sweep.md"
FIXTURES = HERE / "sweep-fixtures"


def slug(flag: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", flag.lower()).strip("-")


def published_commands():
    text = DOC.read_text(encoding="utf-8")
    start = text.index("| Flag | Pattern | Owner and pattern limits |")
    end = text.index("Rules with no reliable pattern")
    rows = [l for l in text[start:end].splitlines() if l.startswith("| ")][2:]
    for row in rows:
        flag, pattern_cell, _rest = row[2:].split(" | ", 2)
        commands = re.findall(r"`(rg [^`]*)`", pattern_cell)
        for index, command in enumerate(commands, 1):
            name = slug(flag) if len(commands) == 1 else f"{slug(flag)}-{index}"
            yield name, command.replace("\\|", "|")


@unittest.skipUnless(shutil.which("rg"), "ripgrep is not installed")
class SweepPatternsTest(unittest.TestCase):
    def test_table_was_parsed(self):
        self.assertGreaterEqual(len(list(published_commands())), 19)

    def test_every_command_names_a_path(self):
        # Without a path ripgrep reads stdin in a non-interactive shell and prints nothing.
        for name, command in published_commands():
            first = command.split(" | ")[0]
            self.assertTrue(first.rstrip().endswith("src/"), f"{name}: first rg has no path: {command}")

    def test_hits_and_misses(self):
        for name, command in published_commands():
            with self.subTest(pattern=name):
                directory = FIXTURES / name
                self.assertTrue(directory.is_dir(), f"no fixture directory for {name}")
                first, sep, rest = command.partition(" | ")
                self.assertTrue(first.rstrip().endswith("src/"))
                first = first.rstrip()[: -len("src/")] + f"'{directory}/'"
                run = subprocess.run(
                    ["bash", "-c", first + sep + rest], capture_output=True, text=True, stdin=subprocess.DEVNULL
                )
                self.assertIn("/hit.", run.stdout, f"{name}: hit fixture not reported\n{command}\n{run.stdout}{run.stderr}")
                self.assertNotIn("/miss.", run.stdout, f"{name}: miss fixture reported\n{command}\n{run.stdout}")


if __name__ == "__main__":
    unittest.main()
