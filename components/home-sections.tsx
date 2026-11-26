import type { ReactNode } from 'react';
import { HeroBallroom } from './art/hero-ballroom';
import {
  AcanthusCorners,
  ArchCorniceBorder,
  Chandelier,
  EggAndDartFrieze,
  HerringboneParquetBand,
  LaurelSwagBorder,
  RoseCartouche,
  RoseWindowWatermark,
} from './art/ornaments';
import { SiteLink } from './site-link';

/* ---------- 1. Split Asymmetric Ballroom Hero ---------- */

function HeroRoot({ children }: { children: ReactNode }) {
  return (
    <section className="relative overflow-hidden boiserie-bg">
      {/* Subtle architectural rose-window watermark behind left editorial column */}
      <RoseWindowWatermark className="pointer-events-none absolute -left-32 -top-24 h-[26rem] w-[26rem] lg:h-[32rem] lg:w-[32rem]" />
      <div className="relative wrap grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:min-h-[calc(100vh-5.5rem)] py-6 lg:py-8">
        {/* Mobile arched ballroom plate visible on first screen */}
        <div className="lg:hidden pt-2">
          <div className="mx-auto max-w-xs sm:max-w-sm">
            <HeroBallroom className="w-full" />
          </div>
        </div>

        {/* Left editorial column */}
        <div className="flex flex-col justify-center py-2 pb-6 lg:py-8 lg:pr-8">
          <div className="mb-5 hidden lg:inline-flex items-center gap-3 self-start border-y border-gilt/55 bg-surface/75 px-3.5 py-1.5 shadow-[0_2px_10px_-4px_rgba(184,150,74,0.2)]">
            <RoseCartouche className="h-9 w-11" />
            <span className="eyebrow">1912 Beaux-Arts Event Hall · Savannah</span>
          </div>
          {children}
        </div>

        {/* Right tall arched ballroom bay */}
        <div className="hidden lg:flex items-center justify-end relative lg:pl-4">
          <HeroBallroom className="w-full max-w-[33.5rem]" />
        </div>
      </div>
      <ArchCorniceBorder />
    </section>
  );
}

function HeroHeading({ children }: { children: ReactNode }) {
  return (
    <h1 className="font-display text-[clamp(2rem,4.6vw,3.75rem)] leading-[1.12] tracking-[0.04em] uppercase text-ink">
      {children}
    </h1>
  );
}

function HeroScriptWord({ children }: { children: ReactNode }) {
  return (
    <span className="font-script normal-case tracking-normal text-[1.35em] leading-[0.8] text-gilt-ink">
      {children}
    </span>
  );
}

function HeroLead({ children }: { children: ReactNode }) {
  return (
    <p className="mt-4 max-w-xl text-base sm:text-lg leading-relaxed text-muted">
      {children}
    </p>
  );
}

