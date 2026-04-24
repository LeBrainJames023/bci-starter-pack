# BCI Starter Pack — Project Instructions

## What This Project Is

A collection of browser-based mini-games designed from the ground up for Brain-Computer Interface users.
The goal is a polished, accessible game hub that can be handed to any new BCI user on day one.

## GitHub

Repository: https://github.com/LeBrainJames023/bci-starter-pack

---

## Session Startup — Read These First

Before doing anything, read the following files in this order:

1. `README.md`
2. `DESIGN_GUIDE.md`
3. `FUTURE_FEATURES.md`
4. `ASSETS.md`
5. `GAME_PLAN.md` inside the folder of whichever game is being actively worked on

No work starts until these are loaded.

---

## Project Structure

```
BCI Starter Pack/
├── index.html           # Game launcher hub — main entry point
├── games/
│   ├── hackey-sac/      # LIVE
│   ├── golf/
│   ├── hoops/
│   ├── qb-targets/
│   ├── goalie-striker/
│   ├── boxing/
│   ├── batter-pitcher/
│   ├── rally/
│   ├── hockey/
│   ├── archery/
│   ├── range/
│   ├── tower-defense/   # Built in Godot — HTML5 export drops here
│   └── side-scroller/   # Likely separate repo — same export strategy
├── shared/              # Reserved for shared BCI utilities
├── DESIGN_GUIDE.md      # Read before building any game
├── FUTURE_FEATURES.md   # Backlog — ideas go here, not into active builds
├── ASSETS.md            # Every asset added must be logged here
└── GAME_PLAN.md         # Per-game plans live inside each game folder
```

---

## Stack

- Vanilla HTML, CSS, JavaScript for simple games
- Phaser.js introduced when a game needs it — flag before escalating
- ESLint v9 + Prettier v3 configured
- No build step required for simple games

---

## Game Lineup

### Training (1)

- Hackey Sac — LIVE at games/hackey-sac/index.html

### Sports (9 — all coming soon)

Golf, BCI Hoops, QB Targets, Goalie/Striker, Boxing, Batter/Pitcher, Rally, Hockey, Archery

### Action (3 — all coming soon)

BCI Range, Tower Defense, Side Scroller

---

## Build Approach

- Build an MVP for each game before polishing any single game deeply
- It is fine to bounce between games — fresh ideas for one game while working on another go into that game's GAME_PLAN.md
- Building an MVP early also determines whether a game stays as a browser game or needs its own repo
- Do not start Side Scroller or any heavy game without first deciding on the tech stack

---

## Rules

### Launcher Sync

Any time a game goes live: update its launcher card from Coming Soon to Live,
and update the game count in the launcher header. The launcher must always reflect reality.

### Tech Escalation

If a game shows signs of outgrowing plain HTML/JS — complex animations, multiple scenes,
heavy assets, performance issues — stop and flag it before adding more features.
Do not build deeper into the wrong tool.

### Assets

No image, sound, or font gets added to any game without being logged in ASSETS.md first.

### Architecture

- Every game must have an index.html entry point so the launcher can link to it
- Godot and other engine-built games belong in separate repos — only their HTML5 exports go here
- The launcher does not care what built the game, only where to point the browser

---

## Design Rules — Full Details in DESIGN_GUIDE.md

- Four inputs per game: floating cursor, left click (blue), right click (orange), middle click (purple)
- Blue/orange/purple are the universal BCI click colors — never change across any game
- Game worlds are fully themed to their sport — environments do not follow the color rules
- All click targets must be large enough for BCI cursor use
- No drag-and-drop, no hover-only interactions, no keyboard required
- Every game must include analytics
