import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';
import { HALL_PLAN_ROOM_IDS } from '../lib/hall-plan-data.ts';
import { business } from '../content/business.ts';
import {
  GALLERY_OCCASIONS,
  GALLERY_SCENES,
  GALLERY_SEASONS,
  GALLERY_SIZES,
  gallery,
} from '../content/gallery.ts';
import { PACKAGE_KINDS, packages } from '../content/packages.ts';
import { LAYOUT_KINDS, maxReceptionCapacity, SPACE_BY_ID, spaces } from '../content/spaces.ts';
import { validateHours } from '../lib/hours.ts';
import { businessStructuredData, jsonLd } from '../lib/structured-data.ts';

const URL_SAFE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function assertUniqueUrlSafeIds(collection: string, items: readonly { id: string }[]) {
  const seen = new Set<string>();
  for (const item of items) {
    assert.match(item.id, URL_SAFE_ID, `${collection}: "${item.id}" must be a URL-safe lowercase slug`);
    assert.ok(!seen.has(item.id), `${collection}: duplicate id "${item.id}"`);
    seen.add(item.id);
  }
}

test('business content has actionable required fields and valid office hours', () => {
  for (const key of ['name', 'tagline', 'introduction', 'email', 'phone', 'directions', 'parking', 'hoursNote'] as const) {
    assert.ok(business[key].trim(), `business.${key}: required`);
  }
  assert.match(business.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'business.email: valid public email required');
  assert.ok(business.address.formatted.trim(), 'business.address.formatted: required');
  assert.ok(business.enquiries.title.trim(), 'business.enquiries.title: required');
  assert.ok(business.enquiries.introduction.trim(), 'business.enquiries.introduction: required');
  assert.ok(business.enquiries.confirmationNote.trim(), 'business.enquiries.confirmationNote: required');
  assert.ok(business.enquiries.usefulToInclude.length >= 3, 'business.enquiries.usefulToInclude: include message guidance');
  for (const tip of business.enquiries.usefulToInclude) {
    assert.ok(tip.trim(), 'business.enquiries.usefulToInclude: empty tip');
  }
  assert.doesNotThrow(() => validateHours(business.officeHours));
});

test('spaces have valid dimensions, capacities, outdoor ceiling rules and unique IDs', () => {
  assertUniqueUrlSafeIds('spaces', spaces);
  for (const space of spaces) {
    assert.ok(space.name.trim(), `spaces/${space.id}: name required`);
    assert.ok(Number.isInteger(space.areaSqFt) && space.areaSqFt > 0, `spaces/${space.id}: positive integer areaSqFt required`);
    if (space.outdoor) {
      assert.equal(space.ceilingFt, null, `spaces/${space.id}: outdoor room must have null ceilingFt`);
    } else {
      assert.ok(
        space.ceilingFt !== null && Number.isInteger(space.ceilingFt) && space.ceilingFt > 0,
        `spaces/${space.id}: indoor room must have positive integer ceilingFt`,
      );
    }
    assert.ok(
      Number.isInteger(space.capacity.reception) && space.capacity.reception > 0,
      `spaces/${space.id}: positive integer reception capacity required`,
    );
    for (const layout of LAYOUT_KINDS) {
      const cap = space.capacity[layout];
      if (cap === null) continue;
      assert.ok(Number.isInteger(cap) && cap > 0, `spaces/${space.id}: ${layout} capacity must be positive integer or null`);
      assert.ok(
        cap <= space.capacity.reception,
        `spaces/${space.id}: ${layout} capacity (${cap}) cannot exceed reception (${space.capacity.reception})`,
      );
    }
    assert.ok(space.summary.trim(), `spaces/${space.id}: summary required`);
    assert.ok(space.features.length > 0, `spaces/${space.id}: at least one feature required`);
  }
});

test('Hall Plan room IDs match content/spaces.ts exactly', () => {
  const spaceIds = [...spaces.map((s) => s.id)].sort();
  const planIds = [...HALL_PLAN_ROOM_IDS].sort();
  assert.deepEqual(planIds, spaceIds, 'HALL_PLAN_ROOM_IDS must match content/spaces.ts IDs exactly');
});

test('every space has a doorway view image for the home and spaces enfilade', () => {
  const doorwaySource = readFileSync(
    new URL('../components/art/enfilade-doorways.tsx', import.meta.url),
    'utf8',
  );
  for (const space of spaces) {
    assert.ok(
      doorwaySource.includes(`'/doorways/${space.id}.jpg'`),
      `spaces/${space.id}: no DOORWAY_VIEWS entry in components/art/enfilade-doorways.tsx`,
    );
    assert.ok(
      existsSync(new URL(`../public/doorways/${space.id}.jpg`, import.meta.url)),
      `spaces/${space.id}: missing doorway image public/doorways/${space.id}.jpg`,
    );
  }
});

