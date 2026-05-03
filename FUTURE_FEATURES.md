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

#### Goalie/Striker — v1.5 polish

Backlog from the v1 ship session — held until the arcade-wide polish sweep so we don't deep-polish a single game while other MVPs are still pending.

**Kicker silhouette.**

- Defined athletic stance (wider legs, slight crouch — currently flat T-pose)
- Foot plant on the ball — visible left or right foot connecting at the strike moment
- Pick a kicking foot per shot direction (left foot for right-side shots, right foot for left-side) so the player gets a tell
- Subtle uniform variation across shots (jersey numbers / kit accents) for variety, or commit to one team identity

**Goalie / keeper POV.**

- Save hand animation — gloves snap up/forward at the click moment to read as a "punch out" or "catch"
- Goal hand animation — gloves drop or freeze on a conceded shot
- Idle nervous energy between shots — subtle camera bob, hands twitching slightly
- Body shadow cast into the goal area for physical presence

**Ball & trajectory.**

- Spin trail / motion wake — faint white streak fading behind the ball as it speeds up
- Exaggerated arc differences — top shots arc higher, bottom shots more like ground drives (apex variance is in code, could be more dramatic)

**Scene & atmosphere.**

- Crowd reactions — silhouette swells/pulses on goals, color flash on streak milestones (3 / 5 / 10 saves)
- Stadium lights bloom — subtle lens-flare on the upper-corner pylons
- Visible netting behind the posts — very subtle diamond mesh fading toward the back
- Worn grass at the penalty spot — slight darker scuff mark for realism
- Night-game lighting variant — could feel iconic for the soccer mode

**HUD & feedback.**

- Prominent streak indicator at 3+ saves (pulse, color shift)
- Last-shot outcome stays visible briefly during the next PRE_SHOT (small ✓ / ✗ icon)
- Tutorial-style hints on misses ("That was a low shot — you needed PURPLE")
- Real-time save % updating during the round, not just at end

**Mechanics that would extend v1 scope (flag before building).**

- Rebounds — saved shot bounces back, second click chance
- Power meter on the kicker for a visible difficulty signal
- Wind / pitch condition modifier

**Cross-cutting (whole-pack, not goalie-specific).**

- Sound system — kick thud, ball whoosh, save smack, goal cheer (needs a shared schema across the pack)
- Heatmap analytics — shot zone heatmap in the Stats panel

### BCI Batter / Pitcher (Baseball)

- Batter: color-coded pitch types, click matching intent at the right moment
- Pitcher: control pitch type/speed by timing which click you use
- Analytics: hit accuracy per pitch type, reaction to pitch color, streak tracking

**Batter mode v1 ships first** with three pitch types (fastball / curveball / changeup), snap-to-zone bat positioning, and color-match-on-timing swing logic (see `games/batter-pitcher/GAME_PLAN.md` for the locked v1 spec). Pitcher mode and the items below are deferred to v1.5+.

**Pitcher mode (v1.5).** Full second mode — choose pitch type by clicking the matching color as the ball leaves your hand. Includes AI batters with hot/cold zones to attack. Same color/timing conventions as Batter mode so the read transfers between modes.

**Power swing mechanic (v1.5).** A true held-click power swing layer on top of the base color-match. Held out of v1 because all three clicks are consumed by pitch-type ID — needs a clean fourth-input solution (long-press overlay, pre-pitch stance toggle, etc.). Don't add until base v1 feel is proven.

**Breaking pitches (v1.5).** Curveballs actually break mid-flight (start in one zone, end in another); changeups telegraph a fastball release then arrive late. v1 keeps pitches on fixed trajectories so the snap-zone + color + timing trio gets isolated and tuned first.

**Plate discipline — balls vs strikes (v2).** Some pitches arrive outside the strike zone — swinging at a ball wastes a swing, ump call = ball, four balls = walk. Adds a real decision-making layer (when NOT to swing) on top of pure reflex. Doubles the mental load, so v2.

