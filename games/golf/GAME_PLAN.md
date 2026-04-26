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

Built **after** putt-putt v1 ships and is solid. Purpose: perfect the 3-click swing meter in isolation before committing to a full course.

### Mechanics

**Aim phase:** same lock/cancel flow as putt-putt — cursor sets target, click to lock, red cancel to re-aim.

**Power phase — 3-click power meter (BCI-natural fit):**

- Click 1 (start the bar): **Purple** / middle click / ring finger
- Click 2 (set power): **Orange** / right click / middle finger
- Click 3 (set accuracy): **Blue** / left click / index finger
- Bottom-to-top finger order, ending on the dominant click for the precision beat

### Visuals

- Side-view of the range
- Player: abstract silhouette + floating club + ball (combined options B + C)
- Targets at varying distances with point values (TopGolf feel)
- Programmer-art parallax background — sky gradient, layered hills, range yardage markers

### Analytics

- Shot distance per attempt
- Power-meter hit accuracy (how close to target power)
- Accuracy-meter hit precision
- Target hit rate by distance band

---

## v3 Scope — Real Golf Course (9 holes)

Built after driving range. Reuses the swing meter from v2 across multiple shot types (drive, fairway, approach, putt). Side-view, multi-screen holes that scroll as the ball travels. 18-hole course is a v3.1 expansion.

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

## File Structure (proposed)

```
games/golf/
├── index.html              # Mode select screen
├── GAME_PLAN.md
├── css/
│   └── golf.css
├── js/
│   ├── main.js             # Mode select + routing
│   ├── putt-putt/
│   │   ├── game.js         # Game loop, state machine
│   │   ├── physics.js      # Ball physics, collision
│   │   ├── holes.js        # Hole loader, JSON parser
│   │   ├── sequence.js     # Color-sequence putt mechanic
│   │   └── render.js       # Top-down canvas drawing
│   ├── driving-range/      # (v2 — placeholder)
│   └── course/             # (v3 — placeholder)
├── data/
│   └── holes/
│       ├── hole-01.json    # Hand-designed hole layouts
│       ├── hole-02.json
│       └── ...
└── assets/                 # (deferred — programmer art for v1)
```

---

## Build Order — Build a Little, Test a Little

1. **Skeleton + mode select screen** (only Putt-Putt active, others Coming Soon) → checkpoint, view in browser
2. **Single hole rendering** — top-down canvas, walls, ball, cup, flag → checkpoint
3. **Aim phase** — cursor direction line, click-to-lock, cancel button → checkpoint
4. **Short putt (1 click)** — ball travels straight a fixed distance, friction, sinks in cup → checkpoint
5. **Ball physics polish** — wall bounces, friction tuning → checkpoint
6. **Sand and water hazards** → checkpoint
7. **Color-sequence mechanic** — 3-color medium putt working → checkpoint
8. **5-color long putt** → checkpoint
9. **Hole 2 → 7 designs** authored as JSON → checkpoint
10. **Round flow** — hole-to-hole transitions, cumulative score, end-of-round screen → checkpoint
11. **Analytics + localStorage** → checkpoint
12. **Settings panel hookup** → checkpoint
13. **Visual polish pass** — colors, animations, flag wave, ball shadow, water ripple → ship v1

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
