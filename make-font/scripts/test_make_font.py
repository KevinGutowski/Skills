"""Regression tests for the local changes to the make-font scripts. No fonts and no network.

Run: python3 -B -m unittest discover -s make-font/scripts -p 'test_*.py'

The scripts need fontTools, numpy and pillow. Without them these tests are skipped, not failed.

Two slow end-to-end cases are opt-in:
  MAKE_FONT_TEST_VF=/path/to/Base[wdth,wght].ttf    a TrueType variable font with a weight axis: fits two weights
  MAKE_FONT_TEST_NODE_ROOT=/path/with/node_modules  Playwright and a Chromium, with the font above: renders a
                                                    three-weight book in a browser
"""
import json
import os
import sys
import tempfile
import unittest

sys.dont_write_bytecode = True
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

try:
    import check_font
    import find_foundation
    import fit_font
    import fontlib
    import make_targets
    import measure_image
    import space_font  # noqa: F401
    import font_book
    import package
    MISSING = None
except ImportError as e:  # the font libraries are not installed
    MISSING = str(e)

OFL_HEAD = """Copyright 2011 The Example Project Authors (https://example.org/font){rfn}

This Font Software is licensed under the SIL Open Font License, Version 1.1.

DEFINITIONS
"Reserved Font Name" refers to any names specified as such after the
copyright statement(s).

3) No Modified Version of the Font Software may use the Reserved Font
Name(s) unless explicit written permission is granted.
"""


@unittest.skipIf(MISSING, f"font libraries missing: {MISSING}")
class ReservedFontNameTests(unittest.TestCase):
    def test_definition_sentence_is_not_a_reserved_name(self):
        self.assertEqual(package.check_name("Quill Sans", "Example", OFL_HEAD.format(rfn="")), [])

    def test_declared_names_are_read(self):
        text = OFL_HEAD.format(rfn=', with Reserved Font Names "Alpha" and "Beta Text"')
        self.assertEqual(package.check_name("Quill Sans", "Example", text), ["Alpha", "Beta Text"])

    def test_unquoted_declaration_is_read(self):
        text = OFL_HEAD.format(rfn=", with Reserved Font Name Alpha")
        self.assertEqual(package.check_name("Quill Sans", "Example", text), ["Alpha"])

    def test_a_family_using_a_reserved_name_is_refused(self):
        text = OFL_HEAD.format(rfn=', with Reserved Font Name "Alpha"')
        with self.assertRaises(SystemExit):
            package.check_name("Alpha Neue", "Example", text)

    def test_a_family_using_the_base_name_is_refused(self):
        with self.assertRaises(SystemExit):
            package.check_name("Example Two", "Example", OFL_HEAD.format(rfn=""))


@unittest.skipIf(MISSING, f"font libraries missing: {MISSING}")
class SecondaryWeightStemTests(unittest.TestCase):
    T = {"targets": {}, "tolerances": {"stem": 3}}
    FIT = {"styles": [{"style": {"name": "Regular"}, "n_stem_target": 84.6, "y_location": {"wght": 387}},
                      {"style": {"name": "Medium"}, "n_stem_target": 112.2, "y_location": {"wght": 487}}]}

    def stem_state(self, measured):
        style, _ = check_font.with_logged_stem({"name": "Medium", "weight": 500}, self.FIT)
        G = check_font.Gates()
        check_font.gate_metrics(G, {"n_stem": measured}, self.T, style)
        return next(state for _, name, state, _ in G.rows if name == "n stem")

    def test_out_of_tolerance_secondary_weight_fails(self):
        self.assertEqual(self.stem_state(108.7), "FAIL")

    def test_in_tolerance_secondary_weight_passes(self):
        self.assertEqual(self.stem_state(110.0), "PASS")

    def test_an_explicit_target_is_kept(self):
        style, logged = check_font.with_logged_stem({"name": "Medium", "n_stem": 90}, self.FIT)
        self.assertEqual(style["n_stem"], 90)
        self.assertEqual(logged["y_location"], {"wght": 487})

    def test_no_fit_log_leaves_the_style_alone(self):
        style, logged = check_font.with_logged_stem({"name": "Medium"}, None)
        self.assertNotIn("n_stem", style)
        self.assertIsNone(logged)


