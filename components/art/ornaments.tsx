import type { ReactNode } from 'react';

/** Oval "RH" monogram cartouche wreathed with heritage roses. */
export function RoseCartouche({
  className = 'h-12 w-14',
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  const fill = inverted ? 'var(--surface)' : 'var(--primary)';
  const textFill = inverted ? 'var(--primary)' : 'var(--on-primary)';
  const stroke = 'var(--gilt)';
  return (
    <svg
      viewBox="0 0 96 76"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* Outer wreath sprigs */}
      <path
        d="M14 48 C10 34 15 18 29 12 M82 48 C86 34 81 18 67 12"
        stroke={stroke}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M19 56 C27 66 37 70 48 70 C59 70 69 66 77 56"
        stroke={stroke}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      {/* Leaves */}
      <path
        d="M15 36 C10 33 10 27 16 26 M81 36 C86 33 86 27 80 26"
        stroke={stroke}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M22 57 C18 61 21 66 27 64 M74 57 C78 61 75 66 69 64"
        stroke={stroke}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      {/* Oval cartouche */}
      <ellipse cx="48" cy="38" rx="31" ry="24" fill={fill} stroke={stroke} strokeWidth="1.5" />
      <ellipse
        cx="48"
        cy="38"
        rx="26.5"
        ry="19.5"
        fill="none"
        stroke={stroke}
        strokeWidth="0.9"
        strokeDasharray="2.5 2.5"
      />
      {/* Monogram letters */}
      <text
        x="48"
        y="45"
        textAnchor="middle"
        fill={textFill}
        fontFamily="var(--font-display)"
        fontSize="22"
        fontWeight="600"
        letterSpacing="2.5"
      >
        RH
      </text>
      {/* Crest rose top & base rose */}
      <g transform="translate(48 11)">
        <circle r="4.8" fill="var(--rosewood)" stroke={stroke} strokeWidth="1" />
        <path d="M-2 -1 C0 -3 2 -1 1 1 C0 2.2 -2 1.5 -1.5 -0.2" stroke={stroke} strokeWidth="0.9" />
      </g>
      <g transform="translate(48 66)">
        <circle r="3.4" fill="var(--rosewood)" stroke={stroke} strokeWidth="0.9" />
      </g>
    </svg>
  );
}

