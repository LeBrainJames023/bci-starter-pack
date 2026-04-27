/* ─────────────────────────────────────────────────────────────
   BCI Shell — small reusable pieces every game uses the same way.

   - BCI.createViewportFitter(element, options)
       Scales an element via CSS transform so its natural size fits
       the viewport. Re-fits automatically on window resize. Returns
       { fit() } so the game can force a re-fit (e.g. after showing
       the element for the first time).

   - BCI.goToLauncher(path)
       Navigates back to the launcher (BCI Arcade). Defaults to the
       two-up path every game inside games/<name>/ uses.

   - BCI.createHomeButton(options)
       Returns a styled <button> element: joystick-and-cursor SVG
       icon with an optional "Home" label. Clicking it navigates
       back to the launcher by default. Pass { showLabel: false }
       for an icon-only button. Pass { onClick } to override.
   ───────────────────────────────────────────────────────────── */

window.BCI = window.BCI || {};

BCI.createViewportFitter = function (element, options = {}) {
  const maxScale = options.maxScale ?? 2.2;
  const padding = options.padding ?? 0.92;

  function fit() {
    if (!element) return;
    if (getComputedStyle(element).display === 'none') return;

    // Measure natural size with no transform applied
    element.style.transform = 'none';
    const rect = element.getBoundingClientRect();
    const natW = rect.width;
    const natH = rect.height;
    if (natW === 0 || natH === 0) return;

    const maxW = window.innerWidth * padding;
    const maxH = window.innerHeight * padding;
    const scale = Math.min(maxW / natW, maxH / natH, maxScale);
    element.style.transform = `scale(${scale})`;
  }

  window.addEventListener('resize', fit);

  return { fit };
};

BCI.goToLauncher = function (path = '../../index.html') {
  window.location.href = path;
};

/* ── Home button ─────────────────────────────────────────────
   BCI Arcade brand mark: a tiny arcade cabinet —
   ring-and-dot cursor on top, vertical stick, dome base, and
   three small arcade buttons in BCI blue / purple / orange.
   The frame uses currentColor (neutral); only the three
   buttons carry the BCI palette so the icon reads as a brand
   mark rather than a click-input control.
   ───────────────────────────────────────────────────────────── */

const BCI_HOME_ICON_SVG = `
  <svg class="bci-home-icon" viewBox="0 0 28 28" fill="none" stroke="currentColor"
       stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <!-- Cursor: ring + center dot -->
    <circle cx="14" cy="4.5" r="2.6"/>
    <circle cx="14" cy="4.5" r="0.85" fill="currentColor" stroke="none"/>
    <!-- Stick -->
    <line x1="14" y1="7.4" x2="14" y2="14.4"/>
    <!-- Base / dome -->
    <ellipse cx="14" cy="15.6" rx="5" ry="1.5" fill="currentColor" fill-opacity="0.18"/>
    <!-- Three arcade buttons in BCI colors -->
    <circle cx="7"  cy="22" r="1.7" fill="#4488ff" stroke="#4488ff" stroke-width="0.8"/>
    <circle cx="14" cy="22" r="1.7" fill="#aa44ff" stroke="#aa44ff" stroke-width="0.8"/>
    <circle cx="21" cy="22" r="1.7" fill="#ff8833" stroke="#ff8833" stroke-width="0.8"/>
  </svg>
`;

const BCI_HOME_STYLES = `
  .bci-home-btn {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    background: rgba(22, 27, 34, 0.92);
    border: 1px solid #3a4150;
    border-radius: 6px;
    color: #c9d1d9;
    padding: 8px 14px 6px;
    cursor: pointer;
    font-family: 'Courier New', monospace;
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    line-height: 1;
    transition:
      color 0.15s,
      border-color 0.15s,
      background 0.15s,
      transform 0.12s;
  }
  .bci-home-btn:hover {
    color: #e8e4d9;
    border-color: #7d8590;
    background: #1c2128;
  }
  .bci-home-btn:active {
    transform: translateY(1px);
  }
  .bci-home-icon {
    width: 34px;
    height: 34px;
    display: block;
  }
  .bci-home-label {
    line-height: 1;
  }
  .bci-home-btn--icon-only {
    padding: 8px;
    gap: 0;
  }
  .bci-home-btn--icon-only .bci-home-icon {
    width: 28px;
    height: 28px;
  }
`;

function injectHomeButtonStyles() {
  if (document.getElementById('bci-home-btn-styles')) return;
  const style = document.createElement('style');
  style.id = 'bci-home-btn-styles';
  style.textContent = BCI_HOME_STYLES;
  document.head.appendChild(style);
}

BCI.createHomeButton = function (options = {}) {
  injectHomeButtonStyles();
  const showLabel = options.showLabel !== false;
  const label = options.label || 'Home';
  const onClick = options.onClick || (() => BCI.goToLauncher(options.path));

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'bci-home-btn' + (showLabel ? '' : ' bci-home-btn--icon-only');
  btn.title = 'Home — BCI Arcade';
  btn.setAttribute('aria-label', 'Home — BCI Arcade');
  btn.innerHTML =
    BCI_HOME_ICON_SVG + (showLabel ? `<span class="bci-home-label">${label}</span>` : '');
  btn.addEventListener('click', onClick);
  return btn;
};

// Raw SVG markup for inlining (e.g. launcher header logo). Caller controls sizing via CSS.
BCI.HOME_ICON_SVG = BCI_HOME_ICON_SVG;
