import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { DAYS, officeHoursStatus, openingLabel, validateHours, type OpeningHours } from '../lib/hours.ts';

const sampleHours: OpeningHours[] = DAYS.map(day => day === 'Monday' ? { day } : { day, opens: '09:00', closes: '17:00' });
const atSample = (date: string, zone = 'America/New_York') => openingLabel(sampleHours, zone, new Date(date));

test('opening inclusive, closing exclusive; business zone wins over visitor zone', () => {
  assert.equal(atSample('2026-11-17T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(atSample('2026-11-17T14:00:00Z'), 'Open now · until 17:00');
  assert.equal(atSample('2026-11-17T22:00:00Z'), 'Closed · opens Wednesday at 09:00');
  assert.equal(atSample('2026-11-17T14:00:00Z', 'Asia/Tokyo'), 'Closed · opens Wednesday at 09:00');
});

test('closed weekdays and week wrap find the next service', () => {
  assert.equal(atSample('2026-11-16T18:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(atSample('2026-11-15T23:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(openingLabel(DAYS.map(day => ({ day })), 'UTC'), 'Closed · see opening hours');
});

test('missing/invalid zones stay neutral and DST changes preserve local service times', () => {
  assert.equal(atSample('2026-11-17T14:00:00Z', ''), 'See opening hours');
  assert.equal(atSample('2026-11-17T14:00:00Z', 'Mars/Base'), 'See opening hours');
  assert.equal(atSample('2026-03-08T12:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(atSample('2026-03-08T13:00:00Z'), 'Open now · until 17:00');
  assert.equal(atSample('2026-11-01T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(atSample('2026-11-01T14:00:00Z'), 'Open now · until 17:00');
});

test('invalid/incomplete/overnight intervals name the weekday to fix', () => {
  assert.doesNotThrow(() => validateHours(sampleHours));
  for (const opens of ['24:00', '9:00', '18:00']) {
    assert.throws(() => validateHours(sampleHours.map(x => x.day === 'Tuesday' ? { ...x, opens } : x)), /Tuesday/);
  }
  assert.throws(() => validateHours(sampleHours.slice(1)), /Monday/);
  assert.throws(() => validateHours(sampleHours.map(x => x.day === 'Tuesday' ? { ...x, closes: undefined } : x)), /Tuesday/);
});

test('Rosewood Hall office hours: 10:00 open, 18:00/16:00 close, closed Sun/Mon and DST days in America/New_York', () => {
  const atHall = (iso: string) => officeHoursStatus(business.officeHours, 'America/New_York', new Date(iso));

  // Tuesday in EST (UTC-5): 2026-11-17
  assert.deepEqual(atHall('2026-11-17T14:59:00Z'), {
    state: 'closed',
    label: 'Events office closed — opens today at 10 am',
  });
  assert.deepEqual(atHall('2026-11-17T15:00:00Z'), {
    state: 'open',
    label: 'Events office open now — until 6 pm',
  });
  assert.deepEqual(atHall('2026-11-17T22:59:00Z'), {
    state: 'open',
    label: 'Events office open now — until 6 pm',
  });
  assert.deepEqual(atHall('2026-11-17T23:00:00Z'), {
    state: 'closed',
    label: 'Events office closed — opens Wednesday at 10 am',
  });

  // Saturday in EST (UTC-5): 2026-11-21 (10:00–16:00)
  assert.deepEqual(atHall('2026-11-21T15:00:00Z'), {
    state: 'open',
    label: 'Events office open now — until 4 pm',
  });
  assert.deepEqual(atHall('2026-11-21T20:59:00Z'), {
    state: 'open',
    label: 'Events office open now — until 4 pm',
  });
  assert.deepEqual(atHall('2026-11-21T21:00:00Z'), {
    state: 'closed',
    label: 'Events office closed — opens Tuesday at 10 am',
  });

  // Sunday & Monday closed -> wrap to Tuesday 10 am
  assert.deepEqual(atHall('2026-11-22T17:00:00Z'), {
    state: 'closed',
    label: 'Events office closed — opens Tuesday at 10 am',
  });
  assert.deepEqual(atHall('2026-11-23T17:00:00Z'), {
    state: 'closed',
    label: 'Events office closed — opens Tuesday at 10 am',
  });

  // Spring-forward day (2026-03-08, Sunday, EDT starts 02:00) and Tuesday after (EDT UTC-4)
  assert.deepEqual(atHall('2026-03-08T15:00:00Z'), {
    state: 'closed',
    label: 'Events office closed — opens Tuesday at 10 am',
  });
  assert.deepEqual(atHall('2026-03-10T13:59:00Z'), {
    state: 'closed',
    label: 'Events office closed — opens today at 10 am',
  });
  assert.deepEqual(atHall('2026-03-10T14:00:00Z'), {
    state: 'open',
    label: 'Events office open now — until 6 pm',
  });

  // Fall-back day (2026-11-01, Sunday, EST starts 02:00) and Tuesday after (EST UTC-5)
  assert.deepEqual(atHall('2026-11-01T16:00:00Z'), {
    state: 'closed',
    label: 'Events office closed — opens Tuesday at 10 am',
  });
  assert.deepEqual(atHall('2026-11-03T14:59:00Z'), {
    state: 'closed',
    label: 'Events office closed — opens today at 10 am',
  });
  assert.deepEqual(atHall('2026-11-03T15:00:00Z'), {
    state: 'open',
    label: 'Events office open now — until 6 pm',
  });
});
