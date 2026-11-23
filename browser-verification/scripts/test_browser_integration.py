"""End-to-end checks of the scripts against fixture pages in a real browser.

Runs only where agent-browser and its Chrome are installed (skipped in CI). Each case is a
defect that review found in an earlier version of these scripts.
"""
import functools
import http.server
import json
import shutil
import subprocess
import threading
import time
import unittest
from pathlib import Path

HERE = Path(__file__).resolve().parent
RUN = f"it{int(time.time())}"


def browser_ready() -> bool:
    if not (shutil.which("agent-browser") and shutil.which("bash")):
        return False
    probe = subprocess.run(["agent-browser", "--session", f"probe-{RUN}", "open", "about:blank"],
                           capture_output=True, text=True, timeout=60)
    subprocess.run(["agent-browser", "--session", f"probe-{RUN}", "close"], capture_output=True, timeout=30)
    return probe.returncode == 0


@unittest.skipUnless(browser_ready(), "agent-browser with a working Chrome is not available")
class BrowserIntegrationTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        class Quiet(http.server.SimpleHTTPRequestHandler):
            def log_message(self, *args):
                pass

        handler = functools.partial(Quiet, directory=str(HERE / "fixtures"))
        cls.server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), handler)
        threading.Thread(target=cls.server.serve_forever, daemon=True).start()
        cls.base = f"http://127.0.0.1:{cls.server.server_address[1]}"

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()

    def reading(self, *args):
        out = subprocess.run(["bash", str(HERE / "cls-reading.sh"), *args], capture_output=True, text=True,
                             timeout=90, env={**__import__("os").environ, "CLS_RUN": RUN})
        return out

    def test_frame_readiness_is_not_released_by_a_matching_host_element(self):
        out = self.reading("--url", f"{self.base}/host.html", "--frame", "#widget", "--label", "frame",
                           "--ready", "document.querySelectorAll('[data-review]').length > 0")
        self.assertEqual(out.returncode, 0, out.stdout + out.stderr)
        data = json.loads(out.stdout)
        self.assertTrue(data["document"].endswith("/widget.html"))
        self.assertGreater(data["cls"], 0, "the frame's late shift must be in the reading")
        self.assertGreater(data["lastShiftAtMs"], 1000)

    def test_host_reading_does_not_include_the_frame(self):
        out = self.reading("--url", f"{self.base}/host.html", "--label", "host",
                           "--ready", "document.querySelector('#widget').contentDocument.querySelectorAll('[data-review]').length > 0")
        self.assertEqual(out.returncode, 0, out.stdout + out.stderr)
        data = json.loads(out.stdout)
        self.assertTrue(data["document"].endswith("/host.html"))
        self.assertEqual(data["cls"], 0)

    def test_missing_content_is_unverified(self):
        out = self.reading("--url", f"{self.base}/widget.html", "--label", "missing", "--timeout", "3000",
                           "--ready", "document.querySelectorAll('[data-nope]').length > 0")
        self.assertEqual(out.returncode, 1)
        self.assertIn("UNVERIFIED", out.stdout)

    def test_reported_document_has_no_query_or_fragment(self):
        out = self.reading("--url", f"{self.base}/widget.html?token=SECRET#frag", "--label", "redact",
                           "--ready", "document.querySelectorAll('[data-review]').length > 0")
        self.assertEqual(out.returncode, 0, out.stdout + out.stderr)
        self.assertNotIn("SECRET", out.stdout + out.stderr)
        self.assertNotIn("frag", out.stdout + out.stderr)

    def test_many_small_shifts_do_not_hide_a_late_large_one(self):
        # 170 small shifts overflow the browser's buffered history (150 entries here); the large
        # shift comes after them. The wrapper's collector runs from navigation and must see it.
        out = self.reading("--url", f"{self.base}/many-shifts.html", "--label", "many", "--timeout", "30000",
                           "--ready", "document.getElementById('state').textContent === 'done'")
        self.assertEqual(out.returncode, 0, out.stdout + out.stderr)
        data = json.loads(out.stdout)
        self.assertEqual(data["source"], "collector")
        self.assertGreater(data["counted"], 150)
        self.assertFalse(data["good"])
        late = [s for s in data["shifts"] if s["value"] > 0.2]
        self.assertTrue(late, "the large late shift is missing from the reading")
        self.assertGreater(late[-1]["at"], data["shifts"][150]["at"])

    def test_scorer_without_the_collector_refuses_a_saturated_history(self):
        # Evaluating cls.js by hand, with no collector registered, on the same page: the buffered
        # history is full, so there must be an error, never a "good" score.
        run = self.session("saturated")
        try:
            run("open", f"{self.base}/many-shifts.html")
            run("wait", "--fn", "document.getElementById('state').textContent === 'done'", "--timeout", "30000")
            run("wait", "800")
            result = json.loads(run("eval", "--stdin", input=(HERE / "cls.js").read_text()).stdout)
            self.assertIn("incomplete", result["error"])
            self.assertNotIn("good", result)
        finally:
            run("close", check=False)

    def test_frame_reading_uses_the_collector_too(self):
        out = self.reading("--url", f"{self.base}/host.html", "--frame", "#widget", "--label", "fcol",
                           "--ready-selector", "[data-review]")
        self.assertEqual(out.returncode, 0, out.stdout + out.stderr)
        self.assertEqual(json.loads(out.stdout)["source"], "collector")

    def test_token_bearing_frame_selector_is_not_echoed(self):
        sentinel = "QA_REDACTION_SENTINEL"
        with_credentials = self.base.replace("http://", f"http://qa-user:{sentinel}@")
        out = self.reading("--url", f"{with_credentials}/token-host.html?session={sentinel}", "--label", "token",
                           "--frame", f'iframe[src="widget.html?token={sentinel}#part"]',
                           "--ready-selector", "[data-review]")
        self.assertEqual(out.returncode, 0, out.stdout + out.stderr)
        data = json.loads(out.stdout)
        self.assertTrue(data["frame"])
        self.assertTrue(data["document"].endswith("/widget.html"))
        self.assertGreater(data["cls"], 0)
        self.assertNotIn(sentinel, out.stdout + out.stderr)

    def test_injecting_the_instruments_does_not_change_the_page(self):
        # The page defines classify(), scoreShifts() and two variables with the names the scripts
        # use internally. After injecting both scripts its own button must still work.
        run = self.session("globals")
        try:
            run("open", f"{self.base}/app-globals.html")
            run("click", "#check")
            before = run("eval", "document.getElementById('out').textContent").stdout
            self.assertIn("app:valid|app:score|app:name|app:const", before)
            for script in ["motion-probe.js", "cls.js", "motion-probe.js"]:
                run("eval", "--stdin", input=(HERE / script).read_text())
            run("eval", "document.getElementById('out').textContent = 'reset'")
            run("click", "#check")
            after = run("eval", "document.getElementById('out').textContent").stdout
            self.assertEqual(after, before)
            leaked = run("eval", "Object.keys(window).filter(k => /motion|cls|probe/i.test(k)).join(',')").stdout
            self.assertNotIn("__", leaked.replace("motionCssName", ""), leaked)
        finally:
            run("close", check=False)

    def test_frame_with_strict_csp_reports_why_and_ready_selector_works(self):
        blocked = self.reading("--url", f"{self.base}/csp-host.html", "--frame", "#widget", "--label", "csp1",
                               "--timeout", "3000", "--ready", "document.querySelectorAll('[data-review]').length > 0")
        self.assertEqual(blocked.returncode, 1)
        self.assertIn("UNVERIFIED", blocked.stdout)
        self.assertIn("--ready-selector", blocked.stdout, "the message should say why and what to use instead")
        ok = self.reading("--url", f"{self.base}/csp-host.html", "--frame", "#widget", "--label", "csp2",
                          "--ready-selector", "[data-review]")
        self.assertEqual(ok.returncode, 0, ok.stdout + ok.stderr)
        self.assertTrue(json.loads(ok.stdout)["document"].endswith("/csp-widget.html"))

    def session(self, tag):
        """Return run(*args) for one named session. A failed browser command fails the test:
        an ignored failed click is how a check ends up measuring a page nothing happened on."""
        name = f"motion-{RUN}-{tag}"

        def run(*args, check=True, **kwargs):
            out = subprocess.run(["agent-browser", "--session", name, *args],
                                 capture_output=True, text=True, timeout=60, **kwargs)
            if check:
                self.assertEqual(out.returncode, 0, f"agent-browser {' '.join(args[:2])} failed: {out.stdout}{out.stderr}")
            return out
        return run

    def probe(self, element, wait_ms, before_click=None, reduced=True):
        run = self.session(f"{element}{int(reduced)}")
        script = (HERE / "motion-probe.js").read_text()
        try:
            run("open", f"{self.base}/motion.html")
            if reduced:
                run("set", "media", "reduced-motion")
            armed = json.loads(run("eval", "--stdin", input=script).stdout)
            self.assertTrue(armed["armed"])
            if before_click:
                run("click", before_click)
            run("click", f"#{element}-go")
            run("wait", str(wait_ms))
            result = json.loads(run("eval", "--stdin", input=script).stdout)
            self.assert_invariants(result)
            return result
        finally:
            run("close", check=False)

    def assert_invariants(self, result):
        """Every verdict is backed by a measurement; holds for every case."""
        for r in result["moved"]:
            self.assertTrue(r["measurable"] and r["measuredChange"] > 1, f"moved without a box measurement: {r}")
            self.assertNotIn("::", r["target"], f"a pseudo-element can never be reported as moved: {r}")
        for r in result["still"]:
            self.assertTrue(r["finished"] or r["infinite"], f"still while running: {r}")
            self.assertIn(r["measuredChange"], (0, None), f"still without a clean measurement: {r}")
        if result["pending"]:
            self.assertTrue(result["armed"])
            self.assertTrue(result["moved"] or result["conclusion"].startswith("inconclusive"))

    def test_padding_transition_is_measured_as_movement(self):
        result = self.probe("pad", 600)
        self.assertEqual(result["conclusion"], "movement measured")
        self.assertGreater(result["moved"][0]["measuredChange"], 100)

    def test_short_slide_is_caught_after_it_ended(self):
        result = self.probe("slide", 600)
        self.assertTrue(any("translate" in r["properties"] for r in result["moved"]))

    def test_movement_that_returns_to_its_start_is_still_movement(self):
        # A keyframe animation that travels 240 px and comes back ends where it began.
        result = self.probe("loop", 800)
        self.assertEqual(result["still"], [])
        self.assertGreater(result["moved"][0]["measuredChange"], 100)

    # The expected results below come from how each fixture is built (what a person watching it
    # sees), not from the probe's own fields.

    def test_pseudo_element_motion_is_unknown_never_a_verdict(self):
        # #pseudo::before visibly rotates. The probe cannot read a pseudo-element's box, so it
        # must not claim movement; it reports unknown and leaves the hint for a person.
        result = self.probe("pseudo", 700)
        self.assertEqual(result["moved"], [])
        self.assertEqual(result["still"], [])
        self.assertIn("::before", result["unknown"][0]["target"])
        self.assertTrue(result["unknown"][0]["computedGeometryChanged"])
        self.assertTrue(result["conclusion"].startswith("inconclusive"))

    def test_pseudo_element_whose_computed_top_changes_but_stays_put_is_not_movement(self):
        # Under reduced motion #static::before is position: static, so animating `top` from 0 to
        # 160px changes the computed value and moves nothing on screen. Not a failure.
        result = self.probe("static", 600)
        self.assertEqual(result["moved"], [])
        self.assertNotEqual(result["conclusion"], "movement measured")

    def test_pseudo_element_pinned_by_a_reduced_motion_override_is_not_movement(self):
        # Keyframes translate ::before by 40 px; an !important rule pins transform to none.
        result = self.probe("over", 600)
        self.assertEqual(result["moved"], [])

    def test_pseudo_element_fade_is_still(self):
        result = self.probe("pfade", 500)
        self.assertEqual(result["moved"], [])
        self.assertEqual(result["unknown"], [])
        self.assertIn("::before", result["still"][0]["target"])

    def test_fade_that_declares_an_unchanging_transform_is_still(self):
        # opacity .4 -> 1 with transform: translateX(0) in both keyframes. Nothing moves.
        result = self.probe("fadekf", 600)
        self.assertEqual(result["moved"], [])
        self.assertEqual(result["unknown"], [])
        self.assertEqual(result["still"][0]["properties"], ["opacity"])

    def test_movement_inside_an_open_shadow_root_is_seen(self):
        result = self.probe("shadow", 600)
        self.assertGreater(result["moved"][0]["measuredChange"], 100)

    def test_script_driven_web_animation_is_seen(self):
        result = self.probe("waapi", 600)
        self.assertEqual(result["moved"][0]["kind"], "script")

    def test_unmeasurable_effect_is_unknown_not_still(self):
        result = self.probe("clip", 600)
        self.assertEqual(result["moved"], [])
        self.assertEqual(result["still"], [])
        self.assertEqual(len(result["unknown"]), 1)
        self.assertTrue(result["conclusion"].startswith("inconclusive"))

    def test_fade_is_still(self):
        result = self.probe("fade", 600)
        self.assertEqual(result["moved"], [])
        self.assertEqual(result["unknown"], [])
        self.assertEqual(len(result["still"]), 1)

    def test_infinite_fade_does_not_keep_the_probe_pending(self):
        result = self.probe("spinner", 500)
        self.assertEqual(result["pending"], 0)
        self.assertEqual(len(result["still"]), 1)

    def read_twice(self, element, first_wait, second_wait):
        run = self.session(element)
        script = (HERE / "motion-probe.js").read_text()
        read = lambda: json.loads(run("eval", "--stdin", input=script).stdout)
        try:
            run("open", f"{self.base}/motion.html")
            run("eval", "--stdin", input=script)
            run("click", f"#{element}-go")
            run("wait", str(first_wait))
            early = read()
            self.assert_invariants(early)
            run("wait", str(second_wait))
            later = read()
            self.assert_invariants(later)
            return early, later
        finally:
            run("close", check=False)

    def test_reading_early_keeps_the_record_and_a_later_read_completes_it(self):
        early, later = self.read_twice("wipe", 300, 2200)
        self.assertEqual(early["pending"], 1)
        self.assertTrue(early["conclusion"].startswith("inconclusive"))
        self.assertEqual(later["pending"], 0)
        self.assertFalse(later["armed"])
        self.assertEqual(len(later["unknown"]), 1, "the record survived the early read")

    def test_delayed_animation_keeps_the_probe_pending_until_it_has_run(self):
        # A 100 ms fade plus a 200 ms slide that starts 1.5 s later. Reading at 500 ms must not
        # be a clean result: the slide has not happened yet but the browser already lists it.
        early, later = self.read_twice("delayed", 500, 1600)
        self.assertEqual(early["moved"], [])
        self.assertEqual(early["pending"], 1)
        self.assertTrue(early["armed"])
        self.assertTrue(early["conclusion"].startswith("inconclusive"))
        self.assertEqual(later["pending"], 0)
        self.assertGreater(later["moved"][0]["measuredChange"], 100)


if __name__ == "__main__":
    unittest.main()
