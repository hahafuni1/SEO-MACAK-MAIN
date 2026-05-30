# Phase 7 Report — Analytics, Search Console, Form Security

Date: 2026-05-30. Build: ✅ passing. 21 prerendered HTML files + 404. All new files verified in dist/.

---

## Summary

Phase 7 installs Plausible Analytics (privacy-first, no cookie consent needed), wires custom conversion events on the contact form, tags the three main CTAs for click tracking, creates placeholder files for Google Search Console and Bing Webmaster Tools verification, adds a honeypot to the contact form to silently block bot submissions, and creates `llms.txt` to help AI engines cite the site accurately.

---

## Files Created

| File | Purpose |
|------|---------|
| `public/google-site-verification.html` | GSC ownership verification placeholder — owner replaces content with actual file from GSC |
| `public/BingSiteAuth.xml` | Bing Webmaster Tools verification placeholder — owner replaces content |
| `public/llms.txt` | AI-readable site summary for ChatGPT, Perplexity, Claude citation |

## Files Modified

| File | Change |
|------|--------|
| `index.html` | Added Plausible `<script>` tag in `<body>` (static HTML, not via Helmet) |
| `src/components/Kontakt.jsx` | Added `useRef` import; `honeypotRef`; honeypot `<input>`; honeypot check in `handleSubmit`; `window.plausible` events on success/error; `plausible-event-name` class on email CTA |
| `src/components/HomePage.jsx` | Added `plausible-event-name=CTA+Click` class to hero CTA and final yellow CTA |
| `src/components/SEOHead.jsx` | Added commented-out `google-site-verification` and `msvalidate.01` meta tags with instructions |

---

## 7.1 — Plausible Analytics

### Script placement

```html
<!-- index.html — static <body>, not via Helmet -->
<script defer data-domain="seomacak.com"
  src="https://plausible.io/js/script.outbound-links.js"></script>
```

**Why in index.html, not Helmet:** The Plausible script needs to appear in the static HTML shell so it loads on every page, including before any JS hydration. Helmet injects tags during React render — fine for meta tags but the Plausible script should fire from the first byte, not wait for React. Placing it in the static `index.html` body means every prerendered HTML file automatically contains it (confirmed: 1 match in `dist/index.html`, 1 match in `dist/kontakt/index.html`, and all other prerendered files).

**Why `script.outbound-links.js`:** This variant tracks outbound link clicks automatically without any additional code. The owner's site links out to EmailJS, LinkedIn, etc. — outbound clicks are valuable engagement signals.

### Custom form events

```js
// On success
if (typeof window.plausible === 'function') {
  window.plausible('Contact Form Submit', { props: { status: 'success' } })
}
// On error
if (typeof window.plausible === 'function') {
  window.plausible('Contact Form Submit', { props: { status: 'error' } })
}
```

