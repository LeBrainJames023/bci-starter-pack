# Batter / Pitcher — Game Plan

## Status

In development — v1 (Batter mode only).

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

**Cursor controls bat height — snap-to-zone with adjacent-zone forgiveness.**

- Strike zone is divided into **3 horizontal bands**: HIGH, MID, LOW.
- Each band is generous (~⅓ of strike-zone height).
- The bat **floats with the cursor** when the cursor is between bands
  (small sway, follows movement).
- When the cursor enters a band, the bat **snaps and locks** into that
  band with a clear visual cue (glow / square-up).
- Hit math reads the **locked band**, not pixel position.
- **Adjacent-band forgiveness:** right color + right timing + adjacent
  band still scores a single (just not a HR). Two bands off = whiff.

**Swing logic.** Click in the timing window:

- Right color + perfect timing + matching band → **Home Run**
- Right color + good timing + matching band → **Single**
- Right color + okay timing OR adjacent band → **Foul**
- Wrong color → **Swinging strike**
- No click in window → **Called strike**

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

Checkpoint 1 — scene foundation: stadium backdrop, pitcher silhouette,
strike zone with 3 bands, batter silhouette, snap-to-zone bat behavior.
No pitches yet.

## Up Next

Checkpoint 2 — pitch travel & timing window. Ball spawns at pitcher,
travels with pitch-type-specific flight time, contact moment is
detected.

## Known Issues

None yet.

## Tech Notes

Plain HTML/canvas. No Phaser. Mirrors the architecture used in
Goalie/Striker (single-file `index.html`, shared modules from
`/shared/`, perspective-tapered field rendering).

The snap-zone bat is the v1 signature mechanic. Tune it until the lock
feel is satisfying before adding any pitch logic on top.
