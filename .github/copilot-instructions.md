# GLBecomm Copilot Instructions

## Big picture
- Next.js App Router project. Pages live under `app/` and shared UI lives in `src/components/`.
- API routes are in `app/api/**/route.js` and talk to MongoDB via `lib/mongodb.js` and Mongoose models in `src/models/`.
- Client state (mini-cart) is provided by `app/providers.jsx` → `src/state/CartContext.jsx` and persisted to `localStorage`.
- Email flows: RSVP submission triggers `lib/email.js` (Nodemailer) from `app/api/rsvp/route.js`; bulk email uses `app/api/email/bulk/route.js`.
- Gallery has two sources: database (`app/api/gallery/route.js`) and filesystem events in `public/eventFolder` (`app/api/gallery/events/route.js`).

## Key workflows
- Dev: `npm run dev` (Next dev server). Build: `npm run build`. Start: `npm run start`. Lint: `npm run lint`.

## Project-specific conventions
- Design tokens live in `app/globals.css` under `:root` (colors, radius, shadows). Update tokens there to affect global theming.
- App routes use JSON responses via `NextResponse.json(...)` and consistent `{ success, data, message|error }` shapes.
- Mongoose models use `mongoose.models.* || mongoose.model(...)` to avoid hot-reload recompilation.
- Event slugging happens in `src/models/Event.js` pre-save hook.
- Gallery event folders are read by slug from `public/eventFolder/<event-slug>/*` and exposed as `url: /eventFolder/<slug>/<file>`.

## Integrations & env vars
- MongoDB: `MONGODB_URI` or `MONGODB_URL` (normalized in `lib/mongodb.js`).
- Email: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `ADMIN_EMAIL` (see `lib/email.js`).
- Public URL for email links: `NEXT_PUBLIC_APP_URL`.

## Where to look for examples
- Homepage composition: `app/page.js` imports from `src/components/`.
- Admin dashboards: `app/admin/*` pages.
- RSVP flow: `src/components/RsvpModal.jsx` → `app/api/rsvp/route.js` → `lib/email.js`.
- Gallery data model: `src/models/Gallery.js` and API: `app/api/gallery/route.js`.