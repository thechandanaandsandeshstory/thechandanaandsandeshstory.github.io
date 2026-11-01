'use strict';

const dialogs = [...document.querySelectorAll('dialog')];
let lastDialogTrigger = null;
let chimeEnabled = false;
let audioContext;
let invitationPage = 1;
let selectedEvent = 'wedding';
let showerTimeout;
let blessingSent = false;
let pinCopyState = '';
let chimeVoices = [];
const shower = document.querySelector('.petal-shower');
const homePin = 'https://maps.app.goo.gl/sDHHJNV3LDDcjhfZ9';

function say(en, kn) { return document.documentElement.lang === 'kn' ? kn : en; }
function updatePage() {
  const image = document.getElementById('viewer-page');
  image.src = 'assets/invitation-page-' + invitationPage + '.webp';
  image.alt = say('Kannada invitation, page ' + invitationPage + ' of 3', 'ಕನ್ನಡ ಆಹ್ವಾನ ಪತ್ರಿಕೆ, ಪುಟ ' + invitationPage + ' / 3');
  document.getElementById('page-indicator').textContent = invitationPage + ' / 3';
  document.getElementById('previous-page').disabled = invitationPage === 1;
  document.getElementById('next-page').disabled = invitationPage === 3;
}
function selectCalendarEvent(key) {
  if (!WeddingCalendar.events[key]) return;
  selectedEvent = key;
  document.querySelectorAll('[data-event]').forEach(function (button) {
    button.setAttribute('aria-pressed', String(button.dataset.event === selectedEvent));
  });
  document.getElementById('google-calendar').href = WeddingCalendar.googleURL(key);
  ['apple-calendar', 'outlook-calendar'].forEach(function (id) {
    document.getElementById(id).href = 'calendars/' + key + '.ics';
  });
}
document.querySelectorAll('[data-event]').forEach(function (button) {
  button.addEventListener('click', function () { selectCalendarEvent(button.dataset.event); });
});
selectCalendarEvent('wedding');

function openDialog(dialog, trigger) {
  if (!dialog || typeof dialog.showModal !== 'function') return false;
  lastDialogTrigger = trigger;
  document.body.classList.add('dialog-open');
  dialog.showModal();
  dialog.scrollTop = 0;
  const scrollArea = dialog.querySelector('.dialog-scroll');
  if (scrollArea) scrollArea.scrollTop = 0;
  dialog.querySelector('[data-close]').focus({ preventScroll: true });
  if (dialog.id === 'invitation-dialog') {
    invitationPage = 1;
    updatePage();
    document.querySelector('.invitation-viewer').scrollTo(0, 0);
  }
  if (dialog.id === 'travel-dialog' && !document.querySelector('#home-map iframe')) {
    const map = document.createElement('iframe');
    map.title = say('Banglekoppa family home on Google Maps', 'ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್‌ನಲ್ಲಿ ಬಂಗ್ಲೆಕೊಪ್ಪದ ಮನೆ');
    map.src = 'https://maps.google.com/maps?q=14.236759,74.809287&z=15&output=embed';
    map.referrerPolicy = 'no-referrer-when-downgrade';
    map.loading = 'lazy';
    document.getElementById('home-map').replaceChildren(map);
  }
  if (window.syncAtmosphere) window.syncAtmosphere();
  return true;
}
document.querySelectorAll('[data-open]').forEach(function (trigger) {
  trigger.addEventListener('click', function (event) {
    if (openDialog(document.getElementById(trigger.dataset.open), trigger)) event.preventDefault();
  });
});
dialogs.forEach(function (dialog) {
  dialog.querySelectorAll('[data-close]').forEach(function (button) {
    button.addEventListener('click', function () { dialog.close(); });
  });
  dialog.addEventListener('click', function (event) {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', function () {
    document.body.classList.remove('dialog-open');
    shower.replaceChildren();
    document.body.append(shower);
    document.querySelector('.invitation-viewer').classList.remove('zoomed');
    document.getElementById('zoom-page').setAttribute('aria-pressed', 'false');
    window.updateAppLabels();
    if (lastDialogTrigger && lastDialogTrigger.isConnected) lastDialogTrigger.focus({ preventScroll: true });
    if (window.syncAtmosphere) window.syncAtmosphere();
  });
});
document.getElementById('previous-page').addEventListener('click', function () {
  invitationPage = Math.max(1, invitationPage - 1); updatePage();
});
document.getElementById('next-page').addEventListener('click', function () {
  invitationPage = Math.min(3, invitationPage + 1); updatePage();
});
document.getElementById('invitation-dialog').addEventListener('keydown', function (event) {
  if (event.key === 'ArrowLeft') { invitationPage = Math.max(1, invitationPage - 1); updatePage(); event.preventDefault(); }
  if (event.key === 'ArrowRight') { invitationPage = Math.min(3, invitationPage + 1); updatePage(); event.preventDefault(); }
});
document.getElementById('zoom-page').addEventListener('click', function () {
  const zoomed = document.querySelector('.invitation-viewer').classList.toggle('zoomed');
  this.setAttribute('aria-pressed', String(zoomed));
  window.updateAppLabels();
});

