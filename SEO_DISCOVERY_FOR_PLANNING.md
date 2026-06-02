# SEO Discovery Report — SEO Mačak

Snapshot of the current codebase, intended as input to a downstream SEO planning agent. No files were modified during this discovery.

---

## 1. PROJECT OVERVIEW

- **What the site is**: A services site for **SEO optimization + custom website development + web design**, branded as **"SEO Mačak"** (Serbian for "SEO Cat"). Confirmed in `index.html` (`<title>SEO Mačak — Početna</title>`), in nav labels (`SEO`, `Izrada sajtova`), in `README.md` ("SEO Mačak — Lokalni scaffold"), and across landing-page copy in [src/translations.js](src/translations.js) and [src/components/SEO.jsx](src/components/SEO.jsx) / [src/components/IzradaSajtova.jsx](src/components/IzradaSajtova.jsx). User's framing ("SEO + website development") matches the code.
- **Primary purpose**: **Lead generation**. The only form on the site is a contact/quote form in [src/components/Kontakt.jsx](src/components/Kontakt.jsx) that posts via EmailJS. There is no e-commerce, no payment, no member area, and the blog is explicitly an "under construction" page. Every page ends with a CTA pointing to `/kontakt/` or a phone-style link.
- **Target audience**: Serbian-speaking SME/founder buyers in Serbia (Belgrade-centric). Inferred from: `<html lang="sr">`, default app language `'sr'` ([src/contexts/LanguageContext.jsx:10](src/contexts/LanguageContext.jsx#L10)), `LocalBusiness` schema with `"addressLocality": "Beograd"`, `"addressCountry": "RS"` in [src/components/Kontakt.jsx:111-113](src/components/Kontakt.jsx#L111-L113), founder copy "Ja sam Marko" in Serbian on HomePage. There is also an English translation set (`translationsEN`) but it is **not** exposed via routing — see §3.
- **Languages on site**: Serbian (default), English (in-place toggle via a context switcher, no URL change, no hreflang). See [src/translations.js](src/translations.js) and [src/components/LanguageSwitcher.jsx](src/components/LanguageSwitcher.jsx).
- **Domain**: `https://www.seomacak.com/` — confirmed in [public/robots.txt](public/robots.txt), [sitemap.xml](sitemap.xml), all `canonical` and `og:url` tags in every page component, and the JSON-LD `Organization`/`LocalBusiness` blocks. `package.json` lists `"name": "seo-macak"`. No `.env`/CI configs reveal anything different.

---

## 2. TECH STACK

- **Framework**: **React 18 SPA on Vite 5**, with **react-router-dom v7** for routing (client-side only — no SSR/SSG). See [package.json](package.json) and [vite.config.mjs](vite.config.mjs).
- **Language**: Plain **JavaScript (JSX)**. No TypeScript anywhere in `src/`.
- **CSS approach**: Mixed.
  - Global `css/styles.css` (635 lines) loaded from [index.html](index.html) via `<link rel="stylesheet" href="/css/styles.css">`.
  - Inline JSX `style={{}}` objects dominate the component code (hero, sections, badges, etc.).
  - One inline `<style>` block in [src/App.jsx:14-58](src/App.jsx#L14-L58) for cursor styling.
  - No Tailwind, no CSS Modules, no styled-components, no PostCSS config.
- **Hosting / deployment**:
  - **Netlify** — [netlify.toml](netlify.toml) defines `build = "npm run build"`, `publish = "dist"`, the SPA catch-all redirect `/* → /index.html 200`, plus a duplicate SPA catch-all in [public/_redirects](public/_redirects) (`/*  /index.html  200`).
  - Custom security headers (see §5).
  - Most recent commit message ("Fix Netlify MIME type and routing") confirms Netlify is the deploy target.
  - No `vercel.json`, no `Dockerfile`, no `.htaccess`.
- **Build tooling / scripts** (from [package.json](package.json)):
  ```json
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview --port 5000"
  }
  ```
- **Dependencies**: `react`, `react-dom`, `react-router-dom@^7`, `framer-motion@^10`, `react-helmet-async@^3`, `@emailjs/browser@^4`. Dev: `vite@^5`, `@vitejs/plugin-react@^5`.
- **CMS / database**: NOT PRESENT. All page content is hardcoded in `.jsx` files; bilingual strings live in [src/translations.js](src/translations.js). No MDX, no headless CMS, no DB, no Prisma/Supabase/Contentful/Sanity. The blog page is a static "coming soon" placeholder with hardcoded `upcomingTopics` ([src/components/Blog.jsx:38-54](src/components/Blog.jsx#L38-L54)).

---

## 3. SITE STRUCTURE

### Routes (defined in [src/App.jsx:67-74](src/App.jsx#L67-L74))

| URL | Component | Type | Purpose |
|-----|-----------|------|---------|
| `/` | `HomePage` | Client-rendered SPA | Hero, services overview, process, testimonial, Komotraks case study, founder teaser, FAQ, final CTA, footer |
| `/about/` | `About` | Client-rendered SPA | Founder story, differentiators, stats, specializations, deliverables, CTA |
| `/izrada-sajtova/` | `IzradaSajtova` | Client-rendered SPA | Web development landing page (services, packages) |
| `/seo/` | `SEO` | Client-rendered SPA | SEO services landing page (services list, stats, sticker wall, FAQ) |
| `/blog/` | `Blog` | Client-rendered SPA | "Under construction" placeholder — no posts |
| `/kontakt/` | `Kontakt` | Client-rendered SPA | Contact form (EmailJS) + direct contact info |
| `*` | `NotFound` | Client-rendered SPA | 404 fallback. **Important:** Netlify serves the SPA shell with HTTP 200 for any non-existent URL — there is no real 404 status (see §8). |

All pages are **client-rendered**. There is no static prerendering or SSR. The static [index.html](index.html) is the same for every URL; Helmet rewrites `<title>` and meta tags on the client after JS executes.

### Navigation structure
- **Desktop header** ([src/components/Header.jsx:60-68](src/components/Header.jsx#L60-L68) and equivalent [src/components/ScrollAwareHeader.jsx](src/components/ScrollAwareHeader.jsx)):
  - Početna (`/`), Izrada sajtova (`/izrada-sajtova/`), SEO (`/seo/`), Blog (`/blog/`), About (`/about/`), Kontakt (`/kontakt/` — CTA pill), Language switcher.
- **Mobile menu** (overlay): same six links, numbered 01–06, plus `mailto:markodevedzic30@gmail.com` in the menu footer.
- **Footer** (in HomePage only, [src/components/HomePage.jsx:685-728](src/components/HomePage.jsx#L685-L728)): three link groups — "Linkovi" (Početna, Izrada sajtova, SEO, Blog), "Kompanija" (About, Kontakt, Privatnost `#`, Uslovi `#`), and "Kontakt" with hardcoded `email@example.com`, `+381 (0) 123 456 789`, "Beograd, Srbija". Privatnost/Uslovi point to `#`, **not real pages**. The footer **only appears on the homepage** — other routes have no footer at all.

### Blog
- **Present as a route** but no posts. The page is a "in izradi / under construction" landing card with three `upcomingTopics` items (SEO, Tehnički, Sadržaj) hardcoded in [src/components/Blog.jsx:38-54](src/components/Blog.jsx#L38-L54).
- **No blog post storage at all** — no MDX, no `posts/` folder, no CMS, no DB.
- **Post count: 0.**

### i18n
- Two translation tables in [src/translations.js](src/translations.js): `translationsSR` (lines 3–208) and `translationsEN` (lines 210–716).
- Switched at runtime by `LanguageContext` ([src/contexts/LanguageContext.jsx](src/contexts/LanguageContext.jsx)) with `localStorage.language` persistence. Default = `'sr'`.
- **No URL change** between languages (no `/en/...` prefix, no subdomain, no query param).
- **No `hreflang` tags anywhere.**
- **The translation tables are structurally inconsistent** — see §8 for details. The English table holds `seo`, `about`, `webDevelopment` blocks that the Serbian table is missing, which has been causing runtime crashes when the SR default loads pages whose components dereference those branches.

---

## 4. CURRENT SEO STATE

> **Top-of-section context:** because this is a client-rendered SPA with no SSR/prerender, every per-page tag below is injected by `react-helmet-async` **after** JS executes. Crawlers that don't render JS see only the static [index.html](index.html), whose `<title>` is "SEO Mačak — Početna" and which has **no** meta description, OG tags, canonical, or JSON-LD. Google generally renders JS, but every other crawler (Bing/non-Googlebot, social previewers, AI scrapers) sees the shell. This is the single biggest structural risk on the site.

### Title tags
- **Present, unique per page, injected via Helmet.** Sources:
  - HomePage: `t.home.meta.title` → `"SEO Mačak - Početna"` ([src/translations.js:23](src/translations.js#L23) and [src/components/HomePage.jsx:67](src/components/HomePage.jsx#L67))
  - IzradaSajtova: `webDevMeta.title` with hardcoded fallback `"Izrada Sajtova | SEO Mačak"` ([src/components/IzradaSajtova.jsx:144-147,152](src/components/IzradaSajtova.jsx#L144-L152))
  - SEO: `seoMeta.title` with hardcoded fallback `"SEO Optimizacija | SEO Mačak"` ([src/components/SEO.jsx:101-104,323](src/components/SEO.jsx#L101-L323))
  - About: `meta.title` with hardcoded fallback `"O nama — SEO Mačak"` ([src/components/About.jsx:41-44,117](src/components/About.jsx#L41-L117))
  - Blog: `t.blog.meta.title` → `"Blog | SEO Mačak"` ([src/translations.js:146](src/translations.js#L146))
  - Kontakt: `t.contact.meta.title` → `"Contact | SEO Mačak"` ([src/translations.js:168](src/translations.js#L168)) — title is in **English** even though the page is in Serbian.
  - NotFound: **NO `<title>` tag injected**. The 404 keeps the previously-set title.
- **Static shell title in [index.html:9](index.html#L9): `SEO Mačak — Početna`** — that is what non-JS-rendering bots see for every URL.

### Meta descriptions
- **Present per page, injected via Helmet.** Each Helmet block emits both `<meta name="description">` and a matching `og:description` (same string).
- All descriptions come from `t.<page>.meta.description` or a hardcoded SR fallback.
- **Kontakt's description is in English** ("Contact us for a free consultation…", [src/translations.js:169](src/translations.js#L169)).
- **Blog's description is in English** ("Our blog covers topics such as…", [src/translations.js:147](src/translations.js#L147)).
- HomePage description (SR) overlaps heavily with what would be in a generic agency description and does not mention any location/keyword cluster.
- NotFound: NO description.
- Static [index.html](index.html) has **no `<meta name="description">`**.

### Canonical tags
- Present on every routed page (`HomePage`, `About`, `IzradaSajtova`, `SEO`, `Blog`, `Kontakt`) — all hardcoded to `https://www.seomacak.com/<path>/` with trailing slash, matching the route table.
- NOT PRESENT on `NotFound`. NOT PRESENT in static [index.html](index.html).
- No self-referencing canonical in the shell, which means if Google fetches an unrendered shell it has no canonical signal.

### Open Graph / Twitter Card
- Per-page Helmet blocks emit: `og:title`, `og:description`, `og:image`, `og:url`, `og:type=website`, `twitter:card=summary_large_image`, `twitter:image`.
- **Every page uses the same `og:image`: `https://www.seomacak.com/mackic-logo.png`** (hardcoded in all 6 page components). The file [public/mackic-logo.png](public/mackic-logo.png) is **66 bytes** (literally a stub — see §8). The same path is referenced from the `Organization`/`LocalBusiness` JSON-LD blocks.
- `twitter:title` and `twitter:description` are **NOT emitted** (only `twitter:card` and `twitter:image`).
- No `og:site_name`, no `og:locale`.

### robots.txt
- Path: [public/robots.txt](public/robots.txt). Full contents:
  ```
  User-agent: *
  Allow: /
  Sitemap: https://www.seomacak.com/sitemap.xml
  ```
- No `Disallow`, no specific bot rules, no host directive.

### sitemap.xml
- **Static file** at [sitemap.xml](sitemap.xml) (project root, not `public/`). **NOT generated** — there is no script that produces it.
- Lists 6 URLs (`/`, `/izrada-sajtova/`, `/seo/`, `/about/`, `/kontakt/`, `/blog/`), each with `lastmod = 2026-05-27`.
- **Caveat:** the file lives at project root, not in `public/`. When Vite builds, only `public/*` and `dist/*` get served. **Need to verify whether `sitemap.xml` actually ships in the deploy** — likely it does not, because Vite doesn't copy root files into `dist`. `robots.txt` correctly lives in `public/` but the sitemap doesn't. This is a likely gap (see §8).
- No `<changefreq>`, no `<priority>`, no `<lastmod>` per-URL variation.

### Structured data / JSON-LD
- Multiple `<script type="application/ld+json">` blocks injected via Helmet:
  - **`Organization`** on `/` ([src/components/HomePage.jsx:77-92](src/components/HomePage.jsx#L77-L92)) — name "SEO Mačak", url, logo `/mackic-logo.png` (stub), `ContactPoint` telephone `+381-60-123-4567`.
  - **`LocalBusiness`** on `/kontakt/` ([src/components/Kontakt.jsx:98-129](src/components/Kontakt.jsx#L98-L129)) — name, image (same stub), `@id` is empty string `""`, telephone "+381 60 123 4567", PostalAddress with empty `streetAddress` and empty `postalCode`, `addressLocality: "Beograd"`, `addressCountry: "RS"`, opening hours Mon–Fri 09:00–17:00.
  - **`BreadcrumbList`** on `/kontakt/`, `/about/`, `/izrada-sajtova/`, `/seo/`, `/blog/` (two-level: Početna → page).
  - **`FAQPage`** on `/seo/` ([src/components/SEO.jsx:333-348](src/components/SEO.jsx#L333-L348)) — built from `FAQ_ITEMS` constant.
- NOT PRESENT: `WebSite` + `SearchAction`, `Service`, `Article`/`BlogPosting`, `Review`/`AggregateRating` (the homepage now has a testimonial section but it is not in schema), `Person` for the founder.
- **Phone numbers are inconsistent** between `Organization` (`+381-60-123-4567`), `LocalBusiness` (`+381 60 123 4567`), the footer hardcoded text (`+381 (0) 123 456 789`), and the translation strings (`+381 60 123 4567`). The hyphenated vs spaced form is fine; the **footer's `+381 (0) 123 456 789` does not match** and is likely a placeholder.

### Hreflang
- **NOT PRESENT.** Although the site has SR + EN translations, no `<link rel="alternate" hreflang>` is emitted anywhere, and there is no per-language URL.

### H1 / heading structure
- Each routed page has **exactly one `<h1>`** (confirmed: `HomePage`, `About`, `IzradaSajtova`, `SEO`, `Blog`, `Kontakt`, `NotFound`).
- 64 occurrences of `<h2>`/`<h3>`/`<h4>` across page components — heading hierarchy is generally sensible, but most subheadings are hand-styled `<h2>` blocks with inline fonts. No obvious skipped-level violations were found, but a full audit per page would be worth doing.
- **NotFound H1 is literally `<h1>404</h1>`** ([src/components/NotFound.jsx:13](src/components/NotFound.jsx#L13)) and the descriptive title is an `<h2>` below — semantically odd but not broken.

### Image handling
- **Raw `<img>` everywhere** (no `<picture>`, no responsive `srcSet`, no `next/image`-style component). Inventory of all `<img>` in route components:
  - Logo: `<img src={logoImg} alt="SEO Mačak" width="60" height="60">` in [Header.jsx:51](src/components/Header.jsx#L51), [ScrollAwareHeader.jsx:59](src/components/ScrollAwareHeader.jsx#L59). Good (dimensions, alt, .webp).
  - Hero logo: `<motion.img src={logoImg} alt="SEO Mačak logo">` in [HomePage.jsx:229-241](src/components/HomePage.jsx#L229-L241). No `width`/`height` attributes → potential CLS.
  - Page transition splash: `<img ... alt="SEO Mačak">` in [PageTransition.jsx:53](src/components/PageTransition.jsx#L53).
  - Komotraks portfolio: `<img src="/komotraks-project.webp" alt="Komotraks — ugradnja komarnika, harmonika vrata i zavesa u Beogradu" loading="lazy">` in [HomePage.jsx:537-543](src/components/HomePage.jsx#L537-L543). Good alt, good format.
  - Founder photo on homepage teaser: `<img src="/marko-founder.webp" alt="Marko — osnivač SEO Mačka" loading="lazy">` in [HomePage.jsx:651-657](src/components/HomePage.jsx#L651-L657).
  - Founder photo on About page: `<img src="/marko-founder.webp" alt="Marko — osnivač SEO Mačka">` in [About.jsx:289-291](src/components/About.jsx#L289-L291). **No `loading="lazy"`** here (acceptable for above-the-fold).
- **All other "imagery" is CSS gradient/SVG decoration, not raster** (the diagonal stripes, yellow blobs, etc. are inline gradients in JSX).
- **Decorative public/ images that are NOT referenced anywhere in `src/`**: [LogoMAIN.jpg](public/LogoMAIN.jpg), [dizajn-brending.png](public/dizajn-brending.png), [ecommerce-card.png](public/ecommerce-card.png), [internet-prodavnica.png](public/internet-prodavnica.png), [saas-aplikacije.png](public/saas-aplikacije.png), [seo-optimizacija.png](public/seo-optimizacija.png), [strelica.webp](public/strelica.webp), [mackic-logo.jpg](public/mackic-logo.jpg), [mackic-logo.svg](public/mackic-logo.svg) — these are dead weight in the deploy and may have come from a prior static-HTML iteration of the site.
- `loading="lazy"` is used on 2 images (Komotraks, homepage founder teaser). It is **not** used on the logo or hero images (correct — they're above the fold).
- `width`/`height` are set only on the small header logo. All large images **lack intrinsic dimensions** → CLS risk.
- `fetchpriority`, `<link rel="preload">` for the LCP image: NOT PRESENT.
- WebP coverage is partial — the founder is shipped as both `.jpeg` and `.webp`; the dead `.png` legacy images are not converted.

### Internal linking
- Custom `Link` wrapper in [src/components/Link.jsx](src/components/Link.jsx) wraps `react-router-dom`'s `Link`. It **intercepts clicks, calls `setIsTransitioning(true)`, waits 480 ms, and only then calls `navigate(to)`** — i.e. every internal navigation has a hard 480 ms artificial delay for the page transition animation. SEO-impact note: this only affects UX, not crawling, but it's a UX/CWV concern (interaction-to-next-paint).
- Internal links: every page links to `/kontakt/` (CTA) and sometimes `/about/`. The homepage footer (which only appears on `/`) lists all real pages. There is **no in-content internal linking between service pages** (`/seo/` does not link to `/izrada-sajtova/` or vice versa), which is a missed topical-cluster opportunity.
- No `rel="nofollow"` is set anywhere intentionally.

### URL structure
- Clean URLs with **trailing slashes** (`/about/`, `/seo/`, `/izrada-sajtova/`, etc.).
- No query parameters used for content.
- The web-dev page slug is the SR phrase `izrada-sajtova` (good — targeted keyword); the SEO page slug is `seo` (fine); the About page uses the English slug `about` (not `o-nama` — minor inconsistency).
- No URLs are excluded from indexing.

### meta robots noindex / nofollow
- **NOT PRESENT anywhere.** No page emits a robots meta tag. Default behavior = indexable, followable.

---

## 5. PERFORMANCE & TECHNICAL

### Font loading
- **Google Fonts via render-blocking `<link rel="stylesheet">`** in [index.html:11](index.html#L11):
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
  ```
- Pros: `display=swap` is set.
- Cons: **No `<link rel="preconnect" href="https://fonts.googleapis.com">` / `https://fonts.gstatic.com`** → cold-load FOIT cost. No self-hosted fallback. No subsetting. Two families × 7 weights total.
- `Playfair Display` is loaded but the CSS only declares `Poppins, Inter, system-ui, Arial, sans-serif` as the body family ([css/styles.css:5](css/styles.css#L5)) — **Playfair appears to be loaded but not actually used** (worth grepping to confirm, but I didn't find a `font-family: 'Playfair Display'` rule).

### Render-blocking resources
- Two render-blocking `<link rel="stylesheet">` in the head: the Google Fonts CSS and `/css/styles.css`.
- No `defer`/`async` on user scripts (the only script in the shell is the Vite-generated module script, which is implicitly deferred).

### Third-party scripts
- **None loaded from the shell.** The only third-party runtime dependency is `@emailjs/browser`, loaded as an ES module on the `/kontakt/` page only, and called with credentials from `import.meta.env.VITE_EMAILJS_*` (see [src/components/Kontakt.jsx:10-12,59-70](src/components/Kontakt.jsx#L10-L70)).
- **No analytics installed** — no Google Analytics, no GTM, no Plausible, no Mixpanel, no Hotjar, no Facebook Pixel, no LinkedIn Insight Tag. Confirmed via grep across `src/` and `index.html`.
- **No chat widget.**

### Server / build config (Netlify)
- [netlify.toml](netlify.toml):
  ```toml
  [build]
    command = "npm run build"
    publish = "dist"

  [[redirects]]
    from = "/*"
    to = "/index.html"
    status = 200

  [[headers]]
    for = "/*"
    [headers.values]
      X-Frame-Options = "DENY"
      X-XSS-Protection = "1; mode=block"
      X-Content-Type-Options = "nosniff"

  [[headers]]
    for = "/*.js"
    [headers.values]
      Content-Type = "application/javascript; charset=utf-8"

  [[headers]]
    for = "/*.mjs"
    [headers.values]
      Content-Type = "application/javascript; charset=utf-8"
  ```
- The `/* → /index.html` SPA rewrite (status 200) means **every non-existent URL returns HTTP 200 with the SPA shell** — so 404 detection is client-side only (soft 404). Search engines will index the shell title for typos/orphans.
- A duplicate SPA rewrite is in [public/_redirects](public/_redirects).
- No `[[redirects]]` for canonical host (apex → www or vice versa) — UNCERTAIN whether `seomacak.com` (apex) redirects to `www.seomacak.com`, since this is set in the Netlify dashboard, not in the repo.
- No `Cache-Control`, no `Strict-Transport-Security`, no `Content-Security-Policy`, no `Referrer-Policy`, no `Permissions-Policy`, no `Link: <…>; rel=preload` headers.

### HTTPS
- UNCERTAIN from code alone — Netlify enforces HTTPS by default on its provisioned domains, but `netlify.toml` does not contain an explicit force-SSL block. Worth verifying in the Netlify UI.

### Core Web Vitals risks (visible in code)
1. **No SSR/prerender + heavy first paint** → LCP is whatever React/Helmet manage to paint after JS loads. The hero on `/` includes a Framer Motion-animated logo, two pattern overlays, three animated `HeroBadge` components, and a radial gradient blob — all client-side animated. With Google Fonts loading render-blocking on top, LCP is bounded by JS + font + CSS load.
2. **Logo image and hero images lack `width`/`height` attributes** → CLS risk on first paint.
3. **480 ms artificial delay in every internal navigation** ([src/components/Link.jsx:25-29](src/components/Link.jsx#L25-L29)) — purely cosmetic; will degrade INP and feel sluggish.
4. **Framer Motion is loaded on every page** (no code-splitting) — increases JS bundle size. Vite doesn't tree-shake Framer Motion's animation runtime aggressively.
5. **All routes are imported eagerly in [App.jsx:4-9](src/App.jsx#L4-L9)** — no `React.lazy`/`Suspense`, so a visitor landing on `/kontakt/` still downloads HomePage + SEO + IzradaSajtova etc. This bloats the initial JS payload.
6. **Two background-pattern divs with CSS gradients** rendered on every section (`linear-gradient(45deg, …)`, `linear-gradient(-45deg, …)`) on top of an `animation: moveDiagonalDots 4s linear infinite` running constantly site-wide (see [App.jsx:53-69](src/App.jsx#L53-L69)). Continuous transform animations off the main thread are fine if GPU-composited, but the rule sits behind a `pointer-events: none` fixed div spanning the viewport — verify it's not forcing repaints.
7. **Cursor URL overrides for every selector with `!important`** ([App.jsx:14-58](src/App.jsx#L14-L58)) — cosmetic; minor extra HTTP request for `/cursors/default.png` and `/cursors/pointer.png`.
8. **`mackic-logo.png` is a 66-byte stub** (see §4 OG/Twitter and §8) — every share preview is broken.

---

## 6. CONTENT & COPY

### Service / landing pages
- **`/` (homepage)** — hero, three-service "Šta radimo" with numbered ServiceRow, four-step "Kako radimo" process, **testimonial section (light, NEW)**, **Komotraks portfolio case study** with 4 stats (#1 Top 3 keywords in niche, +60% conversion, +30% load speed, +200% organic traffic) and 4 tags (SEO, Web Design, React, Performance), founder teaser, FAQ component, final yellow CTA, footer.
- **`/about/`** — founder hero with photo + badges, founder story (3+ paragraphs SR), differentiators (4 hardcoded), stats (4: 50+ projects, 30+ #1 clients, 3+ years, 4.7/5), specializations (14 tags), deliverables (5 items), final CTA. All copy in Serbian.
- **`/izrada-sajtova/`** — hero, web-dev landing with packages (`highlighted: false` flag suggests a tiered structure). Copy is in Serbian. Did not extract all sections — file is ~30 KB.
- **`/seo/`** — hero, stats (4 numbers), services (6 categories: Tehnički SEO audit, Keyword strategija, On-page, Sadržajna strategija, Link building, Lokalni SEO), "why SEO matters" 3-card section, sticker wall (interactive draggable stickers), FAQ list, CTA. Substantial Serbian copy, ~10 KB of unique service copy. **This is the most content-rich page on the site.**
- **`/blog/`** — explicitly placeholder ("Pišem prvi članak", "U izradi"). Three upcoming-topic cards.
- **`/kontakt/`** — hero + form, plus hardcoded email `kontakt@seomacak.com`, phone `+381 60 123 4567`, location "Beograd, Serbia".
- **NO pricing page.** Pricing/packages might be inside `/izrada-sajtova/` (the `highlighted: false` flag hints at a tier card), but no dedicated `/cene/` or `/pricing/` route exists.
- **NO standalone case studies page.** The single Komotraks block is embedded in the homepage; there is no `/case-studies/` route.
- **NO privacy/terms pages.** Footer links to `#`.

### Portfolio / case studies
- **One inline case study** ("Komotraks — Skorašnji rad") on the homepage with image, 4 KPI stats, paragraph of context, 4 tag chips, and a "Saznaj više o projektu" link that points to `/kontakt/` (not a real case-study page).
- No `/portfolio/`, no `/case-studies/`, no per-project sub-page.

### Location targeting
- Belgrade/Serbia signals: `<html lang="sr">`, `LocalBusiness` schema with Beograd/RS, footer "Beograd, Srbija", Komotraks alt-text mentions "Beograd". No city-specific landing pages, no neighborhood targeting. The SEO page mentions "Lokalni SEO" as a service but does not target specific Serbian cities.

### Copy quality
- **Homepage, About, SEO, Kontakt** copy is substantial and human-written in Serbian — opinions, founder voice, specific stats. Not thin. Good content depth, especially on `/seo/`.
- **Blog is empty by design.**
- **Translation strings are inconsistent**: `translationsSR.contact.meta.title` is `"Contact | SEO Mačak"` (English), `translationsSR.blog.meta.description` is in English, and many SR top-level blocks (`seo`, `about`, `webDevelopment`) **do not exist** at all in the SR table — see §8.

### Trust signals
- **One testimonial** added recently to the homepage: "Momak je došao i uradio posao maksimalno dobro." — Željko (specijalista za sisteme zaštite od insekata i kontrolu svetlosti). **Not yet in schema (`Review`/`AggregateRating`).**
- Hero badges advertising "★ 4.7 / 5", "50+ projekata", "Osnovano 2023", "30+ projekata" on the homepage hero (not verifiable / not in schema).
- Founder bio / photo (humanises the brand).
- No client-logo wall, no press mentions, no certifications, no Google Business Profile link, no review-platform embeds (Clutch, Capterra, Google reviews).

---

## 7. CONVERSION ELEMENTS

### Contact forms
- One form, on `/kontakt/`, fields: `ime`, `email`, `telefon` (optional), `poruka` ([src/components/Kontakt.jsx:44-79](src/components/Kontakt.jsx#L44-L79)).
- Submits via **EmailJS** (`@emailjs/browser`) using env vars `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`. Defined in [.env.example](.env.example).
- Success/error feedback is inline state. No reCAPTCHA / hCaptcha / honeypot → spam risk.
- No server-side validation (purely client-side).

### CTAs
- Every page has at least one CTA linking to `/kontakt/`.
- Homepage CTA pattern: hero text-CTA ("Kontakt" + arrow), final yellow CTA section ("Započni razgovor"), Komotraks card "Saznaj više o projektu" → also `/kontakt/`.
- Header has a "Kontakt" nav pill that visually doubles as a CTA.
- Inline "Saznaj više" anchors throughout (About → `/about/`, services → `/seo/`, etc.).

### Lead capture
- Only the contact form. **No newsletter capture**, no lead magnet, no booking widget (Calendly/Cal.com), no free-audit / free-quote auto-flow beyond the same form.

### Analytics / tracking
- **NONE installed.** No GA4, no GTM, no Plausible, no Fathom, no Mixpanel, no Microsoft Clarity, no Hotjar, no Pixel. No conversion tracking on form submit.
- This is a major blind spot — currently zero visibility into what works on the site.

---

## 8. KNOWN GAPS / RED FLAGS

In order of severity:

1. **SPA with no SSR/prerender** — every per-page `<title>`, `<meta>`, OG, canonical, and JSON-LD is injected by JS via Helmet. The static [index.html](index.html) shell has no description, no canonical, no OG, no schema. Googlebot can render JS, but most other crawlers and link-preview bots (Slack, WhatsApp, X, LinkedIn, Discord, FB) won't run JS and will see only the shell's "SEO Mačak — Početna" title for *every* URL. **Fix path:** Vite plugin like `vite-plugin-ssg` / `vike` / `react-snap`, or migrate to Astro/Next. This is the single largest structural SEO risk.

2. **`mackic-logo.png` is a 66-byte stub file** and yet **every page's `og:image`, `twitter:image`, `Organization.logo`, and `LocalBusiness.image` points to it.** Every social share preview the site has ever generated is broken. `mackic-logo.jpg` is **57 bytes** (also a stub). Should be replaced with a real 1200×630 OG image and a proper logo.

3. **`sitemap.xml` lives at the project root, not in `public/`.** Vite only ships `public/*` and the built `dist/*` to deploy — the root-level [sitemap.xml](sitemap.xml) likely **never reaches production**, even though [robots.txt](public/robots.txt) advertises it at `https://www.seomacak.com/sitemap.xml`. Need to either (a) move it to `public/`, or (b) generate it at build time.

4. **SR translations are incomplete** — top-level `about`, `seo`, `webDevelopment` blocks **do not exist** in `translationsSR` (they exist only in `translationsEN`). The SR table also stores FAQ under `home.faq`, while the EN table stores it under `seo.faq`. This has been causing runtime `Cannot read properties of undefined` crashes; components have been patched with fallback constants, but the underlying translation table is structurally broken. Some Helmet `<title>`/description strings on SR pages are in English (Kontakt, Blog).

5. **No analytics or conversion tracking.** Zero data on user behavior, traffic sources, or form-submit conversion. Should not optimize anything else until measurement is in place.

6. **No `hreflang`, no per-language URLs.** The site has SR and EN versions of all copy in memory, but they share one URL space. Google can't index the English copy as a separate variant. Either kill the EN translations or commit to a real `/en/...` URL structure with hreflang.

7. **404 returns HTTP 200.** Netlify's SPA catch-all rewrites `/*` to `/index.html` with status 200 — there's no real 404 status for typo'd URLs, so they get soft-404'd by Google. Fix requires a custom Netlify Edge Function or moving to a framework that emits real 404s.

8. **Footer only on homepage.** Internal-linking equity (footer link block) is concentrated on `/` only. Other routes have no global footer at all → no consistent internal linking pattern, less crawl flow between routes.

9. **No in-content cross-linking between service pages.** `/seo/` and `/izrada-sajtova/` don't link to each other. No topical cluster, no related-services widget. CTAs only point to `/kontakt/`.

10. **Phone numbers are inconsistent.** `Organization` schema: `+381-60-123-4567`. `LocalBusiness` schema: `+381 60 123 4567`. Mobile menu footer: `kontakt@seomacak.com` only. HomePage footer: `+381 (0) 123 456 789` (placeholder, doesn't match the rest). NAP consistency is a local-SEO ranking signal.

11. **No pricing, no real case studies, no privacy/terms pages.** Privatnost and Uslovi in the footer link to `#`. Privacy policy is a soft requirement for trust + ad compliance + GA cookie consent.

12. **Blog is non-functional** — present as a route, in sitemap, but has zero content. Either remove from sitemap until launched, or ship 2–3 real posts to start building topical authority.

13. **All routes are eagerly imported** ([App.jsx:4-9](src/App.jsx#L4-L9)) — no lazy splitting. Every visitor downloads code for every page. Quick win: `React.lazy` + `<Suspense>`.

14. **480 ms artificial delay on every internal navigation** ([Link.jsx:25-29](src/components/Link.jsx#L25-L29)) — INP & UX hit for SEO/SXO ranking signals.

15. **Hero / large images lack `width`/`height` attributes** → CLS risk.

16. **Playfair Display is loaded from Google Fonts but appears unused** in the actual CSS — wasted critical bytes on every page.

17. **Dead `public/` files** (LogoMAIN.jpg, dizajn-brending.png, ecommerce-card.png, internet-prodavnica.png, saas-aplikacije.png, seo-optimizacija.png, strelica.webp, mackic-logo.jpg, mackic-logo.svg) bloat the deploy and confuse the asset inventory. Not an SEO risk per se, but a hygiene issue.

18. **No reCAPTCHA/honeypot on the contact form** → spam exposure scales with traffic.

19. **No `Strict-Transport-Security`, no `Content-Security-Policy`, no `Referrer-Policy`** — security hygiene gap. Modest indirect SEO impact (trust / Safe Browsing).

20. **Two duplicate SPA-rewrite definitions** ([netlify.toml](netlify.toml) and [public/_redirects](public/_redirects)) — both work, no actual conflict, but it's redundant. UNCERTAIN which Netlify prioritises in practice.

---

## 9. RAW REFERENCE DATA

### Full route list (flat)
- `/` → `HomePage`
- `/about/` → `About`
- `/izrada-sajtova/` → `IzradaSajtova`
- `/seo/` → `SEO`
- `/blog/` → `Blog`
- `/kontakt/` → `Kontakt`
- `*` → `NotFound` (catch-all, served with HTTP 200 by Netlify)

### `package.json` (complete)
```json
{
  "type": "module",
  "name": "seo-macak",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview --port 5000"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^5.0.0",
    "vite": "^5.0.0"
  },
  "dependencies": {
    "@emailjs/browser": "^4.4.1",
    "framer-motion": "^10.12.5",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-helmet-async": "^3.0.0",
    "react-router-dom": "^7.11.0"
  }
}
```

### `public/robots.txt` (complete)
```
User-agent: *
Allow: /
Sitemap: https://www.seomacak.com/sitemap.xml
```

### `sitemap.xml` (complete, lives at project root — see §8 #3)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://www.seomacak.com/</loc><lastmod>2026-05-27</lastmod></url>
  <url><loc>https://www.seomacak.com/izrada-sajtova/</loc><lastmod>2026-05-27</lastmod></url>
  <url><loc>https://www.seomacak.com/seo/</loc><lastmod>2026-05-27</lastmod></url>
  <url><loc>https://www.seomacak.com/about/</loc><lastmod>2026-05-27</lastmod></url>
  <url><loc>https://www.seomacak.com/kontakt/</loc><lastmod>2026-05-27</lastmod></url>
  <url><loc>https://www.seomacak.com/blog/</loc><lastmod>2026-05-27</lastmod></url>
</urlset>
```

### `netlify.toml` (complete)
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"

[[headers]]
  for = "/*.js"
  [headers.values]
    Content-Type = "application/javascript; charset=utf-8"

[[headers]]
  for = "/*.mjs"
  [headers.values]
    Content-Type = "application/javascript; charset=utf-8"
```

### `public/_redirects` (complete)
```
/*    /index.html   200
```

### `public/manifest.json` (complete)
```json
{
  "name": "SEO Macak",
  "short_name": "SEO Macak",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#000000",
  "theme_color": "#000000",
  "icons": [
    { "src": "/logo.webp", "sizes": "512x512", "type": "image/webp" }
  ]
}
```

### `index.html` (root layout — complete)
```html
<!doctype html>
<html lang="sr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/logo.webp" type="image/webp" />
    <link rel="apple-touch-icon" href="/logo.webp" />
    <link rel="manifest" href="/manifest.json" />
    <meta name="theme-color" content="#000000" />
    <title>SEO Mačak — Početna</title>
    <link rel="stylesheet" href="/css/styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### `vite.config.mjs` (complete)
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { webcrypto } from 'node:crypto'

if (typeof globalThis.crypto === 'undefined' || typeof globalThis.crypto.getRandomValues !== 'function') {
  globalThis.crypto = webcrypto
}

export default defineConfig({
  plugins: [react()],
})
```

### `src/main.jsx` (entry — complete)
```jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { LanguageProvider } from './contexts/LanguageContext'
import '/css/styles.css'
import { HelmetProvider } from 'react-helmet-async'

const root = createRoot(document.getElementById('root'))
root.render(
  <HelmetProvider>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </HelmetProvider>
)
```

### `.env.example` (complete)
```
VITE_EMAILJS_SERVICE_ID=service_xxx
VITE_EMAILJS_TEMPLATE_ID=template_xxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxx
```

---

**End of discovery report.** Hand this file to the planning agent; do not act on it without first deciding which of the §8 items are in scope.
