// Motion probe for browser-verification. Evaluate it in the page:
//   1st eval, before triggering the interaction: arms it and returns {armed: true}.
//   Later evals: return what has animated so far. While any finite animation is still listed by
//   the browser (running, paused, or waiting out a delay) the probe stays armed and says so;
//   read again. It disarms once nothing is pending.
//
// Basis. Every frame it asks the browser which animations exist (document.getAnimations() and
// the same on each open shadow root: CSS transitions, CSS animations and Web Animations API
// animations, including ones still in their delay) and measures each element target's rendered
// box and its contents' box against the first frame it was seen.
// It never decides movement from what a stylesheet declares or from a computed value: a keyframe
// that says translateX(40px) proves nothing if another rule overrides it, and a computed `top`
// that changes proves nothing on a statically positioned box.
//
//   moved    MEASURED. The element's rendered box moved or resized by more than 1 px at some frame.
//   still    The animation finished or loops forever, no change was measured (or, for a
//            pseudo-element, nothing can be measured), and every property whose keyframe values
//            differ is on a short list that cannot move or resize anything (opacity, colors,
//            visibility).
//   unknown  Everything else, including an animation that is not finished yet and any
//            pseudo-element animation that touches a property outside that list: a pseudo-element
//            has no box that script can read, so its movement cannot be established either way.
//            `computedGeometryChanged` on such a record is a hint for a person, not a verdict.
// It does not see requestAnimationFrame-driven motion or closed shadow roots.
// In Node (require) it exports classify() for the unit tests.
// Everything lives inside one function. Evaluating this file defines no globals; the only thing it
// leaves on the page is one state object, window.__browserVerificationMotionProbe, removed when
// the probe disarms. It cannot collide with a page's own classify() or similar.
(function () {
  var MOTION_STATIONARY = /^(opacity|visibility|color|background-color|border(-(top|right|bottom|left|block|inline|block-start|block-end|inline-start|inline-end))?-color|outline-color|text-decoration-color|caret-color|fill|stroke|accent-color|column-rule-color|text-emphasis-color|fill-opacity|stroke-opacity|flood-color|flood-opacity|stop-color|stop-opacity)$/;
  var MOTION_PSEUDO_GEOMETRY = ['transform', 'translate', 'scale', 'rotate', 'top', 'right', 'bottom', 'left',
    'width', 'height', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
    'padding-top', 'padding-right', 'padding-bottom', 'padding-left', 'offset-distance', 'offset-path'];

  function motionCssName(p) { return String(p).replace(/[A-Z]/g, function (c) { return '-' + c.toLowerCase(); }); }

  function classify(record) {
    // record: {finished, infinite, measurable, measuredChange: number|null, properties: string[]}
    // measuredChange: px the rendered box moved; null when no box could be measured.
    // measurable: false for pseudo-elements, which have no box that script can read.
    if (record.measurable && typeof record.measuredChange === 'number' && record.measuredChange > 1) return 'moved';
    if (!record.finished && !record.infinite) return 'unknown';
    if (record.measurable && record.measuredChange === null) return 'unknown';
    var props = (record.properties || []).map(motionCssName);
    if (props.length && props.every(function (p) { return MOTION_STATIONARY.test(p); })) return 'still';
    return 'unknown';
  }

  if (typeof window === 'undefined' && typeof module !== 'undefined' && module.exports) { module.exports = { classify: classify }; return undefined; }
  function name(el, pseudo) {
    if (!el || !el.nodeName) return null;
    return el.nodeName.toLowerCase() + (el.id ? '#' + el.id : '') + (pseudo || '');
  }
  function measure(el, pseudo) {
    try {
      if (pseudo) {
        var cs = getComputedStyle(el, pseudo);
        return MOTION_PSEUDO_GEOMETRY.map(function (p) { return cs.getPropertyValue(p); });
      }
      var a = el.getBoundingClientRect();
      var range = document.createRange(); range.selectNodeContents(el);
      var b = range.getBoundingClientRect();
      return [a.left, a.top, a.width, a.height, b.left, b.top, b.width, b.height];
    } catch (err) { return null; }
  }
  function change(pseudo, start, now) {
    if (!start || !now) return null;
    var max = 0;
    for (var i = 0; i < start.length; i++) {
      if (pseudo) { if (start[i] !== now[i]) return 1; }
      else max = Math.max(max, Math.abs(start[i] - now[i]));
    }
    return max;
  }
  function roots() {
    var out = [document];
    (function walk(root) {
      var all = root.querySelectorAll('*');
      for (var i = 0; i < all.length; i++) if (all[i].shadowRoot) { out.push(all[i].shadowRoot); walk(all[i].shadowRoot); }
    })(document);
    return out;
  }
  function listed() {
    var out = [];
    roots().forEach(function (root) { if (root.getAnimations) root.getAnimations().forEach(function (a) { if (out.indexOf(a) < 0) out.push(a); }); });
    return out;
  }
  function describe(a) {
    var effect = a.effect, props = [], infinite = false;
    try { infinite = effect.getComputedTiming().activeDuration === Infinity; } catch (err) {}
    try {
      // Only properties whose keyframe values differ can change anything. A fade whose keyframes
      // both say transform: translateX(0) animates opacity only. (This direction is safe: an
      // animation with identical values for a property cannot move it. The reverse, differing
      // values, proves nothing and is never used as evidence of movement.)
      var values = {};
      effect.getKeyframes().forEach(function (k) {
        Object.keys(k).forEach(function (p) {
          if (!/^(offset|easing|composite|computedOffset)$/.test(p)) (values[p] = values[p] || []).push(String(k[p]));
        });
      });
      Object.keys(values).forEach(function (p) {
        if (values[p].length < 2 || values[p].some(function (v) { return v !== values[p][0]; })) props.push(p);
      });
    } catch (err) {}
    var kind = a.transitionProperty !== undefined ? 'transition' : a.animationName !== undefined ? 'animation' : 'script';
    return { kind: kind, properties: props, infinite: infinite };
  }
  function scan(state, last) {
    var now = listed();
    now.forEach(function (a) {
      var effect = a.effect;
      if (!effect || !effect.target) return;
      var r = null;
      for (var i = 0; i < state.records.length; i++) if (state.records[i].animation === a) { r = state.records[i]; break; }
      if (!r) {
        var d = describe(a), pseudo = effect.pseudoElement || '';
        r = { animation: a, el: effect.target, pseudo: pseudo, target: name(effect.target, pseudo), kind: d.kind,
          properties: d.properties, infinite: d.infinite, measurable: !pseudo, start: measure(effect.target, pseudo),
          measuredChange: null, hint: false, finished: false };
        if (r.start && r.measurable) r.measuredChange = 0;
        state.records.push(r);
      }
      var c = change(r.pseudo, r.start, measure(r.el, r.pseudo));
      if (c !== null && r.measurable) r.measuredChange = Math.max(r.measuredChange || 0, c);
      if (c && !r.measurable) r.hint = true;   // computed style changed; says nothing about rendering
      r.finished = a.playState === 'finished' || a.playState === 'idle';
    });
    state.records.forEach(function (r) { if (now.indexOf(r.animation) < 0) r.finished = true; });
    if (!last) state.frame = requestAnimationFrame(function () { scan(state); });
  }
  if (!window.__browserVerificationMotionProbe) {
    var state = { records: [], frame: 0 };
    window.__browserVerificationMotionProbe = state;
    scan(state);
    return { armed: true, reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches };
  }
  var probe = window.__browserVerificationMotionProbe;
  cancelAnimationFrame(probe.frame);
  scan(probe, true);
  var out = probe.records.map(function (r) {
    return { kind: r.kind, target: r.target, properties: r.properties, finished: r.finished, infinite: r.infinite,
      measurable: r.measurable,
      measuredChange: r.measuredChange === null ? null : Math.round(r.measuredChange * 100) / 100,
      computedGeometryChanged: r.measurable ? undefined : r.hint,
      result: classify(r) };
  });
  var pending = probe.records.filter(function (r) { return !r.finished && !r.infinite; }).length;
  if (pending) probe.frame = requestAnimationFrame(function () { scan(probe); });
  else delete window.__browserVerificationMotionProbe;
  var pick = function (result) { return out.filter(function (r) { return r.result === result; }); };
  var moved = pick('moved'), unknown = pick('unknown'), still = pick('still');
  return {
    reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
    pending: pending, armed: pending > 0,
    moved: moved, unknown: unknown, still: still,
    conclusion: moved.length ? 'movement measured'
      : pending ? 'inconclusive: ' + pending + ' animation(s) not finished (running, paused, or waiting out a delay); the probe is still armed, read it again later'
      : unknown.length ? 'inconclusive: some animations could not be measured or shown to be stationary (see unknown; pseudo-elements are always in this group unless they only fade or recolor); use a recording'
      : out.length ? 'no movement measured in the animations the browser listed'
      : 'no animation was listed by the browser while the probe was armed (requestAnimationFrame-driven motion and closed shadow roots are not seen)'
  };
})();
