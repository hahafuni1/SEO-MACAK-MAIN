# Phase 1 Report — Prerender + Technical Foundations

Date: 2026-05-30. Build: ✅ passing.

---

## Files Created

| File | Purpose |
|------|---------|
| `src/entry-server.jsx` | SSR entry: `render(url)` using MemoryRouter + HelmetProvider |
| `scripts/prerender.mjs` | Post-build prerender script — writes one HTML file per route |
| `scripts/generate-sitemap.mjs` | Post-build sitemap generator — writes `dist/sitemap.xml` |

## Files Modified

| File | Change |
|------|--------|
| `src/App.jsx` | Removed `BrowserRouter` wrapper. App now receives Router context from entry points, enabling server-side `MemoryRouter` injection |
| `src/main.jsx` | Changed from `createRoot` to `hydrateRoot` + `BrowserRouter`. Client now attaches to prerendered HTML instead of re-rendering from scratch |
| `src/contexts/LanguageContext.jsx` | Fixed `localStorage` crash in SSR. Initial state is always `'sr'`; `useEffect` reads `localStorage` post-hydration to avoid hydration mismatch |
| `index.html` | Added `<!--app-head-->` placeholder (Helmet injection), `<!--app-html-->` placeholder (body injection), and `<link rel="preconnect">` for Google Fonts (Phase 3.5 requirement pulled forward) |
| `vite.config.mjs` | Added `ssr.noExternal` for `framer-motion` and `react-helmet-async` to bundle them into the SSR output (ESM-external versions have Node.js load issues) |
| `package.json` | Build script expanded to 4 chained steps: client build → SSR bundle → prerender → sitemap |
| `public/robots.txt` | Rewritten: added `Disallow: /404`, `Disallow: /*?*`, explicit rules for 14 search/AI bot user-agents, `Host` directive |
| `netlify.toml` | Replaced headers (removed deprecated `X-XSS-Protection`, added `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`, `Content-Security-Policy`, per-path `Cache-Control`). Replaced redirects: apex→www 301, `/* → /404.html` status 404. |
| `public/_redirects` | Cleared to a comment. `netlify.toml` is now the single source of truth for redirects (Netlify processes `_redirects` before `netlify.toml`, so any catch-all here would override the true-404 rule). |

## Files Deleted

| File | Reason |
|------|--------|
| `sitemap.xml` (root) | Was never shipped to production (not in `public/`). Replaced by `scripts/generate-sitemap.mjs` which writes `dist/sitemap.xml` at build time. |

---

## Build Output (Phase 1)

```
Client bundle:   dist/assets/index-CHAEpu8g.js   478.28 kB  (gzip: 138.11 kB)
CSS bundle:      dist/assets/index-CAqr_0zZ.css   15.47 kB  (gzip:   3.81 kB)
SSR bundle:      dist/server/entry-server.js      567.56 kB  (server-only, not served)
```

**Prerendered HTML files (7):**

| Route | File |
|-------|------|
| `/` | `dist/index.html` |
| `/about/` | `dist/about/index.html` |
| `/izrada-sajtova/` | `dist/izrada-sajtova/index.html` |
| `/seo/` | `dist/seo/index.html` |
| `/blog/` | `dist/blog/index.html` |
| `/kontakt/` | `dist/kontakt/index.html` |
| 404 | `dist/404.html` |

**Build artifacts also confirmed:**
- `dist/sitemap.xml` ✅
- `dist/robots.txt` ✅ (copied from `public/robots.txt`)

---

## Prerendered HTML Proof — Homepage Head Section

The following is extracted directly from `dist/index.html` (static, no JS needed):

