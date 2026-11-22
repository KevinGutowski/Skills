"""Gate a built font against targets.json, its open base, and the licence rules. Exit 1 on any failure.

  python3 -I check_font.py <font.ttf> [<font2.ttf> ...] --targets targets.json --base <base-vf.ttf>
      [--reference ref.ttf | --reference-image shot.png --reference-text "line|line"] [--package DIR]
      [--fit-log fit-log.json] [--out-dir DIR]

Gates, each PASS, FAIL or INFO, with the number behind it:
- metrics: x-height to cap, n stem, contrast, within the targets' tolerances (targets.json "tolerances").
- widths: every class mean advance, and the shaped paragraph when the targets came from a file.
- spacing: straight and round sidebearing means.
- kerning: every pair of letters, figures and punctuation, shaped. The smallest ink gap must clear min_gap.
- coverage: every character the targets' scripts need.
- provenance: glyph order and character map equal the base's; with --fit-log, every glyph is within 3 % of the
  height and 40 % of the width of the base glyph at the fit's y location (y comes from there, x from the
  width classes); and, given --reference files, no outline matches a reference outline in point structure and shape.
- validity: a ttx round trip, win metrics that cover every glyph, and fontbakery when it is installed.
- licence: OFL notice and URL in the name table, no trademark record, a new family name that is not the base's
  name or a Reserved Font Name, and no base family name in any table but the copyright line. With --package,
  OFL.txt and FONTLOG.txt must be there.
Renders: <out-dir>/overlay-<style>-<size>.png sets the reference and the font on the same lines at a text and
a display size, reference in red, ours in blue, overlap black. With a screenshot reference, the two are
stacked at the same cap height instead.
"""
import argparse
import copy
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile

sys.dont_write_bytecode = True  # keep the skill folder free of __pycache__
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import numpy as np  # noqa: E402
from fontTools.ttLib import TTFont  # noqa: E402
from fontTools.varLib import instancer  # noqa: E402

import fontlib as L  # noqa: E402

COVERAGE = {
    "latin": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
             "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÑÒÓÔÕÖØÙÚÛÜÝßàáâãäåæçèéêëìíîïñòóôõöøùúûüýÿŒœŠšŽžŸ"
             ".,:;!?¡¿'\"()[]{}-–—‘’“”‚„‹›«»…•·/\\&@#*§¶©®™°%‰$€£¥¢+−×÷=<>",
    "latin-ext": "ĀāĂăĄąĆćČčĎďĐđĒēĖėĘęĚěĞğĢģĪīĮįİıĶķĹĺĻļĽľŁłŃńŅņŇňŌōŐőŔŕŘřŚśŞşȘșŤťŢţȚțŪūŮůŰűŲųŹźŻż",
    "vietnamese": "ĂăÂâĐđÊêÔôƠơƯưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ",
    "cyrillic": "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюяЄєІіЇїҐґЎў",
    "greek": "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψωςάέήίόύώ",
}
TEXT_SAMPLE = "Hamburgefonstiv quick brown 1234"
DISPLAY_SAMPLE = "Rag Gold"


class Gates:
    def __init__(self):
        self.rows = []

    def add(self, group, name, ok, detail):
        state = "INFO" if ok is None else "PASS" if ok else "FAIL"
        self.rows.append((group, name, state, detail))

    def failed(self):
        return [r for r in self.rows if r[2] == "FAIL"]