function HeroActions({
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: {
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
}) {
  return (
    <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap gap-3">
      <SiteLink href={primaryHref} className="button w-full sm:w-auto">
        {primaryLabel}
      </SiteLink>
      <SiteLink href={secondaryHref} className="button button-quiet w-full sm:w-auto">
        {secondaryLabel}
      </SiteLink>
    </div>
  );
}

function HeroFacts({ facts }: { facts: readonly string[] }) {
  return (
    <ul
      aria-label="Venue highlights"
      className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-gilt/70 pt-4 font-display text-xs font-semibold tracking-[0.16em] uppercase text-ink"
    >
      {facts.map((fact, idx) => (
        <li key={fact} className="inline-flex items-center gap-5">
          {idx > 0 ? (
            <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-gilt" />
          ) : null}
          <span>{fact}</span>
        </li>
      ))}
    </ul>
  );
}

export const BallroomHero = Object.assign(HeroRoot, {
  Heading: HeroHeading,
  Script: HeroScriptWord,
  Lead: HeroLead,
  Actions: HeroActions,
  Facts: HeroFacts,
});

/* ---------- 2. Full-bleed Celadon Enfilade Band ---------- */

export function EnfiladeBand({
  eyebrow,
  heading,
  intro,
  children,
}: {
  eyebrow: string;
  heading: ReactNode;
  intro: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="relative trellis-bg">
      <div className="wrap py-14 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-gilt/35 pb-6">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="mt-2 font-display text-[clamp(1.7rem,3.6vw,2.6rem)] uppercase text-ink">
              {heading}
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-muted">{intro}</p>
        </div>
        <div className="mt-9">{children}</div>
      </div>
      <LaurelSwagBorder className="bg-surface/65" />
    </section>
  );
}

/* ---------- 3. Plaster Plan Split Band ---------- */

export function PlanBand({
  eyebrow,
  heading,
  intro,
  children,
}: {
  eyebrow: string;
  heading: ReactNode;
  intro: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden boiserie-bg">
      <RoseWindowWatermark className="pointer-events-none absolute -right-28 top-12 h-88 w-88" />
      <div className="relative wrap py-16 sm:py-22">
        <div className="max-w-2xl">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-2 font-display text-[clamp(1.7rem,3.6vw,2.6rem)] uppercase text-ink">
            {heading}
          </h2>
          <p className="mt-3 text-base text-muted">{intro}</p>
        </div>
        <div className="mt-9">{children}</div>
      </div>
      <EggAndDartFrieze />
    </section>
  );
}

/* ---------- 4. Linen Salver Invitations Band ---------- */

export function PackagesBand({
  eyebrow,
  heading,
  intro,
  children,
  footer,
}: {
  eyebrow: string;
  heading: ReactNode;
  intro: ReactNode;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden salver-linen-bg">
      <RoseWindowWatermark className="pointer-events-none absolute left-1/2 -top-28 -translate-x-1/2 h-96 w-96" />
      <div className="relative wrap py-16 sm:py-22">
        <div className="flex flex-col items-center text-center">
          <Chandelier className="h-20 w-24 mb-2 no-print" sway />
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-2 font-display text-[clamp(1.7rem,3.6vw,2.6rem)] uppercase text-ink">
            {heading}
          </h2>
          <p className="mt-3 max-w-xl text-base text-muted">{intro}</p>
        </div>

        {/* Silver salver line beneath fanned invitations */}
        <div className="mt-10 relative">
          {children}
          <svg
            viewBox="0 0 900 32"
            fill="none"
            aria-hidden="true"
            className="mx-auto mt-6 hidden lg:block h-7 w-full max-w-4xl no-print"
          >
            <path d="M40 12 Q450 30 860 12" stroke="var(--gilt)" strokeWidth="1.4" />
            <path d="M90 16 Q450 28 810 16" stroke="var(--gilt)" strokeOpacity="0.55" strokeWidth="0.9" />
            <circle cx="40" cy="12" r="3.5" stroke="var(--gilt)" strokeWidth="1.2" />
            <circle cx="860" cy="12" r="3.5" stroke="var(--gilt)" strokeWidth="1.2" />
          </svg>
        </div>

        <div className="mt-8 text-center">{footer}</div>
      </div>
      <ArchCorniceBorder flip />
    </section>
  );
}

/* ---------- 5. Damask Salon Hang Band ---------- */

export function GalleryBand({
  eyebrow,
  heading,
  intro,
  children,
  footer,
}: {
  eyebrow: string;
  heading: ReactNode;
  intro: ReactNode;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <section className="damask-band">
      <div className="wrap py-16 sm:py-22">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-gilt/40 pb-6">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="mt-2 font-display text-[clamp(1.7rem,3.6vw,2.6rem)] uppercase text-ink">
              {heading}
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-muted">{intro}</p>
        </div>
        <div className="mt-10">{children}</div>
        <div className="mt-10 text-center">{footer}</div>
      </div>
      <ArchCorniceBorder />
    </section>
  );
}

/* ---------- 6. Order of the Evening Program Card ---------- */

export function ProgramCardBand({
  eyebrow,
  heading,
  steps,
  footnote,
  action,
}: {
  eyebrow: string;
  heading: ReactNode;
  steps: readonly { numeral: string; title: string; body: string }[];
  footnote: ReactNode;
  action: ReactNode;
}) {
  return (
    <section className="salver-linen-bg py-16 sm:py-22">
      <div className="wrap">
        <div className="mx-auto max-w-4xl gilt-frame bg-surface px-6 py-10 sm:px-12 sm:py-14">
          <AcanthusCorners />
          <div className="text-center">
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="mt-2 font-display text-[clamp(1.6rem,3.4vw,2.4rem)] uppercase text-ink">
              {heading}
            </h2>
          </div>

          <EggAndDartFrieze className="my-7" />

          <ol className="grid gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <li key={step.numeral} className="text-center md:text-left">
                <span
                  aria-hidden="true"
                  className="block font-display text-5xl font-normal text-gilt leading-none"
                >
                  {step.numeral}
                </span>
                <h3 className="mt-3 font-display text-base font-semibold tracking-[0.1em] uppercase text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm sm:text-[0.95rem] text-muted">{step.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-9 border-t border-gilt/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm italic text-muted text-center sm:text-left">{footnote}</p>
            {action}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 7. Visit the Hall Band ---------- */

export function VisitBand({
  eyebrow,
  heading,
  left,
  right,
}: {
  eyebrow: string;
  heading: ReactNode;
  left: ReactNode;
  right: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden boiserie-bg">
      <HerringboneParquetBand heightClass="h-6" />
      <RoseWindowWatermark className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80" />
      <div className="relative wrap py-16 sm:py-20 grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start">
        <div className="space-y-5">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="mt-2 font-display text-[clamp(1.7rem,3.6vw,2.5rem)] uppercase text-ink">
              {heading}
            </h2>
          </div>
          {left}
        </div>
        <div>{right}</div>
      </div>
    </section>
  );
}
