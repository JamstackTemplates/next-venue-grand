'use client';

import { useEffect, useState } from 'react';
import { officeHoursStatus, type HoursStatus, type OpeningHours } from '../lib/hours';
import { site } from '../lib/site';

/**
 * Computes live events-office availability in the browser using the business IANA zone
 * and refreshes every minute. Static and no-JS output renders no open/closed claim.
 */
export function OpenBadge({ hours }: { hours: readonly OpeningHours[] }) {
  const [status, setStatus] = useState<HoursStatus>({ state: 'unknown', label: '' });

  useEffect(() => {
    const update = () => setStatus(officeHoursStatus(hours, site.timeZone));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [hours]);

  if (!status.label) return null;

  return (
    <span
      className="inline-flex items-center gap-2 border border-gilt/60 bg-surface px-3 py-1 text-xs font-display tracking-[0.12em] uppercase text-ink"
      role="status"
      aria-live="polite"
    >
      <span
        aria-hidden="true"
        className={`h-2 w-2 rounded-full ${
          status.state === 'open' ? 'bg-primary' : 'bg-rosewood'
        }`}
      />
      <span>{status.label}</span>
    </span>
  );
}
