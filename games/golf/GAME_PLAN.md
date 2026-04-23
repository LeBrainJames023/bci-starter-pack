# Golf — Game Plan

## Status
Not started.

## MVP
- Single hole, putt-putt style layout
- Cursor aims the shot direction
- Click type determines shot strength: left click (blue) = light tap, right click (orange) = medium, middle click (purple) = full power swing
- Basic ball physics: roll, bounce off walls, sink in hole
- Shot counter and par tracking
- Colorful environment: green fairway, hole flag, basic obstacles

## Long-Term Vision
- Multiple holes with increasing complexity (water hazards, sand traps, elevation)
- Driving range mode: pure distance and accuracy, no hole required
- Club selection mechanic tied to click inputs
- Old-school mini-clip aesthetic: bright, colorful, cartoon-style visuals
- Wind variable that affects ball trajectory
- Course unlocks as scores improve
- Analytics: shot accuracy, average putts per hole, distance consistency

## Currently Building
Nothing active.

## Up Next
- Decide on physics approach (plain canvas vs Phaser.js) based on how complex ball physics need to be
- Prototype the putting mechanic first — aim cursor, click to shoot

## Known Issues
None yet.

## Tech Notes
Start as plain HTML/canvas. Evaluate after putting prototype — if full course with
obstacles and elevation feels cramped in plain JS, escalate to Phaser.js.
Precision-based game — cursor steadiness matters here similar to Archery.
