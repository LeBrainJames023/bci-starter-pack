# BCI Starter Pack — Project Instructions

## What This Project Is
A collection of browser-based mini-games designed from the ground up for Brain-Computer Interface users.
The goal is a polished, accessible game hub that can be handed to any new BCI user on day one.

## GitHub
Repository: https://github.com/LeBrainJames023/bci-starter-pack

## Project Structure
```
BCI Starter Pack/
├── index.html           # Game launcher hub — main entry point
├── games/
│   └── hackey-sac/      # Only live game currently
├── shared/              # Reserved for shared BCI utilities
├── DESIGN_GUIDE.md      # Read before building any game
├── FUTURE_FEATURES.md   # Backlog — ideas go here, not into active builds
└── ASSETS.md            # Every asset added must be logged here
```

## Stack
- Vanilla HTML, CSS, JavaScript for simple games
- Phaser.js introduced when a game needs it (Tower Defense web version, Side Scroller)
- ESLint v9 + Prettier v3 configured — run before committing
- No build step required for simple games

## Game Lineup
### Training (1)
- Hackey Sac — LIVE at games/hackey-sac/index.html

### Sports (9 — all coming soon)
Golf, BCI Hoops, QB Targets, Goalie/Striker, Boxing, Batter/Pitcher, Rally, Hockey, Archery

### Action (3 — all coming soon)
BCI Range, Tower Defense, Side Scroller

## Architecture Rules
- Every game lives in its own folder under games/
- Every game must have an index.html entry point so the launcher can link to it
- Godot games (Tower Defense) are built in a separate repo and exported to HTML5 — the export folder drops into games/tower-defense/
- Side Scroller will likely be a separate repo if it grows large — same export strategy
- The launcher (index.html at root) only needs a path to link to — it does not care what built the game

## Design Rules — Read DESIGN_GUIDE.md for Full Details
- Every game uses exactly four inputs: floating cursor, left click (blue), right click (orange), middle click (purple)
- Blue/orange/purple are the universal BCI click colors — they never change across any game
- Game worlds are fully themed to their sport or genre — environments do not need to follow the color rules
- All click targets must be large enough for BCI cursor use
- No drag-and-drop, no hover-only interactions, no keyboard required for any game mechanic
- Every game must include analytics (accuracy, reaction time, attempts per click type)

## Session Rules
- Always read DESIGN_GUIDE.md before starting work on any new game
- Check FUTURE_FEATURES.md before adding anything new — if it is not already planned, flag it as scope creep
- Log any new asset in ASSETS.md immediately when it is added
- Before calling any game feature done, verify it works in the browser
