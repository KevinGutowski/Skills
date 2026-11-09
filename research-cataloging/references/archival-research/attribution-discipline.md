# Attribution discipline — worked workflows and failure modes

Full detail behind the "Canonical inventory first — never invent attributions" section in the parent reference, [archival-research.md](../archival-research.md) (in `research-cataloging`). Everything below is the canonical wording.

## The wrong workflow (which I keep falling into)

1. Look at a visitor photo
2. Describe what I see ("round red crab-like ceramic with claws emerging from black spheres")
3. Try to infer the artist from style ("texture looks like Imai's chip-fragment work")
4. When the inference doesn't match a known piece, declare it "new / undocumented"
5. Invent a plausible-sounding artist kanji name to fill the gap

This produced **3 fabricated Japanese artist names** (森前武明, 坂本一正, 合田泰美) that don't exist anywhere on the open web. They were entirely my hallucinations, propagated through 4 passes of "confirmation."

## The right workflow

1. Look at the visitor photo
2. Describe what I see (forms, colors, scale, display context)
3. **Identify candidate Pokémon names from the silhouettes**
4. **Grep the canonical inventory for each candidate Pokémon name** (Japanese kana / kanji)
5. Pull up the canonical reference image for each TSV hit
6. Match the visitor photo to one of the canonical pieces
7. If genuinely no match: mark as **"unidentified, awaiting catalog cross-reference"** — never invent an attribution

The canonical TSV has ~84 rows. Grepping it costs nothing. Skipping that step costs hours of recursive error-correction.

## When the canonical inventory is incomplete

Sometimes new venues add pieces not yet in the canonical TSV. The correct handling:

- Mark as **"observed at [venue], not in canonical inventory [TSV name] as of [date]"**
- Note the strong visual style match if there is one ("style matches [artist], piece title TBD")
- **Add to a `gaps_to_verify.tsv` file** rather than inventing a title or attribution
- Re-check at next venue catalog capture

The discipline is: a missing entry is an `unidentified` row in a gap file, never a fabricated row in research notes.

## Attribution failure modes

- **Inventing proper names to fill attribution gaps.** When visual labeling produces a piece that doesn't match anything in the canonical inventory, the temptation is to invent a plausible-sounding artist name (Japanese kanji are easy to combine into plausible-but-fake names). Don't. Grep the canonical inventory first; if not found, mark "unidentified" — never write a kanji name without a verifiable source. See "Canonical inventory first" in [archival-research.md](../archival-research.md).
- **Recursive self-confirmation.** Writing "Pass 2 confirms Pass 1" / "Pass 3 confirms Pass 2" without grounding each pass in the canonical source. Errors compound across passes. Every pass must re-check against the authoritative source, not against the previous pass's output.
- **"Visual style match = attribution".** Similar surface texture across two pieces tells you "probably same artist" — it does NOT tell you who that artist is. Style-matching is for *grouping*, not for *naming*. Name only from canonical source.
- **One reference photo treated as the artist's whole style.** Artists use different surface treatments for different pieces. Comparing a visitor photo against ONE canonical reference and concluding "doesn't match artist X" is wrong. Check multiple reference photos per artist before ruling them out.
- **Defaulting to "new piece" when canonical match fails.** Default should be "I haven't matched this yet" not "this is undocumented." Most "undocumented" claims turn out to be canonical pieces I failed to match by sight (close-up vs wide-shot blindness, Pokémon ID errors, etc.). The canonical inventory is closed; new pieces are rare; expand your matching effort before declaring something new.

See also "Visual-labeling failure modes" in `references/checklists-and-templates.md` (silhouette confusion, crop-vs-wide-shot blindness, wrong-reference comparison, composition misreading, texture-to-medium inference).
