# BCI Hoops — Game Plan

## Status

v1 in progress.

## Locked v1 Spec

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

## v1 Checkpoints

1. Folder + index.html scaffold + locked spec + FUTURE_FEATURES entry.
2. Static gym scene — floor, crowd, spotlight, backboard, rim, net, ball.
3. BCI cursor reticle (large, BCI-friendly, on-rim highlight).
4. Clock-face rim rotation with three colored arcs.
5. Click-to-shot arc animation (~300ms flight).
6. Hit detection at arrival (cursor on rim + zone color + click color).
7. HUD (score / miss / streak) with make/miss feedback.
8. 10-shot round structure + end-of-round results screen.
9. Mode select for Free Throw vs Three-Point with separate stats.
10. Difficulty ramp on rim rotation speed across the 10 shots.
11. Analytics integration.
12. Settings panel (cursor sensitivity, replay, mode select).
13. Home button + launcher card flipped to Live + game count bumped.

## Long-Term Vision

- Dwell-time mechanic: holding cursor steady briefly widens the sweet spot.
- Streak feedback: crowd noise + screen shake + rim flash (logged in
  FUTURE_FEATURES.md, deferred from v1).
- Multiple shot positions beyond FT and 3PT: corner three, half-court,
  dunk challenges at close range.
- Difficulty knobs beyond rotation speed: zone-shrink (neutral gaps in the
  rim), longer flight time.

## Currently Building

Checkpoint 1 — scaffold.

## Tech Notes

Plain HTML/canvas, single-file `index.html` to match Hackey Sac, WebGrid,
and Putt-Putt. Loads `shared/bci-analytics.js`, `shared/bci-input.js`,
`shared/bci-settings.js`, and `shared/bci-shell.js`. No engine needed for
v1 — rim is a rotating ring drawn with three arcs, ball is a tweened
sprite, hit check is a single timing test on arrival.

## Known Issues

None yet.
