# SEO Mačak — Developer SEO Reference

This document explains the SEO architecture so future developers don't accidentally break it.

---

## How the site renders

This is a **React SPA with server-side prerendering** (not a traditional server). The build process:

```
npm run build
  1. vite build                        → client JS bundle  → dist/assets/
  2. vite build --ssr                  → SSR bundle         → dist/server/
  3. node scripts/prerender.mjs        → static HTML        → dist/{route}/index.html
  4. node scripts/generate-sitemap.mjs → sitemap            → dist/sitemap.xml
  5. node scripts/cleanup-ssr.mjs      → deletes dist/server/ (not needed after step 3)
```

Vercel serves the static HTML files from `dist/`. When a browser visits `/seo/`, it gets `dist/seo/index.html` — a fully rendered HTML file with all meta tags and body content, **no JavaScript required** for crawlers.

After the HTML loads, React hydrates the page (takes over the DOM) for interactivity.

**Critical rule:** Never delete or bypass steps 3–5 in the build chain. Without step 3, Vercel serves an empty HTML shell to crawlers. Without step 5, the SSR bundle (`dist/server/`) is publicly exposed on the CDN.

---

## Where SEO logic lives

| File | Purpose |
|------|---------|
| `src/lib/seo.js` | Per-page metadata factory (`getMetadata()`) — title, description, canonical, hreflang, OG |
| `src/lib/routes.js` | Route definitions, `BASE_URL`, `getHreflangUrls()`, `getNavLinks()` |
| `src/lib/schema/` | JSON-LD schema modules (one file per schema type) |
| `src/components/SEOHead.jsx` | Helmet wrapper — consumes `getMetadata()`, emits all head tags |
| `src/translations.js` | All user-facing strings including per-page `meta.title` and `meta.description` |
| `scripts/prerender.mjs` | Renders each route to static HTML at build time |
| `scripts/generate-sitemap.mjs` | Generates `dist/sitemap.xml` with `<lastmod>`, `<priority>`, hreflang |
| `public/robots.txt` | Allows all bots including AI crawlers (GPTBot, ClaudeBot, PerplexityBot) |
| `public/llms.txt` | AI-readable site summary for citation by ChatGPT, Perplexity, Claude |
| `vercel.json` | Security headers, redirect rules, cache rules, build config for Vercel |
| `netlify.toml` | Archived — was used when hosted on Netlify, inactive on Vercel |

---

## Adding a new page

Follow all 6 steps or the page will be missing from crawlers, sitemap, or navigation.

### Step 1 — Add translations

In `src/translations.js`, add a `meta` block to both `translationsSR` and `translationsEN`:

```js
// translationsSR (around line 200):
newPage: {
  meta: {
    title: 'Nova Stranica | SEO Mačak',
    description: '150 chars max. Describe the page clearly for Google snippets.'
  }
}

// translationsEN (around line 520):
newPage: {
  meta: {
    title: 'New Page | SEO Mačak',
    description: '150 chars max English version.'
  }
}
```

### Step 2 — Add to the metadata map

In `src/lib/seo.js`, add to `getPageMeta()`:

```js
'/nova-stranica/': t.newPage?.meta,
```

If the EN slug differs from the SR slug, also add to `EN_TO_SR`:

```js
'/new-page/': '/nova-stranica/',
```

### Step 3 — Add routes

In `src/lib/routes.js`, add to `getNavLinks()` if it should appear in nav. Add the `BASE_URL` constant paths if needed for breadcrumbs.

In `src/App.jsx`, add two Route elements (SR and EN):

```jsx
<Route path="/nova-stranica/"    element={<NovaStrana />} />
<Route path="/en/new-page/"      element={<NovaStrana />} />
```

### Step 4 — Add to prerender list

In `scripts/prerender.mjs`, add both routes to the `routes` array:

```js
'/nova-stranica/',
'/en/new-page/',
```

### Step 5 — Add to sitemap

In `scripts/generate-sitemap.mjs`, add a route pair to the routes array:

```js
{ sr: '/nova-stranica/', en: '/en/new-page/', priority: 0.7, changefreq: 'monthly' },
```

