# Batter / Pitcher — Game Plan

## Status

LIVE — v1 (Batter mode only). Shipped 2026-05-03.

## v1 Locked Spec — Batter Mode

**POV.** Behind-batter, third-person. Pitcher visible in mid-distance on the
mound; strike zone visible in foreground at home plate; batter silhouette
in the bottom-right with the bat extending into the zone.

**Three pitch types, color = pitch identity.**

| Click  | Color  | Pitch     | Behavior                                                    |
| ------ | ------ | --------- | ----------------------------------------------------------- |
| Left   | Blue   | Fastball  | Fastest flight, straight to its target zone                 |
| Right  | Orange | Curveball | Slower flight, larger arc visual                            |
| Middle | Purple | Changeup  | Slowest flight, looks like fastball release then drops late |

In v1 each pitch travels on a **fixed trajectory** to its target zone — no
mid-flight breaking. Curveball and changeup difficulty comes from speed
and timing deception, not trajectory shifts. (Real breaking pitches:
v1.5.)

**Color visible at release.** The ball leaves the pitcher's hand already
tinted with its pitch-type color. Player has the entire flight to read
color and react. (Late-reveal: v1.5+.)

**Cursor controls bat — free-cursor mode (NOT snap-to-zone).**

The locked spec originally called for snap-to-zone with 3 bands. Mid-
build playtest showed snap felt clunky and 3 bands was too granular,
so v1 ships with:

- The bat tip follows the cursor Y directly (no snap).
- A pulsing color-tinted **target marker** at the pitch's landing
  point gives the spatial cue for where to put the bat.
- Hit math is **proximity-based**: cursor within 35px of the pitch
  landing Y = on the pitch; within 70px = made contact (foul); beyond
  = whiff.

**Swing logic.** Click in the timing window:

- Right color + cursor on pitch (≤35px) + perfect timing → **Home Run**
- Right color + cursor on pitch (≤35px) + good timing → **Single**
- Right color + cursor near pitch (≤70px) → **Foul** (got a piece)
- Right color + cursor way off (>70px) → **Strike** (whiff, wrong height)
- Wrong color → **Strike** (swung at the wrong pitch)
- No click in window → **Strike** (called strike, no swing)

**Timing windows.** Wide enough that any reasonable swing during the
pitch's last ~75% of flight registers contact:

- Perfect window: ±250ms around ball arrival → HR upgrade
- Good window: ±1500ms around arrival → swing registers as Single

**Pitch flight times** (v1 default — tunable via Settings):

- Fastball: 2.0s
- Curveball: 2.4s (with cosmetic mid-flight upward arc)
- Changeup: 2.8s

**Round structure.** 10 pitches per round. End screen shows HR / Hit /
Foul / Strike split, batting average, slugging percentage.

**HUD.** Pitch (n/10), Hits, HRs, AVG, current streak.

**Settings.** Cursor sensitivity, pitch speed multiplier, strike-zone
band-tolerance (forgiveness on band edges).

**Stats.** localStorage via `BCI.saveSession`. Per-pitch-type accuracy,
per-zone connect rate, recent rounds.

## Long-Term Vision

See `FUTURE_FEATURES.md` for the full v1.5 / v2 / long-term backlog.
Highlights:

- Pitcher mode (v1.5)
- Power swing mechanic (v1.5)
- Real breaking pitches (v1.5)
- Plate discipline / balls vs strikes (v2)
- Home Run Derby mode (v2+)
- Career / season mode (long-term)
- Fielding mode (long-term)

## Currently Building

Nothing — v1 shipped. v1.5 polish + Pitcher mode live in
`FUTURE_FEATURES.md`.

## Up Next

When ready to circle back: bat-on-ball contact animation (replaces the
v1 post-contact ball pop), Pitcher mode prototype, plate discipline
(balls vs strikes).

## Known Issues

None yet.

## Tech Notes

Plain HTML/canvas. No Phaser. Mirrors the architecture used in
Goalie/Striker (single-file `index.html`, shared modules from
`/shared/`, perspective-tapered field rendering).

The snap-zone bat is the v1 signature mechanic. Tune it until the lock
feel is satisfying before adding any pitch logic on top.
