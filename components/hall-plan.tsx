'use client';

import { useEffect, useState } from 'react';
import {
  LAYOUT_KINDS,
  LAYOUT_LABELS,
  PLAN_LAYOUT_KINDS,
  type Floor,
  type PlanLayoutKind,
  type Space,
} from '../content/spaces';
import { HallPlanFloorSvg } from './art/hall-plan-svg';
import { LayoutIcon } from './art/icons';
import { AcanthusCorners, PlaceCard } from './art/ornaments';
import { SiteLink } from './site-link';

export function HallPlan({
  spaces,
  variant = 'full',
  exploreLabel = 'Explore the full floor plan',
}: {
  spaces: readonly Space[];
  variant?: 'miniature' | 'full';
  exploreLabel?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [floor, setFloor] = useState<Floor>('ground');
  const [layout, setLayout] = useState<PlanLayoutKind>('banquet');
  const [selectedId, setSelectedId] = useState<string>('grand-ballroom');

  useEffect(() => {
    setMounted(true);
  }, []);

  const spacesById = Object.fromEntries(spaces.map((s) => [s.id, s]));
  const selectedSpace = spacesById[selectedId] ?? spaces[0];
  const selectedCap = selectedSpace?.capacity[layout] ?? null;

  function handleSelectRoom(id: string) {
    setSelectedId(id);
    const room = spacesById[id];
    if (room && room.floor !== floor) {
      setFloor(room.floor);
    }
  }

  function handleFloorChange(nextFloor: Floor) {
    setFloor(nextFloor);
    const current = spacesById[selectedId];
    if (!current || current.floor !== nextFloor) {
      const firstOnFloor = spaces.find((s) => s.floor === nextFloor);
      if (firstOnFloor) setSelectedId(firstOnFloor.id);
    }
  }

  const layoutSwitcher = (
    <div className="flex flex-wrap gap-2 no-print" role="group" aria-label="Seating layout">
      {PLAN_LAYOUT_KINDS.map((kind) => {
        const active = layout === kind;
        return (
          <button
            key={kind}
            type="button"
            aria-pressed={active}
            onClick={() => setLayout(kind)}
            className={`inline-flex items-center gap-1.5 border px-3 py-2 font-display text-[0.72rem] font-semibold tracking-[0.14em] uppercase transition-colors ${
              active
                ? 'border-primary bg-primary text-on-primary'
                : 'border-gilt/70 bg-surface text-ink hover:bg-surface-2'
            }`}
          >
            <LayoutIcon layout={kind} className="h-3.5 w-3.5" />
            <span>{LAYOUT_LABELS[kind]}</span>
          </button>
        );
      })}
    </div>
  );

  const floorTabs = mounted ? (
    <div className="flex flex-wrap gap-2 no-print" role="group" aria-label="Floor level">
      {(['ground', 'upper'] as const).map((f) => {
        const active = floor === f;
        return (
          <button
            key={f}
            type="button"
            aria-pressed={active}
            onClick={() => handleFloorChange(f)}
            className={`border px-3.5 py-2 font-display text-[0.72rem] font-semibold tracking-[0.16em] uppercase transition-colors ${
              active
                ? 'border-gilt bg-ink text-bg'
                : 'border-gilt/70 bg-surface text-ink hover:bg-surface-2'
            }`}
          >
            {f === 'ground' ? 'Ground Floor' : 'Upper Floor'}
          </button>
        );
      })}
    </div>
  ) : null;

  if (variant === 'miniature') {
    return (
      <div className="grid gap-8 lg:grid-cols-[1.65fr_1fr] lg:items-center">
        {/* Miniature Hall Plan in its cartouche */}
        <div className="gilt-frame-celadon bg-surface-2 p-3 sm:p-5">
          <AcanthusCorners />
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <span className="eyebrow">
              {mounted
                ? floor === 'ground'
                  ? 'Ground Floor · 1912 Plan'
                  : 'Upper Floor · 1912 Plan'
                : 'Ground & Upper Floors · Banquet'}
            </span>
            {floorTabs}
          </div>

          {mounted ? (
            <HallPlanFloorSvg
              floor={floor}
              layout={layout}
              selectedRoomId={selectedId}
              spacesById={spacesById}
              onSelectRoom={handleSelectRoom}
            />
          ) : (
            <div className="space-y-4">
              <HallPlanFloorSvg
                floor="ground"
                layout="banquet"
                selectedRoomId="grand-ballroom"
                spacesById={spacesById}
                interactive={false}
              />
              <HallPlanFloorSvg
                floor="upper"
                layout="banquet"
                selectedRoomId={null}
                spacesById={spacesById}
                interactive={false}
              />
            </div>
          )}
        </div>

        {/* Right narrow column: switcher, oversized capacity numeral & link */}
        <div className="space-y-6">
          <div>
            <p className="eyebrow">Seating Layout</p>
            <div className="mt-3">{layoutSwitcher}</div>
          </div>

          <div className="border-y border-gilt/60 py-6">
            <p className="font-display text-xs tracking-[0.18em] uppercase text-muted">
              {selectedSpace.name} · {LAYOUT_LABELS[layout]}
            </p>
            <div className="mt-2 flex items-baseline gap-3" aria-live="polite">
              <span className="font-display text-6xl sm:text-7xl font-normal tracking-tight text-gilt-ink">
                {selectedCap !== null ? selectedCap : '—'}
              </span>
              <span className="font-script text-3xl text-ink">
                {selectedCap !== null ? 'guests' : 'not offered'}
              </span>
            </div>
            <p className="mt-3 text-sm text-muted">{selectedSpace.summary}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <SiteLink href="/spaces/#plan" className="button">
              {exploreLabel}
            </SiteLink>
          </div>
        </div>
      </div>
    );
  }

  // Full Hall Plan on /spaces/#plan
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gilt/50 pb-4">
        {floorTabs}
        {layoutSwitcher}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr] xl:items-start">
        <div className="gilt-frame bg-surface p-3 sm:p-5">
          <AcanthusCorners />
          {mounted ? (
            <HallPlanFloorSvg
              floor={floor}
              layout={layout}
              selectedRoomId={selectedId}
              spacesById={spacesById}
              onSelectRoom={handleSelectRoom}
            />
          ) : (
            <div className="space-y-5">
              <HallPlanFloorSvg
                floor="ground"
                layout="banquet"
                selectedRoomId="grand-ballroom"
                spacesById={spacesById}
                interactive={false}
              />
              <HallPlanFloorSvg
                floor="upper"
                layout="banquet"
                selectedRoomId={null}
                spacesById={spacesById}
                interactive={false}
              />
            </div>
          )}
        </div>

        {/* Room list down the side at 1440px (below at 390px) */}
        <div className="space-y-4">
          <div className="gilt-frame bg-surface p-5">
            <AcanthusCorners />
            <p className="eyebrow">Selected Room</p>
            <h3 className="mt-1 font-display text-xl tracking-[0.08em] uppercase text-ink">
              {selectedSpace.name}
            </h3>
            <p className="mt-2 text-sm text-muted">{selectedSpace.summary}</p>

            <div className="mt-4 flex flex-wrap gap-2" aria-live="polite">
              {LAYOUT_KINDS.map((kind) => {
                const cap = selectedSpace.capacity[kind];
                return (
                  <PlaceCard
                    key={kind}
                    label={LAYOUT_LABELS[kind]}
                    value={cap !== null ? `${cap}` : '—'}
                  />
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-gilt/40 flex items-center justify-between text-xs font-display tracking-[0.14em] uppercase">
              <span className="text-muted">
                {selectedSpace.areaSqFt.toLocaleString('en-US')} sq ft
                {selectedSpace.ceilingFt ? ` · ${selectedSpace.ceilingFt} ft ceiling` : ' · Open air'}
              </span>
              <a href={`#${selectedSpace.id}`} className="text-link">
                Room details
              </a>
            </div>
          </div>

          <ul className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1" aria-label="Rooms on the plan">
            {spaces.map((room) => {
              const active = room.id === selectedId;
              const cap = room.capacity[layout];
              return (
                <li key={room.id}>
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => handleSelectRoom(room.id)}
                    className={`w-full flex items-center justify-between gap-3 border px-4 py-3 text-left transition-colors ${
                      active
                        ? 'border-primary bg-primary text-on-primary'
                        : 'border-gilt/60 bg-surface text-ink hover:bg-bg'
                    }`}
                  >
                    <span>
                      <span className="block font-display text-xs font-semibold tracking-[0.14em] uppercase">
                        {room.name}
                      </span>
                      <span
                        className={`block text-xs ${
                          active ? 'text-on-primary/80' : 'text-muted'
                        }`}
                      >
                        {room.floor === 'ground' ? 'Ground floor' : 'Upper floor'}
                        {room.outdoor ? ' · Outdoor' : ''}
                      </span>
                    </span>
                    <span className="font-display text-xs font-semibold tracking-[0.1em] uppercase shrink-0">
                      {cap !== null ? `${cap} guests` : '—'}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
