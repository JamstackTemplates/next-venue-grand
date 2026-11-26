# Rosewood Hall — Grand Event Venue (`next-venue-grand`)

A static Next.js 16 website for **Rosewood Hall**, a fictitious 1912 Beaux-Arts ballroom and garden
event venue on Forsyth Park in Savannah, Georgia. Designed around gilded plasterwork, engraved
invitations, bespoke architectural SVG illustrations and an interactive floor plan with live seating
layout switching.

Local development requires Node 24 or later and npm. Run `npm ci` and `npm run dev` to preview
locally, or `npm run check` to run all tests, typechecks and the static production export.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Ballroom hero, room enfilade, miniature Hall Plan, featured packages, gallery strip, enquiry steps, office hours & `EventVenue` JSON-LD |
| `/spaces/` | Full interactive two-floor Hall Plan, alternating room entries, accessible capacity table and practical notes |
| `/packages/` | Filterable wedding, corporate and celebration packages, standard inclusions and pricing notes |
| `/gallery/` | Filterable salon hang of 12 bespoke architectural vignettes across seasons and occasions |
| `/contact/` | Hosted Jamstacks enquiry form (with email fallback when unconfigured), direct email & phone, directions, office hours and map |
| `/404.html` | Empty after-hours ballroom illustration with place-card navigation links |

## Make it yours

Edit page-specific prose, headings and calls to action directly in the route file under `app/`. Edit
structured data, rates, capacities and office hours in the typed files under `content/`:

| File | Owns |
| --- | --- |
| `content/business.ts` | Venue name, contact email/phone, address, directions, parking, 7-day office hours and enquiry wording |
| `content/spaces.ts` | Six rooms (`grand-ballroom`, `conservatory`, `library-salon`, `garden-terrace`, `mezzanine-gallery`, `bridal-suite`), dimensions, capacities, features |
| `content/packages.ts` | Event packages, starting USD rates (`priceFrom`), guest ranges, hours, included rooms, `available` flag and seasonal `note` |
| `content/gallery.ts` | Twelve gallery vignettes with space IDs, occasion, season, caption, scene key and frame size |
| `app/page.tsx`, `app/<route>/page.tsx` | Page-specific headings, introductions and section copy |
| `site.config.json` | Public name, description, domain, `timeZone` (`America/New_York`) and Jamstacks form configuration |
| `app/tailwind.input.css` | Light ("afternoon") and dark ("after the last dance") tokens, textures, gilt frames and print styles |
| `lib/structured-data.ts` | `EventVenue` JSON-LD derived from `content/business.ts` and `content/spaces.ts` |
| `app/sitemap.ts` | Public routes included in `sitemap.xml` |

### Frequent owner edits

- **Update a package price or availability**: Edit `priceFrom`, `available`, or `note` on any entry
  in `content/packages.ts` (for example `rosewood-wedding` or `holiday-party`). Both `/packages/` and
  the featured invitations on `/` update on the next build. Unavailable packages require a `note`.
- **Update room capacities**: Edit `capacity` numbers in `content/spaces.ts`. The Hall Plan, room
  entries, capacity table and `EventVenue` schema (`maximumAttendeeCapacity`) derive from this file.
- **Add a gallery vignette**: Append an item to `content/gallery.ts` referencing an existing room ID
  and scene key from `components/art/gallery-vignette.tsx`.
- **Update office hours**: Edit `officeHours` in `content/business.ts` (same-day `HH:MM` intervals
  only; omit times for closed days). Run `npm test` to validate schedule boundaries and DST rules.

## Typography and licences

All fonts are self-hosted via npm `@fontsource` packages (no external font requests):

- **Cinzel** (`@fontsource-variable/cinzel`) — SIL Open Font License 1.1
- **Spectral** (`@fontsource/spectral`, 400, 400 italic, 600) — SIL Open Font License 1.1
- **Pinyon Script** (`@fontsource/pinyon-script`, 400) — SIL Open Font License 1.1

## Public configuration and Contact contract

`site.config.json` keeps the Jamstacks provisioner shape (`name`, `description`, `domain`,
`timeZone`, `jamstacks.siteId`, `jamstacks.cdnUrl`, optional `provisioningId`). Never place private
credentials or business collections in `site.config.json`.

When `jamstacks.siteId` (or `JAMSTACKS_SITE`) is configured, `/contact/` renders the hosted
`<jamstacks-support-form>` host and one `{cdn}/sites/{siteId}/embed.js` bootstrap. Without a site
ID, `/contact/` shows the direct email fallback with no embed request. Public email and phone remain
visible in both states. Navigation to and from `/contact/` uses full-document loads via `SiteLink`.

## Checks and preview

```sh
npm run check
PAGES_BASE_PATH=/preview PAGES_BASE_URL=https://owner.github.io/preview npm run build
npm start -- --base /preview --port 3000
```

Gallery metadata lives in the removable `jamstacks/` directory and is checked separately with:

```sh
node --test jamstacks/config.test.mjs
```
