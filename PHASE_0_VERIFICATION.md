# Phase 0 — Verification Report

Generated: 2026-05-30. Read-only pass — no files modified.

---

## 1. Audit Accuracy — Spot-Check Results

Five claims from `SEO_DISCOVERY_FOR_PLANNING.md` verified against the live codebase:

| # | Audit Claim | Source | Verdict |
|---|-------------|--------|---------|
| 1 | `public/mackic-logo.png` is a 66-byte stub | `Get-Item public/mackic-logo.png` → Length = 66 | ✅ CONFIRMED |
| 2 | `Link.jsx` has a 480 ms `setTimeout` before every navigation | `src/components/Link.jsx:27` | ✅ CONFIRMED |
| 3 | All 6 routes are eagerly imported in `App.jsx` with no `React.lazy` | `src/App.jsx:3–9` | ✅ CONFIRMED |
| 4 | `translationsSR` is missing top-level `seo`, `about`, `webDevelopment` blocks | `src/translations.js:3–208` — SR only has `nav`, `home`, `blog`, `contact`, `notFound` | ✅ CONFIRMED |
| 5 | `translationsSR.contact.meta.title` = "Contact \| SEO Mačak" (English in SR) | `src/translations.js:168` | ✅ CONFIRMED |

**Overall verdict: The audit is accurate.** No claims have been invalidated.

---

## 2. Drifts — Issues NOT in the Audit

These were discovered during the spot-check and must be addressed (most in Phase 2):

### 2a. `translationsEN.home.meta` has wrong content (NEW BUG)
`src/translations.js:274–277`
```js
meta: {
  title: 'O Nama | SEO Mačak',       // WRONG — this is the About page title
  description: 'Upoznajte tim koji stoji iza SEO Mačka...'  // WRONG — About description
}
```
The English home page will render the About page's title and description. This is a critical metadata bug introduced after the audit was written.

### 2b. `translationsEN.webDevelopment` defined twice (NEW BUG)
`src/translations.js:281` and again at `src/translations.js:365`. JavaScript silently discards the first definition. The surviving (second) definition ends with:
```js
meta: {
  title: 'About Us | SEO Mačak',         // WRONG — About title on web-dev page
  description: 'Meet the team behind SEO Mačak...'  // WRONG — About description
}
```
Both EN home and EN web-dev pages have wrong meta. Phase 2 translation fix is critical.

### 2c. English strings in `translationsSR.home.hero`
`src/translations.js:21` — `refreshButton: 'Refresh Cards'` (English in SR table).

### 2d. Two new components not mentioned in audit
- `src/components/FAQSection.jsx` — standalone animated FAQ with mobile/desktop variants, reads from `t?.home?.faq || t?.seo?.faq`. Used on at least the homepage.
- `src/components/SectionTransition.jsx` — simple gradient-strip utility component.

### 2e. New `public/icons/` directory
Six `.webp` icon files added (`investicija.webp`, `Kompetitivnost.webp`, `Marketing.webp`, `Poverenje.webp`, `Rezultati.webp`, `Skalabilnost.webp`). Grepping `src/` for the path `icons/` returns **no matches** — these appear to be dead assets not yet wired into any component.

### 2f. New `public/cursors/cursor.png`
Audit mentioned `default.png` and `pointer.png` under `public/cursors/`. A third file `cursor.png` now exists. Not referenced in `App.jsx` cursor rules — likely dead.

---

## 3. Exact Package Versions

| Package | Declared (`package.json`) | Installed (`node_modules`) |
|---------|--------------------------|---------------------------|
| `vite` | `^5.0.0` | **5.4.21** |
| `react-router-dom` | `^7.11.0` | **7.11.0** |
| `react-helmet-async` | `^3.0.0` | **3.0.0** |
| `framer-motion` | `^10.12.5` | **10.18.0** |

---

## 4. `react-helmet-async` Active Use

**7 files** import `react-helmet-async`:

1. `src/main.jsx` — `HelmetProvider` root wrapper
2. `src/components/HomePage.jsx`
3. `src/components/About.jsx`
4. `src/components/IzradaSajtova.jsx`
5. `src/components/SEO.jsx`
6. `src/components/Blog.jsx`
7. `src/components/Kontakt.jsx`

`NotFound.jsx` does **not** import Helmet (confirmed by audit; re-confirmed — it has no `<title>` or meta tags at all).

---

## 5. Files Added Since the Audit

| File | Notes |
|------|-------|
| `src/components/FAQSection.jsx` | New animated FAQ component |
| `src/components/SectionTransition.jsx` | New gradient-strip utility |
| `public/icons/investicija.webp` | Appears unused (no JSX src reference) |
| `public/icons/Kompetitivnost.webp` | Appears unused |
| `public/icons/Marketing.webp` | Appears unused |
| `public/icons/Poverenje.webp` | Appears unused |
| `public/icons/Rezultati.webp` | Appears unused |
| `public/icons/Skalabilnost.webp` | Appears unused |
| `public/cursors/cursor.png` | Appears unused (not in App.jsx cursor rules) |

---

## 6. Phase 1 Pre-Flight Note — SSG Package Research Required

The instruction specifies `vite-plugin-ssg` or its successor `vite-ssg`. **One item must be confirmed before Phase 1 can start:**

- **`vite-ssg`** (npm: `vite-ssg`, by Anthony Fu) is the live package and does support React via its `ViteSSG` export. However, its primary design target is Vue. React support exists but is less documented.
- **`react-router-dom@7.11.0`** (installed) uses the Data Router API by default. Compatibility with `vite-ssg`'s route-array format needs to be verified — v7 ships `createBrowserRouter` / `RouterProvider` rather than the older `BrowserRouter + <Routes>` API that older SSG recipes use. The current `App.jsx` still uses `BrowserRouter + <Routes>` (lines 2, 14), which is the legacy API but still supported in v7.

**Action required before Phase 1:** Confirm the npm package name (`vite-ssg` vs. something else) is still valid and React-compatible in 2026. Phase 1 will verify this during install and flag immediately if a substitution is needed.

---

## 7. Phase 1 Scope Summary

Phase 1 is the highest-risk phase. Here is what it will do, given the current state:

Install the SSG package and rewrite `src/main.jsx` from the CSR `createRoot` pattern to a `ViteSSG` export that drives prerendering. Extract `App.jsx`'s routes into a flat array consumable by the SSG router. Wire `HelmetProvider` and `LanguageProvider` into the SSG app factory so both contexts are available during server-side render. Configure the SSG to prerender seven paths: `/`, `/about/`, `/izrada-sajtova/`, `/seo/`, `/blog/`, `/kontakt/`, and `/404.html`. Verify that each resulting HTML file in `dist/` contains a populated `<title>`, `<meta name="description">`, canonical link, OG tags, and visible body text — all without executing JavaScript. Alongside SSG, Phase 1 rewrites `public/robots.txt`, adds a build-time sitemap generator script, replaces the Netlify catch-all 200 rewrite with proper per-route rules and a real HTTP 404, upgrades security headers, and adds the apex-to-www canonical redirect.

The translation bugs found in §2a and §2b will **not** be fixed in Phase 1 (they are Phase 2 work), but they are noted here so Phase 1 does not accidentally bake wrong metadata into prerendered HTML. The fallback title/description constants hardcoded in each page component will serve as the source of truth for Phase 1 prerender output.

---

**Phase 0 complete. No files were modified. Ready to proceed to Phase 1 on your instruction.**

> **Before proceeding:** Please `git commit` the current state of the codebase so you have a clean rollback point. Phase 1 touches more than 5 files.
