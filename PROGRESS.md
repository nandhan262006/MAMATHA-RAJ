# Project Status — Resume Notes

_Last updated: Aug 24, 2026. Work paused mid-verification._

## ✅ Fully done & verified

- Admin dashboard (login `/admin/login`, password in `.env.local`): hero images, About,
  Services CRUD, Featured Story editor, portfolio library
- Bulk photo import from **Google Drive folder link** + local multi-file upload +
  drag & drop (streaming endpoint `src/app/api/admin/import/route.ts`)
- Live progress bars (% / file count) on all bulk uploads and imports
- **Multi-select delete** with checkboxes on `/admin/portfolio` and the story gallery
  (`deleteSelectedPhotos` / `deleteSelectedStoryPhotos`) — verified end-to-end

## 🟡 Built but NOT yet verified (resume here)

1. **Thumbnails for fast loading** — new WebP ~800px variants generated at upload time:
   - `src/lib/r2.ts` → `uploadImage(file, folder, { thumb: true })`, thumb key = `<key>.webp`
   - DB: `photos.thumb` + `story_photos.thumb` columns (added lazily via PRAGMA check)
   - Grids use `thumb || src`: `PortfolioGallery.tsx` (/portfolio + /story),
     homepage `Gallery.tsx`, admin `PhotoToggleCard.tsx`, `StoryGalleryManager.tsx`.
     Lightbox still opens the full-size original.
   - **Backfill already complete**: all 157 story photos have thumbs (verified 200).
     The 22 default `/downloads/*.jpg` photos are intentionally skipped (not in R2).
2. **"Select all" button** in the selection bar (`src/components/admin/selection.tsx`,
   wired into `PhotoLibrary.tsx` + `StoryGalleryManager.tsx`).

### Next steps to finish verification (~10 min)

1. `npx tsc --noEmit && npx eslint src/components/admin src/app/api src/lib`
2. Upload a test image via `/api/admin/import` → confirm response has `thumbUrl`,
   R2 object `<key>.webp` exists, row has `thumb` set
3. Open `/story` and `/portfolio` → grid `<img>` tags should point to `.webp` files;
   lightbox should open the original
4. In `/admin/story` + `/admin/portfolio`: select one photo → bar shows
   "Select all (N)" → click → all selected → delete works as before

## ⚠️ Known issues / notes

- User's first big Drive import hit a Drive download timeout after ~11 min; some
  photos may be missing. Re-running an import re-adds duplicates (no skip-existing
  yet). Possible future feature: skip photos already imported.
- Turso is remote (Mumbai) — occasional connect-timeout blips cause transient 500s;
  retry usually works.
- Dev server: restart with
  `setsid nohup npx next dev > /tmp/opencode/dev.log 2>&1 < /dev/null &`
  (never `pkill -f "next dev"`).
- Backfill script (idempotent, safe to re-run): `node scripts/backfill-thumbs.mjs`
- Google Drive API key lives in `.env.local` as `GOOGLE_DRIVE_API_KEY` (gitignored).
