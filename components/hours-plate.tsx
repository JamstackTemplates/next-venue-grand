import { formatClock12, type OpeningHours } from '../lib/hours';
import { AcanthusCorners } from './art/ornaments';
import { OpenBadge } from './open-badge';

/** Engraved brass-plate styled office hours table with browser-computed OpenBadge. */
export function HoursPlate({
  hours,
  note,
  heading = 'Events Office & Viewings',
}: {
  hours: readonly OpeningHours[];
  note: string;
  heading?: string;
}) {
  return (
    <div className="gilt-frame bg-surface p-6 sm:p-8">
      <AcanthusCorners />
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gilt/50 pb-4">
        <h3 className="font-display text-base sm:text-lg tracking-[0.14em] uppercase text-ink">
          {heading}
        </h3>
        <OpenBadge hours={hours} />
      </div>

      <table className="mt-4 w-full border-collapse text-sm sm:text-base">
        <caption className="sr-only">Events office and viewing appointment hours</caption>
        <tbody>
          {hours.map((entry) => (
            <tr key={entry.day} className="border-b border-line/70 last:border-b-0">
              <th
                scope="row"
                className="py-2 text-left font-display text-xs font-semibold tracking-[0.14em] uppercase text-ink"
              >
                {entry.day}
              </th>
              <td className="py-2 text-right text-muted">
                {entry.opens && entry.closes
                  ? `${formatClock12(entry.opens)} – ${formatClock12(entry.closes)}`
                  : 'Closed'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-4 border-t border-gilt/40 pt-3 text-sm italic text-muted">
        {note}
      </p>
    </div>
  );
}
