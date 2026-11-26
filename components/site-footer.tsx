import { business } from '../content/business';
import { HerringboneParquetBand, RoseCartouche, RoseWindowWatermark } from './art/ornaments';
import { SiteLink } from './site-link';

export function SiteFooter() {
  return (
    <footer className="mt-0">
      <HerringboneParquetBand heightClass="h-8" />
      <div className="relative overflow-hidden footer-damask text-on-primary border-t border-gilt/75">
        <RoseWindowWatermark className="absolute -right-24 -bottom-28 h-80 w-80 opacity-15" />
        <div className="relative wrap py-12 grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          {/* Monogram & Address */}
          <div className="space-y-4">
            <div className="flex items-center gap-3.5">
              <RoseCartouche className="h-12 w-15 shrink-0" inverted />
              <div>
                <p className="font-display text-lg tracking-[0.2em] uppercase">
                  {business.name}
                </p>
                <p className="font-display text-[0.7rem] tracking-[0.18em] uppercase text-on-primary/80">
                  1912 Beaux-Arts Event Hall
                </p>
              </div>
            </div>
            <address className="not-italic text-sm leading-relaxed text-on-primary/90">
              <p>{business.address.formatted}</p>
              <p className="text-on-primary/75">{business.address.landmark}</p>
            </address>
            <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
              <a
                className="underline decoration-gilt underline-offset-4 hover:text-gilt"
                href={`mailto:${business.email}`}
              >
                {business.email}
              </a>
              {business.phone ? (
                <a
                  className="underline decoration-gilt underline-offset-4 hover:text-gilt"
                  href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}
                >
                  {business.phone}
                </a>
              ) : null}
            </div>
          </div>

          {/* Events Office Hours */}
          <div className="space-y-2.5 text-sm">
            <h2 className="font-display text-xs font-semibold tracking-[0.2em] uppercase text-gilt">
              Events Office Hours
            </h2>
            <dl className="space-y-1 text-on-primary/90">
              <div className="flex justify-between gap-4 border-b border-on-primary/15 pb-1">
                <dt>Tuesday – Friday</dt>
                <dd>10 am – 6 pm</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-on-primary/15 pb-1">
                <dt>Saturday</dt>
                <dd>10 am – 4 pm</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Sunday &amp; Monday</dt>
                <dd>Closed</dd>
              </div>
            </dl>
            <p className="pt-1 text-xs text-on-primary/75">{business.hoursNote}</p>
          </div>

          {/* Navigation */}
          <div className="space-y-3 text-sm">
            <h2 className="font-display text-xs font-semibold tracking-[0.2em] uppercase text-gilt">
              The Hall
            </h2>
            <ul className="space-y-2 font-display text-xs tracking-[0.16em] uppercase">
              <li>
                <SiteLink href="/" className="hover:text-gilt">
                  Home
                </SiteLink>
              </li>
              <li>
                <SiteLink href="/spaces/" className="hover:text-gilt">
                  Spaces &amp; Floor Plan
                </SiteLink>
              </li>
              <li>
                <SiteLink href="/packages/" className="hover:text-gilt">
                  Event Packages
                </SiteLink>
              </li>
              <li>
                <SiteLink href="/gallery/" className="hover:text-gilt">
                  Gallery
                </SiteLink>
              </li>
              <li>
                <SiteLink href="/contact/" className="hover:text-gilt">
                  Visit &amp; Enquire
                </SiteLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-on-primary/20">
          <div className="wrap py-4 flex flex-wrap items-center justify-between gap-4 text-xs text-on-primary/80">
            <p>
              {business.name} · {business.address.city}, {business.address.region}
            </p>
            <span title="Made with love by jamstacks.net">
              with{' '}
              <span role="img" aria-label="love">
                ❤️
              </span>{' '}
              <a
                className="no-underline hover:text-gilt hover:underline"
                href="https://jamstacks.net"
              >
                jamstacks.net
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
