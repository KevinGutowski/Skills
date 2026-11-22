# Coverage Gaps

Use this file for web-design claims that need current docs, project evidence, or deterministic checks before becoming reusable rules.

## Candidate gaps

- **Browser/API drift:** Core Web Vitals thresholds, CSS features, browser support, Tailwind syntax, and media-query behavior need current verification before exact advice.
- **Installed Apple web apps:** Re-test Safari point-release behavior for status-bar color sampling, safe-area timing, viewport units, fixed overlays, iPad window controls, icon candidate selection, cookie handoff, and startup-image caching. Joe Bell's device observations are valuable leads but not browser contracts; Safari 26's official SVG-icon support conflicts with the source's PNG-only wording.
- **Layout fixtures:** Add accepted examples for container-vs-viewport query selection, RTL mirroring, safe-area/virtual-keyboard behavior, pseudo-localization, and carousel alternatives. Keep numeric spacing/peek/translation heuristics advisory until project evidence or another source supports them.
- **A11y test fixtures:** Add examples only when they include keyboard path, focus order, labels, screen-reader expectations, and contrast evidence.
- **Motion checks:** Motion values are judgment-heavy; mechanical checks should focus on reduced-motion support, duration outliers, and main-thread performance.
- **Forms across product types:** Destructive-action and settings-copy patterns should route through `ux-writing` when wording is the hard part.
- **Motion kit drift:** The `motion` skill's best-practices file predates Motion 14.2 (2026-10), which accelerates the shorthand transforms. Two dated library notes were added to that file in 2026-11 rather than rewriting vendored text; replace them when Motion publishes an updated kit. Its Base UI file carries a third dated note (exit detection needs `opacity`, manual unmounting, kept-mounted popups) from Base UI's animation handbook at 1.9.0. The `will-change` difference with web-animation-design's animation-performance member is recorded there as two schools.
- **Gesture and mobile-feel fixtures:** web-animation-design's gestures member and `mobile-web-native-feel.md` rest on one practitioner's skills plus MDN. Thresholds (0.11 px/ms, 500 px/s, 10px slop, rubber-band 0.55) are that author's or Apple's sample values, not standards; add a fixture only with a real-device recording.
- **React Native motion:** no cluster owns it. Emil Kowalski's `animate-expo` skill was screened and parked (see `docs/emilkowalski-skills-source-mining-2026-11.md`); revisit if React Native work becomes recurring.
- **Base UI Scroll Area workaround (temporary):** `web-performance.md` tells agents to register the four `--scroll-area-overflow-*` properties for Safari. It rests on one practitioner's measurement plus Base UI's source, read on 2026-11-18 (npm latest 1.9.0). A review fixture in Playwright WebKit (3,000 rows, Base UI 1.9.0) confirmed the values stay on the viewport, descendants compute `0px`, and a viewport mask fade survives; Safari frame timing was not measured. Re-check on Base UI releases. Delete the section, the animation-performance table row, and the `frontend-design` library-picks row once the supported Base UI version registers the properties in WebKit (its `platform.engine.webkit` check is gone). WebKit bug 325900 was open (status NEW) on 2026-11-18; its closure alone does not retire the workaround.
- **iOS 26 backdrop fix:** the `position: absolute` backdrop row in `mobile-web-native-feel.md` is taken from Base UI's quick start (1.9.0, read 2026-11-18) and was not tested on a device. iOS 26 point releases have changed fixed positioning before; re-check with the installed-apps overlay section.
- **Navigation and URL state:** no reference owns navigation architecture. The URL-reflects-state rule sits in `web-accessibility.md` §3 on one source (Vercel's Web Interface Guidelines, 2026-11); move it if a navigation reference appears, and add a fixture before treating "all stateful UI is deep-linked" as a hard rule.
- **Web Interface Guidelines claims not re-tested:** native `<select>` colors in Windows dark mode, root `overscroll-behavior: none` disabling swipe navigation, and hybrid-pointer behavior under `(pointer: fine)` are upstream's reports. Check MDN and a device before citing them as browser contracts. Upstream-only rules parked in `interface-review` (code-compliance-sweep): `:focus-within` for compound controls, `inert` on dragged elements, the over-50-items virtualization prompt.
- **Form-error rules from ui-ux-pro-max's provenance (2026-11):** three items need a recheck before they harden. (1) "Errors never only in a timed toast" rests on a WCAG 3 working-draft requirement plus a WCAG 2.2 Understanding note, not a 2.2 success criterion; re-check when WCAG 3 moves. (2) The IME Enter guidance comes from W3C UI Events plus Google's modern-web-guidance; no real-IME Safari test was run here. Add a fixture with a recorded Korean or Japanese IME session. (3) The source's own error-placement row says "below the input" while citing GOV.UK, whose error message sits above the input. This library keeps Dannaway/GOV.UK (above) for public forms and tactile-design (below) for dense product UI, as scoped schools in `form-design.md` §3.
- **Social safe zones:** Platform chrome changes quickly; verify current safe areas before production video guidance.

## Candidate promotion form

```markdown
Candidate:
Owning reference:
Browser/platform docs checked:
Project evidence or fixture:
Rule:
Mechanical check possible:
Exception:
Status: proposed | accepted | rejected
```
