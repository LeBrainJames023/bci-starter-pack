# Future Features

Ideas and planned games captured here to prevent scope creep during active builds.
Nothing in this file gets built until the current feature is complete.

---

## Planned Games

### BCI Hoops (Basketball)

- Floating cursor controls a glowing basketball
- Rotating backboard/rim with 3 colored zones
- Click matching color to shoot when ball is near the right zone
- BCI bonus: dwell-time mechanic slightly widens the sweet spot
- Analytics: per-click accuracy on different rim positions, reaction time, hold time

**Hoops — streak feedback.** Once the v1 round flow is solid, layer in visible streak rewards: crowd noise that swells as the streak builds, and a screen shake / rim flash on long streaks. Held out of v1 to keep the first shipping pass focused on core mechanic feel.

**Hoops — Three-Point Contest (NBA 5-rack format).** Replace the current rotating-rim Three-Point mode with the classic NBA 3-point contest layout: 5 ball racks placed at the 5 standard 3-point spots — corner, wing, top, wing, corner — perfectly arced around the line. Player shoots through a rack of 5 balls before the rack rotates to the next spot. Last ball at each rack is the money ball worth 2 points. 25 shots total, max possible score 30. Strong NBA flavor; supersedes today's single-position 3PT once the 9-Shot Drill mode (v2) has soaked in. Likely v3 territory.

### BCI QB Targets (Football)

- Cursor acts as quarterback aim
- Moving receiver targets pop up with 3 colors/symbols
- Click matching color/intent to throw before the window closes
- Deep throws: hold + release mechanic
- Analytics: accuracy per target type, reaction time, success under speed pressure

### BCI Goalie / Striker (Soccer)

- Two modes: Goalie (block incoming colored shots) and Striker (kick colored balls at goal)
- Ball trajectory affected by which click is used
- Analytics: blocks vs goals, reaction to shot color, cursor travel distance

**Goalie mode v1 ships first** with a single Penalty Shootout mode (see `games/goalie-striker/GAME_PLAN.md` for locked v1 spec). Striker mode and the items below are deferred to v1.5+.

**Striker mode (v1.5).** First-person view from behind the kicker looking at the goal. Goal divided into 6 colored zones (top-left/mid/right, bottom-left/mid/right). Cursor aims at a zone, click the matching color to shoot. AI keeper present — initially static for v1.5, then learns player tendencies over rounds in v2. Same color/side conventions as Goalie mode so the read transfers between modes.

**Goalie hard mode — true 6-zone grid (v2).** Replaces the "side + color" read with a true 6-zone grid where the cursor must land in one of six specific positions on the goal frame and color is independent of zone. More precision, closer to real keeping, harder for BCI cursor. Unlocks after the player demonstrates competence in the v1 Side+Color mode.

**Penalty Shootout dual mode (v2+).** Alternating Goalie + Striker rounds, sudden death after 5. Requires Striker mode to ship first.

**Curved shots (v2+).** Late-curving balls that change side mid-flight, forcing a re-read. Adds a new dimension on top of the side+color baseline.

### BCI Batter / Pitcher (Baseball)

- Batter: color-coded pitch types, click matching intent at the right moment
- Pitcher: control pitch type/speed by timing which click you use
- Analytics: hit accuracy per pitch type, reaction to pitch color, streak tracking

### Golf

- Putt-putt style through to full driving range
- Click timing and hold duration control swing power and distance
- Different clicks for club selection (chip, iron, driver)
- Old-school mini-clip aesthetic with BCI-optimized input
- Analytics: shot accuracy per club type, power consistency, distance control
- Procedural hole generation: algorithm-built putt-putt holes with easy/medium/hard difficulty settings, unlocking large hole libraries (50+) without hand-design overhead. Deferred from v1 — hand-designed 5–7 holes ship first.

### Hockey

- Slap shot mode and goalie mode
- Fast puck movement across ice with realistic physics
- Click timing controls shot power and direction
- Similar dual-role structure to Goalie / Striker
- Analytics: shot accuracy, save rate, reaction to puck speed

### Boxing

- Move cursor to dodge incoming punches
- Colored targets appear on opponent — click the matching intent to strike
- Round-based with rest between rounds
- Offense + defense mechanics in one game
- Analytics: dodge accuracy, strike accuracy per color, reaction time under pressure

### Archery

- Steady the cursor to hold aim on a moving or static target
- Click timing determines release — too early or late affects trajectory
- Wind and distance variables add challenge
- Precision and tremor-control training — uniquely valuable for BCI users
- Analytics: grouping accuracy, hold steadiness, release timing consistency

### BCI Rally (Tennis / Badminton)

- Side-view court, cursor controls racket
- Incoming shots with 3 colors, click matching color to return with spin/angle
- Badminton variant: slower, higher arcs for more float time
- Analytics: return accuracy per color, rally length, cursor positioning precision

### BCI Range (Sniper / Target Practice)

- Cursor scans left/right across a range or facade
- Targets pop up in windows with color codes
- Friendlies must NOT be clicked — adds decision-making layer
- Analytics: hit rate per color, false positives, reaction time, cursor scan speed

### Tower Defense

- Wave-based click strategy game
- Place and upgrade towers using click inputs
- BCI-friendly large click targets for all placements

### Side Scroller

- Action platformer with click-based movement/attack
- Designed around BCI cursor and click constraints

---

## Game Enhancements

- **Themed Home button color variants.** The shared Home button (joystick + cursor + 3 BCI-color arcade buttons) is currently neutral so it never competes with the click-input colors. Once we have more polish bandwidth, explore subtle per-game theming (e.g. a green tint inside a golf course, white-on-ice in hockey) without ever using the blue/orange/purple click palette on the button itself. Goal: more brand personality per game while keeping click-input semantics untouchable.
- **WebGrid splash motif — more presence.** The single-cell + ghost cursor loop on the menu currently feels subtle and clean. User has flagged interest in making it more colorful / more present down the road — possibly multiple cells at once, brighter color washes, or a denser cycle. Don't touch yet; this is parked until the rest of the splash polish settles.
- Cross-game analytics dashboard in the launcher
- Global BCI profile: click mapping saved once, applied to all games
- Difficulty progression curriculum: guide new users from easiest to hardest game
- Co-op / dual-player mode for applicable games
- Leaderboard (future backend feature)

---

## Infrastructure

- Electron wrapper for Mac/Windows desktop packaging
- Shared `bci-config.js` utility used by all games
- Unified analytics schema across all games
- GitHub Pages deployment so anyone can play the launcher and games from a public URL (free, auto-deploys on push, no server needed)
