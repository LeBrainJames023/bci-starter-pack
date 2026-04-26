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

- **Practice** — Open-ended. Timer is optional. Tune grid size and click colors between runs. No score persistence — your last 3 runs show on the right side of the screen for quick reference.
- **Game** — Calibrated benchmark run. **Grid is locked at 25×25** so all scores are directly comparable. Top 3 scores per click-color and timer combination are saved and shown on the right side of the screen during play.

## Settings (in-game ⚙ button on the menu)

| Setting              | Options                                     |
| -------------------- | ------------------------------------------- |
| Grid Size (Practice) | 6×6, 9×9, 12×12, 16×16, 25×25               |
| Timer                | Off (Practice only), 1, 2, 3, 4, 5 minutes  |
| Click Colors         | Toggle Blue / Purple / Orange independently |

At least one click color must stay enabled at all times. Game mode ignores the grid size setting and always runs at 25×25.

## Top 3 Scores

Game mode tracks a Top 3 leaderboard per `(enabled click colors, timer length)` combination — switch up your active colors or timer length and you'll get a fresh list. Take the #1 slot on a completed run and you'll see a "★ New Top Score" banner on the end screen.

Up to 10 entries are kept in storage; the top 3 are rendered in the side panel during play.

## In-Game HUD

- **Top-left:** TIME (countdown in Game mode, count-up in Practice with timer off)
- **Top-right:** BPS — your live score
- **Top-center:** CORRECT and WRONG counters
- **Below TIME (left side):** Click Legend — colored dots for each enabled click, hides any click you've disabled in settings
- **Below BPS (right side):** Top 3 Scores in Game mode, Last 3 Runs in Practice mode

## Notes

- All data is stored in browser localStorage. Nothing is sent anywhere.
- The grid uses your native cursor — the BCI hardware controls cursor speed at the OS level, so the global cursor sensitivity slider does not apply to this game.
- Right-click context menus are suppressed so right-clicks register as game input instead of opening a menu.
