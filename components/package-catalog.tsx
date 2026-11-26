'use client';

import { useEffect, useState } from 'react';
import {
  formatPriceUnit,
  formatUsd,
  PACKAGE_KIND_LABELS,
  PACKAGE_KINDS,
  type EventPackage,
  type PackageKind,
} from '../content/packages';
import { SPACE_BY_ID } from '../content/spaces';
import { ClockIcon, GuestsIcon } from './art/icons';
import { AcanthusCorners, PlaceCard } from './art/ornaments';
import { SiteLink } from './site-link';

export function PackageCatalog({ packages }: { packages: readonly EventPackage[] }) {
  const [mounted, setMounted] = useState(false);
  const [kind, setKind] = useState<'all' | PackageKind>('all');

  useEffect(() => {
    setMounted(true);
  }, []);

  const visible = kind === 'all' ? packages : packages.filter((p) => p.kind === kind);

  return (
    <div className="space-y-10">
      {/* Kind filter as small-caps tabs on a gilt rule (hidden without JS) */}
      {mounted ? (
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-gilt/60 pb-4 no-print" role="group" aria-label="Filter packages by occasion">
          {(['all', ...PACKAGE_KINDS] as const).map((option) => {
            const active = kind === option;
            const label = option === 'all' ? 'All' : PACKAGE_KIND_LABELS[option];
            return (
              <button
                key={option}
                type="button"
                aria-pressed={active}
                onClick={() => setKind(option)}
                className={`px-4 py-2 font-display text-xs font-semibold tracking-[0.18em] uppercase border transition-colors ${
                  active
                    ? 'border-primary bg-primary text-on-primary'
                    : 'border-transparent text-ink hover:border-gilt/70 hover:bg-surface'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      ) : null}

      <p className="sr-only" role="status" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? 'package' : 'packages'}
        {kind === 'all' ? '' : ` for ${PACKAGE_KIND_LABELS[kind].toLowerCase()}`}.
      </p>

      {/* Engraved invitations: two per row at desktop, alternating linen & celadon stock */}
      <div className="grid gap-8 lg:grid-cols-2">
        {visible.map((pkg, index) => {
          const isCeladon = index % 2 === 1;
          return (
            <article
              key={pkg.id}
              className={`relative overflow-hidden p-7 sm:p-9 invitation-lift flex flex-col justify-between ${
                isCeladon
                  ? 'gilt-frame-celadon bg-surface-2'
                  : 'gilt-frame bg-surface'
              } ${!pkg.available ? 'opacity-80' : ''}`}
            >
              <AcanthusCorners />

              {/* Diagonal "Fully reserved" ribbon when unavailable */}
              {!pkg.available ? (
                <div
                  aria-label="Fully reserved"
                  className="pointer-events-none absolute top-8 -right-11 rotate-45 bg-rosewood px-12 py-1.5 text-center font-display text-[0.65rem] font-semibold tracking-[0.16em] uppercase text-on-primary shadow-sm"
                >
                  Fully reserved
                </div>
              ) : null}

              <div>
                <p className="eyebrow">{PACKAGE_KIND_LABELS[pkg.kind]}</p>
                <h2 className="mt-2 font-display text-2xl sm:text-[1.75rem] tracking-[0.06em] uppercase text-ink">
                  {pkg.name}
                </h2>

                {/* Engraved price */}
                <div className="mt-4 flex flex-wrap items-baseline gap-x-2.5 gap-y-1 border-y border-gilt/50 py-3.5">
                  <span className="font-script text-3xl leading-none text-gilt-ink">from</span>
                  <span className="font-display text-3xl sm:text-4xl font-medium text-ink">
                    {formatUsd(pkg.priceFrom)}
                  </span>
                  <span className="font-display text-xs tracking-[0.16em] uppercase text-muted">
                    {formatPriceUnit(pkg.priceUnit)}
                  </span>
                </div>

                {/* Guests & duration */}
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink">
                  <span className="inline-flex items-center gap-2">
                    <GuestsIcon className="h-4 w-4 text-gilt-ink" />
                    <span>
                      {pkg.minGuests}–{pkg.maxGuests} guests
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <ClockIcon className="h-4 w-4 text-gilt-ink" />
                    <span>{pkg.hours} hours</span>
                  </span>
                </div>

                {/* Rooms as linked place cards */}
                <div className="mt-5">
                  <p className="font-display text-[0.68rem] font-semibold tracking-[0.18em] uppercase text-muted">
                    Included Rooms
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {pkg.spaces.map((spaceId) => {
                      const room = SPACE_BY_ID[spaceId];
                      return (
                        <SiteLink
                          key={spaceId}
                          href={`/spaces/#${spaceId}`}
                          className="no-underline hover:no-underline"
                        >
                          <PlaceCard
                            value={room ? room.name.replace(/^The /, '') : spaceId}
                            className="hover:border-primary transition-colors"
                          />
                        </SiteLink>
                      );
                    })}
                  </div>
                </div>

                {/* Inclusions */}
                <ul className="mt-6 space-y-2 border-t border-gilt/35 pt-4 text-sm sm:text-[0.96rem] text-ink">
                  {pkg.inclusions.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-gilt"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-gilt/40 space-y-3">
                {pkg.note ? (
                  <p className="border-l-2 border-rosewood pl-3 text-sm italic text-ink">
                    {pkg.note}
                  </p>
                ) : null}
                <div className="flex items-center justify-between">
                  <SiteLink
                    href="/contact/"
                    className={pkg.available ? 'button' : 'button button-quiet'}
                  >
                    {pkg.available ? 'Enquire about this package' : 'Enquire about future dates'}
                  </SiteLink>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
