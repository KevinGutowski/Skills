// Layout-shift scorer for browser-verification.
// In a page (agent-browser eval --stdin): returns the reading for the top document, or for a
// same-origin iframe when cls-reading.sh has substituted its selector for the placeholder below.
// In Node (require): exports scoreShifts for the unit tests.
// Everything lives inside one function. Evaluating this file defines no globals and touches no
// page state, so it cannot collide with a page's own scoreShifts, classify or similar.
(function (frameSelector) {
  function scoreShifts(entries) {
    // Chrome's session windows, as in GoogleChrome/web-vitals LayoutShiftManager:
    // a shift joins the current window only if it starts < 1000 ms after the previous
    // shift and < 5000 ms after the window's first shift. CLS is the largest window.
    var cls = 0, cur = 0, first = 0, prev = 0, sum = 0, counted = 0;
    for (var i = 0; i < entries.length; i++) {
      var e = entries[i];
      if (e.hadRecentInput) continue;
      var joins = cur > 0 && e.startTime - prev < 1000 && e.startTime - first < 5000;
      if (!joins) { cur = 0; first = e.startTime; }
      cur += e.value; prev = e.startTime; sum += e.value; counted++;
      if (cur > cls) cls = cur;
    }
    // `good` is compared before any rounding: 0.103125 is not good, though it prints as 0.10.
    return { cls: cls, sum: sum, good: cls <= 0.1, counted: counted, lastShiftAtMs: counted ? Math.round(prev) : null };
  }

  if (typeof window === 'undefined' && typeof module !== 'undefined' && module.exports) {
    module.exports = { scoreShifts: scoreShifts };
    return undefined;
  }
  var selector = typeof frameSelector === 'string' && frameSelector && frameSelector !== '__CLS_' + 'FRAME_SELECTOR__'
    ? frameSelector : null;
  var w = window;
  if (selector) {
    // Messages never repeat the selector: selectors can contain URLs with tokens.
    var frame = document.querySelector(selector);
    if (!frame) return { error: 'no element matches the --frame selector' };
    try { w = frame.contentWindow; void w.document; } catch (err) {
      return { error: 'the --frame element is cross-origin; its layout shifts cannot be read from the host' };
    }
  }
  // Where the entries come from decides whether the reading can be trusted.
  //   collector  cls-collector.js ran in this document from navigation and saw every shift.
  //   buffered   fallback: the browser's buffered history, which holds a limited number of
  //              entries. If it is full, or the browser says it dropped entries, later shifts
  //              are missing and no score is returned.
  var BUFFER_LIMIT = 150;
  function finish(entries, source, dropped) {
    if (dropped > 0 || (source === 'buffered' && entries.length >= BUFFER_LIMIT)) {
      return { error: 'the layout-shift history is incomplete (' + entries.length + ' entries kept, ' + dropped +
        ' reported dropped): the page shifted more often than the browser buffers, so later shifts may be missing. ' +
        'Score with the collector running from navigation (cls-reading.sh registers it) or treat this reading as unverified.',
        entriesKept: entries.length, dropped: dropped, source: source };
    }
    var result = scoreShifts(entries);
    // Origin and path only: query strings and fragments can carry tokens, and this output gets quoted in reports.
    result.document = w.location.origin + w.location.pathname;
    result.frame = !!selector;
    result.source = source;
    result.scoredAtMs = Math.round(w.performance.now());
    result.shifts = entries.filter(function (e) { return !e.hadRecentInput; }).map(function (e) {
      return { at: Math.round(e.startTime), value: e.value, moved: e.moved || (e.sources || []).map(function (s) {
        return s.node ? s.node.nodeName.toLowerCase() + (s.node.id ? '#' + s.node.id : '') : null; }) };
    });
    return result;
  }
  var store = w.__browserVerificationLayoutShifts;
  if (store && store.entries) return finish(store.entries.slice(), 'collector', store.dropped || 0);
  // No collector in this document: read the buffer through a callback, because only the callback
  // is told how many entries the browser dropped. Resolve shortly after even if it never fires
  // (a page with no shifts delivers nothing).
  return new Promise(function (resolve) {
    var got = [], dropped = 0, done = false;
    var observer = new w.PerformanceObserver(function (list, obs, options) {
      if (options && options.droppedEntriesCount) dropped += options.droppedEntriesCount;
      got = got.concat(list.getEntries());
    });
    observer.observe({ type: 'layout-shift', buffered: true });
    w.setTimeout(function () {
      if (done) return; done = true;
      got = got.concat(observer.takeRecords()); observer.disconnect();
      resolve(finish(got, 'buffered', dropped));
    }, 200);
  });
})("__CLS_FRAME_SELECTOR__");