def gate_metrics(G, m, T, style, own=True):
    """`own` is False for a weight after the first when no fit log gave it targets of its own: its contrast is
    then printed, not gated, because the first style's contrast is not its target."""
    tg, tol = T["targets"], T["tolerances"]
    stem_t = style.get("n_stem") if style else tg.get("n_stem")
    if not stem_t:
        G.add("metrics", "n stem", None, f"{m['n_stem']}, no target for this style: pass --fit-log, which has the one the fit used")
    elif m.get("n_stem"):
        G.add("metrics", "n stem", abs(m["n_stem"] - stem_t) <= tol["stem"], f"{m['n_stem']} vs {stem_t:.1f}, ±{tol['stem']}")
    if tg.get("xh") is not None:
        G.add("metrics", "x-height", abs(m["xh"] - tg["xh"]) <= tol["xh"], f"{m['xh']} vs {tg['xh']}, ±{tol['xh']} (cap 700)")
    if tg.get("contrast") is not None and m.get("contrast") is not None:
        G.add("metrics", "contrast o thin / o side", abs(m["contrast"] - tg["contrast"]) <= tol["contrast"] if own else None,
              f"{m['contrast']} vs {tg['contrast']}, ±{tol['contrast']}" if own else
              f"{m['contrast']}, not gated: the target is the first style's. Pass --fit-log for this weight's own")
    for k in ("asc", "desc", "H_bar", "bar_stem", "serif_ext", "serif_tip", "overshoot_lc"):
        if tg.get(k) is not None and m.get(k) is not None:
            G.add("metrics", k, None, f"{m[k]} vs {tg[k]}")


def gate_widths(G, m, T, first_style, own=True):
    tg, tol = T["targets"], T["tolerances"]
    if not own:
        # Local change: say what was not checked, and why. Upstream dropped these rows without a word.
        G.add("widths", "class widths and side means", None,
              "not gated: this weight's targets are in the fit log. Pass --fit-log")
    for cls, v in (tg.get("widths") or {}).items() if own else ():
        got = m["widths"].get(cls)
        if got is None:
            continue
        e = got / v - 1
        G.add("widths", cls, abs(e) * 100 <= tol["width_pct"], f"{got} vs {v}, {e * 100:+.2f}%")
    if first_style and tg.get("para") and m.get("para") and T.get("cap_em"):
        e = m["para"] / tg["para"] - 1
        G.add("widths", "paragraph, shaped", abs(e) * 100 <= tol["para_pct"], f"{e * 100:+.2f}%, ±{tol['para_pct']}%")
    elif first_style:
        G.add("widths", "paragraph, shaped", None, "not run: the targets hold no paragraph width (it needs one font-file "
              "reference, and every reference that gave widths has to give it)")
    for cls, v in (tg.get("sides") or {}).items() if own else ():
        got = m["sides"].get(cls)
        if got is not None:
            G.add("spacing", f"{cls} side mean", abs(got - v) <= tol["side"], f"{got} vs {v}, ±{tol['side']}")


def gate_kerning(G, face, min_gap):
    import space_font as S
    cm = face.cmap
    chars = [c for c in S.GUARD_CHARS if ord(c) in cm]
    prof = {c: face.profile(c) for c in chars}
    worst = []
    for a in chars:
        if a == "f":
            continue
        for b in chars:
            k = face.kern(a + b)
            if k is None:
                continue
            off = face.adv(a) + k
            ra, rb = prof[a], prof[b]
            gaps = [rb[y][0] + off - ra[y][1] for y in ra if y in rb]
            if gaps:
                worst.append((min(gaps), a + b))
    worst.sort()
    bad = [w for w in worst if w[0] < min_gap - 1]
    G.add("kerning", "collisions", not bad, f"{len(bad)} pairs under {min_gap} units; closest " +
          ", ".join(f"{p} {g:.0f}" for g, p in worst[:6]))


def gate_coverage(G, f, scripts):
    cm = f.getBestCmap()
    for s in scripts:
        key = L.script_name(s)
        need = COVERAGE.get(key)
        if need is None:
            # Local change: a script nobody can check is a failed claim, not a note. Upstream let it through.
            G.add("coverage", s, False, f"no character list for this script. Known: {', '.join(COVERAGE)}")
            continue
        miss = [c for c in need if ord(c) not in cm]
        G.add("coverage", s, not miss, f"{len(need) - len(miss)} of {len(need)}" + (f", missing {''.join(miss[:30])}" if miss else ""))


def norm(pts):
    xs, ys = [p[0] for p in pts], [p[1] for p in pts]
    w, h = (max(xs) - min(xs)) or 1, (max(ys) - min(ys)) or 1
    return [((x - min(xs)) / w, (y - min(ys)) / h) for x, y in pts]


