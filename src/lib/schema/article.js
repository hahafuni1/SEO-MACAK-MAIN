import { BASE_URL } from '../routes.js'

/**
 * articleSchema — template for blog posts (BlogPosting).
 * Call this when adding real blog posts.
 *
 * @param {{
 *   title: string,
 *   description: string,
 *   slug: string,
 *   datePublished: string,   // ISO 8601, e.g. "2026-01-15"
 *   dateModified: string,
 *   image?: string,
 *   keywords?: string[],
 * }} opts
 */
export function articleSchema({ title, description, slug, datePublished, dateModified, image, keywords = [] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url: `${BASE_URL}/blog/${slug}/`,
    datePublished,
    dateModified: dateModified || datePublished,
    image: image || `${BASE_URL}/og-default.png`,
    author: { '@id': `${BASE_URL}/about/#person` },
    publisher: { '@id': `${BASE_URL}/#organization` },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${slug}/`,
    },
    inLanguage: 'sr',
    keywords: keywords.join(', '),
  }
}
