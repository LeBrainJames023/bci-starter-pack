# BCI Hackey Sac

A browser-based BCI (Brain-Computer Interface) training game built as a single HTML file.

## How to Play

Open `index.html` in any modern browser. No installation or server required.

## BCI Input Mapping

| Finger | Click | Color | Label |
|--------|-------|-------|-------|
| Pointer (index) | Left click | Blue | P |
| Ring | Middle click | Purple | M |
| Middle | Right click | Orange | R |

A colored ball falls due to gravity. Match the ball's color with the correct click to kick it back up. Clicking the left side of the ball sends it right; clicking the right side sends it left.

## Modes

- **Practice** — Freely adjust ball size, gravity, kick strength, and hitbox. Good for dialing in BCI settings.
- **Game** — Auto-scaling difficulty. Starts slow and ramps over 250 correct kicks.

## Settings (in-game ⚙ button)

| Tab | Options |
|-----|---------|
| Physics | Ball Size, Gravity, Kick Strength, Hitbox Size |
| Input | Active Clicks (per finger on/off), Cursor Sensitivity |
| Analytics | Live session stats — accuracy, hold duration, reaction time |

## Analytics (main menu)

Tracks per-finger accuracy, average hold duration, and average reaction time across all sessions. Last 10 sessions saved locally and viewable individually.

## Notes

- All data is stored in browser localStorage. Nothing is sent anywhere.
- The virtual cursor (crosshair) on the canvas is independent of the OS cursor.
- Raw BCI signal data (pressure, EEG) is not accessible in the browser — only mouse events are tracked.
