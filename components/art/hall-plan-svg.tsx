import type { Floor, PlanLayoutKind, Space } from '../../content/spaces';
import { HALL_PLAN_ROOMS, type PlanRoomGeometry } from '../../lib/hall-plan-data';

function renderFurniture(room: PlanRoomGeometry, layout: PlanLayoutKind, capacity: number | null) {
  if (capacity === null) return null;

  // Inner usable rectangle below the room title
  const left = room.x + 20;
  const top = room.y + 46;
  const width = room.w - 40;
  const height = room.h - 76;

  if (height < 20 || width < 30) return null;

  if (layout === 'banquet') {
    const cols = width > 200 ? 4 : width > 110 ? 2 : 1;
    const rows = height > 90 ? 2 : 1;
    const items = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cx = left + ((c + 0.5) * width) / cols;
        const cy = top + ((r + 0.5) * height) / rows;
        items.push(
          <g key={`b-${r}-${c}`}>
            <circle cx={cx} cy={cy} r="13" fill="var(--surface)" stroke="var(--gilt)" strokeWidth="1.1" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              return (
                <circle
                  key={deg}
                  cx={cx + Math.cos(rad) * 18}
                  cy={cy + Math.sin(rad) * 18}
                  r="1.9"
                  fill="var(--gilt)"
                />
              );
            })}
          </g>,
        );
      }
    }
    return <g className="plan-furniture">{items}</g>;
  }

  if (layout === 'reception') {
    const cols = width > 200 ? 5 : width > 110 ? 3 : 2;
    const rows = height > 80 ? 3 : 2;
    const items = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cx = left + ((c + 0.5) * width) / cols;
        const cy = top + ((r + 0.5) * height) / rows;
        items.push(
          <g key={`r-${r}-${c}`}>
            <circle cx={cx} cy={cy} r="5.5" fill="var(--surface)" stroke="var(--gilt)" strokeWidth="1" />
            <circle cx={cx} cy={cy} r="1.4" fill="var(--rosewood)" />
          </g>,
        );
      }
    }
    return <g className="plan-furniture">{items}</g>;
  }

  if (layout === 'theatre') {
    const rows = height > 90 ? 5 : 3;
    const cols = width > 200 ? 9 : width > 110 ? 5 : 3;
    const items = [];
    // Focal dais line at top
    items.push(
      <line
        key="stage"
        x1={left + width * 0.25}
        y1={top + 2}
        x2={left + width * 0.75}
        y2={top + 2}
        stroke="var(--rosewood)"
        strokeWidth="2"
      />,
    );
    for (let r = 0; r < rows; r++) {
      const y = top + 16 + (r * (height - 18)) / Math.max(1, rows - 1);
      for (let c = 0; c < cols; c++) {
        const x = left + ((c + 0.5) * width) / cols;
        items.push(
          <rect
            key={`t-${r}-${c}`}
            x={x - 5}
            y={y - 3}
            width="10"
            height="6"
            fill="var(--surface)"
            stroke="var(--gilt)"
            strokeWidth="0.9"
          />,
        );
      }
    }
    return <g className="plan-furniture">{items}</g>;
  }

  // Cabaret: half-moon tables facing the focal edge
  const cols = width > 200 ? 4 : 2;
  const rows = height > 90 ? 2 : 1;
  const items = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cx = left + ((c + 0.5) * width) / cols;
      const cy = top + ((r + 0.5) * height) / rows;
      items.push(
        <g key={`c-${r}-${c}`}>
          <circle cx={cx} cy={cy} r="11" fill="var(--surface)" stroke="var(--gilt)" strokeWidth="1.1" />
          {[30, 70, 110, 150, 180].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <circle
                key={deg}
                cx={cx + Math.cos(rad) * 16}
                cy={cy + Math.sin(rad) * 16}
                r="1.9"
                fill="var(--gilt)"
              />
            );
          })}
        </g>,
      );
    }
  }
  return <g className="plan-furniture">{items}</g>;
}

/**
 * Architectural floor plan of a single floor (ground or upper), drawn in gilt hairline
 * on celadon inside a moulded cartouche with north arrow, scale bar and title block.
 */
