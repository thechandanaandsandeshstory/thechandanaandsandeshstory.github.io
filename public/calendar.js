/* Shared calendar data: native downloads and Google links use identical times. */
(function (root) {
  'use strict';
  const events = {
    wedding: {
      id: 'wedding-20261213@sandesh-chandana.local',
      title: 'Sandesh & Chandana - Wedding',
      start: '2026-12-13T09:13:00+05:30',
      location: 'Sri Raghaveshwara Sabhabhavana, Bachchalli Road, Agrahara, Sagara, Karnataka',
      description: 'Wedding muhurta: 9:13 AM IST, 13 December 2026. Wedding lunch from 12:30 PM IST.',
      map: 'https://www.google.com/maps/search/?api=1&query=Sri+Raghaveshwara+Sabhabhavana+Agrahara+Sagara+Karnataka'
    },
    reception: {
      id: 'reception-20261214@sandesh-chandana.local',
      title: 'Sandesh & Chandana - Reception and Lunch',
      start: '2026-12-14T13:00:00+05:30',
      location: 'Banglekoppa, Mavinagundi, Siddapur Taluk, Karnataka',
      description: 'Reception and lunch: 1:00 PM IST, 14 December 2026. Home pin: 14.236759, 74.809287.',
      map: 'https://maps.app.goo.gl/sDHHJNV3LDDcjhfZ9'
    }
  };
  const holdNote = 'A 1-hour calendar hold is provided for your reminder. The actual event finish time has not been announced; adjust the calendar duration as needed.';
  function utc(date) {
    return new Date(date).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
  }
  function endTime(event) {
    return new Date(Date.parse(event.start) + 3600000);
  }
  function googleURL(key) {
    const event = events[key];
    if (!event) throw new Error('Unknown event');
    const url = new URL('https://calendar.google.com/calendar/r/eventedit');
    url.search = new URLSearchParams({
      action: 'TEMPLATE',
      text: event.title,
      dates: utc(event.start) + '/' + utc(endTime(event)),
      stz: 'Asia/Kolkata',
      etz: 'Asia/Kolkata',
      ctz: 'Asia/Kolkata',
      location: event.location,
      details: event.description + '\n' + event.map + '\n\n' + holdNote
    }).toString();
    return url.href;
  }
  function escapeText(value) {
    return value.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
  }
  function fold(line) {
    const result = [];
    let part = '';
    for (const character of line) {
      if (new TextEncoder().encode(part + character).length > 75) {
        result.push(part);
        part = ' ';
      }
      part += character;
    }
    result.push(part);
    return result.join('\r\n');
  }
  function calendar(keys) {
    const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0',
      'PRODID:-//Sandesh and Chandana//Wedding//EN',
      'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
      'X-WR-CALNAME:Sandesh and Chandana Wedding',
      'X-WR-TIMEZONE:Asia/Kolkata'];
    keys.forEach(function (key) {
      const event = events[key];
      if (!event) throw new Error('Unknown event');
      lines.push('BEGIN:VEVENT', 'UID:' + event.id,
        'DTSTAMP:20261101T000000Z', 'SEQUENCE:1',
        'DTSTART:' + utc(event.start), 'DTEND:' + utc(endTime(event)),
        'SUMMARY:' + escapeText(event.title), 'LOCATION:' + escapeText(event.location),
        'DESCRIPTION:' + escapeText(event.description + '\n' + holdNote),
        'URL:' + event.map, 'STATUS:CONFIRMED', 'TRANSP:TRANSPARENT',
        'BEGIN:VALARM', 'ACTION:DISPLAY', 'TRIGGER:-P1D',
        'DESCRIPTION:' + escapeText(event.title + ' is tomorrow'),
        'END:VALARM', 'END:VEVENT');
    });
    lines.push('END:VCALENDAR');
    return lines.map(fold).join('\r\n') + '\r\n';
  }
  const api = { events: events, googleURL: googleURL, calendar: calendar };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.WeddingCalendar = api;
})(typeof window !== 'undefined' ? window : globalThis);
