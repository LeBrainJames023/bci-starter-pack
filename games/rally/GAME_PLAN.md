# Rally — Game Plan

## Status

Planning — v1 spec locked 2026-05-03. Not yet started.

## v1 MVP — One-Liner

A behind-player POV tennis match built around colored incoming returns. Player serves with a rhythmic combo (chance at an ACE), then trades color-matched returns with an AI opponent until someone misses. First to 5 points wins the set.

## Variant Roadmap

- **v1 = Tennis.** Locked here.
- **v1.5 = Ping Pong + Badminton variants.** Same core mechanic, different stance, ball/shuttle speed, court geometry. Ping Pong is faster and tighter; Badminton is slower with higher arcs (gentler for new BCI users).
- Pickleball considered and dropped — too many variants, would dilute the set.

## Camera & Setting

- **Behind-player 3rd-person POV** — looking down the court from over the player's shoulder, AI silhouette visible across the net.
- Same camera family as Batter/Pitcher and QB Targets so the read transfers across the pack.
- Player's racket-arm + back of shoulder visible at the bottom-edge of frame.
- Court recedes into the distance with sidelines, baseline marker, and a clearly readable net at mid-distance.
- Idle real-time bob on the player's stance when no ball is in play.

## Universal Inputs (BCI standard)

- **Cursor** — controls racket position. Floats with center-bias toward a neutral stance; drifts to the side the cursor moves to. A faint vertical center line is visible as a positioning cue.
- **Blue (left click)** — Flat drive (low arc, fast)
- **Orange (right click)** — Topspin loop (high arc, lands deep)
- **Purple (middle click)** — Slice / drop shot (short, low)

Color identity is locked across the pack. The shot-type mapping is rally-specific.

Per-sport neutral stance (used in variant builds):

- **Tennis** — deep baseline, racket low and ready
- **Ping Pong (v1.5)** — close to the table, racket compact
- **Badminton (v1.5)** — mid-court, racket up

## The Rally Loop

Each point runs serve → rally exchange → resolution.

1. **Serve phase (player serves).** Click 1 = ball toss. Then a 3-click rhythmic combo lands a **good serve** that the AI will return. A 4-click ultra-fast tight combo is an **ACE attempt** — chance at an unreturnable winner. Bad rhythm or mistimed clicks = **fault**.
2. **Rally phase.** AI returns the ball with a colored tint. As the ball nears the player's hit window, a **halo ring contracts** around it (same family as Hackey Sac and Hoops timing windows). Player matches the color and clicks within the window = clean return.
3. **AI return.** Successful returns are sent back automatically with a new color. Loop continues until someone misses.
4. **Point resolution.** Whoever misses concedes the point. Server stays the server until the set ends (v1 simplification).

## Serve Combo

Mirrors the Guitar Hero combo language already in Boxing.

| Pattern                            | Result                                                                                                  |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Toss + 3 clicks in clean rhythm    | Good serve. AI returns, rally begins.                                                                   |
| Toss + 4 clicks all fast and tight | ACE attempt. Roll for unreturnable winner; on success, immediate point. On miss, treated as good serve. |
| Toss + bad rhythm / dropped click  | Fault.                                                                                                  |
| Two faults in a row                | Double fault. AI gets the point.                                                                        |

The combo gauge UI is the same pattern Boxing uses for its 4-punch counter.

## Wrong-Color Penalty (v1)

Wrong color _or_ mistimed click = **ball into the net.** Rally ends, opponent gets the point.

Held for v1.5 (the "mistake roulette"): weighted random outcomes per click type — out long, whiff into ground, mishit foul. Each click type biases toward a different mistake so misreads have flavor.

## Scoring

- **Race to 5 points** = wins the set.
- No deuce / advantage in v1.
- After the set, win/lose overlay, option to play again.
- Real tennis scoring (15-30-40, deuce, sets) is v1.5.

## Settings — Per-Game Overrides

The game's own settings panel overrides global launcher settings while in Rally. Same pack-wide pattern.

**Universal sliders (override globals)**

- Cursor sensitivity
- Click toggles — enable/disable any of blue/orange/purple (note: serve combo requires all three for ACE; flag in UI when one is disabled)

**Rally-specific**