**2-strike battle mode (v2).** At 2 strikes the timing window narrows but fouls don't count as strikes — you can battle the at-bat. Real baseball nuance; flag for playtest before committing.

**Home Run Derby mode (v2+).** Pure power, no pitching, distance-of-HR scoring. Natural sibling to the Hoops 9-Shot Drill — a pure-output mode after the base game proves out.

**Fielding mode (long-term).** Third mode where cursor moves the fielder under fly balls. Lowest priority — base modes ship first.

#### Batter/Pitcher — v1.5 polish

Backlog from the v1 build session — held until the arcade-wide polish sweep so we don't deep-polish a single game while other MVPs are still pending.

**Batter & bat.**

- Bat-on-ball contact animation — actual swing arc visible, ball deflects realistically off contact point, foul tips fly back
- Batting stance variation — left-handed vs right-handed perspective for variety, or cursor-as-stance lean for inside/outside pitches
- Bat selection / light meta-progression — heavy bat (more HR power, slower window) vs light bat (quicker reaction, weaker contact); earned over time

**Pitcher & windup.**

- Pitch tells / windup variation — different pitch types get subtly different windups (glove-load, leg-kick height); advanced players read windups to anticipate color before release
- Pitcher silhouette polish — defined throwing motion, follow-through after release, occasional mound-prep idle

**Ball & trajectory.**

- Pitch trail visual — faint colored streak fading behind the ball as it travels, makes color-reading easier and looks great (mirrors goalie spin-trail backlog)
- Exaggerated arc differences per pitch type — fastballs flat, curves with visible drop, changeups with a slow float

**Scene & atmosphere.**

- Catcher silhouette — low squat in front of the batter for depth and perspective, gives the scene "yes this is baseball" presence
- Umpire personality — animated strike-three "yer out!" gesture, HR signal point-to-the-fence, foul-ball cross (lots of charm for little code)
- Stadium variety + day/night variants — different ballpark silhouettes unlock at HR milestones, night-game lighting (cross-pollinates with goalie night-mode backlog)
- Crowd silhouette swells/pulses on hits, color flash on streak milestones

**HUD & feedback.**

- Prominent streak indicator at 3+ hits (pulse, color shift) — same pattern as Goalie streak
- Last-pitch outcome stays visible briefly during the next pitch (small ✓ / ✗ icon with hit type)
- Tutorial-style hints on misses ("That was a curveball — you needed ORANGE")
- Real-time AVG/SLG updating during the round, not just at end

**Career / season (long-term).**

- String at-bats into games, games into a season
- Long-term BA, HR count, slugging percentage tracked across sessions
- Needs all prior polish items first

**Cross-cutting (whole-pack, not batter-specific).**

- Sound system events for batter — bat crack on contact, ball pop in catcher's mitt, crowd swell on HR, ump strike call (folds into the shared schema flagged in Goalie/Striker backlog)
- Hit-zone heatmap analytics — where on the strike zone you connect vs whiff, broken out by pitch type (cross-pollinates with goalie heatmap backlog)

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

### Boxing — v1.5+ Backlog

v1 is Live. Already-parked v1.5 items live in `games/boxing/GAME_PLAN.md`:
variable combo length, multiple opponents, multi-round + corner rest, HP
tick animation, sound design, block + parry. Below are the ideas captured
during the post-MVP feel-test session — ranked by impact.

**Highest-impact additions**

- **Opponent personalities.** Three or four named opponents with distinct
  fight profiles: brawler (fast simple combos), counter-puncher (rare
  initiations, longer counter sequences), boxer (head-feints — red flash
  with no follow-through, punishes pre-emptive flinching), slugger (slow
  but +50% damage). Without this every fight is identical.
- **LLM-driven opponent dialogue (Claude Agent SDK hook).** Once
  personalities exist, route between-exchange trash talk through a
  Claude call. Each opponent's persona becomes a system prompt; the
  agent has access to round state (HP, combos landed, etc.) and reacts
  in character. Natural fit for the multi-agent personality experiment
  the user is interested in eventually.
