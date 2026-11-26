export type PackageKind = 'wedding' | 'corporate' | 'celebration';
export type PriceUnit = 'per-guest' | 'flat';

export const PACKAGE_KINDS: readonly PackageKind[] = ['wedding', 'corporate', 'celebration'];

export const PACKAGE_KIND_LABELS: Record<PackageKind, string> = {
  wedding: 'Weddings',
  corporate: 'Corporate',
  celebration: 'Celebrations',
};

export interface EventPackage {
  /** URL-safe unique identifier. */
  id: string;
  /** Display name of the package. */
  name: string;
  /** Category used by the Packages page filter. */
  kind: PackageKind;
  /** Starting rate in whole US dollars. */
  priceFrom: number;
  /** Whether the starting rate is per guest or a flat package rate. */
  priceUnit: PriceUnit;
  /** Minimum guest count for this package. */
  minGuests: number;
  /** Maximum guest count for this package. */
  maxGuests: number;
  /** Event duration in hours. */
  hours: number;
  /** Room IDs from content/spaces.ts included in the package. */
  spaces: readonly string[];
  /** Specific items included in this package. */
  inclusions: readonly string[];
  /** When true, featured on the Home page. */
  featured: boolean;
  /** Set to false when a seasonal package is currently full; provide a note when false. */
  available: boolean;
  /** Optional availability or seasonal note (required when available is false). */
  note?: string;
}

export const packages: readonly EventPackage[] = [
  {
    id: 'rosewood-wedding',
    name: 'The Rosewood Wedding',
    kind: 'wedding',
    priceFrom: 185,
    priceUnit: 'per-guest',
    minGuests: 100,
    maxGuests: 220,
    hours: 8,
    spaces: ['grand-ballroom', 'garden-terrace', 'bridal-suite'],
    inclusions: [
      'Ceremony on the terrace (indoors in the Conservatory out of season)',
      'Cocktail hour',
      'Three-course dinner',
      'House bar package for four hours',
      'Cake cutting',
      'Dance floor lighting',
      'Rose Suite from 10 am',
    ],
    featured: true,
    available: true,
  },
  {
    id: 'conservatory-wedding',
    name: 'The Conservatory Wedding',
    kind: 'wedding',
    priceFrom: 150,
    priceUnit: 'per-guest',
    minGuests: 40,
    maxGuests: 90,
    hours: 6,
    spaces: ['conservatory', 'bridal-suite'],
    inclusions: [
      'Ceremony and dinner in one room',
      'Two-course dinner and dessert table',
      'Sparkling toast',
      'House bar package for three hours',
      'Rose Suite from noon',
    ],
    featured: false,
    available: true,
  },
  {
    id: 'library-elopement',
    name: 'The Library Elopement',
    kind: 'wedding',
    priceFrom: 2400,
    priceUnit: 'flat',
    minGuests: 2,
    maxGuests: 20,
    hours: 3,
    spaces: ['library-salon', 'bridal-suite'],
    inclusions: [
      'Ceremony by the fireplace',
      'Champagne and canapés',
      "A photographer's hour in the ballroom",
      'Rose Suite for two hours',
    ],
    featured: false,
    available: true,
  },
  {
    id: 'gala-evening',
    name: 'The Gala Evening',
    kind: 'corporate',
    priceFrom: 140,
    priceUnit: 'per-guest',
    minGuests: 120,
    maxGuests: 220,
    hours: 6,
    spaces: ['grand-ballroom', 'mezzanine-gallery'],
    inclusions: [
      'Drinks reception on the mezzanine',
      'Plated three-course dinner',
      'Stage and lectern with sound',
      'House bar package for four hours',
      'Coat check',
    ],
    featured: true,
    available: true,
  },
  {
    id: 'day-conference',
    name: 'The Day Conference',
    kind: 'corporate',
    priceFrom: 85,
    priceUnit: 'per-guest',
    minGuests: 30,
    maxGuests: 110,
    hours: 9,
    spaces: ['conservatory', 'library-salon'],
    inclusions: [
      'Theatre-style plenary',
      'Breakout in the Library Salon',
      'Coffee service twice',
      'Working lunch',
      'Projector and microphones',
    ],
    featured: false,
    available: true,
  },
  {
    id: 'celebration-dinner',
    name: 'The Celebration Dinner',
    kind: 'celebration',
    priceFrom: 120,
    priceUnit: 'per-guest',
    minGuests: 24,
    maxGuests: 56,
    hours: 5,
    spaces: ['mezzanine-gallery'],
    inclusions: [
      'Private bar',
      'Three-course dinner',
      'Toast',
      'Window seating on the park',
    ],
    featured: true,
    available: true,
  },
  {
    id: 'holiday-party',
    name: 'The Holiday Party',
    kind: 'celebration',
    priceFrom: 110,
    priceUnit: 'per-guest',
    minGuests: 60,
    maxGuests: 220,
    hours: 5,
    spaces: ['grand-ballroom'],
    inclusions: [
      'Festive dressing of the ballroom',
      'Buffet dinner',
      'House bar package for three hours',
      'Dance floor lighting',
    ],
    featured: false,
    available: false,
    note: 'December 2026 is fully reserved. Enquire about December 2027.',
  },
];

export function formatUsd(amount: number): string {
  return `$${amount.toLocaleString('en-US')}`;
}

export function formatPriceUnit(unit: PriceUnit): string {
  return unit === 'per-guest' ? 'per guest' : 'flat rate';
}