def plain(o, letter=True):
    """Local change (KevinGutowski/Skills): True for a glyph that says nothing about who drew it, because it is
    only dots, bars, pills or rings: every contour is convex. Two fonts' full stops match each other by geometry,
    not by copying, so such glyphs are left out like upstream's shapes under nine points.

    For a letter or a figure there is one more condition: no contour inside another. That keeps O, o, 0 and D in
    the comparison, since a copied O is exactly what the gate is for. A symbol built the same way (a degree sign,
    a ring, a white bullet) is a circle in a circle in every font and stays exempt.
    o is (points, contour end indexes, on-curve flags)."""
    boxes, start = [], 0
    for end in o[1]:
        pts = o[0][start:end + 1]
        start = end + 1
        if len(pts) < 3:  # a stray point or a line has no shape: nothing to match, nothing to exempt
            continue
        sign = 0
        for i in range(len(pts)):
            (x0, y0), (x1, y1), (x2, y2) = pts[i - 2], pts[i - 1], pts[i]
            c = (x1 - x0) * (y2 - y1) - (y1 - y0) * (x2 - x1)
            if c:
                if sign and (c > 0) != (sign > 0):
                    return False
                sign = c
        xs, ys = [q[0] for q in pts], [q[1] for q in pts]
        boxes.append((min(xs), min(ys), max(xs), max(ys)))
    if not letter:
        return True
    for i, a in enumerate(boxes):
        for j, b in enumerate(boxes):
            if i != j and a[0] <= b[0] and a[1] <= b[1] and a[2] >= b[2] and a[3] >= b[3]:
                return False  # b is a counter inside a
    return True


def letter_glyphs(font):
    """Names of the glyphs that draw a letter or a figure, alternates included (a.ss01 follows a)."""
    import unicodedata
    base = {n for cp, n in font.getBestCmap().items() if unicodedata.category(chr(cp))[0] in "LN"}
    return {n for n in font.getGlyphOrder() if n in base or n.partition(".")[0] in base}


def outline_matches(ours, refs, our_letters=None, ref_letters=None):
    """Pairs "ours~ref" whose outlines share point structure and lie within 2 % of each other once each is scaled
    to its own bounding box. Both arguments map a glyph name to its outline, or to None for a composite. The
    letter sets say which names are letters or figures; without them every glyph is treated as one."""
    def is_plain(n, o, letters):
        return plain(o, letters is None or n in letters)
    idx = {}
    for n, o in refs.items():
        if o and len(o[0]) > 8 and not is_plain(n, o, ref_letters):  # a rectangle or a dot matches anything
            idx.setdefault((o[1], o[2]), []).append((n, o[0]))
    close = []
    for n, o in ours.items():
        if not o or is_plain(n, o, our_letters):
            continue
        for rn, pts in idx.get((o[1], o[2]), []):
            A, B = norm(o[0]), norm(pts)
            if max(max(abs(p[0] - q[0]), abs(p[1] - q[1])) for p, q in zip(A, B)) < 0.02:
                close.append(f"{n}~{rn}")
    return close


