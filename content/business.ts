import type { OpeningHours } from '../lib/hours.ts';

export interface PostalAddress {
  /** Street number and name. */
  street: string;
  /** City or locality. */
  city: string;
  /** Two-letter state or region code. */
  region: string;
  /** Postal / ZIP code. */
  postalCode: string;
  /** Two-letter ISO country code. */
  country: string;
  /** Single-line formatted address used in display copy and map links. */
  formatted: string;
  /** Nearby public landmark for orientation. */
  landmark: string;
}

export interface Business {
  /** Public display name; also update site.config.json's name when renaming. */
  name: string;
  /** Short headline for the home page. */
  tagline: string;
  /** Plain-text introduction used by fallback metadata and structured data. */
  introduction: string;
  /** Year the hall was built. */
  established: number;
  /** Public contact email, always visible on Contact and in the footer. */
  email: string;
  /** Public telephone number; blank hides it. */
  phone: string;
  /** Physical venue address and landmark context. */
  address: PostalAddress;
  /** Walking, entrance and load-in directions. */
  directions: string;
  /** Valet and nearby public parking notes. */
  parking: string;
  /** Events office and viewing appointment hours (same-day intervals, seven weekdays). */
  officeHours: readonly OpeningHours[];
  /** Copy note clarifying viewings and evening event curfew (not used by OpenBadge). */
  hoursNote: string;
  /** Contact copy; the hosted form supports name, email and message only. */
  enquiries: {
    /** Contact page heading. */
    title: string;
    /** Plain-text introduction describing the enquiry flow without booking promises. */
    introduction: string;
    /** Explicit note stating that dates are held only once confirmed in writing. */
    confirmationNote: string;
    /** Suggestions for the message body, not additional form inputs. */
    usefulToInclude: readonly string[];
  };
}

export const business: Business = {
  name: 'Rosewood Hall',
  tagline: 'A ballroom on Forsyth Park, ready for your evening.',
  introduction:
    'Rosewood Hall is a 1912 ballroom and garden venue on Forsyth Park in Savannah, with five rooms for 12 to 300 guests, wedding and event packages, floor plans and a gallery.',
  established: 1912,
  email: 'events@rosewoodhall.example',
  phone: '(912) 555-0148',
  address: {
    street: '214 Gaston Street West',
    city: 'Savannah',
    region: 'GA',
    postalCode: '31401',
    country: 'US',
    formatted: '214 Gaston Street West, Savannah, GA 31401',
    landmark: 'On the north side of Forsyth Park',
  },
  directions:
    'Facing the north side of Forsyth Park between Whitaker and Barnard Streets. Step-free guest entrance under the Gaston Street portico; florist and band load-in via the Gaston Lane door.',
  parking:
    'Complimentary valet drop-off at the Gaston Street portico for evening events, metered street parking along Forsyth Park, and public garages three blocks north on Liberty Street.',
  officeHours: [
    { day: 'Monday' },
    { day: 'Tuesday', opens: '10:00', closes: '18:00' },
    { day: 'Wednesday', opens: '10:00', closes: '18:00' },
    { day: 'Thursday', opens: '10:00', closes: '18:00' },
    { day: 'Friday', opens: '10:00', closes: '18:00' },
    { day: 'Saturday', opens: '10:00', closes: '16:00' },
    { day: 'Sunday' },
  ],
  hoursNote:
    'Private viewings are by appointment within office hours. Evening events run until 11 pm.',
  enquiries: {
    title: 'Visit & Enquire',
    introduction:
      'Write to the events office about a date, package, or private viewing. The events team will reply with availability and a written proposal.',
    confirmationNote:
      'Every request is an enquiry — dates are held only once confirmed in writing by the events team.',
    usefulToInclude: [
      'Preferred date or dates (and any flexibility)',
      'Approximate guest count',
      'Type of event (wedding, gala, conference or celebration)',
      'The rooms or package you are interested in',
      'Whether you would like a viewing and when',
      'A phone number if you prefer a call',
    ],
  },
};
