"""Turn reference measurements into targets.json, the numbers every later step aims at.

  python3 -I make_targets.py m1.json [m2.json ...] --family "New Family" --use text --scripts latin,cyrillic \\
      [--style Regular:400] [--style Medium:500:88] [--weight m1.json=2] --out targets.json

Inputs are files from measure_font.py or measure_image.py. With several references, each number is a weighted
mean: confidence high counts 3, medium 2, low 1, times any --weight given for that file. Where the references
disagree by more than a tolerance, the spread is recorded so the person can choose instead of the average.

--style NAME:WEIGHT[:STEM] lists the static weights to build. STEM is the n stem at cap 700. Leave it out and
the build keeps the base font's own stem ratio to the first style. The first style takes the measured n stem.
--use text | display | ui sets the gates' tolerances and which optical size the search prefers.
"""
import argparse
import os
import statistics as st
import sys

sys.dont_write_bytecode = True  # keep the skill folder free of __pycache__
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import fontlib as L  # noqa: E402

RANK = {"high": 3, "medium": 2, "low": 1}
SCALARS = ["xh", "xh_cap", "asc", "desc", "overshoot_lc", "overshoot_uc", "n_stem", "H_stem", "H_bar", "o_side",
           "o_thin", "contrast", "bar_stem", "serif_ext", "serif_tip", "n_counter", "rhythm", "lc_avg", "uc_avg",
           "space", "para"]
DISAGREE = {"xh_cap": 0.02, "contrast": 0.08, "n_stem": 8, "serif_ext": 20, "rhythm": 0.08}
TOLERANCES = {
    "text": {"stem": 3, "width_pct": 1.5, "para_pct": 1.5, "contrast": 0.05, "xh": 6, "side": 4, "min_gap": 6},
    "display": {"stem": 3, "width_pct": 1.0, "para_pct": 1.0, "contrast": 0.04, "xh": 4, "side": 3, "min_gap": 4},
    "ui": {"stem": 2, "width_pct": 1.5, "para_pct": 1.5, "contrast": 0.05, "xh": 5, "side": 4, "min_gap": 8},
}


