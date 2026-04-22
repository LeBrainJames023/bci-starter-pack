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

### BCI Batter / Pitcher (Baseball)
- Batter: color-coded pitch types, click matching intent at the right moment
- Pitcher: control pitch type/speed by timing which click you use
- Analytics: hit accuracy per pitch type, reaction to pitch color, streak tracking

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
