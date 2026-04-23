# Archery — Game Plan

## Status
Not started.

## MVP
- Static target at a fixed distance
- Cursor must be held steady over the target for a brief moment before releasing
- Click to release the arrow — timing affects accuracy
- Wind indicator that shifts aim slightly
- Score based on where arrow lands (bullseye = highest points)
- Round-based: set number of arrows per round

## Long-Term Vision
- Moving targets: swinging pendulum, animals crossing, etc.
- Distance variation: closer = easier, further = smaller target
- Multiple arrow types tied to click inputs (standard, power, curved)
- Tremor visualization: show cursor steadiness score after each shot
- Outdoor environment: trees, sky, ambient wind effects
- Analytics: grouping accuracy (how tight your shots cluster), hold steadiness, release timing consistency

## Currently Building
Nothing active.

## Up Next
- Prototype cursor steadiness mechanic — this is the core of the game and unlike anything else in the pack
- Test what "steady enough" feels like before building the full target

## Known Issues
None yet.

## Tech Notes
Plain HTML/canvas. The cursor steadiness mechanic is unique to this game —
track cursor movement variance over a short window to determine hold quality.
Precision-based, similar to Golf. These two games share training value for tremor control.
