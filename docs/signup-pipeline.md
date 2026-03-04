# Unified Signup Pipeline

This repo now uses a shared signup capture pipeline for project landing pages.

## What is shared

- Frontend form: `components/SignupCaptureForm.tsx`
- Server handler: `lib/signup/handler.ts`
- API routes:
  - `app/api/signup/route.ts` (primary)
  - `app/api/waitlist/route.ts` (backward-compatible alias)
- Project config: `lib/signup/projects.ts`
- Shared project page shell: `components/ProjectSignupPage.tsx`

## Add a New Project

1. Add a config entry in `lib/signup/projects.ts` with:
   - `slug`: URL segment and product slug used for attribution lookup.
   - `name`: project display name.
   - `headline`, `description`: page copy.
   - `source`: default source label for captures from this page.
2. Add a page file at `app/<slug>/page.tsx` that renders:
   - `ProjectSignupPage` with the project config entry.
3. (Recommended) Ensure a matching `products.slug` row exists in Supabase so `product_id` attribution is resolved.
4. (Optional) Add project-specific links from homepage/nav.

## Captured Fields

The signup payload captures:

- `email`
- `project` (slug for attribution)
- `source` (from `source`, `src`, or `utm_source` query param; falls back to configured source)
- `sourceDetail` (project page default source)
- `referrer`
- `pageUrl`
- `landingPath`
- `utmSource`
- `utmMedium`
- `utmCampaign`

## Migration Notes

The handler attempts to insert rich tracking fields (`project_slug`, `page_url`, `landing_path`, `source_detail`) and gracefully falls back if those columns do not exist.

To persist these as first-class columns, run:

```sql
alter table public.leads
  add column if not exists project_slug text,
  add column if not exists page_url text,
  add column if not exists landing_path text,
  add column if not exists source_detail text;
```

Without this migration, core signup capture still works and stores URL fallback data in `referrer`.