@unittest.skipIf(MISSING, f"font libraries missing: {MISSING}")
class FontBookTests(unittest.TestCase):
    def test_glob_order_medium_before_regular(self):
        order, main = font_book.weight_order([500, 400])
        self.assertEqual(order, [1, 0])
        self.assertEqual(main, 0)

    def test_main_face_is_nearest_400_and_columns_run_light_to_bold(self):
        order, main = font_book.weight_order([700, 300, 400])
        self.assertEqual(order, [1, 2, 0])
        self.assertEqual(main, 1)

    def test_no_regular_takes_the_nearest_weight(self):
        order, main = font_book.weight_order([700, 500])
        self.assertEqual((order, main), ([1, 0], 0))

    def test_26_features_need_a_second_page(self):
        pages = font_book.paged(list(range(26)), font_book.FEATURES_PER_PAGE)
        self.assertEqual([len(p) for p in pages], [21, 5])

    def test_no_features_still_makes_one_page(self):
        self.assertEqual(font_book.paged([], font_book.FEATURES_PER_PAGE), [[]])


@unittest.skipIf(MISSING, f"font libraries missing: {MISSING}")
class FoundationTests(unittest.TestCase):
    def test_only_truetype_variable_fonts_are_bases(self):
        self.assertTrue(find_foundation.fittable({"fvar": 1, "glyf": 1}))
        self.assertFalse(find_foundation.fittable({"glyf": 1}))            # static
        self.assertFalse(find_foundation.fittable({"fvar": 1, "CFF2": 1}))  # CFF2 variable


def ring(cx, cy, rx, ry, n=12, reverse=False):
    """A convex n-point contour around (cx, cy)."""
    import math
    pts = [(round(cx + rx * math.cos(2 * math.pi * i / n)), round(cy + ry * math.sin(2 * math.pi * i / n))) for i in range(n)]
    return pts[::-1] if reverse else pts


def outline(*contours):
    """(points, contour end indexes, on-curve flags), the shape check_font compares."""
    pts, ends = [], []
    for c in contours:
        pts += c
        ends.append(len(pts) - 1)
    return pts, tuple(ends), tuple(1 for _ in pts)


def scaled(o, sx, sy, dx=0, dy=0):
    return [(x * sx + dx, y * sy + dy) for x, y in o[0]], o[1], o[2]


@unittest.skipIf(MISSING, f"font libraries missing: {MISSING}")
class ProvenanceOutlineTests(unittest.TestCase):
    DOT = outline(ring(100, 50, 50, 50))
    DIERESIS = outline(ring(100, 600, 45, 45), ring(300, 600, 45, 45))
    LETTER_O = outline(ring(300, 350, 280, 350, n=16), ring(300, 350, 200, 270, n=16, reverse=True))
    LETTER_H = outline([(0, 0), (80, 0), (80, 300), (320, 300), (320, 0), (400, 0), (400, 700), (320, 700),
                        (320, 380), (80, 380), (80, 700), (0, 700)])

    def test_dots_are_plain(self):
        self.assertTrue(check_font.plain(self.DOT))
        self.assertTrue(check_font.plain(self.DIERESIS))

    def test_a_letter_with_a_counter_is_not_plain(self):
        self.assertFalse(check_font.plain(self.LETTER_O))

    def test_a_concave_letter_is_not_plain(self):
        self.assertFalse(check_font.plain(self.LETTER_H))

    def test_one_point_and_two_point_contours_do_not_crash(self):
        stray = outline(ring(100, 50, 50, 50), [(500, 500)], [(0, 0), (10, 10)])
        self.assertTrue(check_font.plain(stray))
        with_stray_point = outline(self.LETTER_H[0], [(500, 500)])
        self.assertFalse(check_font.plain(with_stray_point))

    def test_copied_letterforms_fail_even_when_rescaled(self):
        ours = {"O": scaled(self.LETTER_O, 1.08, 0.97, 12, -5), "H": scaled(self.LETTER_H, 0.95, 1.02)}
        refs = {"O": self.LETTER_O, "H": self.LETTER_H}
        self.assertEqual(sorted(check_font.outline_matches(ours, refs)), ["H~H", "O~O"])

    def test_unrelated_dots_stay_exempt(self):
        ours = {"period": scaled(self.DOT, 1.1, 1.1), "dieresis": scaled(self.DIERESIS, 0.9, 0.9), "comp": None}
        refs = {"period": self.DOT, "bullet": self.DOT, "dieresis": self.DIERESIS}
        self.assertEqual(check_font.outline_matches(ours, refs), [])

    def test_a_different_letter_does_not_match(self):
        other_o = outline(ring(300, 350, 280, 350, n=16), ring(300, 350, 120, 300, n=16, reverse=True))
        self.assertEqual(check_font.outline_matches({"O": other_o}, {"O": self.LETTER_O}), [])


