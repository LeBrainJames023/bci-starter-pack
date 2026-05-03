# Hockey — Game Plan

## Status

v1 scope locked (2026-05-03). **Slap Shot mode only for v1.** Goalie mode and Penalty Shot mode are parked for v1.5+ — both surface as "Coming Soon" cards on the in-game mode-select so the full hockey identity is visible from day one.

---

## v1 Scope (Locked)

### Modes

- **Slap Shot** — single playable mode for v1
- **Goalie** — appears in the in-game mode-select menu as a "Coming Soon" card (not clickable)
- **Penalty Shot** — appears in the in-game mode-select menu as a "Coming Soon" card (not clickable). This is where the iconic skate-in-and-deke breakaway lives in v1.5+, intentionally separated from Slap Shot so each mode keeps a distinct feel.

### Camera & View

- **Behind-shooter, three-quarter top-down tilt** — same family as the QB Targets behind-QB camera, applied to hockey
- Shooter silhouette in the lower foreground, back of jersey visible
- Ice surface recedes upward toward the goal at the upper portion of the screen
- Goal frame, goalie silhouette, and the 5 zones clearly readable in the upper area
- Static goalie covers the center of the net — the 5 zones are literally the visible gaps around him

### Shooter Position

- **The slot** — roughly 15 ft out, dead center of the offensive zone
- Stationary for v1. No skating, no movement. (Movement lives in Penalty Shot v1.5+.)

### The Read — Cursor Side + Click Color → 5 Zones

Each shot has two attributes the player must read independently:

- **Side (left / right of midline)** — picked by cursor position
- **Height / area (top / five-hole / bottom)** — picked by which click

#### Color → Zone mapping

Mapped to natural finger progression top-to-bottom (index → middle → ring), with the five-hole sitting on the middle finger because it's the dead-center read:

| Click  | Finger | Color  | Zone                      |
| ------ | ------ | ------ | ------------------------- |
| Left   | Index  | Blue   | Top corner (cursor side)  |
| Right  | Middle | Orange | **Five-hole** (any side)  |
| Middle | Ring   | Purple | Bottom corner (cursor side) |

Blue and Purple read cursor side. Orange always = five-hole regardless of cursor side, since five-hole is dead center. Five zones reachable: TL, TR, FH, BL, BR.

### Shot Resolution

- **Goal** — correct color clicked within the shot clock, with cursor on the correct side (Blue/Purple only — Orange ignores cursor side)
- **Wrong side** — puck hits the goalie or the wrong post. Save.
- **Wrong color** — puck goes to the wrong height/area. Save.
- **No click in time** — shot clock expires. Missed opportunity, no goal.
- **Side-band tolerance** — small dead zone around the midline so cursor jitter near center doesn't punish unfairly (configurable in settings)

### Shot Clock

- **6 seconds per shot** in v1 (default)
- Generous on purpose — pairs with the BCI rule that GOOD windows should span ~75% of the action duration
- 10-shot round = ~1 minute, 20-shot round = ~2 minutes worst case
- Tunable via settings slider

### Round Structure

- **Round length picker on menu**: 10 shots OR 20 shots (mirrors Goalie/Striker)
- Each shot: pre-shot pause → shot clock starts → cursor + click → resolve → next shot
- HUD: Shot # / Goals / Streak / Shot clock countdown
- Round-end overlay: Goals / Shot % / Best Streak / Play Again / Home

### Difficulty Ramp

**None in v1.** Difficulty is held flat across the round to keep the v1 read isolated. The full difficulty system arrives in v2 as a goalie behavior slider (see Long-Term Vision) — the goalie becomes more active and more predictive, including pattern-detecting if the player keeps aiming at the same zone.

### Settings (in-game, overrides global)

- Cursor sensitivity
- Side-band tolerance (how forgiving the left/right midline split is)
- Shot clock duration (default 6s)
- Reset to defaults
- Replay round

### Analytics

