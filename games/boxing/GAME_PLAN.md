# Boxing — Game Plan

## Status

v1 Live — 2026-05-02. All 9 build checkpoints shipped end-to-end.

## v1 MVP — One-Liner

A first-person POV boxing match built around a slow-motion exchange loop. Either fighter can initiate; whoever does throws a 4-punch combo while the other defends. Round ends at KO or 90s.

## Camera & Setting

- First-person POV, opponent centered in frame, player's gloves visible at bottom edges
- Minimal ring rope detail at frame edges, crowd silhouette, ambient lighting
- Both fighters animate a subtle real-time bobbing idle when no exchange is active

## Universal Inputs (BCI standard)

- **Cursor** — floats freely, controls aim during combo phase
- **Blue (left click)** — head shot
- **Orange (right click)** — body shot
- **Purple (middle click)** — ribs / liver shot

Color identity is locked across the pack. The body-part mapping is boxing-specific.

## The Exchange Loop

The whole game is built around one repeating loop. Each exchange runs ~12-15 seconds.

1. **Idle.** Real-time bobbing for both fighters. Tense, no clicks expected.
2. **Initiation roll.** Random per exchange (50/50). Either you click to initiate, or opponent winds up with a tell and initiates first.
3. **Combo phase (offense).** Time slows (~30% default). Four colored windows open across the opponent's body — head, body, ribs locations. Each window has a shrinking hit box that closes on its own (since both fighters are still moving even in slow-mo). Click matching color while inside a window = clean punch landed.
4. **Counter phase (defense).** Opponent throws back. Four incoming punches show as Guitar Hero closing rings — colored target with a white ring contracting toward it. Click matching color before the ring meets the target = dodge. Miss or wrong color = eat the punch.
5. **Recovery.** Brief beat, fighters re-settle, back to idle.

Initiative order flips the sequence within an exchange:

- **Player initiates** → combo phase first, then counter phase
- **Opponent initiates** → counter phase first, then combo phase

Either way, every exchange contains both halves.

## Round Structure

- One round, **90 seconds**. Fits ~6 exchanges comfortably.
- Two health bars (player + opponent), 100 HP each.
- KO triggers if either bar reaches zero before time expires.
- If timer expires with both standing, higher remaining health wins.

## Damage Model

- Landed punch (combo): **10 HP** to opponent — perfect 4-punch combo = 40 HP
- Missed dodge (counter): **12 HP** to player — 4 missed dodges in a row = 48 HP, near-KO
- Missed punch (wrong color or window closed): **0 damage**, no penalty in v1
- Wrong-color click during dodge: counts as miss, eat the punch

## Settings — Per-Game Overrides

The game's own settings panel overrides global launcher settings while in boxing. This is a pack-wide pattern (every game gets its own panel).

**Universal sliders (override globals)**

- Cursor sensitivity
- Click toggles — enable/disable any of blue/orange/purple (at least one must stay on)

**Boxing-specific**

- **Slow-mo intensity** — how much time slows during combo (default 30%, range 10-50%)
- **Window size** — combo-phase hit box base size (small / medium / large)
- **Window duration** — how long combo windows stay open before fully closing (faster / normal / slower)
- **Counter ring speed** — how fast the white ring contracts during dodge (faster / normal / slower)
- **Reset to defaults**

## Analytics

Per-session and aggregate, persisted under `boxing` key. Last 10 sessions visible in-game.

- Punches thrown / landed / missed (per color)
- Dodges attempted / succeeded / missed (per color)
- Outcomes: KO win / KO loss / decision win / decision loss
- Average exchange duration

## Long-Term Vision

Carried over from initial plan, augmented with what came out of the v1 design:

- **Multiple opponents** with different combo lengths, counter speeds, and tells
- **Variable combo length** — risk/reward picking 5-punch (more damage, more to dodge back) over 3-punch (safer, less damage)
- **Multi-round matches** — 3 rounds, corner rest between rounds (recover ~25 HP)
- **Stamina meter** depleting with missed punches
- **Power combos** — specific color sequences (blue-orange-blue) trigger a finisher animation + double damage
- **Visual flair** — impact flashes, screen shake on big hits, slow-mo zoom on near-KOs
- **Sound design** — slow-mo whoosh on combo entry, glove thuds, crowd reactions, bell
- **Block + parry** as a third defensive option alongside dodge

## Currently Building

Nothing active. v1 is Live and the launcher card has been flipped.

## Up Next

v1.5 territory (parked for a follow-up session):

- Variable combo length (3 / 4 / 5 punches with risk-reward) instead of fixed 4
- Multiple opponents with different combo speeds and tells
- Multi-round matches with corner rest between rounds
- Real time-multiplier on the round timer during slow-mo (currently just visual)
- HP bar damage tick animation instead of instant snap
- Sound design pass: bell, glove thuds, slow-mo whoosh, crowd reactions

## Build History

All 9 checkpoints shipped 2026-05-02:

1. Scene + HUD foundation, idle bob
2. Initiation logic (random per exchange, opponent tell)
3. Combo phase (slow-mo, 4 windows, color match)
4. Counter phase (Guitar Hero closing rings, dodge resolution)
5. Damage model + KO check + round-end overlay
6. Settings panel (per-game overrides)
7. Analytics view
8. Visual polish pass (real fighterClock slow-mo, hit shake, KO flash, crowd density)

A 1.5 visual fix-up landed between checkpoints 1 and 2: tighter opponent silhouette (single-path torso with rolled shoulders), forearms properly attached with depth shading, player gloves reshaped with thumb / knuckle / cuff / brand stripe detail.

## Known Issues

None yet — pre-build.

## Tech Notes

Vanilla HTML + canvas should be enough through v1. Slow-mo is a single time-multiplier on the game tick — no engine-level dependency. Phaser only escalates if combo/counter animation work piles up later.

Reuses shared modules: `bci-input.js` (clicks + cursor), `bci-settings.js` (per-game settings), `bci-analytics.js` (stats), `bci-shell.js` (viewport + Home button).