def gate_provenance(G, f, base, refs, yloc=None):
    G.add("provenance", "glyph order equals the base's", f.getGlyphOrder() == base.getGlyphOrder(), "")
    G.add("provenance", "character map equals the base's", f.getBestCmap() == base.getBestCmap(), "")
    # Every glyph is the base's glyph, fitted. Its y coordinates come from the base at the fit's y location, so
    # against that instance, at the same cap height, its ink is within 3 % as tall. Widths move with the width
    # classes, so they may differ up to 30 %. Without the fit log, the default instance is used and the gate
    # only informs, since a different optical size redraws marks.
    import copy
    from fontTools.varLib import instancer
    from fontTools.pens.boundsPen import BoundsPen
    bd = instancer.instantiateVariableFont(copy.deepcopy(base), yloc or {}, updateFontNames=False) if "fvar" in base else base

    def boxes(font):
        gs = font.getGlyphSet()
        out = {}
        for n in font.getGlyphOrder():
            p = BoundsPen(gs)
            gs[n].draw(p)
            out[n] = p.bounds
        cap = out[font.getBestCmap()[ord("H")]][3]
        return out, cap
    ob, oc = boxes(f)
    bb, bc = boxes(bd)
    far = []
    for n, b in ob.items():
        a = bb.get(n)
        if not a or not b:
            continue
        wa, wb = (a[2] - a[0]) / bc, (b[2] - b[0]) / oc
        ha, hb = (a[3] - a[1]) / bc, (b[3] - b[1]) / oc
        if wa > 0.05 and ha > 0.05 and (abs(wb / wa - 1) > 0.40 or abs(hb / ha - 1) > 0.03):
            far.append(f"{n} {wb / wa - 1:+.0%} wide {hb / ha - 1:+.0%} tall")
    G.add("provenance", "every glyph traceable to its base glyph", (not far) if yloc is not None else None,
          f"{len(far)} outside 3 % height, 40 % width of the base at {yloc if yloc is not None else 'its default'}"
          + (": " + ", ".join(far[:6]) if far else ""))

    def outl(font, n):
        g = font["glyf"][n]
        if g.isComposite() or g.numberOfContours <= 0:
            return None
        c, e, fl = g.getCoordinates(font["glyf"])
        return list(c), tuple(e), tuple(x & 1 for x in fl)

    for rp in refs:
        ref = TTFont(rp)
        if "glyf" not in ref:
            G.add("provenance", "no outline matches a reference", None, f"{os.path.basename(rp)} is CFF: point structures cannot match")
            continue
        close = outline_matches({n: outl(f, n) for n in f.getGlyphOrder()},
                                {n: outl(ref, n) for n in ref.getGlyphOrder()},
                                letter_glyphs(f), letter_glyphs(ref))
        G.add("provenance", "no outline matches a reference", not close,
              f"{os.path.basename(rp)}: {len(close)} match" + (": " + ", ".join(close[:8]) + ". If the reference is itself built on this open base, "
                                       "matches are expected; otherwise stop and find out why" if close else ""))


def gate_validity(G, path, f, base, yloc):
    tmp = tempfile.mkdtemp()
    try:
        x1, x2, rt = (os.path.join(tmp, n) for n in ("a.ttx", "b.ttx", "rt.ttf"))
        TTFont(path).saveXML(x1)
        g = TTFont()
        g.importXML(x1)
        g.save(rt)
        TTFont(rt).saveXML(x2)
        strip = lambda s: re.sub(r'<(checkSumAdjustment|modified|created) value="[^"]*"/>', "", re.sub(r"<ttFont[^>]*>", "", s))  # noqa: E731
        same = strip(open(x1).read()) == strip(open(x2).read())
        G.add("validity", "ttx round trip", same, "")
    finally:
        shutil.rmtree(tmp, ignore_errors=True)
    glyf = f["glyf"]
    ymax = max(glyf[n].yMax for n in f.getGlyphOrder() if glyf[n].numberOfContours != 0)
    ymin = min(glyf[n].yMin for n in f.getGlyphOrder() if glyf[n].numberOfContours != 0)
    os2 = f["OS/2"]
    G.add("validity", "win metrics cover every glyph", os2.usWinAscent >= ymax and os2.usWinDescent >= -ymin,
          f"win {os2.usWinAscent}/{os2.usWinDescent}, glyphs reach {ymax}/{ymin}")
    left = [t for t in ("fvar", "gvar", "HVAR", "MVAR", "STAT") if t in f]
    left += [t + " VarStore" for t in ("GDEF",) if t in f and getattr(f[t].table, "VarStore", None)]
    G.add("validity", "no variation data left", not left, ", ".join(left))
    gate_fontbakery(G, path, base, yloc)


FB_BASE = {}


def fontbakery_cmd():
    """fontbakery as a command, or as a module of this Python when its script is not on PATH."""
    fb = shutil.which("fontbakery")
    if fb:
        return [fb]
    import importlib.util
    return [sys.executable, "-m", "fontbakery"] if importlib.util.find_spec("fontbakery") else None