@unittest.skipIf(MISSING, f"font libraries missing: {MISSING}")
class WidthCorrectionTests(unittest.TestCase):
    """A stretch scales stems too, so a class never keeps an instance solved for another stretch."""

    def run_pass(self, errs, factor, has_wdth=False, reaim_returns=1.0):
        calls = {"restem": [], "reaim": []}

        def restem(cls, s):
            calls["restem"].append((cls, s))

        def reaim(cls, e):
            calls["reaim"].append(cls)
            return reaim_returns
        fit_font.correct_factors(errs, factor, 0.3, 0.03, has_wdth, reaim, restem)
        return calls

    def test_a_changed_factor_solves_the_weight_again(self):
        factor = {"lc_straight": 1.0, "lc_round": 1.0}
        calls = self.run_pass({"lc_straight": 0.02, "lc_round": 0.0}, factor)
        self.assertEqual(factor["lc_straight"], 0.9804)
        self.assertEqual(calls["restem"], [("lc_straight", 0.9804)])

    def test_several_passes_keep_the_weight_in_step_with_the_factor(self):
        factor = {"lc_straight": 1.0}
        seen = []
        for err in (0.012, 0.009, 0.006):  # three width iterations, each squeezing a little more
            seen += self.run_pass({"lc_straight": err}, factor)["restem"]
        self.assertEqual(len(seen), 3)
        self.assertEqual(seen[-1], ("lc_straight", factor["lc_straight"]))
        self.assertLess(factor["lc_straight"], 0.975)

    def test_the_stretch_limit_clamps_and_still_solves_the_weight(self):
        factor = {"uc_round": 1.0}
        calls = self.run_pass({"uc_round": 0.08}, factor)
        self.assertEqual(factor["uc_round"], 0.97)
        self.assertEqual(calls["restem"], [("uc_round", 0.97)])

    def test_a_factor_already_at_the_limit_is_left_alone(self):
        factor = {"uc_round": 0.97}
        calls = self.run_pass({"uc_round": 0.05}, factor)
        self.assertEqual(calls, {"restem": [], "reaim": []})

    def test_a_class_within_tolerance_is_left_alone(self):
        factor = {"lc_round": 1.0}
        for has_wdth in (False, True):
            self.assertEqual(self.run_pass({"lc_round": 0.002}, factor, has_wdth), {"restem": [], "reaim": []})
        self.assertEqual(factor["lc_round"], 1.0)

    def test_a_width_axis_is_used_before_any_stretch(self):
        factor = {"uc_round": 1.0, "lc_round": 0.99}
        calls = self.run_pass({"uc_round": 0.08, "lc_round": 0.012}, factor, has_wdth=True)
        self.assertEqual(calls, {"restem": [], "reaim": ["uc_round", "lc_round"]})
        self.assertEqual(factor, {"uc_round": 1.0, "lc_round": 1.0})

    def test_a_width_axis_that_ran_out_hands_back_the_stretch_it_needs(self):
        factor = {"lc_narrow": 1.0}
        self.run_pass({"lc_narrow": 0.06}, factor, has_wdth=True, reaim_returns=0.97)
        self.assertEqual(factor["lc_narrow"], 0.97)


VF = os.environ.get("MAKE_FONT_TEST_VF")


