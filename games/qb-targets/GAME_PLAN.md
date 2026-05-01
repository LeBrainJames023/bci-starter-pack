# QB Targets — Game Plan

## Status

v1 Live. Visual polish pass deferred — functionality validated end-to-end.

---

## v1 — MVP Scope (Locked)

### Camera & Theme

- Behind-the-QB downfield perspective
- Daytime stadium feel: green grass, hash marks
- Receivers stay visually simple in v1 (basic running figures); polish lands in later versions

### Snap Structure (Discrete Plays)

- One snap → receivers run → windows open/close → resolve → next snap
- Pre-snap pause (~400–600ms) shows the formation, then snap and routes begin
- Round = 15 throws (15 plays), end-of-round summary then back to launcher / replay

### Receivers per Play

- 4 receivers spawn each play
- 2–3 of them get an open window (random per play)
- 1–2 are covered (no window opens in v1)
- All routes are straight downfield in v1
- The "deep" receiver moves down the field faster than the others so depth reads visually, even though all windows open at the same time

### Window Mechanic

- Each open window is a colored rectangle around the receiver's chest (blue, orange, or purple)
- Window starts wider and shrinks linearly to nothing — the shrink IS the timer
- Initial window duration ~2.5–3 seconds on play 1, ramps shorter per play (Hoops-style ramp)
- All windows on a given play open simultaneously at the snap

### Aim & Click Rules

- Cursor must be in the same half of the field (left vs right) as the receiver, within a generous Y-band over them
- Plus correct color click
- One click ends the play — first click resolves it, no second chances per snap

### Outcomes

| What you did                                                        | Result       |
| ------------------------------------------------------------------- | ------------ |
| Aim on a windowed receiver + correct color                          | Completion   |
| Aim on a windowed receiver + wrong color                            | Incompletion |
| Aim off-receiver (wrong side / empty / covered receiver), any color | Sack         |
| No click before every window closes                                 | Sack         |

- **Incompletion** = "you read a receiver, picked the wrong color"
- **Sack** = "you didn't have anybody open to throw to"

### Difficulty

- Single mode for v1 (Practice / Game split parked for v1.5)
- Base difficulty + per-play ramp on top
- Ramp shrinks window open-duration as the round progresses

### Visual Feedback

- **Completion**: ball arcs from QB to receiver, green flash, +1 tick
- **Incompletion**: red flash on the windowed receiver that was targeted
- **Sack**: red flash on the QB / "SACKED" tick

### Round End

- Stats panel: Completions / Attempts (15) / Completion % / Best Streak / Sacks
- Streak = completions in a row, broken by incompletion OR sack
- Buttons: Play Again, Home

### Settings (v1)

- Cursor sensitivity slider
- Window size slider (target size forgiveness)
- Window duration slider (timing forgiveness)
- Aim Y-band tolerance slider (vertical forgiveness)
- Replay Round
- Reset Defaults
- Close

### Analytics

- localStorage under `qb-targets`
- Per-session: completions, attempts, completion %, best streak, sacks, reaction time per click, accuracy per color
- Viewable from in-game

---

## v1.5 — Next Up

- Real route variety (slants, posts, outs, corners) — option C from kickoff
- Mode select: Practice vs Game (Hoops FT/3PT pattern)
- Aim thirds (left / middle / right) once middle-of-field routes exist
- Receivers can break open / re-cover mid-route (window opens, then re-closes when the defender catches up)
- Staggered window opens (deep route opens later instead of speed-faking depth)

---

## Long-Term Vision

- Deep-throw hold + release mechanic for long passes
- Blitz pressure: separate play clock that can sack you regardless of windows
- Multiple formations with different receiver layouts
- Speed modes (rookie / pro / all-pro)
- Coverage variety / interceptions on throws into coverage

---

## Currently Building

Nothing active. v1 shipped autonomously without screenshot review — visual
tweaks (camera framing, receiver detail, ball trajectory feel) are next when
the user is ready to spot-check.

## Up Next

- Visual tuning pass on whatever feels off in real play
- v1.5 features per the section above

## Known Issues

None reported yet (no real-play feedback collected).

---

## Tech Notes

- Plain HTML/CSS/canvas, single-file `games/qb-targets/index.html` (matches Hoops / Putt-Putt / WebGrid pattern)
- Canvas handles field, receivers, windows, ball flight; DOM handles overlays (settings, round end, etc.)
- Multiple receivers + ball flight + window animation should run fine; flag if frame rate drops
- Analytics game ID stays `qb-targets` for v1; split if Practice/Game ships in v1.5
