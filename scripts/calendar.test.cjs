const assert = require('node:assert/strict');
const fs = require('node:fs');
const calendar = require('../public/calendar.js');
const dates = { wedding: '20261213T034300Z/20261213T044300Z', reception: '20261214T073000Z/20261214T083000Z' };
for (const key of Object.keys(dates)) {
  const url = new URL(calendar.googleURL(key));
  assert.equal(url.origin, 'https://calendar.google.com');
  assert.equal(url.searchParams.get('action'), 'TEMPLATE');
  assert.equal(url.searchParams.get('dates'), dates[key]);
  assert.equal(url.searchParams.get('ctz'), 'Asia/Kolkata');
  const file = fs.readFileSync('public/calendars/' + key + '.ics', 'utf8');
  assert.equal(file, calendar.calendar([key]));
  assert.ok(!file.replace(/\r\n/g, '').includes('\n'));
  assert.ok(file.split('\r\n').every(line => Buffer.byteLength(line, 'utf8') <= 75));
  assert.match(file, /TRIGGER:-P1D/);
  const unfolded = file.replace(/\r\n /g, '');
  assert.match(unfolded, /actual event finish time has not been announced/);
  assert.equal((file.match(/BEGIN:VEVENT/g) || []).length, 1);
}
const all = fs.readFileSync('public/celebration.ics', 'utf8');
assert.equal((all.match(/BEGIN:VEVENT/g) || []).length, 2);
assert.match(all.replace(/\r\n /g, ''), /14\.236759/);
assert.throws(() => calendar.googleURL('unknown'));
console.log('PASS: Google event URLs, confirmed UTC start times, labeled durations, per-event and combined ICS, alarms, escaping and RFC line endings/folding.');
