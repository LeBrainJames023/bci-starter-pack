/* ─────────────────────────────────────────────────────────────
   BCI Settings — global defaults + per-game overrides

   Global settings live under localStorage key 'bciGlobalSettings'.
   Per-game settings live under 'bciGameSettings:<gameId>'.

   Usage in a game:
     const settings = BCI.getEffectiveSettings('hackey-sac');
     // settings.cursorSensitivity, settings.enabledClicks, etc.

   Per-game overrides are shallow — any key present in the game
   override replaces the global value for that key only.
   ───────────────────────────────────────────────────────────── */

window.BCI = window.BCI || {};

BCI.DEFAULT_GLOBAL_SETTINGS = {
  cursorSensitivity: 1.0, // 0.25 – 2.0
  enabledClicks: { 0: true, 1: true, 2: true }, // blue, purple, orange
};

const GLOBAL_KEY = 'bciGlobalSettings';
const GAME_KEY_PREFIX = 'bciGameSettings:';

function safeParse(raw, fallback) {
  try {
    return JSON.parse(raw) ?? fallback;
  } catch {
    return fallback;
  }
}

BCI.getGlobalSettings = function () {
  const raw = localStorage.getItem(GLOBAL_KEY);
  const saved = safeParse(raw, {});
  return { ...BCI.DEFAULT_GLOBAL_SETTINGS, ...saved };
};

BCI.saveGlobalSettings = function (patch) {
  const current = BCI.getGlobalSettings();
  const merged = { ...current, ...patch };
  localStorage.setItem(GLOBAL_KEY, JSON.stringify(merged));
  return merged;
};

BCI.getGameSettings = function (gameId) {
  const raw = localStorage.getItem(GAME_KEY_PREFIX + gameId);
  return safeParse(raw, {});
};

BCI.saveGameSettings = function (gameId, patch) {
  const current = BCI.getGameSettings(gameId);
  const merged = { ...current, ...patch };
  localStorage.setItem(GAME_KEY_PREFIX + gameId, JSON.stringify(merged));
  return merged;
};

BCI.clearGameSettings = function (gameId) {
  localStorage.removeItem(GAME_KEY_PREFIX + gameId);
};

/* Effective settings = global defaults with per-game overrides applied on top */
BCI.getEffectiveSettings = function (gameId) {
  const global = BCI.getGlobalSettings();
  const game = BCI.getGameSettings(gameId);
  return { ...global, ...game };
};
