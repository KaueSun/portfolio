'use strict';

const menu = document.querySelector('.menu-toggle');
const nav = document.getElementById('navigation');
const mobile = matchMedia('(max-width: 52rem)');
const sections = [...nav.querySelectorAll('a')].map(link => ({
  link,
  target: document.getElementById(link.hash.slice(1)),
}));

function setMenu(open) {
  nav.classList.toggle('open', open);
  menu.setAttribute('aria-expanded', String(open));
  menu.textContent = open ? 'Fechar' : 'Menu';
}

function sizeMenu() {
  menu.hidden = !mobile.matches;
  setMenu(false);
}

document.documentElement.classList.add('enhanced');
menu.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
mobile.addEventListener('change', sizeMenu);
sizeMenu();
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) {
    setMenu(false);
    menu.focus();
  }
});
function closeOutside(event) {
  if (!event.target.closest('.site-header')) setMenu(false);
}
document.addEventListener('click', closeOutside);
document.addEventListener('focusin', closeOutside);
nav.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (!link || !mobile.matches) return;
  const target = document.getElementById(link.hash.slice(1));
  setMenu(false);
  target.tabIndex = -1;
  target.focus({preventScroll:true});
});

let scheduled = false;
function selectSection() {
  scheduled = false;
  const edge = document.querySelector('.site-header').offsetHeight + innerHeight * .22;
  let current = sections[0];
  for (const section of sections) {
    if (section.target.getBoundingClientRect().top <= edge) current = section;
  }
  if (innerHeight + scrollY >= document.documentElement.scrollHeight - 2) current = sections.at(-1);
  for (const section of sections) {
    if (section === current) section.link.setAttribute('aria-current', 'location');
    else section.link.removeAttribute('aria-current');
  }
}
function scheduleSection() {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(selectSection);
}
addEventListener('scroll', scheduleSection, {passive:true});
addEventListener('resize', scheduleSection);
selectSection();

const archive = document.getElementById('archive');
function expandForHash(hash) {
  const target = document.getElementById(hash.slice(1));
  if (target && archive.contains(target)) archive.open = true;
}
document.addEventListener('click', event => {
  const link = event.target.closest('a[href^="#"]');
  if (link) expandForHash(link.hash);
});
addEventListener('hashchange', () => expandForHash(location.hash));
expandForHash(location.hash);

const copy = document.querySelector('.copy-email');
const status = document.querySelector('.copy-status');
if (navigator.clipboard && isSecureContext) {
  copy.hidden = false;
  copy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(copy.dataset.email);
      status.textContent = 'E-mail copiado.';
    } catch {
      status.textContent = 'Selecione o endereço acima para copiá-lo.';
    }
  });
}

const motion = document.querySelector('.motion-control');
const systemMotion = matchMedia('(prefers-reduced-motion: reduce)');
let paused = false;
function syncMotion() {
  motion.hidden = systemMotion.matches;
  motion.setAttribute('aria-pressed', String(paused));
  motion.textContent = paused ? 'Retomar animações' : 'Pausar animações';
  document.documentElement.classList.toggle('motion-paused', paused);
}
motion.addEventListener('click', () => { paused = !paused; syncMotion(); });
systemMotion.addEventListener('change', syncMotion);
syncMotion();
document.getElementById('year').textContent = new Date().getFullYear();
