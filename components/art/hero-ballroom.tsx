import { asset } from '../../lib/paths';

const HERO_ALT =
  'Architectural illustration of the 1912 Grand Ballroom at Rosewood Hall on Forsyth Park with vaulted gilded ceiling, three tiered crystal chandeliers, arched windows, emerald-draped stage alcove, herringbone oak parquet and candlelit banquet tables';

/**
 * Hero artwork: The 1912 Grand Ballroom at Rosewood Hall presented inside a
 * double-moulded Beaux-Arts arched gilt frame with keystone rose cartouche.
 * Automatically switches between sunlit afternoon (light mode) and candlelit
 * evening gala (dark mode) for both system preference and manual theme toggle.
 */
export function HeroBallroom({ className = 'w-full' }: { className?: string }) {
  const lightSrc = asset('/hero-ballroom-light.jpg');
  const darkSrc = asset('/hero-ballroom-dark.jpg');

  return (
    <figure className={`relative ${className}`}>
      {/* Outer double-moulded Beaux-Arts semicircular arch frame */}
      <div className="hero-arch-frame relative overflow-hidden rounded-t-[9999px] border border-gilt bg-surface/90 p-2 sm:p-2.5">
        <div className="relative overflow-hidden rounded-t-[9999px] border border-gilt/75 bg-bg aspect-[3/4] w-full">
          {/* Afternoon (light mode) ballroom artwork */}
          <img
            src={lightSrc}
            alt={HERO_ALT}
            width={1493}
            height={2000}
            fetchPriority="high"
            decoding="async"
            className="hero-img-light h-full w-full object-cover object-center"
          />
          {/* Candlelit evening (dark mode) ballroom artwork */}
          <img
            src={darkSrc}
            alt={HERO_ALT}
            width={1493}
            height={2000}
            fetchPriority="high"
            decoding="async"
            className="hero-img-dark h-full w-full object-cover object-center"
          />
          {/* Subtle inner gilt arch hairline & bottom vignette */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-t-[9999px] ring-1 ring-inset ring-gilt/35"
          />
        </div>
      </div>

      {/* Engraved keystone rose cartouche at the apex of the arch */}
      <svg
        viewBox="0 0 56 36"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 -top-2.5 -translate-x-1/2 h-8 w-12 drop-shadow-sm no-print"
      >
        <polygon
          points="8,3 48,3 41,31 15,31"
          fill="var(--surface)"
          stroke="var(--gilt)"
          strokeWidth="1.5"
        />
        <polygon
          points="13,7 43,7 38,27 18,27"
          fill="none"
          stroke="var(--gilt)"
          strokeWidth="0.8"
          strokeOpacity="0.65"
        />
        <circle
          cx="28"
          cy="17"
          r="5"
          fill="var(--rosewood)"
          stroke="var(--gilt)"
          strokeWidth="1.1"
        />
        <circle cx="28" cy="17" r="1.6" fill="var(--gilt)" />
      </svg>
    </figure>
  );
}