- **Halo ring speed** — how fast the timing ring contracts (faster / normal / slower)
- **AI return strength** — easy / normal / hard (affects color-change frequency and incoming ball speed)
- **Serve combo strictness** — how tight the rhythm window is (forgiving / normal / strict)
- **Reset to defaults**

## Analytics

Per-session and aggregate, persisted under `rally` key. Last 10 sessions visible in-game.

- Returns attempted / clean / missed (per color)
- Rally lengths (average, longest of session, all-time longest)
- Serves attempted / good / fault / double-fault / ACE
- Points won vs lost
- Sets won vs lost
- Average reaction time per click color

## Long-Term Vision

- **Ping Pong variant (v1.5)** — same core, faster ball, tighter table, compact racket.
- **Badminton variant (v1.5)** — slower shuttle, higher arcs, more float — the gentle on-ramp variant.
- **Mistake roulette (v1.5)** — replace "always into the net" with weighted random outcomes (out long, whiff, mishit foul) per click type so misreads have flavor.
- **Real tennis scoring (v1.5)** — 15-30-40-deuce-advantage, best-of-3 sets, side-changes.
- **Adaptive AI** — opponent that improves with rally streak length and learns player tendencies.
- **Tournament bracket mode** — single-elimination ladder against AI personalities.
- **Court surfaces** — clay slows the ball, grass speeds it up, hard court is neutral.
- **Curved / spin returns** — late-curving balls that change side mid-flight (cousin of the goalie curved-shots backlog).
- **Cursor positioning precision analytics** — heatmap of where the racket sits vs where the ball lands.

## Currently Building

Nothing active. v1 spec just locked, awaiting kickoff.

## Up Next

Once v1 ships, the v1.5 priority order:

1. Ping Pong variant (highest reuse, fastest to ship)
2. Badminton variant (gentler difficulty, expands user base)
3. Mistake roulette
4. Real tennis scoring
5. Court surfaces

## Build Checkpoints — v1

1. **Court & POV foundation.** Behind-player camera, court receding to net, AI silhouette across, sidelines + baseline + net. Player's racket-arm visible at frame edge. Idle bob on stance.
2. **Cursor + racket movement.** Racket follows cursor with center-bias. Faint vertical center line. Tennis neutral stance (deep baseline). No ball yet — pure movement feel pass.
3. **Incoming ball arc + halo ring.** AI auto-tosses a colored ball that arcs toward the player. Halo ring contracts around it as it approaches the hit window. No return yet — verify the visual read.
4. **Color-match return mechanic.** Three click colors map to three return types. Correct color inside window = animated return arc back to AI side. Wrong color or bad timing = ball into net, rally ends.
5. **AI return loop + rally counter.** AI auto-returns successful shots with a new color. Repeat until miss. On-screen rally counter and best-rally tracking.
6. **Player serve + combo gauge.** Toss click + 3-click rhythm combo. Combo gauge UI (Boxing-style). Bad rhythm = fault. Good serve hands off to rally loop.
7. **Double-fault + ACE mechanic.** Two faults = AI point. 4-click ultra-fast combo = ACE attempt with chance at unreturnable winner.
8. **Score, settings, analytics.** Race-to-5 scoring, win/lose overlay. Settings panel (cursor, halo speed, AI difficulty, combo strictness). Analytics view.
9. **Walkthrough overlay + nav + ship.** First-play walkthrough teaching cursor → click colors → serve combo. Joystick home + back arrow. Update launcher card to Live, bump game count.

## Known Issues

None yet — pre-build.

## Tech Notes

Vanilla HTML + canvas should be enough through v1. Ball arc physics are simple parabolic interpolation — no engine needed. Phaser only escalates if variant builds (ping pong's faster speed, badminton's higher arcs) start fighting the rendering loop.

Reuses shared modules: `bci-input.js` (clicks + cursor), `bci-settings.js` (per-game settings), `bci-analytics.js` (stats), `bci-shell.js` (viewport + Home button), and the walkthrough overlay shared with Boxing.

Closest siblings to copy patterns from:

- **Hackey Sac** — color-match-on-timing return logic, halo ring
- **Batter/Pitcher** — incoming projectile arc, hit window, behind-player POV
- **Boxing** — combo gauge UI for the serve, walkthrough overlay shape
- **Hoops** — race-to-N scoring, set/round overlay