def fontbakery_fails(cmd, path):
    """IDs of the checks fontbakery fails on one font, or None when its report could not be read."""
    tmp = tempfile.mkdtemp()
    try:
        js = os.path.join(tmp, "fb.json")
        subprocess.run([*cmd, "check-universal", "-l", "FAIL", "--json", js, path], capture_output=True, text=True)
        if not os.path.exists(js):
            return None
        found = set()

        def walk(x):
            if isinstance(x, dict):
                if x.get("result") in ("FAIL", "ERROR", "FATAL") and isinstance(x.get("key"), list):
                    m = re.search(r"FontBakeryCheck:([^>]+)", " ".join(str(k) for k in x["key"]))
                    if m:
                        found.add(m.group(1))
                for v in x.values():
                    walk(v)
            elif isinstance(x, list):
                for v in x:
                    walk(v)
        with open(js) as fh:
            walk(json.load(fh))
        return found
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


def gate_fontbakery(G, path, base, yloc):
    """Local change (KevinGutowski/Skills): fail only on what the fit added. fontbakery fails most open fonts on
    something (a missing case pair, a zero-width combining mark), and those came with the base. Upstream gated on
    any FAIL, so this gate failed nearly every build. The base is checked at the same location and its own
    failures are listed, not counted."""
    cmd = fontbakery_cmd()
    if not cmd:
        G.add("validity", "fontbakery", None, "not installed, not run (pip install fontbakery)")
        return
    ours = fontbakery_fails(cmd, path)
    key = json.dumps(yloc or {}, sort_keys=True)
    if key not in FB_BASE:
        tmp = tempfile.mkdtemp()
        try:
            bp = os.path.join(tmp, "base.ttf")
            bd = instancer.instantiateVariableFont(copy.deepcopy(base), yloc or {}, updateFontNames=False) if "fvar" in base else base
            if "fvar" in bd:  # axes the fit log did not pin
                bd = instancer.instantiateVariableFont(bd, {a.axisTag: a.defaultValue for a in bd["fvar"].axes}, updateFontNames=False)
            bd.save(bp)
            FB_BASE[key] = fontbakery_fails(cmd, bp)
        finally:
            shutil.rmtree(tmp, ignore_errors=True)
    theirs = FB_BASE[key]
    if ours is None or theirs is None:
        G.add("validity", "fontbakery check-universal", None, "ran, but its report could not be read: run it by hand")
        return
    new = sorted(ours - theirs)
    G.add("validity", "fontbakery: no failure the base does not have", not new,
          (", ".join(new[:6]) if new else f"{len(ours)} failing check(s), all inherited from the base")
          + (f". Inherited: {', '.join(sorted(ours & theirs)[:6])}" if ours & theirs else ""))


def gate_licence(G, f, base, family, package):
    names = {r.nameID: r.toUnicode() for r in f["name"].names if r.platformID == 3}
    G.add("licence", "OFL notice in name 13", "Open Font License" in names.get(13, ""), names.get(13, "")[:60])
    G.add("licence", "OFL URL in name 14", "openfontlicense.org" in names.get(14, "") or "scripts.sil.org/OFL" in names.get(14, ""), names.get(14, ""))
    G.add("licence", "no trademark record (name 7)", 7 not in names, names.get(7, ""))
    bnames = {r.nameID: r.toUnicode() for r in base["name"].names if r.platformID == 3}
    base_fam = (bnames.get(16) or bnames.get(1) or "").strip()
    G.add("licence", "family renamed", names.get(16, names.get(1)) == family,
          f"{names.get(16, names.get(1))!r}, want {family!r}")
    # Local change (KevinGutowski/Skills): the naming rules are fontlib's, the same ones package.py refuses on.
    # Upstream used raw substring tests here: they passed DM-Sans on a DM Sans base, and the scan of the other
    # tables failed any font on an Inter base for holding a glyph named interrobang.
    hits = []
    for nid, v in names.items():
        if nid in (0,):
            continue
        for w in L.name_conflicts(v, base_fam):
            hits.append(f"name {nid}: {w}")
    if base_fam:
        word = re.escape(base_fam)
        pats = [re.compile(rb"(?<![A-Za-z])" + word.encode() + rb"(?![a-z])"),
                re.compile(re.escape(base_fam.encode("utf-16-be")))]
        for tag in f.keys():
            if tag in ("GlyphOrder", "name"):
                continue
            data = f.getTableData(tag)
            if any(p.search(data) for p in pats):
                hits.append(f"table {tag}")
    G.add("licence", "base's name only in the copyright line", not hits, ", ".join(hits[:8]))
    G.add("licence", "new name avoids the base's name", not L.name_conflicts(family, base_fam),
          f"{family!r} vs base {base_fam!r}")
    rfn_text = bnames.get(0, "")
    if package:
        for fn in ("OFL.txt", "FONTLOG.txt"):
            G.add("licence", f"{fn} in the package", os.path.exists(os.path.join(package, fn)), package)
        p = os.path.join(package, "OFL.txt")
        if os.path.exists(p):
            with open(p, encoding="utf-8", errors="replace") as fh:
                rfn_text += "\n" + fh.read()
    rfn = L.reserved_font_names(rfn_text)
    clash = L.name_conflicts(family, "", rfn)
    G.add("licence", "new name avoids every Reserved Font Name", not clash,
          f"RFN {rfn or 'none'}" + ("" if package else " (from the base's copyright line: no --package to read OFL.txt from)"))