```html
<title data-rh="true">SEO Mačak - Početna</title>
<meta data-rh="true" name="description" content="Moderni web development i SEO optimizacija za rast vašeg biznisa na Google-u. Nudimo izradu sajtova, SEO, i web dizajn usluge."/>
<meta data-rh="true" property="og:title" content="SEO Mačak - Početna"/>
<meta data-rh="true" property="og:description" content="Moderni web development i SEO optimizacija za rast vašeg biznisa na Google-u. Nudimo izradu sajtova, SEO, i web dizajn usluge."/>
<meta data-rh="true" property="og:image" content="https://www.seomacak.com/mackic-logo.png"/>
<meta data-rh="true" property="og:url" content="https://www.seomacak.com/"/>
<meta data-rh="true" property="og:type" content="website"/>
<meta data-rh="true" name="twitter:card" content="summary_large_image"/>
<meta data-rh="true" name="twitter:image" content="https://www.seomacak.com/mackic-logo.png"/>
<link data-rh="true" rel="canonical" href="https://www.seomacak.com/"/>
<script data-rh="true" type="application/ld+json">
  { "@context": "https://schema.org", "@type": "Organization", "name": "SEO Mačak", ... }
</script>
```

Body content (hero text) confirmed present: `"Gradimo sajtove koji zapravo donose rezultate"`.

Also verified:
- `/about/` — body contains "Marko" founder content ✅
- `/seo/` — contains `FAQPage` JSON-LD ✅
- `/404.html` — 404 content ✅

---

## Deviations from Plan

### 1.1 — SSG package
The plan specified `vite-plugin-ssg` / `vite-ssg`. Neither was installed. Reason:

`react-router-dom v7` (installed: 7.11.0) **removed `StaticRouter`** — the export that `vite-ssg`'s React mode depends on. Running `vite-ssg` with react-router-dom v7 would require migrating the entire routing to the new data-router API (`createBrowserRouter` / `RouterProvider`), which is a Phase 2+ scope change.

**Decision**: Implemented Vite's own documented SSR prerender approach (`vite build --ssr` + `renderToString` + post-build script). This is the standard pattern Vite recommends and is what `vite-ssg` does internally. The outcome is identical — fully static, crawlable HTML files per route. The only difference is there is no external package dependency.

For SSR routing, `MemoryRouter` (still exported in react-router-dom v7) is used with `initialEntries={[url]}` to simulate the correct route during server render.

### 1.4 — Real 404
Real `404.html` is generated and served with HTTP 404 via `netlify.toml`. However: Netlify's handling of a custom `[[redirects]] status = 404` rule still serves the HTML file content — the 404 HTTP status is set correctly, but the rendered HTML page (the React NotFound component) is what the user sees. This is the correct behavior for an SEO-aware 404 (users see a helpful page; crawlers receive the correct HTTP status).

### Build warnings
`useLayoutEffect does nothing on the server` — 13 occurrences during SSR render. These come from:
- `react-router-dom`'s internal `MemoryRouter` implementation
- `framer-motion`'s animation hooks

These are harmless warnings (not errors). The rendered HTML is complete and correct. No action needed — these are known issues with SSR in both libraries.

---

## Checklist for You to Verify

Before proceeding to Phase 2:

- [ ] **Deploy to Netlify** (or `npm run preview`) and view page source on `/` — confirm `<title>`, `<meta name="description">`, canonical, and OG tags appear **before any JavaScript runs** (View Source, not DevTools Elements tab)
- [ ] Verify `/about/`, `/seo/`, `/kontakt/` page source similarly show their respective titles and meta
- [ ] Confirm that navigating to a nonexistent URL (e.g. `/this-does-not-exist/`) returns HTTP 404 (use DevTools Network tab → check status code on the HTML request)
- [ ] Confirm `https://seomacak.com/` (no www) redirects to `https://www.seomacak.com/` with 301 — requires Netlify deployment
- [ ] Confirm `https://www.seomacak.com/sitemap.xml` serves the generated XML (7 entries, correct priorities)
- [ ] Confirm `https://www.seomacak.com/robots.txt` shows the new multi-bot format

**Note:** The `og:image` still points to the 66-byte stub `mackic-logo.png`. This is a known issue from the Phase 0 audit — it will be fixed in Phase 3 (OG image fix). Do not test social share previews until Phase 3 is complete.

---

**Phase 1 complete. Build passing. 7 prerendered HTML files confirmed. Awaiting "proceed to Phase 2."**

> **Before Phase 2:** Please `git commit` now — Phase 2 touches translations.js, LanguageContext, App.jsx, all page components, and the SSG config.
