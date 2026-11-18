#!/usr/bin/env python3
"""Generate seamless, layerable SVG background tiles (grids, dots, lines, crosses).

Stdlib only. Every layer shares one square tile, and every layer's period must divide
that tile, so any stack of layers repeats without a seam. Method notes and when to use
a pattern at all: ../references/visual-execution.md ("Repeating SVG patterns").

Examples:
  svg_pattern.py --layer grid:period=24 --layer dots:period=8,size=1
  svg_pattern.py --tile 40 --layer diag:period=10,dir=up,width=1 --format css
  svg_pattern.py --layer cross:period=24,arm=4 --format mask      # color from CSS
  svg_pattern.py --layer checker:period=8 --preview /tmp/p.html   # tiled preview page

Layer spec: KIND[:key=value,...]. Shared keys: period, color, opacity, offset
(shifts the motifs; for lattice kinds 0 puts them on tile corners, wrapping across
edges, and the default is half a period; diag and checker default to 0).
Run with --list to see each kind's keys and defaults.
"""
import argparse
import html
import math
import sys
import urllib.parse

KINDS = {
    "grid": "lines on both axes; width (1), dash (0 = solid), gap (dash)",
    "hlines": "horizontal lines; width (1), dash (0 = solid), gap (dash)",
    "vlines": "vertical lines; width (1), dash (0 = solid), gap (dash)",
    "diag": "45-degree lines, period measured along x; dir up|down, width (1)",
    "dots": "dot lattice; size (2), shape square|circle, stagger 0|1 (needs 2*period | tile)",
    "cross": "plus marks; arm (3, half-length), width (1)",
    "x": "diagonal crosses; arm (3), width (1)",
    "checker": "alternating squares of side period (needs 2*period | tile)",
}


def num(v):
    return f"{v:g}"


def fail(message):
    sys.exit(f"svg_pattern: {message}")


def opt_num(o, key, default, kind, minimum=None, positive=False):
    raw = o.get(key, default)
    try:
        value = float(raw)
    except (TypeError, ValueError):
        fail(f"{kind}: {key}={raw!r} is not a number")
    if not math.isfinite(value) or (positive and value <= 0) or (minimum is not None and value < minimum):
        bound = "> 0" if positive else f">= {num(minimum)}"
        fail(f"{kind}: {key}={raw!r} must be {bound}")
    return value


def attr(value):
    """Escape a user-supplied value for an SVG attribute so it cannot break the markup."""
    return html.escape(str(value), quote=True)


def divides(whole, part):
    """True when part divides whole into a whole number of steps (float-tolerant)."""
    steps = whole / part
    return abs(steps - round(steps)) < 1e-9 and round(steps) >= 1


def parse_layer(spec):
    kind, _, rest = spec.partition(":")
    if kind not in KINDS:
        fail(f"unknown layer kind {kind!r}; choose from {', '.join(KINDS)}")
    opts = {}
    for pair in filter(None, rest.split(",")):
        key, sep, value = pair.partition("=")
        if not sep:
            fail(f"bad option {pair!r} in {spec!r}; use key=value")
        opts[key.strip()] = value.strip()
    return kind, opts


def snap(center, size):
    """Start coordinate for a mark of `size` centered on `center`, snapped to whole
    pixels when the size is whole, so 1px lines and dots render crisp at 1x."""
    start = center - size / 2
    return math.floor(start) if float(size).is_integer() else start


def copies(v, lo, hi, tile):
    """Positions of a mark anchored at v (covering v+lo..v+hi) on one axis, plus the
    wrapped copy that carries any part crossing a tile edge onto the opposite edge."""
    out = [v]
    if v + lo < 0:
        out.append(v + tile)
    if v + hi > tile:
        out.append(v - tile)
    return out


def wrapped(x, y, reach, tile):
    """Every copy of a motif centered at (x, y) with radius `reach`, wrapped on both axes."""
    for cx in copies(x, -reach, reach, tile):
        for cy in copies(y, -reach, reach, tile):
            yield cx, cy


def line_runs(length, dash, gap):
    """Segments (start, length) along an edge of the tile; solid when dash == 0.
    Fractional dashes and gaps are kept as given; dash + gap must divide the tile."""
    if dash <= 0 or gap <= 0:
        return [(0, length)]
    step = dash + gap
    if not divides(length, step):
        fail(f"dash + gap ({num(step)}) must divide the tile ({num(length)})")
    return [(i * step, dash) for i in range(round(length / step))]


