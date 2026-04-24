# Tower Defense — Game Plan

## Status

Being built separately in Godot. Not yet imported.

## MVP

- Basic map with a defined enemy path
- Three tower types, each placed and controlled via the three click inputs (blue, orange, purple)
- Five enemy waves with increasing difficulty
- Currency system: earn gold per kill, spend to place towers
- Win/lose condition per run

## Long-Term Vision

- Multiple maps with different path layouts
- Tower upgrade trees unlocked by click input
- Boss waves every 5 rounds
- Special ability tied to cursor position (area effect, targeted strike)
- Visual style: dark, polished — fits the BCI Starter Pack aesthetic
- Analytics: towers placed per click type, waves survived, gold efficiency

## Currently Building

Being built in Godot in a separate repository.

## Up Next

- Complete Godot MVP
- Export to HTML5
- Drop export folder into this directory (games/tower-defense/)
- Update launcher card from Coming Soon to Live

## Known Issues

- Godot HTML5 export requires a web server to run (not openable as a plain file)
  A local server solution will be needed when integrating into the launcher.

## Tech Notes

Godot project lives in its own separate repository.
Only the HTML5 export belongs in this folder.
Do not put Godot source files here.
