# WebGrid — Game Plan

## Status

**LIVE.** MVP shipped 2026-04-25, polished same day with menu motif, Top 3 scoreboard, locked
Game-mode grid size (25×25), corner HUD layout (Time top-left, BPS top-right, Correct/Wrong
center-top), and an Analytics placeholder modal. Pending real-world tuning based on use.

**Notable polish features:**

- **Menu motif:** subtle single-cell loop — a small colored cell (blue/purple/orange) pops up at
  random positions around the menu screen with a faint ghost cursor easing toward each new spawn.
  Visually echoes the gameplay without competing with the menu.
- **Corner HUD:** Time and BPS live as large naked text in the top corners (clinical reference
  inspired); Correct / Wrong stay as boxed cells in the center.
- **Top 3 side panel:** appears in Game mode only on the right side. #1 score is large and
  blue-tinted; #2 and #3 are smaller and dimmer. Each entry shows BPS + compact date.
- **Analytics placeholder:** menu has a third link "Analytics" that opens a modal noting a full
  dashboard is coming. Real analytics work is its own future session.

## Concept

Second entry in the **Training** category, alongside Hackey Sac. WebGrid is a calibrated BPS (bits-per-second) benchmark — colored target cells appear in an N×N grid, the user acquires each one with the matching click, and BPS is calculated from correct/incorrect selections over the timed window. Same scoring methodology used by Neuralink in the Prime Study, with multi-color click variants supported (which official WebGrid also supports).

**Launcher card tagline:** _"Dial in your BCI and see how far you can push it."_

## MVP

### Two modes

- **Practice mode** — open-ended, no time pressure required
  - Optional timer can be enabled for a timed run (1–5 min, or Off)
  - Toggle blue / purple / orange click colors on/off independently
  - Switch grid size between sessions: 6, 9, 12, 16, 25
  - No score persistence — Practice runs do not affect the Top Scores list

- **Game mode** — calibrated benchmark run
  - **Grid size locked at 25×25** so all Top 3 scores are directly comparable
  - Timer required (defaults to 60s if user has Practice set to "Off")
  - Color toggles still respected from settings
  - Final BPS pushed to the Top 3 list for that (enabledColors, timer) combination
  - Future: Game mode escalation pattern (1 → 2 → 3 colors over time) — TBD pending playtesting

### Core gameplay loop

- One target cell highlighted at a time
- Cell color matches one of the enabled click colors (blue / orange / purple)
- User must click that cell with the matching click to acquire
- **Correct cell + correct color** = score, new target spawns at a random other cell
- **Wrong cell** (any click) = penalty, target stays put
- **Wrong color on correct cell** = penalty, target stays put
- Target only advances when acquired correctly — no skipping past difficult targets

### Settings panel

- **Click toggles:** blue / purple / orange checkboxes — any combination allowed (one, two, or all three)
- **Grid size (Practice only):** 6×6, 9×9, 12×12, 16×16, 25×25
- **Timer:** 1, 2, 3, 4, 5 minutes (Practice mode adds an "Off" option)
- Game mode is locked at 25×25 regardless of the grid-size setting
- Mode is selected via the menu buttons (Practice / Game)

**Defaults:** 6×6 grid (Practice), 60s timer, all three colors enabled

### Scoring

- BPS = log₂(N²) × max(0, correct − incorrect) / seconds
- Both wrong-cell and wrong-color clicks count toward "incorrect"
- Final BPS shown at end of run on the End screen
- **Top 3 scores** displayed on the right side of the Game screen during play, keyed per `(enabledColors, timer)` combination — gives the player a number to chase
- Top 10 is stored in localStorage; only the top 3 are rendered
- Top 3 only updates on completed Game-mode runs (quitting early does not qualify)

## Long-Term Vision

- **Multi-target rounds** — multiple targets visible at once, must be cleared in any order (Game mode variant)
- **Pachinko-style falling colors** — Game mode variant where colored cells drift or fall and must be clicked before they leave the grid
- **Cross-game analytics surfacing** — BPS displayed on the launcher as the headline cursor health number
- **Smaller grid sizes** — 32×32 or finer, gated behind a "stretch" mode
- **Session history graph** — BPS trend over time per configuration; the real long-term value of a benchmark
- **Public leaderboard mode** — eventually compare runs to published Neuralink Patient WebGrid scores
- **Custom challenge presets** — saved configurations users can return to (e.g. "16×16, all three colors, 5 min" as a recurring training regimen)
- **Stretch grid sizes between 16×16 and 24×24** — finer control over difficulty steps once the base ladder is proven

## Currently Building

Nothing active. Incremental polish driven by user feedback as the game gets played.

## Up Next

The MVP build sequence is complete. Real next items are the deferred TBDs:

1. **Tune the penalty formula** — currently uses standard Neuralink BPS (each wrong subtracted from correct). Once the game has been played enough to feel out whether wrong-color and wrong-cell should weight differently, revisit.
2. **Game mode escalation pattern** — when does the active color count step up (1 → 2 → 3)? Needs playtesting to figure out the right pacing.
3. **Analytics dashboard** — a separate session to design the schema for surfacing BPS over time, Practice vs Game splits, and per-configuration personal bests. Cross-game analytics surfacing in the launcher (using BPS as the headline number) ties in here.
4. **Optional menu motif** — Hackey Sac has a bouncing ball above its title; WebGrid could get a similar visual flavor element on its menu screen. TBD.

## Known Issues / Open Questions

- **Penalty formula** — currently using standard Neuralink BPS (incorrect subtracted from correct). May want to weight wrong-color vs wrong-cell differently. Revisit after MVP feels playable.
- **Game mode escalation pattern** — when does color count step up? How fast? Likely needs playtesting to tune.
- **Analytics schema** — separate conversation needed before final BPS persistence pattern. Practice vs Game split, per-configuration tracking, and cross-game surfacing all touch this.

## Tech Notes

Plain HTML / CSS / JavaScript — no engine needed.

- Grid renders as a CSS Grid container with N² cells; cell highlight is a class toggle
- Click handling routes through `shared/bci-input.js`
- All settings persist via `shared/bci-settings.js` (per-game namespace)
- Analytics namespaced under `webgrid:` via `shared/bci-analytics.js`
- Viewport scaling and back-to-launcher via `shared/bci-shell.js`

This is the second game (after Hackey Sac) to use every shared module end-to-end — ongoing validation that the shared infrastructure scales beyond a single game.
