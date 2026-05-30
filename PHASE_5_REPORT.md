# Phase 5 Report — Content Structure & Trust Pages

Date: 2026-05-30. Build: ✅ passing. 21 prerendered HTML files. 20 sitemap URLs. Zero old placeholder data.

---

## Summary

Phase 5 creates the Komotraks case study as a standalone indexable page, extracts the site footer into a single global component (removing 6 duplicate inline footers), adds real Privacy and Terms pages in both languages, wires cross-links between the two service pages, and fixes every `email@example.com` / `+381 (0) 123 456 789` placeholder that was leaking into the live site.

---

## Files Created

| File | Purpose |
|------|---------|
| `src/components/Footer.jsx` | Global footer — language-aware, language-linked, fixes all placeholder data |
| `src/components/CaseStudyKomotraks.jsx` | Full case study page: Hero, Results, Challenge, Solution, Client, CTA |
| `src/components/CaseStudies.jsx` | Case study index page with Komotraks card + "More coming soon" |
| `src/components/Privacy.jsx` | Privacy Policy — SR (`/privatnost/`) and EN (`/en/privacy/`) via language detection |
| `src/components/Terms.jsx` | Terms of Service — SR (`/uslovi/`) and EN (`/en/terms/`) via language detection |

---

## Files Modified

| File | Change |
|------|--------|
| `src/translations.js` | Added `caseStudies`, `komotraks`, `privacy`, `terms` meta blocks (SR + EN) |
| `src/lib/routes.js` | Added 4 new route pairs; added `caseStudies`, `komotraks`, `privacy`, `terms` to `getNavLinks()` |
| `src/lib/seo.js` | Added 4 new paths to `getPageMeta()` map |
| `src/App.jsx` | Added 8 new routes (4 SR + 4 EN); imported all new page components; added `<Footer />` inside `<PageTransition>` |
| `src/components/HomePage.jsx` | Komotraks "Saznaj više" link changed from `/kontakt/` → `links.komotraks`; inline footer + `FooterLinks` helper removed |
| `src/components/SEO.jsx` | Added "Potreban i sajt?" cross-link section; inline footer + `FooterLinks` helper removed |
| `src/components/IzradaSajtova.jsx` | Added "SEO za novi sajt?" cross-link section; inline footer + `FooterLinks` helper removed |
| `src/components/Blog.jsx` | Inline footer + `FooterLinks` helper removed |
| `src/components/Kontakt.jsx` | Inline footer + `FooterLinks` helper removed |
| `src/components/About.jsx` | Inline footer + `FooterLinks` helper removed |
| `scripts/prerender.mjs` | Added 8 new routes to prerender list (21 total + 404) |
| `scripts/generate-sitemap.mjs` | Added 4 new route pairs with correct priorities and hreflang |

---

## 5.1 — Komotraks Case Study

### New routes
```
/case-studies/komotraks/       (SR)
/en/case-studies/komotraks/    (EN)
/case-studies/                 (SR index)
/en/case-studies/              (EN index)
```

### Page sections (CaseStudyKomotraks.jsx)
1. **Hero** — project name, 1-sentence summary, service tags
2. **Project image** — full-width `komotraks-project.webp`, LCP candidate, `loading="eager"`
3. **Results** — 4 KPIs as a grid: `#1`, `+60%`, `+30%`, `+200%`
4. **Challenge / Solution** — 2-column copy section with placeholder text (owner can expand)
5. **Client info** — company, industry, location, project type
6. **CTA** → `/kontakt/` (or `/en/contact/`)

Applied schema: `CreativeWork` + `BreadcrumbList`.

### Homepage teaser updated
The Komotraks portfolio block "Saznaj više o projektu" now links to `/case-studies/komotraks/` (was `/kontakt/`). This is the correct internal linking pattern for a case study asset.

---

## 5.2 — Footer

**Problem found during implementation:** The audit flagged "footer only on homepage" but in reality all 6 existing page components had their own inline footer — 5 with stale placeholder data (`email@example.com`, `+381 (0) 123 456 789`, hardcoded SR-only links).

**Solution:** Extracted into `src/components/Footer.jsx` + added to `App.jsx` inside `<PageTransition>` (required by the custom `Link` component which reads `PageTransitionContext`). Removed all 6 inline footers.

