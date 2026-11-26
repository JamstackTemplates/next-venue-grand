import type { Metadata } from 'next';
import { EmptyBallroom404 } from '../components/art/empty-ballroom-404';
import { PlaceCard } from '../components/art/ornaments';
import { SiteLink } from '../components/site-link';

export const metadata: Metadata = {
  title: 'Room Not Found',
  description: "This room isn't on the plan at Rosewood Hall.",
};

export default function NotFound() {
  return (
    <section className="wrap py-14 sm:py-20 text-center">
      <div className="mx-auto max-w-3xl space-y-6">
        <EmptyBallroom404 />

        <div className="space-y-3">
          <p className="eyebrow">404 · After Hours</p>
          <h1 className="font-display text-[clamp(1.8rem,4.5vw,3rem)] uppercase text-ink">
            This room isn&apos;t on the plan.
          </h1>
          <p className="mx-auto max-w-lg text-base text-muted">
            The chandeliers are dimmed here. Return to the main hall, view the five rooms on our
            floor plan, or write to the events office.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap justify-center gap-4">
          <SiteLink href="/" className="no-underline hover:no-underline">
            <PlaceCard label="return" value="Home" className="px-4 py-2 hover:border-primary" />
          </SiteLink>
          <SiteLink href="/spaces/" className="no-underline hover:no-underline">
            <PlaceCard label="explore" value="Spaces" className="px-4 py-2 hover:border-primary" />
          </SiteLink>
          <SiteLink href="/contact/" className="no-underline hover:no-underline">
            <PlaceCard label="write" value="Visit & Enquire" className="px-4 py-2 hover:border-primary" />
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
