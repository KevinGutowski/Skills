# Sources

- *Richard Rutter, Web Typography (2017)* — the backbone: ~170 named guidelines with CSS and reasoning
- *Jason Santa Maria, On Web Typography (A Book Apart, 2014)* — the choosing/judgment frameworks
- *Matej Latin, Better Web Typography for a Better Web (2017)* — triangle covariation rules, language adjustments, scale-vs-grid reconciliation
- *Gustavo Fior, Craft — "Optical Alignment" (craft.gustavofior.com/optical-alignment, 2026)* — post-book corroboration only: `font-optical-sizing: auto` / `opsz` (opentype-and-micro §12) and the per-glyph `text-indent` hanging-punctuation fallback (§10); the icon-alignment method itself is owned by `design-craft` (surfaces)

**Additional source (2026-11):** Impeccable by Paul Bakaus (https://github.com/pbakaus/impeccable, Apache-2.0, screened at `b3ced85`). `operate` and `typeset` supplied the product-UI fixed-scale exception and the light-on-dark compensation, and the detector supplied the −0.04em tracking floor. Ledger: `docs/impeccable-source-mining-2026-11.md`.

**Additional source (2026-11):** design.how `make-font` by Arlan Marat (https://github.com/arla6ka/design.how, MIT, screened at `148b94c`). SKILL plus the measuring, foundation, fitting, spacing, and licensing references supplied the "a font like these, but ours" note in choosing-and-pairing §6. The method itself, with its scripts, lives in the `make-font` skill. Ledger: `docs/design-how-source-mining-2026-11.md`.

**Additional sources (2026-11-18):** Impeccable `typeset` at `d41d986` supplied the optical vertical-centering bullet in §7 (`text-box` trim on the label element, fallback `size-adjust`, caps-versus-mixed-case caveat); `text-box` syntax and browser support were checked against MDN and its compatibility data the same day. Open Design's `craft/typography.md` (https://github.com/nexu-io/open-design, Apache-2.0, `0725880`; the file states it is adapted from referodesign's MIT `refero_skill`) supplied the CJK leading bullet in §2, kept as single-source.

**Additional source (2026-11-23):** Matter, *The new Matter for Web* (https://www.getmatter.com/web-app/, November 2026), a launch post for a read-later app. It states the reader's settings, which follow Bringhurst. Used for: the reader-settings measure steps (§2), faces matched to one x-height (§3), Bringhurst's hyphen minimums against Rutter's, and the whole-paragraph, bounded-word-space justification (§6), and a 6% caps tracking value (§7). These are a shipping product's settings, not a study. Ledger: `docs/mining-ledger.md` (2026-11-23, Matter).
