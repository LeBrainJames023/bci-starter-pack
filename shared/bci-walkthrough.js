/* ─────────────────────────────────────────────────────────────
   BCI Walkthrough — shared first-time intro overlay.

   Every game in the BCI Starter Pack uses this to teach controls
   the first time a user opens it (or a new mode within it). BCI
   users come in cold; even "intuitive" UI assumes the user has
   already trained the click that maps to left/right/middle. A
   short, visual walkthrough removes that guesswork.

   Public API:
     BCI.showWalkthrough(id, steps, options)
       id      — unique string per walkthrough, e.g. 'hoops/ft'
       steps   — array of { title, body, click?, clicks? }
       options — { force?: bool, onClose?: fn, onSkip?: fn }
                 force=true bypasses the first-time check.

     BCI.hasSeenWalkthrough(id) → boolean
     BCI.markWalkthroughSeen(id)
     BCI.resetWalkthroughs()  — clears all seen flags (debug)

     BCI.createHelpButton(getWalkthrough)
       getWalkthrough — () => { id, steps } returning the
                        walkthrough to replay when clicked.
                        Returning null/undefined disables the click.

   Step shape:
     {
       title: 'Free Throw',
       body:  'Wait for the ball at the rim, then click...',
       click: 'left' | 'right' | 'middle',   // highlight one click
       clicks: ['left','right','middle']     // show all three
     }
     `body` may be a string or an array of strings (paragraphs).

   localStorage key: 'bci-walkthrough-seen' → JSON array of ids.
   ───────────────────────────────────────────────────────────── */

window.BCI = window.BCI || {};

const BCI_WT_STORAGE_KEY = 'bci-walkthrough-seen';

const BCI_WT_CLICK_MAP = {
  left: { color: '#4488ff', label: 'LEFT CLICK', textColor: '#000' },
  middle: { color: '#aa44ff', label: 'MIDDLE CLICK', textColor: '#fff' },
  right: { color: '#ff8833', label: 'RIGHT CLICK', textColor: '#000' },
};

