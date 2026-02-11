# Royal Cut (Demo Prototype)

Demo-only, fully static-exportable **Next.js App Router + TypeScript + Tailwind** prototype for a barbershop.

## Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- lucide-react icons
- Inter font
- localStorage-backed mock persistence

## Features
- Public pages: `/`, `/services`, `/book`, `/login`
- Booking wizard: service → barber → timeslot → customer details → confirm
- Style memory consent prompt in booking flow (toggle in settings)
- Fake role login (`Admin` / `Staff`) persisted to localStorage
- Admin pages:
  - `/admin` overview stats + today schedule
  - `/admin/bookings` filters, status chips, detail modal, update actions
  - `/admin/customers` detail drawer, notes, style photo upload preview/base64 storage
  - `/admin/catalog` inspiration grid, category filters, modal
  - `/admin/settings` shop info + style memory prompt toggle

## Data & Persistence
- `src/lib/mock.ts` contains demo seed data.
- `src/lib/storage.ts` handles load/save/init from mock data when localStorage is empty.

## Static Export / GitHub Pages
`next.config.js` includes:
- `output: 'export'`
- `images.unoptimized: true`
- `trailingSlash: true`
- Conditional `basePath` + `assetPrefix` using:
  - `GITHUB_PAGES`
  - `GITHUB_REPO_NAME`

When `GITHUB_PAGES==='true'` and repo name exists:
- `basePath = /<repo>`
- `assetPrefix = /<repo>/`

## Local Development
```bash
npm install
npm run dev
```

## Production Build (static export)
```bash
npm run build
```
Output is generated in `./out`.

## GitHub Pages Deployment
Workflow file: `.github/workflows/deploy.yml`

It:
1. Sets `GITHUB_PAGES=true`
2. Sets `GITHUB_REPO_NAME` from `${{ github.event.repository.name }}`
3. Runs `npm ci && npm run build`
4. Uploads `./out` using `actions/upload-pages-artifact`
5. Deploys with `actions/deploy-pages`

Expected URL format:
`https://<username>.github.io/<repo-name>/`
