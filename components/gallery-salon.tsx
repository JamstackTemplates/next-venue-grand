'use client';

import { useEffect, useState } from 'react';
import {
  GALLERY_OCCASION_LABELS,
  GALLERY_OCCASIONS,
  type GalleryOccasion,
  type GallerySize,
  type GalleryVignette,
} from '../content/gallery';
import { SPACE_BY_ID } from '../content/spaces';
import { GalleryVignetteArt } from './art/gallery-vignette';
import { SiteLink } from './site-link';

const SIZE_CLASSES: Record<GallerySize, { span: string; aspect: string }> = {
  large: { span: 'md:col-span-2', aspect: 'aspect-[16/10]' },
  tall: { span: 'md:col-span-1 md:row-span-2', aspect: 'aspect-[3/4] md:aspect-auto md:h-full' },
  wide: { span: 'md:col-span-2', aspect: 'aspect-[16/9]' },
  small: { span: 'md:col-span-1', aspect: 'aspect-[4/3]' },
};

export function GallerySalon({ items }: { items: readonly GalleryVignette[] }) {
  const [mounted, setMounted] = useState(false);
  const [occasion, setOccasion] = useState<'all' | GalleryOccasion>('all');

  useEffect(() => {
    setMounted(true);
  }, []);

  const visible =
    occasion === 'all' ? items : items.filter((item) => item.occasion === occasion);

  return (
    <div className="space-y-10">
      {/* Occasion filter tabs (hidden without JS) */}
      {mounted ? (
        <div
          className="flex flex-wrap items-center justify-center gap-2 border-b border-gilt/60 pb-4 no-print"
          role="group"
          aria-label="Filter gallery by occasion"
        >
          {(['all', ...GALLERY_OCCASIONS] as const).map((option) => {
            const active = occasion === option;
            const label = option === 'all' ? 'All' : GALLERY_OCCASION_LABELS[option];
            return (
              <button
                key={option}
                type="button"
                aria-pressed={active}
                onClick={() => setOccasion(option)}
                className={`px-4 py-2 font-display text-xs font-semibold tracking-[0.18em] uppercase border transition-colors ${
                  active
                    ? 'border-primary bg-primary text-on-primary'
                    : 'border-transparent bg-surface/80 text-ink hover:border-gilt/70 hover:bg-surface'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      ) : null}

      <p className="sr-only" role="status" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? 'vignette' : 'vignettes'}
        {occasion === 'all' ? '' : ` for ${GALLERY_OCCASION_LABELS[occasion].toLowerCase()}`}.
      </p>

      {/* Salon hang masonry-like wall of gilt frames */}
      <div className="grid gap-7 md:grid-cols-3 md:auto-rows-auto items-stretch">
        {visible.map((item) => {
          const layout = SIZE_CLASSES[item.size];
          const room = SPACE_BY_ID[item.space];
          return (
            <figure
              key={item.id}
              className={`frame-tilt flex flex-col ${layout.span}`}
            >
              <div className="flex-1 flex">
                <GalleryVignetteArt scene={item.scene} aspectClass={layout.aspect} />
              </div>

              {/* Brass plaque caption */}
              <figcaption className="mx-3 -mt-3 relative z-10 border border-gilt bg-surface px-4 py-3 shadow-sm">
                <p className="font-display text-sm font-semibold tracking-[0.08em] uppercase text-ink">
                  {item.title}
                </p>
                <p className="mt-1 text-xs text-muted">{item.caption}</p>
                <div className="mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-gilt/35 pt-2 text-[0.7rem] font-display tracking-[0.14em] uppercase">
                  <SiteLink href={`/spaces/#${item.space}`} className="text-link">
                    {room ? room.name : item.space}
                  </SiteLink>
                  <span className="text-muted">{item.season}</span>
                </div>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
}