- **Per-zone accuracy** — TL / TR / FH / BL / BR (which zone is the player's weakest read)
- **Per-color accuracy** — Blue / Orange / Purple (which click is weakest)
- **Per-side accuracy** — left vs right of midline (does the player favor a side)
- **Last 10 rounds** — goals / shots / shot %
- Persisted under `hockey` key in `bci-analytics.js`

### Visual Identity

- **White ice surface** with subtle perspective taper toward the goal
- **Red center line** across the rink
- **Two blue lines** flanking the center
- **Faceoff circles** — center dot and the two offensive-zone circles
- **Blue goal crease** in front of the goal mouth
- **White goal frame** with red posts/crossbar accents and visible netting
- **Red goal lights** at the upper corners of the goal — flash on a goal scored
- **Goalie silhouette** (lo-fi, like the QB Targets receivers) covering the center of the net
- **Shooter silhouette** in the lower foreground, back of jersey visible, stick visible
- BCI input colors (blue / orange / purple) appear on the **click hint legend and the zone tints only** — never on the rink, never on the goalie, never on the shooter's jersey

### Walkthrough (BCI standard)

First step must teach the floating cursor / point-and-click action before introducing the click colors (per the universal BCI walkthrough rule).

---

## Long-Term Vision

- **Camera tilt v2** — drop the camera height a touch and pull it slightly more behind the shooter so the player's pads, arms, stick, and shooting motion read with depth instead of as a top-down silhouette. Still mostly overhead — think NHL '94 / classic arcade-hockey 3/4 view, not a true third-person chase cam. Two constraints to respect: (1) the 5-zone read must stay obviously the gaps around the goalie — too much tilt compresses the top corners and breaks the read, (2) the rink line perspective (faceoff circles, goal/blue lines) needs a stronger taper to match the new angle. Will likely require revisiting `RINK` geometry and adding a perspective scale factor.
- **Goalie mode (v1.5)** — hockey-side counterpart. Pucks come at the goal from various rink positions; cursor + color read to save. Same finger→zone progression so the read transfers between modes.
- **Penalty Shot mode (v1.5+)** — skate-in breakaway from center ice, goalie comes out to challenge, deke + shoot on a single chance. This is where movement and "make your own move" live.
- **Goalie difficulty slider (v2)** — Easy / Medium / Hard for Slap Shot. Controls how active and how predictive the goalie is. Hard mode pattern-detects the player's recent aim history and shifts to cover the favored zone.
- **Power shot layer (v2+)** — held-click power shot vs. quick wrist shot, layered on top of the base color-match. Held out of v1 since all three clicks are consumed by zone ID.
- **Period-based scoring with a real clock** — full-game structure replacing fixed-shot rounds.
- **Ice atmosphere polish** — skate marks, puck trail, crowd silhouette swells, organ stings, goal-light flash + horn on a goal.
- **Slap shot from the point / blue line** — a second shot position later, longer distance, smaller goal target.
- **Penalty Shootout mode** — alternating Slap Shot and Penalty Shot rounds, sudden death after 5.

---

## Currently Building

v1 MVP (locked spec above) — not yet started. Awaiting user review of this plan before any code lands.

## Up Next

- Build single-file `games/hockey/index.html` matching the Hackey Sac / QB Targets / Goalie-Striker pattern
- Wire all four shared modules (input, settings, analytics, shell)
- Behind-shooter three-quarter view, ice perspective taper, static goalie, 5-zone goal
- Mode-select menu with Slap Shot (Play) + Goalie (Coming Soon) + Penalty Shot (Coming Soon)
- Round length picker (10 / 20)
- Shot clock per shot (6s default)
- Settings panel with the sliders + replay + reset
- Analytics view with per-zone, per-color, per-side breakdowns
- Walkthrough overlay (cursor first, then click colors)
- After MVP plays, screenshot pass for visual tuning
- Update launcher: flip Hockey from Coming Soon → Live, increment Live count

## Known Issues

None yet — pre-build.

## Tech Notes

- Plain HTML/canvas, single-file pattern
- **Perspective taper**: rink elements (lines, circles, crease) draw with Y-based scaling so the rink visually recedes toward the goal — fakes the 3/4 tilt without true 3D
- **Side detection**: midline x = canvas width / 2, with `±sideBandPx` tolerance dead zone
- **Click → zone mapping** uses the standard fingers schema (clickId 0/1/2 = blue/orange/purple → top corner / five-hole / bottom corner; cursor side resolves left vs right for blue/purple)
- **Shot resolution** fires on click during the shot clock window: check (clicked color matches a valid zone color) AND (for blue/purple, cursor side matches shot side); orange always resolves five-hole
- **Static goalie**: a single silhouette layer drawn over the center of the goal mouth, sized so the 5 zones are visually obvious as the gaps around him
- **Modal pause pattern** from QB Targets / Goalie-Striker — opening Settings or Stats during a shot freezes the shot clock and shot state
- **Goal-light flash** on a goal: red corner lights pulse, optional brief screen shake (very subtle), HUD goals counter ticks
