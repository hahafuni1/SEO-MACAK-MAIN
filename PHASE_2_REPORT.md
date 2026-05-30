# Phase 2 Report — Internationalization (real /en/ routes + hreflang)

Date: 2026-05-30. Build: ✅ passing. Prerendered: 13 files (12 pages + 404).

---

## Summary

Phase 2 adds real English URL routes under `/en/`, wires language detection to the URL (removing the broken `localStorage` approach), fixes every broken SR and EN translation, and implements hreflang alternates + dynamic canonicals on all pages.

---

## Files Created

| File | Purpose |
|------|---------|
| `src/lib/routes.js` | Single source of truth for SR↔EN route pairs, `getHreflangUrls()`, `getAlternatePath()`, `getNavLinks()` |

---

## Files Modified

| File | Change |
|------|--------|
| `src/translations.js` | Complete rewrite — see §2.1 detail below |
| `src/contexts/LanguageContext.jsx` | URL-based language via `useLocation()`, `useNavigate()` for toggle, removed `localStorage`; exposes `links` (nav URLs) from context |
| `src/main.jsx` | Moved `LanguageProvider` inside `BrowserRouter` (required for `useLocation()`) |
| `src/entry-server.jsx` | Moved `LanguageProvider` inside `MemoryRouter` (same reason, enables correct SSR language derivation) |
| `src/App.jsx` | Added 6 `/en/` routes (same components as SR routes, language derived from URL prefix) |
| `src/components/ScrollAwareHeader.jsx` | Nav links (desktop + mobile) now use `links.*` from context; logo link uses `links.home` |
| `src/components/HomePage.jsx` | Dynamic canonical, 3 hreflang alternates, OG image → `logo.webp`, all CTA/footer links language-aware |
| `src/components/About.jsx` | Same meta/hreflang pattern; removed defensive `t?.about?.meta \|\| fallback` (translations now complete) |
| `src/components/IzradaSajtova.jsx` | Same; fixed sub-components `FeaturedProjectCard` and `PricingCard` — pass `contactUrl` prop |
| `src/components/SEO.jsx` | Same; removed defensive `t?.seo?.meta \|\| fallback` |
| `src/components/Blog.jsx` | Same; added `noindex, follow` robots meta (blog is empty — per Phase 1.5B decision) |
| `src/components/Kontakt.jsx` | Same; JSON-LD LocalBusiness image → `logo.webp` |
| `src/components/NotFound.jsx` | Added `<Helmet>` with `noindex, follow`; home link uses `links.home` |
| `scripts/prerender.mjs` | Routes list expanded: 6 SR + 6 EN + `/404` = 13 prerendered files |
| `scripts/generate-sitemap.mjs` | Rewritten: 12 URL entries (SR + EN pairs) with `<xhtml:link hreflang>` alternates per URL |

---

## 2.1 — Translations Fixed

### SR issues fixed
| Key | Was | Now |
|-----|-----|-----|
| `seo.meta` | **missing** | Added `title: 'SEO Optimizacija \| SEO Mačak'`, proper SR description |
| `about.meta` | **missing** | Added `title: 'O nama \| SEO Mačak'`, proper SR description |
| `about.hero.subtitle` | **missing** | Added SR subtitle |
| `webDevelopment.meta` | **missing** | Added proper SR meta |
| `blog.meta.description` | English text | Translated to Serbian |
| `contact.meta.title` | `'Contact \| SEO Mačak'` | `'Kontakt \| SEO Mačak'` |
| `contact.meta.description` | English text | Translated to Serbian |
| `home.meta.title` | `'SEO Mačak - Početna'` | `'SEO Mačak — SEO i Izrada Sajtova \| Beograd'` |
| `home.services.*` / `home.process.*` | English content (dead code) | Translated to Serbian |

### EN issues fixed
| Key | Was | Now |
|-----|-----|-----|
| `home.meta` | `title: 'O Nama \| SEO Mačak'` (wrong page!) | Correct homepage EN meta |
| `home.hero.*` / `whatWeDo.*` / `howWeWork.*` / `expertQuestion.*` | **Serbian text** | Proper English translations |
| `home.faq.*` / `home.cta.*` | **missing** | Added English FAQ + CTA blocks |
| `webDevelopment` | **duplicate key** (JS used last) + `meta.title: 'About Us \| SEO Mačak'` | Single correct key, fixed meta title |
| `about.hero.subtitle` | Serbian | English |
| `seo.faq.title/titleHighlight` | `'Česta'` / `'Pitanja'` | `'Frequently Asked'` / `'Questions'` |
| `seo.cta.*` | Serbian | English |
| `blog.hero.*` / `categories.*` / `readMore` / `readTime` | Serbian | English |
| `contact.hero.*` / `contact.form.*` | Serbian | English |
| `notFound.*` | Serbian | English |

---

## 2.2 — Route Architecture

```
SR (canonical)          EN (alternate)
/                   ←→  /en/
/about/             ←→  /en/about/
/izrada-sajtova/    ←→  /en/web-development/
/seo/               ←→  /en/seo/
/blog/              ←→  /en/blog/
/kontakt/           ←→  /en/contact/
```

