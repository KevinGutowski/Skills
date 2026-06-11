---
name: web-accessibility
description: "Accessible-web practice — semantic HTML first, keyboard/focus, contrast nuance, forms, media, testing. Use when building or auditing accessible sites. Apple → apple-visual-accessibility; type → web-typography; error copy → error-messages; disabled-participant research → user-research. Triggers: web accessibility, WCAG, a11y audit, screen reader, skip link, keyboard navigation, ARIA, alt text, captions, transcripts, focus management, accessible forms."
---

# Web Accessibility

**Sources:**
- *Laura Kalbag, Accessibility for Everyone (A Book Apart, 2017)* — the spine: practice, priority order, testing, org layer
- *Michael J. Metts & Andy Welfle, Writing Is Designing, ch. 5 "Inclusivity and Accessibility" (Rosenfeld, 2020)* — the writing-accessibly layer
- *Adham Dannaway, Practical UI (2nd ed., 2024)* and *Wathan & Schoger, Refactoring UI* — the contrast-metrics layer (§5b)

The durable practice layer for accessible websites. Standards-era warning up front: Kalbag wrote against **WCAG 2.0**; current is **WCAG 2.2** (2.x success criteria are additive, so her criteria still hold) and EAA enforcement began June 2025 — **verify every standards, tooling, or legal specific against current WAI/MDN docs** (see Staleness appendix). Extended passages: [references/source-extracts.md](references/source-extracts.md).

## 1. Framing: universal, not bolted-on

- Ron Mace (architect, wheelchair user): "Universal design is the design of products and environments to be **usable by all people, to the greatest extent possible, without the need for adaptation or specialized design**." Accessible design adds the wheelchair ramp on the far side of the building; universal design builds combined ramp-stairs no one has to go out of their way to choose.
- The web translation: a text-resize button is accessible design — "yet another element crowding a page layout, and people have to go out of their way to find it" (Kalbag's NYT example). The universal move is **making all the body text bigger** (her counter-example: New Republic's 20px default, "instantly more inviting"). Build the inclusive default, not the bolt-on.
- The culture goal: "My one wish for the web is that **people consider accessibility in the same way they think about web performance**" — mentioned in every blog post about a new technique, not a separate workstream.
- **Context and environment are impairments too**: bright sunlight, one-handed phone use, slow connections. And don't infer context from device — BBDO found **64% of users browse the web on mobile while at home** on their sofas and Wi-Fi; "on the go" is a fiction.
- The analytics caveat: "**There are no user agent strings for these assistive technologies**, leaving us with no idea of how many people are accessing the web with assistive hardware or software." You cannot measure your way out — build for the unknown and test widely.

## 2. Assistive-technology discipline

- Léonie Watson's warning (via Kalbag): designers "often **conflate a particular assistive technology with a particular disability** — for example, assuming that everyone using a screen reader is blind." Screen readers serve dyslexic, low-vision, and cognitively fatigued users too; magnifier users often run them alongside.
- Method consequence: **separate user requirements (user analysis) from technology needs (workflow analysis)**. The AT is part of the research, not a proxy for the person.
- Don't generalize from one user: "What works for one person might not work for everyone with that disability or for people with other disabilities."

## 3. Priority order (the lesson, not the mechanics)

1. **Semantic HTML first.** "**Well-structured HTML is the secret weapon of web accessibility.**" Browsers map correct markup to the OS accessibility layer for free — headings, landmarks, `button`, `label`, lists.
2. **Keep structure and style separate.** Heading levels by document outline, never by font size; if it looks like a button, it is a `<button>`. Making `div`s/`span`s interactive "create[s] confusion for those using screen readers and keyboard navigation."
3. **ARIA last.** "ARIA should never be used to replace well-structured HTML. **It should be your last resort.**" ARIA only touches the accessibility layer — no styles, no behaviors — and "won't make an unusable website more accessible." When unsure, follow W3C's Using ARIA in HTML (verify current edition).

## 4. Keyboard & focus mechanics

