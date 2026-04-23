# BCI Range — Game Plan

## Status
Not started.

## MVP
- Targets pop up in windows across a shooting range or building facade
- Each target is color-coded — click the matching color before it drops back down
- Friendlies also appear — must NOT be clicked (adds decision-making layer)
- Targets appear faster and more frequently as difficulty increases
- Hit rate, false positive (friendly fire), and reaction time tracked per session

## Long-Term Vision
- Night mode: darker environment, targets harder to see
- Multiple target types with different point values
- Scanning mechanic: cursor must travel across the range, rewards controlled movement
- Time attack mode: maximum hits in 60 seconds
- Stealth targets: appear briefly then hide — very fast reaction required
- Analytics: hit rate per color, false positive rate, reaction time, cursor scan speed and efficiency

## Currently Building
Nothing active.

## Up Next
- Prototype target pop-up system with color codes and a closing timer
- Add friendly targets second to test the decision-making layer

## Known Issues
None yet.

## Tech Notes
Plain HTML/canvas. Multiple simultaneous targets at high difficulty —
monitor performance and escalate to Phaser.js if needed.
The friendly mechanic makes this the highest decision-pressure game in the pack.
