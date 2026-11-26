import type { Floor } from '../content/spaces.ts';

export interface PlanRoomGeometry {
  id: string;
  floor: Floor;
  x: number;
  y: number;
  w: number;
  h: number;
  labelX: number;
  labelY: number;
  shortName: string;
}

/**
 * Architectural coordinates for every room on the Ground and Upper plans.
 * Every ID matches content/spaces.ts exactly (verified by tests/content.test.ts).
 */
export const HALL_PLAN_ROOMS: readonly PlanRoomGeometry[] = [
  // Ground floor
  {
    id: 'grand-ballroom',
    floor: 'ground',
    x: 42,
    y: 44,
    w: 276,
    h: 196,
    labelX: 180,
    labelY: 74,
    shortName: 'Grand Ballroom',
  },
  {
    id: 'conservatory',
    floor: 'ground',
    x: 326,
    y: 44,
    w: 170,
    h: 122,
    labelX: 411,
    labelY: 70,
    shortName: 'Conservatory',
  },
  {
    id: 'library-salon',
    floor: 'ground',
    x: 42,
    y: 248,
    w: 148,
    h: 108,
    labelX: 116,
    labelY: 274,
    shortName: 'Library Salon',
  },
  {
    id: 'garden-terrace',
    floor: 'ground',
    x: 326,
    y: 174,
    w: 170,
    h: 182,
    labelX: 411,
    labelY: 200,
    shortName: 'Rose Garden Terrace',
  },
  // Upper floor
  {
    id: 'mezzanine-gallery',
    floor: 'upper',
    x: 42,
    y: 44,
    w: 276,
    h: 164,
    labelX: 180,
    labelY: 74,
    shortName: 'Mezzanine Gallery',
  },
  {
    id: 'bridal-suite',
    floor: 'upper',
    x: 326,
    y: 44,
    w: 170,
    h: 164,
    labelX: 411,
    labelY: 74,
    shortName: 'Rose Suite',
  },
];

export const HALL_PLAN_ROOM_IDS: readonly string[] = HALL_PLAN_ROOMS.map((r) => r.id);
