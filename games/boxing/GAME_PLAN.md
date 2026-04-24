# Boxing — Game Plan

## Status

Not started.

## MVP

- Side-view boxer vs opponent
- Cursor movement controls dodge (move cursor left/right to dodge incoming punches)
- Colored targets appear on opponent — click matching color to land the right punch
- Round timer, health bars for both fighters
- Basic win/loss condition per round

## Long-Term Vision

- Multiple opponents with different attack patterns and speeds
- Combo system: hitting colors in sequence triggers a power combo
- Stamina meter that depletes with missed punches
- Corner between rounds: brief rest period
- Visual flair: impact flashes, stagger animations
- Analytics: dodge accuracy, strike accuracy per color, reaction time under pressure, combo rate

## Currently Building

Nothing active.

## Up Next

- Prototype the strike mechanic first — colored targets appearing on opponent, click to hit
- Add dodge cursor mechanic second

## Known Issues

None yet.

## Tech Notes

May benefit from Phaser.js if animations get complex. Start plain HTML/canvas
and escalate if character animation becomes a bottleneck.
