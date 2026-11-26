import type { GalleryScene } from '../../content/gallery';
import { asset } from '../../lib/paths';

/** Registry of every scene artwork key for automated content validation. */
export const VIGNETTE_SCENES: readonly GalleryScene[] = [
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
];

export const GALLERY_SCENE_ART: Record<
  GalleryScene,
  { src: string; width: number; height: number; alt: string }
> = {
  'ballroom-dance': {
    src: '/gallery/ballroom-dance.jpg',
    width: 1376,
    height: 768,
    alt: 'Architectural watercolor of a bride and groom sharing their first dance beneath the crystal chandeliers in the Grand Ballroom',
  },
  'terrace-arch': {
    src: '/gallery/terrace-arch.jpg',
    width: 815,
    height: 1092,
    alt: 'Architectural watercolor of a spring wedding ceremony facing a rose-draped iron arch in the walled Rose Garden Terrace',
  },
  'conservatory-table': {
    src: '/gallery/conservatory-table.jpg',
    width: 815,
    height: 1092,
    alt: 'Architectural watercolor of a single long ivory-linen banquet table beneath the arched glass roof of The Conservatory',
  },
  'library-fireplace': {
    src: '/gallery/library-fireplace.jpg',
    width: 1376,
    height: 768,
    alt: 'Architectural watercolor of an intimate winter wedding setting beside the carved marble fireplace in the walnut-paneled Library Salon',
  },
  'suite-mirror': {
    src: '/gallery/suite-mirror.jpg',
    width: 1264,
    height: 848,
    alt: 'Architectural watercolor of champagne flutes and blush heritage roses before the tall gilded oval mirror in the Rose Suite',
  },
  'ballroom-gala': {
    src: '/gallery/ballroom-gala.jpg',
    width: 1264,
    height: 848,
    alt: 'Architectural watercolor of a candlelit winter black-tie charity gala in the Grand Ballroom beneath starry arched windows',
  },
  'mezzanine-balcony': {
    src: '/gallery/mezzanine-balcony.jpg',
    width: 1200,
    height: 896,
    alt: 'Architectural watercolor of two crystal champagne coupes on a marble table beside the gilded wrought-iron Mezzanine balustrade overlooking the Grand Ballroom',
  },
  'conservatory-theatre': {
    src: '/gallery/conservatory-theatre.jpg',
    width: 1376,
    height: 768,
    alt: 'Architectural watercolor of morning plenary theatre seating and a walnut lectern bathed in daylight beneath the arched glass roof of The Conservatory',
  },
  'library-boardroom': {
    src: '/gallery/library-boardroom.jpg',
    width: 1200,
    height: 896,
    alt: 'Architectural watercolor of an autumn evening board dinner set along the polished walnut table beside the glowing fireplace in the Library Salon',
  },
  'mezzanine-dinner': {
    src: '/gallery/mezzanine-dinner.jpg',
    width: 896,
    height: 1200,
    alt: 'Architectural watercolor of an ivory-draped golden anniversary dinner table lit by tall taper candles beside the arched park windows of the Mezzanine Gallery',
  },
  'terrace-lights': {
    src: '/gallery/terrace-lights.jpg',
    width: 1200,
    height: 896,
    alt: 'Architectural watercolor of round candlelit supper tables beneath glowing festoon string lights on the walled brick Rose Garden Terrace at summer twilight',
  },
  'ballroom-confetti': {
    src: '/gallery/ballroom-confetti.jpg',
    width: 1376,
    height: 768,
    alt: 'Architectural watercolor of couples waltzing at midnight on New Year\'s Eve beneath the three crystal chandeliers and drifting gilded paper stars in the Grand Ballroom',
  },
};

/** Architectural folio plate for each of the 12 gallery scenes. */
export function GalleryVignetteArt({
  scene,
  aspectClass = 'aspect-[4/3]',
}: {
  scene: GalleryScene;
  aspectClass?: string;
}) {
  const plate = GALLERY_SCENE_ART[scene];
  return (
    <div
      className={`relative w-full overflow-hidden border-2 border-gilt bg-surface p-2 shadow-[var(--frame-shadow)] ${aspectClass}`}
    >
      <div className="relative h-full w-full border border-gilt/65 bg-bg overflow-hidden">
        <img
          src={asset(plate.src)}
          alt={plate.alt}
          width={plate.width}
          height={plate.height}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gilt/30"
        />
      </div>
    </div>
  );
}
