"""Unit tests for the layout-shift scorer (scoreShifts in cls.js). Needs Node; no browser."""
import json
import shutil
import subprocess
import unittest
from pathlib import Path

HERE = Path(__file__).resolve().parent


def score(entries):
    script = (
        "const {scoreShifts} = require(process.argv[1]);"
        "process.stdout.write(JSON.stringify(scoreShifts(JSON.parse(process.argv[2]))));"
    )
    out = subprocess.run(
        ["node", "-e", script, str(HERE / "cls.js"), json.dumps(entries)],
        check=True, capture_output=True, text=True,
    )
    return json.loads(out.stdout)


def shift(at, value, recent_input=False):
    return {"startTime": at, "value": value, "hadRecentInput": recent_input}


@unittest.skipUnless(shutil.which("node"), "node is not installed")
class ScoreShiftsTest(unittest.TestCase):
    def test_no_shifts(self):
        r = score([])
        self.assertEqual(r["cls"], 0)
        self.assertTrue(r["good"])
        self.assertIsNone(r["lastShiftAtMs"])

    def test_threshold_is_compared_before_rounding(self):
        # Prints as 0.10 at two decimals; it is over the threshold.
        r = score([shift(400, 0.103125)])
        self.assertFalse(r["good"])
        self.assertTrue(score([shift(400, 0.1)])["good"])

    def test_shifts_far_apart_are_separate_windows(self):
        r = score([shift(402.5, 0.0645), shift(1810.2, 0.0645)])
        self.assertAlmostEqual(r["cls"], 0.0645)
        self.assertAlmostEqual(r["sum"], 0.129)
        self.assertTrue(r["good"])

    def test_gap_of_exactly_one_second_starts_a_new_window(self):
        r = score([shift(1000, 0.06), shift(2000, 0.06)])
        self.assertAlmostEqual(r["cls"], 0.06)

    def test_gap_under_one_second_joins(self):
        r = score([shift(1000, 0.06), shift(1999, 0.06)])
        self.assertAlmostEqual(r["cls"], 0.12)
        self.assertFalse(r["good"])

    def test_window_is_capped_at_five_seconds(self):
        entries = [shift(t, 0.02) for t in range(0, 6000, 900)]  # 0 .. 5400
        r = score(entries)
        # 0..4500 is six shifts (4500 - 0 < 5000); 5400 starts a new window.
        self.assertAlmostEqual(r["cls"], 0.12)

    def test_largest_window_wins_not_the_last(self):
        r = score([shift(100, 0.08), shift(3000, 0.01)])
        self.assertAlmostEqual(r["cls"], 0.08)

    def test_shifts_after_input_are_ignored(self):
        r = score([shift(100, 0.02), shift(300, 0.5, recent_input=True)])
        self.assertAlmostEqual(r["cls"], 0.02)
        self.assertEqual(r["counted"], 1)


def classify(record):
    script = (
        "const {classify} = require(process.argv[1]);"
        "process.stdout.write(classify(JSON.parse(process.argv[2])));"
    )
    out = subprocess.run(
        ["node", "-e", script, str(HERE / "motion-probe.js"), json.dumps(record)],
        check=True, capture_output=True, text=True,
    )
    return out.stdout


def record(properties, finished=True, infinite=False, change=0, measurable=True):
    return {"properties": properties, "finished": finished, "infinite": infinite,
            "measurable": measurable, "measuredChange": change if measurable else None}


GEOMETRIC = ["transform", "translate", "scale", "rotate", "top", "left", "offsetDistance", "padding-left",
             "max-height", "width", "margin-top"]
STATIONARY = ["opacity", "color", "background-color", "backgroundColor", "border-top-color", "outline-color",
              "visibility", "fill"]
OTHER = ["clip-path", "background-position", "filter", "box-shadow", "font-size", "letter-spacing", "--custom", "all"]


@unittest.skipUnless(shutil.which("node"), "node is not installed")
class MotionClassifyTest(unittest.TestCase):
    """'moved' comes only from a measurement. 'still' needs a finished animation, a measurement
    that showed no change, and nothing but non-geometric properties. The rest is 'unknown'.
    Property names are never evidence of movement."""

    def test_a_measured_change_is_movement_whatever_the_property(self):
        for prop in ["padding-left", "opacity", "color", "translate"]:
            self.assertEqual(classify(record([prop], change=160)), "moved")

    def test_a_geometric_property_with_no_measured_change_is_never_movement(self):
        # e.g. a ::before whose keyframes translate it while an !important rule pins transform.
        for prop in GEOMETRIC:
            with self.subTest(prop=prop):
                self.assertEqual(classify(record([prop], change=0)), "unknown")

    def test_only_non_geometric_properties_are_still(self):
        for prop in STATIONARY:
            with self.subTest(prop=prop):
                self.assertEqual(classify(record([prop])), "still")

    def test_anything_else_not_seen_to_move_is_unknown_not_still(self):
        for prop in OTHER:
            with self.subTest(prop=prop):
                self.assertEqual(classify(record([prop])), "unknown")

    def test_one_unlisted_property_makes_the_animation_unknown(self):
        self.assertEqual(classify(record(["opacity", "clip-path"])), "unknown")

    def test_nothing_known_about_the_animation_is_unknown(self):
        self.assertEqual(classify(record([])), "unknown")

    def test_nothing_measured_on_a_measurable_element_is_unknown_even_for_a_fade(self):
        self.assertEqual(classify(record(["opacity"], change=None)), "unknown")

    def test_pseudo_element_is_never_moved(self):
        # A pseudo-element has no box script can read. Whatever its keyframes or computed style
        # say (top, transform, width), movement cannot be established: unknown, never moved.
        for prop in GEOMETRIC + OTHER:
            with self.subTest(prop=prop):
                self.assertEqual(classify(record([prop], measurable=False)), "unknown")

    def test_pseudo_element_that_only_fades_or_recolors_is_still(self):
        for prop in STATIONARY:
            with self.subTest(prop=prop):
                self.assertEqual(classify(record([prop], measurable=False)), "still")

    def test_unfinished_is_unknown_even_for_a_fade(self):
        self.assertEqual(classify(record(["opacity"], finished=False)), "unknown")

    def test_unfinished_but_already_measured_moving_is_movement(self):
        self.assertEqual(classify(record(["translate"], finished=False, change=40)), "moved")

    def test_infinite_fade_is_still(self):
        self.assertEqual(classify(record(["opacity"], finished=False, infinite=True)), "still")

    def test_sub_pixel_jitter_alone_is_not_movement(self):
        self.assertEqual(classify(record(["color"], change=0.5)), "still")

    def test_invariants_over_every_combination(self):
        for prop in GEOMETRIC + STATIONARY + OTHER:
            for finished in (True, False):
                for infinite in (True, False):
                    for change in (None, 0, 50):
                        for measurable in (True, False):
                            result = classify(record([prop], finished=finished, infinite=infinite,
                                                     change=change, measurable=measurable))
                            with self.subTest(prop=prop, finished=finished, infinite=infinite, change=change,
                                              measurable=measurable):
                                self.assertEqual(result == "moved",
                                                 measurable and change is not None and change > 1)
                                if result == "still":
                                    self.assertTrue((finished or infinite) and prop in STATIONARY)
                                    self.assertTrue(not measurable or change == 0)


if __name__ == "__main__":
    unittest.main()
