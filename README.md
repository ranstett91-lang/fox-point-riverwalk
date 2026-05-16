# Claymont to Fox Point

Partner and funder brief site for the Claymont-to-Fox-Point pitch.

Built with [Astro](https://astro.build). Static output deployed on Vercel.

## Local development

```sh
npm install
npm run dev      # local dev server on http://localhost:4321
npm run build    # static build to dist/
npm run preview  # preview the built site
```

## Repo layout

- `src/pages/`
  - Astro pages (file-based routing).
  - `index.astro` — Claymont to Fox Point project brief (landing).
- `src/layouts/BaseLayout.astro`
  - Shared HTML shell, `<head>` metadata, view transitions, skip-link, global Topbar.
- `src/components/`
  - `Topbar.astro` — global 4-page site nav.
  - `SubNav.astro` — sticky in-page sub-nav with scroll-spy.
  - `ResourceLibrary.astro` — sources library, server-rendered with client-side search/filter.
- `src/data/`
  - Typed data files consumed by components (e.g. `sources.ts`).
- `src/styles/global.css`
  - Single global stylesheet. All design tokens live in `:root`.
- `public/`
  - Served verbatim at the site root.
  - `public/assets/` — production assets the site ships.
  - `public/assets/source/` — working/export source files (excluded from production via `.vercelignore`).
  - `public/docs/reference/` — the small set of local reports served directly for reliability.
  - `public/docs/archive/`, `public/docs/working/` — supporting material kept in repo, not deployed.
  - `public/favicon.ico`, `public/manifest.webmanifest`, `public/assets/icons/*`.

## Working rule

If an asset or document is meant to appear on the live page, link the production or canonical copy.
Do not point the site at temporary exports, duplicated files, or ad hoc downloads.

## Deployment note

The live site serves a small core document pack locally for reliability and opens agency or partner pages externally where appropriate.
`.vercelignore` excludes `public/assets/source/`, `public/docs/archive/`, and `public/docs/working/` so the production payload stays controlled while the repo keeps its working materials.

The Vercel deploy enforces a strict Content-Security-Policy (`script-src 'self'`, `style-src 'self'`, no `'unsafe-inline'`). The Astro config sets `build.inlineStylesheets: 'never'` so emitted CSS lives in external files, and component-level `<script>` blocks are bundled to external `_astro/*.js` files. Avoid `is:inline` attributes on `<script>` and `<style>`, and avoid `transition:name` directives (Astro emits per-element scope `<style>` tags inline for those — those would be blocked by CSP).