Language switcher button navigates to the equivalent URL (via `getAlternatePath()`), not state mutation. No `localStorage`. No hydration mismatch risk.

---

## 2.3 — Hreflang (verified in prerendered HTML)

Every page emits three `<link rel="alternate">` tags:
```html
<link rel="alternate" hreflang="sr"        href="https://www.seomacak.com/{sr-path}/" />
<link rel="alternate" hreflang="en"        href="https://www.seomacak.com/en/{en-path}/" />
<link rel="alternate" hreflang="x-default" href="https://www.seomacak.com/{sr-path}/" />
```
All present statically in prerendered HTML (no JS required).

---

## 2.4 — Sitemap (verified)

`dist/sitemap.xml` — 12 URL entries (6 SR + 6 EN pairs), each with `<xhtml:link>` hreflang alternates:
```xml
<url>
  <loc>https://www.seomacak.com/</loc>
  ...
  <xhtml:link rel="alternate" hreflang="sr"        href="https://www.seomacak.com/"/>
  <xhtml:link rel="alternate" hreflang="en"        href="https://www.seomacak.com/en/"/>
  <xhtml:link rel="alternate" hreflang="x-default" href="https://www.seomacak.com/"/>
</url>
```

---

## Build Output (Phase 2)

```
Client bundle:   dist/assets/index-*.js    478.28 kB  (gzip: ~138 kB)
CSS bundle:      dist/assets/index-*.css    17.00 kB  (gzip:   4.22 kB)
SSR bundle:      dist/server/entry-server.js  569.43 kB

Prerendered HTML files (13):
  dist/index.html                     (SR /)
  dist/about/index.html               (SR /about/)
  dist/izrada-sajtova/index.html      (SR /izrada-sajtova/)
  dist/seo/index.html                 (SR /seo/)
  dist/blog/index.html                (SR /blog/)
  dist/kontakt/index.html             (SR /kontakt/)
  dist/en/index.html                  (EN /en/)
  dist/en/about/index.html            (EN /en/about/)
  dist/en/web-development/index.html  (EN /en/web-development/)
  dist/en/seo/index.html              (EN /en/seo/)
  dist/en/blog/index.html             (EN /en/blog/)
  dist/en/contact/index.html          (EN /en/contact/)
  dist/404.html
```

**Verified spot-checks:**
- `dist/en/index.html` title: `SEO Mačak — SEO & Web Development | Belgrade` ✅
- `dist/en/index.html` canonical: `https://www.seomacak.com/en/` ✅
- `dist/en/index.html` body contains English hero text (`We Build Websites...`) ✅
- `dist/en/seo/index.html` title: `SEO Optimization | SEO Mačak` ✅
- `dist/seo/index.html` title: `SEO Optimizacija | SEO Mačak` ✅ (SR not broken)
- Hreflang count per page: 3 ✅ (sr, en, x-default)
- Sitemap: 12 URL entries, all with xhtml hreflang ✅

---

## Deviations from Plan

**None critical.** Minor notes:

1. **`about.hero.subtitle`** — The plan said to add the EN translation for `heroSubtitle`. Done. The component previously used `t?.about?.hero?.subtitle || fallback`; now reads directly from translations (fallback removed since translations are complete).

2. **Sub-component `links` scope** — `IzradaSajtova.jsx` has `FeaturedProjectCard` and `PricingCard` sub-components that received `to="/kontakt/"`. These don't call `useLanguage()`, so the `replace_all` edit broke them. Fixed by passing `contactUrl` prop from the parent. No behavior change.

3. **`og:image` / `LocalBusiness.image` / `Organization.logo`** — All references to the 66-byte stub `mackic-logo.png` in Helmet blocks replaced with `logo.webp`. (Phase 3 will create a proper `og-default.png`; `logo.webp` is better than the broken stub.)

4. **Blog `noindex` moved here** — Per Phase 1 decision (§1.5B), blog carries `<meta name="robots" content="noindex, follow">`. Applied to both `/blog/` and `/en/blog/` in Phase 2 since the EN page was created here.

---

## Checklist for You to Verify Before Phase 3

- [ ] Deploy to Netlify and visit `/en/` — confirm English text, English nav labels
- [ ] Click the language switcher on any SR page → should navigate to `/en/` equivalent
- [ ] Click the language switcher on any EN page → should navigate back to SR equivalent
- [ ] Visit `/en/web-development/` — confirm "Website Development | SEO Mačak" title in page source
- [ ] Visit `/en/contact/` — confirm English form labels (Name, Email, Message)
- [ ] Verify nav links on `/en/about/` go to `/en/` paths, not `/` paths
- [ ] View source on `/en/seo/` — confirm 3 hreflang links present before JS runs
- [ ] Visit `https://www.seomacak.com/en/nonexistent/` → should get 404 HTML with HTTP 404 status

---

**Before Phase 3:** Please `git commit` now — Phase 3 touches all page components (SEOHead refactor), creates `src/lib/seo.js`, and handles OG images.

**Phase 2 complete. Build passing. 12 HTML files + 404 confirmed. Awaiting "proceed to Phase 3."**
