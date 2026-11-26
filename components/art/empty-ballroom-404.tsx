/**
 * 404 illustration: the empty ballroom after hours, with one lone chair,
 * a single lit chandelier and a fallen place card reading "Table 404".
 */
export function EmptyBallroom404({ className = 'w-full max-w-2xl mx-auto' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 360"
      fill="none"
      role="img"
      aria-label="The empty Grand Ballroom after hours with a single lit chandelier, one gilt chair, and a fallen place card reading Table 404"
      className={className}
    >
      <defs>
        <radialGradient id="rh-404-glow" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor="#F5D78E" stopOpacity="0.48" />
          <stop offset="65%" stopColor="#D2B163" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#D2B163" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Arched bay backdrop */}
      <path
        d="M24 352 L24 148 A296 132 0 0 1 616 148 L616 352 Z"
        fill="var(--surface-2)"
        stroke="var(--gilt)"
        strokeWidth="2"
      />
      {/* End wall */}
      <rect x="130" y="110" width="380" height="122" fill="var(--surface)" stroke="var(--gilt)" strokeWidth="1.1" />
      <path d="M236 232 L236 164 A84 42 0 0 1 404 164 L404 232" fill="var(--primary)" fillOpacity="0.14" stroke="var(--gilt)" strokeWidth="1.2" />

      {/* Floor */}
      <polygon points="130,232 510,232 616,352 24,352" fill="var(--parquet-a)" stroke="var(--gilt)" strokeWidth="1.2" />
      {[-140, -70, 0, 70, 140].map((o) => (
        <line key={o} x1={320 + o * 0.6} y1="232" x2={320 + o * 1.4} y2="352" stroke="var(--parquet-line)" strokeWidth="0.9" strokeOpacity="0.6" />
      ))}

      {/* Single lit chandelier */}
      <ellipse cx="320" cy="112" rx="115" ry="72" fill="url(#rh-404-glow)" />
      <g transform="translate(320 66)">
        <line x1="0" y1="-48" x2="0" y2="62" stroke="var(--gilt)" strokeWidth="1.5" />
        <ellipse cx="0" cy="14" rx="22" ry="6" stroke="var(--gilt)" strokeWidth="1.3" />
        <path d="M-52 34 Q0 58 52 34" stroke="var(--gilt)" strokeWidth="1.4" />
        <path d="M-22 14 L-52 34 M22 14 L52 34" stroke="var(--gilt)" strokeWidth="0.9" strokeDasharray="2 3" />
        {[-52, -26, 0, 26, 52].map((cx) => (
          <circle key={cx} cx={cx} cy={cx === 0 ? 30 : 28} r="2.6" fill="var(--gilt)" />
        ))}
        <polygon points="0,62 5,74 0,84 -5,74" fill="var(--surface)" stroke="var(--gilt)" strokeWidth="1.2" />
      </g>

      {/* One lone gilt ballroom chair */}
      <g transform="translate(242 222)">
        {/* Chair back oval */}
        <ellipse cx="0" cy="0" rx="18" ry="22" fill="var(--surface)" stroke="var(--gilt)" strokeWidth="1.6" />
        <ellipse cx="0" cy="0" rx="12" ry="16" stroke="var(--gilt)" strokeWidth="0.9" />
        {/* Seat */}
        <polygon points="-20,28 20,28 26,38 -26,38" fill="var(--rosewood)" stroke="var(--gilt)" strokeWidth="1.3" />
        {/* Legs */}
        <line x1="-22" y1="38" x2="-24" y2="74" stroke="var(--gilt)" strokeWidth="1.6" />
        <line x1="22" y1="38" x2="24" y2="74" stroke="var(--gilt)" strokeWidth="1.6" />
        <line x1="-14" y1="38" x2="-15" y2="66" stroke="var(--gilt)" strokeWidth="1.2" />
        <line x1="14" y1="38" x2="15" y2="66" stroke="var(--gilt)" strokeWidth="1.2" />
      </g>

      {/* Fallen place card reading "Table 404" */}
      <g transform="translate(362 294) rotate(-9)">
        <polygon points="0,0 110,0 118,36 8,36" fill="var(--surface)" stroke="var(--gilt)" strokeWidth="1.5" />
        <line x1="8" y1="6" x2="104" y2="6" stroke="var(--gilt)" strokeWidth="0.8" strokeOpacity="0.7" />
        <text
          x="59"
          y="25"
          textAnchor="middle"
          fill="var(--ink)"
          fontFamily="var(--font-display)"
          fontSize="13"
          letterSpacing="1.6"
        >
          TABLE 404
        </text>
      </g>
    </svg>
  );
}
