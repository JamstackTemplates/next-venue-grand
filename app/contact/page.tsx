import type { Metadata } from 'next';
import { AcanthusCorners, PlaceCard, RoseCartouche } from '../../components/art/ornaments';
import { CopyEmail } from '../../components/copy-email';
import { GoogleMap } from '../../components/google-map';
import { HoursPlate } from '../../components/hours-plate';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { PageHead } from '../../components/page-head';
import { business } from '../../content/business';
import { mapDirectionsUrl } from '../../lib/maps';
import { absoluteUrl } from '../../lib/paths';
import { site } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Visit & Enquire',
  description: business.enquiries.introduction,
  alternates: { canonical: absoluteUrl('/contact/') },
};

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);
  const directionsHref = mapDirectionsUrl(business.address.formatted);

  return (
    <>
      <PageHead
        eyebrow="The Events Office"
        title={business.enquiries.title}
        flourish="Savannah · Forsyth Park"
        art={<RoseCartouche className="h-12 w-15" />}
      >
        <p>{business.enquiries.introduction}</p>
      </PageHead>

      <div className="boiserie-bg">
        <div className="wrap py-14 sm:py-18 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-start">
        {/* Left column: What to include + Hosted Form (or Email Fallback) + Enquiry Wording Note */}
        <section aria-label="Enquiry form" className="space-y-8">
          <div className="gilt-frame-celadon bg-surface-2 p-6 sm:p-8">
            <AcanthusCorners />
            <h2 className="font-display text-base sm:text-lg tracking-[0.14em] uppercase text-ink">
              What to include in your message
            </h2>
            <p className="mt-2 text-sm text-muted">
              Our enquiry form takes your name, email and message. Including a few details below
              helps the events team reply with availability and a written proposal:
            </p>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {business.enquiries.usefulToInclude.map((tip) => (
                <li key={tip}>
                  <PlaceCard value={tip} className="normal-case font-serif tracking-normal text-xs sm:text-sm font-normal" />
                </li>
              ))}
            </ul>
          </div>

          <div className="gilt-frame bg-surface p-6 sm:p-9">
            <AcanthusCorners />
            <h2 className="font-display text-xl tracking-[0.12em] uppercase text-ink">
              Send an enquiry
            </h2>
            <div className="mt-5">
              {hosted ? (
                <JamstacksSupportForm
                  siteId={site.jamstacksSite}
                  embedUrl={site.jamstacksEmbedUrl}
                  email={business.email}
                />
              ) : (
                <div className="space-y-3 border border-gilt/50 bg-bg/70 p-6">
                  <p className="font-display text-sm font-semibold tracking-[0.14em] uppercase text-ink">
                    Write to the events office directly
                  </p>
                  <p className="text-sm sm:text-base text-muted">
                    The online enquiry form is not connected on this preview. Please email{' '}
                    <a className="text-link wrap-anywhere" href={`mailto:${business.email}`}>
                      {business.email}
                    </a>{' '}
                    or telephone{' '}
                    <a
                      className="text-link"
                      href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}
                    >
                      {business.phone}
                    </a>{' '}
                    with your event details.
                  </p>
                </div>
              )}
            </div>
          </div>

          <p className="border-l-2 border-gilt pl-4 text-sm italic text-muted">
            {business.enquiries.confirmationNote}
          </p>
        </section>

        {/* Right column: Direct Email & Phone, Address & Directions, Office Hours Plate, Google Map */}
        <aside aria-label="Contact details and location" className="space-y-8">
          <div className="gilt-frame bg-surface p-6 sm:p-8 space-y-5">
            <AcanthusCorners />
            <div>
              <h2 className="font-display text-base tracking-[0.14em] uppercase text-ink">
                Direct Contact
              </h2>
              <p className="mt-2">
                <a
                  className="text-link text-lg wrap-anywhere"
                  href={`mailto:${business.email}`}
                >
                  {business.email}
                </a>
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <CopyEmail email={business.email} />
              </div>
              {business.phone ? (
                <p className="mt-3 text-base text-ink">
                  Telephone:{' '}
                  <a
                    className="text-link"
                    href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}
                  >
                    {business.phone}
                  </a>
                </p>
              ) : null}
            </div>

            <div className="border-t border-gilt/45 pt-5 space-y-2">
              <h3 className="font-display text-sm tracking-[0.14em] uppercase text-ink">
                Address &amp; Directions
              </h3>
              <address className="not-italic text-base text-ink">
                <p>{business.address.formatted}</p>
                <p className="text-sm text-muted">{business.address.landmark}</p>
              </address>
              <p className="text-sm text-muted">{business.directions}</p>
              <p className="text-sm text-muted">{business.parking}</p>
              <p className="pt-1">
                <a
                  href={directionsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link font-display text-xs tracking-[0.16em] uppercase"
                >
                  Get directions on Google Maps
                </a>
              </p>
            </div>
          </div>

          <HoursPlate hours={business.officeHours} note={business.hoursNote} />

          <div className="gilt-frame bg-surface p-3 no-print">
            <GoogleMap
              address={business.address.formatted}
              title={`Map showing ${business.name} at ${business.address.formatted}`}
            />
          </div>
        </aside>
        </div>
      </div>
    </>
  );
}
