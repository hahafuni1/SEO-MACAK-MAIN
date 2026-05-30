# Phase 4 Report — Structured Data Expansion

Date: 2026-05-30. Build: ✅ passing. 24 JSON-LD blocks across 6 pages — all parse clean.

---

## Summary

Phase 4 creates a full `src/lib/schema/` module library (8 files), wires global Organization + WebSite schemas into `SEOHead` (so they appear on every page automatically), and applies page-appropriate schemas throughout the site. Every schema block in the prerendered HTML is syntactically valid JSON (verified by `JSON.parse` against all 24 blocks).

---

## Files Created

| File | Schema exported | Applied to |
|------|----------------|-----------|
| `src/lib/schema/organization.js` | `Organization` | Every page (via SEOHead global) |
| `src/lib/schema/website.js` | `WebSite` (with SearchAction) | Every page (via SEOHead global) |
| `src/lib/schema/localBusiness.js` | `LocalBusiness` (with AggregateRating) | `/` and `/kontakt/` |
| `src/lib/schema/breadcrumbs.js` | `BreadcrumbList` | `/about/`, `/seo/`, `/izrada-sajtova/`, `/kontakt/`, `/blog/` |
| `src/lib/schema/service.js` | `Service` (seoServiceSchema, webDevServiceSchema) | `/seo/`, `/izrada-sajtova/` |
| `src/lib/schema/person.js` | `Person` | `/about/` |
| `src/lib/schema/review.js` | `Review` | `/` |
| `src/lib/schema/faqPage.js` | `FAQPage` | `/seo/` |
| `src/lib/schema/article.js` | `BlogPosting` (template, not yet used) | Future blog posts |
| `src/lib/schema/creativeWork.js` | `CreativeWork` (template) | `/case-studies/komotraks/` (Phase 5) |

---

## Files Modified

| File | Change |
|------|--------|
| `src/components/SEOHead.jsx` | Added Organization + WebSite as global schemas rendered on every page |
| `src/components/HomePage.jsx` | Schema: LocalBusiness + Review (replaced old inlined Organization) |
| `src/components/About.jsx` | Schema: Person + BreadcrumbList |
| `src/components/SEO.jsx` | Schema: Service + FAQPage + BreadcrumbList |
| `src/components/IzradaSajtova.jsx` | Schema: Service + BreadcrumbList |
| `src/components/Kontakt.jsx` | Schema: LocalBusiness + BreadcrumbList (now from module) |
| `src/components/Blog.jsx` | Schema: BreadcrumbList |

---

## JSON-LD Block Count per Page

| Page | Blocks | Schema types |
|------|--------|-------------|
| `/` | 4 | Organization, WebSite, LocalBusiness, Review |
| `/seo/` | 5 | Organization, WebSite, Service, FAQPage, BreadcrumbList |
| `/about/` | 4 | Organization, WebSite, Person, BreadcrumbList |
| `/izrada-sajtova/` | 4 | Organization, WebSite, Service, BreadcrumbList |
| `/kontakt/` | 4 | Organization, WebSite, LocalBusiness, BreadcrumbList |
| `/blog/` | 3 | Organization, WebSite, BreadcrumbList |
| `/404.html` | 2 | Organization, WebSite (from SEOHead global) |

All 24 blocks syntactically valid JSON. ✅

---

## 4.1 — Schema Module Design Notes

**Organization:** Uses `@id: /#organization` for cross-schema referencing. `sameAs` array is commented out — awaiting owner's social URLs.

**WebSite:** Includes `potentialAction` SearchAction pointing to `/search?q={search_term_string}`. Search endpoint doesn't exist yet but the schema is correct and harmless — Google won't show a sitelinks search box unless the endpoint returns results.

**LocalBusiness:** `aggregateRating` uses `ratingValue: 5, ratingCount: 1` — one verified on-page review (Željko). This is conservative and accurate. **Do not inflate** without adding more visible on-page reviews. `priceRange: "$$"` — owner should confirm.