async function ringChime() {
  if (!chimeEnabled) return;
  try {
    const Audio = window.AudioContext || window.webkitAudioContext;
    if (!Audio) throw new Error('Audio unavailable');
    if (!audioContext) audioContext = new Audio();
    stopChime();
    await audioContext.resume();
    if (!chimeEnabled) return;
    [523.25, 1046.5, 1569.75].forEach(function (frequency, index) {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      const now = audioContext.currentTime;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(.075 / (index + 1), now + .012);
      gain.gain.exponentialRampToValueAtTime(.0001, now + 2.8);
      oscillator.connect(gain); gain.connect(audioContext.destination);
      chimeVoices.push(oscillator);
      oscillator.start(now); oscillator.stop(now + 2.85);
      oscillator.onended = function () { oscillator.disconnect(); gain.disconnect(); };
    });
  } catch (_) {
    chimeEnabled = false;
    window.updateAppLabels();
  }
}
function stopChime() {
  chimeVoices.forEach(function (voice) {
    try { voice.stop(); } catch (_) { /* A prior voice may already have ended. */ }
  });
  chimeVoices = [];
}
document.querySelector('.sound-control').addEventListener('click', function () {
  chimeEnabled = !chimeEnabled;
  window.updateAppLabels();
  if (chimeEnabled) ringChime();
  else stopChime();
});

