# Owner TODO — SEO Mačak Post-Launch Checklist

Generated: 2026-05-30. Work through this list after deploying to Vercel.

---

## 🔴 Critical — Do Before Launch

### ~~1. Real phone number~~ ✅ Done
Phone `+381 62 105 8144` added to Footer, Kontakt page, LocalBusiness schema, Organization schema, and translations.

### 2. Street address — service-area business ✅ Handled
You work from home and don't take clients there. `streetAddress` and `postalCode` have been **intentionally omitted** from schema — this is correct for a home-based / service-area business. `addressLocality: 'Beograd'` and `addressRegion: 'Beograd'` are kept for local SEO signals.

**On Google Business Profile:** When you set up GBP, choose "I deliver goods and services to my customers" and hide your address. Set your service area to Beograd (and optionally all of Serbia). This is fully supported by Google and does not hurt local rankings.

### 3. Google Search Console verification
- Go to https://search.google.com/search-console
- Add property: `https://www.seomacak.com` (URL prefix method)
- Download the HTML verification file
- Replace `public/google-site-verification.html` content with the downloaded file
- Deploy → click Verify in GSC
- Submit sitemap: `https://www.seomacak.com/sitemap.xml`

### 4. Bing Webmaster Tools verification
- Go to https://www.bing.com/webmasters
- Add site: `https://www.seomacak.com`
- Download `BingSiteAuth.xml`
- Replace `public/BingSiteAuth.xml` content
- Deploy → click Verify
- Submit sitemap

### 5. Plausible Analytics setup
- Create account at https://plausible.io
- Add site with domain `seomacak.com` (must match `data-domain` attribute in `index.html`)
- Create Goals:
  - **Contact Form Submit** (custom event — tracks form success/error)
  - **CTA Click** (custom event — tracks hero, homepage, and contact email CTAs)
  - **Outbound Link: Click** (automatic via the outbound-links script)
- Confirm you see your own visit in the Realtime dashboard

### 6. OG images — replace placeholders
All pages currently use `og-default.png` (a generic 1200×630 placeholder with the logo).
Real per-page OG images dramatically improve social share click-through rates.
Recommended dimensions: **1200×630 px**

| Page | Suggested OG image concept |
|------|--------------------------|
| `/` | Logo + tagline "SEO + Web Development | Beograd" on dark bg |
| `/seo/` | "SEO Optimizacija" heading + SERP screenshot + logo |
| `/izrada-sajtova/` | Browser mockup + "React Websites" + logo |
| `/about/` | Founder photo + name/title + logo |
| `/case-studies/komotraks/` | Komotraks screenshot + "+200% organic" stat |

Save as: `public/og-home.png`, `public/og-seo.png`, `public/og-izrada-sajtova.png`, `public/og-about.png`, `public/og-komotraks.png`

Then update the `OG_IMAGES` map in `src/lib/seo.js`.

---

## 🟡 Important — Do Within First Month

### 7. LinkedIn, Twitter, GitHub (sameAs)
In `src/lib/schema/organization.js` and `src/lib/schema/person.js`, there are `sameAs` arrays with TODO comments.
- Add your LinkedIn profile URL
- Add Twitter/X profile URL (if you have one)
- Add GitHub URL (optional but good for credibility)

### 8. Confirm apex → www redirect is active in Vercel
- The redirect rule is in `vercel.json` and fires automatically once both domains are added to Vercel
- Go to Vercel dashboard → Project → Settings → Domains
- Add `www.seomacak.com` as the primary domain
- Add `seomacak.com` as a redirect → it will redirect to `www.seomacak.com` with 301
- This prevents duplicate-content penalty (Google treats apex and www as separate URLs)

### 9. HTTPS on Vercel
- Vercel provisions and renews TLS certificates automatically for all domains — no action needed
- HTTPS is forced by default; there is no toggle to disable it

### 10. Review Privacy Policy and Terms of Service
Both are templates — not legal advice.
- `/privatnost/` and `/en/privacy/` — review EmailJS description, Plausible section, GDPR rights
- `/uslovi/` and `/en/terms/` — review payment schedule, IP terms, governing law
- Have a lawyer review if you work with EU clients (GDPR)

### 11. Komotraks case study — Challenge & Solution copy
The Challenge and Solution sections on `/case-studies/komotraks/` contain placeholder-quality copy.
Expand them with real details:
- What was the client's situation before you started?
- What specific tactics did you use?
- What was the timeline?

Edit: `src/components/CaseStudyKomotraks.jsx` — find "Komotraks je imao funkcionalan ali tehnički zastareo sajt" and expand.

---

## 🟢 When Ready — Content Growth

### 12. Blog posts (unlock `/blog/` indexing)
The blog currently has `<meta name="robots" content="noindex, follow">`.
This is removed automatically once you have 3+ real posts.

To remove the noindex:
1. Publish 3+ posts with at least 600 words each
2. In `src/components/Blog.jsx`, remove the `robots="noindex, follow"` prop from `<SEOHead>`

Suggested first 3 topics (based on your niche + local market):
- "Kako da se vaš lokalni biznis pojavi na Google Maps-u" (local SEO guide, Beograd focus)
- "Zašto vam trebaju Core Web Vitals i kako ih poboljšati" (technical SEO, targets developers)
- "React vs WordPress: Koji odabir je bolji za SEO?" (comparison, targets potential clients)

### 13. Add 3rd/4th case study
Aim for 3–4 case studies within the next 6 months. One strong case study per niche is ideal:
- Local service business (done: Komotraks)
- E-commerce
- SaaS / product company
- Professional services

### 14. Pricing page
Consider adding `/cene/` (SR) and `/en/pricing/` (EN) — it's the second most-visited page type for service businesses. A pricing page also prevents low-quality inquiries.

### 15. Update `LAST_UPDATED` constants when you edit content
Each service page has `const LAST_UPDATED = '30. maj 2026.'` at the top.
When you update copy, update this date.
Files: `src/components/SEO.jsx`, `IzradaSajtova.jsx`, `About.jsx`, `CaseStudyKomotraks.jsx`

---

## 📋 Recurring — Monthly

- [ ] Check Google Search Console for: crawl errors, manual actions, Core Web Vitals issues
- [ ] Check Plausible for: top pages, conversion events, outbound clicks
- [ ] Update sitemap `<lastmod>` dates if major content changed (auto-generated on build)
- [ ] Check that no new console errors appeared after content edits
- [ ] Review any new keywords Google is ranking you for (GSC → Search results)

---

## Developer notes (pass to future developers)

- Do not change route slugs `/izrada-sajtova/`, `/seo/`, `/about/`, `/kontakt/`, `/blog/` — these are indexed URLs
- Do not remove `<!-- TODO: remove noindex when blog has 3+ posts -->` comment in Blog.jsx without actually publishing the posts
- When adding a new page: add route to `src/lib/routes.js`, add metadata to `src/translations.js`, add to prerender list in `scripts/prerender.mjs`, add to sitemap in `scripts/generate-sitemap.mjs`
- Full developer documentation: `SEO_README.md`