def merge(ms, wts):
    out, conf, spread = {}, {}, {}

    def wmean(vals):
        tot = sum(w for _, w in vals)
        return sum(v * w for v, w in vals) / tot

    for key in SCALARS:
        vals = [(m[key], RANK.get(m.get("confidence", {}).get(key, "high"), 2) * w)
                for m, w in zip(ms, wts) if m.get(key) is not None]
        if not vals:
            continue
        # Precision by the size of the number, not by whichever reference came first (local change).
        out[key] = round(wmean(vals), 3 if max(abs(v) for v, _ in vals) < 5 else 1)
        conf[key] = max((m.get("confidence", {}).get(key, "high") for m in ms if m.get(key) is not None), key=RANK.get)
        if len(vals) > 1:
            sp = max(v for v, _ in vals) - min(v for v, _ in vals)
            if key in DISAGREE and sp > DISAGREE[key]:
                spread[key] = [round(v, 3) for v, _ in vals]
    for group in ("widths", "sides"):
        keys = sorted({k for m in ms for k in (m.get(group) or {})})
        out[group] = {}
        for k in keys:
            prefix = "w_" if group == "widths" else "side_"
            vals = [(m[group][k], RANK.get(m.get("confidence", {}).get(prefix + k, "high"), 2) * w)
                    for m, w in zip(ms, wts) if (m.get(group) or {}).get(k) is not None]
            out[group][k] = round(wmean(vals), 1)
            conf[prefix + k] = max((m.get("confidence", {}).get(prefix + k, "high") for m in ms
                                    if (m.get(group) or {}).get(k) is not None), key=RANK.get)
            if len(vals) > 1 and group == "widths":
                sp = max(v for v, _ in vals) / min(v for v, _ in vals) - 1
                if sp > 0.04:
                    spread["w_" + k] = [round(v, 1) for v, _ in vals]
    # Local change (KevinGutowski/Skills): serif or sans by the same weighted vote as every number. Upstream took
    # the mode, which on a tie is whichever reference was named first, and the base search then looked in the
    # wrong category. A tie is left to the person (None here, --serif on the command line).
    votes = [(m.get("serif"), RANK.get(m.get("confidence", {}).get("serif", "high"), 2) * w)
             for m, w in zip(ms, wts) if m.get("serif") is not None]
    if votes:
        yes, no = sum(w for v, w in votes if v), sum(w for v, w in votes if not v)
        out["serif"] = None if yes == no else yes > no
        if yes and no:
            spread["serif"] = [bool(v) for v, _ in votes]
    # A paragraph width, word space or alphabet mean belongs with one set of class widths. When a reference gave
    # widths but not these (a screenshot), the blend of widths no longer matches them, and the paragraph gate
    # would fail a correct fit. Drop them and say so.
    gave_widths = [m for m in ms if m.get("widths")]
    dropped = [k for k in ("para", "space", "lc_avg", "uc_avg")
               if k in out and any(m.get(k) is None for m in gave_widths)]
    for k in dropped:
        out.pop(k), conf.pop(k, None), spread.pop(k, None)
    return out, conf, spread, dropped


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("measurements", nargs="+")
    ap.add_argument("--family", required=True, help="the new family name. Never a reference's or the base's name")
    ap.add_argument("--use", choices=sorted(TOLERANCES), default="text")
    ap.add_argument("--scripts", default="latin")
    ap.add_argument("--style", action="append", default=[])
    ap.add_argument("--weight", action="append", default=[], help="FILE=N, how much one reference counts")
    ap.add_argument("--serif", choices=["yes", "no"], help="settle serif or sans when the references split evenly")
    ap.add_argument("--out", required=True)
    a = ap.parse_args()
    ms = [L.load_json(p) for p in a.measurements]
    wmap = {k: float(v) for k, v in (x.rsplit("=", 1) for x in a.weight)}
    known = set(a.measurements) | {os.path.basename(p) for p in a.measurements}
    for k, v in wmap.items():  # local change: a mistyped file name was ignored and a weight of 0 divided by zero
        if k not in known:
            raise SystemExit(f"--weight {k}: no measurement file by that name. Given: {', '.join(a.measurements)}")
        if v <= 0:
            raise SystemExit(f"--weight {k}={v:g}: a weight is above 0. Leave a reference out to ignore it.")
    wts = [wmap.get(p, wmap.get(os.path.basename(p), 1.0)) for p in a.measurements]
    scripts = []
    for sname in (x.strip() for x in a.scripts.split(",") if x.strip()):
        key = L.script_name(sname)
        if key is None:  # local change: any spelling was accepted, and the coverage gate then skipped it
            raise SystemExit(f"--scripts {sname}: not a script this skill can check. Known: {', '.join(L.SCRIPTS)}")
        scripts += [key] if key not in scripts else []
    t, conf, spread, dropped = merge(ms, wts)
    if a.serif:
        t["serif"] = a.serif == "yes"
    elif t.get("serif") is None and "serif" in t:
        raise SystemExit("the references split evenly between serif and sans. Pass --serif yes or --serif no, or "
                         "give one reference more --weight. A serif is never fitted into a sans.")
    # Local change (KevinGutowski/Skills): the em size and the line box come from one reference, the file that
    # counts most (ties go to the name that sorts first). Upstream took the line box from the first file named and
    # the em from an unweighted mean, so they could come from different fonts and changed with argument order.
    files = sorted(((m, w) for m, w in zip(ms, wts) if m.get("source") == "file"),
                   key=lambda x: (-x[1], str(x[0].get("file"))))
    files = [m for m, _ in files]
    styles = []
    for i, s in enumerate(a.style or ["Regular:400"]):
        parts = s.split(":")
        st_ = {"name": parts[0], "weight": int(parts[1]) if len(parts) > 1 else 400}
        if len(parts) > 2:
            st_["n_stem"] = float(parts[2])
        elif i == 0 and t.get("n_stem"):
            st_["n_stem"] = t["n_stem"]
        styles.append(st_)
    if not styles[0].get("n_stem"):
        raise SystemExit("no n stem for the first style: no reference measured one (a screenshot needs an x and an n "
                         f"in its text). Measure again, or give it: --style {styles[0]['name']}:{styles[0]['weight']}:<stem>")
    longest = max(len(s["name"]) for s in styles)
    if len(a.family) + 1 + longest > 32:  # local change: say it now, not when fontbakery fails the finished font
        print(f"  note: {a.family!r} with its longest style name is {len(a.family) + 1 + longest} characters. "
              "Over 32, some applications cut the name short and fontbakery fails it. A shorter family name avoids that.")
    if any(c in a.family + "".join(s["name"] for s in styles) for c in '"\\'):
        raise SystemExit("a family or style name cannot hold a double quote or a backslash: they end up inside CSS strings.")
    if len({s["name"] for s in styles}) != len(styles):
        raise SystemExit("two styles share a name. Each --style needs its own.")
    out = {
        "family": a.family,
        "use": a.use,
        "scripts": scripts,
        "styles": styles,
        "targets": t,
        "confidence": conf,
        "spread": spread,
        "tolerances": TOLERANCES[a.use],
        "cap_em": files[0]["cap_em"] if files else None,
        "vmetrics": files[0].get("vmetrics") if files else None,
        "metrics_from": files[0].get("file") if files else None,
        "sources": [{"file": m.get("file"), "source": m.get("source")} for m in ms],
        "units": "cap-normalised: cap height 700",
    }
    L.save_json(out, a.out)
    print(f"targets for {a.family!r} ({a.use}) from {len(ms)} reference(s): {a.out}")
    for k in SCALARS + ["serif"]:
        if k in t:
            print(f"  {k:13s} {t[k]!s:>9}  {conf.get(k, '')}")
    print("  widths", t.get("widths"))
    print("  sides ", t.get("sides"))
    if len(files) > 1:
        print(f"  em size and line box from {files[0].get('file')}, the reference that counts most")
    if dropped:
        print(f"  left out {', '.join(dropped)}: not every reference that gave widths gave these, so the paragraph "
              "and side gates will not run")
    if spread:
        print("  references disagree on:", ", ".join(f"{k} {v}" for k, v in spread.items()))
    low = [k for k, v in conf.items() if v == "low"]
    if low:
        print("  low confidence:", ", ".join(low))


if __name__ == "__main__":
    main()
