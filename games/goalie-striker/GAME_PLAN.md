# Goalie / Striker — Game Plan

## Status

v1 scope locked (2026-05-01). Goalie mode only for v1. Striker mode parked for v1.5 — placeholder card surfaces in the in-game mode menu.

---

## v1 Scope (Locked)

### Mode

- **Penalty Shootout (Goalie)** — single playable mode for v1
- **Striker** — appears in the in-game mode-select menu as a "Coming Soon" card (not clickable). Keeps the dual-mode identity visible without scope creep.

### Camera & View

- **First-person goalkeeper** — looking out at the penalty spot, ball grows as it flies in
- Goal frame visible at top, crossbar, posts, net
- Penalty spot, six-yard box, grass perspective taper
- Stadium silhouette / crowd in the background (low-fi, similar to QB Targets crowd)
- Goalie's gloves visible at bottom of screen, slide left/right with cursor for embodied feel

### The Read — Position + Color

Each shot has two attributes the player must read independently:

- **Side (left or right of midline)** — picked by cursor position
- **Height (top / middle / bottom)** — picked by which click

#### Color → Height mapping

Mapped to natural finger progression top-to-bottom (index → middle → ring):

| Click  | Finger | Color  | Height        |
| ------ | ------ | ------ | ------------- |
| Left   | Index  | Blue   | Top corner    |
| Right  | Middle | Orange | Middle        |
| Middle | Ring   | Purple | Bottom corner |

A shot heading top-right requires: cursor right of midline **and** blue (left) click. Two reads, one click. All six zones (TL, ML, BL, TR, MR, BR) are reachable.

### Save Resolution

- **Save** — cursor on correct side + correct color clicked while ball is in flight
- **Wrong side** — goalie dives the wrong way, ball goes in. Goal.
- **Wrong color** — goalie commits the wrong height on the right side, ball goes in. Goal.
- **No click in time** — ball hits net. Goal.
- **Side-band tolerance** — small dead zone around the midline so cursor jitter near center doesn't punish unfairly (configurable in settings)

### Round Structure

- **Round length picker on menu**: 10 shots OR 20 shots (mirrors Hoops 5/9-shot pattern)
- Each shot: pre-snap pause → kicker animation/run-up → ball in flight → resolve → next shot
- HUD: Shot # / Saves / Streak
- Round-end overlay: Saves / Save % / Best Streak / Play Again / Home

### Difficulty Ramp (within a round)

- **Ball speed** climbs linearly from shot 1 → final shot
- **Ball size at impact** shrinks slightly as the round progresses
- **Save window** (time the ball is interceptable in flight) tightens
- Settings sliders override the ramp to make the game easier or harder regardless

### Settings (in-game, overrides global)

- Cursor sensitivity
- Ball size multiplier
- Ball speed multiplier
- Side-band tolerance (how forgiving the left/right midline split is)
- Reset to defaults
- Replay round

### Analytics

- Per-color all-time accuracy (which click is the player's weakest read)
- Per-side all-time accuracy (left vs right — does the player favor a side)
- Last 10 rounds (saves / save %)
- Persisted under `goalie-striker` key in `bci-analytics.js`

### Visual

- Soccer field grass with perspective taper
- White goal posts + net
- Penalty spot, six-yard box, penalty arc
- Kicker silhouette at the far end (lo-fi, similar to QB Targets receiver detail)
- Ball: white with classic black pentagons, tinted faintly with the shot's color so you can read color earlier than the click hint
- Stadium crowd silhouette behind the goal
- BCI input colors (blue/purple/orange) appear on the ball tint and click hint legend only — never on the field

---

## Long-Term Vision

- **Striker mode** (v1.5) — aim at colored zones in the goal, click matching color to shoot. AI keeper that improves over rounds.
- **True 6-zone grid hard mode** — cursor must land in one of six specific zones, color independent. More precision, more like real keeping. Unlocks after player demonstrates competence in the Side+Color mode.
- **Penalty Shootout dual mode** — alternating goalie + striker rounds, sudden death after 5
- **Curved shots** — late-curving balls that change side mid-flight, forcing a re-read
- **Crowd atmosphere** — swelling noise on streaks, gasp on goals against
- **Keeper personality** — different keeper styles with different reach / reaction profiles

---

## Currently Building

v1 MVP (locked spec above).

## Up Next

- Build single-file `games/goalie-striker/index.html` matching Hackey Sac / QB Targets pattern
- Wire all four shared modules (input, settings, analytics, shell)
- First-person view, kicker run-up, ball-in-flight, side+color resolution
- Mode-select menu with Goalie (Play) + Striker (Coming Soon) cards
- Round length picker (10 / 20)
- Settings panel with the 4 sliders + replay + reset
- Analytics view
- After MVP plays, screenshot pass for visual tuning

## Known Issues

None yet — pre-build.

## Tech Notes

- Plain HTML/canvas, single-file pattern
- First-person ball growth: ball renders as a circle with radius driven by `(elapsed / flightDuration) * sizeMultiplier`, with a parabolic Y arc for trajectory feel
- Side detection: midline x = canvas width / 2, with `±sideBandPx` tolerance dead zone
- Click → height mapping uses the standard fingers schema (clickId 0/1/2 = blue/purple/orange)
- Save resolution fires on click during flight: check (cursor side matches shot side) AND (clicked color matches shot color)
- Modal pause pattern from QB Targets — opening Settings or Stats during flight freezes ball position
