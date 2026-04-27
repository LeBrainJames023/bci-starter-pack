# Golf — Game Plan

## Status

**Putt-Putt v1 — shipped.** All 13 checkpoints complete. Launcher card and Putt-Putt mode card are both Live.

- ✅ Mode select screen, routing, launcher integration
- ✅ Top-down hole rendering with walls/cup/flag/ball
- ✅ Aim → click-to-lock → cancel-or-shoot flow
- ✅ Distance band selection (blue/orange/purple → short/medium/long)
- ✅ Color-sequence skill check (3-step medium, 5-step long) with closing-ring telegraph and 1.8s window
- ✅ Ball physics: friction, wall bounces, water hazards (penalty + reset), sand traps (high friction), interior walls
- ✅ 7 hand-designed holes
- ✅ Round flow with cumulative score, scorecard, best-round tracking
- ✅ Analytics: per-click attempts, reactions, holes scores saved to localStorage via shared schema
- ✅ Settings panel: cursor sensitivity slider with live update + click toggles, shared with global settings
- ✅ Visual polish: animated waving flag, ball trail during motion, cup depth gradient, water shimmer
- ✅ Launcher Golf card flipped to Live, Putt-Putt mode card flipped to Live

Up next: **v1.5 — Level Editor** (in-browser tool to drop start/cup/walls/water/sand and export JSON), then **v2 — Driving Range / TopGolf-style** to perfect the swing meter.

---

## Vision — Three Modes

Long-term, the game ships as three connected modes selected from a mode-select screen on launch:

1. **Putt-Putt** — top-down mini-golf course of 5–7 hand-designed holes
2. **Driving Range / TopGolf-style** — distance + accuracy practice with targets to aim for; built second to perfect the swing meter
3. **Real Golf Course** — side-view, 9 holes (18-hole expansion later)

Each mode shares the same aim → lock → power flow but uses a different power mechanic appropriate to the mode.

---

## v1 Scope — Putt-Putt MVP

### Definition of Done

- 5–7 hand-designed holes playable end-to-end as a single round
- Aim → click-to-lock → cancel-or-shoot flow working
- Color-sequence putts (1 / 3 / 5) with sequence accuracy → shot accuracy
- Walls, water hazards, sand traps all functional
- Top-down camera
- Shot counter and par tracking per hole
- Cumulative round score with per-hole breakdown at end
- Analytics stored to localStorage
- Game accessible from launcher (card flipped Live, count updated)
- Programmer-art visuals — clean and intentional, not placeholder-ugly

### Hole Set (5–7 holes)

Hand-designed with increasing difficulty. Hole structure file format will be JSON-based so holes are easy to author, tweak, and (later) procedurally generate.

### Mechanics

**Aim phase:**

- Cursor position sets shot direction (visual: dotted line from ball through cursor)
- Any click locks aim → enters power phase
- After lock, a red on-screen **Cancel** button appears — click to return to aim phase
- Once locked, the player does NOT need to hold the cursor still (this is the BCI accessibility win — cursor stability is hard while clicking)

**Power phase — color-sequence putts:**

- **First click after lock chooses distance band:**
  - Blue (left click) → short putt → that single click IS the shot, ball travels short distance
  - Orange (right click) → medium putt → triggers a 3-color sequence
  - Purple (middle click) → long putt → triggers a 5-color sequence
- For medium/long: a sequence of colored buttons flashes (e.g., blue → purple → orange), player must click the matching colors in order, in time
- Sequence accuracy = shot accuracy. Wrong color or off-timing = ball skews left/right/short

### Obstacles (v1)

- Walls — ball bounces off
- Water hazards — ball lands in water = stroke penalty + reset to last position
- Sand traps — ball loses speed dramatically when crossing

Deferred to FUTURE_FEATURES: windmills, pipes, ramps, elevation, uneven terrain, moving obstacles.

### Visual Direction

- Programmer-art for v1: flat colored shapes — green fairway, white hole, red flag, tan sand, blue water, gray walls
- Clean and intentional — no sprites yet, but composition and color palette should look polished
- Sprites/illustrated tiles deferred to later polish pass

### Camera

- Pure top-down for v1 (default and only option)
- Slight 3/4 isometric angle deferred — will appear as a Coming Soon toggle in the in-game settings panel

### Settings Panel