def overlay(ref_face, ours, out_dir, tag):
    """Red reference, blue ours, black where both have ink. Both at the same cap height, baselines aligned."""
    from PIL import Image
    paths = []
    for name, text, cap_px in (("text", TEXT_SAMPLE, 28), ("display", DISPLAY_SAMPLE, 160)):
        imgs = []
        for fc in (ref_face, ours):
            px = cap_px * fc.upm / fc.bounds("H")[3]
            cov, base, _ = L.rasterize(fc, text, px)
            imgs.append((cov, int(round(base))))
        above = max(b for _, b in imgs)
        below = max(c.shape[0] - b for c, b in imgs)
        W = max(c.shape[1] for c, _ in imgs)
        layers = []
        for cov, b in imgs:
            canvas = np.zeros((above + below, W))
            canvas[above - b:above - b + cov.shape[0], :cov.shape[1]] = cov
            layers.append(canvas)
        A, B = layers
        rgb = np.clip(np.stack([1 - B, 1 - np.maximum(A, B), 1 - A], axis=-1), 0, 1)
        p = os.path.join(out_dir, f"overlay-{tag}-{name}.png")
        Image.fromarray((rgb * 255).astype(np.uint8)).save(p)
        paths.append(p)
    return paths


def stacked(img_path, text, ours, out_dir, tag):
    """The screenshot above our render of the same text at the same cap height, for a reference with no file."""
    from PIL import Image
    shot = Image.open(img_path).convert("L")
    import measure_image as MI
    cov = MI.load_coverage(img_path)
    cap_px = MI.measure_lines(cov, text.split("|"))["px_cap"]
    px = cap_px * ours.upm / ours.bounds("H")[3]
    ours_imgs = [L.rasterize(ours, t, px)[0] for t in text.split("|")]
    W = max([shot.width] + [o.shape[1] for o in ours_imgs])
    rows = [np.pad(1 - np.asarray(shot, dtype=float) / 255, ((0, 0), (0, W - shot.width)))]
    rows += [np.pad(o, ((0, 0), (0, W - o.shape[1]))) for o in ours_imgs]
    sheet = np.vstack(rows)
    p = os.path.join(out_dir, f"stacked-{tag}.png")
    L.save_png(sheet, p)
    return [p]


def match_styles(names, styles):
    """Local change (KevinGutowski/Skills): pair each font with its style in targets.json and say whether that is
    the first style, the one the paragraph and side-mean targets were measured for. Returns (font index, style,
    is_first) in the order targets.json lists the styles, whatever order the files came in.

    Upstream decided "first" by position on the command line, so `dist/ttf/*.ttf`, which sorts Bold ahead of
    Regular, gated the Bold against the Regular's paragraph width. A name that matches no style falls back to the
    style at the font's position, as upstream did."""
    out = []
    for i, name in enumerate(names):
        k = next((j for j, s in enumerate(styles) if s["name"] == name), min(i, len(styles) - 1))
        out.append((k, i))
    return [(i, styles[k], k == 0) for k, i in sorted(out)]


