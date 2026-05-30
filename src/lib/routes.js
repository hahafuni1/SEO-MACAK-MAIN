export const BASE_URL = 'https://www.seomacak.com'

// Canonical pairs: each entry maps the Serbian URL to its English equivalent.
// These are the only two language variants; x-default points to the SR URL.
export const ROUTE_PAIRS = [
  { sr: '/',                en: '/en/'                },
  { sr: '/about/',          en: '/en/about/'          },
  { sr: '/izrada-sajtova/', en: '/en/web-development/' },
  { sr: '/seo/',            en: '/en/seo/'            },
  { sr: '/blog/',           en: '/en/blog/'           },
  { sr: '/kontakt/',        en: '/en/contact/'        },
]

// Returns absolute hreflang URLs for a given pathname, or null if unknown.
export function getHreflangUrls(pathname) {
  for (const pair of ROUTE_PAIRS) {
    if (pathname === pair.sr || pathname === pair.en) {
      return {
        sr:        BASE_URL + pair.sr,
        en:        BASE_URL + pair.en,
        xDefault:  BASE_URL + pair.sr,
      }
    }
  }
  return null
}

// Returns the opposite-language path for the current pathname.
export function getAlternatePath(pathname) {
  for (const pair of ROUTE_PAIRS) {
    if (pathname === pair.sr) return pair.en
    if (pathname === pair.en) return pair.sr
  }
  return '/'
}

// Returns nav links for the given language (used by header, footer, CTA buttons).
export function getNavLinks(language) {
  if (language === 'en') {
    return {
      home:    '/en/',
      webDev:  '/en/web-development/',
      seo:     '/en/seo/',
      blog:    '/en/blog/',
      about:   '/en/about/',
      contact: '/en/contact/',
    }
  }
  return {
    home:    '/',
    webDev:  '/izrada-sajtova/',
    seo:     '/seo/',
    blog:    '/blog/',
    about:   '/about/',
    contact: '/kontakt/',
  }
}