def build_layer(kind, o, tile):
    period = opt_num(o, "period", 12, kind, positive=True)
    if not divides(tile, period):
        fail(f"{kind}: period {num(period)} must divide the tile {num(tile)}")
    color = o.get("color", "#1C1F21")
    width = opt_num(o, "width", 1, kind, positive=True)
    offset = opt_num(o, "offset", 0 if kind in ("diag", "checker") else period / 2, kind)
    lattice = [offset % period + i * period for i in range(int(tile / period))]
    parts = []

    if kind in ("grid", "hlines", "vlines"):
        dash = opt_num(o, "dash", 0, kind, minimum=0)
        gap = opt_num(o, "gap", dash, kind, minimum=0)
        # Integer-aligned filled rects, not strokes, keep 1px lines crisp. A line on the
        # tile edge belongs to one side only, so repeats never draw a doubled line.
        for p in lattice:
            start = snap(p, width)
            for s, n in line_runs(tile, dash, gap):
                if kind in ("grid", "vlines"):
                    for cx in copies(start, 0, width, tile):
                        parts.append(f'<rect x="{num(cx)}" y="{num(s)}" width="{num(width)}" height="{num(n)}"/>')
                if kind in ("grid", "hlines"):
                    for cy in copies(start, 0, width, tile):
                        parts.append(f'<rect x="{num(s)}" y="{num(cy)}" width="{num(n)}" height="{num(width)}"/>')
        return color, parts, "fill"

    if kind == "diag":
        up = o.get("dir", "up") == "up"
        d = []
        k = -tile + offset % period  # offset shifts every line along x
        while k <= tile + period:  # lines y = x + k (down) or y = -x + k + tile (up), clipped later
            if up:
                d.append(f"M{num(k - width)} {num(tile + width)}L{num(k + tile + width)} {num(-width)}")
            else:
                d.append(f"M{num(k - width)} {num(-width)}L{num(k + tile + width)} {num(tile + width)}")
            k += period
        parts.append(f'<path d="{"".join(d)}" stroke-width="{num(width)}"/>')
        return color, parts, "stroke"

    if kind == "dots":
        size = opt_num(o, "size", 2, kind, positive=True)
        circle = o.get("shape", "square") == "circle"
        stagger = o.get("stagger", "0") == "1"
        if stagger and not divides(tile, 2 * period):
            fail("dots: stagger=1 needs 2*period to divide the tile")
        for row, y in enumerate(lattice):
            shift = period / 2 if stagger and row % 2 else 0
            for x in lattice:
                for cx, cy in wrapped((x + shift) % tile, y, size, tile):
                    if circle:
                        parts.append(f'<circle cx="{num(cx)}" cy="{num(cy)}" r="{num(size / 2)}"/>')
                    else:
                        parts.append(f'<rect x="{num(snap(cx, size))}" y="{num(snap(cy, size))}" width="{num(size)}" height="{num(size)}"/>')
        return color, parts, "fill"

    if kind == "cross":
        # Filled bars on whole pixels (like the lines above) stay crisp; strokes would not.
        arm = opt_num(o, "arm", 3, kind, minimum=0)
        for y in lattice:
            for x in lattice:
                for cx, cy in wrapped(x, y, arm + width, tile):
                    bx, by = snap(cx, width), snap(cy, width)
                    parts.append(f'<rect x="{num(bx - arm)}" y="{num(by)}" width="{num(2 * arm + width)}" height="{num(width)}"/>')
                    parts.append(f'<rect x="{num(bx)}" y="{num(by - arm)}" width="{num(width)}" height="{num(2 * arm + width)}"/>')
        return color, parts, "fill"

    if kind == "x":
        arm = opt_num(o, "arm", 3, kind, minimum=0)
        d = []
        for y in lattice:
            for x in lattice:
                for cx, cy in wrapped(x, y, arm + width, tile):
                    d.append(f"M{num(cx - arm)} {num(cy - arm)}L{num(cx + arm)} {num(cy + arm)}"
                             f"M{num(cx + arm)} {num(cy - arm)}L{num(cx - arm)} {num(cy + arm)}")
        parts.append(f'<path d="{"".join(d)}" stroke-width="{num(width)}"/>')
        return color, parts, "stroke"

    if kind == "checker":
        if not divides(tile, 2 * period):
            fail("checker: needs 2*period to divide the tile")
        cells = round(tile / period)
        shift = offset % (2 * period)  # the checker repeats every two cells
        for r in range(cells):
            for c in range(cells):
                if (r + c) % 2 == 0:
                    for x in copies((c * period + shift) % tile, 0, period, tile):
                        for y in copies((r * period + shift) % tile, 0, period, tile):
                            parts.append(f'<rect x="{num(x)}" y="{num(y)}" width="{num(period)}" height="{num(period)}"/>')
        return color, parts, "fill"

    raise AssertionError(kind)


