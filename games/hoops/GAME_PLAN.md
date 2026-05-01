# BCI Hoops — Game Plan

## Status

v2 in progress — adding 9-Shot Drill mode, revising Free Throw to a single-color
aim-lock mechanic, leaving Three-Point unchanged. NBA 3-Point Contest format
deferred to v3 (see FUTURE_FEATURES.md).

## Locked v2 Spec

**Free Throw — revised mechanic.** Stationary rim, no rotation. Each shot the
_entire_ rim takes one solid color (blue / orange / purple, ~33% each, repeats
fine), but the color is _hidden_ during initial aim. Two-click flow per shot:

1. Cursor on rim → click any color → aim locks; rim color reveals.
2. Click matching color → fires the shot.

Wrong-color second click fires and misses (color discipline rule preserved).
Off-rim first click ignored. Once aim is locked, second click position doesn't
matter — pure color-match input. Closing white ring around the rim telegraphs
the shot timer (same telegraph idiom as Putt-Putt).

- Shot timer: 2.5s default, both clicks must complete inside it. Toggleable in
  Settings (off = unlimited time). Per-game setting under `bciGameSettings:hoops`.
- Round structure: pre-round picker for **10-Shot Drill** or **20-Shot Drill**
  (same mechanic, different commitment).
- Analytics: rebuild bucket as `hoops-ft-v2` so v2 stats start clean. Old v1
  bucket data is dev-only noise and can be discarded.

**9-Shot Drill — new mode.** 3×3 grid of hoop positions: 3 distances (close /
mid / deep) × 3 lateral positions (left / center / right). One hoop spawns at a
random spot per shot (1/9 each, repeats allowed — variety from round length).

- Player fixed at center, stick figure with subtle lean toward the active
  hoop's column. Camera nudges gently in the same direction.
- Cursor controls 2D aim. Dotted trajectory preview arc updates in real time
  showing where the ball would land if fired right now.
- Click color = power band: blue=close (row 1), orange=mid (row 2),
  purple=deep (row 3). Hoop's row determines the correct color.
- Wrong-color click fires anyway and misses (consistent with FT/3PT rule).
- Click only registers if cursor is in a "catch zone" near the active hoop;
  off-target clicks ignored.
- Backboards drawn at row-appropriate perspective scale (back row smallest,
  front row largest).
- Per-shot soft timer: 2.5s. Hoop fades out and round advances (counted as
  miss) on timeout.
- Round structure: 15 shots fixed for v2 first cut. Marathon (30) reserved
  for a later iteration.
- Analytics bucket: `hoops-9shot`. Per-row + per-color accuracy, reaction time
  per click, longest streak.

**Three-Point — unchanged in v2.** Same rotating colored rim mechanic that
shipped in v1. NBA 5-rack format captured in `FUTURE_FEATURES.md` for v3.

## v2 Checkpoints

1. Refactor FT to single-color stationary rim + 10/20 sub-mode picker +
   two-step click flow + closing-ring timer + Settings timer toggle.
2. Scaffold 9-Shot mode: state machine entries, mode-select card, baseline
   plumbing.
3. 9-Shot scene: 3×3 hoop grid spawn logic with per-row perspective scaling.
4. 9-Shot player rendering: stick figure + lean toward active column + camera
   nudge.
5. 9-Shot trajectory preview: dotted arc that follows the cursor in real time.
6. 9-Shot click handling: cursor-near-hoop check + power-band color match.
7. 9-Shot per-shot soft timer (2.5s, timeout → miss + auto-advance).
8. 9-Shot round flow (15 shots) + integration with results overlay + analytics
   bucket.

## Currently Building

v2 — checkpoint 1 next: FT mechanic refactor.

---

## Locked v1 Spec (archival — superseded by v2)

**Mechanic.** Cursor is the aim reticle, ball sits at a fixed launch point.
Clicking fires the ball in an arc toward the cursor's position on the rim.
~300ms flight time. On arrival, score if (cursor on rim) AND (zone color
under cursor matches the click color). Otherwise miss. Wrong color over the
right zone fires anyway and counts as a miss — the muscle-memory training
value of the game depends on color discipline.

**Rim.** Clock-face rotation, in-plane around the hoop center. Three equal
arcs colored blue / orange / purple. Net stays neutral white. Rim rotation
speed ramps up across each round.

**Modes.** Mode select screen → Free Throw or Three-Point. Each is a
10-shot round and tracks its own stats. Three-point pulls the camera back
and lengthens flight time slightly so prediction matters more.

**HUD.** Score, miss, current streak top-center. Settings + Home button in
corners (shared Home component).

**Round flow.** 10 shots, end-of-round screen showing makes, accuracy,
longest streak, with Play Again + Mode Select + Home buttons.

**Aesthetic.** Gym scene: wood floor, dim crowd silhouettes, warm
spotlight on the hoop. Backboard, rim, neutral-white net, neutral-orange
basketball at the launch point. Dark launcher palette compatible.

**Inputs.** Left = blue, right = orange, middle = purple. No drag, no
hover-only, no keyboard.

**Analytics.** `bci-analytics.js` standard schema. Per-mode accuracy,
per-color accuracy, reaction time per shot, longest streak. Stored under
`hoops` game id.

## v1 Checkpoints (archival — all shipped)

1. ✅ Folder + index.html scaffold + locked spec + FUTURE_FEATURES entry.
2. ✅ Static gym scene — floor, crowd, spotlight, backboard, rim, net, ball.
3. ✅ BCI cursor reticle (large, BCI-friendly, on-rim highlight).
4. ✅ Clock-face rim rotation with three colored arcs.
5. ✅ Click-to-shot arc animation (~300ms flight).
6. ✅ Hit detection at arrival (cursor on rim + zone color + click color).
7. ✅ HUD (score / miss / streak) with make/miss feedback.
8. ✅ 10-shot round structure + end-of-round results screen.
9. ✅ Mode select for Free Throw vs Three-Point with separate stats.
10. ✅ Difficulty ramp on rim rotation speed across the 10 shots.
11. ✅ Analytics integration.
12. ✅ Settings panel (cursor sensitivity, replay, mode select).
13. ✅ Home button + launcher card flipped to Live + game count bumped.

## Long-Term Vision

- Dwell-time mechanic: holding cursor steady briefly widens the sweet spot.
- Streak feedback: crowd noise + screen shake + rim flash (logged in
  FUTURE_FEATURES.md, deferred from v1).
- Multiple shot positions beyond FT and 3PT: corner three, half-court,
  dunk challenges at close range.
- Difficulty knobs beyond rotation speed: zone-shrink (neutral gaps in the
  rim), longer flight time.

## Tech Notes

Plain HTML/canvas, single-file `index.html` to match Hackey Sac, WebGrid,
and Putt-Putt. Loads `shared/bci-analytics.js`, `shared/bci-input.js`,
`shared/bci-settings.js`, and `shared/bci-shell.js`. No engine needed for
v1 — rim is a rotating ring drawn with three arcs, ball is a tweened
sprite, hit check is a single timing test on arrival.

## Known Issues

None yet.
