# Shared BCI Modules

Reusable code every game in the BCI Starter Pack can import.

## Files

| File               | Purpose                                                               |
| ------------------ | --------------------------------------------------------------------- |
| `bci-input.js`     | Universal click colors, virtual cursor tracker, cursor drawing helper |
| `bci-settings.js`  | Global + per-game settings stored in localStorage                     |
| `bci-analytics.js` | Standard analytics schema so every game's data is cross-compatible    |
| `bci-shell.js`     | Viewport fitter (responsive scaling) and Back-to-Launcher helper      |

## How to Use in a Game

In the game's `index.html`, load these files before your own game script:

```html
<script src="../../shared/bci-input.js"></script>
<script src="../../shared/bci-settings.js"></script>
<script src="../../shared/bci-analytics.js"></script>
<script src="../../shared/bci-shell.js"></script>
<script src="game.js"></script>
```

Each module attaches to the global `window.BCI` object.

## Quick Reference

### Input

```js
BCI.CLICKS; // [{ id, name, button, color, textColor, label }, ...]
BCI.CLICK_BY_BUTTON[0]; // lookup by mouse button index

const cursor = BCI.createVirtualCursor(canvas, { sensitivity: 1.0 });
(cursor.x, cursor.y); // current virtual cursor position
cursor.setSensitivity(0.5);
```

### Settings

```js
const settings = BCI.getEffectiveSettings('hackey-sac');
// → { cursorSensitivity, enabledClicks, ...any per-game overrides }

BCI.saveGlobalSettings({ cursorSensitivity: 1.5 });
BCI.saveGameSettings('hackey-sac', { cursorSensitivity: 0.8 });
```

### Analytics

```js
const session = BCI.createSession();
BCI.recordAttempt(session, clickId, wasCorrect);
BCI.recordReaction(session, clickId, reactionMs);
BCI.recordHold(session, clickId, holdMs);

// When the session ends:
BCI.saveSession('hackey-sac', session, { mode: 'game', score: 42 });

// Read stats:
BCI.getSessionHistory('hackey-sac'); // last 10 sessions
BCI.getAllTimeStats('hackey-sac'); // aggregated all-time totals
```

### Shell

```js
// Responsive scaling — pass the game's outer wrapper element.
// Re-fits on window resize automatically. Call fit() after first showing it.
const fitter = BCI.createViewportFitter(document.getElementById('wrapper'));
fitter.fit();

// Back-to-launcher navigation
BCI.goToLauncher(); // defaults to '../../index.html'

// Home button — joystick-and-cursor SVG, navigates to the launcher.
// Self-injects its CSS the first time it's called.
const home = BCI.createHomeButton(); // { showLabel?, label?, onClick?, path? }
document.getElementById('top-bar').appendChild(home);
```

## Rules for Adding to This Folder

- Only add things every game can reuse. Game-specific logic belongs in the game folder.
- Every function attaches to `window.BCI`. No global pollution outside that.
- No dependencies — these files run in any modern browser with no build step.
- Document any new exports in this README.
