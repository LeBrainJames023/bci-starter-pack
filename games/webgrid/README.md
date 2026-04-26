# WebGrid

A browser-based BCI (Brain-Computer Interface) calibration benchmark built as a single HTML file. Same scoring methodology Neuralink uses in the Prime Study.

## How to Play

Open `index.html` in any modern browser. No installation or server required.

A single colored cell appears in an N×N grid. Click that cell using the matching click color to acquire the target. As soon as you do, a new colored cell spawns somewhere else in the grid. Hit as many as you can before the timer runs out.

## BCI Input Mapping

| Finger          | Click        | Color  |
| --------------- | ------------ | ------ |
| Pointer (index) | Left click   | Blue   |
| Ring            | Middle click | Purple |
| Middle          | Right click  | Orange |

## Scoring

**BPS** (bits-per-second) = log₂(N²) × max(0, correct − incorrect) / seconds

Where N is the grid dimension. Higher grid sizes are worth more points per hit because each correct selection conveys more information. Both wrong-cell clicks and wrong-color clicks count as misses and subtract from your BPS.

The target is **sticky** — wrong clicks penalize you but don't advance the target. You have to hit the right cell with the right color before a new one spawns.

## Modes

- **Practice** — Open-ended. Timer is optional. Tune settings between or during runs. No score persistence.
- **Game** — Locked-in run with a fixed timer. Final BPS saved as your personal best for that exact configuration.

## Settings (in-game ⚙ button on the menu)

| Setting      | Options                                     |
| ------------ | ------------------------------------------- |
| Grid Size    | 6×6, 9×9, 12×12, 16×16, 24×24               |
| Timer        | Off (Practice only), 1, 2, 3, 4, 5 minutes  |
| Click Colors | Toggle Blue / Purple / Orange independently |

At least one click color must stay enabled at all times.

## Personal Best

Game mode tracks a personal best per unique configuration — different grid sizes, different active colors, and different timer lengths each get their own slot. Beat your previous run on that exact setup and you'll see a "★ New Personal Best" banner on the end screen.

## Notes

- All data is stored in browser localStorage. Nothing is sent anywhere.
- The grid uses your native cursor — the BCI hardware controls cursor speed at the OS level, so the global cursor sensitivity slider does not apply to this game.
- Right-click context menus are suppressed so right-clicks register as game input instead of opening a menu.
