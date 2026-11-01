'use strict';
document.documentElement.classList.add('js');
const translations = [...document.querySelectorAll('[data-kn]')];
translations.forEach(function (element) { element.dataset.en = element.innerText; });
const languageButtons = [...document.querySelectorAll('[data-language]')];
let language = 'en';
let motionPaused = false;
let shareMessage = '';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const motionButton = document.querySelector('.motion-control');
const weddingTime = Date.parse('2026-12-13T09:13:00+05:30');
let lastCountdownState = '';

function remember(key, value) {
  try { localStorage.setItem(key, value); } catch (_) { /* Storage can be unavailable in private browsing. */ }
}
function recalled(key) {
  try { return localStorage.getItem(key); } catch (_) { return null; }
}
function updateMotionButton() {
  const label = language === 'kn'
    ? (motionPaused ? 'ಚಲನೆ ಪ್ರಾರಂಭಿಸಿ' : 'ಚಲನೆ ನಿಲ್ಲಿಸಿ')
    : (motionPaused ? 'Enable motion' : 'Pause motion');
  motionButton.querySelector('span').textContent = label;
  motionButton.setAttribute('aria-label', label);
  motionButton.setAttribute('aria-pressed', String(motionPaused));
  motionButton.querySelector('use').setAttribute('href', motionPaused ? '#play' : '#pause');
}
function setLanguage(nextLanguage) {
  language = nextLanguage === 'kn' ? 'kn' : 'en';
  document.documentElement.lang = language;
  translations.forEach(function (element) { element.textContent = element.dataset[language]; });
  languageButtons.forEach(function (button) {
    button.setAttribute('aria-pressed', String(button.dataset.language === language));
  });
  document.querySelector('.language-switch').setAttribute('aria-label', language === 'kn' ? 'ಜಾಲತಾಣದ ಭಾಷೆ' : 'Website language');
  document.querySelector('nav').setAttribute('aria-label', language === 'kn' ? 'ಮುಖ್ಯ ವಿಭಾಗಗಳು' : 'Main navigation');
  document.querySelector('.skip-link').textContent = language === 'kn' ? 'ವಿವಾಹದ ವಿವರಗಳಿಗೆ ಹೋಗಿ' : 'Skip to wedding details';
  document.title = language === 'kn' ? 'ಸಂದೇಶ ಮತ್ತು ಚಂದನಾ | 13 ಡಿಸೆಂಬರ್ 2026' : 'Sandesh & Chandana | 13 December 2026';
  remember('wedding-language', language);
  updateMotionButton();
  updateCountdown();
  renderShareStatus();
  if (window.updateAppLabels) window.updateAppLabels();
}
languageButtons.forEach(function (button) {
  button.addEventListener('click', function () { setLanguage(button.dataset.language); });
});
function setMotion(paused) {
  motionPaused = paused;
  document.documentElement.classList.toggle('motion-paused', motionPaused);
  updateMotionButton();
  if (window.syncAtmosphere) window.syncAtmosphere();
}
motionButton.addEventListener('click', function () {
  setMotion(!motionPaused);
  remember('wedding-motion-paused', String(motionPaused));
});
reducedMotion.addEventListener('change', function (event) {
  if (event.matches) setMotion(true);
});
// Explicit IST offset keeps the countdown correct for guests in every timezone.
function updateCountdown() {
  const remaining = Math.max(0, weddingTime - Date.now());
  const seconds = Math.floor(remaining / 1000);
  const values = {
    days: Math.floor(seconds / 86400),
    hours: Math.floor(seconds / 3600) % 24,
    minutes: Math.floor(seconds / 60) % 60,
    seconds: seconds % 60
  };
  Object.keys(values).forEach(function (unit) {
    document.getElementById(unit).textContent = String(values[unit]).padStart(2, '0');
  });
  const state = remaining === 0 ? 'celebrating' : 'waiting';
  const stateKey = language + '-' + state;
  if (stateKey !== lastCountdownState) {
    document.getElementById('countdown-heading').textContent = state === 'celebrating'
      ? (language === 'kn' ? 'ನಮ್ಮ ಸುಂದರ ಪಯಣ ಆರಂಭವಾಗಿದೆ.' : 'Our beautiful beginning is here.')
      : (language === 'kn' ? 'ಒಂದು ಸುಂದರ ಆರಂಭದ ನಿರೀಕ್ಷೆ.' : 'Until our beautiful beginning.');
    document.querySelector('.countdown').setAttribute('aria-label',
      language === 'kn' ? 'ವಿವಾಹಕ್ಕೆ ಉಳಿದಿರುವ ಸಮಯ' : 'Time until the wedding');
    lastCountdownState = stateKey;
  }
}
setLanguage(recalled('wedding-language'));
setMotion(reducedMotion.matches || recalled('wedding-motion-paused') === 'true');
setInterval(updateCountdown, 1000);
document.querySelector('.open-invitation').addEventListener('click', function () {
  if (motionPaused || reducedMotion.matches) return;
  const welcome = document.getElementById('welcome');
  welcome.classList.remove('opening');
  requestAnimationFrame(function () { welcome.classList.add('opening'); });
  setTimeout(function () { welcome.classList.remove('opening'); }, 1500);
});
function renderShareStatus() {
  const messages = {
    copied: { en: 'Invitation link copied. Send a little joy to someone you love.', kn: 'ಆಹ್ವಾನದ ಕೊಂಡಿಯನ್ನು ನಕಲಿಸಲಾಗಿದೆ.' },
    shared: { en: 'Thank you for sharing our celebration.', kn: 'ನಮ್ಮ ಸಂಭ್ರಮವನ್ನು ಹಂಚಿಕೊಂಡಿದ್ದಕ್ಕೆ ಧನ್ಯವಾದಗಳು.' },
    fallback: { en: 'Copy the link from your browser’s address bar to share the invitation.', kn: 'ಆಹ್ವಾನ ಹಂಚಿಕೊಳ್ಳಲು ಬ್ರೌಸರ್‌ನ ವಿಳಾಸ ಪಟ್ಟಿಯಿಂದ ಕೊಂಡಿಯನ್ನು ನಕಲಿಸಿ.' }
  };
  document.querySelector('.share-status').textContent = shareMessage ? messages[shareMessage][language] : '';
}
document.querySelector('.share-button').addEventListener('click', async function () {
  const url = new URL(window.location.href);
  url.hash = '';
  const data = {
    title: 'Sandesh & Chandana — Wedding Invitation',
    text: language === 'kn'
      ? 'ಸಂದೇಶ ಮತ್ತು ಚಂದನಾ ಅವರ ವಿವಾಹಕ್ಕೆ ಆತ್ಮೀಯ ಆಹ್ವಾನ. 13 ಡಿಸೆಂಬರ್ 2026, ಸಾಗರ.'
      : "You're invited to Sandesh & Chandana's wedding. 13 December 2026, Sagara.",
    url: url.href
  };
  try {
    if (navigator.share && (!navigator.canShare || navigator.canShare(data))) {
      await navigator.share(data);
      shareMessage = 'shared';
    } else if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(url.href);
      shareMessage = 'copied';
    } else {
      shareMessage = 'fallback';
    }
    renderShareStatus();
  } catch (error) {
    if (error.name !== 'AbortError') {
      shareMessage = 'fallback';
      renderShareStatus();
    }
  }
});
