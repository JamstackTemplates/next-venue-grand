import type { ReactNode } from 'react';
import { EggAndDartFrieze, RoseWindowWatermark } from './art/ornaments';

/**
 * Arched Beaux-Arts page head for inner routes:
 * wide arched bay with Cinzel title, one-line Pinyon Script flourish,
 * route-specific small artwork, optional intro, and egg-and-dart frieze below.
 */
export function PageHead({
  eyebrow,
  title,
  flourish,
  art,
  children,
  id,
}: {
  eyebrow: string;
  title: ReactNode;
  flourish?: ReactNode;
  art?: ReactNode;
  children?: ReactNode;
  id?: string;
}) {
  return (
    <header className="relative overflow-hidden boiserie-bg border-b border-gilt/40">
      <RoseWindowWatermark className="absolute -left-24 -top-24 h-80 w-80" />
      <RoseWindowWatermark className="absolute -right-24 -top-24 h-80 w-80" />
      <div className="relative wrap pt-10 pb-8 sm:pt-14 sm:pb-10">
        <div className="relative mx-auto max-w-4xl border border-gilt/80 rounded-t-[10rem] sm:rounded-t-[14rem] bg-surface/92 px-6 pt-10 pb-8 sm:px-12 sm:pt-12 sm:pb-10 text-center shadow-[inset_0_0_0_5px_var(--surface),inset_0_0_0_6px_color-mix(in_srgb,var(--gilt)_45%,transparent),var(--frame-shadow)]">
          {art ? (
            <div className="mb-4 flex justify-center no-print" aria-hidden="true">
              {art}
            </div>
          ) : null}
          <p className="eyebrow">{eyebrow}</p>
          <h1
            id={id}
            className="mt-3 font-display text-[clamp(2rem,5vw,3.5rem)] tracking-[0.06em] uppercase text-ink"
          >
            {title}
          </h1>
          {flourish ? (
            <p className="mt-1 font-script text-[clamp(1.65rem,3.2vw,2.35rem)] leading-tight text-gilt-ink">
              {flourish}
            </p>
          ) : null}
          {children ? (
            <div className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-muted">
              {children}
            </div>
          ) : null}
        </div>
      </div>
      <EggAndDartFrieze />
    </header>
  );
}
