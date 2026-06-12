#!/usr/bin/env python3
"""Batch quote verifier for skill folds.

Verifies that quotes appear (near-)verbatim in source texts, using the
normalization rules accumulated across fold sessions: curly quotes/dashes,
whitespace collapse (incl. mid-word OCR spaces), transcript stutter doubling
("the the", "in in"), ellipsis-split fragments, and NBSP.

Usage:
    python3 verify_quotes.py SOURCE [SOURCE...] <<'EOF'
    first quote to check
    second quote ... with an ellipsis splitting two fragments
    EOF

    # or from a manifest:
    python3 verify_quotes.py --manifest quotes.json SOURCE [SOURCE...]

Manifest format: JSON list of strings, or list of {"q": str, "src": optional
filename-substring to require}.

Output: one line per quote — "OK  <source-file>  <quote head>" or
"MISS  <quote head>". Exit code 1 if any MISS.

A MISS means: do NOT ship the quote. Re-read the source region, fix the
wording to match, or drop the quote. Never ship unverified quotes.
"""
import sys, re, json, unicodedata

def norm(s: str) -> str:
    s = unicodedata.normalize("NFKD", s)
    s = "".join(c for c in s if not unicodedata.combining(c))  # accent fold
    s = (s.replace("’", "'").replace("‘", "'")
           .replace("“", '"').replace("”", '"')
           .replace("—", "-").replace("–", "-")
           .replace(" ", " ").replace("…", "..."))
    s = re.sub(r"\s+", "", s)  # collapse ALL whitespace (handles mid-word OCR spaces)
    return s.lower()

def destutter(s: str) -> str:
    # collapse immediate word doubling: "the the" -> "the" (on raw text, pre-norm)
    return re.sub(r"\b(\w+) \1\b", r"\1", s)

def fragments(quote: str):
    # split on ellipses / bracketed elisions; each fragment must appear in order
    parts = re.split(r"\.\.\.|…|\[…\]|\[\.\.\.\]|\[sic\]|\[[^\]]{1,30}\]", quote)
    return [p for p in (x.strip() for x in parts) if len(p) >= 8] or [quote.strip()]

def check(quote: str, sources: dict) -> str | None:
    frags = [norm(f) for f in fragments(quote)]
    for name, (raw, normed, normed_ds) in sources.items():
        pos, hay_pair = 0, (normed, normed_ds)
        ok = True
        for hay in hay_pair:
            pos, ok = 0, True
            for f in frags:
                i = hay.find(f, pos)
                if i < 0:
                    ok = False
                    break
                pos = i + len(f)
            if ok:
                return name
    return None

def main():
    args = sys.argv[1:]
    manifest = None
    if args and args[0] == "--manifest":
        manifest, args = args[1], args[2:]
    if not args:
        sys.exit(__doc__)
    sources = {}
    for path in args:
        raw = open(path, encoding="utf-8", errors="ignore").read()
        sources[path] = (raw, norm(raw), norm(destutter(raw)))
    if manifest:
        items = json.load(open(manifest))
        quotes = [(i["q"], i.get("src")) if isinstance(i, dict) else (i, None) for i in items]
    else:
        quotes = [(l, None) for l in sys.stdin.read().splitlines() if l.strip()]
    misses = 0
    for q, want_src in quotes:
        scope = {k: v for k, v in sources.items() if not want_src or want_src in k} or sources
        hit = check(q, scope)
        head = (q[:70] + "…") if len(q) > 70 else q
        if hit:
            print(f"OK    {hit.split('/')[-1]:<28} {head}")
        else:
            print(f"MISS  {'':<28} {head}")
            misses += 1
    print(f"\n{len(quotes) - misses}/{len(quotes)} verified")
    sys.exit(1 if misses else 0)

if __name__ == "__main__":
    main()
