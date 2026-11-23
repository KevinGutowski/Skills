"""Control-flow tests for cls-reading.sh against a fake agent-browser. No browser, no network."""
import os
import shutil
import stat
import subprocess
import tempfile
import unittest
from pathlib import Path

HERE = Path(__file__).resolve().parent
SCRIPT = HERE / "cls-reading.sh"


@unittest.skipUnless(shutil.which("bash") and shutil.which("python3"), "bash and python3 are needed")
class WrapperTest(unittest.TestCase):
    def setUp(self):
        self.tmp = Path(tempfile.mkdtemp())
        fake = self.tmp / "agent-browser"
        shutil.copy(HERE / "fake-agent-browser.sh", fake)
        fake.chmod(fake.stat().st_mode | stat.S_IXUSR)
        self.log = self.tmp / "calls.log"
        self.env = dict(os.environ, PATH=f"{self.tmp}:{os.environ['PATH']}", FAKE_AB_LOG=str(self.log), CLS_RUN="t")

    def tearDown(self):
        shutil.rmtree(self.tmp, ignore_errors=True)

    def run_script(self, *args, **env):
        return subprocess.run(
            ["bash", str(SCRIPT), *args], capture_output=True, text=True, timeout=10, env=dict(self.env, **env)
        )

    def calls(self):
        return self.log.read_text().splitlines() if self.log.exists() else []

    def test_every_value_option_rejects_a_missing_value(self):
        # A lone option used to loop forever; the 10 s timeout turns a regression into a failure.
        for option in ["--url", "--ready", "--ready-selector", "--label", "--frame", "--settle", "--timeout"]:
            with self.subTest(option=option):
                out = self.run_script(option)
                self.assertEqual(out.returncode, 1)
                self.assertIn("UNVERIFIED", out.stdout)

    def test_refuses_without_a_readiness_condition(self):
        out = self.run_script("--url", "http://localhost:1/")
        self.assertEqual(out.returncode, 1)
        self.assertIn("UNVERIFIED", out.stdout)
        self.assertEqual(self.calls(), [], "no browser command should run")

    def test_success_uses_one_named_session_and_closes_it(self):
        out = self.run_script("--url", "http://localhost:3000/p", "--ready", "true", "--label", "before")
        self.assertEqual(out.returncode, 0, out.stdout + out.stderr)
        self.assertIn('"cls"', out.stdout)
        browser_calls = [c for c in self.calls() if not c.startswith("session id")]
        self.assertTrue(browser_calls)
        for call in browser_calls:
            self.assertIn("--session cls-0123456789ab-t-before", call)
        self.assertIn("close", browser_calls[-1])
        self.assertIn("--disk-cache-size=1", browser_calls[0])

    def test_collector_is_registered_before_the_first_navigation(self):
        self.run_script("--url", "http://localhost:3000/p", "--ready", "true")
        open_call = next(c for c in self.calls() if " open " in c)
        self.assertIn("--init-script", open_call)
        self.assertIn("cls-collector.js", open_call)
        self.assertLess(open_call.index("--init-script"), open_call.index(" open "))

    def test_incomplete_history_is_unverified_not_a_score(self):
        out = self.run_script("--url", "http://localhost:3000/p", "--ready", "true",
                              FAKE_AB_EVAL='{"error": "the layout-shift history is incomplete (150 entries kept, 20 reported dropped)", "entriesKept": 150}')
        self.assertEqual(out.returncode, 1)
        self.assertIn("UNVERIFIED", out.stdout)
        self.assertIn("incomplete", out.stdout)
        self.assertNotIn('"cls"', out.stdout)

    def test_each_failed_step_is_unverified_and_still_closes(self):
        for step in ["open", "wait", "eval"]:
            with self.subTest(step=step):
                self.log.unlink(missing_ok=True)
                out = self.run_script("--url", "http://localhost:3000/p", "--ready", "true", FAKE_AB_FAIL=step)
                self.assertEqual(out.returncode, 1)
                self.assertIn("UNVERIFIED", out.stdout)
                self.assertNotIn('"cls"', out.stdout)
                self.assertIn("close", self.calls()[-1])

    def test_scorer_error_is_unverified(self):
        out = self.run_script("--url", "http://localhost:3000/p", "--ready", "true",
                              FAKE_AB_EVAL='{"error": "frame is cross-origin"}')
        self.assertEqual(out.returncode, 1)
        self.assertIn("UNVERIFIED", out.stdout)
        self.assertIn("frame is cross-origin", out.stdout, "the scorer's own reason is passed on")

    def test_readiness_is_evaluated_inside_the_frame(self):
        self.run_script("--url", "http://localhost:3000/p", "--frame", "#widget",
                        "--ready", "document.querySelectorAll('[data-review]').length > 0")
        wait_call = next(c for c in self.calls() if " wait --fn " in c)
        self.assertIn("contentWindow.eval", wait_call)
        self.assertIn("#widget", wait_call)

    def test_readiness_is_passed_through_for_the_host(self):
        self.run_script("--url", "http://localhost:3000/p", "--ready", "window.ready === true")
        wait_call = next(c for c in self.calls() if " wait --fn " in c)
        self.assertIn("wait --fn window.ready === true", wait_call)
        self.assertNotIn("contentWindow", wait_call)

    def test_ready_selector_needs_no_eval(self):
        self.run_script("--url", "http://localhost:3000/p", "--frame", "#widget", "--ready-selector", "[data-review]")
        wait_call = next(c for c in self.calls() if " wait --fn " in c)
        self.assertIn("contentDocument.querySelector", wait_call)
        self.assertNotIn("eval(", wait_call)
        self.log.unlink()
        self.run_script("--url", "http://localhost:3000/p", "--ready-selector", "[data-review]")
        wait_call = next(c for c in self.calls() if " wait --fn " in c)
        self.assertIn('document.querySelector("[data-review]")', wait_call)

    def test_ready_and_ready_selector_together_are_rejected(self):
        out = self.run_script("--url", "http://localhost:3000/p", "--ready", "true", "--ready-selector", "p")
        self.assertEqual(out.returncode, 1)
        self.assertEqual(self.calls(), [])

    def test_no_input_is_ever_echoed(self):
        """The output is meant to be quoted in reports. Whatever happens, nothing the caller passed
        that could carry a token (URL query or fragment, frame selector, readiness expression or
        selector) may appear in stdout or stderr."""
        sentinel = "QA_REDACTION_SENTINEL"
        # Every part of a URL that can carry a secret: user, password, query, fragment.
        url = f"http://user-{sentinel}:pw-{sentinel}@localhost:3000/p?token={sentinel}#frag-{sentinel}"
        frame = f'iframe[src="/widget.html?token={sentinel}#part"]'
        readiness = [
            ["--ready", f"document.querySelector('a[href*=\"{sentinel}\"]') !== null"],
            ["--ready-selector", f'a[href="/x?token={sentinel}"]'],
        ]
        outcomes = [{}, {"FAKE_AB_FAIL": "open"}, {"FAKE_AB_FAIL": "wait"}, {"FAKE_AB_FAIL": "eval"},
                    {"FAKE_AB_EVAL": '{"error": "no element matches the --frame selector"}'},
                    {"FAKE_AB_EVAL": "not json at all"}]
        for ready in readiness:
            for with_frame in (True, False):
                for outcome in outcomes:
                    args = ["--url", url, *ready] + (["--frame", frame] if with_frame else [])
                    with self.subTest(ready=ready[0], frame=with_frame, outcome=outcome):
                        out = self.run_script(*args, **outcome)
                        self.assertNotIn(sentinel, out.stdout + out.stderr)
                        if not outcome or outcome.get("FAKE_AB_FAIL") == "open":
                            # Where the URL is shown at all, it is origin and path only.
                            self.assertIn("http://localhost:3000/p", out.stdout + out.stderr)
        for odd in (f"//{sentinel}@", f"not a url {sentinel}", f"http://[{sentinel}"):
            with self.subTest(odd_url=odd[:8]):
                out = self.run_script("--url", odd, "--ready", "true", FAKE_AB_FAIL="open")
                self.assertNotIn(sentinel, out.stdout + out.stderr)
        for bad in ([f"http://localhost/?t={sentinel}"], [f"--bogus={sentinel}"], ["--url", url, "--ready", "true", "--label", f"x {sentinel}"]):
            with self.subTest(bad=bad[0][:10]):
                out = self.run_script(*bad)
                self.assertEqual(out.returncode, 1)
                self.assertNotIn(sentinel, out.stdout + out.stderr)

    def test_frame_selector_reaches_the_scorer_without_a_page_global(self):
        self.env["FAKE_AB_STDIN"] = str(self.tmp / "stdin.log")
        self.run_script("--url", "http://localhost:3000/p", "--ready", "true", "--frame", "#widget")
        payload = (self.tmp / "stdin.log").read_text()
        self.assertIn('})("#widget");', payload)
        self.assertNotIn("__CLS_FRAME_SELECTOR__\"", payload.split("})(")[-1])
        self.assertNotIn("var __clsFrame", payload)

    def test_query_string_and_fragment_are_not_printed(self):
        out = self.run_script("--url", "http://localhost:3000/p?token=SECRET#frag", "--ready", "true",
                              FAKE_AB_FAIL="open")
        self.assertIn("http://localhost:3000/p", out.stdout)
        self.assertNotIn("SECRET", out.stdout + out.stderr)
        self.assertNotIn("frag", out.stdout + out.stderr)


if __name__ == "__main__":
    unittest.main()
