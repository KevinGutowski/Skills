---
name: route-planning
description: >
    Optimize and verify multi-stop driving routes (delivery, errands, ride-along visits). Use when user has a list of addresses and wants the best order, or wants to diagnose why an existing route has backtracks, U-turns, or detours. Triggers on: multi-stop route, delivery route, TSP, route optimization, OSRM, Apple Maps multi-stop, Google Maps directions, waypoint order.
---

## When to use

User hands you a list of addresses with a starting point and asks for an optimized order. Or shows you an existing route and asks why it looks weird at certain stops.

**Don't use for:** single A→B directions (just hand the user a Google/Apple Maps URL), real-time traffic-aware routing (delivery apps do this better), or routes >100 stops (use a commercial VRP solver).

## Playbook

### 1. Geocode + matrix

```python
# Build coordinate string for OSRM
coords = ";".join(f"{lon},{lat}" for _, lat, lon, _ in stops)
# Get full driving matrix (durations + distances)
url = f"https://router.project-osrm.org/table/v1/driving/{coords}?annotations=duration,distance"
# Returns N×N matrices D (seconds) and M (meters)
```

OSRM public endpoint is free, no key, has rate limits. Don't try haversine — Bay Area hills mean stops 200m apart can be 1+ mi by car.

### 2. Solve open TSP

For 5–30 stops:

```python
# OSRM /trip endpoint solves directly
url = (f"https://router.project-osrm.org/trip/v1/driving/{coords}"
       "?source=first&destination=any&roundtrip=false&overview=false")
# Then refine with OR-Tools or 2-opt + or-opt on the duration matrix
```

For tighter optima, use OR-Tools with `GUIDED_LOCAL_SEARCH` + 60s budget. If OR-Tools and your local search converge to the same answer, that's a strong global-optimum signal.

### 3. Apply tiebreakers (already in `feedback_route_tiebreakers.md`)

Among tied-optimal orderings: prefer no drive-bys → no U-turns → right-side parks. The optimizer doesn't add these heuristics on its own.

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
Slash-separated, URL-encoded addresses. No waypoint cap that I've hit.

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
