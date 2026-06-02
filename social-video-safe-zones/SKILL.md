---
name: social-video-safe-zones
description: >-
  Keep key content (text, logos, CTAs, faces) clear of the platform UI "chrome"
  when designing or rendering vertical/social videos — Instagram Reels & Stories,
  TikTok, YouTube Shorts. Use whenever building or reviewing a 9:16 (or social)
  video composition (Remotion, After Effects, CapCut, etc.) so captions/usernames,
  the right-side action rail (like/comment/share/save), and bottom CTA don't cover
  important elements. Triggers: instagram reels, stories, tiktok, youtube shorts,
  safe zone, safe area, vertical video, 1080x1920, 9:16, social video layout,
  "where do the buttons go", caption overlap.
---

# Social video safe zones

When a video plays inside a social app, the app draws its UI **on top of** the
video. Anything important must stay inside the **safe area** or it gets covered by
usernames, captions, the right-side action rail (like / comment / share / save /
more), the audio ticker, and CTAs.

## Rule of thumb
Keep critical content (text, logos, faces, CTAs) within the **central ~70–80%** of
the frame. Reserve roughly the top **~14%**, the bottom **~25–35%**, and the right
**~12–20%** (action buttons). Full-bleed *backgrounds* are fine — only **important**
elements need to respect the safe area.

## Safe insets per platform (1080×1920, 9:16)
Keep key content inside these margins (px):

| platform | top | bottom | left | right | why the bottom/right are big |
|----------|-----|--------|------|-------|------------------------------|
| **Instagram Reels** | 250 | 420 | 60 | 260 | caption + handle + audio title; right action rail |
| **Instagram Stories** | 250 | 250 | 60 | 60 | profile/close top, reply bar bottom (no right rail) |
| **TikTok** | 120 | 500 | 60 | 360 | tallest right rail + 3-line caption + music ticker |
| **YouTube Shorts** | 110 | 420 | 60 | 200 | title/channel/description + right buttons |

- **IG Reels net safe rect ≈ 760 × 1250 px**, biased upper-left. Captions/subtitles: keep within the middle **1080 × 1420**.
- **Design to the tightest target you'll post to** (usually TikTok's right rail + bottom). A layout that clears TikTok clears Reels and Shorts too.
- IG **Feed**: largest crop is 4:5 (1080×1350); the **grid thumbnail crops to ~1:1**, so keep the focal point centered.

## Practical guidance
- Put the **hero/subject** in the **upper-center**; put supporting text **above** the
  bottom reserve, never inside it.
- **Decorative corner elements** (logos, frames, spinning icons, counters) collide
  with the action rail — especially **bottom-right**. Pull them inward or keep them
  faint, and don't put readable text in the corners.
- **Cover/thumbnail**: the grid crops differently than playback — center the cover's
  focal point. (IG ignores a video's embedded poster; upload a custom cover image.)
- Don't bake burned-in captions near the very bottom — they fight the app's caption.

## Export
- 1080×1920, H.264, `yuv420p`, **~8–10 Mbps**. Platforms re-compress on upload, so
  feed them a **higher-quality** file than the final target — never upload an
  already-small/recompressed file. Audio: AAC; add a short fade if you cut the track.

## Remotion helper
Wrap key content in this; tweak per the table. Turn on `debug` to see the box while
laying out, then remove it.
```tsx
import {AbsoluteFill} from 'remotion';

export const SAFE = {
  reels:  {top: 250, bottom: 420, left: 60, right: 260},
  stories:{top: 250, bottom: 250, left: 60, right: 60},
  tiktok: {top: 120, bottom: 500, left: 60, right: 360},
  shorts: {top: 110, bottom: 420, left: 60, right: 200},
} as const;

export const SafeArea: React.FC<{
  platform?: keyof typeof SAFE;
  debug?: boolean;
  children: React.ReactNode;
}> = ({platform = 'reels', debug, children}) => {
  const s = SAFE[platform];
  return (
    <AbsoluteFill
      style={{
        paddingTop: s.top, paddingBottom: s.bottom, paddingLeft: s.left, paddingRight: s.right,
        outline: debug ? '2px dashed rgba(255,0,0,0.7)' : undefined,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
```

## Checklist before exporting a social video
- [ ] Bottom text / CTA sits **above** the bottom reserve?
- [ ] Nothing important under the **right action rail**?
- [ ] Username/handle area (top) is clear?
- [ ] Corner decorations pulled inward (esp. bottom-right)?
- [ ] Cover/thumbnail focal point centered?
- [ ] Exported at high bitrate (the platform will re-compress)?

## Sources
- [Instagram safe zones (Zeely)](https://zeely.ai/blog/master-instagram-safe-zones/)
- [Instagram Safe Zone Guide (Outfy)](https://www.outfy.com/blog/instagram-safe-zone/)
- [IG Reels Dimensions & Safe Zones (getKoro)](https://getkoro.app/blog/instagram-reels-dimensions)
- [Safe Zone Overlays for Reels/TikTok/Shorts (Orson Lord)](https://orsonlord.com/articles/free-safe-zone-overlays-for-reels-tiktok-and-shorts)
