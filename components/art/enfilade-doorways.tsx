import { asset } from '../../lib/paths';

/**
 * Portrait crops (336×488, i.e. 2× the 168×244 arch opening) of the gallery watercolors,
 * pre-cut from public/gallery/ so the home page doesn't load the full-size plates.
 * Re-crop with ImageMagick if a gallery plate changes.
 */
export const DOORWAY_VIEWS: Record<string, string> = {
  'grand-ballroom': '/doorways/grand-ballroom.jpg',
  conservatory: '/doorways/conservatory.jpg',
  'library-salon': '/doorways/library-salon.jpg',
  'garden-terrace': '/doorways/garden-terrace.jpg',
  'mezzanine-gallery': '/doorways/mezzanine-gallery.jpg',
  'bridal-suite': '/doorways/bridal-suite.jpg',
};

/** Small gilt rosette used in the spandrels either side of the arch. */
function Rosette({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g stroke="var(--gilt)" strokeWidth="0.9">
      <circle cx={cx} cy={cy} r="6.5" fill="var(--surface)" />
      <circle cx={cx} cy={cy} r="2.4" fill="var(--gilt)" stroke="none" />
      {[0, 45, 90, 135].map((deg) => {
        const r = (deg * Math.PI) / 180;
        const dx = Math.cos(r) * 6.5;
        const dy = Math.sin(r) * 6.5;
        return <line key={deg} x1={cx - dx} y1={cy - dy} x2={cx + dx} y2={cy + dy} strokeOpacity="0.55" />;
      })}
    </g>
  );
}

/**
 * Arched gilt doorway framing a watercolor view into each room — the same
 * illustrations used on the Gallery page, cropped to the arch.
 */
export function RoomDoorway({
  spaceId,
  className = 'h-56 w-full',
}: {
  spaceId: string;
  className?: string;
}) {
  const clipId = `rh-door-${spaceId}`;
  const shadeId = `rh-door-shade-${spaceId}`;
  const view = DOORWAY_VIEWS[spaceId];
  const arch = 'M26 268 L26 108 A84 84 0 0 1 194 108 L194 268 Z';

  return (
    <svg viewBox="0 0 220 280" fill="none" aria-hidden="true" className={className}>
      <defs>
        <clipPath id={clipId}>
          <path d={arch} />
        </clipPath>
        {/* Soft inner shadow so the view reads as set back behind the moulding */}
        <radialGradient id={shadeId} cx="50%" cy="58%" r="62%">
          <stop offset="70%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.28" />
        </radialGradient>
      </defs>

      {/* Outer casing */}
      <rect x="8" y="8" width="204" height="264" fill="var(--surface)" stroke="var(--gilt)" strokeWidth="1.2" />
      <rect x="14" y="14" width="192" height="252" stroke="var(--gilt)" strokeOpacity="0.45" strokeWidth="0.8" />

      {/* Spandrel ornaments */}
      <Rosette cx={36} cy={38} />
      <Rosette cx={184} cy={38} />

      {/* Watercolor view through the doorway */}
      <g clipPath={`url(#${clipId})`}>
        <rect x="26" y="24" width="168" height="244" fill="var(--bg)" />
        {view && (
          <image
            href={asset(view)}
            x="26"
            y="24"
            width="168"
            height="244"
            preserveAspectRatio="xMidYMid slice"
            className="transition-transform duration-500 [transform-box:fill-box] origin-center group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        )}
        <path d={arch} fill={`url(#${shadeId})`} />
      </g>

      {/* Arch moulding border */}
      <path d="M26 268 L26 108 A84 84 0 0 1 194 108 L194 268" stroke="var(--gilt)" strokeWidth="2" />
      <path d="M20 268 L20 108 A90 90 0 0 1 200 108 L200 268" stroke="var(--gilt)" strokeOpacity="0.6" strokeWidth="0.9" />
      {/* Impost blocks where the arch springs */}
      <rect x="17" y="104" width="12" height="6" fill="var(--surface)" stroke="var(--gilt)" strokeWidth="1" />
      <rect x="191" y="104" width="12" height="6" fill="var(--surface)" stroke="var(--gilt)" strokeWidth="1" />
      {/* Keystone */}
      <polygon points="103,18 117,18 114,32 106,32" fill="var(--surface)" stroke="var(--gilt)" strokeWidth="1.1" />
    </svg>
  );
}
