export type Floor = 'ground' | 'upper';
export type SpaceSeason = 'year-round' | 'april-october';
export type LayoutKind = 'reception' | 'banquet' | 'theatre' | 'cabaret' | 'boardroom';
export type PlanLayoutKind = 'reception' | 'banquet' | 'theatre' | 'cabaret';

export const LAYOUT_KINDS: readonly LayoutKind[] = [
  'reception',
  'banquet',
  'theatre',
  'cabaret',
  'boardroom',
];

export const PLAN_LAYOUT_KINDS: readonly PlanLayoutKind[] = [
  'reception',
  'banquet',
  'theatre',
  'cabaret',
];

export const LAYOUT_LABELS: Record<LayoutKind, string> = {
  reception: 'Reception',
  banquet: 'Banquet',
  theatre: 'Theatre',
  cabaret: 'Cabaret',
  boardroom: 'Boardroom',
};

export interface SpaceCapacity {
  /** Standing cocktail reception capacity. */
  reception: number;
  /** Seated dinner at round tables of ten; null when not offered. */
  banquet: number | null;
  /** Rows of chairs facing a focal point or stage; null when not offered. */
  theatre: number | null;
  /** Half-moon round tables facing a focal point; null when not offered. */
  cabaret: number | null;
  /** Single long conference or dining table; null when not offered. */
  boardroom: number | null;
}

export interface Space {
  /** URL-safe unique identifier; also used as the /spaces/#id anchor and Hall Plan room ID. */
  id: string;
  /** Display name of the room. */
  name: string;
  /** Floor level on the Hall Plan. */
  floor: Floor;
  /** Usable floor area in square feet (positive integer). */
  areaSqFt: number;
  /** Ceiling height in feet; null for open-air outdoor spaces. */
  ceilingFt: number | null;
  /** Maximum guest count per seating layout; null when the layout is not offered. */
  capacity: SpaceCapacity;
  /** True for outdoor garden or terrace spaces. */
  outdoor: boolean;
  /** Operating season for the space. */
  season: SpaceSeason;
  /** Whether the room may be enquired about on its own or only as part of a package. */
  bookableAlone: boolean;
  /** Short editorial description shown on Spaces. */
  summary: string;
  /** Architectural and practical features of the room. */
  features: readonly string[];
}

export const spaces: readonly Space[] = [
  {
    id: 'grand-ballroom',
    name: 'The Grand Ballroom',
    floor: 'ground',
    areaSqFt: 4800,
    ceilingFt: 28,
    capacity: {
      reception: 300,
      banquet: 220,
      theatre: 260,
      cabaret: 160,
      boardroom: null,
    },
    outdoor: false,
    season: 'year-round',
    bookableAlone: true,
    summary:
      'The original 1912 ballroom, with a sprung floor that has carried a century of first dances.',
    features: [
      'Sprung oak herringbone parquet',
      'Three tiered crystal chandeliers',
      'Gilt egg-and-dart plasterwork',
      '24-foot stage alcove',
      'Dimmable house lighting',
    ],
  },
  {
    id: 'conservatory',
    name: 'The Conservatory',
    floor: 'ground',
    areaSqFt: 1900,
    ceilingFt: 22,
    capacity: {
      reception: 120,
      banquet: 90,
      theatre: 110,
      cabaret: 64,
      boardroom: null,
    },
    outdoor: false,
    season: 'year-round',
    bookableAlone: true,
    summary:
      'Iron and glass on the garden side, bright by day and lantern-lit after dark.',
    features: [
      'Arched iron-and-glass roof',
      'Black-and-white marble floor',
      'French doors opening to the terrace',
      'Abundant natural daylight',
    ],
  },
  {
    id: 'library-salon',
    name: 'The Library Salon',
    floor: 'ground',
    areaSqFt: 900,
    ceilingFt: 14,
    capacity: {
      reception: 60,
      banquet: 40,
      theatre: 50,
      cabaret: 32,
      boardroom: 22,
    },
    outdoor: false,
    season: 'year-round',
    bookableAlone: true,
    summary:
      'Leather, walnut and a fireplace for ceremonies, board dinners and quiet gatherings.',
    features: [
      'Floor-to-ceiling walnut shelving',
      'Working hearth fireplace',
      'Concealed built-in AV screen',
    ],
  },
  {
    id: 'garden-terrace',
    name: 'The Rose Garden Terrace',
    floor: 'ground',
    areaSqFt: 2600,
    ceilingFt: null,
    capacity: {
      reception: 180,
      banquet: 120,
      theatre: 160,
      cabaret: null,
      boardroom: null,
    },
    outdoor: true,
    season: 'april-october',
    bookableAlone: true,
    summary:
      'A walled garden of heritage roses for spring and summer ceremonies.',
    features: [
      'Savannah grey brick paving',
      '40 heritage rose bushes',
      'Overhead bistro string lights',
      'Clear-span tent option',
    ],
  },
  {
    id: 'mezzanine-gallery',
    name: 'The Mezzanine Gallery',
    floor: 'upper',
    areaSqFt: 1200,
    ceilingFt: 12,
    capacity: {
      reception: 90,
      banquet: 56,
      theatre: 70,
      cabaret: 40,
      boardroom: 26,
    },
    outdoor: false,
    season: 'year-round',
    bookableAlone: true,
    summary:
      'A balcony above the ballroom for dinners, receptions and after-parties.',
    features: [
      'Balcony overlooking the Grand Ballroom',
      'Dedicated private bar',
      'Deep window seats facing Forsyth Park',
    ],
  },
  {
    id: 'bridal-suite',
    name: 'The Rose Suite',
    floor: 'upper',
    areaSqFt: 420,
    ceilingFt: 11,
    capacity: {
      reception: 12,
      banquet: null,
      theatre: null,
      cabaret: null,
      boardroom: null,
    },
    outdoor: false,
    season: 'year-round',
    bookableAlone: false,
    summary:
      'A quiet suite for getting ready, with its own stair to the ballroom.',
    features: [
      'Dressing room with gilded full-length mirrors',
      'Private lounge seating',
      'En-suite bathroom',
      'Included with wedding packages (not hired separately)',
    ],
  },
];

export const SPACE_BY_ID: Record<string, Space> = Object.fromEntries(
  spaces.map((space) => [space.id, space]),
);

/** Largest reception capacity across all spaces, used in hero facts and EventVenue schema. */
export function maxReceptionCapacity(): number {
  return Math.max(...spaces.map((space) => space.capacity.reception));
}

/** Count of rooms available to hire on their own (excludes suites included only with weddings). */
export function primaryRoomCount(): number {
  return spaces.filter((space) => space.bookableAlone).length;
}