**Service (SEO):** Rich `hasOfferCatalog` with 8 services + `offers` with price floor (`lowPrice: "200"` EUR). The price is visible on the `/seo/` page ("Lokalni SEO počinje od oko 200€ mesečno") — parity satisfied.

**Service (WebDev):** `hasOfferCatalog` with 8 service types. No pricing schema (pricing is custom per project — not showing a misleading price).

**Person:** Name is `"Marko"` — last name is a TODO. `worksFor` references Organization by `@id`. `knowsAbout` lists 8 specific expertise areas matching the visible `/about/` page content.

**Review:** One entry (Željko). `reviewBody` matches exact quote from the homepage blockquote. `datePublished` is estimated — **TODO (owner): replace with real date.**

**FAQPage:** Built from the actual `FAQ_ITEMS` array in `SEO.jsx` — always stays in sync with the visible page content automatically.

**Article + CreativeWork:** Templates only — not rendered anywhere yet. Used in Phase 5 (case studies) and future blog posts.

---

## 4.3 — NAP Consistency

⚠️ **ACTION REQUIRED (owner):**

The phone number appears in:
- `src/lib/schema/organization.js` → `"telephone": "TODO-owner-fill"`
- `src/lib/schema/localBusiness.js` → `"telephone": "TODO-owner-fill"`

Both files use the `TODO-owner-fill` placeholder. The previous inline schemas had inconsistent numbers (`+381-60-123-4567` vs `+381 60 123 4567`). Neither was confirmed real.

**To fix:** Provide your real phone number. The correct format for schema is E.164 (e.g., `+381601234567`). Search for `TODO-owner-fill` in `src/lib/schema/` and replace in both files.

The visible phone number in the contact form area and footer (Phase 5) will be fixed in the same pass.

Also TODO in both schema files:
- `streetAddress`: `"TODO-owner-fill"` — provide your business address
- `postalCode`: `"TODO-owner-fill"` — Belgrade postal code
- Review `datePublished` in `review.js` — replace `"2024-01-01"` with real date
- `Person.name` in `person.js` — add your last name
- `sameAs` arrays in `organization.js` and `person.js` — add LinkedIn/Twitter/GitHub

---

## 4.4 — Visibility-Schema Parity Check

Google flags "Spammy Structured Data" when schema properties have no corresponding visible content. Per-page check:

### `/` — Organization + WebSite + LocalBusiness + Review
| Schema property | Visible on page | Status |
|----------------|----------------|--------|
| Organization.name "SEO Mačak" | Logo + nav | ✅ |
| Organization.foundingDate "2023" | "Osnovano 2023" badge | ✅ |
| LocalBusiness.areaServed "Serbia" | Copy references Serbia/Beograd | ✅ |
| LocalBusiness.priceRange "$$" | Price implied in copy | ⚠️ — no explicit price on homepage; consider adding or removing from schema |
| AggregateRating ratingValue 5, ratingCount 1 | Željko review visible | ✅ |
| Review.reviewBody (Željko quote) | Blockquote on page | ✅ |
| Review.author.name "Željko" | Name visible below blockquote | ✅ |

### `/seo/` — Organization + WebSite + Service + FAQPage + BreadcrumbList
| Schema property | Visible on page | Status |
|----------------|----------------|--------|
| Service.name "SEO Optimizacija" | H1 on page | ✅ |
| Service.offers lowPrice "200" EUR | "Lokalni SEO počinje od oko 200€" visible | ✅ |
| Service.hasOfferCatalog (8 items) | 8 service cards visible | ✅ |
| FAQPage 6 questions | 6 FAQ items visible and expandable | ✅ |
| BreadcrumbList Početna → SEO Optimizacija | Breadcrumb visible | ✅ |