- **Body-part damage strategy.** Head shots shorten the opponent's tell
  window (telegraph becomes more obvious). Body shots slow their attack
  speed. Ribs drain stamina. Right now a hit is a hit; this rewards
  target choice without changing the click loop.
- **Perfect-combo reward.** 4/4 in a combo auto-staggers the opponent's
  next counter — 3 incoming punches instead of 4, or slower closing
  rings. Skill payoff for clean offense.

**Drama + game-feel polish**

- **KO slo-mo replay.** The round-ending punch plays back in slow
  motion with a camera zoom on the contact moment. Cheap to build,
  outsized memorability.
- **Knockdown system.** At 25 HP and 5 HP, instead of straight-up
  losing the player goes down and has a brief rapid-click minigame to
  beat the count. Adds drama without breaking the loop.
- **Damage states on opponent.** As HP drops the opponent visibly
  changes — head tilt, sweat, cut/swelling at low HP. Right now they
  look identical at 100 HP and 5 HP.
- **Crowd reactions tied to play.** Crowd noise builds with combo
  streaks, goes quiet on near-KOs, explodes on the finish. Crowd
  silhouettes already exist; just need the audio layer.

**Progression hook**

- **Career mode skeleton.** Rookie → Contender → Champion belts. Each
  tier adds an opponent. Wins persist in localStorage; you re-fight
  the champion to keep the belt. Gives a reason to come back.

**Combat depth (parked — likely dilutive, revisit later)**

- Stamina meter that drains on missed punches
- Punch-sequence combos (specific click orders trigger named attacks)
- Weight classes / character creator
- Difficulty presets (Beginner / Pro / Champion) bundling all settings

### Archery

- Steady the cursor to hold aim on a moving or static target
- Click timing determines release — too early or late affects trajectory
- Wind and distance variables add challenge
- Precision and tremor-control training — uniquely valuable for BCI users
- Analytics: grouping accuracy, hold steadiness, release timing consistency

### BCI Rally (Tennis / Ping Pong / Badminton)

- Behind-player POV court, cursor controls racket position
- Incoming shots with 3 colors, click matching color to return with spin/angle
- Player serves with rhythmic combo (3-click = good serve, 4-click fast = ACE attempt)
- Analytics: return accuracy per color, rally length, cursor positioning precision

**Tennis v1 ships first** with race-to-5 scoring, double-fault rule, and a single wrong-color penalty (ball into net). See `games/rally/GAME_PLAN.md` for the locked v1 spec. Ping Pong and Badminton variants and the items below are deferred to v1.5+.

**Ping Pong variant (v1.5).** Same core mechanic, faster ball, tighter table geometry, compact racket, close-to-table neutral stance. Highest reuse off the tennis core — first variant to ship.

**Badminton variant (v1.5).** Slower shuttle, higher arcs, more float time — the gentle on-ramp variant for newer BCI users. Mid-court neutral stance, racket up.

**Mistake roulette (v1.5).** Replace v1's "always into the net" with weighted random outcomes per click type — out long, whiff into ground, mishit foul. Each click biases toward a different mistake so misreads have flavor.

**Real tennis scoring (v1.5).** 15-30-40-deuce-advantage, best-of-3 sets, side-changes between games. v1 races to 5 to keep the loop tight while the core feel is tuned.

**Adaptive AI (v2).** Opponent that improves with rally streak length and learns player tendencies (favorite return color, weak side).

**Tournament bracket mode (v2).** Single-elimination ladder against AI personalities with different return styles and serve speeds.

**Court surfaces (v2).** Clay slows the ball, grass speeds it up, hard court neutral. Affects rally pacing and changes the read difficulty.

**Curved / spin returns (v2+).** Late-curving balls that change side mid-flight, forcing a re-read. Cousin of the goalie curved-shots backlog — same pattern across the pack.

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
