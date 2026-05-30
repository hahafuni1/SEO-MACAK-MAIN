import { BASE_URL } from '../routes.js'

/**
 * caseStudySchema — for case study pages (CreativeWork).
 * Used on /case-studies/komotraks/ (Phase 5).
 *
 * @param {{
 *   name: string,
 *   description: string,
 *   url: string,
 *   image?: string,
 *   dateCreated?: string,
 *   keywords?: string[],
 *   about?: object,
 * }} opts
 */
export function caseStudySchema({ name, description, url, image, dateCreated, keywords = [], about }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name,
    description,
    url,
    image: image || `${BASE_URL}/og-default.png`,
    ...(dateCreated && { dateCreated }),
    creator: { '@id': `${BASE_URL}/#organization` },
    author: { '@id': `${BASE_URL}/about/#person` },
    publisher: { '@id': `${BASE_URL}/#organization` },
    ...(about && { about }),
    keywords: keywords.join(', '),
    inLanguage: 'sr',
  }
}
