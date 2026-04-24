/* ─────────────────────────────────────────────────────────────
   BCI Input — universal click mapping and virtual cursor
   Used by every game in the BCI Starter Pack.

   Load via:
     <script src="../../shared/bci-input.js"></script>

   Exposes a global BCI object on window so any game can use:
     BCI.CLICKS          → array of click definitions
     BCI.CLICK_BY_BUTTON → lookup table by mouse button index
     BCI.createVirtualCursor(canvas, options) → cursor tracker
   ───────────────────────────────────────────────────────────── */

window.BCI = window.BCI || {};

/* Universal click colors — these never change across any game in the pack.
   Left click is always blue, right click is always orange, middle click
   is always purple. Games that only need one or two clicks simply ignore
   the rest. Games that do not surface colors at all (Tower Defense) can
   still use this table to map mouse buttons to logical actions. */
BCI.CLICKS = [
  { id: 0, name: 'Blue', button: 0, color: '#4488ff', textColor: '#000', label: 'Left' },
  { id: 1, name: 'Purple', button: 1, color: '#aa44ff', textColor: '#fff', label: 'Middle' },
  { id: 2, name: 'Orange', button: 2, color: '#ff8833', textColor: '#000', label: 'Right' },
];

/* Lookup by mouse button index (0 = left, 1 = middle, 2 = right) */
BCI.CLICK_BY_BUTTON = {};
BCI.CLICKS.forEach((c) => {
  BCI.CLICK_BY_BUTTON[c.button] = c;
});

/* ─────────────────────────────────────────────────────────────
   Virtual Cursor

   A virtual cursor is a logical cursor position the game tracks
   independently from the OS cursor. It lets the game apply a
   sensitivity multiplier so BCI users can tune how responsive
   the cursor feels inside the canvas without affecting their
   OS cursor speed.

   Usage:
     const cursor = BCI.createVirtualCursor(canvas, {
       sensitivity: 1.0,
       startX: canvas.width / 2,
       startY: canvas.height / 2,
     });

     // In your game loop / click handler:
     const x = cursor.x;
     const y = cursor.y;

     // Update sensitivity at runtime (e.g. from a settings slider):
     cursor.setSensitivity(0.5);
   ───────────────────────────────────────────────────────────── */
BCI.createVirtualCursor = function (canvas, options = {}) {
  const W = canvas.width;
  const H = canvas.height;

  let sensitivity = options.sensitivity ?? 1.0;
  let virtual = { x: options.startX ?? W / 2, y: options.startY ?? H / 2 };
  let real = { x: virtual.x, y: virtual.y };

  function toCanvasCoords(e) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (W / rect.width),
      y: (e.clientY - rect.top) * (H / rect.height),
    };
  }

  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }

  canvas.addEventListener('mouseenter', (e) => {
    const p = toCanvasCoords(e);
    real.x = p.x;
    real.y = p.y;
    virtual.x = clamp(p.x, 0, W);
    virtual.y = clamp(p.y, 0, H);
  });

  canvas.addEventListener('mousemove', (e) => {
    const p = toCanvasCoords(e);
    const dx = p.x - real.x;
    const dy = p.y - real.y;
    virtual.x = clamp(virtual.x + dx * sensitivity, 0, W);
    virtual.y = clamp(virtual.y + dy * sensitivity, 0, H);
    real.x = p.x;
    real.y = p.y;
  });

  return {
    get x() {
      return virtual.x;
    },
    get y() {
      return virtual.y;
    },
    setSensitivity(value) {
      sensitivity = value;
    },
    getSensitivity() {
      return sensitivity;
    },
    reset(x, y) {
      virtual.x = x ?? W / 2;
      virtual.y = y ?? H / 2;
      real.x = virtual.x;
      real.y = virtual.y;
    },
  };
};

/* Small utility — draw a simple crosshair cursor dot on a canvas.
   Games are free to skip this and draw their own cursor instead. */
BCI.drawCursorDot = function (ctx, x, y, options = {}) {
  const arm = options.arm ?? 7;
  const color = options.color ?? 'rgba(255,255,255,0.9)';
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(x - arm, y);
  ctx.lineTo(x + arm, y);
  ctx.moveTo(x, y - arm);
  ctx.lineTo(x, y + arm);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x, y, 2.5, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
};