- **Make skip links visible.** "Screen reader users rarely use skip links because screen readers have more sophisticated navigation to skip to content." Hiding them for everyone-but-screen-readers "**excludes the people who may benefit the most** from skip links — sighted people using keyboard navigation." Best option: "**make the skip links visible to all users so that all users benefit**."
- **Keyboard focus ≠ visual focus.** Kalbag's era-bug: following a skip link scrolled the view but left keyboard focus on the nav, making skip links "utterly useless… they're not actually skipping at all." The durable fix (Scott Vinkle): **`tabindex="-1"` on the skip-link target** — removed from the tab order, but able to receive programmatic focus. Same pattern for moving focus into dialogs, error summaries, and SPA route changes.
- **Never reorder the tab index** with positive `tabindex` values: Tab honors it, cursor/virtual navigation ignores it — "altering the tab index is generally not advisable." Fix the source order instead. `tabindex="0"` only for genuinely interactive custom elements.
- **Never remove focus styles** ("Just go put them back now") — replace browser defaults with branded focus *and* hover styles if you must, but keyboard users navigate by them.

## 5. Contrast nuance

- High contrast is the default aim, but **too-high contrast harms too**: "if the contrast between text and background is too high, the text can appear to dance on screen. … **People with SSS find that high-contrast text appears to shimmer or wobble on the screen**" (scotopic sensitivity syndrome). Near-black on near-white usually beats pure #000-on-#fff.
- **Big or bold type buys contrast headroom**: size and weight "will do some of the work of distinguishing text from background," freeing slightly lower-contrast palettes.
- **Grayscale check** (Geri Coady, via Kalbag): work in or convert to grayscale to verify text survives without hue — also catches color-only meaning. Ratio math, bands, and APCA → `apple-visual-accessibility` §contrast and `web-typography`.

### 5b. Contrast metrics & compliance tactics

(Adham Dannaway, *Practical UI* 2nd ed., 2024; Wathan & Schoger, *Refactoring UI*.)

- **APCA thresholds** (WCAG 3 draft; signed Lc scores, not ratios — "Smaller and thinner text gets a lower score"). Dannaway's table:

  | Lc | Minimum for |
  | --- | --- |
  | 90 | "Preferred for body text (14px regular and above)" |
  | 75 | "Minimum for body text (18px regular and above)" |
  | 60 | "Minimum for other text (24px regular or 16px bold and above)" |
  | 45 | "Minimum for large text (36px regular or 24px bold and above) and interface elements" |
  | 30 | "Absolute minimum for text like form field placeholder text and disabled button text" |
  | 15 | "Minimum for non-text elements" |

- **Polarity matters in APCA** — swapping foreground and background changes the score: "white text on a blue background passes, while blue text on a white background doesn't." WCAG 2 treats both the same, and "WCAG 2 contrast requirements don't work well for interfaces with dark backgrounds."
- **Adoption rule:** personal projects — use APCA. "For commercial projects, where accessibility compliance is a requirement, it's safest to stick with WCAG 2 until WCAG 3 is released" — and try to pass both.
- **Flip the contrast** (RUI) — when white-on-color needs a background so dark it hijacks hierarchy, invert: "Instead of using light text on a dark colored background, use dark colored text on a light colored background." The color still supports the text but "doesn't interfere as much with other actions on the page" — compliance without promoting every labeled element to primary.
- **Colored-on-colored text** (RUI): adjusting only lightness drags secondary text toward pure white before it passes. RUI's HSL-era tactic: "rotate the hue towards a brighter color, like cyan, magenta, or yellow." The durable intent — perceived brightness varies by hue, so a small hue shift buys contrast without washing out; in OKLCH you can also just raise L honestly. Mechanics → `oklch-skill` (accessibility-contrast.md, plus its Palette Roles & State Layers section, which bakes per-role contrast floors into the palette itself).

## 6. Forms & errors