def build_svg(tile, layers, background, mask, clip_id):
    clip = attr(clip_id)
    out = [
        (f'<svg xmlns="http://www.w3.org/2000/svg" width="{num(tile)}" height="{num(tile)}" '
         f'viewBox="0 0 {num(tile)} {num(tile)}">'),
        f'<defs><clipPath id="{clip}"><rect width="{num(tile)}" height="{num(tile)}"/></clipPath></defs>',
    ]
    if background and not mask:
        out.append(f'<rect width="{num(tile)}" height="{num(tile)}" fill="{attr(background)}"/>')
    out.append(f'<g clip-path="url(#{clip})">')
    for kind, opts in layers:
        color, parts, paint = build_layer(kind, opts, tile)
        if mask:
            color = "#000"  # masks read alpha only; the visible color comes from CSS
        opacity = opt_num(opts, "opacity", 1, kind, minimum=0)
        if opacity > 1:
            fail(f"{kind}: opacity must be between 0 and 1")
        paint_attrs = f'fill="{attr(color)}"' if paint == "fill" else f'fill="none" stroke="{attr(color)}"'
        out.append(f'<g {paint_attrs} opacity="{num(opacity)}">{"".join(parts)}</g>')
    out.append("</g></svg>")
    return "".join(out)


def data_uri(svg):
    return 'url("data:image/svg+xml,' + urllib.parse.quote(svg, safe=" /:=,;()") + '")'


def css_for(svg, tile, mask):
    uri = data_uri(svg)
    if mask:
        return (f"background-color: var(--pattern-color, currentColor);\n"
                f"-webkit-mask-image: {uri};\nmask-image: {uri};\n"
                f"-webkit-mask-size: {num(tile)}px {num(tile)}px;\nmask-size: {num(tile)}px {num(tile)}px;")
    return f"background-image: {uri};\nbackground-size: {num(tile)}px {num(tile)}px;"


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--tile", type=float, default=48, help="square tile size in px (default 48)")
    ap.add_argument("--layer", action="append", default=[], help="KIND[:key=value,...]; repeatable, bottom first")
    ap.add_argument("--background", help="solid fill under the layers (ignored for --format mask)")
    ap.add_argument("--format", choices=["svg", "css", "mask"], default="svg")
    ap.add_argument("--clip-id", default="pattern-clip", help="clipPath id; make unique when inlining several tiles")
    ap.add_argument("--preview", help="also write an HTML page that tiles the result")
    ap.add_argument("--list", action="store_true", help="list layer kinds and exit")
    args = ap.parse_args()

    if args.list:
        for kind, help_text in KINDS.items():
            print(f"{kind:8} {help_text}")
        return
    if not args.layer:
        ap.error("add at least one --layer (try --list)")

    if not math.isfinite(args.tile) or args.tile <= 0:
        ap.error("--tile must be a positive number")
    layers = [parse_layer(s) for s in args.layer]
    mask = args.format == "mask"
    svg = build_svg(args.tile, layers, args.background, mask, args.clip_id)
    print(svg if args.format == "svg" else css_for(svg, args.tile, mask))

    if args.preview:
        css = css_for(svg, args.tile, mask)
        ground = "" if mask or args.background else "background-color:#fafafa;"
        tint = "color:#1C1F21;" if mask else ""
        with open(args.preview, "w") as fh:
            fh.write(f'<!doctype html><meta charset="utf-8"><title>pattern preview</title>'
                     f'<style>html,body{{margin:0;height:100%;{ground}}}'
                     f'.p{{position:fixed;inset:0;{tint}{css.replace(chr(10), "")}}}</style><div class="p"></div>')


if __name__ == "__main__":
    main()
