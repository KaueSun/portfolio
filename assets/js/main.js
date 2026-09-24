'use strict';

// Navigation, accessible interactions and motion preferences.
document.documentElement.classList.add('has-js');
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const mobileQuery = window.matchMedia('(max-width: 620px)');
const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
let effectsPaused = false;
const motionAllowed = () => !motionQuery.matches && !effectsPaused;

function setMenu(open, restoreFocus = false) {
  navigation.classList.toggle('is-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.querySelector('.menu-label').textContent = open ? 'Fechar' : 'Menu';
  if (restoreFocus) menuToggle.focus();
}

function syncMenu() {
  menuToggle.hidden = !mobileQuery.matches;
  setMenu(false);
}

syncMenu();
mobileQuery.addEventListener('change', syncMenu);
menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
navigation.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (!link) return;
  setMenu(false);
  if (mobileQuery.matches) {
    const target = document.querySelector(link.hash);
    if (target) {
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
    }
  }
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') setMenu(false, true);
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.site-header')) setMenu(false);
});
document.addEventListener('focusin', (event) => {
  if (!event.target.closest('.site-header')) setMenu(false);
});

// Observe once: no scroll handler per card and no permanently hidden content.
let revealObserver;
const revealElements = document.querySelectorAll('.reveal');
function syncReveals() {
  revealObserver?.disconnect();
  revealElements.forEach((element) => element.classList.remove('is-pending'));
  if (!motionAllowed() || !('IntersectionObserver' in window)) return;
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove('is-pending');
      entry.target.dataset.revealed = 'true';
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08 });
  revealElements.forEach((element) => {
    if (element.dataset.revealed || element.getBoundingClientRect().top < window.innerHeight) return;
    element.classList.add('is-pending');
    revealObserver.observe(element);
  });
}
syncReveals();
motionQuery.addEventListener('change', syncReveals);

const sectionLinks = [...navigation.querySelectorAll('a')];
const sections = sectionLinks.map((link) => document.querySelector(link.hash));
const progress = document.querySelector('.scroll-progress');
const header = document.querySelector('.site-header');
let scrollFrame = 0;
function updateScroll() {
  scrollFrame = 0;
  header.classList.toggle('is-scrolled', window.scrollY > 30);
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const fraction = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
  progress.style.transform = `scaleX(${fraction})`;
  const offset = header.offsetHeight + window.innerHeight * 0.3;
  let current = sections[0];
  sections.forEach((section) => { if (section.getBoundingClientRect().top <= offset) current = section; });
  if (fraction >= 0.995) current = sections[sections.length - 1];
  sectionLinks.forEach((link) => {
    if (link.hash === `#${current.id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
function requestScrollUpdate() {
  if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateScroll);
}
window.addEventListener('scroll', requestScrollUpdate, { passive: true });
window.addEventListener('resize', requestScrollUpdate, { passive: true });
window.addEventListener('load', requestScrollUpdate);
updateScroll();

// Subtle tilt only for precise pointers and when motion is allowed.
const portrait = document.querySelector('[data-tilt]');
let tiltFrame = 0;
function resetTilt() {
  window.cancelAnimationFrame(tiltFrame);
  portrait.style.removeProperty('--rx');
  portrait.style.removeProperty('--ry');
}
portrait.addEventListener('pointermove', (event) => {
  if (!motionAllowed() || !finePointerQuery.matches) return;
  const bounds = portrait.getBoundingClientRect();
  const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 5;
  const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * -5;
  window.cancelAnimationFrame(tiltFrame);
  tiltFrame = window.requestAnimationFrame(() => {
    portrait.style.setProperty('--rx', `${y.toFixed(2)}deg`);
    portrait.style.setProperty('--ry', `${x.toFixed(2)}deg`);
  });
});
portrait.addEventListener('pointerleave', resetTilt);
motionQuery.addEventListener('change', resetTilt);
finePointerQuery.addEventListener('change', resetTilt);

const copyButton = document.querySelector('.copy-email');
const copyLabel = copyButton.querySelector('.copy-label');
const copyStatus = document.querySelector('#copy-status');
let copyTimer;
if (navigator.clipboard && window.isSecureContext) {
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    window.clearTimeout(copyTimer);
    try {
      await navigator.clipboard.writeText(copyButton.dataset.email);
      copyLabel.textContent = 'E-mail copiado';
      copyStatus.textContent = 'Pronto! Cole o e-mail onde preferir.';
    } catch {
      copyLabel.textContent = 'Copiar e-mail';
      copyStatus.textContent = 'Não foi possível copiar. Use o endereço logo abaixo dos botões.';
    }
    copyTimer = window.setTimeout(() => {
      copyLabel.textContent = 'Copiar e-mail';
      copyStatus.textContent = '';
    }, 4500);
  });
}
document.querySelector('#year').textContent = new Date().getFullYear();

// The visitor can pause continuous decoration independently of OS preferences.
const effectsToggle = document.querySelector('#effects-toggle');
effectsToggle.hidden = false;
function syncEffectsToggle() {
  const reduced = motionQuery.matches;
  effectsToggle.disabled = reduced;
  effectsToggle.setAttribute('aria-pressed', String(effectsPaused || reduced));
  effectsToggle.querySelector('.effects-label').textContent = reduced
    ? 'Movimento reduzido'
    : effectsPaused ? 'Retomar efeitos' : 'Pausar efeitos';
}
effectsToggle.addEventListener('click', () => {
  effectsPaused = !effectsPaused;
  document.documentElement.classList.toggle('motion-paused', effectsPaused);
  syncEffectsToggle();
  syncReveals();
  resetTilt();
  document.dispatchEvent(new Event('effectschange'));
});
motionQuery.addEventListener('change', syncEffectsToggle);
syncEffectsToggle();
