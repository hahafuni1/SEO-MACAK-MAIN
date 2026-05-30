import { BASE_URL } from '../routes.js'

// TODO (owner): fill in real sameAs URLs before going live.
const SAME_AS = [
  // 'https://www.linkedin.com/company/seo-macak',
  // 'https://twitter.com/seomacak',
  // 'https://github.com/seomacak',
]

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: 'SEO Mačak',
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/logo.webp`,
      width: 512,
      height: 512,
    },
    image: `${BASE_URL}/og-default.png`,
    description:
      'Freelance SEO optimizacija i izrada sajtova u Beogradu, Srbija. Dokazani rezultati: #1 rangiranja, povećanje organskog trafika i konverzija.',
    foundingDate: '2023',
    areaServed: ['RS', 'EU'],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+381621058144',
      contactType: 'customer service',
      email: 'kontakt@seomacak.com',
      availableLanguage: ['Serbian', 'English'],
    },
    sameAs: SAME_AS,
  }
}