@unittest.skipIf(MISSING, f"font libraries missing: {MISSING}")
@unittest.skipUnless(VF and os.path.exists(VF or ""), "set MAKE_FONT_TEST_VF to a variable font to run the end-to-end fit")
class SecondWeightFitTests(unittest.TestCase):
    def test_every_written_weight_lands_on_its_logged_stem(self):
        """The base's own measurements, Regular and Medium, default options: the Medium needs several width
        passes, which is where the stem used to drift out of tolerance."""
        from fontTools.ttLib import TTFont
        import fontlib as L
        import make_targets  # noqa: F401  (import check only: the CLI is driven below)
        import subprocess
        here = os.path.dirname(os.path.abspath(__file__))
        with tempfile.TemporaryDirectory() as tmp:
            m, t, out = (os.path.join(tmp, n) for n in ("m.json", "targets.json", "build"))
            run = lambda *a: subprocess.run([sys.executable, "-I", "-B", *a], check=True, capture_output=True)  # noqa: E731
            run(os.path.join(here, "measure_font.py"), VF, "--out", m)
            run(os.path.join(here, "make_targets.py"), m, "--family", "Test Face", "--use", "text", "--scripts", "latin",
                "--style", "Regular:400", "--style", "Medium:500", "--out", t)
            run(os.path.join(here, "fit_font.py"), VF, t, "--out-dir", out)
            with open(t) as fh:
                tol = json.load(fh)["tolerances"]["stem"]
            with open(os.path.join(out, "fit-log.json")) as fh:
                styles = json.load(fh)["styles"]
            self.assertEqual(len(styles), 2)
            for s in styles:
                name = s["style"]["name"]
                m = L.measure_face(L.Face(TTFont(os.path.join(out, s["file"]))))
                self.assertLessEqual(abs(m["n_stem"] - s["n_stem_target"]), tol, f"{name}: {m['n_stem']} vs {s['n_stem_target']}")
                # Fitted to the base's own numbers, every class of every weight is reachable: nothing may sit at
                # the stretch limit, and the written widths meet that weight's own targets.
                self.assertEqual(s["stretch_limit_hit"], [], name)
                self.assertEqual(s["not_converged"], [], name)
                for cls, want in s["targets"]["widths"].items():
                    self.assertLess(abs(m["widths"][cls] / want - 1), 0.015, f"{name} {cls}")
            regular, medium = (s["targets"]["widths"] for s in styles)
            self.assertNotEqual(regular, medium)  # the second weight has widths of its own


@unittest.skipIf(MISSING, f"font libraries missing: {MISSING}")
class WeightsPageTests(unittest.TestCase):
    def test_every_style_gets_a_column(self):
        for n in range(1, 10):
            pages = font_book.weight_pages(n)
            self.assertEqual([i for p in pages for i in p], list(range(n)))
            self.assertTrue(all(1 <= len(p) <= font_book.WEIGHT_COLS for p in pages))

    def test_pages_are_filled_evenly(self):
        self.assertEqual(font_book.weight_pages(3), [[0, 1, 2]])
        self.assertEqual(font_book.weight_pages(4), [[0, 1], [2, 3]])
        self.assertEqual(font_book.weight_pages(5), [[0, 1, 2], [3, 4]])

    def test_two_columns_keep_the_designed_sizes(self):
        self.assertEqual(font_book.specimen_sizes(2, 1.7, 15.0), (330, 33))

    def test_three_columns_shrink_until_the_widest_word_fits(self):
        big_em, alpha_em = 1.71, 16.7  # a bold sans: "Rag" and the capitals line, in em
        big, alpha = font_book.specimen_sizes(3, big_em, alpha_em)
        col = (font_book.PAGE_INNER - 2 * font_book.WEIGHT_GAP) / 3
        self.assertLess(big, 330)
        self.assertLessEqual(big * big_em, col)
        self.assertLessEqual(alpha * alpha_em, col)

    def test_a_wide_face_shrinks_even_in_two_columns(self):
        big, _ = font_book.specimen_sizes(2, 2.6, 15.0)
        self.assertLessEqual(big * 2.6, (font_book.PAGE_INNER - font_book.WEIGHT_GAP) / 2)


NODE_ROOT = os.environ.get("MAKE_FONT_TEST_NODE_ROOT")


@unittest.skipIf(MISSING, f"font libraries missing: {MISSING}")
@unittest.skipUnless(VF and os.path.exists(VF or "") and NODE_ROOT and os.path.isdir(NODE_ROOT or ""),
                     "set MAKE_FONT_TEST_VF and MAKE_FONT_TEST_NODE_ROOT to render a three-weight book in a browser")