The `typeof` guard prevents errors in dev mode (where Plausible isn't loaded) or during SSR.

In Plausible dashboard, create a goal named **"Contact Form Submit"** to track conversions. The `status` property distinguishes successful sends from EmailJS errors.

### CTA click tracking

Three CTAs tagged with `className="plausible-event-name=CTA+Click"`:

| Location | Element | Copy |
|----------|---------|------|
| `HomePage.jsx` — hero | `<Link>` | "{t.nav.contact}" |
| `HomePage.jsx` — final yellow section | `<Link>` | "Započni razgovor" |
| `Kontakt.jsx` — "Ne voliš forme?" section | `<a>` | "kontakt@seomacak.com" |

Plausible's `outbound-links` script also handles the `plausible-event-name` class attribute automatically — no extra JS needed. Create a goal named **"CTA Click"** in the dashboard.

### Plausible dashboard setup (owner action required)

1. Create account at https://plausible.io
2. Add site with domain `seomacak.com`
3. Go to Goals → Add Goal:
   - **Contact Form Submit** (custom event)
   - **CTA Click** (custom event)
   - **Outbound Link: Click** (automatically populated by the outbound-links script)
4. Confirm the script is active by visiting the site and checking the Plausible realtime dashboard

---

## 7.2 — Search Console + Bing Webmaster Tools

### Placeholder files

| File | Path | Status |
|------|------|--------|
| Google verification | `dist/google-site-verification.html` | ✅ ships to Netlify |
| Bing verification | `dist/BingSiteAuth.xml` | ✅ ships to Netlify |

Both files contain clear instructions for the owner. The files are accessible at:
- `https://www.seomacak.com/google-site-verification.html`
- `https://www.seomacak.com/BingSiteAuth.xml`

### Commented meta tags in SEOHead

```jsx
{/* <meta name="google-site-verification" content="TODO-OWNER-FILL-FROM-GSC" /> */}
{/* <meta name="msvalidate.01"             content="TODO-OWNER-FILL-FROM-BING" /> */}
```

The owner can use either method (HTML file OR meta tag). The file method is already deployed; the meta tag method is ready to uncomment.

### Owner step-by-step: Google Search Console

1. Go to https://search.google.com/search-console/welcome
2. Click "Add property" → URL prefix → `https://www.seomacak.com`
3. Choose "HTML file" verification
4. Download the provided `.html` file
5. Replace `public/google-site-verification.html` with the downloaded file content
6. `git commit` + deploy to Netlify
7. Click "Verify" in GSC → property is verified
8. Submit sitemap: add `https://www.seomacak.com/sitemap.xml` in Sitemaps tab

### Owner step-by-step: Bing Webmaster Tools

1. Go to https://www.bing.com/webmasters
2. Sign in with Microsoft account
3. "Add your site" → `https://www.seomacak.com`
4. Choose "XML file" verification
5. Download `BingSiteAuth.xml`
6. Replace `public/BingSiteAuth.xml` content with the downloaded file
7. `git commit` + deploy to Netlify
8. Click "Verify" in Bing WMT
9. Submit sitemap: add `https://www.seomacak.com/sitemap.xml`

---

## 7.3 — Contact Form Honeypot

### Implementation

```jsx
// Ref (no state re-render on bot fills)
const honeypotRef = useRef(null)

// Check before EmailJS call
if (honeypotRef.current?.value) {
  setStatus('success')                          // fake success — bot doesn't know it failed
  setFormData({ ime: '', email: '', telefon: '', poruka: '' })
  setTimeout(() => setStatus('idle'), 5000)
  return                                        // EmailJS never called
}

// Hidden input in the form
<input
  ref={honeypotRef}
  type="text"
  name="website"
  tabIndex={-1}
  autoComplete="off"
  aria-hidden="true"
  style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
/>
```

### Security properties

| Property | Value | Why it matters |
|----------|-------|---------------|
| `tabIndex={-1}` | Can't be tabbed to | Keyboard users can't accidentally fill it |
| `autoComplete="off"` | Browser won't autofill | Prevents false positives from autofill |
| `aria-hidden="true"` | Hidden from screen readers | Accessibility |
| `position: absolute; left: -9999px` | Off-screen | Visually invisible to all users |
| `name="website"` | Common bot bait name | Bots look for "website", "url", "homepage" fields |
| Silent fake success | Bot sees "✓ Poruka poslata" | Bot doesn't retry — wastes less server resources |

**Why no reCAPTCHA:** Adds Google tracking, breaks the privacy-first stance, slows the page, frustrates real users. The honeypot handles the vast majority of automated spam without any user friction.

### Contact form field count

Original: 4 fields (ime, email, telefon, poruka) — unchanged. The honeypot field is invisible; it does not count as a form field for the owner or users.

---

## 7.4 — llms.txt

**File:** `public/llms.txt` → deployed to `https://www.seomacak.com/llms.txt`

The `llms.txt` standard (emerging 2025–2026) lets AI systems like ChatGPT, Perplexity, and Claude identify and cite sites accurately when answering queries. For a site in the SEO niche, being cited by AI engines is a direct business signal.

The file includes:
- One-sentence site description (AI extracts this as the citation blurb)
- Two service pages with direct URLs
- Case study summary with hard KPI numbers (AI engines quote specific numbers)
- Founder info with contact
- Locations served
- Pricing TODO (owner fills in when pricing page exists)

---

## Build Verification

```
dist/index.html:
  → <script defer data-domain="seomacak.com" src="https://plausible.io/js/script.outbound-links.js">  ✅

dist/kontakt/index.html:
  → Plausible script present                                        ✅
  → Honeypot <input name="website" ... style="position:absolute;left:-9999...">  ✅

dist/llms.txt                        ✅
dist/BingSiteAuth.xml                ✅
dist/google-site-verification.html   ✅
```

---

## Checklist for Owner Before Phase 8

- [ ] **Plausible setup** — create account at plausible.io, add `seomacak.com`, configure goals (Contact Form Submit, CTA Click)
- [ ] **Google Search Console** — follow the step-by-step above, replace `public/google-site-verification.html`, deploy, verify, submit sitemap
- [ ] **Bing Webmaster Tools** — follow the step-by-step above, replace `public/BingSiteAuth.xml`, deploy, verify, submit sitemap
- [ ] Test contact form:
  - Submit with real data → confirm email arrives + "✓ Poruka poslata" shown
  - Confirm honeypot field is not visible in browser
- [ ] Confirm CTAs on homepage have `plausible-event-name=CTA+Click` class in DOM (dev tools → inspect)
- [ ] Optional: uncomment the meta verification tags in `SEOHead.jsx` as a backup to the HTML file method

---

**Phase 7 complete. Build passing. Plausible in every prerendered HTML file. Honeypot wired. llms.txt deployed. Verification placeholders ready. Awaiting "proceed to Phase 8."**