export function HallPlanFloorSvg({
  floor,
  layout,
  selectedRoomId,
  spacesById,
  onSelectRoom,
  interactive = true,
}: {
  floor: Floor;
  layout: PlanLayoutKind;
  selectedRoomId: string | null;
  spacesById: Record<string, Space>;
  onSelectRoom?: (id: string) => void;
  interactive?: boolean;
}) {
  const floorRooms = HALL_PLAN_ROOMS.filter((room) => room.floor === floor);
  const viewBox = floor === 'ground' ? '0 0 540 420' : '0 0 540 310';
  const height = floor === 'ground' ? 420 : 310;

  return (
    <svg
      viewBox={viewBox}
      fill="none"
      className="w-full h-auto block"
      role="group"
      aria-label={
        floor === 'ground'
          ? 'Ground floor architectural plan of Rosewood Hall'
          : 'Upper floor architectural plan of Rosewood Hall'
      }
    >
      {/* Celadon architectural sheet */}
      <rect x="4" y="4" width="532" height={height - 8} fill="var(--surface-2)" stroke="var(--gilt)" strokeWidth="1.5" />
      <rect x="10" y="10" width="520" height={height - 20} stroke="var(--gilt)" strokeOpacity="0.55" strokeWidth="0.9" />

      {/* Architectural grid ticks */}
      {[100, 200, 300, 400].map((x) => (
        <line key={`gx-${x}`} x1={x} y1="10" x2={x} y2="18" stroke="var(--gilt)" strokeOpacity="0.5" strokeWidth="0.8" />
      ))}

      {/* Foyer, Stair & Lift (Ground floor) */}
      {floor === 'ground' && (
        <g aria-hidden="true">
          <rect x="198" y="248" width="120" height="108" fill="var(--bg)" fillOpacity="0.65" stroke="var(--gilt)" strokeWidth="1.2" />
          <text x="258" y="274" textAnchor="middle" fill="var(--muted)" fontFamily="var(--font-display)" fontSize="9.5" letterSpacing="1.6">
            FOYER &amp; STAIR
          </text>
          {/* Grand stair treads */}
          {[286, 294, 302, 310, 318].map((y) => (
            <line key={y} x1="214" y1={y} x2="254" y2={y} stroke="var(--gilt)" strokeWidth="0.9" />
          ))}
          {/* Step-free Lift box */}
          <rect x="268" y="286" width="38" height="32" fill="var(--surface)" stroke="var(--gilt)" strokeWidth="1" />
          <line x1="268" y1="286" x2="306" y2="318" stroke="var(--gilt)" strokeOpacity="0.45" strokeWidth="0.8" />
          <line x1="306" y1="286" x2="268" y2="318" stroke="var(--gilt)" strokeOpacity="0.45" strokeWidth="0.8" />
          <text x="287" y="330" textAnchor="middle" fill="var(--muted)" fontFamily="var(--font-display)" fontSize="7.5" letterSpacing="1">
            LIFT
          </text>
          {/* Gaston Street Portico entrance arc */}
          <path d="M236 356 A22 22 0 0 1 280 356" stroke="var(--gilt)" strokeWidth="1.2" strokeDasharray="2 2" />
          <text x="258" y="370" textAnchor="middle" fill="var(--muted)" fontFamily="var(--font-display)" fontSize="7.5" letterSpacing="1.2">
            GASTON STREET PORTICO
          </text>
        </g>
      )}

      {/* Upper floor void & landing */}
      {floor === 'upper' && (
        <g aria-hidden="true">
          <rect x="42" y="216" width="276" height="44" fill="var(--bg)" fillOpacity="0.45" stroke="var(--gilt)" strokeWidth="1" strokeDasharray="4 3" />
          <text x="180" y="242" textAnchor="middle" fill="var(--muted)" fontFamily="var(--font-display)" fontSize="8.5" letterSpacing="1.6">
            BALCONY OVERLOOKING GRAND BALLROOM
          </text>
          <rect x="326" y="216" width="170" height="44" fill="var(--bg)" fillOpacity="0.6" stroke="var(--gilt)" strokeWidth="1" />
          <text x="411" y="242" textAnchor="middle" fill="var(--muted)" fontFamily="var(--font-display)" fontSize="8" letterSpacing="1.4">
            PRIVATE STAIR &amp; LIFT
          </text>
        </g>
      )}

      {/* Interactive Rooms */}
      {floorRooms.map((room) => {
        const space = spacesById[room.id];
        const cap = space ? space.capacity[layout] : null;
        const isSelected = selectedRoomId === room.id;
        const fill = isSelected
          ? 'color-mix(in srgb, var(--primary) 18%, var(--surface))'
          : room.id === 'garden-terrace'
            ? 'color-mix(in srgb, var(--surface) 55%, var(--surface-2))'
            : 'var(--surface)';

        return (
          <g
            key={room.id}
            role={interactive ? 'button' : undefined}
            tabIndex={interactive ? 0 : undefined}
            aria-pressed={interactive ? isSelected : undefined}
            aria-label={
              space
                ? `${space.name}, ${cap !== null ? `${cap} guests in ${layout} layout` : `${layout} layout not offered`}`
                : room.shortName
            }
            onClick={interactive && onSelectRoom ? () => onSelectRoom(room.id) : undefined}
            onKeyDown={
              interactive && onSelectRoom
                ? (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectRoom(room.id);
                    }
                  }
                : undefined
            }
            className={interactive ? 'cursor-pointer focus:outline-none' : undefined}
          >
            <rect
              x={room.x}
              y={room.y}
              width={room.w}
              height={room.h}
              fill={fill}
              stroke={isSelected ? 'var(--primary)' : 'var(--gilt)'}
              strokeWidth={isSelected ? '2.4' : '1.4'}
              strokeDasharray={room.id === 'garden-terrace' ? '6 3' : undefined}
            />

            {/* Room name */}
            <text
              x={room.labelX}
              y={room.labelY}
              textAnchor="middle"
              fill="var(--ink)"
              fontFamily="var(--font-display)"
              fontSize="10.5"
              fontWeight="600"
              letterSpacing="1.4"
            >
              {room.shortName.toUpperCase()}
            </text>

            {/* Furniture layer */}
            {renderFurniture(room, layout, cap)}

            {/* Place-card capacity badge inside room */}
            <g transform={`translate(${room.labelX - 42} ${room.y + room.h - 26})`}>
              <rect
                width="84"
                height="19"
                fill="var(--surface)"
                stroke={isSelected ? 'var(--primary)' : 'var(--gilt)'}
                strokeWidth="1"
              />
              <text
                x="42"
                y="13"
                textAnchor="middle"
                fill={cap !== null ? 'var(--ink)' : 'var(--muted)'}
                fontFamily="var(--font-display)"
                fontSize="9"
                fontWeight="600"
                letterSpacing="1"
              >
                {cap !== null ? `${cap} GUESTS` : '—'}
              </text>
            </g>
          </g>
        );
      })}

      {/* Title block, North arrow & Scale bar */}
      <g transform={`translate(24 ${height - 46})`} aria-hidden="true">
        {/* North arrow */}
        <g transform="translate(16 14)">
          <circle r="11" stroke="var(--gilt)" strokeWidth="1" />
          <polygon points="0,-9 3.5,2 0,-1 -3.5,2" fill="var(--gilt)" />
          <text x="0" y="9" textAnchor="middle" fill="var(--gilt-ink)" fontFamily="var(--font-display)" fontSize="6.5" fontWeight="700">
            N
          </text>
        </g>

        {/* Scale bar */}
        <g transform="translate(46 14)">
          <line x1="0" y1="0" x2="72" y2="0" stroke="var(--gilt)" strokeWidth="1.2" />
          <line x1="0" y1="-4" x2="0" y2="4" stroke="var(--gilt)" strokeWidth="1.2" />
          <line x1="36" y1="-3" x2="36" y2="3" stroke="var(--gilt)" strokeWidth="1" />
          <line x1="72" y1="-4" x2="72" y2="4" stroke="var(--gilt)" strokeWidth="1.2" />
          <text x="36" y="12" textAnchor="middle" fill="var(--muted)" fontFamily="var(--font-display)" fontSize="7" letterSpacing="1">
            0 — 30 FT
          </text>
        </g>

        {/* Rose monogram title block */}
        <g transform="translate(306 0)">
          <rect width="186" height="28" fill="var(--surface)" stroke="var(--gilt)" strokeWidth="1" />
          <ellipse cx="20" cy="14" rx="12" ry="9" fill="var(--primary)" stroke="var(--gilt)" strokeWidth="0.9" />
          <text x="20" y="17" textAnchor="middle" fill="var(--on-primary)" fontFamily="var(--font-display)" fontSize="7.5" fontWeight="600">
            RH
          </text>
          <text x="40" y="12" fill="var(--ink)" fontFamily="var(--font-display)" fontSize="8" fontWeight="600" letterSpacing="1.3">
            ROSEWOOD HALL · 1912
          </text>
          <text x="40" y="22" fill="var(--muted)" fontFamily="var(--font-display)" fontSize="6.8" letterSpacing="1.1">
            {floor === 'ground' ? 'GROUND FLOOR PLAN' : 'UPPER FLOOR PLAN'}
          </text>
        </g>
      </g>
    </svg>
  );
}