- Format conversion is the developer's job: "that's not a user error—**that's the site developers' fault**. Formatting the content of an input field should not be a burden placed on the user; **the burden should be on the developers to convert user input into the necessary format**." Strip spaces from card numbers; accept any phone/date shape; validate asynchronously to reassure as people type.
- **"(required)" in the label, not an asterisk** — the asterisk is a convention only seasoned form-fillers know; the word works "for sighted or screen reader users… or for first-time web users." (Pair every input with a `label for=`/`id` — structural, not just visual.)
- **Dynamic alerts via `aria-live`**: `polite` for most updates (announced at the next graceful interval), `assertive` only for errors/alerts relevant to the user's current action — it's obtrusive.
- The error copy itself (tone, blame, what-now) → `error-messages`.

## 7. Writing accessibly (Writing Is Designing, ch. 5)

- **Write chronologically, not spatially**: screen readers read instructions to people who can't see spatial relationships. Not "Click the OK button below to continue" but "**Next, select OK to continue.**" Not "Go to top" but "Go to beginning."
- **Critical info before the action point.** Screen readers parse top-to-bottom, left-to-right: anything required to act or decide (password rules, fees, conditions) must appear **before** the button or field it governs — a hint below the password field "won't help someone using a screen reader who hasn't made it there yet."
- **Device-agnostic verbs**: not click/tap/press/see but **choose/select/view** — users may be on voice or adaptive devices. Exception: when teaching a gesture itself ("Pinch to zoom out").
- **Screen-reader pacing**: sighted readers average 2–5 words/sec; "**Screen-reader users can comprehend text being read at an average of 35 syllables per second**" — so "don't be afraid to sacrifice brevity for clarity" when context helps. Still structure for skimming: headers, short paragraphs.
- **Color and icon meaning varies culturally**: PlayStation's ✕ means "no/wrong" (batsu) and ◯ "yes" (maru) in Japan — reversed for most Western players. Don't let a glyph or color carry meaning alone or globally.
- **Inclusive language**: "**Don't ask for 'preferred' pronouns. They are a statement of fact, not a request.**" Ask pronouns separately from gender (if you need either at all); keep them editable; use singular *they* in interface copy.

## 8. Rich media

- **Transcripts are the cheap universal alternative**: they serve deaf users, skimmers, search engines, slow connections, and translators. Publish as plain well-structured HTML with headings and links. **Clean verbatim** (irrelevant noises removed) vs **true verbatim** (every um/er — costlier, more human): choose per content; "[Jessica coughs]" rarely aids understanding, but hesitations can.
- Include relevant non-speech information in brackets, script-style, with speakers named.
- **Captions**: WebVTT (`.vtt`) files work for HTML video and YouTube/Vimeo — timestamps, ≤2 lines, break at phrase boundaries (watch TV captions for the craft). Don't trust auto-captioning unedited.

## 9. The testing program (layered, in order)

1. **Heuristic walkthroughs** — earliest and cheapest: heuristic evaluations against WCAG/your policy; cognitive walkthroughs of real tasks, optionally emulating an AT setup.
2. **Code review** — catches structure problems users never see directly.
3. **Automated tests in CI** — run near production-readiness, but wired into the build: at Twitter, "if a developer's code breaks the accessibility of the product, the automated test will fail and the developer is unable to deploy" — and every failure was a teaching moment (Todd Kloots). Automated checks can't verify most experience-level criteria — necessary, never sufficient.
4. **Device/browser/AT matrix** — Anne Gibson's method: "**a testing matrix with a list of outputs along the top and inputs along the side**," filling each cell. Test screen reader output and keyboard input **together and separately**. Justify every device/AT choice from research, not what was lying around.
5. **Usability tests with disabled participants** — the closest to truth. Recruit people **skilled with their own AT** (else you test their comfort, not your product), never project insiders; include disabled participants in every round, not a special one. Full method, recruiting, facilitation → `user-research`.

Then keep testing after launch (feedback channel, regression suite) — "Accessibility isn't about passing a test or ticking a box; **it's about making great experiences**."

## 10. Org layer

