import type { Metadata } from 'next';
import { ArchCorniceBorder } from '../../components/art/ornaments';
import { GallerySalon } from '../../components/gallery-salon';
import { PageHead } from '../../components/page-head';
import { SiteLink } from '../../components/site-link';
import { gallery } from '../../content/gallery';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Twelve illustrated scenes showing how Rosewood Hall dresses across weddings, galas, corporate days and milestone celebrations.',
  alternates: { canonical: absoluteUrl('/gallery/') },
};

export default function GalleryPage() {
  return (
    <>
      <PageHead
        eyebrow="The Salon Wall"
        title="Evenings at the Hall"
        flourish="Twelve scenes across the seasons"
        art={
          <svg viewBox="0 0 80 56" className="h-11 w-16" fill="none">
            <rect x="4" y="4" width="72" height="48" fill="var(--surface)" stroke="var(--gilt)" strokeWidth="2" />
            <rect x="10" y="10" width="60" height="36" fill="var(--surface-2)" stroke="var(--gilt)" strokeWidth="0.9" />
            <path d="M22 46 L22 28 A18 14 0 0 1 58 28 L58 46" stroke="var(--gilt)" strokeWidth="1.2" />
            <circle cx="40" cy="24" r="3" fill="var(--gilt)" />
          </svg>
        }
      >
        <p>
          How each room transforms from morning daylight in the Conservatory to candlelit waltzes
          beneath the Grand Ballroom chandeliers.
        </p>
      </PageHead>

      {/* Full-bleed damask salon wall */}
      <section className="damask-band py-14 sm:py-18">
        <div className="wrap">
          <GallerySalon items={gallery} />
        </div>
      </section>

      <ArchCorniceBorder flip />

      {/* Closing invitation to a viewing */}
      <section className="salver-linen-bg py-16 text-center">
        <div className="wrap">
          <div className="mx-auto max-w-xl space-y-4">
          <p className="eyebrow">See the Rooms in Person</p>
          <h2 className="font-display text-2xl sm:text-3xl uppercase text-ink">
            Walk the hall with our events team
          </h2>
          <p className="text-base text-muted">
            Private viewings are arranged by appointment Tuesday through Saturday during events
            office hours.
          </p>
          <div className="pt-2">
            <SiteLink href="/contact/" className="button">
              Enquire about a viewing
            </SiteLink>
          </div>
          </div>
        </div>
      </section>
    </>
  );
}