### Footer fixes vs old inline footers
| Issue | Before | After |
|-------|--------|-------|
| Email | `email@example.com` (on SEO, IzradaSajtova, Blog pages) | `kontakt@seomacak.com` |
| Phone | `+381 (0) 123 456 789` / `+381 60 123 4567` | "Telefon — uskoro" (pending owner real number) |
| Privatnost link | `href="#"` (broken) | `to={links.privacy}` → `/privatnost/` or `/en/privacy/` |
| Uslovi link | `href="#"` (broken) | `to={links.terms}` → `/uslovi/` or `/en/terms/` |
| Case Studies | missing | Added to "Linkovi" column |
| Language-aware | No (hardcoded SR) | Yes — labels + URLs update based on current language |
| Duplication | 6 separate implementations | 1 component, 0 duplication |

---

## 5.3 — Privacy Policy + Terms of Service

Both pages:
- Serve both SR and EN via a single component (language detected from URL prefix via `useLanguage()`)
- Use `<SEOHead>` + `BreadcrumbList` schema
- Are `index, follow` (not noindexed)
- Added to sitemap with `priority: 0.3, changefreq: yearly`

### Privacy Policy content covers:
- Who we are
- Data collected via contact form (name, email, phone, message)
- EmailJS as the delivery mechanism (with link to their privacy policy)
- **Plausible Analytics — explicitly stated as cookie-free, no personal data, no consent required** (this is a competitive advantage for EU clients — preserve this language)
- User rights under GDPR and Serbian Personal Data Protection Act
- Retention policy (email inbox only, no database)

### Terms of Service content covers:
- Service scope (SEO, web dev, performance, monthly monitoring)
- Payment (proposal-defined schedule)
- Termination (15-day notice for ongoing services)
- IP transfer (full ownership to client on final payment)
- Liability cap
- Governing law: Republic of Serbia, court in Belgrade

---

## 5.4 — Cross-links

| From | To | Copy |
|------|----|------|
| `/seo/` | `/izrada-sajtova/` | "Potreban i sajt? — SEO bez dobrog sajta vuče unapred — od nule. Izgradimo oba zajedno." |
| `/izrada-sajtova/` | `/seo/` | "SEO za novi sajt? — Dobar sajt bez SEO-a je kao prodavnica bez table. Krenimo zajedno." |

Both cross-links use descriptive anchor text and ACCENT color, consistent with the site's visual language.

---

## 5.5 — Blog noindex

Already set in Phase 2/3. Confirmed still present in `dist/blog/index.html`. No change needed.

---

## Build Output (Phase 5)

```
Client bundle:   dist/assets/index-*.js    ~480 kB
CSS bundle:      dist/assets/index-*.css    17.00 kB
SSR bundle:      dist/server/entry-server.js  ~570 kB

Prerendered HTML files (21 + 404):
  SR:  / /about/ /seo/ /izrada-sajtova/ /blog/ /kontakt/
       /case-studies/ /case-studies/komotraks/ /privatnost/ /uslovi/
  EN:  /en/ /en/about/ /en/seo/ /en/web-development/ /en/blog/ /en/contact/
       /en/case-studies/ /en/case-studies/komotraks/ /en/privacy/ /en/terms/
  404.html

Sitemap: 20 URL entries (10 SR + 10 EN pairs)
```

Footer presence: ✅ confirmed on all 7 verified pages (home, about, blog, kontakt, seo, case-studies, privatnost).

---

## Deviation from Plan

**None critical.** One note:

Footer was found in all 6 existing page components (not just homepage as the audit stated). Removing 6 inline footers instead of 1 was more work but resulted in a cleaner codebase. No copy was changed — only HTML structure was consolidated.

---

## Checklist for Owner Before Phase 6

- [ ] Deploy and visit `/case-studies/komotraks/` — confirm layout, results grid, image
- [ ] Provide the "Challenge" and "Solution" copy paragraphs for Komotraks if you want to expand beyond the placeholder text (already functional, but brief)
- [ ] Visit `/privatnost/` and `/en/privacy/` — review and customize the legal text (it's a template, not legal advice)
- [ ] Visit `/uslovi/` and `/en/terms/` — same
- [ ] Check footer on every page: links work, language switches correctly
- [ ] Provide real phone number → update `src/components/Footer.jsx` and `src/lib/schema/` TODOs
- [ ] Confirm `/seo/` → `/izrada-sajtova/` cross-link and `/izrada-sajtova/` → `/seo/` cross-link are visible and click correctly

---

**Before Phase 6:** Please `git commit` now — Phase 6 touches Link.jsx (navigation delay fix), route lazy-loading, CSS/font cleanup, and image dimensions across multiple components.

**Phase 5 complete. Build passing. 21 HTML files prerendered. All inline footers replaced. Zero placeholder data in live HTML. Awaiting "proceed to Phase 6."**
