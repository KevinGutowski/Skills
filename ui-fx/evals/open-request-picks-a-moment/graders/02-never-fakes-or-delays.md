---
type: llm
focus: trace
weight: 1
---

Three things must all hold.

1. The payment request is sent from the click or submit handler (not from pointer-down) without waiting for an animation, and the success flourish is triggered by the real response. Failure has a separate path with no success flourish.

2. First readable frame. Take the first frame painted after the response confirms the payment. In that frame, text stating the outcome (for example "Payment confirmed" or "Paid", or the receipt's heading or amount) is already on screen at full or near-full opacity (0.9 or more) and at its final position, in a place the effect does not cover. It fails if that text starts at opacity 0 and fades in, slides in, sits behind a timer or an awaited animation, or is inside a region that a clip-path, mask, wave, curtain, overlay or copy of the old view still hides in that frame, however briefly. A changed button label counts as the outcome text only if it appears without a fade. Translucent light passing over fully visible text is fine; opaque particles or layers crossing it are not.

3. The rest of the receipt may be revealed progressively, but no fixed hold (a timer or awaited animation that exists only to delay) sits between the confirmation and the reveal starting.
