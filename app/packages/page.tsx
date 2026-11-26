import type { Metadata } from 'next';
import {
  BanquetIcon,
  ClockIcon,
  GuestsIcon,
  ReceptionIcon,
  RoseIcon,
  StepFreeIcon,
} from '../../components/art/icons';
import { ArchCorniceBorder, Chandelier, LaurelSwagBorder } from '../../components/art/ornaments';
import { PackageCatalog } from '../../components/package-catalog';
import { PageHead } from '../../components/page-head';
import { SiteLink } from '../../components/site-link';
import { packages } from '../../content/packages';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Packages',
  description:
    'Starting rates and inclusions for Rosewood Hall wedding, gala, conference and celebration packages in Savannah.',
  alternates: { canonical: absoluteUrl('/packages/') },
};

const EVERY_PACKAGE_INCLUDES = [
  { label: 'House tables & gilt chairs', icon: BanquetIcon },
  { label: 'Pressed floor-length linen', icon: ReceptionIcon },
  { label: 'Dedicated events coordinator', icon: GuestsIcon },
  { label: 'Rose Suite or green room', icon: RoseIcon },
  { label: 'Post-event cleaning', icon: StepFreeIcon },
  { label: 'On-site evening security', icon: ClockIcon },
];

export default function PackagesPage() {
  return (
    <>
      <PageHead
        eyebrow="Event Packages"
        title="Packages, priced from"
        flourish="Prepared by our events & culinary team"
        art={<Chandelier className="h-16 w-20" sway />}
      >
        <p>
          Compare our wedding, corporate and celebration packages below. Each event receives a
          tailored written proposal from our events office.
        </p>
      </PageHead>

      {/* Filterable invitation catalog */}
      <section className="boiserie-bg py-14 sm:py-18">
        <div className="wrap">
          <PackageCatalog packages={packages} />
        </div>
      </section>

      <ArchCorniceBorder />

      {/* Every package includes — single ballroom-green damask band with icons */}
      <section className="footer-damask text-on-primary border-y border-gilt/70 py-14">
        <div className="wrap">
          <div className="text-center">
            <p className="font-display text-xs font-semibold tracking-[0.22em] uppercase text-gilt">
              Standard Hospitality
            </p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl uppercase">
              Every package includes
            </h2>
          </div>

          <ul className="mt-10 grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {EVERY_PACKAGE_INCLUDES.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="flex flex-col items-center text-center gap-3 border border-gilt/40 bg-on-primary/5 px-4 py-5"
              >
                <Icon className="h-6 w-6 text-gilt" />
                <span className="font-display text-xs tracking-[0.12em] uppercase leading-snug">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pricing notes in a narrow column, like small print at the foot of an invitation */}
      <LaurelSwagBorder className="bg-surface/70" />
      <section className="salver-linen-bg py-16">
        <div className="wrap">
          <div className="mx-auto max-w-xl text-center space-y-4">
          <p className="eyebrow">Pricing Notes</p>
          <p className="text-sm sm:text-base text-muted leading-relaxed">
            All prices are stated in US dollars as starting rates — either per guest or as a flat
            package rate — before Georgia sales tax and a 22% service charge. Every event receives
            an itemised written proposal tailored to your date, guest count and menu selections.
            Dates are held only once confirmed in writing by the events team.
          </p>
          <div className="pt-4">
            <SiteLink href="/contact/" className="button">
              Enquire about a date
            </SiteLink>
          </div>
          </div>
        </div>
      </section>
    </>
  );
}