- **Write an accessibility policy** that is "clear and simply written… **hierarchical**, so needs are prioritized… and **testable**, so you can easily determine whether your site is sufficiently accessible" — anything from a compliance document to a casual statement of intent (UK Post Office is Kalbag's exemplar).
- **Product managers own accessibility** (Henny Swan): legal duties, business benefits, priorities — while everyone keeps it in their own specialism.
- **Never a budget line item**: "Accessibility isn't a line item in an estimate or a budget—it's an underlying practice… **You wouldn't add a line item to make a site performant, so don't do it for accessibility either.**" On small budgets, prefer the cheapest option serving the widest audience (drop the carousel rather than gold-plate it).
- **SEO alignment, with a rule**: good structure and alt text help search — but "**accessibility requirements should always trump search engine optimization**" (Simon Cox, HSBC); never stuff alt text with keywords. "Normally a good compromise can be found… then everybody is happy."

## Checklist

- [ ] Inclusive default chosen over bolt-on control (bigger text, simpler layout)?
- [ ] Semantic HTML doing the work; ARIA only where HTML can't?
- [ ] Skip link present and **visible**; target has `tabindex="-1"`?
- [ ] Whole flow works keyboard-only; focus styles visible; no positive `tabindex`?
- [ ] Contrast passes current WCAG — but not glare-level; survives grayscale?
- [ ] Forms: labels say "(required)", inputs forgive formats, errors use `aria-live`?
- [ ] Copy: chronological, device-agnostic verbs, critical info before the action?
- [ ] Media: transcript published as HTML; captions human-checked?
- [ ] CI fails on accessibility regressions; AT matrix maintained?
- [ ] Tested with disabled participants using their own AT?
- [ ] Policy testable + hierarchical; a PM owns it; no a11y line item?

## Staleness appendix (book era: 2017/2020 — verify all specifics against current WAI/MDN docs)

Durable: everything above. Decayed:
- **WCAG 2.0 → 2.2** (2023; 2.4.11 focus appearance era, 2.5.8 target size); WCAG 3 in draft. "Level AA" remains the common legal bar — but check current statute.
- **Legal landscape moved**: EU's **European Accessibility Act enforcement began June 2025** (private-sector scope); US ADA Title II web rule (2024) sets WCAG 2.1 AA deadlines for government entities. Kalbag's law chapter is historical — get current counsel.
- **Motion**: her era predates `prefers-reduced-motion` — use it (plus `prefers-contrast`, `forced-colors`); ignore any pre-media-query workaround patterns.
- **Tooling churn**: Tenon API is gone (axe-core, Lighthouse, Pa11y are today's CI equivalents — the failing-build *pattern* is the durable part). Window-Eyes discontinued; "NVDU" is the book's typo for **NVDA**. IE/Opera Mini/Flash-based caption editors: dead. Today's AT matrix: NVDA + JAWS + Narrator (Windows), VoiceOver (macOS/iOS), TalkBack (Android).
- **`<dialog>` is real now** — native modal focus management shipped in all engines; don't hand-roll focus traps where it serves.
- The Safari/Chrome skip-link focus bug is largely fixed, but `tabindex="-1"` on targets remains correct practice.
- Screen readers + browsers update monthly; re-verify any specific keystroke, support claim, or quirk before citing it.

## Relationship to other skills

- **`apple-visual-accessibility`** — Apple-platform counterpart (settings, VoiceOver, contrast math/APCA mechanism); platform split mirrors apple-/web-typography.
- **`web-typography`** — owns type-specific contrast, sizing, and measure; this skill owns the broader practice around it.
- **`error-messages`** — the error copy itself; this skill owns the delivery mechanics (`aria-live`, placement).
- **`user-research`** — full method for research/testing with disabled participants; this skill carries only the recruiting discipline.
- **`ui-voice-and-tone`** — voice/tone system the accessible-writing rules slot into.
- **`web-animation-design`** — motion accessibility (`prefers-reduced-motion`) implementation.
- **`web-performance`** — the sibling practice; slow connections are an accessibility context.