class ThreeWeightBookTests(unittest.TestCase):
    def test_three_weights_fit_their_columns_and_the_old_layout_is_caught(self):
        import re
        import subprocess
        from fontTools.ttLib import TTFont
        from fontTools.ttLib.scaleUpem import scale_upem
        from fontTools.varLib import instancer
        here = os.path.dirname(os.path.abspath(__file__))
        with tempfile.TemporaryDirectory() as tmp:
            paths = []
            for name, w in (("Regular", 400), ("Medium", 500), ("Bold", 700)):
                vf = TTFont(VF)
                loc = {tag: (w if tag == "wght" else None) for tag in (a.axisTag for a in vf["fvar"].axes)}
                f = instancer.instantiateVariableFont(vf, loc)
                scale_upem(f, 1000)  # the fit always writes 1000 units per em, and the book's drawings assume it
                f["OS/2"].usWeightClass = w
                for nid, text in ((1, "Test Face"), (2, name), (16, "Test Face"), (17, name)):
                    f["name"].setName(text, nid, 3, 1, 0x409)
                paths.append(os.path.join(tmp, f"TestFace-{name}.ttf"))
                f.save(paths[-1])
            book = os.path.join(tmp, "book")
            subprocess.run([sys.executable, "-I", "-B", os.path.join(here, "font_book.py"), *paths, "--out-dir", book],
                           check=True, capture_output=True)
            render = ["node", os.path.join(here, "render_book.mjs"), book, "--root", NODE_ROOT, "--no-pdf"]
            good = subprocess.run(render, capture_output=True, text=True)
            self.assertEqual(good.returncode, 0, good.stdout + good.stderr)
            self.assertIn("overflow: 0", good.stdout)
            # Put upstream's fixed two-column sizes back: the word no longer fits a third of the page.
            index = os.path.join(book, "index.html")
            with open(index, encoding="utf-8") as fh:
                html = fh.read()
            html, n = re.subn(r'font-size:[0-9.]+px">Rag', 'font-size:330px">Rag', html)
            self.assertEqual(n, 3)
            with open(index, "w", encoding="utf-8") as fh:
                fh.write(html)
            bad = subprocess.run(render, capture_output=True, text=True)
            self.assertEqual(bad.returncode, 1, bad.stdout + bad.stderr)
            self.assertRegex(bad.stdout, r"wbig text \d+px wide in a \d+px box")


@unittest.skipIf(MISSING, f"font libraries missing: {MISSING}")
class ArgumentOrderTests(unittest.TestCase):
    STYLES = [{"name": "Regular", "weight": 400, "n_stem": 88.9}, {"name": "Medium", "weight": 500},
              {"name": "Bold", "weight": 700}]
    T = {"targets": {"para": 70000, "widths": {"lc_round": 500.0}, "sides": {"lc_round": 40.0}}, "cap_em": 711,
         "tolerances": {"stem": 3, "width_pct": 1.5, "para_pct": 1.5, "side": 4}}
    MEASURED = {"Regular": {"para": 69980, "widths": {"lc_round": 500.2}, "sides": {"lc_round": 40.5}},
                "Medium": {"para": 70600, "widths": {"lc_round": 500.9}, "sides": {"lc_round": 43.0}},
                "Bold": {"para": 71106, "widths": {"lc_round": 501.4}, "sides": {"lc_round": 47.0}}}

    def gates(self, order):
        """Per-style width gate rows for fonts given in `order`, as check_font's main loop produces them."""
        out = {}
        for _, style, is_first in check_font.match_styles(order, self.STYLES):
            G = check_font.Gates()
            check_font.gate_widths(G, self.MEASURED[style["name"]], self.T, is_first)
            out[style["name"]] = G.rows
        return out

    def test_gates_do_not_depend_on_the_order_of_the_files(self):
        import itertools
        want = self.gates(["Regular", "Medium", "Bold"])
        for order in itertools.permutations(["Regular", "Medium", "Bold"]):
            self.assertEqual(self.gates(list(order)), want, order)

    def test_a_glob_that_sorts_bold_first_does_not_gate_bold_on_the_paragraph(self):
        rows = self.gates(["Bold", "Medium", "Regular"])  # what dist/ttf/*.ttf gives
        self.assertNotIn("paragraph, shaped", [name for _, name, _, _ in rows["Bold"]])
        self.assertIn(("widths", "paragraph, shaped", "PASS"), [r[:3] for r in rows["Regular"]])

    def test_styles_come_back_in_targets_order_with_their_own_file(self):
        got = check_font.match_styles(["Bold", "Medium", "Regular"], self.STYLES)
        self.assertEqual([(i, s["name"], first) for i, s, first in got],
                         [(2, "Regular", True), (1, "Medium", False), (0, "Bold", False)])

    def test_a_subset_without_the_first_style_has_no_first(self):
        got = check_font.match_styles(["Bold", "Medium"], self.STYLES)
        self.assertEqual([(s["name"], first) for _, s, first in got], [("Medium", False), ("Bold", False)])

    def test_package_orders_files_and_logs_by_style(self):
        paths = ["build/QuillSans-Bold.ttf", "build/QuillSans-Medium.ttf", "build/QuillSans-Regular.ttf"]
        self.assertEqual(sorted(paths, key=lambda p: package.style_rank(p, self.STYLES)), paths[::-1])
        logs = ["QuillSans-Medium.fit.ttf", "QuillSans-Regular.fit.ttf", "x/QuillSans-Bold.ttf.space-log.json", "Other.ttf"]
        self.assertEqual([package.style_rank(n, self.STYLES) for n in logs], [1, 0, 2, 3])

    def test_an_unknown_name_falls_back_to_its_position(self):
        got = check_font.match_styles(["Book"], self.STYLES)
        self.assertEqual([(i, s["name"], first) for i, s, first in got], [(0, "Regular", True)])


