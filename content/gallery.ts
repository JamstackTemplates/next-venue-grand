export type GalleryOccasion = 'wedding' | 'gala' | 'corporate' | 'celebration';
export type GallerySeason = 'spring' | 'summer' | 'autumn' | 'winter';
export type GallerySize = 'large' | 'tall' | 'wide' | 'small';

export const GALLERY_OCCASIONS: readonly GalleryOccasion[] = [
  'wedding',
  'gala',
  'corporate',
  'celebration',
];

export const GALLERY_OCCASION_LABELS: Record<GalleryOccasion, string> = {
  wedding: 'Weddings',
  gala: 'Galas',
  corporate: 'Corporate',
  celebration: 'Celebrations',
};

export const GALLERY_SEASONS: readonly GallerySeason[] = [
  'spring',
  'summer',
  'autumn',
  'winter',
];

export const GALLERY_SIZES: readonly GallerySize[] = ['large', 'tall', 'wide', 'small'];

export const GALLERY_SCENES = [
  'ballroom-dance',
  'terrace-arch',
  'conservatory-table',
  'library-fireplace',
  'suite-mirror',
  'ballroom-gala',
  'mezzanine-balcony',
  'conservatory-theatre',
  'library-boardroom',
  'mezzanine-dinner',
  'terrace-lights',
  'ballroom-confetti',
] as const;

export type GalleryScene = (typeof GALLERY_SCENES)[number];

export interface GalleryVignette {
  /** URL-safe unique identifier. */
  id: string;
  /** Title engraved on the brass plaque caption. */
  title: string;
  /** Room ID from content/spaces.ts. */
  space: string;
  /** Occasion category used by the Gallery filter. */
  occasion: GalleryOccasion;
  /** Season shown on the brass plaque. */
  season: GallerySeason;
  /** Short descriptive caption for the vignette. */
  caption: string;
  /** Scene illustration key rendered by components/art/gallery-vignette.tsx. */
  scene: GalleryScene;
  /** Frame proportion in the salon hang layout. */
  size: GallerySize;
}

export const gallery: readonly GalleryVignette[] = [
  {
    id: 'first-dance-ballroom',
    title: 'First dance under the chandeliers',
    space: 'grand-ballroom',
    occasion: 'wedding',
    season: 'autumn',
    caption: 'Candlelit round tables framing the sprung oak floor for an October wedding waltz.',
    scene: 'ballroom-dance',
    size: 'large',
  },
  {
    id: 'terrace-ceremony',
    title: 'A ceremony among the roses',
    space: 'garden-terrace',
    occasion: 'wedding',
    season: 'spring',
    caption: 'Rows of chairs facing a rose-dressed arch in the walled April garden.',
    scene: 'terrace-arch',
    size: 'tall',
  },
  {
    id: 'conservatory-long-table',
    title: 'One long table under glass',
    space: 'conservatory',
    occasion: 'wedding',
    season: 'summer',
    caption: 'A single banquet table dressed in white linen beneath the arched glass roof.',
    scene: 'conservatory-table',
    size: 'wide',
  },
  {
    id: 'library-vows',
    title: 'Vows by the fireplace',
    space: 'library-salon',
    occasion: 'wedding',
    season: 'winter',
    caption: 'An intimate December ceremony beside the walnut hearth.',
    scene: 'library-fireplace',
    size: 'small',
  },
  {
    id: 'rose-suite-morning',
    title: 'Morning in the Rose Suite',
    space: 'bridal-suite',
    occasion: 'wedding',
    season: 'spring',
    caption: 'Champagne flutes and fresh roses before the tall gilded dressing mirror.',
    scene: 'suite-mirror',
    size: 'small',
  },
  {
    id: 'charity-gala',
    title: 'Harbor Trust charity gala',
    space: 'grand-ballroom',
    occasion: 'gala',
    season: 'winter',
    caption: 'Two hundred guests seated for a black-tie dinner and auction before the stage alcove.',
    scene: 'ballroom-gala',
    size: 'wide',
  },
  {
    id: 'mezzanine-toasts',
    title: 'Toasts on the balcony',
    space: 'mezzanine-gallery',
    occasion: 'gala',
    season: 'autumn',
    caption: 'Pre-dinner cocktails along the wrought balustrade overlooking the ballroom.',
    scene: 'mezzanine-balcony',
    size: 'small',
  },
  {
    id: 'annual-conference',
    title: "Annual members' conference",
    space: 'conservatory',
    occasion: 'corporate',
    season: 'spring',
    caption: 'Morning plenary seating bathed in daylight from the garden-side glass roof.',
    scene: 'conservatory-theatre',
    size: 'wide',
  },
  {
    id: 'board-dinner',
    title: 'Board dinner in the salon',
    space: 'library-salon',
    occasion: 'corporate',
    season: 'autumn',
    caption: 'Twenty-two place settings around the walnut table after a day of meetings.',
    scene: 'library-boardroom',
    size: 'small',
  },
  {
    id: 'golden-anniversary',
    title: 'A golden anniversary dinner',
    space: 'mezzanine-gallery',
    occasion: 'celebration',
    season: 'summer',
    caption: 'Taper candles and tall park windows for a fiftieth-anniversary toast.',
    scene: 'mezzanine-dinner',
    size: 'tall',
  },
  {
    id: 'sixtieth-birthday',
    title: 'A sixtieth under the string lights',
    space: 'garden-terrace',
    occasion: 'celebration',
    season: 'summer',
    caption: 'Warm string lights strung across the brick terrace for a summer evening supper.',
    scene: 'terrace-lights',
    size: 'small',
  },
  {
    id: 'new-years-eve',
    title: "New Year's Eve, first waltz",
    space: 'grand-ballroom',
    occasion: 'celebration',
    season: 'winter',
    caption: 'Midnight beneath the three crystal chandeliers with gilded paper stars.',
    scene: 'ballroom-confetti',
    size: 'large',
  },
];