- Hooks into the shared global BCI settings module (cursor sensitivity, click mappings)
- Game-specific: camera angle (3/4 listed as Coming Soon), sound on/off when sound is added

### Analytics (per session, localStorage)

- Shots per hole vs par
- Round total vs par
- Sequence accuracy by length (1 / 3 / 5 click)
- Average putts per hole over time
- Per-click-color hit rate during sequences

---

## v1.5 Scope — In-Browser Level Editor

Built **after** putt-putt v1 ships and is solid. Purpose: turn ~30 min per hand-authored hole into ~5 min per hole, unlocking larger hole libraries without proceduralizing.

### Mechanics

- Simple in-browser tool launched from a "Level Editor" button on the mode select screen (or hidden behind a dev-mode toggle)
- Click to drop start point, cup, walls, water, sand
- Live preview of the hole as you build
- Save → exports JSON in the same format `data/holes/*.json` uses, ready to drop into the game

### Why this beats jumping straight to procedural

By v1.5 we'll have 5–7 hand-designed holes' worth of design intuition. The editor's controls and constraints will be informed by what actually plays well, not algorithmic guesses. Procedural generation (deferred to FUTURE_FEATURES) becomes much more tractable later because the editor's data format and design rules already exist.

---

## v2 Scope — Driving Range / TopGolf

Built **after** putt-putt v1 ships. Purpose: perfect the 3-click swing meter in isolation before committing to a full course. Side-view, single screen, no scrolling — every shot starts from the same tee position.

### Definition of Done

- Side-view range with sky, ground, yardage markers, and the player at left
- Targets at varying distances with point values (TopGolf feel)
- Aim → click-to-lock → cancel-or-shoot flow (same as putt-putt)
- 3-click swing meter working: purple-start → orange-power → blue-accuracy
- Ball flies on a parabolic arc, lands, rolls briefly, comes to rest
- Per-shot scoring tied to target hit (or partial points for near-miss)
- Session structure: fixed shot count per round (default 15), running score, end-of-session screen with breakdown
- Best session score saved to localStorage
- Analytics: shot distance, power-meter precision, accuracy-meter precision, target hit rate by distance band
- Settings panel hooked up
- Driving Range mode card flipped from Coming Soon → Live

### Mechanics

**Aim phase:**

- Cursor position sets the **landing target** — visual: a green target reticle on the ground at the cursor's x position, plus a faint dotted parabolic preview from ball through cursor
- Cursor y-position can subtly bias trajectory loft (low = flat drive, high = high lob), but for v2 keep it simple: target = where on the ground the ball should land
- Any click locks the target → enters power phase
- Red Cancel button reappears (same UX as putt-putt) to re-aim

**Power phase — 3-click swing meter:**

- A vertical bar appears next to the player. The fill marker travels up from the bottom.
- **Click 1 — Purple (middle / ring finger):** starts the bar climbing toward 100%
- **Click 2 — Orange (right / middle finger):** locks the **power level** at the bar's current height. There's a green target zone near the top representing the intended power for the locked aim — closer to that zone = more accurate distance
- **Click 3 — Blue (left / index finger):** the bar then sweeps back downward through an **accuracy zone** with a small "perfect" mark in the middle. Click locks accuracy — distance from the perfect mark = how much the shot skews left/right
- Same locked-aim accessibility win as putt-putt: once aimed, no need to hold cursor still during the meter sequence
- No cancel during the meter — once committed, you finish

**Shot resolution:**

- `velocityX` derived from locked power vs target zone
- Trajectory skew (left/right of intended landing) derived from accuracy beat
- Parabolic flight under simple gravity, then a short roll on landing with friction
- Final resting position scored against target zones

### Targets & Scoring

- 5–7 colored target rings at different distances (e.g. 80, 130, 180, 220, 260 yards)
- Each target has concentric scoring zones (bullseye 5pts, mid 3pts, outer 1pt)
- Hit a green = bonus (TopGolf-style "putting green island")
- Miss everything = 0 points
- Bonus: sequential target hit streak multiplier (optional, polish-tier)

### Visuals

- Side-view, single fixed-camera screen
- **Player: abstract silhouette + floating club + ball** (combined options B + C from earlier scoping)
- Programmer-art parallax: sky gradient (light blue top → cream horizon), distant hills layer, mid-range trees layer, foreground ground
- Yardage markers as small flags or pole signs along the ground
- Targets as concentric colored rings (no BCI click colors used for target rings — those colors are reserved for click inputs)
- Ball trail during flight
- Subtle swing animation on the silhouette (arm sweep) timed with click 3