function bciWtReadSeen() {
  try {
    const raw = localStorage.getItem(BCI_WT_STORAGE_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function bciWtWriteSeen(arr) {
  try {
    localStorage.setItem(BCI_WT_STORAGE_KEY, JSON.stringify(arr));
  } catch {
    /* localStorage unavailable — silently ignore. */
  }
}

BCI.hasSeenWalkthrough = function (id) {
  return bciWtReadSeen().includes(id);
};

BCI.markWalkthroughSeen = function (id) {
  const seen = bciWtReadSeen();
  if (!seen.includes(id)) {
    seen.push(id);
    bciWtWriteSeen(seen);
  }
};

BCI.resetWalkthroughs = function () {
  bciWtWriteSeen([]);
};

/* ── Styles (self-injecting, mirrors bci-shell pattern) ───── */

const BCI_WT_STYLES = `
  .bci-wt-overlay {
    position: fixed;
    inset: 0;
    background: rgba(8, 11, 16, 0.88);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99999;
    font-family: 'Courier New', monospace;
    color: #e8e4d9;
    opacity: 0;
    transition: opacity 0.18s ease-out;
  }
  .bci-wt-overlay.is-visible { opacity: 1; }

  .bci-wt-card {
    background: #161b22;
    border: 1px solid #3a4150;
    border-radius: 10px;
    width: min(640px, 92vw);
    max-height: 88vh;
    padding: 36px 40px 28px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
    display: flex;
    flex-direction: column;
    gap: 22px;
  }

  .bci-wt-dots {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  .bci-wt-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #2a313c;
    border: 1px solid #3a4150;
    transition: background 0.15s;
  }
  .bci-wt-dot.is-active { background: #c9d1d9; border-color: #c9d1d9; }

  .bci-wt-title {
    text-align: center;
    font-size: 26px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #e8e4d9;
    line-height: 1.2;
    margin: 0;
  }

  .bci-wt-body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 17px;
    line-height: 1.55;
    color: #c9d1d9;
    text-align: center;
    margin: 0;
  }
  .bci-wt-body p { margin: 0 0 10px; }
  .bci-wt-body p:last-child { margin-bottom: 0; }

  .bci-wt-clicks {
    display: flex;
    justify-content: center;
    gap: 28px;
    flex-wrap: wrap;
  }
  .bci-wt-click {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
  .bci-wt-click-dot {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Courier New', monospace;
    font-size: 13px;
    letter-spacing: 1px;
    font-weight: bold;
    border: 3px solid rgba(255, 255, 255, 0.18);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
  }
  .bci-wt-click--solo .bci-wt-click-dot {
    width: 96px;
    height: 96px;
    font-size: 15px;
    border-width: 4px;
  }
  .bci-wt-click-label {
    font-family: 'Courier New', monospace;
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #8b949e;
  }
  .bci-wt-click--solo .bci-wt-click-label {
    font-size: 13px;
    color: #c9d1d9;
  }

  .bci-wt-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    margin-top: 4px;
  }
  .bci-wt-next {
    min-width: 240px;
    min-height: 60px;
    padding: 14px 36px;
    font-family: 'Courier New', monospace;
    font-size: 16px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #e8e4d9;
    background: #1c2128;
    border: 1px solid #7d8590;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.15s, color 0.15s, border-color 0.15s, transform 0.1s;
  }
  .bci-wt-next:hover {
    background: #232a33;
    color: #fff;
    border-color: #c9d1d9;
  }
  .bci-wt-next:active { transform: translateY(1px); }

  .bci-wt-skip {
    background: none;
    border: none;
    color: #6e7681;
    font-family: 'Courier New', monospace;
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    cursor: pointer;
    padding: 8px 12px;
  }
  .bci-wt-skip:hover { color: #c9d1d9; }

  /* Help "?" button — pairs visually with the home button */
  .bci-help-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    background: rgba(22, 27, 34, 0.92);
    border: 1px solid #3a4150;
    border-radius: 6px;
    color: #c9d1d9;
    cursor: pointer;
    font-family: 'Courier New', monospace;
    font-size: 22px;
    font-weight: bold;
    line-height: 1;
    padding: 0;
    transition: color 0.15s, border-color 0.15s, background 0.15s, transform 0.12s;
  }
  .bci-help-btn:hover {
    color: #e8e4d9;
    border-color: #7d8590;
    background: #1c2128;
  }
  .bci-help-btn:active { transform: translateY(1px); }
`;

function bciWtInjectStyles() {
  if (document.getElementById('bci-wt-styles')) return;
  const style = document.createElement('style');
  style.id = 'bci-wt-styles';
  style.textContent = BCI_WT_STYLES;
  document.head.appendChild(style);
}

/* ── Render helpers ──────────────────────────────────────── */

function bciWtRenderClick(clickKey, solo) {
  const def = BCI_WT_CLICK_MAP[clickKey];
  if (!def) return '';
  const wrap = solo ? 'bci-wt-click bci-wt-click--solo' : 'bci-wt-click';
  return `
    <div class="${wrap}">
      <div class="bci-wt-click-dot"
           style="background:${def.color};color:${def.textColor};">
        ●
      </div>
      <div class="bci-wt-click-label">${def.label}</div>
    </div>
  `;
}

function bciWtRenderClicksRow(step) {
  if (step.click && BCI_WT_CLICK_MAP[step.click]) {
    return `<div class="bci-wt-clicks">${bciWtRenderClick(step.click, true)}</div>`;
  }
  if (Array.isArray(step.clicks) && step.clicks.length) {
    const inner = step.clicks.map((c) => bciWtRenderClick(c, false)).join('');
    return `<div class="bci-wt-clicks">${inner}</div>`;
  }
  return '';
}

function bciWtRenderBody(body) {
  if (Array.isArray(body)) {
    return body.map((p) => `<p>${p}</p>`).join('');
  }
  return `<p>${body || ''}</p>`;
}

function bciWtRenderDots(total, current) {
  let html = '';
  for (let i = 0; i < total; i++) {
    html += `<div class="bci-wt-dot${i === current ? ' is-active' : ''}"></div>`;
  }
  return html;
}

/* ── Main entry point ────────────────────────────────────── */

BCI.showWalkthrough = function (id, steps, options = {}) {
  if (!Array.isArray(steps) || steps.length === 0) return;
  if (!options.force && BCI.hasSeenWalkthrough(id)) {
    if (typeof options.onClose === 'function')
      options.onClose({ skipped: false, autoSkipped: true });
    return;
  }

  bciWtInjectStyles();

  const overlay = document.createElement('div');
  overlay.className = 'bci-wt-overlay';
  overlay.innerHTML = `
    <div class="bci-wt-card" role="dialog" aria-modal="true" aria-label="Walkthrough">
      <div class="bci-wt-dots"></div>
      <h2 class="bci-wt-title"></h2>
      <div class="bci-wt-clicks-slot"></div>
      <div class="bci-wt-body"></div>
      <div class="bci-wt-buttons">
        <button type="button" class="bci-wt-next"></button>
        <button type="button" class="bci-wt-skip">Skip</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const dotsEl = overlay.querySelector('.bci-wt-dots');
  const titleEl = overlay.querySelector('.bci-wt-title');
  const clicksSlot = overlay.querySelector('.bci-wt-clicks-slot');
  const bodyEl = overlay.querySelector('.bci-wt-body');
  const nextBtn = overlay.querySelector('.bci-wt-next');
  const skipBtn = overlay.querySelector('.bci-wt-skip');

  let index = 0;

  function render() {
    const step = steps[index];
    dotsEl.innerHTML = bciWtRenderDots(steps.length, index);
    titleEl.textContent = step.title || '';
    clicksSlot.innerHTML = bciWtRenderClicksRow(step);
    bodyEl.innerHTML = bciWtRenderBody(step.body);
    const isLast = index === steps.length - 1;
    nextBtn.textContent = isLast ? 'Got it' : 'Next →';
    skipBtn.style.visibility = isLast ? 'hidden' : 'visible';
  }

  function close(skipped) {
    BCI.markWalkthroughSeen(id);
    overlay.classList.remove('is-visible');
    setTimeout(() => {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      if (skipped && typeof options.onSkip === 'function') options.onSkip();
      if (typeof options.onClose === 'function') options.onClose({ skipped, autoSkipped: false });
    }, 200);
  }

  nextBtn.addEventListener('click', () => {
    if (index < steps.length - 1) {
      index += 1;
      render();
    } else {
      close(false);
    }
  });

  skipBtn.addEventListener('click', () => close(true));

  render();
  /* Defer the visibility class one frame so the CSS transition runs. */
  requestAnimationFrame(() => overlay.classList.add('is-visible'));
};

/* ── Help button factory ─────────────────────────────────── */

BCI.createHelpButton = function (getWalkthrough) {
  bciWtInjectStyles();
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'bci-help-btn';
  btn.title = 'How to play';
  btn.setAttribute('aria-label', 'How to play');
  btn.textContent = '?';
  btn.addEventListener('click', () => {
    const wt = typeof getWalkthrough === 'function' ? getWalkthrough() : getWalkthrough;
    if (!wt || !wt.id || !Array.isArray(wt.steps)) return;
    BCI.showWalkthrough(wt.id, wt.steps, { force: true });
  });
  return btn;
};
