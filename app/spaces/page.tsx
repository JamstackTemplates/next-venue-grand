import type { Metadata } from 'next';
import { RoomDoorway } from '../../components/art/enfilade-doorways';
import {
  AreaIcon,
  CeilingIcon,
  ClockIcon,
  LayoutIcon,
  ParkingIcon,
  RoseIcon,
  StepFreeIcon,
} from '../../components/art/icons';
import { AcanthusCorners, ArchCorniceBorder, EggAndDartFrieze, LaurelSwagBorder, PlaceCard } from '../../components/art/ornaments';
import { HallPlan } from '../../components/hall-plan';
import { PageHead } from '../../components/page-head';
import { SiteLink } from '../../components/site-link';
import { packages } from '../../content/packages';
import { LAYOUT_KINDS, LAYOUT_LABELS, spaces } from '../../content/spaces';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Spaces',
  description:
    'Explore the five bookable rooms and Rose Suite at Rosewood Hall, compare capacities across layouts and view the interactive 1912 floor plan.',
  alternates: { canonical: absoluteUrl('/spaces/') },
};

export default function SpacesPage() {
  return (
    <>
      <PageHead
        eyebrow="The Architecture"
        title="Five rooms, one roof"
        flourish="Ground floor to mezzanine, facing Forsyth Park"
        art={
          <svg viewBox="0 0 88 52" className="h-11 w-20" fill="none">
            <rect x="4" y="4" width="80" height="44" fill="var(--surface-2)" stroke="var(--gilt)" strokeWidth="1.3" />
            <rect x="10" y="10" width="40" height="32" fill="var(--surface)" stroke="var(--gilt)" strokeWidth="1" />
            <rect x="54" y="10" width="24" height="16" fill="var(--surface)" stroke="var(--gilt)" strokeWidth="1" />
            <rect x="54" y="30" width="24" height="12" fill="var(--surface)" stroke="var(--gilt)" strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="30" cy="26" r="5" stroke="var(--gilt)" strokeWidth="1" />
          </svg>
        }
      >
        <p>
          Compare every room on our 1912 architectural plan, switch seating layouts, and read full
          dimensions and capacities below.
        </p>
      </PageHead>

      {/* Full interactive Hall Plan on celadon trellis */}
      <section id="plan" className="trellis-bg py-14 sm:py-18">
        <div className="wrap">
          <div className="mb-6">
            <p className="eyebrow">Interactive Drawing</p>
            <h2 className="mt-1 font-display text-2xl sm:text-3xl uppercase text-ink">
              The Hall Plan
            </h2>
          </div>
          <HallPlan spaces={spaces} variant="full" />
        </div>
      </section>
      <LaurelSwagBorder className="bg-surface/70" />

      {/* Room-by-room alternating entries */}
      <section className="boiserie-bg py-16 sm:py-20">
        <div className="wrap space-y-16">
        {spaces.map((room, idx) => {
          const reverse = idx % 2 === 1;
          const roomPackages = packages.filter((pkg) => pkg.spaces.includes(room.id));
          return (
            <article
              key={room.id}
              id={room.id}
              className="grid gap-8 lg:grid-cols-12 lg:items-center scroll-mt-24"
            >
              <div className={`lg:col-span-5 ${reverse ? 'lg:order-2' : ''}`}>
                <div className="mx-auto max-w-xs sm:max-w-sm">
                  <RoomDoorway spaceId={room.id} className="w-full h-auto" />
                </div>
              </div>

              <div className={`lg:col-span-7 ${reverse ? 'lg:order-1' : ''}`}>
                <div className="gilt-frame bg-surface p-7 sm:p-9">
                  <AcanthusCorners />
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="eyebrow">
                      {room.floor === 'ground' ? 'Ground Floor' : 'Upper Floor'}
                      {room.outdoor ? ' · Outdoor' : ''}
                    </p>
                    {room.season === 'april-october' ? (
                      <span className="inline-flex items-center gap-1.5 border border-rosewood/60 bg-bg px-2.5 py-0.5 font-display text-[0.68rem] font-semibold tracking-[0.14em] uppercase text-rosewood">
                        <RoseIcon className="h-3.5 w-3.5" />
                        April – October
                      </span>
                    ) : null}
                    {!room.bookableAlone ? (
                      <span className="inline-flex items-center gap-1.5 border border-gilt bg-bg px-2.5 py-0.5 font-display text-[0.68rem] font-semibold tracking-[0.14em] uppercase text-gilt-ink">
                        Included with wedding packages
                      </span>
                    ) : null}
                  </div>

                  <h2 className="mt-2 font-display text-2xl sm:text-3xl uppercase text-ink">
                    {room.name}
                  </h2>
                  <p className="mt-3 text-base text-muted">{room.summary}</p>

                  {/* Dimensions */}
                  <div className="mt-5 flex flex-wrap gap-6 border-y border-gilt/45 py-3.5 text-sm text-ink">
                    <span className="inline-flex items-center gap-2">
                      <AreaIcon className="h-4 w-4 text-gilt-ink" />
                      <span>{room.areaSqFt.toLocaleString('en-US')} sq ft</span>
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <CeilingIcon className="h-4 w-4 text-gilt-ink" />
                      <span>
                        {room.ceilingFt !== null ? `${room.ceilingFt} ft ceiling` : 'Open air'}
                      </span>
                    </span>
                  </div>

                  {/* Capacities with layout icons */}
                  <div className="mt-5">
                    <h3 className="font-display text-[0.7rem] font-semibold tracking-[0.18em] uppercase text-muted">
                      Capacities by Layout
                    </h3>
                    <dl className="mt-2.5 grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                      {LAYOUT_KINDS.map((kind) => {
                        const cap = room.capacity[kind];
                        return (
                          <div
                            key={kind}
                            className="border border-gilt/50 bg-bg/70 px-3 py-2 text-center"
                          >
                            <dt className="flex items-center justify-center gap-1 font-display text-[0.65rem] tracking-[0.12em] uppercase text-muted">
                              <LayoutIcon layout={kind} className="h-3.5 w-3.5 text-gilt-ink" />
                              <span>{LAYOUT_LABELS[kind]}</span>
                            </dt>
                            <dd className="mt-1 font-display text-lg font-medium text-ink">
                              {cap !== null ? cap : '—'}
                            </dd>
                          </div>
                        );
                      })}
                    </dl>
                  </div>

                  {/* Features hairline list */}
                  <ul className="mt-5 grid gap-1.5 sm:grid-cols-2 border-t border-gilt/35 pt-4 text-sm text-ink">
                    {room.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2">
                        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-gilt" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Packages including this room */}
                  {roomPackages.length > 0 ? (
                    <div className="mt-5 border-t border-gilt/35 pt-4">
                      <p className="font-display text-[0.68rem] font-semibold tracking-[0.18em] uppercase text-muted">
                        Featured in Packages
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {roomPackages.map((pkg) => (
                          <SiteLink
                            key={pkg.id}
                            href="/packages/"
                            className="no-underline hover:no-underline"
                          >
                            <PlaceCard value={pkg.name.replace(/^The /, '')} />
                          </SiteLink>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </article>
          );
        })}
        </div>
      </section>

      <ArchCorniceBorder />

      {/* Accessible capacity table on linen inside double gilt rule */}
      <section className="trellis-bg py-16">
        <div className="wrap">
          <div className="gilt-frame bg-surface p-6 sm:p-10">
            <AcanthusCorners />
            <p className="eyebrow">At a Glance</p>
            <h2 className="mt-1 font-display text-2xl sm:text-3xl uppercase text-ink">
              Room Capacity Table
            </h2>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[38rem] border-collapse text-sm sm:text-base">
                <caption className="sr-only">
                  Maximum guest capacities for every room at Rosewood Hall across all five layouts
                </caption>
                <thead>
                  <tr className="border-b-2 border-gilt">
                    <th scope="col" className="py-3 pr-4 text-left font-display text-xs tracking-[0.16em] uppercase text-ink">
                      Room
                    </th>
                    <th scope="col" className="py-3 px-3 text-right font-display text-xs tracking-[0.14em] uppercase text-muted">
                      Area
                    </th>
                    {LAYOUT_KINDS.map((kind) => (
                      <th
                        key={kind}
                        scope="col"
                        className="py-3 px-3 text-right font-display text-xs tracking-[0.14em] uppercase text-ink"
                      >
                        <span className="inline-flex items-center justify-end gap-1.5">
                          <LayoutIcon layout={kind} className="h-3.5 w-3.5 text-gilt-ink" />
                          <span>{LAYOUT_LABELS[kind]}</span>
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {spaces.map((room) => (
                    <tr key={room.id} className="border-b border-line/80 last:border-b-0">
                      <th scope="row" className="py-3.5 pr-4 text-left font-display text-xs sm:text-sm font-semibold tracking-[0.08em] uppercase text-ink">
                        <a href={`#${room.id}`} className="hover:text-gilt-ink">
                          {room.name}
                        </a>
                      </th>
                      <td className="py-3.5 px-3 text-right text-muted">
                        {room.areaSqFt.toLocaleString('en-US')} sq ft
                      </td>
                      {LAYOUT_KINDS.map((kind) => (
                        <td key={kind} className="py-3.5 px-3 text-right font-medium text-ink">
                          {room.capacity[kind] !== null ? room.capacity[kind] : '—'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Practical notes under egg-and-dart frieze */}
      <section className="wrap py-16">
        <EggAndDartFrieze className="mb-10" />
        <div className="max-w-4xl mx-auto">
          <p className="eyebrow">Practical Notes</p>
          <h2 className="mt-1 font-display text-2xl sm:text-3xl uppercase text-ink">
            Access, catering &amp; timings
          </h2>
          <dl className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="border-t border-gilt/50 pt-4">
              <dt className="flex items-center gap-2 font-display text-xs font-semibold tracking-[0.16em] uppercase text-ink">
                <StepFreeIcon className="h-4 w-4 text-gilt-ink" />
                Step-free access &amp; lift
              </dt>
              <dd className="mt-2 text-sm text-muted">
                Every ground-floor room and the Rose Garden Terrace have step-free access from the
                Gaston Street entrance. A passenger lift serves the Mezzanine Gallery and Rose Suite.
              </dd>
            </div>
            <div className="border-t border-gilt/50 pt-4">
              <dt className="flex items-center gap-2 font-display text-xs font-semibold tracking-[0.16em] uppercase text-ink">
                <ClockIcon className="h-4 w-4 text-gilt-ink" />
                Evening curfew
              </dt>
              <dd className="mt-2 text-sm text-muted">
                Music and bar service conclude at 11 pm in keeping with Savannah Historic District
                guidelines; vendor strike runs until midnight.
              </dd>
            </div>
            <div className="border-t border-gilt/50 pt-4">
              <dt className="flex items-center gap-2 font-display text-xs font-semibold tracking-[0.16em] uppercase text-ink">
                <RoseIcon className="h-4 w-4 text-gilt-ink" />
                In-house catering
              </dt>
              <dd className="mt-2 text-sm text-muted">
                All menus and bar packages are prepared by our kitchen team. Outside wedding cakes
                from licensed Savannah bakers are welcome.
              </dd>
            </div>
            <div className="border-t border-gilt/50 pt-4">
              <dt className="flex items-center gap-2 font-display text-xs font-semibold tracking-[0.16em] uppercase text-ink">
                <ParkingIcon className="h-4 w-4 text-gilt-ink" />
                Gaston Lane load-in
              </dt>
              <dd className="mt-2 text-sm text-muted">
                Florists, bands and AV crews load directly into the ballroom service vestibule via
                the level Gaston Lane door behind the hall.
              </dd>
            </div>
          </dl>

          <div className="mt-10 text-center">
            <SiteLink href="/contact/" className="button">
              Enquire about a date
            </SiteLink>
          </div>
        </div>
      </section>
    </>
  );
}
