# Sunidhi Sumbria — Portfolio

Next.js (App Router) + Tailwind CSS. The contact form saves messages to Neon Postgres (Drizzle) and emails them via Resend.

## Editing content

All text, projects, stack and links live in [`src/data/portfolio.ts`](src/data/portfolio.ts).
Search that file for `TODO` to find placeholders.

- **Profile photo:** put a real `.jpg` (~800px wide) in `public/` and set `profile.photo` to its path, e.g. `"/sunidhi-sumbria.jpg"`. When replacing the photo, use a **new file name** — browsers and the image optimizer cache by URL, so reusing the old name keeps showing the old photo.
- **Resume:** put `resume.pdf` in `public/` and set `profile.resumeUrl` to `"/resume.pdf"` (the "Download CV" button appears automatically).
- **Project screenshots:** put images in `public/projects/` and set `image: "/projects/dayflex.png"` on a project.

## Contact form setup

1. Copy `.env.example` to `.env` and fill in `DATABASE_URL`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`.
2. Create the table once: `npm run db:push`.
3. Messages are stored in the `contact_messages` table; each one also arrives by email (reply goes straight to the sender).

## Running locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Deploying

Live at **https://sunidhisumbria.vercel.app** (Vercel, Hobby plan). Every push to `main` deploys automatically.
Environment variables (`DATABASE_URL`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`) are set in Vercel → Project → Settings → Environment Variables.

The site's public address lives in `site.url` in `src/data/portfolio.ts` — change it there if the domain changes.

The old Render deployment (`render.yaml`) only redirects to the Vercel address. It was moved because Render's free plan
answered Google's crawler with a "Disallow: /" robots.txt, which blocked indexing.
