'use strict';

/* Decorative, dependency-free interpretations of spatial particles, magnetic
   buttons and spotlight cards. Reference links are documented in README.md. */
(() => {
  // Keep the real pointer and normal focus behavior; only the surface moves.
  document.querySelectorAll('[data-magnetic], [data-spotlight]').forEach((element) => {
    let frame = 0;
    const magnetic = element.hasAttribute('data-magnetic');
    function reset() {
      cancelAnimationFrame(frame);
      element.style.removeProperty('--mx');
      element.style.removeProperty('--my');
      element.style.removeProperty('--sx');
      element.style.removeProperty('--sy');
    }
    element.addEventListener('pointermove', (event) => {
      if (!motionAllowed() || !finePointerQuery.matches) return;
      const bounds = element.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (magnetic) {
          element.style.setProperty('--mx', `${((x / bounds.width - 0.5) * 9).toFixed(2)}px`);
          element.style.setProperty('--my', `${((y / bounds.height - 0.5) * 7).toFixed(2)}px`);
        } else {
          element.style.setProperty('--sx', `${x.toFixed(1)}px`);
          element.style.setProperty('--sy', `${y.toFixed(1)}px`);
        }
      });
    });
    element.addEventListener('pointerleave', reset);
    element.addEventListener('pointercancel', reset);
    document.addEventListener('effectschange', reset);
    motionQuery.addEventListener('change', reset);
    finePointerQuery.addEventListener('change', reset);
  });

  const canvas = document.querySelector('#hero-canvas');
  const hero = document.querySelector('#home');
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return; // CSS supplies the static atmosphere when canvas is unavailable.

  let width = 0;
  let height = 0;
  let frame = 0;
  let lastTime = 0;
  let phase = 0;
  let visible = true;
  let points = [];
  let pointer = { x: 0, y: 0 };
  let target = { x: 0, y: 0 };

  // Deterministic distribution makes a paused scene stable across resizes.
  const stars = Array.from({ length: 65 }, (_, index) => ({
    x: ((index * 137.508) % 1000) / 1000,
    y: ((index * 271.83) % 1000) / 1000,
    size: index % 4 === 0 ? 1.2 : 0.65,
  }));

  function buildPoints() {
    points = [];
    const segments = width < 620 ? 65 : 110;
    const lanes = width < 620 ? 6 : 9;
    for (let i = 0; i < segments; i++) {
      for (let j = 0; j < lanes; j++) {
        points.push({ angle: (i / segments) * Math.PI * 2, tube: (j / lanes) * Math.PI * 2, seed: (i * 7 + j * 13) % 17 });
      }
    }
  }

  function project(angle, tube, radius) {
    const ring = radius + Math.cos(tube) * radius * 0.07;
    const x = Math.cos(angle) * ring;
    const y = Math.sin(angle) * ring;
    const z = Math.sin(tube) * radius * 0.07;
    // Rotate the torus in 3D, then apply a perspective projection to canvas.
    const tilt = 0.96;
    const ry = y * Math.cos(tilt) - z * Math.sin(tilt);
    const rz = y * Math.sin(tilt) + z * Math.cos(tilt);
    const rotation = -0.34;
    const rx = x * Math.cos(rotation) - ry * Math.sin(rotation);
    const rotatedY = x * Math.sin(rotation) + ry * Math.cos(rotation);
    const scale = 1100 / (1100 + rz);
    return {
      x: width * (width < 620 ? 0.5 : 0.75) + rx * scale + pointer.x,
      y: height * (width < 620 ? 0.74 : 0.49) + rotatedY * scale + pointer.y,
      depth: rz / radius,
      scale,
    };
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    const radius = Math.min(width * (width < 620 ? 0.54 : 0.25), 390);
    ctx.fillStyle = '#d6b7ff';
    stars.forEach((star, index) => {
      ctx.globalAlpha = 0.16 + (Math.sin(phase * 0.6 + index) + 1) * 0.1;
      ctx.beginPath();
      ctx.arc(star.x * width + pointer.x * 0.3, star.y * height, star.size, 0, Math.PI * 2);
      ctx.fill();
    });
    // Fine orbit outlines add depth without a full-screen shader or large bundle.
    for (let lane = 0; lane < 3; lane++) {
      ctx.beginPath();
      for (let i = 0; i <= 140; i++) {
        const point = project(i / 140 * Math.PI * 2, lane * 2, radius);
        if (i === 0) ctx.moveTo(point.x, point.y);
        else ctx.lineTo(point.x, point.y);
      }
      ctx.globalAlpha = 0.11;
      ctx.strokeStyle = '#bd83ff';
      ctx.lineWidth = 0.7;
      ctx.stroke();
    }
    points.forEach((point) => {
      const projected = project(point.angle + phase * 0.055, point.tube + phase * 0.13, radius);
      const front = (1 - projected.depth) * 0.5;
      ctx.globalAlpha = 0.13 + front * 0.4;
      ctx.fillStyle = point.seed % 4 === 0 ? '#e0c7ff' : '#9958eb';
      const size = (point.seed % 5 === 0 ? 1.35 : 0.7) * projected.scale;
      ctx.fillRect(projected.x, projected.y, size, size);
    });
    ctx.globalAlpha = 1;
  }

  function canAnimate() { return motionAllowed() && visible && !document.hidden; }

  function tick(now) {
    frame = 0;
    if (!canAnimate()) return;
    // Cap at 30fps; elapsed time keeps movement consistent on slower devices.
    const elapsed = now - lastTime;
    if (elapsed >= 1000 / 30) {
      phase += Math.min(elapsed, 70) / 1000;
      lastTime = now;
      pointer.x += (target.x - pointer.x) * 0.08;
      pointer.y += (target.y - pointer.y) * 0.08;
      draw();
    }
    frame = requestAnimationFrame(tick);
  }

  function syncAnimation() {
    cancelAnimationFrame(frame);
    frame = 0;
    canvas.dataset.state = canAnimate() ? 'running' : 'paused';
    if (!motionAllowed()) {
      pointer = { x: 0, y: 0 };
      target = { x: 0, y: 0 };
    }
    if (visible && !document.hidden) draw();
    if (canAnimate()) {
      lastTime = performance.now();
      frame = requestAnimationFrame(tick);
    }
  }

  function resize() {
    width = hero.clientWidth;
    height = hero.clientHeight;
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    buildPoints();
    syncAnimation();
  }

  hero.addEventListener('pointermove', (event) => {
    if (!motionAllowed() || !finePointerQuery.matches) return;
    const bounds = hero.getBoundingClientRect();
    target.x = (event.clientX / width - 0.5) * 22;
    target.y = ((event.clientY - bounds.top) / height - 0.5) * 18;
  });
  hero.addEventListener('pointerleave', () => { target = { x: 0, y: 0 }; });
  document.addEventListener('visibilitychange', syncAnimation);
  document.addEventListener('effectschange', syncAnimation);
  motionQuery.addEventListener('change', syncAnimation);
  window.addEventListener('pagehide', () => { cancelAnimationFrame(frame); frame = 0; });
  window.addEventListener('pageshow', syncAnimation);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncAnimation();
    }, { threshold: 0 }).observe(hero);
  }
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(hero);
  else window.addEventListener('resize', resize, { passive: true });
  resize();
})();
