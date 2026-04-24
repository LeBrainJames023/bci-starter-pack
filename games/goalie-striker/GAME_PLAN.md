# Goalie / Striker — Game Plan

## Status

Not started.

## MVP

- Two modes selectable from a menu: Goalie and Striker
- Goalie: colored shots come in from different angles, cursor moves to intercept, click matching color to block
- Striker: cursor aims at a goal with colored zones, click the matching color to shoot into the right zone
- Basic ball physics and trajectory
- Score / save counter per session

## Long-Term Vision

- Keeper AI that gets smarter over time in Striker mode
- Penalty shootout mode: alternating goalie and striker rounds
- Shot power variation: click hold duration affects shot speed
- Curved shots based on cursor position at click
- Crowd atmosphere, stadium visuals
- Analytics: save rate per shot direction, scoring accuracy per zone, reaction time

## Currently Building

Nothing active.

## Up Next

- Prototype Goalie mode first — incoming colored shots, cursor block mechanic

## Known Issues

None yet.

## Tech Notes

Plain HTML/canvas. Similar structure to Hackey Sac — cursor tracking and
color-matched clicks are already proven patterns in this project.
