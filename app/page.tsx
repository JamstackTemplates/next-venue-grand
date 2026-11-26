import type { Metadata } from 'next';
import { RoomDoorway } from '../components/art/enfilade-doorways';
import { GalleryVignetteArt } from '../components/art/gallery-vignette';
import { AcanthusCorners, PlaceCard } from '../components/art/ornaments';
import { HallPlan } from '../components/hall-plan';
import {
  BallroomHero,
  EnfiladeBand,
  GalleryBand,
  PackagesBand,
  PlanBand,
  ProgramCardBand,
  VisitBand,
} from '../components/home-sections';
import { HoursPlate } from '../components/hours-plate';
import { SiteLink } from '../components/site-link';
import { business } from '../content/business';
import { gallery } from '../content/gallery';
import { formatPriceUnit, formatUsd, packages, PACKAGE_KIND_LABELS } from '../content/packages';
import { maxReceptionCapacity, primaryRoomCount, SPACE_BY_ID, spaces } from '../content/spaces';
import { absoluteUrl } from '../lib/paths';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl('/') },
};

export default function HomePage() {
  const featuredPackages = packages.filter((p) => p.featured);
  const homeVignettes = gallery.slice(0, 6);
  const maxGuests = maxReceptionCapacity();
  const roomCount = primaryRoomCount();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData()) }}
      />

      {/* 1. Split Asymmetric Ballroom Hero */}
      <BallroomHero>
        <BallroomHero.Heading>
          A ballroom on Forsyth Park, ready for your{' '}
          <BallroomHero.Script>evening.</BallroomHero.Script>
        </BallroomHero.Heading>
        <BallroomHero.Lead>
          Five rooms under one {business.established} roof, from a library salon for 12 to a gilded
          ballroom for {maxGuests}.
        </BallroomHero.Lead>
        <BallroomHero.Actions
          primaryHref="/contact/"
          primaryLabel="Enquire about a date"
          secondaryHref="/spaces/"
          secondaryLabel="See the spaces"
        />
        <BallroomHero.Facts
          facts={[`Up to ${maxGuests} guests`, `${roomCount} rooms`, 'On Forsyth Park']}
        />
      </BallroomHero>

      {/* 2. Five rooms, one address — enfilade of arched doorways on celadon */}
      <EnfiladeBand
        eyebrow="The Enfilade"
        heading="Five rooms, one address"
        intro="Move from garden ceremony to candlelit banquet and late-night mezzanine bar without leaving the house."
      >
        <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory lg:grid lg:grid-cols-6 lg:overflow-visible lg:pb-0">
          {spaces.map((room, idx) => {
            const scaleOffset = idx === 0 ? '' : idx === 1 ? 'lg:mt-2' : idx === 2 ? 'lg:mt-4' : idx === 3 ? 'lg:mt-4' : idx === 4 ? 'lg:mt-2' : '';
            return (
              <SiteLink
                key={room.id}
                href={`/spaces/#${room.id}`}
                className={`group snap-start shrink-0 w-52 sm:w-56 lg:w-auto flex flex-col items-center text-center no-underline hover:no-underline ${scaleOffset}`}
              >
                <div className="w-full transition-transform duration-200 group-hover:-translate-y-1">
                  <RoomDoorway spaceId={room.id} className="w-full h-auto" />
                </div>
                <span className="mt-3 font-display text-xs font-semibold tracking-[0.14em] uppercase text-ink group-hover:text-gilt-ink">
                  {room.name.replace(/^The /, '')}
                </span>
                <div className="mt-2">
                  <PlaceCard label="up to" value={`${room.capacity.reception}`} />
                </div>
              </SiteLink>
            );
          })}
        </div>
      </EnfiladeBand>

      {/* 3. Find your floor — miniature Hall Plan on plaster */}
      <PlanBand
        eyebrow="The Hall Plan"
        heading="Find your floor"
        intro="Select any room on our 1912 floor plan and switch between reception, banquet, theatre and cabaret seating to see how the house fits your guest list."
      >
        <HallPlan spaces={spaces} variant="miniature" exploreLabel="Open the full floor plan" />
      </PlanBand>

      {/* 4. Packages, priced from — three fanned invitations on linen */}
      <PackagesBand
        eyebrow="Priced From"
        heading="Packages, priced from"
        intro="Transparent starting rates for weddings, black-tie galas and private dinners, each prepared with in-house catering and a dedicated coordinator."
        footer={
          <SiteLink href="/packages/" className="button button-quiet">
            See all {packages.length} packages
          </SiteLink>
        }
      >
        <div className="grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {featuredPackages.map((pkg, idx) => {
            const fanClass =
              idx === 0
                ? 'lg:-rotate-1 lg:translate-y-2'
                : idx === 2
                  ? 'lg:rotate-1 lg:translate-y-2'
                  : 'lg:z-10';
            return (
              <article
                key={pkg.id}
                className={`gilt-frame bg-surface p-7 flex flex-col justify-between text-center invitation-lift ${fanClass}`}
              >
                <AcanthusCorners />
                <div>
                  <p className="eyebrow">{PACKAGE_KIND_LABELS[pkg.kind]}</p>
                  <h3 className="mt-2 font-display text-xl tracking-[0.08em] uppercase text-ink">
                    {pkg.name}
                  </h3>
                  <div className="my-5 border-y border-gilt/50 py-3">
                    <span className="font-script text-3xl text-gilt-ink mr-2">from</span>
                    <span className="font-display text-3xl font-medium text-ink">
                      {formatUsd(pkg.priceFrom)}
                    </span>
                    <span className="block mt-1 font-display text-[0.7rem] tracking-[0.16em] uppercase text-muted">
                      {formatPriceUnit(pkg.priceUnit)}
                    </span>
                  </div>
                  <p className="text-sm text-muted">
                    {pkg.minGuests}–{pkg.maxGuests} guests · {pkg.hours} hours
                  </p>
                </div>
                <div className="mt-6">
                  <SiteLink href="/packages/" className="text-link font-display text-xs tracking-[0.16em] uppercase">
                    View inclusions
                  </SiteLink>
                </div>
              </article>
            );
          })}
        </div>
      </PackagesBand>

      {/* 5. Evenings at the Hall — six gilt-framed vignettes on damask */}
      <GalleryBand
        eyebrow="The Salon Wall"
        heading="Evenings at the Hall"
        intro="Six glimpses of the rooms dressed for autumn weddings, winter galas and spring ceremonies."
        footer={
          <SiteLink href="/gallery/" className="button">
            Browse all {gallery.length} scenes in the gallery
          </SiteLink>
        }
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {homeVignettes.map((item, idx) => {
            const room = SPACE_BY_ID[item.space];
            const spanClass =
              idx === 0 || idx === 3
                ? 'lg:col-span-4'
                : idx === 1 || idx === 2
                  ? 'lg:col-span-2'
                  : 'lg:col-span-3';
            const aspectClass =
              idx === 0 || idx === 3
                ? 'aspect-[16/9]'
                : idx === 1 || idx === 2
                  ? 'aspect-[4/3] lg:aspect-[5/6]'
                  : 'aspect-[16/10]';
            return (
              <figure
                key={item.id}
                className={`frame-tilt flex flex-col ${spanClass}`}
              >
                <GalleryVignetteArt
                  scene={item.scene}
                  aspectClass={aspectClass}
                />
                <figcaption className="mx-3 -mt-3 relative z-10 border border-gilt bg-surface px-4 py-2.5 flex items-center justify-between gap-3">
                  <span className="font-display text-xs font-semibold tracking-[0.08em] uppercase text-ink">
                    {item.title}
                  </span>
                  <span className="font-display text-[0.65rem] tracking-[0.14em] uppercase text-muted shrink-0">
                    {room ? room.name.replace(/^The /, '') : item.space} · {item.season}
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </GalleryBand>

      {/* 6. How an enquiry works — "Order of the Evening" program card */}
      <ProgramCardBand
        eyebrow="Order of the Evening"
        heading="How an enquiry works"
        steps={[
          {
            numeral: 'I',
            title: 'Send your date & guest count',
            body: 'Write to the events office with your preferred dates, approximate guest count and the rooms or package you have in mind.',
          },
          {
            numeral: 'II',
            title: 'Visit for a private viewing',
            body: 'Walk the ballroom, conservatory and rose garden terrace with a coordinator during office hours to test layouts and menus.',
          },
          {
            numeral: 'III',
            title: 'Receive a written proposal',
            body: 'Our team sends a tailored room plan, menu outline and itemised quote for your review.',
          },
        ]}
        footnote={business.enquiries.confirmationNote}
        action={
          <SiteLink href="/contact/" className="button shrink-0">
            Enquire about a date
          </SiteLink>
        }
      />

      {/* 7. Visit the Hall — address, parking & engraved brass office-hours plate */}
      <VisitBand
        eyebrow="On Forsyth Park"
        heading="Visit the Hall"
        left={
          <>
            <address className="not-italic text-lg text-ink">
              <p className="font-display tracking-[0.06em] uppercase">{business.address.formatted}</p>
              <p className="mt-1 text-base text-muted">{business.address.landmark}</p>
            </address>
            <p className="text-base text-muted">{business.parking}</p>
            <div className="pt-2 flex flex-wrap gap-3">
              <SiteLink href="/contact/" className="button">
                Directions &amp; enquiries
              </SiteLink>
              <a
                href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}
                className="button button-quiet"
              >
                {business.phone}
              </a>
            </div>
          </>
        }
        right={<HoursPlate hours={business.officeHours} note={business.hoursNote} />}
      />
    </>
  );
}
