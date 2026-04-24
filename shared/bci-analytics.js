/* ─────────────────────────────────────────────────────────────
   BCI Analytics — standard schema across every game in the pack

   All games write to localStorage in a unified format so the
   launcher can eventually aggregate cross-game stats (weakest
   click, reaction time trends, etc).

   Storage keys:
     bciAllTime:<gameId>        → all-time per-click totals
     bciSessionHistory:<gameId> → last 10 sessions (array)

   Usage:
     const session = BCI.createSession();
     BCI.recordAttempt(session, clickId, wasCorrect);
     BCI.recordReaction(session, clickId, reactionMs);
     BCI.recordHold(session, clickId, holdMs);
     BCI.saveSession('hackey-sac', session, { mode: 'game', score: 42 });
   ───────────────────────────────────────────────────────────── */

window.BCI = window.BCI || {};

const ALL_TIME_PREFIX = 'bciAllTime:';
const HISTORY_PREFIX = 'bciSessionHistory:';
const MAX_HISTORY = 10;

function safeParse(raw, fallback) {
  try {
    return JSON.parse(raw) ?? fallback;
  } catch {
    return fallback;
  }
}

function emptyFinger() {
  return { attempts: 0, correct: 0, holds: [], reactions: [] };
}

function emptyPersistentFinger() {
  return { attempts: 0, correct: 0, totalHoldMs: 0, totalReactionMs: 0 };
}

/* A live session — held in memory while the user is playing.
   Only when the session ends does it get persisted via saveSession(). */
BCI.createSession = function () {
  return {
    startedAt: Date.now(),
    fingers: {
      0: emptyFinger(),
      1: emptyFinger(),
      2: emptyFinger(),
    },
  };
};

BCI.recordAttempt = function (session, clickId, wasCorrect) {
  const f = session.fingers[clickId];
  if (!f) return;
  f.attempts++;
  if (wasCorrect) f.correct++;
};

BCI.recordReaction = function (session, clickId, reactionMs) {
  const f = session.fingers[clickId];
  if (!f) return;
  if (reactionMs > 50 && reactionMs < 30000) f.reactions.push(reactionMs);
};

BCI.recordHold = function (session, clickId, holdMs) {
  const f = session.fingers[clickId];
  if (!f) return;
  if (holdMs > 0 && holdMs < 3000) f.holds.push(holdMs);
};

/* Persist a finished session for a specific game.
   extraStats is an arbitrary object merged into the session entry
   (score, streak, mode, etc) — game-specific fields. */
BCI.saveSession = function (gameId, session, extraStats = {}) {
  const totalAttempts = Object.values(session.fingers).reduce((a, f) => a + f.attempts, 0);
  if (totalAttempts === 0) return;

  /* Update all-time totals */
  const allTimeKey = ALL_TIME_PREFIX + gameId;
  const allTime = safeParse(localStorage.getItem(allTimeKey), {
    fingers: { 0: emptyPersistentFinger(), 1: emptyPersistentFinger(), 2: emptyPersistentFinger() },
  });

  for (let i = 0; i < 3; i++) {
    const s = session.fingers[i];
    if (s.attempts === 0) continue;
    const at = allTime.fingers[i];
    at.attempts += s.attempts;
    at.correct += s.correct;
    at.totalHoldMs += s.holds.reduce((a, b) => a + b, 0);
    at.totalReactionMs += s.reactions.reduce((a, b) => a + b, 0);
  }
  localStorage.setItem(allTimeKey, JSON.stringify(allTime));

  /* Append to session history (cap at MAX_HISTORY) */
  const historyKey = HISTORY_PREFIX + gameId;
  let history = safeParse(localStorage.getItem(historyKey), []);

  const fingers = {};
  for (let i = 0; i < 3; i++) {
    const f = session.fingers[i];
    fingers[i] = {
      attempts: f.attempts,
      correct: f.correct,
      avgHoldMs: f.holds.length
        ? Math.round(f.holds.reduce((a, b) => a + b, 0) / f.holds.length)
        : null,
      avgReactionMs: f.reactions.length
        ? Math.round(f.reactions.reduce((a, b) => a + b, 0) / f.reactions.length)
        : null,
    };
  }

  const now = new Date();
  const dateStr =
    now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) +
    ' · ' +
    now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

  history.unshift({
    id: now.getTime(),
    gameId,
    startedAt: session.startedAt,
    endedAt: now.getTime(),
    dateStr,
    fingers,
    ...extraStats,
  });

  if (history.length > MAX_HISTORY) history = history.slice(0, MAX_HISTORY);
  localStorage.setItem(historyKey, JSON.stringify(history));
};

BCI.getSessionHistory = function (gameId) {
  return safeParse(localStorage.getItem(HISTORY_PREFIX + gameId), []);
};

BCI.getAllTimeStats = function (gameId) {
  return safeParse(localStorage.getItem(ALL_TIME_PREFIX + gameId), {
    fingers: { 0: emptyPersistentFinger(), 1: emptyPersistentFinger(), 2: emptyPersistentFinger() },
  });
};

BCI.clearAnalytics = function (gameId) {
  localStorage.removeItem(ALL_TIME_PREFIX + gameId);
  localStorage.removeItem(HISTORY_PREFIX + gameId);
};
