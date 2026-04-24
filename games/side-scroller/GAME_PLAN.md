# Side Scroller — Game Plan

## Status

Not started. Repo strategy TBD.

## MVP

- Single level with a start and end point
- Cursor controls player aim or movement direction
- Three click inputs handle core actions (jump, attack, interact — mapped to blue/orange/purple)
- Basic enemies with simple attack patterns
- Health bar, lives, level complete condition

## Long-Term Vision

- Multiple levels with distinct environments
- Boss fights at end of each world
- Power-ups collectible via cursor click
- Parallax scrolling backgrounds for depth
- Character progression between runs
- Analytics: deaths per section, accuracy of cursor-aimed attacks, click input usage balance

## Currently Building

Nothing active.

## Up Next

- Decide on technology before writing a single line of code
- This game is the most likely candidate for its own repo given potential scope
- Evaluate: plain HTML canvas, Phaser.js in this repo, or Phaser.js in a separate repo

## Known Issues

None yet.

## Tech Notes

HIGH COMPLEXITY FLAG — decide on tech stack before starting.
This game will almost certainly need Phaser.js at minimum.
If it grows to multiple levels with assets, it should be its own repo
with an HTML5 export dropped into this folder — same strategy as Tower Defense.
Do not start building until the tech decision is made.
