// seo.js — centralised per-page metadata factory.
// Usage: const meta = getMetadata({ pathname, t })
// Returns a structured object consumed by <SEOHead>.

import { BASE_URL, getHreflangUrls } from './routes.js'

export const SITE_NAME = 'SEO Mačak'
export const OG_DEFAULT = `${BASE_URL}/og-default.png`
export const OG_WIDTH = 1200
export const OG_HEIGHT = 630

// Per-route OG image overrides.
// TODO (owner): replace with real per-page designs when available.
const OG_IMAGES = {
  '/':                `${BASE_URL}/og-default.png`,
  '/about/':          `${BASE_URL}/og-default.png`,
  '/seo/':            `${BASE_URL}/og-default.png`,
  '/izrada-sajtova/': `${BASE_URL}/og-default.png`,
  '/blog/':           `${BASE_URL}/og-default.png`,
  '/kontakt/':        `${BASE_URL}/og-default.png`,
}

// EN slugs that differ from their SR equivalents.
const EN_TO_SR = {
  '/web-development/': '/izrada-sajtova/',
  '/contact/':         '/kontakt/',
  '/privacy/':         '/privatnost/',
  '/terms/':           '/uslovi/',
}

// Resolve the SR-canonical path from any pathname (strips /en/ prefix,
// then maps EN-only slugs to their SR equivalents).
function toSrPath(pathname) {
  const stripped = pathname.replace(/^\/en/, '') || '/'
  return EN_TO_SR[stripped] ?? stripped
}

// Pull title + description from the translation object for a given SR path.
function getPageMeta(srPath, t) {
  const map = {
    '/':                            t.home?.meta,
    '/about/':                      t.about?.meta,
    '/seo/':                        t.seo?.meta,
    '/izrada-sajtova/':             t.webDevelopment?.meta,
    '/blog/':                       t.blog?.meta,
    '/kontakt/':                    t.contact?.meta,
    '/case-studies/':               t.caseStudies?.meta,
    '/case-studies/komotraks/':     t.komotraks?.meta,
    '/privatnost/':                 t.privacy?.meta,
    '/uslovi/':                     t.terms?.meta,
  }
  return map[srPath] ?? { title: SITE_NAME, description: '' }
}

/**
 * getMetadata — returns all head-tag data for a given page.
 *
 * @param {string} pathname  — current location.pathname (SR or EN)
 * @param {object} t         — translation object from useLanguage()
 * @param {object} overrides — optional: { robots, ogImage, ogType }
 */
export function getMetadata({ pathname, t, overrides = {} }) {
  const lang  = pathname.startsWith('/en/') || pathname === '/en' ? 'en' : 'sr'
  const srPath = toSrPath(pathname)

  const pageMeta = getPageMeta(srPath, t)
  const canonical = BASE_URL + pathname
  const hreflang  = getHreflangUrls(pathname)
  const ogImage   = overrides.ogImage ?? OG_IMAGES[srPath] ?? OG_DEFAULT
  const ogLocale  = lang === 'en' ? 'en_US' : 'sr_RS'
  const robots    = overrides.robots ?? 'index, follow, max-image-preview:large, max-snippet:-1'
  const ogType    = overrides.ogType ?? 'website'

  return {
    title:        pageMeta.title,
    description:  pageMeta.description,
    canonical,
    robots,
    ogImage,
    ogImageWidth:  OG_WIDTH,
    ogImageHeight: OG_HEIGHT,
    ogImageAlt:   `${pageMeta.title} — ${SITE_NAME}`,
    ogLocale,
    ogType,
    hreflang,
  }
}

/**
 * getTitle — formats a page title with the site suffix.
 * Components that override the title can call this directly.
 */
export function getTitle(pageTitle) {
  return `${pageTitle} | ${SITE_NAME}`
}
