---
name: route-planning
description: "Optimize and verify multi-stop driving routes (delivery, errands, ride-along visits). Use when the user has a list of addresses and wants the best order, or wants to diagnose backtracks, U-turns, or detours in an existing route. Not for single A→B directions, live-traffic routing, or 100+ stops. Triggers: multi-stop route, delivery route, TSP, route optimization, OSRM, Apple Maps multi-stop, Google Maps directions, waypoint order."
---

## When to use

User hands you a list of addresses with a starting point and asks for an optimized order. Or shows you an existing route and asks why it looks weird at certain stops.

**Don't use for:** single A→B directions (just hand the user a Google/Apple Maps URL), real-time traffic-aware routing (delivery apps do this better), or routes >100 stops (use a commercial VRP solver).

## Playbook

### 1. Geocode + matrix

**Input:** a list of address strings, start first. **Output of this step:** `stops`, a list of dicts `{"address", "lat", "lon", "display_name"}` in input order (floats for `lat`/`lon`), plus `D` and `M`, N×N matrices of driving seconds and meters indexed by position in `stops`. If the user already has coordinates, build `stops` directly and skip geocoding.

Nominatim's public endpoint works without a key — send a real `User-Agent` with a real contact (anonymous or placeholder UAs get blocked with `403 Access denied`; replace the example contact below) and keep to ~1 request/second as a courtesy. The address must be URL-encoded; from the shell, let curl do it:

```bash
curl -sS -G -A "route-planner/1.0 (contact: you@example.com)" \
  "https://nominatim.openstreetmap.org/search" \
  --data-urlencode "format=json" --data-urlencode "limit=1" \
  --data-urlencode "q=1 Ferry Building, San Francisco, CA"
# -> [{"lat": "...", "lon": "...", "display_name": "..."}]
```

The same in Python (standard library only; steps 1–2 form one runnable script):

```python
import json, time, urllib.parse, urllib.request

UA = "route-planner/1.0 (contact: you@example.com)"  # replace with a real contact

def get_json(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.load(resp)

def geocode(address):
    """address string -> {"address", "lat", "lon", "display_name"}; raises LookupError on no hit."""
    q = urllib.parse.urlencode({"format": "json", "limit": 1, "q": address})
    hits = get_json(f"https://nominatim.openstreetmap.org/search?{q}")
    if not hits:
        raise LookupError(f"no geocoding result for {address!r}")
    h = hits[0]
    return {"address": address, "lat": float(h["lat"]), "lon": float(h["lon"]),
            "display_name": h["display_name"]}

# Input: addresses in any order, START FIRST.
addresses = [
    "1 Ferry Building, San Francisco, CA",
    "City Hall, San Francisco, CA",
    "Coit Tower, San Francisco, CA",
]
stops = []
for a in addresses:
    stops.append(geocode(a))
    time.sleep(1)  # Nominatim courtesy limit: ~1 request/second
```

Sanity-check each hit's `display_name` against the input address — geocoders silently match the wrong city/suburb.

```python
# OSRM wants lon,lat (not lat,lon), semicolon-separated, in stop order.
coords = ";".join(f"{s['lon']:.6f},{s['lat']:.6f}" for s in stops)

table = get_json(f"https://router.project-osrm.org/table/v1/driving/{coords}"
                 "?annotations=duration,distance")
assert table["code"] == "Ok", table
D = table["durations"]  # D[i][j] = driving seconds from stops[i] to stops[j]
M = table["distances"]  # M[i][j] = driving meters  from stops[i] to stops[j]
```

OSRM public endpoint is free, no key, has rate limits. Don't try haversine — in hilly or water-divided terrain, stops 200m apart can be 1+ mi by car.

### 2. Solve open TSP