### File Structure

```
games/golf/driving-range/
├── index.html           # Single-file game (same pattern as putt-putt)
└── data/
    └── targets.json     # Target layout config
```

### Analytics (shared schema)

- Shot distance per attempt
- Power-meter precision (px from target zone)
- Accuracy-meter precision (px from perfect mark)
- Target hit rate by distance band
- Session score, best session score

---

## v3 Scope — Real Golf Course (9 holes)

Built after driving range. Reuses the swing meter from v2 across multiple shot types. Side-view with horizontal scrolling as the ball travels down the hole. **18-hole expansion is a v3.1 deferred to FUTURE_FEATURES.**

### Definition of Done

- 9 hand-designed holes loaded from JSON
- Each hole plays as a sequence of shots: tee shot → fairway shot(s) → approach → putt(s) → cup
- Camera follows the ball horizontally; the hole scrolls past in 1–3 screens depending on length
- Same 3-click swing meter from v2, with **club auto-selection** based on shot context (drive from tee, iron from fairway, wedge from rough/sand near green, putter on green)
- Different clubs = different power scaling, trajectory loft, and roll-out behavior
- Hazards: water (penalty + drop at last safe position), sand (reduced power + higher loft penalty), out-of-bounds (penalty)
- Putting on the green uses a **simplified version of the swing meter** — single power click + accuracy click (no separate start, since putting is more deliberate). Or alternatively reuses putt-putt's color-sequence mechanic if it feels too jarring to switch — needs testing.
- Per-hole strokes vs par, cumulative round score, scorecard at round end
- Best round saved to localStorage
- Analytics: shots per hole vs par, club use frequency, hazard hits, swing-meter precision per shot type
- Real Course mode card flipped from Coming Soon → Live

### Hole JSON Format

Different from putt-putt's holes — these describe a longer scrolling course, not a contained mini-golf box.

```json
{
  "id": 1,
  "name": "Opening Drive",
  "par": 4,
  "length": 380,
  "tee": { "x": 80, "y": 420 },
  "green": { "x": 1860, "y": 380, "radius": 90 },
  "cup": { "x": 1880, "y": 380 },
  "terrain": [
    { "type": "fairway", "x": 120, "width": 1700, "y": 425 },
    { "type": "rough", "x": 0, "width": 2000, "y": 480 }
  ],
  "hazards": [
    { "type": "water", "x": 700, "y": 420, "width": 200, "height": 60 },
    { "type": "sand", "x": 1500, "y": 410, "width": 120, "height": 30 }
  ],
  "outOfBounds": { "topY": 0, "bottomY": 600 }
}
```

### Mechanics — Per Shot Type

- **Drive (from tee):** full 3-click meter, driver club, max power. Common landing in fairway or rough.
- **Fairway shot:** full meter, iron club, ~70% of driver power range. Higher loft = arcs to land near the green.
- **Approach (close to green):** full meter, wedge, ~45% power, very high loft for soft landing.
- **Sand recovery:** like a wedge but with a built-in 25% power penalty.
- **Putt (on green):** simplified — just power + accuracy, OR the putt-putt color sequence. **Decision needed** before build.

### Camera & Scrolling

- Camera centers on the ball when stationary
- During flight, camera pans smoothly to follow the arc (with a slight lookahead)
- After the ball stops, camera centers on it for the next aim phase
- Mini-map at the top corner shows hole layout, ball position, cup position — helps the player plan shots that go beyond a single screen

### Visuals

- Same parallax-layered side-view aesthetic as v2 (sky gradient, distant hills, midground trees, foreground ground)
- Per-hole color/biome variation (links course, forest course, beach course) — polish-tier; v3 MVP can keep one biome
- Player silhouette walks to the ball between shots (small animation, optional)
- Mini-map renders as a top-down scaled-down strip

### File Structure

```
games/golf/course/
├── index.html
└── holes/
    ├── hole-01.json
    ├── hole-02.json
    └── ...
```

### Analytics (shared schema)

- Strokes per hole vs par
- Club use frequency (how often each club gets used)
- Hazard hits (water/sand/OOB counts)
- Swing-meter precision broken down by club
- Round total, best round
- Greens-in-regulation rate

---

## Mode Select Screen

Launch screen on entering the game shows three cards:

- **Putt-Putt** (v1 — Live)
- **Driving Range** (v2 — Coming Soon until built)
- **Real Golf Course** (v3 — Coming Soon)

Same card pattern as the main BCI Starter Pack launcher, scoped to this game.

---

## Tech Approach

- Start with **vanilla HTML5 canvas + JavaScript** — no build step
- Ball physics, walls, hole detection: plain math (vectors, friction, collision response)
- If physics complexity exceeds plain JS comfortably (when v3 course terrain comes in), evaluate **Phaser.js** escalation at that point
- No Godot or Three.js for any of the three modes — confirmed scope
- Hooks into shared modules: `bci-shell` (existing), global settings panel, analytics schema

---

## File Structure (actual + planned)

```
games/golf/
├── index.html               # Mode select screen — Live
├── GAME_PLAN.md
├── putt-putt/               # v1 — Live
│   ├── index.html           # Single-file game (CSS + JS inline)
│   └── holes/
│       ├── hole-01.json … hole-07.json
│       └── (level editor exports drop here in v1.5)
├── driving-range/           # v2 — planned
│   ├── index.html
│   └── data/
│       └── targets.json     # Target layout config
└── course/                  # v3 — planned
    ├── index.html
    └── holes/
        └── hole-01.json … hole-09.json
```

Each mode is a self-contained single-file game (matching the project pattern of hackey-sac and webgrid). The mode-select page at `games/golf/index.html` is a mini-launcher that routes to whichever sub-folder is Live.

---

## Build Order — Build a Little, Test a Little

### v1 — Putt-Putt (✅ shipped)

1. ✅ Skeleton + mode select screen
2. ✅ Single hole rendering — top-down canvas, walls, ball, cup, flag
3. ✅ Aim phase — cursor direction line, click-to-lock, cancel button
4. ✅ Short putt (1 click) — ball travels, friction, sinks in cup
5. ✅ Ball physics polish — wall bounces, friction tuning
6. ✅ Sand and water hazards
7. ✅ Color-sequence mechanic — 3-color medium putt
8. ✅ 5-color long putt
9. ✅ Hole 2–7 JSON designs
10. ✅ Round flow — hole transitions, cumulative score, end screen
11. ✅ Analytics + localStorage
12. ✅ Settings panel hookup
13. ✅ Visual polish pass — flag wave, ball trail, cup depth gradient

### v1.5 — Level Editor

1. Editor skeleton page + entry point (hidden link or `?editor` query on mode select)
2. Empty playfield rendering matching putt-putt's visual style
3. Click-to-place tools: ball start, cup, walls, water, sand, with a tool palette
4. Drag-to-resize for rectangle obstacles (or click-to-resize via numeric input — drag is off-limits for BCI)
5. Live preview: render the hole exactly as putt-putt would
6. Test-play: launch the hole inside the editor without leaving the page
7. Export → JSON download in the same format as `putt-putt/holes/*.json`
8. Import an existing hole for editing
9. Polish + ship

### v2 — Driving Range

1. Skeleton — driving-range page, header, settings, back button, programmer-art ground/sky
2. Side-view rendering: ball, player silhouette, yardage markers, distance scale
3. Aim phase: cursor sets target reticle on the ground, click-to-lock, red cancel
4. 3-click swing meter (purple-start → orange-power → blue-accuracy) with visual bar
5. Ball trajectory physics: gravity, initial velocity from power+aim, landing detection
6. Targets: rendering, hit detection, point values, scoring zones
7. Session structure: shot count, running score, end-of-session screen with breakdown
8. Analytics + best session score in localStorage
9. Visual polish: parallax background, ball trail, swing animation on silhouette
10. Driving Range mode card flipped to Live

### v3 — Real Course

1. Skeleton — course page with one hand-designed hole loaded
2. Hole JSON loader + terrain/hazard renderer (fairway, rough, water, sand, green, cup)
3. Camera follow: ball-centered camera that pans during flight
4. Drive shot: full swing meter, driver club, max power, parabolic flight
5. Ball-on-ground state machine: where did the ball land? Fairway / rough / sand / water / OOB / green
6. Fairway shot: iron club, scaled meter
7. Approach shot: wedge, soft landing
8. Water/sand penalty handling (drop at last safe position, +1 stroke)
9. Putting on the green — **simplified meter or putt-putt sequence (TBD per Open Decisions)**
10. Per-hole flow: tee → fairway → approach → green → cup → next hole
11. Mini-map at top corner showing hole layout, ball position, cup
12. Holes 2–9 hand-designed
13. Round flow: cumulative score, scorecard, best round
14. Analytics integration
15. Visual polish: per-biome variation if time allows, walking animation, polish pass
16. Real Course mode card flipped to Live

