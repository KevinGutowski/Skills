# Input: Touch Screens

Distilled from Dan Hollick, *Making Software* — chapter: touch-screens (makingsoftware.com/chapters/touch-screens). Purchased content, adapted; quote sparingly. Short quotes below are cited.

## Contents

- [Resistive touch screens](#resistive-touch-screens) — voltage gradients, why they were spongy
- [Capacitive touch screens](#capacitive-touch-screens) — mutual capacitance, sequenced driving, multi-touch
- [Tracking touches across frames](#tracking-touches-across-frames) — Hungarian algorithm, hysteresis
- [Fingerprint sensors](#fingerprint-sensors)

---

The wonder of a touch screen is that one panel is simultaneously "a high-resolution display and a high-resolution input device" (Hollick, *Making Software*, makingsoftware.com/chapters/touch-screens). The enabling material for both technologies is **Indium Tin Oxide (ITO)** — a transparent conductor, which lets electrode layers sit invisibly above the display.

Historical note: capacitive screens are the *older* invention (a technology born too early), but resistive dominated for decades — the ATM-stab era. The first iPhone's capacitive multi-touch screen is a big part of why it felt joyful (though the **LG Prada** technically beat it to a capacitive phone screen).

## Resistive touch screens

Two ITO-coated conductive layers — a flexible top sheet and a rigid bottom one — held apart by small spacers every few millimeters. **Pressing physically forces the layers into contact, closing a circuit** (hence the required firm push).

Position readout uses **voltage gradients**: the bottom layer has voltage on one horizontal side and ground on the opposite, so its resistive material forms a voltage gradient across x. When the layers touch, the measured voltage at the contact reveals the **x-position**. Then the roles flip — voltage is applied to the top layer, which is oriented 90° to the bottom — and the same readout gives **y**.

Failings: needed real pressure, mediocre accuracy, and **no practical multi-touch** — multiple simultaneous contact points confuse the voltage reading (workarounds existed but were rarely shipped).

## Capacitive touch screens

The key fact: **your finger conducts electricity.**

Construction: two layers of *discrete* transparent electrodes (not continuous sheets) — bottom layer in **columns** (the **driving layer**), top layer in **rows** (the **sensing layer**) — separated by a thin **dielectric** so they're close but never touch. Where rows cross columns, a **mutual capacitance** forms, projecting an electrostatic field that extends out past the glass.

A finger approaching the screen disturbs that field, changing the mutual capacitance at nearby intersections; the sensing rows detect the change.

**How x is known**: the driving columns are *not* all powered at once — they're **driven one at a time in sequence, many times per second**. The active column at the moment of detection gives x; the sensing row gives y. The same sequencing is what makes **multi-touch** work: with only one column live at a time, multiple rows can each report changes unambiguously.

**Precision**: a fingertip covers tens of intersections, so the OS computes a **weighted average (centroid)** of the disturbed intersections — the reported touch point can lie between electrodes, which is how a coarse electrode grid yields fine coordinates.

## Tracking touches across frames

Two problems sit above the raw sensing:

1. **Linking touches into gestures** — touches on frame 1 must be matched with touches on frame 2 to form drags and pinches. The OS uses the **Hungarian algorithm**: build a cost function from the distances between all point pairs across frames and match the closest assignments efficiently, even with many simultaneous touches.

2. **Noise and hover flicker** — a finger disturbs the field *before* it touches the glass, so a finger hovering at the threshold would flicker between down and up. The fix is a **hysteresis loop**: the signal threshold to register touch-*up* is set much lower than the threshold to register touch-*down*, so the same input level produces different outputs depending on the current state. No flicker.

## Fingerprint sensors

Capacitive fingerprint sensors (the pre-optical generation) are the same idea miniaturized: electrodes **about the width of a human hair**, fine enough to resolve individual ridges. Because a full-resolution capacitance picture is wanted, the electrodes aren't arranged as rows/columns but as a dense **grid of tiny capacitors**, building a map of ridges (close → higher capacitance) and valleys. (Matching the resulting ridge map uses Gabor filter banks — see effects-and-compression.md, sharpening/edge detection.)

## Design takeaways

- Touch coordinates are *computed*, not sensed directly: centroid math over a disturbed field. There is inherent noise and smoothing upstream of every touch event you receive.
- Touch-down and touch-up are asymmetric by design (hysteresis) — the hardware itself debounces.
- Multi-touch is a scanning trick, not extra sensors; gesture continuity (which touch is which finger) is an assignment problem solved per frame.
- Capacitive screens need a conductive object — hence gloves failing, and capacitive styluses being conductive-tipped.