For 5–30 stops, continuing the script (OSRM's `/trip` endpoint solves directly; `order` is a list of indices into `stops`, start first):

```python
trip = get_json(f"https://router.project-osrm.org/trip/v1/driving/{coords}"
                "?source=first&roundtrip=false&destination=any&overview=false")
assert trip["code"] == "Ok", trip
# waypoints[i] describes stops[i]; waypoint_index is its position in the solved trip.
order = sorted(range(len(stops)), key=lambda i: trip["waypoints"][i]["waypoint_index"])
total_s = sum(D[a][b] for a, b in zip(order, order[1:]))
for pos, i in enumerate(order):
    print(pos, stops[i]["address"], "|", stops[i]["display_name"])
print(f"total {total_s / 60:.1f} min, {sum(M[a][b] for a, b in zip(order, order[1:])) / 1000:.1f} km")
```

Then refine `order` with OR-Tools or 2-opt + or-opt on the duration matrix `D`. For tighter optima, use OR-Tools with `GUIDED_LOCAL_SEARCH` + 60s budget. If OR-Tools and your local search converge to the same answer, that's a strong global-optimum signal.

### 3. Apply tiebreakers

Among tied-optimal orderings: prefer no drive-bys → no U-turns → curb-side parks (right side in right-hand-traffic countries; flip for left-hand traffic). The optimizer doesn't add these heuristics on its own.

### 4. Verify visually

**Don't trust solver output without checking the actual rendered route.** Load the route in the target nav app and look for:
- Parallel polyline segments on the same street (= U-turn)
- Long detours that the straight-line distance doesn't suggest
- Drive-bys (route passes within ~30m of a stop visited later)

## Pitfalls (the hard-won ones)

**OSRM straight-line bearings overcount U-turns by ~30%.** A 90°+90°+90° set of turns through residential cross-streets reads as 180° to a bearing detector but is normal city navigation. Use bearings as a first-pass filter only; verify each flag visually.

**Apple Maps' road graph differs from OSRM's** — typical 10–15% gap on driving-time estimates. OSRM is a *proxy*, not Apple's truth. Apple sees U-turns OSRM doesn't, and vice versa.

**Apple Maps' TBT text hides implicit U-turns.** When the destination is at a dead-end, the directions might say "destination on right, then 0.4 mi turn left onto X" — sounds clean, but the polyline shows a drive-past + U-turn + come-back. The U-turn is baked into the distance. Always look at the polyline, not just the text.

**Most U-turns are structural, not algorithmic.** Houses on dead-end stubs, cul-de-sacs, or north-end addresses force U-turns regardless of visit order. Reordering doesn't help. Classify each U-turn (structural vs. order-dependent) before trying to "fix" it. Fixing structural U-turns by reordering typically costs more time than the U-turn itself (~30 sec U-turn vs. 4–5 min detour).

**Brute-force small clusters.** For 4–7 stops in a contiguous geographic cluster, enumerate all 24–5040 permutations and score each on (time, drive-bys, U-turns). Faster and more reliable than gradient-descent on small spaces.

## Map-link formats

**Apple Maps iOS deep link** (opens native app):
```
http://maps.apple.com/?saddr=A&daddr=B+to:C+to:D&dirflg=d
```
`A`…`D` are URL-encoded addresses in all three formats below.
Hard cap of ~15 waypoints in the `+to:` chain. For more stops, split into legs.

**Apple Maps web (beta)** (`maps.apple.com`):
```
https://maps.apple.com/directions?source=A&waypoint=B&waypoint=C&destination=D&mode=driving
```
Uses repeated `waypoint=` params. Silently fails to render routes with ~15+ waypoints.

**Google Maps** (works on web and app):
```
https://www.google.com/maps/dir/A/B/C/D
```
Slash-separated, URL-encoded addresses (`urllib.parse.quote(address, safe="")` per segment). No waypoint cap is documented here; if a long route fails to render, split into legs.

**Per-stop labels are not supported** in any of these. Recipient names go in a separate checklist (e.g., Apple Note alongside the map link). Don't waste time trying to inject labels into URLs.

## Apple Maps web inspection (Playwright)

For verifying actual Apple Maps routing without the native app:

```js
// Navigate to maps.apple.com/directions URL
// Wait 4-5 sec for render
// Click the (i) "Route Details" button to expand turn-by-turn
const btn = Array.from(document.querySelectorAll('button')).find(b => b.getAttribute('aria-label') === 'Route Details');
btn.click();
// After ~1.5 sec, document.body.innerText contains the full TBT
```

Search the TBT for the literal phrase "U-turn" — Apple uses it sparingly, so any explicit hit is a real U-turn maneuver. Otherwise look at the rendered polyline for parallel-line patterns.

## Splitting into legs

When a single map URL won't fit all stops, split at a geographic midpoint and produce two URLs (Leg 1: start → mid stop, Leg 2: mid stop → end). The mid stop appears in both legs as the handoff. Aim for ≤14 deliveries per Apple Maps leg.

## Output checklist

For a finished route, give the user:
1. **The optimized stop order** (numbered, with addresses)
2. **Total distance + driving time** (from the actual nav app, not OSRM — say which)
3. **Map links** (Apple Maps + Google Maps; split into legs if needed)
4. **A name-keyed checklist** alongside the map links (since URLs can't carry names)
5. **Honest caveats** about what's structural vs. fixable, if backtracks are visible

> **Staleness note:** external-service specifics here decay. The OSRM demo server (`router.project-osrm.org`) has unpublished rate limits and no SLA — expect throttling on big matrices and fall back to a local OSRM or another router. Nominatim's usage policy may change; re-check it for batch sizes. The Apple Maps multi-stop web flow is beta: the `aria-label === 'Route Details'` selector and waypoint caps can rot silently — if the button isn't found, re-derive the selector from the live DOM rather than assuming no route rendered.
