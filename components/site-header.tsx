import { DarkModeToggle } from 'jamstacks';
import { business } from '../content/business';
import { Chandelier, RoseCartouche } from './art/ornaments';
import { SiteLink } from './site-link';

export function SiteHeader() {
  return (
    <header className="relative z-40 border-t-[3px] border-t-primary border-b border-b-gilt/75 bg-surface shadow-[0_1px_0_0_color-mix(in_srgb,var(--gilt)_35%,transparent)]">
      <div className="h-[1px] w-full bg-gilt/55" aria-hidden="true" />
      <div className="wrap flex min-h-20 flex-wrap items-center justify-between gap-x-4 gap-y-2 py-2.5">
        <SiteLink
          href="/"
          className="inline-flex items-center gap-3 no-underline hover:no-underline group"
        >
          <RoseCartouche className="h-11 w-14 shrink-0" />
          <span className="flex flex-col">
            <span className="font-display text-base sm:text-lg font-semibold tracking-[0.2em] uppercase text-ink group-hover:text-gilt-ink transition-colors">
              {business.name}
            </span>
            <span className="hidden sm:block font-display text-[0.65rem] tracking-[0.22em] uppercase text-muted">
              Forsyth Park · Est. {business.established}
            </span>
          </span>
        </SiteLink>

        {/* Delicate hanging chandelier in the open centre gap at 1440px+ */}
        <div aria-hidden="true" className="hidden xl:flex items-center justify-center no-print">
          <Chandelier className="h-12 w-16 opacity-85" />
        </div>

        <nav aria-label="Main" className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <SiteLink
            href="/spaces/"
            markCurrent="page"
            className="font-display text-xs font-medium tracking-[0.16em] uppercase text-ink hover:text-gilt-ink"
          >
            Spaces
          </SiteLink>
          <SiteLink
            href="/packages/"
            markCurrent="page"
            className="font-display text-xs font-medium tracking-[0.16em] uppercase text-ink hover:text-gilt-ink"
          >
            Packages
          </SiteLink>
          <SiteLink
            href="/gallery/"
            markCurrent="page"
            className="font-display text-xs font-medium tracking-[0.16em] uppercase text-ink hover:text-gilt-ink"
          >
            Gallery
          </SiteLink>
          <SiteLink
            href="/contact/"
            markCurrent="page"
            className="font-display text-xs font-medium tracking-[0.16em] uppercase text-ink hover:text-gilt-ink"
          >
            Visit &amp; Enquire
          </SiteLink>
          <DarkModeToggle />
          <SiteLink
            href="/contact/"
            className="button hidden lg:inline-flex min-h-10 px-4 py-2 text-[0.72rem]"
          >
            Enquire about a date
          </SiteLink>
        </nav>
      </div>
    </header>
  );
}