@unittest.skipIf(MISSING, f"font libraries missing: {MISSING}")
class NameRuleTests(unittest.TestCase):
    """One set of naming rules for package.py, check_font.py and find_foundation.py."""

    def test_respelling_the_base_name_is_still_a_conflict(self):
        for family, base in (("DM-Sans Neue", "DM Sans"), ("DMSans", "DM Sans"), ("RedHat Display", "Red Hat Display"),
                             ("PTSans Pro", "PT Sans"), ("Ro-boto Sans", "Roboto"), ("roboto", "Roboto")):
            self.assertTrue(fontlib.name_conflicts(family, base), (family, base))

    def test_a_word_that_only_contains_the_name_is_not_a_conflict(self):
        for family, base in (("Printer Sans", "Inter"), ("Platonic", "Lato"), ("Essential Text", "Sen"),
                             ("Quill Slab", "Roboto Slab"), ("Tessel Serif", "Frank Ruhl Libre")):
            self.assertEqual(fontlib.name_conflicts(family, base), [], (family, base))

    def test_one_distinct_word_of_the_base_is_a_conflict(self):
        self.assertEqual(fontlib.name_conflicts("Frank Sans", "Frank Ruhl Libre"), ["frank"])

    def test_reserved_names_in_every_quoting(self):
        text = 'Copyright 2010 ParaType Ltd, with Reserved Font Names "PT Sans" and "ParaType".'
        self.assertEqual(fontlib.reserved_font_names(text), ["PT Sans", "ParaType"])
        self.assertEqual(fontlib.reserved_font_names("with Reserved Font Name 'Adobe'."), ["Adobe"])
        self.assertEqual(fontlib.reserved_font_names('with Reserved Font Name "Exo 2.0".'), ["Exo 2.0"])
        self.assertEqual(fontlib.reserved_font_names("with Reserved Font Name <Reserved Font Name>."), [])
        self.assertTrue(fontlib.name_conflicts("Adobe Fit", "Source Sans", ["Adobe"]))

    def test_postscript_name_keeps_accented_letters(self):
        self.assertEqual(package.ps_name("Über & Sons", "Semi Bold"), "UberSons-SemiBold")

    def test_script_names(self):
        self.assertEqual(fontlib.script_name("Cyrillic"), "cyrillic")
        self.assertEqual(fontlib.script_name("latin-extended"), "latin-ext")
        self.assertIsNone(fontlib.script_name("klingon"))

    def test_semibold_is_a_regular_style_and_only_bold_is_bold(self):
        self.assertEqual(package.style_bits("SemiBold"), (1 << 6, 0))
        self.assertEqual(package.style_bits("Regular"), (1 << 6, 0))
        self.assertEqual(package.style_bits("ExtraBold"), (1 << 6, 0))
        self.assertEqual(package.style_bits("Bold"), (1 << 5, 1))


