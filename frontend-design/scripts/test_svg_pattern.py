"""Regression tests for svg_pattern.py. Stdlib only; no browser.

Run: python3 -B -m unittest discover -s frontend-design/scripts -p 'test_*.py'
"""
import os
import re
import subprocess
import sys
import unittest
import xml.etree.ElementTree as ET

HERE = os.path.dirname(os.path.abspath(__file__))
SCRIPT = os.path.join(HERE, "svg_pattern.py")


def run(*args):
    return subprocess.run([sys.executable, "-B", SCRIPT, *args], check=False, capture_output=True, text=True)


def svg(*args):
    result = run(*args)
    if result.returncode:
        raise AssertionError(f"exit {result.returncode}: {result.stderr}")
    ET.fromstring(result.stdout)  # must be well-formed XML
    return result.stdout


def rects(markup):
    return [dict(re.findall(r'(\w+)="([^"]*)"', r)) for r in re.findall(r"<rect [^>]*/>", markup)]


def layer_rects(markup):
    """Rects inside the layer groups, excluding the clipPath and background rects."""
    return rects(markup.split('clip-path="url(', 1)[1])


class DashTests(unittest.TestCase):
    def test_fractional_dash_and_gap_are_kept(self):
        runs = layer_rects(svg("--layer", "hlines:period=48,dash=1,gap=0.5"))
        self.assertEqual(len(runs), 32)  # 48 / 1.5
        self.assertEqual({r["width"] for r in runs}, {"1"})
        self.assertEqual([r["x"] for r in runs[:3]], ["0", "1.5", "3"])

    def test_quarter_pixel_dashes_do_not_crash(self):
        runs = layer_rects(svg("--layer", "vlines:period=48,dash=0.25,gap=0.25"))
        self.assertEqual(len(runs), 96)

    def test_dash_that_does_not_divide_the_tile_is_rejected(self):
        result = run("--layer", "hlines:period=24,dash=5,gap=2")
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("must divide the tile", result.stderr)
        self.assertNotIn("Traceback", result.stderr)


class OffsetTests(unittest.TestCase):
    def test_diag_offset_moves_the_lines(self):
        self.assertNotEqual(svg("--layer", "diag:period=12,offset=0"), svg("--layer", "diag:period=12,offset=5"))

    def test_checker_offset_moves_the_squares(self):
        base = svg("--layer", "checker:period=8,offset=0")
        moved = svg("--layer", "checker:period=8,offset=5")
        self.assertNotEqual(base, moved)
        self.assertIn('x="5" y="5"', moved)
        self.assertIn('x="-3"', moved)  # the square crossing the left edge is wrapped

    def test_checker_offset_by_two_cells_is_unchanged(self):
        def squares(markup):
            inside = (r for r in layer_rects(markup) if 0 <= float(r["x"]) < 48 and 0 <= float(r["y"]) < 48)
            return sorted((r["x"], r["y"]) for r in inside)

        self.assertEqual(squares(svg("--layer", "checker:period=8")), squares(svg("--layer", "checker:period=8,offset=16")))


class SeamTests(unittest.TestCase):
    def test_edge_line_is_drawn_once_per_side(self):
        xs = [r["x"] for r in layer_rects(svg("--layer", "vlines:period=24,offset=0"))]
        self.assertEqual(sorted(xs, key=float), ["-1", "23", "47"])

    def test_period_that_does_not_divide_the_tile_is_rejected(self):
        result = run("--layer", "grid:period=7")
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("must divide the tile", result.stderr)


class InputTests(unittest.TestCase):
    def test_non_positive_tile_is_rejected(self):
        for tile in ("0", "-48"):
            result = run("--tile", tile, "--layer", "grid:period=12")
            self.assertNotEqual(result.returncode, 0, tile)
            self.assertNotIn("Traceback", result.stderr)

    def test_non_numeric_option_is_a_clean_error(self):
        result = run("--layer", "dots:size=big")
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("is not a number", result.stderr)
        self.assertNotIn("Traceback", result.stderr)

    def test_opacity_out_of_range_is_rejected(self):
        self.assertNotEqual(run("--layer", "grid:period=12,opacity=2").returncode, 0)

    def test_attribute_values_are_escaped(self):
        markup = svg("--layer", 'grid:period=12,color=red"/><script>x</script>',
                     "--background", "#fff\"onload=\"x", "--clip-id", 'a"b')
        self.assertNotIn("<script>", markup)
        self.assertIn("&quot;", markup)


class OutputTests(unittest.TestCase):
    def test_css_data_uri_encodes_hash(self):
        css = run("--layer", "grid:period=24", "--format", "css").stdout
        uri = re.search(r'data:image/svg\+xml,([^"]*)"', css).group(1)
        self.assertNotIn("#", uri)
        self.assertIn("%23", uri)
        self.assertIn("background-size: 48px 48px;", css)

    def test_mask_ignores_layer_color_and_background(self):
        css = run("--layer", "grid:period=24,color=red", "--background", "white", "--format", "mask").stdout
        self.assertIn("mask-image:", css)
        self.assertNotIn("red", css)
        self.assertNotIn("white", css)

    def test_every_kind_renders_well_formed_svg(self):
        for spec in ("grid:period=24", "hlines:period=6", "vlines:period=6,dash=2", "diag:period=8,dir=down",
                     "dots:period=12,shape=circle,stagger=1", "cross:period=24,arm=4,offset=0",
                     "x:period=16", "checker:period=8"):
            with self.subTest(spec=spec):
                svg("--layer", spec)


if __name__ == "__main__":
    unittest.main()
