import type { LayoutKind } from '../../content/spaces';

type IconProps = { className?: string };

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.35,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

export function GuestsIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5" />
      <circle cx="16.5" cy="9.5" r="2.2" />
      <path d="M15.5 14.2c2.2.4 4 1.9 4.5 4.8" />
    </svg>
  );
}

export function AreaIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="4" y="4" width="16" height="16" />
      <path d="M8 8h8v8H8z" strokeDasharray="2 2" />
      <path d="M4 12h4M16 12h4M12 4v4M12 16v4" />
    </svg>
  );
}

export function CeilingIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <line x1="4" y1="4" x2="20" y2="4" />
      <line x1="4" y1="20" x2="20" y2="20" />
      <line x1="12" y1="6.5" x2="12" y2="17.5" />
      <path d="M9.5 9L12 6.5 14.5 9M9.5 15L12 17.5 14.5 15" />
    </svg>
  );
}

export function ReceptionIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M7 4h10l-4.2 6.5a1 1 0 0 1-1.6 0L7 4z" />
      <line x1="12" y1="11" x2="12" y2="19.5" />
      <line x1="8.5" y1="19.5" x2="15.5" y2="19.5" />
      <line x1="8.5" y1="6.5" x2="15.5" y2="6.5" strokeOpacity="0.6" />
    </svg>
  );
}

export function BanquetIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="3.5" r="1.2" />
      <circle cx="12" cy="20.5" r="1.2" />
      <circle cx="3.5" cy="12" r="1.2" />
      <circle cx="20.5" cy="12" r="1.2" />
      <circle cx="6" cy="6" r="1.1" />
      <circle cx="18" cy="6" r="1.1" />
      <circle cx="6" cy="18" r="1.1" />
      <circle cx="18" cy="18" r="1.1" />
    </svg>
  );
}

export function TheatreIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <line x1="5" y1="5" x2="19" y2="5" />
      <path d="M5 10.5h3M10.5 10.5h3M16 10.5h3" />
      <path d="M5 14.5h3M10.5 14.5h3M16 14.5h3" />
      <path d="M5 18.5h3M10.5 18.5h3M16 18.5h3" />
    </svg>
  );
}

export function CabaretIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <line x1="6" y1="4.5" x2="18" y2="4.5" />
      <circle cx="12" cy="13.5" r="4.5" />
      <circle cx="5.5" cy="13.5" r="1.2" />
      <circle cx="18.5" cy="13.5" r="1.2" />
      <circle cx="8" cy="19.2" r="1.2" />
      <circle cx="12" cy="20.5" r="1.2" />
      <circle cx="16" cy="19.2" r="1.2" />
    </svg>
  );
}

export function BoardroomIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="7" y="5" width="10" height="14" rx="2" />
      <line x1="4" y1="8" x2="4" y2="10" />
      <line x1="4" y1="14" x2="4" y2="16" />
      <line x1="20" y1="8" x2="20" y2="10" />
      <line x1="20" y1="14" x2="20" y2="16" />
    </svg>
  );
}

export function StepFreeIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 18l11-7h7" />
      <line x1="3" y1="18" x2="21" y2="18" />
      <circle cx="16.5" cy="7" r="1.8" />
    </svg>
  );
}

export function RoseIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="9" r="4.5" />
      <path d="M10.5 8.5c.8-1.5 2.5-1.2 2.8.2.3 1.5-1.5 2.4-2.8 1.5" />
      <line x1="12" y1="13.5" x2="12" y2="21" />
      <path d="M12 17c-2.5-.2-4-1.5-4.5-3.2M12 18.5c2.2-.2 3.5-1.2 4-2.7" />
    </svg>
  );
}

export function ParkingIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M9.5 16.5v-9h3.2a2.6 2.6 0 0 1 0 5.2H9.5" />
    </svg>
  );
}

export function ClockIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3.2 2" />
    </svg>
  );
}

export function LayoutIcon({ layout, className = 'h-4 w-4' }: { layout: LayoutKind; className?: string }) {
  switch (layout) {
    case 'reception':
      return <ReceptionIcon className={className} />;
    case 'banquet':
      return <BanquetIcon className={className} />;
    case 'theatre':
      return <TheatreIcon className={className} />;
    case 'cabaret':
      return <CabaretIcon className={className} />;
    case 'boardroom':
      return <BoardroomIcon className={className} />;
  }
}
