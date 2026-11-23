// Layout-shift collector for browser-verification. cls-reading.sh registers it as an init script,
// so it runs in every document before the page's own scripts and records every layout shift
// from navigation on. The browser's buffered history keeps only a limited number of entries
// (150 in the Chromium tested); a page with many small shifts would otherwise lose the later,
// larger one and score as stable.
// One enclosed function; the only thing it adds to the page is one namespaced object.
(function () {
  if (typeof window === 'undefined' || window.__browserVerificationLayoutShifts) return;
  var store = { entries: [], dropped: 0, since: Math.round(performance.now()) };
  try {
    new PerformanceObserver(function (list, observer, options) {
      if (options && options.droppedEntriesCount) store.dropped += options.droppedEntriesCount;
      list.getEntries().forEach(function (e) {
        store.entries.push({ startTime: e.startTime, value: e.value, hadRecentInput: e.hadRecentInput,
          moved: (e.sources || []).map(function (s) {
            return s.node && s.node.nodeName ? s.node.nodeName.toLowerCase() + (s.node.id ? '#' + s.node.id : '') : null; }) });
      });
    }).observe({ type: 'layout-shift', buffered: true });
    Object.defineProperty(window, '__browserVerificationLayoutShifts', { value: store, enumerable: false, configurable: true });
  } catch (err) { /* layout-shift is not supported here; the scorer falls back and says so */ }
})();