def style_view(T, logged, is_first):
    """Local change (KevinGutowski/Skills): the targets one style is gated against. The first style's are the
    family's. A later weight's are its own, worked out in the fit and kept in the fit log (widths, sides and
    contrast in the base's ratio to the first weight). Returns (targets file for the gates, has its own targets).
    Upstream gated every weight against the first style's widths and contrast, which no Bold can meet."""
    if is_first:
        return T, True
    own = (logged or {}).get("targets") or {}
    if not own.get("widths"):
        return T, False
    tg = {**T["targets"], **{k: v for k, v in own.items() if v is not None}}
    return {**T, "targets": tg}, True


def with_logged_stem(style, fit_log):
    """Local change (KevinGutowski/Skills): the style with the stem the fit aimed at, when targets.json gave it none
    (every weight after the first), and that style's fit-log entry. Upstream left such a style ungated."""
    logged = next((s for s in fit_log["styles"] if s["style"]["name"] == style["name"]), None) if fit_log else None
    if logged and not style.get("n_stem") and logged.get("n_stem_target"):
        style = {**style, "n_stem": logged["n_stem_target"]}
    return style, logged


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("fonts", nargs="+")
    ap.add_argument("--targets", required=True)
    ap.add_argument("--base", required=True)
    ap.add_argument("--reference", action="append", default=[])
    ap.add_argument("--reference-image")
    ap.add_argument("--reference-text")
    ap.add_argument("--package")
    ap.add_argument("--fit-log", help="fit-log.json, so provenance compares each glyph with the base where it came from")
    ap.add_argument("--out-dir", default=".")
    a = ap.parse_args()
    T = L.load_json(a.targets)
    base_vf = TTFont(a.base)
    os.makedirs(a.out_dir, exist_ok=True)
    G = Gates()
    renders = []
    fl = L.load_json(a.fit_log) if a.fit_log else None
    opened = [TTFont(path) for path in a.fonts]
    subs = [f["name"].getDebugName(17) or f["name"].getDebugName(2) or "" for f in opened]
    for i, style, is_first in match_styles(subs, T["styles"]):
        path, f = a.fonts[i], opened[i]
        tag = style["name"]
        face = L.Face(f)
        m = L.measure_face(face)
        G.rows.append((f"--- {os.path.basename(path)} ({tag})", "", "", ""))
        style, logged = with_logged_stem(style, fl)
        Ts, own = style_view(T, logged, is_first)
        if logged and logged.get("weight_clamped"):
            G.add("metrics", "weight within the base's axis", False,
                  f"the base's weight axis ends before {style.get('weight')}: this style is not as heavy or light as its name says")
        gate_metrics(G, m, Ts, style, own)
        gate_widths(G, m, Ts, is_first, own)
        gate_kerning(G, face, T["tolerances"]["min_gap"])
        gate_coverage(G, f, T.get("scripts", ["latin"]))
        yloc = None
        if logged:
            yloc = logged["y_location"]
        gate_provenance(G, f, base_vf, a.reference, yloc)
        gate_validity(G, path, f, base_vf, yloc)
        gate_licence(G, f, base_vf, T["family"], a.package)
        if a.reference:
            renders += overlay(L.Face(a.reference[0]), face, a.out_dir, tag)
        elif a.reference_image and a.reference_text:
            renders += stacked(a.reference_image, a.reference_text, face, a.out_dir, tag)
    given = {style["name"] for _, style, _ in match_styles(subs, T["styles"])}
    for st_ in T["styles"]:
        if st_["name"] not in given:  # local change: a style with no file used to go unmentioned
            G.rows.append((f"--- no file given for {st_['name']}", "", "", ""))
            G.add("coverage", f"style {st_['name']}", None, "in targets.json, not among the fonts checked"
                  + (": the paragraph gate belongs to this style and did not run" if st_ is T["styles"][0] else ""))
    for group, name, state, detail in G.rows:
        if not name:
            print(group)
        else:
            print(f"  {state:4s}  {group:10s} {name:44s} {detail}")
    if renders:
        print("renders:", *renders, sep="\n  ")
    bad = G.failed()
    print(f"\n{len(bad)} failed, {sum(1 for r in G.rows if r[2] == 'PASS')} passed")
    L.save_json([{"group": g, "gate": n, "state": s, "detail": d} for g, n, s, d in G.rows],
                os.path.join(a.out_dir, "check-report.json"))
    sys.exit(1 if bad else 0)


if __name__ == "__main__":
    main()
