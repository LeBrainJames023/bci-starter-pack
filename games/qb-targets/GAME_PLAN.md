# QB Targets — Game Plan

## Status
Not started.

## MVP
- Cursor acts as quarterback aim
- Receiver windows pop up at different screen positions, each color-coded (blue, orange, purple)
- Click the matching color before the window closes to complete the throw
- Windows close faster as difficulty increases
- Completion percentage and streak tracking

## Long-Term Vision
- Moving receivers with routes and timing windows
- Deep throw mechanic: hold + release for long passes, tap for short
- Blitz pressure: a rush timer adds urgency
- Multiple formations with different receiver layouts
- Increasing speed modes (rookie → all-pro)
- Analytics: completion rate per color, reaction time, accuracy under pressure

## Currently Building
Nothing active.

## Up Next
- Prototype static receiver windows with color codes and a closing timer
- Test feel of the timing pressure before adding moving targets

## Known Issues
None yet.

## Tech Notes
Plain HTML/canvas should handle this well. Multiple simultaneous targets may
need performance consideration at higher difficulty — flag if it becomes an issue.
