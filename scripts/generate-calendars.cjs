const fs = require('node:fs');
const calendar = require('../public/calendar.js');
fs.mkdirSync('public/calendars', { recursive: true });
for (const key of Object.keys(calendar.events)) {
  fs.writeFileSync('public/calendars/' + key + '.ics', calendar.calendar([key]));
}
fs.writeFileSync('public/celebration.ics', calendar.calendar(Object.keys(calendar.events)));
console.log('Calendar files regenerated with UTC timestamps, stable IDs, CRLF and 75-octet folding.');
