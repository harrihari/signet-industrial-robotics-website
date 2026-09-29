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