Each checkpoint = visible progress, tested in browser, no broken state. Commits land at meaningful checkpoints.

---

## Deferred to FUTURE_FEATURES.md

- Procedural hole generation (already added)
- 3/4 isometric camera angle
- Windmills, pipes, ramps, elevation, uneven terrain
- Sprite-based art / stylized human player
- Wind variable
- 18-hole course expansion
- Course unlocks tied to scoring
- Sound and music (will add at v1 polish if time, otherwise post-v1)

---

## Open Questions / Notes

- **Sound:** Not in v1 Definition of Done. If we breeze through v1, simple click + thwack + cup-drop sounds are an easy add at the end. Otherwise post-v1.
- **Asset log:** No assets yet — all programmer-art. ASSETS.md update happens when first real asset (sprite or sound) is added.

---

## Open Decisions Needed Before v2 / v3 Build

These are the architectural choices I want your call on before kickoff. My lean is noted under each so you can confirm or push back.

### v2 — Driving Range

1. **Session structure.** Fixed shot count per round, time-based, or free play?
   - My lean: **fixed 15 shots per round** with running score, like a TopGolf bay session. Easy to compare best-of, clean stop point, fair to BCI fatigue.

2. **Cursor y-axis behavior during aim.** Just a target reticle on the ground (cursor x picks landing distance), or does cursor y also bias trajectory loft (low = drive, high = lob)?
   - My lean: **just x-axis (target on ground)** for v2 simplicity. Loft variation comes naturally from the swing meter / club selection in v3.

3. **Wind variable.** Include in v2 or defer to v3?
   - My lean: **defer.** Wind layered on top of an unfamiliar swing meter is too much new at once. Add it in v3 or as a v2.1 toggle.

4. **Streak multiplier for sequential target hits.** Polish-tier or skip?
   - My lean: **skip for v2, add in polish pass if time allows.** The base scoring loop should feel right first.

### v3 — Real Course

5. **Putting on the green.** Three options:
   - (a) **Simplified swing meter** — power click + accuracy click only, no separate start (more deliberate, less tense than full meter)
   - (b) **Reuse putt-putt's color sequence** — 1/3/5 color sequence depending on putt distance
   - (c) **Full 3-click meter** like every other shot, just with much shorter power range
   - My lean: **(b) reuse putt-putt's color sequence.** You've trained on it, players have trained on it, and switching mechanics on the green is a nice tonal shift. Putts feel like puzzles, drives feel like swings — exactly what real golf feels like mentally.

6. **Club selection.** Auto (game picks based on shot context) or manual (player picks before each shot)?
   - My lean: **auto for v3 MVP**, with a "manual override" option in settings for later. Auto removes a decision burden during play and keeps focus on the meter; manual is a power-user mode.

7. **Course biome variety.** Single biome (e.g. links / classic green) for v3 MVP, or vary across the 9 holes?
   - My lean: **single biome for v3 MVP.** Variety is polish-tier — getting one course feeling great matters more than having three half-baked.

8. **Mini-map.** In v3 MVP or polish-tier?
   - My lean: **v3 MVP.** Holes scrolling across multiple screens means you lose context without one. Worth the upfront cost.

### Cross-cutting

9. **Tech stack escalation.** Stick with vanilla canvas + JS through v3, or pre-emptively bring in **Phaser.js** for v3's scrolling course / camera system?
   - My lean: **stick with vanilla** until v3 actually feels cramped. Phaser would be a real lift to integrate, and our physics needs are still simple (gravity + AABB collisions). We can always escalate later if scrolling/camera complexity bites.

10. **Build order across modes.** v1.5 (level editor) before v2, or skip v1.5 and go straight to v2?
    - My lean: **build v2 first.** The level editor gives us more putt-putt holes, but the project gains more from shipping a second mode (driving range) and proving the swing meter than from getting hole #8 of putt-putt. v1.5 can slot in later when we want to expand putt-putt content.

---

Answer these when you get back to it and we'll have a clean kickoff path for v2 → v3.