### `/about/` — Organization + WebSite + Person + BreadcrumbList
| Schema property | Visible on page | Status |
|----------------|----------------|--------|
| Person.name "Marko" | Name visible in hero | ✅ |
| Person.jobTitle "SEO Specialist & Web Developer" | Title visible | ✅ |
| Person.description (50+ projects, 30+ #1) | Stats section visible | ✅ |
| Person.image (marko-founder.webp) | Founder photo on page | ✅ |
| Person.knowsAbout (8 specializations) | Specializations grid visible | ✅ |

### `/izrada-sajtova/` — Organization + WebSite + Service + BreadcrumbList
| Schema property | Visible on page | Status |
|----------------|----------------|--------|
| Service.name "Izrada Sajtova" | H1 on page | ✅ |
| Service.hasOfferCatalog (8 items) | 8 service types visible in cards | ✅ |
| BreadcrumbList Početna → Izrada Sajtova | ✅ |

### `/kontakt/` — Organization + WebSite + LocalBusiness + BreadcrumbList
| Schema property | Visible on page | Status |
|----------------|----------------|--------|
| LocalBusiness.email | `kontakt@seomacak.com` visible | ✅ |
| LocalBusiness.telephone | **⚠️ TODO — placeholder not visible** — must be real number when filled |
| LocalBusiness.openingHoursSpecification | Not explicitly visible on page | ⚠️ — add visible hours or remove from schema |
| LocalBusiness.address | Not explicitly visible on page | ⚠️ — add visible address or remove from schema |

### `/blog/` — Organization + WebSite + BreadcrumbList (noindex)
| Schema property | Visible on page | Status |
|----------------|----------------|--------|
| BreadcrumbList | Page accessible via nav | ✅ |
| Note: page is noindex — schema here has minimal impact |

---

## Rich Results Eligibility

URLs the owner should paste into `https://search.google.com/test/rich-results` after deploy:
1. `https://www.seomacak.com/` → expect: Review, LocalBusiness
2. `https://www.seomacak.com/seo/` → expect: FAQ, Service
3. `https://www.seomacak.com/about/` → Person (not always shown in search but valid E-E-A-T signal)

---

## Deviations from Plan

1. **`aggregateRating` moved into `LocalBusiness`** instead of standalone `AggregateRating` — this matches how Google actually processes it (embedded in the entity it describes, not a top-level schema).

2. **FAQ on `/izrada-sajtova/`** — the plan said "ask the owner whether to invent FAQ content or wait for them to provide." Not added — owner must supply 3–5 FAQ items. The `faqPageSchema()` function is ready; just call it with an array of `{ q, a }` objects.

3. **`article.js` and `creativeWork.js`** — created as templates but not rendered anywhere yet (blog is empty, case study page is Phase 5).

4. **`priceRange: "$$"`** — used `$$` as instructed. Owner should confirm this is accurate for their market positioning.

---

## Checklist for Owner Before Phase 5

- [ ] Search `TODO-owner-fill` in `src/lib/schema/` — fill real phone, address, postal code
- [ ] Add real social URLs to `sameAs` arrays in `organization.js` and `person.js`
- [ ] Add last name to `Person.name` in `person.js`
- [ ] Confirm `priceRange: "$$"` is accurate for LocalBusiness
- [ ] Replace `datePublished: "2024-01-01"` in `review.js` with real project date
- [ ] Add 3–5 FAQ items for `/izrada-sajtova/` (provide the Q&A — I'll wire them in)
- [ ] Verify `openingHoursSpecification` (Mon–Fri 09:00–17:00) matches your actual hours
- [ ] After deploy: paste `/` and `/seo/` into Google Rich Results Test

---

**Before Phase 5:** Please `git commit` now — Phase 5 adds new pages (case studies, footer extraction, privacy/terms) and touches many files.

**Phase 4 complete. Build passing. All 24 JSON-LD blocks syntactically valid. Awaiting "proceed to Phase 5."**
