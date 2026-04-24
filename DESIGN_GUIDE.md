# BCI Starter Pack — Design Guide

This document defines the standards every game in the BCI Starter Pack must follow.
When building a new game, refer here first.

---

## BCI Input Standard — Universal Across All Games

Every game in the BCI Starter Pack uses exactly four inputs:

1. **Floating cursor** — controls aim, movement, direction, targeting, or any spatial action depending on the game
2. **Left click — Blue** — consistent color identity across every game
3. **Right click — Orange** — consistent color identity across every game
4. **Middle click — Purple** — consistent color identity across every game

The game world, environment, and overall aesthetic are free to look however fits the sport or genre. The three click colors, however, never change. A player who learns blue/orange/purple in one game carries that knowledge into every other game in the pack without relearning anything.

---

## Visual Design

- Every game should look polished and intentional — not cheesy, not AAA, but clean and considered
- Game worlds should be fully themed to their sport or genre (golf is green and colorful, hockey has white ice, etc.)
- The BCI input colors (blue, orange, purple) appear on interactive input elements only — not on the environment
- All games share the same dark launcher aesthetic; individual game worlds branch from there

## Accessibility

- All click targets must be large enough for BCI cursor use
- No drag-and-drop interactions — ever
- No hover-only interactions — all actions must be triggered by a click
- No keyboard input required for any game mechanic
- Cursor sensitivity should be adjustable in every game's settings

## Analytics

- Every game should track and store per-session performance data
- At minimum: attempts, correct inputs, accuracy, and reaction time per click type
- Data is stored locally in localStorage
- Analytics should be viewable from within the game

---

_Add to this guide as new standards are established._
