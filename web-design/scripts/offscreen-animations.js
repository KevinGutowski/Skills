// Off-screen animation audit. Paste into the console, or evaluate in the page
// from a browser driver; the whole file is one expression that returns a report.
// It reads the browser's animation objects and changes nothing on the page.
//
// What counts as "doing work": a time-based animation in its active interval
// (after its delay, before its end), running, on an element that is rendered.
//
//   { working: n, offscreen: n, list: [{ target, pseudo, name, kind, offscreen }],
//     notSeen: [...] }
//
// What it cannot see (reported under notSeen, never as zero):
//   - requestAnimationFrame loops, canvas and WebGL drawing: no animation object exists
//   - closed shadow roots, and cross-origin iframes
// A clean report means "no animation objects were working off screen", not
// "nothing is running off screen".
(() => {
  // Every document-like root: the document, and open shadow roots at any depth.
  const roots = []
  const walk = (root) => {
    roots.push(root)
    for (const el of root.querySelectorAll('*')) if (el.shadowRoot) walk(el.shadowRoot)
  }
  walk(document)

  const seen = new Set()
  const list = []
  for (const root of roots) {
    for (const a of root.getAnimations()) {
      if (seen.has(a)) continue
      seen.add(a)
      const effect = a.effect
      const el = effect && effect.target
      if (!el || a.playState !== 'running') continue
      // Scroll- and view-driven animations do no work while nothing scrolls.
      if (!(a.timeline instanceof DocumentTimeline)) continue
      // Active interval, from the effect's own timing. `progress` is not enough:
      // with a backwards fill it is 0 all through the delay.
      const t = effect.getComputedTiming()
      const local = t.localTime
      if (local === null || local < t.delay || local >= t.delay + t.activeDuration) continue
      // display:none never gets here (no animation object). A skipped
      // content-visibility subtree is listed by the browser but does no work.
      if (!el.checkVisibility({ contentVisibilityAuto: true })) continue
      // A pseudo-element has no box of its own; its owner's stands in.
      const b = el.getBoundingClientRect()
      const onscreen = b.bottom > 0 && b.right > 0 && b.top < innerHeight && b.left < innerWidth && (b.width > 0 || b.height > 0)
      list.push({
        target: el.id ? `#${el.id}` : el.tagName.toLowerCase() + (el.classList.length ? `.${[...el.classList].join('.')}` : ''),
        pseudo: effect.pseudoElement || null,
        name: a.animationName || a.transitionProperty || a.id || '(script)',
        kind: a.constructor.name,
        offscreen: !onscreen,
      })
    }
  }
  const frames = [...document.querySelectorAll('iframe')].filter((f) => {
    try {
      return !f.contentDocument
    } catch {
      return true
    }
  }).length
  return {
    working: list.length,
    offscreen: list.filter((x) => x.offscreen).length,
    list,
    notSeen: ['requestAnimationFrame, canvas and WebGL loops', 'closed shadow roots', ...(frames ? [`${frames} iframe(s) whose document is not readable`] : [])],
  }
})()
