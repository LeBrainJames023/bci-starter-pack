/* ─────────────────────────────────────────────────────────────
   BCI Shell — small reusable pieces every game uses the same way.

   - BCI.createViewportFitter(element, options)
       Scales an element via CSS transform so its natural size fits
       the viewport. Re-fits automatically on window resize. Returns
       { fit() } so the game can force a re-fit (e.g. after showing
       the element for the first time).

   - BCI.goToLauncher(path)
       Navigates back to the launcher. Defaults to the two-up path
       every game inside games/<name>/ uses.
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
