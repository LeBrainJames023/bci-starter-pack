# Rally — Game Plan

## Status
Not started.

## MVP
- Side-view court (tennis or badminton)
- Cursor controls racket position
- Incoming shots are color-coded — click matching color to return
- Each return applies different spin/angle based on click type
- Rally counter, miss ends the rally
- Score tracking

## Long-Term Vision
- Badminton variant: slower, higher arcs give more float time — better for newer BCI users
- Opponent AI that improves with streak length
- Tournament bracket mode
- Court surfaces that affect ball speed (clay slows it, grass speeds it up)
- Analytics: return accuracy per color, rally length over time, cursor positioning precision

## Currently Building
Nothing active.

## Up Next
- Prototype ball arc and return mechanic
- Test the feel of color-coded returns before building opponent AI

## Known Issues
None yet.

## Tech Notes
Plain HTML/canvas. Ball arc physics are simple enough to handle without a game engine.
Most similar to Hackey Sac in structure — reuse patterns where possible.