function showerPetals(count) {
  clearTimeout(showerTimeout);
  shower.replaceChildren();
  if (document.documentElement.classList.contains('motion-paused') ||
      matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const blessing = document.getElementById('blessing-dialog');
  if (blessing.open) blessing.append(shower);
  else document.body.append(shower);
  const colors = ['#dfb96e', '#f5cf77', '#b64b3d', '#f3e1b6', '#d59239'];
  for (let i = 0; i < count; i += 1) {
    const petal = document.createElement('span');
    petal.className = 'falling-petal';
    petal.style.setProperty('--x', Math.random() * 100 + '%');
    petal.style.setProperty('--size', 9 + Math.random() * 10 + 'px');
    petal.style.setProperty('--drift', -90 + Math.random() * 180 + 'px');
    petal.style.setProperty('--spin', 90 + Math.random() * 540 + 'deg');
    petal.style.setProperty('--delay', Math.random() * .8 + 's');
    petal.style.setProperty('--petal', colors[i % colors.length]);
    shower.append(petal);
  }
  showerTimeout = setTimeout(function () { shower.replaceChildren(); }, 4300);
}
document.getElementById('shower-blessings').addEventListener('click', function () {
  blessingSent = true;
  showerPetals(65);
  ringChime();
  document.getElementById('blessing-status').textContent = say(
    'A little more love, a little more light. Thank you for your blessings.',
    'ನಿಮ್ಮ ಪ್ರೀತಿ ಮತ್ತು ಆಶೀರ್ವಾದಕ್ಕೆ ಹೃತ್ಪೂರ್ವಕ ಧನ್ಯವಾದಗಳು.');
});
document.querySelector('.open-invitation').addEventListener('click', function () {
  document.body.classList.add('invitation-entered');
  showerPetals(24);
  ringChime();
});
document.getElementById('copy-pin').addEventListener('click', async function () {
  try {
    if (!navigator.clipboard) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(homePin);
    pinCopyState = 'copied';
    document.getElementById('pin-status').textContent = say('Home map link copied.', 'ಮನೆಯ ಸ್ಥಳದ ಕೊಂಡಿಯನ್ನು ನಕಲಿಸಲಾಗಿದೆ.');
  } catch (_) {
    pinCopyState = 'fallback';
    document.getElementById('pin-status').textContent = say(
      'Open the directions link above and use Share in Google Maps.',
      'ಮೇಲಿನ ದಾರಿ ಕೊಂಡಿಯನ್ನು ತೆರೆದು ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್‌ನಲ್ಲಿ Share ಬಳಸಿ.');
  }
});
window.updateAppLabels = function () {
  const sound = document.querySelector('.sound-control');
  sound.setAttribute('aria-pressed', String(chimeEnabled));
  sound.querySelector('span').textContent = chimeEnabled
    ? say('Temple chime on', 'ಘಂಟಾನಾದ ಚಾಲನೆಯಲ್ಲಿದೆ')
    : say('Play a temple chime', 'ಘಂಟಾನಾದ ಕೇಳಿ');
  const zoomed = document.getElementById('zoom-page').getAttribute('aria-pressed') === 'true';
  document.getElementById('zoom-page').textContent = zoomed ? say('Zoom out', 'ಕುಗ್ಗಿಸಿ') : say('Zoom in', 'ಹಿಗ್ಗಿಸಿ');
  if (blessingSent) document.getElementById('blessing-status').textContent = say(
    'A little more love, a little more light. Thank you for your blessings.',
    'ನಿಮ್ಮ ಪ್ರೀತಿ ಮತ್ತು ಆಶೀರ್ವಾದಕ್ಕೆ ಹೃತ್ಪೂರ್ವಕ ಧನ್ಯವಾದಗಳು.');
  if (pinCopyState) document.getElementById('pin-status').textContent = pinCopyState === 'copied'
    ? say('Home map link copied.', 'ಮನೆಯ ಸ್ಥಳದ ಕೊಂಡಿಯನ್ನು ನಕಲಿಸಲಾಗಿದೆ.')
    : say('Open the directions link above and use Share in Google Maps.', 'ಮೇಲಿನ ದಾರಿ ಕೊಂಡಿಯನ್ನು ತೆರೆದು ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್‌ನಲ್ಲಿ Share ಬಳಸಿ.');
  updatePage();
};
window.updateAppLabels();

// Atmosphere is confined to the cover, pauses offscreen/in dialogs, and never runs in reduced motion.
const atmosphereCanvas = document.getElementById('petals');
const atmosphereContext = atmosphereCanvas.getContext('2d');
let atmosphereFrame = 0;
let heroVisible = true;
let canvasWidth = 0;
let canvasHeight = 0;
let previousFrameTime = 0;
const motes = Array.from({ length: 27 }, function () {
  return { x: Math.random(), y: Math.random(), size: .5 + Math.random(), speed: .0008 + Math.random() * .0013 };
});
function sizeAtmosphere() {
  const box = atmosphereCanvas.getBoundingClientRect();
  canvasWidth = box.width; canvasHeight = box.height;
  const scale = Math.min(window.devicePixelRatio || 1, 1.5);
  atmosphereCanvas.width = Math.round(box.width * scale);
  atmosphereCanvas.height = Math.round(box.height * scale);
  if (atmosphereContext) atmosphereContext.setTransform(scale, 0, 0, scale, 0, 0);
}
function renderAtmosphere(time) {
  if (!atmosphereContext) return;
  const delta = Math.min((time - previousFrameTime) / 16.67 || 1, 3);
  previousFrameTime = time;
  atmosphereContext.clearRect(0, 0, canvasWidth, canvasHeight);
  motes.forEach(function (mote) {
    mote.y -= mote.speed * delta;
    if (mote.y < 0) { mote.y = 1; mote.x = Math.random(); }
    atmosphereContext.beginPath();
    atmosphereContext.fillStyle = 'rgba(244,217,158,.4)';
    atmosphereContext.arc(mote.x * canvasWidth, mote.y * canvasHeight, mote.size, 0, Math.PI * 2);
    atmosphereContext.fill();
  });
  atmosphereFrame = requestAnimationFrame(renderAtmosphere);
}
window.syncAtmosphere = function () {
  cancelAnimationFrame(atmosphereFrame);
  atmosphereFrame = 0;
  if (!atmosphereContext) return;
  const shouldRun = heroVisible && !document.hidden && !document.querySelector('dialog[open]') &&
    !document.documentElement.classList.contains('motion-paused') && !matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (shouldRun) atmosphereFrame = requestAnimationFrame(renderAtmosphere);
  else atmosphereContext.clearRect(0, 0, canvasWidth, canvasHeight);
};
sizeAtmosphere();
if ('IntersectionObserver' in window) {
  new IntersectionObserver(function (entries) {
    heroVisible = entries[0].isIntersecting; window.syncAtmosphere();
  }).observe(document.getElementById('home'));
}
window.addEventListener('resize', function () { sizeAtmosphere(); window.syncAtmosphere(); }, { passive: true });
document.addEventListener('visibilitychange', window.syncAtmosphere);
function updateScrollState() {
  document.querySelector('.site-header').classList.toggle('is-scrolled', scrollY > 50);
  document.body.classList.toggle('past-hero', scrollY > 350);
}
window.addEventListener('scroll', updateScrollState, { passive: true });
updateScrollState();
window.syncAtmosphere();
