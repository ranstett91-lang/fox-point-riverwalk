# Claymont to Fox Point

Partner and funder brief site for the Claymont-to-Fox-Point pitch.

## Repo layout

- `index.html`, `styles.css`, `app.js`
  - Live site entry points.
- `assets/`
  - Production assets that the site actually ships.
- `assets/source/`
  - Working or export source files kept for reference, not linked from the live page.
- `docs/reference/`
  - The small set of local reports the live site serves directly for reliability.
- `docs/archive/`
  - Non-shipping archive copies of supporting reports, decks, and source material kept in the repo.
- `docs/working/`
  - Extra supporting research files kept in the repo but not currently surfaced in the site UI.

## Working rule

If an asset or document is meant to appear on the live page, link the production or canonical copy.
Do not point the site at temporary exports, duplicated files, or ad hoc downloads in the repo root.

## Deployment note

The live site serves a small core document pack locally for reliability and opens agency or partner pages externally where appropriate.
`.vercelignore` excludes `assets/source/`, `docs/archive/`, and `docs/working/` so the production payload stays controlled while the repo keeps its working materials.