def ref(serif, n_stem=90.0, widths=None, para=None, conf=None, file="a.ttf", source="file"):
    m = {"source": source, "file": file, "serif": serif, "n_stem": n_stem, "contrast": 0.5,
         "widths": widths or {"lc_round": 500.0}, "confidence": conf or {}}
    if para is not None:
        m["para"], m["space"] = para, 250.0
    return m


@unittest.skipIf(MISSING, f"font libraries missing: {MISSING}")
class MergeTests(unittest.TestCase):
    def test_serif_vote_does_not_depend_on_order(self):
        a, b = ref(True, file="a.ttf"), ref(False, file="b.ttf")
        self.assertIsNone(make_targets.merge([a, b], [1, 1])[0]["serif"])
        self.assertIsNone(make_targets.merge([b, a], [1, 1])[0]["serif"])

    def test_serif_vote_follows_the_weights(self):
        a, b = ref(True, file="a.ttf"), ref(False, file="b.ttf")
        self.assertTrue(make_targets.merge([a, b], [10, 1])[0]["serif"])
        self.assertTrue(make_targets.merge([b, a], [1, 10])[0]["serif"])
        self.assertFalse(make_targets.merge([a, b], [1, 10])[0]["serif"])

    def test_paragraph_is_dropped_when_a_width_reference_lacks_it(self):
        file_ref = ref(False, para=67000.0, file="a.ttf")
        shot = ref(False, widths={"lc_round": 540.0}, file="shot.png", source="image")
        out, _, _, dropped = make_targets.merge([file_ref, shot], [1, 1])
        self.assertNotIn("para", out)
        self.assertEqual(sorted(dropped), ["para", "space"])

    def test_paragraph_is_kept_when_every_width_reference_has_it(self):
        out, _, _, dropped = make_targets.merge([ref(False, para=67000.0), ref(False, para=69000.0, file="b.ttf")], [1, 1])
        self.assertEqual(out["para"], 68000.0)
        self.assertEqual(dropped, [])

    def test_a_low_confidence_class_width_is_carried_into_the_targets(self):
        _, conf, _, _ = make_targets.merge([ref(False, conf={"w_lc_round": "low"}, source="image")], [1])
        self.assertEqual(conf["w_lc_round"], "low")


@unittest.skipIf(MISSING, f"font libraries missing: {MISSING}")
class ScreenshotTests(unittest.TestCase):
    def cov(self, bands, height=200):
        import numpy as np
        a = np.zeros((height, 40))
        for top, bottom in bands:
            a[top:bottom, 5:35] = 1.0
        return a

    def test_dots_above_a_line_join_the_line_below(self):
        # line 1 at rows 20-80; then the dots of an i (rows 110-116) just above line 2 (rows 124-170)
        self.assertEqual(measure_image.split_lines(self.cov([(20, 80), (110, 116), (124, 170)])), [(20, 80), (110, 170)])

    def test_a_tail_under_a_line_joins_the_line_above(self):
        self.assertEqual(measure_image.split_lines(self.cov([(20, 80), (84, 90), (130, 180)])), [(20, 90), (130, 180)])

    def test_two_plain_lines_stay_two(self):
        self.assertEqual(measure_image.split_lines(self.cov([(20, 80), (120, 180)])), [(20, 80), (120, 180)])

    def test_a_transparent_background_reads_as_light(self):
        from PIL import Image
        with tempfile.TemporaryDirectory() as tmp:
            im = Image.new("RGBA", (60, 40), (0, 0, 0, 0))
            for x in range(20, 40):
                for y in range(10, 30):
                    im.putpixel((x, y), (0, 0, 0, 255))
            path = os.path.join(tmp, "t.png")
            im.save(path)
            cov = measure_image.load_coverage(path)
        self.assertGreater(cov[20, 30], 0.9)   # the black square is ink
        self.assertLess(cov[2, 2], 0.1)        # the transparent ground is not