/** Beaux-Arts egg-and-dart moulding frieze divider. */
export function EggAndDartFrieze({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full overflow-hidden no-print ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 26"
        preserveAspectRatio="xMidYMid slice"
        className="h-5 w-full block"
        fill="none"
      >
        <line x1="0" y1="2" x2="1200" y2="2" stroke="var(--gilt)" strokeWidth="1.25" />
        <line x1="0" y1="5.5" x2="1200" y2="5.5" stroke="var(--gilt)" strokeOpacity="0.55" strokeWidth="0.8" />
        <line x1="0" y1="20.5" x2="1200" y2="20.5" stroke="var(--gilt)" strokeOpacity="0.55" strokeWidth="0.8" />
        <line x1="0" y1="24" x2="1200" y2="24" stroke="var(--gilt)" strokeWidth="1.25" />
        {Array.from({ length: 40 }, (_, i) => {
          const x = i * 30 + 15;
          return (
            <g key={i} transform={`translate(${x} 13)`}>
              {/* Egg */}
              <ellipse rx="5.5" ry="5.2" stroke="var(--gilt)" strokeWidth="1.15" />
              <ellipse rx="2.7" ry="2.8" fill="var(--gilt)" fillOpacity="0.22" />
              {/* Dart */}
              <path
                d="M15 -5 L15 5 M12.5 1.5 L15 5 L17.5 1.5"
                stroke="var(--gilt)"
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/** Herringbone oak parquet band used under page heads and as the footer floor. */
export function HerringboneParquetBand({
  className = '',
  heightClass = 'h-7',
}: {
  className?: string;
  heightClass?: string;
}) {
  return (
    <div className={`w-full overflow-hidden border-y border-gilt/70 no-print ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 40"
        preserveAspectRatio="xMidYMid slice"
        className={`${heightClass} w-full block`}
      >
        <defs>
          <pattern id="rh-parquet" width="48" height="40" patternUnits="userSpaceOnUse">
            <rect width="48" height="40" fill="var(--parquet-a)" />
            <polygon points="0,20 24,0 32,0 8,20" fill="var(--parquet-b)" stroke="var(--parquet-line)" strokeWidth="0.9" />
            <polygon points="24,0 48,20 40,20 16,0" fill="var(--parquet-a)" stroke="var(--parquet-line)" strokeWidth="0.9" />
            <polygon points="0,40 24,20 32,20 8,40" fill="var(--parquet-b)" stroke="var(--parquet-line)" strokeWidth="0.9" />
            <polygon points="24,20 48,40 40,40 16,20" fill="var(--parquet-a)" stroke="var(--parquet-line)" strokeWidth="0.9" />
            <line x1="0" y1="20" x2="48" y2="20" stroke="var(--parquet-line)" strokeWidth="0.7" strokeOpacity="0.6" />
          </pattern>
        </defs>
        <rect width="1200" height="40" fill="url(#rh-parquet)" />
        <line x1="0" y1="2" x2="1200" y2="2" stroke="var(--gilt)" strokeWidth="1" strokeOpacity="0.7" />
        <line x1="0" y1="38" x2="1200" y2="38" stroke="var(--gilt)" strokeWidth="1" strokeOpacity="0.7" />
      </svg>
    </div>
  );
}

/** Quarter-round corner notches and subtle acanthus flourishes for double-rule frames. */
export function AcanthusCorners() {
  const corner = (pos: string, rot: number) => (
    <svg
      key={pos}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={`pointer-events-none absolute h-5 w-5 ${pos} no-print`}
      style={{ transform: `rotate(${rot}deg)` }}
    >
      <path d="M1 14 A13 13 0 0 0 14 1" stroke="var(--gilt)" strokeWidth="1.25" />
      <path d="M1 9 A8 8 0 0 0 9 1" stroke="var(--gilt)" strokeWidth="0.85" strokeOpacity="0.7" />
      <circle cx="5.5" cy="5.5" r="1.4" fill="var(--gilt)" />
    </svg>
  );

  return (
    <>
      {corner('top-1.5 left-1.5', 0)}
      {corner('top-1.5 right-1.5', 90)}
      {corner('bottom-1.5 right-1.5', 180)}
      {corner('bottom-1.5 left-1.5', 270)}
    </>
  );
}

/** Standalone tiered crystal chandelier (header at 1440px, Packages, Home band). */
export function Chandelier({
  className = 'h-24 w-28',
  sway = false,
}: {
  className?: string;
  sway?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 160 130"
      fill="none"
      aria-hidden="true"
      className={`${className} ${sway ? 'chandelier-sway' : ''}`}
    >
      <defs>
        <radialGradient id="rh-ch-glow" cx="50%" cy="55%" r="50%">
          <stop offset="0%" stopColor="#F5D78E" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#D2B163" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#D2B163" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Candlelight aura visible in dark mode */}
      <ellipse
        cx="80"
        cy="72"
        rx="66"
        ry="46"
        fill="url(#rh-ch-glow)"
        style={{ opacity: 'var(--glow-opacity)' }}
      />
      {/* Ceiling rose and chain */}
      <path d="M68 3 Q80 12 92 3" stroke="var(--gilt)" strokeWidth="1.25" />
      <line x1="80" y1="6" x2="80" y2="30" stroke="var(--gilt)" strokeWidth="1.35" strokeDasharray="3 2" />
      {/* Upper crystal crown */}
      <ellipse cx="80" cy="34" rx="18" ry="4.5" stroke="var(--gilt)" strokeWidth="1.25" />
      {/* Central baluster stem */}
      <path
        d="M80 30 L80 104 M73 48 C73 43 87 43 87 48 C87 55 73 55 73 48 Z"
        stroke="var(--gilt)"
        strokeWidth="1.25"
      />
      {/* Sweeping arms */}
      <path
        d="M80 62 C64 62 56 76 34 72 C24 70 20 62 24 56"
        stroke="var(--gilt)"
        strokeWidth="1.3"
      />
      <path
        d="M80 62 C96 62 104 76 126 72 C136 70 140 62 136 56"
        stroke="var(--gilt)"
        strokeWidth="1.3"
      />
      <path
        d="M80 72 C68 74 62 84 46 82 C40 81 38 75 42 70"
        stroke="var(--gilt)"
        strokeWidth="1.2"
      />
      <path
        d="M80 72 C92 74 98 84 114 82 C120 81 122 75 118 70"
        stroke="var(--gilt)"
        strokeWidth="1.2"
      />
      {/* Crystal festoon drapes */}
      <path
        d="M62 35 Q45 55 26 58 M98 35 Q115 55 134 58 M66 37 Q54 62 43 70 M94 37 Q106 62 117 70"
        stroke="var(--gilt)"
        strokeWidth="0.9"
        strokeDasharray="1.8 2.4"
      />
      <path
        d="M28 72 Q54 94 80 96 Q106 94 132 72"
        stroke="var(--gilt)"
        strokeWidth="0.9"
        strokeDasharray="1.8 2.4"
      />
      {/* Candle bobeches & flames */}
      {[
        [24, 54],
        [43, 68],
        [80, 56],
        [117, 68],
        [136, 54],
      ].map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          <line x1={cx - 5} y1={cy + 2} x2={cx + 5} y2={cy + 2} stroke="var(--gilt)" strokeWidth="1.2" />
          <rect x={cx - 2} y={cy - 8} width="4" height="10" fill="var(--surface)" stroke="var(--gilt)" strokeWidth="0.9" />
          <path
            d={`M${cx} ${cy - 14} C${cx + 2.4} ${cy - 11} ${cx + 2} ${cy - 8} ${cx} ${cy - 8} C${cx - 2} ${cy - 8} ${cx - 2.4} ${cy - 11} ${cx} ${cy - 14} Z`}
            fill="var(--gilt)"
          />
        </g>
      ))}
      {/* Crystal finial drop */}
      <polygon points="80,104 85,114 80,124 75,114" fill="var(--surface)" stroke="var(--gilt)" strokeWidth="1.15" />
      {/* Dotted crystal highlights */}
      <circle cx="52" cy="86" r="1.3" fill="var(--gilt)" />
      <circle cx="108" cy="86" r="1.3" fill="var(--gilt)" />
      <circle cx="66" cy="95" r="1.2" fill="var(--gilt)" />
      <circle cx="94" cy="95" r="1.2" fill="var(--gilt)" />
    </svg>
  );
}

/** Folded place card with gilt edge for capacity and room labels. */
export function PlaceCard({
  label,
  value,
  className = '',
}: {
  label?: ReactNode;
  value: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-baseline gap-1.5 border border-gilt bg-surface px-2.5 py-1 shadow-[inset_0_0_0_2px_var(--surface),inset_0_0_0_3px_color-mix(in_srgb,var(--gilt)_32%,transparent),0_2px_0_0_color-mix(in_srgb,var(--gilt)_35%,transparent)] ${className}`}
    >
      {label ? (
        <span className="font-script text-lg leading-none text-gilt-ink">{label}</span>
      ) : null}
      <span className="font-display text-xs font-semibold tracking-[0.12em] uppercase text-ink">
        {value}
      </span>
    </span>
  );
}

/** Full-bleed Beaux-Arts arched fanlight cornice divider between major sections. */
export function ArchCorniceBorder({
  className = '',
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <div
      className={`w-full overflow-hidden bg-surface/60 no-print ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 32"
        preserveAspectRatio="xMidYMid slice"
        className={`h-7 w-full block ${flip ? 'rotate-180' : ''}`}
        fill="none"
      >
        <line x1="0" y1="2" x2="1200" y2="2" stroke="var(--gilt)" strokeWidth="1.2" />
        <line x1="0" y1="5.5" x2="1200" y2="5.5" stroke="var(--gilt)" strokeOpacity="0.45" strokeWidth="0.75" />
        <line x1="0" y1="30" x2="1200" y2="30" stroke="var(--gilt)" strokeWidth="1.15" />
        {Array.from({ length: 30 }, (_, i) => {
          const x = i * 40;
          return (
            <g key={i} transform={`translate(${x} 0)`}>
              {/* Repeating semicircular fanlight arch */}
              <path
                d="M2 29 A18 18 0 0 1 38 29"
                stroke="var(--gilt)"
                strokeWidth="1.1"
                strokeOpacity="0.85"
              />
              <path
                d="M8 29 A12 12 0 0 1 32 29"
                stroke="var(--gilt)"
                strokeWidth="0.75"
                strokeOpacity="0.5"
              />
              {/* Fanlight rays */}
              <line x1="20" y1="29" x2="20" y2="12" stroke="var(--gilt)" strokeWidth="0.7" strokeOpacity="0.45" />
              <line x1="20" y1="29" x2="10" y2="16" stroke="var(--gilt)" strokeWidth="0.65" strokeOpacity="0.38" />
              <line x1="20" y1="29" x2="30" y2="16" stroke="var(--gilt)" strokeWidth="0.65" strokeOpacity="0.38" />
              {/* Rosette boss between arches */}
              <circle cx="0" cy="14" r="2.2" fill="var(--rosewood)" fillOpacity="0.75" stroke="var(--gilt)" strokeWidth="0.75" />
              <circle cx="20" cy="28" r="2.2" fill="var(--gilt)" fillOpacity="0.7" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/** Neoclassical laurel swag & heritage-rose festoon border with central medallion. */
export function LaurelSwagBorder({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full overflow-hidden no-print ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 36"
        preserveAspectRatio="xMidYMid slice"
        className="h-8 w-full block"
        fill="none"
      >
        <line x1="0" y1="3" x2="1200" y2="3" stroke="var(--gilt)" strokeWidth="1" strokeOpacity="0.8" />
        <line x1="0" y1="33" x2="1200" y2="33" stroke="var(--gilt)" strokeWidth="1" strokeOpacity="0.8" />
        {Array.from({ length: 12 }, (_, i) => {
          const x = i * 100;
          return (
            <g key={i} transform={`translate(${x} 0)`}>
              {/* Graceful drapery swag */}
              <path
                d="M0 10 Q50 32 100 10"
                stroke="var(--gilt)"
                strokeWidth="1.2"
                strokeOpacity="0.85"
              />
              <path
                d="M12 12 Q50 26 88 12"
                stroke="var(--gilt)"
                strokeWidth="0.8"
                strokeDasharray="2 3"
                strokeOpacity="0.65"
              />
              {/* Pendant tassel & rose boss at swag junction */}
              <circle cx="0" cy="10" r="3" fill="var(--rosewood)" stroke="var(--gilt)" strokeWidth="0.9" />
              <line x1="0" y1="13" x2="0" y2="25" stroke="var(--gilt)" strokeWidth="0.9" strokeOpacity="0.7" />
              <polygon points="0,25 2.5,29 0,31 -2.5,29" fill="var(--gilt)" fillOpacity="0.75" />
              {/* Small diamond at bottom of swag */}
              <polygon points="50,23 53,26 50,29 47,26" fill="var(--gilt)" fillOpacity="0.6" />
            </g>
          );
        })}
        {/* Central engraved medallion */}
        <g transform="translate(600 18)">
          <ellipse cx="0" cy="0" rx="22" ry="12" fill="var(--surface)" stroke="var(--gilt)" strokeWidth="1.25" />
          <ellipse cx="0" cy="0" rx="16" ry="8" stroke="var(--gilt)" strokeWidth="0.75" strokeDasharray="2 2" />
          <circle cx="0" cy="0" r="3.5" fill="var(--rosewood)" stroke="var(--gilt)" strokeWidth="0.85" />
        </g>
      </svg>
    </div>
  );
}

/** Oversized low-opacity Beaux-Arts rose-window architectural watermark for section backgrounds. */
export function RoseWindowWatermark({
  className = 'h-96 w-96',
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden="true"
      className={`pointer-events-none select-none no-print ${className}`}
      style={{ opacity: 'var(--watermark-opacity)' }}
    >
      <circle cx="200" cy="200" r="192" stroke="var(--gilt)" strokeWidth="1.2" />
      <circle cx="200" cy="200" r="182" stroke="var(--gilt)" strokeWidth="0.8" strokeDasharray="4 4" />
      <circle cx="200" cy="200" r="144" stroke="var(--gilt)" strokeWidth="1" />
      <circle cx="200" cy="200" r="88" stroke="var(--gilt)" strokeWidth="0.9" />
      <circle cx="200" cy="200" r="34" stroke="var(--gilt)" strokeWidth="1.1" />
      {Array.from({ length: 16 }, (_, i) => {
        const angle = (i * 360) / 16;
        return (
          <g key={i} transform={`rotate(${angle} 200 200)`}>
            <line x1="200" y1="56" x2="200" y2="166" stroke="var(--gilt)" strokeWidth="0.8" />
            <path
              d="M188 56 Q200 24 212 56"
              stroke="var(--gilt)"
              strokeWidth="0.95"
            />
            <circle cx="200" cy="46" r="3" stroke="var(--gilt)" strokeWidth="0.8" />
          </g>
        );
      })}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i * 360) / 8 + 22.5;
        return (
          <g key={`p-${i}`} transform={`rotate(${angle} 200 200)`}>
            <path
              d="M200 112 C214 132 214 152 200 166 C186 152 186 132 200 112 Z"
              stroke="var(--gilt)"
              strokeWidth="0.9"
            />
          </g>
        );
      })}
    </svg>
  );
}
