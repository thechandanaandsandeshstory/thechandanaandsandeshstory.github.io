// Run with Playwright available on NODE_PATH, or installed locally.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.BROWSER_PATH || 'C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe', headless: true });
  const base = process.env.SITE_URL || 'http://127.0.0.1:4173/';
  const output = path.resolve('tmp/review');
  fs.mkdirSync(output, { recursive: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, timezoneId: 'America/New_York' });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (response.url().startsWith(base) && response.status() >= 400) errors.push(response.status() + ': ' + response.url()); });
  await page.goto(base);
  await page.evaluate(() => document.fonts.ready);
  await page.locator('.hero-content').waitFor();
  await page.waitForTimeout(2200);
  assert.equal(await page.title(), 'Sandesh & Chandana | 13 December 2026');
  assert.match(await page.locator('.couple-details').innerText(), /Chandana C\. Bhat/);
  assert.match(await page.locator('.couple-details').innerText(), /Shridhar C\. Hegde/);
  assert.ok(await page.locator('.ganapathi').evaluate(img => img.complete && img.naturalWidth > 0));
  assert.equal(await page.locator('canvas').count(), 0, 'Cover must not run a full-viewport canvas loop');
  assert.equal(await page.locator('.gold-mote').count(), 12);
  assert.equal(await page.locator('#viewer-page').getAttribute('src'), null, 'Hidden invitation scan must load only on demand');
  assert.equal(await page.locator('time[datetime="2026-12-14T13:00:00+05:30"]').innerText(), '1:00 PM');
  await page.screenshot({ path: path.join(output, 'desktop.png'), fullPage: true });
  await page.screenshot({ path: path.join(output, 'hero-desktop.png') });
  await page.locator('.original-invitation').scrollIntoViewIfNeeded();
  await page.locator('img.invitation-page').evaluate(img => img.decode());
  await page.evaluate(() => scrollTo({top: 0, behavior: 'instant'}));

  for (const lang of ['en', 'kn']) {
    await page.locator('[data-language="' + lang + '"]').click();
    assert.equal(await page.locator('html').getAttribute('lang'), lang);
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: width < 700 ? 844 : 1000 });
      const overflow = await page.evaluate(() => {
        return { viewport: innerWidth, content: document.documentElement.scrollWidth,
          elements: [...document.querySelectorAll('main *')].filter(el => {
            const r = el.getBoundingClientRect();
            return r.width && getComputedStyle(el).position !== 'absolute' && (r.right > innerWidth + 1 || r.left < -1);
          }).map(el => el.tagName + '.' + el.className).slice(0, 10) };
      });
      assert.ok(overflow.content <= width, JSON.stringify({ lang, width, overflow }));
      if (width === 390 || width === 1440) {
        await page.waitForTimeout(2200);
        await page.evaluate(() => scrollTo({top: 0, behavior: 'instant'}));
        await page.waitForTimeout(100);
        await page.screenshot({ path: path.join(output, lang + '-' + width + '.png'), fullPage: true });
        if (width === 390) {
          await page.locator('.hero').screenshot({ path: path.join(output, lang + '-hero-mobile.png') });
          await page.locator('.original-invitation').screenshot({ path: path.join(output, lang + '-invitation-mobile.png') });
          await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
        }
      }
    }
    await page.reload();
    assert.equal(await page.locator('html').getAttribute('lang'), lang);
  }
  assert.match(await page.locator('.couple-details').innerText(), /ಚಂದನಾ ಸಿ. ಭಟ್/);
  await page.locator('[data-language="en"]').click();
  await page.locator('.calendar-trigger').click();
  assert.equal(await page.locator('#calendar-dialog').evaluate(el => el.open), true);
  assert.ok(await page.locator('#petals').evaluate(el => el.classList.contains('atmosphere-paused')));
  await page.locator('[data-event="reception"]').click();
  const google = new URL(await page.locator('#google-calendar').getAttribute('href'));
  assert.equal(google.searchParams.get('dates'), '20261214T073000Z/20261214T083000Z');
  assert.equal(await page.locator('#apple-calendar').getAttribute('href'), 'calendars/reception.ics');
  await page.screenshot({ path: path.join(output, 'calendar-desktop.png') });
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('.calendar-trigger').evaluate(el => el === document.activeElement), true);
  await page.locator('.invitation-copy [data-open="invitation-dialog"]').click();
  await page.locator('#next-page').click();
  await page.locator('#next-page').click();
  assert.equal(await page.locator('#page-indicator').innerText(), '3 / 3');
  assert.equal(await page.locator('#next-page').isDisabled(), true);
  await page.locator('#zoom-page').click();
  assert.equal(await page.locator('#zoom-page').getAttribute('aria-pressed'), 'true');
  await page.locator('#viewer-page').evaluate(img => img.decode());
  await page.screenshot({ path: path.join(output, 'invitation-zoom-desktop.png') });
  await page.keyboard.press('Escape');
  await page.locator('.closing-actions [data-open="blessing-dialog"]').click();
  await page.locator('#shower-blessings').click();
  assert.match(await page.locator('#blessing-status').innerText(), /Thank you/);
  assert.ok(await page.locator('.falling-petal').count() <= 32);
  await page.screenshot({ path: path.join(output, 'blessing-desktop.png') });
  await page.keyboard.press('Escape');
  await page.locator('[data-open="travel-dialog"]').click();
  assert.match(await page.locator('#home-map iframe').getAttribute('src'), /14\.236759,74\.809287/);
  assert.match(await page.locator('#travel-dialog a.button').getAttribute('href'), /destination=14\.236759,74\.809287/);
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => !document.querySelector('#home-map iframe'));
  // All modal layouts must fit the smallest phone and both language modes.
  await page.setViewportSize({ width: 320, height: 720 });
  for (const lang of ['en', 'kn']) {
    await page.evaluate(() => scrollTo({top: 0, behavior: 'instant'}));
    await page.locator('[data-language="' + lang + '"]').click();
    for (const id of ['calendar-dialog', 'invitation-dialog', 'blessing-dialog', 'travel-dialog']) {
      await page.locator('[data-open="' + id + '"]').first().click();
      await page.waitForTimeout(400);
      assert.ok(await page.locator('#' + id).evaluate(el => el.scrollWidth <= el.clientWidth + 1), id + ' overflows at 320px in ' + lang);
      const scrollArea = page.locator('#' + id + ' .dialog-scroll');
      if (await scrollArea.count()) {
        assert.equal(await scrollArea.evaluate(el => el.scrollTop), 0, id + ' must open at the top');
        await scrollArea.evaluate(el => { el.scrollTop = el.scrollHeight; });
        const closeInView = await page.locator('#' + id + ' > [data-close]').evaluate(el => {
          const rect = el.getBoundingClientRect();
          return rect.top >= 0 && rect.bottom <= innerHeight;
        });
        assert.ok(closeInView, id + ' close control must remain visible after scrolling');
        await scrollArea.evaluate(el => { el.scrollTop = 0; });
      }
      if (id === 'invitation-dialog') await page.locator('#viewer-page').evaluate(img => img.decode());
      await page.screenshot({ path: path.join(output, lang + '-' + id + '-mobile.png') });
      await page.keyboard.press('Escape');
    }
  }
  await page.evaluate(() => scrollTo({top: 0, behavior: 'instant'}));
  await page.locator('[data-language="en"]').click();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  assert.equal(await page.locator('.gold-mote').first().evaluate(el => getComputedStyle(el).animationName), 'none');
  assert.equal(await page.locator('.hero-content').evaluate(el => getComputedStyle(el).animationName), 'none');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.locator('.motion-control').click();
  await page.locator('.motion-control').click();
  assert.equal(await page.locator('.motion-control').getAttribute('aria-pressed'), 'true');
  await page.reload();
  assert.equal(await page.locator('.motion-control').getAttribute('aria-pressed'), 'true');
  await page.locator('.open-invitation').click();
  await page.waitForTimeout(100);
  assert.equal(new URL(page.url()).hash, '#welcome');

  // A fixed instant proves the countdown across visitor timezones.
  await page.clock.install({ time: new Date('2026-12-12T03:43:00Z') });
  await page.clock.pauseAt(new Date('2026-12-12T03:43:00Z'));
  await page.evaluate(() => updateCountdown());
  assert.equal(await page.locator('#days').innerText(), '01');
  assert.equal(await page.locator('#hours').innerText(), '00');
  await page.clock.setSystemTime(new Date('2026-12-15T00:00:00Z'));
  await page.evaluate(() => updateCountdown());
  assert.equal(await page.locator('#days').innerText(), '00');
  assert.match(await page.locator('#countdown-heading').innerText(), /is here/);

  const icsResponse = await context.request.get(new URL('celebration.ics', base).href);
  assert.equal(icsResponse.status(), 200);
  const ics = await icsResponse.text();
  assert.match(ics, /DTSTART:20261213T034300Z/);
  assert.match(ics, /DTSTART:20261214T073000Z/);
  const pdf = await context.request.get(new URL('Invitation.pdf', base).href);
  assert.equal(pdf.status(), 200);
  assert.equal((await pdf.body()).subarray(0, 4).toString(), '%PDF');
  const noJS = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const fallback = await noJS.newPage();
  await fallback.goto(base);
  assert.match(await fallback.locator('#celebration').innerText(), /Reception & lunch/);
  assert.ok(await fallback.locator('a[href="Invitation.pdf"]').count());
  assert.equal(await fallback.locator('.language-switch').isVisible(), false);
  assert.deepEqual(errors, []);
  console.log('PASS: English/Kannada at 5 widths; all 4 dialogs at 320px in both languages; calendar choices; 3-page viewer and zoom; blessing interaction; exact home pin; focus restoration; language/motion persistence; reduced motion; countdown across timezones/expiry; PDF/calendar; no-JS fallback; no local browser/asset errors.');
  await browser.close();
})().catch(error => { console.error(error); process.exitCode = 1; });