@unittest.skipIf(MISSING, f"font libraries missing: {MISSING}")
class PerStyleGateTests(unittest.TestCase):
    T = {"targets": {"widths": {"lc_narrow": 285.0}, "sides": {"lc_round": 45.0}, "contrast": 0.82, "para": 67000},
         "cap_em": 711, "tolerances": {"stem": 3, "width_pct": 1.5, "para_pct": 1.5, "side": 4, "contrast": 0.05, "xh": 6}}
    BOLD = {"n_stem": 140.0, "xh": 520.0, "contrast": 0.78, "widths": {"lc_narrow": 328.0}, "sides": {"lc_round": 40.0}}

    def rows(self, logged, is_first=False):
        Ts, own = check_font.style_view(self.T, logged, is_first)
        G = check_font.Gates()
        check_font.gate_metrics(G, self.BOLD, Ts, {"name": "Bold", "n_stem": 140.0}, own)
        check_font.gate_widths(G, self.BOLD, Ts, is_first, own)
        return {name: state for _, name, state, _ in G.rows}

    def test_a_bold_is_gated_against_its_own_width_and_contrast(self):
        logged = {"targets": {"widths": {"lc_narrow": 327.0}, "sides": {"lc_round": 41.0}, "contrast": 0.78}}
        rows = self.rows(logged)
        self.assertEqual((rows["lc_narrow"], rows["contrast o thin / o side"], rows["lc_round side mean"]), ("PASS",) * 3)

    def test_the_same_bold_against_the_regular_targets_would_fail(self):
        self.assertEqual(self.rows(None, is_first=True)["lc_narrow"], "FAIL")

    def test_without_a_fit_log_a_later_weight_is_reported_not_gated(self):
        rows = self.rows(None)
        self.assertEqual(rows["class widths and side means"], "INFO")
        self.assertEqual(rows["contrast o thin / o side"], "INFO")
        self.assertNotIn("lc_narrow", rows)

    def test_a_bold_that_misses_its_own_target_still_fails(self):
        rows = self.rows({"targets": {"widths": {"lc_narrow": 300.0}, "contrast": 0.78}})
        self.assertEqual(rows["lc_narrow"], "FAIL")

    def test_a_missing_paragraph_target_is_said_not_skipped(self):
        T = {**self.T, "targets": {k: v for k, v in self.T["targets"].items() if k != "para"}}
        G = check_font.Gates()
        check_font.gate_widths(G, self.BOLD, T, True, True)
        self.assertIn(("widths", "paragraph, shaped", "INFO"), [r[:3] for r in G.rows])

    def test_an_unknown_script_fails_coverage(self):
        G = check_font.Gates()

        class F:
            def getBestCmap(self):
                return {ord(c): c for c in check_font.COVERAGE["latin"]}
        check_font.gate_coverage(G, F(), ["latin", "Latin", "klingon"])
        self.assertEqual([state for _, _, state, _ in G.rows], ["PASS", "PASS", "FAIL"])


class FakeFace:
    """Every character one em wide."""
    upm = 1000

    def text_width(self, text):
        return 1000 * len(text)


@unittest.skipIf(MISSING, f"font libraries missing: {MISSING}")
class CoverAndCellTests(unittest.TestCase):
    def test_a_short_name_keeps_the_designed_size(self):
        self.assertEqual(font_book.cover_size([2.0, 1.8]), 300)

    def test_a_long_name_shrinks_to_the_page(self):
        size = font_book.cover_size([6.4])  # Typographica-like: twelve wide letters
        self.assertLess(size, 300)
        self.assertLessEqual(size * 6.4, font_book.PAGE_INNER)

    def test_a_long_feature_sample_is_cut_to_its_cell(self):
        self.assertEqual(font_book.fit_chars(FakeFace(), "abcdefghij", 27, 100), "abc")
        self.assertEqual(font_book.fit_chars(FakeFace(), "ab", 27, 100), "ab")

    def test_a_space_log_is_found_by_style_whatever_the_family_spelling(self):
        logs = [{"input": "Salt&Pepper-Regular.fit.ttf", "guard": [1, 2, 3]}, {"input": "Salt&Pepper-SemiBold.fit.ttf", "guard": [1]}]
        self.assertEqual(len(font_book.log_for_style(logs, "Regular")["guard"]), 3)
        self.assertEqual(len(font_book.log_for_style(logs, "Semi Bold")["guard"]), 1)
        self.assertIsNone(font_book.log_for_style(logs, "Bold"))


if __name__ == "__main__":
    unittest.main()