test('packages have valid pricing, guest bounds, room references and availability notes', () => {
  assertUniqueUrlSafeIds('packages', packages);
  for (const pkg of packages) {
    assert.ok(pkg.name.trim(), `packages/${pkg.id}: name required`);
    assert.ok(PACKAGE_KINDS.includes(pkg.kind), `packages/${pkg.id}: unknown kind "${pkg.kind}"`);
    assert.ok(Number.isInteger(pkg.priceFrom) && pkg.priceFrom > 0, `packages/${pkg.id}: priceFrom must be a positive whole-dollar amount`);
    assert.ok(Number.isInteger(pkg.minGuests) && pkg.minGuests > 0, `packages/${pkg.id}: positive minGuests required`);
    assert.ok(Number.isInteger(pkg.maxGuests) && pkg.minGuests <= pkg.maxGuests, `packages/${pkg.id}: minGuests must be <= maxGuests`);
    assert.ok(Number.isInteger(pkg.hours) && pkg.hours > 0, `packages/${pkg.id}: positive hours required`);
    assert.ok(pkg.spaces.length > 0, `packages/${pkg.id}: at least one space ID required`);
    assert.ok(pkg.inclusions.length > 0, `packages/${pkg.id}: at least one inclusion required`);

    let maxBookableCapacity = 0;
    for (const spaceId of pkg.spaces) {
      const room = SPACE_BY_ID[spaceId];
      assert.ok(room, `packages/${pkg.id}: references unknown space "${spaceId}"`);
      if (room.bookableAlone) {
        const roomMax = Math.max(room.capacity.reception, room.capacity.banquet ?? 0);
        if (roomMax > maxBookableCapacity) maxBookableCapacity = roomMax;
      }
    }
    assert.ok(
      pkg.maxGuests <= maxBookableCapacity,
      `packages/${pkg.id}: maxGuests (${pkg.maxGuests}) exceeds largest capacity (${maxBookableCapacity}) of its bookable spaces`,
    );

    if (!pkg.available) {
      assert.ok(pkg.note && pkg.note.trim().length > 0, `packages/${pkg.id}: unavailable package must provide a note`);
    }
  }
});

test('gallery vignettes reference known spaces, enums and matching scene artwork', () => {
  assertUniqueUrlSafeIds('gallery', gallery);
  const vignetteSource = readFileSync(
    new URL('../components/art/gallery-vignette.tsx', import.meta.url),
    'utf8',
  );
  for (const item of gallery) {
    assert.ok(item.title.trim(), `gallery/${item.id}: title required`);
    assert.ok(SPACE_BY_ID[item.space], `gallery/${item.id}: references unknown space "${item.space}"`);
    assert.ok(GALLERY_OCCASIONS.includes(item.occasion), `gallery/${item.id}: unknown occasion "${item.occasion}"`);
    assert.ok(GALLERY_SEASONS.includes(item.season), `gallery/${item.id}: unknown season "${item.season}"`);
    assert.ok(GALLERY_SIZES.includes(item.size), `gallery/${item.id}: unknown size "${item.size}"`);
    assert.ok(GALLERY_SCENES.includes(item.scene), `gallery/${item.id}: unknown scene "${item.scene}"`);
    assert.ok(
      vignetteSource.includes(`'${item.scene}':`) &&
        vignetteSource.includes(`'/gallery/${item.scene}.jpg'`),
      `gallery/${item.id}: scene "${item.scene}" has no matching plate entry in gallery-vignette.tsx`,
    );
    assert.ok(
      existsSync(new URL(`../public/gallery/${item.scene}.jpg`, import.meta.url)),
      `gallery/${item.id}: missing generated image public/gallery/${item.scene}.jpg`,
    );
    assert.ok(item.caption.trim(), `gallery/${item.id}: caption required`);
  }
});

test('structured data emits EventVenue with capacity derived from content and escapes inline JSON-LD', () => {
  const schema = businessStructuredData();
  assert.equal(schema['@type'], 'EventVenue');
  assert.equal(schema.name, business.name);
  assert.equal(schema.maximumAttendeeCapacity, 300);
  assert.equal(schema.maximumAttendeeCapacity, maxReceptionCapacity());
  assert.equal(schema.address['@type'], 'PostalAddress');
  assert.equal(schema.openingHoursSpecification.length, 5);

  const dangerous = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(dangerous);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), dangerous);
});

test('Contact and Packages copy avoids booking, deposit or payment promises', () => {
  const files = [
    new URL('../content/business.ts', import.meta.url),
    new URL('../content/packages.ts', import.meta.url),
    new URL('../app/contact/page.tsx', import.meta.url),
    new URL('../app/packages/page.tsx', import.meta.url),
    new URL('../components/package-catalog.tsx', import.meta.url),
  ];

  const forbidden = /\b(booked|reserved|confirmed|deposit|pay|paid|payment)\b/gi;

  for (const file of files) {
    const raw = readFileSync(file, 'utf8')
      // Strip allowed exceptions explicitly specified in plan/PLAN.md
      .replace(/December 2026 is fully reserved\./gi, '')
      .replace(/Fully reserved/gi, '')
      .replace(/dates are held only once confirmed in writing/gi, '')
      // Strip TypeScript comments
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/.*/g, '');

    const matches = raw.match(forbidden);
    assert.equal(
      matches,
      null,
      `${file.pathname}: forbidden booking/payment wording found: ${matches?.join(', ')}`,
    );
  }
});