### Step 6 — Use SEOHead in the component

```jsx
import SEOHead from './SEOHead'
import { breadcrumbSchema } from '../lib/schema/breadcrumbs'
import { BASE_URL } from '../lib/routes'

export default function NovaStrana() {
  return (
    <>
      <SEOHead>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema([{ name: 'Nova Stranica', url: BASE_URL + '/nova-stranica/' }]))}
        </script>
      </SEOHead>
      {/* page content */}
    </>
  )
}
```

---

## Adding a new language

Currently supported: `sr` (Serbian, default) and `en` (English under `/en/` prefix).

To add a third language (e.g. German `/de/`):

1. Add `translationsDE` to `src/translations.js`
2. Update `LanguageContext` in `src/contexts/LanguageContext.jsx` to detect `/de/` prefix
3. Update `getHreflangUrls()` in `src/lib/routes.js` to include `de` alternates
4. Update `SEOHead.jsx` to emit the new hreflang
5. Add `/de/` routes to `src/App.jsx`
6. Add `/de/` routes to `scripts/prerender.mjs`
7. Update `scripts/generate-sitemap.mjs` to include DE URLs

---

## Updating structured data (JSON-LD)

All schemas are in `src/lib/schema/`. Each file exports a function that returns a plain JS object.

| File | Schema type | Used on |
|------|------------|---------|
| `organization.js` | Organization | Every page (via SEOHead global) |
| `website.js` | WebSite + SearchAction | Every page (via SEOHead global) |
| `localBusiness.js` | LocalBusiness | `/`, `/kontakt/` |
| `person.js` | Person | `/about/` |
| `service.js` | Service | `/seo/`, `/izrada-sajtova/` |
| `breadcrumbs.js` | BreadcrumbList | Every page except `/` |
| `faqPage.js` | FAQPage | `/seo/`, `/izrada-sajtova/` |
| `creativeWork.js` | CreativeWork | `/case-studies/komotraks/` |
| `aggregateRating.js` | AggregateRating | `/` (via homepage) |
| `review.js` | Review | `/` (testimonial) |
| `article.js` | BlogPosting | Future blog posts |

To validate schemas, paste the JSON-LD from a prerendered HTML file into:
https://search.google.com/test/rich-results

---

## Build commands

| Command | What it does |
|---------|-------------|
| `npm run build` | Full production build: client + SSR + prerender + sitemap |
| `npm run dev` | Vite dev server (no prerendering — use browser only) |
| `npm run preview` | Serve `dist/` locally to test prerendered output |
| `node scripts/prerender.mjs` | Re-run prerendering only (after `vite build && vite build --ssr`) |

---

## What NOT to change without running the full audit checklist

- **Route slugs** — `/izrada-sajtova/`, `/seo/`, `/about/`, `/kontakt/`, `/blog/` are indexed URLs. Changing them without 301 redirects loses rankings.
- **`getHreflangUrls()`** — used by every page's `<SEOHead>`. Changing the EN slug map breaks hreflang.
- **`EN_TO_SR` map in `seo.js`** — if EN slugs change, this map must be updated too.
- **`<SEOHead>` prop interface** — other pages depend on the existing props (`title`, `description`, `robots`, `ogType`, `ogImage`).
- **`prerender.mjs` route list** — remove a route and its prerendered file disappears, turning that URL into a JS-only SPA (empty for crawlers).
- **`index.html` Plausible script** — do not move to Helmet; it must be in the static shell so it loads before JS.

---

## Key URLs

| URL | Purpose |
|-----|---------|
| `https://www.seomacak.com/sitemap.xml` | Primary sitemap — submit to GSC and Bing |
| `https://www.seomacak.com/robots.txt` | Allows all bots including AI crawlers |
| `https://www.seomacak.com/llms.txt` | AI-readable site summary |
| `https://www.seomacak.com/google-site-verification.html` | GSC ownership verification (owner must replace) |
| `https://www.seomacak.com/BingSiteAuth.xml` | Bing WMT verification (owner must replace) |
