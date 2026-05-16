import { defineConfig } from 'astro/config';

// The Vercel deploy enforces a strict CSP (no 'unsafe-inline' for scripts or
// styles). `build.inlineStylesheets: 'never'` keeps every emitted stylesheet
// in an external file. Astro's component <script> blocks are bundled to
// external _astro/*.js files by Vite, satisfying script-src 'self'.
export default defineConfig({
  site: 'https://fox-point-riverwalk.vercel.app',
  trailingSlash: 'ignore',
  build: {
    inlineStylesheets: 'never',
    format: 'directory',
  },
  compressHTML: true,
  prefetch: {
    defaultStrategy: 'hover',
  },
});
