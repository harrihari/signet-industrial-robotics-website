import { drawFrame } from './engineering-scene.mjs';

const canvas = document.getElementById('engineering-canvas');
const ctx = canvas.getContext('2d');
const previousFrame = document.createElement('canvas');
const previousContext = previousFrame.getContext('2d');
const stageButtons = [...document.querySelectorAll('.stage-choice')];
const toggle = document.getElementById('motion-toggle');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const stages = [
  ['01 / Subsea acquisition', 'Measure the relationship between connection points.', 'A generic inertial metrology bottle moves between two connection points.'],
  ['02 / Remote specialist', 'Connect field measurements with specialist review.', 'Field data connects to a remote specialist for review.'],
  ['03 / Pre-fabrication DC', 'Check the geometry and references for fabrication.', 'A nominal jumper schematic shows reference geometry before fabrication.'],
  ['04 / Post-fabrication DC', 'Verify the completed assembly against project dimensions.', 'The completed jumper schematic is shown with dimensional verification references.']
];
let stage = 0, paused = reduced.matches, time = 3, stageTime = 0;
let visible = true, last = 0, drawn = 0, width = 0, height = 0, transition = 1;

function paint() {
  if (ctx && width && height) {
    const blend = transition * transition * (3 - 2 * transition);
    ctx.globalAlpha = blend;
    drawFrame(ctx, width, height, { time, stage });
    if (blend < 1 && previousFrame.width) {
      ctx.globalAlpha = 1 - blend;
      ctx.drawImage(previousFrame, 0, 0, width, height);
    }
    ctx.globalAlpha = 1;
  }
  stageButtons[stage].style.setProperty('--stage-progress', String(Math.max(.04, stageTime / 9)));
}
function resize() {
  const rect = canvas.getBoundingClientRect();
  width = rect.width;
  height = rect.height;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  ctx?.setTransform(ratio, 0, 0, ratio, 0, 0);
  transition = 1;
  paint();
}
function selectStage(index) {
  if (index !== stage && ctx && previousContext && !reduced.matches) {
    previousFrame.width = canvas.width;
    previousFrame.height = canvas.height;
    previousContext.drawImage(canvas, 0, 0);
    transition = 0;
  }
  stage = index;
  stageTime = 0;
  document.querySelector('.view-heading > span:last-child').textContent = `0${index + 1} / 04`;
  document.querySelector('.view-heading > span').textContent = index < 2 ? 'INERTIAL METROLOGY' : 'DIMENSIONAL CONTROL';
  stageButtons.forEach((button, i) => {
    button.classList.toggle('active', i === index);
    button.setAttribute('aria-pressed', String(i === index));
  });
  document.getElementById('scene-index').textContent = stages[index][0];
  document.getElementById('scene-description').textContent = stages[index][1];
  canvas.setAttribute('aria-label', stages[index][2]);
  paint();
}
function setPaused(value) {
  paused = value;
  toggle.setAttribute('aria-pressed', String(value));
  toggle.setAttribute('aria-label', value ? 'Play animation' : 'Pause animation');
  toggle.innerHTML = value ? '<span aria-hidden="true">▶</span>' : '<span aria-hidden="true">Ⅱ</span>';
}
stageButtons.forEach((button, i) => button.addEventListener('click', () => {
  setPaused(true);
  selectStage(i);
}));
toggle.addEventListener('click', () => setPaused(!paused));
reduced.addEventListener('change', event => {
  setPaused(event.matches);
  if (event.matches) { transition = 1; paint(); }
});
function loop(timestamp) {
  const delta = last ? Math.min((timestamp - last) / 1000, .05) : 0;
  last = timestamp;
  if (visible && !document.hidden && (!paused || transition < 1)) {
    const wasTransitioning = transition < 1;
    if (!paused) {
      time += delta;
      stageTime += delta;
      if (stageTime > 9) selectStage((stage + 1) % 4);
    }
    transition = Math.min(1, transition + delta / .42);
    if (timestamp - drawn > 32 || (wasTransitioning && transition === 1)) { paint(); drawn = timestamp; }
  }
  requestAnimationFrame(loop);
}
if (ctx) {
  new ResizeObserver(resize).observe(canvas.parentElement);
  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; }).observe(canvas);
  resize();
  requestAnimationFrame(loop);
} else {
  canvas.hidden = true;
  document.getElementById('canvas-fallback').hidden = false;
  toggle.hidden = true;
}
setPaused(paused);

// Keep navigation available and show which section is currently being read.
const shell = document.querySelector('.navigation-shell');
const menu = document.querySelector('.menu-toggle');
const nav = document.getElementById('mobile-nav');
const compact = window.matchMedia('(max-width: 1060px)');
function closeMenu() {
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Open menu');
  nav.hidden = true;
}
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  nav.hidden = !open;
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
compact.addEventListener('change', closeMenu);
document.addEventListener('click', event => { if (!nav.hidden && !shell.contains(event.target)) closeMenu(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !nav.hidden) { closeMenu(); menu.focus(); }
});
const sectionLinks = [...document.querySelectorAll('.main-nav a, .mobile-nav a')];
const sections = [...document.querySelectorAll('main > section[id]')];
let scrollPending = false;
function updateNavigation() {
  const anchor = shell.getBoundingClientRect().height + 130;
  let current = '';
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= anchor) current = section.id;
  }
  shell.classList.toggle('is-scrolled', window.scrollY > 12);
  sectionLinks.forEach(link => {
    if (link.hash === `#${current}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  scrollPending = false;
}
window.addEventListener('scroll', () => {
  if (!scrollPending) { scrollPending = true; requestAnimationFrame(updateNavigation); }
}, { passive: true });
window.addEventListener('resize', updateNavigation);
updateNavigation();

// A single, restrained entrance as each section enters view.
if (!reduced.matches && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  }), { threshold: .08 });
  document.querySelectorAll('.section-intro,.process-list article,.capability-heading,.capability-card,.experience-story,.locations > div,.contact-layout').forEach((item, i) => {
    if (item.getBoundingClientRect().top > window.innerHeight * .88) {
      item.classList.add('reveal-pending');
      item.style.setProperty('--reveal-delay', `${(i % 3) * 55}ms`);
      revealObserver.observe(item);
    }
  });
}
